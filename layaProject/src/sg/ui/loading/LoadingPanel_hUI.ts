/**
 * ui.loading.LoadingPanel_hUI —— IDE 生成 UI 类：LoadingPanel_H 的皮肤（loading/LoadingPanel_h）。
 *
 * 原文：code1.js 字节 [3662984,3663284]（包装变量 tI，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/LoadingPanel_hUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class LoadingPanel_hUI extends ItemBase {

    public img_bg: any;
    public img_progress: any;
    public img_mask: any;
    public hintTxt: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("loading/LoadingPanel_h");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.loading.LoadingPanel_hUI",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(LoadingPanel_hUI, "ui.loading.LoadingPanel_hUI", null, null);
