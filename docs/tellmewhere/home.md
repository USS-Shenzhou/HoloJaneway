---
id: home
title: Tell Me Where使用指南
description: Tell Me Where使用指南
hide_table_of_contents: false

---

# Tell Me Where使用指南

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

欢迎查看Tell Me Where使用指南！

---

## 指示牌

Tell Me Where提供形态各异的指示牌方块，你可以在其中编写你想要的指示内容。

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

Tell Me Where使用自适应缩放。当内容长度短于指示牌长度时，不会进行任何缩放。

当内容长度长于指示牌长度时，Tell Me Where将会按照以下顺序尝试缩放内容以避免溢出：

1. 仅压缩文字宽度。标志的大小不会发生变化，而文字宽度会被逐渐压缩直至特定倍数。

   若游戏语言为中文，这个阈值倍数为0.7；对于其他语言，这个阈值倍数为0.7。

3. 整体缩小至不发生溢出为止。



## 标志

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



## 颜色

Tell Me Where的指示牌均使用纯黑色背景，并默认使用纯白色文字。

### 标志的颜色

参考`ISO 3864-4:2011`，Tell Me Where的四种标准颜色及其对应RGB为：

- **<font color="#BC2221">红色</font>**：#BC2221
- **<font color="#FBC30A">黄色</font>**：#FBC30A
- **<font color="#237F52">绿色</font>**：#237F52
- **<font color="#005387">蓝色</font>**：#005387
