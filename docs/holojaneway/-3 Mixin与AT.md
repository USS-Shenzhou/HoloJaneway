---
id: -3
title: -3 Mixin与AT
description: Mixin与AT
hide_table_of_contents: false
sidebar_position: 60
toc_max_heading_level: 4
---

# Mixin与AT

当你的mod开发到一定程度时，很有可能会遇到需要修改原版已有内容的情况。在这一章，我们将会介绍两个有用的工具，来帮助你达成这个目标。

---

## Mixin

Mixin是一个非常强大的工具，它基于[ASM](https://asm.ow2.io/)，帮助你方便地修改原版内容。

`对了，Mixin的正确读法是mix-in，而不是mi-xin。虽然你非要读后者也没事。`

:::tip

你应该尽量避免使用Mixin。请先确认已经没有其他方法（例如监听事件或继承子类），或是替代方法非常不划算后再使用Mixin。Mixin的加入可能会极大地提高错误出现的可能性和诊断错误的难度。

:::

:::caution

在Minecraft模组编写时，Mixin的作用范围仅限于MC本身和其他mod，不能对其他依赖进行修改。比如说，`net.minecraft.commands.arguments.coordinates.Vec3Argument`是一个有效的Mixin目标，而`com.mojang.brigadier.arguments.DoubleArgumentType`则不行。

如果你确实需要对`DoubleArgumentType`这样的第三方类进行修改，那不妨考虑继承后再@Override等其他方法。

> Mixin在理论上确实可以用于其他非Minecraft项目。

:::

:::caution

所有的Mixin类应该放且仅放在mixin包中。mixin包中也不应该包含普通类，比如你的方块或者实体什么的。

当然，你也可以分好几个包，但多数情况下这没有必要。

:::

Mixin通过各式各样的注解和背后的注解处理器来完成大多数工作。以下先介绍一些常用或者常见的注解说明。

- `@Mixin`标记这是一个Mixin类，并在参数中指定目标类。

:::info

关于`Mixin类`、`目标类`、`父类`、`目标方法`的澄清：

假设你现在需要修改`Zombie`类中的`foo()`方法中的某一行，那么

- `Mixin类`：你写出来的进行修改的代码存在的地方，即`ZombieMixin`；
- `目标类`：被修改的类，即`Zombie`；
- `父类`：目标类的父类，即`Monster`；
- `目标方法`：被修改的方法，即`Zombie.foo()`。

:::

- `@Inject`标记这是一个`回调方法`，这个方法所含的内容将会被注入指定的位置。这大概是最常用的了。

- `@At`写在`@Inject`和其他注解内，标记具体的作用位置。

- `@Redirect`标记这是一个`重定向方法`，指定的方法调用将会被重定向到此方法。

- `@Overwrite`标记这是一个`覆盖方法`，在目标类中的对应方法将会被完全替换为此方法。

:::danger

不建议使用`@Overwrite`，它可能会导致更大的兼容性问题。

:::

- `@Shadow`标记一个占位字段或方法，真实的字段或方法存在于目标类中。

- `@Accessor`标记一个`访问器`方法，允许你访问指定的字段。

- `@Invoker`标记一个`调用器`方法，允许你调用指定的方法。

- `@Modify...`标记对某种量的修改，可以是参数、变量或常量。

:::info

关于Mixin的工作原理，你可以在[Mixin的JavaDoc](https://jenkins.liteloader.com/view/Other/job/Mixin/javadoc/index.html)找到更详细的说明，[Mixin的GitHub wiki](https://github.com/SpongePowered/Mixin/wiki)对Mixin的工作原理和使用有详细的解释，[mouse0w0的博客](https://mouse0w0.github.io/tags/Mixin/)有翻译版本。本章不探讨Mixin的工作原理，只讲如何使用之。

:::

:::tip

[Fabric Wiki](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_introduction)对Mixin的使用有详细的介绍。Mixin并不是Forge或者Fabric的一部分，故与Mixin有关的内容在大多数情况下可以通用。

:::

下面，我们将以一些场景为例，向你讲述如何使用Mixin修改原版内容。你可以只看你需要用到的情况所对应的例子，也不必看具体的修改内容，只关注文字提到的有关内容。你也可以选择先跳过这些示例，继续看后面的内容。

### 示例：修改

:::info

如果你想要先看看这一堆注解的参数解释而不是使用例，你可以先查看下文`注入点`一节。

:::

:::tip

如果你的目标类/方法是在生产环境中不会被混淆的类/方法，比如其他mod中的内容，你需要在`@Mixin`或`@Inject`中加入`remap = false`来告诉Mixin不要进行混淆。

**你所有的方法都应当在方法名前加上你的modid，或者以其他方式明显地标示这个方法属于哪个mod。**

:::

#### Inject - 在Brighter中修改方块光衰减的方式

这样就可以减少衰减而增加扩散了。Brighter（1.20以前）, MixinBlockLightEngine, GPLv3：

```java
@Mixin(BlockLightEngine.class)
public abstract class MixinBlockLightEngine extends LayerLightEngine<FakeBlockLightSectionStorage.FakeBlockDataLayerStorageMap, FakeBlockLightSectionStorage> {
    public MixinBlockLightEngine(LightChunkGetter p_75640_, LightLayer p_75641_, FakeBlockLightSectionStorage p_75642_) {
        super(p_75640_, p_75641_, p_75642_);
    }

    @Shadow
    protected abstract int getLightEmission(long p_75509_);

    @Inject(method = "computeLevelFromNeighbor", at = @At("HEAD"), cancellable = true)
    private void brighterGetEdgeLevelHead(long startPos, long endPos, int startLevel, CallbackInfoReturnable<Integer> cir) {
        if (endPos == Long.MAX_VALUE) {
            cir.setReturnValue(15);
        } else if (startPos == Long.MAX_VALUE) {
            cir.setReturnValue(startLevel + 15 - this.getLightEmission(endPos));
        } else if (startLevel >= 15) {
            cir.setReturnValue(startLevel);
        } else {
            int i = Integer.signum(BlockPos.getX(endPos) - BlockPos.getX(startPos));
            int j = Integer.signum(BlockPos.getY(endPos) - BlockPos.getY(startPos));
            int k = Integer.signum(BlockPos.getZ(endPos) - BlockPos.getZ(startPos));
            Direction direction = Direction.fromNormal(i, j, k);
            if (direction == null) {
                cir.setReturnValue(15);
            } else {
                MutableInt mutableint = new MutableInt();
                BlockState blockstate = this.getStateAndOpacity(endPos, mutableint);
                if (mutableint.getValue() >= 15) {
                    cir.setReturnValue(15);
                } else {
                    BlockState blockstate1 = this.getStateAndOpacity(startPos, (MutableInt) null);
                    VoxelShape voxelshape = this.getShape(blockstate1, startPos, direction);
                    VoxelShape voxelshape1 = this.getShape(blockstate, endPos, direction.getOpposite());
                    int l = 1;
                    long prevPos = startPos + (startPos - endPos);
                    try {
                        int prevLevel = this.getLevel(prevPos);
                        if (prevLevel == startLevel - 1&& startLevel != 14) {
                            l = 0;
                        }
                    } catch (Exception ignored) {
                    }
                    l += mutableint.getValue();

                    cir.setReturnValue(Shapes.faceShapeOccludes(voxelshape, voxelshape1) ? 15
                                    : startLevel + l
                            //Math.max(1, mutableint.getValue())
                    );
                }
            }
        }
    }
}

```

如上所示，在需要使用目标类的方法时，你可以使用`@Shadow`来标记一个Mixin类中的同名方法，这样Mixin就会知道去调用目标类中的对应方法；

在需要使用父类的方法时，你可以让Mixin类（即你看到的这一大坨`MixinBlockLightEngine`）继承目标类（即`BlockLightEngine`）的父类（即`LayerLightEngine`）。

:::tip

继承父类后可能会要求创建匹配的构造方法，直接`alt+enter`就可以，此处的构造方法仅起到保证语法的作用。也可能会要求实现某些抽象方法，你可以将Mixin类标记为抽象类来省去这个麻烦，这样做也是只为了起到保证语法的作用。

相似地，你可以把这个方法标记为抽象方法，来省去一对大括号。

如果这是一个final方法/字段，记得加上`@Final`。

你也可以使用`((目标类)(Object)this)`来访问目标类的方法或字段。当然，这种方法比`@Shadow`一定程度上更简便，却会受到访问控制的限制。

:::

关于其他不同的注入位置如何指定，请参照上文提到的Fabric Wiki中的[示例](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_examples) 。

:::tip

如果你不确定方法参数应该怎样填写，`alt+enter`让`Minecraft Development插件`来完成就好了。

:::

对于有返回值的目标方法，你可以使用`cir.setReturnValue(...)`来指定返回值并返回；如果方法没有返回值，你可以使用`ci.cancel()`来结束目标方法。如果你以上两个都不做，目标方法就会在执行完你的注入内容后继续执行剩下的内容；如果你使用的是`return`，那只代表结束目前的注入方法，目标方法剩下的内容会继续执行。

:::tip

如果你要如上使目标方法返回的话，记得在`@Inject`中加上`cancellable = true`。

:::

---

#### Accessor/Invoker - 在MadParticle中访问并执行私有字段和方法

```java
@Mixin(ParticleEngine.class)
public interface ParticleEngineAccessor {

    @Accessor("spriteSets")
    Map<ResourceLocation, SpriteSet> getSpriteSets();

    @Invoker
    <T extends ParticleOptions> Particle callMakeParticle(T pParticleData, double pX, double pY, double pZ, double pXSpeed, double pYSpeed, double pZSpeed);
}

```

在使用时，需要将获取到的`ParticleEngine`转为此接口后再使用：

```java
Particle particle = ((ParticleEngineAccessor) Minecraft.getInstance().particleEngine).callMakeParticle(particleOptions, 0, 0, 0, 0, 0, 0);
```

:::tip

`Minecraft Development`插件也可以帮你自动地生成访问器和调用器：将光标放到目标字段或方法，`alt+insert`或右键选择`生成`，`Generate Accessor/Invoker`即可。

在使用`@Accessor`和`@Invoker`时，如果你没有改变默认生成的方法名，则不需要在其后指定具体的作用对象。比如在这个例子中，`("spriteSets")`是不必要的。

:::

---

###  示例：增加

#### 为原版类添加新方法 - 在R6MS中，我们需要在适当的时候将摄像机改为正交视图

R6MS, LevelRendererMixin, GPLv3:

 ```java
 @Mixin(LevelRenderer.class)
 public class LevelRendererMixin implements LevelRendererProxy {
     private float r6msCameraZoomFactor;
     private boolean r6msEnableOrthographic = false;
     private boolean r6msClipRoof = false;
 
     @Override
     public LevelRendererProxy r6msEnableOrthographic(float cameraZoomFactor1) {
         r6msCameraZoomFactor = cameraZoomFactor1;
         r6msEnableOrthographic = true;
         r6msClipRoof = false;
         return this;
     }
 
     @Override
     public void setR6msClipRoof(boolean r6msClipRoof) {
         this.r6msClipRoof = r6msClipRoof;
     }
 
     @Override
     public void r6msDisableOrthographic() {
         r6msEnableOrthographic = false;
     }
 
     @ModifyVariable(method = "renderLevel", at = @At("HEAD"), argsOnly = true)
     private Matrix4f r6msModifyMatrix4fForRender(Matrix4f m) {
         if (r6msEnableOrthographic) {
             Window window = Minecraft.getInstance().getWindow();
             float width = r6msCameraZoomFactor * window.getWidth() / window.getHeight();
             float height = r6msCameraZoomFactor;
             //80 - 108
             //40 - 216
             //20 - 432
             // x * y = 8640
             Matrix4f matrix4f = Matrix4f.orthographic(-width, width, height, -height, r6msClipRoof ? 0 : -9999, 9999);
             RenderSystem.setProjectionMatrix(matrix4f);
             return matrix4f;
         } else {
             return m;
         }
     }
 
     @ModifyVariable(method = "prepareCullFrustum", at = @At("HEAD"), argsOnly = true)
     private Matrix4f R6msModifyMatrix4fForCull(Matrix4f m) {
         if (r6msEnableOrthographic) {
             Window window = Minecraft.getInstance().getWindow();
             float width = r6msCameraZoomFactor * window.getWidth() / window.getHeight();
             float height = r6msCameraZoomFactor;
             return Matrix4f.orthographic(-width, width, height, -height, r6msClipRoof ? 0 : -9999, 9999);
         } else {
             return m;
         }
     }
 }
 ```

R6MS, LevelRendererProxy, GPLv3:

```java
public interface LevelRendererProxy {
    default LevelRendererProxy r6msEnableOrthographic(float cameraDistance1){
        return this;
    }

    default void r6msDisableOrthographic(){}

    default void setR6msClipRoof(boolean r6msClipRoof) {}
}
```

要为目标类添加方法和字段很简单：直接写进Mixin类即可，Mixin会自动地为你处理后面的事情，帮你把新的方法和字段在编译时加进目标类中。

:::danger 注意

你增添的字段或方法应当在方法名前加上你的modid（如果你喜欢，可以使用`$`分隔）；或者以其他方式明显地标示这个字段或方法属于哪个mod。总之要避免与原版或者其他mod出现潜在的重名可能。你也可以使用`@Unique`注解，但我的习惯是加上modid就足够了。

:::

你不能直接在外部其他什么类中调用Mixin类的新增方法（你任何时候都不应该这么做）。想要使用新方法，你需要让你的Mixin类实现一个中转接口，在这里是`LevelRendererProxy`。在实际使用时，像这样来调用新方法：

```java
((LevelRendererProxy) minecraft.levelRenderer).r6msEnableOrthographic(cameraZoomFactor).setR6msClipRoof(clipRoof);
```

---

### 示例：捕获局部变量

#### 在T88中，我们需要传递局部变量guigraphics

在这种情况下，我们需要暂时忽略MCDev插件给出的提示。

我们希望在渲染快要结束之前（`render`方法的`posestack.popPose();`执行前），广播我们自定义的`GameRendererRenderedEvent`事件；而这个事件需要传入`render`方法中的局部变量`guigraphics`来构造。

```java
@Inject(method = "render", at = @At(value = "INVOKE", target = "Lcom/mojang/blaze3d/vertex/PoseStack;popPose()V"), locals = LocalCapture.CAPTURE_FAILSOFT)
private void afterGameRendererRenderedT88(float pPartialTicks, long pNanoTime, boolean pRenderLevel, CallbackInfo ci,
    int i, int j, Window window, Matrix4f matrix4f, PoseStack posestack, GuiGraphics guigraphics) {
        MinecraftForge.EVENT_BUS.post(new GameRendererRenderedEvent(pPartialTicks, guigraphics));
        guigraphics.flush();
}
```

如上所示，在`@Inject`中添加`locals = LocalCapture.CAPTURE_FAILSOFT`就可以让Mixin知道你想要捕获的局部变量。

你可能注意到了，我将这个Mixin方法的形参分为了两行展示——在`CallbackInfo`之前的是目标方法`render`的形参，之后是需要捕获的局部变量。

> 但是我们只需要`guigraphics`，前面为什么还有这么多参数？

通常情况下，Mixin方法形参的局部变量必须按照它们在目标方法中出现的顺序出现——这意味着我们如果想要某个在中间的局部变量，我们必须把它前面的一大家子也写上去。

:::tip

新版本的MCDev插件已经可以比较好地捕获局部变量了。你可以先试试看自动填充，或许不需要用到下面的方法。

:::

一种可行的办法是仔细观察目标方法体，一个一个地把局部变量写上形参。但这种方法显然很容易漏掉某一个或者某几个，还得回过头来找；

另一种更加推荐的办法如下：

- 先直接写上需要的形参，就像`afterGameRendererRenderedT88(..., CallbackInfo ci, GuiGraphics guigraphics)`，然后启动游戏；
- 你会在日志里看见这样一段：

```java {4}
[23:17:30] [Render thread/WARN] [mixin/]: Injection warning: LVT in net/minecraft/client/renderer/GameRenderer::render(FJZ)V has incompatible changes at opcode 569 in callback t88.mixins.json:GameRendererMixin->@Inject::afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;Lnet/minecraft/client/gui/GuiGraphics;)V.
 Expected: [Lnet/minecraft/client/gui/GuiGraphics;]
    Found: [I]
Available: [I, I, Lcom/mojang/blaze3d/platform/Window;, Lorg/joml/Matrix4f;, Lcom/mojang/blaze3d/vertex/PoseStack;, Lnet/minecraft/client/gui/GuiGraphics;, Ljava/lang/Throwable;, Lnet/minecraft/CrashReport;, Lnet/minecraft/CrashReportCategory;]
[23:17:30] [Render thread/FATAL] [mixin/]: Mixin apply failed t88.mixins.json:GameRendererMixin -> net.minecraft.client.renderer.GameRenderer: org.spongepowered.asm.mixin.injection.throwables.InvalidInjectionException Injection validation failed: Callback method afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;Lnet/minecraft/client/gui/GuiGraphics;)V in t88.mixins.json:GameRendererMixin expected 1 invocation(s) but 0 succeeded. Scanned 1 target(s). No refMap loaded. [INJECT Applicator Phase -> t88.mixins.json:GameRendererMixin -> Apply Injections ->  -> PostInject -> t88.mixins.json:GameRendererMixin->@Inject::afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;Lnet/minecraft/client/gui/GuiGraphics;)V]
org.spongepowered.asm.mixin.injection.throwables.InvalidInjectionException: Injection validation failed: Callback method afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;Lnet/minecraft/client/gui/GuiGraphics;)V in t88.mixins.json:GameRendererMixin expected 1 invocation(s) but 0 succeeded. Scanned 1 target(s). No refMap loaded. [INJECT Applicator Phase -> t88.mixins.json:GameRendererMixin -> Apply Injections ->  -> PostInject -> t88.mixins.json:GameRendererMixin->@Inject::afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;Lnet/minecraft/client/gui/GuiGraphics;)V]
	at...
```

- 你可能已经发现了，`Available`这一行完整地列出了所有可用的形参类型——现在你只需要按顺序找到它们的含义或参数名（要是你确实不需要前面这些参数，写abcd也不是不行），填进Mixin方法的形参中即可。

---

### 注入点

你可能已经注意到了，不论是`@Inject`还是`@Modifyxxxxx`，亦或者下文将提到的`@Redirect`，其参数都有着`method`和`at`的基本结构，`at`的`@At`中有时又包含`target`。

在已经有`@Mixin`指定了目标类的情况下，`method`参数被用于指定这个Mixin注解将会被用于目标类中具体哪个方法，其值通常情况下可以由你填写方法名后使用MCDev插件补齐。需要注意的是，如果你的目标方法是构造方法，你需要填入`"<init>"`，如果目标方法是静态构造块，则填入`"<clinit>"`。

`at`则需要填写一个`@At`注解，通常有几种情况：

- 如果你想要注入在目标方法开头，一个`"HEAD"`就足够了。
- 如果你想要注入在目标方法结尾，`"RETURN"`用于在目标方法返回前，在不附加其他条件的情况下，只要目标方法要返回了，那Mixin方法中的内容就会被执行。
- 如果你想要注入在目标方法中间的某个位置，则会稍微麻烦一些。一般来说，你需要注入的位置可以选择在某处调用之前，这样你就不仅需要在`@At`内写上`value = "INVOKE"`，还需要指定`target = "foo()V"`。这里你通常只需要打出`foo`，随后就可以使用MCDev插件为你补齐形参和返回值。这样你就将注入点指定在了`.foo()`调用之前。

要是目标方法内有好几个`.foo()`调用，但是我又只想在某一处执行注入怎么办？你可以使用`ordinal`来限定具体的第几个`.foo()`。你也可以使用`slice`，借助另外两个方法来限定注入的区域。

:::info

这里只是一个非常简单的介绍。`ordinal`和`slice`的用法可以参考[Fabric Wiki的Mixin页面](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_introduction)。更多可选的值及其含义请参考[Mixin的GitHub wiki](https://github.com/SpongePowered/Mixin/wiki)或[mouse0w0的翻译](https://mouse0w0.github.io/tags/Mixin/)。

:::

#### 通过查看字节码寻找注入点

要是你想要注入的位置在一个λ表达式或者什么更奇怪的地方，你可能会发现`method`并不能填成外面那个方法名。

你可以点到那个λ表达式，然后在IDE上方`视图`>`显示字节码`，找到那个λ的签名——它通常是`<类名>.lambda$<外面那层方法名>$编号(形参)返回类型`的样子，你就可以把一整行复制下来，填到`method`中。记得删掉最后那个逗号。

---

### 错误排查

mixin在注入过程中或者注入之后很有可能产生错误或不符合预期的表现，此时你可能需要知道执行注入之后那些目标类到底成了什么乱七八糟的样子。

要查看注入结果，你只需要`右键RunClint`或`在RunClient右侧找到三点按钮`>`编辑`>`第一个长输入框"VM选项"`>`在末尾另起一行并加上` `-Dmixin.debug=true`，这将启用Mixin的所有debug选项。

重新运行一下游戏，你就能在项目目录的`/run/.mixin.out/`文件夹下找到所有被修改的类。

> 为什么在上文中我们使用了“注入”一词？简单翻阅这里面的目标类，你就明白了。

另一方面，你可能注意到日志中多出了一些关于Mixin的内容——这对你的错误排查可能也会有帮助。

## MixinExtras

MixinExtras是一个有用的Mixin附属，提供了一些方便的新功能。1.20.4的NeoForge默认附带。

项目地址在，你可以查看其wiki页面以学习如何使用。

## ________的Optifine

*在空白处填入适当的词汇。*

如果你的Mixin涉及到了一些渲染相关的内容，那在其他玩家安装了Optifine时再运行游戏就很有可能出现兼容性问题。Optifine对Minecraft通过patch的更改是破坏性的，不像元素周期表一家子那样有着良好的兼容性。

### 局部变量更改

最常见的一种情况是，Optifine对原本的目标方法进行了修改，使得原有的局部变量顺序或存在被影响，导致需要捕获局部变量的Mixin方法的形参不再匹配，使得游戏炸掉。

这是上面`示例-捕获局部变量：在T88中，我们需要传递局部变量guigraphics`一节中所写的Mixin在Optifine环境下启动的结果：

```java
[22:28:44] [main/WARN]: Injection warning: LVT in net/minecraft/client/renderer/GameRenderer::m_109093_(FJZ)V has incompatible changes at opcode 773 in callback t88.mixins.json:GameRendererMixin->@Inject::afterGameRendererRenderedT88(FJZLorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;IILcom/mojang/blaze3d/platform/Window;Lorg/joml/Matrix4f;Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/gui/GuiGraphics;)V.
 Expected: [I, I, Lcom/mojang/blaze3d/platform/Window;, Lorg/joml/Matrix4f;, Lcom/mojang/blaze3d/vertex/PoseStack;, Lnet/minecraft/client/gui/GuiGraphics;]
    Found: [I, I, Lcom/mojang/blaze3d/platform/Window;, F, Lorg/joml/Matrix4f;, Lcom/mojang/blaze3d/vertex/PoseStack;]
Available: [I, I, Lcom/mojang/blaze3d/platform/Window;, F, Lorg/joml/Matrix4f;, Lcom/mojang/blaze3d/vertex/PoseStack;, F, Lnet/minecraft/client/gui/GuiGraphics;, Ljava/lang/Throwable;, Lnet/minecraft/CrashReport;, Lnet/minecraft/CrashReportCategory;]

```

如上所示，多出了两个`float`，为此我们需要写出新的`afterGameRendererRenderedT88`方法用于捕获被Optifine修改过的局部变量。

:::tip

日志里已经提供了类型，我们又不需要那些参数做什么事——那就不去翻Optifine在做什么，随便命个名就好了。

:::

> 等等，要是按这些问题改了写法，那玩家没装Optifine的时候又要怎么办？这样岂不是原版需要一套Mixin，Optifine安装后需要另一套Mixin？

通常有三种方式可以让两个方法并存，以此解决这个问题：

开始之前，假设我们为Vanilla/Optifine分别写出了两个只有形参不同的方法，`mixinMethod`和`mixinMethodForOptifine`，它们的`@Inject`注解、方法内容完全一样。

1. 借助各个注解中的`require`字段。`require`的含义是规定注入点的最低次数，要是没达到就崩游戏。默认为-1，即指所有注入都必须要成功。

   对于`mixinMethod`和`mixinMethodForOptifine`，只需要在`@Inject`中加上`require = 0`，表示全失败了也无所谓——总是有且只有一个方法被成功注入。

2. 另一个方法是使用`@Surrogate`注解。`@Surrogate`的含义是指定某个Mixin方法的“代理方法”，当Mixin方法对不上时，通知Mixin用这个代理方法试试看。

   你需要先统一两个方法的名称，比如这里让它们都叫`mixinMethod`，然后找出形参个数更多的那个方法作为主要的Mixin方法，剩下那个作为代理方法。删去代理方法的`@Inject`，加上`@Surrogate`即可。

3. 第二种方式是借助`IMixinConfigPlugin`来控制，由于与前两种方法相比比较笨重，故此处不再讨论。

#### 更坏的情况

有些时候你可能会遇到更坏的情况：Optifine把某个类型为`BlockPos`的局部变量改成了它自己的`BlockPosM`。显然反射也不能让你在没有Optifine源代码的情况下写出`BlockPosM`作为形参，但要是形参类型填成Object以供在方法内部再行处理，Mixin又只会认得Object这个类本身，导致游戏爆炸。

Mixin贴心地提供了一个注解`@Coerce`，作用于形参上，让我们告诉Mixin“虽然我想要Object但你也不要那么严格啦有什么来什么吧”。随后你就可以在方法内，通过强制类型转换或者反射，来处理这个被糟蹋过的参数。


---

## AT

AT全称Access Transformer，其用处十分简单明了：把`private`变成`public`或`protected`，或是去掉`final`。

要启用AT，你需要在`build.gradle`中找到这一行，去掉前面的注释符号，并在相应位置创建这个文件即可。

```gradle
accessTransformer = file('src/main/resources/META-INF/accesstransformer.cfg')
```

:::caution

不要更改这个路径。在生产环境中，Forge不会理会你在此处的自定义路径。

:::

以`net.minecraft.client.gui.components.EditBox`中的`renderHighlight`方法为例：

我们希望将这个方法变为公开，故在`accesstransformer.cfg`中写入

```cfg
public net.minecraft.client.gui.components.EditBox
```

然后输入`renderHighlight`，在提示框中选中，`tab`。

现在它看起来是这样:

```
public net.minecraft.client.gui.components.EditBox m_94135_(IIII)V # renderHighlight
```

:::tip

在修改`accesstransformer.cfg`后，总是需要刷新Gradle项目。

:::

然后刷新gradle项目，等到完成后你就会发现`renderHighlight`前面的访问修饰符变成了`public`。

:::info

这里的`m_94135_(IIII)V`是`renderHighlight`的SRG名，在生产环境中是不存在moj名的。你如果以后需要用到反射，也要记得使用SRG名。

在源代码中右键方法名，`Get SRG Name`也可以得到这个名称。

:::

<div style={{
    backgroundColor: 'transparent',
    border: '2px solid #3c91ff',
    borderRadius: '0.5em',
    padding: '1em',
  }}>
<Tabs groupId="mc-version">
<TabItem value="1204" label="1.20.4">
### Moj in everywhere
1.20.4的NeoForge彻底取消了SRG作为中间名的存在，实行`moj in everywhere`的政策。

直接填写你看到的名称，即Moj名即可。
</TabItem>
</Tabs>

<p></p>
</div>

<p></p>

---

## 奇奇怪怪的注意事项

### 获取Mixin method、SRG、AT、AW名

你可以在[Linkie](https://linkie.shedaniel.dev/)查询类名、字段、方法的各种名称，以及它们在不同映射表中的名称。

:::tip

除了自动生成Accessor/Invoker之外，MCDev也可以帮你获取这些名称。只需要把光标放在对应类名、字段、方法处：

- 对于SRG名：`右键 > Get SRG Name`
- 对于其他名称：`右键 > 复制/粘贴特殊`

:::