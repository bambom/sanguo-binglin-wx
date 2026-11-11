/**
 * ui.duplicate.reportBaseDupUI —— IDE 生成 UI 类：战报条目基皮肤（双方 name/icon/flag/img_result/btn_watch）（duplicate/reportBaseDup）。
 *
 * 原文：code1.js 字节 [3503973,3504500)（527B；包装变量 Xg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.reportBaseDupUI",t) @3504241；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/reportBaseDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：txt_place / txt_time / txt_name_0 / icon_0 / flag_0 / img_result_0 / txt_name_1 / icon_1 / flag_1 / img_result_1 / btn_watch。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 *   ui.com.country_flag2UI ← ui.com.country_flag2UI（引用形式 ui.com.country_flag2UI，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class reportBaseDupUI extends ItemBase {

    public txt_place: any;
    public txt_time: any;
    public txt_name_0: any;
    public icon_0: any;
    public flag_0: any;
    public img_result_0: any;
    public txt_name_1: any;
    public icon_1: any;
    public flag_1: any;
    public img_result_1: any;
    public btn_watch: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), View.regComponent("ui.com.country_flag2UI", ui.com.country_flag2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/reportBaseDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.reportBaseDupUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(reportBaseDupUI, "ui.duplicate.reportBaseDupUI", null, null);
