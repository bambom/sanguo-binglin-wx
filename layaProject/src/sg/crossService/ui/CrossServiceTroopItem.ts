/**
 * sg.crossService.ui.CrossServiceTroopItem —— 跨服战兵队列表项（CrossServiceTroopItemUI
 * 皮肤：states 状态机 IDLE/MOVE/RECALL/HURT 四 handler 分派；recallHandler 三撤军类型
 * switch 文案；dataSource getset getter 复用基类 _$get_dataSource、setter 组 states/
 * click/change 监听；x/width getset 经 Laya.superGet/superSet 走基类（Cg）描述符；
 * changeHpRed 双 translationMatrix 补间；clearAll 复位全部皮肤子件）。
 *
 * 原文：code1.js 字节 [4125182,4129952)（4,770B；包装变量 SP，1 参 IIFE 基类实参 (Cg)=
 * ui.duplicate.CrossServiceTroopItemUI（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.ui.CrossServiceTroopItem",t) @4125312；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-v/CrossServiceTroopItem.js
 *
 * 批次 V 入批原因：sg.crossService.ui 首簇第 1 类（CrossServiceUI.initTroop
 * list.itemRender=SP 硬依赖，同批互引）。
 * extends 决策：原文基类 Cg=ui.duplicate.CrossServiceTroopItemUI（IDE 皮肤类，未译，归
 * 后续批次；其自身基类 e_=sg.view.com.ItemBase 批次 A ✓）。本批暂 extends 已译真祖先
 * ItemBase，原型链缺 IDE 皮肤层；x/width 的 superGet(Cg)/superSet(Cg) 与 dataSource 的
 * prototype._$get_dataSource 仍按原文以全局注册路径传 ui.duplicate.CrossServiceTroopItemUI；
 * 该皮肤类落地后本文件 extends 需重指向——见 batch-v-report.md「extends 决策」。
 * 依赖：vs=Tools、ps=TimeHelper、le=EffectManager、Gt=ConfigServer、Ht=ConfigClass、
 * tn=ViewManager、$t=CrossServiceFacade（I ✓）、kc=CrossServiceMap（J ✓）（模块直引）；
 * P=laya.utils.Handler、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：Ye=sg.scene.view.MapCamera（lookAtDisplay 调回点
 * cast；lookAtCrossServiceGrid 既有声明）、Nl=sg.model.ModelTroop（TROOP_STATE_IDLE/MOVE/
 * RECALL 既有声明；TROOP_STATE_HURT/TROOP_MOVE_CHEHUI/CHEJUN/BAITUI 调回点 cast）、
 * ui.duplicate.CrossServiceTroopItemUI（superGet/superSet/prototype._$get_dataSource）。
 * ctor 求值序：troopEntity/states/fightEffect/recoveryEffect 四字段初始化器原文先于
 * __super.call，TS 移到 super 后（纯赋值，观测等价，批次 H 先例）。
 * 皮肤字段（CrossServiceTroopItemUI：heroNull/heroIcon/pFight/move_bar/fight_bar/home_icon/
 * move_icon/fight_cion/sMoveQuick/label_txt/energy_txt/jichong_container/rush_icon/
 * txtOfficial）类型层声明，无初始化器。
 */
import Handler = laya.utils.Handler;
import { ItemBase } from "../../view/com/ItemBase";
import { Tools } from "../../utils/Tools";
import { TimeHelper } from "../../utils/TimeHelper";
import { EffectManager } from "../../manager/EffectManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewManager } from "../../manager/ViewManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { CrossServiceMap } from "../view/CrossServiceMap";

export class CrossServiceTroopItem extends ItemBase {

    public troopEntity: any = null;
    public states: any = {};
    public fightEffect: any = null;
    public recoveryEffect: any = null;

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

    public clearAll(): void {
        this.move_bar.visible = !1, this.fight_bar.visible = !1, this.home_icon.visible = !1, this.move_icon.visible = !1, this.fight_cion.visible = !1, this.sMoveQuick.visible = !1, this.jichong_container.visible = !1, this.fightEffect && (this.fightEffect.visible = !1), this.recoveryEffect && (this.recoveryEffect.visible = !1), this.label_txt.color = "#FFFFFF", TimeHelper.removeCountDown(this.label_txt);
        Tools.getMsgById("duplicateRush");
        this.heroIcon.addChildAt(this.jichong_container, this.heroIcon.getChildIndex(this.heroIcon.getChildByName("imgPanel")) + 1),
            this.jichong_container.scale(1 / .7, 1 / .7),
            this.jichong_container.pos(-2, 5);
    }

    public changeHpRed(): void {
        var t: any = this,
            i = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            e = [1, 0, 0, 0, 200, 0, .5, 0, 0, 0, 0, 0, .5, 0, 0, 0, 0, 0, 1, 0];
        EffectManager.translationMatrix(this.pFight, i, e, 500, new Handler(this, function () { EffectManager.translationMatrix(t.pFight, e, i, 400) }));
    }

    public hurtHandler(): void {
        var t: any = this;
        this.label_txt.color = ConfigServer.duplicate.state_color[5],
            TimeHelper.countDown(this.label_txt, 1e3 * this.troopEntity.troopData.end_time - CrossServiceFacade.getServerTimer(), {
                mode: 5,
                update: new Handler(this, function (i: any) {
                    var e: any = Tools.getMsgById("_duplicate043");
                    t.label_txt.text = e + " " + i;
                })
            }),
            this.home_icon.visible = !0;
    }

    public onClickHandler(): void {
        this.troopEntity.cityInFire || ViewManager.instance.showView(ConfigClass.VIEW_CROSS_SERVICE_TROOP_DETAIL, this.troopEntity),
            this.troopEntity.isMove ? (<any>sg.scene.view.MapCamera).lookAtDisplay(this.troopEntity.view, 500) : sg.scene.view.MapCamera.lookAtCrossServiceGrid(this.troopEntity.mapGrid.getKey());
        var t: any = CrossServiceMap.instance.troopBubbles[this.troopEntity.hero];
        t.parent && t.parent.addChild(t);
    }

    public recallHandler(): void {
        var t: any = this;
        this.move_bar.visible = this.move_icon.visible = !0,
            this.label_txt.color = "#e81212",
            TimeHelper.countDown(this.label_txt, 1e3 * this.troopEntity.remainTime(), {
                mode: 5,
                update: new Handler(this, function (i: any) {
                    var e = "";
                    switch (t.troopEntity.moveType) {
                        case (<any>sg.model.ModelTroop).TROOP_MOVE_CHEHUI:
                            e = Tools.getMsgById("_public163"), t.label_txt.color = ConfigServer.duplicate.state_color[0];
                            break;
                        case (<any>sg.model.ModelTroop).TROOP_MOVE_CHEJUN:
                            t.label_txt.color = ConfigServer.duplicate.state_color[1], e = Tools.getMsgById("kuafu_4");
                            break;
                        case (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI:
                            t.label_txt.color = ConfigServer.duplicate.state_color[4], e = Tools.getMsgById("kuafu_26");
                    }
                    t.label_txt.text = e + " " + i;
                })
            });
    }

    public moveHandler(): void {
        var t: any = this;
        this.move_bar.visible = this.move_icon.visible = !0,
            TimeHelper.countDown(this.label_txt, 1e3 * this.troopEntity.remainTime(), {
                mode: 5,
                update: new Handler(this, function (i: any) {
                    var e: any = Tools.getMsgById("_public162");
                    t.label_txt.text = e + " " + i;
                })
            }),
            this.jichong_container.visible = this.troopEntity.isRush,
            this.label_txt.color = ConfigServer.duplicate.state_color[0];
    }

    public monsterHandler(): void {
        this.fight_bar.visible = !0,
            this.fight_cion.visible = !0,
            this.label_txt.text = "野战中";
    }

    public idleHandler(): void {
        this.troopEntity.cityInFire ? (this.fight_bar.visible = !0, this.fight_cion.visible = !0, this.label_txt.text = Tools.getMsgById("_climb64"), this.fightEffect || (this.fightEffect = EffectManager.loadAnimation("headfight", "", 0), this.fightEffect.pos(.5 * this.width, .5 * this.height), this.addChild(this.fightEffect)), this.fightEffect && (this.fightEffect.visible = !0), this.label_txt.color = ConfigServer.duplicate.state_color[2]) : (this.home_icon.visible = !0, this.label_txt.text = Tools.getMsgById("kuafu_1"), this.label_txt.color = ConfigServer.duplicate.state_color[3], this.troopEntity.canRecovery && (this.recoveryEffect || (this.recoveryEffect = EffectManager.loadAnimation("duplicate_hpup", "", 0), this.recoveryEffect.pos(.5 * this.width, .5 * this.height), this.addChild(this.recoveryEffect)), this.recoveryEffect && (this.recoveryEffect.visible = !0)));
    }

    public update(): void {
        if (this.troopEntity && (this.energy_txt.text = this.troopEntity.energy + "/" + ConfigServer.duplicate.energy[1], this.states[this.troopEntity.state])) {
            this.clearAll();
            var t: any = this.troopEntity.modelHero;
            this.heroIcon.visible = !0,
                this.heroIcon.setHeroIcon(t.getHeadId(), !0, t.getStarGradeColor()),
                this.pFight.value = this.troopEntity.getHpPer(),
                this.states[this.troopEntity.state].call(this);
        }
    }

    public destroy(t?: any): void {
        void 0 === t && (t = !0),
            this.clearAll(),
            laya.ui.View.prototype.destroy.call(this, t);
    }

    /** r(0,e,"x",getter,setter) —— 经基类（Cg）描述符的 superGet/superSet 直译 */
    public get x(): number {
        return Laya.superGet(ui.duplicate.CrossServiceTroopItemUI, this, "x");
    }

    public set x(t: number) {
        Laya.superSet(ui.duplicate.CrossServiceTroopItemUI, this, "x", t);
    }

    /** r(0,e,"width",getter,setter) —— 同 x */
    public get width(): number {
        return Laya.superGet(ui.duplicate.CrossServiceTroopItemUI, this, "width");
    }

    public set width(t: number) {
        Laya.superSet(ui.duplicate.CrossServiceTroopItemUI, this, "width", t);
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— getter 为基类（Cg 原型链）
     * _$get_dataSource 函数本体；setter null!= 守卫臂内语句断点（this.update(); 后
     * troopEntity.on 监听对）保持原文。 */
    public get dataSource(): any {
        return (<any>ui.duplicate.CrossServiceTroopItemUI.prototype)._$get_dataSource.call(this);
    }

    public set dataSource(t: any) {
        if (null != t) {
            this.troopEntity = t, this.states[sg.model.ModelTroop.TROOP_STATE_IDLE] = this.idleHandler, this.states[sg.model.ModelTroop.TROOP_STATE_MOVE] = this.moveHandler, this.states[sg.model.ModelTroop.TROOP_STATE_RECALL] = this.recallHandler, this.states[(<any>sg.model.ModelTroop).TROOP_STATE_HURT] = this.hurtHandler, this.on("click", this, this.onClickHandler), this.update();
            this.troopEntity.on("change", this, this.update), this.troopEntity.on("changeHpRed", this, this.changeHpRed), this.heroIcon.getChildByName("imgPanel").addChild(this.jichong_container);
        }
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceTroopItem",t)
 * （t=Cg=ui.duplicate.CrossServiceTroopItemUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopItem, "sg.crossService.ui.CrossServiceTroopItem", null, null);
