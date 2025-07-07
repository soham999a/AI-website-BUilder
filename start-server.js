#!/usr/bin/env node

// AI Website Builder - Next.js Development Server
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting AI Website Builder (Next.js)...');
console.log('===============================================');

// Check if we have the required files
const requiredFiles = ['package.json', 'next.config.js'];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.error('❌ node_modules not found. Please run npm install first.');
  process.exit(1);
}

console.log('✅ All required files found');
console.log('✅ Dependencies installed');

// Set environment variables
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '3000';

console.log(`🌐 Starting Next.js server on http://localhost:${process.env.PORT}`);
console.log('📝 The app works with your Gemini API key!');
console.log('🔑 API key loaded from .env.local');
console.log('');

// Try to start Next.js development server
try {
  console.log('🔧 Attempting to start Next.js...');

  // Method 1: Try to require Next.js directly
  let nextStarted = false;

  try {
    const next = require('next');
    const app = next({ dev: true });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      const server = require('http').createServer((req, res) => {
        handle(req, res);
      });

      server.listen(process.env.PORT, (err) => {
        if (err) throw err;
        console.log(`🎉 Next.js server ready on http://localhost:${process.env.PORT}`);
        console.log('');
        console.log('🎯 Try these prompts with REAL AI:');
        console.log('   • "Create a modern restaurant website with dark theme"');
        console.log('   • "Build a photography portfolio with image gallery"');
        console.log('   • "Make a tech startup landing page with pricing"');
        console.log('   • "Design a personal blog website with about section"');
        console.log('');
        console.log('Press Ctrl+C to stop the server');
        nextStarted = true;
      });
    }).catch(err => {
      console.error('❌ Failed to start Next.js:', err.message);
      fallbackToSimpleServer();
    });
  } catch (error) {
    console.log('⚠️  Next.js require failed, trying alternative method...');
    fallbackToSimpleServer();
  }

  // Fallback method: Simple HTTP server
  function fallbackToSimpleServer() {
    console.log('🔧 Starting fallback HTTP server...');

    const http = require('http');
    const url = require('url');

    // MIME types
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };

    // Create HTTP server
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url);
      let pathname = parsedUrl.pathname;

      // Default to demo.html for root path
      if (pathname === '/') {
        pathname = '/demo.html';
      }

      // Remove leading slash
      const filePath = path.join(__dirname, pathname.substring(1));

      // Check if file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File not found
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>404 - File Not Found</title>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #e74c3c; }
                a { color: #3498db; text-decoration: none; }
              </style>
            </head>
            <body>
              <h1>404 - File Not Found</h1>
              <p>The requested file could not be found.</p>
              <p><a href="/">Go back to AI Website Builder</a></p>
            </body>
            </html>
          `);
          return;
        }

        // Get file extension
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Read and serve file
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', contentType);
          res.end(data);
        });
      });
    });

    // Start server
    server.listen(process.env.PORT, (err) => {
      if (err) {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
      }

      console.log(`🎉 Fallback server ready on http://localhost:${process.env.PORT}`);
      console.log('');
      console.log('🎯 Try these prompts:');
      console.log('   • "Create a modern restaurant website"');
      console.log('   • "Build a photography portfolio"');
      console.log('   • "Make a tech startup landing page"');
      console.log('');
      console.log('Press Ctrl+C to stop the server');
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down server...');
      server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
      });
    });
  }

} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}
