---
id: -5
title: -5 lib-mod
description: lib-mod
hide_table_of_contents: false
sidebar_position: 40
---

# lib-mod

在这一章，我将以《T88》这个lib-mod为例，向你讲述如何编写并使用属于自己的lib-mod。

当你写了不止一个mod的时候，你很有可能会发现你需要时不时的从之前的mod中复制代码到之后的mod——如果这些代码的数量达到了相当的程度，你可以选择将这些复用代码收集起来，整理为一个库模组，亦即lib-mod。

我们将借助CurseForge和CurseMaven来实现这一目的。

## lib-mod本质上也是一个mod

所以，像平常一样，新建一个mod，取一个你想要的名字，构建，把你的共享代码写进去。

然后你需要在你的`build.gradle`中增加一行：

```java
java {
    ...
    withSourcesJar()
}
```

刷新项目，你会发现在`build > jar`旁边多出来一个`sourcesJar`。顾名思义，这个任务将会把你的mod打包为源代码Jar，而不是编译和混淆之后、可以在被MC加载的Jar。

## 在CurseForge上发布

然后你就可以把这个mod在CurseForge上发布了。请在上传jar文件之后，将source-jar也上传。

我建议你在项目介绍中写明类似如下的内容：

> 注意：如果你需要在游戏中使用此模组，请下载**不**带“sources”后缀的版本！
>
> Attention: If you want to install this mod to your game, do download the versions WITHOUT "sources" !

## 使用这个lib-mod

借助[CurseMaven](https://www.cursemaven.com/)，我们可以方便地将CurseForge上的mod作为你自己mod的依赖。

在你的lib-mod首页，即`Description`一栏，你可以在右侧找到你的`ProjectID`。

你的lib-mod在上传CurseForge，在`Files`一栏，分别点击对应的jar和source-jar，将鼠标悬停于`Install`旁的下拉菜单中的`Download file`，你就可以在浏览器下方显示的URL中查看它们的`fileID`了。

:::tip

即使你的mod jar暂时没有审核通过，你也可以照常查看并使用`fileID`。

:::

打开你需要使用lib-mod的mod，在`build.gradle`中增加：

```gradle
//注意，这里不是在buildscript之下，而是build.gradle接近末尾处有单独的一块。
repositories {
    maven {
        url "https://cursemaven.com" 
        content { includeGroup "curse.maven" }
	}
}

dependencies {
    implementation fg.deobf("curse.maven:[lib-mod名称]-[ProjectID]:[jar的fileID]-sources-[source-jar的fileID]")
}
```

刷新项目，你应该就能在外部库列表里找到你自己的lib-mod了。

然后你还需要在`mods.toml`中告诉FML，你需要这个lib-mod：

```toml
# 在末尾添加如下内容
[[dependencies.你的modid]]
modId = "你依赖的lib-modid"
mandatory = true
versionRange = "[你依赖的lib-mod版本号下限,上限)" # 无上限则可以留空
ordering = "NONE"
side = "BOTH"
# 各项含义请参照原文件内的注释
```

更多内容可以参考CurseMaven的官方网站，https://www.cursemaven.com/ 。
