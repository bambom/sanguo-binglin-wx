/**
 * sg.view.effect.EffectUIBase —— 全屏视图特效基座（ViewManager.showViewEffect）。
 *
 * 原文：code1.js 字节 [3614719,3615533]（off 3615135，包装变量 hy，基类 s_=sg.view.ViewBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/EffectUIBase.js
 */
import Image = laya.ui.Image;
import Rectangle = laya.maths.Rectangle;
import { ViewBase } from "../ViewBase";

export class EffectUIBase extends ViewBase {

    public mCallback: any = null;
    public mThrough: boolean = true;

    constructor(t?: number, e?: any, n?: boolean) {
        super();
        void 0 === t && (t = .5);
        void 0 === n && (n = false);
        this.mCallback = e;
        this.mThrough = n;
        this.mouseEnabled = true;
        this.mBg = new Image();
        this.mBg.name = "_$_bg_mask_$_";
        this.mBg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.mBg.alpha = t;
        this.addChild(this.mBg);
        // n（mThrough）为真时不设命中区（整层穿透）
        n || (this.hitArea = new Rectangle(0, 0, Laya.stage.width, Laya.stage.height));
        this.mouseThrough = n;
    }

    public onAddedBase(): void {
        this.once("click", this, this.onClick_bg);
    }

    /** 移除：清事件、销毁子节点与自身，回调收尾 */
    public onRemovedBase(): void {
        this.clearEvent(),
            this.off("click", this, this.onClick_bg),
            this.destroyChildren(),
            this.destroy(),
            this.mCallback && this.mCallback.run(),
            this.mCallback = null;
    }

    public onClick_bg(t: any): void {
        "btn_close" != t.target.name && t.target != this || this.removeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.effect.EffectUIBase",t)（t=s_=sg.view.ViewBase）。
 */
Laya.class(EffectUIBase, "sg.view.effect.EffectUIBase", null, null);
