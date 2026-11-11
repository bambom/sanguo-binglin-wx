/**
 * ui.com.item_science_iconUI —— IDE 生成 UI 类：科技图标皮肤（img/imgMask/bg）（com/item_science_icon）。
 *
 * 原文：code1.js 字节 [3785655,3785921)（266B；包装变量 zT，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.item_science_iconUI",t) @3785753（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "ge/h_piece\")},i}(e_),zT="、后邻 ",jT=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/item_science_iconUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img / imgMask / bg。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class item_science_iconUI extends ComPayType {

    public img: any;
    public imgMask: any;
    public bg: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_science_icon");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_science_iconUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(item_science_iconUI, "ui.com.item_science_iconUI", null, null);
