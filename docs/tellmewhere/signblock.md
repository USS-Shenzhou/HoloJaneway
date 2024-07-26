---
id: signblock
title: 指示牌方块
description: 指示牌方块
hide_table_of_contents: false


---



# 指示牌方块

:::tip

只有指示牌中的纯文字部分使用动态渲染（BER），其余图片、背景、壳体均采用`ChunkBuffer`进行高效渲染。你可以想放多少指示牌就放多少。

:::

## 使用

:::info

我们事先约定，将指示牌放置于世界中，面向放置者、有黑色背景的一面为**正面**。东西方向（或是南北方向）是**平行**的。

:::

放下指示牌后，右键单击指示牌正面即可打开指示牌编辑界面。

:::info

### 指示牌编辑界面

右侧为标志选取区域，左上侧为主编辑区，左下侧为国际化编辑区。

单击你想要的标志，即可在光标所在处插入图像代码，同时在上方显示预览。

**编辑完成后，别忘了点击*完成* ！**

:::

手持完整方块（对应的物品）右击指示牌侧面或背面可以为指示牌设置外观。应用外观时会使用手持方块的默认`BlockState`。

在现有指示牌的侧面放下平行的同一种指示牌，显示区域会自动连接。在这情况下，显示的内容由最左侧（面向显示区域）的指示牌决定。当正面右击这一排指示牌中的任意一个时，总是会打开最左侧指示牌的编辑界面。

:::tip

你可以在放下一排指示牌后，绕到后方重新放置最左侧的指示牌，这样就可以有一个双面指示牌了！

:::

## 选取

GMT提供形态各异的各种指示牌变体。

最基础的指示牌是`挂式 薄`指示牌，拥有8像素（在x16材质下）的屏幕宽度，适用于各种场合。

如果你想提高指示牌的可用距离，或是显示一些特别重要的内容，你可以选择`宽`变体，拥有14像素的屏幕宽度，或许不够美观但足够醒目。

`窄`变体只有4像素的屏幕宽度，建议仅作为导流带，或是狭小空间近距离指示用。

## 内容

### 排列

需要时在同一块指示牌上表表示不同方向的内容时，内容排列应遵循以下原则：

1. 指示方向的标志应当放置在实际方向的对应处。以左侧为例，各方向的优先级为：

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
    textAlign: 'center',
  }}>
	<img src={require('./assets/left_down.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
	<img src={require('./assets/left_up.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/left.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/up_then_left.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/back_left.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/down.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/bypass_left.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/up.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
</div>
</div>
<p></p>

2. 指示方向的标志应当放置在对应内容的外侧，如指南开头所示。
3. 提示标志应放在文字左侧：

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
    <img src={require('./assets/left_up.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <img src={require('./assets/takeoff.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <text style={{'vertical-align':'middle',color: '#ffffff'}}>国内出发</text>
</div>
<div style={{
    textAlign: 'right',
  }}>
    <img src={require('./assets/land.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
    <text style={{'vertical-align':'middle',color: '#ffffff'}}>国内到达</text>
    <img src={require('./assets/right.png').default} alt="madparticle" style={{zoom:0.4, 'vertical-align':'middle'}} />
</div>
</div>



<p></p>

4. 不同方向的对应内容相邻排列时，应当在两组内容之间以（多个）空格、分隔线或其他适当方式分开。



为保证可读性，指示牌内容不支持换行。

### 彩色文字

像其他游戏内文本一样，你可以使用格式化代码`§`来控制文字的形态和颜色。

除非用于指示线路，彩色文字的使用应当尽量少。一般情况下，在已经使用了彩色标志的情况下，不建议使用彩色文字。

### 布局

指示牌内容自动居中。

### 缩放

GMT有一定的自适应缩放。当内容长度短于指示牌长度时，不会进行任何缩放。

当内容长度长于指示牌长度时，GMT将会按照以下顺序尝试缩放内容以避免溢出：

1. 仅压缩文字宽度。标志的大小不会发生变化，而文字宽度会被逐渐压缩直至特定倍数。
    若游戏语言为中文，这个阈值倍数为0.7；对于其他语言，这个阈值倍数为0.6。
2. 整体缩小至不发生溢出为止。

