/**
 * ui.com.effect_building_upgrade2UI —— IDE 生成 UI 类：建筑升级特效皮肤·变体2（adImg/tName/bBox/tTips/armyBox/tHtml）（com/effect_building_upgrade2）。
 *
 * 原文：code1.js 字节 [3624999,3625415)（416B；包装变量 My，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite；明文 3 参注册
 * o(i,"ui.com.effect_building_upgrade2UI",t) @3625149；全类零池化）。
 * 前邻 "HeroItem_H\")},i}(e_),My="、后邻 ",Sy=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/effect_building_upgrade2UI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：adImg / tName / bBox / tTips / armyBox / tHtml。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ad-report §2）：
 *   ui.com.building_info_lvUI ← ui.com.building_info_lvUI（未译缓译）（引用形式 ui.com.building_info_lvUI，缓译全局注册路径）
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引擎）（引用形式 laya.html.dom.HTMLDivElement，引擎全局链）
 * extends 债：原文基类 n_=sg.view.com.ComPayType（未译，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩，按 V/X 批文档化先例（batch-v-report §5、batch-x-report §5）暂 extends
 * 其已译真祖先 sg.view.BaseSprite（Ju，批次 A）；ComPayType 落地后本文件 extends 重指向（1 行）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import View = laya.ui.View;
import { BaseSprite } from "../../view/BaseSprite";

export class effect_building_upgrade2UI extends BaseSprite {

    public adImg: any;
    public tName: any;
    public bBox: any;
    public tTips: any;
    public armyBox: any;
    public tHtml: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.building_info_lvUI", ui.com.building_info_lvUI), View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/effect_building_upgrade2");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.effect_building_upgrade2UI",t)（t=n_=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(effect_building_upgrade2UI, "ui.com.effect_building_upgrade2UI", null, null);
