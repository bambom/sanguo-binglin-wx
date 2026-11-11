/**
 * sg.crossService.view.CrossServiceHeroClip —— 跨服战英雄行军立绘剪辑
 * （init2：撤军态换 hero_loser 立绘/无皮肤，init 配置直传 MarchMatrixClip，
 * _ui=CrossServiceTroopInfo1 挂载上移 -90）。
 *
 * 原文：code1.js 字节 [2945342,2945830)（488B；包装变量 Cc，1 参 IIFE 基类实参
 * (bl)=sg.map.view.entity.MarchMatrixClip（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.view.CrossServiceHeroClip",t) @2945429；wrapper 体 2 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceHeroClip.js
 *
 * extends 决策：原文基类 bl=sg.map.view.entity.MarchMatrixClip（未译、不在任何已
 * 落地/在途批次 oracle 清单）→ temp extends 其已译真祖先 ut=laya.display.Sprite，
 * 原型链缺 MarchMatrixClip 层；init 调回点 (<any>) cast（落地后 1 行重指向 + 恢复，
 * 债登记 batch-af-report §5）。
 * 依赖（批内互引）：wc=CrossServiceTroopInfo1（本批 ✓ 模块直引）。
 * 批次外（ambient）：Nl=sg.model.ModelTroop（TROOP_MOVE_BAITUI 调回点 cast）。
 * ctor 求值序：_entity=null 纯赋值与 _ui=new wc 构造效应原文均先于 __super.call，
 * TS 移到 super 后、两效应相对原序保持（批次 H 先例；wc ctor 链为引擎 Sprite 构造
 * + 字段写，无回查本实例，观测等价）。
 */
import Sprite = laya.display.Sprite;
import { CrossServiceTroopInfo1 } from "../ui/CrossServiceTroopInfo1";

export class CrossServiceHeroClip extends Sprite {

    public _entity: any = null;
    public _ui: any = new CrossServiceTroopInfo1();

    constructor() {
        super();
    }

    public init2(t: any): void {
        this._entity = t, (<any>this).init({ heroId: t.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? "hero_loser" : t.hero, showProgress: !1, showArmy: !1, showFlag: !1, title: null, country: t.country, countryArmy: !1, heroScale: 1, armyScale: 1, skinId: t.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? null : t.skinId }), this._ui.init(this._entity), this.addChild(this._ui), this._ui.y = -90;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.CrossServiceHeroClip",t)
 * （t=bl=sg.map.view.entity.MarchMatrixClip，未译缓译；TS extends 层暂挂 laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceHeroClip, "sg.crossService.view.CrossServiceHeroClip", null, null);
