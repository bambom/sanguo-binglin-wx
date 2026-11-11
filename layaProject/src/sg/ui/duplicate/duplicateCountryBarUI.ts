/**
 * ui.duplicate.duplicateCountryBarUI —— IDE 生成 UI 类：顶栏国家对比皮肤（country0/country1/buff0/buff1/btn_1/btn_2）（duplicate/duplicateCountryBar）。
 *
 * 原文：code1.js 字节 [3501071,3501658)（587B；包装变量 Vg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.duplicateCountryBarUI",t) @3501374；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/duplicateCountryBarUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：box / imgBg / imgBg0 / imgBg1 / boxBar / country0 / country1 / imgLevel / tNum0 / tNum1 / tInfo / buff0 / buff1 / btn_1 / btn_2。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.country_flag2UI ← ui.com.country_flag2UI（引用形式 ui.com.country_flag2UI，缓译全局注册路径）
 *   ui.duplicate.duplicateBuffItemUI ← ui.duplicate.duplicateBuffItemUI（本批）（引用形式 duplicateBuffItemUI，已译 import）
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";
import { duplicateBuffItemUI } from "./duplicateBuffItemUI";

export class duplicateCountryBarUI extends ItemBase {

    public box: any;
    public imgBg: any;
    public imgBg0: any;
    public imgBg1: any;
    public boxBar: any;
    public country0: any;
    public country1: any;
    public imgLevel: any;
    public tNum0: any;
    public tNum1: any;
    public tInfo: any;
    public buff0: any;
    public buff1: any;
    public btn_1: any;
    public btn_2: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.country_flag2UI", ui.com.country_flag2UI), View.regComponent("ui.duplicate.duplicateBuffItemUI", duplicateBuffItemUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/duplicateCountryBar");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.duplicateCountryBarUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(duplicateCountryBarUI, "ui.duplicate.duplicateCountryBarUI", null, null);
