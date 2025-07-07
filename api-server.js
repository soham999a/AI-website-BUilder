#!/usr/bin/env node

// AI Website Builder API Server with Gemini Integration
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables manually
function loadEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
  } catch (error) {
    console.log('⚠️  No .env.local file found');
  }
}

loadEnvFile();

console.log('🚀 Starting AI Website Builder API Server...');
console.log('===============================================');

// Check for API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.log('⚠️  No Gemini API key found in .env.local');
  console.log('🔧 The server will run in demo mode');
} else {
  console.log('✅ Gemini API key loaded');
}

const PORT = process.env.PORT || 3000;

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

// Gemini API call function
async function callGeminiAPI(prompt, projectName) {
  if (!GEMINI_API_KEY) {
    throw new Error('No API key configured');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const systemPrompt = `You are an expert web developer. Create a complete, modern, responsive HTML website based on the user's description. 

Requirements:
- Generate a complete HTML document with embedded CSS and JavaScript
- Use modern CSS features like flexbox, grid, gradients, animations
- Make it fully responsive for all devices
- Include beautiful styling with smooth animations
- Use semantic HTML structure
- Add interactive elements where appropriate
- Use modern color schemes and typography
- Include proper meta tags and title

The website should be production-ready and visually stunning.

User's request: "${prompt}"
Project name: "${projectName}"

Generate only the HTML code, no explanations or markdown formatting.`;

  const requestBody = {
    contents: [{
      parts: [{
        text: systemPrompt
      }]
    }]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    let htmlContent = data.candidates[0].content.parts[0].text;
    
    // Clean up the response (remove markdown formatting if present)
    htmlContent = htmlContent.replace(/```html\n?/g, '').replace(/```\n?/g, '');
    
    return htmlContent;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // API endpoint for website generation
  if (pathname === '/api/generate' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { prompt, projectName } = JSON.parse(body);
        
        console.log(`🤖 Generating website: "${prompt}"`);
        
        const htmlContent = await callGeminiAPI(prompt, projectName);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          html: htmlContent,
          success: true 
        }));
        
        console.log('✅ Website generated successfully');
        
      } catch (error) {
        console.error('❌ Generation failed:', error.message);
        
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          error: error.message,
          success: false 
        }));
      }
    });
    
    return;
  }

  // Serve static files
  let filePath;
  if (pathname === '/') {
    filePath = path.join(__dirname, 'demo.html');
  } else {
    filePath = path.join(__dirname, pathname.substring(1));
  }

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
server.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }

  console.log(`🎉 AI Website Builder ready on http://localhost:${PORT}`);
  console.log('');
  console.log('🎯 Features:');
  console.log('   ✅ Real AI Website Generation (Gemini)');
  console.log('   ✅ Live Preview & Download');
  console.log('   ✅ Responsive Design');
  console.log('   ✅ Modern UI Components');
  console.log('');
  console.log('🚀 Try these prompts:');
  console.log('   • "Create a modern restaurant website with dark theme"');
  console.log('   • "Build a photography portfolio with image gallery"');
  console.log('   • "Make a tech startup landing page with pricing"');
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
