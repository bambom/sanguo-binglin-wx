/**
 * ui.com.t_img_t_tUI —— IDE 生成 UI 类：图/文字组合行皮肤（tTitle/tC/tA/tB）（com/t_img_t_t）。
 *
 * 原文：code1.js 字节 [3801002,3801263)（261B；包装变量 GM，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.t_img_t_tUI",t) @3801111（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "UnlockItem\")},i}(e_),GM="、后邻 ",VM=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/t_img_t_tUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：tTitle / tC / tA / tB。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class t_img_t_tUI extends ComPayType {

    public tTitle: any;
    public tC: any;
    public tA: any;
    public tB: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/t_img_t_t");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.t_img_t_tUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(t_img_t_tUI, "ui.com.t_img_t_tUI", null, null);
