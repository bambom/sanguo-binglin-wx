/**
 * sg.utils.ThirdRecording —— 第三方统计（ThinkingData）上报桥：
 * 仅 Android 原生（Browser.onAndroid 且非 test/jj_ad）经 ToJava.callMethod 透传。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ThirdRecording.js
 *
 * ks=ToJava（本批次模块直引）；Rt=sg.cfg.ConfigApp（模块直引）；m=laya.utils.Browser。
 */
import { ToJava } from "../laya/ToJava";
import { ConfigApp } from "../cfg/ConfigApp";

export class ThirdRecording {

    constructor() {
    }

    public static setUid(t: any): void {
        ThirdRecording.isAnd() && ToJava.callMethod("ta_setUserUniqueID", t, null);
    }

    /** 原文语义：数组长度恰为 7 时追加 !0 标记后上送 */
    public static setPay(t: any[]): void {
        ThirdRecording.isAnd() && t && 7 == t.length && (t.push(!0), ToJava.callMethod("ta_setPurchase", t, null));
    }

    public static setRegister(): void {
        ThirdRecording.isAnd() && ToJava.callMethod("ta_setRegister", ["mobile", !0], null);
    }

    /** Android 且渠道非 test/jj_ad（原文 pf 直比，注释语义） */
    public static isAnd(): boolean {
        var t = !1;
        return !laya.utils.Browser.onAndroid || "test" != ConfigApp.pf && "jj_ad" != ConfigApp.pf || (t = !0), t;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.ThirdRecording")（2 参注册，无基类）。
 */
Laya.class(ThirdRecording, "sg.utils.ThirdRecording", null, null);
