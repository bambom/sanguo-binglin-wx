/**
 * ui.com.hero_icon7UI —— IDE 生成 UI 类：英雄头像 7 皮肤（heroIcon/imgAdd）(com/hero_icon7)。
 *
 * 原文：code1.js 字节 [3742584,3742869)（285B；包装变量 vC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon7UI",t) @3742673；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/hero_icon7UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：heroIcon / imgAdd。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（本批已译（批次 AG 内））（引用形式 hero_icon1UI，批内模块直引（批次 S/Y 族内直引先例））
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";
import { hero_icon1UI } from "./hero_icon1UI";

export class hero_icon7UI extends ItemBase {

    public heroIcon: any;
    public imgAdd: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", hero_icon1UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon7");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon7UI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon7UI, "ui.com.hero_icon7UI", null, null);
