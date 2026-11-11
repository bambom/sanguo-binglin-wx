/**
 * ui.com.city_send_panelUI —— IDE 生成 UI 类：城市派遣列表面板皮肤（list/tGoto）（com/city_send_panel）。
 *
 * 原文：code1.js 字节 [3595199,3595483)（284B；包装变量 Cv，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.com.city_send_panelUI",t) @3595283；全类零池化）。
 * 前邻 "t/chatFace\")},i}(e_),Cv="、后邻 ",kv=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/city_send_panelUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：list / tGoto。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ad-report §2）：
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引擎）（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class city_send_panelUI extends ItemBase {

    public list: any;
    public tGoto: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/city_send_panel");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.city_send_panelUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(city_send_panelUI, "ui.com.city_send_panelUI", null, null);
