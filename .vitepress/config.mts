import { defineConfig } from "vitepress";
import { sidebar } from "./sidebar.mts";

// github pages: /ancient-chinese-website/
// vercel.com: /
const base =
  process.env.NODE_ENV === "development" ? "/" : "/ancient-chinese-website/";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  outDir: "./ancient-chinese-website",
  title: "古汉语词典在线网站",
  description: "一个古汉语在线网站",
  head: [
    // 引入自定义的 CSS 文件
    ["link", { rel: "stylesheet", href: `${base}style.css` }],
    // 字节字体样式文件
    [
      "link",
      {
        rel: "stylesheet",
        href: `https://lf3-static.bytednsdoc.com/obj/eden-cn/ipsaulpjuh_yzj_zlp/ljhwZthlaukjlkulzlp/sy-fonts/css/font_v2.css`,
      },
    ],
    [
      "script",
      {
        type: "text/javascript",
        src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "在线字典", link: "/docs/A/a" },
      { text: "文言文示例", link: "/example/韩愈/进学解" },
      { text: "古文观止", link: "/archaism/卷一·周文一/郑伯克段于鄢" },
      {
        text: "关于个人",
        items: [
          {
            text: "大学课程",
            link: "https://eveningwater.github.io/undergraduate-course/",
          },
          {
            text: "个人小说",
            link: "https://www.eveningwater.com/novel-website/index.html",
          },
          {
            text: "个人诗词",
            link: "https://eveningwater.github.io/my-poem-website",
          },
          {
            text: "诗意出生",
            link: "https://www.eveningwater.com/birth-poem/index.html",
          },
        ],
      },
      {
        text: "其它",
        items: [
          { text: "识典古籍", link: "https://www.shidianguji.com/" },
          { text: "抖音汉语", link: "https://m.douyinhanyu.com/search/" },
          {
            text: "其它字典网站",
            link: "https://nwilb2.smartapps.cn/pages/zi/zi?wd=26a33",
          },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    sidebar,

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/eveningwater/ancient-chinese-website/",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present eveningwater(夕水)",
    },
  },
  markdown: {
    config: (md) => {
      md.renderer.rules.text = (tokens, idx) => {
        const text = tokens[idx].content;

        const transformedText = text.replace(
          /o\s*([\u4e00-\u9fa5])\s*o/g,
          (_match, p1) => `<span class="char-circle">${p1}</span>`
        );
        const transformedReadText = transformedText.replace(
          /read\s+(.*?)\s+read/g,
          (_match, p1) => `<ac-read-text>${p1}</ac-read-text>`
        );

        return transformedReadText;
      };
    },
  },
});
