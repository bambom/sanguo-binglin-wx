/**
 * sg.utils.Base64 —— js-base64 2.5.1 完整库的内嵌薄壳（静态 encode/decode 经
 * 惰性 instance 转发到库对象；批次 O，FilterManager.setBanWord 硬路径）。
 *
 * 原文：code1.js 字节 [1095052,1098371)（ts= 声明器 @1095049，0 参 IIFE，注册
 * o(t,"sg.utils.Base64") 2 参字面量形态，无基类、空构造器）。前邻 EffectManager
 * 簇尾 `t}()`、后邻 is=sg.utils.CustomLoader（批次 B ✓）——sg.utils 工具簇。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-o/Base64.js
 *
 * 入批依据：FilterManager.setBanWord（initLoginView:483 无条件调用）→
 * setNameBanWord("lc_name") → restoreBanWord → `ts.decode(t.substring(3))`——
 * ad/lc_name.txt / ad/lc_0.txt 在 ConfigAssets.AssetsInit 默认资源表内
 * （原文 @455518：`Gt.system_simple.AssetsInit||["ad/lc_name.txt","ad/lc_0.txt",…]`），
 * loadAssets 先于 initLoginValue 完成装载（isAssets 闸门），getRes 真值 →
 * restoreBanWord 体内 decode 无条件执行；wx_37 pf 条件链实证通过
 * （"fs_ad_37"/"fs_h5_37"!=pf ✓；releaseWeiXin()=true（window.game37_pf="wx_37"）
 * → pf!=window.bugu_sg4_pf && pf!=window.game37_fs_pf ✓）。
 *
 * 结构：`r(1,t,"instance",getter)` 惰性 instance（批次 K 定案：getter-only 也安装
 * 只读访问器；读取即初始化）；getter 体内嵌完整 js-base64 2.5.1 UMD 工厂
 * （VERSION "2.5.1" 自证），初始化序列为逗号表达式：
 *   null===t._base64 && (e=ENV, s=工厂, UMD 分派, t._base64=m.window.Base64), t._base64
 * ENV=`"undefined"!=typeof self?self:void 0!==i?i:…`（i=UMD 首参 window，浏览器
 * 恒走 self 分支）；UMD 分派 `"object"==typeof exports&&"undefined"!=typeof module?
 * module.exports=s(e):"function"==typeof define&&define.amd?define(s):s(e)`——
 * CommonJS 模块内编译后首分支恒真，module.exports 被 s(e) 返回值置换（原文在
 * wxapkg define 工厂内同样命中该分支、同样置换其模块 exports——语义一致，require
 * 缓存使置换无消费者影响；本模块静态绑定 Laya.class 在求值期先完成，不受影响）。
 *
 * 身份（resolve_o.js，acorn 作用域链）：o=Laya.class、r=s.getset、m=laya.utils.Browser
 * （getter 尾 `t._base64=m.window.Base64`）、i=UMD 首参 window、self/global/module/
 * exports/define 为宿主环境标识；工厂内部 e/s/n/h/o/r/a/l 全为局部函数（内层 o/r
 * 遮蔽 UMD 助手，仅工厂作用域内有效）。声明器单一 CallExpression
 * （`…t}(),ts=function(){…}(),is=` 字节实证，非 Ee 式逗号双跳）。
 *
 * 保真注记：
 * - 工厂体逐式照抄（含 "use strict" 指令、`i=i||{}` 形参回写、`(i=t.charCodeAt(0))`
 *   赋值入比较、`n.length-=[0,0,2,1][e]` 数组长复合赋值、`i.Meteor&&(Base64=i.Base64)`
 *   类绑定写（Meteor 宿主不存在，恒假死分支，原样保留））；
 * - p 正则字符类中原为裸控制字节 U+0080-U+00BF（UTF-8 C2 80-C2 BF，原文字节
 *   实证 @1097006），TS 源以 \u0080-\u00BF 转义书写——运行时字符串逐字节等价；
 * - 编译目标 es5：工厂内无语法转译需求；module/exports 为本 CommonJS 模块自带
 *   （declare 形式仅补类型层），define/global 补 any 声明（运行时 typeof 守卫原样）。
 */

/* 宿主环境标识（类型层补全；运行时存在性与原文一致，typeof 守卫保留原判定） */
declare var define: any;
declare var global: any;
declare var module: any;
declare var exports: any;

import Browser = laya.utils.Browser;

export class Base64 {

    /**
     * r(1,t,"instance",getter) —— 惰性 instance：首次读取初始化 js-base64 库并
     * memoize 到 _base64；getter 体为原文逗号表达式原样（括号内三段：ENV 求值、
     * 工厂定义 + UMD 分派、_base64 回写）。
     */
    public static get instance(): any {
        var e: any, s: any,
            t: any = Base64; /* 原文工厂内 `t=i.Base64` 经作用域链写 wrapper 级类变量 t；
                     TS 2.6 类绑定不可写（TS2539），经 getter 级同名别名保存该写
                     （i.Meteor 在全部受支持宿主恒假，分支死、写不可观测——batch-o-report §5） */
        return null === Base64._base64 && (
            e = "undefined" != typeof self ? self : void 0 !== window ? window : "undefined" != typeof global ? global : this,
            s = function (i: any) {
                "use strict";
                function e(t: any) {
                    if (t.length < 2) return (i = t.charCodeAt(0)) < 128 ? t : i < 2048 ? _(192 | i >>> 6) + _(128 | 63 & i) : _(224 | i >>> 12 & 15) + _(128 | i >>> 6 & 63) + _(128 | 63 & i);
                    var i = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
                    return _(240 | i >>> 18 & 7) + _(128 | i >>> 12 & 63) + _(128 | i >>> 6 & 63) + _(128 | 63 & i);
                }
                function s(t: any) {
                    return t.replace(m, e);
                }
                function n(t: any) {
                    var i = [0, 2, 1][t.length % 3],
                        e = t.charCodeAt(0) << 16 | (1 < t.length ? t.charCodeAt(1) : 0) << 8 | (2 < t.length ? t.charCodeAt(2) : 0);
                    return [u.charAt(e >>> 18), u.charAt(e >>> 12 & 63), 2 <= i ? "=" : u.charAt(e >>> 6 & 63), 1 <= i ? "=" : u.charAt(63 & e)].join("");
                }
                function h(t: any, i?: any) {
                    return i ? f(String(t)).replace(/[+\/]/g, function (t: any) { return "+" == t ? "-" : "_"; }).replace(/=/g, "") : f(String(t));
                }
                function o(t: any) {
                    switch (t.length) {
                        case 4:
                            var i = ((7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)) - 65536;
                            return _(55296 + (i >>> 10)) + _(56320 + (1023 & i));
                        case 3:
                            return _((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
                        default:
                            return _((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1));
                    }
                }
                function r(t: any) {
                    return t.replace(p, o);
                }
                function a(t: any) {
                    var i = t.length, e = i % 4,
                        s = (0 < i ? d[t.charAt(0)] << 18 : 0) | (1 < i ? d[t.charAt(1)] << 12 : 0) | (2 < i ? d[t.charAt(2)] << 6 : 0) | (3 < i ? d[t.charAt(3)] : 0),
                        n = [_(s >>> 16), _(s >>> 8 & 255), _(255 & s)];
                    return n.length -= [0, 0, 2, 1][e], n.join("");
                }
                function l(t: any) {
                    return y(String(t).replace(/[-_]/g, function (t: any) { return "-" == t ? "+" : "/"; }).replace(/[^A-Za-z0-9\+\/]/g, ""));
                }
                var c = (i = i || {}).Base64,
                    u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    d = function (t: any) {
                        for (var i: any = {}, e = 0, s = t.length; e < s; e++) i[t.charAt(e)] = e;
                        return i;
                    }(u),
                    _ = String.fromCharCode,
                    m = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/g,
                    g = i.btoa ? function (t: any) { return i.btoa(t); } : function (t: any) { return t.replace(/[\s\S]{1,3}/g, n); },
                    f = function (t: any) { return g(s(t)); },
                    p = new RegExp(["[À-ß][\u0080-\u00BF]", "[à-ï][\u0080-\u00BF]{2}", "[ð-÷][\u0080-\u00BF]{3}"].join("|"), "g"),
                    v = i.atob ? function (t: any) { return i.atob(t); } : function (t: any) { return t.replace(/\S{1,4}/g, a); },
                    y = function (t: any) { return r(v(t)); };
                if (i.Base64 = {
                    VERSION: "2.5.1",
                    atob: function (t: any) { return v(String(t).replace(/[^A-Za-z0-9\+\/]/g, "")); },
                    btoa: g,
                    fromBase64: l,
                    toBase64: h,
                    utob: s,
                    encode: h,
                    encodeURI: function (t: any) { return h(t, !0); },
                    btou: r,
                    decode: l,
                    noConflict: function () { var t = i.Base64; return i.Base64 = c, t; },
                    __buffer__: void 0
                }, "function" == typeof Object.defineProperty) {
                    var b = function (t: any) {
                        return { value: t, enumerable: !1, writable: !0, configurable: !0 };
                    };
                    i.Base64.extendString = function () {
                        Object.defineProperty(String.prototype, "fromBase64", b(function (this: string) { return l(this); })),
                            Object.defineProperty(String.prototype, "toBase64", b(function (this: string, t?: any) { return h(this, t); })),
                            Object.defineProperty(String.prototype, "toBase64URI", b(function (this: string) { return h(this, !0); }));
                    };
                }
                return i.Meteor && (t = i.Base64),
                    "undefined" != typeof module && module.exports ? module.exports.Base64 = i.Base64 : "function" == typeof define && define.amd && define([], function () { return i.Base64; }),
                    { Base64: i.Base64 };
            },
            "object" == typeof exports && "undefined" != typeof module ? module.exports = s(e) : "function" == typeof define && define.amd ? define(s) : s(e),
            Base64._base64 = Browser.window.Base64
        ), Base64._base64;
    }

    public static encode(i: any): any {
        return Base64.instance.encode(i);
    }

    public static decode(i: any): any {
        return Base64.instance.decode(i);
    }

    /* ---- 静态字段（原文尾部赋值序：r(1,…,"instance") → encode → decode → _base64=null） ---- */
    public static _base64: any = null;
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.Base64")（2 参，无基类）。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(Base64, "sg.utils.Base64", null, null);
