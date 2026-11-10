/**
 * ui.init.viewLoginChoose2_HUI —— IDE 生成 UI 类：ViewLoginChoose2_H 的皮肤（init/viewLoginChoose2_H）。
 *
 * 原文：code1.js 字节 [4510326,4510579]（off 4510407，包装变量 FW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoginChoose2_HUI.js
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewLoginChoose2_HUI extends ViewPanel {

    public bg: any;
    public list: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewLoginChoose2_H");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoginChoose2_HUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewLoginChoose2_HUI, "ui.init.viewLoginChoose2_HUI", null, null);
