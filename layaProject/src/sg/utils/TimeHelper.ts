/**
 * sg.utils.TimeHelper —— 服务器时区/时间轴静态工具（倒计时字典、日期/时长格式化、
 * 开服偏移、`!-H:mm-!` 时区占位改写；批次 O，F8 第 14 次边界死点本体）。
 *
 * 原文：code1.js 字节 [1144580,1148655)（ps= 声明器 @1144577，0 参 IIFE，注册
 * o(t,"sg.utils.TimeHelper") 2 参字面量形态，无基类、空构造器）。前邻
 * `…"jj_ad"!=Rt.pf||(t=!0),t},t}()`、后邻 vs=sg.utils.Tools（批次 B ✓）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-o/TimeHelper.js
 *
 * 入批依据：F8 第 14 次边界 `Cannot read properties of undefined (reading
 * 'changeConfigTime')` at Tools.replaceMsg（Tools.js:173 ← getMsgById:159 ←
 * ViewLoad.newVersion getter:780 ← onFrameLoop:334，装载循环退出闸门）——
 * Tools.replaceMsg 对每次取串成功的 getMsgById 无条件调 `ps.changeConfigTime(i)`
 * （原文闭包引用；批次 B 译文经 sg.utils.TimeHelper 全局路径，本类注册即接通）。
 *
 * 身份（resolve_o.js，acorn 作用域链；自由变量全解析）：
 *   vs=sg.utils.Tools（B ✓）、gs=sg.utils.StringUtil（B ✓）、Gt=sg.cfg.ConfigServer
 *   （B ✓）、s=Laya（s.timer.loop/clear）、o=Laya.class、sg 全局、t=自引、
 *   Date/Math/RegExp/String/parseInt/parseFloat/console 内建。
 * 声明器单一 CallExpression（`}(),ps=function(){…}(),vs=` 字节实证，非 Ee 式逗号双跳）。
 *
 * 保真注记（求值序专项见 batch-o-report.md §5）：
 * - countDown 内层 h 的形参 t 遮蔽类变量（原文），TS 类名 TimeHelper 无遮蔽；
 *   `t.totalTime<=0&&(t.complete&&t.complete.run(),…removeCountDown(t.text))`
 *   的 && 副作用链逐段保留；
 * - `"mode"in(n=n||{})||(n.mode=2)` 赋值入 in 判定、`n.interval=n.interval||1e3`、
 *   `i.timeHelp_countDownId=t._countDownGlobal++` 后置自增原样；
 * - remainTimeStr 的 `(a=timeFormat("d:H",i).split(":").map(parseFloat))[0]+n+
 *   (a[1]?a[1]+h:"")` 括号内赋值再取下标 + 嵌套三元原样（ViewLoad.onFrameLoop
 *   丢括号勘误的同形防护点）；
 * - getTimeStamp/getSplicingTimeStamp 的 `(h=h.map(function(t){return parseInt(t)}))[1]-=1`
 *   括号内赋值再复合下标赋值原样；
 * - formatWithOptions 的 `if(e=new RegExp("("+s+")").exec(t))` 条件内赋值保留；
 * - changeZoneStrOne 的 return 为六段逗号表达式（含 `2==e.length&&s.setMinutes(…)`、
 *   `2==e.length&&(i+=":"+…)` 两处 && 副作用、s/i 形参回写），split 的正则
 *   `/\:|：/g` 含全角冒号 U+FF1A（原文字节 ef bc 9a 实证），逐字节照抄；
 * - 原文 countDown/removeCountDown 内两处 `sg.utils.TimeHelper.*` 全局路径自引
 *   → TS 类标识符直引（batch-i Facade 先例，注册后同一对象）；
 * - dateFormat/timeFormat/remainTimeStr/getTimeStamp 内局部 var s/形参 s 遮蔽
 *   UMD 的 s=Laya（这些方法不用 Laya 面），局部名照抄；countDown 的 s.timer
 *   为 Laya.timer（无遮蔽）；
 * - 静态字段尾部赋值序照抄：countDownDic={} → _countDownGlobal=1 →
 *   TYPE_CHINESE/TYPE_NORMAL/TYPE_CHINESE_ONE。
 */

import { Tools } from "./Tools";
import { StringUtil } from "./StringUtil";
import { ConfigServer } from "../cfg/ConfigServer";

export class TimeHelper {

    /** 倒计时注册：先移除同宿主旧计时，再挂 timer.loop；内层 h 为帧回调（原文形参 t 遮蔽类变量） */
    public static countDown(i: any, e: any, n?: any): void {
        TimeHelper.removeCountDown(i);
        var h = function (t: any) {
            t.totalTime -= t.interval,
                t.update ? t.update.runWith(Tools.getTimeStyle(t.totalTime, t.mode)) : Tools.textFitFontSize(t.text, Tools.getTimeStyle(t.totalTime, t.mode)),
                t.totalTime <= 0 && (t.complete && t.complete.run(), TimeHelper.removeCountDown(t.text));
        };
        "mode" in (n = n || {}) || (n.mode = 2),
            n.interval = n.interval || 1e3,
            n.loopFun = h,
            n.text = i,
            n.totalTime = e + n.interval,
            i.timeHelp_countDownId = TimeHelper._countDownGlobal++,
            TimeHelper.countDownDic[i.timeHelp_countDownId] = n,
            Laya.timer.loop(n.interval, i, h, [n]),
            h(n);
    }

    public static removeCountDown(i: any): void {
        i && TimeHelper.countDownDic[i.timeHelp_countDownId] && (
            Laya.timer.clear(i, TimeHelper.countDownDic[i.timeHelp_countDownId].loopFun),
            delete TimeHelper.countDownDic[i.timeHelp_countDownId]);
    }

    /** Date → "yyyy-MM-dd HH:mm:ss" 类格式（y+/M+/d+/H+/m+/s+ 占位） */
    public static dateFormat(i: any, e: any): any {
        var s = new Date(e),
            n = {
                "y+": s.getFullYear().toString(),
                "M+": (s.getMonth() + 1).toString(),
                "d+": s.getDate().toString(),
                "H+": s.getHours().toString(),
                "m+": s.getMinutes().toString(),
                "s+": s.getSeconds().toString()
            };
        return TimeHelper.formatWithOptions(i, n);
    }

    /** 毫秒时长 → "d:H:m:s"（占位命中才逐级取模；未命中保留整段） */
    public static timeFormat(i: any, e: any): any {
        var s = Math.floor(e / Tools.oneDayMilli);
        -1 !== i.indexOf("d") && (e %= Tools.oneDayMilli);
        var n = Math.floor(e / Tools.oneHourMilli);
        -1 !== i.indexOf("H") && (e %= Tools.oneHourMilli);
        var h = Math.floor(e / Tools.oneMinuteMilli);
        -1 !== i.indexOf("m") && (e %= Tools.oneMinuteMilli);
        var o = Math.floor(e / 1e3),
            r = { "d+": String(s), "H+": String(n), "m+": String(h), "s+": String(o) };
        return TimeHelper.formatWithOptions(i, r);
    }

    /** 占位表替换：`if(e=new RegExp("("+s+")").exec(t))` 条件内赋值（原文保留） */
    public static formatWithOptions(t: any, i: any): any {
        var e: any;
        for (var s in i)
            if (e = new RegExp("(" + s + ")").exec(t)) {
                var n = e[1],
                    h = i[s];
                n.length > 1 && (h = StringUtil.padding(h, n.length, "0", !1)),
                    t = t.replace(n, h);
            }
        return t;
    }

    /** 剩余时长文案（normal/chinese/chinese_one 三模式；chinese 分支括号内赋值再取下标） */
    public static remainTimeStr(i: any, e?: any, s?: any): any {
        void 0 === e && (e = "chinese"),
            void 0 === s && (s = !1);
        var n = Tools.getMsgById("_public111"),
            h = Tools.getMsgById("_public108"),
            o = Tools.getMsgById("_public109"),
            r = Tools.getMsgById("_public112");
        switch (e) {
            case "normal":
                return i >= Tools.oneDayMilli ? Math.floor(i / Tools.oneHourMilli) + TimeHelper.timeFormat(":mm:ss", i % Tools.oneHourMilli) : TimeHelper.timeFormat("HH:mm:ss", i);
            case "chinese":
                var a: any = null;
                return i >= Tools.oneDayMilli ? (a = TimeHelper.timeFormat("d:H", i).split(":").map(parseFloat))[0] + n + (a[1] ? a[1] + h : "")
                    : i >= Tools.oneHourMilli ? (a = TimeHelper.timeFormat("H:m", i).split(":").map(parseFloat))[0] + h + (a[1] ? a[1] + o : "")
                        : i >= Tools.oneMinuteMilli ? (a = TimeHelper.timeFormat("m:s", i).split(":").map(parseFloat))[0] + o + (a[1] ? a[1] + r : "")
                            : Math.floor(i / 1e3) + r;
            case "chinese_one":
                return i >= Tools.oneDayMilli ? TimeHelper.timeFormat("d:H", i).split(":")[0] + n
                    : i >= Tools.oneHourMilli ? TimeHelper.timeFormat("H:m", i).split(":")[0] + h
                        : i >= Tools.oneMinuteMilli ? TimeHelper.timeFormat("m:s", i).split(":")[0] + o
                            : Math.floor(i / 1e3) + r;
            default:
                console.warn("TimeHelper formatTime");
        }
        return "";
    }

    /** {$datetime:"yyyy-M-d H:m:s"} → 服务器时区校正的时间戳 */
    public static getTimeStamp(i: any): any {
        var e: any = null,
            s = i.$datetime,
            n = /(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/;
        if (n.test(s)) {
            var h = s.match(n).slice(1, 8);
            (h = h.map(function (t: any) { return parseInt(t); }))[1] -= 1,
                e = new Date(h[0], h[1], h[2], h[3], h[4], h[5]);
        } else
            e = new Date(s);
        return e.getTime() - TimeHelper.getOffsetMin() * Tools.oneMinuteMilli;
    }

    public static getDeviationMs(): any {
        return (ConfigServer.system_simple.deviation - TimeHelper.getOffsetMin()) * Tools.oneMinuteMilli;
    }

    /** 服务器时区偏移分钟数（server_time_zone 配置缺失 → 0） */
    public static getOffsetMin(): any {
        return ConfigServer.system_simple && ConfigServer.system_simple.server_time_zone ? 60 * ConfigServer.system_simple.server_time_zone + (new Date).getTimezoneOffset() : 0;
    }

    /** `!-H:mm-!` 时区占位整体改写（装载文案经 Tools.replaceMsg 无条件触达） */
    public static changeConfigTime(t: any): any {
        var i = /!-(\S+?)-!/g;
        return i.test(t) ? t.replace(i, function (t: any, i: any) { return TimeHelper.changeZoneStrOne(i); }) : t;
    }

    /** "H:mm"/"H" 服务器时区 → 本地时区改写（return 六段逗号表达式原文保留） */
    public static changeZoneStrOne(i: any): any {
        var e = i.split(/\:|：/g),
            s = new Date;
        return s.setHours(parseInt(e[0])),
            2 == e.length && s.setMinutes(parseInt(e[1])),
            s = new Date(s.getTime() - TimeHelper.getOffsetMin() * Tools.oneMinuteMilli),
            i = StringUtil.padding(String(s.getHours()), 2, "0", !1),
            2 == e.length && (i += ":" + StringUtil.padding(String(s.getMinutes()), 2, "0", !1)),
            i;
    }

    /** {$datetime:"yyyy-M-d H:m:s"} + 指定 [H,m] → 服务器时区校正时间戳 */
    public static getSplicingTimeStamp(i: any, e: any): any {
        var s: any = null,
            n = i.$datetime,
            h = /(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/;
        if (h.test(n)) {
            var o = n.match(h).slice(1, 8);
            (o = o.map(function (t: any) { return parseInt(t); }))[1] -= 1,
                s = new Date(o[0], o[1], o[2], e[0], e[1], 0);
        } else
            s = new Date(n);
        return s.getTime() - TimeHelper.getOffsetMin() * Tools.oneMinuteMilli;
    }

    /* ---- 静态字段（原文尾部赋值序） ---- */
    public static countDownDic: any = {};
    public static _countDownGlobal: number = 1;
    public static TYPE_CHINESE: string = "chinese";
    public static TYPE_NORMAL: string = "normal";
    public static TYPE_CHINESE_ONE: string = "chinese_one";
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.TimeHelper")（2 参，无基类）。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(TimeHelper, "sg.utils.TimeHelper", null, null);
