/**
 * ui.com.hero_icon1_lvUI —— IDE 生成 UI 类：武将图标等级皮肤·1（tLv）（com/hero_icon1_lv）。
 *
 * 原文：code1.js 字节 [3764339,3764606)（267B；包装变量 Fk，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon1_lvUI",t) @3764406（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "l/askItem1\")},i}(e_),Fk="、后邻 ",Hk=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/hero_icon1_lvUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：tLv。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ah-report §2）：
 *   ui.com.hero_lv2UI ← ui.com.hero_lv2UI（本批内已译，模块直引）（引用形式 hero_lv2UI）
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";
import { hero_lv2UI } from "./hero_lv2UI";

export class hero_icon1_lvUI extends ComPayType {

    public tLv: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_lv2UI", hero_lv2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon1_lv");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon1_lvUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon1_lvUI, "ui.com.hero_icon1_lvUI", null, null);
