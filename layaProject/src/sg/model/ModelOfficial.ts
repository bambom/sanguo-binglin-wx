/**
 * sg.model.ModelOfficial —— 国家官职/城池/弹劾中枢：w.get_info 全量国战快照装配、
 * 官职表（country.Official minister*）、入侵里程碑（milepost target_and/or 判定）、
 * 市长（city_mayor）、国库（country_store）、国告示（37 平台 pf_data 分支）。
 *
 * 原文：code1.js 字节 [2262783,2285420]（包装变量 Sr，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 e(13417)="sg.model.ModelOfficial"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelOfficial.js
 *
 * 批次 D 入批原因：ModelGame.initFtask/getCityVisit 直引 checkCityIsMyCountry/visit，
 * ModelChat/setCallCD、ModelClimb 等大量交叉引用。
 * 依赖（批次 A/B/C 模块直引）：pn=NetSocket、P=Handler、vs=Tools、ue=ModelManager、
 * tn=ViewManager、us=SaveLocal、Gt=ConfigServer、Ht=ConfigClass、Rt=ConfigApp、
 * re=AssetsManager、cs=ObjectUtil；本批直引：Kr=sg.model.ModelUser（var-map-all.json：Kr→sg.model.ModelUser；原文 Kr["getCountryID"] 为 ModelUser 静态，前手误记为 ModelCountryPvp）、Qo=ModelClimb、
 * No=sg.map.model.MapModel（批次 D 前手已译）。
 * 批次外全局注册路径：hr=sg.model.ModelEstate、Ko=sg.model.ModelCityBuild、
 * xr=sg.model.ModelNewMilepost、Po=sg.model.ModelBuffManager、Ur=sg.model.ModelRankNew、
 * Yo=sg.model.ModelChampion、Ks=sg.kunlun.model.ModelExorcism、
 * ao=sg.explore.model.ModelTreasureHunting、ko=sg.interior.model.ModelCityControl、
 * Dt=sg.boundFor.GotoManager、js=sg.guide.model.ModelGuide。
 * 引擎：K=laya.maths.MathUtil（sortByKey）、$=laya.wx.mini.MiniAdpter（window.game37_*）。
 *
 * 静态访问器特记：原文 5 处 r(1,s,name,getter,sg.model.ModelBase._$SET_name) 的 setter
 * 实参在运行时为 undefined（ModelBase 未定义任何 _$SET_ 钩子）。
 * 【批次 K 勘误 2026-11-10】批次 D 曾据此判定 getset「只装 _$GET_name 不 defineProperty」——
 * 与引擎实文相悖：game.js@351203（唯一 getset 定义）s&&!r 分支为
 * Object.defineProperty(i,n,{get:s,enumerable:!1,configurable:!0})，即 getter-only
 * 访问器【已安装】、读取即调用、写入被忽略。五个静态在原文运行时均为已安装只读访问器，
 * getImpeachStatus 的 impeach/king_time/impeach_fail_time 读取会取到 getter 值（弹劾
 * 状态机），并非恒 undefined。译文已在类尾补 5 处 defineProperty 安装（getter 体不变），
 * 读点（<any> 读取）无需改动即恢复原语义；批次 D 的 _$GET_* 标记赋值保留（引擎 t=1
 * 分支确实安装标记）。详见 batch-k-report.md 勘误单列。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { SaveLocal } from "../utils/SaveLocal";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigClass } from "../cfg/ConfigClass";
import { Platform } from "../laya/Platform";
import { ObjectUtil } from "../utils/ObjectUtil";
import { AssetsManager } from "../manager/AssetsManager";
import { ModelUser } from "./ModelUser";
import { ModelClimb } from "./ModelClimb";
import { MapModel } from "../map/model/MapModel";

export class ModelOfficial extends ModelBase {

    constructor() {
        super();
        this.init();
    }

    public init(): void {
        NetSocket.instance.on("event_socket_receive_to", this, this.event_socket_receive_to),
            NetSocket.instance.registerHandler("w.city_fire", new Handler(this, this.cityFireTimes));
    }

    /** 服务器主动推送总分发（w.* 协议族） */
    public event_socket_receive_to(t: any, i: any): void {
        var n = t.method,
            h = t.data;
        if (!Tools.isNullObj(h) && !h.hasOwnProperty("msg"))
            switch (n) {
                case "w.get_info":
                    ModelOfficial.countries = h.countries,
                        ModelOfficial.cities = h.cities,
                        ModelOfficial.troops = h.troops,
                        ModelOfficial.xyz_victor_country = h.xyz_victor_country,
                        ModelOfficial.xyz_estate_add = h.xyz_estate_add,
                        ModelOfficial.country_notice = h.country_notice,
                        sg.model.ModelNewMilepost.instance.initNewMilePostData(h), !MapModel.instance.reloading && (sg.model.ModelEstate.initEstate(), ModelManager.instance.modelGame.initFtask(), sg.model.ModelBuffManager.instance, ModelOfficial.updateCityMayor(0, h), sg.explore.model.ModelTreasureHunting.instance.refreshData(null), ModelOfficial.xyz_estate_add && 0 != ModelOfficial.xyz_estate_add.length && this.event("event_show_gold_estate", ModelOfficial.xyz_estate_add), (null == h.xyz || 0 == h.xyz.status) && this.event("event_show_xyz"), this.event("event_pay_rank", h.pay_rank), sg.festival.model.ModelFestival.instance.modelFestivalAsk.initFestivalAskData(h)),
                        sg.model.ModelRankNew.initModels();
                    break;
                case "w.set_official":
                    ModelOfficial.updateSetOfficer(h),
                        ModelManager.instance.modelOfficel.event("event_set_officer_is_ok", i);
                    break;
                case "w.set_mayor":
                    ModelOfficial.updateSetMayor(h),
                        ModelManager.instance.modelOfficel.event("event_set_mayor_is_ok", i);
                    break;
                case "w.set_investment":
                    ModelOfficial.updateSetRiskInvestment(h),
                        ModelManager.instance.modelOfficel.event("event_update_risk_investment");
                    break;
                case "w.fight_end":
                    ModelOfficial.updateFightEnd(h);
                    break;
                case "impeach_over_push":
                    ModelOfficial.updateCountryData(h.country),
                        this.event("event_update_impeach");
                    break;
                case "start_vote_push":
                case "start_impeach_push":
                    ModelOfficial.updateImpeach(h),
                        this.event("event_update_impeach");
                    break;
                case "w.xyz_over":
                    if (ModelOfficial.xyzOver(h), !ModelOfficial.cities)
                        return;
                    var r = typeof h.victor_country == "number" ? h.victor_country : h.victor_country.tid;
                    ModelManager.instance.modelCountryPvp.xyCityDoorsIds.concat(ModelManager.instance.modelCountryPvp.xyCityId).forEach(function (t: any) {
                        ModelOfficial.cities[t] && (ModelOfficial.cities[t].country = r, MapModel.instance.onFightEndHandler({ city: { cid: t, country: r } }, false));
                    }),
                        ModelManager.instance.modelTroopManager.deleteXYZTroop(),
                        ModelOfficial.xyz_estate_add && 0 != ModelOfficial.xyz_estate_add.length ? this.event("event_show_gold_estate", ModelOfficial.xyz_estate_add) : this.event("event_hide_gold_estate");
                    break;
                case "w.country_army_dead":
                case "w.troop_move_push":
                    break;
                case "modify_country_notice":
                    ModelOfficial.country_notice[ModelUser.getCountryID()] = h,
                        this.showCountryNotice();
                    break;
                case "service_country_notice":
                    ModelOfficial.country_notice[ModelUser.getCountryID()] = h;
                    break;
                default:
                    break;
                case "w.update_mayor":
                    ModelOfficial.cities[h.cid].mayor = h.data;
                    break;
                case "w.push_land_lost":
                    ModelOfficial.countries[ModelUser.getCountryID()].land_lost = h.land_lost;
                    break;
                case "w.push_new_milepost":
                    sg.model.ModelNewMilepost.instance.updateNewMilePostData(h),
                        sg.model.ModelNewMilepost.instance.updateTodayNewMilePostData(),
                        ModelManager.instance.modelGame.event("event_CHECK_MILEPOST");
                    break;
                case "w.push_new_milepost_records":
                    sg.model.ModelNewMilepost.instance.updateNewMilePostData(h);
                    break;
                case "push_pk_yard":
                    sg.model.ModelChampion.instance.event("event_push_pk_yard");
                    break;
                case "push_country_boss":
                    sg.kunlun.model.ModelExorcism.instance.updateData(h);
                    break;
                case "w.get_my_troops":
                    sg.interior.model.ModelCityControl.checkCityControl();
                    break;
                case "w.city_fire":
                    sg.interior.model.ModelCityControl.checkCityControlOnFire(h);
            }
    }

    public showCountryNotice(): void {
        if (!sg.guide.model.ModelGuide.forceGuide()) {
            var i = ModelOfficial.getCountrNoticeData();
            i && i.modify_user.user == ModelManager.instance.modelUser.mUID || (this.event("event_country_change"), ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_NOTICE_ALERT));
        }
    }

    public getCallCD(t: any): any {
        var i = ModelOfficial.countries[Number(ModelManager.instance.modelUser.country)].call_cd;
        return i && i[t] ? Tools.getTimeStamp(i[t]) : 0;
    }

    public setCallCD(t: any): void {
        if (t && ModelOfficial.countries) {
            var s = ModelOfficial.countries[Number(ModelManager.instance.modelUser.country)];
            s && (s.call_cd = t, this.event("event_update_ALEIN_CD"));
        }
    }

    public cityFireTimes(t: any): void {
        var s = t.receiveData;
        ModelOfficial.cities && ModelOfficial.cities[s.city] && (ModelOfficial.cities[s.city].fire_times = s.fire_times);
    }

    /** 原文 s["getXYCountryId"] 为静态注册（前手误译为实例方法，本批修正） */
    public static getXYCountryId(): any {
        var i = ModelManager.instance.modelCountryPvp.xyCityId;
        return ModelOfficial.cities && ModelOfficial.cities[i] ? ModelOfficial.cities[i].country : -1;
    }

    /**
     * 原文 h(s,["country_store_types",function(){this.country_store_types=["coin","gold","food"]}])
     * —— Laya.static 惰性静态（getter + defineProperty 换写）。国家仓库物资类型表。
     */
    public static get country_store_types(): any[] {
        var v = ["coin", "gold", "food"];
        Object.defineProperty(ModelOfficial, "country_store_types", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    /** 官职背景框（ invaded>=4 用战时配色 h=2） */
    public static getOfficalBGUrl(t: any): any {
        var s = ModelOfficial.getInvade() >= 4,
            n = 0;
        n = 0 == (t = Number(t)) ? 1 : 1 == t || 2 == t || 3 == t || 4 == t ? 2 : 5 == t || 9 == t ? 3 : 4;
        var h = s ? 2 : 1;
        return AssetsManager.getAssetLater("bar_gj_biaotikuang" + n + "_" + h + ".png");
    }

    public static getCountryLandLost(t?: any): any {
        void 0 === t && (t = "");
        var s = ModelOfficial.countries[ModelUser.getCountryID(t)].land_lost;
        return null == s ? [] : s;
    }

    public static updateTroops(t: any): void {
        if (t.xtype && t.xtype == "country_army") {
            var n: any = {};
            n[t.hid] = t,
                ModelOfficial.troops[t.uid] = n;
        }
    }

    public static deleteTroops(t: any): void {
        t.uid && ModelOfficial.troops.hasOwnProperty(t.uid) && t.hid && ModelOfficial.troops[t.uid].hasOwnProperty(t.hid) && delete ModelOfficial.troops[t.uid][t.hid];
    }

    public static xyzOver(t: any): void {
        ModelOfficial.countries && ModelOfficial.cities && (ModelOfficial.xyz_victor_country = typeof t.victor_country == "number" ? t.victor_country : t.victor_country.tid, ModelOfficial.xyz_estate_add = t.estate_add, t.country && (ModelOfficial.countries[t.country.tid] = t.country), -1 != [0, 1, 2].indexOf(ModelOfficial.xyz_victor_country) && t.country.tid != t.victor_country.tid && (ModelOfficial.countries[t.victor_country.tid] = t.victor_country));
    }

    /** 城战结束：换主检测（event_invade_change/新王提示/市长重建）+ 快照更新 */
    public static updateFightEnd(t: any): void {
        if (ModelOfficial.countries && ModelOfficial.cities) {
            var s = ModelOfficial.getInvade(),
                n = t.city.cid,
                h = ModelOfficial.cities[t.city.cid].country,
                o = t.city.country,
                r = ModelUser.getCountryID();
            ModelOfficial.cities[t.city.cid] = t.city,
                ModelOfficial.updateCityMayor(2, t);
            var a = ModelOfficial.getInvade();
            if (s !== a && ModelManager.instance.modelGame.event("event_invade_change", a), t.country && null == ModelManager.instance.modelCountryPvp.xyz && (ModelOfficial.countries[t.country.tid] = t.country, t.country.tid == r)) {
                var l = ModelOfficial.checkCountryKingStatus(t.country, a > s);
                l && ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_KING_TIPS, l);
            }
            h != o && (sg.model.ModelNewMilepost.instance.checkNewMilepost(), sg.model.ModelEstate.updateCoutryEstate(n + "")),
                ModelManager.instance.modelGame.event("event_CHECK_MILEPOST"),
                ModelManager.instance.modelUser.updateData(t);
        }
    }

    /** 新王更替检测（本地档 mUID_key_country_king 比对 official[0][0]） */
    public static checkCountryKingStatus(t: any, i?: any): any {
        void 0 === i && (i = false);
        var n = ModelManager.instance.modelUser.mUID + "_key_country_king",
            h = false,
            o = "",
            r = -1;
        if (t && t.official && t.official[0]) {
            var a = SaveLocal.getValue(n, true);
            if (i ? h = true : a && a.official && a.official[0] ? a.official[0][0] != t.official[0][0] && (h = true) : h = true, h && (o = t.official[0][1], r = t.tid, sg.guide.model.ModelGuide.forceGuide()))
                return null;
        }
        return h ? [o, r] : null;
    }

    /** 每日国王Tips（本地档 mUID_key_country_king_every_tips，当日未弹则记时返回） */
    public static checkCountryKingTips(): any {
        var t = ModelManager.instance.modelUser.mUID + "_key_country_king_every_tips",
            i = SaveLocal.getValue(t, true),
            s = Number(i || 0),
            n = ConfigServer.getServerTimer(),
            h = null;
        if (!i || s && Tools.isNewDay(s)) {
            var r = ModelOfficial.countries[ModelUser.getCountryID()];
            r && r.official && r.official[0] && (h = [r.official[0][1], r.tid]),
                SaveLocal.save(t, n + "", true);
        }
        return h;
    }

    public static getOfficers(t?: any): any {
        return void 0 === t && (t = ""),
            ModelOfficial.getMyCountryCfg(t).official;
    }

    public static getOfficersByID(t?: any, i?: any): any {
        void 0 === t && (t = ""),
            void 0 === i && (i = "");
        for (var h = -100, o = ModelOfficial.getOfficers(t), r = 0; r < o.length; r++)
            if (o[r] && o[r][0] == i) {
                h = r;
                break;
            }
        return h;
    }

    public static getMyCountryCfg(t?: any): any {
        return void 0 === t && (t = ""),
            ModelOfficial.countries[ModelUser.getCountryID(t)];
    }

    public static getMyCountryCGF(): any {
        var i = ModelOfficial.getMyCountryCfg();
        return [i.coin, i.gold, i.food];
    }

    public static getMyCountryOldCGF(): any {
        var i = ModelOfficial.getMyCountryCfg();
        return [i.old_coin, i.old_gold, i.old_food];
    }

    public static updateSetRiskInvestment(t: any): void {
        t && t.country && (ModelOfficial.getMyCountryCfg().investment = t.country.investment);
    }

    public static getCanSetRisk(): boolean {
        var i = ModelOfficial.getRiskInvestmentCfg().time,
            n = ConfigServer.getServerTimer(),
            h = Tools.getToDayHourMill(i[0].slice(0, 2)),
            o = Tools.getToDayHourMill(i[1].slice(0, 2));
        return n > h && n < o;
    }

    public static updateImpeach(t: any): void {
        t && t.impeach && (ModelOfficial.getMyCountryCfg().impeach = t.impeach);
    }

    public static updateCountryData(t: any, i?: any): void {
        void 0 === i && (i = ""),
            ModelOfficial.countries[ModelUser.getCountryID(i)] = t;
    }

    public static updateCityBuild(t: any): void {
        t.hasOwnProperty("city_build") && ModelOfficial.cities && ModelOfficial.cities[t.cid] && (ModelOfficial.cities[t.cid].build = t.city_build);
    }

    /** 用户官职位（-100 无/-1 战斗官职外；Rt.testFightType 测试短路） */
    public static getUserOfficer(t: any, i?: any): any {
        if (void 0 === i && (i = false), ConfigApp.testFightType)
            return -1;
        for (var n = ModelOfficial.getOfficers(), h = i ? -100 : -1, o = n.length, r = 0; r < o; r++)
            if (!Tools.isNullObj(n[r]) && n[r][0] == parseInt(t)) {
                h = r;
                break;
            }
        return h;
    }

    public static isKing(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 0 == i ? i : -1;
    }

    public static isAdviser(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 5 == i ? i : -1;
    }

    public static isPremier(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 9 == i ? i : -1;
    }

    public static isGovernor(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 6 == i ? i : -1;
    }

    public static isTrain(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 7 == i ? i : -1;
    }

    public static isBuilder(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 10 == i ? i : -1;
    }

    public static isBeefedUp(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 12 == i ? i : -1;
    }

    public static isRiskInvestment(t: any): any {
        var i = ModelOfficial.getUserOfficer(t);
        return 13 == i ? i : -1;
    }

    public static orderIsNewDay(t: any, i: any): boolean {
        if (t) {
            var n = ConfigServer.country[i],
                h = Tools.getTimeStamp(t[2]) + n.time * Tools.oneMinuteMilli;
            return Tools.isNewDay(h);
        }
        return false;
    }

    public static get_country_order_data(t: any, i?: any): any {
        void 0 === i && (i = "");
        var h, o = ModelOfficial.getMyCountryCfg(i);
        return o.hasOwnProperty("buffs") && (h = o.buffs),
            h && h.hasOwnProperty(t) ? h[t] : null;
    }

    public static get_city_order_data(t: any, i: any): any {
        var n, o = ModelOfficial.cities[i];
        return o.hasOwnProperty("buffs") && (n = o.buffs),
            n && n.hasOwnProperty(t) ? n[t] : null;
    }

    /** 换官推送（o1==o2==0 即国王更替弹 VIEW_COUNTRY_KING_TIPS） */
    public static updateSetOfficer(t: any): void {
        if (ModelOfficial.countries && !Tools.isNullObj(t) && (ModelOfficial.countries[t.country.tid] = t.country, t.country.tid == ModelUser.getCountryID() && null != t.o1 && null != t.o2))
            if (0 == t.o2 && t.o1 == t.o2) {
                var s = t.country.official[0][1],
                    n = t.country.tid;
                if (sg.guide.model.ModelGuide.forceGuide())
                    return;
                ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_KING_TIPS, [s, n]);
            } else
                sg.boundFor.GotoManager.boundForPanel("view_country_officer_tips", "", [t.o1, t.o2, t.country.tid, 1]);
    }

    public static updateSetMayor(t: any): void {
        if (ModelOfficial.cities && !Tools.isNullObj(t)) {
            ModelOfficial.cities[t.cid].mayor = t.data,
                ModelOfficial.cities[t.cid].mayor_cd = t.mayor_cd, !Tools.isNullObj(t.cid2) && (ModelOfficial.cities[t.cid2].mayor = null);
            var n = ModelOfficial.cities[t.cid].country;
            ModelManager.instance.modelUser.country == n && (!sg.guide.model.ModelGuide.forceGuide() && sg.boundFor.GotoManager.boundForPanel("view_country_officer_tips", "", [t.data[4], t.cid, n, 2, t.data[1]]), ModelOfficial.updateCityMayor(1, t));
        }
    }

    public static checkCityIsMyCountry(t: any): boolean {
        return !(!ModelOfficial.cities || !ModelOfficial.cities.hasOwnProperty(t + "") || ModelOfficial.cities[t + ""].country != ModelUser.getCountryID());
    }

    /** 我国的城列表（cityType 过滤 + mayor 指定 uid 精确一城） */
    public static getMyCities(t: any, i: any, n?: any): any[] {
        void 0 === n && (n = "");
        var h: any[] = [0, 1, 2, 3, 4, 5, 9];
        h = Tools.isNullObj(i) ? h : i;
        var r, a, l: any[] = [];
        for (var c in ModelOfficial.cities)
            if ((r = ModelOfficial.cities[c]).country == t)
                if (h) {
                    if (a = ConfigServer.city[r.cid], h.indexOf(parseInt(a.cityType)) > -1)
                        if ("" != n) {
                            if (r.mayor && r.mayor[0] == n) {
                                l.push(r);
                                break;
                            }
                        } else
                            l.push(r);
                } else
                    l.push(r);
        return l;
    }

    public static isCityMayor(t: any, i: any): any {
        var n, o = "";
        for (var r in ModelOfficial.cities)
            if ((n = ModelOfficial.cities[r]).country == i && !Tools.isNullObj(n.mayor) && n.mayor[0] == parseInt(t)) {
                o = n.cid;
                break;
            }
        return o;
    }

    public static getCityName(t: any): any {
        t == "captain" && (t = ModelUser.getCaptainID(ModelUser.getCountryID()).toString());
        var n = ModelOfficial.getCityCfg(t);
        return n ? Tools.getMsgById(n.name) : "";
    }

    public static getCityType(t: any): any {
        return Tools.getMsgById("cityType" + ModelOfficial.getCityCfg(t).cityType);
    }

    public static getCityCfg(t: any): any {
        return ConfigServer.city[t + ""];
    }

    public static getCityFaith(t: any): any {
        return ModelOfficial.getCityCfg(t).faith;
    }

    public static getCityMayor(t: any): any {
        return ModelOfficial.cities[t].mayor;
    }

    /** [coin,gold,food] 基础产量 + 城加成 */
    public static getCityStoreToCountry(t: any): any {
        var n = ModelOfficial.getCityCfg(t),
            h = ConfigServer.world.cityType[n.cityType],
            o = ["coin", "gold", "food"],
            r = -1,
            a = [0, 0, 0];
        for (var l in h)
            (r = o.indexOf(l)) > -1 && (a[r] = h[l][0] + sg.model.ModelCityBuild.getResouceByCity(t, l));
        return a;
    }

    public static getStoreToSeason(t: any): any {
        for (var s = t.length, n = Math.floor(.001 * (ModelClimb.getChampionStarTime(true) - ConfigServer.getServerTimer()) / 60 / 60), h = 0; h < s; h++)
            t[h] = t[h] * n;
        return t;
    }

    /** 国库领取 [上次时间戳, 剩余次数]（grant_number 表按类型序对齐） */
    public static getStoreTimes(t: any): any {
        for (var i, h = ModelOfficial.country_store_types.indexOf(t), o = ConfigServer.country.warehouse.grant_number, r = o.length, a = 0; a < r; a++)
            if (h == a) {
                i = o[a];
                break;
            }
        var l = Tools.isNullObj(i[0]) ? 0 : Tools.getTimeStamp(i[0]),
            c = false;
        c = !(l > 0) || Tools.isNewDay(l);
        ConfigServer.country.warehouse.grant_second;
        var u = c ? 0 : i[1];
        return [i[0], u];
    }

    public static getStoreNum(t: any): any {
        for (var i, h = ModelOfficial.country_store_types.indexOf(t), o = ConfigServer.country.warehouse.grant_number, r = o.length, a = 0; a < r; a++)
            if (h == a) {
                i = o[a];
                break;
            }
        return i;
    }

    /** 官职名（位阶 t + 入侵阶 i 决定名称变体；-100 空/-1 部队官） */
    public static getOfficerName(t: any, i?: any, n?: any): any {
        if (void 0 === i && (i = -1), void 0 === n && (n = ""), -100 === t)
            return "";
        if (t < 0)
            return Tools.getMsgById("troopOfficial" + t);
        var o = ModelUser.getCountryID(n),
            r = ModelOfficial.getOfficerCfg(t).name,
            a = i > -1 ? i : ModelOfficial.getInvade(o);
        return a > 0 && r[a - 1] ? Tools.getMsgById(r[a - 1][1], [ModelUser.country_name[o]]) : Tools.getMsgById(r[0][1], [ModelUser.country_name[o]]);
    }

    /** 官职颜色档（level/25；入侵 5 阶 +1） */
    public static getOfficerColorLevel(t: any, i?: any): any {
        void 0 === i && (i = -1);
        var h = 0;
        if (-1 == t)
            h = 1;
        else if (-2 == t)
            h = 2;
        else {
            var o = ModelOfficial.getOfficerCfg(t);
            o && (h = Math.floor(o.level / 25), (i = i > -1 ? i : ModelOfficial.getInvade()) >= 5 && (h += 1));
        }
        return h;
    }

    public static getOfficerIsWenWu(t: any): any {
        var s = ModelOfficial.getOfficerCfg(t);
        return s && s.level > 70 ? 1 : 0;
    }

    public static getOfficerLevel(t: any): any {
        var s = ModelOfficial.getOfficerCfg(t);
        return s ? s.level : 0;
    }

    public static getOfficerInfo(t: any): any {
        var n = ModelOfficial.getOfficerCfg(t).info;
        return Tools.getMsgById(n, [ModelManager.instance.modelCountryPvp.title]);
    }

    public static getOfficerCondition(t: any): any {
        var n = ModelOfficial.getOfficerCfg(t),
            h = "",
            o = n[h = ModelManager.instance.modelUser.isMergeMaps ? "tenure_condition_maps" : 1 == ModelManager.instance.modelUser.getUseFunctionByKey("use_milepost") ? "tenure_condition2" : "tenure_condition"] ? n[h] : ["tenure_condition"];
        return Tools.getMsgById(o[1], [ModelOfficial.getOfficerName(0)]);
    }

    public static checkOfficerMerge(t: any): boolean {
        var n = ModelOfficial.getOfficerCfg(t);
        return ModelManager.instance.modelUser.mergeNum >= (n && n.merge ? n.merge : 0);
    }

    public static checkOfficerIsOpen(t: any): boolean {
        var n = (ConfigServer.country.new_milepost, ModelOfficial.getOfficerCfg(t)),
            h = ModelOfficial.getInvadeAwardMax(),
            o = "";
        return o = sg.model.ModelNewMilepost.instance.isOpen() && n.Unlock2 ? n.Unlock2 : n.Unlock,
            h >= parseInt(o);
    }

    /** 全部朝臣配置（minister* 键序 sortIndex 排序） */
    public static getOfficerAll(): any {
        var t, s: any[] = [];
        for (var n in ConfigServer.country.Official)
            n.indexOf("minister") > -1 && ((t = ConfigServer.country.Official[n]).sortIndex = parseInt(n.substring("minister".length, n.length)), s.push(t));
        return s.sort(<any>MathUtil.sortByKey("sortIndex")),
            s;
    }

    public static getOfficerCfg(t: any): any {
        return ConfigServer.country.Official["minister" + t];
    }

    public static getRiskInvestmentCfg(): any {
        return ConfigServer.country.warehouse.risk_investment;
    }

    public static getOfficerNameByID(t: any): any {
        for (var n = ModelOfficial.getMyCountryCfg().official, h = 0; h < n.length; h++)
            if (n[h] && t + "" == n[h][0] + "")
                return ModelOfficial.getOfficerName(h);
        return "";
    }

    public static getMyOfficerId(): any {
        for (var i = ModelOfficial.getMyCountryCfg().official, n = 0; n < i.length; n++)
            if (i[n] && ModelManager.instance.modelUser.mUID == i[n][0] + "")
                return n;
        return -100;
    }

    public static getInvadeCfgArr(t?: any): any {
        void 0 === t && (t = "");
        var s = ConfigServer.country.milepost[t + ""],
            n: any[] = [];
        for (var h in s)
            s[h].index = h,
                n.push(s[h]);
        return n.sort(<any>MathUtil.sortByKey("index", !0)),
            n;
    }

    /** 入侵里程碑阶（合服图/新里程碑表优先；否则 target_and/or 城池目标判定） */
    public static getInvade(t?: any): any {
        if (void 0 === t && (t = ""), !ModelOfficial.cities)
            return -1;
        var n = ModelUser.getCountryID(t);
        if (ModelManager.instance.modelUser.merge_maps)
            return ModelOfficial.getInvadeByNewMap(n);
        var h = ModelOfficial.getInvadeByUseMilepost(n);
        if (-1 != h)
            return h;
        for (var o, r, a, l = ModelOfficial.getInvadeCfgArr(n), c = l.length, u = false, d = -1, _ = 0, m = -1, g = 0; g < c; g++) {
            u = false, (o = ModelOfficial.getInvadeCfg(l[g].index, n)).hasOwnProperty("target_and") ? (u = true, r = o.target_and instanceof Array ? o.target_and : [o.target_and]) : r = o.target_or instanceof Array ? o.target_or : [o.target_or],
                u ? (d = 0, _ = r.length) : (d = 0, _ = 1);
            for (var f = 0; f < r.length; f++) {
                if (a = r[f], !Tools.isNullString(a))
                    if ((a = a.replace("c_", "")) == ModelManager.instance.modelCountryPvp.xyCityId + "") {
                        if (null != ModelOfficial.xyz_victor_country && ModelOfficial.xyz_victor_country == n)
                            return parseInt(l[g].index);
                    } else
                        ModelOfficial.cities.hasOwnProperty(a) && ModelOfficial.cities[a].country == n && (d += 1);
                if (d >= _) {
                    m = g;
                    break;
                }
            }
            if (m > -1)
                break;
        }
        return m > -1 ? parseInt(l[m].index) : 0;
    }

    /** 合服图版：loginDateNum 对齐 target_merge 阶；XYZ 胜利直取 5 */
    public static getInvadeByNewMap(t?: any): any {
        void 0 === t && (t = "");
        var s = -1,
            n = ModelOfficial.getInvadeCfgArr(t),
            h = n.length;
        if (ModelManager.instance.modelCountryPvp.isVictoryXYZ(t))
            return 5;
        for (var o = ModelManager.instance.modelUser.loginDateNum, r = 0; r < h; r++) {
            var a = n[r],
                l = a.target_merge;
            l && o >= l[0] && (s = parseInt(a.index));
        }
        return -1 == s && (s = parseInt(n[n.length - 1].index)),
            s;
    }

    /** use_milepost 版：target_merge 阶 + target_most 城数兜底 + 今日 ModelRankNew 窗口跳阶 */
    public static getInvadeByUseMilepost(t?: any): any {
        void 0 === t && (t = "");
        var s = -1;
        if (1 == ModelManager.instance.modelUser.getUseFunctionByKey("use_milepost")) {
            if (ModelManager.instance.modelCountryPvp.isVictoryXYZ(t))
                return 5;
            for (var n, h = ModelOfficial.getInvadeCfgArr(t), o = h.length, r = ModelManager.instance.modelUser.loginDateNum, a = 0, l = -1, c = 0; c < o; c++) {
                var u = (n = h[c]).target_merge,
                    d = parseInt(n.index);
                if (u) {
                    l = d,
                        a < u[u.length - 1] && (a = u[u.length - 1]);
                    var _ = u[0];
                    if (r >= _) {
                        if (r == _) {
                            var m = ConfigServer.getServerTimer(),
                                g = sg.model.ModelRankNew.getTodayModel();
                            if (g && m < g.end_time)
                                continue;
                        }
                        d > s && (s = d);
                    }
                }
            }
            var f = ModelUser.getCountryID(t);
            if (r >= a)
                for (var p = 0; p < o; p++) {
                    var v = (n = h[p]).target_most;
                    if (v) {
                        for (var y = v[1], b = 0, I = 0; I < y.length; I++) {
                            var x = y[I].replace("c_", "");
                            ModelOfficial.cities.hasOwnProperty(x) && ModelOfficial.cities[x].country == f && (b += 1);
                        }
                        if (b >= v[0])
                            return s = parseInt(n.index);
                    }
                }
            return s < l && (s = l),
                s;
        }
        return -1;
    }

    public static getInvadeCfg(t: any, i?: any): any {
        return void 0 === i && (i = ""),
            ConfigServer.country.milepost[ModelUser.getCountryID(i)][t + ""];
    }

    public static getInvadeAwardMax(): any {
        return ModelOfficial.countries && ModelManager.instance.modelUser ? ModelOfficial.getMyCountryCfg().max_milepost : 1;
    }

    /** [解锁文案, 目标城数组]（target_and 用顿号、target_or 用斜杠） */
    public static getInvadeUnlock(t: any, i?: any): any {
        void 0 === i && (i = false);
        var h = ModelOfficial.getInvadeCfg(t);
        if (!h)
            return ["", []];
        var o, r = h.hasOwnProperty("target_and"), a = 0, l = 0, c = "", u = r ? "target_and" : "target_or", d: any[] = [];
        if (h[u] instanceof Array)
            for (l = (o = h[u]).length, a = 0; a < l; a++)
                c += Tools.getMsgById(o[a]) + (a < l - 1 ? r ? Tools.getMsgById("_public181") : Tools.getMsgById("_public182") : ""), "" != o[a] && d.push(o[a]);
        else
            c = Tools.getMsgById(h[u]), "" != h[u] && d.push(h[u]);
        return [c, d];
    }

    public static getDayCoin(): any {
        var i = ModelOfficial.getMyCountryCfg().day_coin;
        return i && !Tools.isNewDay(i.time) ? i.num : 0;
    }

    public static getMayorCD(t: any): any {
        var s = ModelOfficial.cities[t].mayor_cd;
        return s ? Tools.getTimeStamp(s) : 0;
    }

    /** 市长索引重建/增量（t=0 全量 / 1 任命 / 2 城战换主） */
    public static updateCityMayor(t: any, i: any): void {
        if (0 == t) {
            ModelOfficial.city_mayor = {};
            var h = ModelOfficial.cities;
            for (var o in h)
                h[o].country == ModelUser.getCountryID() && h[o].mayor && (ModelOfficial.city_mayor[o] = h[o].mayor[0]);
        } else
            1 == t ? (ModelOfficial.city_mayor[i.cid2] = "", ModelOfficial.city_mayor[i.cid] = i.data[0], i.cid && ModelManager.instance.modelGame.event("event_mayor_update", [i.cid]), i.cid2 && ModelManager.instance.modelGame.event("event_mayor_update", [i.cid2])) : 2 == t && (ModelOfficial.city_mayor.hasOwnProperty(i.city.cid) ? i.city.country != ModelUser.getCountryID() ? (delete ModelOfficial.city_mayor[i.city.cid], ModelManager.instance.modelGame.event("event_mayor_update", [i.city.cid])) : i.city.mayor && (ModelOfficial.city_mayor[i.city.cid] = i.city.mayor[0]) : i.city.country == ModelUser.getCountryID() && i.city.mayor && (ModelOfficial.city_mayor[i.city.cid] = i.city.mayor[0]));
    }

    public static getMayorByUID(t: any): any {
        for (var s in ModelOfficial.city_mayor)
            if (ModelOfficial.city_mayor[s] + "" == t + "")
                return s;
        return "";
    }

    public static isMayorOrOfficer(t: any): boolean {
        return "" != ModelOfficial.getMayorByUID(t) || ModelOfficial.getUserOfficer(t) >= 0;
    }

    public static isCanImpeach(): boolean {
        if (0 == ConfigServer.country.impeach.switch)
            return false;
        var i = ModelOfficial.getInvade(),
            n = ModelOfficial.getInvadeCfg(i);
        if (n && n.target_merge) {
            var h = n.target_merge,
                o = ModelManager.instance.modelUser.loginDateNum;
            if (o > h[h.length - 1])
                return true;
            if (o == h[h.length - 1]) {
                var r = ConfigServer.country.top_time,
                    a = Tools.getTodayMillWithHourAndMinute(r);
                if (ConfigServer.getServerTimer() > a)
                    return true;
            }
            return false;
        }
        return true;
    }

    /**
     * 弹劾状态机（0 无/2 已投反对/1 已投赞成/3 未投/4 国王冷却/5 弹劾失败冷却/6 参与冷却）。
     * 注意：o=s["impeach"]/r=s["king_time"] 读的是原文运行时未安装的静态访问器（见类头
     * 特记），恒为 undefined —— 如实按原文保留（<any> 读取）。
     */
    public static getImpeachStatus(): any {
        var i = 0,
            n = ConfigServer.getServerTimer(),
            h = ConfigServer.country.impeach,
            o = (<any>ModelOfficial).impeach,
            r = (<any>ModelOfficial).king_time;
        if (0 != r && r + h.cd1 * Tools.oneMinuteMilli > n)
            i = 4;
        else if (o) {
            var a = false;
            if (n - Tools.getTimeStamp(o.start) < h.continued * Tools.oneMinuteMilli ? o.is_over ? a = true : i = o.vote_users.hasOwnProperty(ModelManager.instance.modelUser.mUID) ? o.vote_users[ModelManager.instance.modelUser.mUID] ? 2 : 1 : 3 : a = true, a)
                if (n - Tools.getTimeStamp(ModelManager.instance.modelUser.impeach_time) < h.cd3 * Tools.oneMinuteMilli)
                    i = 6;
                else {
                    var l = (<any>ModelOfficial).impeach_fail_time;
                    i = 0 != l && n - l < h.cd2 * Tools.oneMinuteMilli ? 5 : 0;
                }
        } else
            i = 0;
        return i;
    }

    public static getCountrNoticeData(t?: any): any {
        return void 0 === t && (t = ""),
            t = ModelUser.getCountryID(t),
            ModelOfficial.country_notice && ModelOfficial.country_notice[t] ? ModelOfficial.country_notice[t] : null;
    }

    public static canEditCountryNotice(): boolean {
        var i = ModelOfficial.getCountryNoticeCfg();
        if (i)
            for (var n = ModelOfficial.getOfficers(), h = 0; h < i.official.length; h++)
                if (n[i.official[h]] && n[i.official[h]][0] == ModelManager.instance.modelUser.mUID)
                    return true;
        return false;
    }

    public static getCountryNoticeCfg(): any {
        var i = ConfigServer.country.country_notice;
        return i || null;
    }

    /** 国告示提交（37 系平台按 pf 附带 pf_data） */
    public static modifyCountryNotice(t: any): void {
        var s: any = { content: t, country: ModelUser.getCountryID() };
        if (ConfigApp.releaseWeiXin())
            switch (ConfigApp.pf) {
                case MiniAdpter.window.game37_fs_pf:
                    s.pf_data = { pid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].pid };
                    break;
                case MiniAdpter.window.game37_pf:
                    s.pf_data = Platform.get37SendData();
            }
        else
            ConfigApp.pf == "cb_h5_37_cn" || ConfigApp.pf == "cb_ad_37_cn" || ConfigApp.pf == "cb_ios_37_cn" ? s.pf_data = Platform.pf_login_data : (ConfigApp.pf == "fs_ad_37" || ConfigApp.pf == "fs_h5_37") && (s.pf_data = { pid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].pid, gid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].gid });
        NetSocket.instance.send("w.modify_country_notice", s);
    }

    /** 长城城缓存（cityGreatWallObj[cid]=buildId） */
    public static isGreatWallByCid(t: any): boolean {
        if (ModelOfficial.cityGreatWallObj || (ModelOfficial.cityGreatWallObj = {}), ModelOfficial.cityGreatWallObj[t])
            return true;
        var n = ConfigServer.city[t];
        if (!n)
            return false;
        var h = ConfigServer.city_build.great_wall;
        if (!h)
            return false;
        for (var o = 0; o < h.length; o++)
            if (n.build && n.build.hasOwnProperty(h[o]))
                return ModelOfficial.cityGreatWallObj[t] = h[o], true;
        return false;
    }

    public static setCityGreatWallObj(): void {
        for (var i in ModelOfficial.cities)
            ModelOfficial.isGreatWallByCid(i);
    }

    /** 城数统计（cityTypeNoCount 排除表；t=-1 计无主 [0,1,2]） */
    public static getCityNum(t: any, i: any, n: any): any {
        var h = 0,
            r: any[] = [];
        for (var a in (ConfigServer.world && ConfigServer.world.cityTypeNoCount && (r = ConfigServer.world.cityTypeNoCount), ModelOfficial.cities)) {
            var l = ModelOfficial.cities[a],
                c = ConfigServer.city[a].cityType;
            r.length > 0 && -1 != r.indexOf(c) || (-1 == t && -1 != [0, 1, 2].indexOf(l.country) || l.country == t) && (n && i < c && (h += 1), i == c && (h += 1));
        }
        return h;
    }

    /** 纵火次数（前导 No.instance.citys[t] 与尾随 cityType[0] 均为丢弃求值，原文如此） */
    public static fireTimes(t: any): any {
        var s = (MapModel.instance.citys[t], ModelOfficial.cities[t]),
            n = 0;
        if (s.fire_times) {
            var h = s.fire_times.times,
                o = 0;
            for (var r in h)
                o += h[r];
            if (h.length <= 0)
                n = 0;
            else {
                var a = ModelManager.instance.modelUser.getGameDate(),
                    l = ConfigServer.country.mayor.cityType[1];
                n = a < l ? Math.ceil(o / a) : Math.ceil(o / l);
            }
            ConfigServer.country.mayor.cityType[0];
        }
        return n;
    }

    public static getKingTipsInfo_Cb(): any {
        var i = "";
        if (!ConfigApp.isLandscape)
            return "";
        if (ModelManager.instance.modelUser.isMergeMaps)
            return "";
        var s = ModelOfficial.getInvadeAwardMax() + 1,
            n = ModelOfficial.getInvadeUnlock(s),
            h = ModelUser.country_name[ModelUser.getCountryID()];
        if (i = ConfigServer.country.country_info.king_tips[s]) {
            var o = n[1][0] ? Tools.getMsgById(n[1][0]) : "",
                r = n[1][1] ? Tools.getMsgById(n[1][1]) : "";
            i = Tools.getMsgById(i, [o, r, h]);
        }
        return i;
    }

    public static getKingTipsInfo_Sg(t: any): any {
        var s = "",
            n = ModelOfficial.getInvadeUnlock(t),
            h = ModelUser.country_name[ModelUser.getCountryID()];
        if (s = ConfigServer.country.country_info.king_tips[t]) {
            var o = n[1][0] ? Tools.getMsgById(n[1][0]) : "",
                r = n[1][1] ? Tools.getMsgById(n[1][1]) : "";
            s = Tools.getMsgById(s, [o, r, h]);
        }
        return s;
    }

    /** 官职解锁文案（横屏取官阶表 Unlock；竖屏新里程碑表 Unlock2 优先） */
    public static getOfficialUnlockInfo(t: any): any {
        var n = "",
            h = ModelOfficial.getOfficerCfg(t),
            o = "",
            r = ModelOfficial.getOfficerName(0);
        if (ConfigApp.isLandscape)
            t + "" == "0" ? 0 == ModelOfficial.getInvadeAwardMax() && (n = Tools.getMsgById(ConfigServer.country.country_info.king_unlock_info, [r])) : (o = h.Unlock, n = ConfigServer.country.country_info.official_unlock_info_new[o], n = Tools.getMsgById(n, [r]));
        else if (sg.model.ModelNewMilepost.instance.isOpen())
            o = h.Unlock2 ? h.Unlock2 : h.Unlock, n = ConfigServer.country.country_info.official_unlock_info_new[o], n = Tools.getMsgById(n, [r]);
        else {
            o = h.Unlock;
            var a = ModelOfficial.getInvadeCfg(o);
            n = ConfigServer.country.country_info.official_unlock_info,
                n = Tools.getMsgById(n, [Tools.getMsgById(a.name)]);
        }
        return n;
    }

    public static getGoldCityInfo(t: any): any {
        var s = ConfigServer.country.country_info.gold_city_tips[t + ""];
        return s ? s = Tools.getMsgById(s) : "";
    }

    public static EVENT_SET_OFFICER_IS_OK: string = "event_set_officer_is_ok";
    public static EVENT_SET_MAYOR_IS_OK: string = "event_set_mayor_is_ok";
    public static EVENT_UPDATE_COUNTRY_DATA: string = "event_update_country_data";
    public static EVENT_CHECK_MILEPOST: string = "event_CHECK_MILEPOST";
    public static EVENT_UPDATE_ALIEN_CD: string = "event_update_ALEIN_CD";
    public static EVENT_UPDATE_IMPEACH: string = "event_update_impeach";
    public static EVENT_UPDATE_RISK_INVESTMENT: string = "event_update_risk_investment";
    public static EVENT_SHOW_GOLD_ESTATE: string = "event_show_gold_estate";
    public static EVENT_HIDE_GOLD_ESTATE: string = "event_hide_gold_estate";
    public static EVENT_SHOW_XYZ: string = "event_show_xyz";
    public static EVENT_HIDE_XYZ: string = "event_hide_xyz";
    public static EVENT_PAY_RANK: string = "event_pay_rank";
    public static EVENT_COUNTRY_CHANGE: string = "event_country_change";
    public static EVENT_COUNTRY_MAYOR: string = "event_country_mayor";
    public static countries: any = null;
    public static cities: any = null;
    public static troops: any = null;
    public static visit: any = null;
    public static xyz_victor_country: any = null;
    public static xyz_estate_add: any = null;
    public static country_notice: any = null;
    public static city_mayor: any = {};
    public static cityGreatWallObj: any = null;
}

/**
 * 原文 5 处 r(1,s,name,getter,sg.model.ModelBase._$SET_name)：setter 实参运行时为
 * undefined。引擎 getset（game.js@351203 唯一定义）此时安装 _$GET_name 标记【并】
 * defineProperty getter-only 访问器（s&&!r 分支）——批次 D「不 defineProperty」判定
 * 有误，批次 K 勘误（见类头特记）。此处保留批次 D 的 _$GET_* 赋值（标记分支如实），
 * 并补 defineProperty 安装行恢复访问器语义；getter 体与批次 D 一致未动。
 */
(<any>ModelOfficial)._$GET_impeach = function (): any {
    var i = ModelOfficial.getMyCountryCfg();
    return i.impeach ? i.impeach : null;
};
(<any>ModelOfficial)._$GET_impeach_fail_time = function (): any {
    var i = ModelOfficial.getMyCountryCfg();
    return i.impeach_fail_time ? Tools.getTimeStamp(i.impeach_fail_time) : 0;
};
(<any>ModelOfficial)._$GET_king_time = function (): any {
    var i = ModelOfficial.getMyCountryCfg();
    return i.king_time ? Tools.getTimeStamp(i.king_time) : 0;
};
(<any>ModelOfficial)._$GET_riskInvestment = function (): any {
    var i = ModelOfficial.getMyCountryCfg();
    return i.investment ? i.investment : null;
};
(<any>ModelOfficial)._$GET_getRiskTime = function (): any {
    return ConfigServer.country.warehouse.tax_time;
};
/** 批次 K 勘误：引擎 getset s&&!r 分支的 defineProperty 安装（game.js@351203，
 *  {get:s,enumerable:!1,configurable:!0}），恢复五个静态的只读访问器语义。 */
Object.defineProperty(ModelOfficial, "impeach", { get: (<any>ModelOfficial)._$GET_impeach, enumerable: !1, configurable: !0 });
Object.defineProperty(ModelOfficial, "impeach_fail_time", { get: (<any>ModelOfficial)._$GET_impeach_fail_time, enumerable: !1, configurable: !0 });
Object.defineProperty(ModelOfficial, "king_time", { get: (<any>ModelOfficial)._$GET_king_time, enumerable: !1, configurable: !0 });
Object.defineProperty(ModelOfficial, "riskInvestment", { get: (<any>ModelOfficial)._$GET_riskInvestment, enumerable: !1, configurable: !0 });
Object.defineProperty(ModelOfficial, "getRiskTime", { get: (<any>ModelOfficial)._$GET_getRiskTime, enumerable: !1, configurable: !0 });

/**
 * 注册身份等价物：原文 o(s,e(13417),i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelOfficial, "sg.model.ModelOfficial", null, null);
