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
 * sg.view.BaseSprite —— 全部视图的根基座（2,967 个 laya.ui.View 终端类的公共祖先）。
 *
 * 原文：code1.js 字节 [3196546,3197435]（off 3196722，包装变量 Ju，基类 Bt=laya.ui.View）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/BaseSprite.js
 */
var Ease = laya.utils.Ease;
var Tween = laya.utils.Tween;
var BaseSprite = /** @class */ (function (_super) {
    __extends(BaseSprite, _super);
    function BaseSprite() {
        var _this = _super.call(this) || this;
        _this.test_clip_max_parent = null;
        _this.test_clip_num_max = 0;
        _this.test_clip_vis = true;
        _this.test_clip_max = 0;
        /** 特效动画（glow030），原文 mAni */
        _this.mAni = null;
        _this.mRect = null;
        return _this;
    }
    /** 弹窗位光效。原文 le.loadAnimation("glow030","",1)，le = sg.manager.EffectManager */
    BaseSprite.prototype.test_clip_effict_panel = function (t, i) {
        this.mAni = sg.manager.EffectManager.loadAnimation("glow030", "", 1);
        sg.cfg.ConfigApp.isLandscape && (this.mAni.blendMode = "light");
        this.mAni.x = t;
        this.mAni.y = i;
        this.addChild(this.mAni);
    };
    /** 移除并销毁光效 */
    BaseSprite.prototype.clear_clip_effict_panel = function (t, i) {
        this.mAni && (this.mAni.removeSelf(), this.mAni.destroy(true));
        this.mAni = null;
    };
    /** 原文空实现 */
    BaseSprite.prototype.test_clip_int = function (t) {
    };
    /**
     * 子项入场缩放动画：对 t 的全部子节点（名字为 "_$_bg_mask_$_" 的蒙版除外）做
     * 0.95→1 的 backOut 补间；同时记录子节点数最多的父节点。
     */
    BaseSprite.prototype.test_clip_int_f1 = function (t) {
        var i, e = 0;
        for (t.numChildren > this.test_clip_num_max && (this.test_clip_max_parent = t, this.test_clip_num_max = t.numChildren),
            e = 0; e < t.numChildren; e++)
            "_$_bg_mask_$_" != (i = t.getChildAt(e)).name && (i.anchorX = .5, i.anchorY = .5, i.scaleX = .95, i.scaleY = .95,
                Tween.to(i, { scaleX: 1, scaleY: 1 }, 100, Ease.backOut));
    };
    /** 原文静态 i.test_clip_de=1 */
    BaseSprite.test_clip_de = 1;
    return BaseSprite;
}(laya.ui.View));
exports.BaseSprite = BaseSprite;
/**
 * 注册身份等价物：原文 o(i,"sg.view.BaseSprite",t)（t=laya.ui.View）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(BaseSprite, "sg.view.BaseSprite", null, null);
//# sourceMappingURL=BaseSprite.js.map