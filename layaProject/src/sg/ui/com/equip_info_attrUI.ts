/**
 * ui.com.equip_info_attrUI —— IDE 生成 UI 类：装备属性行皮肤（bg/txt/icon）(com/equip_info_attr)。
 *
 * 原文：code1.js 字节 [3741543,3741802)（259B；包装变量 mC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译，模块直引）；明文 3 参注册
 * o(i,"ui.com.equip_info_attrUI",t) @3741638；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/equip_info_attrUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：bg / txt / icon。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class equip_info_attrUI extends ItemBase {

    public bg: any;
    public txt: any;
    public icon: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/equip_info_attr");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.equip_info_attrUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(equip_info_attrUI, "ui.com.equip_info_attrUI", null, null);
