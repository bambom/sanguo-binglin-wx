/**
 * ui.com.item_reward1UI —— IDE 生成 UI 类：奖励道具皮肤·1（无 ctor 字段；FORM B 逗号组元素）（com/item_reward1）。
 *
 * 原文：code1.js 字节 [3784310,3784512)（202B；无独立声明器——FORM B：本包装为逗号组
 * GT=(本包装,…后续同类包装…) 的元素[0]，inventory assignedVar=null 同证；注册+createChildren
 * 挂载为包装体语句序列（无 return 尾 i）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.item_reward1UI",t) @3784356；全类零池化）。
 * 前邻 "lityItem\")},i}(e_)),GT=("、后邻 ",function(t){function i(" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/item_reward1UI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class item_reward1UI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_reward1");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_reward1UI",t)（包装体语句序列首位（FORM B，无 return）；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(item_reward1UI, "ui.com.item_reward1UI", null, null);
