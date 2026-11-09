/**
 * sg.utils.Tools —— 全局静态工具集：消息取串（getMsgById + 本地语言包回退）、
 * URL 参数、时间轴（开服/赛季/跨天偏差）、数字/折扣格式、多语言文本自适应
 * （textFitFontSize/Layout/ArtFont/LabelFont）、支付排序、弹窗去重、箭头/分割线等杂项。
 *
 * 原文：code1.js 字节 [1148661,1176061]（包装变量 vs，2 参注册，池化名 t(1377)="sg.utils.Tools"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/Tools.js
 *
 * 依赖（批次 A/B 已译模块，直引）：
 *   Gt=ConfigServer(B)、Rt=ConfigApp(B)、ue=ModelManager(B)、cs=ObjectUtil(B)、
 *   be=TestUtils(B)、gs=StringUtil(B)、Ze=ArrayUtil(B)、us=SaveLocal(B)、Ts=Trace(B)、
 *   tn=ViewManager(A)、pn=NetSocket(B)、re=AssetsManager(B)、ae=ColorManager(B)、le=EffectManager(B)。
 * 引擎别名：m=laya.utils.Browser、Mt=laya.utils.Utils、M=laya.display.css.Font、
 *   ht=laya.maths.Rectangle、F=laya.ui.Image、U=laya.html.dom.HTMLDivElement、
 *   W=laya.ui.Label、_=laya.ui.Box、P=laya.utils.Handler、s=Laya（stage）。
 * 批次外（经全局注册路径调用期解析，声明见 sg-externals-b.d.ts / sg-externals.d.ts）：
 *   Kr=sg.model.ModelUser、nr=sg.model.ModelEquip、yr=sg.model.ModelItem、
 *   ss=sg.utils.FunMsgByValue、ge=sg.map.utils.ArrayUtils、ps=sg.utils.TimeHelper、
 *   ds=sg.utils.ServerDate、ye=sg.map.utils.Math2、Vi=sg.god.model.ModelGodAct、
 *   ws=sg.zmPlatform.ConstantZM、Ut=Laya.Platform。
 * 原文大量经 sg.utils.Tools.xxx 全局路径自引 → TS 化后本模块内等价类直引
 * （batch-a-report.md §6.4 同款）；langData/zoneName/oneHourMilli 等惰性静态经
 * r(1,i,...)/h(i,[...]) 注册，按 ViewScenes.TOP_HEIGHT 同款 defineProperty 精确缓存换写。
 * 原文拼写保留：isCanGetRward / textSytle / textSytle2。
 */
import Browser = laya.utils.Browser;
import Utils = laya.utils.Utils;
import Font = laya.display.css.Font;
import Rectangle = laya.maths.Rectangle;
import Image = laya.ui.Image;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import Label = laya.ui.Label;
import Box = laya.ui.Box;
import Handler = laya.utils.Handler;
import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigApp } from "../cfg/ConfigApp";
import { ModelManager } from "../manager/ModelManager";
import { ViewManager } from "../manager/ViewManager";
import { AssetsManager } from "../manager/AssetsManager";
import { ColorManager } from "../manager/ColorManager";
import { EffectManager } from "../manager/EffectManager";
import { NetSocket } from "../net/NetSocket";
import { ObjectUtil } from "./ObjectUtil";
import { ArrayUtil } from "./ArrayUtil";
import { StringUtil } from "./StringUtil";
import { SaveLocal } from "./SaveLocal";
import { TestUtils } from "../map/utils/TestUtils";
import { Trace } from "../laya/Trace";

export class Tools {

    constructor() {
    }

    /** r(1,i,"langData",…) —— 输入法语言表：input_lang_pf[pf] 覆盖默认，附 name_limit 约束 */
    public static get langData(): any[] {
        var e = ConfigServer.system_simple, s = ConfigApp.pf, n = e.input_lang_default;
        typeof n == "string" && (n = [n]);
        var h = e.input_lang_pf[s];
        h instanceof Array && h.length && (n = h);
        var o = e.name_limit || { cn: ["一-龥", 2, 5], en: ["a-zA-Z·", 1, 10] };
        var v = n.map(function (t: any) {
            var s = ["", 1, 10];
            return o[t] && (s = ObjectUtil.clone(o[t])), s.unshift(t), s;
        });
        Object.defineProperty(Tools, "langData", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** r(1,i,"zoneName",…) —— 当前登录区名（有合服表时取配置名，否则原始 zone） */
    public static get zoneName(): any {
        var e = ModelManager.instance.modelUser;
        return e.zone && ConfigServer.zone ? ConfigServer.getServerName(e.zone) : e.zone;
    }

    /** URL/启动参数读取：小游戏环境直接取 window 上的启动参数，否则解析 location.search */
    public static getURLexp(e: string): any {
        if (Browser.onMiniGame || (<any>Browser).onTTMiniGame) {
            var n: any = Browser.window;
            return n && n[e] ? n[e] : "";
        }
        return Tools.getQueryParams()[e] || "";
    }

    /** location.search → 对象（decodeURIComponent，缓存于 _queryParams） */
    public static getQueryParams(): any {
        if (!Tools._queryParams) {
            var s: any = Browser.window;
            if (s && s.location && s.location.search) {
                Tools._queryParams = {};
                for (var n = s.location.search.substr(1), h = /([^&=]+)(=([^&]*))/g; ;) {
                    var o = h.exec(n);
                    if (!o) break;
                    Tools._queryParams[decodeURIComponent(o[1])] = decodeURIComponent(o[3]);
                }
            }
        }
        return Tools._queryParams || {};
    }

    /** 取不在排除表内的全部 URL 参数 */
    public static getURLexpToObj(e: any): any {
        var n = {}, h = Tools.getQueryParams();
        for (var o in h) {
            var r = h[o];
            -1 === e.indexOf(o) && (n[o] = r);
        }
        return n;
    }

    /** 参数签名：按 key 排序拼接值后 md5（注意：原文对字符串 key 用数值比较器排序，
     * t-i 对字符串恒为 NaN → 实际保持插入序，原文如此，保留）。sign 键跳过。 */
    public static signValue(i: any): any {
        var e = "", n = [];
        for (var h in i) h != "sign" && n.push(h);
        n.sort(function (t: any, i: any) {
            return t - i;
        });
        for (var o = n.length, r = 0; r < o; r++) e += i[n[r]];
        return (<any>Browser.window).md5(e);
    }

    /** 安全销毁（已销毁/空跳过） */
    public static destroy(i: any): void {
        null == i || i.destroyed || i.destroy();
    }

    /** 颜色配置名 → 本地化文本 */
    public static getColorInfo(i: any): any {
        return Tools.getMsgById(ConfigServer.system_simple.color_info[i]);
    }

    public static hasMsgById(i: any): boolean {
        return Tools.sMsgDic.hasOwnProperty(i + "");
    }

    /** 取消息串：sMsgDic（配 Desm 解密）→ sMsgLocalDic（本地语言包）回退；
     * isTestMsg=1 原样返回 id；=2 追加随机测试后缀。 */
    public static getMsgById(e: any, s?: any, n?: any): any {
        void 0 === n && (n = !0);
        var o = e + "";
        if (Tools.isNullString(o))
            return "";
        if (1 == TestUtils.isTestMsg)
            return o;
        var r = Tools.getStr(Tools.sMsgDic, o, n);
        return Tools.isNullString(r)
            ? (r = Tools.getStr(Tools.sMsgLocalDic, o, n),
                Tools.isNullString(r)
                    ? ("" != r && (r += Tools.getMsgById("msg_Tools_0") + o), r)
                    : Tools.replaceMsg(r, s))
            : 2 == TestUtils.isTestMsg
                ? Tools.replaceMsg(r, s) + (Math.random() > .2 ? Math.random() > .3 ? Math.random() > .5 ? "one two three" : r + r : "123" : "")
                : Tools.replaceMsg(r, s);
    }

    /** 字典取串 + Desm 解密（宿主 sg.god.model.ModelGodAct，批次外全局路径） */
    public static getStr(i: any, e: any, s?: any): any {
        void 0 === s && (s = !0);
        var h = "";
        return i && i.hasOwnProperty(e) && (h = i[e], h = sg.god.model.ModelGodAct.desm(h, e)),
            h || s || (h = e), h;
    }

    /** {country}/{xyz} 占位替换 + TimeHelper.changeConfigTime + 逐参 msg_replace_func */
    public static replaceMsg(i: any, e?: any): any {
        var n = /\{country\}/g;
        if (n.test(i) && (i = i.replace(n, (<any>sg.model.ModelUser).country_name2[sg.model.ModelUser.getCountryID()])),
            (n = /\{xyz\}/g).test(i) && (i = i.replace(n, ModelManager.instance.modelCountryPvp.title)),
            i = sg.utils.TimeHelper.changeConfigTime(i),
            e)
            for (var h = 0; h < e.length; h++) {
                var o = e[h];
                i = sg.utils.FunMsgByValue.msg_replace_func(i, h, o);
            }
        return i;
    }

    public static isNullString(e: any): boolean {
        var n = !1;
        return (Tools.isNullObj(e) || "" == e || e == "undefined") && (n = !0), n;
    }

    public static isNullObj(t: any): boolean {
        return !t || null == t || null == t;
    }

    public static copyObj(i: any): any {
        return ObjectUtil.mergeObjects([i]);
    }

    public static getTimeStamp(i: any): any {
        return i && typeof i == "object" ? sg.utils.TimeHelper.getTimeStamp(i) : Utils.parseInt(i);
    }

    public static getTimeDate(i: any): any {
        return { $datetime: new sg.utils.ServerDate(i).toServerTimeString() };
    }

    public static getOpenTimesInfo(e: any): any {
        var n = 0, h = e.length, o = "";
        for (n = 0; n < h; n++) {
            var r = e[n];
            o += Tools.getOpenTimeInfo(r), n < h - 1 && (o += "，");
        }
        return o;
    }

    /** 开服时间段 [H,m] 或 [H,m,H,m] → "HH:mm-HH:mm"；开头两次 getMsgById
     * 结果未用（原文如此，疑似预热语言包，保留） */
    public static getOpenTimeInfo(e: any): any {
        Tools.getMsgById("_public108"), Tools.getMsgById("_public109");
        return 4 === e.length && (e = [e.slice(0, 2), e.slice(2, 4)]),
            2 === e.length
                ? (e = e.map(function (t: any) {
                    return sg.utils.TimeHelper.dateFormat("HH:mm", Tools.getToDayHourMill(t));
                })).join("-")
                : "";
    }

    /** 剩余时间样式（2 中文/3 普通/4 dHms 带单位/5 mm:ss/6 HH:mm/7 中文单字）；
     * 非正数时 2/5 样式返回 "---"，其余 "00:00:00"（池化解码 t(12159)/t(17582)）。 */
    public static getTimeStyle(i: any, e?: any): any {
        void 0 === e && (e = 2);
        if (i <= 0)
            return 2 == e || 5 == e ? "---" : "00:00:00";
        var n = Tools.getMsgById("_public111"), h = Tools.getMsgById("_public108"),
            o = Tools.getMsgById("_public109"), r = Tools.getMsgById("_public112");
        if (2 === e)
            return sg.utils.TimeHelper.remainTimeStr(i, "chinese");
        if (3 === e)
            return sg.utils.TimeHelper.remainTimeStr(i, "normal");
        if (4 === e) {
            var a = sg.utils.TimeHelper.timeFormat("d:H:m:s", i).split(":");
            return a[0] + n + a[1] + h + a[2] + o + a[3] + r;
        }
        return 5 === e ? sg.utils.TimeHelper.dateFormat("mm:ss", i)
            : 6 === e ? sg.utils.TimeHelper.dateFormat("HH:mm", i)
                : 7 === e ? sg.utils.TimeHelper.remainTimeStr(i, "chinese_one")
                    : "";
    }

    public static toCeil(i: any): any {
        return Math.ceil(Number(i.toFixed(5)));
    }

    /** 数字串格式：s>0 向上/s<0 向下取整到 e 位；再按容差选最小定点位数 */
    public static numberFormat(i: any, e?: any, s?: any): any {
        void 0 === e && (e = 0), void 0 === s && (s = 0);
        if (typeof i != "number")
            return "null";
        var h = 0;
        if (s) {
            var o = Math.pow(.1, e);
            i /= o, i = s > 0 ? Math.ceil(i) : Math.floor(i), i *= o;
        }
        if (e > 0) {
            var r = .5 * Math.pow(.1, e);
            for (h = 0; h < e; h++) {
                var a = parseFloat(i.toFixed(h));
                if (Math.abs(i - a) < r) break;
            }
        }
        return i.toFixed(h);
    }

    public static percentFormat(e: any, s?: any, n?: any, h?: any, o?: any): any {
        void 0 === s && (s = 0), void 0 === n && (n = !1), void 0 === h && (h = 0), void 0 === o && (o = "%");
        e *= 100;
        var r = Tools.numberFormat(e, s, h) + o;
        return n && e >= 0 && (r = "+" + r), r;
    }

    public static addSign(t: any): string {
        var i = t + "";
        return t >= 0 && (i = "+" + i), i;
    }

    /** 日期格式（模式 0 按语言：en/ar/viet/bahasa 用 yyyy-MM-dd，否则本地化
     * msg_Tools_1 模板；1-5 固定格式） */
    public static dateFormat(e: any, s?: any): any {
        void 0 === s && (s = 0);
        var h = Tools.getTimeStamp(e);
        if (h) {
            if (0 == s) {
                var o = ConfigApp.lan();
                return -1 != ["en", "ar", "viet", "bahasa"].indexOf(o)
                    ? sg.utils.TimeHelper.dateFormat("yyyy-MM-dd HH:mm:ss", h)
                    : sg.utils.TimeHelper.dateFormat(Tools.getMsgById("msg_Tools_1", ["yyyy", "MM", "dd"]) + " HH:mm:ss", h);
            }
            if (1 == s) return sg.utils.TimeHelper.dateFormat("yyyy-MM-dd HH:mm:ss", h);
            if (2 == s) return sg.utils.TimeHelper.dateFormat("HH:mm:ss", h);
            if (3 == s) return sg.utils.TimeHelper.dateFormat("yyyy-MM-dd", h);
            if (4 == s) return sg.utils.TimeHelper.dateFormat("HH:mm", h);
            if (5 == s) return sg.utils.TimeHelper.dateFormat("yyyy/MM/dd", h);
        }
        return "";
    }

    public static getObjValue(i: any, e: any, s: any): any {
        return i && i.hasOwnProperty(e) && i[e] ? i[e] : s;
    }

    /** 是否已跨“游戏日”（含开服偏差校准） */
    public static isNewDay(e: any): boolean {
        var n = 0;
        typeof e == "number" ? n = e : typeof e == "object" && (n = Tools.getTimeStamp(e));
        var h = Tools.getGameDayDeviationTime(ConfigServer.getServerTimer()), o = h, r = h + Tools.oneDayMilli;
        return n < o || n >= r;
    }

    public static getRemainTime(e: any): any {
        return Tools.getTimeStamp(e) - ConfigServer.getServerTimer();
    }

    public static getDayDisTime(e?: any): any {
        void 0 === e && (e = 0);
        var n = 0 == e ? ConfigServer.getServerTimer() : e;
        return Tools.getGameDayDeviationTime(n) + Tools.oneDayMilli - n;
    }

    /** 服务器时差 [小时, 分钟]（system_simple.deviation，分钟计） */
    public static deviationTime(): number[] {
        var e = ConfigServer.system_simple ? ConfigServer.system_simple.deviation : 0;
        return [Math.floor(e / 60), e % 60];
    }

    /** 把 {$datetime: "…HH:mm:ss"} 串改为服务器时差时间（正则替换末段 hh:mm:ss） */
    public static change2Deviation(e: any): any {
        var n = Tools.deviationTime();
        n.push(0);
        var h = n.map(function (t: any) {
            return StringUtil.padding(String(t), 2, "0", !1);
        }).join(":");
        return e && e.$datetime && (e.$datetime = e.$datetime.replace(/\d{2}:\d{2}:\d{2}/, h)), e;
    }

    /** 当日 0 点（服务器时差校准）+偏差；若时间戳落在“昨日 0 点+偏差”之前则回退一日 */
    public static getGameDayDeviationTime(e: any): any {
        var n = Tools.getTimeStamp(e), h = ConfigServer.system_simple.deviation * Tools.oneMinuteMilli,
            o = new sg.utils.ServerDate(n);
        o.setHours(0, 0, 0, 0);
        var r = o.getTime() + h;
        return n < r ? r - Tools.oneDayMilli : r;
    }

    public static getGameServerStartTimer(i: any): any {
        var s = Tools.getTimeStamp(ConfigServer.zone["" + i][2]);
        return Tools.getGameDayDeviationTime(s);
    }

    public static getSeasonTimes(e: any): any {
        var n = Tools.getGameDayDeviationTime(ConfigServer.getServerTimer()), h = new sg.utils.ServerDate(n);
        return Tools.getYearDis(e, [h.getHours(), h.getMinutes()]);
    }

    public static howTimeToNow(e: any): any {
        var n = ConfigServer.getServerTimer() - e;
        return n < Tools.oneHourMilli
            ? Math.ceil(n / Tools.oneMinuteMilli) + Tools.getMsgById("msg_Tools_5")
            : n > Tools.oneHourMilli && n < Tools.oneDayMilli
                ? Math.floor(n / Tools.oneHourMilli) + Tools.getMsgById("msg_Tools_3")
                : Math.floor(n / Tools.oneDayMilli) + Tools.getMsgById("msg_Tools_2");
    }

    /** 与 howTimeToNow 逐字相同（原文重复实现，保留） */
    public static howTimeToNowMinutes(e: any): any {
        var n = ConfigServer.getServerTimer() - e;
        return n < Tools.oneHourMilli
            ? Math.ceil(n / Tools.oneMinuteMilli) + Tools.getMsgById("msg_Tools_5")
            : n > Tools.oneHourMilli && n < Tools.oneDayMilli
                ? Math.floor(n / Tools.oneHourMilli) + Tools.getMsgById("msg_Tools_3")
                : Math.floor(n / Tools.oneDayMilli) + Tools.getMsgById("msg_Tools_2");
    }

    /** 货币/道具是否够付：基础资源走 modelUser 直读，其余走 property；不足弹提示
     * （消息 id 池化解码 n(6645)="_public95_2"/n(15097)="_public95_1"，按数量 1 选二） */
    public static isCanBuy(i: any, e: any, s?: any): boolean {
        void 0 === s && (s = !0);
        var h = "";
        if (0 == e)
            return !0;
        if (i == "coin" || i == "gold" || i == "food" || i == "wood" || i == "iron" || i == "merit")
            return !(ModelManager.instance.modelUser[i] < e) || (
                h = ModelManager.instance.modelProp.getItemProp(i).name,
                s && ViewManager.instance.showTipsTxt(Tools.getMsgById(1 == e ? "_public95_2" : "_public95_1", [h, e])),
                !1);
        var o = ModelManager.instance.modelUser.property;
        return !!(o[i] && o[i] >= e) || (
            h = ModelManager.instance.modelProp.getItemProp(i).name,
            s && ViewManager.instance.showTipsTxt(Tools.getMsgById(1 == e ? "_public95_2" : "_public95_1", [h, e])),
            !1);
    }

    /** 可领判定：item→ModelEquip.canBuyEquipItem（批次外全局路径）、equip→已持有提示、
     * hero→已觉醒提示（原文拼写 Rward） */
    public static isCanGetRward(i: any, e?: any): boolean {
        void 0 === e && (e = !1);
        var n = !0, h = "";
        if (-1 != i.indexOf("item")) n = sg.model.ModelEquip.canBuyEquipItem(i, e);
        else if (-1 != i.indexOf("equip"))
            h = (n = Tools.isNullObj(ModelManager.instance.modelUser.equip[i])) ? "" : Tools.getMsgById("_jia0173");
        else if (-1 != i.indexOf("hero")) {
            var o = ModelManager.instance.modelGame.getModelHero(i);
            o && o.getAwaken() > 0 && (n = !1, h = Tools.getMsgById("_jia0174"));
        }
        return e && "" != h && ViewManager.instance.showTipsTxt(h), n;
    }

    public static getNameByID(i: any): any {
        return ModelManager.instance.modelProp.getItemProp(i).name;
    }

    /** 大数缩写（en/ar 与中文两套阈值；原文拼写 textSytle） */
    public static textSytle(i: any): any {
        var s = Math.pow(10, 3), n = Math.pow(10, 4), h = Math.pow(10, 6),
            o = Math.pow(10, 7), r = Math.pow(10, 8), a = Math.pow(10, 9), l = ConfigApp.lan();
        if ("en" === l || "ar" === l) {
            if (i >= 1 * a) return (i = Math.floor(i / a)) + Tools.getMsgById("msg_Tools_11");
            if (i >= 10 * h) return (i = Math.floor(i / h)) + Tools.getMsgById("msg_Tools_10");
            if (i >= 100 * s) return (i = Math.floor(i / s)) + Tools.getMsgById("msg_Tools_9");
        } else {
            if (i >= r) return (i = Math.floor(i / r)) + Tools.getMsgById("msg_Tools_7");
            if (i >= o) return (i = Math.floor(i / o)) + Tools.getMsgById("msg_Tools_4");
            if (i >= 10 * n) return (i = Math.floor(i / n)) + Tools.getMsgById("msg_Tools_6");
        }
        return i + "";
    }

    /** 大数缩写两档（万/亿，原文拼写 textSytle2） */
    public static textSytle2(i: any): any {
        var s = Math.pow(10, 4), n = Math.pow(10, 8);
        return i < 10 * s ? i + ""
            : i >= 10 * n ? (i = Math.floor(i / n)) + Tools.getMsgById("msg_Tools_7")
                : i >= 10 * s ? (i = Math.floor(i / s)) + Tools.getMsgById("msg_Tools_6")
                    : i + "";
    }

    /** 字典长度；for-in 内 t[s] 为无效果求值（原文如此，保留） */
    public static getDictLength(t: any, i?: boolean): number {
        void 0 === i && (i = !1);
        var e = 0;
        for (var s in t) if (t[s], e += 1, i && e > 0) return e;
        return e;
    }

    /** 到点执行：距 i 已超 e 毫秒则立刻 run 并返回当前服务器时间，否则原样返回 i */
    public static runAtTimer(i: any, e: any, s: any): any {
        var h = ConfigServer.getServerTimer();
        return h - i >= e ? (s.run(), h) : i;
    }

    /** 高度>1280 的屏幕：按比例放大并（默认）居中 */
    public static check1280Img(i: any, e?: any): void {
        void 0 === e && (e = !1);
        var h = Laya.stage.height;
        if (h > 1280) {
            var o = h / 1280;
            i.scale(o, o);
        }
        !e && (i.centerX = 0, i.centerY = 0);
    }

    /** 支付项排序：material_pay_index 命中的排最前（h==0），道具再按配置 index 细排 */
    public static getPayItemArr(e: any): any[] {
        var n = [], h = -1;
        for (var o in e) {
            var r = -1;
            if (0 == (h = Tools.material_pay_index.indexOf(o.indexOf("item") > -1 ? "item" : o))) {
                var a = ModelManager.instance.modelProp.getItemProp(o);
                a && (r = a.index);
            }
            n.push({ sortIndex: h, sortIndex2: r, id: o, data: e[o] });
        }
        return sg.map.utils.ArrayUtils.sortOn(["sortIndex", "sortIndex2"], n, !1, !1), n;
    }

    public static isSameArr(i: any, e: any, s?: boolean): boolean {
        void 0 === s && (s = !1);
        var h = !1;
        if (i && e && i.length == e.length) {
            var o = i.length;
            s && (i.sort(function (t: any, i: any) {
                return t - i;
            }), e.sort(function (t: any, i: any) {
                return t - i;
            }));
            h = !0;
            for (var r = 0; r < o; r++) if (i[r] != e[r]) {
                h = !1;
                break;
            }
        }
        return h;
    }

    public static isDiffHour(e: any, s: any): boolean {
        var h = Math.floor(e / Tools.oneHourMilli), o = Math.floor(s / Tools.oneHourMilli);
        return Math.abs(h - o) > 0;
    }

    public static getMsNextHourMs(e: any): any {
        return (Math.floor(e / Tools.oneHourMilli) + 1) * Tools.oneHourMilli;
    }

    /** 距“下个季节刷新点 e=[H,m]”的毫秒数（含赛季差 _ 档位换算与时差校准；
     * n 传入时按 getGameTime 换算赛季，否则当前赛季） */
    public static getYearDis(e: any, s: any, n?: any): any {
        void 0 === n && (n = 0);
        var o, r = ModelManager.instance.modelUser,
            a = 0 != n ? (Math.ceil(r.getGameTime(n) / Tools.oneDayMilli) - 1) % 4 : r.getGameSeason(),
            l = new sg.utils.ServerDate(0 != n ? n : ConfigServer.getServerTimer()),
            c = l.getHours() * Tools.oneHourMilli + l.getMinutes() * Tools.oneMinuteMilli
                + 1e3 * l.getSeconds() + l.getMilliseconds(),
            u = s[0] * Tools.oneHourMilli + s[1] * Tools.oneMinuteMilli,
            d = Tools.deviationTime()[0] * Tools.oneHourMilli + Tools.deviationTime()[1] * Tools.oneMinuteMilli,
            _ = 0;
        return Tools.getDayDisTime(n) < (u >= d ? Tools.oneDayMilli - (u - d) : d - u)
            ? a == e ? _ = 3 : a < e ? _ = e - a - 1 : a > e && (_ = 4 - (a - e + 1))
            : a == e ? _ = 0 : a < e ? _ = e - a : a > e && (_ = 4 - (a - e)),
            o = c > u ? Tools.oneDayMilli - (c - u) : u - c,
            _ * Tools.oneDayMilli + o;
    }

    public static getNextDayStamp(e: any): any {
        var n = ModelManager.instance.modelUser.getGameSeason(), h = new sg.utils.ServerDate(ConfigServer.getServerTimer());
        return h.getHours() * Tools.oneHourMilli + h.getMinutes() * Tools.oneMinuteMilli
            + 1e3 * h.getSeconds() + h.getMilliseconds() > e[0] * Tools.oneHourMilli + e[1] * Tools.oneMinuteMilli
            ? Tools.getYearDis(n + 1, e)
            : Tools.getYearDis(n, e);
    }

    public static getNextYearStamp(): any {
        var e = Tools.deviationTime();
        return Tools.getYearDis(0, e);
    }

    /** 距下个整点剩余毫秒 */
    public static getFullHourDis(): any {
        var s = ConfigServer.getServerTimer(), n = new sg.utils.ServerDate(s);
        return Tools.oneHourMilli - (n.getMinutes() * Tools.oneMinuteMilli + 1e3 * n.getSeconds());
    }

    public static getCityIDByName(i: any): any {
        for (var s in ConfigServer.city)
            if (Tools.getMsgById(ConfigServer.city[s].name) == i)
                return s;
        return " ";
    }

    /** 今日指定 [H,m(,dayOffset)] 的毫秒时间戳 */
    public static getToDayHourMill(i: any): any {
        var s = new sg.utils.ServerDate(ConfigServer.getServerTimer());
        s.setHours(i[0], i[1], 0, 0);
        var n = i[2] ? i[2] : 0;
        return s.getTime() + n * Tools.oneDayMilli;
    }

    public static getTodayMillWithHourAndMinute(i: any): any {
        var s = ModelManager.instance.modelUser,
            n = s.gameServerStartTimer + Tools.oneDayMilli * (s.getGameDate() - 1),
            h = new sg.utils.ServerDate(n);
        h.setHours(i[0], i[1], 0, 0);
        var o = h.getTime();
        return o < n ? o + Tools.oneDayMilli : o;
    }

    /** 记录“今日不再弹”的弹窗 key（本地存档，按 mUID 分档） */
    public static setAlertIsDel(i: any): void {
        if (i) {
            var s = SaveLocal.getValue("local_save_key_repeat_alert_" + ModelManager.instance.modelUser.mUID);
            s || (s = {}),
                s[i] = ConfigServer.getServerTimer(),
                SaveLocal.save("local_save_key_repeat_alert_" + ModelManager.instance.modelUser.mUID, s);
        }
    }

    public static checkAlertIsDel(i: any): boolean {
        var s = !1;
        if ("" != i) {
            var n = SaveLocal.getValue("local_save_key_repeat_alert_" + ModelManager.instance.modelUser.mUID);
            if (n && n[i]) {
                var h = n[i];
                !Tools.isNewDay(h) && (s = !0);
            }
        }
        return s;
    }

    /** 区间随机（排除表去重递归） */
    public static getRandom(e: any, s: any, n?: any): any {
        if (e == s)
            return e;
        if (s < e) {
            var o = s;
            s = e, e = o;
        }
        n || (n = []);
        var r = Math.random(), a = Math.floor(r * (s - e) + e);
        return -1 == n.indexOf(a) ? a : Tools.getRandom(e, s, n);
    }

    /** 随机分布测试（1e5 次，console.log 直方图） */
    public static testRandom(e: any, s: any): void {
        for (var h = {}, o = 0; o < 1e5; o++) {
            var r = Tools.getRandom(e, s);
            h[r] ? h[r] = h[r] + 1 : h[r] = 1;
        }
        console.log(h);
    }

    /** 名字输入检查：<2 字符提示，否则交平台屏蔽字（Laya.Platform 批次外） */
    public static checkNameInput(i: any, e: any): void {
        (i = StringUtil.trim(i)).length < 2
            ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_public128"))
            : (<any>Laya.Platform).shieldFont(i, e);
    }

    /** 平台可见性 [allow[], deny[]]：ConstantZM.platform 覆盖 pf 后判定 */
    public static checkVisibleByPF(i: any): boolean {
        if (!(i instanceof Array))
            return !0;
        var s = i[0], n = i[1], h = ConfigApp.pf;
        return sg.zmPlatform.ConstantZM.platform && (h = sg.zmPlatform.ConstantZM.platform),
            s && s.length ? -1 !== s.indexOf(h) : !n || !n.length || -1 === n.indexOf(h);
    }

    public static getTimeString(i: any): any {
        return i.map(function (t: any) {
            return StringUtil.padding(String(t), 2, "0", !1);
        }).join(":");
    }

    /** 图文并排布局（i 为图/富文本，e 为 Label，s 跟随标签，n 容器） */
    public static textLayout(i: any, e: any, s: any, n: any): void {
        i.width = i.textField.textWidth, n && (i.x = 0);
            if (e instanceof Label) {
                var o: any = e;
                s ? (
                s.x = i.x + i.width + 4,
                s.width < o.textField.textWidth && (s.width = o.textField.textWidth + 10),
                o.width = s.width, o.x = s.x, o.align = "center")
                : (o.width = o.textField.textWidth, o.x = i.x + i.width + 4, o.align = "left"),
                n && (n.width = i.width + o.width + 4);
        } else
            e.x = i.x + i.width + 8,
                s && (s.height <= e.height * e.scaleY
                    ? s.x = i.x + i.width + 4 + 22
                    : (s.x = i.x + i.width + 4, e.x = s.x + 10)),
                n && s && (n.width = s.x + s.width);
    }

    /** 标签自适应盒宽（e 文本载体，s 盒宽下限，h 附加宽，o 上限，r 居中开关） */
    public static textLayout2(e: any, s: any, n?: any, h?: any, o?: any, r?: any): void {
        void 0 === n && (n = 300), void 0 === h && (h = 250), void 0 === o && (o = 480), void 0 === r && (r = !0);
        var l = s.scaleX, c = n, u = o, d = h;
        e.width = e.textField.textWidth, s.width = e.width / l + d,
            s.width < c ? s.width = c : s.width > u && (
                s.width = u, e.width = (u - d) * l, e.align = "center", e.valign = "middle",
                Tools.textFitFontSize(e, null, e.width)),
            r ? s.centerX = e.centerX = 0 : e.x = (s.width - e.width) / 2;
    }

    public static textLayout3(i: any, e: any, s: any, n: any): void {
        i.x = 0, i.width = i.textField.textWidth,
            i.width < n.width && (
                s.width = n.width - i.width - 4, s.x = i.width + 4, e.width = s.width, e.x = s.x,
                e.align = "center");
    }

    /** Label → 等样式 HTMLDivElement（替换父子层级；e=true 时隐藏原 Label 并同位插入） */
    public static changeLabelToHTMLDivElement(i: any, e?: any): any {
        void 0 === e && (e = !0);
        if (!(i instanceof Label))
            return null;
        // originalFontSize/originalWidth/originalHeight 为运行时动态挂载属性（引擎 d.ts 无，
        // 原文裸赋值），n 取 any 与原文弱类型一致。
        var n: any = new HTMLDivElement();
        if (n.x = i.x, n.y = i.y, n.width = i.width, (<any>n).height = i.height,
            (<any>i).originalFontSize && (n.originalFontSize = (<any>i).originalFontSize),
            (<any>i).originalWidth ? n.originalWidth = (<any>i).originalWidth : n.originalWidth = i.width,
            (<any>i).originalHeight ? n.originalHeight = (<any>i).originalHeight : n.originalHeight = i.height,
            n.pivotX = i.pivotX, n.pivotY = i.pivotY, n.skewX = i.skewX, n.skewY = i.skewY,
            n.rotation = i.rotation, n.scaleX = i.scaleX, n.scaleY = i.scaleY, n.alpha = i.alpha,
            n.color = i.color, n.style.fontFamily = i.font, n.style.fontSize = (<any>i).fontSize0,
            n.style.bold = i.bold, n.style.italic = i.italic, n.style.align = i.align,
            n.style.valign = i.valign, n.style.leading = (<any>i).leading0, n.style.wordWrap = i.wordWrap,
            n.style.strokeColor = i.color, n.style.stroke = i.stroke, n.innerHTML = i.text,
            n.mouseThrough = !0, e && i.visible) {
            i.visible = !1;
            var h = i.parent;
            if (h) {
                var o = h.getChildIndex(i);
                h.addChildAt(n, o);
            }
        }
        return n;
    }

    /** 垂直压缩（默认 0.5）：Label/Button/HTMLDivElement 三分支，尺寸与字号反算 */
    public static textScale(i: any, e?: any): void {
        void 0 === e && (e = .5);
        if (i && !i.destroyed && i.scaleY != e) {
            var n = e / i.scaleY, h = !1;
            if (i instanceof Label) {
                h = !0;
                var o: any = i, r = NaN, a = !1;
                !o._width && o.textField && o.textField.textWidth
                    ? (a = !0, o.fontSize = Math.ceil(o.fontSize0 / n), r = o.textField.textWidth)
                    : (r = o.width, r /= n),
                    o.height /= n, o.width = r,
                    !a && (o.fontSize = Math.ceil(o.fontSize0 / n)),
                    o.originalFontSize && (o.originalFontSize = o.originalFontSize / n),
                    o.stroke && (o.stroke = Math.ceil(o.stroke / n)),
                    o.leading0 && (o.leading = Math.ceil(o.leading0 / n));
            } else if (i instanceof laya.ui.Button) {
                h = !0;
                var l: any = i;
                l.width /= n, l.height /= n, l.labelSize = Math.ceil(l.labelSize0 / n),
                    l.labelStroke && (l.labelStroke = Math.ceil(l.labelStroke / n)),
                    l.text.leading0 && (l.text.leading = Math.ceil(l.text.leading0 / n));
            } else if (i instanceof HTMLDivElement) {
                h = !0;
                var c: any = i;
                c._width /= n, c._height /= n,
                    c.style.fontSize = Math.ceil(c.style.fontSize0 / n),
                    c.style.leading0 && (c.style.leading = Math.ceil(c.style.leading0 / n));
            }
            h && (i.scaleX *= n, i.scaleY *= n);
        }
    }

    /** 单行自适应字号（Label/Button/HTMLDivElement）；h=true 时挂 change 事件重入
     * （原文自引经 sg.utils.Tools 全局路径 → 类直引）。
     * 注意 `a.right = a.right` 自赋值：经 setter 触发引擎重算（原文如此，保留）。 */
    public static textFitFontSize(i: any, e?: any, s?: any, n?: any, h?: any, o?: any): any {
        void 0 === s && (s = 0), void 0 === n && (n = 11), void 0 === h && (h = !0), void 0 === o && (o = !0);
        if (!i || i.destroyed)
            return 0;
        var a: any, l = 0, c = NaN, u = NaN, d = NaN, _ = Math.ceil(n / i.scaleY), m = NaN;
        if (i instanceof Label) {
            if ((a = i).off("change", null, Tools.textFitFontSize),
                !a.originalFontSize && (a.originalFontSize = a.fontSize0),
                l = a.originalFontSize, a.fontSize = l, m = Math.abs(a.scaleX),
                null != e && (a.text = e),
                s <= 0 && (s = (a._width ? a._width : 100) * m, a._width < 0 && a.right && a.parent)) {
                var g = a.parent;
                g instanceof laya.display.Sprite && (s = (g.width - (a.left ? a.left : a.x) - a.right) * m);
            }
            a.wordWrap = !1,
                o && (!a._height && (a.height = l), a.valign == "top" && (a.valign = "middle")),
                (u = a.textField.textWidth * m) > s && (
                    a.fontSize = Math.max(_, Math.floor(l * s / u)),
                    u = a.textField.textWidth * m,
                    typeof a.right == "number" && (a.right = a.right)),
                h && a.on("change", null, Tools.textFitFontSize, [a, null, s, n, !1]);
        } else if (i instanceof laya.ui.Button) {
            var f: any = i;
            !f.originalFontSize && (f.originalFontSize = f.labelSize0),
                l = f.originalFontSize, null != e && (f.label = e),
                (a = new Label(f.label)).fontSize = l,
                m = Math.abs(f.scaleX),
                s <= 0 && (d = Math.min(.2 * f.width, 30), s = (f.width - d) * m),
                (u = a.textField.textWidth * m) > s && (
                    f.labelSize = Math.max(_, Math.floor(l * s / u)), u = s);
        } else if (i instanceof HTMLDivElement) {
            var p: any = i;
            !p.originalFontSize && (p.originalFontSize = p.style.fontSize0),
                null == e && (e = "HTMLDivElement"),
                !p.originalWidth && (p.originalWidth = p.width),
                l = p.originalFontSize, c = p.originalWidth, m = Math.abs(p.scaleX),
                p._width = c, d = p._width, p.style.fontSize = l, p.style.wordWrap = !1, p.innerHTML = e,
                s <= 0 && (s = d * m),
                (u = p.contextWidth * m) > s && (
                    p.style.fontSize = Math.max(_, Math.floor(l * s / u)), p.innerHTML = e,
                    u = p.contextWidth * m),
                p._width = c;
        }
        return u;
    }

    /** 多行自适应字号（宽度 s/高度 n 双约束，二分逼近循环保留原 decrement 公式） */
    public static textFitFontSize2(i: any, e?: any, s?: any, n?: any, h?: any, o?: any, r?: any): any {
        void 0 === s && (s = 0), void 0 === n && (n = 0), void 0 === h && (h = 11),
            void 0 === o && (o = !0), void 0 === r && (r = !0);
        if (!i || i.destroyed)
            return 0;
        var l: any, c = 0, u = NaN, d = NaN, _ = NaN, m = NaN, g = NaN, f = 0, p = 0,
            v = Math.ceil(h / i.scaleY), y = NaN;
        if (i instanceof Label) {
            if ((l = i).off("change", null, Tools.textFitFontSize2),
                !l.originalFontSize && (l.originalFontSize = l.fontSize0),
                c = l.originalFontSize, y = Math.abs(l.scaleX), null != e && (l.text = e),
                l.fontSize = c,
                s <= 0 && (s = (l._width ? l._width : 100) * y, l._width < 0 && l.right && l.parent)) {
                var b = l.parent;
                b instanceof laya.display.Sprite && (s = (b.width - (l.left ? l.left : l.x) - l.right) * y);
            }
            for (n <= 0 && (n = (l._height ? l._height : 100) * l.scaleY),
                l.leading || (l.leading = 2),
                l.wordWrap = !0,
                l.width = s / y,
                r && (!l._height && (l.height = n), l.valign == "top" && (l.valign = "middle")),
                f = c;
                l.fontSize = f, !((u = l.textField.textHeight * l.scaleY) <= n || f <= v);)
                f = Math.max(v, Math.min(f - 1, Math.ceil(f * Math.pow(n / u, .5) * 1.1)));
            o && l.on("change", null, Tools.textFitFontSize2, [l, null, s, n, h, !1]);
        } else if (i instanceof laya.ui.Button) {
            var I: any = i;
            for (!I.originalFontSize && (I.originalFontSize = I.labelSize0),
                c = I.originalFontSize, y = Math.abs(I.scaleX),
                s <= 0 && (m = Math.min(.2 * I.width, 30), s = (I.width - m) * y),
                n <= 0 && (g = Math.min(.2 * I.height, 10), n = (I.height - g) * I.scaleY),
                (l = new Label(e)).wordWrap = !0,
                l.width = s / y,
                l.leading = I.text.leading0 ? I.text.leading0 : 2,
                p = l.leading0,
                f = c;
                l.fontSize = f, !((u = l.textField.textHeight * I.scaleY) <= n || f <= v);)
                f = Math.max(v, Math.min(f - 1, Math.ceil(f * Math.pow(n / u, .5) * 1.1)));
            I.labelSize = f, I.text.leading = p, I.label = l.textField.lines.join("\n"), u = n;
        } else if (i instanceof HTMLDivElement) {
            var x: any = i;
            for (y = Math.abs(x.scaleX),
                !x.originalFontSize && (x.originalFontSize = x.style.fontSize0),
                null == e && (e = "HTMLDivElement"),
                c = x.originalFontSize,
                !x.originalWidth && (x.originalWidth = x.width),
                d = x.originalWidth,
                !x.originalHeight && (x.originalHeight = x.height),
                _ = x.originalHeight,
                s <= 0 && (s = d * y),
                n <= 0 && (n = _ * x.scaleY),
                x.style.wordWrap = !0, x._width = s, x._height = n,
                x.style.leading || (x.style.leading = 2),
                x.innerHTML = e,
                f = c;
                x.style.fontSize = f, x.innerHTML = e, !((u = x.contextHeight * x.scaleY) <= n || f <= v);)
                f = Math.max(v, Math.min(f - 1, Math.ceil(f * Math.pow(n / u, .5) * 1.1)));
        }
        return u;
    }

    /** 自适应后按最宽行回写宽度并对齐（Label 用 measureText 逐行估宽；
     * HTMLDivElement 按 _getWords 分行聚合，ArrayUtils.distinct 数行数） */
    public static textFitLayout(i: any, e?: any): void {
        if (i && !i.destroyed) {
            i.originalWidth && (i.width = i.originalWidth),
                Tools.textFitFontSize2(i, e),
                !i.originalX && (i.originalX = i.x),
                !i.originalWidth && (i.originalWidth = i.width);
            var n = i.originalX, h = i.originalWidth, o = "", r = h, a = 0, l = 0;
            if (i instanceof Label) {
                var c = i.textField;
                r = c.text.split("\n").map(function (t: any) {
                    return a = Browser.context.measureText(t).width,
                        l = Math.ceil(a / h),
                        Math.ceil(a / l + c.fontSize);
                }).sort(function (t: any, i: any) {
                    return i - t;
                })[0],
                    i.width = r,
                    (o = c.align) === "center" ? i.x = n + (h - r) / 2 : o === "right" && (i.x = n + (h - r));
            } else if (i instanceof HTMLDivElement) {
                for (var u = i._childs.map(function (t: any) {
                    return t._getWords();
                }), d = [], _ = u.length, g = 0, f = 0; f < _; f++) {
                    var p = u[f];
                    p ? (d[g] || (d[g] = []), d[g] = d[g].concat(p)) : g++;
                }
                r = d.filter(function (t: any) {
                    return t;
                }).map(function (t: any) {
                    l = ArrayUtil.distinct(t.map(function (t: any) {
                        return t.y;
                    })).length;
                    var e = t.map(function (t: any) {
                        return t.width;
                    }).sort(function (t: any, i: any) {
                        return t - i;
                    });
                    a = ArrayUtil.sum(e);
                    var n = e.sort(function (t: any, i: any) {
                        return i - t;
                    })[0];
                    return Math.ceil(a / l + n);
                }).sort(function (t: any, i: any) {
                    return i - t;
                })[0],
                    i.width = r,
                    (o = i.style.align) === "center" ? i.x = n + (h - r) / 2 : o === "right" && (i.x = n + (h - r));
            }
        }
    }

    public static suitTextFontSize(i: any, e: any): any {
        return i / Tools.getMsgById(e).length * .9;
    }

    /** 艺术字体切换（横屏限定）：art_font_scale_<n> 缩放；注意 o 分支计算后
     * 三处实际都写 defaultFont2（原文如此，保留） */
    public static setArtFont(i: any, e?: any, s?: any, n?: any): void {
        void 0 === e && (e = !0), void 0 === s && (s = 0), void 0 === n && (n = 0);
        if (i && !i.destroyed && ConfigApp.isLandscape) {
            var o = e ? (<any>Font).defaultFont2 : Font.defaultFont,
                r = "art_font_scale_" + s,
                a = ConfigServer.system_simple[r] ? ConfigServer.system_simple[r] : 1;
            if (e || (a = 1 / a),
                i instanceof Label) {
                var l: any = i;
                if (l.font == o)
                    return;
                l.font = (<any>Font).defaultFont2,
                    l.fontSize = Math.round(l.fontSize0 * a),
                    n && (l.bold = n > 0);
            } else if (i instanceof laya.ui.Button) {
                var c: any = i;
                c.labelFont = (<any>Font).defaultFont2,
                    c.labelSize = Math.round(c.labelSize0 * a),
                    n && (c.labelBold = n > 0);
            } else if (i instanceof HTMLDivElement) {
                var u: any = i;
                u.style.fontFamily = (<any>Font).defaultFont2,
                    u.style.fontSize = Math.round(u.style.fontSize0 * a),
                    n && (u.style.bold = n > 0);
            }
        }
    }

    /** 折扣显示：横屏 discount_show 白名单或语言分支转 "90%" 形式；
     * case "kr" 的数组字面量为无效果表达式（原文如此，保留 fall-through） */
    public static transformDiscount(i: any): any {
        var s = (i = Math.round(10 * i) / 10) + "", n = ConfigApp.lan();
        if (ConfigApp.isLandscape) {
            var h = ConfigServer.system_simple.discount_show;
            h && h[n] && (0 == h[n].length || -1 != h[n].indexOf(ConfigApp.pf)) && (s = Math.round(100 - 10 * i) + "%");
        } else
            switch (n) {
                case "kr": ["ios_37_kr", "ad_37_kr", "h5_37_kr", "os_37_kr"];
                case "ja":
                    -1 != ["h5_37_jp", "h5_37_jp1", "ad_37_jp", "ios_37_jp"].indexOf(ConfigApp.pf)
                        && (s = Math.round(100 - 10 * i) + "%");
                    break;
                case "viet":
                case "ar":
                case "en":
                case "th":
                case "bahasa":
                    s = Math.round(100 - 10 * i) + "%";
            }
        return s;
    }

    /** 登录区 ID（合服表 merge_zone 优先） */
    public static getMyLoginZoneID(i?: any): any {
        void 0 === i && (i = "");
        var s = i || sg.model.ModelPlayer.recommendServer,
            n = ModelManager.instance.modelUser ? ModelManager.instance.modelUser.zone_login : null;
        return ConfigServer.zone && n && n[s] && n[s].merge_zone ? n[s].merge_zone : s;
    }

    public static getServerOpenTimeCfg(e?: any): any {
        void 0 === e && (e = "");
        return ConfigServer.zone[Tools.getMyLoginZoneID(e)][2];
    }

    /** 本地档读取观测（Trace.log 输出，无返回） */
    public static getLocalDataByKey(i: any): void {
        var s = SaveLocal.getValue(i + ModelManager.instance.modelUser.mUID, !0);
        Trace.log(s || "没有" + i);
    }

    public static getSplicingTimeStamp(i: any, e?: any): any {
        return i && typeof i == "object" ? sg.utils.TimeHelper.getSplicingTimeStamp(i, e) : Utils.parseInt(i);
    }

    /** 命中区外扩：仅当缩放后宽/高都≤0 时补一个负偏移 Rectangle 命中区 */
    public static setBtnHitRectangle(i: any, e: any, s: any): void {
        var h = i.width * i.scaleX - .5 * e, o = i.height * i.scaleY - .5 * s;
        if (!(h > 0 || o > 0)) {
            var r = new Rectangle(h, o, e, s);
            i.hitArea = r;
        }
    }

    /** 字体切换（横屏限定）：0=fontName / 其他=fontChat / -1=还原 originalFont */
    public static changeLabelFont(i: any, e?: any): void {
        void 0 === e && (e = 0);
        if (ConfigApp.isLandscape) {
            var n: any = i instanceof HTMLDivElement ? i.style.fontFamily : i.font;
            i.originalFont || (i.originalFont = n);
            var h = 0 == e ? ConfigApp.fontName : ConfigApp.fontChat;
            -1 == e && (h = i.originalFont, delete i.originalFont),
                h != n && (i instanceof Label || i instanceof laya.ui.TextInput || i instanceof laya.display.Text
                    ? i.font = h
                    : i instanceof HTMLDivElement && (i.style.fontFamily = h));
        }
    }

    /** 测试：富文本内图片替换为 hero7500xs 动画（EffectManager.loadAnimation） */
    public static htmlTest(i: any): void {
        var e, n = i._childs;
        i.getChildByName("aniBox") ? e = i.getChildByName("aniBox")
            : (e = new Box(), i.addChild(e), e.name = "aniBox"),
            e.destroyChildren();
        for (var h = 0; h < n.length; h++)
            if (n[h] instanceof laya.html.dom.HTMLImageElement) {
                var o = n[h];
                o.visible = !1;
                var r = EffectManager.loadAnimation("hero7500xs", "down");
                e.addChild(r), r.x = o.x + o.width / 2, r.y = o.y + o.height,
                    r.scaleX = r.scaleY = .4;
            }
    }

    /** @icon@ 占位 → <img>（ModelItem.getIconUrl，批次外全局路径）；点击图片弹道具详情 */
    public static setHtmlWithImg(i: any, e: any): void {
        var n = /@(\w+)@/, h = e.text;
        if (n.test(h)) {
            var o = h.match(n)[1],
                r = (<any>sg.model.ModelItem).getIconUrl(o),
                a = e.imgWidth ? e.imgWidth : 28, l = e.imgHeight ? e.imgHeight : 28;
            h = h.replace(n, "<img src='" + r + "' style='width:" + a + "px;height:" + l + "px'/>"),
                i.offAll("click"),
                i.on("click", null, function (t: any) {
                    t.target._url && ViewManager.instance.showItemTips(o);
                }),
                i.innerHTML = h;
        }
    }

    /** 十连抽测试：满 e 次提示结束；否则 buy_equip_box 购买并递归（NetSocket） */
    public static equipBoxTest(e?: any): void {
        void 0 === e && (e = 1);
        if (Tools.equipBoxTimes++, Tools.equipBoxTimes >= e)
            return Tools.equipBoxTimes = 0, void ViewManager.instance.showTipsTxt(e + "次十连抽结束");
        NetSocket.instance.send("buy_equip_box", { buy_key: "buy_ten" }, new Handler(null, function (t: any) {
            ModelManager.instance.modelUser.updateData(t.receiveData),
                Tools.equipBoxTest(e);
        }));
    }

    /** 富文本末字符 X 坐标（图片元素或末词） */
    public static getHtmlEndCharX(i: any): any {
        var s = i._childs;
        if (s.length > 0) {
            var n = s[s.length - 1];
            if (n instanceof laya.html.dom.HTMLImageElement)
                return n.x + n.width;
            var h = n._text;
            if (h) {
                var o = h.words;
                if (o)
                    return o[o.length - 1].x + o[o.length - 1].width;
            }
        }
        return 0;
    }

    /** 富文本截宽：逐元素找超宽词替换 "..."；整体 try/catch 吞异常（原文如此，保留） */
    public static fitHtmlWidth(i: any, e: any, s: any): void {
        i.innerHTML = e;
        try {
            if (Tools.getHtmlEndCharX(i) <= s)
                return;
            s -= 25;
            for (var h = 0, o = 0, r = i._childs, a = 0; a < r.length; a++)
                if (r[a] instanceof laya.html.dom.HTMLImageElement) {
                    if (r[a].x + r[a].width > s) {
                        e = e.substr(0, o) + "...";
                        break;
                    }
                    h = e.indexOf("<img", o),
                        o = e.indexOf("</img>", h) + "</img>".length;
                } else {
                    var l = r[a];
                    if (!l) continue;
                    l._childs[0] && l._childs[0] instanceof laya.html.dom.HTMLElement && (l = l._childs[0]);
                    var c = l._text;
                    if (!c) continue;
                    var u, d = c.text;
                    if (l._href)
                        h = e.indexOf("<span", o),
                            o = e.indexOf("</span>", h) + "</span>".length,
                            e.substr(o, "</Font>".length) == "</Font>" && (o += "</Font>".length);
                    else {
                        var _ = e.indexOf(d, o);
                        (u = e.substr(_ + d.length, "</Font>".length)) == "</Font>"
                            ? (h = e.indexOf("<Font", o), o = e.indexOf("</Font>", h) + "</Font>".length)
                            : o = (h = e.indexOf(d, o)) + d.length;
                    }
                    var m = c.words;
                    if (!m) continue;
                    for (var g = "", f = -1, p = 0; p < m.length; p++) {
                        if (m[p].x + m[p].width > s) {
                            f = p;
                            break;
                        }
                        g += m[p].char;
                    }
                    if (-1 != f) {
                        0 == f ? e = e.substring(0, h) + "..."
                            : ((u = e.substring(h, o)).length > d.length ? g = u.replace(d, g + "...") : g += "...",
                                e = e.substring(0, h) + g);
                        break;
                    }
                }
            i.innerHTML = e;
        } catch (t) {
        }
    }

    /** 玩家名着色：mUID 匹配用 FONT_COLOR_NAME，否则还原 */
    public static setUserNameLabelColor(i: any, e: any): void {
        !i.originalFontColor && (i.originalFontColor = i.color),
            e + "" == ModelManager.instance.modelUser.mUID
                ? i.color = ColorManager.getUIColor("FONT_COLOR_NAME")
                : i.color = i.originalFontColor;
    }

    /** 分割线：图片线（AssetsManager line_default.png）或染色 "-" 串 + 换行 */
    public static getSplitLine(i?: any, e?: any, s?: any): any {
        void 0 === i && (i = !1), void 0 === e && (e = 420), void 0 === s && (s = !0);
        var h = "";
        if (i && e) {
            var o;
            if (s)
                if (1 == i && (i = AssetsManager.getAssetLater("line_default.png")), typeof i == "string")
                    h += o = "<img src=\"" + i + "\" style=\"width:" + e + "px;height:10px;\"/>";
                else {
                    o = StringUtil.repeat("-", Math.floor(e / 70));
                    var r = ColorManager.getUIColor("FONT_COLOR_NULL");
                    h += StringUtil.htmlFontColor(o, r);
                }
            else h += o = StringUtil.repeat("-", Math.floor(e / 70));
            h += StringUtil.getEnter(s);
        } else h = StringUtil.getEnter(s, 3);
        return h;
    }

    /** 从 e→s 画箭头（icon_heritage_jt.png，按两点距离/角度摆放；Math2.radianToAngle） */
    public static showArrow(i: any, e: any, s: any): void {
        var h = "$$_img_arrow_$$", o = i.getChildByName(h);
        !o && (
            (o = new Image(AssetsManager.getAssetLater("icon_heritage_jt.png"))).anchorY = .5,
            o.sizeGrid = "0,80,0,50", o.name = h, i.addChild(o)),
            o.pos(e.x, e.y), o.width = e.distance(s.x, s.y);
        var r = Math.atan2(s.y - e.y, s.x - e.x);
        o.rotation = sg.map.utils.Math2.radianToAngle(r);
    }

    public static clearArrow(i: any): void {
        var s = "$$_img_arrow_$$", n = i.getChildByName(s);
        n && n.destroy();
    }

    // ------------------------------------------------------------------
    // 静态数据字段（原文在包装尾部直接赋值）
    // ------------------------------------------------------------------
    public static sMsgDic: any = {};
    public static sMsgLocalDic: any = null;
    public static oneSecondMilli: number = 1e3;
    public static oneMinuteMilli: number = 6e4;
    public static _queryParams: any = null;
    public static equipBoxTimes: number = 0;

    /** h(i,["oneHourMilli",…,"oneDayMilli",…,"SYMBOL_*",…,"material_pay_index",…])
     * —— Laya.static 惰性静态（首访求值并缓存为类自身数据属性，
     * ViewScenes.TOP_HEIGHT 同款 defineProperty 换写；oneDayMilli 读 oneHourMilli
     * 时会先触发其自身惰性求值，与原 getter 顺序一致）。 */
    public static get oneHourMilli(): number {
        var v = 60 * Tools.oneMinuteMilli;
        Object.defineProperty(Tools, "oneHourMilli", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get oneDayMilli(): number {
        var v = 24 * Tools.oneHourMilli;
        Object.defineProperty(Tools, "oneDayMilli", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SYMBOL_SEMICOLON(): any {
        var v = Tools.getMsgById("rslt_connect0");
        Object.defineProperty(Tools, "SYMBOL_SEMICOLON", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SYMBOL_COMMA(): any {
        var v = Tools.getMsgById("rslt_connect1");
        Object.defineProperty(Tools, "SYMBOL_COMMA", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SYMBOL_FULL(): any {
        var v = Tools.getMsgById("rslt_connect2");
        Object.defineProperty(Tools, "SYMBOL_FULL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SYMBOL_COLON(): any {
        var v = Tools.getMsgById("rslt_connect3");
        Object.defineProperty(Tools, "SYMBOL_COLON", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get material_pay_index(): string[] {
        var v = ["item", "merit", "gold", "food", "wood", "iron", "coin"];
        Object.defineProperty(Tools, "material_pay_index", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,t(1377))（2 参注册，无基类；池化名 t(1377)="sg.utils.Tools"）。
 * base 传 null 的原因见 batch-a-report.md「注册等价决策」。
 */
Laya.class(Tools, "sg.utils.Tools", null, null);
