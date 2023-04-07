---
id: home
title: R6MS 主页
hide_table_of_contents: false
sidebar_position: 100
slug: /r6ms

---

# Rainbow6: Minesiege 指南

export const Banner = ({text}) => (
  <div style={{
    backgroundColor: 'transparent',
    border: '3px solid #f07020',
    borderRadius: '12px',
    padding: '22px',
    textAlign: 'center',
    color: '#f07020',
    fontWeight: 'bold',
    fontSize: '32px',
  }}>
          {text.split('\\n').map((line, index) => {
        return (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        );
      })}
  </div>
);

<Banner text="准备好在TeaCon 2023中游玩预览版本，\n并获得L85A2 TeaCon2023独特涂装！" /><p></p>

欢迎查看R6MS指南！

Welcome to the R6MS Guidelines! 

I'm sorry, it is currently only available in Chinese. You can use browser translation instead.If you can't read Chinese, please contact the developers. Translation will not begin until the first foreigner's message is received.

---

Rainbow6: Minesiege（简称R6MS）受2020年偶然观看的一次直播启发，最初是希望探索出一种合理而有趣的方式来解决《彩虹六号：围攻》在中国大陆境内不允许直播的问题。

现在，经过两次重制，R6MS来到了第三个版本。我们希望在这个版本能够使玩家取得较为完整的体验，同时在设计上于原版Minecraft风格和《彩虹六号：围攻》风格之中取得平衡。

:::info

你可以在左侧侧边栏查看你感兴趣的内容。如果有任何疑问或建议，你可以在页面最下方找到我们的KOOK服务器地址。

由于指南按面向的阅读对象分节，某些内容可能需要跳转以获取完整信息。

:::

- 如果你是一名玩家，你需要阅读[玩家游玩指南](r6ms/player)、[跨服务器数据服务](r6ms/cross_server)和[统计数据收集说明](r6ms/data_collect)。
- 如果你是服务器管理员或服主，你还需要阅读[服务器管理员指南](r6ms/op)。
    - 如果你还想为你的服务器增加可供对战的地图，请阅读[地图制作指南](r6ms/map)。
- 有关反作弊的内容已被统一移至[反作弊](r6ms/anti_cheat)。

**指南内容随着模组规划与开发而更新，故请注意其中可能含有未发布的模组内容。**

R6MS在客户端和服务端都需要[T88](https://www.curseforge.com/minecraft/mc-mods/t88)作为前置。你通常可以直接下载最新版，也可以在各版本更新日志中找到推荐的T88版本。

---

R6MS模组[使用GPLv3协议进行许可](https://github.com/USS-Shenzhou/MC-R6mod)。对本指南保留所有权利。

*R6MS模组是一个粉丝项目，非《彩虹六号：围攻》官方产品。未获育碧许可，亦与育碧无任何关联。*

*《彩虹六号：围攻》商标及其内容的所有权及版权属于育碧。*

The R6MS mod is [licensed under the The GNU General Public License v3.0](https://github.com/USS-Shenzhou/MC-R6mod). All rights reserved for this R6MS Guidelines.

*THE RAINBOW6:MINESIEGE MOD IS A FAN-MADE PROJECT. NOT OFFICIAL RAINBOW SIX SIEGE PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH UBISOFT.*

*TOM CLANCY'S RAINBOW SIX SIEGE TRADEMARK AND ITS CONTENTS ARE OWNED AND COPYRIGHTED BY UBISOFT ENTERTAINMENT.*