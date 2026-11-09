/**
 * ui.loading.LoadingPanelUI —— IDE 生成 UI 类：LoadingPanel_V 的皮肤（loading/LoadingPanel）。
 *
 * 原文：code1.js 字节 [3663292,3663629]（包装变量 iI，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/LoadingPanelUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class LoadingPanelUI extends ItemBase {

    public container_b: any;
    public sp_logo: any;
    public container: any;
    public sp_darkLogo: any;
    public sp_mask: any;
    public hintTxt: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("loading/LoadingPanel");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.loading.LoadingPanelUI",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(LoadingPanelUI, "ui.loading.LoadingPanelUI", null, null);
