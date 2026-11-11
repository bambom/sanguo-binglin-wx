/**
 * ui.com.hero_icon0UI —— IDE 生成 UI 类：英雄头像 0 皮肤（无 ctor 字段）(com/hero_icon0)。
 *
 * 原文：code1.js 字节 [3762601,3762808)（207B；包装变量 Uk，声明器单一 init 1 参 CallExpression（非 Ee 双跳）；注册位于 return 序列首位；
 * 基类实参 (n_)=sg.view.com.ComPayType（批次 AE ✓，模块直引）；明文 3 参注册
 * o(i,"ui.com.hero_icon0UI",t) @3762654；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ag/hero_icon0UI.js
 *
 * 字段不带初始化器：本类原文构造体无 null 预置（空前置，仅 i.__super.call(this)），类体零字段。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 */
import { ComPayType } from "../../view/com/ComPayType";

export class hero_icon0UI extends ComPayType {

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("com/hero_icon0");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.com.hero_icon0UI",t)（t=n_=sg.view.com.ComPayType（批次 AE ✓，模块直引））。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(hero_icon0UI, "ui.com.hero_icon0UI", null, null);
