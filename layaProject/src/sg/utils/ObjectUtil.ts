/**
 * sg.utils.ObjectUtil —— 对象工具：浅/深 clone、mergeObjects（数字可叠加）、
 * keys/values/entries、className（取 __className 末段）、drawLinesByImg（按图元画折线）。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ObjectUtil.js
 *
 * Ts=Trace（模块直引）；Ie=sg.map.utils.Vector2（批次外，环境声明）；
 * F=laya.ui.Image（引擎 d.ts）；le=sg.manager.EffectManager（模块直引）。
 * 原文自引 sg.utils.ObjectUtil 全局路径 → TS 类直引。
 */
import { Trace } from "../laya/Trace";
import { EffectManager } from "../manager/EffectManager";

export class ObjectUtil {

    constructor() {
    }

    /** i=!0 深拷贝（JSON 往返）；默认浅拷贝（数组保形） */
    public static clone(t: any, i?: boolean): any {
        if (void 0 === i && (i = !1), "object" != typeof t || null === t) return t;
        var e: any;
        if (i) e = JSON.parse(JSON.stringify(t));
        else for (var s in e = t instanceof Array ? [] : {}, t) e[s] = t[s];
        return e;
    }

    /** 递归深拷贝（仅自有属性） */
    public static clone2(i: any): any {
        if ("object" != typeof i || null === i) return i;
        var e: any;
        if (i instanceof Array) {
            e = [];
            for (var s = 0; s < i.length; s++) e[s] = ObjectUtil.clone2(i[s]);
        } else
            for (var n in e = {}, i) i.hasOwnProperty(n) && (e[n] = ObjectUtil.clone2(i[n]));
        return e;
    }

    /** 顺序合并对象数组；i=!0 时同键数字相加（默认），否则后者覆盖 */
    public static mergeObjects(t: any[], i?: boolean): any {
        void 0 === i && (i = !0);
        var e: any = {};
        return t.filter(function (t) {
            return ObjectUtil.keys(t).length > 0;
        }).forEach(function (t) {
            for (var s in t) e.hasOwnProperty(s) && i && "number" == typeof t[s] && "number" == typeof e[s] ? e[s] += t[s] : e[s] = t[s];
        }), e;
    }

    public static keys(t: any): string[] {
        var i: string[] = [];
        if (!t) return i;
        for (var e in t) t.hasOwnProperty(e) && i.push(e);
        return i;
    }

    public static values(t: any): any[] {
        var i: any[] = [];
        for (var e in t) t.hasOwnProperty(e) && i.push(t[e]);
        return i;
    }

    public static entries(t: any): any[] {
        var i: any[] = [];
        for (var e in t) t.hasOwnProperty(e) && i.push([e, t[e]]);
        return i;
    }

    public static className(t: any): string {
        return t.__className.match(/\.\b([^.]+)$/)[1];
    }

    /** 用贴图 i 在容器 t 上按点列 e 画折线段（点为 [x,y,x,y,...]，偶数校验按原文 len+1） */
    public static drawLinesByImg(t: any, i: any, e: number[], s: any): void {
        if (t) if (e) if (i) {
            if (e && (e.length + 1) % 2 == 0) Trace.log("drawLinesByImg data 数据不是偶数");
            else
                for (var n: any, h: any, o = 0, r = 0, a = 0, l = 0, c = 0; c < e.length; c++)
                    if (c % 2 == 0) {
                        if (0 != c && (a = o, l = r, h = n),
                            o = Number(e[c].toFixed(2)), r = Number(e[c + 1].toFixed(2)),
                            n = new sg.map.utils.Vector2(o, r), 0 == c) continue;
                        var u = "_" + o + "_" + r + "_" + a + "_" + l;
                        if (t.getChildByName(u)) { } // 原文空语句体（TS1313），语义不变
                        else {
                            var d = new laya.ui.Image(i);
                            d.x = o, d.y = r, d.name = u;
                            var _ = new sg.map.utils.Vector2(a - o, l - r).angle * (180 / Math.PI);
                            d.width = n.dist(h), d.rotation = _, t.addChild(d), EffectManager.changeSprColor(d, s);
                        }
                    }
        } else Trace.log("drawLinesByImg skin is null");
        else Trace.log("drawLinesByImg data is null");
        else Trace.log("drawLinesByImg box is null");
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.ObjectUtil")（2 参注册，无基类）。
 */
Laya.class(ObjectUtil, "sg.utils.ObjectUtil", null, null);
