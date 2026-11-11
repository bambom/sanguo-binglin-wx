/**
 * ui.duplicate.countBaseDupUI —— IDE 生成 UI 类：战况统计行基皮肤（countDup list itemRender 行）（duplicate/countBaseDup）。
 *
 * 原文：code1.js 字节 [3500073,3500442)（369B；包装变量 Hg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.countBaseDupUI",t) @3500272；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/countBaseDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：txt_name / txt_kill / txt_stronghold / txt_plough / btn_like / btn_unlike / icon_leader。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class countBaseDupUI extends ItemBase {

    public txt_name: any;
    public txt_kill: any;
    public txt_stronghold: any;
    public txt_plough: any;
    public btn_like: any;
    public btn_unlike: any;
    public icon_leader: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/countBaseDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.countBaseDupUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(countBaseDupUI, "ui.duplicate.countBaseDupUI", null, null);
