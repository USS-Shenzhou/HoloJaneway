// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
    locales: ['zh-Hans'],
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
        title: 'Holo Janeway',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'holojaneway/0',
            position: 'left',
            label: 'Mod??????',
          },
          {
            type: 'doc',
            docId: 'madparticle/home',
            position: 'left',
            label: 'MadParticle',
          },
          {
            type: 'doc',
            docId: 'r6ms/home',
            position: 'left',
            label: 'R6MS',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/USS-Shenzhou/HoloJaneway',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'KOOK',
            href:'https://kook.top/Bu1WLb'
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
        //copyright: `Copyright ?? ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        copyright: `<font size="2">
        Copyright ?? ${new Date().getFullYear()} Holo Janeway, USS_Shenzhou. Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.
         | <a href="https://beian.miit.gov.cn" target="_blank">???ICP???2023001090???-1</a>
        </br>Holo Janeway????????????<a href="https://github.com/USS-Shenzhou/HoloJaneway/blob/main/LICENSE" target="_blank">MIT??????</a>?????????
         | The Holo Janeway website is licensed under <a href="https://github.com/USS-Shenzhou/HoloJaneway/blob/main/LICENSE" target="_blank">MIT License</a>.
        </br>???Holo Janeway mod?????????????????????<a href="https://holojaneway.uss-shenzhou.cn/holojaneway/0.1" target="_self">CC BY-NC 4.0?????????BSD-3-Clause?????????GPLv3??????</a>?????????
         | The Holo Janeway Mod Developing Tutorial is licensed under <a href="https://holojaneway.uss-shenzhou.cn/holojaneway/0.1" target="_self">CC BY-NC 4.0???BSD-3-Clause and GPLv3 License</a>.
        </br>USS_Shenzhou ??????MadParticle ???????????????R6MS ??????????????????????????????
         | All rights reserved for the MadParticle Guidelines and the R6MS Guidelines.
         </font>
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java','toml','gradle'],
      },
    }),
};

module.exports = config;
