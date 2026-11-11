/**
 * sg.crossService.ui.CrossServiceCityInfo1 —— 跨服战城格信息条 1（info_1=CityInfo1UI
 * 皮肤：updateTroop/updateBuild 按 checkMask 视野显兵力 "+N"/"???"、旗标/头像/国色；
 * updateFight 造 CityFightBar 战况条；update 分 fire/res/兵力三分派；initScene 挂
 * infoLayer + bubbles 登记）。
 *
 * 原文：code1.js 字节 [2938326,2943147)（4,821B；包装变量 xc，1 参 IIFE 基类实参
 * (vl)=sg.scene.view.ui.ScaleIcon（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.ui.CrossServiceCityInfo1",t) @2938430；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceCityInfo1.js
 *
 * extends 决策：原文基类 vl=sg.scene.view.ui.ScaleIcon（未译、不在任何已落地/在途
 * 批次 oracle 清单）→ temp extends 其已译真祖先 ut=laya.display.Sprite（ScaleIcon
 * 自身基类），原型链缺 ScaleIcon 层；initScene/resize 调回点 (<any>) cast；
 * destroy 的 t.prototype.destroy 按原文以全局注册路径传 sg.scene.view.ui.ScaleIcon
 * （落地后 1 行重指向 + 恢复，债登记 batch-af-report §5）。
 * 依赖（模块直引）：kc=CrossServiceMap（J ✓）、Mk=ui.duplicate.CrossServiceCityInfo1UI
 * （X ✓ 皮肤真类，_ui 类型面）、vs=Tools（B ✓）、le=EffectManager（B ✓）、
 * ae=ColorManager（B ✓）；F=laya.ui.Image、Ct=laya.utils.Tween、k=laya.utils.Ease、
 * P=laya.utils.Handler、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：Du=sg.map.view.CityFightBar（本批 -af 新
 * 声明：ctor+setInfo）、_r=sg.model.ModelHero（主 externals 既有类面；
 * getFlagName 调回点 cast）。
 * ctor 求值序：_ui/cityFightBar/tileEntity 三 null 字段初始化器原文先于
 * __super.call，TS 移到 super 后（纯赋值，观测等价，批次 H 先例）。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Sprite = laya.display.Sprite;
import Image = laya.ui.Image;
import { CrossServiceMap } from "../view/CrossServiceMap";
import { CrossServiceCityInfo1UI } from "../../ui/duplicate/CrossServiceCityInfo1UI";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";

export class CrossServiceCityInfo1 extends Sprite {

    public _ui: any = null;
    public cityFightBar: any = null;
    public tileEntity: any = null;

    constructor() {
        super();
    }

    public init(t: any, i: any): void {
        i = [[0, -1], [CrossServiceMap.instance.maxScale - .1, -1], [100, -1]], (<any>this).initScene(CrossServiceMap.instance, i), this.tileEntity = t;
        var e: any = this.tileEntity.mapGrid.toScreenPos2();
        this.pos(e.x, e.y), CrossServiceMap.instance.mapLayer.infoLayer.addChild(this), CrossServiceMap.instance.bubbles.push(this);
    }

    public updateTroop(t: any): void {
        var i: any = this, e: any = t[0];
        this._ui = this._ui || new CrossServiceCityInfo1UI(), this._ui.icon.setHeroIcon(e.modelHero.getHeadId(!1), !0, 2), this._ui.countDown_txt.text = e.userName, Tools.textFitFontSize(this._ui.countDown_txt), this._ui.countDown_txt.pivotY = 0, this._ui.time_pro.value = e.getHpPer(), this.addChild(this._ui), this._ui.y = -50, this._ui.qi_icon.visible = !1, this._ui.qi_icon.setCountryFlag(e.country), EffectManager.changeSprColor(this._ui.bg_img, this.tileEntity.country, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX")), this._ui.qi_icon.getChildByName("label").text = (<any>sg.model.ModelHero).getFlagName(e.hero), this._ui.visible = !0;
        var s: any = CrossServiceMap.instance.floorContainer.checkMask(this.tileEntity.mapGrid), n: any = (this.tileEntity.monster ? "+" : "") + (s ? t.length.toString() : "???");
        this._ui.troopNum.text !== n && (this._ui.troopNum.text = n, Tween.to(this._ui.troopNum, { scaleX: 2, scaleY: 2 }, 150, Ease.quadOut, new Handler(this, function () { Tween.to(i._ui.troopNum, { scaleX: 1, scaleY: 1 }, 150, Ease.quadIn); }))), this._ui.troopNum.width = this._ui.troopNum.textField.textWidth, this._ui.troopNum.pivotX = this._ui.troopNum.textField.textWidth / 2, this._ui.troopNum2.text = this.tileEntity.monster ? this.tileEntity.monster.toString() : "", this._ui.troopNum.x = this._ui.troopNum2.x + this._ui.troopNum2.textField.textWidth + this._ui.troopNum.pivotX, this._ui.troop_bg_img.width = this._ui.troopNum.textField.textWidth + this._ui.troopNum2.textField.textWidth + this._ui.troopNum2.x + 2 * this._ui.troopNum2.x, this.cityFightBar && (this.cityFightBar.visible = !1);
    }

    public updateBuild(t: any): void {
        var i: any = this;
        this._ui = this._ui || new CrossServiceCityInfo1UI();
        var e: any = t[0];
        if (e) {
            this._ui.icon.setHeroIcon(e.modelHero.getHeadId(!1), !0, 2), this._ui.qi_icon.setCountryFlag(e.country), this._ui.qi_icon.getChildByName("label").text = (<any>sg.model.ModelHero).getFlagName(e.hero);
            var s: any = CrossServiceMap.instance.floorContainer.checkMask(this.tileEntity.mapGrid), n: any = (this.tileEntity.monster ? "+" : "") + (s ? t.length.toString() : "???");
            Tween.clearAll(this._ui.troopNum), this._ui.troopNum.text !== n && (this._ui.troopNum.text = n, Tween.to(this._ui.troopNum, { scaleX: 2, scaleY: 2 }, 150, Ease.quadOut, new Handler(this, function () { Tween.to(i._ui.troopNum, { scaleX: 1, scaleY: 1 }, 150, Ease.quadIn); }))), this._ui.troopNum.width = this._ui.troopNum.textField.textWidth, this._ui.troopNum.pivotX = this._ui.troopNum.textField.textWidth / 2, this._ui.troopNum2.text = this.tileEntity.monster ? this.tileEntity.monster.toString() : "", this._ui.heroContainer.visible = !0, this._ui.troopNum.scale(1, 1), this._ui.troopNum.x = this._ui.troopNum2.x + this._ui.troopNum2.textField.textWidth + this._ui.troopNum.pivotX, this._ui.troop_bg_img.width = this._ui.troopNum.textField.textWidth + this._ui.troopNum2.textField.textWidth + 2 * this._ui.troopNum2.x, Tween.to(this._ui.troopContainer, { x: 0 }, 600, Ease.quintOut);
        } else
            this._ui.heroContainer.visible = !1, Tween.to(this._ui.troopContainer, { x: -this._ui.troop_bg_img.width }, 600, Ease.quintOut);
        Tools.textFitFontSize(this._ui.countDown_txt, this.tileEntity.getName(!1)), this._ui.countDown_txt.pivotY = -8, this._ui.time_pro.visible = !1, this.addChild(this._ui), this._ui.y = -50, this._ui.qi_icon.visible = !1, EffectManager.changeSprColor(this._ui.bg_img, this.tileEntity.country, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX")), this._ui.visible = !0, this.cityFightBar && (this.cityFightBar.visible = !1);
    }

    public updateFight(): void {
        if (!this.cityFightBar) {
            this.cityFightBar = new sg.map.view.CityFightBar();
            var t = new Image("later/home_46.png");
            t.pos(-13, -48), t.size(28, 26), this.cityFightBar.addChild(t), this.addChild(this.cityFightBar), this.cityFightBar.y = -30;
        }
        var i, e: any = this.tileEntity.fireCountry;
        i = this.tileEntity.getIdelTroops(this.tileEntity.country).length + this.tileEntity.monster;
        var s: any = this.tileEntity.getIdelTroops(-1).length + this.tileEntity.monster - i;
        this.cityFightBar.setInfo(e, this.tileEntity.country, s, i, ""), this._ui && (this._ui.visible = !1), this.cityFightBar.visible = !0;
    }

    public setMyTroop(t: any): void {
        for (var i: any = this.tileEntity.getIdelTroops(-1).filter(function (t: any) { return t.isMine; }), e = 0, s = i.length; e < s; e++) {
            var n: any = CrossServiceMap.instance.troopBubbles[i[e].hero];
            this.addChild(n), n.y = t;
        }
    }

    public update(): void {
        if ((<any>this).resize(), this.tileEntity.fire) this.updateFight(), this.setMyTroop(-78);
        else {
            var t: any = this.tileEntity.getIdelTroops();
            this.tileEntity.getParamConfig("res") ? (this.updateBuild(t), this.setMyTroop(-68)) : t.length ? (this.updateTroop(t), this.setMyTroop(-68)) : (this._ui && (this._ui.visible = !1), this.cityFightBar && (this.cityFightBar.visible = !1));
        }
    }

    public changeStateHandler(t: any): void {
    }

    public destroy(i?: any): void {
        void 0 === i && (i = !0), this._ui && (Tween.clearAll(this._ui.troopNum), Tween.clearAll(this._ui.troopContainer)), (<any>sg.scene.view.ui.ScaleIcon.prototype).destroy.call(this, i);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceCityInfo1",t)
 * （t=vl=sg.scene.view.ui.ScaleIcon，未译缓译；TS extends 层暂挂 laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceCityInfo1, "sg.crossService.ui.CrossServiceCityInfo1", null, null);
