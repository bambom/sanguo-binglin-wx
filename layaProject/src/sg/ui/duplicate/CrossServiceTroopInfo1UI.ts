/**
 * ui.duplicate.CrossServiceTroopInfo1UI —— IDE 生成 UI 类：跨服兵信息皮肤（time_pro/countDown_txt/icon）（duplicate/CrossServiceTroopInfo1）。
 *
 * 原文：code1.js 字节 [3761214,3761574)（360B；包装变量 Sk，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.CrossServiceTroopInfo1UI",t) @3761342；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/CrossServiceTroopInfo1UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：bg_img / time_pro / countDown_txt / icon。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class CrossServiceTroopInfo1UI extends ItemBase {

    public bg_img: any;
    public time_pro: any;
    public countDown_txt: any;
    public icon: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/CrossServiceTroopInfo1");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.CrossServiceTroopInfo1UI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopInfo1UI, "ui.duplicate.CrossServiceTroopInfo1UI", null, null);
