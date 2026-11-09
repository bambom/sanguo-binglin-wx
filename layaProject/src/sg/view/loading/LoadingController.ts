/**
 * sg.view.loading.LoadingController —— 启动 Loading 控制器。
 *
 * 原文：code1.js 字节 [1496270,1497548]（off 1496720，包装变量 En，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/LoadingController.js
 */
import TouchManager = laya.events.TouchManager;
import { LoadeManager } from "../../manager/LoadeManager";

export class LoadingController extends laya.events.EventDispatcher {

    /** sg.manager.LoadeManager 单例（原文 this.loader=Js.instance） */
    public loader: LoadeManager = null;
    public percentSpeed: number = 1;
    public fakePercent: number = 0;
    public _loading: boolean = false;

    constructor() {
        super();  // 原文 i.__super.call(this)

        this.loader = LoadeManager.instance;
        // 先 off 再 on：防重复注册（原文逐句）
        this.loader.off("show_panel", this, this.showLoading);
        this.loader.off("progress", this, this.setProgress);
        this.loader.off("remove_self", this, this.hideLoading);
        this.loader.on("show_panel", this, this.showLoading);
        this.loader.on("progress", this, this.setProgress);
        this.loader.on("remove_self", this, this.hideLoading);
    }

    /** t（毫秒）给定假进度节奏：30ms/帧推进；期间禁用触摸 */
    public showLoading(t?: any): void {
        Laya.timer.clear(this, this.animateTime);
        t && (
            this.fakePercent = 0,
            this.percentSpeed = 100 / (t / 30),
            Laya.timer.loop(30, this, this.animateTime));
        TouchManager.I.enable = false;
        this.event("display");
        this._loading = true;
    }

    public animateTime(t?: any): void {
        this.fakePercent += this.percentSpeed,
            this.setProgress(this.fakePercent),
            this.fakePercent >= 100 && Laya.timer.clear(this, this.animateTime);
    }

    public setProgress(t: number): void {
        t = Math.round(t),
            t = Math.min(t, 100),
            this.event("progress", t);
    }

    public hideLoading(): void {
        TouchManager.I.enable = true;
        this.event("undisplay");
        this._loading = false;
    }

    /** 原文 r(0,e,"loading",getter) —— 只读实例属性，恒 false */
    public get loading(): boolean {
        return false;
    }

    /** 原文 r(1,i,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 静态单例（只读） */
    public static get instance(): LoadingController {
        return LoadingController.sManager = LoadingController.sManager || new LoadingController();
    }

    /** 按 UI 类型建 Loading 面板（实例自注册后即弃引用，原文如此） */
    public static createPanel(): void {
        "sg4" === sg.cfg.HelpConfig.type_ui ? new sg.view.loading.LoadingPanel_H() : new sg.view.loading.LoadingPanel_V();
    }

    public static sManager: LoadingController = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.loading.LoadingController",t)（t=T=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(LoadingController, "sg.view.loading.LoadingController", null, null);
