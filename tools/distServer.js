// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';

// Run Browsersync
browserSync({
  port: 8000,
  ui: {
    port: 8001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: []
});
