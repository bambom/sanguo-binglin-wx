/**
 * ui.com.effect_equip_upgradeUI —— IDE 生成 UI 类：装备升级特效皮肤（bgImg/tTitle/tName/tType/mIcon/tInfo）（com/effect_equip_upgrade）。
 *
 * 原文：code1.js 字节 [3628027,3628398)（371B；包装变量 Dy，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引）；明文 3 参注册
 * o(i,"ui.com.effect_equip_upgradeUI",t) @3628177；全类零池化）。
 * 前邻 "ntNodeLine\")},i}(e_),Dy="、后邻 ",Ry=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/effect_equip_upgradeUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：bgImg / tTitle / tName / tType / mIcon / tInfo。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ad-report §2）：
 *   ui.com.hero_icon_equipUI ← ui.com.hero_icon_equipUI（未译；sg-externals-y.d.ts 已声明）（引用形式 ui.com.hero_icon_equipUI，缓译全局注册路径）
 * extends 债：原文基类 n_=sg.view.com.ComPayType（批次 AE ✓ 落地，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩（历史：曾暂 extends 真祖先 BaseSprite，见 batch-v/x-report §5）；已收敛——
 * 真基类 sg.view.com.ComPayType（批次 AE ✓）已落地，波次 2 整合已重指向（模块直引）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class effect_equip_upgradeUI extends ComPayType {

    public bgImg: any;
    public tTitle: any;
    public tName: any;
    public tType: any;
    public mIcon: any;
    public tInfo: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon_equipUI", ui.com.hero_icon_equipUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/effect_equip_upgrade");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.effect_equip_upgradeUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(effect_equip_upgradeUI, "ui.com.effect_equip_upgradeUI", null, null);
