/**
 * ui.god.godSortUI —— IDE 生成 UI 类：神灵排序面板（god/godSort）。
 *
 * 原文：code1.js 字节 [4155275,4155599)（324B；包装变量 ZP，`ZP=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.god.godSortUI",t)（包装内 return 首位），o 实参字面量 @4155451；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量在其包装内）。
 * 前邻 `dSkillTips")},i}(tm),ZP=`、后邻 `,tD=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/godSortUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：imgName / txt_title / list / btn_propCheck / btn_inbornCheck / btn_close。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class godSortUI extends ViewPanel {

    public imgName: any;
    public txt_title: any;
    public list: any;
    public btn_propCheck: any;
    public btn_inbornCheck: any;
    public btn_close: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("god/godSort");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.god.godSortUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(godSortUI, "ui.god.godSortUI", null, null);
