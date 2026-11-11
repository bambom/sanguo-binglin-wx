/**
 * sg.crossService.view.CrossServiceTroopDetail —— 跨服战兵队详情面板（states 四态
 * 分派：hurt 复活倒计时+买兵、recall 撤军三类型文案、move 行军（0==moveIndex 撤回/
 * 否则买体力）、idle 城内恢复/逃亡；update 刷新武将头像/军力条/按钮分布
 * DistributionUtil；buyArmy/chehui/chejun/buyEnergy 动作）。
 *
 * 原文：code1.js 字节 [5680060,5687217)（7,157B；包装变量 H1，1 参 IIFE 基类实参
 * (jU)=ui.duplicate.CrossServiceTroopDetailUI（批次 X ✓ 已落地），明文 3 参注册
 * o(i,"sg.crossService.view.CrossServiceTroopDetail",t) @5680143；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceTroopDetail.js
 *
 * extends 决策：原文基类 jU=ui.duplicate.CrossServiceTroopDetailUI（IDE 皮肤类，
 * 批次 X ✓ 落地；其自身基类 tm=sg.view.ViewPanel 批次 A ✓）→ 直接模块直引真类。
 * 依赖（模块直引）：jU=CrossServiceTroopDetailUI（X ✓）、vs=Tools（B ✓）、ps=
 * TimeHelper（B ✓）、le=EffectManager（B ✓）、ae=ColorManager（B ✓）、Gt=ConfigServer
 * （B ✓）、Rt=ConfigApp（B ✓ isLandscape）、re=AssetsManager（V ✓）、$t=
 * CrossServiceFacade（I ✓）、tn=ViewManager（A ✓）、kc=CrossServiceMap（J ✓）；
 * 基座 initData/onRemoved 经 ViewBase（A ✓ 模块直引）；pt=laya.display.Text、
 * Ct=laya.utils.Tween、k=laya.utils.Ease、P=laya.utils.Handler、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b instance:any；AC 在途独占 model 目录，本批不 import）、ro=sg.duplicate.
 * ModelDuplicate（-b instance:any）、Nl=sg.model.ModelTroop（-b：TROOP_STATE_IDLE/
 * MOVE/RECALL 已声明；TROOP_STATE_HURT/TROOP_MOVE_CHEJUN/BAITUI/CHEHUI 调回点
 * cast）、_r=sg.model.ModelHero（主 externals 既有类面；getCurrPowerType 调回点
 * cast）、fe=sg.map.utils.DistributionUtil（-af 新声明）。
 * 皮肤字段（CrossServiceTroopDetailUI：mBox/energy_img/aniBox/army0/army1/tStatus/
 * tName/cityName/heroIcon/itemTitle/energy_txt/detai_txt/btn_container/btn_0/btn_1/
 * power_bar）由真基类类型面承载。
 * ctor 求值序：states/troopEntity 两字段初始化器原文先于 __super.call，TS 移到
 * super 后（纯赋值，观测等价，批次 H 先例）。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Text = laya.display.Text;
import { CrossServiceTroopDetailUI } from "../../ui/duplicate/CrossServiceTroopDetailUI";
import { Tools } from "../../utils/Tools";
import { TimeHelper } from "../../utils/TimeHelper";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigApp } from "../../cfg/ConfigApp";
import { AssetsManager } from "../../manager/AssetsManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { ViewManager } from "../../manager/ViewManager";
import { CrossServiceMap } from "./CrossServiceMap";
import { ViewBase } from "../../view/ViewBase";

export class CrossServiceTroopDetail extends CrossServiceTroopDetailUI {

    public states: any = {};
    public troopEntity: any = null;

    constructor() {
        super();
    }

    public init(): void {
        ViewBase.prototype.init.call(this), this.troopEntity = this.mCurrArg, this.states[sg.model.ModelTroop.TROOP_STATE_IDLE] = this.idleHandler, this.states[sg.model.ModelTroop.TROOP_STATE_MOVE] = this.moveHandler, this.states[sg.model.ModelTroop.TROOP_STATE_RECALL] = this.recallHandler, this.states[(<any>sg.model.ModelTroop).TROOP_STATE_HURT] = this.hurtHandler, this.troopEntity.on("change", this, this.update), this.detai_txt.style.fontSize = 18, this.detai_txt.style.color = "#c3ebff", this.detai_txt.style.wordWrap = !0, this.detai_txt.style.leading = 5, this.heroIcon.on("click", this, this.onClickHandler), this.itemTitle.setViewTitle(Tools.getMsgById("kuafu_35", [this.troopEntity.userName]));
        var t: any = ColorManager.getUIColor("COLOR_FILTER_TRANS")[1];
        EffectManager.changeSprColorTrans(this.energy_img, t[0], t[1], t[2]), this.update(), this.tName.text = Tools.getMsgById("kuafu_43");
    }

    public onClickHandler(): void {
        sg.duplicate.ModelDuplicate.instance.showHeroInfo(this.troopEntity.uid, this.troopEntity.hero);
    }

    public onRemoved(): void {
        ViewBase.prototype.onRemoved.call(this), this.troopEntity.off("change", this, this.update), this.heroIcon.off("click", this, this.onClickHandler);
    }

    public hurtHandler(): void {
        var t: any = this;
        this.btn_container.addChild(this.btn_1), this.btn_1.setData(AssetsManager.getAssetItemOrPayByID("coin"), this.troopEntity.buyReveieCoin), this.btn_1.textlabel.text = Tools.getMsgById("kuafu_5"), this.btn_1.getChildByName("label_txt").text = Tools.getMsgById("kuafu_11", [this.troopEntity.buyReciveCoinCount, ConfigServer.duplicate.revive_cost[0].length]), this.btn_1.disabled = !this.troopEntity.canBuyReveie, this.btn_1.on("click", this, this.buyArmy), TimeHelper.countDown(this.detai_txt, 1e3 * this.troopEntity.troopData.end_time - CrossServiceFacade.getServerTimer(), { update: new Handler(this, function (i: any) { t.detai_txt.innerHTML = Tools.getMsgById("kuafu_14", [i]); }) });
    }

    public recallHandler(): void {
        switch (this.cityName.text = Tools.getMsgById("kuafu_3", [sg.crossService.model.CrossServiceMapModel.instance.myHeadOffice.getName()]), Tools.textFitFontSize(this.cityName), this.troopEntity.moveType) {
            case (<any>sg.model.ModelTroop).TROOP_MOVE_CHEJUN:
                this.btn_container.addChild(this.btn_0), this.btn_0.label = Tools.getMsgById("kuafu_4"), this.btn_0.getChildByName("label").text = Tools.getMsgById("kuafu_9"), this.detai_txt.innerHTML = Tools.getMsgById("kuafu_12");
                break;
            case (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI:
                this.detai_txt.innerHTML = Tools.getMsgById("kuafu_13", [ConfigServer.duplicate.retreat_passive[0] / 60]);
        }
    }

    public moveHandler(): void {
        this.cityName.text = Tools.getMsgById("kuafu_3", [sg.crossService.model.CrossServiceMapModel.instance.getCity(this.troopEntity.marchData[this.troopEntity.marchData.length - 1][0]).getName()]), Tools.textFitFontSize(this.cityName), this.tStatus.text = Tools.getMsgById("_public162"), 0 == this.troopEntity.moveIndex ? (this.btn_0.disabled = this.troopEntity.isRush || 0 != this.troopEntity.moveIndex, this.btn_container.addChild(this.btn_0), this.btn_0.label = Tools.getMsgById("troopEditBtn_back"), this.btn_0.getChildByName("label").text = Tools.getMsgById("kuafu_8"), this.btn_0.clickHandler = new Handler(this, this.chehui)) : (this.btn_container.addChild(this.btn_1), this.btn_1.setData(AssetsManager.getAssetItemOrPayByID("coin"), this.troopEntity.buyEnergyCoin), this.btn_1.mImg.pivotY = 4, this.btn_1.textlabel.text = Tools.getMsgById("kuafu_2"), this.btn_1.disabled = this.troopEntity.energy >= this.troopEntity.totalEnergy, this.btn_1.getChildByName("label_txt").text = Tools.getMsgById("kuafu_7"), this.btn_1.on("click", this, this.buyEnergy)), this.detai_txt.innerHTML = Tools.getMsgById(this.troopEntity.isRush ? "kuafu_19" : "kuafu_20", [this.troopEntity.endCity.getName()]);
    }

    public idleHandler(): void {
        switch (this.cityName.text = this.troopEntity.tileEntity.getName(), Tools.textFitFontSize(this.cityName), this.tStatus.text = Tools.getMsgById("kuafu_1"), this.btn_1.setData(AssetsManager.getAssetItemOrPayByID("coin"), this.troopEntity.buyEnergyCoin), this.btn_1.mImg.pivotY = 4, this.btn_1.textlabel.text = Tools.getMsgById("kuafu_2"), this.btn_1.disabled = this.troopEntity.energy >= this.troopEntity.totalEnergy, this.btn_1.getChildByName("label_txt").text = Tools.getMsgById("kuafu_7"), this.btn_1.on("click", this, this.buyEnergy), this.troopEntity.tileEntity != sg.crossService.model.CrossServiceMapModel.instance.myHeadOffice ? (this.btn_0.label = Tools.getMsgById("troopEditBtn_runaway"), this.btn_0.getChildByName("label").text = Tools.getMsgById("kuafu_6"), this.btn_0.clickHandler = new Handler(this, this.chejun), this.btn_container.addChild(this.btn_0), this.btn_container.addChild(this.btn_1), this.btn_0.disabled = !1) : this.btn_container.addChild(this.btn_1), parseInt(this.troopEntity.tileEntity.id)) {
            case 1:
            case 2:
                this.detai_txt.innerHTML = Tools.getMsgById("kuafu_18", [this.troopEntity.tileEntity.getName(), ConfigServer.duplicate.recovery_time, Tools.percentFormat(this.troopEntity.tileEntity.recovery)]);
                break;
            case 3:
                this.detai_txt.innerHTML = Tools.getMsgById("kuafu_17", [this.troopEntity.tileEntity.getName(), ConfigServer.duplicate.recovery_time, Tools.percentFormat(this.troopEntity.tileEntity.recovery)]);
                break;
            default:
                this.detai_txt.innerHTML = Tools.getMsgById("kuafu_16", [this.troopEntity.tileEntity.getName()]);
        }
    }

    public buyArmy(): void {
        0 == this.troopEntity.army[0].hp && CrossServiceMap.instance.buyArmy(this.troopEntity) && this.closeSelf();
    }

    public chehui(): void {
        sg.crossService.model.CrossServiceMapModel.instance.sendRecallTroops(this.troopEntity.hero, (<any>sg.model.ModelTroop).TROOP_MOVE_CHEHUI), this.closeSelf();
    }

    public chejun(): void {
        sg.crossService.model.CrossServiceMapModel.instance.sendRecallTroops(this.troopEntity.hero, (<any>sg.model.ModelTroop).TROOP_MOVE_CHEJUN), this.closeSelf();
    }

    public buyEnergy(): void {
        var t: any = this;
        CrossServiceMap.instance.alertBuyEnergy(this.troopEntity.hero, new Handler(this, function () {
            var i = new Text();
            i.text = "+" + ConfigServer.duplicate.energy_buy[0], i.color = "#01ff52", i.fontSize = 20, i.bold = !0, t.energy_txt.addChild(i), i.pos(0, -20), Tween.to(i, { y: -40, alpha: 0 }, 1300, Ease.quadOut, new Handler(i, i.destroy)), ViewManager.instance.showTipsTxt(Tools.getMsgById("kuafu_34"));
        }));
    }

    public update(t?: any): void {
        if (this.states[this.troopEntity.state] && !this.troopEntity.cityInFire) {
            this.btn_1.off("click", this, this.buyEnergy), this.btn_1.off("click", this, this.buyArmy);
            var i: any = (<any>sg.model.ModelHero).getCurrPowerType(this.troopEntity.power);
            this.power_bar.setHeroPower(this.troopEntity.power, i), TimeHelper.removeCountDown(this.detai_txt), this.btn_0.disabled = this.btn_1.disabled = !0, this.tStatus.visible = !1;
            var e: any = this.troopEntity.modelHero;
            this.heroIcon.setHeroIcon(e.getHeadId(), !0, ConfigApp.isLandscape ? -1 : e.getStarGradeColor()), this.setHeroArmy(e, this.army0, 0), this.setHeroArmy(e, this.army1, 1), this.army0.bg_img.visible = this.army1.bg_img.visible = !ConfigApp.isLandscape, this.btn_container.removeChildren(), this.states[this.troopEntity.state].call(this), sg.map.utils.DistributionUtil.distribution(this.btn_container, this.btn_container.width, 1 == this.btn_container.numChildren ? -1 : 0), this.energy_txt.text = this.troopEntity.energy + "/" + this.troopEntity.totalEnergy, sg.crossService.model.CrossServiceMapModel.instance.enabled || this.btn_container.removeChildren();
        } else this.closeSelf();
    }

    public setHeroArmy(t: any, i: any, e: any): void {
        var s: any = t.army[e].type;
        if (s < 0) i.visible = !1;
        else {
            i.visible = !0, t.updateArmyLabel(i.tName, e, !0, !1), Tools.textFitFontSize(i.tLv, Tools.getMsgById("_hero16", [t.army[e].lv])), i.tName.width = i.tName.textField.textWidth, i.tLv.x = i.tName.x + i.tName.width + 6, i.army_type.setArmyIcon(s, t.getArmyRank(e));
            var n: any, h: any = this.troopEntity.army[e].hpm;
            n = this.troopEntity.army[e].hp, i.tBar.text = n + " / " + h, i.bar.value = n / h, i.kucun.visible = i.kucun_img.visible = i.tArmy.visible = !1, i.bg_img.height = 143, i.img.skin = null;
            var o: any = "army" + t.army[e].type + t.army[e].rank;
            if (i.name != o) {
                var r: any = EffectManager.loadArmysIcon(o);
                i.img.destroyChildren(), i.img.addChild(r), r.x = i.img.width / 2, r.y = i.img.height / 2, i.name = o;
            }
        }
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.CrossServiceTroopDetail",t)
 * （t=jU=ui.duplicate.CrossServiceTroopDetailUI，批次 X 真类）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopDetail, "sg.crossService.view.CrossServiceTroopDetail", null, null);
