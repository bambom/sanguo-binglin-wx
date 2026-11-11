/**
 * ui.duplicate.leaderUI —— IDE 生成 UI 类：盟主面板皮肤（box1/box/list/btn 盟主竞选）（duplicate/leader）。
 *
 * 原文：code1.js 字节 [3495255,3495772)（517B；包装变量 Sg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.leaderUI",t) @3495536；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/leaderUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：box1 / box / txt_name / txt_power / txt_score / list / txt_tips / btn / box2 / icon_hero / txt_info1 / txt_info2 / btn_ok。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon2UI ← ui.com.hero_icon2UI（引用形式 ui.com.hero_icon2UI，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 * V 批 extends 债基类：src/sg/crossService/ui/LeaderTips.ts（V 批暂 extends ItemBase → 重指向本类）。
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class leaderUI extends ItemBase {

    public box1: any;
    public box: any;
    public txt_name: any;
    public txt_power: any;
    public txt_score: any;
    public list: any;
    public txt_tips: any;
    public btn: any;
    public box2: any;
    public icon_hero: any;
    public txt_info1: any;
    public txt_info2: any;
    public btn_ok: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon2UI", ui.com.hero_icon2UI), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/leader");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.leaderUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(leaderUI, "ui.duplicate.leaderUI", null, null);
