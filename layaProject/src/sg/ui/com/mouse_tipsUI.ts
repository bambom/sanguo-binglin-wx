/**
 * ui.com.mouse_tipsUI —— IDE 生成 UI 类：鼠标跟随提示皮肤（bgImg/label）（com/mouse_tips）。
 *
 * 原文：code1.js 字节 [3598705,3598944)（239B；包装变量 Mv，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.com.mouse_tipsUI",t) @3598790；全类零池化）。
 * 前邻 "send_panel\")},i}(e_),Mv="、后邻 ",Sv=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/mouse_tipsUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：bgImg / label。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class mouse_tipsUI extends ItemBase {

    public bgImg: any;
    public label: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/mouse_tips");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.mouse_tipsUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(mouse_tipsUI, "ui.com.mouse_tipsUI", null, null);
