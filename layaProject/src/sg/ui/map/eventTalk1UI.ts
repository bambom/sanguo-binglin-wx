/**
 * ui.map.eventTalk1UI —— IDE 生成 UI 类：ViewHeroTalk 的皮肤（map/eventTalk1）。
 *
 * 原文：code1.js 字节 [4496107,4496507]（包装变量 AW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/eventTalk1UI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 * regComponent("HTMLDivElement", U) 注册引擎类 laya.html.dom.HTMLDivElement。
 */
import View = laya.ui.View;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import { ViewPanel } from "../../view/ViewPanel";

export class eventTalk1UI extends ViewPanel {

    public comHero: any;
    public infoLabel: any;
    public titleLabel: any;
    public htmlLabel1: any;
    public htmlLabel0: any;
    public btn: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI);
        View.regComponent("HTMLDivElement", HTMLDivElement);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("map/eventTalk1");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.map.eventTalk1UI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(eventTalk1UI, "ui.map.eventTalk1UI", null, null);
