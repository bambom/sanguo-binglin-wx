/**
 * LayaSample（原匿名包装变量 Nt）—— UMD 执行入口：boot/Loading 视图。
 *
 * 原文：code1.js 字节 [287959,291952]（Nt=function(){…}()，无基类，注册名 "LayaSample"
 * —— o(t,"LayaSample") 无点类名 → 挂到 Laya.LayaSample）。UMD 尾部
 * `s.__init([73 个惰性模块]), new Nt`（字节 8630491/8630735）—— 本类构造即整包启动链。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/Nt.js
 *
 * 注意：本文件只声明类与注册；`new LayaSample()` 的执行时机属集成批次
 * （对应原包 code1.js 模块求值尾部），本批不自动实例化。
 */
import Browser = laya.utils.Browser;
import Loader = laya.net.Loader;
import LocalStorage = laya.net.LocalStorage;
import Stat = laya.utils.Stat;
import URL = laya.net.URL;
import WebGL = laya.webgl.WebGL;
import Handler = laya.utils.Handler;
import { ViewManager } from "../manager/ViewManager";
import { LoadeManager } from "../manager/LoadeManager";
import { LoadingController } from "../view/loading/LoadingController";

export class LayaSample {

    public mBg: any = null;
    public mLoadingView: any = null;
    public initVersionCfg: boolean = false;
    public initLoadVersionCfg: boolean = false;
    public isPcRbig: boolean = false;
    public initLoadVersionHandler: Handler = null;
    public idfa103: boolean = false;

    constructor() {
        // 原文：Y.maxTimeOut=500（laya.net.Loader 静态）
        Loader.maxTimeOut = 500;

        // 设计尺寸选择（原文字节序）：
        // 移动端短边<=1080 物理像素 → 关闭视网膜画布
        var t = false, i = Browser.clientWidth, e = Browser.clientHeight,
            n = Browser.window.devicePixelRatio, h = i * n, o = e * n;
        Browser.onMobile && (h <= 1080 || o <= 1080) ? (t = true, (<any>Laya).Config.useRetinalCanvas = false)
            : (<any>Laya).Config.useRetinalCanvas = true;
        sg.cfg.ConfigApp.initCfg();
        sg.cfg.ConfigApp.myPackagePf && sg.cfg.ConfigApp.myPackagePf.length > 0 && (sg.cfg.ConfigApp.pf = sg.cfg.ConfigApp.myPackagePf);
        this.pchdFunc();
        sg.cfg.ConfigApp.pchd && sg.cfg.ConfigApp.initPCHD(t);
        var r = 0, a = 0;
        if (sg.cfg.ConfigApp.isLandscape) {
            // 横屏设计尺寸 1138x640
            sg.cfg.ConfigApp.initPCHDText(), r = 1138, a = 640;
        } else {
            if (sg.cfg.ConfigApp.isPC) {
                // PC：高固定 1010，宽按屏幕长宽比缩放，夹在 [1.6*高, 高*1493/640]
                a = 1010;
                r = Math.max(i, e) * (a / Math.min(i, e));
                r = Math.max(r, 1.6 * a);
                r = Math.min(r, a * (1493 / 640));
            } else {
                // 竖屏：宽 640，高按宽高比、夹在 [1010,1493]
                r = 640;
                a = 640 / i * e;
                a = Math.min(a, 1493);
                a = Math.max(a, 1010);
            }
        }
        // 刘海/安全区：按本地设置与屏幕长宽比决定上下避让
        var l = sg.utils.SaveLocal.getValue("sg_local_save_key_settings") || {},
            c = Browser.clientHeight / Browser.clientWidth;
        !1 !== l.avoid_top && c >= 1.7 && (sg.cfg.ConfigApp.avoidTop = 70);
        sg.cfg.ConfigApp.releaseMiniGame() ? (sg.cfg.ConfigApp.topVal = sg.cfg.ConfigApp.avoidTop, sg.cfg.ConfigApp.avoidTop = 0)
            : (!1 !== l.avoid_bottom && c >= 1.9 && (sg.cfg.ConfigApp.avoidBottom = 70),
                a -= sg.cfg.ConfigApp.avoidTop + sg.cfg.ConfigApp.avoidBottom);

        Laya.init(r, a, WebGL);
        sg.cfg.ConfigApp.mVsdebug && Stat.show(0, 0);
        Laya.ToJava.init();
        Laya.ToIOS.init();
        sg.cfg.ConfigApp.initH5sdk();
        Laya.Platform.initMiniGame();
        Laya.Platform.phoneInfoOnCheck = sg.utils.Tools.isNullObj(sg.utils.SaveLocal.getValue("local_save_key_user"));
        ViewManager.sLaya = this;
        this.checkVH();
        this.init();
        sg.cfg.ConfigApp.setFont();
    }

    /** 视口/横竖屏适配：帧率 fast、黑底、对齐与缩放模式 */
    public checkVH(): void {
        Laya.HtmlLoadClip.isHtmlLoad = Browser.window && Browser.window.isH5ClipFunc;
        Laya.stage.frameRate = "fast";
        Laya.stage.bgColor = "#000000";
        Laya.stage.screenMode = sg.cfg.ConfigApp.isHorizontal ? "horizontal" : "vertical";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        var t = Browser.clientWidth, i = Browser.clientHeight;
        sg.cfg.ConfigApp.isLandscape
            ? Laya.stage.scaleMode = t / i < 1.778125 ? "showall" : "fixedheight"
            : (Laya.stage.scaleMode = "showall",
                sg.cfg.ConfigApp.avoidTop !== sg.cfg.ConfigApp.avoidBottom && (
                    Laya.stage.alignV = sg.cfg.ConfigApp.avoidTop < sg.cfg.ConfigApp.avoidBottom ? "top" : "bottom"));
    }

    /** 启动初始化：清视图管理器单例、模型/视图管理器 init、埋点与首次安装判定 */
    public init(): void {
        this.initVersionCfg = false;
        this.initLoadVersionCfg = false;
        ViewManager.sViewManager = null;
        sg.manager.ModelManager.instance.init();
        ViewManager.instance.init();
        Laya.Platform.uploadActionData(1e4, null);
        sg.cfg.ConfigApp.isFirstInstall = !sg.utils.SaveLocal.getValue("local_save_key_user");
        sg.cfg.ConfigApp.isFirstInstall && Laya.Platform.uploadActionData(10001, null);
        Laya.Platform.getPhoneID();
        // 已有版本配置 → 直接走版本装载；否则先拉 net_cfg.json
        sg.cfg.ConfigApp.cfgvers ? this.initLoadVersion(null)
            : (Laya.Platform.checkGameStatus(100), this.loadCfgJson());
    }

    /** 拉取 net_cfg.json（时间戳防缓存）；失败重试 */
    public loadCfgJson(): void {
        sg.cfg.ConfigApp.get_NET_CFG_URL() ? (
            Laya.loader.on("error", this, this.error_net_cfg),
            this.initLoadVersionHandler = new Handler(this, this.initLoadVersion, null, true),
            LoadeManager.loadImg(sg.cfg.ConfigApp.get_NET_CFG_URL() + "net_cfg.json?v=" + (new Date).getTime(), this.initLoadVersionHandler))
            : this.initLoadVersion(null);
    }

    public error_net_cfg(): void {
        Laya.loader.off("error", this, this.error_net_cfg),
            this.initLoadVersionHandler && this.initLoadVersionHandler.recover(),
            this.loadCfgJson();
    }

    /** net_cfg 到手：存 sNetCfg、SDK 埋点、注册 CustomLoader 后进 initVersion */
    public initLoadVersion(t: any): void {
        Laya.loader.off("error", this, this.error_net_cfg),
            this.initLoadVersionHandler && this.initLoadVersionHandler.recover(),
            Laya.HtmlLoadClip.setLoadValue(1),
            Laya.Platform.checkGameStatus(101),
            sg.cfg.ConfigApp.sNetCfg = t,
            this.idfa103 || (this.idfa103 = true, Laya.Platform.checkGameStatus(103)),
            sg.utils.CustomLoader.register(Handler.create(this, this.initVersion));
    }

    /** 版本配置就绪：资源基址、SDK init、进资源装载 */
    public initVersion(): void {
        Laya.HtmlLoadClip.setLoadValue(2);
        this.initVersionCfg || (
            this.initVersionCfg = true,
            Laya.Platform.checkGameStatus(102),
            URL.basePath = sg.cfg.ConfigApp.get_ASSETS_BASE_URL(),
            Laya.Platform.initSDK(),
            this.initAssets());
    }

    /** 预载登录/国家选择/Loading 资源 */
    public initAssets(): void {
        var t: any[] = [];
        t = t.concat(sg.cfg.ConfigAssets.AssetsInitLogin)
            .concat(sg.cfg.ConfigAssets.loadingMask)
            .concat(sg.cfg.ConfigAssets.AssetsCounry)
            .concat(sg.cfg.ConfigAssets.setLoadingAssets());
        LoadeManager.loadImg(t, Handler.create(this, this.onComplete), Handler.create(this, this.onProgress));
    }

    public onProgress(t: any): void {
    }

    public onComplete(t: any): void {
        Laya.HtmlLoadClip.setLoadValue(3);
        this.onInitAssetsEnd();
    }

    /** 预载完成：uiMap/帮助文案字典、建 Loading 面板并进入 VIEW_LOAD 场景 */
    public onInitAssetsEnd(): void {
        var t = Laya.loader.getRes("ad/help.json");
        laya.ui.View.uiMap = Laya.loader.getRes("uiExportCfg.json");
        LoadingController.createPanel();
        sg.utils.Tools.sMsgLocalDic = t ? t.msg[sg.cfg.ConfigApp.lan()] : {};
        // 进装载场景（sg4 双端 UI 二选一）
        "sg4" === sg.cfg.HelpConfig.type_ui
            ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_LOAD_SG4, null, { type: 0 })
            : ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_LOAD, null, { type: 0 });
        // 平台宿主探测（视频按钮文案显示、微信小游戏清档接口）——缺失时按原分支跳过
        Browser && Browser.window && Browser.window.hasOwnProperty("laya_video_btn_txt_show") && Browser.window.laya_video_btn_txt_show();
        Browser && Browser.window && sg.cfg.ConfigApp.releaseMiniGame() && Browser.window.GameGlobal && Browser.window.GameGlobal.meng52_clearAll();
    }

    /** PC 高清设置回读：本地存档 pchd 优先 */
    public pchdFunc(): void {
        LocalStorage.__init__();
        var t = sg.utils.SaveLocal.getValue("sg_local_save_key_settings");
        t && t.pchd && !sg.cfg.ConfigApp.pchd && (sg.cfg.ConfigApp.pchd = t.pchd ? "1" : "0");
    }

    /** 设计尺寸常量（原文 t.DESIGN_W=640 等） */
    public static DESIGN_W: number = 640;
    public static DESIGN_H_MIN: number = 1010;
    public static DESIGN_H_MAX: number = 1493;
    public static DESIGN_H_CB: number = 640;
    public static DESIGN_W_CB: number = 1138;
}

/**
 * 注册身份等价物：原文 o(t,"LayaSample")（无基类）→ Laya.LayaSample。
 */
Laya.class(LayaSample, "LayaSample", null, null);

/**
 * 入口执行（NOT_RUN，集成批次接入）：
 * 原文在 code1.js 模块求值尾部执行 `s.__init([...73 惰性模块…]), new Nt`。
 * 翻译产物的装载链（F8 页/发布替换）在后续批次组装，届时由入口模块触发
 * `new LayaSample()`，本批不自动执行。
 */
