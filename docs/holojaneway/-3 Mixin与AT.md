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

:::tip

你应该尽量避免使用Mixin。请确认已经没有其他方法（例如监听事件），或是替代方法非常不划算后再使用Mixin。Mixin的加入可能会极大地提高错误出现的可能性和诊断错误的难度。

:::

:::caution

Mixin的作用范围仅限于MC本身和其他mod，不能对其他依赖进行修改。比如说，`net.minecraft.commands.arguments.coordinates.Vec3Argument`是一个有效的Mixin目标，而`com.mojang.brigadier.arguments.DoubleArgumentType`则不是。

如果你确实需要对第三方依赖进行修改，那不妨考虑继承后再@Override等其他方法。

:::

:::tip

所有的Mixin类应该放且仅放在mixin包中。mixin包中也不应该包含普通类，比如你的方块或者实体什么的。

当然，你也可以分好几个包，但多数情况下这没有必要，以后不再讨论。

:::

一般情况下，你需要通过各种各样的注解来完成多数的工作。以下是一些常用或者常见的注解说明。

- `@Mixin`标记这是一个Mixin类，并指定会被Mixin的类（即目标类）是什么。

- `@Inject`标记这是一个回调方法，这个方法所含的内容将会被注入指定的位置。一般而言这是最常用的注解。

- `@At`写在`@Inject`和其他注解内，标记具体的作用位置。

- `@Redirect`标记这是一个重定向方法，指定的方法调用将会被重定向到此方法。

- `@Overwrite`标记这是一个覆盖方法，指定的方法将会被覆盖为此方法。

:::danger

不建议使用`@Overwrite`，它可能会导致更大的兼容性问题。

:::

- `@Shadow`标记一个占位字段或方法，真实的字段或方法存在于目标类中。

- `@Accessor`标记一个访问器方法，允许你访问指定的字段。

- `@Invoker`标记一个调用器方法，允许你调用指定的方法。

- `@Modify...`标记对某种量的更改，可以是参数、变量或常量。

:::info

你可以在[Mixin的JavaDoc](https://jenkins.liteloader.com/view/Other/job/Mixin/javadoc/index.html)找到更详细的说明。

[Mixin的GitHub wiki](https://github.com/SpongePowered/Mixin/wiki)对Mixin的工作原理有详细的解释，[mouse0w0的博客](https://mouse0w0.github.io/tags/Mixin/)有翻译版本。

> 为什么Forge开发者常常要看Fabric Wiki？好怪！

[Fabric Wiki](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_introduction)对Mixin的使用有详细的介绍。

:::

### 修改

下面，我们将以一些场景为例，向你讲述如何使用Mixin修改原版内容。你可以不必看具体的修改内容。

:::tip

如果你的目标类/方法是在生产环境中不会被混淆的类/方法，比如其他mod中的内容，你需要在`@Mixin`或`@Inject`中加入`remap = false`来告诉Mixin不要进行混淆。

你进行修改的方法应当在方法名前加上你的modid，或者以其他方式明显地标示这个方法属于哪个mod。

:::

#### Inject - 在Brighter中修改方块光衰减的方式

这样就可以减少衰减而增加扩散了。Brighter, MixinBlockLightEngine, GPLv3：

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

如上所示，在需要使用父类的方法时，你可以让Mixin类（即你看到的这一大坨`MixinBlockLightEngine`）继承目标类（即`BlockLightEngine`）的父类（即`LayerLightEngine`）。

:::tip

继承父类后可能会要求创建匹配的构造方法，直接`alt+enter`就可以，此处的构造方法仅起到保证语法的作用。也可能会要求实现某些抽象方法，你可以将Mixin类标记为抽象类来省去这个麻烦。

:::

在需要使用目标类的方法时，你可以使用`@Shadow`来标记一个Mixin类中的同名方法，这样Mixin就会知道去调用目标类中的对应方法。

:::tip

相似地，你可以把这个方法标记为抽象方法，来省去一对大括号。

如果这是一个final方法/字段，记得加上`@Final`。

你也可以使用`((目标类)(Object)this)`来访问目标类的方法或字段。当然，这种方法比`@Shadow`一定程度上更简便，却会受到访问控制的限制。

:::

关于其他不同的注入位置如何指定，请参照上文提到的Fabric Wiki中的[示例](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_examples) 。

:::tip

如果你不确定方法参数应该怎样填写，`alt+enter`让`Minecraft Development插件`来完成就好了。

:::

对于有返回值的目标方法，你可以使用`cir.setReturnValue(...)`来指定返回值并返回。如果方法没有返回值，你可以使用`ci.cancel()`来结束目标方法。如果你以上两个都不做，目标方法就会在执行完你的注入内容后继续执行剩下的内容。

:::tip

如果你要如上使目标方法返回的话，记得在`@Inject`中写上`cancellable = true`。

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

### 增加

#### 在R6MS中，我们需要在适当的时候将摄像机改为正交视图

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

要为目标类添加方法和字段很简单：直接写进Mixin类即可，Mixin会自动地为你处理后面的事情。

:::danger

你增添的字段或方法应当在方法名前加上你的modid，如果你喜欢，可以使用`$`分隔；或者以其他方式明显地标示这个字段或方法属于哪个mod。总之要避免与原版或者其他mod出现潜在的重名可能。你也可以使用`@Unique`注解，但我的习惯是加上modid就足够了。

:::

你不能直接在外部其他什么类中调用Mixin类的新增方法（你任何时候都不应该这么做）。想要使用新方法，你需要让你的Mixin类实现一个中转接口，在这里是`LevelRendererProxy`。在实际使用时，像这样来调用新方法：

```java
((LevelRendererProxy) minecraft.levelRenderer).r6msEnableOrthographic(cameraZoomFactor).setR6msClipRoof(clipRoof);
```



---

### 错误排查

mixin在注入过程中或者注入之后很有可能产生错误或不符合预期的表现。

TODO


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

然后刷新gradle项目，等到完成后你就会发现`renderHighlight`前面的访问修饰符变成了`public`。

:::info

这里的`m_94135_(IIII)V`是`renderHighlight`的SRG名，在生产环境中是不存在moj名的。你如果以后需要用到反射，也要记得使用SRG名。

在源代码中右键方法名，`Get SRG Name`也可以得到这个名称。

:::

:::tip

在修改`accesstransformer.cfg`后，总是需要刷新Gradle项目。

:::