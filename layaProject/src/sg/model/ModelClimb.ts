/**
 * sg.model.ModelClimb —— 攀爬/PVE（climb 配置驱动）+ 异族入侵城池（pk_npc）+
 * 演武场冠军赛程（champion：combat_time 赛程表推算 start/use/bet/round 计时）双职责模型。
 *
 * 原文：code1.js 字节 [1968867,1989358]（包装变量 Qo，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelClimb"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelClimb.js
 *
 * 批次 D 入批原因：ModelGame.checkPKnpcFightTimerStatus/checkPKnpcCaptain 直引其
 * pk_npc_models/captain_curr 族静态。
 * 依赖（批次 A/B/C 模块直引）：ue=ModelManager、pn=NetSocket、P=Handler、Gt=ConfigServer、
 * vs=Tools、tn=ViewManager、us=SaveLocal（savaObjByKey 原文拼写如此）、Ht=ConfigClass
 * （VIEW_CAPTAIN_MAIN/VIEW_ALIEN_MAIN）、Ut=Platform（uploadActionData）、cs=ObjectUtil、
 * re=AssetsManager（getAssetLater/getAssetsICON）；本批直引：lr=ModelGame（redCheckOnce）、
 * Kr=sg.model.ModelUser（var-map 实证：ModelClimb 原文 Kr["getCountryID"] 为 ModelUser 静态）。
 * 批次外全局注册路径：Me=sg.model.ModelPrepare（getData/getFormatPower 静态战力）、
 * ci=sg.fight.FightMain（startBattle）、Nl=sg.model.ModelTroop（TROOP_STATE_MONSTER/IDLE）、
 * yr=sg.model.ModelItem（getItemIcon）、hn=sg.map.view.TroopAnimation（静态 backTroop）。
 * 引擎：K=laya.maths.MathUtil（sortByKey）。
 * ws_sr_get_my_pk_yard_hids 中两分支均取 "_climb54" 为原文如此（疑似上游坍缩，忠实保留）。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { SaveLocal } from "../utils/SaveLocal";
import { Platform } from "../laya/Platform";
import { ConfigClass } from "../cfg/ConfigClass";
import { ObjectUtil } from "../utils/ObjectUtil";
import { AssetsManager } from "../manager/AssetsManager";
import { ModelGame } from "./ModelGame";
import { ModelUser } from "./ModelUser";

export class ModelClimb extends ModelBase {

    public pk_npc_id: any = null;
    public pk_npc_fight_ing: boolean = false;
    public pk_npc_award: boolean = false;
    public pk_npc_status: number = -1;
    public pk_npc_hids: any = null;
    public enemy_now_num: number = 0;
    public mKillWave: number = 0;
    public fightTimes: number = 100;
    public hpsTemp: any = null;
    public mUserTroopToFight: any = null;

    constructor() {
        super();
        this.setClimbFightingToEnd();
    }

    /** 跳过战斗门槛：总战力超 world.skip_climb_power 直接跳过 */
    public climb_fight(t: any, i: any): void {
        if (!i && ConfigServer.world.skip_climb_power) {
            for (var n = t.pk_data.team[0].troop, h = n.length, o = 0, r = 0; r < h; r++) {
                o += sg.model.ModelPrepare.getData(n[r]).power;
            }
            if (o > ConfigServer.world.skip_climb_power)
                return;
        }
        var a = ModelManager.instance.modelClimb.getCurrClimbMs();
        a >= 0 && (t.pk_data.skipTime = a / 1e3),
            sg.fight.FightMain.startBattle(t);
    }

    public getBuyTimes(): any {
        return ModelClimb.getCfgConfigure().buy;
    }

    public getBuyTimesGet(): any {
        return Tools.isNewDay(ModelManager.instance.modelUser.climb_records.buy_time) ? 0 : ModelManager.instance.modelUser.climb_records.buy_times;
    }

    public getMyClimbTimes(): any {
        return Tools.isNewDay(ModelManager.instance.modelUser.climb_records.combat_time) ? this.getFightTimesByDay() : ModelManager.instance.modelUser.climb_records.combat_times;
    }

    public getMyClimbAward(): any {
        var i = ModelManager.instance.modelUser.climb_records.reward;
        return i || {};
    }

    public isGetAward(): boolean {
        return this.isClimbIng() <= 0 && Tools.getDictLength(this.getMyClimbAward(), true) > 0;
    }

    public getClimbAwardToMe(t: any): void {
        NetSocket.instance.send("get_climb_reward", {}, Handler.create(this, function (e: any) {
            Platform.uploadActionData(21, null);
            var n = ModelManager.instance.modelClimb.getMyClimbAward();
            ModelManager.instance.modelUser.updateData(e.receiveData),
                ViewManager.instance.showRewardPanel(n),
                ModelManager.instance.modelGame.inHome && ModelManager.instance.modelInside.getBuildingModel("building007").updateStatus(true),
                t && t.run();
        }));
    }

    public setClimbFightingToEnd(): void {
        var i = this.isClimbIng();
        i <= 0 || Laya.timer.once(i + 1e3, this, function () {
            ModelManager.instance.modelClimb.isGetAward() && ModelManager.instance.modelGame.inHome && ModelManager.instance.modelInside.getBuildingModel("building007").updateStatus(true);
        });
    }

    public isClimbIng(): any {
        var i = 0,
            s = ModelManager.instance.modelUser.climb_records.end_time;
        Tools.isNullObj(s) ? i = 0 : i = Tools.getTimeStamp(s) + 1e3 - ConfigServer.getServerTimer();
        return i;
    }

    public getCurrClimbMs(): any {
        var i = this.isClimbIng();
        if (i <= 0)
            return -1;
        var s = 1e3 * ModelManager.instance.modelUser.climb_records.pk_result.time;
        return Math.max(1, s - i);
    }

    public getCurrClimbScore(): any {
        var i = this.getCurrClimbMs();
        if (i <= 0)
            return null;
        for (var s = [0, 0], n = 0, h = ModelManager.instance.modelUser.climb_records.pk_result.records, o = h.length, r = 0; r < o; r++) {
            var a = h[r];
            if (!((n += 1e3 * a.time) < i))
                break;
            s[a.winner]++;
        }
        return s;
    }

    public getUserClimbScore(): any {
        var i = ModelManager.instance.modelUser.climb_records,
            s = [0, 0];
        if (i.pk_result) {
            var n = i.pk_result.records;
            if (n)
                for (var h = n.length, o = 0; o < h; o++) {
                    s[n[o].winner]++;
                }
        }
        return s;
    }

    public getFightTimesByDay(): any {
        return ModelClimb.getCfgConfigure().frequency;
    }

    public getPClv(): any {
        return ModelManager.instance.modelUser.world_lv;
    }

    public getTimesBuyCoin(): any {
        return ModelClimb.getCfgConfigure().consume;
    }

    public getAwardItems(): any {
        return ModelClimb.getCfgConfigure().preview;
    }

    /** 赛季轮换（season_num%4 与游戏季错位则清零） */
    public getMyKillNumMax(): any {
        var i = ModelManager.instance.modelUser.climb_records.season_num % 4,
            s = ModelManager.instance.modelUser.getGameDate() - 1,
            n = ModelClimb.getCfgConfigure().num_season;
        return n == i && s > ModelManager.instance.modelUser.climb_records.season_num && ModelManager.instance.modelUser.getGameSeason() == n ? 0 : ModelManager.instance.modelUser.climb_records.kill_wave;
    }

    public getClimbRankAward(t: any): any {
        for (var s = ModelClimb.getCfgConfigure().num_reward, n = s.length, h = 0; h < n - 1 && !(t <= parseInt(s[h][0])); h++);
        var o: any = {};
        return o.show = s[h][1].show,
            o.reward = s[h][1].reward,
            o;
    }

    public getPKtimesMax(): any {
        return this.getPKtimesByDay() + this.getPKmyBuyTimes() * this.getPKtimesForBuyOne();
    }

    public getPKtimesByDay(): any {
        return ConfigServer.pk.pk_count[0];
    }

    public getPKtimesForBuyOne(): any {
        return ConfigServer.pk.pk_count[1];
    }

    public getPKbuyForIndex(): any {
        return ConfigServer.pk.pk_count[2];
    }

    public getPKrankBest(): any {
        return ModelManager.instance.modelUser.pk_records.best_rank;
    }

    public getPKlog(): any {
        return ModelManager.instance.modelUser.pk_records.log;
    }

    public getPKawardByOnec(): any {
        return ConfigServer.pk.pk_once_award;
    }

    public getPKmyTimes(): any {
        var i = ModelManager.instance.modelUser.pk_records.pk_times;
        if (Tools.isNewDay(ModelManager.instance.modelUser.pk_records.pk_time)) {
            var s = this.getPKtimesMax();
            if (i < s)
                return s;
        }
        return i;
    }

    public getPKmyBuyTimes(): any {
        return Tools.isNewDay(ModelManager.instance.modelUser.pk_records.buy_time) ? 0 : ModelManager.instance.modelUser.pk_records.buy_times;
    }

    public getPKrankAward(t: any): any {
        for (var i, s, n, h = ConfigServer.pk.pk_day_award, o = h.length, r = 0; r < o; r++)
            if (r < o - 1) {
                if (i = h[r], s = h[r + 1], t >= i[0] && t < s[0]) {
                    n = t == i[0] ? i.concat() : s.concat();
                    break;
                }
            } else if (t >= (s = h[r])[0]) {
                n = s.concat();
                break;
            }
        return n;
    }

    public getChampionUnlockLv(t: any): any {
        for (var s = ConfigServer.pk_yard["hero_number_" + ModelManager.instance.modelUser.mergeNum], n = s.length, h = t + 1, o = -1, r = 0; r < n; r++)
            if (h <= s[r][1]) {
                o = r;
                break;
            }
        return o < 0 && (o = s.length - 1), s[o][0];
    }

    public send_WS_SR_JOIN_PK_YARD(t: any, i?: any): void {
        NetSocket.instance.send("join_pk_yard", { hids: t }, Handler.create(this, this.ws_sr_join_pk_yard), i);
    }

    /** 演武场报名回包：领奖 + champion_zone_join 本地档（跨季 +1 修正） */
    public ws_sr_join_pk_yard(t: any): void {
        ViewManager.instance.showRewardPanel(t.receiveData.gift_dict),
            ModelManager.instance.modelUser.updateData(t.receiveData);
        var s = ModelClimb.getChampionHowSeason();
        3 == ModelManager.instance.modelUser.getGameSeason() && (s += 1);
        var n: any = {};
        n.id = ModelManager.instance.modelUser.mUID,
            n.seasonNum = s,
            SaveLocal.savaObjByKey("champion_zone_join", "seasonNum", n, true);
        var h = t.otherData;
        h && h.runWith(t);
    }

    public send_WS_SR_GET_MY_PK_YARD_HIDS(t: any, i?: any): void {
        NetSocket.instance.send("get_my_pk_yard_hids", {}, Handler.create(this, this.ws_sr_get_my_pk_yard_hids), [t, i]);
    }

    /** 演武场报名按钮态（h=赛季中/r=已有阵容 → 禁用；label 三态文案） */
    public ws_sr_get_my_pk_yard_hids(t: any): void {
        var s = t.otherData[1],
            n = t.receiveData,
            h = ModelClimb.isChampionStartSeason(),
            o = Tools.getMsgById("_climb54");
        h && (o = Tools.getMsgById("_climb54"));
        var r = false;
        n && n.length > 0 && (r = true);
        if (s) {
            var a = h || r;
            s.label = r ? h ? o : Tools.getMsgById("_climb13") : Tools.getMsgById("_climb21"),
                Tools.textFitFontSize(s),
                ModelGame.redCheckOnce(s, !a),
                s.disabled = a;
        }
        var l = t.otherData[0];
        l && l.runWith(t);
    }

    public pk_npc_diff(): any {
        return this.isCaptain() ? 2 : ModelClimb.alien_city(this.pk_npc_id)[0];
    }

    public pk_npc_get_troop_fight_progress(): any {
        var t = this.pk_npc_check_hp();
        return t[0] / t[1];
    }

    /** [当前余兵, 上限]；战斗中按已过 records 波次扣减 */
    public pk_npc_check_hp(): any {
        var i = this.isCaptain(), s = 0, n = 0, h = 0;
        return i ? (s = ConfigServer.pk_npc.captain_armyopnum, this.enemy_now_num = ModelClimb.captain_curr()[2]) : (s = ModelClimb.alien_army_max(this.pk_npc_id), this.enemy_now_num = ModelClimb.alien_city(this.pk_npc_id)[3]),
            this.pk_npc_fight_ing ? (h = ModelClimb.pk_npc_get_kill_len(this.pk_npc_id, i)) >= 0 && (n = this.enemy_now_num + this.mKillWave - h) : n = this.enemy_now_num,
            n = n <= 0 ? 0 : n,
            [n, s];
    }

    public captain_hero(): any {
        var i = ModelClimb.captain_curr(),
            s = "";
        return i.length > 0 && (s = i[5]),
            s;
    }

    public captain_time(): any {
        var i = 0,
            s = ModelClimb.captain_curr_timer();
        return s > 0 && (i = s - ConfigServer.getServerTimer()),
            i;
    }

    public pk_npc_setData(t: any): void {
        this.pk_npc_id = t;
    }

    public isCaptain(): boolean {
        return this.pk_npc_id == "captain";
    }

    public pk_npc_init(): void {
        this.pk_npc_clear(),
            this.pk_npc_status = -1;
        var i = ConfigServer.getServerTimer(),
            s: any[] = [];
        (s = this.isCaptain() ? ModelClimb.captain_check_fight_data() : ModelClimb.alien_check_fight_data(this.pk_npc_id)).length > 0 && s[2] && Tools.getTimeStamp(s[2]) > i ? this.pk_npc_fight_start(s[0], s[1]) : this.pk_npc_check_status();
    }

    public pk_npc_clear(): void {
        this.fightTimes = 100,
            Laya.timer.clear(this, this.pk_npc_timer);
    }

    public pk_npc_timer(): void {
        this.pk_npc_check_status();
    }

    /** 战中(h)/可领(n=!h&&o)两态；战中每 2s 轮询 */
    public pk_npc_check_status(t?: any): void {
        void 0 === t && (t = false);
        var n, h = false, o = false, r = -1;
        this.isCaptain() ? (h = ModelClimb.captain_check_fight_ing(), o = ModelClimb.captain_curr_timer() > 0 && ModelClimb.captain_curr()[2] <= 0) : (h = ModelClimb.alien_check_fight_ing(this.pk_npc_id), o = ModelClimb.alien_check_is_end(this.pk_npc_id)),
            t && (h = true),
            n = !h && o,
            this.pk_npc_fight_ing = h,
            h ? (r = 1, Laya.timer.once(2e3, this, this.pk_npc_timer)) : (this.fightTimes = 100, r = 0),
            (this.pk_npc_status != r || 1 == r) && (this.pk_npc_status = r, this.pk_npc_award = n, h ? this.pk_npc_event_troop("event_pk_npc_status_troop_fight_ing", true) : this.pk_npc_event_troop("event_pk_npc_status_troop_fight_ready", false), this.event("event_pk_npc_view_update", 1));
    }

    public pk_npc_fight_start(t: any, i: any, s?: any): void {
        void 0 === s && (s = false),
            this.hpsTemp = {},
            this.fightTimes = 0,
            this.mKillWave = i.killWave,
            this.mUserTroopToFight = i.userTroop;
        var h = t.team[0].troop,
            o = h.length;
        this.pk_npc_hids = [];
        for (var r = 0; r < o; r++)
            this.pk_npc_hids.push(h[r].hid);
        this.pk_npc_check_status(s);
    }

    /** 兵力/血量推送（hp 千分比变化才发 troopUpdate） */
    public pk_npc_event_troop(t: any, i: any): void {
        var n = t == "event_pk_npc_status_troop_fight_ing" ? sg.model.ModelTroop.TROOP_STATE_MONSTER : sg.model.ModelTroop.TROOP_STATE_IDLE;
        if (this.pk_npc_hids)
            for (var h, o, r, a = this.pk_npc_hids.length, l = NaN, c = false, u = 0; u < a; u++)
                (o = <any>{}).status = n,
                    r = this.pk_npc_hids[u],
                    c = false,
                    this.mUserTroopToFight && this.mUserTroopToFight.hasOwnProperty(r) && (h = this.pk_npc_hero_hp(r), !this.pk_npc_award && (l = Math.floor(h[0] / h[1] * 1e3), this.hpsTemp.hasOwnProperty(r) ? Math.floor(this.hpsTemp[r][0] / this.hpsTemp[r][1] * 1e3) != l && (c = true, this.hpsTemp[r] = h) : (this.hpsTemp[r] = h, c = true))),
                    (c || !i) && (o.hp = [h[0], h[1]], o.army = [h[2], h[3]], Trace.log("----------------------------" + o.hp), ModelManager.instance.modelTroopManager.setTroopData("troopUpdate", r, o));
    }

    public pk_npc_hero_hp(t: any): any {
        return this.isCaptain() ? ModelClimb.pk_npc_get_ing_records_hp(t, ModelClimb.captain_check_fight_data()) : ModelClimb.pk_npc_get_ing_records_hp(t, ModelClimb.alien_check_fight_data(this.pk_npc_id));
    }

    public pk_npc_del_self(): void {
        this.pk_npc_clear(),
            delete ModelClimb.pk_npc_models[this.pk_npc_id],
            this.event("event_pk_npc_view_update", 0);
    }

    /** 点击分流：captain 待领/主页；alien 待领/主页；否则 get_pk_npc 刷新 */
    public pk_npc_click(t: any): void {
        var s = this;
        this.isCaptain() ? ModelClimb.captain_curr_timer() > 0 && (ModelClimb.captain_curr()[2] <= 0 && !this.pk_npc_fight_ing ? NetSocket.instance.send("get_pk_npc_captain_reward", {}, Handler.create(this, function (t: any) {
            s.pk_npc_del_self(),
                ModelManager.instance.modelUser.updateData(t.receiveData),
                ViewManager.instance.showRewardPanel(t.receiveData.gift_dict, function () {
                    ModelManager.instance.modelGame.checkPKnpcCaptain(true, true);
                });
        })) : ViewManager.instance.showView(ConfigClass.VIEW_CAPTAIN_MAIN, [this.cityId, t])) : ModelClimb.alien_check_is_end(this.pk_npc_id) && !this.pk_npc_fight_ing ? NetSocket.instance.send("get_pk_npc_reward", { city_id: this.pk_npc_id }, Handler.create(this, function (t: any) {
            s.pk_npc_del_self(),
                ModelManager.instance.modelUser.updateData(t.receiveData),
                ViewManager.instance.showRewardPanel(t.receiveData.gift_dict);
        })) : NetSocket.instance.send("get_pk_npc", {}, Handler.create(this, function (e: any) {
            ModelManager.instance.modelUser.updateData(e.receiveData),
                ViewManager.instance.showView(ConfigClass.VIEW_ALIEN_MAIN, [s.pk_npc_id, t]);
        }));
    }

    /** 快速演武：次数 0 时买次/提示；否则按战力前 N 主队 pk_user clear=1 */
    public fastPK(t: any): any {
        if (0 == ModelManager.instance.modelClimb.getPKmyTimes()) {
            var s = ModelManager.instance.modelClimb.getPKbuyForIndex().length,
                n = ModelManager.instance.modelClimb.getPKmyBuyTimes();
            return n < s ? void ViewManager.instance.showBuyTimes(1, ModelManager.instance.modelClimb.getPKtimesForBuyOne(), s - n, ModelManager.instance.modelClimb.getPKbuyForIndex()[n]) : void ViewManager.instance.showTipsTxt(Tools.getMsgById("_pve_tips08"));
        }
        for (var h = ModelClimb.getPKdeployMax(), o = ModelManager.instance.modelUser.getMyHeroArr(true, "", null, true), r: any[] = [], a = 0; a < h; a++)
            r.push(o[a].id);
        NetSocket.instance.send("pk_user", { rank_num: t, hids: r, clear: 1 }, Handler.create(this, this.fastPkCallBack));
    }

    public fastPkCallBack(t: any): void {
        var s = t.receiveData;
        ModelManager.instance.modelUser.updateData(s),
            ModelManager.instance.modelGame.event("event_pk_times_change", s);
    }

    /** 奖励展示图标：captain 用 curr[5]；alien 遍历奖励表优先 gold */
    public get icon(): any {
        var i = "",
            s: any[] = [];
        if (this.isCaptain())
            return ModelClimb.captain_curr()[5];
        for (var n, h = (s = ModelClimb.alien_award(this.pk_npc_id)).length, o = false, r = "", a = 0; a < h; a++)
            if ((n = s[a][0]).indexOf("item") > -1)
                o = true,
                    i = sg.model.ModelItem.getItemIcon(n);
            else if (n.indexOf("gold") > -1)
                return r = sg.model.ModelItem.getItemIcon(n, true), AssetsManager.getAssetLater(r);
        return !o && (i = r),
            AssetsManager.getAssetsICON(i, !o);
    }

    /** 首都城 id（captain 时取 country.capital） */
    public get cityId(): any {
        return this.isCaptain() ? ConfigServer.country.country[ModelUser.getCountryID()].capital + "" : this.pk_npc_id;
    }

    public static getCfg(): any {
        return ConfigServer.climb;
    }

    public static getCfgConfigure(): any {
        return ModelClimb.getCfg().configure;
    }

    public static getPKdeployMax(): any {
        for (var t = ConfigServer.pk.pk_hero, i = t.length, s = i, n = 0; n < i; n++)
            if (ModelManager.instance.modelUser.getLv() < t[n]) {
                s = n;
                break;
            }
        return s;
    }

    public static getChampionFightData(t: any): any {
        var s: any = {};
        s.mode = 3,
            s.rnd = t[3],
            s.team = [t[0], t[1]];
        var n: any = { pk_data: s };
        return t[4] && (n.time = t[4]),
            n;
    }

    public static getChampionHowSeason(): any {
        var i = ModelManager.instance.modelUser.getGameDate();
        return Math.ceil(i / 4);
    }

    public static getChampionHowSeasonHeroNum(): any {
        var i = ModelClimb.getChampionHowSeason();
        return ModelManager.instance.modelUser.getGameSeason() > ConfigServer.pk_yard.begin_time[0] ? i + 1 : i;
    }

    public static isChampionIng(): boolean {
        var i = false;
        if (ModelClimb.isChampionStartSeason()) {
            var s = ConfigServer.getServerTimer(),
                n = ModelClimb.getChampionStartTimer(),
                h = n + ModelClimb.getChampionUseTimer() + 1e3;
            s >= n && s < h && (i = true);
        }
        return i;
    }

    public static isChampionEnd(): boolean {
        var i = false;
        ModelClimb.isChampionStartSeason() && (ConfigServer.getServerTimer() > ModelClimb.getChampionStartTimer() + ModelClimb.getChampionUseTimer() + 1e3 && (i = true));
        return i;
    }

    /** 押注窗：前 n-1 轮总时长后 ~ 末轮首场前 */
    public static isChampionBet(): boolean {
        var i = false;
        if (ModelClimb.isChampionStartSeason()) {
            for (var s = ConfigServer.getServerTimer(), n = ModelClimb.getChampionStartTimer(), h = ConfigServer.pk_yard.combat_time, o = h.length - 1, r = 0, a = 0; a < o; a++)
                for (var l = 0; l < h[a].length; l++)
                    r += h[a][l] * Tools.oneMinuteMilli;
            var c = n + r,
                u = c + h[o - 1][0] * Tools.oneMinuteMilli;
            s > c && s < u && (i = true);
        }
        return i;
    }

    public static getChampionIngTime(): any {
        var i = -1;
        ModelClimb.isChampionStartSeason() && (i = ConfigServer.getServerTimer() - ModelClimb.getChampionStartTimer());
        return i;
    }

    public static getChampionNextRoundTimr(t: any): any {
        if (ModelClimb.isChampionStartSeason()) {
            for (var s = ConfigServer.getServerTimer(), n = ModelClimb.getChampionStartTimer(), h = ConfigServer.pk_yard.combat_time, o = t, r = 0; r < o; r++)
                for (var a = 0; a < h[r].length; a++)
                    n += h[r][a] * Tools.oneMinuteMilli;
            return n - s;
        }
        return -1;
    }

    public static isChampionWorship(): boolean {
        var i = 0,
            s = false;
        return ModelManager.instance.modelUser.records.hasOwnProperty("worship_time") ? Tools.isNullObj(ModelManager.instance.modelUser.records.worship_time) ? s = true : (i = Tools.getTimeStamp(ModelManager.instance.modelUser.records.worship_time), Tools.isNewDay(i) && (s = true)) : s = true,
            s;
    }

    /** 距下一场比赛（全轮展平后首个未来时刻） */
    public static getChampionRoundNextFightTimr(): any {
        if (ModelClimb.isChampionStartSeason()) {
            for (var i = ConfigServer.getServerTimer(), s = ModelClimb.getChampionStartTimer(), n = ConfigServer.pk_yard.combat_time, h = n.length, o: any[] = [], r = 0; r < h; r++)
                o = o.concat(n[r]);
            for (h = o.length, r = 0; r < h; r++)
                if (i < (s += o[r] * Tools.oneMinuteMilli))
                    return s - i;
        }
        return -1;
    }

    /** [场开始时间, 本场时长, 是否已开] */
    public static getChampionRoundFightTime(t: any, i: any): any {
        if (ModelClimb.isChampionStartSeason()) {
            for (var n = ConfigServer.getServerTimer(), h = ModelClimb.getChampionStartTimer(), o = ConfigServer.pk_yard.combat_time, r = t - 1, a = 0; a < r; a++)
                for (var l = 0; l < o[a].length; l++)
                    h += o[a][l] * Tools.oneMinuteMilli;
            for (var c = 0; c < i; c++)
                h += o[t][c] * Tools.oneMinuteMilli;
            var u = 0;
            return [h, u = i < o[t].length ? o[t][i] * Tools.oneMinuteMilli : t < o[t].length - 1 ? o[t + 1][0] * Tools.oneMinuteMilli : o[o.length - 1][2] * Tools.oneMinuteMilli, n > h + u];
        }
        return null;
    }

    public static getChampionStartTimer(t?: any): any {
        return void 0 === t && (t = -1), (t > -1 ? t : Tools.getGameDayDeviationTime(ConfigServer.getServerTimer())) + ConfigServer.pk_yard.begin_time[1] * Tools.oneMinuteMilli;
    }

    public static getChampionUseTimer(): any {
        for (var t = ConfigServer.pk_yard.combat_time, i = t.length, s = 0, n = 0; n < i; n++)
            for (var h = 0; h < t[n].length; h++)
                s += t[n][h] * Tools.oneMinuteMilli;
        return s;
    }

    /** [轮 idx, 场 idx, 该场开始, 距开始 ms, 轮指针] */
    public static checkChampionTimetableByIndex(t: any): any {
        var i, s = ConfigServer.pk_yard.combat_time,
            n = ModelClimb.getChampionStartTimer(),
            h = ConfigServer.getServerTimer(),
            o = t,
            r = -1,
            a = -1,
            l = 0,
            c = 0;
        for (u = 0; u < o; u++) {
            i = s[u],
                a = -1;
            for (var d = 0; d < i.length; d++)
                if (h < (n += i[d] * Tools.oneMinuteMilli)) {
                    a = d,
                        c = n - h;
                    break;
                }
            if (a > -1) {
                l = u;
                break;
            }
        }
        var u;
        return [l, a, n, c, u];
    }

    public static isChampionStartSeason(): boolean {
        return ModelManager.instance.modelUser.getGameSeason() == ConfigServer.pk_yard.begin_time[0];
    }

    public static getChampionHeroNum(): any {
        for (var t = ConfigServer.pk_yard["hero_number_" + ModelManager.instance.modelUser.mergeNum], i = t.length, s = ModelClimb.getChampionHowSeasonHeroNum(), n = 1; n < i && !(s < t[n][0]); n++);
        return t[n - 1][1];
    }

    public static getChampionHeroRecommend(t: any, i: any, s?: any): any {
        void 0 === s && (s = true);
        var h = ModelManager.instance.modelUser.getMyHeroArr(true, "", i, s);
        if (h.length > t) {
            for (var o: any[] = [], r = 0; r < t; r++)
                o.push(h[r]);
            return o;
        }
        return h;
    }

    /** 距第 i 赛季开幕式（n>i 前季回绕 4 季周期） */
    public static getChampionStarTime(t?: any, i?: any): any {
        void 0 === t && (t = false),
            void 0 === i && (i = 0);
        var n = ModelManager.instance.modelUser.getGameSeason(),
            h = ConfigServer.getServerTimer(),
            o = 0;
        return n > i ? o = 4 - (n + 1) + (i + 1) : n < i && (o = i - n),
            t && 0 == o && (o = 4),
            Tools.getGameDayDeviationTime(h) + o * Tools.oneDayMilli;
    }

    public static formatChampionGroupReady(t: any): any {
        for (var s = t.log_list, n = s.length, h = 0; h < n; h++)
            s[h].win = "0";
        return s.sort(<any>MathUtil.sortByKey("power", !0)),
            s;
    }

    /** 小组赛战报 → 胜负串（110=3 全胜、101/11=2、单胜=1；winArr 补 -1 对齐 3 位） */
    public static formatChampionGroupLog(t: any): any {
        for (var i, s, n, h, o = t.log_list, r = o.length, a: any = {}, l = 0, c = 0, u = 0; u < r; u++)
            s = (i = o[u])[0],
                n = i[1],
                l = 0 == i[2] ? 1 : 0,
                c = 1 == i[2] ? 1 : 0,
                a.hasOwnProperty(s.uid) ? ((h = a[s.uid]).win = h.win + "" + l, h.winArr.push(l), a[s.uid] = h) : (a[s.uid] = s, a[s.uid].win = l, a[s.uid].winArr = [l]),
                a.hasOwnProperty(n.uid) ? ((h = a[n.uid]).win = h.win + "" + c, h.winArr.push(c), a[n.uid] = h) : (a[n.uid] = n, a[n.uid].win = c, a[n.uid].winArr = [c]);
        var d, _, m: any[] = [];
        for (var g in a) {
            d = (h = a[g]).win,
                (_ = h.winArr) && _.length < 3 && (d += "0", _.push(-1)),
                h.win = d,
                h.winArr = _;
            var f = parseInt(d);
            110 == f ? f = 3 : 101 == f || 11 == f ? f = 2 : (1 == f || 10 == f || 100 == f) && (f = 1),
                h.sortWin = f,
                m.push(h);
        }
        return m.sort(<any>MathUtil.sortByKey("sortWin", !0)),
            m;
    }

    /** 奖励表展平（倒序反转 ×2），t 非空时返回首个匹配奖励名 */
    public static formatRankAward(t?: any): any {
        void 0 === t && (t = "");
        for (var s, n = ConfigServer.pk_yard.reward, h = (n = (n = ObjectUtil.clone(n, true)).reverse()).length, o: any[] = [], r = 0; r < h; r++) {
            s = (s = n[r]).reverse();
            for (var a = 0; a < s.length; a++)
                if ("" != t) {
                    if (s[a][0].indexOf(t) > -1)
                        return s[a][0];
                } else
                    o.push(s[a]);
        }
        return o;
    }

    public static pk_npc_get_hero_icon(t: any, i: any): any {
        return ConfigServer.pk_npc.alien_figure[t + ""][i + ""];
    }

    public static alien_my(): any {
        return ModelManager.instance.modelUser.pk_npc && ModelManager.instance.modelUser.pk_npc.hasOwnProperty("npc_dict") ? ModelManager.instance.modelUser.pk_npc.npc_dict : {};
    }

    public static getAlienPower(t: any): any {
        var s = ModelClimb.alien_city(t);
        if (s.length > 4) {
            var n = s[4];
            return n = sg.model.ModelPrepare.getFormatPower(n, ConfigServer.pk_npc.alien_enemy_power);
        }
        return -1;
    }

    public static getCaptainPower(): any {
        var i = ModelClimb.captain_curr();
        if (i.length > 1) {
            var s = i[1];
            return s = sg.model.ModelPrepare.getFormatPower(s, ConfigServer.pk_npc.captain_enemy_power);
        }
        return -1;
    }

    public static alien_city(t: any): any {
        var s = ModelClimb.alien_my();
        return s.hasOwnProperty(t) ? s[t] : [];
    }

    public static alien_city_reward(t: any): any {
        var s = ModelClimb.alien_city(t),
            n: any = {};
        return s.length > 0 && (n = s[5]),
            n;
    }

    public static alien_check_is_end(t: any): boolean {
        var s = false,
            n = ModelClimb.alien_city(t);
        return n.length > 0 && (s = n[3] <= 0),
            s;
    }

    public static alien_check_fight_ing(t: any): boolean {
        var s = false,
            n = ModelClimb.alien_city(t);
        n.length > 0 && (n[6].length > 0 && Tools.getTimeStamp(n[6][2]) > ConfigServer.getServerTimer() && (s = true));
        return s;
    }

    public static alien_check_fight_data(t: any): any {
        var s = ModelClimb.alien_city(t);
        return s.length > 0 && s[6].length > 0 ? s[6] : [];
    }

    public static alien_check_fight_ing_data(t: any): any {
        var s: any = {},
            n = ModelClimb.alien_city(t);
        return n.length > 0 && n[6].length > 0 && (s = { pk_data: n[6][0], pk_result: n[6][1] }),
            s;
    }

    public static alien_country_diff(t: any): any {
        if (ConfigServer.pk_npc.alien_diff.hasOwnProperty(ModelUser.getCountryID() + "")) {
            var s = ModelClimb.alien_city(t);
            return s.length > 0 ? ConfigServer.pk_npc.alien_diff[ModelUser.getCountryID() + ""][s[0]] : [];
        }
        return [];
    }

    public static alien_curr_lv(t: any): any {
        var s = ModelClimb.alien_city(t);
        return s.length > 7 ? s[7] : ModelManager.instance.modelUser.getLv();
    }

    public static alien_army_max(t: any): any {
        var s = ModelClimb.alien_city(t);
        if (s.length > 0) {
            var n = s[0],
                h = ConfigServer.pk_npc.alien_army[n],
                o = ConfigServer.pk_npc.alien_armyadd[n],
                r = ModelClimb.alien_curr_lv(t),
                l = ConfigServer.pk_npc.building_unlock_lv;
            return h + Math.floor((r - l) / o[0]) * o[1];
        }
        return 0;
    }

    public static alien_award(t: any): any {
        var s: any[] = [],
            n = ModelClimb.alien_city(t);
        if (n.length > 0) {
            var h = ConfigServer.pk_npc.building_unlock_lv,
                o = ModelClimb.alien_curr_lv(t),
                r = ConfigServer.pk_npc.alien_mag[n[0]],
                l = ConfigServer.pk_npc.alien_meritadd[n[0]],
                c = ConfigServer.pk_npc.alien_gold[n[0]],
                u = r[0] + (o - h) * l;
            s.push(["merit", u]),
                s.push(["gold", r[1] + (o - h) * c]);
            for (var d = ConfigServer.pk_npc.alien_rewaddtrea, _ = d.length, m = 0; m < _; m++)
                o >= d[m][0] && (d[m][2][n[0]] > 0 && s.push([d[m][1], d[m][2][n[0]]]));
        }
        return s;
    }

    public static captain_my(): any {
        return ModelManager.instance.modelUser.pk_npc && ModelManager.instance.modelUser.pk_npc.hasOwnProperty("captain") ? ModelManager.instance.modelUser.pk_npc.captain : [];
    }

    public static captain_curr(): any {
        var i = ModelClimb.captain_my();
        return i.length > 0 ? i[0] : [];
    }

    public static captain_curr_reward(): any {
        var i = ModelClimb.captain_curr(),
            s: any = {};
        return i.length > 0 && (s = i[6]),
            s;
    }

    public static captain_curr_timer(): any {
        var i = ModelClimb.captain_curr();
        return i.length > 0 && !Tools.isNullObj(i[0]) ? Tools.getTimeStamp(i[0]) : 0;
    }

    public static captain_check_fight_ing(): boolean {
        var i = false,
            s = ModelClimb.captain_curr();
        ModelClimb.captain_curr_timer() > 0 && s.length > 0 && (s[7].length > 0 && Tools.getTimeStamp(s[7][2]) > ConfigServer.getServerTimer() && (i = true));
        return i;
    }

    public static captain_check_fight_data(): any {
        var i = ModelClimb.captain_curr();
        return i.length > 0 && i[7].length > 0 ? i[7] : [];
    }

    public static captain_check_fight_ing_data(): any {
        var i: any = {},
            s = ModelClimb.captain_curr();
        return s.length > 0 && s[7].length > 0 && (i = { pk_data: s[7][0], pk_result: s[7][1] }),
            i;
    }

    public static captain_award(t: any, i?: any): any {
        var n: any[] = [];
        if (ModelClimb.captain_curr().length > 0) {
            var h = ConfigServer.pk_npc.captain_strike_open[t + ""][1];
            for (var o in h)
                n.push([o, h[o]]);
            i && i.length > 1 && n.push([i[1], i[2]]);
        }
        return n;
    }

    public static pk_npc_fight_ing_pass(t: any): any {
        var s = 0;
        if (t.length > 0) {
            var n = Tools.getTimeStamp(t[2]) - Math.floor(1e3 * t[1].time);
            s = .001 * (ConfigServer.getServerTimer() - n);
        }
        return s;
    }

    /** 战斗结束回调定时（TroopAnimation.backTroop 静态；n=true 跳过） */
    public static pk_npc_check_end(t: any, i: any, n?: any): void {
        if (t.length > 0) {
            var o = Math.ceil(1e3 * t[1].time);
            Laya.timer.clear(sg.map.view.TroopAnimation, sg.map.view.TroopAnimation.backTroop),
                !n && Laya.timer.once(o, sg.map.view.TroopAnimation, sg.map.view.TroopAnimation.backTroop, [i]);
        }
    }

    /** [hp 现值, hp 上限, army 现值, army 上限, 已全灭]（按已过 records 波次回放） */
    public static pk_npc_get_ing_records_hp(t: any, i: any): any {
        var s = 0, n = 0, h = 0, o = 0, r = 0, a = false;
        if (i.length > 0) {
            var l, c, u, d, _, m = 0, g = ConfigServer.getServerTimer(), f = 0;
            l = i[1],
                m = (u = Tools.getTimeStamp(i[2])) - Math.floor(1e3 * l.time),
                d = (c = l.records).length;
            var p = ModelManager.instance.modelTroopManager.troops[ModelManager.instance.modelUser.mUID + "&" + t];
            for (p && p.army && (n = p.army[0] + p.army[1], o = p.army[0], r = p.army[1], h = p.getHpMax()), f = 0; f < d; f++)
                _ = c[f].troop,
                    g >= (m += Math.floor(1e3 * c[f].time)) && _[0].hid == t && (n = _[0].hp, h = _[0].hpm);
            if (g >= u)
                for (var v in l.userTroop)
                    if (v == t) {
                        a = (o = l.userTroop[v][0]) + (r = l.userTroop[v][1]) <= 0;
                        break;
                    }
        }
        return [n, h, o, r, a];
    }

    public static pk_npc_get_kill_len(t: any, i?: any): any {
        void 0 === i && (i = false);
        var n: any[] = [],
            h = 0;
        if ((n = i ? ModelClimb.captain_check_fight_data() : ModelClimb.alien_check_fight_data(t)).length > 0) {
            var o, r, a, l = 0, c = ConfigServer.getServerTimer(), u = 0;
            for (o = n[1], l = Tools.getTimeStamp(n[2]) - Math.floor(1e3 * o.time), a = (r = o.records).length, u = 0; u < a; u++)
                r[u].troop,
                    c >= (l += Math.floor(1e3 * r[u].time)) && (h += 1);
        }
        return h;
    }

    public static getPKnpcModel(t: any): any {
        return ModelClimb.pk_npc_models.hasOwnProperty(t) ? ModelClimb.pk_npc_models[t] : null;
    }

    public static updateAllClip(): void {
        for (var i in ModelClimb.pk_npc_models) {
            var s = ModelClimb.getPKnpcModel(i);
            s && s.event("event_pk_npc_view_update", 2);
        }
    }

    public static checkClimbWill(): boolean {
        var i = ModelManager.instance.modelClimb,
            s = i.getMyClimbTimes();
        return !(i.isClimbIng() > 0) && (s > 0 || !!i.isGetAward());
    }

    public static checkPkWill(): boolean {
        return ModelManager.instance.modelClimb.getPKmyTimes() > 0;
    }

    public static EVENT_CLIMB_FIGHT_END: string = "event_climb_fight_end";
    public static EVENT_CHAMPION_SIGN_OK: string = "event_champion_sign_ok";
    public static EVENT_PK_NPC_VIEW_UPDATE: string = "event_pk_npc_view_update";
    public static pk_npc_models: any = {};

    /**
     * 原文 h(a,["pk_npc_diff_name",function(){…}]) —— Laya.static 惰性静态
     * （静态 getter + defineProperty 换写，ViewScenes 同款）。
     */
    public static get pk_npc_diff_name(): any[] {
        var v = ["alien_easy", "alien_normal", "alien_trouble"];
        Object.defineProperty(ModelClimb, "pk_npc_diff_name", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(a,"sg.model.ModelClimb",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelClimb, "sg.model.ModelClimb", null, null);
