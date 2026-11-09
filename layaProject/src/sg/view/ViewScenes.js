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
 * sg.view.ViewScenes —— 场景基座（131 个直接子类）。
 *
 * 原文：code1.js 字节 [3452502,3455659]（off 3453034，包装变量 Z_，基类 s_=sg.view.ViewBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewScenes.js
 *
 * 构造期依赖与 ViewPanel 相同：真实场景类在 super() 链内经 createView 生成 mBg
 * 后，构造体才设置 mBg 的坐标/尺寸（batch-a-report.md「构造期 createView 契约」）。
 */
var Image = laya.ui.Image;
var Rectangle = laya.maths.Rectangle;
var ViewBase_1 = require("./ViewBase");
var ViewManager_1 = require("../manager/ViewManager");
var ViewScenes = /** @class */ (function (_super) {
    __extends(ViewScenes, _super);
    function ViewScenes() {
        var _this = _super.call(this) || this;
        _this.HEIGHT_TOP = sg.cfg.ConfigApp.isLandscape ? 70 : 60;
        _this.HEIGHT_TITLE_TOP = sg.cfg.ConfigApp.isLandscape ? 70 : 60;
        _this.mBoxTitle = null;
        // 以下对 mBg 的操作依赖 super() 链内 createView 已生成 mBg（原文时序契约）
        if (sg.cfg.ConfigApp.isPC) {
            _this.mBg.x = 0;
            _this.mBg.height = Laya.stage.height;
            _this.mBg.width = sg.cfg.ConfigApp.isLandscape ? 1138 : 640;
        }
        else if (sg.cfg.ConfigApp.isLandscape) {
            _this.mBg.x = -Math.ceil((Laya.stage.width - 1138) / 2);
            _this.mBg.width = Laya.stage.width + 1;
            _this.mBg.height = Laya.stage.height + 1;
            _this.mBg.mouseEnabled = true;
            _this.mBg.mouseThrough = false;
            _this.width = 1138;
            _this.height = 640;
        }
        else {
            _this.mBg.height = Laya.stage.height;
            _this.mBg.width = Laya.stage.width;
        }
        _this.test_clip_vis = false;
        return _this;
    }
    /** 建蒙底后回 laya.ui.View 原实现构建视图（原文直接调 View.prototype.createView） */
    ViewScenes.prototype.createView = function (t) {
        this.mBg = new Image();
        this.mBg.name = "_$_bg_mask_$_";
        this.addChild(this.mBg);
        laya.ui.View.prototype.createView.call(this, t);
    };
    /** 设置提示按钮文案并绑定 ViewManager.showTipsPanel 弹窗 */
    ViewScenes.prototype.setTips = function (t) {
        var i = this.sg_btn_tips;
        i && (i.visible = "" !== t,
            i.visible && (i.off("click", ViewManager_1.ViewManager.instance, ViewManager_1.ViewManager.instance.showTipsPanel),
                i.on("click", ViewManager_1.ViewManager.instance, ViewManager_1.ViewManager.instance.showTipsPanel, [t])));
    };
    /** 设置提示按钮皮肤与点击回调 */
    ViewScenes.prototype.setBtnHandler = function (t, i) {
        var e = this.sg_btn_tips;
        e && (e.visible = true,
            e.SetSkinAfterLoader(t),
            e.width = e.height = 47,
            e.off("click", this, this.btnHandler),
            e.on("click", this, this.btnHandler, [i]));
    };
    ViewScenes.prototype.btnHandler = function (t) {
        t.run();
    };
    ViewScenes.prototype.clearTipsBtn = function () {
        var t = this.sg_btn_tips;
        t && (t.visible = false, t.off("click", this, this.btnHandler));
    };
    /** 标题文案：横屏自适应字号，竖屏图文混排 */
    ViewScenes.prototype.setTitle = function (t, i) {
        this.mBoxTitle && (this.mBoxTitle.sg_txt.text = t,
            sg.cfg.ConfigApp.isLandscape
                ? sg.utils.Tools.textFitFontSize(this.mBoxTitle.sg_txt)
                : sg.utils.Tools.textLayout2(this.mBoxTitle.sg_txt, this.mBoxTitle.sg_img));
    };
    ViewScenes.prototype.click_closeScenes = function () {
        ViewManager_1.ViewManager.instance.closeScenes();
    };
    /**
     * 场景层次三态（1=带标题、2=无标题、3=全屏无菜单），0=复位；
     * 横屏时 2 折叠为 1 处理（原文 t=2==t?1:t）。
     */
    ViewScenes.prototype.checkBg = function (t) {
        this.mBgType = t;
        var e = 0, n = 0, h = 0;
        t > 0 && (this.mBoxTitle || (this.mBoxTitle = new ui.menu.scenesTitleUI()),
            this.mBoxTitle.sg_title.visible = true);
        sg.cfg.ConfigApp.isLandscape && (this.mBoxTitle && 2 == t && (this.mBoxTitle.sg_txt.text = ""),
            t = 2 == t ? 1 : t);
        if (0 == t) {
            this.y = 0;
            this.height = Laya.stage.height;
        }
        else if (1 == t) {
            e = -(this.HEIGHT_TOP + ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal);
            n = this.HEIGHT_TOP + ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal;
            h = -this.HEIGHT_TITLE_TOP;
            this.fLayer(e, n, h);
        }
        else if (2 == t) {
            e = -(ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal);
            n = ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal;
            h = 0;
            this.fLayer(e, n, h);
            this.mBoxTitle.sg_title.visible = false;
        }
        else if (3 == t) {
            this.fLayer(0, 0, 0);
            this.mBoxTitle.sg_title.visible = false;
            ViewManager_1.ViewManager.instance.setMenuTopVisible(false);
        }
    };
    /** 场景分层：蒙底 y/皮肤、场景 y、标题条 y 与关闭键绑定、命中区 */
    ViewScenes.prototype.fLayer = function (t, i, e, n) {
        void 0 === n && (n = "bg_20.png");
        this.mBg.y = t;
        sg.utils.Tools.isNullString(n) || (this.mBg.skin = sg.manager.AssetsManager.getAssetsUI(n));
        this.y = i;
        this.mBoxTitle.y = e;
        this.addChild(this.mBoxTitle);
        this.mBoxTitle.sg_btn_close.off("click", this, this.click_closeScenes);
        this.mBoxTitle.sg_btn_close.on("click", this, this.click_closeScenes);
        this.height = Laya.stage.height - this.y;
        this.hitArea = this.mRect = new Rectangle(this.x, e, this.width, this.height + Math.abs(e));
    };
    ViewScenes.prototype.onAddedBase = function () {
        this.onAdded();
    };
    ViewScenes.prototype.onRemovedBase = function () {
        this.onRemoved();
    };
    ViewScenes.prototype.showCloseButton = function () {
        this.mBoxTitle && this.mBoxTitle.visible && (this.mBoxTitle.sg_btn_close.visible = true);
    };
    ViewScenes.prototype.hideCloseButton = function () {
        this.mBoxTitle && this.mBoxTitle.visible && (this.mBoxTitle.sg_btn_close.visible = false);
    };
    ViewScenes.prototype.getSpriteByName = function (i) {
        return "btn_close" === i ? this.mBoxTitle.sg_btn_close : _super.prototype.getSpriteByName.call(this, i);
    };
    Object.defineProperty(ViewScenes.prototype, "sg_btn_tips", {
        /** 原文 r(0,e,"sg_btn_tips",getter) —— 只读实例属性，代理标题条上的提示按钮 */
        get: function () {
            return this.mBoxTitle && this.mBoxTitle.sg_btn_tips ? this.mBoxTitle.sg_btn_tips : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewScenes, "TOP_HEIGHT", {
        /**
         * 原文 h(i,["TOP_HEIGHT",function(){return this.TOP_HEIGHT=Rt.isLandscape?0:45}])
         * —— Laya.static 惰性静态：首次访问时求值并缓存为类自身数据属性。
         * 此处以静态 getter + defineProperty 换写精确等价其惰性求值/缓存语义。
         */
        get: function () {
            var v = sg.cfg.ConfigApp.isLandscape ? 0 : 45;
            Object.defineProperty(ViewScenes, "TOP_HEIGHT", {
                value: v, writable: true, enumerable: true, configurable: true
            });
            return v;
        },
        enumerable: true,
        configurable: true
    });
    return ViewScenes;
}(ViewBase_1.ViewBase));
exports.ViewScenes = ViewScenes;
/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewScenes",t)（t=s_=sg.view.ViewBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewScenes, "sg.view.ViewScenes", null, null);
//# sourceMappingURL=ViewScenes.js.map