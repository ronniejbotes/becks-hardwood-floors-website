import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `ssgOptions` is consumed by vite-react-ssg, not by Vite itself, so it is not
 * part of Vite's own `UserConfig` type. Widening the type here keeps the rest
 * of the config type-checked instead of casting the whole object to `any`.
 */
type SsgUserConfig = UserConfig & {
  ssgOptions?: {
    script?: 'sync' | 'async' | 'defer' | 'async defer'
    dirStyle?: 'flat' | 'nested'
    formatting?: 'prettify' | 'none'
    entry?: string
  }
}

const config: SsgUserConfig = {
  plugins: [react()],
  ssgOptions: {
    script: 'defer',
    // 'nested' emits /refinishing/index.html so the canonical URL is a clean
    // directory path. Apache on Hostinger serves that with no rewrite rules.
    dirStyle: 'nested',
    // Prettifying the emitted HTML changes whitespace and breaks hydration.
    formatting: 'none',
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
}

export default config
