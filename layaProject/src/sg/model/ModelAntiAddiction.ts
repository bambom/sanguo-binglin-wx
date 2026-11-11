/**
 * sg.model.ModelAntiAddiction —— 实名认证/防沉迷模型（试用时长、宵禁、
 * 节假日游戏时长、月付费上限；LocalStorage 按玩家 UID 分键存取）。
 *
 * 原文：code1.js 字节 [1860436, 1864452)（Fo= 声明器 @1860433，单声明器非 Ee 式，
 * 0 参 IIFE (Ns)，池化 3 参注册 o(a,e(10787),i) @1860590，e(10787)→
 * pool[10572]="sg.model.ModelAntiAddiction"，base i=Ns=sg.model.ModelBase）。
 * 前邻 ModelAlert 尾 `}(Ns),Fo=`、后邻 `(Ns),Ho=`（ModelArmyUpgrade）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-z/ModelAntiAddiction.js
 * sha256 16=9170a590563bb546（4016B），work↔origin 逐字节一致，token 区间 overlap=0。
 *
 * 身份（locate_z.js / resolve_z.js，acorn 作用域链 + 池串/注册双源交叉）：
 *   Br=sg.model.ModelPlayer（t(3066) 注册解码双证，本仓已译模块直引）、
 *   Gt=ConfigServer、vs=Tools、tn=ViewManager、Ts=Trace（短名注册）、
 *   Rt=ConfigApp（t(12677)@427899 ✓，.pf）、q=laya.net.LocalStorage、
 *   fn=NetHttp、ue=ModelManager、js=sg.guide.model.ModelGuide（批次外）、
 *   s8=sg.view.init.ViewAntiAddiction（批次外，本批 sg-externals-z.d.ts 新增声明）、
 *   Ns=ModelBase、s=Laya 根（s.timer）、h=Laya.static、r=Laya.getset。
 *   0 未译类。
 *
 * 保真注记：
 * - ctor 原文预设（age/experienceTime/currUid/day_time/sumMoney）先于
 *   `a.__super.call(this)`；ModelBase ctor 只写自身 data/mData/mClassType，
 *   不读子字段、不派发 initData（ModelBase 无 initData），预设与基类构造写集
 *   互不相交 → tsc extends 形态下「super() 后跑字段初始化」与原文顺序等价
 *   （批次 A 先例；字段声明顺序=原预设顺序）。
 * - checkRealNameTime/checkRealNameInGame/indulgeCurfew/indulgeDay_time/
 *   canPay 嵌套三元与逗号链逐字保留；canPay 三处 `return i&&showTips(...),!1`
 *   逗号 return；updateCurfewTime `!A&&!B&&C` 短路链。
 * - indulgeDay_time：日期三段重置（setHours/setMinutes/setSeconds/
 *   setMilliseconds）顺序照抄；`o.getTime()>=n.getTime()&&o.getTime()<=
 *   i.getTime()` 与两臂赋值/存档顺序照抄；6 参 loop(1e3,...,null,!0,!0)。
 * - pay 回调参数名 e、外层参数 t 区分：`n.canPay(t)` 用外层 t（请求类型），
 *   `e.total_money` 用回调数据 —— 原文如此。
 * - `var n=this` 提前捕获（回调内 this 绑定）照抄。
 * - 解码器别名（var t=e 等）物化后整句删除（批次 N 先例）；其余局部名照抄。
 *
 * 类型层等价改写（不改运行时语义）：q=laya.net.LocalStorage 经引擎命名空间
 * 限定名直引（SaveLocal.ts 先例）；s8=ViewAntiAddiction 走全局注册路径
 * sg.view.init.ViewAntiAddiction（声明见 sg-externals-z.d.ts）；js=ModelGuide
 * 走全局注册路径（sg-externals.d.ts 已有 forceGuide 声明）。
 */

import { ModelBase } from "./ModelBase";
import { ModelPlayer } from "./ModelPlayer";
import { ModelManager } from "../manager/ModelManager";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigApp } from "../cfg/ConfigApp";
import { Tools } from "../utils/Tools";
import { NetHttp } from "../net/NetHttp";
import Handler = laya.utils.Handler;

export class ModelAntiAddiction extends ModelBase {

    public age: any = -1;
    public experienceTime: any = 0;
    public currUid: any = null;
    public day_time: any = 0;
    public sumMoney: any = 0;

    constructor() {
        super();               // 原文 a.__super.call(this)（预设/构造顺序等价性见头部注记）
    }

    public init(): void {
        this["currUid"] = ModelPlayer["instance"]["getUID"](),
            this["experienceTime"] = parseInt(this["read"]("ma_experienceTime") || "0");
    }

    public save(t: any, i: any): void {
        laya.net.LocalStorage["setItem"](this["currUid"] + "_" + t, i["toString"]());
    }

    public read(t: any): any {
        return laya.net.LocalStorage["getItem"](this["currUid"] + "_" + t);
    }

    /** 试用状态：未实名且年龄未知时按试用时长判 -1(超)/0(未超)，否则 1(免检) */
    public checkRealNameTime(): any {
        return this["isRealNamePf"] && -1 == this["age"] ? (this["experienceTime"] >= 60 * ConfigServer["system_simple"]["real_name"]["time"] ? -1 : 0) : 1;
    }

    /** 游戏内实名检查：0 起试用计时，-1 已超时直接弹实名 */
    public checkRealNameInGame(): any {
        var i = this["checkRealNameTime"]();
        return 0 == i ? (Laya.timer.loop(1e3, this, this["updateExperienceTime"]), !0) : 1 == i || (sg.view.init.ViewAntiAddiction["showReadName"](), !1);
    }

    /** 当日实名检查：间隔窗口内已试过则拒绝（可选弹提示） */
    public checkRealNameInDay(t: any): any {
        if (void 0 === t && (t = !1), -1 == this["checkRealNameTime"]()) {
            var s = parseFloat(this["read"]("ma_experienceDate") || "0");
            if (0 != s && ConfigServer["getServerTimer"]() - s <= ConfigServer["system_simple"]["real_name"]["interval"] * Tools["oneDayMilli"])
                return t && sg.view.init.ViewAntiAddiction["showReadName"](), !1;
        }
        return !0;
    }

    public updateExperienceTime(): void {
        ViewManager["instance"]["sceneMain"] && (this["experienceTime"] += 1, -1 == this["checkRealNameTime"]() ? (Laya.timer.clear(this, this["updateExperienceTime"]), this["save"]("ma_experienceTime", this["experienceTime"]["toString"]()), this["save"]("ma_experienceDate", ConfigServer["getServerTimer"]()), Trace["log"]("实名认证试用结束！"), sg.view.init.ViewAntiAddiction["showReadName"]()) : this["experienceTime"] % 10 == 0 && this["save"]("ma_experienceTime", this["experienceTime"]["toString"]()));
    }

    /** 防沉迷总闸：非沉浸平台 / 年龄未知 / （未成年且过宵禁与当日时长）放行 */
    public checkIndulge(): any {
        return !this["isIndulge"] || -1 == this["age"] || (this["age"] < 18 && this["indulgeCurfew"]() && this["indulgeDay_time"]());
    }

    /** 宵禁时段检查：在段内起每分钟轮询，出段直接弹提示 */
    public indulgeCurfew(t?: any): any {
        void 0 === t && (t = !0);
        var n = new Date(ConfigServer["getServerTimer"]()), h = 60 * n["getHours"]() + n["getMinutes"](),
            o = 60 * ConfigServer["system_simple"]["indulge"]["curfew"][0][0] + ConfigServer["system_simple"]["indulge"]["curfew"][0][1],
            r = 60 * ConfigServer["system_simple"]["indulge"]["curfew"][1][0] + ConfigServer["system_simple"]["indulge"]["curfew"][1][1];
        return h >= o && h <= r ? (t && Laya.timer.loop(6e4, this, this["updateCurfewTime"]), !0) : (Trace["log"]("不在时间段内"), sg.view.init.ViewAntiAddiction["showIndulgeCurfew"](), !1);
    }

    public updateCurfewTime(): void {
        !this["indulgeCurfew"](!1) && !sg.guide.model.ModelGuide["forceGuide"]() && Laya.timer.clear(this, this["updateCurfewTime"]);
    }

    /** 当日游戏时长：跨午夜窗口计算 day_time，达限弹提示，未达起秒级轮询 */
    public indulgeDay_time(): any {
        var i = ConfigServer["getServerTimer"](), n = new Date(i);
        n["setHours"](0), n["setMinutes"](0), n["setSeconds"](0), n["setMilliseconds"](0);
        var h = new Date(i);
        h["setHours"](24), h["setSeconds"](0), h["setMinutes"](0), h["setMilliseconds"](0);
        var o = null, r = parseFloat(this["read"]("ma_dayTime"));
        return r ? o = new Date(r) : (o = new Date(i["toString"]()), this["save"]("ma_dayTime", ConfigServer["getServerTimer"]())),
            o["getTime"]() >= n["getTime"]() && o["getTime"]() <= h["getTime"]() ? this["day_time"] = (i - o["getTime"]()) / 1e3 : (this["save"]("ma_dayTime", ConfigServer["getServerTimer"]()), this["day_time"] = 0),
            this["day_time"] >= 60 * this["limitDayTime"] ? (sg.view.init.ViewAntiAddiction["showDayTime"](this["limitDayTime"] == ConfigServer["system_simple"]["indulge"]["holiday_time"]), !1) : (Laya.timer.loop(1e3, this, this["updateDayTime"], null, !0, !0), !0);
    }

    public updateDayTime(): void {
        this["day_time"] += 1, this["day_time"] >= 60 * this["limitDayTime"] && sg.view.init.ViewAntiAddiction["showDayTime"](this["limitDayTime"] == ConfigServer["system_simple"]["indulge"]["holiday_time"]);
    }

    /** 月付费上限：按年龄段 pay_limit 判定，0 段直接弹一档提示 */
    public canPay(t: any): any {
        for (var s = ConfigServer["pay_config"][t][0], n = 0, h = ConfigServer["system_simple"]["indulge"]["pay_limit"]["length"]; n < h; n++) {
            var o = ConfigServer["system_simple"]["indulge"]["pay_limit"][n];
            if (this["age"] >= o[0][0] && this["age"] <= o[0][1]) {
                if (0 == n) {
                    sg.view.init.ViewAntiAddiction["showPayLimit1"]();
                    break;
                }
                if (s > o[1]) {
                    sg.view.init.ViewAntiAddiction["showPayLimit"](o[1], this["sumMoney"], o[2]);
                    break;
                }
                if (this["sumMoney"] + s > o[2]) {
                    sg.view.init.ViewAntiAddiction["showPayLimit"](o[1], this["sumMoney"], o[2]);
                    break;
                }
            }
        }
        return n == h;
    }

    /** 支付闸：沉浸平台先拉月充值记录（回调更新 sumMoney 后复检），非沉浸直接放行 */
    public pay(t: any, i: any): void {
        if (this["isIndulge"]) {
            var n = this;
            NetHttp["instance"]["send"]("user_zone.get_month_pay_records", { uid: ModelManager["instance"]["modelUser"]["mUID"] }, Handler["create"](this, function (e: any) {
                e["status"] != "error" && (n["sumMoney"] = e["total_money"] || 0, n["canPay"](t) && i["run"]());
            }));
        } else i["run"]();
    }

    /** r(0,l,"isRealNamePf") —— 平台在实名名单内 */
    public get isRealNamePf(): any {
        return ConfigServer["system_simple"]["real_name"] && ConfigServer["system_simple"]["real_name"]["pfs"] && -1 != ConfigServer["system_simple"]["real_name"]["pfs"]["indexOf"](ConfigApp.pf);
    }

    /** r(0,l,"isIndulge") —— 未成年且平台在沉浸名单内 */
    public get isIndulge(): any {
        return this["age"] < 18 && ConfigServer["system_simple"]["indulge"] && ConfigServer["system_simple"]["indulge"]["pfs"] && -1 != ConfigServer["system_simple"]["indulge"]["pfs"]["indexOf"](ConfigApp.pf);
    }

    /** r(0,l,"limitDayTime") —— 当日时长上限：周末/节假日表，缺省 0 */
    public get limitDayTime(): any {
        var t, s = new Date(ConfigServer["getServerTimer"]()), n = ConfigServer["system_simple"]["indulge"]["week"];
        if (n && -1 != n["indexOf"](s["getDay"]())) return ConfigServer["system_simple"]["indulge"]["day_time"];
        for (var h in ConfigServer["system_simple"]["indulge"]["holiday"]) if (t = ConfigServer["system_simple"]["indulge"]["holiday"][h], s["getMonth"]() + 1 == t[0] && s["getDate"]() == t[1]) return ConfigServer["system_simple"]["indulge"]["holiday_time"];
        return 0;
    }

    /**
     * 原文 h(a,["instance",function(){return this.instance=new a}]) —— Laya.static
     * 惰性静态（自删除访问器，首次访问以赋值结果替换为数据属性；ModelArena imgArr
     * 同款）。getter 形态 + Object.defineProperty 换写等价（writable/enumerable/
     * configurable 与引擎 __static 数据属性一致）。
     */
    public static get instance(): ModelAntiAddiction {
        var v = new ModelAntiAddiction();
        Object.defineProperty(ModelAntiAddiction, "instance", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 return 前注册 o(a,e(10787),i)（池化，i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelAntiAddiction, "sg.model.ModelAntiAddiction", null, null);
