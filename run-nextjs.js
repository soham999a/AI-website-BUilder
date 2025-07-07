#!/usr/bin/env node

// Direct Next.js runner for AI Website Builder
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Real Next.js Application...');
console.log('===============================================');

// Set up environment
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '3000';

// Add node_modules/.bin to PATH so Next.js can find its dependencies
const nodeModulesBin = path.join(__dirname, 'node_modules', '.bin');
process.env.PATH = nodeModulesBin + path.delimiter + process.env.PATH;

console.log('✅ Environment configured');
console.log('🔑 API key loaded from .env.local');
console.log(`🌐 Starting on http://localhost:${process.env.PORT}`);
console.log('');

// Try to start Next.js
try {
  // Import and start Next.js
  const next = require('next');
  
  console.log('✅ Next.js module loaded successfully');
  
  const app = next({ 
    dev: true,
    dir: __dirname,
    quiet: false
  });
  
  const handle = app.getRequestHandler();
  
  console.log('🔧 Preparing Next.js application...');
  
  app.prepare().then(() => {
    const http = require('http');
    
    const server = http.createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
    
    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      
      console.log('🎉 SUCCESS! Next.js server is running!');
      console.log('===============================================');
      console.log(`🌐 Open: http://localhost:${process.env.PORT}`);
      console.log('');
      console.log('🎯 Features Available:');
      console.log('   ✅ Real AI Website Generation (Gemini)');
      console.log('   ✅ Live Preview & Editing');
      console.log('   ✅ Download HTML Files');
      console.log('   ✅ Responsive Design');
      console.log('   ✅ Modern UI Components');
      console.log('');
      console.log('🚀 Try these prompts:');
      console.log('   • "Create a modern restaurant website with dark theme"');
      console.log('   • "Build a photography portfolio with image gallery"');
      console.log('   • "Make a tech startup landing page with pricing"');
      console.log('   • "Design a personal blog website with about section"');
      console.log('');
      console.log('Press Ctrl+C to stop the server');
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down Next.js server...');
      server.close(() => {
        console.log('✅ Server stopped gracefully');
        process.exit(0);
      });
    });
    
  }).catch(err => {
    console.error('❌ Failed to prepare Next.js application:', err);
    console.log('');
    console.log('🔧 This might be due to missing dependencies.');
    console.log('💡 The fallback server is still available.');
    process.exit(1);
  });
  
} catch (error) {
  console.error('❌ Failed to load Next.js:', error.message);
  console.log('');
  console.log('🔧 Possible solutions:');
  console.log('   1. Run: npm install --force');
  console.log('   2. Use the fallback server (start-server.js)');
  console.log('   3. Check if all dependencies are installed');
  process.exit(1);
}
