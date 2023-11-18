---
id: home
title: R6MS 主页
hide_table_of_contents: false
sidebar_position: 100
slug: /r6ms

---
import React from 'react';

# Rainbow6: Minesiege 指南


欢迎查看R6MS指南！

export const Banner = ({text}) => (
  <div style={{
    backgroundColor: 'transparent',
    border: '3px solid #3399ff',
    borderRadius: '12px',
    padding: '22px',
    textAlign: 'center',
    color: '#3399ff',
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

<Banner text="准备好在TeaCon 2024中游玩预览版本，\n并获得L85A2 TeaCon2024独特涂装！" /><p></p>

---

## 介绍

### 关于《我的六号》

*Rainbow6: Minesiege*（简称*R6MS*，中文名*《我的六号》*）模组受2020年偶然观看的一次游戏直播启发，目的是希望探索出一种合理而有趣的方式来解决《彩虹六号：围攻》在中国大陆境内不允许直播的问题。

现在，经过两次重写，R6MS来到了第三个版本。在这三到四年的时间里，我们极大地提高了模组开发的有关技能，结合对*Rainbow6:siege*以及*Minercaft*的热爱，这将是我们达成预期目标的有力保障。

我们希望在这个版本能够使玩家取得较为完整的体验，同时在设计上于原版MC风格和R6S风格之中取得平衡。

### 关于本指南

:::info

你可以在左侧侧边栏查看你感兴趣的内容。如果有任何疑问或建议，你可以在页面最下方找到我们的KOOK服务器地址。

由于指南按面向的阅读对象分节，某些内容可能需要跳转以获取完整信息。

:::

你可以选择先查看[常见问题解答](r6ms/faq)，也可以先查看下列具体内容。

- 所有使用本mod的玩家或服主都需要阅读[跨服务器数据服务](r6ms/cross_server)和[统计数据收集说明](r6ms/data_collect)。
- 如果你是一名玩家，你需要阅读[玩家游玩指南](r6ms/player)及其子章节。
- 如果你是服务器管理员或服主，你还需要阅读[服务器管理员指南](r6ms/op)。
    - 如果你还想为你的服务器增加可供对战的地图，请阅读[地图制作指南](r6ms/map)。
- 有关反作弊的内容已被统一移至[反作弊](r6ms/anti_cheat)。

**指南内容随着模组规划与开发而更新，故请注意其中可能含有未发布的模组内容。**

R6MS在客户端和服务端都需要[T88](https://www.curseforge.com/minecraft/mc-mods/t88)作为前置。你通常可以直接下载最新版，也可以在各版本更新日志中找到推荐的T88版本。

---

## 版权和许可信息（《我的六号》）

关于《我的六号》模组版权的完整及最新文本可以在[GitHub仓库](https://github.com/USS-Shenzhou/MC-R6mod)找到。以下仅是为方便起见的复制版本，以项目README文件为准。

### 本模组许可证

本模组使用双许可证。

- 对位于`/resources/`下的模型、图片、声音等美术资源文件，我们以CC BY-NC-SA 4.0许可证进行授权；
- 对以代码为主的其余文件，我们以GPLv3许可证进行授权。

#### 美术资源

[![知识共享许可协议](https://camo.githubusercontent.com/f05d4039b67688cfdf339d2a445ad686a60551f9891734c418f7096184de5fac/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792d6e632d73612f342e302f38387833312e706e67)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

本模组的美术资源文件采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/)进行许可。

**额外许可**

- a) 以下的“使用”指的是玩家在Minecraft多人游戏服务器内游玩时获取、与之互动、展示、渲染或播放对应的物品、实体或音效；也包括将前述过程录制为图片或视频，并以公开渠道展示。
- b) 如果你是Minecraft多人游戏服务器所有者，不论你的服务器是盈利还是非盈利性质的，也不论你的服务器是否接入了*Voyager*，本许可证授予你的服务器使用默认武器涂装所对应的模型和图片文件、以及声音文件等通用的美术资源的权利。
- c) 如果你是Minecraft多人游戏服务器所有者，且你的服务器接入了*Voyager*，在向开发者支付事先约定的费用的前提下（如果存在），本许可证授予你的服务器在公开渠道售卖模组提供的指定武器涂装的权利，也授予你的服务器使用玩家拥有的武器涂装所对应的模型和图片文件的权利。

#### 代码和其余文件

Copyright 2023 USS_Shenzhou

本模组是自由软件，你可以再分发之和/或依照由自由软件基金会发布的 GNU 通用公共许可证修改之，无论是版本 3 许可证，还是（按你的决定）任何以后版都可以。

发布这个软件是希望它能有用，但是并无保障；甚至连可销售和符合某个特定的目的都不保证。请参看 GNU 通用公共许可证，了解详情。

**附加条款**

根据GNU GPL版本3第7节所述，对协议补充如下：

- a) 作为Minecraft模组的额外授权：如果你通过连接或合并Minecraft修改该程序或者其任何部分，而受到该库许可证（即Minecraft EULA）条款的制约，本程序的许可证授权你输送修改结果的额外权利。修改结果的非源代码形式的相关源代码应当包含本软件的源代码部分。
- b) 如果你对本软件进行了修改，你在转发修改后的版本时，应当明确说明其修改自本软件，并说明本软件开发者不对修改后的版本提供任何保证。不得使用本软件任一开发者或本软件的的名义来宣传修改后的版本。

### 其他开源信息

1. 模组中有关改变玩家动作的部分，包括`cn.ussshenzhou.rainbow6.action`包、其他与`Action`有关的类，是在GPLv3下，受[跑酷](https://github.com/alRex-U/ParCool)模组启发、从其复制和由其演绎。
2. 模组中有关枪械的部分，包括`cn.ussshenzhou.rainbow6.gun`包，其他与枪械有关的类，是在GPLv3下，受[MrCrayfish's Gun Mod](https://github.com/MrCrayfish/MrCrayfishGunMod)模组和/或[Timeless and Classics Guns](https://github.com/ClumsyAlien/TimelessandClassics_Reforged)模组启发、从其复制和由其演绎。

### 其他版权信息

***这是一个粉丝项目，非《彩虹六号：围攻》官方产品。未获育碧许可，亦与育碧无任何关联。***

***《彩虹六号：围攻》商标及其内容的所有权及版权属于育碧。***

---

## 版权和许可信息（本指南）

*USS_Shenzhou*对本指南的文本内容保留所有权利。本网站的框架及代码使用MIT许可证。