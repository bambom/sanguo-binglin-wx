/**
 * ui.com.building_info_infoUI —— IDE 生成 UI 类：建筑信息说明行皮肤（iBg/tInfo/pBox/pImg/pName/pNum/imgArrows/pNumNext/aBox/aTips1/aTips2/aImg/aIcon/armyBox/armyLv/armyType/text0/t0/t1/t2/ta0/ta1/ta2）(com/building_info_info)。
 *
 * 原文：code1.js 字节 [3748262,3748882)（620B；包装变量 WC，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.building_info_infoUI",t) @3748676；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/building_info_infoUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：iBg / tInfo / pBox / pImg / pName / pNum / imgArrows / pNumNext / aBox / aTips1 / aTips2 / aImg / aIcon / armyBox / armyLv / armyType / text0 / t0 / t1 / t2 / ta0 / ta1 / ta2。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）。Bt=laya.ui.View（Ee 双跳
 * 声明器 @byte287162 池串解码 + string-pool + 批次 AD/Y 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-ag-report §2）：
 *   HTMLDivElement ← laya.html.dom.HTMLDivElement（引擎）（引用形式 laya.html.dom.HTMLDivElement，undefined）
 */
import View = laya.ui.View;
import { ComPayType } from "../../view/com/ComPayType";

export class building_info_infoUI extends ComPayType {

    public iBg: any;
    public tInfo: any;
    public pBox: any;
    public pImg: any;
    public pName: any;
    public pNum: any;
    public imgArrows: any;
    public pNumNext: any;
    public aBox: any;
    public aTips1: any;
    public aTips2: any;
    public aImg: any;
    public aIcon: any;
    public armyBox: any;
    public armyLv: any;
    public armyType: any;
    public text0: any;
    public t0: any;
    public t1: any;
    public t2: any;
    public ta0: any;
    public ta1: any;
    public ta2: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/building_info_info");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.building_info_infoUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(building_info_infoUI, "ui.com.building_info_infoUI", null, null);
