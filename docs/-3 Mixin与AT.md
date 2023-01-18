---
title: -3 Mixin与AT
description: Mixin与AT
hide_table_of_contents: false
sidebar_position: 60
---

# Mixin与AT

当你的mod开发到一定程度时，很有可能会遇到需要修改原版已有内容的情况。在这一章，我们将会介绍两个有用的工具，来帮助你达成这个目标。

---

## Mixin

Mixin是一个非常强大的工具，它基于[ASM](https://asm.ow2.io/)，帮助你方便地修改原版内容。

:::tip

你应该尽量避免使用Mixin。请确认已经没有其他方法，或是替代方法非常不划算后再使用Mixin。Mixin的加入可能会极大地提高错误出现的可能性和诊断错误的难度。

:::

:::caution

Mixin的作用范围仅限于MC本身和其他mod，不能对其他依赖进行修改。比如说，`net.minecraft.commands.arguments.coordinates.Vec3Argument`是一个有效的Mixin目标，而`com.mojang.brigadier.arguments.DoubleArgumentType`则不是。

如果你确实需要对第三方依赖进行修改，那不妨考虑继承后再@Override等其他方法。

:::

:::tip

所有的Mixin类应该放且仅放在mixin包中。当然，你也可以分好几个包，但多数情况下这没有必要，以后不再讨论。

mixin包中也不应该包含普通类，比如你的方块或者实体什么的。

:::

一般情况下，你需要通过各种各样的注解来完成多数的工作。以下是一些常用或者常见的注解说明。

`@Mixin`标记这是一个Mixin类，并指定会被Mixin的类（即目标类）是什么。

`@Inject`标记这是一个回调方法，这个方法所含的内容将会被注入指定的位置。一般而言这是最常用的注解。

`@At`写在`@Inject`和其他注解内，标记具体的作用位置。

`@Redirect`标记这是一个重定向方法，指定的方法调用将会被重定向到此方法。

`@Overwrite`标记这是一个覆盖方法，指定的方法将会被覆盖为此方法。

:::danger

不建议使用`@Overwrite`，它可能会导致更大的兼容性问题。

:::

`@Shadow`标记一个占位字段或方法，真实的字段或方法存在于目标类中。

`@Accessor`标记一个访问器方法，允许你访问指定的字段。

`@Invoker`标记一个调用器方法，允许你调用指定的方法。

`@Modify...`标记对某种量的更改，可以是参数、变量或常量。

:::info

你可以在[Mixin的JavaDoc](https://jenkins.liteloader.com/view/Other/job/Mixin/javadoc/index.html)找到更详细的说明。

[Mixin的GitHub wiki](https://github.com/SpongePowered/Mixin/wiki)对Mixin的工作原理有详细的解释，[mouse0w0的博客](https://mouse0w0.github.io/tags/Mixin/)有翻译版本。

> 为什么Forge开发者常常要看Fabric Wiki？好怪！

[Fabric Wiki](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_introduction)对Mixin的使用有详细的介绍。

:::

下面，我们将以一些场景为例，向你讲述如何使用Mixin。

:::tip

如果你的目标类/方法是在生产环境中不会被混淆的类/方法，比如其他mod中的内容，你需要在`@Mixin`或`@Inject`中加入`remap = false`来告诉Mixin不要进行混淆。

:::

### 在Brighter中，我们需要修改方块光衰减的方式，以达到减少衰减增加扩散的目的

GPLv3：

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

在需要使用目标类的方法时，你可以使用`@Shadow`来标记一个Mixin类中的同名方法，这样Mixin在运行时就会去调用目标类中的方法。

:::tip

相似地，你可以把这个方法标记为抽象方法，来省去一对大括号。

如果这是一个final方法/字段，记得加上`@Final`。

你也可以使用`((目标类)(Object)this)`来访问目标类的方法或字段。当然，这种方法比`@Shadow`一定程度上更简便，却会受到访问控制的限制。

:::

关于不同的注入位置如何指定，请参照上文提到的Fabric Wiki中的[示例](https://fabricmc.net/wiki/zh_cn:tutorial:mixin_examples) 。

:::tip

在编写你的Mixin方法时，你可以在方法名前后加上mod id或者其他什么东西，以便于在发生错误时进行定位。

如果你不确定方法参数应该怎样填写，`alt+enter`让`Minecraft Development`插件来完成就好了。

:::

对于有返回值的目标方法，你可以使用`cir.setReturnValue(...)`来指定返回值并返回。如果方法没有返回值，你可以使用`ci.cancel()`来结束目标方法。如果你以上两个都不做，目标方法就会在执行完你的注入内容后继续执行剩下的内容。

:::tip

如果你要如上使目标方法返回的话，记得在`@Inject`中写上`cancellable = true`。

:::

### 在MadParticle中，我们需要访问ParticleEngine的字段，并执行私有方法

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

:::

:::tip

在使用`@Accessor`和`@Invoker`时，如果你没有改变默认生成的方法名，则不需要在其后指定具体的作用对象。比如在这个例子中，`("spriteSets")`是不必要的。

:::

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