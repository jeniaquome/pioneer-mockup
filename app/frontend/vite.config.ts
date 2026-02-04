import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, HmrContext, Plugin } from "vite"

const HotReloadImages = () => ({
  name: 'hot-reload-images',
  handleHotUpdate({file, server}: HmrContext) {
      if (file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          server.ws.send({
              type: 'full-reload',
              path: '*'
          });
      }
  },
})

// Plugin to inject social media meta tags with dynamic URLs
const SocialMetaTagsPlugin = (): Plugin => {
  return {
    name: 'social-meta-tags',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, ctx) {
        // For build: use production URL or env variable
        if (ctx.server === undefined) {
          const baseUrl = process.env.VITE_SITE_BASE_URL || 'https://www.pittsburghpioneer.com'
          const imageUrl = `${baseUrl}/branding/assets/logo-og.png`
          return html
            .replace(/<meta property="og:image" content=""/g, `<meta property="og:image" content="${imageUrl}"`)
            .replace(/<meta property="og:url" content=""/g, `<meta property="og:url" content="${baseUrl}"`)
            .replace(/<meta name="twitter:image" content=""/g, `<meta name="twitter:image" content="${imageUrl}"`)
            .replace(/<meta property="twitter:domain" content=""/g, `<meta property="twitter:domain" content="${new URL(baseUrl).hostname}"`)
            .replace(/<meta property="twitter:url" content=""/g, `<meta property="twitter:url" content="${baseUrl}"`)
        }
        return html
      }
    },
    configureServer(server) {
      // Intercept HTML responses and inject URLs based on request origin
      server.middlewares.use((req, res, next) => {
        // Only process root path requests
        if (req.url !== '/' && req.url !== '/index.html') {
          return next()
        }
        
        const originalEnd = res.end.bind(res)
        const chunks: Buffer[] = []
        
        // Capture response chunks
        const originalWrite = res.write.bind(res)
        // @ts-ignore - Middleware interception of response methods
        res.write = function(chunk: any): boolean {
          if (chunk) chunks.push(Buffer.from(chunk))
          return true
        }

        // @ts-ignore - Middleware interception of response methods
        res.end = function(chunk?: any): void {
          if (chunk) chunks.push(Buffer.from(chunk))

          // Transform HTML
          try {
            const html = Buffer.concat(chunks).toString('utf-8')
            const protocol = req.headers['x-forwarded-proto'] === 'https' ||
                             (req.socket as any)?.encrypted ? 'https' : 'http'
            const host = req.headers.host || 'localhost:3000'
            const origin = `${protocol}://${host}`
            const hostname = host.split(':')[0]
            const imageUrl = `${origin}/branding/assets/logo-og.png`

            const transformed = html
              .replace(/<meta property="og:image" content=""/g, `<meta property="og:image" content="${imageUrl}"`)
              .replace(/<meta property="og:url" content=""/g, `<meta property="og:url" content="${origin}"`)
              .replace(/<meta name="twitter:image" content=""/g, `<meta name="twitter:image" content="${imageUrl}"`)
              .replace(/<meta property="twitter:domain" content=""/g, `<meta property="twitter:domain" content="${hostname}"`)
              .replace(/<meta property="twitter:url" content=""/g, `<meta property="twitter:url" content="${origin}"`)

            res.setHeader('Content-Length', Buffer.byteLength(transformed))
            originalWrite(transformed)
            originalEnd()
          } catch (e) {
            // If transformation fails, send original
            chunks.forEach(chunk => originalWrite(chunk))
            originalEnd()
          }
        }
        
        next()
      })
    }
  }
}

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    allowedHosts: true, // Enables access from any host
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react(), HotReloadImages(), SocialMetaTagsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
