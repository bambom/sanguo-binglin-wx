/**
 * Laya.ToJava —— Android 原生桥（注册名 "ToJava"）。init 时取 window.toAndroid
 * 并按 ConfigApp.jcname 反射 Java 工具类（默认 "meng52.Tools"）。
 *
 * 原文：code1.js 字节 [1196736,1198735]（包装变量 ks，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ToJava.js
 *
 * 依赖：Rt=ConfigApp（批次 B 模块直引：onAndroid/jcname）；
 * m=laya.utils.Browser（UMD 级别名，window.toAndroid）。
 * 注意：restartApp/alertToApp/getAppName 等处原文即为「只取 sTools 不调用」的
 * 无操作语句（对照原文保留，不补造调用）。
 */
import { ConfigApp } from "../cfg/ConfigApp";

export class ToJava {

    constructor() {
    }

    public static init(): void {
        ConfigApp.onAndroid() && laya.utils.Browser.window && (<any>laya.utils.Browser.window).toAndroid && (
            ToJava.sTools = (<any>laya.utils.Browser.window).toAndroid,
                ToJava.sTools && ToJava.sTools("createClass", null, ConfigApp.jcname ? ConfigApp.jcname : "meng52.Tools"));
    }

    public static restartApp(): void {
        ToJava.sRestartAPPTool;
    }

    public static alertToApp(i: any, e: any, s: any): void {
        ToJava.sTools;
    }

    public static getPhoneID(i: any, e: any): string {
        return ToJava.sTools && ToJava.sTools("getPhoneID", function (t: any) { e && e.runWith([t, t]); }, i), "";
    }

    public static getAppName(): string {
        return ToJava.sTools, "";
    }

    public static openAlipay(i: any): boolean {
        return ToJava.sTools && ToJava.sTools("pay_alipay", function (t: any) { }, i), !1;
    }

    public static initSDK(i: any, e: any): void {
        ToJava.sTools
            ? ToJava.sTools("initSDK", function (t: any) { e && e.runWith([t, "initSDK"]); }, i)
            : e && e.runWith([0, null]);
    }

    public static pay(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("pay", function (t: any) { e && e.runWith([t, "pay"]); }, JSON.stringify(i)), !1;
    }

    public static pay_wx(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("pay_wx", function (t: any) { e && e.runWith([t, "pay_wx"]); }, JSON.stringify(i)), !1;
    }

    public static pay2(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("pay", function (t: any) { e && e.runWith([0, t]); }, JSON.stringify(i)), !1;
    }

    public static login(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("login", function (t: any) { e && e.runWith([0, t]); }, i), !1;
    }

    public static logout(i: any): boolean {
        return ToJava.sTools && ToJava.sTools("logout", function (t: any) { i && i.runWith([t, "logout"]); }, ""), !1;
    }

    public static showfloat(): boolean {
        return ToJava.sTools && ToJava.sTools("showfloat", null, ""), !1;
    }

    public static hidefloat(): boolean {
        return ToJava.sTools && ToJava.sTools("hidefloat", null, ""), !1;
    }

    public static savePlayerInfo(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("savePlayerInfo", function (t: any) { e && e.runWith([t, "savePlayerInfo"]); }, JSON.stringify(i)), !1;
    }

    public static saveActionInfo(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("saveActionInfo", function (t: any) { e && e.runWith([t, "saveActionInfo"]); }, JSON.stringify(i)), !1;
    }

    public static callMethod(i: any, e: any, s: any): boolean {
        if (ToJava.sTools) {
            var n = "";
            n = "string" == typeof e ? e + "" : JSON.stringify(e),
                ToJava.sTools(i, function (t: any) { s && s.runWith([t, i]); }, n);
        }
        return !1;
    }

    public static other_fun(i: any, e: any): boolean {
        return ToJava.sTools && ToJava.sTools("other_fun", function (t: any) { e && e.runWith([t, "other_fun"]); }, i), !1;
    }

    public static log(i: any): boolean {
        return ToJava.sTools && ToJava.sTools("log", null, i), !1;
    }

    public static sRestartAPPTool: any = null;
    public static sTools: any = null;
}

/**
 * 注册身份等价物：原文 o(t,"ToJava")（2 参注册，无基类；全局名 Laya.ToJava）。
 */
Laya.class(ToJava, "ToJava", null, null);
