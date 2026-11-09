/**
 * ui.init.viewAlert2UI —— IDE 生成 UI 类：ViewAlert2 的皮肤（init/viewAlert2）。
 *
 * 原文：code1.js 字节 [4488137,4488390]（包装变量 mW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/viewAlert2UI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewAlert2UI extends ViewPanel {

    public txt: any;
    public text0: any;
    public btn: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewAlert2");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewAlert2UI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewAlert2UI, "ui.init.viewAlert2UI", null, null);
