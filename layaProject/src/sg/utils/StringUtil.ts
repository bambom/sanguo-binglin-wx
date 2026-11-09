/**
 * sg.utils.StringUtil —— 字符串/富文本工具：{N} 占位替换、[xx] 富文本着色
 * （<Font>/<span href>）、换行/空格转 HTML、百分数/数值格式化、62 进制、
 * <img> 富文本串等。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/StringUtil.js
 *
 * Ze=sg.utils.ArrayUtil（模块直引）。原文自引 sg.utils.StringUtil → TS 类直引。
 * getHtmlImgStr 中 height 分支沿用原文的 i（宽）值——原文如此，不做“修复”。
 */
import { ArrayUtil } from "./ArrayUtil";

export class StringUtil {

    constructor() {
    }

    /** "{0}..{n}" 占位替换；首个实参为数组则展开 */
    public static substitute(t: string, ...args: any[]): string {
        for (var e: any[] = [], s = 1, n = arguments.length; s < n; s++) e.push(arguments[s]);
        return e[0] instanceof Array && (e = e[0]), t.replace(/{(\d+)}/g, function (t, i) {
            return e[i];
        });
    }

    /** [xx] → 双色富文本：e 为正文色，i 为标记段色 */
    public static substituteWithColor(t: string, i?: string, e?: string): string {
        if (void 0 === i && (i = "#FFFFFF"), void 0 === e && (e = "#FFFFFF"), !t) return "";
        var s = "<Font color='" + e + "'>", n = "</Font>", h = "<Font color='" + i + "'>";
        return t = t.replace(/\[(\S.*?)\]/g, function (t, i) {
            return n + h + i + n + s;
        }), s + t + n;
    }

    /** 分段着色 + 换行规整：连续空行折叠为 s 分隔，段落以 <br/> 相接 */
    public static substituteWithLineAndColor(t?: string, i?: string, e?: string, s?: string, n?: string): string {
        if (void 0 === t && (t = ""), void 0 === i && (i = "#FFFFFF"), void 0 === e && (e = "#FFFFFF"),
            void 0 === s && (s = "\n"), void 0 === n && (n = ""), !t) return "";
        var h = (t = t.replace(/(\n+)\n/gm, function (t, i) {
            return i.replace(/\n/gm, "\n&nbsp;") + s;
        })).split(s), o = h.length;
        t = "";
        for (var r = 0; r < o; r++) {
            var a = h[r];
            a ? (n && (a = n + a), t += "" == i ? a : StringUtil.substituteWithColor(a, i, e)) : t += "",
                r < o - 1 && (t += "<br/>");
        }
        return t;
    }

    public static formatHtml(t: string, i: string, e?: string, s?: string): string {
        return void 0 === e && (e = "；"), void 0 === s && (s = ""),
            StringUtil.substituteWithLineAndColor(t, i, i, e, s);
    }

    public static isHtmlFont(t: string): boolean {
        return -1 != t.indexOf("<Font");
    }

    /** DOM 元素 t：i 中 [xx] 依序取 e 色队列着色后写 innerHTML */
    public static setHtmlText(t: any, i: string, e: string[], s?: string): string {
        void 0 === s && (s = "#FFFFFF");
        t.style.color = s;
        var n = "FFFFFF";
        return i = i.replace(/\[(\S.*?)\]/g, function (t, i) {
            return e.length && (n = e.shift()), "<Font color='" + n + "'>" + i + "</Font>";
        }), t.innerHTML = i, i;
    }

    /** 同上但产 <span color href>，可带链接地址队列 n */
    public static setHtmlText2(t: any, i: string, e: string[], s?: string, n?: string[]): string {
        void 0 === s && (s = "#FFFFFF");
        t.style.color = s;
        var h = "FFFFFF", o = "", r = "</span>";
        return i = i.replace(/\[(\S.*?)\]/g, function (t, i) {
            return e.length && (h = e.shift()),
                n && n.length > 0 ? (n.length && (o = n.shift()), "<span color='" + h + "' href='" + o + "'>" + i + r)
                    : "<span color='" + h + "'>" + i + r;
        }), t.innerHTML = i, i;
    }

    public static setBold(t: string): string {
        return '<span style="bold:true;">' + t + "</span>";
    }

    public static packingFontSize(t: string, i: any): string {
        return t ? '<p style="font-size:' + i + '">' + t + "</p>" : "";
    }

    public static htmlFontColor(t: string, i?: string, e?: string): string {
        return void 0 === i && (i = "#FFFFFF"), void 0 === e && (e = ""), e || (e = i),
            StringUtil.substituteWithColor(t, i, e);
    }

    /** s=!0 用 toFixed(i)，否则整数截断放大缩小；e=!0 转 Number */
    public static numberToPercent(t: number, i?: number, e?: boolean, s?: boolean): any {
        void 0 === i && (i = 0), void 0 === e && (e = !1), void 0 === s && (s = !1);
        var n: any = "";
        return n += s ? Number(100 * t).toFixed(i) : (t * Math.pow(10, 2 + i) | 0) / Math.pow(10, i),
            (e ? Number(n) : n) + "%";
    }

    /** 原文实现即原样返回 t+""（i 参数未用，保留签名） */
    public static numberToChinese(t: any, i?: boolean): string {
        return void 0 === i && (i = !1), t + "";
    }

    public static numToPercentStr(t: number): any {
        return t < 1 ? Math.round(100 * t) + "%" : t + "";
    }

    /** 概率数组 → 各保留 i 位小数的百分比串；末项吸收舍入误差 */
    public static getRateArray(t: number[], i?: number): string[] {
        void 0 === i && (i = 0);
        var e: any[] = [], s = ArrayUtil.sum(t), n = t.length;
        if (0 === s) e = t.map(function (t) {
            return 0;
        });
        else if (1 === s) e = [1];
        else {
            for (var h = i + 2, o = Math.pow(10, h), r = 0, a = 0; a < n - 1; a++) {
                var l = t[a] / s;
                e[a] = Math.round(l * o) / o, r += e[a];
            }
            e[n - 1] = Number((1 - r).toFixed(h));
        }
        return e.map(function (t) {
            return parseFloat((100 * t).toFixed(i)) + "%";
        });
    }

    public static numToWholeStr(t: number, i: number): string {
        return t < i ? i + "" : Math.floor(t / i) * i + "";
    }

    public static fillSpace(t: string, i: number, e?: boolean, s?: string): string {
        return void 0 === e && (e = !0), void 0 === s && (s = " "), StringUtil.padding(t, i, s, !e);
    }

    public static repeat(t: string, i?: number): string {
        if (void 0 === i && (i = 0), i >= 0) return new Array(i + 1).join(t);
        throw new Error("repeat times must be positive and less than inifinity");
    }

    /** 定长补齐：s=!0 右补（默认）；超长原样返回 */
    public static padding(t: any, i: number, e?: any, s?: boolean): string {
        return void 0 === s && (s = !0), i |= 0, e = String(void 0 !== e ? e : " "),
            t.length > i ? String(t) : (
                (i -= t.length) > e.length && (e += StringUtil.repeat(e, i / e.length)),
                    e = e.slice(0, i), s ? String(t) + e : e + String(t)
            );
    }

    public static replaceSpace(t: string): string {
        return t = t.replace(/ /gm, "&nbsp;");
    }

    public static replaceEnter(t: string): string {
        return t = t.replace(/\n/gm, "<br/>");
    }

    public static trim(t: string): string {
        return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }

    public static trimStart(t: string): string {
        return t.replace(/^[\s\uFEFF\xA0]+/g, "");
    }

    public static trimEnd(t: string): string {
        return t.replace(/[\s\uFEFF\xA0]+$/g, "");
    }

    public static getSpace(t: boolean, i?: number): string {
        void 0 === i && (i = 1);
        for (var e = "", s = t ? "&nbsp;" : " ", n = 0; n < i; n++) e += s;
        return e;
    }

    public static getEnter(t: boolean, i?: number): string {
        void 0 === i && (i = 1);
        for (var e = "", s = t ? "<br/>" : "\n", n = 0; n < i; n++) e += s;
        return e;
    }

    /** 纯文本段级着色：完整 [xx] 用 i 色，游离文本用 e 色，孤立括号跳过 */
    public static processPlainTextSegment(t: string, i: string, e: string): string {
        for (var s, n = /(\[([^\]]*)\])|(\[)|(\])|([^\[\]]+)/g, h = ""; null != (s = n.exec(t));)
            if (null != s[1]) {
                var o = s[2];
                (o = o.replace(/[\[\]]/g, "")).length > 0 && (h += "<font color='" + i + "'>" + o + "</font>");
            } else {
                if (null != s[3] || null != s[4]) continue;
                if (null != s[5]) {
                    var r = s[5];
                    r.length > 0 && (h += "<font color='" + e + "'>" + r + "</font>");
                }
            }
        return h;
    }

    /** 先保已存在的 <font> 块，再把其余文本段按 processPlainTextSegment 着色 */
    public static setFontColorHtml(i: string, e: string, s: string): string {
        return i.replace(/(<font[^>]*>[\s\S]*?<\/font>)|([^<]+)/gi, function (i, n, h) {
            return null != n ? n : null != h && h.length > 0 ? StringUtil.processPlainTextSegment(h, e, s) : "";
        });
    }

    /** 十进制 → 62 进制串（0-9a-zA-Z） */
    public static string10to62(t: number): string {
        var i = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
            e = i.length, s = t, n: string[] = [];
        do {
            var h = s % e;
            s = (s - h) / e, n.unshift(i[h]);
        } while (s > 0);
        return n.join("");
    }

    /** 富文本 <img>；注意 height 分支原文亦用 i（宽）——原文如此 */
    public static getHtmlImgStr(t: string, i?: number, e?: number): string {
        void 0 === i && (i = 0), void 0 === e && (e = 0);
        var s = "";
        return (i || e) && (s = ' style="', i && (s += "width:" + i + "px;"),
            e && (s += "height:" + i + "px;"), ";" == s.substr(s.length - 1, 1) && (s = s.substr(0, s.length - 1)),
            s += '"'), "<img" + (' src="' + t + '"') + s + "/>";
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.StringUtil")（2 参注册，无基类）。
 */
Laya.class(StringUtil, "sg.utils.StringUtil", null, null);
