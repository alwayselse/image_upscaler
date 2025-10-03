/**
 * Professional Image Upscaling Application - React Frontend
 * =========================================================
 * 
 * A complete React component for image upscaling with modern UX patterns:
 * - Drag & drop file upload with visual feedback
 * - Image preview with dimensions display
 * - Progress tracking and loading states
 * - Download functionality for processed images
 * - Comprehensive error handling
 * - Mobile-responsive design
 * 
 * Dependencies: React 18+, Tailwind CSS
 */

const App = () => {
  // Get React hooks from the global React object
  const { useState, useCallback, useRef, useEffect } = React;
  
  // State management
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(2.0);
  const [imageMetadata, setImageMetadata] = useState(null);
  
  // Refs
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Configuration
  const API_BASE_URL = 'http://localhost:8000';
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  // Custom SVG Icons
  const Icons = {
    Upload: () => (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    Download: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    Error: () => (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    Success: () => (
      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    Reset: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    Image: () => (
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  };

  // File validation utility
  const validateFile = useCallback((file) => {
    if (!file) return { valid: false, error: 'No file selected' };
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' };
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
    }
    
    return { valid: true, error: null };
  }, []);

  // Generate image preview
  const generatePreview = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageMetadata({
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type,
          name: file.name
        });
      };
      img.src = e.target.result;
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile) => {
    setError(null);
    setSuccess(null);
    setProcessedImage(null);
    
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setFile(selectedFile);
    generatePreview(selectedFile);
  }, [validateFile, generatePreview]);

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  }, [handleFileSelect]);

  // File input change handler
  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  // Progress simulation (since we can't track actual upload progress easily)
  const simulateProgress = useCallback(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Stop at 90% until actual completion
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  }, []);

  // Image upscaling function
  const upscaleImage = useCallback(async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    
    const progressInterval = simulateProgress();
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('scale_factor', scaleFactor.toString());
      
      const response = await fetch(`${API_BASE_URL}/upscale`, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      // Get metadata from response headers
      const metadata = response.headers.get('X-Image-Metadata');
      if (metadata) {
        try {
          const parsedMetadata = JSON.parse(metadata.replace(/'/g, '"'));
          setImageMetadata(prev => ({ ...prev, processed: parsedMetadata }));
        } catch (e) {
          console.warn('Failed to parse metadata:', e);
        }
      }
      
      setProcessedImage({
        url: imageUrl,
        blob: blob,
        filename: `upscaled_${file.name}`
      });
      
      setSuccess('Image upscaled successfully!');
      
    } catch (err) {
      console.error('Upscaling error:', err);
      setError(err.message || 'Failed to upscale image. Please try again.');
      clearInterval(progressInterval);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, scaleFactor, simulateProgress]);

  // Download processed image
  const downloadImage = useCallback(() => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage.url;
    link.download = processedImage.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  // Reset application state
  const resetApp = useCallback(() => {
    setFile(null);
    setPreview(null);
    setProcessedImage(null);
    setError(null);
    setSuccess(null);
    setProgress(0);
    setIsProcessing(false);
    setImageMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        resetApp();
      } else if (e.key === 'Enter' && file && !isProcessing) {
        upscaleImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [file, isProcessing, resetApp, upscaleImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image Upscaler Pro
          </h1>
          <p className="text-lg text-gray-600">
            Professional image upscaling with AI-powered enhancement
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Upload Section */}
          {!file && (
            <div className="p-8">
              <div
                ref={dropZoneRef}
                className={`
                  relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                  ${dragActive 
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInput}
                />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className={`transform transition-transform duration-300 ${dragActive ? 'scale-110' : ''}`}>
                    <Icons.Upload />
                  </div>
                  
                  <div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      {dragActive ? 'Drop your image here!' : 'Upload an image to get started'}
                    </p>
                    <p className="text-gray-500">
                      Drag & drop or click to browse • JPEG, PNG, WebP • Max 10MB
                    </p>
                  </div>
                  
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preview and Controls Section */}
          {file && (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Original Image Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Icons.Image />
                    Original Image
                  </h3>
                  
                  {preview && (
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={preview}
                        alt="Original"
                        className="w-full h-auto max-h-80 object-contain"
                      />
                      
                      {imageMetadata && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3">
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Dimensions:</span> {imageMetadata.width} × {imageMetadata.height}</p>
                            <p><span className="font-medium">Size:</span> {formatFileSize(imageMetadata.size)}</p>
                            <p><span className="font-medium">Type:</span> {imageMetadata.type}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls and Settings */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upscaling Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scale Factor: {scaleFactor}x
                        </label>
                        <input
                          type="range"
                          min="1.5"
                          max="4"
                          step="0.5"
                          value={scaleFactor}
                          onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          disabled={isProcessing}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1.5x</span>
                          <span>4x</span>
                        </div>
                      </div>
                      
                      {imageMetadata && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <span className="font-medium">Output size:</span> {' '}
                            {Math.round(imageMetadata.width * scaleFactor)} × {Math.round(imageMetadata.height * scaleFactor)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={upscaleImage}
                      disabled={isProcessing}
                      className={`
                        w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200
                        ${isProcessing 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:scale-105'
                        }
                      `}
                    >
                      {isProcessing ? 'Processing...' : 'Upscale Image'}
                    </button>
                    
                    <button
                      onClick={resetApp}
                      className="w-full py-2 px-6 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Icons.Reset />
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="px-8 pb-8">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Processing... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Processed Image Section */}
          {processedImage && (
            <div className="border-t bg-gray-50 p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Upscaled Result</h3>
                  <button
                    onClick={downloadImage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Icons.Download />
                    Download
                  </button>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={processedImage.url}
                    alt="Upscaled"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                  
                  {imageMetadata?.processed && (
                    <div className="p-4 bg-gray-100 border-t">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Original:</span>
                          <p className="text-gray-800">
                            {imageMetadata.processed.original_size.width} × {imageMetadata.processed.original_size.height}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Upscaled:</span>
                          <p className="text-gray-800">
                            {imageMetadata.processed.processed_size.width} × {imageMetadata.processed.processed_size.height}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Scale:</span>
                          <p className="text-gray-800">{imageMetadata.processed.scale_factor}x</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Size:</span>
                          <p className="text-gray-800">{formatFileSize(imageMetadata.processed.file_size_bytes)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {(error || success) && (
            <div className="px-8 pb-8">
              <div className={`
                p-4 rounded-lg flex items-center gap-3
                ${error ? 'bg-red-100 border border-red-200' : 'bg-green-100 border border-green-200'}
              `}>
                {error ? <Icons.Error /> : <Icons.Success />}
                <p className={`text-sm font-medium ${error ? 'text-red-800' : 'text-green-800'}`}>
                  {error || success}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Supports JPEG, PNG, and WebP formats • Maximum file size: 10MB</p>
          <p className="mt-1">Press ESC to reset • Press Enter to process</p>
        </div>
      </div>
    </div>
  );
};

// Make App available globally for the HTML to use
window.App = App;