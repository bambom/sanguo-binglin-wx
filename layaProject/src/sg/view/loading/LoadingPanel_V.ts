/**
 * sg.view.loading.LoadingPanel_V —— 竖屏 Loading 面板（LoadingController.createPanel 默认分支）。
 *
 * 原文：code1.js 字节 [5126730,5128196]（off 5127320，包装变量 B$，基类 iI=ui.loading.LoadingPanelUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/LoadingPanel_V.js
 *
 * 依赖：En=LoadingController、tn=ViewManager（批次 A 模块直引）；Rt=ConfigApp、
 * re=AssetsManager、vs=Tools（批次 B 模块直引）。
 */
import { LoadingPanelUI } from "../../ui/loading/LoadingPanelUI";
import { LoadingController } from "./LoadingController";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";

export class LoadingPanel_V extends LoadingPanelUI {

    public speed: number = NaN;
    public maskW: number = NaN;
    public oriX: number = NaN;
    public desX: number = NaN;
    public mParent: any = null;
    /** sg.view.loading.LoadingController 单例（原文 this.model=En.instance） */
    public model: LoadingController = null;

    constructor() {
        super();
        this.model = LoadingController.instance;
        this.maskW = this.sp_mask.width;
        this.oriX = this.maskW / -6;
        this.desX = 0;
        this.speed = 1;
        // 定制 logo（lclip2 配置）覆盖默认皮肤
        ConfigApp.lclip2 && "" != ConfigApp.lclip2
            ? (this.hintTxt.text = "",
                this.sp_logo.skin = AssetsManager.getAssetsAD(ConfigApp.lclip2),
                this.sp_darkLogo.skin = "")
            : (this.sp_logo.skin = "clip/loadingPanel/logo.png",
                this.sp_darkLogo.skin = "clip/loadingPanel/logoblack.png");
        this.model.on("display", this, this.showLoading);
        this.model.on("undisplay", this, this.hideLoading);
        this.model.on("progress", this, this.setProgress);
    }

    public showLoading(t: any): void {
        this.mParent = ViewManager.instance.mLayerLoading,
            Laya.timer.clear(this, this._onFrameChange),
            Laya.timer.frameLoop(1, this, this._onFrameChange),
            this.mParent.visible = true,
            this.mParent.addChild(this),
            this.initUI();
    }

    public initUI(): void {
        this.setProgress(0),
            this.sp_mask.x = this.oriX,
            this.sp_mask.width = this.maskW,
            (<any>this).centerY = .5 * (Laya.stage.height - this.height);
    }

    /** 高光条循环滚动（越界回绕） */
    public _onFrameChange(): void {
        this.parent && (this.sp_mask.x += this.speed, this.sp_mask.x > this.desX && (this.sp_mask.x += this.oriX));
    }

    /** 进度：亮面 logo 随进度上移揭示；越南语区分文案 */
    public setProgress(t: any): void {
        this.sp_mask.y = this.sp_darkLogo.height * (t / 100) * -1,
            ConfigApp.lclip2 && "" != ConfigApp.lclip2
                ? this.hintTxt.text = ""
                : "viet" == ConfigApp.lan()
                    ? this.hintTxt.text = Tools.getMsgById("_jia0038", [t])
                    : this.hintTxt.text = "[" + t + "%]" + Tools.getMsgById("_jia0038");
    }

    public hideLoading(): void {
        this.parent && ((<any>this.parent).visible = false),
            this.removeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.loading.LoadingPanel_V",t)（t=iI=ui.loading.LoadingPanelUI）。
 */
Laya.class(LoadingPanel_V, "sg.view.loading.LoadingPanel_V", null, null);
