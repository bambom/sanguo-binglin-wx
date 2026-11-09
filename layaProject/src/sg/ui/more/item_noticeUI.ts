/**
 * ui.more.item_noticeUI —— IDE 生成 UI 类：ViewNotice 子项（more/item_notice）。
 *
 * 原文：code1.js 字节 [3846972,3847349]（包装变量 KB，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/item_noticeUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 * regComponent 引用的子组件类（Dk=ui.com.hero_icon1UI）缓译，保持全局注册路径。
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class item_noticeUI extends ItemBase {

    public boxFight: any;
    public heroIcon: any;
    public boxMove: any;
    public cityIcon: any;
    public tName: any;
    public tInfo: any;
    public btn_go: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("more/item_notice");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.more.item_noticeUI",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(item_noticeUI, "ui.more.item_noticeUI", null, null);
