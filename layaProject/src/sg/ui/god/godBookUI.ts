/**
 * ui.god.godBookUI —— IDE 生成 UI 类：神灵图鉴面板（god/godBook）。
 *
 * 原文：code1.js 字节 [4145427,4146000)（573B；包装变量 OP，`OP=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.god.godBookUI",t)（包装内 return 首位），o 实参字面量 @4145582；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量在其包装内）。
 * 前邻 `ostConfirm")},i}(tm),OP=`、后邻 `,GP=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/godBookUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：comTitle / godItem / comType / tab / list / comName。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import View = laya.ui.View;
import { godIconSUI } from "./godIconSUI";
import { ViewPanel } from "../../view/ViewPanel";

export class godBookUI extends ViewPanel {

    public comTitle: any;
    public godItem: any;
    public comType: any;
    public tab: any;
    public list: any;
    public comName: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btnUI", ui.com.panel_bg_btnUI),
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI),
        View.regComponent("sg.god.components.GodItem", sg.god.components.GodItem),
        View.regComponent("sg.god.components.GodType", sg.god.components.GodType),
        View.regComponent("ui.god.godIconSUI", godIconSUI),
        View.regComponent("sg.god.components.GodName", sg.god.components.GodName),
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("god/godBook");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.god.godBookUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(godBookUI, "ui.god.godBookUI", null, null);
