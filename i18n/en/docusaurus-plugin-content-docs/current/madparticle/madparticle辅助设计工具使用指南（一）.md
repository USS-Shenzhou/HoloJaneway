---
id: designer
title: Designer GUI指南
hide_table_of_contents: false
---

# Designer GUI指南

在这里，我将向您介绍`MadParticle Designer GUI`辅助设计工具的使用方法

:::info

为保障GUI界面紧凑，以及防止字符显示重叠，英文界面使用了大量的缩写。为此，当在英文设定下打开Designer GUI时，一些输入框会有特定的Tooltip提示，而中文环境则不存在。

`MadParticle Designer GUI`与[Modern UI](https://www.curseforge.com/minecraft/mc-mods/modern-ui)兼容良好。你可以借助其来改进使用体验。

:::

---

## 参数

参数模式是最为基础的Designer GUI模式，此模式旨在帮助您更直观清晰地（相对于一串五颜六色的字符来说）编写MP命令。

### 基础概念与操作

进入游戏后，默认按`alt+m`新建并打开辅助工具。`参数辅助`模式在一开始是被默认选择的。最上方的`总输入框`将展示最终的结果，点击`复制`即将`总输入框`的内容复制到剪贴板。左边的`命令串`选择栏以列表的形式展示所有的`子命令`。点击`新建`，您将看到右侧出现了一个`参数面板`，同时`命令串`选择栏也出现了一个被选中的名为`null`的`子命令`。`子命令`所显示的名称由其模仿的目标粒子自动地决定。

:::tip

- 如果你需要重新编写一条MP命令，而又懒得一个一个删掉`命令串`选择栏里面的`子命令`；或者遇到了一些意料之外的辅助工具错误：
    - 你可以按`esc`退出辅助工具、回到游戏世界中之后，默认按下`crtl+m`来初始化辅助工具。
- 辅助工具默认使用`/mp`（即简化后的`快速mp指令执行`）。如果您需要使用`/madparticle`（即原版指令执行），请手动替换之。

:::



### 填写一个参数面板

- 点击`目标粒子`，所有可选粒子会自动地出现在提示栏中。使用↑和↓来切换选中的提示，`tab`或`enter`来应用提示。多数粒子都是可被MP接受的，少数粒子，比如`minecraft:block`不可接受，会被显示为红色。

:::tip

多数输入框都有自动检测功能，白色文字代表输入内容可以被接受，红色文字代表输入内容不可接受，灰色文字代表不可编辑。

一些输入框还有提示功能，可以帮助您补全部分内容。自动补全内容可能不适用于所有的情况，可能存在潜在的错误。

:::

- 当你正确地填写一个粒子之后，辅助工具会随机的从该粒子所有可用材质中随机地选取一张，展示在右侧小区域内。如果右侧小区域显示紫黑方块或者没有显示任何图片，则说明该粒子没有使用通常的显示方式、或该粒子没有贴图、或出现了其他不兼容的情况。在这种情况下，我们非常不建议您使用这个粒子（除非您对它们非常熟悉）。

:::tip

如果你想要查看其他的可用材质，单击`目标粒子`输入框（使输入框进行一次更新）即可。未发生变化则说明只有一张可用的材质。

:::

- 当你填写一个可被接受的粒子之后，可以继续常规地填写下面参数以完成这条子命令。你也可以点击`尝试填写默认值`按钮，辅助工具会尝试在程序内部按默认参数生成对应的粒子并读取其参数，自动地填写空白的输入框。自动填写的内容会被自动地标记为蓝色，以提示您可能需要检查和修正。

:::tip

自动填写的`重力`、`二次重力`、`初始大小`、`结束大小`很有可能不正确，需要特别注意。

:::

### 更多的参数面板

在完成一个参数面板之后，你可以继续新建更多的参数面板，从而创造一个粒子串命令。为便于寻找填写错误的参数，在`命令串`选择栏中，解析失败的子命令会被标为红色。辅助工具会自动异步地将各子命令连接起来，展示在最上方的`总输入框`中。

### 编写完成

完成编写之后，你只需要将`总输入框`中的内容复制到你想要的地方，比如命令方块或者聊天栏中，执行即可。

### 再次编辑

辅助工具本身是不会持久化的，这意味着你在此界面看到的所有内容都会在退出存档之后消失。不过你只需要复制`总输入框`中的内容到其他什么地方（比如命令方块或者一个txt），下次打开游戏时复制回来，你会看到`复制`按钮短暂地变为了`解析`——抓紧点它！程序可能会有短暂的卡顿，辅助工具将尝试把您复制进来的命令还原为各个填写好了的子命令。

> 这个解析过程并不特别智能，有可能会出现错误，所以您最好人工检查一遍。

随后，您就可以正常地修改各个子命令了。

---

## 元指令区

自`0.4`版本起，你可能会注意到在参数面板的底部增加了一个元指令区。你可以利用`+`和对应的`-`按钮，增加或删去相应的键值对。

要使用它很简单：在一对两个输入框中，左侧填写键，右侧填写值。Designer GUI会在你填写/更改键时，自动地改变值输入框的参数检测规则。

有关更多元指令的信息，请查看[元指令参数指南](meta)。

---

## 喷花筒

喷花筒模式可以帮助您制作一个能够喷出指定粒子的喷花筒物品.

### 编写粒子

粒子参数编辑的方法与参数模式基本相同。

你会注意到`X`、`Y`、`Z`被锁定在`~`，这是为了表示喷花筒喷出粒子的位置固定在玩家手持喷花筒头部（第一人称和第三人称可能略有不同）。

你也会注意到`Vx`、`Vy`、`Vz`消失不见，取而代之的是一个大的`V`输入框。喷花筒喷出的粒子始终会朝向玩家视线，而`V`则是一个速度系数，用于非精确地控制向这个方向喷出粒子的速度。

生成位置误差指和速度误差值仍然有效。

### 制作喷花筒

在完成编辑后，你只需要点击`制作喷花筒`，服务器会发放一个对应的喷花筒到你的物品栏中。请注意，制作喷花筒需要2级权限。

### 再次编辑

你可以把参数模式编写的指令复制到此处进行解析并制作喷花筒。

值得注意的是，在粘贴并解析之后，你需要轻击任意一个参数输入框来手动更新，以使程序为指令添加上`"tada":1`的标签。

:::info

指令解析时，依靠元指令中`"tada":1`的标签来将粒子以喷花筒模式而不是常规模式发送至客户端。

:::
