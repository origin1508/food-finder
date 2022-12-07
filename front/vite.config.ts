import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const htmlPlugin = (env: ReturnType<typeof loadEnv>) => {
    return {
      name: 'html-transform',
      transformIndexHtml: {
        enforce: 'pre' as const,
        transform: (html: string): string =>
          html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
      },
    };
  };

  return {
    plugins: [react(), htmlPlugin(loadEnv(mode, '.'))],
    server: {
      proxy: {
        '/naverApi': {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/naverApi/, ''),
        },
      },
    },
  };
});
