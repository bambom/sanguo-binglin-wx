/**
 * ui.init.viewLoginUI —— IDE 生成 UI 类：ViewLogin 的皮肤（init/viewLogin）。
 *
 * 原文：code1.js 字节 [4509278,4509777]（off 4509623，包装变量 PW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoginUI.js
 *
 * 字段不带初始化器（构造期 createView 契约，同 viewAlertUI.ts 头注）。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewLoginUI extends ViewPanel {

    public mBox: any;
    public btn_login: any;
    public btn_register: any;
    public btn_phone: any;
    public btn_fast: any;
    public tName: any;
    public tPwd1: any;
    public boxReal: any;
    public btn_real: any;
    public boxReg: any;
    public tPwd2: any;
    public comTitle: any;
    public btn_users: any;
    public listBox: any;
    public listName: any;
    public btn_fb: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewLogin");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoginUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewLoginUI, "ui.init.viewLoginUI", null, null);
