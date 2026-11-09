/**
 * sg.model.ModelChat —— 聊天中枢：5 频道（世界/国家/公会/副本双线/演出）消息装配、
 * 200 条滚动缓存、表情图替换（cfg_face）、私聊本地档（local_save_key_chat_*）、
 * 冻结禁言脱敏、演武场本地赛程消息（mTimeYard1-6 / times_YardNew）与点击跳转分发。
 *
 * 原文：code1.js 字节 [1939994,1961816]（包装变量 Xo，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 e(x)="sg.model.ModelChat"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelChat.js
 *
 * 批次 D 入批原因：ModelManager.init() modelChat 单例、ModelGame.mailGiftMsg/pushFreezeDo
 * 直引。依赖（批次 A/B/C 模块直引）：pn=NetSocket、P=Handler、vs=Tools、ue=ModelManager、
 * tn=ViewManager、Ts=Trace、us=SaveLocal、Gt=ConfigServer、Ht=ConfigClass、Rt=ConfigApp、
 * Ut=Platform、cs=ObjectUtil、gs=StringUtil、ae=ColorManager、re=AssetsManager、le=EffectManager；
 * 本批直引：lr=ModelGame（unlock）、Sr=ModelOfficial、Qo=ModelClimb、Uo=ModelArena。
 * 批次外全局注册路径：ro=sg.duplicate.ModelDuplicate、ce=sg.manager.FilterManager、
 * Bh=sg.activities.model.ModelMemberCard、_r=sg.model.ModelHero、Gr=sg.model.ModelSkill、
 * Ko=sg.model.ModelCityBuild、yr=sg.model.ModelItem、nr=sg.model.ModelEquip、
 * wi=sg.fight.logic.utils.FightDuplicateUtils、Io=sg.heritage.ModelHeritage、
 * ge=sg.map.utils.ArrayUtils（sortOn）、Wt=sg.cfg.HelpConfig（type_app）、
 * Eh=sg.activities.model.ModelPayRank、bh=sg.activities.model.ModelEquipBox、
 * ju=sg.homeland.view.HomelandUser、Vo=sg.model.ModelFightLog_H、
 * T3=sg.view.country.ViewAlienTroopInfo、ci=sg.fight.FightMain、
 * Ao=sg.kunlun.model.ModelKunlunSale、lo=sg.festival.model.ModelFestival、
 * $t=sg.crossService.CrossServiceFacade、ho=sg.crossService.model.CrossServiceUserModel、
 * Dt=sg.boundFor.GotoManager。
 * 引擎：K=laya.maths.MathUtil（sortByKey）、Tt=laya.net.URL（formatURL）、
 * $=laya.wx.mini.MiniAdpter（window.game37_*）。
 * checkLoacalMessage/getChatCache 的 sort 附加实参与 initLocalMsgTime 的硬编码 n[6]
 * 均为原文如此。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import URL = laya.net.URL;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { SaveLocal } from "../utils/SaveLocal";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigClass } from "../cfg/ConfigClass";
import { Platform } from "../laya/Platform";
import { ObjectUtil } from "../utils/ObjectUtil";
import { StringUtil } from "../utils/StringUtil";
import { ColorManager } from "../manager/ColorManager";
import { AssetsManager } from "../manager/AssetsManager";
import { EffectManager } from "../manager/EffectManager";
import { ModelGame } from "./ModelGame";
import { ModelOfficial } from "./ModelOfficial";
import { ModelClimb } from "./ModelClimb";
import { ModelArena } from "./ModelArena";

export class ModelChat extends ModelBase {

    public worldList: any[] = [];
    public guildList: any[] = [];
    public countryList: any[] = [];
    public sysList: any[] = [];
    public allList: any[] = [];
    public newMSG: any[] = [];
    public allChatData: any = null;
    public showList: any[] = [];
    public duplicateWorldList: any[] = [];
    public duplicateCountryList: any[] = [];
    public cur_channel: number = -1;
    public isNewBugMSG: boolean = false;
    public isNewMail: boolean = false;
    public mMailPanelOpening: boolean = false;
    public mTimeYard1: number = 0;
    public mTimeYard2: number = 0;
    public mTimeYard3: number = 0;
    public mTimeYard4: number = 0;
    public mTimeYard5: number = 0;
    public mTimeYard6: number = 0;
    public times_YardNew: any[] = [];
    public mFreezeUids: any = null;
    public mLocalChatData: any = null;

    constructor() {
        super();
        this.on("state_change", this, this._stateChanged);
    }

    public _stateChanged(t: any): void {
        if (this.isJoinDuplicate())
            if (t == "enter")
                this.sendDuplicateLocalMsg(Tools.getMsgById("_chat_tips10"), sg.duplicate.ModelDuplicate.instance.enterTime);
            else if (t == "finish") {
                var s = ConfigServer.getServerTimer();
                this.sendDuplicateLocalMsg(Tools.getMsgById("_chat_tips11"), s);
            }
    }

    public sendMSG(t: any): void {
        this.setAllList(t);
    }

    /** 服务器聊天批 + 本地档合并（按时间戳排全量回放） */
    public getChatCache(t: any): void {
        for (var s: any[] = [], n = 0; n < t.length; n++)
            for (var h = t[n], o = 0; o < h.length; o++)
                s.push([h[o], Tools.getTimeStamp(h[o][4])]);
        for (var r = this.getLocalCache(), a = 0; a < r.length; a++)
            s.push([r[a], r[a][4]]);
        (<any>s).sort(<any>MathUtil.sortByKey("1"), !0, !0);
        for (var l = 0; l < s.length; l++)
            this.acceptMSG(s[l][0]);
    }

    public acceptMSG(t: any): void {
        if (null == this.allChatData && (this.allChatData = []), this.allChatData.push(ObjectUtil.clone(t, true)), this.allChatData.length >= 200 && this.allChatData.shift(), 0 == t[1]) {
            var s = t[3][0];
            s = sg.manager.FilterManager.instance.wordBan(s),
                t[3][0] = s;
            var n = ObjectUtil.clone(t, true);
            t[3][0] = this.faceHandler(s),
                this.acceptMsgHandler(t, n);
        } else {
            if (-1 != t[1].indexOf("arena") && ModelGame.unlock(null, "arena").stop)
                return;
            this.acceptMsgHandler(t, t);
        }
    }

    /** 按频道分发 + newMSG 底部滚动条 5 条（按 channel_selected 过滤） */
    public acceptMsgHandler(t: any, i: any): void {
        if (0 == t[0]) {
            if (ModelGame.unlock(null, "chat_world").stop)
                return;
            this.setWorldList(t, 0 != t[1]);
        } else
            1 == t[0] ? this.setCountryList(t) : 2 == t[0] ? this.setGuildList(t) : 3 == t[0] ? this.setDuplicateList1(t, 0 != t[1]) : 4 == t[0] ? this.setDuplicateList2(t, 0 != t[1]) : -1 == t[0] && this.setShowList(t);
        var n = ModelChat.channel_seleted,
            h = 1 == n[0] && 0 == t[0] && 0 != t[1],
            o = 1 == n[1] && 0 == t[0] && 0 == t[1],
            r = 1 == n[2] && 1 == t[0],
            a = 1 == n[3] && 2 == t[0],
            l = 1 == n[4] && 3 == t[0],
            c = 1 == n[5] && 4 == t[0],
            u = -1 == t[0];
        if (h || o || r || a || l || c || u) {
            if (this.newMSG.length >= 5 && this.newMSG.shift(), 0 == i[1]) {
                var d = i[3][0];
                i[3][0] = this.faceHandler(d);
            }
            this.newMSG.push(i);
        }
        this.event("event_add_chat"),
            this.event("event_update_bottom");
    }

    public updateOutSideChat(): void {
        null == this.allChatData && (this.allChatData = []);
        for (var i: any[] = [], s = ModelChat.channel_seleted, n = this.allChatData.length - 1; n >= 0; n--) {
            var h = this.allChatData[n],
                o = 1 == s[0] && 0 == h[0] && 0 != h[1],
                r = 1 == s[1] && 0 == h[0] && 0 == h[1],
                a = 1 == s[2] && 1 == h[0],
                l = 1 == s[3] && 2 == h[0],
                c = 1 == s[4] && 3 == h[0],
                u = 1 == s[5] && 4 == h[0],
                d = -1 == h[0];
            if (o || r || a || l || c || u || d) {
                if (0 == h[1]) {
                    var _ = h[3][0];
                    _ = sg.manager.FilterManager.instance.wordBan(_),
                        _ = this.faceHandler(_),
                        h[3][0] = _;
                }
                if (i.push(h), i.length >= 5)
                    break;
            }
        }
        this.newMSG = [];
        for (var m = i.length - 1; m >= 0; m--)
            this.newMSG.push(i[m]);
        this.event("event_update_bottom");
    }

    /** 冻结用户消息清除（四列表倒序 splice + 事件 event_ferrze_do，原文拼写） */
    public freezeDoCallBack(t: any): void {
        null == this.mFreezeUids && (this.mFreezeUids = []),
            this.mFreezeUids.push(t);
        var s = 0;
        if (this.allChatData.length > 0) {
            for (s = this.allChatData.length - 1; s >= 0; s--)
                (0 == this.allChatData[s][1] && this.allChatData[s][3] ? this.allChatData[s][3][1][0] : 0) == t && this.allChatData.splice(s, 1);
            this.updateOutSideChat();
        }
        if (this.worldList.length > 0)
            for (s = this.worldList.length - 1; s >= 0; s--)
                (0 == this.worldList[s][1] && this.worldList[s][3] ? this.worldList[s][3][1][0] : 0) == t && this.worldList.splice(s, 1);
        if (this.countryList.length > 0)
            for (s = this.countryList.length - 1; s >= 0; s--)
                (0 == this.countryList[s][1] && this.countryList[s][3] ? this.countryList[s][3][1][0] : 0) == t && this.countryList.splice(s, 1);
        if (this.guildList.length > 0)
            for (s = this.guildList.length - 1; s >= 0; s--)
                (0 == this.guildList[s][1] && this.guildList[s][3] ? this.guildList[s][3][1][0] : 0) == t && this.guildList.splice(s, 1);
        this.event("event_ferrze_do");
    }

    /** {face} → <img>（cfg_face 尺寸表；i/s 覆盖宽高） */
    public faceHandler(t: any, i?: any, s?: any): any {
        if (void 0 === i && (i = 0), void 0 === s && (s = 0), 0 == this.isOpenFace())
            return t;
        var h = ModelChat.sFaceObj;
        for (var o in h) {
            var r = o,
                a = h[o],
                l = "{" + r + "}",
                c = URL.formatURL("face/" + r + ".png"),
                u = ConfigServer.system_simple.cfg_face ? ConfigServer.system_simple.cfg_face[a].size : [25, 25],
                d = i || u[0],
                _ = s || u[1];
            t = t.replace(new RegExp(l, "g"), "<img src='" + c + "' style='width:" + d + "px; height:" + _ + "px; padding:0px 2px 0px 2px'></img>");
        }
        return t;
    }

    /** /name/ → {faceId}（收费表情 2 需 ModelMemberCard.bought、3 需已持有） */
    public faceWrap(t: any): any {
        if (0 == this.isOpenFace())
            return t;
        for (var n in ModelChat.sFaceNameObj) {
            var h = ModelChat.sFaceNameObj[n];
            if ((!ModelChat.sFaceObj[h] || ModelChat.sFaceObj[h] + "" != "2" || 0 != sg.activities.model.ModelMemberCard.instance.bought) && (!ModelChat.sFaceObj[h] || ModelChat.sFaceObj[h] + "" != "3" || !ModelManager.instance.modelUser.records.face || -1 != ModelManager.instance.modelUser.records.face.indexOf(h))) {
                var o = "/" + n + "/",
                    r = "{" + h + "}";
                t = t.replace(new RegExp(o, "g"), r);
            }
        }
        return t;
    }

    public isOpenFace(): any {
        var t = ConfigServer.system_simple.cfg_face;
        return !!(t && Tools.getDictLength(t) > 0);
    }

    public setAllList(t: any): void {
        null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), this.allList.push(t));
    }

    public setGuildList(t: any): void {
        null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), this.guildList.push(t));
    }

    public setWorldList(t: any, i?: any): void {
        void 0 === i && (i = false),
            null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), i ? this.sysList.push(t) : this.worldList.push(t));
    }

    public setCountryList(t: any): void {
        null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), this.countryList.push(t));
    }

    public setDuplicateList1(t: any, i?: any): void {
        void 0 === i && (i = false),
            null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), i ? this.sysList.push(t) : this.duplicateWorldList.push(t));
    }

    public setDuplicateList2(t: any, i?: any): void {
        void 0 === i && (i = false),
            null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), i ? this.sysList.push(t) : this.duplicateCountryList.push(t));
    }

    public setShowList(t: any): void {
        null != t && (t.sort = typeof t[4] == "number" ? t[4] : Tools.getTimeStamp(t[4]), this.showList.push(t));
    }

    /** 系统消息模板装配（system_massage[t[1]][t[2]].info + 30+ 事件分支参数表） */
    public sysMessageWrap(t: any): any {
        var s = "",
            n = t[3],
            h = ConfigServer.system_simple.system_massage,
            o = t[3],
            r = "",
            a = "";
        if ("1" == t[1])
            return t[2];
        if (t[1] == "country_call")
            s = Tools.getMsgById("guild_pve", [ModelManager.instance.modelClub.getLvByIndex(t[2]) + "", t[3][0] + ""]);
        else {
            if (t[1] == "hero_star")
                n = [o[3], sg.model.ModelHero.getHeroName(o[0], o[2])];
            else if (t[1] == "hero_skill")
                n = [o[4], sg.model.ModelHero.getHeroName(o[0], o[3]), sg.model.ModelSkill.getSkillName(o[1]), o[2]];
            else if (t[1] == "look_star")
                n = [o[1], Tools.getMsgById(ConfigServer.star[o[0]].name)];
            else if (t[1] == "guild_atkcity")
                n = [r = "<span href='" + o[3] + "'>" + sg.model.ModelCityBuild.getCityName(o[3]) + "</span>", o[0], o[1], o[2]];
            else if (t[1] == "cityfight_def_victory" || t[1] == "cityfight_victory")
                r = "<span href='" + o[0] + "'>" + sg.model.ModelCityBuild.getCityName(o[0]) + "</span>",
                    t[1] == "cityfight_def_victory" ? a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[2]), ColorManager.getUIColor("COUNTRY_COLORS")[o[2]]) : t[1] == "cityfight_victory" && (a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[3]), ColorManager.getUIColor("COUNTRY_COLORS")[o[3]])),
                    n = [a, r];
            else if (t[1] == "guild_corps")
                r = "<span href='" + o[1] + "'>" + sg.model.ModelCityBuild.getCityName(o[1]) + "</span>",
                    n = [o[2], r];
            else if (t[1] == "limit_free") {
                var l = ModelManager.instance.modelProp.getRewardProp(o[0]);
                n = l[0] ? [o[1], sg.model.ModelItem.getItemName(l[0][0]) + "x" + l[0][1]] : [o[1], ""];
            } else {
                if (t[1] == "pk_user_first")
                    n = [a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[0]), ColorManager.getUIColor("COUNTRY_COLORS")[o[0]]), o[1]];
                else if (t[1] == "build_ballista")
                    n = [a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[0]), ColorManager.getUIColor("COUNTRY_COLORS")[o[0]]), ConfigServer.country_pvp.ballista[o[1]] ? Tools.getMsgById(ConfigServer.country_pvp.ballista[o[1]].name) : ""];
                else if (t[1] == "kill_ballista") {
                    a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[0]), ColorManager.getUIColor("COUNTRY_COLORS")[o[0]]);
                    var c = o[0] > 2 ? "" : ModelOfficial.getOfficerName(o[1], ModelOfficial.getInvade(o[0]), o[0]),
                        u = o[0] > 2 ? "" : o[2];
                    0 == u.indexOf("$") && (u = Tools.getMsgById(u.substr(1, u.length - 1))),
                        n = [a, c, u, StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[3]), ColorManager.getUIColor("COUNTRY_COLORS")[o[3]]), Tools.getMsgById(ConfigServer.country_pvp.ballista[o[4]].name)];
                } else if (t[1] == "pk_yard")
                    "6" == t[2] && (n = [o[1]]);
                else if (t[1] == "auction_end") {
                    if (n = o, "3" == t[2]) {
                        var d = o[1].awaken[0],
                            _ = ModelManager.instance.modelGame.getModelHero(d),
                            m = Tools.getMsgById(_.name),
                            g = Tools.getMsgById("550029", [m]);
                        n = [n[0], g];
                    }
                } else if (t[1] == "equip_box")
                    if (o[1] && o[1].equip) {
                        var f = o[1].equip;
                        n = [o[0], sg.model.ModelEquip.getName(f[0], 0)];
                    } else
                        n = ["", ""];
                else if (t[1] == "equip_enhance") {
                    var p = sg.model.ModelEquip.getName(o[0], 0),
                        v = o[2];
                    s = StringUtil.substituteWithColor(p, ColorManager.getUIColor("FONT_COLORS")[v], ColorManager.getUIColor("FONT_COLORS")[v]),
                        n = [o[3], s, o[1]];
                } else if (t[1] == "arena_newmaster")
                    n = [a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[0]), ColorManager.getUIColor("COUNTRY_COLORS")[o[0]]), o[1], Tools.getMsgById(ModelArena.textArr[o[2]])];
                else if (t[1] == "arena_winner")
                    n = [a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[2]), ColorManager.getUIColor("COUNTRY_COLORS")[o[2]]), o[1], Tools.getMsgById(ModelArena.textArr[o[0]])];
                else if (t[1] == "arena_kill")
                    a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[1]), ColorManager.getUIColor("COUNTRY_COLORS")[o[1]]),
                        n = [Tools.getMsgById(ModelArena.textArr[o[0]]), a, o[2]];
                else if (t[1] == "duplicate_fight_victory") {
                    var y = o[0] + "",
                        b = "floor_" + y,
                        I = sg.fight.logic.utils.FightDuplicateUtils.getFloorName(y, 2);
                    I = StringUtil.htmlFontColor(I, ColorManager.getUIColor("FONT_COLOR_FLOOR")),
                        n = [y = "<span href='" + b + "'>" + I + "</span>", a = StringUtil.htmlFontColor(Tools.getMsgById("country_" + o[1]), ColorManager.getUIColor("COUNTRY_COLORS")[o[1]])];
                } else if (t[1] == "big_shot") {
                    var x = "",
                        w = n[2];
                    if (w)
                        for (var C = 0; C < w.length; C++)
                            x += sg.model.ModelItem.getItemName(w[C]),
                                x += C == w.length - 1 ? "" : ",";
                    n = [o[0], o[1], x];
                } else if (t[1] == "heritage_git" || t[1] == "heritage_up") {
                    var k = sg.heritage.ModelHeritage.instance.getHeritageById(o[2]),
                        T = StringUtil.htmlFontColor(k.name, ColorManager.getUIColor("FONT_COLORS")[4]);
                    n = [StringUtil.htmlFontColor(o[1], ColorManager.getUIColor("COUNTRY_COLORS")[o[0]]), "<span href='heritage_git'>" + T + "</span>"];
                }
            }
            var M = h[t[1]] ? h[t[1]][t[2]] : null;
            M && (s = Tools.getMsgById(M.info, n));
        }
        return s;
    }

    public userMessageWrap(t: any): any {
        var s = t[3][0],
            n = t[1],
            h = t[2];
        if (0 == n && 0 != h)
            switch (h) {
                case "fightLog":
                case "homeLand":
                    s = "<span href = '" + h + "'>" + s + "</span>";
            }
        return s;
    }

    public sendLocalMessage(t: any): void {
        this.acceptMSG(t);
    }

    public sendLocalTxt(t: any, i?: any): void {
        void 0 === i && (i = 0),
            this.acceptMSG([i, "1", t, null, ConfigServer.getServerTimer()]);
    }

    /** 旧版演武场本地赛程（mTimeYard1-6；赛程尾 n[6] 硬编码，原文如此） */
    public initLocalMsgTime(): void {
        if (1 != ModelManager.instance.modelUser.getUseFunctionByKey("use_pk_yard_new")) {
            this.mTimeYard1 = this.mTimeYard2 = this.mTimeYard3 = this.mTimeYard4 = this.mTimeYard5 = this.mTimeYard6 = 0;
            var i = ConfigServer.system_simple.system_massage.pk_yard,
                s = ConfigServer.getServerTimer();
            if (i && ModelClimb.isChampionStartSeason()) {
                for (var n = ConfigServer.pk_yard.combat_time, h = ModelClimb.getChampionStartTimer(), o = n.length - 1, r = 0, a = 0, l = 0, c = 0, u = 0; u < o; u++)
                    for (var d = 0; d < n[u].length; d++)
                        r += n[u][d] * Tools.oneMinuteMilli;
                a = h + r,
                    r += n[6][0] * Tools.oneMinuteMilli,
                    l = h + (r += n[6][1] * Tools.oneMinuteMilli),
                    c = h + (r += n[6][2] * Tools.oneMinuteMilli) + 3e4;
            }
            if (i) {
                var _ = ModelManager.instance.modelUser.getGameSeason();
                for (var m in i) {
                    if ("1" == m || "2" == m) {
                        var g = i[m].need;
                        g[0] == _ && (this["mTimeYard" + m] = Tools.getToDayHourMill(g[1]));
                    }
                    switch (m) {
                        case "3":
                            this["mTimeYard" + m] = s - 10 * Tools.oneMinuteMilli > h ? 0 : h;
                            break;
                        case "4":
                            this["mTimeYard" + m] = s - 10 * Tools.oneMinuteMilli > a ? 0 : a;
                            break;
                        case "5":
                            this["mTimeYard" + m] = s - 10 * Tools.oneMinuteMilli > l ? 0 : l;
                            break;
                        case "6":
                            this["mTimeYard" + m] = s - 10 * Tools.oneMinuteMilli > c ? 0 : c;
                    }
                }
            }
        }
    }

    /** 新版演武场本地消息（mConfig.time/circle/timenext 推档） */
    public initPKYardNewLocalMsgTime(): void {
        if (0 != ModelManager.instance.modelUser.getUseFunctionByKey("use_pk_yard_new")) {
            this.times_YardNew = [];
            var i = ConfigServer.system_simple.system_massage.pk_yard_new,
                s = ConfigServer.getServerTimer(),
                n = ModelManager.instance.modelUser.getGameSeason(),
                h = ModelManager.instance.modelChampionNew.mConfig;
            if (i)
                for (var o = ObjectUtil.keys(i), r = 0; r < o.length; r++) {
                    var a = parseInt(o[r]),
                        l = i[a],
                        c = -1,
                        u = "";
                    if (l.need)
                        n == l.need[0] && (c = Tools.getTodayMillWithHourAndMinute(l.need[1]), u = l.info);
                    else {
                        var d: any[] = [];
                        if (4 == a || 7 == a)
                            n == (d = h.time[4 == a ? 1 : 2])[0] && (c = Tools.getTodayMillWithHourAndMinute(d[1]), u = l.info);
                        else if ((5 == a || 8 == a) && n == (d = h.time[5 == a ? 1 : 2])[0]) {
                            var _ = (5 == a ? h.circle : 5) * h.timenext * 1e3;
                            c = Tools.getTodayMillWithHourAndMinute(d[1] + _),
                                u = l.info;
                        }
                    }
                    -1 != (c = s - 10 * Tools.oneMinuteMilli > c ? -1 : c) && this.times_YardNew.push([c, u, a]);
                }
        }
    }

    /** 到点播报（6 档拉 get_champion_user；新版逐条 shift） */
    public checkLoacalMessage(): void {
        for (var i = ConfigServer.getServerTimer(), s = 1; s <= 6; s++) {
            var n = this["mTimeYard" + s];
            0 != n && i > n && (this["mTimeYard" + s] = 0, 6 == s ? NetSocket.instance.send("get_champion_user", {}, new Handler(this, function (e: any) {
                var s = e.receiveData;
                ModelManager.instance.modelChat.sendLocalMessage([0, "pk_yard", "6", s || ["", ""], n]);
            })) : this.sendLocalMessage([0, "pk_yard", s + "", null, n]));
        }
        for (var h = this.times_YardNew.length, o = 0; o < h; o++) {
            var r = this.times_YardNew[o];
            if (0 != r[0] && i >= r[0]) {
                this.sendLocalMessage([0, "pk_yard_new", r[2], r[1], r[0]]),
                    this.times_YardNew.shift();
                break;
            }
        }
    }

    /** 10 分钟内到点的旧档消息回收（供 getChatCache 合并） */
    public getLocalCache(): any {
        for (var i: any[] = [], s = ConfigServer.getServerTimer(), n = 10 * Tools.oneMinuteMilli, h = 1; h <= 6; h++) {
            var o = this["mTimeYard" + h];
            if (0 != o && s > o && (this["mTimeYard" + h] = 0, s - o < n)) {
                var r = ModelManager.instance.modelUser.champion_user;
                6 == h ? i.push([0, "pk_yard", h + "", r || ["", ""], o]) : i.push([0, "pk_yard", h + "", null, o]);
            }
        }
        return i;
    }

    /** 冻结用户私聊内容打星（本地档全量脱敏后回写） */
    public checkFreeze(t: any): void {
        var s = this;
        NetSocket.instance.send("get_user_freeze", { uid_list: t }, new Handler(this, function (e: any) {
            var n = e.receiveData;
            if (n.length > 0) {
                for (var h = s.getPersonChatArr(), o: any = {}, r = 0; r < h.length; r++) {
                    var a = Number(h[r].uid);
                    if (-1 != n.indexOf(a)) {
                        for (var l = h[r].content, c = 0; c < l.length; c++)
                            if (0 == l[c].me) {
                                var u = l[c].text;
                                l[c].text = u.replace(/./g, "*");
                            }
                        0 == h[r].last && (h[r].text = h[r].text.replace(/./g, "*"));
                    }
                    o[a] = h[r];
                }
                SaveLocal.save(ModelManager.instance.modelChat.personalChatLocalKey, o, true),
                    ModelManager.instance.modelChat.event("event_freeze_call_back");
            }
        }));
    }

    /** 表情分组（3 组按已购 face 记录过滤） */
    public getFaceData(): any {
        var i: any[] = [],
            s = ConfigServer.system_simple.cfg_face;
        for (var n in s)
            if (s[n].ids && s[n].ids.length > 0) {
                var h: any = {};
                if (h.index = Number(n), h.name = s[n].name, "3" == n) {
                    var o = ModelManager.instance.modelUser.records.face,
                        r: any[] = [];
                    if (o)
                        for (var a = 0; a < o.length; a++)
                            -1 != s[n].ids.indexOf(o[a]) && r.push(o[a]);
                    h.ids = r;
                } else
                    h.ids = s[n].ids;
                h.ids.length > 0 && i.push(h);
            }
        return sg.map.utils.ArrayUtils.sortOn(["index"], i, false),
            i;
    }

    /** 发言前置检查（0 拒/1 免费/2 收费；世界禁言、金币不足、市长频道门槛） */
    public checkSend(): any {
        if (ModelGame.unlock(null, "chat_limit", true).stop)
            return 0;
        var i = this.costCoinNum();
        if (0 != i && !Tools.isCanBuy("coin", i))
            return 0;
        if (2 == ModelManager.instance.modelChat.cur_channel) {
            if (!ModelOfficial.isMayorOrOfficer(ModelManager.instance.modelUser.mUID))
                return ViewManager.instance.showTipsTxt(Tools.getMsgById("_chat_tips08")), 0;
        } else if (0 == ModelManager.instance.modelChat.cur_channel && ModelGame.unlock(null, "chat_world", true).stop)
            return 0;
        return 0 != i ? 2 : 1;
    }

    public costCoinNum(t?: any): any {
        void 0 === t && (t = -1),
            -1 == t && (t = ModelManager.instance.modelChat.cur_channel);
        var s = 0;
        if (ConfigApp.testFightType)
            return 0;
        if (0 == t) {
            var n = ConfigServer.system_simple.worldtalk_spend,
                h = ModelManager.instance.modelUser.records.chat[t + ""],
                o = Tools.isNewDay(h.time) ? 0 : h.num;
            s = n[o > n.length - 1 ? o = n.length - 1 : o];
        } else if (3 == t) {
            var r = ConfigServer.duplicate;
            if (r)
                s = r.shout[1][1];
        }
        return s;
    }

    /** -1 全免费/0 无免费/n 免费次数 */
    public freeTotalTimes(t?: any): any {
        void 0 === t && (t = -1);
        var s = 0;
        if (-1 == t && (t = ModelManager.instance.modelChat.cur_channel), 0 == t) {
            var n = ConfigServer.system_simple.worldtalk_spend;
            if (1 == n.length && 0 == n[0])
                return -1;
            for (var h = 0; h < n.length && 0 == n[h]; h++)
                s += 1;
            return s;
        }
        if (3 == t) {
            var o = ConfigServer.duplicate.shout;
            if (o[1])
                return 0 == o[1][1] ? -1 : o[1][0];
        }
        return -1;
    }

    public freeUesdTimes(t?: any): any {
        if (void 0 === t && (t = -1), ConfigApp.testFightType)
            return 0;
        var s;
        if (-1 == t && (t = ModelManager.instance.modelChat.cur_channel), t < 3)
            s = ModelManager.instance.modelUser.records.chat[t + ""];
        else {
            if (!sg.crossService.model.CrossServiceUserModel.instance.userData.chat_records)
                return 0;
            s = sg.crossService.model.CrossServiceUserModel.instance.userData.chat_records[t + ""];
        }
        return null == s || Tools.isNewDay(s.time) ? 0 : s.num;
    }

    public sendDuplicateChat(t: any, i: any): void {
        var n: any = {};
        n.icon = i,
            n.type = 0,
            n.key = 0,
            n.msg = t,
            sg.crossService.CrossServiceFacade.instance.socket.send("d.chat", n, new Handler(this, function (t: any) { }));
    }

    public isOpenDuplicateShout(): boolean {
        var i = ConfigServer.duplicate;
        return !(!i || !i.shout || 1 != i.shout[0]);
    }

    public hasDuplicate(): boolean {
        var i = false;
        return ConfigServer.duplicate && ConfigServer.duplicate.switch && (i = 1 == ConfigServer.duplicate.switch),
            i;
    }

    public isJoinDuplicate(): any {
        return !!sg.duplicate.ModelDuplicate.instance.registered && sg.duplicate.ModelDuplicate.instance.registered;
    }

    public duplicateChatData(): any {
        return null;
    }

    public sendDuplicateLocalMsg(t: any, i: any): void {
        var n: any = {};
        n.msg = t,
            n.time = i,
            this.acceptMSG([-1, "1", n.msg, "", n.time]);
    }

    /** 私聊本地档写入（100 条滚动；l=自己消息不落 read 标记） */
    public setChatData(t: any): void {
        if (0 != t.length) {
            for (var s = this.mLocalChatData ? this.mLocalChatData : SaveLocal.getValue(this.personalChatLocalKey, true), n = 0; n < t.length; n++) {
                var h = t[n],
                    o = h[0],
                    r = h[1],
                    a = typeof h[2] == "number" ? h[2] : Tools.getTimeStamp(h[2]),
                    l = 4 == h.length && h[3];
                if (0 == l && ModelManager.instance.modelUser.checkBanUserByID(o.uid))
                    Trace.log("黑名单中的uid的私聊消息: ", o.uid);
                else {
                    0 == l && (o.read = false);
                    var c,
                        u: any = { text: r, time: a, me: l, uid: o.uid };
                    if (s && s.hasOwnProperty(o.uid + "")) {
                        var d = (c = s[o.uid]).content;
                        d.push(u),
                            d.length > 100 && d.shift();
                    } else
                        s || (s = {}),
                            (c = <any>{})["content"] = "" == r ? [] : [u],
                            s[o.uid + ""] = c;
                    c.data = o,
                        c.text = r,
                        c.time = a,
                        c.uid = o.uid + "",
                        c.last = l;
                }
            }
            SaveLocal.save(ModelManager.instance.modelChat.personalChatLocalKey, s, true),
                this.mLocalChatData = s;
        }
    }

    public getPersonChatArr(): any {
        var i = this.mLocalChatData ? this.mLocalChatData : SaveLocal.getValue(ModelManager.instance.modelChat.personalChatLocalKey, true);
        if (this.mLocalChatData = i, null == i)
            return [];
        var s: any[] = [];
        for (var n in i) {
            var h = i[n];
            s.push(h);
        }
        return s.sort(<any>MathUtil.sortByKey("time", !0, !1)),
            s;
    }

    public getChatDataById(t: any): any {
        var s = this.mLocalChatData ? this.mLocalChatData : SaveLocal.getValue(ModelManager.instance.modelChat.personalChatLocalKey, true);
        return this.mLocalChatData = s,
            s && s.hasOwnProperty(t) ? s[t] : null;
    }

    public removeChatDataById(t: any): void {
        var s = this.mLocalChatData ? this.mLocalChatData : SaveLocal.getValue(ModelManager.instance.modelChat.personalChatLocalKey, true);
        for (var n in s)
            if (n == t) {
                delete s[n];
                break;
            }
        SaveLocal.save(ModelManager.instance.modelChat.personalChatLocalKey, s, true);
    }

    public setChatReadStatus(t: any, i?: any): void {
        void 0 === i && (i = true);
        var n = this.mLocalChatData ? this.mLocalChatData : SaveLocal.getValue(ModelManager.instance.modelChat.personalChatLocalKey, true);
        this.mLocalChatData = n,
            n && n.hasOwnProperty(t) ? this.mLocalChatData[t].data.read != i && (this.mLocalChatData[t].data.read = i, SaveLocal.save(ModelManager.instance.modelChat.personalChatLocalKey, this.mLocalChatData, true)) : Trace.log("错误的uid");
    }

    public sendSocketFindUser(t: any, i: any): void {
        var n = this;
        NetSocket.instance.send("find_user", { uname: t }, Handler.create(this, function (e: any) {
            var h = e.receiveData;
            if (typeof e.receiveData != "boolean" || e.receiveData) {
                var o: any = { receiveData: { uid: h.uid, uname: h.uname, country: h.country, head: h.head, lv: h.lv } };
                n.sendSocketGetMsg(o, n.findUerCallBack, o),
                    ViewManager.instance.closePanel(i);
            } else
                ViewManager.instance.showTipsTxt(Tools.getMsgById("_public266"));
        }));
    }

    public findUerCallBack(t: any): void {
        if (typeof t.receiveData != "boolean" || t.receiveData) {
            var s = ModelManager.instance.modelChat.getChatDataById(t.receiveData.uid);
            if (!s) {
                ModelManager.instance.modelUser;
                var n: any[] = [],
                    h = [t.receiveData, "", ConfigServer.getServerTimer(), true];
                n.push(h),
                    this.setChatData(n),
                    s = ModelManager.instance.modelChat.getChatDataById(t.receiveData.uid);
            }
            this.event("event_add_personl_chat", t.receiveData.uid),
                ConfigApp.isLandscape ? this.mMailPanelOpening || ViewManager.instance.showView(ConfigClass.VIEW_MAIL_MAIN, { uid: t.receiveData.uid }) : ViewManager.instance.showView(ConfigClass.VIEW_MAIL_PERSONAL, { uid: t.receiveData.uid, formType: t.receiveData.panelType });
        } else
            ViewManager.instance.showTipsTxt(Tools.getMsgById("_public266"));
    }

    /** 拉全量邮件（find 回调或 Handler 适配两种续接） */
    public sendSocketGetMsg(t?: any, i?: any, s?: any): void {
        var h = this;
        NetSocket.instance.send("get_msg", {}, Handler.create(this, function (e: any) {
            if (ModelManager.instance.modelUser.updateData(e.receiveData), t)
                h.findUerCallBack(t);
            else if (i)
                if (i instanceof laya.utils.Handler)
                    i.run();
                else {
                    var r = Handler.create(null, i, s);
                    r && r.run();
                }
        }));
    }

    /** 封地分享到聊天（37 系平台 pf_data 附加，同 ModelOfficial.modifyCountryNotice） */
    public sendMsgHomeLand(t: any, i: any): void {
        var n = ModelManager.instance.modelChat.cur_channel;
        (n < 0 || n >= 3) && (n = 0);
        var h: any = {};
        if (h.icon = n, h.type = 0, h.key = "homeLand", h.msg = t, ConfigApp.releaseWeiXin())
            switch (ConfigApp.pf) {
                case MiniAdpter.window.game37_fs_pf:
                    h.pf_data = { pid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].pid };
                    break;
                case MiniAdpter.window.game37_pf:
                    h.pf_data = Platform.get37SendData();
            }
        else
            ConfigApp.pf == "cb_h5_37_cn" || ConfigApp.pf == "cb_ad_37_cn" || ConfigApp.pf == "cb_ios_37_cn" ? h.pf_data = Platform.pf_login_data : (ConfigApp.pf == "fs_ad_37" || ConfigApp.pf == "fs_h5_37") && (h.pf_data = { pid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].pid, gid: ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].gid });
        NetSocket.instance.send("chat", h, new Handler(null, function (e: any) {
            e.receiveData.methodName = "chat",
                ModelManager.instance.modelUser.updateData(e.receiveData),
                ModelManager.instance.modelChat.acceptMSG(e.receiveData.chat);
        }));
    }

    /** 副本进行中（ModelDuplicate.active） */
    public get duplicateActive(): any {
        return sg.duplicate.ModelDuplicate.instance.active;
    }

    /** 私聊本地档 key（HelpConfig.type_app + mUID） */
    public get personalChatLocalKey(): any {
        return "local_save_key_chat_" + sg.cfg.HelpConfig.type_app + "_" + ModelManager.instance.modelUser.mUID;
    }

    public static initFaceObj(): void {
        ModelChat.sFaceObj = {};
        var i = ConfigServer.system_simple.cfg_face;
        if (i) {
            var n: any = {};
            for (var h in i)
                for (var o = 0; o < i[h].ids.length; o++)
                    n[i[h].ids[o]] = h;
            ModelChat.sFaceObj = n;
        }
    }

    public static getFaceName(t: any): any {
        var n = "";
        return ModelChat.sFaceIdObj || (ModelChat.sFaceIdObj = {}),
            ModelChat.sFaceIdObj[t] ? n = ModelChat.sFaceIdObj[t] : (n = Tools.getMsgById("face_" + t), ModelChat.sFaceIdObj[t] = n),
            n;
    }

    public static initFaceNameObj(): void {
        var i = ModelChat.sFaceObj;
        for (var n in (ModelChat.sFaceNameObj || (ModelChat.sFaceNameObj = {})), i) {
            var h = n,
                o = Tools.getMsgById("face_" + n);
            ModelChat.sFaceNameObj[o] = h;
        }
    }

    /** 频道按钮态（label/skin；JP 渠道世界频道降级隐藏） */
    public static setChannelBtn(t: any, i: any): void {
        var n = i[0],
            h = 0 == n && 0 == i[1];
        -1 == n && (n = 0),
            t.label = 0 != n && 3 != n && 4 != n || 0 == i[1] ? ModelChat.channel_arr[n] : Tools.getMsgById("_chat_text18");
        var o = n;
        (3 == n || 4 == n) && 0 != i[1] && (o = 0),
            h && (-1 == ["h5_37_jp", "h5_37_jp1", "ad_37_jp", "ios_37_jp"].indexOf(ConfigApp.pf) && (h = false));
        t.skin = h ? AssetsManager.getAssetsUI("img_icon_45.png") : ModelChat.channel_skin[o],
            Tools.textFitFontSize(t);
    }

    public static preInput(t: any, i?: any, s?: any, n?: any): void {
        void 0 === i && (i = -1),
            ConfigApp.isLandscape ? ModelManager.instance.modelGame.event("event_show_chat", { data: s, str: t, channel: i, share: n }) : ViewManager.instance.showView(ConfigClass.VIEW_CHAT_MAIN, [t, i]);
    }

    public static shareFightLog(t: any, i: any, n?: any, h?: any): void {
        void 0 === n && (n = ""),
            void 0 === h && (h = "");
        var r = Tools.getMsgById("war_report_info20"),
            a: any = { share_type: "fight_log", cid: t, fight_id: i, battle_id: h };
        ModelChat.preInput(r, -1, { key: "fightLog", cityId: t, fight_id: i, uid: n, battle_id: h }, a);
    }

    public static shareHomeLand(): void {
        var i = Tools.getMsgById("homeland_text_32"),
            n: any = { key: "homeLand", uid: ModelManager.instance.modelUser.mUID };
        ConfigApp.isLandscape ? ModelChat.preInput(i, -1, n) : ModelManager.instance.modelChat.sendMsgHomeLand(i, n);
    }

    /** 聊天链接跳转总分发（city/floor/heritage/活动面板） */
    public static clickChatGoto(t: any, i: any): void {
        sg.fight.FightMain.inFight && sg.fight.FightMain.instance.exit();
        var n = i[3] ? i[3][1] : null,
            h = true;
        if (t == "country_call")
            0 != ModelManager.instance.modelClub.alien[i[2]].team[0].troop.length ? ViewManager.instance.showView(["ViewAlienTroopInfo", sg.view.country.ViewAlienTroopInfo], i[2]) : ViewManager.instance.showTipsTxt(Tools.getMsgById("country_alien22"));
        else if (t == "look_star")
            sg.boundFor.GotoManager.boundFor({ type: 2, buildingID: "building006", state: 1 });
        else if (t == "limit_free")
            sg.boundFor.GotoManager.showView(ConfigClass.VIEW_FREE_BILL);
        else if (t == "pvp_pk")
            sg.boundFor.GotoManager.boundForPanel("pk");
        else if (t == "pk_yard")
            sg.boundFor.GotoManager.boundForPanel("pk_yard");
        else if (t == "pay_rank")
            sg.activities.model.ModelPayRank.instance.active && !sg.activities.model.ModelPayRank.instance.notStart && sg.boundFor.GotoManager.boundForPanel("pay_rank");
        else if (t == "equip_box")
            sg.activities.model.ModelEquipBox.instance.active && sg.boundFor.GotoManager.boundForPanel("equip_box");
        else if (t == "arena")
            ModelArena.instance.isCanEnterInto() && sg.boundFor.GotoManager.boundForPanel("arena");
        else if (t == "festival_ask")
            sg.festival.model.ModelFestival.instance.modelFestivalAsk.showViewByTime();
        else if (t == "homeLand")
            sg.homeland.view.HomelandUser.view_homeland(n[0]);
        else if (t == "god_sale")
            sg.kunlun.model.ModelKunlunSale.instance.send_GetGodSale();
        else if (t == "fightLog") {
            var o = i[3][2];
            h = false;
            var r = n[0],
                a = n[1],
                l = n[2],
                c = o.cid,
                u = o.fight_id,
                d = o.battle_id;
            sg.model.ModelFightLog_H.instance.playbackShareLog(a, l, c, u, r, d, i);
        } else if (t == "exorcism")
            sg.kunlun.model.ModelExorcism.instance.showExorcismView();
        else if (t == "heritage_git" || t == "heritage_up") {
            var _ = t == "heritage_git" ? 1 : 2,
                m = sg.heritage.ModelHeritage.instance.getHeritageById(i[3][2]);
            ViewManager.instance.showView(ConfigClass.VIEW_HERITAGE_INFO, [m, 2, _]);
        } else if (" " != t)
            if (ConfigServer.city[t])
                sg.boundFor.GotoManager.boundFor({ type: 1, cityID: t });
            else {
                var g = t.split("_");
                g[0] == "floor" && sg.boundFor.GotoManager.boundFor({ type: 4, cityID: g[1] });
            }
        h && ConfigApp.isLandscape && ModelManager.instance.modelChat.event("event_close_chat");
    }

    /** 聊天气泡背景（glow 动画 or 图；首次记录原 skin） */
    public static setChatBg(t: any, i: any): void {
        if ("" == ModelChat.sOriginalChatBgSkin && (ModelChat.sOriginalChatBgSkin = t.skin), "" == i)
            t.skin = ModelChat.sOriginalChatBgSkin,
                t.destroyChildren();
        else {
            var h = false,
                o = ModelChat.getChatBgUrlById(i);
            if (-1 != o.indexOf("glow") && (h = true), h) {
                if (t.skin = "", !t.getChildByName(o)) {
                    var r = EffectManager.loadAnimation(o);
                    r.name = o,
                        t.addChild(r),
                        r.x = t.width / 2,
                        r.y = t.height / 2;
                }
            } else
                t.skin = AssetsManager.getAssetLater(o),
                    t.destroyChildren();
        }
    }

    public static getChatBgUrlById(t: any): any {
        return ({ 1: "bar_11_3_1.png", 2: "glow000", 3: "bar_11_3.png" } as any)[t];
    }

    public static EVENT_ADD_CHAT: string = "event_add_chat";
    public static EVENT_UPDATE_CHANNEL: string = "event_update_channel";
    public static EVENT_UPDATE_BOTTOM: string = "event_update_bottom";
    public static EVENT_ADD_FACE: string = "event_add_face";
    public static EVENT_CLOSE_FACE: string = "event_close_face";
    public static EVENT_FREEZE_DO: string = "event_ferrze_do";
    public static EVENT_CLOSE_CHAT: string = "event_close_chat";
    public static EVENT_ADD_PERSONL_CHAT: string = "event_add_personl_chat";
    public static EVENT_SEND_PERSONL_CHAT: string = "event_send_personl_chat";
    public static mCurUid: string = "";
    public static EVENT_FREEZE_CALL_BACK: string = "event_freeze_call_back";
    public static sFaceObj: any = null;
    public static sFaceIdObj: any = null;
    public static sFaceNameObj: any = null;
    public static sOriginalChatBgSkin: string = "";

    /**
     * 原文 h(s,["channel_skin",fn,"channel_arr",fn,"channel_seleted",fn]) —— 一次
     * Laya.static 挂 3 个惰性静态（静态 getter + defineProperty 换写，ViewScenes 同款）。
     */
    public static get channel_skin(): any[] {
        var v = ["ui/img_icon_41.png", "ui/img_icon_40.png", "ui/img_icon_39.png", "ui/img_icon_43.png", "ui/img_icon_43.png"];
        Object.defineProperty(ModelChat, "channel_skin", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get channel_arr(): any[] {
        var v = [Tools.getMsgById("_chat_text03"), Tools.getMsgById("_chat_text04"), Tools.getMsgById("_country75"), Tools.getMsgById("_chat_text19"), Tools.getMsgById("_chat_text19")];
        Object.defineProperty(ModelChat, "channel_arr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get channel_seleted(): any[] {
        var v = [1, 1, 1, 1, 1, 1];
        Object.defineProperty(ModelChat, "channel_seleted", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,e(...),"sg.model.ModelChat",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelChat, "sg.model.ModelChat", null, null);
