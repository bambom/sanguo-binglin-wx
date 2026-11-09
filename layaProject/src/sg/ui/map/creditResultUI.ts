/**
 * ui.map.creditResultUI —— IDE 生成 UI 类：ViewCreditResult 的皮肤（map/creditResult）。
 *
 * 原文：code1.js 字节 [4598361,4599048]（包装变量 Vj，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/creditResultUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 * regComponent 引用的子组件类（Hk/pM/BM/v_/$T）缓译，保持全局注册路径。
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class creditResultUI extends ViewPanel {

    public comHero: any;
    public com0: any;
    public comIndex: any;
    public btn0: any;
    public btn1: any;
    public label1: any;
    public label2: any;
    public label3: any;
    public text1: any;
    public text2: any;
    public text3: any;
    public label4: any;
    public text5: any;
    public list: any;
    public comTitle: any;
    public label0: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI);
        View.regComponent("ui.com.payTypeSUI", ui.com.payTypeSUI);
        View.regComponent("ui.com.rank_index_img_tUI", ui.com.rank_index_img_tUI);
        View.regComponent("ui.bag.bagItemUI", ui.bag.bagItemUI);
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("map/creditResult");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.map.creditResultUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(creditResultUI, "ui.map.creditResultUI", null, null);
