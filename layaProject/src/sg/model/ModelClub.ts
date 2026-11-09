/**
 * sg.model.ModelClub —— 国家俱乐部（异族入侵 alien 阵容/战斗记录/红包，合服 merge 档位
 * 强化档 cfg_alien 动态切换；updateData 字段面拷贝 + alien_new 四联替换）。
 *
 * 原文：code1.js 字节 [1989366,1994947]（包装变量 $o，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelClub"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelClub.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：ue=ModelManager、vs=Tools、Gt=ConfigServer、Ts=Trace、pn=NetSocket、P=Handler、
 * Rt=ConfigApp、gs=StringUtil、re=AssetsManager（批次 B 模块直引）；批次外全局注册路径：
 * Fr=sg.model.ModelShogun（shogun_name）、Rr=sg.model.ModelScience（func_sum_type）、
 * _r=sg.model.ModelHero（sBestHid 静态，sg-externals.d.ts 已有声明）。
 * updateData 尾段 t.hasOwnProperty 在 if(t) 块外（原文如此：t 为 falsy 时同样抛 TypeError）。
 * SOCEKET_GET_CLUB_ALIEN 为 h() 惰性静态：横屏 v1 协议（get club alien 首查后缓存）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";
import { NetSocket } from "../net/NetSocket";
import { ConfigApp } from "../cfg/ConfigApp";
import { StringUtil } from "../utils/StringUtil";
import { AssetsManager } from "../manager/AssetsManager";

export class ModelClub extends ModelBase {

    public alien_new_fight_log: any = null;
    public alien_new_first_win_log: any = null;
    public alien: any = null;
    public alien_log: any = null;
    public alien_lv: number = NaN;
    public alien_refresh_time: any = null;
    public redbag: any = null;
    public redbag_num: number = NaN;
    public _u_redbag_num: number = NaN;
    public fightTime: number = 30000;

    constructor() {
        super();
    }

    public getHerosByIndex(t: number): number {
        return this.alien[t] ? this.alien[t].team[0].troop.length : 0;
    }

    public updateData(t: any): void {
        if (t) {
            for (var s in t)
                this.hasOwnProperty(s) && (this[s] = t[s]);
            t.alien_new && t.alien_new.length > 0 && (this.alien = t.alien_new, this.alien_log = t.alien_new_log, this.alien_lv = t.alien_new_lv, this.alien_refresh_time = t.alien_new_refresh_time);
        }
        (t.hasOwnProperty("alien") || t.hasOwnProperty("alien_new")) && ModelManager.instance.modelUser.event("event_update_btm_btn");
    }

    public updateAlien(t: any): void {
        t && this.alien && this.alien.hasOwnProperty(t[0]) && (this.alien[t[0]] = t[1]);
    }

    /** 我在 t 号异族队伍中的上阵英雄数（uid 字符串比对） */
    public getMyHeroNum(t: number): number {
        var s = 0;
        if (this.alien)
            for (var n = this.alien[t].team[0].troop, h = 0; h < n.length; h++)
                n[h].uid == ModelManager.instance.modelUser.mUID && (s += 1);
        return s;
    }

    /** 可战时间戳；无阵容 -1 */
    public getFightTimeByIndex(t: number): any {
        if (this.alien && this.alien[t].team[0].troop.length > 0) {
            var s = this.alien[t].fight_time;
            if (s)
                return Tools.getTimeStamp(s);
        }
        return -1;
    }

    public getLogFightTimeByIndex(t: number): any {
        if (this.alien_log && this.alien_log[t]) {
            var s = this.alien_log[t];
            return Tools.getTimeStamp(s.fight_time);
        }
        return 0;
    }

    /** 异族基础战力（横屏追加 low_power2/low_power3 档位系数或覆盖，四舍五入） */
    public getLowPower(t: number): number {
        var s = this.getInstanceByIndex(t),
            n = this.cfg_alien.instance[s],
            h = 0;
        if (n && n.hasOwnProperty("power") && (h = n.power, ConfigApp.isLandscape)) {
            var o = this.cfg_alien.low_power2;
            if (o)
                h *= (this.isPowerAdd() ? o[0] : o[1])[t], h = Math.round(h);
            var r = this.cfg_alien.low_power3;
            r && (r[t][0] ? h = r[t][0] : (h *= r[t][1], h = Math.round(h)));
        }
        return h;
    }

    /** 超时可战即自动开战（get_club_alien[_v1]，成功后 event_alien_msg） */
    public checkFight(): void {
        if (this.alien)
            for (var i = this.alien.length, n = 0; n < i; n++) {
                var h = this.getFightTimeByIndex(n);
                if (-1 != h && ConfigServer.getServerTimer() > h) {
                    Trace.log("--ModelClub 自动开战"),
                        NetSocket.instance.send(ModelClub.SOCEKET_GET_CLUB_ALIEN, {}, Handler.create(this, function (i: any) {
                            ModelManager.instance.modelUser.updateData(i.receiveData),
                                ModelManager.instance.modelClub.event(sg.model.ModelClub.EVENT_ALIEN_MSG);
                        }));
                    break;
                }
            }
    }

    public hasPrepareTeam(): boolean {
        if (this.alien)
            for (var i = this.alien, s = 0; s < i.length; s++)
                if (null == i[s].lock && i[s].team[0].troop.length > 0)
                    return true;
        return false;
    }

    /** 最强英雄战力 > 0 号异族低配战力 */
    public checkPowerCanFight(): boolean {
        var t = ModelManager.instance.modelGame.getModelHero(sg.model.ModelHero.sBestHid),
            i = ModelManager.instance.modelClub.getLowPower(0) * this.cfg_alien.low_power;
        return t && t.getPower() > i;
    }

    public isInTeam(): boolean {
        if (this.alien)
            for (var i = this.alien, s = 0; s < i.length; s++)
                for (var n = i[s].team[0].troop, h = 0; h < n.length; h++)
                    if (n[h].uid + "" == ModelManager.instance.modelUser.mUID)
                        return true;
        return false;
    }

    /** 至少在一只队伍中的标记数（每队命中即 break） */
    public inTeamNum(): number {
        var t = 0;
        if (this.alien)
            for (var i = this.alien, s = 0; s < i.length; s++)
                for (var n = i[s].team[0].troop, h = 0; h < n.length; h++)
                    if (n[h].uid + "" == ModelManager.instance.modelUser.mUID) {
                        t += 1;
                        break;
                    }
        return t;
    }

    /** 弱点/buff 条目（bless 加成 + weak.type 对照表；-1 为 bless 位） */
    public getWeakArrByIndex(t: number): any[] {
        var s: any[] = [],
            n = this.alien ? this.alien[t] : null,
            h = "";
        if (n) {
            var o = n.team[0].bless;
            o && o[0] && (h = Tools.getMsgById("country_alien37", [StringUtil.numberToPercent(o[0])]), s.push({ index: -1, iconUrl: AssetsManager.getAssetsICON(this.getPowerIcon(t)), text: this.getPowerName(t), num: o[0], info: h }));
            var r = n.team[1].troop[0].weak;
            if (r)
                for (var a = this.cfg_alien.weak.type, l = 0; l < r.length; l++)
                    for (var c = r[l], u = 0; u < a.length; u++) {
                        var d = a[u][0];
                        if (d[0] == c[0] && d[1] == c[1]) {
                            h = Tools.getMsgById("500081", [sg.model.ModelShogun.shogun_name[u], StringUtil.numberToPercent(c[2])]),
                                s.push({ index: u, icon: d[2], text: d[3], num: c[2], info: h, iconUrl: AssetsManager.getAssetsICON(d[2] + ".png") });
                            break;
                        }
                    }
        }
        return s;
    }

    public getSrcWeakArrByIndex(t: number): any {
        var s = this.alien ? this.alien[t] : null;
        return s ? s.team[1].troop[0].weak : null;
    }

    public getWeakArray(t: any): any {
        if (t)
            for (var s = this.cfg_alien.weak.type, n = 0; n < s.length; n++) {
                var h = s[n][0];
                if (h[0] == t)
                    return h;
            }
        return null;
    }

    public getEnemyTroopDataByIndex(t: number): any {
        return this.alien && this.alien[t] ? this.alien[t].team[1].troop[0] : null;
    }

    /** 战后 fightTime(30s) 内视为战斗中 */
    public checkisFightByIndex(t: number): boolean {
        if (this.alien_log && this.alien_log[t] && ConfigServer.getServerTimer() - Tools.getTimeStamp(this.alien_log[t].fight_time) < this.fightTime)
            return true;
        return false;
    }

    public getTotalAlienKeyNum(): any {
        return this.cfg_alien.alien_keys + sg.model.ModelScience.func_sum_type("alien_keys_add");
    }

    /** 赛季重置判断：登录日 != 赛季号 则 0 */
    public getOpenTimes(): any {
        var i = ModelManager.instance.modelUser.alien_new_reward;
        return i ? ModelManager.instance.modelUser.loginDateNum != i.season_num ? 0 : i.open_times : 0;
    }

    public getAlienPitsLen(): any {
        return this.cfg_alien.alien_pits;
    }

    public getAlienPitsArr(): any[] {
        for (var i: any[] = [], s = this.getAlienPitsLen(), n = ModelManager.instance.modelUser.alien_new_reward, h = 0; h < s; h++)
            n && n.pits[h] ? i.push(n.pits[h]) : i.push(null);
        return i;
    }

    public getLvByIndex(t: number): any {
        var s = t + 1;
        return this.alien && this.alien[t] && this.alien[t].instance ? (s = this.alien[t].instance, this.cfg_alien.instance[s].level) : s;
    }

    public getInstanceByIndex(t: number): any {
        var s = t;
        return this.alien && this.alien[t] && this.alien[t].instance && (s = this.alien[t].instance), s;
    }

    /** 合服档位（merge[mergeNum]）高于当前 alien_lv 时战力取强化档 */
    public isPowerAdd(): boolean {
        var i = this.cfg_alien.merge[ModelManager.instance.modelUser.mergeNum];
        return this.alien_lv < i;
    }

    public getPowerName(t: number): any {
        var s = this.cfg_alien.power_name;
        return s ? (s = this.isPowerAdd() ? s[0] : s[1])[t] : "";
    }

    public getPowerIcon(t: number): any {
        var s = this.cfg_alien.power_bgm;
        return s ? (s = this.isPowerAdd() ? s[0] : s[1])[t] : "";
    }

    public get u_redbag_num(): any {
        return this._u_redbag_num;
    }
    public set u_redbag_num(t: any) {
        this._u_redbag_num = t;
    }

    /** 合服专属 alien_<n> 配置回退通用 alien */
    public get cfg_alien(): any {
        var i = ModelManager.instance.modelUser.mergeNum;
        return ConfigServer.country_club["alien_" + i] ? ConfigServer.country_club["alien_" + i] : ConfigServer.country_club.alien;
    }

    public get max_player_hero(): any {
        return this.cfg_alien.playertroops;
    }

    public get max_hero(): any {
        return this.cfg_alien.troops;
    }

    public static EVENT_ALIEN_MSG: string = "event_alien_msg";
    public static EVENT_COUNTRY_REDBAG: string = "event_country_redbag";
    public static EVENT_COUNTRY_ALIEN_RED: string = "event_country_alien_red";

    /**
     * 原文 h(s,["SOCEKET_GET_CLUB_ALIEN",function(){...}]) —— Laya.static 惰性静态：
     * 横屏协议名 v1 后缀，首查后缓存（静态 getter + defineProperty 换写，ViewScenes 同款）。
     */
    public static get SOCEKET_GET_CLUB_ALIEN(): string {
        var v = ConfigApp.isLandscape ? "get_club_alien_v1" : "get_club_alien";
        Object.defineProperty(ModelClub, "SOCEKET_GET_CLUB_ALIEN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelClub",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelClub, "sg.model.ModelClub", null, null);
