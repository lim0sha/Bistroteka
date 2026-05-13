import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'remove-crossorigin',
      transformIndexHtml: {
        order: 'post',
        handler(html: string) {
          return html.replace(/(<script[^>]*) crossorigin/g, '$1')
                   .replace(/(<link[^>]*rel="stylesheet"[^>]*) crossorigin/g, '$1')
        }
      }
    }
  ],
})
