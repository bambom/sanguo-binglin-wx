/**
 * ui.com.tipsIconUI —— IDE 生成 UI 类：提示图标皮肤（label/img）（com/tipsIcon）。
 *
 * 原文：code1.js 字节 [3599458,3599691)（233B；包装变量 Av，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.com.tipsIconUI",t) @3599541；全类零池化）。
 * 前邻 "om/mc_star\")},i}(e_),Av="、后邻 ",Lv=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/tipsIconUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：label / img。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class tipsIconUI extends ItemBase {

    public label: any;
    public img: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/tipsIcon");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.tipsIconUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(tipsIconUI, "ui.com.tipsIconUI", null, null);
