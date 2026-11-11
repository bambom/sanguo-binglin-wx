/**
 * ui.duplicate.signupUI —— IDE 生成 UI 类：报名面板皮肤（box_lv/comIcon/btn_signUp/box_change/list）（duplicate/signup）。
 *
 * 原文：code1.js 字节 [4072178,4072853)（675B；包装变量 gE，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (Z_)=sg.view.ViewScenes（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.signupUI",t) @4072562；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/signupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img_bg / box_lv / comIcon / txt_timeHint / txt_time / btn_signUp / btn_right / btn_left / box_info1 / txt_info1 / txt_info / tips_sign / tips_play / box_change / list / btn_change / btn_cancel。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   sg.duplicate.view.DuplicateIcon ← sg.duplicate.view.DuplicateIcon（引用形式 sg.duplicate.view.DuplicateIcon，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 *   sg.view.com.TipsIcon ← sg.view.com.TipsIcon（引用形式 sg.view.com.TipsIcon，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";

export class signupUI extends ViewScenes {

    public img_bg: any;
    public box_lv: any;
    public comIcon: any;
    public txt_timeHint: any;
    public txt_time: any;
    public btn_signUp: any;
    public btn_right: any;
    public btn_left: any;
    public box_info1: any;
    public txt_info1: any;
    public txt_info: any;
    public tips_sign: any;
    public tips_play: any;
    public box_change: any;
    public list: any;
    public btn_change: any;
    public btn_cancel: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("sg.duplicate.view.DuplicateIcon", sg.duplicate.view.DuplicateIcon), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), View.regComponent("sg.view.com.TipsIcon", sg.view.com.TipsIcon), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/signup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.signupUI",t)（t=Z_=sg.view.ViewScenes）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(signupUI, "ui.duplicate.signupUI", null, null);
