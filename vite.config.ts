import { defineConfig } from 'vite'
import sharp from 'sharp'
import { readFile, writeFile, readdir } from 'fs/promises'
import path from 'path'

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
    },
    {
      name: 'webp-convert',
      closeBundle: async () => {
        const assetsDir = path.resolve('dist/assets')

        let files: string[]
        try {
          files = (await readdir(assetsDir)).filter(f => /\.(jpe?g|png)$/i.test(f))
        } catch {
          return
        }

        if (files.length === 0) return

        for (const file of files) {
          const input = path.join(assetsDir, file)
          const webpName = file.replace(/\.(jpe?g|png)$/i, '.webp')
          const output = path.join(assetsDir, webpName)

          try {
            await sharp(input)
              .webp({ quality: 65 })
              .toFile(output)
          } catch {
            // skip if conversion fails
          }
        }

        const htmlPath = path.resolve('dist/index.html')
        let html: string
        try {
          html = await readFile(htmlPath, 'utf-8')
        } catch {
          return
        }

        html = html.replace(
          /<img\s([^>]*?src="(\.?\/?assets\/[^"]+\.(jpe?g|png))"[^>]*?)>/gi,
          (_match, before, src) => {
            const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp')
            return `<picture><source srcset="${webpSrc}" type="image/webp">${_match}</picture>`
          }
        )

        await writeFile(htmlPath, html, 'utf-8')
      }
    }
  ],
})
