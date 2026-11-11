/**
 * ui.com.city_func_iconUI —— IDE 生成 UI 类：城市功能图标皮肤（func1/func2/func/tFunc）(com/city_func_icon)。
 *
 * 原文：code1.js 字节 [3754322,3754600)（278B；包装变量 rk，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.city_func_iconUI",t) @3754438；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/city_func_iconUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：func1 / func2 / func / tFunc。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class city_func_iconUI extends ComPayType {

    public func1: any;
    public func2: any;
    public func: any;
    public tFunc: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/city_func_icon");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.city_func_iconUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(city_func_iconUI, "ui.com.city_func_iconUI", null, null);
