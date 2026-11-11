/**
 * ui.com.item_carouseUI —— IDE 生成 UI 类：ViewCarouse 子项（com/item_carouse）。
 *
 * 原文：code1.js 字节 [3743563,3743790]（包装变量 xC，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/item_carouseUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class item_carouseUI extends ItemBase {

    public panel: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_carouse");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_carouseUI",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(item_carouseUI, "ui.com.item_carouseUI", null, null);
