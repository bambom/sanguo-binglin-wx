/**
 * sg.model.ModelAlert —— ViewManager.showAlert/showWarn 的弹窗数据载体 + 全局红点中心。
 *
 * 原文：code1.js 字节 [1852033,1860428]（包装变量 Ro，基类 Ns=sg.model.ModelBase，
 * 池化注册名 n(1565)="sg.model.ModelAlert"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ModelAlert.js
 *
 * 依赖：ue=ModelManager、Gt=ConfigServer、Rt=ConfigApp、vs=Tools（批次 B 模块直引）；
 * ModelBase（批次 A）；P=laya.utils.Handler（引擎）。
 * 批次外（全局注册路径）：_r=sg.model.ModelHero、lr=sg.model.ModelGame、Qo=sg.model.ModelClimb、Yo=sg.model.ModelChampion、
 * ao=sg.model.ModelTreasureHunting、to=sg.model.ModelLegend、qr=sg.model.ModelTomb、zr=sg.model.ModelSPArmy、Wr=sg.model.ModelSoul、
 * Tr=sg.model.ModelOffice、Z4=sg.view.init.ViewAffiche、ll=sg.model.ModelTaskCountry、Sr=sg.model.ModelOfficial、
 * xr=sg.model.ModelNewMilepost、Gh=sg.model.ModelHappy、Yr/cl/ml/al/dl/_l=sg.model.ModelTask 系列。
 * 原文多处经 sg.model.ModelAlert.xxx(...) 全局路径自引（red_happy_all/by_key、
 * red_country_all/check），TS 化后统一改类直引（batch-a-report §6.4 同规则）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigApp } from "../cfg/ConfigApp";
import { Tools } from "../utils/Tools";

export class ModelAlert extends ModelBase {

    public text: string = "";
    public cost_arr: any[] = [];
    public text2: string = "";
    public only: boolean = false;
    public force_btn: boolean = false;
    public isWarn: boolean = false;
    public fun: any = null;
    public repeat_key: string = "";

    constructor() {
        super();
    }

    /** 回调分发：Handler 直接 runWith，裸函数包一层 Handler 再 runWith */
    public execute(t: any): void {
        if (this.fun)
            if (this.fun instanceof Handler) this.fun.runWith(t);
            else {
                var s = Handler.create(this, this.fun, [t]);
                s && s.runWith(t);
            }
    }

    /** 武将页总红点：新武将特性开启时 1..14，否则 1..13 */
    public static red_hero_all(): boolean {
        var t: any[] = sg.model.ModelHero.isShowNewHeroFeature() ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (var n = 0, h = t.length; n < h; n++)
            if (ModelAlert.red_hero_once(t[n], t, null, true)) return true;
        return false;
    }

    public static red_hero_once(t: any, i: any[], n: any, h?: boolean): boolean {
        void 0 === h && (h = false);
        var r: any, a = 0, l = 0;
        if (n) {
            if (i) {
                for (a = i.length, l = 0; l < a; l++)
                    if (ModelAlert.red_hero_check(i[l], n, h)) return true;
                return false;
            }
            return ModelAlert.red_hero_check(t, n, h);
        }
        for (var c in 1 == t ? ConfigServer.hero : ModelManager.instance.modelUser.hero)
            if (r = ModelManager.instance.modelGame.getModelHero(c), i) {
                for (a = i.length, l = 0; l < a; l++)
                    if (ModelAlert.red_hero_check(i[l], r, h)) return true;
            } else if (ModelAlert.red_hero_check(t, r, h)) return true;
        return false;
    }

    /**
     * 单武将红点分支：1 可领招募、2 装备、3/4 技能(主动/被动)、5 缘分、6 符文、
     * 7 副将、8 编队、9 皮肤、10 SP 军团、11 战魂、12 升级、13 升星、14 上军。
     * s=true（全部入口）时低练度武将（低于最佳武将 hero_tip_level 比例）不亮。
     */
    public static red_hero_check(t: any, i: any, s?: boolean): boolean {
        void 0 === s && (s = false);
        var h = false;
        if (i.isOpenState) {
            if (s && i.isMine()) {
                var o = ConfigServer.system_simple.hero_tip_level;
                if (o) {
                    var r = i.getLv(),
                        a = "" != sg.model.ModelHero.sBestHid ? ModelManager.instance.modelGame.getModelHero(sg.model.ModelHero.sBestHid).getLv() : 0;
                    if (0 != a && r / a < o) return false;
                }
            }
            if (t > 1 && 0 == i.isMine()) return false;
            switch (t) {
                case 1:
                    if (!i.isMine() && i.isReadyGetMine()) { h = true; break }
                    break;
                case 2: h = i.checkEquipWill(); break;
                case 3: h = i.checkSkillWill(false); break;
                case 4: h = i.checkSkillWill(true); break;
                case 5: 0 == sg.model.ModelHero.isShowHeroCounter() && (h = i.checkFateWillOpen()); break;
                case 6: h = i.checkRuneWill(); break;
                case 7: h = i.checkAdjutantCanInstallByType(0) || i.checkAdjutantCanInstallByType(1); break;
                case 8: h = i.checkFormationRed(2); break;
                case 9: h = 0 == sg.model.ModelGame.unlock(null, "hero_skin").stop && i.hasNewSkin(); break;
                case 10: h = sg.model.ModelSPArmy.redPoint(i.id); break;
                case 11: h = sg.model.ModelSoul.redPoint(i.id); break;
                case 12: h = i.canLvUp(); break;
                case 13: h = i.canStarUp(); break;
                case 14: h = i.canArmyUp();
            }
        }
        return h;
    }

    public static red_pve_pvp_all(): boolean {
        var i = [0, 1, 2, 3, 4, 5, 6];
        for (var n = 0, h = i.length; n < h; n++)
            if (ModelAlert.red_pve_pvp_check(i[n])) return true;
        return false;
    }

    public static red_pve_pvp_check(t: any): boolean {
        switch (t) {
            case 0: return !sg.model.ModelGame.unlock(null, "pve_climb").stop && sg.model.ModelClimb.checkClimbWill();
            case 1: return !sg.model.ModelGame.unlock(null, "pve_pve").stop && ModelAlert.red_pve_check();
            case 2: return !sg.model.ModelGame.unlock(null, "pvp_pk").stop && sg.model.ModelClimb.checkPkWill();
            case 3: return !sg.model.ModelGame.unlock(null, "pvp_champion").stop && sg.model.ModelChampion.instance.championRedPoint();
            case 4: return sg.model.ModelTreasureHunting.instance.redPoint || sg.model.ModelLegend.instance.redPoint;
            case 5: return !sg.model.ModelGame.unlock(null, "tomb").stop && sg.model.ModelTomb.instance.isOpen() && sg.model.ModelTomb.instance.redPooint();
            case 6: return !sg.model.ModelGame.unlock(null, "pk_yard_new").stop && ModelManager.instance.modelChampionNew.showRed();
        }
        return false;
    }

    public static red_pve_check(): boolean {
        if (sg.model.ModelGame.unlock(null, "pve_pve").stop) return false;
        if (ModelManager.instance.modelUser.pveTimes()[0] > 0) return true;
        var i = ModelManager.instance.modelUser.pve_records.chapter;
        for (var n in i) {
            if (ModelAlert.red_pve_reward(n)) return true;
        }
        return false;
    }

    /** 章节星级数量达到奖励档位且未领（可领档数 > 已领数） */
    public static red_pve_reward(t: any): boolean {
        var s = ModelManager.instance.modelUser.pve_records.chapter,
            n = ConfigServer.pve.chapter_reward_limit,
            h = 0, o = 0, r = 0;
        if (s[t]) {
            for (var a in r = s[t].reward.length, s[t].star)
                for (var l = s[t].star[a], c = 0; c < l.length; c++) 1 == l[c] && (h += 1);
            for (var u = 0; u < n.length; u++) h >= n[u] && (o += 1);
            return o > r;
        }
        return false;
    }

    public static red_bag_check(): boolean {
        var i = ModelManager.instance.modelUser.property;
        for (var n in i) {
            if (ModelAlert.red_bag_item(n)) return true;
        }
        return false;
    }

    /** 有宝箱类道具（boxT）且本地红点记录未标记为 1 */
    public static red_bag_item(t: any): boolean {
        var s = ModelManager.instance.modelUser.property;
        if (s.hasOwnProperty(t) && 0 != s[t]) {
            var n = ModelManager.instance.modelProp.getLocalRedPoint();
            if (ModelManager.instance.modelProp.getItemProp(t))
                if (null != ModelManager.instance.modelProp.getItemProp(t).boxT)
                    return !n || !n.hasOwnProperty(t) || 1 != n[t];
        }
        return false;
    }

    public static red_guild_all(): boolean {
        return false;
    }

    public static red_guild_check(t: any): boolean {
        return false;
    }

    public static red_more_all(): boolean {
        var i = ["mail", "office", "servier", "notice"];
        for (var n = 0, h = i.length; n < h; n++)
            if (ModelAlert.red_more_check(i[n])) return true;
        return false;
    }

    public static red_more_check(t: any): boolean {
        switch (t) {
            case "mail": return ModelAlert.red_more_mail();
            case "office": return !sg.model.ModelGame.unlock(null, "more_office").stop && (sg.model.ModelOffice.checkLocalRedPoint() || sg.model.ModelOffice.checkOfficeWill());
            case "country": return ModelAlert.checkInvadeWill();
            case "country2": return !sg.model.ModelGame.unlock(null, "more_country").stop && sg.model.ModelTaskCountry.instance.redCheck();
            case "servier": return ModelAlert.red_more_servier();
            case "notice": return !sg.model.ModelGame.unlock(null, "more_notice").stop && sg.view.init.ViewAffiche.redCheck();
        }
        return false;
    }

    /** 新里程碑开启看可领任务；未开启看入侵奖励是否可领（对照原文：Sr=sg.model.ModelOfficial） */
    public static checkInvadeWill(): boolean {
        if (sg.model.ModelNewMilepost.instance.isOpen()) {
            if (sg.model.ModelNewMilepost.instance.getCanGetRewardTasks().length > 0) return true;
        } else
            for (var i = sg.model.ModelOfficial.getInvadeAwardMax(), s = 1; s <= i; s++) {
                var n = sg.model.ModelOfficial.getInvadeCfg(s);
                if (n.reward && n.reward.length > 0 && -1 === ModelManager.instance.modelUser.milepost_reward.indexOf(s)) return true;
            }
        return false;
    }

    /** 未读系统邮件，或超期未读（losttime_mail 分钟内不提醒），或未读私聊 */
    public static red_more_mail(): boolean {
        if (ModelManager.instance.modelChat.isNewMail) return true;
        var i = ConfigServer.getServerTimer(),
            s = ConfigServer.system_simple.losttime_mail ? ConfigServer.system_simple.losttime_mail * Tools.oneMinuteMilli : 0,
            n = ModelManager.instance.modelUser.msg.sys;
        if (!n) return false;
        for (var h = 0; h < n.length; h++) {
            var o = Tools.getTimeStamp(n[h][3]),
                r = s > 0 && o - Tools.oneMinuteMilli < i - s;
            if (0 == n[h][4] && !r) return true;
        }
        for (var a = ModelManager.instance.modelChat.getPersonChatArr(), l = 0; l < a.length; l++)
            if (0 == a[l].data.read) return true;
        return false;
    }

    public static red_more_servier(): boolean {
        return ModelManager.instance.modelChat.isNewBugMSG;
    }

    public static red_task_all(): boolean {
        var i = [0, 1, 2, 3, 4, 5];
        for (var n = 0, h = i.length; n < h; n++)
            if (ModelAlert.red_task_check(i[n])) return true;
        return false;
    }

    public static red_task_check(t: any): boolean {
        switch (t) {
            case 0: return sg.model.ModelTask.checkWorkWill();
            case 1: return sg.model.ModelTaskDaily.instance.redCheck();
            case 2: return sg.model.ModelTaskTrain.instance.redCheck();
            case 3: return sg.model.ModelTaskBuild.instance.redCheck();
            case 4: return sg.model.ModelTaskOrder.instance.redCheck();
            case 5: return sg.model.ModelTaskPromote.instance.redCheck();
        }
        return false;
    }

    /** 武将管理（府邸事务）有待完成项 */
    public static red_hero_task(): boolean {
        for (var i = ModelManager.instance.modelUser.mHeroManagerArr, s = 0; s < i.length; s++)
            if (i[s].estateFinish) return true;
        return false;
    }

    /** 年度信用礼包：滚动档（clv_rool_reward）可领 或 首充/累充档（clv_first）可领数超出已领 */
    public static red_credit_gift(): boolean {
        var t = ModelManager.instance.modelUser.isMerge ? ConfigServer.credit["merge_" + ModelManager.instance.modelUser.mergeNum] : ConfigServer.credit,
            s = ModelManager.instance.modelUser.credit_lv,
            n = ModelManager.instance.modelUser.year_credit,
            h = t.clv_added[s] * t.clv_added_ratio[t.clv_added_ratio.length - 1];
        if (n > h) {
            var o = t.clv_rool_reward[s][1];
            if (Math.floor((n - h) / o) > ModelManager.instance.modelUser.credit_rool_gifts_num) return true;
        }
        var r = ModelManager.instance.modelUser.credit_get_gifts.length, a = 0;
        if (n > t.clv_first[s] * t.clv_first_ratio[t.clv_first_ratio.length - 1]) {
            for (var l = t.clv_added_ratio.length - 1; l >= 0; l--) {
                if (n >= t.clv_added[s] * t.clv_added_ratio[l]) { a = l + 1; break }
            }
            a += t.clv_first_ratio.length;
        } else
            for (var c = t.clv_first_ratio.length - 1; c >= 0; c--) {
                if (n >= t.clv_first[s] * t.clv_first_ratio[c]) { a = c + 1; break }
            }
        return a > r;
    }

    public static red_happy_all(): boolean {
        for (var t = 0; t < sg.model.ModelHappy.instance.tabData.length; t++)
            if (ModelAlert.red_happy_by_key(sg.model.ModelHappy.instance.tabData[t])) return true;
        return false;
    }

    /** 首充/累充活动红点（键：login/sparta/purchase/addup/once/purchase2） */
    public static red_happy_by_key(t: any): boolean {
        var n = ModelManager.instance.modelUser.records.happy_buy;
        if (!n) return false;
        switch (t) {
            case "login":
                if (n.login[2].length > 0) return true;
                break;
            case "sparta":
                for (var h = 1; h <= 5; h++) if (ModelAlert.red_happy_sparta_by_index(h)) return true;
                if (ModelAlert.red_happy_sparta_big_reward()) return true;
                break;
            case "purchase":
                var o = n.purchase;
                if (o) {
                    var r = o[2] == ModelManager.instance.modelUser.loginDateNum ? o[1] : -1,
                        a = o[2] ? o[2] - 1 : 0;
                    if (r >= 0 && 0 == o[0] && r >= ConfigServer.ploy.happy_buy.purchase.need_pay_money[a]) return true;
                }
                break;
            case "addup":
                if (n.addup[2].length > 0) return true;
                break;
            case "once":
                var l = ModelManager.instance.modelUser.records.happy_buy.once;
                if (l[3].length > 0 || 1 == l[0]) return true;
                break;
            case "purchase2": return sg.model.ModelHappy.instance.getPurchase2RedPoint();
        }
        return false;
    }

    public static red_happy_sparta_by_index(t: any): boolean {
        var s = sg.model.ModelHappy.instance.getSpartaTaskByType(t);
        if (t <= sg.model.ModelHappy.instance.openDays && s)
            for (var n in s) if (ModelAlert.red_happy_sparta_by_key(s[n].id)) return true;
        return false;
    }

    public static red_happy_sparta_by_key(t: any): boolean {
        var s = ModelManager.instance.modelUser.records.happy_buy.sparta,
            n = ConfigServer.ploy.happy_buy.sparta.task[t].target;
        if (s && s.hasOwnProperty(t))
            for (var h in s[t]) {
                var o = s[t][h],
                    r = n[Number(h)][0][0];
                if (o[0] >= r && 0 == o[1]) return true;
            }
        return false;
    }

    public static red_happy_sparta_big_reward(): boolean {
        return sg.model.ModelHappy.instance.openDays > 7 && sg.model.ModelHappy.instance.getSpartaScore() > 0;
    }

    public static red_country_all(): boolean {
        var i = ["country_task", "country_bag", "country_alien", "country_impeach"];
        for (var s = 0; s < i.length; s++) {
            if (ModelAlert.red_country_check(i[s])) return true;
        }
        return false;
    }

    public static red_country_check(t: any): boolean {
        if (sg.model.ModelGame.unlock(null, "country").stop) return false;
        switch (t) {
            case "country_task": return !!sg.model.ModelGame.unlock(null, "country_task").visible && sg.model.ModelTaskCountry.instance.redCheck();
            case "country_bag": return !!sg.model.ModelGame.unlock(null, "country_bag").visible && (!ConfigApp.isLandscape && ModelManager.instance.modelClub.u_redbag_num < ModelManager.instance.modelClub.redbag_num || null != ModelManager.instance.modelUser.quota_gift);
            case "country_alien":
                if (!sg.model.ModelGame.unlock(null, "country_alien").visible) return false;
                var n = ModelManager.instance.modelClub.getTotalAlienKeyNum();
                if (n) return ModelManager.instance.modelClub.getOpenTimes() < n;
                for (var h = ModelManager.instance.modelUser.alien_reward, o = ConfigServer.getServerTimer(), r = 0; r < h.length; r++) {
                    if (h[r]) if (Tools.getTimeStamp(h[r][1]) <= o) return true;
                }
                var a = h.length,
                    l = ModelManager.instance.modelClub.inTeamNum();
                return a < 3 && l < 3 - a;
            case "country_office": return !!sg.model.ModelGame.unlock(null, "country_office").visible && ModelAlert.red_country_impeach();
        }
        return false;
    }

    public static red_country_impeach(): boolean {
        return 1 == sg.model.ModelOfficial.getImpeachStatus();
    }

    public static EVENT_RED_CHANGE: string = "event_red_change";
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelAlert",i)（i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelAlert, "sg.model.ModelAlert", null, null);
