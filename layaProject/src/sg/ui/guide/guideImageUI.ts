/**
 * ui.guide.guideImageUI —— IDE 生成 UI 类：图文引导面板皮肤（guide/guideImage）。
 * ViewBigmage / ViewGuideImage（批次 U）的皮肤基类。
 *
 * 原文：code1.js 字节 [4159163,4159418)（255B；包装变量 hD，`hD=function(t){…}(tm)`，
 * 声明器 init 单一 1 参 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-11 批次 W）。
 * 注册：o(i,"ui.guide.guideImageUI",t)，o 实参字面量 @4159260；基类实参 tm=sg.view.ViewPanel
 * （tm= 声明器 @3455664，唯一 "sg.view.ViewPanel" 字面量 @3456109 在 tm 包装 [3455667,3457537) 内）。
 * 前邻 `nfo")},i}(tm),`（ui.god.godInfoUI 尾）、后邻 `,oD=function(t){function i(){this.box_b`
 * 逐字核对。下游 `}(hD),` @6163424/6164292 = 批次 U ViewBigmage/ViewGuideImage 的 IIFE 基类实参。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-w/guideImageUI.js
 *
 * 批次 W 入批依据：批次 U 报告 §7 登记的 guide 视图链静态依赖（ViewBigmage/
 * ViewGuideImage extends hD；F8 模块求值依赖本类先行落地）。
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体
 * 逐一对应：box / img / words。
 * createChildren 保持原文单条逗号序列语句形态（原文本体即一条 SequenceExpression，
 * 求值顺序一致；批次 U 范式）。
 */
import { ViewPanel } from "../../view/ViewPanel";

export class guideImageUI extends ViewPanel {

    public box: any;
    public img: any;
    public words: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("guide/guideImage");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.guide.guideImageUI",t)（t=tm=sg.view.ViewPanel）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(guideImageUI, "ui.guide.guideImageUI", null, null);
