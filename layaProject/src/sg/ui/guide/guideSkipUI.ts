/**
 * ui.guide.guideSkipUI —— IDE 生成 UI 类：跳过引导确认面板皮肤（guide/guideSkip）。
 * ViewGuideSkip（批次 U）的皮肤基类。
 *
 * 原文：code1.js 字节 [4159426,4159901)（475B；包装变量 oD，`oD=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 W）。
 * 注册：o(i,"ui.guide.guideSkipUI",t)，o 实参字面量 @4159745；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量 @3456109 在 tm 包装 [3455667,3457537) 内）。
 * 前邻 `age")},i}(tm),`（guideImageUI 尾）、后邻 `,rD=function(t){function i(){this.box=n`
 * （ui.heritage.freeHeritageMainUI 头）逐字核对。下游 `}(oD),` @6165437 = 批次 U
 * ViewGuideSkip 的 IIFE 基类实参。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-w/guideSkipUI.js
 *
 * 批次 W 入批依据：批次 U 报告 §7 登记的 guide 视图链静态依赖（ViewGuideSkip
 * extends oD；F8 模块求值依赖本类先行落地）。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：box_back / btn_back / img_tips_new1 / img_tips_new2 / txt_tips_new /
 * txt_title_new / box_skip / btn_skip / img_tips_old1 / img_tips_old2 / txt_tips_old /
 * txt_title_old（原文声明序即此序，非字母序）。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U 范式）。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class guideSkipUI extends ViewPanel {

    public box_back: any;
    public btn_back: any;
    public img_tips_new1: any;
    public img_tips_new2: any;
    public txt_tips_new: any;
    public txt_title_new: any;
    public box_skip: any;
    public btn_skip: any;
    public img_tips_old1: any;
    public img_tips_old2: any;
    public txt_tips_old: any;
    public txt_title_old: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("guide/guideSkip");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.guide.guideSkipUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(guideSkipUI, "ui.guide.guideSkipUI", null, null);
