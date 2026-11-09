/**
 * ui.init.viewAlertUI —— IDE 生成 UI 类：ViewAlert 的皮肤（init/viewAlert）。
 *
 * 原文：code1.js 字节 [4345632,4346181]（包装变量 QH，基类 tm=sg.view.ViewPanel）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/viewAlertUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（batch-a-report.md「构造期 createView 契约」）。
 * regComponent 引用的子组件类（RC/$T/dM）缓译，保持全局注册路径。
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class viewAlertUI extends ViewPanel {

    public bg: any;
    public comTitle: any;
    public btn0: any;
    public btn1: any;
    public contentBox: any;
    public text1: any;
    public box0: any;
    public ttt: any;
    public comtype: any;
    public text2: any;
    public box1: any;
    public text3: any;
    public btnCheck: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btn_sUI", ui.com.panel_bg_btn_sUI);
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI);
        View.regComponent("ui.com.payTypeBigUI", ui.com.payTypeBigUI);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewAlert");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewAlertUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(viewAlertUI, "ui.init.viewAlertUI", null, null);
