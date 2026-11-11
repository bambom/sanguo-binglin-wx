/**
 * ui.com.building_tips11UI —— IDE 生成 UI 类：建筑气泡 11 皮肤（无 ctor 字段）(com/building_tips11)。
 *
 * 原文：code1.js 字节 [3750200,3750459)（259B；包装变量 XC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.building_tips11UI",t) @3750253；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/building_tips11UI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   ui.com.hero_icon2UI ← ui.com.hero_icon2UI（未译，批次 AH 在途（off 3764715））（引用形式 ui.com.hero_icon2UI，缓译全局注册路径（sg-externals-b.d.ts 已声明，不重复））
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class building_tips11UI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/building_tips11");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.building_tips11UI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(building_tips11UI, "ui.com.building_tips11UI", null, null);
