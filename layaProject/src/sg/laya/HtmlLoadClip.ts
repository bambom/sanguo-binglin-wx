/**
 * Laya.HtmlLoadClip —— 宿主页 HTML 加载进度条桥（注册名 "HtmlLoadClip"）。
 * 宿主注入 clipH5FuncLoad/clipH5FuncLoadTxt/clipH5FuncClear/isH5Android 时生效。
 *
 * 原文：code1.js 字节 [287446,287956]（包装变量 Lt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/HtmlLoadClip.js
 *
 * 依赖：m=laya.utils.Browser（UMD 级别名）。
 */
export class HtmlLoadClip {

    constructor() {
    }

    public static setLoadValue(i: any, e?: number): void {
        void 0 === e && (e = 1),
            HtmlLoadClip.isHtmlLoad && laya.utils.Browser.window && (<any>laya.utils.Browser.window).clipH5FuncLoad && (<any>laya.utils.Browser.window).clipH5FuncLoad(i, e);
    }

    public static setLoadTxt(i: any, e: any): void {
        HtmlLoadClip.isHtmlLoad && laya.utils.Browser.window && (<any>laya.utils.Browser.window).clipH5FuncLoadTxt && (<any>laya.utils.Browser.window).clipH5FuncLoadTxt(i, e);
    }

    public static delLoad(): void {
        HtmlLoadClip.isHtmlLoad && laya.utils.Browser.window && (<any>laya.utils.Browser.window).clipH5FuncClear && (<any>laya.utils.Browser.window).clipH5FuncClear();
    }

    public static isH5Android(): boolean {
        return !!(HtmlLoadClip.isHtmlLoad && laya.utils.Browser.window && (<any>laya.utils.Browser.window).isH5Android) && (<any>laya.utils.Browser.window).isH5Android;
    }

    public static isHtmlLoad: boolean = false;
}

/**
 * 注册身份等价物：原文 o(t,"HtmlLoadClip")（2 参注册，无基类；全局名 Laya.HtmlLoadClip）。
 */
Laya.class(HtmlLoadClip, "HtmlLoadClip", null, null);
