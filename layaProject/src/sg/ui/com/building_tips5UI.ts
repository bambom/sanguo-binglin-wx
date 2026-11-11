/**
 * ui.com.building_tips5UI —— IDE 生成 UI 类：建筑气泡 5 皮肤（icon/effect_sp/flag_container/flag_img/flag_txt）(com/building_tips5)。
 *
 * 原文：code1.js 字节 [3752033,3752388)（355B；包装变量 tk，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.building_tips5UI",t) @3752184；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/building_tips5UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：icon / effect_sp / flag_container / flag_img / flag_txt。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   ui.com.hero_icon6UI ← ui.com.hero_icon6UI（未译，批次 AH 在途（off 3766642））（引用形式 ui.com.hero_icon6UI，缓译全局注册路径（shell 声明见 sg-externals-ag.d.ts））
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class building_tips5UI extends ComPayType {

    public icon: any;
    public effect_sp: any;
    public flag_container: any;
    public flag_img: any;
    public flag_txt: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon6UI", ui.com.hero_icon6UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/building_tips5");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.building_tips5UI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(building_tips5UI, "ui.com.building_tips5UI", null, null);
