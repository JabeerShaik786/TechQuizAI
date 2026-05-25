import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL?.replace(/\/+$/, '') || ''
  const apiOrigin = apiUrl.replace(/\/api$/, '')

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3001,
      host: '127.0.0.1',
      ...(apiUrl
        ? {
            proxy: {
              '/api': {
                target: apiOrigin,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path,
              },
            },
          }
        : {}),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
    },
  })
}
