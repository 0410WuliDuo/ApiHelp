module.exports = {
  port: "4000",
  title: "技术帮助文档",
  base: "/",
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "zh-CN",
      title: "吴的技术文档",
      description: "一款简洁的 Api 文档 主题。",
    },
  },
  theme: "reco",
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  themeConfig: {
    // 博客配置
    type: "blog",
    subSidebar: "auto", //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    mode: "dark", // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    // modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
    author: "代码超人",
    friendLink: [
      {
        title: "Vue",
        desc: "Vue外部链接地址",
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://cn.vuejs.org/",
      },
      {
        title: "课外资料",
        desc: "课外资料，你懂得！",
        email: "2208837540@qq.com",
        link: "https://www.bilibili.com/",
      },
    ],
    // 顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: "首页", link: "/" },

      //格式三：跳转至外部网页，需http/https前缀
      // { text: "Github", link: "https://github.com/CyanDong/-vuepress-" },
    ],
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认文案 “标签”
      },
      socialLinks: [
        // 信息栏展示社交信息
        // { icon: "reco-github", link: "https://github.com/recoluan" },
        { icon: "npm", link: "https://www.npmjs.com/" },
      ],
    },
    record: "技术帮助文档",
    recoThemeRecord: "2",
    recordLink: "/",
    // cyberSecurityRecord: "华通科技有限公司",
    // cyberSecurityLink: "/",
    // 项目开始时间，只填写年份
    startYear: "2023",
    noFoundPageByTencent: false,
  },
};
