/**
 * ui.com.effect_credit_resultUI —— IDE 生成 UI 类：功勋结算特效皮肤（img1/pro/img0/num0/num1/textLabel）（com/effect_credit_result）。
 *
 * 原文：code1.js 字节 [3626175,3626496)（321B；包装变量 Ay，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite；明文 3 参注册
 * o(i,"ui.com.effect_credit_resultUI",t) @3626322；全类零池化）。
 * 前邻 "ctLineNode\")},i}(e_),Ay="、后邻 ",Ly=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/effect_credit_resultUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img1 / pro / img0 / num0 / num1 / textLabel。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 * extends 债：原文基类 n_=sg.view.com.ComPayType（未译，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩，按 V/X 批文档化先例（batch-v-report §5、batch-x-report §5）暂 extends
 * 其已译真祖先 sg.view.BaseSprite（Ju，批次 A）；ComPayType 落地后本文件 extends 重指向（1 行）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import { BaseSprite } from "../../view/BaseSprite";

export class effect_credit_resultUI extends BaseSprite {

    public img1: any;
    public pro: any;
    public img0: any;
    public num0: any;
    public num1: any;
    public textLabel: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/effect_credit_result");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.effect_credit_resultUI",t)（t=n_=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(effect_credit_resultUI, "ui.com.effect_credit_resultUI", null, null);
