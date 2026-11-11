/**
 * ui.com.payTypeS3UI —— IDE 生成 UI 类：小档充值项皮肤·3（无 ctor 字段）（com/payTypeS3）。
 *
 * 原文：code1.js 字节 [3794354,3794559)（205B；包装变量 fM，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.payTypeS3UI",t) @3794407（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "mationItem\")},i}(e_),fM="、后邻 ",pM=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/payTypeS3UI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class payTypeS3UI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/payTypeS3");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.payTypeS3UI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(payTypeS3UI, "ui.com.payTypeS3UI", null, null);
