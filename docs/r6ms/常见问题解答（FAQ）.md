---
id: faq
title: FAQ
hide_table_of_contents: false

---

# 常见问题解答

---

- Q：我没有正版账号，我可以游玩R6MS吗？
- A：R6MS本身与其他mod无异，并不限制你的登录环境。



- Q：我是服主或管理员，我想要在我的服务器上玩R6MS？
- A：R6MS的最简安装过程相当简单——就像其他mod一样，下载最新版本的jar，放进mods文件夹即可。如果想要探索其他功能，请阅读指南的其余内容。



- Q：我没有正版账号，我可以获取和使用武器涂装（皮肤）吗？
- A：很遗憾，武器涂装系统和正版账号是强绑定的。


- Q：我要如何获取武器涂装？
- A：目前有以下几种预想中的获取涂装途径：我们举行的活动或事件、指定渠道的捐赠、我们对特定玩家赠与、以及在服务器中购买。
  - 我们举行的活动或事件通常会在指南首页和bilibili进行宣布。通过这种途径获得的涂装最迟会在数周内发放。
  - 你通过爱发电捐赠获得的涂装将在一个捐赠周期满后发放。为符合[MINECRAFT 使用准则](https://www.minecraft.net/zh-hans/usage-guidelines)中的有关说明，我们采取捐赠周期机制。
    - 目前一个捐赠周期暂定为TODO
  - 在邀请特定玩家进入游戏时，我们可能会发放专有的武器涂装。
  - 连接到Voyager的多人游戏服务器可能会被允许售卖指定的涂装。我们不会直接售卖任何涂装，一切涂装售卖均由服务器进行。服务器通知我们售卖的对象并支付指定的费用（如果存在）。
    - 如果服务器并未向我们支付指定的费用，则你购买的涂装可能不会被发放。



- Q：会有盔甲涂装吗？
- A：出于对战公平性考虑，不会有盔甲涂装。



- Q：会有武器小挂件吗？
- A：我们有相关的技术计划。

---

## 错误与警告排除

以下列举出在游戏运行过程中可能出现的警告和错误，以及导致此错误的原因、对应的解决方案、程序预设的处理方法和手动处理建议。不保证完全覆盖所有情况。

如果提供内容不够详细，或是你需要进一步的支持，请到KOOK联系模组开发者。

### 双端

- &#8203;<font color="ff5555">Failed to load config ... . Things may not work well.</font> 启动时加载某个配置文件失败。
    - 游戏将自动继续，但推荐你重新启动游戏。缺失的配置文件可能会导致意外的行为。
    - 如果重新启动游戏后仍异常，请检查对应的配置文件是否被占用或出现错误。



- &#8203;<font color="ff5555">Cannot find id for skin ... . If this is a development environment, assign it. This should not happen in product environments.</font> 未能找到为皮肤预先设定的id值。
    - 在发行版本中不应该发生这样的情况。请联系mod开发者。
    - 有另一个与此相似的错误，不过不是skin而是item，不再赘述。



- &#8203;<font color="ff5555">Failed to find skin ... for item ... . This should not happen.</font> 未能找到物品标签所指的皮肤。
    - 在发行版本中不应该发生这样的情况。请联系mod开发者。



### 服务器端

- &#8203;<font color="ff5555">Failed to find channel for ... .</font> 服务器在向玩家发送网络包时找不到对应的Channel。请联系mod开发者。
    - 网络包将会被丢弃。




- &#8203;<font color="eedd00">Player ... sent a RoundPrepareTopView packet, but it looks like this player is not in a match.</font> 玩家向服务端发送了用于请求将其传送至地图俯视图位置的网络包，但该玩家并未在对战中。
    - 玩家的请求将会被忽略。




- &#8203;<font color="eedd00">Player ... sent a RoundPrepareTopView pacbket and wants to teleport to ... , but it looks like this pos is not in the range of designated map.</font> 玩家向服务端发送了用于请求将其传送至地图俯视图位置的网络包，但请求的位置不在对战地图范围内。可能是因为玩家的Minecraft窗口有不寻常的长宽比；也可能是恶意发包。
    - 玩家的请求将会被忽略。



- &#8203;<font color="eedd00">[ServerMatchController]: Failed to find world ... .</font> 在对战结束尝试恢复玩家状态时失败，找不到玩家之前所在的世界。可能是整个世界被卸载，或是世界已经不存在，或是配置文件中的世界名被不正确地修改。
    - 玩家将会被传送回世界出生点。



- &#8203;<font color="ff5555">[RoundPrepareTopView]: Failed to find world ... .</font> 玩家向服务端发送了用于请求将其传送至地图俯视图位置的网络包，但找不到该地图所在的世界。可能是整个世界未被加载，或是世界已经不存在，或是配置文件中的世界名被不正确地修改。
    - 玩家的请求将会被忽略。


:::info

模组开发者对服务器使用的多世界插件并不熟悉，因此可能在此处或类似的地方产生错误。请及时联系模组开发者。

:::



- &#8203;<font color="ff5555">Can't get player ...'s before-match data. This should not happen.</font> 在对战结束尝试恢复玩家状态时失败，找不到玩家在对战前保存的数据。请联系mod开发者。
    - 玩家将会被传送回世界出生点、清空并重置所有状态，被设为服务器默认游戏模式。



- &#8203;<font color="eedd00">Received unreasonable network packet ... from ... . ...</font>玩家向服务器发送了与对战有关的网络包，但其内容看起来不太合理。若频繁出现，考虑恶意发包可能。
    - 玩家发送的内容可能会被忽略。
