---
id: home
title: Tell Me Where使用指南
description: Tell Me Where使用指南
hide_table_of_contents: false

---

# Guide Me To使用指南

<div style={{
    backgroundColor: 'transparent',
    border: '5px solid #cccccc',
    padding: '0rem',
    'padding-top':'0rem',
    color: '#fffffff',
    fontSize: '28px',
    textAlign: 'center',
    'background-color':'#000000',
    'white-space': 'nowrap',
  }}>
<div style={{
    float:'left',
    textAlign: 'left',
  }}>
<img src={require('./assets/std_left_up.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
<img src={require('./assets/exit.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
</div>
<div style={{
    textAlign: 'right',
  }}>
<text style={{'vertical-align':'middle',color: '#f07020',fontWeight: 1000,}}>|</text>
<text style={{'vertical-align':'middle',color: '#ffffff'}}>&nbsp;2号线&nbsp;</text>
<text style={{'vertical-align':'middle',color: '#3399ff',fontWeight: 1000,}}>|</text>
<text style={{'vertical-align':'middle',color: '#ffffff'}}>&nbsp;4号线&nbsp;</text>
<img src={require('./assets/std_right.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
</div>
</div>
<p></p>

欢迎查看Guide Me To使用指南！

:::info

**Tell Me Where**在正式版本已更名为**Guide Me To**。以下简称GMT。

:::

Guide Me To提供形态各异的指示牌方块，你可以在其中编写你想要的指示内容。GMT的设计指导思想是：

- 提供（视觉和语义上）清晰易读的指示牌，（基础指示牌）在通常分辨率和FOV下拥有16m及以上的可读距离；
- 为此单方块仅支持单行文本（绝对不是懒得写多行）；
- 在此基础上尽可能适应各种不同风格的场景；

要查看指示牌的使用方法，请转到[这里](signblock)。

## 图文混写

借助文本形式存储和渲染前预“编译”，GMT支持图文混写。

:::tip

GMT也支持原版的格式化代码，即使用分节符`§`来控制文字样式。

:::

在纯文本形式下，图片以前缀`&@`+`图片id`形式表现。

:::info

图片id固定为两位36进制数。这使得GMT最大可以支持1296个标志。

:::

### 标志

Tell Me Where默认提供两套标志合集：

- “标准”：标准、清晰、准确的标志。主要参考来源有：
  - 北京地铁导向标志；
  - `GB/T 10001` 标志用公共信息图形符号。
- “Google”：更加现代、轻量的标志，可读性可能略差一些。来自[Google Material Symbols](https://fonts.google.com/icons)，使用[Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)许可。

这些标志的颜色按照下文的规定进行标准化。

参考`ISO 3864-1:2011`和`GB 2894-2008`，Tell Me Where的指示标志分为以下几类：

- **<font color="#237F52">提示标志</font>**或**指示标志**：提供某种信息的图形标志；
- **<font color="#BC2221">禁止标志</font>**：禁止不安全行为的图形标志；
- **<font color="#FBC30A">警告标志</font>**：提醒对周围环境引起注意的图形标志；
- **<font color="#005387">指令标志</font>**：强制做出某种动作或措施的图形标志。

#### 颜色

Tell Me Where的指示牌均使用纯黑色背景，并默认使用纯白色文字。

参考`ISO 3864-4:2011`，Tell Me Where的四种标准颜色及其对应RGB为：

- **<font color="#BC2221">红色</font>**：#BC2221
- **<font color="#FBC30A">黄色</font>**：#FBC30A
- **<font color="#237F52">绿色</font>**：#237F52
- **<font color="#005387">蓝色</font>**：#005387

## 国际化

GMT提供原生国际化支持。

在方块实体同步时，服务端会将所有可用语言内容发送至客户端，供客户端自行选择显示的内容。

想要为指示牌添加多种语言，只需要在指示牌编辑界面的`language`输入框中输入语言代码，点击`create`，即创建对应的编辑页面。
