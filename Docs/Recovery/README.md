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
| preselection | /preselection/ | ❌ 微信缓存未下载，缺失待补齐（按 WECHAT-PACKAGE-COMPLETION.md） |

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
- ⏳ preselection 分包补齐（微信缓存未下载）
- ⏳ CDN 资源按玩法全量镜像（当前 77 文件为启动请求子集）
- ⏳ TS 业务源码恢复（code1.js 8.6MB 混淆 UMD → TS）
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
