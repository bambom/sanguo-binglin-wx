/**
 * sg.manager.QueueManager —— 登录后弹窗队列：集中收集信用结算/月卡周卡/国家公告/
 * 图片公告（按日/区间/本地去重）/帝位提示/神器购买/节日海报/远征/武将对话
 * （ViewHeroTalk/ViewHeroTalk2）/驱邪等候选，依次弹出。
 *
 * 原文：code1.js 包装函数 function(t){...o(i,"sg.manager.QueueManager",t)...}，
 * 基类 t=laya.events.EventDispatcher。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/QueueManager.js
 *
 * 模块直引：ue=ModelManager、gs=StringUtil、ae=ColorManager、us=SaveLocal、
 * vs=Tools、Rt=ConfigApp、Gt=ConfigServer、tn=ViewManager、p8=ViewHeroTalk；
 * 批次外环境声明：js=sg.guide.model.ModelGuide、lr=sg.model.ModelGame、
 * Ht=sg.cfg.ConfigClass、Dr=sg.model.ModelSalePay、Sr=sg.model.ModelOfficial、
 * Bh=sg.activities.model.ModelMemberCard、Sh=sg.activities.model.ModelLoopCard、
 * Jh=sg.activities.model.ModelWeekCard、Eh=sg.activities.model.ModelPayRank、
 * Ls=sg.activities.model.ModelFreeBuy、lo=sg.festival.model.ModelFestival、
 * v8=sg.view.init.ViewHeroTalk2、Eo=sg.model.ModelBlessHero、Wo=sg.model.ModelFightTask、
 * ro=sg.duplicate.ModelDuplicate、Ao=sg.kunlun.model.ModelKunlunSale、
 * Ks=sg.kunlun.model.ModelExorcism、Dt=sg.boundFor.GotoManager、ps=sg.utils.TimeHelper、
 * Ce=sg.model.ModelBuff；K=laya.maths.MathUtil。
 * 原文自引 sg.manager.QueueManager → TS 类直引。
 */
import { ModelManager } from "./ModelManager";
import { StringUtil } from "../utils/StringUtil";
import { ColorManager } from "./ColorManager";
import { SaveLocal } from "../utils/SaveLocal";
import { Tools } from "../utils/Tools";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { ViewManager } from "./ViewManager";
import { ViewHeroTalk } from "../view/init/ViewHeroTalk";

export class QueueManager extends laya.events.EventDispatcher {

    constructor() {
        super();
        this.queueList = [];
        this.mIndex = 0;
        this.mIsOver = !1;
        this.mIsGoto = !1;
    }

    public queueList: any[];
    public mIndex: number;
    public mIsOver: boolean;
    public mIsGoto: boolean;

    /** 强制引导或付费锁未停时不入队 */
    public checkInitQueue(): void {
        if (this.mIsOver = !1, this.mIndex = 0, this.queueList = [],
            !sg.guide.model.ModelGuide.forceGuide() && !sg.model.ModelGame.unlock(null, "pay").stop) {
            ModelManager.instance.modelUser.credit_settle && 0 != ModelManager.instance.modelUser.credit_settle.length
            && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_CREDITRESULT, arg: null, id: "credit_settle" });
            var t = sg.model.ModelSalePay.getOverdueList();
            t.length > 0 && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_SALE_PAY_ALERT, arg: t, id: "" });
            var i = sg.model.ModelOfficial.checkCountryKingTips();
            null != i && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_COUNTRY_KING_TIPS, arg: i, id: "" }),
                sg.activities.model.ModelMemberCard.instance.needPop && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_MEMBER_CARD, id: "member_card" }),
                ConfigApp.isLandscape
                    ? sg.activities.model.ModelLoopCard.instance.needPop && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_LOOP_CARD_REWARD_PANEL, id: "" })
                    : sg.activities.model.ModelWeekCard.instance.needPop && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_WEEK_CARD, id: "" }),
                this.showCountryNotice() && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_COUNTRY_NOTICE_ALERT, id: "" });
            for (var e = this.checkNoticePictureDay(), s = 0; s < e.length; s++)
                this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_NOTICE_PICTURE, arg: e[s], id: "notice_picture_" + s });
            for (var n = this.checkNoticePicture(), h = 0; h < n.length; h++)
                this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_NOTICE_PICTURE, arg: n[h], id: "notice_picture_" + h });
            ModelManager.instance.modelCountryPvp.checkShowBeginTips() && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_COUNTRY_PVP_TIPS, arg: null, id: "" }),
                ModelManager.instance.modelCountryPvp.showTrbutaryView(!1) && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_COUNTRY_TRIBUTARY_TIPS, arg: null, id: "" }),
                sg.activities.model.ModelPayRank.instance.canPop && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_PAY_RANK_TIPS, id: "" });
            var o = this.showEmperorTips();
            if (o) {
                this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_EMPEROR_TIPS, arg: o, id: "" });
                var r = ModelManager.instance.modelCountryPvp.cfg.push_win_xyz2;
                if (r) {
                    var a = o[0],
                        l = StringUtil.htmlFontColor(Tools.getMsgById("country_" + a), ColorManager.getUIColor("COUNTRY_COLORS")[a]);
                    r = r.concat([[l], { bigHero: !0 }]),
                        this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: [[r]], id: "" });
                }
            }
            var c = this.showGetWeapen();
            "" != c && this.queueList.push({ view: sg.activities.model.ModelFreeBuy.instance.viewID, arg: c, id: "" });
            var u = this.showFestivalAD();
            0 != u.length && this.checkNoticePictureLocal("festival", sg.festival.model.ModelFestival.instance.actId)
            && this.queueList.push({ view: sg.cfg.ConfigClass.VIEW_NOTICE_PICTURE, arg: [u, "festival", sg.festival.model.ModelFestival.instance.actId], id: "festival" });
            var d = this.showExpeditionTalk();
            d && this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: d, id: "" });
            var _ = sg.model.ModelBlessHero.instance.talkOptions;
            if (_) this.queueList.push({ view: ["ViewHeroTalk2", sg.view.init.ViewHeroTalk2], arg: _, cid: _.cid });
            else {
                var m = ModelManager.instance.modelGame.checkPKnpcCaptainLocal();
                m && (
                    this.queueList.push({ view: ["ViewHeroTalk2", sg.view.init.ViewHeroTalk2], arg: m, type: "captain" }),
                        ModelManager.instance.modelGame.setCaptianLoacalData(m.hid)
                );
            }
            sg.model.ModelFightTask.instance.needPush && this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: sg.model.ModelFightTask.instance.talkArgs, id: "" });
            var g = sg.duplicate.ModelDuplicate.instance.talkData;
            if (g && this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: [g], id: "" }),
                sg.kunlun.model.ModelKunlunSale.instance.isOpen) {
                var f = sg.kunlun.model.ModelKunlunSale.instance.cfg_sale.show_start;
                2 == sg.kunlun.model.ModelKunlunSale.instance.popState && (
                    f && this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: [[f]], id: "" }),
                        sg.kunlun.model.ModelKunlunSale.instance.popState = 1
                );
            }
            var p = sg.kunlun.model.ModelExorcism.instance.getExorcismNotice();
            p && this.queueList.push({ view: ["ViewHeroTalk", ViewHeroTalk], arg: [p], id: "" });
        }
    }

    public showFirst(): void {
        this.queueList.length > 0 ? this.showView(this.queueList[this.mIndex]) : this.mIsOver = !0;
    }

    public showNext(t: any): void {
        if (0 != this.queueList.length && !sg.guide.model.ModelGuide.forceGuide()) {
            var i = this.queueList[this.mIndex];
            if (this.mIsGoto)
                0 == ViewManager.instance.mScenesArr.length && ViewManager.instance.isNoPanel() && ViewManager.instance.isNoScence() && (
                    i ? this.showView(i) : this.mIsOver = !0,
                        this.mIsGoto = !1
                );
            else if (i) {
                var e = this.queueList[this.mIndex - 1];
                e && e.view[0] == t && this.showView(i);
            } else this.mIsOver = !0;
        }
    }

    public showView(t: any): void {
        t.cid && sg.boundFor.GotoManager.instance.boundForMap(t.cid),
            "captain" == t.type && sg.boundFor.GotoManager.instance.boundForCaptain(),
            ViewManager.instance.showView(t.view, t.arg),
            this.mIndex += 1;
    }

    /** 区间型图片公告：开服天数窗口 + 等级门槛 + pf 白/黑名单 + 本地去重 */
    public checkNoticePicture(): any[] {
        var t = ConfigServer.notice.notice_picture, i: any[] = [];
        if (t) {
            var e = ModelManager.instance.modelUser.loginDateNum,
                s = t["open_day_" + ModelManager.instance.modelUser.mergeNum];
            if (s)
                for (var n = 0; n < s.length; n++) {
                    var h = s[n][0], o = s[n][1], r = h.split("_"), a = Number(r[0]), l = Number(r[1]);
                    if (e >= a && e <= l) {
                        var c = t[o];
                        if (null == c[2] || ModelManager.instance.modelUser.getLv() >= c[2]) {
                            var u = !1, d = c[3] ? c[3] : null;
                            if (d && d[0] && d[1] ? 0 == d[0].length && 0 == d[1].length ? u = !0
                                : 0 != d[0].length ? -1 != d[0].indexOf(ConfigApp.pf) && (u = !0)
                                    : 0 != d[1].length && -1 == d[1].indexOf(ConfigApp.pf) && (u = !0)
                                : u = !0,
                                u)
                                this.checkNoticePictureLocal("notice_picture", o) && i.push([t[s[n][1]], "notice_picture", o, 0]);
                        }
                    }
                }
        }
        return i;
    }

    /** 日历型图片公告：开/关时间窗（TimeHelper 偏移）+ area/pf 名单 + 合服 blind_time，按 key 排序 */
    public checkNoticePictureDay(): any[] {
        var t = ConfigServer.notice.notice_picture_day, i: any[] = [];
        for (var e in t) {
            var s = t[e];
            if (s.open_day && s.close_day) {
                var n = ConfigServer.getServerTimer(),
                    h = s.open_day.split("-"), o = s.close_day.split("-"),
                    r = new Date(Number(h[0]), Number(h[1]) - 1, Number(h[2]), Number(h[3]), Number(h[4])),
                    a = new Date(Number(o[0]), Number(o[1]) - 1, Number(o[2]), Number(o[3]), Number(o[4])),
                    l = r.getTime() - sg.utils.TimeHelper.getOffsetMin() * Tools.oneMinuteMilli,
                    c = a.getTime() - sg.utils.TimeHelper.getOffsetMin() * Tools.oneMinuteMilli,
                    u = !1, d = !1;
                n >= l && n <= c && (
                    s.area ? 0 == s.area[0].length && 0 == s.area[1].length ? u = !0
                        : 0 != s.area[0].length ? -1 == s.area[0].indexOf(ModelManager.instance.modelUser.zone) && -1 == s.area[0].indexOf(ModelManager.instance.modelUser.mergeZone) || (u = !0)
                            : 0 != s.area[1].length && (-1 != s.area[1].indexOf(ModelManager.instance.modelUser.zone) && -1 != s.area[1].indexOf(ModelManager.instance.modelUser.mergeZone) || (u = !0))
                        : u = !0,
                        s.pf ? 0 == s.pf[0].length && 0 == s.pf[1].length ? d = !0
                            : 0 != s.pf[0].length ? -1 != s.pf[0].indexOf(ConfigApp.pf) && (d = !0)
                                : 0 != s.pf[1].length && -1 == s.pf[1].indexOf(ConfigApp.pf) && (d = !0)
                            : d = !0
                );
                var _ = !0;
                if (!ModelManager.instance.modelUser.isMerge)
                    if (s.blind_time) ModelManager.instance.modelUser.getGameDate(r.getTime() + 1) <= s.blind_time && (_ = !1);
                if (u && d && _) this.checkNoticePictureLocal("notice_picture_day", e) && i.push([s.group1, "notice_picture_day", e, Number(e)]);
                i.sort(<any>laya.maths.MathUtil.sortByKey("3", !1));
            }
        }
        return i;
    }

    /** 本地按登录日去重：返回是否仍可展示 */
    public checkNoticePictureLocal(t: string, i: string): boolean {
        var e = ModelManager.instance.modelUser.loginDateNum,
            s = SaveLocal.getValue("key_notice_picture_" + ModelManager.instance.modelUser.mUID, !0);
        if (Tools.isNullString(s)) return !0;
        if (0 == s.hasOwnProperty(t)) return !0;
        var n = s[t];
        return -1 == (n[i] ? n[i] : []).indexOf(e);
    }

    public showEmperorTips(): any {
        if (0 == ModelManager.instance.modelCountryPvp.mIsToday) {
            var t = ModelManager.instance.modelCountryPvp.xyCityId + "",
                i = sg.model.ModelOfficial.cities[t];
            if (i && -1 != [0, 1, 2].indexOf(i.country)) {
                var e = SaveLocal.getValue("emperor_tips_time_" + ModelManager.instance.modelUser.mUID, !0);
                if (!e || e.time && Tools.isNewDay(e.time)) {
                    var s = i.country;
                    return [s, sg.model.ModelOfficial.countries[s].official[0] ? sg.model.ModelOfficial.countries[s].official[0][1] : ""];
                }
            }
        }
        return null;
    }

    /** 神器日购：装备已有或未达支付门槛则弹 */
    public showGetWeapen(): string {
        var t = ConfigServer.ploy.day_buy_weapon,
            i = ModelManager.instance.modelUser.records.day_buy_weapon,
            e = ModelManager.instance.modelUser.loginDateNum;
        if (null == t) return "";
        for (var s in t) {
            var n = t[s].reward;
            if ((!n.equip || !ModelManager.instance.modelGame.getModelEquip(n.equip[0]).isMine())
                && (e >= t[s].open_day[0] && e <= t[s].open_day[1])) {
                if (0 == i.hasOwnProperty(s)) return "day_buy_weapon_" + s;
                if (i[s][0] < t[s].need_pay) return "day_buy_weapon_" + s;
            }
        }
        return "";
    }

    public showFestivalAD(): any {
        return sg.festival.model.ModelFestival.instance.poster;
    }

    public showExpeditionTalk(): any {
        var t = sg.model.ModelBuff.expeditionCid;
        if (-1 !== t && sg.model.ModelOfficial.cities[t] && ConfigServer.country.expedition) {
            var i = ConfigServer.country.expedition.poster;
            if (ConfigServer.country.expedition.poster)
                return [[[i[0], i[1], i[2], [sg.model.ModelOfficial.getCityName(t + "")]]], function () {
                    sg.boundFor.GotoManager.instance.boundForMap(t, 0);
                }];
        }
        return null;
    }

    /** 国君公告：有内容且（首次 或 公告时间更新 或 当日未确认） */
    public showCountryNotice(): boolean {
        var t = sg.model.ModelOfficial.getCountrNoticeData();
        if (t && !Tools.isNullString(t.content)) {
            var i = t.modify_user.t ? Tools.getTimeStamp(t.modify_user.t) : 0;
            if (0 != i) {
                var e = SaveLocal.getValue("key_country_notice_time_" + ModelManager.instance.modelUser.mUID, !0), s = !e;
                if (!s) {
                    var n = e.time ? e.time : 0;
                    if (i > n && (s = !0), !s) 0 == (e && e.check) && Tools.isNewDay(n) && (s = !0);
                }
                if (s) return !0;
            }
        }
        return !1;
    }

    /** r(1,i,"instance",getter,EventDispatcher._$SET_instance) —— 惰性单例 + 可写回（原文静态名字即 sViewManager） */
    public static get instance(): QueueManager {
        return QueueManager.sViewManager = QueueManager.sViewManager || new QueueManager();
    }
    public static set instance(v: QueueManager) {
        QueueManager.sViewManager = v;
    }

    public static EVENT_CLOSE_PANEL: string = "event_close_panel";
    public static sViewManager: QueueManager = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.manager.QueueManager",t)（t=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(QueueManager, "sg.manager.QueueManager", null, null);
