import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  }), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/common') },
      { find: '@apis', replacement: path.resolve(__dirname, 'src/common/apis') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/common/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/common/components') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/common/constants') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/common/hooks') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/common/styles') },
      { find: '@type', replacement: path.resolve(__dirname, 'src/common/type') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/common/utils') },
    ],
  },
})
