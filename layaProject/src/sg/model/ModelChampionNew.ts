/**
 * sg.model.ModelChampionNew —— 新比武大会（pk_yard_new）：小组赛/决赛双阶段状态机
 * （groupState/finalsState 0-进行 1-结束 2-未开）、押注 gamble、报名/膜拜红点；
 * instance 惰性单例。
 *
 * 原文：code1.js 字节 [1932814,1939986]（包装变量 qo，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelChampionNew"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelChampionNew.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：ue=ModelManager、pn=NetSocket、P=Handler、Gt=ConfigServer、vs=Tools、tn=ViewManager、
 * Rt=ConfigApp（批次 A/B 模块直引）。
 * 赛季 = getGameSeason()；届数 = ceil(游戏日/4)；未合服取 hero_number1 档、合服取 hero_numberx。
 * curGroupNum 的 re_yard_round 补偿与 circle 上限收敛为原文精确顺序。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { ConfigApp } from "../cfg/ConfigApp";

export class ModelChampionNew extends ModelBase {

    public last_hids: any[] = [];
    public group_data: any = {};
    public group_rank: any = {};
    public log_type: number = 0;
    public fight_log: any[] = [];
    public finals_data: any = {};
    public finals_rank: any[] = [];
    public round_time: any[] = [];
    public re_yard_round: number = -1;
    public yard_round: number = 0;
    public group_round: number = 0;
    public gamble_index: number = 0;
    public coin_num: number = 0;
    public upbet_Array: any[] = [];
    public gamble_obj: any = {};
    public fight_log_uid: number = 0;

    constructor() {
        super();
    }

    /** 按届数取参赛英雄数档位 */
    public getHeroNum(): number {
        for (var i = 0, s = ModelManager.instance.modelUser.mergeNum <= 0 ? this.mConfig.hero_number1 : this.mConfig.hero_numberx,
                n = this.getChampionHowSeason(), h = 0; h < s.length; h++)
            n >= s[h][0] && (i = s[h][1]);
        return i;
    }

    public sendFinals(): void {
        var i = this;
        NetSocket.instance.send("get_pk_yard_new_finals", {}, Handler.create(this, function (e: any) {
            i.finals_data = e.receiveData,
                console.log("新比武大会决赛对阵列表", e.receiveData),
                ModelManager.instance.modelChampionNew.event("fresh_finals_state");
        }));
    }

    /** 小组赛：1=全部轮次结束（超 circle*timenext） 2=未开赛 0=进行中；赛季不符 -1 */
    public groupState(): number {
        var i = -1,
            s = this.mConfig.time[1],
            n = ConfigServer.getServerTimer(),
            h = ModelManager.instance.modelUser.getGameSeason(),
            o = Tools.getTodayMillWithHourAndMinute(s[1]);
        return h == s[0] && (i = n >= o + this.mConfig.circle * (1e3 * this.mConfig.timenext) ? 1 : n < o ? 2 : 0), i;
    }

    /** 决赛：5 轮 timenext 后结束 */
    public finalsState(): number {
        var i = -1,
            s = this.mConfig.time[2],
            n = ConfigServer.getServerTimer(),
            h = ModelManager.instance.modelUser.getGameSeason(),
            o = Tools.getTodayMillWithHourAndMinute(s[1]);
        return h == s[0] && (i = n >= o + 1e3 * this.mConfig.timenext * 5 ? 1 : n < o ? 2 : 0), i;
    }

    /** 第几届（游戏日/4 向上取整） */
    public getChampionHowSeason(): number {
        var i = ModelManager.instance.modelUser.getGameDate();
        return Math.ceil(i / 4);
    }

    /** 战力 t 对应可解锁届数门槛 */
    public getChampionUnlockLv(t: any): any {
        for (var s = ModelManager.instance.modelUser.mergeNum <= 0 ? this.mConfig.hero_number1 : this.mConfig.hero_numberx,
                n = s.length, h = t + 1, o = -1, r = 0; r < n; r++)
            if (s[r][1] >= h) {
                o = r;
                break;
            }
        return o < 0 && (o = s.length - 1), s[o][0];
    }

    public sendFinalsRank(): void {
        var i = this;
        NetSocket.instance.send("get_pk_yard_new_finals_rank", {}, Handler.create(this, function (e: any) {
            i.finals_rank = e.receiveData,
                console.log("决赛排名", e.receiveData),
                ModelManager.instance.modelChampionNew.event("fresh_enroll_state"),
                ModelManager.instance.modelChampionNew.event("fresh_group_rank");
        }));
    }

    /** 押注：押注对象变化提示 _champion40；成功后刷新 gamble 状态 */
    public sendGamble(): void {
        var i = this;
        NetSocket.instance.send("pk_yard_new_gamble", { yard_round: this.yard_round, group_index: this.group_round, gamble_index: this.gamble_index, coin_num: this.coin_num }, Handler.create(this, function (e: any) {
            console.log("押注", e.receiveData),
                i.gamble_obj[ModelManager.instance.modelUser.mUID] != e.receiveData.gamble[ModelManager.instance.modelUser.mUID] && (ViewManager.instance.showTipsTxt(Tools.getMsgById("_champion40")), i.gamble_obj = e.receiveData.gamble),
                ModelManager.instance.modelUser.updateData(e.receiveData),
                i.finals_data = e.receiveData,
                ModelManager.instance.modelChampionNew.event("fresh_gamble_state");
        }));
    }

    /** 报名/换阵：首报 fresh_enroll_state，换阵 fresh_battle_array */
    public sendJoinPKNewYard(t: any): void {
        var s = this;
        NetSocket.instance.send("pk_yard_new_join", { hids: t }, Handler.create(this, function (t: any) {
            ModelManager.instance.modelUser.updateData(t.receiveData);
            var n = t.receiveData.gift_dict;
            n && ViewManager.instance.showRewardPanel(n);
            var h = t.sendData.hids;
            if (s.last_hids.length > 0) {
                for (var o = 0; o < h.length; o++)
                    if (s.last_hids[o] != h[o])
                        return s.last_hids = h, void ModelManager.instance.modelChampionNew.event("fresh_battle_array");
            } else
                s.last_hids = h,
                    ModelManager.instance.modelChampionNew.event("fresh_enroll_state");
        }));
    }

    /** t=1 小组轮次表（circle 轮）、t=2 决赛轮次表（5 轮）；仅当赛季匹配生成 */
    public createRoundTime(t: number): void {
        this.round_time = [];
        var s = this.mConfig.time[t],
            n = ModelManager.instance.modelUser.getGameSeason(),
            h = Tools.getTodayMillWithHourAndMinute(s[1]);
        if (n == s[0])
            for (var o = 1 == t ? this.mConfig.circle : 5, r = 0; r < o; r++) {
                var a = h + 1e3 * this.mConfig.timenext * (r + 1);
                this.round_time.push([r, a]);
            }
    }

    /** 组装 3v3 决赛观战数据（mode=3） */
    public getChampionFightData(t: any): any {
        var s: any = {};
        s.mode = 3,
            s.rnd = t[3],
            s.team = [t[0], t[1]];
        var n: any = { pk_data: s };
        return t[4] && (n.time = t[4]), n;
    }

    /** 今日未膜拜（无记录/空记录/跨天） */
    public isCanWorship(): boolean {
        var i = 0,
            s = false;
        return ModelManager.instance.modelUser.records.hasOwnProperty("worship_time") ? Tools.isNullObj(ModelManager.instance.modelUser.records.worship_time) ? s = true : (i = Tools.getTimeStamp(ModelManager.instance.modelUser.records.worship_time), Tools.isNewDay(i) && (s = true)) : s = true, s;
    }

    /** 入口红点：竖屏 + 功能开 + 押注未参与/待报名/可膜拜 */
    public showRed(): boolean {
        if (ConfigApp.isLandscape)
            return false;
        if (0 == ModelManager.instance.modelUser.getUseFunctionByKey("use_pk_yard_new"))
            return false;
        var i = false,
            s = ModelManager.instance.modelUser.getGameSeason(),
            n = this.finalsState(),
            h = this.mConfig.time[0];
        return this.mConfig.time[2][0] == s && 2 == n && (this.finals_data.gamble && !this.finals_data.gamble[ModelManager.instance.modelUser.mUID] || !this.finals_data.gamble) && (i = true),
            this.enrollSeason && this.needEnroll && (i = true),
            this.isCanWorship() && -1 != h.indexOf(s) && (i = true),
            i;
    }

    /** 在决赛 yard_list 双方槽位中查 uid，回填 group_rank */
    public getUserData(t: any, i: any): any {
        var s, n = null, h = null;
        for (var r in this.finals_data.yard_list) {
            s = this.finals_data.yard_list[r];
            for (var a = 0; a < 2; a++)
                if (s[a].length > 1)
                    for (var l = s[a], c = 0; c < 2; c++)
                        null != (h = l[c]).uid && h.uid == t && (h.group_rank = i, n = h);
                else
                    null != s[a].uid && s[a].uid == t && (s[a].group_rank = i, n = s[a]);
        }
        return n;
    }

    public get mConfig(): any {
        return ConfigServer.pk_yard_new;
    }

    /** 自己的小组排名（不在榜时以自身数据构造） */
    public get ownRankData(): any {
        for (var i: any = {}, s = this.group_rank.group_rank, n = s.length, h = 0; h < n; h++) {
            var o = s[h];
            o.uid == ModelManager.instance.modelUser.mUID && (i = o);
        }
        return !i.uid && (i.uid = ModelManager.instance.modelUser.mUID, i.uname = ModelManager.instance.modelUser.uname, i.country = ModelManager.instance.modelUser.country, i.power = ModelManager.instance.modelUser.getPower()), i;
    }

    /** 按届数可用的押注上限档 */
    public get stakeMax(): any[] {
        for (var i: any[] = [], s = this.getChampionHowSeason(), n = 0; n < this.mConfig.stake_max.length; n++)
            s >= n && (i = this.mConfig.stake_max[n]);
        return i;
    }

    public get curFinalsRemainTime(): any {
        return this.finalsStartTime - this.curFinalsNum * (1e3 * this.mConfig.timenext);
    }

    /** building001 等级达 sign_threshold */
    public get isCanOpen(): any {
        return ModelManager.instance.modelInside.getBuildingLv("building001") >= this.mConfig.sign_threshold;
    }

    public get groupStartTime(): any {
        var i = 0,
            s = this.mConfig.time[1],
            n = ConfigServer.getServerTimer(),
            h = ModelManager.instance.modelUser.getGameSeason(),
            o = Tools.getTodayMillWithHourAndMinute(s[1]);
        return h == s[0] && (i = n - o), i;
    }

    public get finalsStartTime(): any {
        var i = 0,
            s = this.mConfig.time[2],
            n = ConfigServer.getServerTimer(),
            h = ModelManager.instance.modelUser.getGameSeason(),
            o = Tools.getTodayMillWithHourAndMinute(s[1]);
        return h == s[0] && (i = n - o), i;
    }

    public get curGroupRemainTime(): any {
        return this.groupStartTime - this.curGroupNum * (1e3 * this.mConfig.timenext);
    }

    public get userGambleCnt(): any {
        var i = 0;
        return this.finals_data.gamble && this.finals_data.gamble[ModelManager.instance.modelUser.mUID] && (i = this.finals_data.gamble[ModelManager.instance.modelUser.mUID]), i;
    }

    /** 决赛轮次（开赛后恒 4） */
    public get curFinalsNum(): any {
        var i = 0,
            s = this.finalsStartTime;
        return i = Math.floor(s / (1e3 * this.mConfig.timenext)),
            1 == this.finalsState() && (i = 4), i;
    }

    /** 小组当前轮次：round_time 首个未来轮 -1（re_yard_round 补偿），上限 circle-1 */
    public get curGroupNum(): any {
        for (var i = 0, s = ConfigServer.getServerTimer(), n = 0; n < this.round_time.length; n++) {
            var h = this.round_time[n];
            if (s < h[1]) {
                i = h[0];
                break;
            }
        }
        return i - this.re_yard_round > 1 && (i -= 1),
            i > this.mConfig.circle && (i = this.mConfig.circle - 1), i;
    }

    /** 距下届开赛（按当前赛季在 time 三段中的位置取 2 天/1 天/0） */
    public get nextRemainTime(): any {
        var i = 0,
            s = this.mConfig.time,
            n = ConfigServer.getServerTimer(),
            h = ModelManager.instance.modelUser.getGameSeason(),
            o = Tools.getTodayMillWithHourAndMinute(s[1][1]);
        switch (h) {
            case s[0][0]:
                i = 2 * Tools.oneDayMilli + o - n;
                break;
            case s[0][1]:
                i = Tools.oneDayMilli + o - n;
                break;
            case s[1][0]:
            case s[2][0]:
                i = 0;
        }
        return i;
    }

    /** 奖励名次段表（首 area 名单列，其后区间化） */
    public get rewardRank(): any[] {
        for (var i = this.mConfig.reward, s: any[] = [], n = i.length, h = 0; h < n; h++) {
            var o: any[] = [];
            h < this.mConfig.area ? o.push(i[h][0]) : o = [i[h - 1][0] + 1, i[h][0]],
                s.push([o, i[h][1], i[h][2]]);
        }
        return s;
    }

    public get enrollSeason(): any {
        var i = this.mConfig.time,
            s = ModelManager.instance.modelUser.getGameSeason();
        return -1 != i[0].indexOf(s);
    }

    public get needEnroll(): any {
        return this.last_hids.length <= 0;
    }

    /** 前 10 名 + 自身排名信息补全 */
    public get cbYardList(): any[] {
        for (var i: any[] = [], s = null, n = this.group_rank.group_rank.slice(0, 10), h = 0; h < n.length; h++) {
            var o = n[h];
            (s = this.getUserData(o.uid, o.rank)).group_rank = o.rank,
                i.push(s);
        }
        return i;
    }

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModel） */
    public static get instance(): ModelChampionNew {
        return ModelChampionNew.sModel || (ModelChampionNew.sModel = new ModelChampionNew()), ModelChampionNew.sModel;
    }

    public static FRESH_ENROLL_STATE: string = "fresh_enroll_state";
    public static FRESH_BATTLE_ARRAY: string = "fresh_battle_array";
    public static FRESH_GROUP_STATE: string = "fresh_group_state";
    public static FRESH_GROUP_RANK: string = "fresh_group_rank";
    public static FRESH_FINALS_STATE: string = "fresh_finals_state";
    public static FRESH_GAMBLE_STATE: string = "fresh_gamble_state";
    public static sModel: ModelChampionNew = null;
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelChampionNew",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelChampionNew, "sg.model.ModelChampionNew", null, null);
