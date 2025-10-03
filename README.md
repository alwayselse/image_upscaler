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

### 🔧 **Developer Features**
- **Modern Architecture** - Clean separation of frontend and backend
- **API Documentation** - Auto-generated OpenAPI docs
- **Easy Deployment** - Simple setup and configuration
- **Extensible Design** - Ready for AI model integration

## 🚀 Quick Start

### One-Click Launch (Recommended)
```bash
# Clone the repository
git clone https://github.com/alwayselse/image_upscaler.git
cd image_upscaler

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
image_upscaler/
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

## 🖥️ Usage

1. **Start both servers** (backend on :8000, frontend on :3000)
2. **Open the frontend** in your browser
3. **Upload an image** by:
   - Dragging and dropping a file
   - Clicking to browse and select
4. **Adjust scale factor** (1.5x to 4x)
5. **Click "Upscale Image"** to process
6. **Download the result** when processing completes

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

## 🤝 Contributing

This project is currently maintained as a personal portfolio project. Feel free to:

1. ⭐ Star the repository if you find it useful
2. 🐛 Report bugs or suggest improvements via issues
3. 💡 Suggest new features or enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Nikhil** - Full Stack Developer

- 💼 **LinkedIn**: [Connect with me on LinkedIn](https://linkedin.com/in/yourprofile)
- 📧 **Email**: Contact via GitHub issues
- 🐙 **GitHub**: [@alwayselse](https://github.com/alwayselse)

### 🛠️ Skills Demonstrated

- **Frontend Development**: React, JavaScript ES6+, CSS3, Responsive Design
- **Backend Development**: Python, FastAPI, RESTful APIs, Async Programming
- **Image Processing**: PIL/Pillow, Computer Vision, Algorithm Implementation
- **DevOps**: Application Architecture, Deployment, Performance Optimization
- **User Experience**: Intuitive UI/UX, Progressive Enhancement, Accessibility

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Nikhil | © 2025

</div>