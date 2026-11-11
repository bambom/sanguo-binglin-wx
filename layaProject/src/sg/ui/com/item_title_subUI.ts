/**
 * ui.com.item_title_subUI —— IDE 生成 UI 类：子标题条皮肤（无 ctor 字段）（com/item_title_sub）。
 *
 * 原文：code1.js 字节 [3789883,3790098)（215B；包装变量 sM，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.item_title_subUI",t) @3789936（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "m_title_s2\")},i}(n_),sM="、后邻 ",nM=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/item_title_subUI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class item_title_subUI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_title_sub");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_title_subUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(item_title_subUI, "ui.com.item_title_subUI", null, null);
