/**
 * ui.init.viewLoginChoose2UI —— IDE 生成 UI 类：ViewLoginChoose2 的皮肤（init/viewLoginChoose2）。
 *
 * 原文：code1.js 字节 [4510069,4510318]（off 4510150，包装变量 RW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoginChoose2UI.js
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewLoginChoose2UI extends ViewPanel {

    public bg: any;
    public list: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewLoginChoose2");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoginChoose2UI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewLoginChoose2UI, "ui.init.viewLoginChoose2UI", null, null);
