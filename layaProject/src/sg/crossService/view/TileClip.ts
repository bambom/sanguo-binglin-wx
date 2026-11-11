/**
 * sg.crossService.view.TileClip —— 跨服战地砖剪辑（CrossServiceClip 基座：init 挂
 * CityInfo1 信息条/资源动画/城火光效；setCityUI 视野内更新 + 标记/我方军动画/
 * 怪物动画/旗；onClick 组 grid menu 三/四按钮（查看/派兵/观战/标记）；changeCamp
 * 换国色底图（Pool 取放）；tileEntity/marked 访问器）。
 *
 * 原文：code1.js 字节 [3395472,3401556)（6,084B；包装变量 a_，1 参 IIFE 基类实参
 * (dd)=sg.crossService.view.CrossServiceClip（本批同译），明文 3 参注册
 * o(i,"sg.crossService.view.TileClip",t) @3395725；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/TileClip.js
 *
 * extends 决策：原文基类 dd=CrossServiceClip 本批已译 → 直接 extends（模块直引）。
 * init/destroy 的 EntityClip.prototype 直引按原文全局路径保留（cast：-u 空 shell）。
 * 依赖（模块直引）：kc=CrossServiceMap（J ✓）、xc=CrossServiceCityInfo1（本批 ✓）、
 * vs=Tools（B ✓）、le=EffectManager（B ✓）、Gt=ConfigServer（B ✓）、Rt→ConfigApp
 * 未见本类、re=AssetsManager（V ✓）、tn=ViewManager（A ✓）、$t=CrossServiceFacade
 * （I ✓）；pt=laya.display.Text、F=laya.ui.Image、st=laya.utils.Pool、Ct=
 * laya.utils.Tween、P=laya.utils.Handler、ye=sg.map.utils.Math2（-b 已声明
 * radianToAngle）、s=Laya、Ts=Laya.Trace（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b instance:any；CHU/HAN/ZHONG_COUNTRY 调回点 cast）、Ws=sg.duplicate.
 * ModelDuplicateSettings（-b instance:any）、ho=sg.crossService.model.
 * CrossServiceUserModel（-b instance:any；LEADER_CHANGED 调回点 cast）、ro=
 * sg.duplicate.ModelDuplicate（-b instance:any）、Ql=sg.scene.view.Effect（-af 新
 * 声明）、e0=sg.duplicate.view.ViewHeroSendDup（-af 新声明，类值实参）、Pu=
 * sg.scene.view.entity.EntityClip（-u 空 shell；prototype.init/destroy cast）、
 * Ye=sg.scene.view.MapCamera（-b lookAtCrossServiceGrid 已声明）。
 * 引擎签名缺口：laya.utils.Pool.getItemByCreateFun d.ts 声明 2 参（sign,createFun），
 * 原文 3 参（含 caller this）——LayaAir 实现为 (sign,createFun,caller)，调回点
 * (<any>Pool) cast 直传 3 参（batch-af-report §5 登记）。
 * ctor 求值序：campClip/fire/_myTroopAniFlag/_myTroopAni/_monsterAni/_monsterFlagAni/
 * _markImg/_markAni 八 null 预置与 info_1=new xc、text=new pt 构造效应原文均先于
 * __super.call(this,t)，TS 移到 super 后、相对原序保持（批次 H 先例；xc/pt ctor 链
 * 为引擎 Sprite 构造 + 字段写，无回查本实例，观测等价）。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Text = laya.display.Text;
import Image = laya.ui.Image;
import Pool = laya.utils.Pool;
import { CrossServiceMap } from "./CrossServiceMap";
import { CrossServiceClip } from "./CrossServiceClip";
import { CrossServiceCityInfo1 } from "../ui/CrossServiceCityInfo1";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { AssetsManager } from "../../manager/AssetsManager";
import { ViewManager } from "../../manager/ViewManager";
import { CrossServiceFacade } from "../CrossServiceFacade";

export class TileClip extends CrossServiceClip {

    public campClip: any = null;
    public fire: any = null;
    public _myTroopAniFlag: any = null;
    public _myTroopAni: any = null;
    public _monsterAni: any = null;
    public _monsterFlagAni: any = null;
    public _markImg: any = null;
    public _markAni: any = null;
    public info_1: any = new CrossServiceCityInfo1();
    public text: any = new Text();

    constructor(t?: any) {
        super(t);
    }

    public init(): void {
        (<any>sg.scene.view.entity.EntityClip.prototype).init.call(this);
        var t: any = this._entity.getParamConfig("res");
        t && this._clip.addChild(EffectManager.loadAnimation(t)), this.info_1.init(this.tileEntity), this.layoutPos(), this.changeCamp(), this._entity.on("city_country_change", this, this.changeCamp), this._entity.on("dw.city_fire", this, this.onCityFireHandler), this._entity.on("w.troop_add", this, this.onUpdateUI), this._entity.on("w.troop_dissmiss", this, this.onUpdateUI), this._entity.on("dw.city_monster", this, this.onUpdateUI), this.addChild(this.text), this.text.color = "#FFFFFF", this.text.text = this._entity.mapGrid.toString3(), this.text.fontSize = 30, this.text.pivot(this.text.width / 2, this.text.height / 2), this.onCityFireHandler(), this.text.rotation = sg.map.utils.Math2.radianToAngle(sg.crossService.model.CrossServiceMapModel.instance.mapGrid.hypotenuseV.angle), sg.duplicate.ModelDuplicateSettings.instance.on("settings_changed", this, this.checkText), this.checkText(), sg.crossService.model.CrossServiceUserModel.instance.on((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this.setCityUI);
    }

    public checkText(): void {
        this.text.visible = sg.duplicate.ModelDuplicateSettings.instance.getSetting("grid_pos");
    }

    public onUpdateUI(): void {
        Laya.timer.callLater(this, this.setCityUI);
    }

    public onCityFireHandler(): void {
        if (Tools.destroy(this.fire), this.fire = null, this.tileEntity.fire) {
            this.fire = (new sg.scene.view.Effect()).init({ id: "building_fire", loop: !0 }), this._scene.mapLayer.effectLayer.addChild(this.fire);
            var t: any = this.tileEntity.mapGrid.toScreenPos2();
            this.fire.pos(t.x, t.y), this.fire.scale(2, 2);
        }
        this.onUpdateUI();
    }

    public setCityUI(): void {
        var t: any = CrossServiceMap.instance.floorContainer.checkMask(this.tileEntity.mapGrid);
        if (t && this.info_1.update(), this.info_1.visible = t, this.marked) {
            if (!this._markImg) {
                var i: any = CrossServiceMap.instance.floorContainer.getMark(this.tileEntity.cid);
                this._markAni = EffectManager.loadAnimation("duplicate_move"), this._markAni.scale(2, 2), this._clip.addChildAt(this._markAni, 0), this._markImg = new Image(AssetsManager.getAssetLater("icon_duplicate_biaoji3.png")), this._markImg.anchorX = this._markImg.anchorY = .5, this._markImg.scale(2, 2), this._markImg.pos(sg.crossService.model.CrossServiceMapModel.instance.mapGrid.gridHalfW, sg.crossService.model.CrossServiceMapModel.instance.mapGrid.gridHalfH), i.addChild(this._markImg);
            }
        } else this._markImg && (this._markAni.removeSelf(), this._markAni = null, Tween.to(this._markImg, { y: this._markImg.y - 50, alpha: 0 }, 500, null, Handler.create(this._markImg, this._markImg.destroy)), this._markImg = null);
        if (this.tileEntity.getIdelTroops(-1).some(function (t: any) { return t.isMine; }) || (this._myTroopAniFlag && this._myTroopAniFlag.removeSelf(), this._myTroopAni && this._myTroopAni.removeSelf()), this.tileEntity.monster) {
            var e: any = ConfigServer.duplicate.monster[ConfigServer.duplicate.neutral[this.tileEntity.mapGrid.row][this.tileEntity.mapGrid.col]].res;
            e && (this._monsterAni = this._monsterAni || EffectManager.loadAnimation(e), this._clip.addChild(this._monsterAni));
            var s: any = "duplicate_flag_" + this.tileEntity.country;
            ({ duplicate_flag_40: 1, duplicate_flag_41: 1 })[s] && (this._monsterFlagAni = this._monsterFlagAni || EffectManager.loadAnimation(s), this._clip.addChild(this._monsterFlagAni), this._monsterFlagAni.pos(60, 50));
        } else this._monsterAni && (this._monsterAni.destroy(), this._monsterAni = null), this._monsterFlagAni && (Tween.to(this._monsterFlagAni, { y: this._monsterFlagAni.y - 50, alpha: 0 }, 500, null, Handler.create(this._monsterFlagAni, this._monsterFlagAni.destroy)), this._monsterFlagAni = null), !this.tileEntity.getParamConfig("res") && this.tileEntity.getIdelTroops().length ? (this._myTroopAni = this._myTroopAni || EffectManager.loadAnimation("duplicate001"), this._clip.addChild(this._myTroopAni), this._myTroopAni.visible = t) : this._myTroopAni && this._myTroopAni.removeSelf();
    }

    public onClick(): void {
        var t: any = this, i = { visible: !0, label: Tools.getMsgById("_jia0033"), icon: AssetsManager.getAssetLater("home_01.png"), handler: new Handler(this, function () { sg.duplicate.ModelDuplicate.instance.showCityInfo(t.tileEntity.cid); }) }, e = { visible: 6 != parseInt(this.tileEntity.id) && sg.crossService.model.CrossServiceMapModel.instance.enabled, label: Tools.getMsgById("_jia0032"), icon: AssetsManager.getAssetLater("home_39.png"), handler: new Handler(this, function () { Laya.Trace.log(t.tileEntity.cid), ViewManager.instance.showView(["ViewHeroSendDup", sg.duplicate.view.ViewHeroSendDup], t.entity); }) }, s: any = this, n = { visible: this.tileEntity.fire && !ConfigServer.world.skip_all_fight, label: Tools.getMsgById("msg_MapViewMain_2"), icon: AssetsManager.getAssetLater("home_32.png"), handler: new Handler(this, function () { CrossServiceFacade.instance.socket.send("dw.follow_fight", { cid: this.tileEntity.cid }, Handler.create(s, function (i: any) { CrossServiceMap.instance.inFight(t.tileEntity, i.receiveData); })); }) }, h: any = sg.crossService.model.CrossServiceUserModel.instance, o = { visible: h.isLeader, label: Tools.getMsgById(this.marked ? "_duplicate063" : "_duplicate062"), icon: AssetsManager.getAssetLater("home_65.png"), handler: new Handler(this, function () { sg.duplicate.ModelDuplicate.instance.markCity(t.tileEntity.cid); }) }, r = [i, e, n];
        h.isLeader && h.showLeader && (this.marked || sg.crossService.model.CrossServiceUserModel.instance.markCids.length < ConfigServer.duplicate.sign) && r.push(o), CrossServiceMap.instance.mapLayer.menu.showGridMenu(this.tileEntity.mapGrid, r, 120), sg.scene.view.MapCamera.lookAtCrossServiceGrid(this.tileEntity.cid);
    }

    public changeCamp(): void {
        var t: any = this.entity.country, i: any = "dige_" + (t == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? 0 : t == (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY ? 1 : 2);
        this.campClip && this.campClip.name != i && (Tween.to(this.campClip, { scaleX: 0, scaleY: 0 }, 400, null, new Handler(this, function (t: any) { t.removeSelf(), Pool.recover(t.name, t); }, [this.campClip])), this.campClip = null), this.onUpdateUI(), t != (<any>sg.crossService.model.CrossServiceMapModel).ZHONG_COUNTRY && (this.campClip = (<any>Pool).getItemByCreateFun(i, function () { var t: any = new CrossServiceClip(CrossServiceMap.instance); return t.name = i, t.texture = Laya.loader.getRes("map3/" + i + ".png"), t.pivot(t.texture.width / 2, t.texture.height / 2), t; }, this), this.campClip.entity = this.entity, CrossServiceMap.instance.floorContainer.campContainer.addChild(this.campClip), this.campClip.layoutPos(), this.campClip.scale(0, 0), Tween.to(this.campClip, { scaleX: 1, scaleY: 1, delay: 200 }, 400, null, new Handler(this, function (t: any) { }, [this.campClip])));
    }

    public destroy(t?: any): void {
        void 0 === t && (t = !0), this._entity.off("city_country_change", this, this.changeCamp), this._entity.off("dw.city_fire", this, this.onCityFireHandler), sg.crossService.model.CrossServiceUserModel.instance.off((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this.setCityUI), sg.duplicate.ModelDuplicateSettings.instance.off("settings_changed", this, this.checkText), (<any>sg.scene.view.entity.EntityClip.prototype).destroy.call(this, t);
    }

    /** r(0,e,"tileEntity",function(){return this._entity}) —— 纯读转发 */
    public get tileEntity(): any {
        return this._entity;
    }

    /** r(0,e,"marked",function(){return-1!==ho.instance.markCids.indexOf(...)}) */
    public get marked(): any {
        return -1 !== sg.crossService.model.CrossServiceUserModel.instance.markCids.indexOf(this.tileEntity.cid);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.TileClip",t)
 * （t=dd=sg.crossService.view.CrossServiceClip，本批同译真类）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(TileClip, "sg.crossService.view.TileClip", null, null);
