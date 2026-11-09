/**
 * sg.view.menu.ViewMenuMainBase —— 常驻菜单层基座（ViewMenuMain/_sg4/ViewMenuScene 的父类）。
 *
 * 原文：code1.js 字节 [3143508,3145016]（off 3143508+610，包装变量 Fu，基类 _=laya.ui.Box）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewMenuMainBase.js
 *
 * 依赖：Rt=ConfigApp、vs=Tools（批次 B 模块直引）；tn=ViewManager（批次 A 模块直引）。
 */
import Tween = laya.utils.Tween;
import Handler = laya.utils.Handler;
import { ViewManager } from "../../manager/ViewManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { Tools } from "../../utils/Tools";

export class ViewMenuMainBase extends laya.ui.Box {

    public view_top: any = null;
    public _lastMouseX: number = 0;
    public _lastMouseY: number = 0;
    public _isDrag: boolean = false;

    constructor() {
        super();
    }

    /** 菜单层初始化：缓存绘制、按避让值定位、占满舞台、挂按下拖动判定 */
    public init(): void {
        this.cacheAs = "normal",
            this.mouseThrough = true,
            this.pos(0, ConfigApp.topVal),
            this.size(Laya.stage.width, Laya.stage.height - this.y),
            Laya.stage.on("mousedown", this, this._onMouseDown);
    }

    public setVisible(t: boolean): void {
        this.visible = t;
    }

    /** 按下记录起点（多指忽略），移动超阈值判为拖动，抬起非拖动派发 event_click */
    public _onMouseDown(t: any): void {
        t.touches && t.touches.length >= 2 || (
            this._lastMouseX = Laya.stage.mouseX,
                this._lastMouseY = Laya.stage.mouseY,
                Laya.stage.on("mousemove", this, this._onMouseMove),
                Laya.stage.on("mouseup", this, this._onMouseUp));
    }

    public _onMouseMove(t: any): void {
        if (!(t.touches && t.touches.length >= 2)) {
            var i = Laya.stage.mouseX - this._lastMouseX,
                e = Laya.stage.mouseY - this._lastMouseY;
            this._isDrag || (this._isDrag = i * i + e * e > 100);
        }
    }

    public _onMouseUp(t: any): void {
        this._isDrag || this.event("event_click", t),
            this._isDrag = false,
            Laya.stage.off("mousemove", this, this._onMouseMove),
            Laya.stage.off("mouseup", this, this._onMouseUp);
    }

    public onClickSwitch(): void {
        ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0194")),
            this.hideAndAutoShow();
    }

    public hideAndAutoShow(): void {
        this._setMenuVisible(false, true);
    }

    /** 显隐补间；隐藏时挂一次性 event_click 自恢复 */
    public _setMenuVisible(t: boolean, i?: boolean): void {
        var e = this;
        void 0 === i && (i = false);
        !t && i && this.on("event_click", this, this._setMenuVisible, [true]);
        var s: number;
        s = t ? 1 : 0,
            Tween.clearAll(this),
            Tween.to(this, { alpha: s }, 500, null, Handler.create(this, function () { e.mouseEnabled = t; }));
    }

    public getButton(t: any): any {
        return null;
    }

    public getTroop(t: any): any {
        return null;
    }

    public getTroopById(t: any): any {
        return null;
    }

    public static Event_CLICK: string = "event_click";
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.menu.ViewMenuMainBase",t)（t=_=laya.ui.Box）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewMenuMainBase, "sg.view.menu.ViewMenuMainBase", null, null);
