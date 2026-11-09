/**
 * sg.view.loading.LoadingPanel_H —— 横屏 Loading 面板（LoadingController.createPanel sg4 分支）。
 *
 * 原文：code1.js 字节 [5125917,5126722]（off 5126223，包装变量 S$，基类 tI=ui.loading.LoadingPanel_hUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/LoadingPanel_H.js
 *
 * 依赖：En=sg.view.loading.LoadingController、tn=ViewManager（批次 A 模块直引）；
 * Rt=ConfigApp、vs=Tools（批次 B 模块直引）。
 */
import { LoadingPanel_hUI } from "../../ui/loading/LoadingPanel_hUI";
import { LoadingController } from "./LoadingController";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { Tools } from "../../utils/Tools";

export class LoadingPanel_H extends LoadingPanel_hUI {

    public speed: number = NaN;
    public oriX: number = NaN;
    public mParent: any = null;
    /** sg.view.loading.LoadingController 单例（原文 this.model=En.instance） */
    public model: LoadingController = null;

    constructor() {
        super();
        this.model = LoadingController.instance;
        this.oriX = this.img_mask.x - this.img_mask.width;
        this.model.on("display", this, this.showLoading);
        this.model.on("undisplay", this, this.hideLoading);
        this.model.on("progress", this, this.setProgress);
    }

    public showLoading(t: any): void {
        this.mParent = ViewManager.instance.mLayerLoading,
            this.mParent.visible = this.visible = true,
            this.mParent.addChild(this),
            this.setProgress(0);
    }

    /** 进度：遮罩从左侧按比例揭示；越南语区分文案 */
    public setProgress(t: any): void {
        this.img_mask.x = this.oriX + this.img_mask.width * t / 100,
            "viet" == ConfigApp.lan()
                ? this.hintTxt.text = Tools.getMsgById("_jia0038", [t])
                : this.hintTxt.text = "[" + t + "%]" + Tools.getMsgById("_jia0038");
    }

    public hideLoading(): void {
        this.parent && ((<any>this.parent).visible = false),
            this.removeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.loading.LoadingPanel_H",t)（t=tI=ui.loading.LoadingPanel_hUI）。
 */
Laya.class(LoadingPanel_H, "sg.view.loading.LoadingPanel_H", null, null);
