/**
 * sg.guide.view.GuideArrow —— 引导指向箭头（帧循环摆动 x；_onTimer 按目标方位选 0/90/180
 * 朝向并 tween 平移；reset setter-only 直写 _reset；instance 惰性静态单例，ctor 自挂
 * ViewManager.mLayerGuide 顶层 zOrder 999）。
 *
 * 原文：code1.js 字节 [2789821,2792392]（2,571B；包装变量 El，基类 t=ut=laya.display.Sprite，
 * 明文 3 参注册 o(i,"sg.guide.view.GuideArrow",t)，off 2790383；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/GuideArrow.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（ViewGuide ctor `this.arrow=El.instance`
 * 装配；ModelGuide.waitASecond `ViewGuide.instance.arrow.resetArrow()` 引导链）。
 * 依赖：et=laya.maths.Point（TEMP）、ht=laya.maths.Rectangle、F=laya.ui.Image、
 * xt=laya.utils.Timer、Ct=laya.utils.Tween、k=laya.utils.Ease、P=laya.utils.Handler（引擎）；
 * re=sg.manager.AssetsManager（getAssetsUI，已译直引）；tn=sg.manager.ViewManager
 * （instance.mLayerGuide，已译直引）；ye=sg.map.utils.Math2（angleToRadian/
 * radianToAngle，未译——static 成员缺口按批次 D/J 先例调用点 (<any>) cast）；
 * s=Laya（stage/timer）；laya（instance 标记 setter）。
 */
import Point = laya.maths.Point;
import Rectangle = laya.maths.Rectangle;
import Image = laya.ui.Image;
import Timer = laya.utils.Timer;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Handler = laya.utils.Handler;
import { AssetsManager } from "../../manager/AssetsManager";
import { ViewManager } from "../../manager/ViewManager";

export class GuideArrow extends laya.display.Sprite {

    public _target: any = null;
    public arrowImage: Image = null;
    public tempTimer: Timer = null;
    public angle: number = 0;
    public speed: number = .12;
    public range: number = 12;
    public _reset: boolean = !0;
    public _prevX: number = 0;
    public _prevY: number = 0;
    public tween_r: any = null;
    public desRotation: number = 0;
    public _duration: number = 0;
    public _targetP: Point;
    public _rect: Rectangle;

    constructor() {
        super();
        this._targetP = new Point(),
            this._rect = new Rectangle(),
            this.tempTimer = new Timer(),
            this.arrowImage = new Image(AssetsManager.getAssetsUI("btn_jiantou.png")),
            this.arrowImage.setBounds(this.getBounds()),
            this.arrowImage.anchorX = .5,
            this.arrowImage.anchorY = .5,
            this.addChild(this.arrowImage),
            this.visible = !1,
            ViewManager.instance.mLayerGuide.addChild(this),
            this.zOrder = 999;
    }

    public onFrameChange(): void {
        this.arrowImage.x = (Math.sin(this.angle) - 1) * this.range, this.angle += this.speed;
    }

    public show(t: any, i: any): void {
        this._rect.setTo(t.x, t.y, t.width, t.height), this._target = i, this._onTimer(), i && Laya.timer.frameLoop(1, this, this._onTimer);
    }

    public _onTimer(): void {
        var t = this._rect.x, i = this._rect.y;
        if (this._target && !this._target.destroyed) {
            var e: any = this._target.localToGlobal(Point.TEMP.setTo(0, 0));
            t += e.x, (i += e.y) > 100 ? (this.rotation = 90, t += .5 * this._rect.width) : t > 100 ? (this.rotation = 0, i += .5 * this._rect.height) : (this.rotation = 180, t += this._rect.width, i += .5 * this._rect.height);
        } else this.rotation = 90, t += .5 * this._rect.width;
        if (this._targetP.x !== t || this._targetP.y !== i) {
            this._targetP.setTo(t, i);
            this._rect.width, this._rect.height;
            var n: any = (<any>sg.map.utils.Math2).angleToRadian(this.rotation);
            i -= Math.sin(n) * this.arrowImage.height * .5, t -= Math.cos(n) * this.arrowImage.width;
            var h = this._duration = Point.TEMP.setTo(t, i).distance(this.x, this.y) / 800 * 1e3;
            this.desRotation = this.rotation,
                this._reset && (this.pos(.5 * Laya.stage.width, .5 * Laya.stage.height), h = this._duration = Point.TEMP.setTo(t, i).distance(this.x, this.y) / 800 * 1e3, this._prevX = this.x, this._prevY = this.y, this.rotation = h < 800 ? 90 : (<any>sg.map.utils.Math2).radianToAngle(Math.atan2(i - this.y, t - this.x))),
                h = h > 1e3 ? 1e3 : h,
                this.resetRotation(),
                this.visible = !0,
                this._reset = !1,
                Tween.clearAll(this),
                this.alpha = 0,
                Tween.to(this, { alpha: 1 }, 500, Ease.linearNone),
                Tween.to(this, { x: t, y: i, rotation: this.desRotation }, h, Ease.linearNone, Handler.create(this.tempTimer, this.tempTimer.frameLoop, [1, this, this.onFrameChange]));
        }
    }

    public resetRotation(): void {
        Math.abs(this.desRotation - this.rotation) > 180 && (this.rotation += 360 * (this.rotation < 0 ? 1 : -1));
    }

    public resetArrow(): void {
        this.hide(), this._reset = !0;
    }

    public hide(): void {
        this.visible = !1, Tween.clearTween(this), this._targetP.setTo(-999, -999), Laya.timer.clear(this, this._onTimer), this.tempTimer.clear(this, this.onFrameChange);
    }

    /** r(0,e,"reset",null,setter) —— getter 为 null 的 setter-only getset（求值序等价直译） */
    public set reset(t: any) {
        this._reset = t;
    }

    /** r(1,i,"instance",getter,laya.display.Sprite._$SET_instance) —— 惰性静态单例（批次 K 定案形态） */
    public static get instance(): GuideArrow {
        return GuideArrow._arrow = GuideArrow._arrow || new GuideArrow();
    }

    public static _arrow: GuideArrow = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.GuideArrow",t)（明文 3 参，基类 t=ut=
 * laya.display.Sprite）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(GuideArrow, "sg.guide.view.GuideArrow", null, null);
