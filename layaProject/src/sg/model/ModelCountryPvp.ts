/**
 * sg.model.ModelCountryPvp —— 国战（xyz）模型：日出/日落/清算三时间点状态机、
 * 床弩 ballista、积分/击杀双排行（reward_<mergeNum> 档）、XYZ2（新国战 tag）双形态、
 * 横屏 CBZZ 副本分支；构造即挂 NetSocket event_socket_receive_to + ModelXYZ2 聚合。
 *
 * 原文：code1.js 字节 [2000191,2014493]（包装变量 tr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelCountryPvp"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelCountryPvp.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖（批次 A/B/C 模块直引）：Gt=ConfigServer、ue=ModelManager、pn=NetSocket、P=Handler、
 * vs=Tools、cs=ObjectUtil、Ze=ArrayUtil、tn=ViewManager、us=SaveLocal、as=MusicManager、Rt=ConfigApp、
 * Ht=ConfigClass（VIEW_COUNTRY_PVP_TIPS/VIEW_COUNTRY_TRIBUTARY_TIPS 惰性对）；本批类直引：
 * Sr=ModelOfficial、No=MapModel、Kr=ModelUser。
 * 批次外全局注册路径：Hr=sg.model.ModelXYZ2、_h=sg.activities.model.ModelAfficheMerge
 * （instance.mergeday）、sr=sg.model.ModelDungeon（instance：default_map/hasCBZZ/hasLJ/nextCBZZ/openDay）、
 * ds=sg.utils.ServerDate、R3=sg.view.countryPvp.ViewCountryEmperorTips（类引用）、
 * Ku=sg.map.view.MapViewMain（loadComplete 探测）、gi=sg.fight.logic.cfg.ConfigFight（overflowSpeedUp）、
 * js=sg.guide.model.ModelGuide、_r=sg.model.ModelHero（getHeroName）。
 * getTxt 的 xyz2 分支三元表与默认表相同（原文如此）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { Tools } from "../utils/Tools";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { ViewManager } from "../manager/ViewManager";
import { SaveLocal } from "../utils/SaveLocal";
import { MusicManager } from "../utils/MusicManager";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigClass } from "../cfg/ConfigClass";
import { ModelOfficial } from "./ModelOfficial";
import { MapModel } from "../map/model/MapModel";
import { ModelUser } from "./ModelUser";

export class ModelCountryPvp extends ModelBase {

    public xyzDisabled: boolean = false;
    public mSunrise: number = NaN;
    public mSunset: number = NaN;
    public mLast: number = NaN;
    public mPushTime: number = NaN;
    public mBtnTime: number = NaN;
    public mIsToday: boolean = false;
    public mSeasonNum: number = NaN;
    public mCycleTime: number = NaN;
    public mPushSunrised: boolean = false;
    public mPushSunseted: boolean = false;
    public mPushSpeeded: boolean = false;
    public mMoveSpeed: number = NaN;
    public mNextOpenDay: number = NaN;
    public buildInfoArr: any[] = [];
    public ballistaIds: any = null;
    public xyz: any = null;
    public myCredit: number = 0;
    public myCreditRound: number = 0;
    public modelXYZ2: any = null;
    public _inited: boolean = false;
    public _showEnemyTroop: boolean = true;
    public _showPartnerTroop: boolean = true;

    constructor() {
        super();
        this.modelXYZ2 = new sg.model.ModelXYZ2(this),
            NetSocket.instance.on("event_socket_receive_to", this, this.event_socket_receive_to);
    }

    public updateXYZ(t: any): void {
        if (t && (t.hasOwnProperty("xyz") ? this.xyz = t.xyz : this.xyz = t), this.initPvpData(), this.xyz) {
            var s = ModelManager.instance.modelUser.mUID;
            this.myCredit = this.xyz.credit_rank[s] || 0,
                this.myCreditRound = this.xyz.credit_round_rank.data[s] || 0,
                this.modelXYZ2.refreshData(this.xyz);
        }
    }

    public getRankReward(t: any, i: any): any[] {
        var n = ArrayUtil.find(t, function (t: any) { return i <= t[0]; }) || t[t.length - 1],
            h = ModelManager.instance.modelProp.getCfgPropArr(n[1]);
        return h.forEach(function (t: any) { t[2] = -1; }), h;
    }

    public checkActive(): boolean {
        return this.isOpen || this.xyz && this.xyz.status > 0;
    }

    public checkAfficheMerge(t?: any): boolean {
        void 0 === t && (t = false);
        var s = sg.activities.model.ModelAfficheMerge.instance.mergeday;
        return s && s === this.mNextOpenDay && t;
    }

    public getTxt(t?: any): any {
        void 0 === t && (t = 0),
            this.updateBtnTime();
        var s = ["_countrypvp_text41", "_countrypvp_text42", "_countrypvp_text43"];
        switch (this.tag === "xyz2" && (s = ["_countrypvp_text41", "_countrypvp_text42", "_countrypvp_text43"]), t) {
            case 0:
                return Tools.getMsgById(s[this.getStatus()], [Tools.getTimeStyle(this.mBtnTime)]);
            case 1:
                return Tools.getMsgById(s[this.getStatus()]).split("\n")[0];
            case 2:
                return Tools.getTimeStyle(this.mBtnTime);
        }
        return "";
    }

    public isLast(): boolean {
        var i = ConfigServer.getServerTimer();
        return 0 !== this.mSunset && i >= this.mSunset && i < this.mLast;
    }

    public getStatus(): number {
        var i = ConfigServer.getServerTimer();
        return 0 != this.mSunrise && i < this.mSunrise ? 0 : 0 != this.mSunset && i < this.mSunset ? 1 : 0 != this.mLast && i < this.mLast ? 2 : 0;
    }

    /** t=true 强制重算；横屏 CBZZ 副本期按 openDay 偏移，竖屏按 gap/merge_cycle 轮转 */
    public initPvpData(t?: any): void {
        if (void 0 === t && (t = false), (t || !this._inited) && (this._inited = true, this.mBtnTime = this.mPushTime = this.mSunrise = this.mSunset = this.mLast = this.mMoveSpeed = 0, this.mPushSunrised = this.mPushSunseted = true, this.mIsToday = false, this.mPushSpeeded = false, !this.xyzDisabled && this.cfg && !this.checkAfficheMerge(true))) {
            this.ballistaIds = [this.cfg.ballista.car.hero, this.cfg.ballista.big_car.hero];
            var s = ConfigServer.getServerTimer(),
                n = ModelManager.instance.modelUser.loginDateNum;
            if (ConfigApp.isLandscape) {
                var h = sg.model.ModelDungeon.instance;
                if (h.hasCBZZ) {
                    var o = h.openDay;
                    this.mSeasonNum = n - 1;
                    var r = (o - n) * Tools.oneDayMilli;
                    this.mSunrise = Tools.getTodayMillWithHourAndMinute(this.cfg.sunrise) + r,
                        this.mSunset = Tools.getTodayMillWithHourAndMinute(this.cfg.sunset) + r,
                        this.mLast = Tools.getTodayMillWithHourAndMinute(this.cfg.latest_time) + r,
                        this.mMoveSpeed = Tools.getTodayMillWithHourAndMinute(this.cfg.special_time.move[0]) + r,
                        s > this.mLast && (this.mMoveSpeed = 0),
                        this.mIsToday = n == o;
                }
            } else {
                var a = ModelManager.instance.modelUser.isMerge;
                if (0 == a && 1 == this.cfg.merge)
                    return;
                var l = new sg.utils.ServerDate(s),
                    c = a ? this.cfg.merge_ini : this.cfg.gap_ini,
                    u = a ? this.cfg.merge_cycle : this.cfg.gap,
                    d = 0,
                    _ = l.getHours(),
                    m = l.getMinutes(),
                    g = ConfigServer.system_simple.deviation ? ConfigServer.system_simple.deviation : 0;
                if (n <= c)
                    0 == (d = c - n) && 60 * _ + m < g && (d = u - 1),
                        this.mNextOpenDay = c;
                else {
                    var f = (n - c) % u;
                    0 != f ? d = u - f : 60 * _ + m < g && (d = u - 1);
                    for (var p = 1; p < 365; p++) {
                        var v = c + p * u;
                        if (v >= n && c + (p - 1) * u < n) {
                            this.mNextOpenDay = v;
                            break;
                        }
                    }
                }
                this.mSeasonNum = n - 1;
                var y = d * Tools.oneDayMilli;
                this.mSunrise = Tools.getToDayHourMill(this.cfg.sunrise) + y,
                    this.mSunset = Tools.getToDayHourMill(this.cfg.sunset) + y,
                    this.mLast = Tools.getToDayHourMill(this.cfg.latest_time) + y,
                    this.mMoveSpeed = Tools.getToDayHourMill(this.cfg.special_time.move[0]) + y,
                    s > this.mLast && (this.mMoveSpeed = 0),
                    (n == c || n > c && (n - c) % u == 0) && (this.mIsToday = true);
            }
            this.updatePushTime(),
                this.updateBtnTime(),
                this.mIsToday && (s > this.mSunset ? this.mPushSunrised = true : this.mPushSunrised = s > this.mSunrise, this.mPushSunseted = s > this.mSunset);
        }
    }

    public showXYZBubble(t: any): boolean {
        if (t !== ModelManager.instance.modelCountryPvp.xyCityId + "")
            return false;
        if (ConfigApp.isLandscape) {
            var s = sg.model.ModelDungeon.instance;
            if (s.default_map == "cbzz" && 0 == ModelManager.instance.modelUser.mergeNum)
                return true;
            if (s.hasCBZZ) {
                var n = ConfigServer.getServerTimer();
                return n < this.mSunrise || n > this.mSunset;
            }
            return true;
        }
        var h = !ModelManager.instance.modelCountryPvp.checkActive(),
            o = !ModelManager.instance.modelCountryPvp.checkAfficheMerge(),
            r = 1 == this.cfg.merge && ModelManager.instance.modelUser.isMerge || 0 == this.cfg.merge;
        return h && o && r;
    }

    public event_socket_receive_to(t: any, i: any): void {
        if (this.cfg) {
            var n = t.method,
                h = t.data;
            if (!Tools.isNullObj(h) && !h.hasOwnProperty("msg"))
                switch (n) {
                    case "w.get_info":
                    case "w.push_xyz":
                        this.updateXYZ(h.xyz);
                        break;
                    case "w.build_ballista_push":
                        this.updateXYZ(h[0]),
                            this.buildInfoArr.push([h[1], h[2], h[3]]),
                            this.event("event_update_ballista");
                        break;
                    case "w.xyz_over":
                        if (this.event("event_xyz_over"), this.xyz = null, sg.guide.model.ModelGuide.forceGuide())
                            return;
                        h.victor_country && typeof h.victor_country == "number" || this.showEmperorTips(h),
                            ModelManager.instance.modelOfficel.event("event_show_xyz");
                }
        }
    }

    public showEmperorTips(t: any): void {
        ViewManager.instance.showHeroTalk([[this.pushShow[0], this.pushShow[1], this.pushText[3]]], function () {
            var s = [t.victor_country.tid, t.victor_country.official[0][1]];
            ViewManager.instance.showView(["ViewCountryEmperorTips", sg.view.countryPvp.ViewCountryEmperorTips], s),
                MusicManager.playSoundUI("xyz08");
        }, "", { delayEvent: true });
    }

    /** push_count/push_gap 阶梯预告时间 */
    public updatePushTime(): void {
        if (!this.xyzDisabled) {
            var i = ConfigServer.getServerTimer();
            this.mPushTime = 0;
            var s = 1,
                n = 0;
            if (this.mIsToday)
                if (i < this.mSunrise) {
                    if (i < this.mSunrise - this.cfg.push_count * Tools.oneMinuteMilli)
                        this.mPushTime = this.mSunrise - this.cfg.push_count * Tools.oneMinuteMilli;
                    else
                        for (var h = 0; h < 99; h++) {
                            if (n = (n = this.cfg.push_count - s * this.cfg.push_gap) < 0 ? 0 : n, i < this.mSunrise - n * Tools.oneMinuteMilli) {
                                this.mPushTime = this.mSunrise - n * Tools.oneMinuteMilli;
                                break;
                            }
                            s++;
                        }
                } else if (i >= this.mSunrise && i < this.mSunset) {
                    if (i < this.mSunset - this.cfg.push_count * Tools.oneMinuteMilli)
                        this.mPushTime = this.mSunset - this.cfg.push_count * Tools.oneMinuteMilli;
                    else
                        for (var o = 0; o < 99; o++) {
                            if (n = (n = this.cfg.push_count - s * this.cfg.push_gap) < 0 ? 0 : n, i < this.mSunset - n * Tools.oneMinuteMilli) {
                                this.mPushTime = this.mSunset - n * Tools.oneMinuteMilli;
                                break;
                            }
                            s++;
                        }
                }
        }
    }

    public updateBtnTime(): void {
        if (!this.xyzDisabled) {
            var i = ConfigServer.getServerTimer();
            i > this.mLast ? this.mBtnTime = 0 : i > this.mSunset ? (this.mBtnTime = this.mLast - i, null == this.xyz && (this.mBtnTime = 0)) : i >= this.mSunrise ? this.mBtnTime = this.mSunset - i : i > this.mSunrise - this.cfg.entrance2 * Tools.oneHourMilli ? this.mBtnTime = this.mSunrise - i : this.mBtnTime = 0,
                this.mBtnTime < 0 && (this.mBtnTime = 0);
        }
    }

    /** 到点推送链：预告 / 开战（VIEW_COUNTRY_PVP_TIPS）/ 日落 / 加速 */
    public checkShowPush(): void {
        if (!this.xyzDisabled) {
            var i = ConfigServer.getServerTimer();
            if (0 != this.mPushTime && i > this.mPushTime && (this.showPushView(), this.updatePushTime()), !this.mPushSunrised && i > this.mSunrise && sg.map.view.MapViewMain.instance && sg.map.view.MapViewMain.instance.loadComplete) {
                if (this.updateBtnTime(), this.event("event_xyz_start"), ModelManager.instance.modelOfficel.event("event_hide_xyz"), this.mPushSunrised = true, sg.guide.model.ModelGuide.forceGuide())
                    return;
                ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_PVP_TIPS, null, null, { delayEvent: true });
            }
            !this.mPushSunseted && i > this.mSunset && (this.updateBtnTime(), this.event("event_xyz_time_out"), this.mPushSunseted = true),
                0 != this.mMoveSpeed && !this.mPushSpeeded && i > this.mMoveSpeed && (this.mPushSpeeded = true, this.event("event_xyz_move_speed", this.cfg.special_time.move[1]));
        }
    }

    public getSpeedNum(): any {
        var i = ConfigServer.getServerTimer();
        return this.checkActive() && 0 != this.mMoveSpeed && i >= this.mMoveSpeed ? this.cfg.special_time.move[1] : 1;
    }

    public showPushView(): void {
        if (!this.xyzDisabled && !sg.guide.model.ModelGuide.forceGuide()) {
            var i, s = ConfigServer.getServerTimer(),
                n = 0;
            this.mPushTime !== this.mSunrise && (s < this.mSunrise ? (n = Math.round((this.mSunrise - s) / Tools.oneMinuteMilli), i = this.pushText[0]) : s > this.mSunrise && s < this.mSunset && (n = Math.round((this.mSunset - s) / Tools.oneMinuteMilli), i = this.pushText[1]), n > 0 && MusicManager.playSoundUI("xyz02"), n > 0 && ViewManager.instance.showHeroTalk([[this.pushShow[0], this.pushShow[1], i, [n]]], null, "", { delayEvent: true }));
        }
    }

    /** xyz2 首弹按国家取 push_show_xyz2[1] 武将（_r.getHeroName） */
    public showFristHeroTalk(): void {
        if (this.tag === "xyz2") {
            var i = this.cfg.push_show_xyz2[1][ModelManager.instance.modelUser.country];
            ViewManager.instance.showHeroTalk([[i, sg.model.ModelHero.getHeroName(i), this.pushText[2]]], null, "", { delayEvent: true });
        } else
            ViewManager.instance.showHeroTalk([[this.pushShow[0], this.pushShow[1], this.pushText[2]]], null, "", { delayEvent: true });
    }

    /** 每届首次提示（本地档 local_save_key_xyz_begin_+mUID，season_num 比对） */
    public checkShowBeginTips(): boolean {
        var i = SaveLocal.getValue("local_save_key_xyz_begin_" + ModelManager.instance.modelUser.mUID, true);
        return !(!this.isOpen || i && i.season_num == this.mSeasonNum);
    }

    public updateCycleTime(): void {
        if (this.mCycleTime = 0, !this.xyzDisabled) {
            var i = ConfigServer.getServerTimer(),
                s = this.cfg.personal.ranking.cycle * Tools.oneMinuteMilli;
            if (this.isOpen) {
                var n = Math.ceil((i - this.mSunrise) / s);
                n = n < 1 ? 1 : n,
                    this.mCycleTime = this.mSunrise + s * n;
            }
        }
    }

    public getListData(t: any, i: any): void {
        var s = this,
            n = t.map(function (t: any) { return t.uid; });
        ModelManager.getUserInfo(n, Handler.create(this, function () {
            var e = t.map(function (t: any) {
                return ObjectUtil.mergeObjects([t, ModelManager.userDict[t.uid]], false);
            });
            i.runWith([e]);
        }));
    }

    public getXYCountry(t?: any): any {
        return void 0 === t && (t = false),
            t || !this.checkActive() ? ModelOfficial.getXYCountryId() : -1;
    }

    public isVictoryXYZ(t?: any): boolean {
        void 0 === t && (t = "");
        var i = ModelUser.getCountryID(t);
        return this.getXYCountry() == i;
    }

    public getDoorByCountry(t: any): any[] {
        for (var s = this.xyCityDoorsIds, n: any[] = [], h = 0; h < s.length; h++)
            ModelOfficial.cities[s[h]].country == t && n.push(s[h]);
        return n;
    }

    public getDoorAdd(): any {
        for (var i = this.getDoorByCountry(ModelManager.instance.modelUser.country), s = 0, n = 0; n < i.length; n++)
            s += this.cfg.effect_door[i[n]];
        return s;
    }

    /** 朝贡提示（每天一次本地档；t=false 仅查询） */
    public showTrbutaryView(t?: any): boolean {
        if (void 0 === t && (t = true), this.xyzDisabled || sg.guide.model.ModelGuide.forceGuide() || this.checkActive())
            return false;
        var s = this.getXYCountry();
        if (-1 == [0, 1, 2].indexOf(s))
            return false;
        if (ModelManager.instance.modelUser.getGameSeason() != ConfigServer.country.warehouse.tribute[0])
            return false;
        var n = SaveLocal.getValue("local_save_key_country_tribute_" + ModelManager.instance.modelUser.mUID, true),
            h = false;
        if (n ? n.login_num != ModelManager.instance.modelUser.loginDateNum && (h = true) : h = true, h) {
            if (!t)
                return true;
            ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_TRIBUTARY_TIPS);
        }
        return false;
    }

    /** 开战日日出前重置王城/四门归属（Sr.updateCityMayor + onFightEndHandler 逐城） */
    public clearXYZ(): void {
        if (this.mIsToday && ConfigServer.getServerTimer() < this.mSunrise) {
            var i = this.xyCityId;
            ModelOfficial.updateCityMayor(2, { city: { cid: i, country: ConfigServer.city[i].country } });
            for (var s = this.xyCityDoorsIds, n = [i, s[0], s[1], s[2], s[3]], h = 0, o = n.length; h < o; h++) {
                var r = Number(n[h]);
                ModelOfficial.cities[r].country = ConfigServer.city[r].country,
                    ModelOfficial.cities[r].mayor = null,
                    ModelOfficial.cities[r].troop = ConfigServer.city[r].troop[0],
                    MapModel.instance.onFightEndHandler({ city: { cid: r, country: ConfigServer.city[r].country } }, false);
            }
            ModelOfficial.xyz_estate_add = null,
                ModelManager.instance.modelOfficel.event("event_hide_gold_estate");
        }
    }

    public showHeroTalk(t: any, i?: any): void {
        switch (i = null == i ? [] : i, t) {
            case "500043":
            case "500043_maps":
                MusicManager.playSoundUI("xyz06");
                break;
            case "500044":
                MusicManager.playSoundUI("xyz07");
        }
        ViewManager.instance.showHeroTalk([[this.pushShow[0], this.pushShow[1], t, i]], null, "", { delayEvent: true });
    }

    public isXYZCity(t: any): boolean {
        return !(!this.cfg || !this.cfg.xyz_cityid) && -1 !== ArrayUtil.flat(this.cfg.xyz_cityid).indexOf(t + "");
    }

    public getXyzFrontIdByCountry(t?: any): any {
        return void 0 === t && (t = -1),
            -1 == t ? this.xyCountryFrontId : this.cfg && this.cfg.xyz_cityid ? this.cfg.xyz_cityid[2][t] : -1 * (t + 10);
    }

    public get isOpen(): any {
        var i = ConfigServer.getServerTimer();
        return !this.xyzDisabled && i >= this.mSunrise && i < this.mSunset;
    }

    public get title(): any {
        return Tools.getMsgById(this.tag === "xyz2" ? "xyz2_text000" : "_countrypvp_text0");
    }

    public get cfg(): any {
        return ConfigServer.country_pvp;
    }

    /** 全服积分排行（total_ranking.reward_<mergeNum> 档位奖励） */
    public get credit_rank(): any[] {
        var i = this;
        if (!this.xyz)
            return [];
        var s = ModelManager.instance.modelUser,
            n = this.cfg.total_ranking["reward_" + s.mergeNum],
            h = ObjectUtil.entries(this.xyz.credit_rank).map(function (i: any) {
                var n = i[0];
                return { uid: n, isMine: n === String(s.mUID), num: i[1] };
            }).filter(function (i: any) { return i.num > 0; }).sort(function (i: any, e: any) { return e.num - i.num; }).slice(0, this.cfg.total_ranking.max);
        return h.forEach(function (e: any, s: number) {
            e.index = s + 1,
                e.reward = i.getRankReward(n, e.index);
        }), h;
    }

    public get tag(): any {
        return this.cfg ? this.cfg.xyz_tag || "xyz" : "";
    }

    /** 击杀榜（kill_rank 按国家分组展平，取 kill_list 条） */
    public get kill_rank(): any[] {
        if (!this.xyz)
            return [];
        var i = this.xyz.kill_rank,
            s = ArrayUtil.flat(i.map(function (i: any, e: number) {
                return ObjectUtil.keys(i).map(function (t: any) { return { uid: t, country: e, num: i[t] || 0 }; });
            })).filter(function (i: any) { return i.num > 0; }).sort(function (i: any, e: any) { return e.num - i.num; }).slice(0, this.cfg.kill_list);
        return s.forEach(function (i: any, e: number) { i.index = e + 1; }), s;
    }

    /** 本届轮积分榜（personal.ranking） */
    public get credit_round(): any[] {
        var i = this;
        if (!this.xyz)
            return [];
        var s = this.xyz.credit_round_rank.data,
            n = ModelManager.instance.modelUser,
            h = this.cfg.personal.ranking["reward_" + ModelManager.instance.modelUser.mergeNum],
            o = ObjectUtil.entries(s).map(function (i: any) {
                var e = i[0];
                return { uid: e, isMine: e === String(n.mUID), num: i[1] };
            }).filter(function (i: any) { return i.num > 0; }).sort(function (i: any, e: any) { return e.num - i.num; }).slice(0, this.cfg.personal.ranking.max);
        return o.forEach(function (e: any, s: number) {
            e.index = s + 1,
                e.reward = i.getRankReward(h, e.index);
        }), o;
    }

    public get active(): any {
        return this.mBtnTime > 0;
    }

    /** 斩兽时段表（special_time.fight [门槛,加速值]，ConfigFight.overflowSpeedUp） */
    public get showZhangu(): any {
        for (var i = 9999999, s = (ConfigServer.getServerTimer() - this.mSunrise) / Tools.oneMinuteMilli, n = this.cfg.special_time.fight, h = 0; h < n.length; h++) {
            var o = n[h];
            if (s < o[0]) {
                i = o[1];
                break;
            }
        }
        return !sg.fight.logic.cfg.ConfigFight.overflowSpeedUp(i);
    }

    public get pushShow(): any {
        return this.tag === "xyz2" ? this.cfg.push_show_xyz2[0] : this.cfg.push_show;
    }

    /** xyz2 推送文案数组按国家取第 3 元素（原地改写缓存，原文如此） */
    public get pushText(): any {
        if (this.tag === "xyz2") {
            var i = this.cfg.push_text_xyz2;
            return i.forEach(function (e: any, s: number) {
                e instanceof Array && 3 === e.length && (i[s] = e[ModelManager.instance.modelUser.country]);
            }), i;
        }
        return this.cfg.push_text;
    }

    public get openTime(): any {
        var i = ConfigServer.getServerTimer();
        if (ConfigApp.isLandscape) {
            var s = sg.model.ModelDungeon.instance;
            if (s.default_map == "cbzz" && 0 == ModelManager.instance.modelUser.mergeNum)
                return -1;
            if (s.hasCBZZ && i < this.mSunrise)
                return this.mSunrise - i;
            if (s.hasLJ) {
                var n = s.nextCBZZ - ModelManager.instance.modelUser.loginDateNum;
                return Tools.getToDayHourMill([this.cfg.sunrise[0], this.cfg.sunrise[1], n]) - i;
            }
            return -1;
        }
        if (0 != this.mSunset && i > this.mSunset) {
            var h = ModelManager.instance.modelUser.isMerge ? this.cfg.merge_cycle : this.cfg.gap;
            return this.mSunrise + h * Tools.oneDayMilli - i;
        }
        return 0 != this.mSunrise && i < this.mSunrise ? this.mSunrise - i : -1;
    }

    public get redPoint(): any {
        return false;
    }

    public get xyCityDoorsIds(): any[] {
        return this.cfg && this.cfg.xyz_cityid ? this.cfg.xyz_cityid[1] : ["-2", "-3", "-4", "-5"];
    }

    public get xyCityId(): any {
        return this.cfg && this.cfg.xyz_cityid ? Number(this.cfg.xyz_cityid[0]) : -1;
    }

    public get xyCountryFrontId(): any {
        return this.cfg && this.cfg.xyz_cityid ? this.cfg.xyz_cityid[2][ModelManager.instance.modelUser.country] : -1 * (ModelManager.instance.modelUser.country + 10);
    }

    public get player_show(): any {
        var i = this.cfg.player_show || [0];
        return i[0] ? i[1] : null;
    }

    public get showEnemyTroop(): any {
        return this._showEnemyTroop;
    }
    public set showEnemyTroop(t: any) {
        this._showEnemyTroop = t,
            this.event("troop_visible");
    }

    public get showPartnerTroop(): any {
        return this._showPartnerTroop;
    }
    public set showPartnerTroop(t: any) {
        this._showPartnerTroop = t,
            this.event("troop_visible");
    }

    public static EVENT_UPDATE_MENU_USER_BTN: string = "event_update_menu_user_btn";
    public static EVENT_UPDATE_BALLISTA: string = "event_update_ballista";
    public static EVENT_XYZ_START: string = "event_xyz_start";
    public static EVENT_XYZ_TIME_OUT: string = "event_xyz_time_out";
    public static EVENT_XYZ_OVER: string = "event_xyz_over";
    public static EVENT_XYZ_MOVE_SPEED: string = "event_xyz_move_speed";
    public static TROOP_VISIBLE: string = "troop_visible";
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelCountryPvp",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelCountryPvp, "sg.model.ModelCountryPvp", null, null);
