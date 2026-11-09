/**
 * sg.view.init.ViewAlert2 —— 仅确认按钮的警告弹窗（showWarn only+force_btn 变体）。
 *
 * 原文：code1.js 字节 [7345827,7346339]（off 7345925，包装变量 e8，基类 mW=ui.init.viewAlert2UI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewAlert2.js
 */
import { viewAlert2UI } from "../../ui/init/viewAlert2UI";

export class ViewAlert2 extends viewAlert2UI {

    /** 弹窗数据（ModelManager.instance.modelAlert） */
    public md: any = null;

    constructor() {
        super();
        this.btn.on("click", this, this.onClick);
    }

    public initData(): void {
        this.text0.text = sg.utils.Tools.getMsgById("_public203"),
            this.btn.label = sg.utils.Tools.getMsgById("_public183"),
            this.md = sg.manager.ModelManager.instance.modelAlert,
            this.onlyCloseByBtn(true),
            this.txt.text = this.md.text,
            this.width = Laya.stage.width,
            this.height = Laya.stage.height;
    }

    public onClick(t: any): void {
        this.md.execute(0),
            this.md.isWarn ? sg.manager.ViewManager.instance.clearWarn() : sg.manager.ViewManager.instance.closePanel(this);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewAlert2",t)（t=mW=ui.init.viewAlert2UI）。
 */
Laya.class(ViewAlert2, "sg.view.init.ViewAlert2", null, null);
