// Polyfills for Node.js globals in the browser
// This needs to be loaded before any other scripts

if (typeof global === 'undefined') {
  window.global = window;
}

// The vite-plugin-node-polyfills will handle Buffer and process injection
// This file ensures global is available early