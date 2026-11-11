/**
 * sg.guide.view.ViewGuideImage —— 图文引导视图（ConfigClass.VIEW_GUIDE_IMAGE 面板：图片+文案
 * 淡入 1s → 点击淡出 300ms → removeSelf + autoNext 时 ModelGuide.nextStep；currArg setter
 * 解 {url,txt,next} 注入，autoNext 真 && 引导期间锁屏）。
 *
 * 原文：code1.js 字节 [6163433,6164293]（860B；包装变量 k5，基类 t=hD=ui.guide.guideImageUI，
 * 明文 3 参注册 o(i,"sg.guide.view.ViewGuideImage",t)，off 6163496；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/ViewGuideImage.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（ViewGuide.showImage `tn.instance.showView
 * (Ht.VIEW_GUIDE_IMAGE,t)` 面板位；ConfigClass.VIEW_GUIDE_IMAGE getter 类引用即 k5）。
 * 依赖：hD=ui.guide.guideImageUI（未译皮肤基类——extends 全局注册路径，batch-u-report §7）；
 * Ct=laya.utils.Tween、k=laya.utils.Ease、P=laya.utils.Handler（引擎）；Js=LoadeManager、
 * re=AssetsManager、ue=ModelManager、vs=Tools、Rt=ConfigApp、js=sg.guide.model.ModelGuide
 * （批次 Q 真类直引）；s=Laya（stage）。
 * currArg：同 ViewBigmage——getter 基类委托（等价 return this.mCurrArg），setter 本类实现。
 */
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Handler = laya.utils.Handler;
import { LoadeManager } from "../../manager/LoadeManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { ModelManager } from "../../manager/ModelManager";
import { Tools } from "../../utils/Tools";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ModelGuide } from "../model/ModelGuide";

export class ViewGuideImage extends ui.guide.guideImageUI {

    public autoNext: boolean = !0;

    constructor() {
        super();
    }

    public showImage(t: any, i: any): void {
        void 0 === i && (i = ""),
            this.img.alpha = 0, LoadeManager.loadTemp(this.img, AssetsManager.getAssetsAD(t + ".jpg")), "ar" == ConfigApp.lan() && (this.words.align = "right"), this.words.text = Tools.getMsgById(i), this.img.alpha = 0, Tween.to(this.img, { alpha: 1 }, 1e3, Ease.linearNone, Handler.create(this, this.onImgIn));
    }

    public bgClick(): void {
        Tween.to(this.img, { alpha: 0 }, 300, Ease.linearNone, Handler.create(this, this.onImgOut));
    }

    public onImgIn(): void {
        Laya.stage.once("click", this, this.onImgOut);
    }

    public onImgOut(): void {
        this.removeSelf(), this.autoNext && ModelGuide.instance.nextStep();
    }

    public get currArg(): any {
        return this.mCurrArg;
    }

    public set currArg(t: any) {
        this.autoNext = Boolean(t.next);
        var i = t.url;
        i instanceof Array && (i = i[ModelManager.instance.modelUser.country]),
            this.showImage(i, t.txt),
            this.autoNext && (ModelGuide.instance.lockScreen = !0);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.ViewGuideImage",t)（明文 3 参，基类 t=hD=
 * ui.guide.guideImageUI）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(ViewGuideImage, "sg.guide.view.ViewGuideImage", null, null);
