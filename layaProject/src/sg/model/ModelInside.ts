/**
 * sg.model.ModelInside —— 内城建筑中枢模型：建筑/装备/科技三条 CD 队列管理
 * （initBuildingArr/initEquipArr/initScienceArr + onTimer 每秒巡检）、
 * 建筑按钮装配 checkBuildingView（逗号条件表达式驱动）、建筑状态机
 * checkBuildingStatus（n=h*10+状态位）、建筑点击分发 checkBuildingFunc、
 * 升级/收取网络链（building_lv_up / get_building_material / get_equip_cd /
 * get_science / get_building_army）、自动练兵 setArmyCdObj/checkAutoArmy。
 *
 * 原文：code1.js 字节 [2189271,2216904]（包装变量 vr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelInside"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelInside.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖直引（批次 A/B/C/D 模块）：ue=ModelManager、pn=NetSocket、P=Handler、et=Point、
 * Gt=ConfigServer、vs=Tools、tn=ViewManager、Ts=Trace、Rt=ConfigApp、Vt=ConfigUI、
 * Ut=Platform、Ht=ConfigClass、le=EffectManager、as=MusicManager、re=AssetsManager、
 * lr=ModelGame、Uo=ModelArena。
 * 批次外全局注册路径：zo=sg.model.ModelBuiding（原文拼写如此）、Dt=sg.boundFor.GotoManager、
 * Yh=sg.activities.model.ModelSpArmyBox、jo=sg.model.ModelCabinet、Tr=sg.model.ModelOffice、
 * Fr=sg.model.ModelShogun、wr=sg.model.ModelSchemeEgg、or=sg.model.ModelMeritExchange、
 * z2=sg.meritExchange.ViewMeritExchange、ke=sg.model.ModelDoomTower、Se=sg.model.ModelScheme、
 * io=sg.altar.legendAwaken.model.ModelLegendAwaken、Qs=sg.kunlun.model.ModelKunlun（原文静态
 * 单例名拼写 "intance"，由 r(1,s,"intance",getter,undefined) 惰性安装——引擎 getset 无
 * defineProperty，属性访问按原文保留）、$s=sg.kunlun.model.ModelWilderness、
 * bo=sg.god.model.ModelGodMain、To=sg.jigsaw.model.ModelJigsaw、Io=sg.heritage.ModelHeritage、
 * ca=sg.seaRoute.ModelSeaRoute、oo=sg.cross_pvp.model.ModelCrossPvp、nr=sg.model.ModelEquip、
 * Rr=sg.model.ModelScience、Me=sg.model.ModelPrepare、JK=sg.view.effect.ArmyUpgrade、
 * lQ=sg.view.effect.EquipUpgrade、cQ=sg.view.effect.EquipUpgradeLoser、aQ=sg.view.effect.EquipGet、
 * qi=sg.guide.view.GuideFocus、Yo=sg.model.ModelChampion、pr=sg.model.ModelHonour、
 * Mr=sg.model.ModelOfficeRight、js=sg.guide.model.ModelGuide。
 *
 * 结构注记（AST 已核）：
 * - checkBuildingFunc 中 `r=0` 位于 if(r<0) 块内、if(h>=0&&h<2){…return} 之后，
 *   是 h∉[0,2) 时的可达回退赋值（非死代码）；其后 `if(1!=r)` 在函数体层。
 * - checkBuildingView 的 if 条件为逗号表达式 `(0==l?(…):…:4==l&&(…), 5==c)`。
 * - ws_sr_building_lv_up / ws_sr_get_building_material 的 h["building_lv"] /
 *   h["get_building_material"] 是本类未声明静态计数器（(<any>ModelInside) 读写）。
 */
import Handler = laya.utils.Handler;
import Point = laya.maths.Point;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigUI } from "../cfg/ConfigUI";
import { Platform } from "../laya/Platform";
import { ConfigClass } from "../cfg/ConfigClass";
import { EffectManager } from "../manager/EffectManager";
import { MusicManager } from "../utils/MusicManager";
import { AssetsManager } from "../manager/AssetsManager";
import { ModelGame } from "./ModelGame";
import { ModelArena } from "./ModelArena";

export class ModelInside extends ModelBase {

    public mBuildingArr: any[] = null;
    public mScienceArr: any[] = null;
    public mEquipArr: any[] = null;
    public mbuildArmyObj: any = null;

    constructor() {
        super();
        this.on("building_builder_remove", this, this.building_builder_remove),
            this.on("equip_update_remove", this, this.equip_update_remove),
            this.on("science_update_remove", this, this.science_update_remove),
            this.on("event_army_building_train_speed_up", this, this.eventCallBackForBuildArmy, ["update_cd"]),
            this.on("event_change_auto_mk_army", this, this.eventCallBackForBuildArmy, ["auto"]),
            this.setArmyCdObj(2);
    }

    public initCDlistener(): void {
        ConfigServer.system_simple.use_cabinet ? delete ConfigServer.home.building004 : delete ConfigServer.home.building030,
            this.initBuildingArr(),
            this.initEquipArr(),
            this.initScienceArr(),
            Laya.timer.clear(this, this.onTimer),
            Laya.timer.loop(1e3, this, this.onTimer);
    }

    public getBuildingModel(t: string): any {
        var s = ConfigServer.home[t];
        return s ? (!sg.model.ModelBuiding.buildingModels.hasOwnProperty(t) && s && (sg.model.ModelBuiding.buildingModels[t] = new sg.model.ModelBuiding,
            sg.model.ModelBuiding.buildingModels[t].initData(t, s)),
            sg.model.ModelBuiding.buildingModels[t]) : null;
    }

    public getBuildingName(t: string): string {
        if (ConfigServer.home) {
            var s = this.getBuildingModel(t);
            if (s) return s.getName();
        }
        return "";
    }

    public getBuildingLv(t: string): number {
        if (ConfigServer.home) {
            var s = this.getBuildingModel(t);
            if (s) return s.lv;
        }
        return 0;
    }

    public getBuildingModelByArmyType(t: any): any {
        var i,
            s = ConfigServer.army.army_building;
        return s && s[t] && (i = this.getBuildingModel(s[t])),
            i;
    }

    /** o=(Gt.getServerTimer(),0) —— 首求值为丢弃求值，原文精确顺序。 */
    public initBuildingArr(): void {
        this.mBuildingArr = [];
        for (var i,
            s,
            n = ModelManager.instance.modelUser.building_cd_arr,
            h = n.length,
            o = (ConfigServer.getServerTimer(), 0); o < h; o++)
            (i = Tools.getObjValue(n, o, null)) && ((s = this.getBuildingModel(i.id)) && s.isUpgradeIng() && this.mBuildingArr.push(s));
    }

    public initEquipArr(): void {
        this.mEquipArr = [];
        var i,
            s = "";
        ModelManager.instance.modelUser.equip_cd.length > 0 && (s = ModelManager.instance.modelUser.equip_cd[2],
            i = ModelManager.instance.modelGame.getModelEquip(s),
            this.mEquipArr.push(i));
    }

    public initScienceArr(): void {
        this.mScienceArr = [];
        var i,
            s = "";
        if (ModelManager.instance.modelUser.records.hasOwnProperty("science_cd")) {
            var n = ModelManager.instance.modelUser.records.science_cd;
            n.length > 0 && (s = n[0],
                i = ModelManager.instance.modelGame.getModelScience(s),
                this.mScienceArr.push(i));
        }
    }

    /**
     * 建筑按钮装配。if 条件为逗号表达式 `(0==l?(…):1==l?(…):…:4==l&&(…), 5==c)`；
     * 对象 o 原文字面量含重复键 gray:!1（值相同，合并为一次）；6==c 分支
     * `h.visible=!0, h.visible=…` 先赋后覆写为原文精确顺序。
     */
    public checkBuildingView(t: any): any[] {
        var s = this.checkBuildingStatus(t);
        if (s < 0) return [];
        var n: any = {
            visible: !0,
            label: "",
            type: 0,
            gray: !1,
            icon: "",
            name2: 0
        },
            h: any = {
                visible: !1,
                label: "",
                type: 2,
                gray: !1,
                icon: "",
                name2: 0
            },
            o: any = {
                visible: !1,
                label: "",
                type: 3,
                gray: !1,
                icon: "",
                /* 原文此处重复键 gray:!1（同值，合并） */
                text: "",
                name2: 0
            },
            r: any = {
                visible: !1,
                label: "",
                type: 4,
                gray: !1,
                icon: "",
                name2: 0
            },
            a: any = {
                visible: !1,
                label: "",
                type: 5,
                gray: !1,
                icon: "",
                name2: 0
            },
            l = s % 10,
            c = Math.floor(s / 10);
        if (0 == l ? (t.checkIsMaxLv(t.lv + 1) ? (n.label = Tools.getMsgById("_jia0033"),
            n.name2 = 1,
            n.icon = AssetsManager.getAssetLater("home_01.png")) : (n.label = Tools.getMsgById("_building23"),
            n.name2 = 1,
            n.icon = AssetsManager.getAssetLater("home_04.png")), 3 == c ? (h.visible = !0,
            h.label = Tools.getMsgById("_public173"),
            h.name2 = 2,
            h.icon = AssetsManager.getAssetLater(AssetsManager.army_icon_building_ui[t.getArmyType()]),
            o.visible = ModelGame.unlock(null, "army_upgrade").visible,
            o.gray = ModelGame.unlock(null, "army_upgrade").gray,
            o.text = ModelGame.unlock(null, "army_upgrade").text,
            o.label = Tools.getMsgById("_public174"),
            o.name2 = 3,
            o.icon = AssetsManager.getAssetLater("home_36.png")) : 4 == c ? (h.visible = ModelGame.unlock(null, "equip_get").visible,
            h.gray = ModelGame.unlock(null, "equip_get").gray,
            h.label = Tools.getMsgById("_public175"),
            h.name2 = 4,
            h.icon = AssetsManager.getAssetLater("home_03.png"),
            o.visible = ModelGame.unlock(null, "equip_up").visible,
            o.gray = ModelGame.unlock(null, "equip_up").gray,
            o.label = Tools.getMsgById("_equip43"),
            o.name2 = 5,
            o.icon = AssetsManager.getAssetLater("home_08.png"),
            r.visible = ModelGame.unlock(null, "equip_wash").visible,
            r.gray = ModelGame.unlock(null, "equip_wash").gray,
            r.text = ModelGame.unlock(null, "equip_wash").text,
            r.label = Tools.getMsgById("_public177"),
            r.name2 = 6,
            r.icon = AssetsManager.getAssetLater("home_28.png"),
            a.visible = ModelGame.unlock(null, "equip_enhance").visible,
            a.gray = ModelGame.unlock(null, "equip_enhance").gray,
            a.text = ModelGame.unlock(null, "equip_enhance").text,
            a.label = Tools.getMsgById("_enhance09"),
            a.name2 = 7,
            a.icon = AssetsManager.getAssetLater("home_62.png")) : 11 == c && (h.visible = !0,
            h.label = Tools.getMsgById("_public48"),
            h.name2 = 7,
            h.icon = AssetsManager.getAssetLater("home_07.png"),
            o.visible = sg.activities.model.ModelSpArmyBox.active(),
            o.gray = ModelGame.unlock(null, "sp_army").gray,
            o.text = ModelGame.unlock(null, "sp_army").text,
            o.label = Tools.getMsgById("sp_army_box00"),
            o.name2 = 24,
            o.icon = AssetsManager.getAssetLater("home_64.png"))) : 1 == l ? (n.visible = !0,
            n.label = Tools.getMsgById("_building21"),
            n.name2 = 8,
            n.icon = AssetsManager.getAssetLater("home_02.png"),
            t.isEquip() ? (h.visible = ModelGame.unlock(null, "equip_wash").visible,
            h.gray = ModelGame.unlock(null, "equip_wash").gray,
            h.text = ModelGame.unlock(null, "equip_wash").text,
            h.label = Tools.getMsgById("_public177"),
            h.name2 = 6,
            h.icon = AssetsManager.getAssetLater("home_28.png"),
            o.visible = ModelGame.unlock(null, "equip_enhance").visible,
            o.gray = ModelGame.unlock(null, "equip_enhance").gray,
            o.text = ModelGame.unlock(null, "equip_enhance").text,
            o.label = Tools.getMsgById("_enhance09"),
            o.name2 = 7,
            o.icon = AssetsManager.getAssetLater("home_62.png")) : t.isArmy() && (h.visible = ModelGame.unlock(null, "army_upgrade").visible,
            h.gray = ModelGame.unlock(null, "army_upgrade").gray,
            h.text = ModelGame.unlock(null, "army_upgrade").text,
            h.label = Tools.getMsgById("_public174"),
            h.name2 = 3,
            h.icon = AssetsManager.getAssetLater("home_36.png"))) : 2 == l ? (n.visible = !0,
            n.label = Tools.getMsgById("_public178"),
            n.name2 = 9) : 3 == l ? (n.visible = !t.checkIsMaxLv(t.lv + 1),
            n.label = Tools.getMsgById("_building23"),
            n.name2 = 1,
            n.icon = AssetsManager.getAssetLater("home_04.png")) : 4 == l && (n.visible = !0,
            n.label = Tools.getMsgById("_building21"),
            n.name2 = 8,
            n.icon = AssetsManager.getAssetLater("home_02.png")), 5 == c) h.visible = !0,
            h.label = Tools.getMsgById("_public179"),
            h.name2 = 10,
            h.icon = AssetsManager.getAssetLater("home_24.png");
        else if (6 == c) h.visible = !0,
            h.visible = ModelGame.unlock(null, "star_get").visible,
            h.gray = ModelGame.unlock(null, "star_get").gray,
            h.text = ModelGame.unlock(null, "star_get").text,
            h.label = Tools.getMsgById("add_star"),
            h.name2 = 11,
            h.icon = AssetsManager.getAssetLater("home_29.png"),
            o.visible = !0,
            o.visible = ModelGame.unlock(null, "star_resolve").visible,
            o.gray = ModelGame.unlock(null, "star_resolve").gray,
            o.text = ModelGame.unlock(null, "star_resolve").text,
            o.label = Tools.getMsgById("_public180"),
            o.name2 = 12,
            o.icon = AssetsManager.getAssetLater("home_30.png"),
            r.visible = !0,
            r.visible = ModelGame.unlock(null, "prop_resolve").visible,
            r.gray = ModelGame.unlock(null, "prop_resolve").gray,
            r.text = ModelGame.unlock(null, "prop_resolve").text,
            r.label = Tools.getMsgById("add_resolve"),
            r.name2 = 13,
            r.icon = AssetsManager.getAssetLater("home_35.png");
        else if (7 == c) h.visible = !0,
            h.label = Tools.getMsgById("_public44"),
            h.name2 = 14,
            h.icon = AssetsManager.getAssetLater("home_25.png"),
            sg.model.ModelCabinet.instance.isOpen() && (o.visible = !0,
            o.label = Tools.getMsgById("cabinet_text016"),
            o.name2 = 144,
            o.icon = AssetsManager.getAssetLater("home_073.png"));
        else if (8 == c) h.visible = ModelGame.unlock(null, "more_office").visible,
            h.gray = ModelGame.unlock(null, "more_office").gray,
            h.text = ModelGame.unlock(null, "more_office").text,
            h.label = Tools.getMsgById(sg.model.ModelOffice.useOffice37() ? "add_office_37" : "add_office"),
            h.name2 = 15,
            h.icon = AssetsManager.getAssetLater("home_09.png"),
            o.visible = ModelGame.unlock(null, "shogun").visible,
            o.gray = ModelGame.unlock(null, "shogun").gray,
            o.text = ModelGame.unlock(null, "shogun").text,
            o.label = Tools.getMsgById("lvup12_1_name"),
            o.name2 = 16,
            o.icon = AssetsManager.getAssetLater("home_33.png"),
            r.visible = ModelGame.unlock(null, "effort").visible,
            r.gray = ModelGame.unlock(null, "effort").gray,
            r.text = ModelGame.unlock(null, "effort").text,
            r.label = Tools.getMsgById("_jia0015"),
            r.name2 = 17,
            r.icon = AssetsManager.getAssetLater("home_51.png");
        else if (9 == c) h.visible = ModelGame.unlock(null, "pve_climb").visible,
            h.gray = ModelGame.unlock(null, "pve_climb").gray,
            h.text = ModelGame.unlock(null, "pve_climb").text,
            h.label = Tools.getMsgById("add_climb"),
            h.name2 = 18,
            h.icon = AssetsManager.getAssetLater(ConfigApp.isLandscape ? "home_67.png" : "home_32.png"),
            o.visible = ModelGame.unlock(null, "pve_pve").visible,
            o.gray = ModelGame.unlock(null, "pve_pve").gray,
            o.text = ModelGame.unlock(null, "pve_pve").text,
            o.label = Tools.getMsgById("add_pve"),
            o.name2 = 19,
            o.icon = AssetsManager.getAssetLater("home_34.png"),
            r.visible = ModelGame.unlock(null, "merit_exchange").visible,
            r.gray = ModelGame.unlock(null, "merit_exchange").gray,
            r.text = ModelGame.unlock(null, "merit_exchange").text,
            r.label = Tools.getMsgById("merit_exchange001"),
            r.name2 = 38,
            r.icon = AssetsManager.getAssetLater("home106.png");
        else if (10 == c) h.visible = ModelGame.unlock(null, "pvp_pk").visible,
            h.gray = ModelGame.unlock(null, "pvp_pk").gray,
            h.text = ModelGame.unlock(null, "pvp_pk").text,
            h.label = Tools.getMsgById("add_both"),
            h.name2 = 20,
            h.icon = AssetsManager.getAssetLater("home_31.png"),
            o.visible = ModelGame.unlock(null, "pvp_champion").visible,
            o.gray = ModelGame.unlock(null, "pvp_champion").gray,
            o.text = ModelGame.unlock(null, "pvp_champion").text,
            o.label = Tools.getMsgById("add_pk_yard"),
            o.name2 = 21,
            o.icon = AssetsManager.getAssetLater(ConfigApp.isLandscape ? "home_68.png" : "home_33.png"),
            r.visible = sg.cross_pvp.model.ModelCrossPvp.instance.active,
            r.gray = sg.cross_pvp.model.ModelCrossPvp.instance.status === sg.cross_pvp.model.ModelCrossPvp.STATUS_WAIT_PVE,
            r.text = "",
            r.label = Tools.getMsgById("attic_text001"),
            r.name2 = 210,
            r.icon = AssetsManager.getAssetLater("attic_home.png");
        else if (12 == c) h.visible = ModelGame.unlock(null, "legend").visible,
            h.gray = ModelGame.unlock(null, "legend").gray,
            h.text = ModelGame.unlock(null, "legend").text,
            h.label = Tools.getMsgById("_jia0118"),
            h.name2 = 22,
            h.icon = AssetsManager.getAssetLater("home_legend.png");
        else if (13 == c) h.visible = sg.altar.legendAwaken.model.ModelLegendAwaken.instance.open,
            h.gray = !1,
            h.text = "",
            h.label = Tools.getMsgById("500301"),
            h.name2 = 23,
            h.icon = AssetsManager.getAssetLater("home_63.png");
        else if (14 == c) {
            var u = ModelGame.unlock(null, "scheme");
            h.visible = u.visible,
            h.label = Tools.getMsgById("scheme_text0"),
            h.name2 = 24,
            h.icon = AssetsManager.getAssetLater("home_69.png");
            var d = ModelGame.unlock(null, "scheme_box");
            o.visible = d.visible, 0 == <any>sg.model.ModelScheme.isOepn && (h.gray = !0,
            h.text = Tools.getMsgById("scheme_tips4"),
            o.gray = !0,
            o.text = Tools.getMsgById("scheme_tips4")), 0 == <any>h.gray && (h.gray = u.gray,
            h.text = u.text), 0 == <any>o.gray && (o.gray = d.gray,
            o.text = d.text), 0 == <any>o.gray && 0 == <any>sg.model.ModelScheme.hasCanInstallScheme() && (o.gray = !0,
            o.text = Tools.getMsgById("scheme_text21")),
            o.label = Tools.getMsgById("scheme_text1"),
            o.name2 = 25,
            o.icon = AssetsManager.getAssetLater("home_70.png"),
            r.visible = sg.model.ModelSchemeEgg.instance.active,
            r.label = Tools.getMsgById("scheme_egg000"),
            r.name2 = 37,
            r.icon = AssetsManager.getAssetLater("home104.png");
        } else if (15 == c) h.visible = ModelGame.unlock(null, "legend").visible,
            h.gray = ModelGame.unlock(null, "legend").gray,
            h.text = ModelGame.unlock(null, "legend").text,
            h.label = Tools.getMsgById("60027"),
            h.name2 = 26,
            h.icon = AssetsManager.getAssetLater(ConfigApp.isLandscape ? "home_72.png" : "home67.png"),
            o.visible = h.visible,
            o.label = Tools.getMsgById("revive_0038"),
            o.name2 = 27,
            o.icon = AssetsManager.getAssetLater(ConfigApp.isLandscape ? "home_73.png" : "home69.png"),
            r.visible = h.visible,
            r.label = Tools.getMsgById("food_king_001"),
            r.gray = sg.model.ModelDoomTower.getDoomLv() < ConfigServer.gwent.doom_tower.soul_lock,
            r.name2 = 28,
            r.icon = AssetsManager.getAssetLater(ConfigApp.isLandscape ? "home_74.png" : "home68.png");
        else if (16 == c) {
            h.visible = sg.god.model.ModelGodMain.instance.active,
            h.label = Tools.getMsgById("god_0003"),
            h.icon = AssetsManager.getAssetLater("home70.png"),
            h.name2 = 29;
            var _ = ModelGame.unlock(null, "kunlun");
            o.visible = _.visible && sg.kunlun.model.ModelKunlun.intance.checkActive(),
            o.name2 = 30,
            o.gray = _.gray,
            o.text = _.text,
            o.label = Tools.getMsgById("gods_title001"),
            o.icon = AssetsManager.getAssetLater("home71.png");
        } else 17 == c ? (h.visible = sg.jigsaw.model.ModelJigsaw.instance.active,
            h.label = Tools.getMsgById("jigsaw_0004"),
            h.icon = AssetsManager.getAssetLater("home93.png"),
            h.name2 = 31,
            o.visible = sg.jigsaw.model.ModelJigsaw.instance.active,
            o.label = Tools.getMsgById("jigsaw_0003"),
            o.icon = AssetsManager.getAssetLater("home94.png"),
            o.name2 = 32) : 18 == c ? (h.visible = sg.heritage.ModelHeritage.instance.active,
            h.label = Tools.getMsgById("heritage_text002"),
            h.icon = AssetsManager.getAssetLater("home98.png"),
            h.name2 = 33,
            o.visible = h.visible,
            o.label = Tools.getMsgById("heritage_text006"),
            o.icon = AssetsManager.getAssetLater("home97.png"),
            o.name2 = 34,
            r.visible = h.visible,
            r.label = Tools.getMsgById("heritage_text017"),
            r.icon = AssetsManager.getAssetLater("home99.png"),
            r.name2 = 35) : 19 == c && (n.visible = !1,
            h.visible = sg.seaRoute.ModelSeaRoute.instance.active,
            h.label = Tools.getMsgById("navigate039"),
            h.icon = AssetsManager.getAssetLater("home101.png"),
            h.name2 = 36);
        return [n, {
            visible: !1,
            label: "",
            type: 1,
            gray: !1,
            icon: "",
            name2: 0
        },
        h,
        o,
        r,
        a];
    }

    public getBase(): any {
        return this.getBuildingModel("building001");
    }

    public getArmyBuildings(): any[] {
        var i = [];
        for (var s in sg.model.ModelBuiding.buildingModels) {
            var n = sg.model.ModelBuiding.buildingModels[s];
            n.isArmy() && i.push(n);
        }
        return i;
    }

    public updateBaseBuilding(): void {
        ModelManager.instance.modelGame.inHome && this.getBase().event("building_status_change");
    }

    /**
     * 建筑状态机：n = 状态位（个位）+ 类型位（十位）。装备分支的三元链与科技分支
     * `a.isUpgradeIng()>-1?(…):(n=110,…&&(n=113))` 为原文条件表达式，逐项对应。
     */
    public checkBuildingStatus(t: any, i?: any): number {
        void 0 === i && (i = !1);
        var n = -1,
            h = 1;
        if (t.lv <= 0) n = -1;
        else {
            if (this.checkBuildingIsIng(t)) {
                if (n = 11,
                    h = 1,
                    i) return n;
            } else {
                if (h = 0,
                    n = 10,
                    i) return n;
                if (t.produce >= 0) n = t.getMyGift(t.lv) > 0 ? 22 : 20;
                else if (t.isArmy()) n = t.getMakingArmyLastTimer() > 0 ? 31 : t.getArmyMakingNum() > 0 ? 32 : 30;
                else if (t.isEquip()) {
                    var o = sg.model.ModelEquip.getCDingModel();
                    if (o) {
                        var r = o.getLastCDtimer() <= 0;
                        n = o.isUpgradeIng() > -1 ? r ? 42 : 41 : 40;
                    } else n = 40;
                } else if (t.isScience()) {
                    var a = sg.model.ModelScience.getCDingModel();
                    if (a) {
                        var l = a.getLastCDtimer() <= 0;
                        a.isUpgradeIng() > -1 ? sg.model.ModelScience.check_science_day_get() ? n = 113 : l ? n = 112 : (n = 111,
                            sg.model.ModelScience.check_science_day_get() && (n = 114)) : (n = 110,
                            sg.model.ModelScience.check_science_day_get() && (n = 113));
                    } else n = 110,
                        sg.model.ModelScience.check_science_day_get() && (n = 113);
                } else n = 10;
            }
            t.isPubHero() ? n = 50 + h : t.isStarRuneHero() ? n = 60 + h : t.isBagagage() ? n = 70 + h : t.isBase() ? n = 80 + h : t.isPVE() ? (n = 90 + h,
                ModelManager.instance.modelClimb.isGetAward() && (n = 93)) : t.isPVP() ? n = 100 + h : t.isAltar() ? n = 120 + h : t.isAwaken() ? n = 130 + h : t.isScheme() ? n = 140 + h : t.isRevivedTower() ? n = 150 + h : t.isKunlun() ? n = 160 + h : t.isJigsaw() ? n = 170 + h : t.isHeritage() ? n = 180 + h : t.isSeaRoute() && (n = 190 + h);
        }
        return n;
    }

    /**
     * 建筑点击分发。结构（AST 已核）：if(r<0){ 免费直升早返回；if(h>=0&&h<2){ 巨型
     * else-if 链；return } r=0 }（r=0 为 h∉[0,2) 可达回退）；随后 if(1!=r){…}
     * else showView(VIEW_BUILDING_INFO,t)。
     */
    public checkBuildingFunc(t: any, i?: any): void {
        void 0 === i && (i = 0);
        var n = this.checkBuildingStatus(t),
            h = n % 10,
            o = Math.floor(n / 10),
            r = i;
        if (r < 0) {
            if (1 == h && t.isFreeCanUse()) return void t.netUpgrade({
                item_id: -2,
                item_num: 1,
                bid: t.id
            },
                null);
            if (h >= 0 && h < 2) {
                if (t.isPubHero()) sg.boundFor.GotoManager.boundForPanel("pub");
                else if (t.isStarRuneHero()) ViewManager.instance.showView(ConfigClass.VIEW_STAR_GET);
                else if (t.isScience()) {
                    var a = sg.model.ModelScience.getCDingModel(),
                        l = a && a.isUpgradeIng() > -1 && a.getLastCDtimer() <= 0,
                        c = sg.model.ModelScience.check_science_day_get();
                    l ? this.checkScienceGet() : c ? this.checkScienceDayGet() : sg.boundFor.GotoManager.boundForPanel("science_main");
                } else {
                    if (t.isBase()) sg.model.ModelOffice.checkOfficeCanUp() ? sg.boundFor.GotoManager.boundForPanel("office") : sg.model.ModelShogun.isOpen() && sg.model.ModelShogun.redPoint() ? sg.boundFor.GotoManager.boundForPanel("shogun_main") : ModelManager.instance.modelAchievement.hasNewAchieve() && sg.boundFor.GotoManager.boundForPanel("achievement");
                    else if (t.isBagagage()) (sg.model.ModelBuiding.isBaggageBubble() || sg.model.ModelBuiding.isBaggageBubble1()) && sg.boundFor.GotoManager.boundForPanel("bagagage");
                    else if (t.isArmy()) sg.boundFor.GotoManager.boundForPanel("army_upgrade",
                        t.id);
                    else if (t.isAltar()) ViewManager.instance.showView(ConfigApp.isLandscape ? ConfigClass.VIEW_LEGEND_H : ConfigClass.VIEW_LEGEND);
                    else if (t.isAwaken()) ViewManager.instance.showView(ConfigClass.VIEW_LEGEND_AWAKEN);
                    else if (t.isRevivedTower()) sg.model.ModelDoomTower.getDoomLv() < ConfigServer.gwent.doom_tower.soul_lock ? sg.boundFor.GotoManager.boundForPanel("revived_tower") : sg.boundFor.GotoManager.boundForPanel("food_king");
                    else if (t.isKunlun()) sg.kunlun.model.ModelWilderness.instance.checkHookCanGet() ? sg.kunlun.model.ModelWilderness.instance.wilderness_hook_reward() : ViewManager.instance.showView(ConfigClass.VIEW_KUNLUN_MAIN);
                    else if (t.isJigsaw()) sg.jigsaw.model.ModelJigsaw.instance.showAdmireBubble ? ViewManager.instance.showView(ConfigClass.VIEW_ADMIRE_MAIN) : sg.jigsaw.model.ModelJigsaw.instance.showMeditationBubble && ViewManager.instance.showView(ConfigClass.VIEW_MEDITATION_MAIN);
                    else if (t.isHeritage()) {
                        var u = sg.heritage.ModelHeritage.instance.getBabbleData();
                        u[0] && ViewManager.instance.showView(u[2][0],
                            u[2][1]);
                    } else t.isSeaRoute() ? ViewManager.instance.showView(ConfigClass.VIEW_SEAROUTE_MAIN) : t.isScheme() ? sg.model.ModelSchemeEgg.instance.haveDailyReward && sg.model.ModelSchemeEgg.instance.netSchemeEggDailyReward() : t.isPVE() && sg.model.ModelMeritExchange.instance.redPoint && ViewManager.instance.showView(sg.meritExchange.ViewMeritExchange);
                }
                return;
            }
            r = 0;
        }
        if (1 != r)
            if (n < 0) t.lv <= 0 && (t.checkPay().length > 0 ? sg.boundFor.GotoManager.boundForPanel("ViewBuildingUpgrade", "",
                t) : this.building_lv_up(t, 1,
                    null));
            else {
                if (0 == h)
                    0 == r && (t.checkIsMaxLv(t.lv + 1) ? sg.boundFor.GotoManager.boundForPanel("ViewBuildingInfoTips", "",
                        t) : sg.boundFor.GotoManager.boundForPanel("ViewBuildingUpgrade", "",
                            t)),
                        3 == o ? 2 == r ? t.getArmyNum() >= t.getArmyNumMax() ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_building60",
                            [t.getArmyNumMax(),
                            t.getArmyNum()])) : 1 === ConfigUI.buildInfo ? ViewManager.instance.showView(ConfigClass.VIEW_ARMY_MAKE_NEW,
                                t) : ViewManager.instance.showView(ConfigClass.VIEW_ARMY_MAKE,
                                    t) : 3 == r && sg.boundFor.GotoManager.boundForPanel("army_upgrade",
                                        t.id) : 4 == o ? 2 == r ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                                            [0, ""]) : 3 == r ? Tools.getDictLength(ModelManager.instance.modelUser.equip, !0) > 0 ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                                                [1, ""]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_building61")) : 4 == r ? Tools.getDictLength(ModelManager.instance.modelUser.equip, !0) > 0 ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                                                    [2, ""]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_building61")) : 5 == r && (Tools.getDictLength(ModelManager.instance.modelUser.equip, !0) > 0 ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                                                        [3, ""]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_building61"))) : 11 == o && (2 == r ? sg.boundFor.GotoManager.boundForPanel("science_main") : 3 == r && ViewManager.instance.showView(ConfigClass.VIEW_HERO_SP_ARMY,
                                                            [-1, ""]));
                else if (1 == h)
                    if (0 == r) 3 == o ? ViewManager.instance.showView(ConfigClass.VIEW_ARMY_QUICKLY,
                        t) : 4 == o ? ViewManager.instance.showView(ConfigClass.VIEW_EQUIP_QUICKLY,
                            sg.model.ModelEquip.getCDingModel()) : 11 == o ? ViewManager.instance.showView(ConfigClass.VIEW_SCIENCE_QUICKLY,
                                sg.model.ModelScience.getCDingModel()) : ViewManager.instance.showView(ConfigClass.VIEW_BUILDING_QUICKLY,
                                    t);
                    else if (2 == r) {
                        if (t.isEquip()) Tools.getDictLength(ModelManager.instance.modelUser.equip, !0) > 0 ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                            [2, ""]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_building61"));
                        else if (t.isArmy()) {
                            if (ModelGame.unlock(null, "army_upgrade").stop) return;
                            sg.boundFor.GotoManager.boundForPanel("army_upgrade",
                                t.id);
                        }
                    } else 3 == r && t.isEquip() && (Tools.getDictLength(ModelManager.instance.modelUser.equip, !0) > 0 ? sg.boundFor.GotoManager.boundForPanel("view_equip_main", "",
                        [3, ""]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_building61")));
                else 2 == h ? 0 == r && (2 == o ? this.checkProduce(t.produce) : 3 == o ? this.checkArmyGetNum(t) : 4 == o ? this.checkEquipGet() : 11 == o && this.checkScienceGet()) : 3 == h && 0 == r && 11 == o && this.checkScienceDayGet();
                if (5 == o) 2 == r && sg.boundFor.GotoManager.boundForPanel("pub");
                else if (6 == o) 2 == r ? ViewManager.instance.showView(ConfigClass.VIEW_STAR_GET) : 3 == r ? ViewManager.instance.showView(ConfigClass.VIEW_STAR_RESOLVE) : 4 == r && sg.boundFor.GotoManager.boundForPanel("prop_resolve");
                else if (7 == o) 2 == r ? sg.boundFor.GotoManager.boundForPanel("bagagage", "", 0) : 3 == r && sg.boundFor.GotoManager.boundForPanel("bagagage", "", 1);
                else if (8 == o) 2 == r ? sg.boundFor.GotoManager.boundForPanel("office") : 3 == r ? sg.boundFor.GotoManager.boundForPanel("shogun_main") : 4 == r && sg.boundFor.GotoManager.boundForPanel("achievement");
                else if (9 == o) 2 == r ? sg.boundFor.GotoManager.boundForPanel("climb") : 3 == r ? sg.boundFor.GotoManager.boundForPanel("pve") : 4 == r ? ViewManager.instance.showView(sg.meritExchange.ViewMeritExchange) : 0 == r && ModelManager.instance.modelClimb.isGetAward() && ModelManager.instance.modelClimb.getClimbAwardToMe(null);
                else if (10 == o) {
                    if (2 == r) sg.boundFor.GotoManager.boundForPanel("pk");
                    else if (3 == r) sg.boundFor.GotoManager.boundForPanel("pk_yard");
                    else if (4 == r) {
                        if (sg.cross_pvp.model.ModelCrossPvp.instance.status === sg.cross_pvp.model.ModelCrossPvp.STATUS_WAIT_PVE) return void ViewManager.instance.showTipsTxt(sg.cross_pvp.model.ModelCrossPvp.instance.timeTips);
                        sg.boundFor.GotoManager.boundForPanel("cross_pvp");
                    }
                } else if (12 == o) 2 == r && sg.boundFor.GotoManager.boundForPanel("legend");
                else if (13 == o) 2 == r && (sg.altar.legendAwaken.model.ModelLegendAwaken.instance.drawOpen ? sg.boundFor.GotoManager.boundForPanel("legend_awaken") : ViewManager.instance.showTipsTxt(Tools.getMsgById("500310")));
                else if (14 == o) 2 == r ? sg.boundFor.GotoManager.boundForPanel("scheme") : 3 == r ? sg.boundFor.GotoManager.boundForPanel("scheme_box") : 4 == r && sg.boundFor.GotoManager.boundForPanel("scheme_egg");
                else if (15 == o) {
                    if (2 == r) sg.boundFor.GotoManager.boundForPanel("revived_tower");
                    else if (3 == r) sg.boundFor.GotoManager.boundForPanel("dragon_soul");
                    else if (4 == r) {
                        var d = ConfigServer.gwent.doom_tower.soul_lock;
                        if (sg.model.ModelDoomTower.getDoomLv() < d) return void ViewManager.instance.showTipsTxt(Tools.getMsgById("revive_0005",
                            [d]));
                        sg.boundFor.GotoManager.boundForPanel("food_king");
                    }
                } else 16 == o ? 2 == r ? sg.boundFor.GotoManager.boundForPanel("god") : 3 == r && ViewManager.instance.showView(ConfigClass.VIEW_KUNLUN_MAIN) : 17 == o ? 2 == r ? ViewManager.instance.showView(ConfigClass.VIEW_ADMIRE_MAIN) : 3 == r && ViewManager.instance.showView(ConfigClass.VIEW_MEDITATION_MAIN) : 18 == o ? 2 == r ? ViewManager.instance.showView(ConfigClass.VIEW_HERITAGE_MAIN) : 3 == r ? ViewManager.instance.showView(ConfigClass.VIEW_HERITAGE_GACHA) : 4 == r && ViewManager.instance.showView(ConfigClass.VIEW_HERITAGE_SHOP) : 19 == o && 2 == r && ViewManager.instance.showView(ConfigClass.VIEW_SEAROUTE_MAIN);
            }
        else ViewManager.instance.showView(ConfigClass.VIEW_BUILDING_INFO,
            t);
    }

    public building_lv_up(t: any, i: any, s: any): void {
        var h: any = {
            bid: t.id,
            cost: i
        };
        ConfigApp.pf == "h5_37_yuewan" && (h.pf_data = Platform.pf_login_data),
            NetSocket.instance.send("building_lvup",
                h,
                Handler.create(this,
                    this.ws_sr_building_lv_up,
                    [t,
                        s]));
    }

    /**
     * h["building_lv"] / h["get_building_material"] 为本类未声明静态计数器
     * （(<any>ModelInside) 读写）；if 条件首段为丢弃求值（原文逗号表达式）。
     */
    public ws_sr_building_lv_up(t: any): void {
        Platform.uploadActionData(33,
            [t.sendData.bid,
            t.sendData.cost]);
        var s = t.otherData[0],
            n = t.otherData[1];
        if (!ModelManager.instance.modelGame.inHome && ((<any>ModelInside).building_lv = ((<any>ModelInside).building_lv || 0) + 1), 0 != t.receiveData) {
            var o = parseInt(t.sendData.cost),
                r = s.lv;
            if (ModelManager.instance.modelProp.buildUpGift = t.receiveData.gift_dict,
                ModelManager.instance.modelUser.updateData(t.receiveData),
                ViewManager.instance.showReward(t.receiveData.gift_dict, !1), !ConfigApp.isLandscape && s.isArmy() && r >= 1) {
                var a = sg.model.ModelBuiding.getArmyBuildingLvCfg(s.id,
                    r),
                    l = sg.model.ModelBuiding.getArmyBuildingLvCfg(s.id,
                        r + 1);
                if (a && l && l[3] != a[3]) {
                    var c = sg.model.ModelPrepare.getArmyRankData(s.getArmyType(),
                        a[3]),
                        u = sg.model.ModelPrepare.getArmyRankData(s.getArmyType(),
                            l[3]);
                    ViewManager.instance.showViewEffect(sg.view.effect.ArmyUpgrade.getEffect(s,
                        c,
                        u,
                        l[3]));
                }
            }
            s.upOneLv(r);
            var d,
                _ = !1;
            if (s.isBase() && s.lv > r && (_ = !0,
                ModelManager.instance.modelAchievement.refreshData(ModelManager.instance.modelUser.effort)), 0 == o) this.upgradeBuildingCD(s);
            else s.upgradeEnd(1);
            if (s.isBase())
                for (var m in ModelManager.instance.modelUser.home) (d = ModelManager.instance.modelInside.getBuildingModel(m)) && (d.lv < 1 && d.canUpgrade(1) && d.id != s.id || d.lv > 0 && d.canUpgrade(d.lv + 1)) && d.updateStatus();
            else this.updateBaseBuilding();
            n && n.run();
            var g = ConfigServer.system_simple.func_open.map_visit;
            g[0] >= 0 && this.getBuildingModel(g[4]).lv == g[3] && ModelManager.instance.modelGame.getCityVisit(),
                s.isBase() && _ && Platform.uploadUserData(2,
                    [s.lv]);
        } else ViewManager.instance.showTipsTxt(Tools.getMsgById("_building62"));
    }

    public checkArmyGetNum(t: any): void {
        NetSocket.instance.send("get_building_army", { bid: t.id },
            Handler.create(this,
                this.ws_sr_get_building_army));
    }

    public ws_sr_get_building_army(t: any): void {
        MusicManager.playSoundUI("army_complete");
        var s = this.getBuildingModel(t.sendData.bid);
        if (ModelManager.instance.modelGame.inHome) {
            var n = sg.boundFor.GotoManager.getBuild(s.id).localToGlobal(new Point(0, 0));
            EffectManager.textFlight(s.getArmyMakingNum() + "", "",
                n.x,
                n.y,
                ViewManager.instance.mLayerClip);
        }
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.event("army_building_train_get",
                this.getBuildingModel(t.sendData.bid)),
            this.getBuildingModel(t.sendData.bid).armyMakeOKreadyGet = !1,
            this.getBuildingModel(t.sendData.bid).event("building_status_change",
                this.getBuildingModel(t.sendData.bid)),
            ModelManager.instance.modelInside.event("event_army_building_train_speed_up");
    }

    public checkProduce(t: number): void {
        ConfigServer.system_simple.material_all_get ? NetSocket.instance.send("get_building_material", { produce: -1 },
            Handler.create(this,
                this.ws_sr_get_building_material), -1) : NetSocket.instance.send("get_building_material", { produce: t },
                    Handler.create(this,
                        this.ws_sr_get_building_material),
                    t);
    }

    public ws_sr_get_building_material(t: any): void {
        MusicManager.playSoundUI("get_material");
        var s,
            n = [],
            o = NaN;
        if (-1 == t.otherData)
            for (var r = 0; r < sg.model.ModelBuiding.check_produce_id.length; r++)
                for (var a in sg.model.ModelBuiding.check_produce_id[r]) (o = (s = this.getBuildingModel(a)).getMyGift(s.lv)) > 0 && !s.isUpgradeIng() && n.push([s, o]);
        else
            for (var l in sg.model.ModelBuiding.check_produce_id[t.otherData]) (o = (s = this.getBuildingModel(l)).getMyGift(s.lv)) > 0 && !s.isUpgradeIng() && n.push([s, o]);
        ModelManager.instance.modelUser.updateData(t.receiveData);
        for (var c,
            u = n.length,
            d = 0; d < u; d++)
            if ((c = n[d][0]).checkProduceTips(),
                this.event("building_gift_produce_ok",
                    c),
                c.event("building_status_change",
                    c), -1 != t.otherData) {
                var _ = {};
                if (_[sg.model.ModelBuiding.material_type[c.produce + 1]] = n[d][1],
                    ModelManager.instance.modelGame.inHome) {
                    var m = ModelManager.instance.modelHome.builds[c.id].view.localToGlobal(new Point(0, 0));
                    ViewManager.instance.showIcon(_,
                        m.x,
                        m.y - 80);
                }
            }
        -1 == t.otherData && ViewManager.instance.showRewardPanel(t.receiveData.gift_dict), !ModelManager.instance.modelGame.inHome && ((<any>ModelInside).get_building_material = ((<any>ModelInside).get_building_material || 0) + 1);
    }

    public checkEquipGet(): void {
        NetSocket.instance.send("get_equip_cd", {},
            Handler.create(this,
                this.ws_sr_get_equip_cd));
    }

    public ws_sr_get_equip_cd(t: any): void {
        var s = ModelManager.instance.modelUser.equip_cd.length < 4,
            n = sg.model.ModelEquip.getCDingModel(),
            h = n.isMine();
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.event("equip_update_get",
                n),
            this.getBuilding002().event("building_status_change",
                this.getBuilding002()),
            h ? (s ? (MusicManager.playSoundUI("get_material"),
                ViewManager.instance.showViewEffect(sg.view.effect.EquipUpgrade.getEffect(n))) : ViewManager.instance.showViewEffect(sg.view.effect.EquipUpgradeLoser.getEffect(n,
                    t.receiveData.gift)),
                sg.model.ModelEquip.checkUpgradeEquipId(n.id)) : (MusicManager.playSoundUI("get_material"),
                    ViewManager.instance.showViewEffect(sg.view.effect.EquipGet.getEffect(n))),
            sg.guide.view.GuideFocus.focusOut();
    }

    public checkScienceDayGet(): void {
        NetSocket.instance.send("get_science_reward", {},
            Handler.create(this,
                this.ws_sr_get_science_reward));
    }

    public ws_sr_get_science_reward(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.getBuilding003().event("building_status_change",
                this.getBuilding003()),
            ViewManager.instance.showRewardPanel(t.receiveData.gift_dict);
    }

    public checkScienceGet(t?: any): void {
        void 0 === t && (t = "");
        if ("" != t) {
            var s = ModelManager.instance.modelGame.getModelScience(t);
            s.checkUpdateBuilding(),
                ViewManager.instance.showTipsTxt(Tools.getMsgById("_building63",
                    [s.getName()]));
        } else NetSocket.instance.send("get_science", {},
            Handler.create(this,
                this.ws_sr_get_science), {});
    }

    public ws_sr_get_science(t: any): void {
        var s = sg.model.ModelScience.getCDingModel();
        ModelManager.instance.modelUser.updateData(t.receiveData),
            s && (s.checkUpdateBuilding(),
                ViewManager.instance.showTipsTxt(Tools.getMsgById("_building63",
                    [s.getName()]))),
            this.event("science_update_get",
                s),
            this.getBuilding003().event("building_status_change"),
            ModelManager.instance.modelGame.event("science_change_status",
                [1]);
    }

    public getBuilding002(): any {
        return this.getBuildingModel("building002");
    }

    public getBuilding003(): any {
        return this.getBuildingModel("building003");
    }

    public checkBuildingIsIng(t: any): boolean {
        for (var i,
            n = !1,
            h = ConfigServer.getServerTimer(),
            o = ModelManager.instance.modelUser.building_cd_arr,
            r = 0,
            a = 0; a < o.length; a++)
            if (i = o[a],
                r = Number(i.cd),
                i.id + "" == t.id && r > h) {
                n = !0;
                break;
            }
        return n;
    }

    public checkBuilderArrCanUse(): boolean {
        var i = !1,
            s = this.mBuildingArr.length;
        if (s <= 0) return !0;
        for (var n = 0; n < s; n++)
            if (!this.mBuildingArr[n].isUpgradeIng()) {
                i = !0;
                break;
            }
        return i;
    }

    public upgradeBuildingCD(t: any): boolean {
        return this.mBuildingArr.push(t),
            this.event("building_builder_add",
                t),
            t.event("building_status_change"), !1;
    }

    public equip_update_remove(): void {
        this.mEquipArr = [],
            this.getBuilding002().event("building_status_change");
    }

    public science_update_remove(): void {
        this.mScienceArr = [],
            this.getBuilding003().event("building_status_change");
    }

    public upgradeEquipCDByArr(): void {
        this.upgradeEquipCD(sg.model.ModelEquip.getCDingModel());
    }

    public upgradeScienceCDByArr(): void {
        this.upgradeScienceCD(sg.model.ModelScience.getCDingModel());
    }

    public upgradeEquipCD(t: any): boolean {
        return this.mEquipArr.push(t),
            this.event("equip_builder_add",
                t),
            this.getBuilding002().event("building_status_change"), !1;
    }

    public upgradeScienceCD(t: any): boolean {
        return this.mScienceArr.push(t),
            this.event("science_builder_add",
                t),
            this.getBuilding003().event("building_status_change"), !1;
    }

    /** 每秒巡检 + 每日刷新链。`ue.instance.modelUser;` 为原文丢弃求值，如实保留。 */
    public onTimer(): void {
        var t,
            i;
        if (this.mBuildingArr) {
            var h;
            for (var o in this.mBuildingArr) (h = this.mBuildingArr[o]).upgradeIng();
            for (var r in ModelManager.instance.modelUser.home)
                if (h = this.getBuildingModel(r))
                    if (h.produce >= 0 && h.lv > 0) h.checkProduceTips() && (this.event("building_gift_produce_ready",
                        h),
                        h.event("building_status_change"));
                    else {
                        if (!h.isArmy()) continue;
                        h.armyTrainMakeIng();
                    }
        }
        if (this.mEquipArr)
            for (var a in this.mEquipArr) (t = this.mEquipArr[a]) && t.upgradeIng();
        if (this.mScienceArr)
            for (var l in this.mScienceArr) (i = this.mScienceArr[l]) && i.upgradeIng();
        var c = ModelManager.instance.modelUser.getGameDate();
        if (c > ModelManager.instance.modelUser.loginDateNum) {
            ModelManager.instance.modelUser.loginDateNum = c,
                ModelManager.instance.modelGame.getWorldLv(),
                ModelManager.instance.modelGame.updateNewVisit(),
                Trace.log("modeluser派发新的一天"),
                ModelManager.instance.modelUser.event("event_is_new_day"),
                ModelManager.instance.modelInside.getBuildingModel("building003").updateStatus(),
                ModelManager.instance.modelInside.getBuildingModel(sg.model.ModelBuiding.getBaggageId()).updateStatus(),
                ModelManager.instance.modelChat.initLocalMsgTime(),
                ModelManager.instance.modelChat.initPKYardNewLocalMsgTime(),
                ModelManager.instance.modelCountryPvp.initPvpData(!0),
                ModelManager.instance.modelCountryPvp.clearXYZ(),
                ModelManager.instance.modelCountryPvp.showTrbutaryView(),
                ModelManager.instance.modelNewTask.getNewTaskData(),
                sg.model.ModelChampion.instance.updateData();
            var u = [];
            sg.model.ModelHonour.instance.isOpen() && u.push("honour_hero", "honour_log", "honour_task");
            ModelManager.instance.modelUser;
            u.length > 0 && Laya.timer.once(500,
                this,
                function () {
                    ModelManager.instance.modelUser.checkUserData(u,
                        function () {
                            sg.model.ModelHonour.instance.checkHonour();
                        });
                }),
                ModelManager.instance.modelUser.resetCredit();
        }
        ModelManager.instance.modelGame.updateMyEstateStatus(),
            ModelManager.instance.modelGame.updateMyVisitStatus(),
            ModelManager.instance.modelGame.updateMyCityBuildStatus(),
            ModelManager.instance.modelClub.checkFight(),
            ModelManager.instance.modelChat.checkLoacalMessage(),
            ModelManager.instance.modelCountryPvp.checkShowPush(),
            ModelArena.instance.showPushView(),
            this.checkAutoArmy(),
            ModelManager.instance.modelGame.updateArmyScienceHammer();
    }

    public building_builder_remove(t: any): void {
        for (var i = -1,
            n = 0; n < this.mBuildingArr.length; n++)
            if (this.mBuildingArr[n].id == t.id) {
                i = n;
                break;
            }
        i >= 0 && this.mBuildingArr.splice(i, 1);
    }

    public get_cd_list_building(t: any): any {
        return Tools.getTimeStamp(Tools.getObjValue(ModelManager.instance.modelUser.building_cd,
            t,
            null));
    }

    public buildingUpgradeMax(): number {
        return 1 + sg.model.ModelOfficeRight.func_buildworkerNum();
    }

    public autoGetArmy(t: any): void {
        var s = this,
            n = ModelManager.instance.modelInside.getBuildingModel(t),
            h = n.getArmyMakingNum(),
            o = n.getMakingArmyLastTimer();
        h > 0 && o <= 0 && (this.setArmyCdObj(2),
            NetSocket.instance.send("get_building_army", { bid: t },
                Handler.create(this,
                    function (e) {
                        s.ws_sr_get_building_army(e),
                            s.autoMakeArmy(t);
                    })));
    }

    public autoMakeArmy(t: any): void {
        var s = this,
            n = ModelManager.instance.modelInside.getBuildingModel(t);
        if (0 == n.getArmyBuildingStatus()) {
            this.setArmyCdObj(2);
            var h = n.getArmyCanMakeNumMax();
            NetSocket.instance.send("building_make_army", {
                bid: t,
                if_cost: 0,
                army_mk_num: h
            },
                Handler.create(this,
                    function (t) {
                        ModelManager.instance.modelUser.updateData(t.receiveData),
                            n.updateStatus(!0),
                            s.setArmyCdObj(0);
                    }));
        } else this.setArmyCdObj(1,
            t,
            -1);
    }

    public setArmyCdObj(t?: any, i?: any, s?: any): void {
        if (void 0 === t && (t = 0),
            void 0 === i && (i = ""),
            void 0 === s && (s = 0), 0 == t) {
            this.mbuildArmyObj = {};
            for (var h = 0,
                o = sg.model.ModelOfficeRight.rightTypeAvailable("autotrain"),
                r = 0; r < sg.model.ModelBuiding.army_type_building.length; r++) {
                var a = sg.model.ModelBuiding.army_type_building[r];
                if (o && 0 != ModelManager.instance.modelUser.records.auto_mk_army) {
                    var l = ModelManager.instance.modelInside.getBuildingModel(a),
                        c = l.getArmyBuildingStatus(),
                        u = l.getMakingArmyLastTimer();
                    this.mbuildArmyObj[a] = 0 == c ? 0 : 1 == c || 2 == c || 5 == c ? -1 : 3 == c ? u : 4 == c ? -2 : -1;
                } else this.mbuildArmyObj[a] = -1;
                h += -1 == this.mbuildArmyObj[a] ? 1 : 0;
            }
            4 == h && 1 == ModelManager.instance.modelUser.records.auto_mk_army && this.change_auto_mk_army(0);
        } else if (1 == t) this.mbuildArmyObj[i] = s;
        else {
            this.mbuildArmyObj = {};
            for (var d = 0; d < sg.model.ModelBuiding.army_type_building.length; d++) {
                var _ = sg.model.ModelBuiding.army_type_building[d];
                this.mbuildArmyObj[_] = -1;
            }
        }
    }

    public checkAutoArmy(): void {
        if (ModelManager.instance.modelInside.getArmyBuildings().every(function (i) {
            if (i.getArmyNum() >= i.getArmyNumMax()) return !0;
            var s = i.getArmyCanMakeNumMax();
            return s < 100 || -1 === i.getArmyMakePayCheck(s)[3];
        })) this.change_auto_mk_army(0, !0);
        else {
            for (var i in this.mbuildArmyObj) {
                if (0 == this.mbuildArmyObj[i]) {
                    this.autoMakeArmy(i);
                    break;
                }
                if (this.mbuildArmyObj[i] < -1) {
                    this.autoGetArmy(i);
                    break;
                }
            }
            for (var s in this.mbuildArmyObj)
                this.mbuildArmyObj[s] >= 0 && this.setArmyCdObj(1,
                    s,
                    ModelManager.instance.modelInside.getBuildingModel(s).getMakingArmyLastTimer());
        }
    }

    public eventCallBackForBuildArmy(t: any): void {
        switch (t) {
            case "update_cd":
                this.setArmyCdObj(0);
                break;
            case "auto":
                var s = ModelManager.instance.modelUser.records.auto_mk_army;
                this.setArmyCdObj(0 == s ? 2 : 0);
        }
    }

    public sendChangeAutoMkArmy(): void {
        var i = ModelManager.instance.modelUser.records.auto_mk_army,
            s = 0;
        if (0 == i) {
            for (var n = 0; n < sg.model.ModelBuiding.army_type_building.length; n++) {
                var h = sg.model.ModelBuiding.army_type_building[n],
                    o = ModelManager.instance.modelInside.getBuildingModel(h).getArmyBuildingStatus();
                s += -1 == o || 1 == o || 2 == o || 5 == o ? 1 : 0;
            }
            if (4 == s) return void ViewManager.instance.showTipsTxt(Tools.getMsgById("193010"));
        }
        i = 0 == i ? 1 : 0,
            this.change_auto_mk_army(i, !0);
    }

    public change_auto_mk_army(t: any, i?: any): void {
        void 0 === i && (i = !1),
            ModelManager.instance.modelUser.records.auto_mk_army != t && NetSocket.instance.send("change_auto_mk_army", { status: t },
                new Handler(this,
                    function (t) {
                        ModelManager.instance.modelUser.records.auto_mk_army = t.sendData.status,
                            ModelManager.instance.modelInside.event("event_change_auto_mk_army"),
                            t.otherData.showTips && (1 == ModelManager.instance.modelUser.records.auto_mk_army ? ViewManager.instance.showTipsTxt(Tools.getMsgById("193015")) : ViewManager.instance.showTipsTxt(Tools.getMsgById("193016")));
                    }), { showTips: i });
    }

    public checkBuildingLvUp(): void {
        var i = this;
        if (ModelManager.instance.modelUser.records.auto_mk_army) {
            var s = ModelManager.instance.modelUser.getLv();
            ConfigServer.guide.lv_guide_start[s] && (this.change_auto_mk_army(0),
                sg.guide.model.ModelGuide.instance.once("all_over",
                    this,
                    function () {
                        i.change_auto_mk_army(1);
                    }));
        }
    }

    public testSocket(t: any, i: any): void {
        NetSocket.instance.send(t, i);
    }

    public static BUILDING_STATUS_CHANGE: string = "building_status_change";
    public static BUILDING_SET: string = "building_set";
    public static BUILDING_UPDATE_END: string = "building_update_end";
    public static BUILDING_UPDATE_CD: string = "building_update_cd";
    public static BUILDING_BUILDER_ADD: string = "building_builder_add";
    public static BUILDING_BUILDER_REMOVE: string = "building_builder_remove";
    public static BUILDING_GIFT_PRODUCE_OK: string = "building_gift_produce_ok";
    public static BUILDING_GIFT_PRODUCE_READY: string = "building_gift_produce_ready";
    public static EQUIP_BUILDER_ADD: string = "equip_builder_add";
    public static EQUIP_UPDATE_REMOVE: string = "equip_update_remove";
    public static EQUIP_UPDATE_GET: string = "equip_update_get";
    public static EQUIP_UPDATE_CD: string = "equip_update_cd";
    public static SCIENCE_BUILDER_ADD: string = "science_builder_add";
    public static SCIENCE_UPDATE_CD: string = "science_update_cd";
    public static SCIENCE_UPDATE_REMOVE: string = "science_update_remove";
    public static SCIENCE_UPDATE_GET: string = "science_update_get";
    public static SCIENCE_CHANGE_STATUS: string = "science_change_status";
    public static ARMY_BUILDING_TRAIN_UPDATE_CD: string = "army_building_train_update_cd";
    public static ARMY_BUILDING_TRAIN_GET: string = "army_building_train_get";
    public static CHANGE_AUTO_MK_ARMY: string = "event_change_auto_mk_army";
    public static ARMY_BUILDING_TRAIN_SPEED_UP: string = "event_army_building_train_speed_up";
}

/**
 * 注册身份等价物：原文 o(h,"sg.model.ModelInside",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelInside, "sg.model.ModelInside", null, null);
