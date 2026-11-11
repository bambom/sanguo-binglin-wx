/**
 * ui.com.panel_bg_btn_sUI —— IDE 生成 UI 类：面板背景按钮（小）皮肤（无 ctor 字段）(com/panel_bg_btn_s)。
 *
 * 原文：code1.js 字节 [3746842,3747057)（215B；包装变量 RC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译，模块直引）；明文 3 参注册
 * o(i,"ui.com.panel_bg_btn_sUI",t) @3746895；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/panel_bg_btn_sUI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class panel_bg_btn_sUI extends ItemBase {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/panel_bg_btn_s");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.panel_bg_btn_sUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(panel_bg_btn_sUI, "ui.com.panel_bg_btn_sUI", null, null);
