/**
 * ui.com.effect_building_upgradeUI —— IDE 生成 UI 类：建筑升级特效皮肤（tName/tBase/adImg/baseBox/iBase/tBaseLv/tBaseTips1/bBox/bBoxInfo）（com/effect_building_upgrade）。
 *
 * 原文：code1.js 字节 [3623321,3623807)（486B；包装变量 wy，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引）；明文 3 参注册
 * o(i,"ui.com.effect_building_upgradeUI",t) @3623529；全类零池化）。
 * 前邻 "_func_open\")},i}(n_),wy="、后邻 ",Cy=function(t){function" 逐字核对（export_oracle_ad.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ad/effect_building_upgradeUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：tName / tBase / adImg / baseBox / iBase / tBaseLv / tBaseTips1 / bBox / bBoxInfo。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ad-report §2）：
 *   ui.com.building_info_lvUI ← ui.com.building_info_lvUI（未译缓译）（引用形式 ui.com.building_info_lvUI，缓译全局注册路径）
 *   ui.com.building_info_infoUI ← ui.com.building_info_infoUI（未译缓译）（引用形式 ui.com.building_info_infoUI，缓译全局注册路径）
 * extends 债：原文基类 n_=sg.view.com.ComPayType（批次 AE ✓ 落地，inventory/声明器注册双证）——F8 急切求值
 * extends undefined 会崩（历史：曾暂 extends 真祖先 BaseSprite，见 batch-v/x-report §5）；已收敛——
 * 真基类 sg.view.com.ComPayType（批次 AE ✓）已落地，波次 2 整合已重指向（模块直引）
 * 并按批次协议复验 —— 见 batch-ad-report §5。本类无 superGet/superSet/基类原型取用。
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class effect_building_upgradeUI extends ComPayType {

    public tName: any;
    public tBase: any;
    public adImg: any;
    public baseBox: any;
    public iBase: any;
    public tBaseLv: any;
    public tBaseTips1: any;
    public bBox: any;
    public bBoxInfo: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.building_info_lvUI", ui.com.building_info_lvUI), View.regComponent("ui.com.building_info_infoUI", ui.com.building_info_infoUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/effect_building_upgrade");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.effect_building_upgradeUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓）；波次 2 整合已重指向真基类（模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(effect_building_upgradeUI, "ui.com.effect_building_upgradeUI", null, null);
