import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue()],
  base: '/pokemon-adaptive-ui-experiment/',
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
}
