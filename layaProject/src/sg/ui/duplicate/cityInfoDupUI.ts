/**
 * ui.duplicate.cityInfoDupUI —— IDE 生成 UI 类：城市信息面板皮肤（allBox/comTitle/list/btn_chat）（duplicate/cityInfoDup）。
 *
 * 原文：code1.js 字节 [4066759,4067225)（466B；包装变量 aE，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (tm)=sg.view.ViewPanel（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.cityInfoDupUI",t) @4066933；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/cityInfoDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：allBox / comTitle / txt_num / img / list / txt_info / btn_chat。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.panel_bg_btn_sUI ← ui.com.panel_bg_btn_sUI（引用形式 ui.com.panel_bg_btn_sUI，缓译全局注册路径）
 *   ui.com.item_titleUI ← ui.com.item_titleUI（引用形式 ui.com.item_titleUI，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class cityInfoDupUI extends ViewPanel {

    public allBox: any;
    public comTitle: any;
    public txt_num: any;
    public img: any;
    public list: any;
    public txt_info: any;
    public btn_chat: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btn_sUI", ui.com.panel_bg_btn_sUI), View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/cityInfoDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.cityInfoDupUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(cityInfoDupUI, "ui.duplicate.cityInfoDupUI", null, null);
