"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sg.manager.LoadeManager —— 资源/配置装载管理（启动链依赖）。
 *
 * 原文：code1.js 字节 [1304207,1306355]（off 1304333，包装变量 Js，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/LoadeManager.js
 *
 * 原文静态方法内多处经 sg.manager.LoadeManager 全局注册路径取单例（如 load()），
 * 译文直接引用本类（注册后同一对象，等价；报告「全局命名空间引用」节）。
 */
var Browser = laya.utils.Browser;
var Handler = laya.utils.Handler;
var Image = laya.ui.Image;
var AtlasResourceManager = laya.webgl.atlas.AtlasResourceManager;
var LoadeManager = /** @class */ (function (_super) {
    __extends(LoadeManager, _super);
    function LoadeManager() {
        var _this = _super.call(this) || this;
        /** 完成回调（Handler），实例侧 */
        _this.complete = null;
        /** 进度回调（Handler），构造期重建 */
        _this.progress = null;
        _this.progress = new Handler(_this, _this.onProgress);
        return _this;
    }
    /** 原文 e.showLoadPanel —— 派发显示装载面板事件（t 为假进度时长参数） */
    LoadeManager.prototype.showLoadPanel = function (t) {
        void 0 === t && (t = 0);
        this.event("show_panel", t);
    };
    /** 0..1 进度 → 0..100 事件 */
    LoadeManager.prototype.onProgress = function (t) {
        var i = t;
        this.event("progress", 100 * i);
    };
    LoadeManager.prototype.onComplete = function () {
        this.event("remove_self");
        this.complete && this.complete.run();
    };
    Object.defineProperty(LoadeManager, "instance", {
        /** 原文 r(1,i,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 静态单例（只读） */
        get: function () {
            return LoadeManager.sLoadeManager = LoadeManager.sLoadeManager || new LoadeManager();
        },
        enumerable: true,
        configurable: true
    });
    /** 载入资源表 t；e 为完成 Handler；s 控制是否显示装载面板 */
    LoadeManager.load = function (t, e, s, n, h, o, r) {
        void 0 === s && (s = false);
        void 0 === h && (h = true);
        void 0 === r && (r = false);
        var a = LoadeManager.instance;
        a.complete = e,
            e = Handler.create(a, a.onComplete),
            LoadeManager.loadImg(t, e, a.progress, n, 1, h, o, r),
            s && a.showLoadPanel();
    };
    /** 假进度：按 t 秒推进后完成 */
    LoadeManager.fakeLoad = function (t, i) {
        var e = LoadeManager.instance;
        e.complete = i,
            i = Handler.create(e, e.onComplete);
        var n = Math.floor(1e3 * t);
        e.showLoadPanel(n),
            Laya.timer.once(n, e, e.onComplete);
    };
    /** e（进度 Handler）在原文调用点常缺省（如 getLargeImage/loadTemp/启动链），按可选处理 */
    LoadeManager.loadImg = function (t, i, e, n, h, o, r, a) {
        void 0 === h && (h = 1);
        void 0 === o && (o = true);
        void 0 === a && (a = false);
        var l = o, c = a;
        sg.cfg.ConfigApp.releaseWeiXin(),
            Laya.loader.load(t, i, e, n, h, l, r, c);
    };
    /** 大图直载：返回承载 Image，完成时设置 skin */
    LoadeManager.getLargeImage = function (t, e) {
        return e || (e = new Image()),
            LoadeManager.loadImg(t, Handler.create(LoadeManager.instance, function (t, i) {
                i && !i.destroyed && (i.skin = t);
            }, [t, e])),
            e;
    };
    LoadeManager.clearAll = function () {
        Laya.loader.clearUnLoaded();
    };
    LoadeManager.clearRes = function (t, i) {
        void 0 === i && (i = false);
        Laya.loader.clearRes(t, i);
    };
    /** 单独加载的大图登记（tempDic）后按 skin 双写刷新 */
    LoadeManager.loadTemp = function (t, e, s) {
        LoadeManager.tempDic.indexOf(e) < 0 && LoadeManager.tempDic.push(e),
            LoadeManager.loadImg(e, Handler.create(LoadeManager.instance, function (t, i) {
                i && i.parent && (i.skin = "", i.skin = t, s && s());
            }, [e, t]));
    };
    LoadeManager.clearTemp = function () {
        Laya.Trace.log("清理单独加载 ad 大图片", LoadeManager.tempDic);
        for (var t = LoadeManager.tempDic.length, e = 0; e < t; e++)
            LoadeManager.clearRes(LoadeManager.tempDic[e], true);
        // 原文 F.clearAllCache() —— laya.ui.Image 静态方法，1.8.15beta 运行时存在、
        // IDE 1.8.17 d.ts 缺失（引擎字节核验，game.js @1046567），经 any 调用。
        Image.clearAllCache();
        (Browser.onIOS || sg.cfg.ConfigApp.isTest) && Laya.timer.callLater(AtlasResourceManager.instance, AtlasResourceManager.instance.freeAll);
        LoadeManager.checkTempSize();
    };
    LoadeManager.clearHeroIcon = function () {
        for (var t in LoadeManager.tempDic_hero_big)
            Laya.loader.clearTextureRes(t);
        LoadeManager.tempDic_hero_big = {};
    };
    LoadeManager.addTempHeroBigImg = function (t) {
        LoadeManager.tempDic_hero_big[t] = 1;
    };
    /** 原文：return m.onMiniGame,0 —— 逗号表达式（左侧探测无副作用），恒 0 */
    LoadeManager.checkTempSize = function () {
        return Browser.onMiniGame, 0;
    };
    /** 事件名常量（原文 i.SHOW_PANEL=… 等） */
    LoadeManager.SHOW_PANEL = "show_panel";
    LoadeManager.PROGRESS = "progress";
    LoadeManager.REMOVE_SELF = "remove_self";
    LoadeManager.sLoadeManager = null;
    LoadeManager.tempDic = [];
    LoadeManager.tempDic_hero_big = {};
    return LoadeManager;
}(laya.events.EventDispatcher));
exports.LoadeManager = LoadeManager;
/**
 * 注册身份等价物：原文 o(i,"sg.manager.LoadeManager",t)（t=T=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(LoadeManager, "sg.manager.LoadeManager", null, null);
//# sourceMappingURL=LoadeManager.js.map