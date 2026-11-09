/**
 * Laya.ToIOS —— iOS 原生桥（注册名 "ToIOS"）。三分支：加速器 conch（FuncBridge）、
 * WKWebView（conchMarket/toIOS 注入对象）、UIWebView（toIOS 函数）。
 *
 * 原文：code1.js 字节 [1196042,1196730]（包装变量 Cs，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ToIOS.js
 *
 * 依赖：Rt=ConfigApp（批次 B 模块直引：onIOS/onIOSlayaWK/jcname）；
 * ot=laya.renders.Render（UMD 级别名，isConchApp）；
 * s.PlatformClass=Laya.PlatformClass（引擎加速器平台类）；
 * m=laya.utils.Browser（UMD 级别名，window.conchMarket / window.toIOS）。
 */
import { ConfigApp } from "../cfg/ConfigApp";

export class ToIOS {

    constructor() {
    }

    public static init(): void {
        ConfigApp.onIOS() && (
            laya.renders.Render.isConchApp
                ? ToIOS.sTools = Laya.PlatformClass.createClass("FuncBridge")
                : ConfigApp.onIOSlayaWK()
                    ? ToIOS.sTools = (<any>laya.utils.Browser.window).conchMarket
                    : ToIOS.sTools = (<any>laya.utils.Browser.window).toIOS);
    }

    public static callFunc(i: string, e: any, s: any): void {
        laya.renders.Render.isConchApp
            ? ToIOS.sTools.callWithBack(e, i + ":", s)
            : ConfigApp.onIOSlayaWK()
                ? ToIOS.sTools && ToIOS.sTools.hasOwnProperty(i) && (
                    s && "string" == typeof s
                        ? ToIOS.sTools[i](s, e)
                        : s
                            ? ToIOS.sTools[i](JSON.stringify(s), e)
                            : ToIOS.sTools[i]("", e))
                : ToIOS.sTools(i, e, s);
    }

    public static log(i: string): void {
        ToIOS.callFunc("log", null, i);
    }

    public static pay(i: any, e: any): void {
        if (ConfigApp.onIOSlayaWK()) {
            var s = { product_id: e.pid, amount: 1, order_id: e.ext, callback_uri: e.url };
            ToIOS.callFunc("cz", i, JSON.stringify(s));
        } else ToIOS.callFunc("pay", i, e);
    }

    public static sTools: any = null;
}

/**
 * 注册身份等价物：原文 o(t,"ToIOS")（2 参注册，无基类；全局名 Laya.ToIOS）。
 */
Laya.class(ToIOS, "ToIOS", null, null);
