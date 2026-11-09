/**
 * sg.utils.ObjectSingle —— 按 __className 的单例登记器（跨视图/管理器复用实例）。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类；静态 sDic 表。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ObjectSingle.js
 */
export class ObjectSingle {

    constructor() {
    }

    /** 取/建单例：已存在且未 destroyed 则复用；否则 new i 并回填 sDic，同时补写 id（类名末段） */
    public static getInstance(i: any): any {
        var e = i.__className,
            s = ObjectSingle.sDic[e];
        s && !s.destroyed || (s = ObjectSingle.sDic[e] = new i);
        var n = e.split(".");
        return s.id = n[n.length - 1], ObjectSingle.sDic[e];
    }

    public static clear(): void {
        ObjectSingle.sDic = {};
    }

    public static sDic: any = {};
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.ObjectSingle")（2 参注册，无基类）。
 */
Laya.class(ObjectSingle, "sg.utils.ObjectSingle", null, null);
