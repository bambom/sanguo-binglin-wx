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
 * sg.view.ViewBase —— 视图控制器基座（ViewPanel/ViewScenes 的父类）。
 *
 * 原文：code1.js 字节 [3357542,3358717]（off 3357707，包装变量 s_，基类 Ju=sg.view.BaseSprite）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewBase.js
 */
var List = laya.ui.List;
var Tab = laya.ui.Tab;
var Sprite = laya.display.Sprite;
var BaseSprite_1 = require("./BaseSprite");
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        var _this = _super.call(this) || this;
        _this.id = "";
        /** 当前视图参数（原文 getset currArg） */
        _this.mCurrArg = null;
        _this.mBgType = 0;
        _this.mIsOpen = false;
        _this.on("display", _this, _this._$7__onDisplay); // 原文注册名保持混淆形态 _$7__onDisplay
        return _this;
    }
    /** 原文空实现（混淆名 _$7__onDisplay，display 事件回调占位） */
    ViewBase.prototype._$7__onDisplay = function () {
    };
    ViewBase.prototype.onRemove = function () {
        this.mIsOpen = false;
        this.onRemovedBase();
    };
    ViewBase.prototype.onAdd = function () {
        this.mIsOpen = true;
        this.onAddedBase();
    };
    ViewBase.prototype.init = function () {
        this.once("removed", this, this.onRemove);
        this.once("added", this, this.onAdd);
        this.initData();
    };
    ViewBase.prototype.clearEvent = function () {
        this.off("removed", this, this.onRemove);
        this.off("added", this, this.onAdd);
    };
    ViewBase.prototype.initData = function () {
    };
    ViewBase.prototype.checkBg = function (t) {
    };
    ViewBase.prototype.onAddedBase = function () {
    };
    ViewBase.prototype.onRemovedBase = function () {
    };
    ViewBase.prototype.onAdded = function () {
    };
    ViewBase.prototype.onRemoved = function () {
    };
    ViewBase.prototype.clear = function () {
    };
    /**
     * 按名字取显示对象：优先 "xxx_N" 形式命中 List 的 cell / Tab 的 items，
     * 其次本实例同名属性、子节点树；均须为 laya.display.Sprite。
     */
    ViewBase.prototype.getSpriteByName = function (t) {
        var i = /(.+)_(\d+)/;
        if (i.test(t)) {
            var e = t.match(i), s = this[e[1]], n = null, h = parseFloat(e[2]);
            if (s instanceof List ? n = s.getCell(h) : s instanceof Tab && (n = s.items[h]), n)
                return n;
        }
        return this[t] instanceof Sprite ? this[t]
            : this.getChildByName(t) instanceof Sprite ? this.getChildByName(t)
                : void 0;
    };
    Object.defineProperty(ViewBase.prototype, "currArg", {
        /** 原文 r(0,e,"currArg",getter,setter) —— 实例属性 currArg 读写 mCurrArg */
        get: function () {
            return this.mCurrArg;
        },
        set: function (t) {
            this.mCurrArg = t;
        },
        enumerable: true,
        configurable: true
    });
    return ViewBase;
}(BaseSprite_1.BaseSprite));
exports.ViewBase = ViewBase;
/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewBase",t)（t=Ju=sg.view.BaseSprite）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewBase, "sg.view.ViewBase", null, null);
//# sourceMappingURL=ViewBase.js.map