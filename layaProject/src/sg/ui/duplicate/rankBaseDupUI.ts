/**
 * ui.duplicate.rankBaseDupUI —— IDE 生成 UI 类：排行条目基皮肤（rankDup list itemRender 行）（duplicate/rankBaseDup）。
 *
 * 原文：code1.js 字节 [3503402,3503965)（563B；包装变量 qg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.rankBaseDupUI",t) @3503619；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/rankBaseDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：img_bg / icon_hero / comIndex / txt_name / icon_reward_1 / txt_score / icon_reward_0 / comCountry。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 *   ui.com.rank_inder_img_t_bigUI ← ui.com.rank_inder_img_t_bigUI（引用形式 ui.com.rank_inder_img_t_bigUI，缓译全局注册路径）
 *   ui.bag.bagItemUI ← ui.bag.bagItemUI（引用形式 ui.bag.bagItemUI，缓译全局注册路径）
 *   ui.com.country_flag1UI ← ui.com.country_flag1UI（引用形式 ui.com.country_flag1UI，缓译全局注册路径）
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class rankBaseDupUI extends ItemBase {

    public img_bg: any;
    public icon_hero: any;
    public comIndex: any;
    public txt_name: any;
    public icon_reward_1: any;
    public txt_score: any;
    public icon_reward_0: any;
    public comCountry: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), View.regComponent("ui.com.rank_inder_img_t_bigUI", ui.com.rank_inder_img_t_bigUI), View.regComponent("ui.bag.bagItemUI", ui.bag.bagItemUI), View.regComponent("ui.com.country_flag1UI", ui.com.country_flag1UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/rankBaseDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.rankBaseDupUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(rankBaseDupUI, "ui.duplicate.rankBaseDupUI", null, null);
