/**
 * ui.duplicate.settleAccountsUI —— IDE 生成 UI 类：结算面板皮肤（box_left/box_right 双方点赞/战功/btn_settle）（duplicate/settleAccounts）。
 *
 * 原文：code1.js 字节 [4069937,4071161)（1224B；包装变量 dE，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (Z_)=sg.view.ViewScenes（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.settleAccountsUI",t) @4070598；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/settleAccountsUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img_bg / box_left / txt_title0 / icon_head0 / flag_0 / txt_name0 / btn_like0 / txt_like0 / txt_info0 / box_right / txt_title1 / icon_head1 / flag_1 / txt_name1 / btn_like1 / txt_like1 / txt_info1 / txt_title / txt_gongxian / flag / txt_pingju / comIcon / txt_info / btn_shop / box_btns / btn_settle / btn_settle2 / txt_tips / btn_help / bottomBar / btn_back。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 *   ui.com.country_flag2UI ← ui.com.country_flag2UI（引用形式 ui.com.country_flag2UI，缓译全局注册路径）
 *   ui.com.country_flag3UI ← ui.com.country_flag3UI（引用形式 ui.com.country_flag3UI，缓译全局注册路径）
 *   sg.duplicate.view.DuplicateIcon ← sg.duplicate.view.DuplicateIcon（引用形式 sg.duplicate.view.DuplicateIcon，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 *   ui.com.btn_icon_txt_txtUI ← ui.com.btn_icon_txt_txtUI（引用形式 ui.com.btn_icon_txt_txtUI，缓译全局注册路径）
 *   sg.duplicate.view.DuplicateBottomBar ← sg.duplicate.view.DuplicateBottomBar（引用形式 sg.duplicate.view.DuplicateBottomBar，缓译全局注册路径）
 *   sg.duplicate.view.DuplicateBottomIcon ← sg.duplicate.view.DuplicateBottomIcon（引用形式 sg.duplicate.view.DuplicateBottomIcon，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";

export class settleAccountsUI extends ViewScenes {

    public img_bg: any;
    public box_left: any;
    public txt_title0: any;
    public icon_head0: any;
    public flag_0: any;
    public txt_name0: any;
    public btn_like0: any;
    public txt_like0: any;
    public txt_info0: any;
    public box_right: any;
    public txt_title1: any;
    public icon_head1: any;
    public flag_1: any;
    public txt_name1: any;
    public btn_like1: any;
    public txt_like1: any;
    public txt_info1: any;
    public txt_title: any;
    public txt_gongxian: any;
    public flag: any;
    public txt_pingju: any;
    public comIcon: any;
    public txt_info: any;
    public btn_shop: any;
    public box_btns: any;
    public btn_settle: any;
    public btn_settle2: any;
    public txt_tips: any;
    public btn_help: any;
    public bottomBar: any;
    public btn_back: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), View.regComponent("ui.com.country_flag2UI", ui.com.country_flag2UI), View.regComponent("ui.com.country_flag3UI", ui.com.country_flag3UI), View.regComponent("sg.duplicate.view.DuplicateIcon", sg.duplicate.view.DuplicateIcon), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), View.regComponent("ui.com.btn_icon_txt_txtUI", ui.com.btn_icon_txt_txtUI), View.regComponent("sg.duplicate.view.DuplicateBottomBar", sg.duplicate.view.DuplicateBottomBar), View.regComponent("sg.duplicate.view.DuplicateBottomIcon", sg.duplicate.view.DuplicateBottomIcon), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/settleAccounts");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.settleAccountsUI",t)（t=Z_=sg.view.ViewScenes）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(settleAccountsUI, "ui.duplicate.settleAccountsUI", null, null);
