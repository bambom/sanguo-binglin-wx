/**
 * ui.init.viewHintUI —— IDE 生成 UI 类：ViewHintPanel 的皮肤（init/viewHint）。
 *
 * 原文：code1.js 字节 [4498033,4498424]（包装变量 UW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/viewHintUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 * regComponent 引用的子组件类（RC/$T）缓译，保持全局注册路径。
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class viewHintUI extends ViewPanel {

    public box: any;
    public bg: any;
    public txt_content: any;
    public comTitle: any;
    public btn0: any;
    public btn1: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btn_sUI", ui.com.panel_bg_btn_sUI);
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewHint");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewHintUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewHintUI, "ui.init.viewHintUI", null, null);
