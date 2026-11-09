# 三国兵临天下（微信版）恢复进度

项目仓库：`ExportProject/sanguo-binglin-wx`，工作工程在 [layaProject](../../layaProject)（待建）。
引擎为 LayaAir 1.8.15beta（1.x 系），恢复流程按 [Docs/LAYA-WECHAT-RECOVERY.md](../../../Docs/LAYA-WECHAT-RECOVERY.md) 执行。

## 身份与输入

| 项 | 值 | 证据 |
|---|---|---|
| 微信 AppId | `wxd05c3c97011f85f6` | 微信 packages/local 目录名；包内 project.private.config.json |
| 包版本 | `59` | `OriginProject/sanguo-binglin-wx/packages/59`（__APP__ + _code1.js 两个 wxapkg） |
| 引擎 | LayaAir `1.8.15beta` | game.js 内嵌 laya.core 的 `s.version="1.8.15beta"`；`MiniAdpte` 1.x 拼写；local 缓存 `usr/layaairGame` |
| 游戏内部代号 | `sg3`（37 平台 `wx_37`） | projectname=`sg3_37`；net_cfg.json sg3 自营平台 ptkill.com；game37_game_id=174 |
| 官方名称 | 三国兵临天下 | xiaoyouxi.qq.com 官方详情页；开发商=海南惠莱网络科技有限公司；版号著作权人=广州墨海信息科技有限公司 |
| 朝向 | 竖屏 portrait | app-config.json `deviceOrientation` |
| 业务版本 | `v_9_1_1` | code.js `window.app_version`；net_cfg.json wx_37 下存在 v_9_0_0…v_9_1_2 |

## 启动链取证（game.js，merged define 模块合集）

```
require("game.js")
  → require("weapp-adapter.js")
  → window.msgpack5/sha256/Parser/md5fun = require("./js/…")
  → window.game37Sdk = require("./js/37wxzqwz.js")   // 37 互动 SDK
  → require("./laya.js")                              // laya.core 1.8.15beta + MiniAdpte（内嵌）
  → require("./code.js")                              // 引导：
      NativeLoadingView.show() (loading.png)
      wx.request GET {ncpurl}net_cfg.json             // ncpurl = https://cdn-sg.fle078.com/static/h5/
      → wx_37[v_9_1_1].minigameid（当前为空 → 默认 "game"）
      → wx.loadSubpackage("game")                     // = /code1.js 分包（8.6MB 业务）
```

- game.js 主包含 28 个 define 模块（@swc/runtime helpers、js/* 工具、weapp-adapter、laya.js、code.js、game.js 入口）。
- code1.js：微信分包壳（GameGlobal/requirePlugin wrapper）+ 单个巨型 UMD IIFE `(function(window,document,Laya){…})`，混淆类合集（`__init([...])` 装饰器注册，业务命名空间 `sg.*`，前缀 `meng52`），尾部 AMD 导出 laya.core。
- 运行配置（net_cfg.json → wx_37 → v_9_1_1）：
  - 资源根 `assets_base_url = http://cdn-sg.fle078.com/static/h5/cn91-mini/`（ussl=yes → https）
  - 游戏服 `http_url = http://w3-clb.fle078.com/gateway/`（死活待实测）
  - 备服 another1：`http://sg4-w1.fle078.com/gateway/` + `cdn1-sg4.fle078.com/static/h5/cn80/`

## 声明分包状态

| 分包 | root | 状态 |
|---|---|---|
| game | /code1.js | ✅ 已归档（_code1.js.wxapkg，8.6MB） |
| preselection | /preselection/ | ✅ 已补齐归档（2026-11-09 原生桥接 `wx.preDownloadSubpackage` 触发下载 → `_preselection_.wxapkg` 19,231B 归档解包，inventory missing=[]，见下文） |

## 工作副本脱敏记录

`layaProject/code1.js` 含一处原包内嵌的 Google OAuth refresh token（`1//…` 形态，第三方开发者遗留，GitHub push protection 判定为真实凭据）。工作副本以等长 `1//XXXX…` 占位脱敏后提交；**原包字节在 `OriginProject/sanguo-binglin-wx/packages/59/` 完整保真未改**（SHA256 见 source-manifest.json），差异仅此一处字符串。行为对照以 OriginProject 解包产物为准。

## 输入归档（不上传）

`OriginProject/sanguo-binglin-wx/`：

- `packages/59/` — 2 个 .wxapkg，SHA256 见 `source-manifest.json`
  - `__APP__.wxapkg` 396e857f…f10bc（1,264,920 B）
  - `_code1.js.wxapkg` e3625760…3c694（8,631,062 B）
- `unpacked/` — 解包输出（game.js/code1.js/loading.png/app-config.json/version.json/project.private.config.json，含逐文件哈希）
- `cdn/` — 远端相对路径镜像（net_cfg.json 已取，其余待按清单下载）

微信源目录只读，未改动任何原文件。

## 恢复状态

- ✅ AppId/身份定位（名称←官方详情页 + 包内证据交叉）
- ✅ 原包归档与解包（V1MMWX 只读解包，复用 Tools/Cocos/packages.py）；local 运行缓存（449 文件，48MB）一并归档
- ✅ 启动链/引擎版本/CDN 根/游戏服地址取证（本文件）
- ✅ CDN 在线性实测：`https://cdn-sg.fle078.com/static/h5/net_cfg.json` HTTP 200
- ✅ 工作工程 `layaProject/`（6 文件根结构，原包只读复制品）
- ✅ 浏览器基线 PASS（2026-11-09，见下节）
- ✅ preselection 分包补齐归档（2026-11-09，见「补齐记录」）
- ✅ 真实微信凭据登录基线 PASS：本人账号经 37 SDK → gateway → 选服 → 主城（2026-11-09，见「真实登录基线」）
- ✅ 第二次真实登录 + 主城多面板遍历（2026-11-09，见「第二次真实登录会话」）
- ✅ Laya 1.x 工程骨架建立 + LayaAirIDE 1.8.17 实机打开（editorVersion 已登记）
- ⏳ CDN 资源按玩法全量镜像（561 文件/40MB：启动 + 主城/世界/四面板子集；商店/国家等未响应入口未覆盖）
- ⏳ TS 业务源码恢复（code1.js 8.6MB 混淆 UMD → TS；台账已建 3,484 类；**批次 A 11 类 + 批次 B 54 类已交付**（tsc 2.6.2 全工程零错误，oracle 逐字节快照 65/65，token 区间零重叠；报告见 `Projects/RecoveryData/sanguo-binglin-wx/translation/batch-{a,b}-report.md`）；缓译清单含 Laya.Platform（109KB，token 区间在其 wrapper 内需独立授权）、ConfigClass、ViewMenuMain*、ui.com.* 注册面等）
- ⏳ F8 运行页 + 玩法回归
- ⏳ 发布替换验证、微信开发者工具对照

各项验证均独立记录，未执行写 NOT_RUN。

## 浏览器运行基线（2026-11-09, revision wx59-20261109-r001）

**结论：原编译包在浏览器中经真实微信代码路径启动，NativeLoadingView → 游戏内加载页（10% 进度条 + 「加载完毕选马超」）→ 正式封面（金色「三国兵临天下」LOGO + 攻城战原画 + 16+ 标识 + 版号信息）渲染确认。**

- 装具：`Tools/Projects/sanguo-binglin-wx/runtime/`（serve.py 文档根=layaProject + 公共桩零副本引用 `Tools/BrowserHarness` + 基线页 index.html）
- 路径：weapp-adapter → 内嵌 Laya 1.8.15beta → msgpack5/sha256/md5/dom_parser 工具 → 37 SDK（37wxzqwz）→ code.js（net_cfg.json 路由）→ loadSubpackage("game")=code1.js → 业务初始化 → 配置 bin 下载 → 37 SDK 登录链 → gateway `user_zone.login`
- **活服透明转发**（红线：不伪造应答）：
  - gateway JSON-RPC `https://w3-clb.fle078.com/gateway/`（原包用 http://，CLB 同后端 443 可用，经 `/__api/` curl 转发；`sys.new_get_config_v1` 200 返回真实配置 bin 清单）
  - 37 SDK `gapigameh5.shxnetwork.com/api/v1/domain/toggle`、`gapigameh5.ohk36.com/api/v1/quickAppEnter`
- **CDN 镜像**（`/__cdn/` 镜像优先 + miss 实时拉取落盘）：77 文件全 200 零失败（net_cfg.json、cn91-mini/mini/* 哈希名 png/jpg/ani/atlas/aac/sk 等），落 `OriginProject/sanguo-binglin-wx/cdn-mirror/`，拉取清单 `RecoverProject/.../cdn-fetch-log.json`
- **真实登录边界（等价记录，非缺陷）**：wx.login 桩 code（`browser-stub-login-code`）被真实 37 服务器拒绝（`sq 登录异常返回信息`），gateway `user_zone.login` 随后以空 uid 发出并停在封面。与原包在无有效凭据环境下的行为一致；真实登录需按 [WECHAT-LOGIN-INTEGRATION.md](../../../../Docs/WECHAT-LOGIN-INTEGRATION.md) 用本人微信凭据取新 code，未执行（NOT_RUN）
- 非致命：腾讯 datanexus 遥测跨域失败（真实手机走微信原生通道，浏览器如实失败）、`monkey_version` 读取 unhandled-rejection（37 SDK 分支）
- 画面证据：`temp/sanguo-binglin-wx/screenshots/baseline-loading-10pct.png`、`baseline-cover.png`（contain-fit 无变形，画布 750x1334 竖屏）
- 启动日志镜像：`RecoverProject/sanguo-binglin-wx/Results/wx59-20261109-r001/browser-serve-log.jsonl`

## preselection 补齐记录（2026-11-09，r015–r020）

- 公共工具新增显式 scene 策略参数（`--bridge-log-filtered-scenes` / `--bridge-extra-scenes`，默认行为与上游逐字节等价，策略写入 scene-policy.json 证据）：实证桌面快捷方式启动 scene=**1023**（另有 1000，上游注释标注会崩进程故不放行），经 `--bridge-extra-scenes 1023` 放行后 NATIVE_CONNECTED，实现完全无人值守桥接（无需从微信内手动打开）。
- 链路：contexts（原生 wx 上下文唯一匹配 appId）→ `wx.preDownloadSubpackage("preselection")` SUCCESS → archive：`_preselection_.wxapkg`（19,231B，SHA256 0357bee7…）归档至 `packages/59/`，解包入口 `preselection/game.js`，inventory `missing=[]`、`entriesWithoutArchivedEvidence=[]`、status=ALL_DECLARED_SUBPACKAGES_ARCHIVED。

## 真实登录基线（2026-11-09，r021–r024）

**结论：本人微信凭据完整登录链路 PASS，已进入主城。**

- 装具：`serve.py --auth-session`（公共 `Native.WeChat.auth.LoginProvider`，`/__wechat_auth/*`）+ index.html wx.login 覆盖（真实 code 交付前置 `__recoveryAuthMode=true`，全页 console 脱敏；提供器不可用回退桩码并明示）。
- 取码：`wechat-auth prepare`（身份绑定）→ capture（`NATIVE_WX_LOGIN_CONTEXT_BOUND` 等待恢复页请求）→ 基线页 wx.login → POST 唤醒 → `FRESH_NATIVE_CALLBACK_ACQUIRED`（codeLength=32，`consumedByOriginalGame=false`，callback.json 交付即删）→ 120 秒窗口内完成交付。
- 登录链（全部经 /__api/ 透明转发，真实应答）：wx.login 真实 code → 37 SDK `gapigameh5.ohk36.com` 兑换接受 → gateway `user_zone.login` → 欢迎公告 → 选服「交州海市」→ **主城**（玩家「巴蜀战少」，资源条/大地图/任务/国战横幅/底部功能栏俱全）。
- 画面证据（temp，不上传）：`temp/sanguo-binglin-wx/screenshots/login-01-announcement.png`、`login-02-server-select.png`、`login-03-main-city.png`。
- 收尾：会话 cleanup 完成（binding/requested/consumed 之外无残留、callback 已删）、桥接 DETACHED。

## 第二次真实登录会话与主城遍历（2026-11-09，r025–r030）

**结论：真实凭据再次登录 PASS，主城→多面板遍历完成，CDN 镜像 438→561 文件（+123）。**

- 链路：桥 r025（快捷方式 scene 1023 放行，主会话后台持有）→ auth r026（prepare/serve/capture r028 一次性 code 交付）→ 选服「交州海市」→ 主城（蜀·成都）。
- 合成输入通道实证：浏览器内对 canvas 派发 DOM MouseEvent/TouchEvent 无效（weapp-adapter touch 转发抛错）；必须走公共桩 `window.__wxTapStage`（wx.onTouchStart 注册回调 = 微信真实输入路径）。选服页「进入游戏」stage(319.5,801.5)。
- 遍历（只读，无消耗操作）：主城双视图（建筑/世界大地图）✅、英雄（已招募/未招募/传奇…良才页签）✅、征战（演武场/武馆/探险）✅、仓库（道具/技能/军械/宝物碎片）✅、剧情任务（国家栋梁）✅；**商店、国家、左侧活动列、铁匠铺在 harness 下点击无响应**（如实记录，待 F8/真机对照单列）。
- 画面证据（temp，不上传）：`temp/sanguo-binglin-wx/screenshots/session2/`（9 张：主城两视图、四面板、无响应证据两张、任务面板）。
- CDN 镜像增量：+123 文件（ani/atlas/png 为主，40MB 总量），落 `OriginProject/sanguo-binglin-wx/cdn-mirror/`。
- 收尾：serve 停止 → stop r029（DETACHED 无清理错误）→ cleanup r030（会话元数据删除）。

## 工作工程结构（LayaAirIDE 1.8.17 实机打开）

```
layaProject/
├── game.js / code1.js / loading.png / app-config.json / version.json /
│   project.private.config.json        ← 原包解包复制品（根位，与先例同构）
├── layaProject.laya                   ← 工程标记（1.x 4 字段，无 version）
├── tsconfig.json / .laya/{launch,tasks}.json（F8 = tsc -p . --outDir bin/js）
├── laya/.laya / src/LayaSample.ts（占位，翻译批次替换）
├── bin/index.html（H5 运行页，git 豁免跟踪）/ bin/libs/（1.8.17 引擎库，忽略）
└── libs/（LayaAir.d.ts + layaAir.minigame.d.ts + union.d.ts）
```

- 结构与取值全部来自 IDE 1.8.17 模板/新建流程取证（9 文件逐字节副本 + 标记按 newPro.js 逻辑重建），详见 `temp/sanguo-binglin-wx/laya-staging/_README-STAGING.md`（过程数据）。
- IDE 实机打开验证：`LayaAir.exe <工程目录>` argv 方式成功，窗口标题「layaProject - LayaAir」；`editorVersion=1.8.17` 已登记（engineVersion 保持原包 1.8.15beta）。
- 已知约束：IDE 自带 tsc 为 TypeScript 2.6.2（恢复 TS 需兼容 TS2.6/es5）；`bin/libs`（1.8.17）只服务 H5 骨架预览，不得当作原包运行验证；`.laya/chrome/` 首次调试后需补忽略。
