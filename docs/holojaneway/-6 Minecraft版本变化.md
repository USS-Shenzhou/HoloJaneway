---
id: -6
title: -6 Minecraft版本变化
description: -6 Minecraft版本变化
hide_table_of_contents: false
sidebar_position: 40

---

# Minecraft版本变化

这一章将会记录在MC版本更新之后需要做出、但又不需要以补丁形式写在其他章节中的改动。善用右侧目录和`ctrl+F`。

显然不可能完全记录所有可能需要的改动，作者也没有精力去搜集更多的信息——所以下列只是记录遇到的。

---

## 1.18.2→1.19.4

- 这是一些第三方参考：
    - 1.19.2-1.19.3 https://gist.github.com/ChampionAsh5357/c21724bafbc630da2ed8899fe0c1d226
    - 1.19.3-1.19.4 https://gist.github.com/ChampionAsh5357/163a75e87599d19ee6b4b879821953e8

- `RegistryEvent`→`RegisterEvent`。在泛型中指定注册类型→在参数中指定注册类型。可选的注册类型在`ForgeRegistries.Keys`内。

- `setRegistryName`被取消。在`DeferredRegister.register`或`RegisterEvent.register`中指定。

- `object.getRegistryName`→`ForgeRegistries.[注册类型].getKey(object)`。

- `Component`（GUI）的各种子类被取消。`Component`现在提供对应的静态工厂方法。