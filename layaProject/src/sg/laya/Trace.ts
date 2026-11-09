/**
 * Laya.Trace —— 简易日志开关（注册名 "Trace"，无命名空间，挂在 Laya 全局）。
 *
 * 原文：code1.js 字节 [1198741,1198990]（包装变量 Ts，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/Trace.js
 *
 * 依赖：m=laya.utils.Browser（UMD 级别名，284964 处实测 m=laya[n(10646)][n(15202)]）。
 */
export class Trace {

    constructor() {
    }

    /** 原文形参仅占位，实际收集全部 arguments 后 console.info；isOn=false 时静默 */
    public static log(...args: any[]): void {
        var e: any[] = [];
        for (var s = 0, n = arguments.length; s < n; s++) e.push(arguments[s]);
        Trace.isOn && console.info.apply(console, e);
    }

    /** 宿主页 layui 风格 layer.msg 提示（Browser.window.layer 存在时） */
    public static msg(t: string): void {
        var m = laya.utils.Browser;
        m && m.window && m.window.layer && m.window.layer.msg(t);
    }

    public static isOn: boolean = false;
}

/**
 * 注册身份等价物：原文 o(t,"Trace")（2 参注册，无基类；全局名 Laya.Trace）。
 */
Laya.class(Trace, "Trace", null, null);
