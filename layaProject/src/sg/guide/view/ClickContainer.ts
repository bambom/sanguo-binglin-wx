/**
 * sg.guide.view.ClickContainer —— 引导点击遮罩容器（_refresh 帧跟随目标绘制命中区/蒙版；
 * lock 全屏锁点 / unlock=hide；hide 清帧循环与绘制）。
 *
 * 原文：code1.js 字节 [2788726,2789813]（1,087B；包装变量 Ul，基类 t=ut=laya.display.Sprite，
 * 明文 3 参注册 o(i,"sg.guide.view.ClickContainer",t)，off 2788913；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/ClickContainer.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（ViewGuide 点击引导的遮罩件，ViewGuide ctor
 * `new Ul` 装配，玩法期引导链触达）。
 * 依赖：et=laya.maths.Point、ht=laya.maths.Rectangle、D=laya.utils.HitArea（引擎）；
 * sp=sg.guide.view.ViewGuide（getHitArea 静态，本批次类直引）；s=Laya（stage/timer）。
 */
import Point = laya.maths.Point;
import Rectangle = laya.maths.Rectangle;
import HitArea = laya.utils.HitArea;
import { ViewGuide } from "./ViewGuide";

export class ClickContainer extends laya.display.Sprite {

    public _target: any = null;
    public _opts: any = null;
    public _lastP: Point;
    public _rect: Rectangle;

    constructor() {
        super();
        this._lastP = new Point(),
            this._rect = new Rectangle(),
            this.alpha = .75,
            this.hitArea = new HitArea(),
            this.on("click", this, function (t) { });
    }

    public show(t: any, i: any, e: any): void {
        this.hide(), this._target = t, this._opts = e, this._rect.setTo(i.x, i.y, i.width, i.height), this._refresh(), t && this.timer.frameLoop(1, this, this._refresh);
    }

    public _refresh(): any {
        if (!this._target || this._target.destroyed) return this.hide();
        if (!(this._lastP.distance(this._target.x, this._target.y) < 1)) {
            this._lastP.setTo(this._target.x, this._target.y);
            var t: any = ViewGuide.getHitArea(this._target, this._rect);
            this._opts.shield && (this.hitArea.hit.clear(), this.hitArea.hit.drawPoly(0, 0, t)), this._opts.shade && (this.graphics.clear(), this.graphics.drawPoly(0, 0, t, "#000"));
        }
    }

    public lock(): void {
        this.hitArea.hit.clear(), this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height);
    }

    public unlock(): void {
        this.hide();
    }

    public hide(): void {
        this.timer.clear(this, this._refresh), this._lastP.setTo(-999, -999), this.graphics.clear(), this.hitArea.hit.clear();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.ClickContainer",t)（明文 3 参，基类 t=ut=
 * laya.display.Sprite）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(ClickContainer, "sg.guide.view.ClickContainer", null, null);
