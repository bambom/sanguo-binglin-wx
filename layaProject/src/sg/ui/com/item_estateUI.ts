/**
 * ui.com.item_estateUI —— IDE 生成 UI 类：产业道具皮肤（icon/num）（com/item_estate）。
 *
 * 原文：code1.js 字节 [3782182,3782459)（277B；包装变量 DT，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.item_estateUI",t) @3782264（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "ldShopItem\")},i}(e_),DT="、后邻 ",RT=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/item_estateUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：icon / num。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ah-report §2）：
 *   ui.bag.bagItemUI ← ui.bag.bagItemUI（未译；全局注册路径，sg-externals.d.ts 已声明）（引用形式 ui.bag.bagItemUI）
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class item_estateUI extends ComPayType {

    public icon: any;
    public num: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.bag.bagItemUI", ui.bag.bagItemUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/item_estate");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.item_estateUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(item_estateUI, "ui.com.item_estateUI", null, null);
