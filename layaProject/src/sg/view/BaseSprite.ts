/**
 * sg.view.BaseSprite —— 全部视图的根基座（2,967 个 laya.ui.View 终端类的公共祖先）。
 *
 * 原文：code1.js 字节 [3196546,3197435]（off 3196722，包装变量 Ju，基类 Bt=laya.ui.View）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/BaseSprite.js
 */
import Ease = laya.utils.Ease;
import Tween = laya.utils.Tween;

export class BaseSprite extends laya.ui.View {

    public test_clip_max_parent: any = null;
    public test_clip_num_max: number = 0;
    public test_clip_vis: boolean = true;
    public test_clip_max: number = 0;
    /** 特效动画（glow030），原文 mAni */
    public mAni: any = null;
    public mRect: any = null;

    constructor() {
        super();  // 原文 i.__super.call(this)
    }

    /** 弹窗位光效。原文 le.loadAnimation("glow030","",1)，le = sg.manager.EffectManager */
    public test_clip_effict_panel(t: number, i: number): void {
        this.mAni = sg.manager.EffectManager.loadAnimation("glow030", "", 1);
        sg.cfg.ConfigApp.isLandscape && (this.mAni.blendMode = "light");
        this.mAni.x = t;
        this.mAni.y = i;
        this.addChild(this.mAni);
    }

    /** 移除并销毁光效 */
    public clear_clip_effict_panel(t: any, i: any): void {
        this.mAni && (this.mAni.removeSelf(), this.mAni.destroy(true));
        this.mAni = null;
    }

    /** 原文空实现 */
    public test_clip_int(t: any): void {
    }

    /**
     * 子项入场缩放动画：对 t 的全部子节点（名字为 "_$_bg_mask_$_" 的蒙版除外）做
     * 0.95→1 的 backOut 补间；同时记录子节点数最多的父节点。
     */
    public test_clip_int_f1(t: any): void {
        var i: any, e: number = 0;
        for (t.numChildren > this.test_clip_num_max && (this.test_clip_max_parent = t, this.test_clip_num_max = t.numChildren),
            e = 0; e < t.numChildren; e++)
            "_$_bg_mask_$_" != (i = t.getChildAt(e)).name && (
                i.anchorX = .5, i.anchorY = .5, i.scaleX = .95, i.scaleY = .95,
                Tween.to(i, { scaleX: 1, scaleY: 1 }, 100, Ease.backOut));
    }

    /** 原文静态 i.test_clip_de=1 */
    public static test_clip_de: number = 1;
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.BaseSprite",t)（t=laya.ui.View）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(BaseSprite, "sg.view.BaseSprite", null, null);
