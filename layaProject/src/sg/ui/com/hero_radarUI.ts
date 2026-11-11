/**
 * ui.com.hero_radarUI —— IDE 生成 UI 类：英雄雷达图皮肤（imgBg/boxImg/img0/img1/img2/img3/img4/boxIcon/icon0/icon1/icon2/icon3/icon4/tCenter）(com/hero_radar)。
 *
 * 原文：code1.js 字节 [3654994,3655472)（478B；包装变量 Rb，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_radarUI",t) @3655271；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/hero_radarUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：imgBg / boxImg / img0 / img1 / img2 / img3 / img4 / boxIcon / icon0 / icon1 / icon2 / icon3 / icon4 / tCenter。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   ui.com.hero_radar_iconUI ← ui.com.hero_radar_iconUI（未译，批次 AH 在途（off 3779434 ∈ [3764406,4513488)））（引用形式 ui.com.hero_radar_iconUI，缓译全局注册路径（shell 声明见 sg-externals-ag.d.ts））
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class hero_radarUI extends ComPayType {

    public imgBg: any;
    public boxImg: any;
    public img0: any;
    public img1: any;
    public img2: any;
    public img3: any;
    public img4: any;
    public boxIcon: any;
    public icon0: any;
    public icon1: any;
    public icon2: any;
    public icon3: any;
    public icon4: any;
    public tCenter: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_radar_iconUI", ui.com.hero_radar_iconUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_radar");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_radarUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_radarUI, "ui.com.hero_radarUI", null, null);
