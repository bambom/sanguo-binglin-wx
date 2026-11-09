/**
 * ui.shop.skinTipsUI —— IDE 生成 UI 类：ViewSkinTips 的皮肤（shop/skinTips）。
 *
 * 原文：code1.js 字节 [4668147,4668538]（包装变量 Aq，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/skinTipsUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 */
import View = laya.ui.View;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import { ViewPanel } from "../../view/ViewPanel";

export class skinTipsUI extends ViewPanel {

    public txt_title: any;
    public heroIcon: any;
    public imgStar: any;
    public infoHtml: any;
    public text1: any;
    public text0: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI);
        View.regComponent("HTMLDivElement", HTMLDivElement);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("shop/skinTips");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.shop.skinTipsUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(skinTipsUI, "ui.shop.skinTipsUI", null, null);
