/**
 * ui.com.hero_icon4UI —— IDE 生成 UI 类：武将图标皮肤·4（bgbgbg）（com/hero_icon4）。
 *
 * 原文：code1.js 字节 [3765453,3765677)（224B；包装变量 Vk，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon4UI",t) @3765523（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "hero_icon3\")},i}(n_),Vk="、后邻 ",Wk=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/hero_icon4UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：bgbgbg。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class hero_icon4UI extends ComPayType {

    public bgbgbg: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon4");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon4UI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon4UI, "ui.com.hero_icon4UI", null, null);
