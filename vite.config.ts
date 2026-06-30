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
      // 切换到 yishuzi.cn(yishuzi.org 服务器宕机)
      // 正确的图片 API 路径为 /zhuanti/image.png
      '/seal-api': {
        target: 'https://www.yishuzi.cn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/seal-api/, ''),
        // 代理超时:15 秒无响应则返回错误,触发前端 onError 回退
        timeout: 15000,
        proxyTimeout: 15000,
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
