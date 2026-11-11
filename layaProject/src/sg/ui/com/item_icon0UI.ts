/**
 * ui.com.item_icon0UI —— IDE 生成 UI 类：通用道具图标 0（img；FORM B 逗号组元素）（com/item_icon0）。
 *
 * 原文：code1.js 字节 [3783578,3783790)（212B；无独立声明器——FORM B：本包装为逗号组
 * OT=(本包装,…后续同类包装…) 的元素[0]，inventory assignedVar=null 同证；注册+createChildren
 * 挂载为包装体语句序列（无 return 尾 i）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.item_icon0UI",t) @3783638；全类零池化）。
 * 前邻 "tageItem1\")},i}(e_),OT=("、后邻 ",function(t){function i(" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/item_icon0UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class item_icon0UI extends ComPayType {

    public img: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_icon0");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_icon0UI",t)（包装体语句序列首位（FORM B，无 return）；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(item_icon0UI, "ui.com.item_icon0UI", null, null);
