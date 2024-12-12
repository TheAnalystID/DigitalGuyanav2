export default {
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['./src/scripts/vendor.js'],
          main: ['./src/scripts/main.js']
        }
      }
    }
  },
  server: {
    open: true,
    cors: true
  }
}