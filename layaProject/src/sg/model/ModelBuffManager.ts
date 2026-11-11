/**
 * sg.model.ModelBuffManager —— 国家/城池 buff 管理器（w.create_buff(w1)/
 * w.delete_buff1 socket 通道、expedition 远征 buff、按国排序的 buffModels、
 * BUFF_ADDED/DELETED/CHANGED 事件）。
 *
 * 原文：code1.js 字节 [1844510, 1849219)（Po= 声明器 @1844507，单声明器非 Ee 式，
 * 0 参 IIFE (As)，池化 3 参注册 o(h,e(13966),i) @1844654，e(13966)→
 * pool[13751]="sg.model.ModelBuffManager"，base i=As=sg.model.ViewModelBase）。
 * 前邻 ModelBlessHero 尾 `}(As),Po=`、后邻 `(As),Do=`（ModelAdjutant）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-z/ModelBuffManager.js
 * sha256 16=7fb4aa6964877c24（4709B），work↔origin 逐字节一致，token 区间 overlap=0。
 *
 * 身份（locate_z.js / resolve_z.js，acorn 作用域链 + 池串/注册双源交叉）：
 *   As=ViewModelBase（@1215338 明文注册双证，本仓已译模块直引）、
 *   ue=ModelManager、Gt=ConfigServer、cs=ObjectUtil、Ze=ArrayUtil、vs=Tools、
 *   Sr=ModelOfficial（cities/countries）、pn=NetSocket、Dt=sg.boundFor.
 *   GotoManager（boundForPanel(name,a?,b?) 已声明，直接引用）、
 *   Ce=sg.model.ModelBuff（批次外：expeditionCid 直接引用；getBuffCfg/NO_CID/
 *   isBuff/isNewInterface/getBuffMaxNum/ctor 调用点 cast）、
 *   P=laya.utils.Handler、sg 全局根、s=Laya 根（s.timer）、h=Laya.static、
 *   r=Laya.getset。0 未译类。
 *
 * 保序构造决策（本类与 ModelBlessHero 同款，详见 batch-z-report.md）：
 * - 原文 ctor：`this._buffs={}` → `h.__super.call(this)`（ViewModelBase ctor 内
 *   `this.initData()` 派发本类覆写）→ `pn.instance.registerHandler(...)`。
 *   ViewModelBase ctor 会立即调用 initData → checkBuffs/_refreshExpedition 读取
 *   `this._buffs`；super-先行的 tsc extends 形态会把字段初始化排到 initData
 *   之后，首访 .instance（视图层 @1502921，配置已载）即抛 TypeError —— 故采用
 *   无 extends 形态：预设语句 → `(<any>ViewModelBase).call(this)` → 后续语句，
 *   语句顺序与原文逐句对应（TS17009：tsc 2.6.2 禁止派生类 ctor 中 super() 前
 *   出现任何词法 this 引用，预设写 this._buffs 无法用 extends 表达）。
 * - 原型链：类声明后 `ModelBuffManager.prototype.__proto__ = ViewModelBase.
 *   prototype`（=Laya.__extend 的链效果），再重放注册（base 传 null 不重置原型，
 *   ModelBase.ts 尾注先例）；继承成员 this.event/sendMethod 经 `(<any>this)
 *   ["成员"]` 调用点 cast（运行时沿原型链解析，批次 C 先例）。
 *
 * 保真注记：
 * - initData 三个 forEach 回调以 `var i=this` 捕获 this（原文 var i，别名 t 已删）；
 * - getBuffRemainTimes filter 回调体 `t.country, ue.instance.modelUser.country`
 *   弃值逗号序列逐字保留（原文如此，非比较）；sort 降序后取 [0]；
 * - createBuff `o=s(h?548:10172)` 池化条件串物化为 h?"w.create_buff1":
 *   "w.create_buff"；`sg.model.ModelBuffManager.instance.getBuffs` 全局路径
 *   自引 → 类标识符直引（批次 O/I 先例）；
 * - createModelBuff `$datetime` 双形态（数组拼接 / 键值遍历）与
 *   `t!=="buff_country5"&&h.country!==r` 求值顺序、
 *   `(t==="buff_country3"||t==="buff_country4")&&removeBuffByType(t),
 *   createSingleBuff(...)` 逗号链逐字保留；
 * - createSingleBuff `n=n&&o.myCountryBuff` 参数回写与 `n&&Dt.boundForPanel`
 *   分支照抄；buffAdded/buffDeleted/notify 事件三连（BUFF_CHANGED + timer
 *   clear/once 最小剩余时间轮询）照抄；
 * - 解码器别名与链式别名（var t=e / var e=i / var s=i / var n=t）物化后整句
 *   删除（批次 N 先例）；其余 var 声明与局部名照抄。
 *
 * 类型层等价改写（不改运行时语义，批次 C「调用点 cast」先例）：
 *   Ce（ModelBuff）声明面不足的成员 → (<any>sg.model.ModelBuff)["成员"] /
 *   new (<any>sg.model.ModelBuff)(t,i)；expeditionCid 已声明直接引用。
 */

import { ViewModelBase } from "./ViewModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ModelOfficial } from "./ModelOfficial";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { NetSocket } from "../net/NetSocket";
import Handler = laya.utils.Handler;

export class ModelBuffManager {

    public _buffs: any;

    constructor() {
        this._buffs = {};                                   // 原文 ctor 预设（先于基类构造）
        (<any>ViewModelBase).call(this);                    // 原文 h.__super.call(this)（保序构造，见头部注记）
        NetSocket["instance"]["registerHandler"]("w.fight_end", new Handler(this, this["_refreshExpedition"]));
    }

    public initData(): void {
        var i = this;
        ObjectUtil["values"](ModelOfficial["cities"])["forEach"](function (e: any) { i["checkBuffs"](e["buffs"]); }),
            ObjectUtil["values"](ModelOfficial["countries"])["forEach"](function (e: any) { i["checkBuffs"](e["buffs"]); }),
            ObjectUtil["values"](ModelOfficial["countries"])["forEach"](function (e: any) { i["checkBuffs"](e["buffs1"]); }),
            NetSocket["instance"].on("event_socket_receive_to", this, this["_socketReceive"]),
            this["_refreshExpedition"]();
    }

    /** 远征 buff：等级不足挂 user_lv_up 单次监听重试；达标清旧建新（expeditionCid） */
    public _refreshExpedition(): void {
        var i = "expedition", s = ModelManager["instance"]["modelUser"], n = (<any>sg.model.ModelBuff)["getBuffCfg"](i);
        if (s["getLv"]() < n["show_lv"]) s["once"]("event_user_lv_up", this, this["_refreshExpedition"]);
        else {
            this["removeBuffByType"](i);
            var h = sg.model.ModelBuff["expeditionCid"];
            h !== (<any>sg.model.ModelBuff)["NO_CID"] && this["createSingleBuff"](i, { cid: h, country: s["country"] });
        }
    }

    public checkBuffs(t: any): void {
        if (t) for (var s in t) this["createModelBuff"](s, t[s]);
    }

    public getCityBuff(t: any): any {
        return this["buffModels"]["filter"](function (e: any) { return e["cid"] === t; });
    }

    public getBuff(t: any, i: any): any {
        void 0 === i && (i = (<any>sg.model.ModelBuff)["NO_CID"]), this["_buffs"][t] = this["_buffs"][t] || {};
        var n = this["_buffs"][t][i];
        return n && n["active"] ? n : null;
    }

    public getBuffs(t: any): any {
        return ObjectUtil["values"](this["_buffs"][t]);
    }

    /** 军团 buff 剩余次数：非当日或无 buff 回满额 */
    public getBuffCorpsRemainTimes(t: any): any {
        var s = this["getBuff"]("buff_corps", t), n = (<any>sg.model.ModelBuff)["getBuffCfg"]("buff_corps")["number"] || 1;
        return !s || Tools["isNewDay"](s["beginTime"]) ? n : n - s["times"];
    }

    /** 指定类型 buff 剩余次数：取剩余时间最长的一条（filter 弃值序列原文如此） */
    public getBuffRemainTimes(t: any): any {
        var s = ObjectUtil["values"](this["_buffs"][t] || {})["filter"](function (t: any) { t["country"], ModelManager["instance"]["modelUser"]["country"]; })["sort"](function (t: any, e: any) { return e["remainTime"] - t["remainTime"]; })[0],
            n = (<any>sg.model.ModelBuff)["getBuffCfg"](t)["number"] || 1;
        return !s || Tools["isNewDay"](s["beginTime"]) ? n : n - s["times"];
    }

    public _socketReceive(t: any): void {
        var s = t["method"], n = t["data"];
        if (!Tools["isNullObj"](n)) switch (s) {
            case "w.create_buff":
            case "w.create_buff1":
                this["onCreateBuff"](n);
                break;
            case "w.delete_buff1":
                this["onDeleteBuff"](n);
        }
    }

    public onCreateBuff(t: any): void {
        for (var s in t) {
            var n = t[s];
            (<any>sg.model.ModelBuff)["isBuff"](s) && this["createModelBuff"](s, n, !0);
        }
    }

    public onDeleteBuff(t: any): void {
        var s = ObjectUtil["keys"](t)[0];
        if (s) {
            var n = ObjectUtil["keys"](t[s][2])["map"](parseFloat);
            this["getBuffs"](s)["filter"](function (t: any) { return -1 === n["indexOf"](t["cid"]); })["forEach"](this["removeBuff"], this);
        }
    }

    /** socket 数据双形态：$datetime 拼接数组 / 键值表遍历；非本国且非 buff_country5 即弃 */
    public createModelBuff(t: any, i: any, s?: any): void {
        void 0 === s && (s = !1);
        var h = null, o = null, r = ModelManager["instance"]["modelUser"]["country"];
        if (i[2] && i[2]["$datetime"]) {
            if ((o = i["concat"]())[0] || (o[0] = (<any>sg.model.ModelBuff)["NO_CID"] + ""), h = { cid: o[0], time: Tools["getTimeStamp"](o[2]), times: o[3], official: o[4], country: o[5] }, t !== "buff_country5" && h["country"] !== r) return;
            (t === "buff_country3" || t === "buff_country4") && this["removeBuffByType"](t), this["createSingleBuff"](t, h, s);
        } else {
            var a = i[2];
            for (var l in a) {
                if (o = a[l], (h = { cid: l, time: Tools["getTimeStamp"](o[1]), times: i[0], official: o[2], country: o[3] })["country"] !== r && t !== "buff_country5") return;
                this["createSingleBuff"](t, h, s);
            }
        }
    }

    public removeBuffByType(t: any): void {
        this["getBuffs"](t)["forEach"](this["removeBuff"], this);
    }

    public removeBuff(t: any): void {
        this["_buffs"][t["type"]][t["cid"]] && (delete this["_buffs"][t["type"]][t["cid"]], this["buffDeleted"](t));
    }

    /** 单 buff 落位：更新或新建 ModelBuff；active 才入表（callLater 派发 BUFF_ADDED），否则移除 */
    public createSingleBuff(t: any, i: any, n?: any): void {
        void 0 === n && (n = !1);
        var o = this["getBuff"](t, i["cid"]);
        o ? (o["update"](i), n = !1) : (o = new (<any>sg.model.ModelBuff)(t, i), n = n && o["myCountryBuff"]),
            o["active"] ? (this["_buffs"][t] = this["_buffs"][t] || {}, this["_buffs"][t][o["cid"]] = o, Laya.timer["callLater"](this, this["buffAdded"], [o]), n && sg.boundFor.GotoManager["boundForPanel"]("view_country_tips_order", "", o)) : this["removeBuff"](o);
    }

    public buffAdded(t: any): void {
        (<any>this)["event"](ModelBuffManager["BUFF_ADDED"], t), this["notify"]();
    }

    public buffDeleted(t: any): void {
        (<any>this)["event"](ModelBuffManager["BUFF_DELETED"], t), this["notify"]();
    }

    /** BUFF_CHANGED 派发 + 按最小剩余时间轮询自调 */
    public notify(): void {
        (<any>this)["event"](ModelBuffManager["BUFF_CHANGED"]);
        var i = this["buffModels"]["map"](function (i: any) { return i["remainTime"]; })["sort"](function (t: any, i: any) { return t - i; })[0];
        Laya.timer.clear(this, this["notify"]), i && Laya.timer.once(i, this, this["notify"]);
    }

    /** 发起 buff 请求：新接口国策 3/4 且上限 1 时先删已有 */
    public createBuff(t: any, i: any): void {
        var n = { type: t, is_free: !1 };
        typeof i == "number" && (n["cid"] = String(i));
        var h = (<any>sg.model.ModelBuff)["isNewInterface"](t), o = h ? "w.create_buff1" : "w.create_buff";
        if (h && 1 === (<any>sg.model.ModelBuff)["getBuffMaxNum"](t) && (t === "buff_country3" || t === "buff_country4")) {
            var r = sg.model.ModelBuffManager["instance"]["getBuffs"](t)[0];
            r && this["deleteBuff"](r);
        }
        (<any>this)["sendMethod"](o, n);
    }

    public deleteBuff(t: any): void {
        var s = { type: t["type"], cid: String(t["cid"]) };
        (<any>this)["sendMethod"]("w.delete_buff1", s);
    }

    /** r(0,a,"myCountryBuffs") —— 本国生效 buff 列表 */
    public get myCountryBuffs(): any {
        var i = ModelManager["instance"]["modelUser"]["country"];
        return this["buffModels"]["filter"](function (e: any) { return e["country"] === i; });
    }

    /** r(0,a,"buffModels") —— 全部生效 buff：本国或 buff_country5，按 ConfigFight.npc_info 层排序 */
    public get buffModels(): any {
        var i = ConfigServer["npc_info"], s = ObjectUtil["values"](this["_buffs"])["map"](function (i: any) { return ObjectUtil["values"](i); });
        return ArrayUtil["flat"](s)["filter"](function (i: any) {
            var s = i["country"] === ModelManager["instance"]["modelUser"]["country"];
            return i["active"] && (s || i["type"] === "buff_country5");
        })["sort"](function (e: any, s: any) {
            var h = i[e["type"]]["layer"] - i[s["type"]]["layer"];
            return 0 !== h ? h : e["remainTime"] - s["remainTime"];
        });
    }

    /** r(1,h,"instance",getter,ViewModelBase._$SET_instance) —— 惰性单例（写回 sModel）；
     *  第 5 实参在原文注册期即 undefined（ViewModelBase 无 r(1,As,"instance",...) 注册，
     *  Laya.getset 对 set=undefined 只装 getter）→ 仅 getter 翻译（ModelArena 先例）。 */
    public static get instance(): ModelBuffManager {
        return ModelBuffManager.sModel = ModelBuffManager.sModel || new ModelBuffManager();
    }

    public static BUFF_ADDED: string = "buff_added";
    public static BUFF_DELETED: string = "buff_deleted";
    public static BUFF_CHANGED: string = "buff_changed";
    public static sModel: ModelBuffManager = null;
}

/**
 * 原型链与注册身份等价物：原文 o(h,e(13966),i)（池化，i=As=sg.model.ViewModelBase）
 * 经 Laya.__extend 建链；无 extends 形态下先显式 __proto__ 接链，再重放注册本身
 * （base 传 null，避免 __extend 重置 tsc 已挂接的原型方法；见 ModelBase.ts 尾注
 * 与 batch-z-report.md「保序构造决策」）。
 */
(<any>ModelBuffManager.prototype).__proto__ = (<any>ViewModelBase.prototype);
Laya.class(ModelBuffManager, "sg.model.ModelBuffManager", null, null);
