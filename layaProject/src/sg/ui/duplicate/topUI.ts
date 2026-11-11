/**
 * ui.duplicate.topUI —— IDE 生成 UI 类：面板顶栏说明皮肤（info_txt/tile_1..3/country_flag/bg_1..4）（duplicate/top）。
 *
 * 原文：code1.js 字节 [4030675,4031261)（586B；包装变量 WU，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (Z_)=sg.view.ViewScenes（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.topUI",t) @4031028；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/topUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：info_txt / tile_1_txt / tile_2_txt / tile_3_txt / country_flag / bg_1 / content_1_txt / bg_2 / content_2_txt / bg_3 / content_3_txt / bg_4 / content_4_txt / tile_txt / title_img。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 *   ui.com.country_flag2UI ← ui.com.country_flag2UI（引用形式 ui.com.country_flag2UI，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";

export class topUI extends ViewScenes {

    public info_txt: any;
    public tile_1_txt: any;
    public tile_2_txt: any;
    public tile_3_txt: any;
    public country_flag: any;
    public bg_1: any;
    public content_1_txt: any;
    public bg_2: any;
    public content_2_txt: any;
    public bg_3: any;
    public content_3_txt: any;
    public bg_4: any;
    public content_4_txt: any;
    public tile_txt: any;
    public title_img: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), View.regComponent("ui.com.country_flag2UI", ui.com.country_flag2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/top");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.topUI",t)（t=Z_=sg.view.ViewScenes）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(topUI, "ui.duplicate.topUI", null, null);
