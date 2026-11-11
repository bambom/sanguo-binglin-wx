/**
 * ui.god.godResetUI —— IDE 生成 UI 类：神灵重置面板（god/godReset）。
 *
 * 原文：code1.js 字节 [4151333,4151941)（608B；包装变量 qP，`qP=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.god.godResetUI",t)（包装内 return 首位），o 实参字面量 @4151624；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量在其包装内）。
 * 前邻 `odRecovery")},i}(tm),qP=`、后邻 `,XP=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/godResetUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：box / bg / comTitle / btn_payReset / btn_reset / txt_tips1 / txt_tips2 / list / btn_l / btn_r / txt_reset / txt_payReset / com_cost。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class godResetUI extends ViewPanel {

    public box: any;
    public bg: any;
    public comTitle: any;
    public btn_payReset: any;
    public btn_reset: any;
    public txt_tips1: any;
    public txt_tips2: any;
    public list: any;
    public btn_l: any;
    public btn_r: any;
    public txt_reset: any;
    public txt_payReset: any;
    public com_cost: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btn_sUI", ui.com.panel_bg_btn_sUI),
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI),
        View.regComponent("ui.bag.bagItemUI", ui.bag.bagItemUI),
        View.regComponent("ui.com.payTypeSUI", ui.com.payTypeSUI),
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("god/godReset");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.god.godResetUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(godResetUI, "ui.god.godResetUI", null, null);
