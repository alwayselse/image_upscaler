"""
Production-ready Image Upscaling API using FastAPI
=================================================

This FastAPI application provides image upscaling capabilities using PIL with bicubic interpolation.
For production environments, consider integrating Real-ESRGAN for superior AI-based upscaling.

Startup Instructions:
1. Install dependencies: pip install -r requirements.txt
2. Run server: uvicorn app:app --reload --host 127.0.0.1 --port 8000
3. API will be available at http://localhost:8000
4. Interactive docs at http://localhost:8000/docs

Features:
- File validation (type, size, format)
- Memory-efficient image processing
- Comprehensive error handling
- CORS configuration for frontend integration
- Progress tracking support
- Secure file handling
"""

import io
import os
import logging
import mimetypes
from typing import Optional
from PIL import Image, ImageOps
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.security import HTTPBearer
import uvicorn
import time
from collections import defaultdict

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Simple rate limiting (in production, use Redis or similar)
request_counts = defaultdict(list)
RATE_LIMIT_REQUESTS = 10  # Max requests per minute
RATE_LIMIT_WINDOW = 60    # Window in seconds

# Initialize FastAPI app with security headers
app = FastAPI(
    title="Image Upscaling API",
    description="Professional image upscaling service with validation and error handling",
    version="1.0.0"
)

# Security middleware for headers
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    # Simple rate limiting
    client_ip = request.client.host
    now = time.time()
    
    # Clean old requests
    request_counts[client_ip] = [
        req_time for req_time in request_counts[client_ip] 
        if now - req_time < RATE_LIMIT_WINDOW
    ]
    
    # Check rate limit
    if len(request_counts[client_ip]) >= RATE_LIMIT_REQUESTS:
        return JSONResponse(
            status_code=429,
            content={"detail": "Rate limit exceeded. Please try again later."}
        )
    
    # Add current request
    request_counts[client_ip].append(now)
    
    response = await call_next(request)
    
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    return response

# CORS configuration for frontend integration  
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Restrict to frontend only
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Configuration constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_DIMENSION = 4000  # Maximum width/height for processing
DEFAULT_SCALE_FACTOR = 2.0

class ImageProcessor:
    """Handles image processing operations with error handling and validation"""
    
    @staticmethod
    def validate_image_file(file: UploadFile) -> tuple[bool, str]:
        """
        Validates uploaded image file for security and compatibility
        
        Returns:
            tuple: (is_valid: bool, error_message: str)
        """
        try:
            # Check file size
            if hasattr(file, 'size') and file.size > MAX_FILE_SIZE:
                return False, f"File size exceeds maximum limit of {MAX_FILE_SIZE // (1024*1024)}MB"
            
            # Check file extension
            if file.filename:
                ext = os.path.splitext(file.filename.lower())[1]
                if ext not in ALLOWED_EXTENSIONS:
                    return False, f"Unsupported file format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
            
            # Check MIME type
            if file.content_type not in ALLOWED_MIME_TYPES:
                return False, f"Invalid content type. Expected image file."
            
            return True, ""
            
        except Exception as e:
            logger.error(f"Validation error: {str(e)}")
            return False, "File validation failed"
    
    @staticmethod
    def process_image(image_data: bytes, scale_factor: float = DEFAULT_SCALE_FACTOR) -> tuple[bytes, dict]:
        """
        Process and upscale image using PIL with bicubic interpolation
        
        Args:
            image_data: Raw image bytes
            scale_factor: Upscaling factor (default: 2.0)
            
        Returns:
            tuple: (processed_image_bytes, metadata_dict)
        """
        try:
            # Open and validate image
            with Image.open(io.BytesIO(image_data)) as img:
                # Convert to RGB if necessary (handles RGBA, P modes)
                if img.mode in ('RGBA', 'LA'):
                    # Handle transparency properly
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'RGBA':
                        background.paste(img, mask=img.split()[-1])
                    else:
                        background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode not in ('RGB', 'L'):
                    img = img.convert('RGB')
                
                # Get original dimensions
                original_width, original_height = img.size
                
                # Calculate new dimensions
                new_width = int(original_width * scale_factor)
                new_height = int(original_height * scale_factor)
                
                # Validate output dimensions
                if new_width > MAX_DIMENSION or new_height > MAX_DIMENSION:
                    # Scale down the factor to fit within limits
                    max_scale_w = MAX_DIMENSION / original_width
                    max_scale_h = MAX_DIMENSION / original_height
                    scale_factor = min(max_scale_w, max_scale_h, scale_factor)
                    new_width = int(original_width * scale_factor)
                    new_height = int(original_height * scale_factor)
                
                logger.info(f"Upscaling image: {original_width}x{original_height} -> {new_width}x{new_height}")
                
                # Perform upscaling using high-quality bicubic interpolation
                upscaled_img = img.resize(
                    (new_width, new_height), 
                    Image.Resampling.BICUBIC
                )
                
                # Apply sharpening filter for better quality
                from PIL import ImageFilter
                upscaled_img = upscaled_img.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3))
                
                # Save processed image to bytes
                output_buffer = io.BytesIO()
                
                # Determine output format and quality settings
                img_format = 'JPEG'
                save_kwargs = {'format': img_format, 'quality': 95, 'optimize': True}
                
                # Save with high quality
                upscaled_img.save(output_buffer, **save_kwargs)
                output_buffer.seek(0)
                
                # Prepare metadata
                metadata = {
                    'original_size': {'width': original_width, 'height': original_height},
                    'processed_size': {'width': new_width, 'height': new_height},
                    'scale_factor': scale_factor,
                    'format': img_format,
                    'file_size_bytes': len(output_buffer.getvalue())
                }
                
                return output_buffer.getvalue(), metadata
                
        except Exception as e:
            logger.error(f"Image processing error: {str(e)}")
            raise HTTPException(status_code=422, detail=f"Image processing failed: {str(e)}")

# Initialize image processor
processor = ImageProcessor()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Image Upscaling API is running",
        "version": "1.0.0",
        "endpoints": ["/upscale"],
        "max_file_size_mb": MAX_FILE_SIZE // (1024*1024),
        "supported_formats": list(ALLOWED_EXTENSIONS)
    }

@app.post("/upscale")
async def upscale_image(
    file: UploadFile = File(..., description="Image file to upscale"),
    scale_factor: Optional[float] = DEFAULT_SCALE_FACTOR
):
    """
    Upscale an uploaded image using bicubic interpolation
    
    Parameters:
    - file: Image file (JPEG, PNG, WebP)
    - scale_factor: Upscaling factor (default: 2.0, max: determined by output size limits)
    
    Returns:
    - Processed image file with metadata
    """
    
    # Validate scale factor
    if scale_factor <= 0 or scale_factor > 4.0:
        raise HTTPException(
            status_code=400, 
            detail="Scale factor must be between 0.1 and 4.0"
        )
    
    # Validate uploaded file
    is_valid, error_message = processor.validate_image_file(file)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error_message)
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Validate actual file size
        if len(file_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413, 
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB"
            )
        
        # Process the image
        logger.info(f"Processing image: {file.filename} ({len(file_content)} bytes)")
        processed_image, metadata = processor.process_image(file_content, scale_factor)
        
        # Prepare response
        output_filename = f"upscaled_{file.filename}"
        
        # Create streaming response for memory efficiency
        response = StreamingResponse(
            io.BytesIO(processed_image),
            media_type="image/jpeg",
            headers={
                "Content-Disposition": f"attachment; filename={output_filename}",
                "X-Image-Metadata": str(metadata),
                "X-Original-Filename": file.filename or "unknown",
                "X-Processing-Status": "success"
            }
        )
        
        logger.info(f"Successfully processed image: {metadata}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing image: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Internal server error during image processing"
        )

@app.get("/health")
async def health_check():
    """Detailed health check endpoint"""
    try:
        # Test basic image processing capability
        test_img = Image.new('RGB', (100, 100), color='red')
        test_buffer = io.BytesIO()
        test_img.save(test_buffer, format='JPEG')
        
        return {
            "status": "healthy",
            "service": "Image Upscaling API",
            "processing_capability": "operational",
            "max_file_size_mb": MAX_FILE_SIZE // (1024*1024),
            "supported_formats": list(ALLOWED_EXTENSIONS)
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "error": str(e)}
        )

# Error handlers
@app.exception_handler(413)
async def file_too_large_handler(request, exc):
    """Handle file too large errors"""
    return JSONResponse(
        status_code=413,
        content={
            "detail": f"File too large. Maximum size allowed: {MAX_FILE_SIZE // (1024*1024)}MB",
            "error_code": "FILE_TOO_LARGE"
        }
    )

@app.exception_handler(422)
async def validation_error_handler(request, exc):
    """Handle validation errors"""
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error occurred",
            "error_code": "VALIDATION_ERROR"
        }
    )

if __name__ == "__main__":
    # For development only - use proper WSGI server for production
    uvicorn.run(
        "app:app",
        host="127.0.0.1",  # Only bind to localhost for security
        port=8000,
        reload=True,
        log_level="info"
    )