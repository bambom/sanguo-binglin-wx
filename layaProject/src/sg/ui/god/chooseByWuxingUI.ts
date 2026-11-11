/**
 * ui.god.chooseByWuxingUI —— IDE 生成 UI 类：按五行选择神灵面板（god/chooseByWuxing）。
 *
 * 原文：code1.js 字节 [4144489,4144902)（413B；包装变量 FP，`FP=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.god.chooseByWuxingUI",t)（包装内 return 首位），o 实参字面量 @4144740；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量在其包装内）。
 * 前邻 `ooseByType")},i}(tm),FP=`、后邻 `,HP=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/chooseByWuxingUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：imgName / txt_title / btn_0 / txt_0 / btn_1 / txt_1 / btn_2 / txt_2 / btn_3 / txt_3 / btn_4 / txt_4。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class chooseByWuxingUI extends ViewPanel {

    public imgName: any;
    public txt_title: any;
    public btn_0: any;
    public txt_0: any;
    public btn_1: any;
    public txt_1: any;
    public btn_2: any;
    public txt_2: any;
    public btn_3: any;
    public txt_3: any;
    public btn_4: any;
    public txt_4: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("god/chooseByWuxing");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.god.chooseByWuxingUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(chooseByWuxingUI, "ui.god.chooseByWuxingUI", null, null);
