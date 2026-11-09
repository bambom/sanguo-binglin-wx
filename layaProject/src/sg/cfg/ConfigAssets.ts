/**
 * sg.cfg.ConfigAssets —— 初始资源清单（启动/登录/战斗）与微信忽略列表、加载遮罩等。
 *
 * 原文：code1.js 字节 [455392,457898]（包装变量 Ft，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ConfigAssets.js
 *
 * 依赖：Gt=ConfigServer、Rt=ConfigApp（批次 B 模块直引）；re=AssetsManager
 * （批次 ③ 模块直引）；rt=laya.net.ResourceVersion（引擎，UMD 级别名 rt，
 * 286430 处实测 `rt=(laya.renders.RenderContext,laya.net.ResourceVersion)`）。
 * 原文自引走 sg.cfg.ConfigAssets 全局路径，TS 化后改类直引（batch-a-report §6.4）。
 * ASSETS_INIT_FIGHT 等 7 项为 Laya.static 惰性静态（ViewScenes.TOP_HEIGHT 同款换写）。
 */
import { ConfigServer } from "./ConfigServer";
import { ConfigApp } from "./ConfigApp";
import { AssetsManager } from "../manager/AssetsManager";

export class ConfigAssets {

    /** 启动资源清单：system_simple.AssetsInit 基线 + 按渠道插前缀字库/追加图集 */
    public static get AssetsInit(): string[] {
        var t: any = ConfigServer.system_simple.AssetsInit || ["ad/lc_name.txt", "ad/lc_0.txt", "home/home.json", "outline/outline.json", "res/atlas/comp.atlas", "res/atlas/ui.atlas", "res/atlas/face.atlas", "res/atlas/clip/globle.atlas", "res/atlas/fight.atlas", "map/ground.png", "map/ground2.png", "map/road.png", "map/forest.png", "map/mountain.png", "map/mountain2.png", "map/surface.png", "home/bg1.jpg", "home/bg2.jpg", "home/bg3.jpg", "home/bg4.jpg", "outline/bg.jpg", "res/atlas/map2.atlas"];
        return t = "h5_360_3" == ConfigApp.pf ? [ConfigAssets.AssetsInitWord[1]].concat(t)
            : "h5_360_2" == ConfigApp.pf ? [ConfigAssets.AssetsInitWord[2]].concat(t)
                : [ConfigAssets.AssetsInitWord[0]].concat(t),
            -1 != ["h5_360", "h5_360_2", "h5_360_3", "ad_360"].indexOf(ConfigApp.pf) && (t = [ConfigAssets.AssetsInitWord[3]].concat(t)),
            "h5_qqdt" != ConfigApp.pf && "h5_qqdt3" != ConfigApp.pf || t.push("res/atlas/lanzuan.atlas"),
            t.push("ui/bg_006.png"),
            t.push("ui/bg_20.png"),
            t;
    }

    public static get InitAniArray(): string[] {
        return ConfigServer.system_simple.InitAniArray || [ConfigAssets.DefaultHeroAniName, "world_win", "world_lose", "world_start", "glow503", "glow011"];
    }

    /** 微信包内已内置的大图（按 ResourceVersion 清单映射出真实版本文件名） */
    public static checkWXignoreList(): string[] {
        var t = ["res/atlas/comp.png", "res/atlas/ui.png", "res/atlas/ui1.png", "res/atlas/icon.png", "res/atlas/icon1.png"],
            i: string[] = [];
        if (laya.net.ResourceVersion.manifest)
            for (var e = t.length, s = 0; s < e; s++) laya.net.ResourceVersion.manifest[t[s]] && i.push(laya.net.ResourceVersion.manifest[t[s]]);
        return i;
    }

    public static setLoadingAssets(): string[] {
        return ConfigApp.indexLoadingImg ? [AssetsManager.getAssetsAD(ConfigApp.indexLoadingImg + ".jpg")] : [AssetsManager.getAssetsAD("bg_loading1.jpg")];
    }

    public static AssetsCounry: any[] = [];
    public static noAtlasAnimations: any = {};
    public static WorldWinAniName: string = "world_win";
    public static WorldLoseAniName: string = "world_lose";
    public static WorldStartAniName: string = "world_start";

    /** Laya.static 惰性静态：战斗预载资源 */
    public static get ASSETS_INIT_FIGHT(): string[] {
        var v = ["uiExportCfg.json", "res/atlas/comp.atlas", "res/atlas/ui.atlas", "res/atlas/clip/globle.atlas", "res/atlas/fight.atlas"];
        Object.defineProperty(ConfigAssets, "ASSETS_INIT_FIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：登录页预载资源 */
    public static get AssetsInitLogin(): string[] {
        var v = ["uiExportCfg.json", "ad/help.json", "res/atlas/comp.atlas"];
        Object.defineProperty(ConfigAssets, "AssetsInitLogin", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：渠道开机字库（37/iwy/4399/wh） */
    public static get AssetsInitWord(): string[] {
        var v = ["ad/lc_37.txt", "ad/lc_iwy.txt", "ad/lc_4399.txt", "ad/lc_wh.txt"];
        Object.defineProperty(ConfigAssets, "AssetsInitWord", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：加载遮罩图集 */
    public static get loadingMask(): string[] {
        var v = ["res/atlas/clip/loadingPanel.atlas"];
        Object.defineProperty(ConfigAssets, "loadingMask", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：欢迎屏四联图 */
    public static get WelcomeScreenImg(): string[] {
        var v = ["clip/glow501/01qian.png", "clip/glow501/02qian.png", "clip/glow501/03qian.png", "clip/glow501/04qian.png"];
        Object.defineProperty(ConfigAssets, "WelcomeScreenImg", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：欢迎屏动画 */
    public static get WelcomeScreenAni(): string[] {
        var v = ["glow501"];
        Object.defineProperty(ConfigAssets, "WelcomeScreenAni", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：默认武将待机动画（横/竖屏） */
    public static get DefaultHeroAniName(): string {
        var v = ConfigApp.isLandscape ? "hero_01x" : "hero_01s";
        Object.defineProperty(ConfigAssets, "DefaultHeroAniName", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.ConfigAssets")（2 参注册，无基类）。
 */
Laya.class(ConfigAssets, "sg.cfg.ConfigAssets", null, null);
