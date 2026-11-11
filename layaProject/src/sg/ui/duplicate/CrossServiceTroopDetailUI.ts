/**
 * ui.duplicate.CrossServiceTroopDetailUI —— IDE 生成 UI 类：跨服兵详情面板皮肤（army0/army1/tStatus/power_bar）（duplicate/CrossServiceTroopDetail）。
 *
 * 原文：code1.js 字节 [4044784,4045623)（839B；包装变量 jU，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (tm)=sg.view.ViewPanel（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.CrossServiceTroopDetailUI",t) @4045131；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/CrossServiceTroopDetailUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：mBox / energy_img / aniBox / army0 / army1 / tStatus / tName / cityName / heroIcon / itemTitle / energy_txt / detai_txt / btn_container / btn_0 / btn_1 / power_bar。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.panel_bg_btnUI ← ui.com.panel_bg_btnUI（引用形式 ui.com.panel_bg_btnUI，缓译全局注册路径）
 *   ui.map.troopEditArmyUI ← ui.map.troopEditArmyUI（引用形式 ui.map.troopEditArmyUI，缓译全局注册路径）
 *   ui.com.hero_icon2UI ← ui.com.hero_icon2UI（引用形式 ui.com.hero_icon2UI，缓译全局注册路径）
 *   ui.com.item_titleUI ← ui.com.item_titleUI（引用形式 ui.com.item_titleUI，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 *   ui.com.btn_icon_txt_txtUI ← ui.com.btn_icon_txt_txtUI（引用形式 ui.com.btn_icon_txt_txtUI，缓译全局注册路径）
 *   ui.com.hero_power2UI ← ui.com.hero_power2UI（引用形式 ui.com.hero_power2UI，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ViewPanel } from "../../view/ViewPanel";

export class CrossServiceTroopDetailUI extends ViewPanel {

    public mBox: any;
    public energy_img: any;
    public aniBox: any;
    public army0: any;
    public army1: any;
    public tStatus: any;
    public tName: any;
    public cityName: any;
    public heroIcon: any;
    public itemTitle: any;
    public energy_txt: any;
    public detai_txt: any;
    public btn_container: any;
    public btn_0: any;
    public btn_1: any;
    public power_bar: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.panel_bg_btnUI", ui.com.panel_bg_btnUI), View.regComponent("ui.map.troopEditArmyUI", ui.map.troopEditArmyUI), View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI), View.regComponent("ui.com.item_titleUI", ui.com.item_titleUI), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), View.regComponent("ui.com.btn_icon_txt_txtUI", ui.com.btn_icon_txt_txtUI), View.regComponent("ui.com.hero_power2UI", ui.com.hero_power2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/CrossServiceTroopDetail");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.CrossServiceTroopDetailUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopDetailUI, "ui.duplicate.CrossServiceTroopDetailUI", null, null);
