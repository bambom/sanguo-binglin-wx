/**
 * ui.com.hero_icon0_mUI —— IDE 生成 UI 类：英雄头像 0（m 变体）皮肤（无 ctor 字段）(com/hero_icon0_m)。
 *
 * 原文：code1.js 字节 [3763196,3763398)（202B；本类为括号序列声明器 Pk=(IIFE1,IIFE2) 的第 1 元素（inventory assignedVar=null 实证，非单 init 函数表达式形态）；注册不在 return 位（表达式语句 o(...),i.prototype.createChildren=...，序列无尾 i），运行期行为等价（注册+原型赋值均发生在模块求值期）；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon0_mUI",t) @3763242；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/hero_icon0_mUI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class hero_icon0_mUI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon0_m");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon0_mUI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon0_mUI, "ui.com.hero_icon0_mUI", null, null);
