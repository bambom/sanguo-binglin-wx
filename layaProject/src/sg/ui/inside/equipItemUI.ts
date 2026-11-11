/**
 * ui.inside.equipItemUI —— IDE 生成 UI 类：装备条目（inside/equipItem；批次 S GodEquipItem 的皮肤基座，ui.inside 族）。
 *
 * 原文：code1.js 字节 [3545168,3545475)（307B；包装变量 Yf，`Yf=function(t){…}(e_)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 Y）。
 * 注册：o(i,"ui.inside.equipItemUI",t)（包装内 return 首位），o 实参字面量 @3545270；基类实参 e_=sg.view.com.ItemBase
 * （e_= 声明器 @3357326，唯一 "sg.view.com.ItemBase" 字面量在其包装内）。
 * 前邻 `god/btnGod")},i}(e_),`、后邻 `,qf=function(t){function` 逐字核对。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-y/equipItemUI.js
 *
 * 批次 Y 入批依据：批次 S 报告 §8 登记——S 的 14 个 sg.god.components 模块装载期
 * __extends 解析 ui.god.*UI 全局值，皮肤类落地前 F8 装载必崩；本批即该皮肤基座。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：item / imgSuc / select。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U/W 范式）。regComponent 类值实参原文为包装变量（Jk/uO 等），
 * 此处按 resolve_y.js 身份证明以等值路径/直引还原。
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class equipItemUI extends ItemBase {

    public item: any;
    public imgSuc: any;
    public select: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon_equipUI", ui.com.hero_icon_equipUI),
        (<any>laya.ui.Component.prototype).createChildren.call(this),
        this.loadUI("inside/equipItem");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.inside.equipItemUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(equipItemUI, "ui.inside.equipItemUI", null, null);
