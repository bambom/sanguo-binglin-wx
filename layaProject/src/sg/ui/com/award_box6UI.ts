/**
 * ui.com.award_box6UI —— IDE 生成 UI 类：奖励宝盒 6 皮肤（无 ctor 字段）(com/award_box6)。
 *
 * 原文：code1.js 字节 [3745303,3745510)（207B；包装变量 AC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.award_box6UI",t) @3745356；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/award_box6UI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class award_box6UI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/award_box6");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.award_box6UI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(award_box6UI, "ui.com.award_box6UI", null, null);
