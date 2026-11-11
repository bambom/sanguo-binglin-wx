/**
 * ui.com.estate_btn_labelUI —— IDE 生成 UI 类：庄园按钮标签皮肤（btn/img）(com/estate_btn_label)。
 *
 * 原文：code1.js 字节 [3677821,3678068)（247B；包装变量 LI，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译，模块直引）；明文 3 参注册
 * o(i,"ui.com.estate_btn_labelUI",t) @3677902；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/estate_btn_labelUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：btn / img。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class estate_btn_labelUI extends ItemBase {

    public btn: any;
    public img: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/estate_btn_label");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.estate_btn_labelUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(estate_btn_labelUI, "ui.com.estate_btn_labelUI", null, null);
