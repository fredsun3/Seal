import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署在 /Seal/ 子路径下,需设置 base
  base: '/Seal/',
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      // 代理篆体图片生成 API,避免跨域与混合内容问题(仅开发环境)
      '/seal-api': {
        target: 'http://www.yishuzi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/seal-api/, ''),
      },
    },
  },
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths()
  ],
})
