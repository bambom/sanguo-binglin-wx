/**
 * sg.utils.MessagePack —— socket/HTTP 配置二进制编解码 + XOR 混淆帧封装
 * （msgpack5 全局工厂的薄封装，批次 L；F8 死点本体 ViewLoad.initAssetsAndServerCfg:305）。
 *
 * 原文：code1.js 字节 [1117352,1119311)（os= 声明器，注册 o(i,t(17079)) 2 参形态，
 * 无基类；t(17079)=pool[16864]="sg.utils.MessagePack"）。前邻 FastSha256
 * （t._md5=null,t}()）、后邻 rs=sg.utils.MouseUtil——sg.utils 工具簇。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-l/MessagePack.js
 *
 * 入批依据：ViewLoad.initAssetsAndServerCfg:305 `sg.utils.MessagePack.create(cb)`
 * （cb=initServerConfig）——initData 尾 mFunQueue.init 同步队列第 2 项（批次 K 后
 * F8 第 10 次边界：reading 'create'）。create 内部静态初始化触达 0 未译类（resolve_l.js
 * 作用域链：自由变量仅引擎别名 + ConfigApp + UMD 助手 + 内建）。
 *
 * msgpack5 桥接关系（game.js 实证，@1207744 起主模块尾部）：
 *   require("weapp-adapter.js"), window.msgpack5=require("./js/msgpack5.min"), ...,
 *   window.game37_pf="wx_37", ..., require("./laya.js"), require("./code.js")
 * ——依赖方向为 **MessagePack 消费全局 window.msgpack5 工厂**（msgpack5.min.js 完整
 * 库内嵌于 game.js 的 define("js/msgpack5.min.js") 模块，@141365 起，buffer:!0 二进制
 * 模式）；本类自身只实现混淆帧层（obfuscateFrame/deobfuscateFrame/xorFrame/
 * calcCheckSum/verifyCheckSum/getRandomInt），编解码本体转发 _msgPack 实例。
 * create 三分支：releaseWeiXin → MiniAdpter.window.msgpack5()（wx_37 即此路：
 * window.game37_pf="wx_37" 由 game.js 主模块先置，ConfigApp.releaseWeiXin 的
 * s.game37_pf 比较命中）；releaseDouYin → TTMiniAdapter.window.msgpack5()；
 * 其余（H5 浏览器）动态注入 scripts/msgpack5.min.js 后回调。微信/抖音分支回调
 * 同步执行（void e()），H5 分支回调在 script.onload 异步执行。
 *
 * 身份（resolve_l.js，acorn 作用域链 + 池串双证）：
 *   Rt=sg.cfg.ConfigApp（声明器 @427899，o(i,t(12677))→pool[12462]；批次 B ✓）、
 *   $=laya.wx.mini.MiniAdpter、gt=laya.tt.mini.TTMiniAdapter、m=laya.utils.Browser、
 *   Tt=laya.net.URL（引擎别名表）、o=Laya.class、n=UMD 主解码器。
 * 家族封闭：池内类名含 MessagePack 恰 1 条；唯一字面命中 @264840 为池数组条目本体；
 * 无 sg2/sg3 变体。声明器单一 CallExpression（`}(),os=function(){...}(),rs=` 字节
 * 实证，非 Ee 式逗号双跳）。
 *
 * 保真注记：
 * - 帧布局 [1B 随机种子 n][h=n%5+1 字节随机填充][XOR 载荷][1B 校验和]，XOR 键
 *   (n+o[0])%256、校验和 sum%256——原文字节运算逐一照抄；
 * - 错误串为两段池串运行时拼接（"DeObfuscateError"+": frame length not enough" 等），
 *   保留两段 + 号形态；RAND_LEN_RANGE=5/CHECK_SUM_LEN=1 静态常量在方法体内
 *   未被引用（字面量直写 h=n%5+1），仅作声明面照抄；
 * - xorFrame/calcCheckSum/getRandomInt 的形参 i 遮蔽原文类变量 i（本方法不用类
 *   面），TS 中类名即 MessagePack、无遮蔽，形参名照抄保留；
 * - create 的 return 为逗号表达式 `_msgPack=..., void e()`（赋值副作用 + void
 *   回调 + 返回 undefined）原样保留；
 * - PROTOCOL_TYPE_ERROR 静态在原文/全 code1.js 无消费点（声明面照抄）。
 */
import { ConfigApp } from "../cfg/ConfigApp";
import MiniAdpter = laya.wx.mini.MiniAdpter;
import TTMiniAdapter = laya.tt.mini.TTMiniAdapter;
import Browser = laya.utils.Browser;
import URL = laya.net.URL;

export class MessagePack {

    constructor() {
        // 原文构造器为空函数
    }

    /** 惰性初始化 msgpack5 实例：微信/抖音走适配器全局，H5 动态注入 script 后回调 */
    public static create(e: any): void {
        if (ConfigApp.releaseWeiXin())
            return MessagePack._msgPack = MiniAdpter.window.msgpack5(), void e();
        if (ConfigApp.releaseDouYin())
            return MessagePack._msgPack = TTMiniAdapter.window.msgpack5(), void e();
        var n: any = Browser.document.createElement("script");
        n.type = "text/javascript",
            n.src = URL.formatURL("scripts/msgpack5.min.js"),
            n.onload = function () {
                MessagePack._msgPack = Browser.window.msgpack5(),
                    e();
            },
            Browser.document.head.appendChild(n);
    }

    /** 编码：msgpack5.encode → 混淆帧 → ArrayBuffer */
    public static encode(e: any): any {
        var n = MessagePack._msgPack.encode(e);
        return MessagePack.obfuscateFrame(n).buffer;
    }

    /** 解码：去混淆帧 → msgpack5.decode */
    public static decode(e: any): any {
        var n = MessagePack.deobfuscateFrame(new Uint8Array(e));
        return MessagePack._msgPack.decode(n.buffer);
    }

    /** 混淆帧：[种子 n][h=n%5+1 随机填充][XOR 载荷][校验和] */
    public static obfuscateFrame(e: any): Uint8Array {
        if (!e || 0 == e.length)
            return new Uint8Array(0);
        for (var n = MessagePack.getRandomInt(255, 1), h = n % 5 + 1, o = new Uint8Array(h), r = 0; r < h; r++)
            o[r] = MessagePack.getRandomInt(256);
        var a = (n + o[0]) % 256,
            l = MessagePack.xorFrame(e, a),
            c = MessagePack.calcCheckSum(l),
            u = 1 + h + l.length + 1,
            d = new Uint8Array(u);
        for (d[0] = n, r = 0; r < h; r++)
            d[1 + r] = o[r];
        for (r = 0; r < l.length; r++)
            d[1 + h + r] = l[r];
        return d[u - 1] = c, d;
    }

    /** 去混淆帧：校验长度/校验和，还原 XOR 载荷；错误串两段池串拼接原文如此 */
    public static deobfuscateFrame(e: any): Uint8Array {
        if (!e || 0 == e.length)
            return new Uint8Array(0);
        if (e.length < 3)
            throw new Error("DeObfuscateError" + ": frame length not enough");
        var n = e[0],
            h = n % 5 + 1,
            o = 1 + h + 1;
        if (e.length < o)
            throw new Error("DeObfuscateError" + ": frame length not enough");
        for (var r = new Uint8Array(h), a = 0; a < h; a++)
            r[a] = e[1 + a];
        var l = (n + r[0]) % 256,
            c = 1 + h,
            u = e.length - (1 + h + 1),
            d = new Uint8Array(u);
        for (a = 0; a < u; a++)
            d[a] = e[c + a];
        var _ = e[e.length - 1];
        if (!MessagePack.verifyCheckSum(d, _))
            throw new Error("CheckSumError" + ": frame tampered or network corrupted");
        return MessagePack.xorFrame(d, l);
    }

    /** 逐字节 XOR（形参 i 原文遮蔽类变量，本方法不用类面） */
    public static xorFrame(i: any, e: number): Uint8Array {
        for (var n = new Uint8Array(i.length), h = 0; h < i.length; h++)
            n[h] = i[h] ^ e;
        return n;
    }

    /** 校验和：字节和 % 256（形参 i 同上遮蔽注记；原文累加器 s/计数器 n 命名保留） */
    public static calcCheckSum(i: any): number {
        for (var s = 0, n = 0; n < i.length; n++)
            s += i[n];
        return s % 256;
    }

    public static verifyCheckSum(e: any, s: number): boolean {
        return MessagePack.calcCheckSum(e) == s;
    }

    /** [min,max) / [min,min+e] 随机整数（形参 i 同上遮蔽注记；e 缺省 0） */
    public static getRandomInt(i: number, e?: number): number {
        return void 0 === e && (e = 0),
            e = Math.ceil(e),
            i = Math.floor(i),
            0 === e ? Math.floor(Math.random() * i) : Math.floor(Math.random() * (i - e + 1)) + e;
    }

    /* ---- 静态字段（原文尾部赋值序） ---- */
    public static _msgPack: any = null;
    public static RAND_LEN_RANGE: number = 5;
    public static CHECK_SUM_LEN: number = 1;
    public static DE_OBFUSCATE_ERROR: string = "DeObfuscateError";
    public static CHECK_SUM_ERROR: string = "CheckSumError";
    public static PROTOCOL_TYPE_ERROR: string = "ProtocolTypeError";
}

/**
 * 注册身份等价物：原文 o(i,t(17079))（2 参，无基类；池串 17079→pool[16864]）。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(MessagePack, "sg.utils.MessagePack", null, null);
