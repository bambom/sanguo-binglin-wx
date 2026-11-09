/**
 * sg.model.ModelArena —— 擂台赛模型（4 擂台 arena_list、5 阶段状态机 status 0-5、
 * 奖池/挑战者 buff 增量更新 updateArenaData、推送 push_pk_arena 决出冠军事件；
 * instance 惰性单例，构造即挂 NetSocket event_socket_receive_to）。
 *
 * 原文：code1.js 字节 [1827530,1839941]（包装变量 Uo，基类 i=As=sg.model.ViewModelBase，
 * 明文注册名 "sg.model.ModelArena"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelArena.js
 *
 * 批次 D 入批原因：ModelManager.init() `ModelArena.instance` 单例引用。
 * 依赖：vs=Tools、Gt=ConfigServer、pn=NetSocket、P=Handler、ue=ModelManager、tn=ViewManager、
 * Ts=Trace（批次 A/B 模块直引）；lr=ModelGame（本批类直引）；
 * 批次外全局注册路径：js=sg.guide.model.ModelGuide、ci=sg.fight.FightMain（startLogBattle）、
 * Dt=sg.boundFor.GotoManager（boundForArena，sg-externals-b 已有声明）、
 * Y7=sg.view.arena.ViewArenaMain（类引用）。
 * active getter 有副作用（写 mOpenTimes/cfg，原文如此）；nextOpenTime 的 cfg.time 为丢弃求值。
 */
import Handler = laya.utils.Handler;
import { ViewModelBase } from "./ViewModelBase";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { NetSocket } from "../net/NetSocket";
import { ModelManager } from "../manager/ModelManager";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { ModelGame } from "./ModelGame";

export class ModelArena extends ViewModelBase {

    public cfg: any = null;
    public arena: any = null;
    public mTime0: number = NaN;
    public mTime1: number = NaN;
    public mTime2: number = NaN;
    public mTime3: number = NaN;
    public mTime4: number = NaN;
    public mPushTime: number = NaN;
    public mOpenTimes: number = NaN;
    public mItemId: any = null;
    public mTotalGet: number = NaN;
    public mJoinNum: number = -1;
    public arenaData: any = null;

    constructor() {
        super();
        NetSocket.instance.on("event_socket_receive_to", this, this.event_socket_receive_to);
    }

    public event_socket_receive_to(t: any, i: any): void {
        var h = this,
            o = t.method,
            r = t.data;
        if (!Tools.isNullObj(r) && !r.hasOwnProperty("msg") && (this.cfg = ConfigServer.arena, this.cfg))
            switch (o) {
                case "push_pk_arena":
                    var a: any[] = [];
                    if (sg.model.ModelArena.instance.arena)
                        for (var l = 0; l < 4; l++) {
                            var c = sg.model.ModelArena.instance.arena.arena_list[l],
                                u = "";
                            c && c.user_list[0] && c.user_list[0].uid && (u = c.user_list[0].uid),
                                a.push(u);
                        }
                    this.arena = r;
                    var d = ConfigServer.getServerTimer();
                    if (d > this.mTime3)
                        for (var _ = 0; _ < 4; _++) {
                            var m = sg.model.ModelArena.instance.arena.arena_list[_];
                            m && m.user_list[0] && m.user_list[0].uid && m.user_list[0].uid != a[_] && this.event(ModelArena.EVENT_FINAL_WINNER, _);
                        }
                    if (r.all_done) {
                        if (this.mTime3 && d > this.mTime3 + 10 * Tools.oneMinuteMilli)
                            return;
                        this.event(ModelArena.EVENT_UPDATE_BTN_STATUS);
                        var g = this.cfg.show[3];
                        this.gotoMapArena(),
                            ViewManager.instance.showHeroTalk([g], null, "", { delayEvent: true });
                    }
                    -1 != this.mJoinNum && NetSocket.instance.send("get_arena_log", { arena_index: this.mJoinNum, log_index: 0 }, Handler.create(this, function (t: any) {
                        t.receiveData.pk_data && (t.receiveData.pk_data.is_mine = false),
                            sg.fight.FightMain.startLogBattle(t.receiveData, h, null);
                    })),
                        this.mJoinNum = -1,
                        this.event(ModelArena.EVENT_UPDATE_ARENA),
                        this.checkArenaData();
                    break;
                case "get_pk_arena":
                    this.arena = r,
                        this.checkArenaData();
                    break;
                case "w.get_info":
                    this.cfg = ConfigServer.arena,
                        this.mItemId = this.cfg.pool_item,
                        this.mTotalGet = 0,
                        this.arena = r.pk_arena,
                        this.initUserData(),
                        this.initArenaData(),
                        this.event(ModelArena.EVENT_UPDATE_BTN_STATUS);
                    break;
                case "push_arena_item":
                    this.event(ModelArena.EVENT_CLOSE_REWARD);
                    var f = r.act;
                    ModelManager.instance.modelUser.updateData(r),
                        3 == f && r.gift_dict[this.mItemId] && (this.mTotalGet += r.gift_dict[this.mItemId]),
                        this.event(ModelArena.EVENT_GET_ITEM, r);
            }
    }

    public getItemTime(): any {
        return this.arena.item_time ? Tools.getTimeStamp(this.arena.item_time) : 0;
    }

    /** 五个时间点（mTime0 提示 / 1 竞猜 / 2 攻擂 / 3 结束 / 4 查看+time_add） */
    public initUserData(): void {
        this.mPushTime = this.mTime0 = this.mTime1 = this.mTime2 = this.mTime3 = this.mTime4 = 0,
            this.arena && 1 == this.arena.if_open && (this.mTime1 = Tools.getTimeStamp(this.arena.dark_time), this.mTime2 = Tools.getTimeStamp(this.arena.start_time), this.mTime3 = Tools.getTimeStamp(this.arena.end_time), this.mTime4 = this.mTime3 + (this.cfg.time_add ? this.cfg.time_add * Tools.oneMinuteMilli : 0), this.mTime0 = this.mTime1 - 1e3 * this.cfg.time_notice),
            this.setPushTime();
    }

    public showTime(): void {
        Trace.log("====显示按钮时间", Tools.dateFormat(this.mTime0)),
            Trace.log("====开始竞猜时间", Tools.dateFormat(this.mTime1)),
            Trace.log("====开始攻擂时间", Tools.dateFormat(this.mTime2)),
            Trace.log("====攻擂结束时间", Tools.dateFormat(this.mTime3)),
            Trace.log("====查看结束时间", Tools.dateFormat(this.mTime4));
    }

    /** 距下一届开赛毫秒（gap 天轮转；-1=永久关闭返回 0） */
    public nextOpenTime(): any {
        var i = (this.cfg.time, ModelManager.instance.modelUser.isMerge),
            s = ModelManager.instance.modelUser.loginDateNum - 1,
            n = i ? this.cfg.expand_day[1] : this.cfg.expand_day[0],
            h = this.cfg.gap;
        if (-1 == n)
            return 0;
        var o = Tools.getTodayMillWithHourAndMinute(this.cfg.time[0]);
        return 0 == this.active ? o += s < n ? (n - s) * Tools.oneDayMilli : (o - n) % h * Tools.oneDayMilli : o += h * Tools.oneDayMilli, o;
    }

    public setPushTime(): void {
        var i = ConfigServer.getServerTimer();
        0 == this.active ? this.mPushTime = 0 : i < this.mTime0 ? this.mPushTime = this.mTime0 : i >= this.mTime0 && i < this.mTime1 ? this.mPushTime = this.mTime1 : i >= this.mTime1 && i < this.mTime2 ? this.mPushTime = this.mTime2 : i >= this.mTime2 && i < this.mTime3 ? this.mPushTime = this.mTime3 : i >= this.mTime3 && i < this.mTime4 ? this.mPushTime = this.mTime4 : this.mPushTime = 0;
    }

    /** 全部擂台已被占领 */
    public isOver(): any {
        var i = ConfigServer.getServerTimer(),
            s = this.active,
            n = 0 == this.mTime3 || i >= this.mTime3,
            h = true;
        if (this.arena)
            for (var o = 0; o < this.arena.arena_list.length; o++)
                if (0 != this.arena.arena_list[o].user_list[1].length) {
                    h = false;
                    break;
                }
        return s && n && h;
    }

    /** 到点弹阶段推送（黑马文案 dark_horse；1=静默段原文空分支） */
    public showPushView(): void {
        if (!sg.guide.model.ModelGuide.forceGuide() && (0 != this.active && !ModelGame.unlock(null, "arena").stop && (this.updateArenaData(), 0 != this.mPushTime && ConfigServer.getServerTimer() >= this.mPushTime))) {
            var i = this.status;
            if (this.event(ModelArena.EVENT_UPDATE_BTN_STATUS), 1 == i)
                { }
            else {
                var n: any = null;
                if (2 == i)
                    n = this.cfg.show[0], this.sendChatMsg("arena_start"), this.event(ModelArena.EVENT_UPDATE_ARENA_CLIP);
                else if (3 == i)
                    this.sendChatMsg("arena_attack"), n = this.cfg.show[1];
                else if (4 == i) {
                    this.isOver() ? (this.gotoMapArena(), n = this.cfg.show[3]) : n = this.cfg.show[2];
                    for (var h = 0; h < 4; h++) {
                        var o = sg.model.ModelArena.instance.arena.arena_list[h];
                        o && o.user_list[0] && Tools.getTimeStamp(o.user_list[0].win_time) < this.mTime3 && this.event(ModelArena.EVENT_FINAL_WINNER, h);
                    }
                }
                var r = 2 == i ? this.cfg.dark_horse[0] : 0;
                n && 0 != n.length && (0 != r && (null == n[3] ? n.push([r]) : n[3] = [r]), ViewManager.instance.showHeroTalk([n], null));
            }
            this.setPushTime();
        }
    }

    /** 按合服档 number_<mergeNum> 的 [天数门槛,次数] 表 */
    public fightNum(): any {
        for (var i = this.cfg["number_" + ModelManager.instance.modelUser.mergeNum], s = ModelManager.instance.modelUser.loginDateNum, n = i.length - 1; n >= 0; n--)
            if (s >= i[n][0])
                return i[n][1];
        return 0;
    }

    /** 今日剩余挑战次数（num=[上限,冷却秒]） */
    public joinNum(): any {
        var i = ModelManager.instance.modelUser.arena,
            s = this.cfg.num;
        if (i) {
            var n = Tools.getTimeStamp(i.join_time),
                h = ConfigServer.getServerTimer(),
                o = Math.floor((h - n) / (1e3 * s[1]));
            return o > s[0] ? s[0] : o;
        }
        return s[0];
    }

    /** t=0 文案 1 原文 key 2 纯时间 */
    public getTxt(t?: any): any {
        void 0 === t && (t = 0);
        var s = ConfigServer.getServerTimer(),
            n = "",
            h = 0;
        switch (this.status) {
            case 0:
                n = "arena_text27";
                break;
            case 1:
                h = this.mTime1, n = "arena_text28";
                break;
            case 2:
                h = this.mTime2, n = "arena_text29";
                break;
            case 3:
                h = this.mTime3, n = "arena_text30";
                break;
            case 4:
                n = 0 == this.isOver() ? "arena_text31" : "arena_text32";
        }
        switch (t) {
            case 0:
                return 0 == h ? Tools.getMsgById(n) : Tools.getMsgById(n, [Tools.getTimeStyle(h - s)]);
            case 1:
                return Tools.getMsgById(n, [""]);
            case 2:
                return 0 == h ? "" : Tools.getTimeStyle(h - s);
        }
        return "";
    }

    public getArenaGroup(): any[] {
        for (var i: any[] = [], s = this.arena.arena_list, n = 0; n < s.length; n++)
            i.push(s[n].type);
        return i;
    }

    public getArenaItemNum(t: any): any {
        return this.arenaData && this.arenaData[t] ? this.arenaData[t].item_num[0] : 0;
    }

    /** 擂主在位时间加成（challenger 表） */
    public challengerBuff(t: any): any {
        var s = this.arena.arena_list[t].user_list[0];
        if (s)
            for (var n = (ConfigServer.getServerTimer() - Tools.getTimeStamp(s.win_time)) / 1e3, h = this.cfg.challenger, o = h.length - 1; o >= 0; o--)
                if (n >= h[o][0])
                    return h[o][1];
        return 0;
    }

    public foreshowTips(): void {
        this.cfg.show[4] && (<any>ViewManager.instance).showHeroTalk([this.cfg.show[4]]);
    }

    /** 商店入口：有擂台配置 + 开服天数达 expand_day[0]（getLight 合服取 [1]） */
    public openShop(): boolean {
        if (this.cfg = ConfigServer.arena, null == this.cfg)
            return false;
        var i = ModelManager.instance.modelUser.loginDateNum - 1 >= this.cfg.expand_day[0];
        return this.getLight() && i;
    }

    public getLight(): any {
        return this.cfg = ConfigServer.arena,
            null != this.cfg && -1 != (ModelManager.instance.modelUser.isMerge ? this.cfg.expand_day[1] : this.cfg.expand_day[0]);
    }

    /** 奖池快照（need_item/need_buff 门槛来自 system_massage 两表，缺省 99999） */
    public initArenaData(): void {
        if (!ModelGame.unlock(null, "arena").stop) {
            var i = this.arena.arena_list,
                s = ConfigServer.getServerTimer() > this.mTime2 ? this.getItemTime() + 1e3 * this.cfg.pool_add[0] : this.mTime2 + 1e3 * this.cfg.pool_add[0];
            this.arenaData = {};
            var n: any[] = [];
            if (ConfigServer.system_simple.system_massage.hasOwnProperty("arena_pool_max"))
                for (var h = ConfigServer.system_simple.system_massage.arena_pool_max, o = 1; o < 5 && h[o + ""]; o++)
                    n.push(h[o + ""].need[0]);
            0 == n.length && n.push(99999);
            var r: any[] = [];
            if (ConfigServer.system_simple.system_massage.hasOwnProperty("arena_cha_add"))
                for (var a = ConfigServer.system_simple.system_massage.arena_cha_add, l = 1; l < 5 && a[l + ""]; l++)
                    r.push(a[l + ""].need[0]);
            0 == r.length && r.push(99999);
            for (var c = 0; c < i.length; c++) {
                var u = i[c];
                this.arenaData[c] = {
                    item_num: [u.item_num, -1],
                    buff_num: [this.challengerBuff(c), -1],
                    type: i[c].type,
                    count: 0,
                    num: i[c].item_num,
                    need_item: n,
                    need_buff: r,
                    refresh_time: s,
                    top_id: u.user_list[0] ? u.user_list[0].uid : ""
                };
            }
        }
    }

    /** 攻擂期增量：奖池按 pool_add[1]*黑马系数累积、跨档广播；擂主 buff 换挡广播 */
    public updateArenaData(): void {
        if (3 == this.status) {
            var i = ConfigServer.getServerTimer();
            if (this.arenaData)
                for (var s in this.arenaData) {
                    var n = Number(s),
                        h = this.arenaData[s].item_num,
                        o = this.arenaData[s].count,
                        r = this.arenaData[s].refresh_time,
                        a = this.arena.dark_arena_index == n ? this.cfg.dark_horse[1] : 1;
                    h[0] = this.arenaData[s].num + o * this.cfg.pool_add[1] * a,
                        i > r && (o++, r = this.getItemTime() + (o + 1) * this.cfg.pool_add[0] * 1e3),
                        this.arenaData[s].count = o,
                        this.arenaData[s].refresh_time = r;
                    var l = this.arenaData[s].need_item;
                    if (-1 == h[1] || h[1] < l.length - 1)
                        for (var c = h[1] + 1, u = l.length - 1; u >= c; u--)
                            if (h[0] >= l[u]) {
                                h[1] = u, this.sendChatMsg("arena_pool_max", n);
                                break;
                            }
                    var d = this.arenaData[s].buff_num,
                        _ = this.challengerBuff(n);
                    d[0] = _;
                    var m = this.arenaData[s].need_buff;
                    if (-1 == d[1] || d[1] < m.length - 1)
                        for (var g = d[1] + 1, f = m.length; f >= g; f--)
                            if (d[0] == m[f]) {
                                d[1] = f, this.sendChatMsg("arena_cha_add", n);
                                break;
                            }
                }
        }
    }

    public checkArenaData(): void {
        if (this.arenaData)
            for (var i in this.arenaData) {
                var s = this.arenaData[i],
                    n = this.arena.arena_list[Number(i)];
                s.num = n.item_num;
                for (var h = s.item_num, o = s.need_item, r = h[1] + 1, a = o.length - 1; a >= r; a--)
                    if (h[0] >= o[a]) {
                        h[1] = a;
                        break;
                    }
                if (s.count = 0, s.refresh_time = this.getItemTime() + 1e3 * this.cfg.pool_add[0], n.user_list[0] && s.top_id != n.user_list[0].uid) {
                    s.top_id = n.user_list[0].uid;
                    var l = s.buff_num,
                        c = s.need_buff;
                    l[1] = -1;
                    for (var u = 0; u < c.length; u++)
                        if (l[0] == c[u]) {
                            l[1] = u;
                            break;
                        }
                }
            }
    }

    public sendMsg(t: any, i: any): void {
        NetSocket.instance.send(t, i, null);
    }

    /** 本地聊天广播（system_massage 表 + sendLocalMessage） */
    public sendChatMsg(t: any, i?: any): void {
        if (ConfigServer.system_simple.system_massage.hasOwnProperty(t)) {
            var n = ConfigServer.system_simple.system_massage[t],
                h = ConfigServer.getServerTimer(),
                o: any[] = [],
                r = 0;
            switch (t) {
                case "arena_start":
                    o = [this.cfg.dark_horse[0]];
                    break;
                case "arena_attack":
                    break;
                case "arena_cha_add":
                    var a = this.arenaData[i];
                    r = a.buff_num[1] + 1, o = [Tools.getMsgById(sg.model.ModelArena.textArr[a.type]), 100 * a.buff_num[0] + "%"];
                    break;
                case "arena_pool_max":
                    var l = this.arenaData[i];
                    r = l.item_num[1] + 1, o = [Tools.getMsgById(sg.model.ModelArena.textArr[l.type]), l.need_item[l.item_num[1]]];
            }
            ModelManager.instance.modelChat.sendLocalMessage([n[r].icon, t, r + "", o, h]);
        }
    }

    public isCanEnterInto(): boolean {
        if (this.active) {
            if (ModelGame.unlock(null, "arena").stop)
                return false;
            var i = ConfigServer.getServerTimer();
            return !(i < sg.model.ModelArena.instance.mTime0) && !(i >= sg.model.ModelArena.instance.mTime4);
        }
        return false;
    }

    public gotoMapArena(): void {
        if (!sg.guide.model.ModelGuide.forceGuide() && this.active) {
            if (this.event(ModelArena.EVENT_UPDATE_ARENA_CLIP), this.cfg && this.cfg.hasOwnProperty("map_show_off") && ModelManager.instance.modelUser.mergeNum > this.cfg.map_show_off)
                return;
            sg.boundFor.GotoManager.instance.boundForArena();
        }
    }

    /** 开赛态（副作用写 mOpenTimes；gap 周期轮转开） */
    public get active(): any {
        if (this.mOpenTimes = 0, this.cfg = ConfigServer.arena, null == this.cfg)
            return false;
        var i = ModelManager.instance.modelUser.isMerge,
            s = ModelManager.instance.modelUser.loginDateNum,
            n = i ? this.cfg.expand_day[1] : this.cfg.expand_day[0],
            h = this.cfg.gap;
        if (-1 == n)
            return false;
        var o = s - 1;
        return o == n ? (this.mOpenTimes = 1, true) : o > n && (this.mOpenTimes = 1, (o - n) % h == 0) && (this.mOpenTimes = 1 + (o - n) / h, true);
    }

    /** 0 未开 1 提示 2 竞猜 3 攻擂 4 查看 5 结算后 */
    public get status(): any {
        var i = 0,
            s = ConfigServer.getServerTimer();
        return 0 == this.active ? i = 0 : s >= this.mTime0 && s < this.mTime1 ? i = 1 : s >= this.mTime1 && s < this.mTime2 ? i = 2 : s >= this.mTime2 && s < this.mTime3 ? i = 3 : s >= this.mTime3 && s < this.mTime4 ? i = 4 : s >= this.mTime4 && (i = 5), i;
    }

    public get redPoint(): any {
        return false;
    }

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModel） */
    public static get instance(): ModelArena {
        return ModelArena.sModel = ModelArena.sModel || new ModelArena();
    }

    public static hasNextFight(t: any, i: any): boolean {
        var n = sg.model.ModelArena.instance.arena.arena_list[t];
        return null != n.user_list[0] && i < n.log_len - 1;
    }

    /** t=擂台组号：开赛中拉 get_pk_arena 后开 ViewArenaMain；否则查 top_one 弹玩家信息 */
    public static showView(t?: any): void {
        void 0 === t && (t = 0);
        var n = false,
            h = false;
        if (sg.model.ModelArena.instance.active && sg.model.ModelArena.instance.status >= 2 && 0 == sg.model.ModelArena.instance.isOver() && -1 != sg.model.ModelArena.instance.getArenaGroup().indexOf(t) && (n = true), n)
            h = true,
                NetSocket.instance.send("get_pk_arena", {}, Handler.create(null, function (e: any) {
                    sg.model.ModelArena.instance.arena = e.receiveData,
                        ViewManager.instance.showView(["ViewArenaMain", sg.view.arena.ViewArenaMain], t);
                }));
        else {
            var o = ModelArena.getArenaData();
            o && o[t] && (ModelManager.instance.modelUser.selectUserInfo(o[t].uid), h = true);
        }
        !h && ModelManager.instance.modelGame.event("event_click_arena_clip", t - 1);
    }

    public static getArenaData(): any {
        if (null == sg.model.ModelArena.instance.arena)
            return {};
        var i = sg.model.ModelArena.instance.arena.top_one,
            s = sg.model.ModelArena.instance.arena.arena_list,
            n: any[] = [],
            h = false,
            o = sg.model.ModelArena.instance.status;
        if ((2 == o || 3 == o || 4 == o && !sg.model.ModelArena.instance.isOver()) && (h = true), h)
            for (var r = 0; r < s.length; r++)
                n.push(s[r].type);
        var a: any = {};
        for (var l in i)
            -1 == n.indexOf(Number(l)) && (a[l] = i[l]);
        return a;
    }

    public static EVENT_UPDATE_ARENA: string = "event_update_arena";
    public static EVENT_UPDATE_BTN_STATUS: string = "event_update_btn_status";
    public static EVENT_GET_ITEM: string = "event_get_item";
    public static EVENT_CLOSE_REWARD: string = "event_close_reward";
    public static EVENT_UPDATE_ARENA_CLIP: string = "event_update_arena_clip";
    public static EVENT_FINAL_WINNER: string = "event_final_winner";
    public static sModel: ModelArena = null;

    /**
     * 原文 h(s,["imgArr",…,"textArr",…,"textArr_S",…,"nameArr",…]) —— 4 个 Laya.static
     * 惰性静态表（静态 getter + defineProperty 换写，ViewScenes 同款）。
     */
    public static get imgArr(): string[] {
        var v = ["", "icon_leitai_zi7", "icon_leitai_zi6", "icon_leitai_zi5", "icon_leitai_zi8", "icon_leitai_zi4", "icon_leitai_zi3", "icon_leitai_zi2", "icon_leitai_zi1"];
        Object.defineProperty(ModelArena, "imgArr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get textArr(): string[] {
        var v = ["", "500100", "500101", "500102", "500121", "500103", "500104", "500105", "500106"];
        Object.defineProperty(ModelArena, "textArr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get textArr_S(): string[] {
        var v = ["", "_hero3", "_hero4", "_hero5", "other_0", "skill_type_simple_0", "skill_type_simple_1", "skill_type_simple_2", "skill_type_simple_3"];
        Object.defineProperty(ModelArena, "textArr_S", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get nameArr(): string[] {
        var v = ["", "_hero6", "_hero7", "_hero8", "90005", "skill_type_0", "skill_type_1", "skill_type_2", "skill_type_3"];
        Object.defineProperty(ModelArena, "nameArr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelArena",i)（i=As=sg.model.ViewModelBase）。
 */
Laya.class(ModelArena, "sg.model.ModelArena", null, null);
