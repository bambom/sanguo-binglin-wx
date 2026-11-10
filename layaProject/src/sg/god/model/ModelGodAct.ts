/**
 * sg.god.model.ModelGodAct —— 神将活动文案加解密静态工具（sg.god 命名空间首个落地的类，
 * F8 死点本体，批次 N）。
 *
 * 原文：code1.js 字节 [817726,818933)（var 语句声明器 Vi=，0 参 IIFE，注册
 * o(i,t(9746)) 池化名 2 参形态——t(9746)=pool[9531]="sg.god.model.ModelGodAct"，
 * 池数组字面 @byte151763 为池条目本体；无基类、空构造器）。前邻 = 枚举常量
 * IIFE 尾 `e}(),`，后邻 = `,Wi=`（sg.god.model.ModelGodIcon，同簇下一声明器）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-n/ModelGodAct.js
 *
 * 入批依据：F8 第 12 次边界命中 `Cannot read properties of undefined (reading
 * 'model')` at ConfigServer.initMsg（ConfigServer.js:119 ← writeCfg:113 ←
 * updateCfgs:338）——`sg.god` 命名空间整体未注册（本类为该命名空间在配置管线上的
 * 首个触达）。消费面（批次 B ConfigServer.ts 全局路径形态，3 处）：initMsg:100
 * 读静态 cEnS/写静态 deS（繁简体开关：return_msg[100] "n" 开头=繁体→deS 置 !1，
 * 否则 deS 置 !0）、writeCfg 链 :143/:146 的 benja/bens（ConfigApp.testFightType
 * 测试注入分支，默认短路）。注册即经 Laya.class 的 __package 机制创建
 * sg.god.model 命名空间链，initMsg 的读取前提随之成立。
 *
 * 身份（作用域链+池串双证，resolve_n.js/locate_n.js）：wrapper 自由变量仅
 * {String, JSON, i(自引), n, o}——n=UMD 主解码器（UMD 头 `var n=t`，t=工厂级
 * 解码器 @1029）、o=s[n(5349)]=Laya.class（池 5134，批次 K/L/M 同证）；静态成员
 * 名/内建名全池化（ens=4344/desm=12957/des=10628/dej=4503/bens=7076/benj=2148/
 * benja=18031/cEnS=17327/cEnJ=2999/deS=6348/length=16349/charCodeAt=6129/
 * toString=17409/fromCharCode=10912/parse=1993/stringify=7692）；"h" 与 7 常量
 * （H1/H2/C1/C2/ID/OS）为字面量名。声明器单一 CallExpression（acorn 实证
 * callee=FunctionExpression/args=0，非 Ee 式逗号双跳；与枚举 IIFE、Wi 同一 var
 * 语句为多声明器形态，Vi 自身单宿主）。
 *
 * sg.god.* 家族封闭（本批专项查证）：全家族 35 类 = model 层 5（池化名注册：
 * ModelGod t(17504)@805428、ModelGodAct t(9746)=本类、ModelGodIcon t(7852)@819255
 * ≈Wi、ModelGodSkill t(8661)@819671、ModelGodMain t(13453)@1765355 3 参带基类
 * i=As=ViewModelBase，在册 bo，批次 D 曾以「bo=GodMain」登记身份）+ components
 * 层 14 + view 层 16（字面量注册，全在册）。sg.god 命名空间此前 0 类落地——
 * 本类注册即建链，其余 34 类玩法/视图期触达缓译。
 *
 * 保真注记：
 * - 编码算法逐式照抄：h 哈希 Σ charCodeAt(k)*(k+1)*59999 % 241；ens 加密
 *   `code+14 再 XOR`（偶数下标 ^150^hash、奇数 ^167^hash）；des 解密为严格逆
 *   （`XOR 再 -14`）；方法体内 59999/241/150/167/"z"/14 以字面量直写（同原文，
 *   不经 H1..OS 常量引用——常量仅为声明面）；
 * - 键参缺省 "z"（=ID 常量）与 `s?s.toString():"z"` 的 toString 调用保留；
 * - desm 按 deS 开关分派（deS 默认 !0 → 读取即走 des）；initMsg:100 对 deS 的
 *   两种写路径（"n" 前缀且 !cEnS 时置 !1，否则置 !0）在 ConfigServer.ts（批次 B）；
 * - bens 在 cEnS 关闭时无 else 分支（返回 undefined）原文如此照抄；benj 无返回值；
 *   benja 循环条件每轮重求 e.length（原文 `h<e[s(16349)]` 池化解码形态）保留；
 * - benj 的 for-in 内 `e[r]=o` 逐键替换（stringify→ens）顺序保留；
 * - 形参 i（h 方法）原文遮蔽类变量 i，本方法不用类面，形参名照抄（MessagePack
 *   xorFrame 先例）；ens/des 的 for-init 逗号序列（h/o/r/a/l=0/c/u）逐位保留；
 * - 原文先注册后挂静态成员；TS 类静态在类定义期挂全、注册在模块尾执行——消费者
 *   首次触达必在模块求值后，观测等价（批次 A「注册等价决策」先例）；
 * - 静态字段赋值序照抄（cEnS/cEnJ/deS/H1/H2/C1/C2/ID/OS）。
 */
export class ModelGodAct {

    constructor() {
        // 原文构造器为空函数
    }

    /** 串哈希：Σ charCodeAt(k)*(k+1)*59999 % 241（null/undefined → 0）；形参 i 原文遮蔽类变量 i，本方法不用类面 */
    public static h(i: any): number {
        if (null == i)
            return 0;
        for (var s = 0, n = i.length, h = 0; h < n; h++)
            s += i.charCodeAt(h) * (h + 1) * 59999;
        return s % 241;
    }

    /** 加密串：code+14 再 XOR（偶位 ^C1^hash / 奇位 ^C2^hash；键缺省 "z"） */
    public static ens(e: any, s: any): any {
        if (!e || 0 === e.length)
            return e;
        s = s ? s.toString() : "z";
        for (var h = ModelGodAct.h(s), o = 150 ^ h, r = 167 ^ h, a = "", l = 0, c = e.length, u = 0; u < c; u++)
            l = e.charCodeAt(u) + 14,
            l ^= u % 2 == 0 ? o : r,
            a += String.fromCharCode(l);
        return a;
    }

    /** 带开关解密：deS 开（默认）走 des，关则原样返回 */
    public static desm(e: any, s: any): any {
        return ModelGodAct.deS ? ModelGodAct.des(e, s) : e;
    }

    /** 解密串：XOR 再 -14（ens 的严格逆；键缺省 "z"） */
    public static des(e: any, s: any): any {
        if (!e || 0 === e.length)
            return e;
        s = s ? s.toString() : "z";
        for (var h = ModelGodAct.h(s), o = 150 ^ h, r = 167 ^ h, a = "", l = 0, c = e.length, u = 0; u < c; u++)
            l = e.charCodeAt(u),
            l ^= u % 2 == 0 ? o : r,
            a += String.fromCharCode(l - 14);
        return a;
    }

    /** 解密 + JSON.parse */
    public static dej(e: any, s: any): any {
        var h = ModelGodAct.des(e, s);
        return JSON.parse(h);
    }

    /** 对象逐值加密（cEnS 关闭时无 else，返回 undefined 原文如此） */
    public static bens(e: any): any {
        if (ModelGodAct.cEnS) {
            var n, h;
            for (var o in e)
                n = e[o],
                h = ModelGodAct.ens(n, o),
                e[o] = h;
            return e;
        }
    }

    /** 对象逐值加密（JSON.stringify 后 ens；无返回值） */
    public static benj(e: any): void {
        if (ModelGodAct.cEnJ) {
            var n, h, o;
            for (var r in e)
                n = e[r],
                h = JSON.stringify(n),
                o = ModelGodAct.ens(h, r),
                e[r] = o;
        }
    }

    /** 对象数组逐项 benj（循环条件每轮重求 e.length 原文如此） */
    public static benja(e: any): void {
        if (ModelGodAct.cEnJ)
            for (var n, h = 0; h < e.length; h++)
                n = e[h],
                ModelGodAct.benj(n);
    }

    /* ---- 静态字段（原文尾部赋值序；59999/241/150/167/"z"/14 在方法体内为字面量直写，常量仅声明面） ---- */
    public static cEnS: boolean = false;
    public static cEnJ: boolean = false;
    public static deS: boolean = true;
    public static H1: number = 59999;
    public static H2: number = 241;
    public static C1: number = 150;
    public static C2: number = 167;
    public static ID: string = "z";
    public static OS: number = 14;
}

/**
 * 注册身份等价物：原文 o(i,t(9746))（2 参，无基类；池串 9746→pool[9531]）。
 * 注册即创建 sg.god.model 命名空间链（Laya.class 的 __package 机制）——
 * ConfigServer.initMsg 的 `sg.god.model.ModelGodAct.cEnS` 全局路径读取前提。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelGodAct, "sg.god.model.ModelGodAct", null, null);
