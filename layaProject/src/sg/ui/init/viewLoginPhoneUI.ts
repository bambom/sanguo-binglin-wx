/**
 * ui.init.viewLoginPhoneUI —— IDE 生成 UI 类：ViewLoginPhone 的皮肤（init/viewLoginPhone）。
 *
 * 原文：code1.js 字节 [4510587,4510960]（off 4510796，包装变量 HW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoginPhoneUI.js
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewLoginPhoneUI extends ViewPanel {

    public mBox: any;
    public btn_login: any;
    public txtNumber: any;
    public text3: any;
    public txtCode: any;
    public btn_code: any;
    public text1: any;
    public text0: any;
    public text2: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewLoginPhone");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoginPhoneUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewLoginPhoneUI, "ui.init.viewLoginPhoneUI", null, null);
