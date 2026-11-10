/**
 * ui.init.viewLoginChooseUI —— IDE 生成 UI 类：ViewLoginChoose 的皮肤（init/viewLoginChoose）。
 *
 * 原文：code1.js 字节 [4509785,4510061]（off 4509895，包装变量 DW，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoginChooseUI.js
 */
import { ViewPanel } from "../../view/ViewPanel";

export class viewLoginChooseUI extends ViewPanel {

    public btn_login: any;
    public btn_fast: any;
    public btn_reg: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewLoginChoose");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoginChooseUI",t)（t=tm=sg.view.ViewPanel）。
 */
Laya.class(viewLoginChooseUI, "ui.init.viewLoginChooseUI", null, null);
