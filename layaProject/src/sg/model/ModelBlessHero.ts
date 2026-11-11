/**
 * sg.model.ModelBlessHero —— 神佑主城（福将）模型：主/副槽位队伍数据、赛季刷新、
 * 开战时段定时、PK 与奖励领取、城市点击跳转、城池气泡与红点。
 *
 * 原文：code1.js 字节 [1839949, 1844502)（Eo= 声明器 @1839946，单声明器非 Ee 式，
 * 0 参 IIFE (As)，池化 3 参注册 o(h,e(14408),i) @1840109，e(14408)→
 * pool[14193]="sg.model.ModelBlessHero"，base i=As=sg.model.ViewModelBase）。
 * 前邻 ModelArena 尾 `}(As),Eo=`、后邻 `(As),Po=`（ModelBuffManager）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-z/ModelBlessHero.js
 * sha256 16=8375c0a1fceaaadc（4553B），work↔origin 逐字节一致，token 区间 overlap=0。
 *
 * 身份（locate_z.js / resolve_z.js，acorn 作用域链 + 池串/注册双源交叉）：
 *   As=ViewModelBase（@1215338 明文注册双证，本仓已译模块直引）、
 *   ue=ModelManager、Gt=ConfigServer、vs=Tools、cs=ObjectUtil、us=SaveLocal、
 *   lr=ModelGame（unlock）、ci=sg.fight.FightMain（startBattle 已声明，直接引用）、
 *   Dt=sg.boundFor.GotoManager（boundForPanel(name,a?,b?) 已声明，直接引用）、
 *   P=laya.utils.Handler、sg 全局根、s=Laya 根（s.timer）、r=Laya.getset。
 *   0 未译类。
 *
 * 保序构造决策（与 ModelBuffManager 同款，详见 batch-z-report.md）：
 * - 原文 ctor：5 项预设（cfg/cfg_main/cfg_secondary/show_num/teamData={}）→
 *   `h.__super.call(this)`；ViewModelBase ctor 内 `this.initData()` 派发本类覆写，
 *   initData→lookup 读写 `this.teamData`（super-先行的 tsc extends 形态会把字段
 *   初始化排到 initData 之后，首访 .instance（视图层 @1503106，配置已载）即抛
 *   TypeError）→ 无 extends 形态：预设语句 → `(<any>ViewModelBase).call(this)`，
 *   语句顺序与原文逐句对应（TS17009：tsc 2.6.2 禁止派生类 ctor 中 super() 前
 *   出现任何词法 this 引用，无法用 extends 表达预设先行）。
 * - 原型链：类声明后 `ModelBlessHero.prototype.__proto__ = ViewModelBase.prototype`
 *   （=Laya.__extend 的链效果），再重放注册（base 传 null，ModelBase.ts 尾注先例）；
 *   继承成员 this.event/sendMethod 经 `(<any>this)["成员"]` 调用点 cast。
 *
 * 保真注记：
 * - lookup 主/副槽两段循环：`r=(o=this.cfg_main[a])["effect"]||["",0,1]` 双赋值
 *   形态、secondary 的 `var c=i.getGameDate(getTimeStamp(start_time)+deviation*
 *   oneMinuteMilli+1)` 当日判定，顺序照抄；teamData.main/teamData.secondary 同源
 *   置空 `this.teamData.main=this.teamData.secondary={}` 保留；
 * - getEnemyDataByType：`n=(ue.instance.modelUser,this.teamData[t].npc_id)` 弃值
 *   逗号序列逐字保留；map 第二参 thisArg 与回调内 `(e=cs.clone(e)).lv+=i[n]||0`
 *   原地修改照抄；
 * - refreshTime：`for(var n in s.timer.clear(this,this.event),this.teamData)`
 *   for-in 判别对象为逗号序列（先清定时再遍历）——逐字保留；begin/end 两次
 *   timer.once(…,this.event,["update_data"],!1) 5 参形态照抄；
 * - _outFight：`i>n.old_star&&(n.new_star=i)` 新旧星比较写回照抄；
 * - talkOptions：SaveLocal getValue/save("bless_hero_talk",…,!0) 与
 *   `s?{talks:s,cid:n}:null` 三元返回照抄；
 * - `sg.model.ModelBlessHero` 全局路径自引（clearModels 的 sModel/instance）
 *   照抄全局路径；sModel 为 sg-externals-b.d.ts 声明面之外成员 → 调用点 cast
 *   （批次 C 先例）；
 * - 解码器别名与链式别名（var t=e / var h=s）物化后整句删除（批次 N 先例）；
 *   其余 var 声明与局部名照抄。
 */

import { ViewModelBase } from "./ViewModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ModelGame } from "./ModelGame";
import { ObjectUtil } from "../utils/ObjectUtil";
import { SaveLocal } from "../utils/SaveLocal";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import Handler = laya.utils.Handler;

export class ModelBlessHero {

    public cfg: any;
    public cfg_main: any;
    public cfg_secondary: any;
    public show_num: any;
    public teamData: any;

    constructor() {
        this.cfg = null, this.cfg_main = null, this.cfg_secondary = null,   // 原文 ctor 预设（先于基类构造）
            this.show_num = 100, this.teamData = {};
        (<any>ViewModelBase).call(this);                                    // 原文 h.__super.call(this)（保序构造，见头部注记）
    }

    public initData(): void {
        var i = ModelManager["instance"]["modelUser"];
        this["cfg"] = ConfigServer["bless_hero"],
            this["cfg"] && (this["cfg_main"] = this["cfg"]["main_" + i["mergeNum"]], this["cfg_secondary"] = this["cfg"]["secondary"], this["lookup"](), this["refreshData"](ModelManager["instance"]["modelUser"]["bless_hero"]));
    }

    /** 赛季数据回填：上赛季数据折算 star_num/reward_num/remain_times 后派发 update_data */
    public refreshData(t: any): void {
        var s = ModelManager["instance"]["modelUser"]["getGameDate"]();
        for (var n in t) {
            var h = this["teamData"][n], o = t[n], r = o["data"];
            h && o["season_num"] === s - 1 && (h["star_num"] = r[0] || 0, h["reward_num"] = r[1] || 0, o["num"] && (h["remain_times"] = this["cfg"]["num"] - o["num"]));
        }
        (<any>this)["event"]("update_data");
    }

    /** 槽位队伍解析：主槽按当日 day 命中，副槽按 start_time 折算当日 + open_day 命中 */
    public lookup(): void {
        var i = ModelManager["instance"]["modelUser"], s = i["getGameDate"](), n = i["country"], h = this["cfg"]["position"][n];
        this["teamData"]["main"] = this["teamData"]["secondary"] = {};
        var o = null, r = null;
        for (var a in this["cfg_main"]) if (r = (o = this["cfg_main"][a])["effect"] || ["", 0, 1], s === o["day"]) {
            this["teamData"]["main"] = { cid: h[0], team_id: a, effectId: r[0], awaken: Boolean(r[1]), scale: r[2], npc_id: o["npc_id"][n], hid: o["hero"][n], talk: o["talk"], reward: o["reward"], reward_num: 0, star_num: 0, remain_times: this["cfg"]["num"], begin_time: 0, end_time: 0 };
            break;
        }
        for (var l in this["cfg_secondary"]) {
            r = (o = this["cfg_secondary"][l])["effect"] || ["", 0, 1];
            var c = i["getGameDate"](Tools["getTimeStamp"](o["start_time"]) + ConfigServer["system_simple"]["deviation"] * Tools["oneMinuteMilli"] + 1);
            if (s >= o["open_day"] && s === c) {
                this["teamData"]["secondary"] = { cid: h[1], team_id: l, effectId: r[0], awaken: Boolean(r[1]), scale: r[2], npc_id: o["npc_id"], hid: o["hero"], talk: o["talk"], reward: o["reward"], reward_num: 0, star_num: 0, remain_times: this["cfg"]["num"], begin_time: 0, end_time: 0 };
                break;
            }
        }
        this["refreshTime"]();
    }

    /** 敌方数据：bless_hero_npc 按槽位取表；副槽克隆后 lv 加成（弃值序列原文如此） */
    public getEnemyDataByType(t: any, i: any): any {
        var n = (ModelManager["instance"]["modelUser"], this["teamData"][t]["npc_id"]);
        return (ConfigServer["bless_hero_npc"][n] || ConfigServer["bless_hero_npc"]["default"])["map"](function (e: any, n: any) {
            return t === "secondary" && ((e = ObjectUtil["clone"](e))["lv"] += i[n] || 0), { index: n, data: e };
        }, this);
    }

    /** 开战时段定时：先清本实例事件定时，再按 open_time 设 begin/end 两次到点派发 */
    public refreshTime(): void {
        var i = ConfigServer["getServerTimer"]();
        for (var n in (Laya.timer.clear(this, (<any>this)["event"]), this["teamData"])) {
            var h = this["teamData"][n];
            if (h["team_id"]) {
                var o = (n === "main" ? this["cfg_main"] : this["cfg_secondary"])[h["team_id"]];
                h["begin_time"] = Tools["getTodayMillWithHourAndMinute"](o["open_time"][0]),
                    h["end_time"] = Tools["getTodayMillWithHourAndMinute"](o["open_time"][1]),
                    i < h["begin_time"] && (Laya.timer.once(h["begin_time"] - i, this, (<any>this)["event"], ["update_data"], !1), Laya.timer.once(h["end_time"] - i, this, (<any>this)["event"], ["update_data"], !1));
            }
        }
        (<any>this)["event"]("update_data");
    }

    public getTime(t: any): any {
        var s = ConfigServer["getServerTimer"]();
        return this["teamData"][t]["end_time"] - s;
    }

    public fight(t: any, i: any, s: any): void {
        (<any>this)["sendMethod"]("pk_bless", { type: t, team_id: i, hids: s }, Handler["create"](this, this["_fightCB"]), t);
    }

    public _fightCB(t: any): void {
        var s = t["receiveData"], n = t["otherData"];
        ModelManager["instance"]["modelUser"]["updateData"](s), sg.fight.FightMain["startBattle"](s, this, this["_outFight"], [n, s["star_num"]]);
    }

    public _outFight(t: any, i: any): void {
        var n = this["teamData"][t];
        i > n["old_star"] && (n["new_star"] = i), sg.boundFor.GotoManager["boundForPanel"]("bless_hero", "", [t, !0]);
    }

    public getReward(t: any, i: any): void {
        (<any>this)["sendMethod"]("get_bless_gift", { type: t, team_id: i });
    }

    /** 按城池 cid 找启用中的槽位数据 */
    public getClipData(t: any): any {
        for (var s in this["teamData"]) {
            var n = this["teamData"][s];
            if (n["team_id"] && n["cid"] === t) return this["checkActive"](s) ? n : null;
        }
        return null;
    }

    public checkActive(t: any): any {
        if (ModelGame["unlock"]("", "bless_hero")["stop"]) return !1;
        var s = ConfigServer["getServerTimer"](), n = this["teamData"][t];
        return !(!n || !n["team_id"]) && (s > n["begin_time"] && s < n["end_time"]);
    }

    public onClickCity(t: any): void {
        var s = this["teamData"]["main"]["cid"] === t ? "main" : "secondary";
        sg.boundFor.GotoManager["boundForPanel"]("bless_hero", "", [s, !1]);
    }

    /** r(0,a,"cids") —— 本国主/副槽城池 id 对 */
    public get cids(): any {
        return this["cfg"]["position"][ModelManager["instance"]["modelUser"]["country"]];
    }

    /** r(0,a,"infoData") —— 启用中槽位的 [cid,hid,remain_times] 列表 */
    public get infoData(): any {
        var i = [];
        for (var s in this["teamData"]) {
            var n = this["teamData"][s];
            this["checkActive"](s) && i["push"]([n["cid"], n["hid"], n["remain_times"]]);
        }
        return i;
    }

    /** r(0,a,"talkOptions") —— 当日首次启用槽位的台词（读后即存档当日） */
    public get talkOptions(): any {
        var i = ModelManager["instance"]["modelUser"]["getGameDate"]();
        if ((SaveLocal["getValue"]("bless_hero_talk", !0) || 0) === i) return null;
        var s = "", n = 0;
        return this["checkActive"]("main") && this["teamData"]["main"]["talk"] ? (s = this["teamData"]["main"]["talk"], n = this["teamData"]["main"]["cid"]) : this["checkActive"]("secondary") && this["teamData"]["secondary"]["talk"] && (s = this["teamData"]["secondary"]["talk"], n = this["teamData"]["secondary"]["cid"]),
            s ? (SaveLocal["save"]("bless_hero_talk", i, !0), { talks: s, cid: n }) : null;
    }

    /** r(0,a,"active") —— 任一槽位启用中（覆写 ViewModelBase 恒 false 基态） */
    public get active(): any {
        return !!this["cfg"] && (this["checkActive"]("main") || this["checkActive"]("secondary"));
    }

    /** r(0,a,"redPoint") —— 恒 false（`this.active&&!1` 原文如此） */
    public get redPoint(): any {
        return this["active"] && !1;
    }

    /** r(1,h,"instance",getter,ViewModelBase._$SET_instance) —— 惰性单例（写回 sModel）；
     *  第 5 实参在原文注册期即 undefined（ViewModelBase 无 r(1,As,"instance",...) 注册，
     *  Laya.getset 对 set=undefined 只装 getter）→ 仅 getter 翻译（ModelArena 先例）。 */
    public static get instance(): ModelBlessHero {
        return ModelBlessHero.sModel = ModelBlessHero.sModel || new ModelBlessHero();
    }

    public static clearModels(): void {
        (<any>sg.model.ModelBlessHero)["sModel"] && sg.model.ModelBlessHero["instance"]["refreshTime"]();
    }

    public static UPDATE_DATA: string = "update_data";
    public static TYPE_MAIN: string = "main";
    public static TYPE_SECONDARY: string = "secondary";
    public static sModel: ModelBlessHero = null;
}

/**
 * 原型链与注册身份等价物：原文 o(h,e(14408),i)（池化，i=As=sg.model.ViewModelBase）
 * 经 Laya.__extend 建链；无 extends 形态下先显式 __proto__ 接链，再重放注册本身
 * （base 传 null，避免 __extend 重置 tsc 已挂接的原型方法；见 ModelBase.ts 尾注
 * 与 batch-z-report.md「保序构造决策」）。
 */
(<any>ModelBlessHero.prototype).__proto__ = (<any>ViewModelBase.prototype);
Laya.class(ModelBlessHero, "sg.model.ModelBlessHero", null, null);
