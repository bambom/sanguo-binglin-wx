/**
 * ui.god.godSkillUI —— IDE 生成 UI 类：神灵技能面板（god/godSkill）。
 *
 * 原文：code1.js 字节 [4153140,4153804)（664B；包装变量 KP，`KP=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.god.godSkillUI",t)（包装内 return 首位），o 实参字面量 @4153395；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量在其包装内）。
 * 前邻 `efend_hero}}),i}(Ug),KP=`、后邻 `,QP=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/godSkillUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：comTitle / btn_forget / txt_name / txt_state / txt_info / tab / list / btn_upgrade / icon / com_item / com_gold。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import View = laya.ui.View;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import { godSkillItemUI } from "./godSkillItemUI";
import { ViewPanel } from "../../view/ViewPanel";

export class godSkillUI extends ViewPanel {

    public comTitle: any;
    public btn_forget: any;
    public txt_name: any;
    public txt_state: any;
    public txt_info: any;
    public tab: any;
    public list: any;
    public btn_upgrade: any;
    public icon: any;
    public com_item: any;
    public com_gold: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btnUI", ui.com.panel_bg_btnUI),
        View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI),
        View.regComponent("HTMLDivElement", HTMLDivElement),
        View.regComponent("ui.god.godSkillItemUI", godSkillItemUI),
        View.regComponent("sg.god.components.GodSkillItem", sg.god.components.GodSkillItem),
        View.regComponent("ui.com.payTypeSUI", ui.com.payTypeSUI),
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("god/godSkill");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.god.godSkillUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(godSkillUI, "ui.god.godSkillUI", null, null);
