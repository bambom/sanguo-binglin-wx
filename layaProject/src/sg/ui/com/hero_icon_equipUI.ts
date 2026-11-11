/**
 * ui.com.hero_icon_equipUI —— IDE 生成 UI 类：武将装备图标皮肤（imgType/img/equipType/bgColor/imgName/label/tStatus/tHero/imgAdd/glowBox/imgLink/imgGod/equipStar）（com/hero_icon_equip）。
 *
 * 原文：code1.js 字节 [3769288,3769775)（487B；包装变量 Jk，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon_equipUI",t) @3769569（return 序列首位，尾 i）；全类零池化）。
 * 前邻 "eFightInfo\")},i}(e_),Jk="、后邻 ",Zk=function(t){function" 逐字核对（export_oracle_ah.js 边界断言）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ah/hero_icon_equipUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：imgType / img / equipType / bgColor / imgName / label / tStatus / tHero / imgAdd / glowBox / imgLink / imgGod / equipStar。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ah-report §2）：
 *   ui.com.equip_starUI ← ui.com.equip_starUI（AG 在途区间 [3655271,3763970) 未落地；全局注册路径，sg-externals-ah.d.ts 声明）（引用形式 ui.com.equip_starUI）
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class hero_icon_equipUI extends ComPayType {

    public imgType: any;
    public img: any;
    public equipType: any;
    public bgColor: any;
    public imgName: any;
    public label: any;
    public tStatus: any;
    public tHero: any;
    public imgAdd: any;
    public glowBox: any;
    public imgLink: any;
    public imgGod: any;
    public equipStar: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.com.equip_starUI", ui.com.equip_starUI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon_equip");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon_equipUI",t)（return 序列首位；t=n_=sg.view.com.ComPayType（批次 AE ✓ 已落地真类，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon_equipUI, "ui.com.hero_icon_equipUI", null, null);
