/**
 * ui.com.privacyUI —— IDE 生成 UI 类：隐私政策面板皮肤（comTitle/panel/html_content）（com/privacy）。
 *
 * 原文：code1.js 字节 [4513107,4513488)（381B；包装变量 jW，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (tm)=sg.view.ViewPanel（已译真类，批次 W/Y B 簇基座同款，模块直引）；明文 3 参注册
 * o(i,"ui.com.privacyUI",t) @4513218（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "/ViewPhone\")},i}(tm),jW="、后邻 ",YW=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/privacyUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：comTitle / panel / html_content。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ah-report §2）：
 *   ui.com.panel_bg_btnUI ← ui.com.panel_bg_btnUI（AG 在途区间未落地；全局注册路径，sg-externals-x.d.ts 已声明）（引用形式 ui.com.panel_bg_btnUI）
 *   ui.com.item_titleUI ← ui.com.item_titleUI（本批内已译，模块直引）（引用形式 item_titleUI）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引擎，libs/LayaAir.d.ts）（引用形式 laya.html.dom.HTMLDivElement）
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";
import { item_titleUI } from "./item_titleUI";

export class privacyUI extends ViewPanel {

    public comTitle: any;
    public panel: any;
    public html_content: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btnUI", ui.com.panel_bg_btnUI), View.regComponent("ui.com.item_titleUI", item_titleUI), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/privacy");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.privacyUI",t)（return 序列首位；t=tm=sg.view.ViewPanel（已译真类，批次 W/Y B 簇基座同款，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(privacyUI, "ui.com.privacyUI", null, null);
