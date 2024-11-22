import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

const base = process.env.NODE_ENV === 'development' ? '/' : '/ancient-chinese-website/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  outDir: './dist',
  title: "古汉语词典在线网站",
  description: "一个古汉语在线网站",
  head: [
    // 引入自定义的 CSS 文件
    ['link', { rel: 'stylesheet', href: './style.css' }],
    [
      'script', { type: 'text/javascript', src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],
    search: {
      provider: 'local',
    },
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eveningwater/ancient-chinese-website/' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2014-present eveningwater(夕水)'
    }
  }
})