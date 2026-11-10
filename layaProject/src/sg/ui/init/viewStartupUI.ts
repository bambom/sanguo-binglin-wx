/**
 * ui.init.viewStartupUI —— IDE 生成 UI 类：ViewStartup 的皮肤（init/viewStartup）。
 *
 * 原文：code1.js 字节 [4534982,4535209]（off 4535051，包装变量 ZW，基类 Z_=sg.view.ViewScenes）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewStartupUI.js
 */
import { ViewScenes } from "../../view/ViewScenes";

export class viewStartupUI extends ViewScenes {

    public label: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewStartup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewStartupUI",t)（t=Z_=sg.view.ViewScenes）。
 */
Laya.class(viewStartupUI, "ui.init.viewStartupUI", null, null);
