import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
    port: 5173
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari17',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    outDir: './dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shuffle: resolve(__dirname, 'assets/table-list/shuffle.html'),
        kontrolPaneli: resolve(__dirname, 'assets/academy-control-panel/kontrol_paneli.html'),
        studentControlPanel: resolve(__dirname, 'assets/student-control-panel/student-control-panel.html'),
        menu: resolve(__dirname, 'assets/menu-panel/menu.html'),
        studentMenu: resolve(__dirname, 'assets/menu-panel/studentMenu.html')
      }
    }
  },
})
