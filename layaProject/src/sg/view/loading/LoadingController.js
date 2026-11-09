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
 * sg.view.loading.LoadingController —— 启动 Loading 控制器。
 *
 * 原文：code1.js 字节 [1496270,1497548]（off 1496720，包装变量 En，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/LoadingController.js
 */
var TouchManager = laya.events.TouchManager;
var LoadeManager_1 = require("../../manager/LoadeManager");
var LoadingController = /** @class */ (function (_super) {
    __extends(LoadingController, _super);
    function LoadingController() {
        var _this = _super.call(this) || this;
        /** sg.manager.LoadeManager 单例（原文 this.loader=Js.instance） */
        _this.loader = null;
        _this.percentSpeed = 1;
        _this.fakePercent = 0;
        _this._loading = false;
        _this.loader = LoadeManager_1.LoadeManager.instance;
        // 先 off 再 on：防重复注册（原文逐句）
        _this.loader.off("show_panel", _this, _this.showLoading);
        _this.loader.off("progress", _this, _this.setProgress);
        _this.loader.off("remove_self", _this, _this.hideLoading);
        _this.loader.on("show_panel", _this, _this.showLoading);
        _this.loader.on("progress", _this, _this.setProgress);
        _this.loader.on("remove_self", _this, _this.hideLoading);
        return _this;
    }
    /** t（毫秒）给定假进度节奏：30ms/帧推进；期间禁用触摸 */
    LoadingController.prototype.showLoading = function (t) {
        Laya.timer.clear(this, this.animateTime);
        t && (this.fakePercent = 0,
            this.percentSpeed = 100 / (t / 30),
            Laya.timer.loop(30, this, this.animateTime));
        TouchManager.I.enable = false;
        this.event("display");
        this._loading = true;
    };
    LoadingController.prototype.animateTime = function (t) {
        this.fakePercent += this.percentSpeed,
            this.setProgress(this.fakePercent),
            this.fakePercent >= 100 && Laya.timer.clear(this, this.animateTime);
    };
    LoadingController.prototype.setProgress = function (t) {
        t = Math.round(t),
            t = Math.min(t, 100),
            this.event("progress", t);
    };
    LoadingController.prototype.hideLoading = function () {
        TouchManager.I.enable = true;
        this.event("undisplay");
        this._loading = false;
    };
    Object.defineProperty(LoadingController.prototype, "loading", {
        /** 原文 r(0,e,"loading",getter) —— 只读实例属性，恒 false */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingController, "instance", {
        /** 原文 r(1,i,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 静态单例（只读） */
        get: function () {
            return LoadingController.sManager = LoadingController.sManager || new LoadingController();
        },
        enumerable: true,
        configurable: true
    });
    /** 按 UI 类型建 Loading 面板（实例自注册后即弃引用，原文如此） */
    LoadingController.createPanel = function () {
        "sg4" === sg.cfg.HelpConfig.type_ui ? new sg.view.loading.LoadingPanel_H() : new sg.view.loading.LoadingPanel_V();
    };
    LoadingController.sManager = null;
    return LoadingController;
}(laya.events.EventDispatcher));
exports.LoadingController = LoadingController;
/**
 * 注册身份等价物：原文 o(i,"sg.view.loading.LoadingController",t)（t=T=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(LoadingController, "sg.view.loading.LoadingController", null, null);
//# sourceMappingURL=LoadingController.js.map