/**
 * sg.guide.model.GuideChecker —— 引导条件判定/进度记录中枢（canGuide/guideType/force/jump_guide/
 * newInstallCfg 七 getter；getConditionGuideID 17 分支条件引导选择；getSaveData/getSkipData 登录
 * send 引导数据注入；initGuide 由 PZL 教程视图触发置静态 inited；instance 惰性单例）。
 *
 * 原文：code1.js 字节 [1261141,1274178]（13,037B；包装变量 zs，基类 t=T=laya.events.EventDispatcher，
 * 明文 3 参注册 o(i,"sg.guide.model.GuideChecker",t)，off 1261689；全部成员名/字符串为明文，零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-q/GuideChecker.js
 *
 * 批次 Q 入批原因：ModelGuide ctor `zs.instance` 惰性构造 + forceGuide/isNewPlayerGuide 首语句
 * `zs.inited` 静态读（批次 I §9 #1 关联候选——核实宿主为 GuideChecker 自身静态，登录 send 链
 * forceGuide 100% 触达类对象；ctor 链在 inited 真值臂/executeGuide 等触达）。
 * 依赖（模块直引，批次 A/B/C/D/K 已译）：cs=ObjectUtil、Gt=ConfigServer、ue=ModelManager、
 * pn=NetSocket、tn=ViewManager、be=TestUtils、us=SaveLocal、vs=Tools、Ze=ArrayUtil、gs=StringUtil、
 * Ut=Platform、Ht=ConfigClass、Sn=TaskHelper、No=MapModel、Kr=ModelUser、lr=ModelGame、yr=ModelItem；
 * P=laya.utils.Handler、s=laya 工厂命名空间→Laya.timer（引擎）。
 * 批次外（ambient 全局路径，数据条件延迟调用）：$s=sg.kunlun.model.ModelWilderness、
 * Bo=sg.kismet.model.ModelKismet、Ge=sg.puppet.PuppetUtils、Hn=sg.view.task.ng_task.C_NGTask、
 * Lo=sg.kunlun.model.ModelKunlunPeach、Tr=sg.model.ModelOffice、Wa=sg.view.tower.ModelRevivedTower、
 * bo=sg.god.model.ModelGodMain、ca=sg.seaRoute.ModelSeaRoute、cr=sg.model.ModelOffice37、
 * ji=sg.guide.model.GuideHelper、nr=sg.model.ModelEquip、oo=sg.cross_pvp.model.ModelCrossPvp、
 * qr=sg.model.ModelTomb、sa=sg.puppet.model.ModelPuppetReputation、vn=sg.puppet.model.ModelArmMain、
 * sg.map.view.MapViewMain（instanceof）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { NetSocket } from "../../net/NetSocket";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { SaveLocal } from "../../utils/SaveLocal";
import { Tools } from "../../utils/Tools";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { StringUtil } from "../../utils/StringUtil";
import { Platform } from "../../laya/Platform";
import { ConfigClass } from "../../cfg/ConfigClass";
import { TaskHelper } from "../../task/TaskHelper";
import { MapModel } from "../../map/model/MapModel";
import { ModelUser } from "../../model/ModelUser";
import { ModelGame } from "../../model/ModelGame";
import { ModelItem } from "../../model/ModelItem";

export class GuideChecker extends laya.events.EventDispatcher {

    public guideConfig: any = null;
    public _guideType: any = null;
    public _guideID: any = null;
    public guideIndex: number = 0;
    public _lastID: any = null;
    public _lastIndex: number = 0;
    public _gData: any = null;
    public _buildArray: any = null;
    public _force: boolean = !1;
    public _canGuide: boolean = !1;
    public _buildMode: boolean = !1;
    public _needSave: boolean = !1;
    public _checkOverTime: boolean = !1;
    public _skip_key: any = null;
    public _localData: any = {};
    public _canSave: boolean = !1;
    public _falgSkip: boolean = !1;

    constructor() {
        super();
        this.guideConfig = ObjectUtil.clone(ConfigServer.guide, !0),
            this._canGuide = Boolean(ConfigServer.system_simple.is_guide);
        var t: any = parseInt(ModelManager.instance.modelUser.mUID);
        t %= Math.pow(10, 9),
            this._skip_key = t + "skip_guide";
    }

    public _getLocalData(): void {
        var t: any = ModelManager.instance.modelUser.records.guide_condition;
        this._localData = t || {};
    }

    public initGuide(): void {
        this._canGuide && (GuideChecker.inited = !0, this._refreshMaxLV(), this._getLocalData(), this.getNewPlayerGuideID(), this._guideID || this.getConditionGuideID(), this._guideID && NetSocket.instance.on("event_socket_opened", this, this.socketOpened));
    }

    public startGuide(): void {
        this._canGuide && (this.checkSkip() ? ViewManager.instance.showView(ConfigClass.VIEW_GUIDE_SKIP) : (this._guideID && this._initData(), this.getCurrentGuideData() ? this.event("do_guide") : this.guideOver()));
    }

    public socketOpened(): void {
        this._force && "main" === this._guideType && this.getCurrentGuideData() && this.event("do_guide");
    }

    public _initData(): void {
        this._guideType && this._guideID && (this._gData = this.getData(this._guideType, this._guideID), TestUtils.isTestShow && console.info("%c 初始化引导数据：" + this._guideID, "color:yellow;font-size:18px", this._gData), this._gData && this.checkEqualize());
    }

    public getGuideConfig(t?: any): any {
        return "main" === t ? this.newInstallCfg : this.guideConfig[t] && this.guideConfig[t];
    }

    public getData(t: any, i: any): any {
        return this.getGuideConfig(t)[i];
    }

    public checkEqualize(): void {
        if (this._gData[0] instanceof Array) {
            var t: any = ViewManager.instance.getCurrentScene(),
                i: any = ViewManager.instance.getCurrentPanel(),
                e: any = ViewManager.instance.sceneMain instanceof sg.map.view.MapViewMain;
            t || i || !e ? this._gData.shift() : (this._buildMode = !0, this._buildArray = this._gData[0]);
        }
        this.guideIndex = 0;
    }

    public getCurrentGuideData(): any {
        return this._guideType && this._gData ? this._buildMode ? this._buildArray[this.guideIndex] : this._gData[this.guideIndex] : null;
    }

    public continueGuide(): void {
        if (this._gData) if (this._lastID = this._guideID, this._lastIndex = this.guideIndex, this.guideIndex++, this._buildMode) this.guideIndex === this._buildArray.length && (this._buildMode = !1, this._buildArray = null, this.guideIndex = 0, this._gData.shift()), this.event("do_guide");
        else {
            if (this.guideIndex === this._gData.length && (this.event("STEP_OVER"), this._guideID = this.getNextID(), this.guideIndex = 0, this._initData(), !this._gData)) if ("main" === this._guideType) this.guideOver(), this.event("show_icons"), TaskHelper.instance.refreshMainTask();
            else {
                if (ModelManager.instance.modelUser.records.guide_condition) {
                    var t: any = ObjectUtil.keys(this.getGuideConfig(this._guideType)),
                        i = this._guideType.replace("guide", this.formatId(t.length + 1));
                    NetSocket.instance.send("set_guide_condition", { key: this._guideType, value: [i, 0] });
                }
                this.guideOver();
            }
            this.recordGuide();
        } else this.guideOver();
    }

    public timeout(): void {
        TestUtils.isTestShow && (console.log("%c 超时原因", "color:red;font-size:16px", this._gData[this.guideIndex]), (<any>console).table({ guideID: this.guideID, guideIndex: this.guideIndex })),
            this._falgSkip = !0,
            NetSocket.instance.send("w.get_user_list", { uids: [] }),
            this.guideOver();
    }

    public getSkipData(): any {
        var t: any = ObjectUtil.keys(this.getGuideConfig(this._guideType));
        this._guideID = this._guideID.replace(/g\d+/, this.formatId(t.length + 1)),
            this.guideIndex = 0;
        var i = "main" !== this.guideType ? this.guideType : "";
        return this.recordGuide(),
            {
                guide_type: this._guideID,
                guide_num: this.guideIndex,
                guide_condition: i
            };
    }

    public getNewPlayerGuideID(): void {
        var t: any = ModelManager.instance.modelUser;
        if (!(t.isMerge || t.getLv() >= 3)) {
            var i: any = t.records.guide,
                e = "g001",
                s = i[0] || e,
                n = i[1] || 0;
            this._guideID = s,
                this._guideType = "main",
                this._force = !0,
                this.currentGuideIsOver(s, n) && (this._guideID = this.getNextID()),
                this.getData(this._guideType, this._guideID) || (this._guideID = null, this._guideType = null, this._force = !1),
                s === e && 0 === n && this.event("newplayer_guide_start");
        }
    }

    public currentGuideIsOver(t: any, i: any, e?: any): any {
        void 0 === e && (e = "");
        var s: any = null;
        if (e ? s = this.guideConfig[e][t] : this.newInstallCfg && (s = this.newInstallCfg[t]), !(s instanceof Array)) return !1;
        var n: any = ArrayUtil.findIndex(s, function (t: any) { return null != (t.save || t.recruit_hero) });
        return s[0] instanceof Array && (n -= 1),
            -1 === n && (n = s.length - 1),
            i >= n;
    }

    public getConditionGuideIndex(t: any): any {
        if (!this._localData[t]) return 1;
        var i = this._localData[t][0],
            e = this._localData[t][1],
            s = parseFloat(i.match(/(\d+)$/)[0]);
        return this.currentGuideIsOver(i, e, t) && (s += 1),
            s;
    }

    public getConditionGuideID(t?: any): void {
        void 0 === t && (t = "");
        var i: any = ModelManager.instance.modelUser,
            e = 0;
        if (t && this._localData[t]) e = this.getConditionGuideIndex(t);
        else {
            if (t) {
                if (e = 1, "revived_guide" === t) ModelManager.instance.modelInside.getBuildingLv("building028") && (e = 2);
            } else {
                var s: any = i.getLv();
                if (t = this.guideConfig.lv_guide_start[s], this.guideConfig[t] || (t = ""), i.mergeNum && s < 12 && (t = ""), t && this._localData[t]) this.isGuideAlreadyExecute(t) ? t = "" : e = this.getConditionGuideIndex(t);
                else if (t) {
                    var n = 0;
                    switch (t) {
                        case "office_guide":
                            var h: any = i.office_right;
                            sg.model.ModelOffice.useOffice37() ? (n = sg.model.ModelOffice37.getOffice37LvByClassId("artisan"), t = "office37_guide", -1 === h.indexOf("100") ? e = 1 : 0 === n ? e = 2 : 1 === n && -1 === h.indexOf("101") && (e = 3)) : (0 === (n = i.office) && (e = 1), 1 === n && 0 === h.length && (e = 2));
                            break;
                        case "catchhero_guide":
                        case "party_guide":
                            var o: any = i.hero_catch.hero_list;
                            o || (o = i.drink.drink_list),
                                o.some(function (t: any) { return String(t[1]) === MapModel.instance.getCapitalId(ModelUser.getCountryID()) }) && (e = 1);
                            break;
                        case "guild_guide":
                            if (this.isGuideAlreadyExecute("country_guide")) return;
                            e = 1;
                            break;
                        case "ngtaskin_guide":
                            if (this.isGuideAlreadyExecute("ngtask_guide") || sg.view.task.ng_task.C_NGTask.instance.isDoneTasks) return;
                            e = 1;
                            break;
                        case "pk_guide":
                            0 === (n = i.home.building008.lv) && (e = 1),
                                1 === n && 0 === i.task.common.task088[1] && (e = 2);
                            break;
                        case "resolve_guide":
                            0 === (n = i.home.building006.lv) && (e = 1);
                            break;
                        case "estate_guide":
                            !ModelManager.instance.modelUser.isMerge && 0 === i.estate.length && (e = 1);
                            break;
                        case "equip_guide":
                            0 === (n = i.home.building002.lv) && (e = 1),
                                1 === n && 0 === ObjectUtil.keys(i.equip).length && !sg.model.ModelEquip.getCDingModel() && (e = 2);
                            break;
                        case "science_guide":
                            0 === (n = i.home.building003.lv) && (e = 1);
                            break;
                        case "shogun_guide":
                            if (ModelGame.unlock(null, "shogun").stop) return;
                            ModelUser.isShogunHasHero() || (e = 1);
                            break;
                        case "lookstar_guide":
                            var r: any = ArrayUtil.find(ObjectUtil.keys(i.property), function (t: any) { return /item6/.test(t) });
                            0 === ObjectUtil.keys(i.star).length && !r && (e = 1);
                            break;
                        case "turtle_guide":
                            if (0 === (n = i.home.building029.lv)) e = 1;
                            else {
                                var a: any = this.guideConfig[t][t.replace("guide", "g002")] || [],
                                    l = (ArrayUtil.find(a, function (t: any) { return t.use_prop }) || {}).use_prop;
                                if (l && ModelItem.getMyItemNum(l[0]) >= l[1]) e = 2;
                                else {
                                    var c = 0 === sg.kunlun.model.ModelWilderness.instance.gethookOnTime();
                                    sg.god.model.ModelGodMain.instance.godCurNum <= 1 && c && (e = 3);
                                }
                            }
                            break;
                        case "peach_guide":
                            if (!sg.kunlun.model.ModelKunlunPeach.instance.isActive || this.isGuideAlreadyExecute("peach_guide")) return;
                            e = 1;
                            break;
                        case "puppet_guide":
                            var u: any = ModelManager.instance.modelUser.data,
                                d = (u.puppet.length, sg.puppet.PuppetUtils.building_weapon.lv > 1),
                                _ = sg.puppet.PuppetUtils.building_heart.lv > 1,
                                m = sg.puppet.PuppetUtils.building_iron.lv > 1,
                                g = sg.puppet.PuppetUtils.building_wood.lv > 0,
                                f = sg.puppet.PuppetUtils.building_leather.lv > 0,
                                p = sg.puppet.PuppetUtils.building_gear.lv > 0,
                                v = sg.puppet.model.ModelPuppetReputation.instance.finishIndents.length > 0,
                                y = sg.puppet.model.ModelArmMain.instance.getAllWeapon().length > 1,
                                b = sg.puppet.model.ModelArmMain.instance.getAllHeart().length > 1;
                            d || _ || m || g || f || p || v || y || b ? e = 9 : e || (e = 1, 1 === u.puppet.length && (e = 2));
                            break;
                        default:
                            e = this._localData[t] ? this.getConditionGuideIndex(t) : 1;
                    }
                }
            }
            if (!t && sg.model.ModelTomb.instance.canGuide && (t = "tomb_guide", e = 1), t || !sg.cross_pvp.model.ModelCrossPvp.instance.canGuide || this.isGuideAlreadyExecute("cross_pvp_guide") || (t = "cross_pvp_guide", e = 1), !t && ModelManager.instance.modelGwent.isOpen()) if (ModelManager.instance.modelGame.inHome) sg.view.tower.ModelRevivedTower.instance.needGuide && !this.isGuideAlreadyExecute("revived_guide") && (t = "revived_guide", e = 1, ModelManager.instance.modelInside.getBuildingModel("building028").lv && (e = 2));
            else if (i.gwent) {
                var I: any = i.gwent.unlock_dungeon,
                    x: any = i.gwent.choice_dungeon;
                I instanceof Array && !I.length && !x && (t = "gwent_guide", e = 1);
            }
            t && "sea_route1_guide" == t && sg.seaRoute.ModelSeaRoute.instance.levelUnlockNum("chapter01") > 0 && (t = ""),
                !t && sg.seaRoute.ModelSeaRoute.instance.canGuide() && (this.isGuideAlreadyExecute("sea_route2_guide") ? this.isGuideAlreadyExecute("sea_route3_guide") || (t = "sea_route3_guide") : t = "sea_route2_guide", t && (e = this.getConditionGuideIndex(t))),
                !t && sg.kismet.model.ModelKismet.instance.canGuide && (t = "kismet_guide", e = 1);
        }
        t && e && (this._guideID = t.replace("guide", this.formatId(e))),
            this._guideID && this.configExist(t) && !this.isGuideAlreadyExecute(t) ? (this._guideType = t, this._force = !0) : (this._guideType = null, this._guideID = null, this._force = !1);
    }

    public configExist(t: any): any {
        return !!this.guideConfig[t] || (console && console.error(t + " not exist!!!!!!"), !1);
    }

    public isGuideOver(t: any, i: any, e?: any): any {
        return !this.getData(t, i);
    }

    public isGuideAlreadyExecute(t: any): any {
        if (!this.guideConfig[t]) return !0;
        var i: any = this.checkGuideDataWithKey(t);
        if (!i) return !1;
        var e = i[0],
            s = i[1];
        return this.isGuideOver(t, e, s);
    }

    public checkGuideDataWithKey(t: any): any {
        return this._localData[t];
    }

    public initConditionGuide(t?: any): any {
        return void 0 === t && (t = ""),
            !!GuideChecker.inited && (this.getConditionGuideID(t), this._initData(), !!this.getCurrentGuideData() && (this.event("do_guide"), !0));
    }

    public refreshGuide(t: any, i: any): void {
        this._canGuide && "main" === this.guideType && (this._checkOverTime = !1, this._guideID = t, this.guideIndex = i, this.getCurrentGuideData() && this.event("do_guide"));
    }

    public recordGuide(): void {
        if ("main" === this._guideType) this.refreshGuide(this._guideID, this.guideIndex);
        else this.recordConditionGuide();
    }

    public getNextID(): any {
        var t: any = this._guideID.match(/(.*?)g(\d+)/);
        return t[1] + this.formatId(parseInt(t[2]) + 1);
    }

    public formatId(t: any): any {
        return "g" + StringUtil.padding(t + "", 3, "0", !1);
    }

    public recordConditionGuide(): void {
        this._guideType && (-1 == this._guideType.indexOf("PZL") && (this._localData[this._guideType] = [this._guideID, this.guideIndex]), this.getCurrentGuideData() && this.event("do_guide"));
    }

    public recordCB(t: any): void {
        var i: any = t.receiveData;
        ModelManager.instance.modelUser.updateData(i);
        var e: any = ModelManager.instance.modelUser.records.guide;
        this.refreshGuide(e[0], e[1]);
    }

    public guideOver(): void {
        this._guideType && "main" !== this._guideType && (this.guideIndex = 0, this._gData = null),
            "main" === this._guideType && this.event("newplayer_guide_over"),
            this.recordGuide(),
            this._force = !1,
            this._guideType = null,
            this._guideID = null,
            this.guideIndex = 0,
            this.event("all_over");
    }

    public checkCanSaveGuide(): void {
        if (this._gData) {
            var t: any = this._gData[this.guideIndex] || {},
                i: any = this._gData[this.guideIndex + 1] || {};
            (t.recruit_hero || i.save) && (this._canSave = !0);
        }
    }

    public getSaveData(t?: any): any {
        if (this._falgSkip) return this._falgSkip = !1,
            this.getSkipData();
        if (!this._canSave) return null;
        this._canSave = !1,
            this.event("auto_save", t);
        var i = this.guideIndex + 1;
        TestUtils.isTestShow && console.info("%c 保存引导进度  ================  " + this.guideType + "  " + this._guideID + "  " + i, "color:#fff000;font-size:16px"),
            this.addOverTimeEvent();
        var e = "main" !== this.guideType ? this.guideType : "";
        return {
            guide_type: this._guideID,
            guide_num: i,
            guide_condition: e
        };
    }

    public addOverTimeEvent(): void {
        this._checkOverTime = !0,
            Laya.timer.once(NetSocket.timeOutTimer, this, this._overTime);
    }

    public _overTime(): void {
        this._checkOverTime && "main" === this._guideType && (this._checkOverTime = !1, console.warn(Tools.getMsgById("msg_GuideChecker_0") + this._guideID + " " + this.guideIndex), this.guideOver(), ViewManager.instance.showWarnAlert(Tools.getMsgById("_lht59"), Handler.create(Platform, Platform.restart)));
    }

    public checkSkip(): any {
        var t: any = ModelManager.instance.modelUser;
        if (t.isMerge || t.getLv() >= 3) return !1;
        if (!this.jump_guide) return console && console.error("跳过引导的配置不存在!!!!!!"),
            !1;
        var i = this.jump_guide.user_lv,
            e: any = SaveLocal.getValue(this._skip_key);
        return e && e > i && 0 === t.records.guide.length;
    }

    public _refreshMaxLV(): void {
        if (this.jump_guide) {
            var t: any = ModelManager.instance.modelUser,
                i = this.jump_guide.user_lv,
                e: any = SaveLocal.getValue(this._skip_key);
            (e = e ? Math.max(e, t.getLv()) : t.getLv()) >= i && SaveLocal.save(this._skip_key, e);
        }
    }

    public jumpGuide(): void {
        if ("main" === this._guideType) {
            var t: any = ObjectUtil.keys(this.newInstallCfg);
            NetSocket.instance.send("jump_guide", { guide_type: "g" + StringUtil.padding(String(t.length + 1), 3, "0", !1) }, Handler.create(this, this._skipGuideCB));
        }
    }

    public _skipGuideCB(t: any): void {
        var i: any = t.receiveData.gift_dict;
        ModelManager.instance.modelUser.updateData(t.receiveData),
            i && ViewManager.instance.showRewardPanel(i),
            ModelManager.instance.modelGame.checkFtask(),
            this.guideOver(),
            this.event("show_icons"),
            TaskHelper.instance.refreshMainTask();
    }

    public test(t: any): void {
        t.forEach(function (t: any) { sg.guide.model.GuideHelper.changeCountryFlag(t, 12) });
    }

    /** r(0,e,"canGuide",getter) —— getter-only getset（求值序等价直译） */
    public get canGuide(): any {
        return this._canGuide;
    }

    public get guideType(): any {
        return this._guideType;
    }

    public get jump_guide(): any {
        var t: any = ModelManager.instance.modelUser.getUseFunctionByKey("use_newinstall");
        return t >= 3 ? ConfigServer.guide["jump_guide" + t] : ConfigServer.guide.jump_guide;
    }

    public get guideID(): any {
        return this._guideID;
    }

    public get force(): any {
        return this._force;
    }

    public get needSave(): any {
        if (!this._gData || this._buildMode) return !1;
        var t: any = this._gData[this.guideIndex + 1] || {};
        return Boolean(t.save);
    }

    public get newInstallCfg(): any {
        var t: any = ModelManager.instance.modelUser.getUseFunctionByKey("use_newinstall");
        return t >= 3 ? this.guideConfig["new_install" + t] : ModelManager.instance.modelUser.use_ctask ? this.guideConfig.new_install2 : this.guideConfig.new_install;
    }

    /** r(1,i,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 惰性静态单例（批次 K 定案形态） */
    public static get instance(): GuideChecker {
        return GuideChecker.sModel = GuideChecker.sModel || new GuideChecker();
    }

    public static clear(): void {
        (<any>GuideChecker.sModel).clearEvents(),
            GuideChecker.sModel = null;
    }

    public static TYPE_MAIN: string = "main";
    public static DO_GUIDE: string = "do_guide";
    public static STEP_OVER: string = "STEP_OVER";
    public static ALL_OVER: string = "all_over";
    public static AUTO_SAVE: string = "auto_save";
    public static NEWPLAYER_GUIDE_START: string = "newplayer_guide_start";
    public static NEWPLAYER_GUIDE_OVER: string = "newplayer_guide_over";
    public static sModel: GuideChecker = null;
    public static inited: boolean = !1;
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.model.GuideChecker",t)（明文 3 参，基类 t=T=
 * laya.events.EventDispatcher）。base 传 null 的原因见 ModelBase.ts 尾注与
 * batch-a-report.md「注册等价决策」。
 */
Laya.class(GuideChecker, "sg.guide.model.GuideChecker", null, null);
