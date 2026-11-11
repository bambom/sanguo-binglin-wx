/**
 * ui.duplicate.countDupUI —— IDE 生成 UI 类：战况统计面板皮肤（tab/box_list/list 盟主排行列表）（duplicate/countDup）。
 *
 * 原文：code1.js 字节 [4065620,4066127)（507B；包装变量 oE，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (Z_)=sg.view.ViewScenes（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.countDupUI",t) @4065915；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/countDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：box / tab / box_list / list / box_title / txt_title_name / txt_title_kill / txt_title_stronghold / txt_title_plough / txt_title_like / txt_title_unlike。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.duplicate.countBaseDupUI ← ui.duplicate.countBaseDupUI（本批）（引用形式 countBaseDupUI，已译 import）
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";
import { countBaseDupUI } from "./countBaseDupUI";

export class countDupUI extends ViewScenes {

    public box: any;
    public tab: any;
    public box_list: any;
    public list: any;
    public box_title: any;
    public txt_title_name: any;
    public txt_title_kill: any;
    public txt_title_stronghold: any;
    public txt_title_plough: any;
    public txt_title_like: any;
    public txt_title_unlike: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.duplicate.countBaseDupUI", countBaseDupUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/countDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.countDupUI",t)（t=Z_=sg.view.ViewScenes）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(countDupUI, "ui.duplicate.countDupUI", null, null);
