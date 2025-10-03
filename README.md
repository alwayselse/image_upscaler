# 🖼️ Image Upscaler Pro

**A professional full-stack image upscaling application built with React and FastAPI**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Transform your images with professional-grade upscaling technology. Built with modern web technologies for optimal performance and user experience.

## 🌟 Live Demo

![App Screenshot](https://via.placeholder.com/800x400/3B82F6/ffffff?text=Image+Upscaler+Pro+Demo)

**Quick Start:** Simply run `START-APP.bat` and visit `http://localhost:3000`

## ✨ Key Features

### 🎯 **User Experience**
- **Drag & Drop Interface** - Intuitive file upload with visual feedback
- **Real-time Preview** - See your images before and after processing
- **Progress Tracking** - Visual progress indicators during processing  
- **Mobile Responsive** - Works seamlessly across all devices
- **One-Click Launch** - Start the entire application with a single command

### ⚡ **Technical Features**
- **High-Performance Backend** - FastAPI with async processing
- **Advanced Image Processing** - Bicubic interpolation with sharpening enhancement
- **Secure File Handling** - Comprehensive validation and security measures
- **Streaming Responses** - Efficient handling of large image files
- **Production Ready** - Error handling, logging, and monitoring

### � **Developer Features**
- **Modern Architecture** - Clean separation of frontend and backend
- **API Documentation** - Auto-generated OpenAPI docs
- **Easy Deployment** - Simple setup and configuration
- **Extensible Design** - Ready for AI model integration

## 🚀 Quick Start

### One-Click Launch (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/image-upscaler-pro.git
cd image-upscaler-pro

# Double-click START-APP.bat (Windows)
# App will open automatically in your browser
```

### Manual Setup
```bash
# Backend setup
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

# Frontend setup (new terminal)
cd frontend
python -m http.server 3000
```

**Access Points:**
- 🌐 **Main App**: http://localhost:3000
- 📚 **API Docs**: http://localhost:8000/docs
- 🔧 **Backend**: http://localhost:8000

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Frontend      │ ←─────────────────→ │     Backend     │
│   React SPA     │                     │   FastAPI API   │
│   Port 3000     │                     │   Port 8000     │
└─────────────────┘                     └─────────────────┘
        │                                        │
        ├─ React Hooks (State)                  ├─ PIL Image Processing
        ├─ Tailwind CSS (Styling)               ├─ Async Request Handling  
        ├─ File API (Upload)                    ├─ Stream Responses
        └─ Fetch API (HTTP)                     └─ Input Validation
```

## 📁 Project Structure

```
image-upscaler-pro/
├── 📁 backend/
│   ├── 🐍 app.py              # FastAPI application
│   ├── 📋 requirements.txt    # Python dependencies
│   └── 🔧 start-backend.bat   # Backend launcher
├── 📁 frontend/
│   ├── ⚛️ App.jsx             # React component
│   ├── 🌐 index.html          # Entry point
│   ├── 📋 package.json        # Frontend config
│   └── 🔧 start-frontend.bat  # Frontend launcher
├── 🚀 START-APP.bat           # One-click launcher
├── 🛑 STOP-APP.bat            # Shutdown script
└── 📖 README.md               # Documentation
```

## 🛠️ Technology Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[PIL/Pillow](https://pillow.readthedocs.io/)** - Advanced image processing
- **[Uvicorn](https://www.uvicorn.org/)** - Lightning-fast ASGI server

### Frontend  
- **[React 18](https://reactjs.org/)** - Component-based UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **Vanilla JavaScript** - No build tools, pure performance

### Infrastructure
- **HTTP Streaming** - Efficient large file handling
- **CORS Configuration** - Secure cross-origin requests
- **Input Validation** - Comprehensive security measures

## 🎯 Supported Formats & Limits

| Feature | Specification |
|---------|---------------|
| **Input Formats** | JPEG, PNG, WebP |
| **Output Format** | High-quality JPEG |
| **File Size Limit** | 10MB maximum |
| **Scale Range** | 1.5x to 4.0x |
| **Max Output** | 4000x4000 pixels |

## 🔒 Security Features

- ✅ **File Type Validation** - Only allow image formats
- ✅ **Size Limits** - Prevent resource exhaustion
- ✅ **MIME Type Checking** - Verify actual file content
- ✅ **Input Sanitization** - Clean all user inputs
- ✅ **CORS Restrictions** - Limited to frontend domain
- ✅ **Memory Management** - Efficient resource usage

## 📈 Performance

- **Processing Time**: ~2-5 seconds for typical images
- **Memory Usage**: Optimized for large files
- **Concurrent Users**: Supports multiple simultaneous uploads
- **Scalability**: Ready for horizontal scaling

## 🚢 Deployment Options

### Local Development
```bash
START-APP.bat  # Windows one-click start
```

### Production Deployment
```bash
# Docker deployment
docker build -t image-upscaler .
docker run -p 8000:8000 image-upscaler

# Cloud platforms
# - Heroku, Vercel, AWS, Azure, Google Cloud
# - Static hosting: Netlify, GitHub Pages
```

## 🤝 Contributing

This project is currently maintained as a personal portfolio project. Feel free to:

1. ⭐ Star the repository if you find it useful
2. 🐛 Report bugs or suggest improvements via issues
3. 💡 Suggest new features or enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**[Your Name]** - Full Stack Developer

- 🌐 **Portfolio**: [your-portfolio.com](https://your-portfolio.com)
- 💼 **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 📧 **Email**: your.email@example.com
- 🐙 **GitHub**: [@yourusername](https://github.com/yourusername)

### 🛠️ Skills Demonstrated

- **Frontend Development**: React, JavaScript ES6+, CSS3, Responsive Design
- **Backend Development**: Python, FastAPI, RESTful APIs, Async Programming
- **Image Processing**: PIL/Pillow, Computer Vision, Algorithm Implementation
- **DevOps**: Application Architecture, Deployment, Performance Optimization
- **User Experience**: Intuitive UI/UX, Progressive Enhancement, Accessibility

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Your Name] | © 2025

</div>

### Frontend
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Live Image Preview**: See your images before processing with metadata display
- **Real-time Progress**: Visual progress tracking during processing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Custom SVG Icons**: No external dependencies for icons
- **Error Handling**: Comprehensive user-friendly error messages
- **File Validation**: Support for JPEG, PNG, WebP with size limits
- **Download Functionality**: Easy download of processed images
- **Keyboard Shortcuts**: ESC to reset, Enter to process
- **Before/After Comparison**: Compare original and upscaled images

### Backend
- **FastAPI Framework**: High-performance async API
- **Image Processing**: PIL-based bicubic interpolation with sharpening
- **File Validation**: Comprehensive security and format validation
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Detailed error responses with proper HTTP codes
- **Memory Management**: Efficient handling of large images
- **Streaming Response**: Optimized for large file downloads
- **Health Checks**: Built-in monitoring endpoints
- **Production Ready**: Proper logging, validation, and security

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ (for backend)
- Modern web browser (for frontend)
- Optional: Node.js (for advanced development)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**:
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at:
   - Main API: http://localhost:8000
   - Interactive docs: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Start the development server**:
   ```bash
   # Using Python (recommended for simplicity)
   python -m http.server 3000
   
   # Alternative: Using Node.js if you have it installed
   npx serve . -p 3000
   ```

3. **Open your browser**:
   Navigate to http://localhost:3000

## 📁 Project Structure

```
image_upscale/
├── backend/
│   ├── app.py              # FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── App.jsx            # React component
│   ├── index.html         # HTML entry point
│   └── package.json       # Frontend configuration
└── README.md              # This file
```

## 🔧 Configuration

### Backend Configuration

The backend accepts the following environment variables:

```bash
# Optional: Set maximum file size (default: 10MB)
export MAX_FILE_SIZE=10485760

# Optional: Set maximum image dimension (default: 4000px)
export MAX_DIMENSION=4000

# Optional: Set default scale factor (default: 2.0)
export DEFAULT_SCALE_FACTOR=2.0
```

### Frontend Configuration

Update the API URL in `App.jsx` if your backend runs on a different port:

```javascript
const API_BASE_URL = 'http://localhost:8000'; // Change this if needed
```

## 🖥️ Usage

1. **Start both servers** (backend on :8000, frontend on :3000)
2. **Open the frontend** in your browser
3. **Upload an image** by:
   - Dragging and dropping a file
   - Clicking to browse and select
4. **Adjust scale factor** (1.5x to 4x)
5. **Click "Upscale Image"** to process
6. **Download the result** when processing completes

### Supported Formats
- **Input**: JPEG, PNG, WebP
- **Output**: High-quality JPEG
- **Size Limit**: 10MB maximum
- **Dimensions**: Up to 4000x4000 pixels output

## 🛠️ Development

### Backend Development

```bash
# Run with auto-reload for development
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Run tests (if implemented)
pytest

# Check API documentation
curl http://localhost:8000/health
```

### Frontend Development

The frontend uses CDN-based React and Tailwind CSS for simplicity. For advanced development:

```bash
# Install Node.js dependencies (optional)
npm install

# Start development server
npm run dev

# Build for production (if using build tools)
npm run build
```

### Adding AI-based Upscaling

To upgrade from bicubic to AI-based upscaling with Real-ESRGAN:

1. **Install additional dependencies**:
   ```bash
   pip install torch torchvision realesrgan
   ```

2. **Update the backend** to use Real-ESRGAN:
   ```python
   from realesrgan import RealESRGANer
   from basicsr.archs.rrdbnet_arch import RRDBNet
   
   # Initialize Real-ESRGAN model
   model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
   upsampler = RealESRGANer(scale=4, model_path='path/to/model.pth', model=model, tile=0, tile_pad=10, pre_pad=0, half=False)
   ```

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Check Python version (3.8+ required)
- Ensure all dependencies are installed
- Verify port 8000 is not in use

**Frontend not loading:**
- Check if backend is running on port 8000
- Verify CORS is enabled in FastAPI
- Clear browser cache and reload

**Image processing fails:**
- Check file format is supported
- Verify file size is under 10MB
- Ensure image is not corrupted

**CORS errors:**
- Make sure backend is running
- Check API_BASE_URL in frontend
- Verify CORS middleware is configured

### Performance Optimization

**Backend:**
- Use Gunicorn for production: `gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker`
- Add Redis for caching if processing many images
- Use cloud storage for large files

**Frontend:**
- Implement image compression before upload
- Add progressive image loading
- Use service workers for offline functionality

## 🚢 Production Deployment

### Backend Deployment

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Deployment

The frontend can be deployed to any static hosting service:

- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Drag and drop the frontend folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload files to S3 bucket with static hosting

### Docker Deployment

Create `Dockerfile` for backend:

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .
EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📝 API Documentation

### Endpoints

**GET /** - Health check and API information
- Returns: Service status and configuration

**POST /upscale** - Upscale an image
- Parameters:
  - `file`: Image file (multipart/form-data)
  - `scale_factor`: Float between 1.5 and 4.0 (optional, default: 2.0)
- Returns: Upscaled image file with metadata headers

**GET /health** - Detailed health check
- Returns: Service health status and capabilities

### Example Usage

```bash
# Health check
curl http://localhost:8000/health

# Upscale image
curl -X POST "http://localhost:8000/upscale" \
     -F "file=@image.jpg" \
     -F "scale_factor=2.0" \
     --output upscaled_image.jpg
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- PIL/Pillow for image processing capabilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation at http://localhost:8000/docs
3. Create an issue on the GitHub repository
4. Check browser console for error messages

---

**Happy upscaling! 🎉**#   i m a g e _ u p s c a l e r  
 