/**
 * sg.utils.ArrayUtil —— 数组工具：fill/padding/flat/find/findIndex/sum/distinct/
 * linspace/shuffle。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ArrayUtil.js
 */
export class ArrayUtil {

    constructor() {
    }

    /** [e, s) 区间填 i；s 缺省 0 表示到末尾；e/s 位运算取整 */
    public static fill(t: any[], i: any, e?: number, s?: number): any[] {
        for (void 0 === e && (e = 0), void 0 === s && (s = 0), e |= 0, (0 === s || s > t.length) && (s = t.length); e < s;)
            t[e++] = i;
        return t;
    }

    /** 补长到 i：s=!0 尾部补（默认），!1 头部补 */
    public static padding(t: any[], i: number, e?: any, s?: boolean): any[] {
        if (void 0 === s && (s = !0), (t = [].concat(t)).length < i) {
            var n = ArrayUtil.fill(new Array(i - t.length), e);
            return s ? t.concat(n) : n.concat(t);
        }
        return t.concat();
    }

    /** 递归拍平 i 层 */
    public static flat(t: any[], i?: number): any[] {
        if (void 0 === i && (i = 1), "number" != typeof i || i < 1) return t;
        var e: any[] = [];
        return function t(i: any, s: number, n: number) {
            i.forEach(function (i) {
                i instanceof Array && n <= s ? t(i, s, n + 1) : e.push(i);
            });
        }(t, i, 1), e;
    }

    public static find(t: any[], i: any, e?: any): any {
        return t.filter(i, e)[0];
    }

    public static findIndex(t: any[], i: any, e?: any): number {
        var s = t.filter(i, e);
        return s.length ? t.indexOf(s[0]) : -1;
    }

    public static sum(t: number[]): number {
        for (var i = 0, e = t.length, s = 0; s < e; s++) i += t[s];
        return i;
    }

    public static distinct(t: any[]): any[] {
        var i: any[] = [], e: any = {};
        return t.forEach(function (t) {
            e[t] || (i.push(t), e[t] = 1);
        }), i;
    }

    /** 线性等分 [t, i] 共 e 点；e<1 返回空（原文用 toString().split(",") 造洞） */
    public static linspace(t: number, i: number, e: number): number[] {
        if (e >= 1) {
            var s = (i - t) / (e - 1);
            return new Array(e).toString().split(",").map(function (i, e) {
                return t + s * e;
            });
        }
        return [];
    }

    /** Fisher-Yates 原地洗牌 */
    public static shuffle(t: any[]): any[] {
        for (var i = t.length - 1; i > 0; i--) {
            var e = Math.floor(Math.random() * (i + 1)), s = t[i];
            t[i] = t[e], t[e] = s;
        }
        return t;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.ArrayUtil")（2 参注册，无基类）。
 */
Laya.class(ArrayUtil, "sg.utils.ArrayUtil", null, null);
