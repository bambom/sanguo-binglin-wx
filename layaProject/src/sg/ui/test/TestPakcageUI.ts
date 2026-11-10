/**
 * ui.test.TestPakcageUI —— IDE 生成 UI 类：TestPackage 的皮肤（test/TestPakcage）。
 * 原文注册名拼写 TestPakcage 如此（缺 'k' 后缀形态，与 sg.test.testpakcage 同款
 * 拼写面；批次 G 登记 W7 时既已核）。
 *
 * 原文：code1.js 字节 [4321069,4321450)（包装变量 MH，`MH=function(t){...}(tm)`，
 * 声明器单一 CallExpression；前邻 `i}(tm),MH=` @4321064 实证）。
 * 注册：o(i,"ui.test.TestPakcageUI",t)，基类 t=tm=sg.view.ViewPanel（批次 A ✓）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-i/TestPakcageUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class TestPakcageUI extends ViewPanel {

    public selectContent: any;
    public log_list: any;
    public tab: any;
    public editContent: any;
    public inputText: any;
    public back: any;
    public send: any;
    public title_txt: any;
    public beizhu_txt: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("test/TestPakcage");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.test.TestPakcageUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(TestPakcageUI, "ui.test.TestPakcageUI", null, null);
