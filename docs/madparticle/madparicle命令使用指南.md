---
id: command
title: /madparticle 命令指南
hide_table_of_contents: false
---

# /madparticle 命令指南

这一章包含与`/madparticle` 指令相关的所有重要内容。

---

:::caution

错误的命令参数可能会导致客户端来不及处理大量的粒子而导致卡顿，或是在少数情况下引起客户端崩溃，以至于需要卸载mod并移除对应的命令方块。在更坏的情况下，你的存档可能会变得无法游玩。

:::

:::caution 注意

`/madparticle`和`/mp`指令在理论效果上是几乎相同的，除了以下内容：

- `/madparticle`将使用默认的Minecraft指令执行系统，这意味着较高的性能消耗，但不会有意外的执行结果。
- `/mp`使用经过简化的指令执行步骤，这意味着较低的性能消耗，但可能会产生意外的执行结果，包括但不限于使游戏崩溃、针对此条命令的权限失效等。同时，`whoCanSee (entity)`参数将会被忽略，即强制为`@a`。
- `/mp`针对`/execute`只提供有限兼容，即只支持`at [目标选择器]`，对于其他参数则不作支持。
- 如果其他命令在执行过程中产生了意外的结果（包括但不限于（可能无提示的）执行失败），请检查命令是否以`mp■`开头、或含有`■mp■`（■代表空格）。如果是，请尝试避免使用该命令：MadParticle使用以上两个特征来检测并简化指令执行。
- 为防止普通玩家随意使用而导致卡顿，`/madparticle`和`/mp`指令的执行权限为2级。

:::

以下是`/madparticle`命令的所有参数和简单说明。参数名称可能与游戏中略有不同。别担心，你不需要空手写出一个如此长的命令。

```
/madparticle /mp
//基本信息
targetParticle (Particle) //要模仿的粒子
spriteFrom (MadParticle.SpriteFrom) //贴图选择方式（随机|按时间变化）
lifeTime (int) //持续时间
alwaysRender (InheritableBoolean) //是否忽略最大粒子距离（默认为32格）
amount (int) //单次生成数量
//生成相关
px, py, pz (double) //生成位置
xDiffuse, yDiffuse, zDiffuse (double) //生成位置误差
vx, vy, vz (double) //生成速度
vxDiffuse, vyDiffuse, vzDiffuse (double) //生成速度误差
//运动相关
collision (InheritableBoolean) //是否与方块碰撞
bounceTime (int) //最大碰撞次数
horizontalRelativeCollisionDiffuse,verticalRelativeCollisionBounce (double) //碰撞时水平扩散/垂直反弹系数
friction, afterCollisionFriction (float) //阻力，碰撞后阻力
gravity, afterCollisionGravity (float) //重力，碰撞后重力
xDeflection, zDeflection,xDeflectionAfterCollision, zDeflectionAfterCollision (float) //x,z偏转力
rollSpeed (float) //自转速度
interactWithEntity (InheritableBoolean) //是否被玩家带动
horizontalInteractFactor, verticalInteractFactor (double) //水平扰动系数，垂直扰动系数
//显示相关
renderType (renderType) //渲染模式
r, g, b (double > float) //颜色
bloomFactor (float) //泛光强度 已更名为 额外亮度
beginAlpha, endAlpha (float) //初始/结束不透明度
alphaMode (MadParticle.ChangeMode) //不透明度变化模式（线性|指数|正弦）
beginScale, endScale (float) //初始/结束缩放
scaleMode (MadParticle.ChangeMode) //缩放变化模式（线性|指数|正弦）
//附加内容
whoCanSee (entity) //能够看到此粒子的玩家
meta (CompoundTag) //元指令区域
expireThen (madParticle command) //粒子消失时产生新粒子
```

---

以下是参数的详细说明。你需要了解各参数的含义和值域。

:::tip

对于不熟悉各项的使用者，推荐您注意阅读各`作为参考`。

:::

:::caution 注意

- 下列给出的参考值没有经过交叉验证，可能并不准确。
- 当Vec3（坐标）类型的参数为整数时，请按需补齐后面的`.0`，而不是只填写整数部分。整数在默认情况下是CenterCorrected，即会被补充+0.5。
- `InheritableBoolean`是对bool的包装，除`TRUE`和`FALSE`外，还可以填写`INHERIT`。具体内容参见下文`expireThen`。
- 下文提到的“未定义行为”，通常不会导致游戏崩溃或错误等严重的后果，只是可能使粒子有着意外的表现。

:::

## targetParticle

决定你想要模仿的粒子。MadParticle（以下简称MP）会尝试从你指定的粒子获取贴图并应用。有一些粒子可能不被MP支持，即使输入指令也不会生成粒子。

## spriteFrom

决定MP模仿粒子时选择贴图的方式。`RANDOM`指随机选择一张贴图；`AGE`指粒子的贴图会根据时间而变化，就像`cloud`粒子那样（生物死亡时的白烟。）

## lifeTime, alwaysRender, amount

`lifeTime`决定粒子的持续时间，单位为tick。生成粒子时有随机的上下10%误差。

:::info 作为参考

在一般情况下，您应该使此值（在达到预期效果的范围内）尽量小，以减少总的粒子数量，减少帧数损失。如果您需要制作长期存在的粒子，也应该结合`amount`来控制粒子总数。

:::

`alwaysRender`决定粒子是否无视最大生成距离和游戏选项中的粒子等级。MC原版的最大生成距离为32格。在[Extinguish](https://www.curseforge.com/minecraft/mc-mods/extinguish-by-uss_shenzhou)中，此值被改为了64格。更多信息请查看[粒子最大生成距离](config#始终限制最大生成距离)。

:::info 作为参考

在一般情况下，建议保持为`FALSE`，否则可能会有意料之外的帧数损失。

:::

`amount`决定单次执行命令生成的粒子数量。

:::info 作为参考

在一般情况下，您应该使此值（在达到预期效果的范围内）尽量小，以减少总的粒子数量并减少帧数损失。如果出现了每`tick`产生的每波粒子间距太大的情况，除了增加`amount`，您可以考虑增加`Diffuse`和`size`。

:::

## x, y, z和vx, vy, vz

x, y, z指定粒子生成时的位置。你可以使用`~`或`^`符号，就像原版指定坐标时一样。

vx, vy, vz指定粒子生成时在各个轴上的初速度。斜向粒子可能会花费您一些三角函数知识。

> 在未来推出的GUI辅助工具中，我们可能会加入对方向矢量的编写辅助。

:::caution 注意

注意：vx, vy, vz的单位均为 m/tick，这意味着填入的数值可能与一般的直觉不太相符。

:::

## x,y,zDiffuse

决定生成粒子时会在多大的范围内生成。

:::info 作为参考

假设`x`是100，`xDiffuse`是5，则粒子会在x = 95 ~ 105的范围内随机生成。在第一次编写某个命令时，您最好先设定一个较小的值，甚至是`0.0`，以便于检查粒子的表现是否符合您的预期。

:::

## vx,vy,vzDiffuse

决定生成粒子时的速度范围。请注意其单位为m/tick，因此一般不需要太大的值。

:::info 作为参考

假设`vx`是0.2，`vxDiffuse`是0.02，则生成的粒子在x轴上的速度可能是0.18-0.22间的任何值。如果你想要类似烟花的效果（即从中心扩散），那`vx=0.0, vxDiffuse=0.3`是个不错的尝试起点。在第一次编写某个命令时，您最好先设定一个较小的值，甚至是`0.0`，以便于检查粒子的表现是否符合您的预期。

:::

## collision, bounceTime

`collision`决定粒子是否会与方块发生碰撞。

`bounceTime`决定粒子碰撞的次数，在超过此次数后不再进行碰撞判定。

:::info 作为参考

一般情况下，此值建议在4以下。专门要表现跳动等时除外。

:::

:::tip

值得注意的是，由于不同粒子贴图之间的差异，碰撞很有可能不以您期望的方式展现。粒子陷进地里才停下、碰到天花板就消失不见是正常的情况（对程序运行而言）。

:::

## horizontalRelativeCollisionDiffuse, verticalRelativeCollisionBounce

`horizontalRelativeCollisionDiffuse`决定碰撞时水平方向的扩散范围。

:::info 作为参考

基准值为1，指**最大**100%的动能都用于水平方向扩散。即这样会展现类似完全弹性碰撞的效果。

:::

`verticalRelativeCollisionBounce`决定碰撞时垂直方向的扩散范围。

:::info 作为参考

基准值为1，指**最大**以100%的法向速度反弹。即这样会展现类似完全弹性碰撞的效果。

:::

:::tip

此处的“水平”“垂直”是相对碰撞表面而言的。

:::

## friction, afterCollisionFriction

`friction`决定粒子运动时速度逐渐减小的幅度。

`afterCollisionFriction`决定粒子碰撞之后的新摩擦力数值。如果你不需要在碰撞后改变摩擦力，填入与`friction`相同数值即可。

:::info 作为参考

玩家正常行走时的摩擦力系数是0.6，在冰上时是0.98。

:::

:::tip

摩擦力是指数作用于粒子速度的，即有每tick`vx = vx * friction`。

输入超过1的值是未定义行为。

:::

## gravity, afterCollisionGravity

`gravity`决定粒子运动时所受重力大小。

`afterCollisionGravity`决定粒子碰撞之后的新摩擦力数值。如果你不需要在碰撞后改变重力，填入与`gravity`相同数值即可。

:::info 作为参考

0.01的重力值就可以展现出缓缓下落的效果，0.02-0.03的重力值则更接近正常下落的效果，更高的值会展现出重物快速下落的效果（~~亚里士多德狂喜~~）。

与摩擦力不同的是，重力是线性地、以0.04倍作用于粒子的。

:::

## xDeflection, zDeflection, xDeflectionAfterCollision, zDeflectionAfterCollision

`xDeflection, zDeflection`决定粒子运动时所受的偏转力。类似水平方向的重力，线性地起作用。

`xDeflectionAfterCollision, zDeflectionAfterCollision`决定碰撞后粒子运动所受的偏转力。

## rollSpeed

`rollSpeed`决定粒子的自转速度，像`lifeTime`一样有着随机上下10%误差。不为0时将使粒子在生成时带有随机的旋转角度。

:::info 作为参考

为1时代表每tick旋转360°

如果你想要一个拥有随机初始旋转角度，但后续不旋转的粒子，你可以把这个值设定为一个很小的非零值。

:::

## interactWithEntity, horizontalInteractFactor, verticalInteractFactor

`interactWithEntity`决定粒子是否会在玩家路过时被带着飘起来。

`horizontalInteractFactor`决定被扰动时水平方向能够获得多少速度。基准值为1，指最大能够获得与玩家相同的水平速度。

`verticalInteractFactor`决定被扰动时垂直方向能够获得多少速度。计算时，取玩家垂直方向上的速度、水平方向速度的几何平均数的最大值，再乘以此值。

:::info 作为参考

[Extinguish](https://www.curseforge.com/minecraft/mc-mods/extinguish-by-uss_shenzhou)的干粉粒子扰动系数分别为0.3和0.12。

:::

:::tip

由于客户端和服务端的数据差异，由本客户端玩家产生的扰动效果往往和其他玩家产生的效果相比有强弱差异。

:::

## renderType

决定粒子的渲染模式。

:::info 作为参考

如果你不熟悉时此项，有三个建议选择：

1. `INSTANCED`或`实例化`，渲染效率极高，不支持Shimmer联动泛光，不支持使用光影，允许粒子拥有半透明度；
2. `PARTICLE_SHEET_TRANSLUCENT`或`半透明`，支持Shimmer联动泛光，在使用光影时自动降级至原版无泛光，允许粒子拥有半透明度；
3. `PARTICLE_SHEET_OPAQUE`或`不透明`，支持Shimmer联动泛光，在使用光影时自动降级至原版无泛光，不允许粒子半透明；

后两者有一些特殊的改动，以在一些情况下允许更广的颜色设置范围（参考下文）。我们已经针对常见的渲染/优化模组作了改动，但仍然可能存在潜在的兼容性问题，如遇到问题请及时进行反馈。

:::

:::danger

**在不了解的情况下，切勿选择`CUSTOM`。**

:::

## r, g, b

决定粒子的贴图会被作何种颜色变化。小于0的值等同于0，不设硬性上限。

:::info 作为参考

`(1,1,1)`表示按贴图本身的颜色来渲染。

`(3,1,1)`表示将贴图的红色增加为原来的三倍，其余颜色分量保持不变。值得注意的是，通常情况下，最终变化结果会被限制在255之内。即`(123,123,123) × (3,1,0.4) = (255,123,49)` 。

:::

## ~~bloomFactor~~ ExtraLightness

:::info

在MadParticle 0.8.0+，此条目的含义发生了变化，不再是 ***[Shimmer](https://github.com/Low-Drag-MC/Shimmer)*** 联动项。

:::

决定粒子的额外亮度倍数。允许在原版的0~15亮度等级之外额外增加亮度。

在不使用光影包时，粒子的亮度提升会出现一个明显的上限，且不带有其他效果；在使用光影包时，此选项能够兼容光影包的`Bloom`泛光选项，使粒子从视觉上看起来更亮。对HDR效果的影响暂不明确。

:::info 作为参考

取值范围为1~255。1表示仅使用原版亮度，其余数值表示亮度倍数。

:::

:::tip

不同客户端可能会因为光影包不同或参数不同而产生不同的视觉效果。

:::

## beginAlpha, endAlpha, alphaMode

`beginAlpha`决定粒子生成时的不透明度。

`endAlpha`决定粒子消失时的不透明度。如果不需要不透明度变化，填入与`beginAlpha`相同值即可。范围均限定在0-1。

`alphaMode`决定粒子的不透明度如何变化。`linear`指线性变化，`index`指指数变化，`sin`指正弦变化。如果不需要不透明度变化，填入`linear`即可。

:::info 作为参考

1代表粒子完全不透明，0代表粒子完全透明。

假设`beginAlpha`为1，`endAlpha`为0.1（即一个逐渐变淡的粒子），粒子存活时间为100tick（5秒），则三种变化模式曲线模拟如图：

![image](./assets/187078262-1a8b4737-b721-4df4-b092-2ca51bd0279d.png)

:::

:::tip

为了更好地突出与其他方式的差异，指数变化时的底数规定为10。

正弦变化使用`sin`函数的`3/5`次方以突出与`linear`的差异，同时为简化运算，使用查表法和线性插值计算。

:::

## beginScale, endScale, scaleMode

`beginScale`决定粒子生成时的缩放值。

`endScale`决定粒子消失时的缩放值。如果不需要粒子大小变化，填入与`beginScale`相同值即可。

`scaleMode`决定粒子的缩放如何变化。三种选项与上文alpha变化模式相同。

:::info 作为参考

作为参考：1代表粒子按原样大小。更大的值将会使粒子变得更大。

假设`beginScale`为0.3，`endScale`为4.5（即一个不断变大的粒子），粒子存活时间为100tick（5秒），则三种变化模式曲线模拟如图：

![image](./assets/187078284-8321bc4f-5250-49bd-b16b-443b840f02c4.png)

:::

---

以下内容都是可选的，而非必填的。

## whoCanSee

> 感谢`@MalayP`的建议。

`whoCanSee`决定粒子数据会被发往哪些玩家。像原版指令一样，使用实体目标选择器。不填写时默认粒子被发往维度内的所有玩家。

## meta

这是一个元指令区域，以`CompoundTag`的形式呈现。你可以根据需要填写对应的键值对。

**查看[元指令参数指南](meta)这一单独的页面来了解所有可用特性。**

## expireThen

> 感谢`@MalayP`的建议。

`expireThen`决定粒子消失时会变为其他什么粒子。前必须有指定的`whoCanSee`，后接一条完整的`madparticle`指令。这意味着一整条mp指令可以嵌套式地延伸，一个父粒子可以有一串子粒子。

:::info

- 聊天窗口允许的最大字符长度为256，这意味着它不支持您使用嵌套过的指令；命令方块允许的最大长度为32500，您理论上可以嵌套约161条（即总共162条，按200字符/条计算）子粒子指令。但过于复杂的嵌套可能会导致巨大的网络包和过多的内存占用，以及其他可能的问题。

---

- **与第一条`mp`指令生成父粒子稍有不同的是，在子粒子指令中，你可以在一些参数处填写等于号`=`（对于数值参数），或`INHERIT`（对于布尔（被枚举替代）和枚举），这表示子粒子的这个参数将会继承于其父粒子。**
- `=`和通常的`~`、`^`相似，但不同之处在于，`=`拥有简单的最高优先级，其存在将会覆盖这个参数下的所有其他数字。因此，不仅`=`能够表示“此参数继承于父粒子”，`=-1=`、`3=`、`==1==2==3==`也被接受并表示相同的含义。当然，这样做并不推荐。
- 请不要在最父粒子的参数处使用`=`和`INHERIT`（即使没有被标记为红色），这可能会导致意外的行为。
- 子粒子的`amount`参数将会被忽略，即保持为1。同时我们建议您也输入1，而不是其他值（尽管不会有其他问题）。
- 父粒子的`whoCanSee`参数将会被忽略，以最后一个`whoCanSee`（即最子粒子）为准。

:::

> 以下参数，有`✅`代表其可以被继承，可以使用`=`或`INHERIT`；`❌`代表其不能被继承，您必须显式地写明值；`🔘`代表其值将会被忽略。
>
> ```
> ... expireThen
> //基本信息
> ❌ targetParticle (Particle) //要模仿的粒子
> ✅ spriteFrom (MadParticle.SpriteFrom) //贴图选择方式（随机|按时间变化）
> ✅ lifeTime (int) //持续时间
> ✅ alwaysRender (InheritableBoolean) //是否忽略最大粒子距离（默认为32格）
> 🔘 amount (int) //单次生成数量 <为防止指数级增长，子粒子不可用>
> 
> //生成相关
> ✅ px, py, pz (double) //生成位置
> ❌ xDiffuse, yDiffuse, zDiffuse (double) //生成位置误差
> ✅ vx, vy, vz (double) //生成速度
> ❌ vxDiffuse, vyDiffuse, vzDiffuse (double) //生成速度误差
> 
> //运动相关
> ✅ collision (InheritableBoolean) //是否与方块碰撞
> ✅ bounceTime (int) //最大碰撞次数
> ✅ horizontalRelativeCollisionDiffuse,verticalRelativeCollisionBounce (double) //碰撞时水平扩散/垂直反弹系数
> ❌ friction, afterCollisionFriction (float) //阻力，碰撞后阻力 <有歧义而不允许继承>
> ❌ gravity, afterCollisionGravity (float) //重力，碰撞后重力 <有歧义而不允许继承>
> ❌ xDeflection, zDeflection, xDeflectionAfterCollision, zDeflectionAfterCollision (float) //x,z偏转力 <有歧义而不允许继承>
> ✅ rollSpeed (float) //自转速度
> ✅ interactWithEntity (InheritableBoolean) //是否被玩家带动
> ✅ horizontalInteractFactor, verticalInteractFactor (double) //水平扰动系数，垂直扰动系数
> 
> //显示相关
> ❌ renderType (renderType) //渲染模式
> ✅ r, g, b (double > float) //颜色
> ✅ bloomFactor (float) //泛光强度
> ❌ beginAlpha, endAlpha (float) //初始/结束不透明度 <有歧义而不允许继承>
> ✅ alphaMode (MadParticle.ChangeMode) //不透明度变化模式（线性|指数|正弦）
> ❌ beginScale, endScale (float) //初始/结束缩放 <有歧义而不允许继承>
> ✅ scaleMode (MadParticle.ChangeMode) //缩放变化模式（线性|指数|正弦）
> 
> //附加内容
> 🔘 whoCanSee (entity) //能够看到此粒子的玩家 <子粒子不可用>
> ❌ meta
> expireThen ...
