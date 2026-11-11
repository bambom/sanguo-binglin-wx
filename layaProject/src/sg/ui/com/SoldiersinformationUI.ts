/**
 * ui.com.SoldiersinformationUI —— IDE 生成 UI 类：武将兵力信息面板皮肤（imgBox/tName/heroArmyAtk/heroArmyDef/heroArmySpd/heroArmyHpm/mShard/imgPiece/imgSpArmy/icon）(com/Soldiersinformation)。
 *
 * 原文：code1.js 字节 [3750746,3751244)（498B；包装变量 QC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译，模块直引）；明文 3 参注册
 * o(i,"ui.com.SoldiersinformationUI",t) @3750991；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/SoldiersinformationUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：imgBox / tName / heroArmyAtk / heroArmyDef / heroArmySpd / heroArmyHpm / mShard / imgPiece / imgSpArmy / icon。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   ui.com.t_img_tUI ← ui.com.t_img_tUI（未译，批次 AH 在途（off 3800580；注意与 t_img_t_tUI/GM@3801111 为不同类））（引用形式 ui.com.t_img_tUI，缓译全局注册路径（shell 声明见 sg-externals-ag.d.ts））
 *   ui.com.army_icon2UI ← ui.com.army_icon2UI（本批已译（批次 AG 内））（引用形式 army_icon2UI，批内模块直引（批次 S/Y 族内直引先例））
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";
import { army_icon2UI } from "./army_icon2UI";

export class SoldiersinformationUI extends ItemBase {

    public imgBox: any;
    public tName: any;
    public heroArmyAtk: any;
    public heroArmyDef: any;
    public heroArmySpd: any;
    public heroArmyHpm: any;
    public mShard: any;
    public imgPiece: any;
    public imgSpArmy: any;
    public icon: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.t_img_tUI", ui.com.t_img_tUI), View.regComponent("ui.com.army_icon2UI", army_icon2UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/Soldiersinformation");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.SoldiersinformationUI",t)（t=e_=sg.view.com.ItemBase（批次 A 已译，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(SoldiersinformationUI, "ui.com.SoldiersinformationUI", null, null);
