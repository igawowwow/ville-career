import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'

// public/CNAME があれば独自ドメイン配信(ルートパス)、
// なければ GitHub Pages のプロジェクトページ(/ville-career/)として配信する。
const hasCustomDomain = existsSync(new URL('./public/CNAME', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: hasCustomDomain ? '/' : '/ville-career/',
  plugins: [react()],
})
