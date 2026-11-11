/**
 * ui.com.effect_building_func_openUI —— IDE 生成 UI 类：建筑功能开启特效皮肤（adImg/tTitle/bg/tName/tInfo）（com/effect_building_func_open）。
 *
 * 原文：code1.js 字节 [3622998,3623313)（315B；包装变量 xy，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引）；明文 3 参注册
 * o(i,"ui.com.effect_building_func_openUI",t) @3623129；全类零池化）。
 * 前邻 "eonsItem_H\")},i}(e_),xy="、后邻 ",wy=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/effect_building_func_openUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：adImg / tTitle / bg / tName / tInfo。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 * extends 债：原文基类 n_=sg.view.com.ComPayType（批次 AE ✓ 落地，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩（历史：曾暂 extends 真祖先 BaseSprite，见 batch-v/x-report §5）；已收敛——
 * 真基类 sg.view.com.ComPayType（批次 AE ✓）已落地，波次 2 整合已重指向（模块直引）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class effect_building_func_openUI extends ComPayType {

    public adImg: any;
    public tTitle: any;
    public bg: any;
    public tName: any;
    public tInfo: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/effect_building_func_open");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.effect_building_func_openUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(effect_building_func_openUI, "ui.com.effect_building_func_openUI", null, null);
