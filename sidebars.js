/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  // But you can create a sidebar manually
  holojaneway:[
    'holojaneway/-6',
    'holojaneway/-5',
    'holojaneway/-3',
    {
      type: 'category',
      label: '-2 杂项',
      link: {type: 'doc', id: 'holojaneway/-2'},
      items: [
        'holojaneway/-2.1',
        'holojaneway/-2.2'
      ],
    },
    {
      type: 'category',
      label: '-1 附件',
      link: {type: 'doc', id: 'holojaneway/-1'},
      items: ['holojaneway/-1.1'],
    },
    'holojaneway/-0',
    {
      type: 'category',
      label: '0 绪论',
      link: {type: 'doc', id: 'holojaneway/0'},
      items: ['holojaneway/0.1', 'holojaneway/0.2',],
    },
    'holojaneway/1',
    'holojaneway/2',
    {
      type: 'category',
      label: '3 方块实体',
      link: {type: 'doc', id: 'holojaneway/3'},
      items: ['holojaneway/3.1',],
    },
    'holojaneway/4',
    'holojaneway/5',
    'holojaneway/6',
    'holojaneway/7',
    'holojaneway/8',
    'holojaneway/9',
    'holojaneway/∞',
    {
      type: 'category',
      label: 'i T88使用文档',
      link: {type: 'doc', id: 'holojaneway/i'},
      items: [
        'holojaneway/1.1i',
        'holojaneway/1.2i',
        'holojaneway/1.3i',
        'holojaneway/1.4i',
        'holojaneway/1.5i',
        'holojaneway/1.6i',
        'holojaneway/1.7i'
        ],
    }
  ],
  madparticle:[
    {
      type: 'category',
      label: 'Mad Particle指南',
      link: {type: 'doc', id: 'madparticle/home'},
      items: [
        'madparticle/command',
        'madparticle/meta',
        'madparticle/designer',
        'madparticle/config',
        'madparticle/misc',
        'madparticle/faq',
        'madparticle/dev'
      ],
    },
    /*{
      type: 'category',
      label: 'Rawinbow6 Minesiege指南',
      link: {type: 'doc', id: 'r6ms/home'},
      items: [
        'r6ms/faq',
        {
          type: 'category',
          label: '玩家游玩指南',
          link: {type: 'doc', id: 'r6ms/player'},
          items: [
            'r6ms/player_match',
            'r6ms/player_option'
          ],
        },
        'r6ms/op',
        'r6ms/map',
        'r6ms/cross_server',
        'r6ms/anti_cheat',
        {
          type: 'category',
          label: 'Voyager',
          link: {type: 'doc', id: 'r6ms/voyager_home'},
          items: [
            'r6ms/voyager_eula', 'r6ms/data_collect',
          ],
        },
        {
          type: 'category',
          label: '更新日志',
          collapsed: true,
          items: [
            'r6ms/update_log/1.0.0'
          ],
        }
        ],
    },*/
    {
      type: 'category',
      label: 'Tell Me Where指南',
      link: {type: 'doc', id: 'tellmewhere/home'},
      items: [
        'tellmewhere/signblock'
        ],
    },
  ],
};

module.exports = sidebars;
