/**
 * ui.com.hero_icon_fight_fateUI —— IDE 生成 UI 类：武将宿命战图标皮肤（无 ctor 字段）（com/hero_icon_fight_fate）。
 *
 * 原文：code1.js 字节 [3543353,3543580)（227B；包装变量 Vf，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon_fight_fateUI",t) @3543406；全类零池化）。
 * 前邻 "e/fightTop\")},i}(e_),Vf="、后邻 ",Wf=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/hero_icon_fight_fateUI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 * extends 债：原文基类 n_=sg.view.com.ComPayType（批次 AE ✓ 落地，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩（历史：曾暂 extends 真祖先 BaseSprite，见 batch-v/x-report §5）；已收敛——
 * 真基类 sg.view.com.ComPayType（批次 AE ✓）已落地，波次 2 整合已重指向（模块直引）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class hero_icon_fight_fateUI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon_fight_fate");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon_fight_fateUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon_fight_fateUI, "ui.com.hero_icon_fight_fateUI", null, null);
