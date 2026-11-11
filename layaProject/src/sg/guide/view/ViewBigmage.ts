/**
 * sg.guide.view.ViewBigmage —— 全屏大图过渡视图（change_season 引导：图片淡入 1s →
 * 点击淡出 300ms → closeSelf + handler.run；currArg setter 解 {image,handler} 注入）。
 *
 * 原文：code1.js 字节 [6162649,6163425]（776B；包装变量 C5，基类 t=hD=ui.guide.guideImageUI，
 * 明文 3 参注册 o(i,"sg.guide.view.ViewBigmage",t)，off 6162810；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/ViewBigmage.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（ViewGuide.changeSeason
 * `tn.instance.showView(["ViewBigmage",C5],{image,handler})` 类引用直传）。
 * 依赖：hD=ui.guide.guideImageUI（未译皮肤基类——extends 全局注册路径，译文落地前
 * F8 模块求值依赖其先行，batch-u-report §7）；F=laya.ui.Image、Ct=laya.utils.Tween、
 * k=laya.utils.Ease、P=laya.utils.Handler（引擎）；Js=sg.manager.LoadeManager、
 * re=sg.manager.AssetsManager、ue=sg.manager.ModelManager（已译直引）；s=Laya（stage）。
 * currArg：原文 r(0,e,"currArg",t.prototype._$get_currArg,setter)——getter 为基类
 * getter 委托（等价 return this.mCurrArg），setter 为本类实现且不调基类 setter
 * （mCurrArg 不更新，1:1 保留）；TS get+set 覆写等价复刻。
 */
import Image = laya.ui.Image;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Handler = laya.utils.Handler;
import { LoadeManager } from "../../manager/LoadeManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { ModelManager } from "../../manager/ModelManager";

export class ViewBigmage extends ui.guide.guideImageUI {

    public handler: any = null;

    constructor() {
        super();
        this.box.removeSelf(),
            this.img = new Image(),
            this.addChild(this.img),
            this.img.centerX = this.img.centerY = 0;
    }

    public showImage(t: any): void {
        this.img.alpha = 0, LoadeManager.loadTemp(this.img, AssetsManager.getVersionStr(t)), Tween.to(this.img, { alpha: 1 }, 1e3, Ease.linearNone, Handler.create(this, this.onImgIn));
    }

    public bgClick(): void {
        Tween.to(this.img, { alpha: 0 }, 300, Ease.linearNone, Handler.create(this, this.onImgOut));
    }

    public onImgIn(): void {
        Laya.stage.once("click", this, this.onImgOut);
    }

    public onImgOut(): void {
        this.closeSelf(), this.handler && this.handler.run();
    }

    public get currArg(): any {
        return this.mCurrArg;
    }

    public set currArg(t: any) {
        this.handler = t.handler;
        var i = t.image;
        i instanceof Array && (i = i[ModelManager.instance.modelUser.country]),
            this.showImage(i);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.ViewBigmage",t)（明文 3 参，基类 t=hD=
 * ui.guide.guideImageUI）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(ViewBigmage, "sg.guide.view.ViewBigmage", null, null);
