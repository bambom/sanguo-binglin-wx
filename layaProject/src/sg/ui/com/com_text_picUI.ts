/**
 * ui.com.com_text_picUI —— IDE 生成 UI 类：文字+图片组合皮肤（无 ctor 字段）(com/com_text_pic)。
 *
 * 原文：code1.js 字节 [3757270,3757517)（247B；包装变量 fk，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.com_text_picUI",t) @3757323；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/com_text_picUI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引擎）（引用形式 laya.html.dom.HTMLDivElement，undefined）
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class com_text_picUI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/com_text_pic");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.com_text_picUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(com_text_picUI, "ui.com.com_text_picUI", null, null);
