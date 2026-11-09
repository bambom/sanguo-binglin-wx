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
 * sg.view.ViewPanel —— 弹窗基座（628 个子孙类）。
 *
 * 原文：code1.js 字节 [3455667,3457537]（off 3456105，包装变量 tm，基类 s_=sg.view.ViewBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewPanel.js
 *
 * 构造期依赖：真实弹窗类（IDE UI 子类）在 super() 链内经 createChildren→loadUI→
 * 本类 createView 生成 mBg/btn_close（引擎 Component 构造触发），随后构造体才操作
 * mBg——该时序是原文隐含契约，见 batch-a-report.md。
 */
var Image = laya.ui.Image;
var ViewBase_1 = require("./ViewBase");
var ViewManager_1 = require("../manager/ViewManager");
var ViewPanel = /** @class */ (function (_super) {
    __extends(ViewPanel, _super);
    function ViewPanel() {
        var _this = _super.call(this) || this;
        _this.isAutoClose = true;
        /** 原文 this.btnCloseFun=!1 —— 可被 onlyCloseByBtn 覆写为真值/回调 */
        _this.btnCloseFun = false;
        // 原文：Rt.isHorizontal && !this.noAlignByPC && (…)；noAlignByPC 为子类约定属性，
        // 原文未声明（构造期为 undefined，恒走对齐分支），保持动态访问。
        sg.cfg.ConfigApp.isHorizontal && !_this.noAlignByPC && (_this.width = Laya.stage.width,
            _this.height = Laya.stage.height);
        _this.mBg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        _this.mBg.alpha = .7;
        _this.mBg.mouseEnabled = true;
        _this.mBg.hitTestPrior = true;
        _this.mBg.width = Laya.stage.width;
        _this.mBg.height = Laya.stage.height;
        _this.btn_close && _this.btn_close.on("click", _this, _this.closeSelf);
        return _this;
    }
    /** 建蒙版后回laya.ui.View 原实现构建视图（原文直接调 View.prototype.createView） */
    ViewPanel.prototype.createView = function (t) {
        this.mBg = new Image();
        this.mBg.name = "_$_bg_mask_$_";
        this.mBg.visible = false;
        this.addChild(this.mBg);
        laya.ui.View.prototype.createView.call(this, t);
    };
    ViewPanel.prototype.checkBg = function (t) {
        this.mBg.visible = t > 0;
        this.height = Laya.stage.height;
    };
    ViewPanel.prototype.setTitle = function (t) {
    };
    ViewPanel.prototype.onAddedBase = function () {
        sg.guide.view.GuideFocus.focusOut();
        this.on("click", this, this.onClick_bg);
        this.onAdded();
        this.test_clip_int(1);
    };
    /** 延迟 1 秒再监听背景点击（避免透传误关） */
    ViewPanel.prototype.delayClickEvent = function () {
        this.off("click", this, this.onClick_bg);
        Laya.timer.once(1e3, this, this.addClickEvent);
    };
    ViewPanel.prototype.addClickEvent = function () {
        this.on("click", this, this.onClick_bg);
    };
    ViewPanel.prototype.onRemovedBase = function () {
        this.off("click", this, this.onClick_bg);
        this.onRemoved();
        this.cacheAs = "none";
    };
    ViewPanel.prototype.onChange = function (t) {
    };
    /**
     * 背景点击：非关闭来源且未限定按钮关闭 → 关闭自身；
     * 限定按钮关闭时仅响应 btn_close（原文条件结构逐句保留）。
     */
    ViewPanel.prototype.onClick_bg = function (t) {
        "btn_close" != t.target.name && t.target != this.mBg || this.btnCloseFun
            ? this.btnCloseFun && "btn_close" == t.target.name && this.btnClickClose()
            : this.closeSelf();
    };
    /** 原文空实现，子类覆写 */
    ViewPanel.prototype.btnClickClose = function () {
    };
    ViewPanel.prototype.onlyCloseByBtn = function (t) {
        this.btnCloseFun = t;
    };
    /** 原文默认参 t=true；作为 click 回调被调用时收到的是 Event（真值），行为保持 */
    ViewPanel.prototype.closeSelf = function (t) {
        void 0 === t && (t = true);
        this.isAutoClose && ViewManager_1.ViewManager.instance.closePanel(t ? this : null);
    };
    /** btn_close 定向查找：先在子树内找 __className 含 panel_bg_btn 的节点 */
    ViewPanel.prototype.getSpriteByName = function (i) {
        if ("btn_close" === i) {
            var e = this._getPanelBgBtn(this);
            if (e)
                return e.getChildByName(i);
        }
        return _super.prototype.getSpriteByName.call(this, i);
    };
    /** 递归查 __className 匹配 /panel_bg_btn/ 的节点（依赖 Laya.class 注册身份） */
    ViewPanel.prototype._getPanelBgBtn = function (t) {
        if (/panel_bg_btn/.test(t.__className))
            return t;
        var i = t._childs.length;
        if (i)
            for (var e = 0; e < i; ++e) {
                var s = t._childs[e], n = this._getPanelBgBtn(s);
                if (n)
                    return n;
            }
    };
    return ViewPanel;
}(ViewBase_1.ViewBase));
exports.ViewPanel = ViewPanel;
/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewPanel",t)（t=s_=sg.view.ViewBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewPanel, "sg.view.ViewPanel", null, null);
//# sourceMappingURL=ViewPanel.js.map