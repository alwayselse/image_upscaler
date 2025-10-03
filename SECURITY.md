# Security Policy

## 🔒 Security Features

This project implements several security measures to ensure safe operation:

### Authentication & Authorization
- **Rate Limiting**: Maximum 10 requests per minute per IP address
- **CORS Restrictions**: Only allows requests from localhost:3000
- **Host Binding**: Server only binds to localhost (127.0.0.1) for development

### Input Validation
- **File Type Validation**: Only accepts JPEG, PNG, and WebP images
- **File Size Limits**: Maximum 10MB per upload
- **MIME Type Checking**: Verifies actual file content matches extension
- **Dimension Limits**: Maximum output size of 4000x4000 pixels

### Security Headers
- **X-Content-Type-Options**: `nosniff` - Prevents MIME sniffing
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-XSS-Protection**: `1; mode=block` - Enables XSS filtering
- **Strict-Transport-Security**: Enforces HTTPS in production
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information

### Data Protection
- **Memory Management**: Efficient handling of image data without persistence
- **No Data Storage**: Images are processed in memory and not saved to disk
- **Temporary File Cleanup**: All processing happens in memory buffers

## 🚨 Reporting Security Vulnerabilities

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email the maintainer directly at: [your-email@example.com]
3. Provide detailed information about the vulnerability
4. Allow reasonable time for response and resolution

## 🛡️ Security Best Practices for Deployment

### Development Environment
- Use the provided startup scripts (already configured securely)
- Only run on localhost for development
- Keep dependencies updated

### Production Deployment
```bash
# Use a proper WSGI server
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker

# Enable HTTPS
# Use reverse proxy (nginx, Apache) with SSL certificates
# Implement proper logging and monitoring
# Use environment variables for configuration
# Set up firewall rules
```

### Environment Variables
```bash
# Recommended production settings
export ENVIRONMENT=production
export LOG_LEVEL=warning
export MAX_FILE_SIZE=5242880  # 5MB for production
export RATE_LIMIT_REQUESTS=5   # Lower rate limit for production
```

## 📋 Security Checklist

- ✅ Input validation and sanitization
- ✅ Rate limiting implemented
- ✅ Secure headers configured
- ✅ CORS properly restricted
- ✅ No sensitive data logging
- ✅ Memory-safe image processing
- ✅ Host binding restricted to localhost
- ✅ File type and size validation
- ✅ Error handling without information disclosure

## 🔄 Security Updates

This project follows semantic versioning. Security updates will be:
- **Patch releases** (x.x.X) for security fixes
- **Minor releases** (x.X.x) for security enhancements
- Documented in the [CHANGELOG.md](CHANGELOG.md)

## ⚖️ Responsible Disclosure

We appreciate security researchers and users who report vulnerabilities responsibly. We commit to:
- Acknowledging receipt within 48 hours
- Providing regular updates on progress
- Crediting reporters (with permission) in release notes
- Coordinating disclosure timing

---

**Last Updated**: October 2025  
**Security Contact**: [your-email@example.com]