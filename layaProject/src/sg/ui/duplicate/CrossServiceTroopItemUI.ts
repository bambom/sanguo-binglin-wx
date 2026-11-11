/**
 * ui.duplicate.CrossServiceTroopItemUI —— IDE 生成 UI 类：跨服战兵队条皮肤（states 状态机各 icon/bar/label 子件）（duplicate/CrossServiceTroopItem）。
 *
 * 原文：code1.js 字节 [3493254,3493851)（597B；包装变量 Cg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.CrossServiceTroopItemUI",t) @3493594；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/CrossServiceTroopItemUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：heroNull / heroIcon / pFight / move_bar / fight_bar / home_icon / move_icon / fight_cion / sMoveQuick / label_txt / energy_txt / jichong_container / rush_icon / txtOfficial。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 *   Text ← laya.display.Text（引用形式 laya.display.Text，引擎全局链）
 * V 批 extends 债基类：src/sg/crossService/ui/CrossServiceTroopItem.ts（V 批暂 extends ItemBase → 重指向本类）。
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";

export class CrossServiceTroopItemUI extends ItemBase {

    public heroNull: any;
    public heroIcon: any;
    public pFight: any;
    public move_bar: any;
    public fight_bar: any;
    public home_icon: any;
    public move_icon: any;
    public fight_cion: any;
    public sMoveQuick: any;
    public label_txt: any;
    public energy_txt: any;
    public jichong_container: any;
    public rush_icon: any;
    public txtOfficial: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), View.regComponent("Text", laya.display.Text), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/CrossServiceTroopItem");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.CrossServiceTroopItemUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopItemUI, "ui.duplicate.CrossServiceTroopItemUI", null, null);
