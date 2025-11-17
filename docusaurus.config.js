// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HoloJaneway',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans','en'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',*/
        },
        blog: false,/*{
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'HoloJaneway',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'holojaneway/0',
            position: 'left',
            label: 'Mod开发教程',
          },
          {
            type: 'doc',
            docId: 'madparticle/home',
            position: 'left',
            label: 'Mod使用指南',
          },
          {
            type: 'doc',
            docId: 'portfolio',
            position: 'left',
            label: 'Portfolio',
          },
          /*{
            type: 'doc',
            docId: 'r6ms/home',
            position: 'left',
            label: 'R6MS指南',
          },*/
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/USS-Shenzhou/HoloJaneway',
            label: '点个Star吧！',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'CurseForge',
            href: 'https://legacy.curseforge.com/members/uss_shenzhou/projects'
          },
          {
            label: 'Modrinth',
            href: 'https://modrinth.com/user/USS-Shenzhou'
          },
          {
            label: 'Discord',
            href:'https://discord.gg/kNbGdDXpSA'
          },
          {
            label: 'Bilibili',
            href:'https://space.bilibili.com/266675750'
          },
          {
            label: 'GitHub',
            href:'https://github.com/USS-Shenzhou'
          }
          /*{
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },*/
        ],
        // REMEMBER TO UPDATE I18N FOOTER.JSON
        copyright: `<font size="2">
        Copyleft ${new Date().getFullYear()} HoloJaneway, USS_Shenzhou. Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.
        </br><img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" class="w-full" style="width: 0.8rem;"><a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">川公网安备51112302000191号</a>
         | <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2023001090号-1</a>
        </br>HoloJaneway网站使用<a href="https://github.com/USS-Shenzhou/HoloJaneway/blob/main/LICENSE" target="_blank">MIT</a>许可证。
         | The HoloJaneway website is licensed under <a href="https://github.com/USS-Shenzhou/HoloJaneway/blob/main/LICENSE" target="_blank">MIT License</a>.
        </br>《HoloJaneway Mod开发教程》使用<a href="https://holojaneway.uss-shenzhou.cn/holojaneway/0.1" target="_self">CC BY-NC 4.0，BSD-3-Clause和GPLv3</a>许可证。
         | The HoloJaneway Mod Developing Tutorial is licensed under <a href="https://holojaneway.uss-shenzhou.cn/holojaneway/0.1" target="_self">CC BY-NC 4.0，BSD-3-Clause and GPLv3 License</a>.
        </br>USS_Shenzhou 对《Mod使用指南》中的所有内容保留所有权利。
         | All rights reserved for the Mod Usage Guidelines.
         </font>
        `,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['java','toml','gradle','json','cmake','powershell'],
      },
    }),
    markdown:{
      mermaid:true,
    },
    themes:['@docusaurus/theme-mermaid'],
};

module.exports = config;
