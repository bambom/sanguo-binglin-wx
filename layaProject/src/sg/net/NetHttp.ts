/**
 * sg.net.NetHttp —— HTTP 请求通道：send 队列 + hmac 签名（FastSha256）+ 统一
 * format 派发（return_code 0/2000 放行回调）；另含 checkArea（mip 归属判定）、
 * postOther（数据上报）、get/postRequest、downLoad 及临时对象池 newNetHttpObjDic。
 *
 * 原文：code1.js 包装函数 function(t){...o(i,"sg.net.NetHttp",t)...}，
 * 基类 t=laya.events.EventDispatcher（构造调用 i.__super.call(this)）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/NetHttp.js
 *
 * Rt=sg.cfg.ConfigApp、Gt=sg.cfg.ConfigServer（模块直引）；Ts=Trace（模块直引）；
 * R=laya.net.HttpRequest；Pe=sg.net.NetVo（批次外，环境声明）；
 * cs=sg.utils.ObjectUtil（模块直引）；es=sg.utils.FastSha256（批次外，环境声明）。
 * 原文方法体内以 i 指“本类”的写法（i.newNetHttpObjDic 等）→ TS 类直引。
 */
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";
import { ObjectUtil } from "../utils/ObjectUtil";

export class NetHttp extends laya.events.EventDispatcher {

    constructor() {
        super();
        this.isSending = !1;
        this.mHttp = null;
        this.mSendList = null;
        this.mSendListDic = null;
        this.mID = "";
    }

    public isSending: boolean;
    public mHttp: laya.net.HttpRequest;
    public mSendList: any[];
    public mSendListDic: any;
    public mID: string;

    public send(t: string, i: any, e: any, s?: number): void {
        void 0 === s && (s = 60),
            this.mHttp || this.init();
        var n = new sg.net.NetVo(t, i, e, s);
        this.mSendListDic[t] = n,
            this.isSending || this.exe(t);
    }

    /** mip 探测：结果写 ConfigApp.isChina */
    public checkArea(): void {
        var t = ConfigApp.get_area_check();
        if (Trace.log("====>>>> mip地址URL ", t), t && "" != t) {
            var i = new laya.net.HttpRequest();
            i.on("complete", null, function (t) {
                ConfigApp.isChina = t, Trace.log("====>>>> mip地址 == ", t);
            }),
                i.on("progress", null, function (t) {
                }),
                i.on("error", null, function (t) {
                }),
                i.send(ConfigApp.getURLType(t));
        }
    }

    public postOther(t: string, i: any, e: any): void {
        var s = ConfigApp.get_data_report();
        if (s && "" != s) {
            var n = new laya.net.HttpRequest();
            n.on("complete", null, function (t) {
                Trace.log("====>>>> postOther res ==>> ", s, t);
            }),
                n.on("progress", null, function (t) {
                }),
                n.on("error", null, function (t) {
                }),
                n.send(ConfigApp.getURLType(s) + t, JSON.stringify(i), "post", "json");
        }
    }

    public getRequest(t: string, i: laya.utils.Handler): void {
        if (t) {
            var e = new laya.net.HttpRequest();
            e.on("complete", this, function (t) {
                i && i.runWith(t);
            }),
                e.on("progress", this, function (t) {
                }),
                e.on("error", this, function (t) {
                }),
                e.send(ConfigApp.getURLType(t), null, "get", "");
        }
    }

    public postRequest(t: string, i: any, e: laya.utils.Handler, s?: any): void {
        if (t && i) {
            var n = new laya.net.HttpRequest();
            n.on("complete", this, function (t) {
                e && e.runWith(t);
            }),
                n.on("progress", this, function (t) {
                }),
                n.on("error", this, function (t) {
                }),
                n.send(ConfigApp.getURLType(t), "string" == typeof i ? i : JSON.stringify(i), "post", "string" == typeof i ? "text" : "json", s);
        }
    }

    public downLoad(t: string): void {
        var i = new laya.net.HttpRequest();
        i.on("complete", this, this.onCompleteDown),
            i.on("progress", this, this.onProcessDown),
            i.on("error", this, this.onErrorDwon),
            i.send(ConfigApp.getURLType(t), null, "get", "", null);
    }

    public onErrorDwon(t: any): void {
    }

    public onProcessDown(t: any): void {
    }

    public onCompleteDown(t: any): void {
    }

    public init(): void {
        this.mHttp = new laya.net.HttpRequest(),
            this.mHttp.on("complete", this, this.onComplete),
            this.mHttp.on("progress", this, this.onProcess),
            this.mHttp.on("error", this, this.onError),
            this.mSendList = [],
            this.mSendListDic = {};
    }

    /** 发起前按 system_simple.hmac_key + sign_methods 命中做签名 */
    public exe(t: string): void {
        this.isSending = !0;
        var i = this.mSendListDic[t].sendData;
        if (Trace.log("====>>>> Http发送请求【" + t + "】", i),
            ConfigServer.system_simple && i.params) {
            var e = ConfigServer.system_simple.hmac_key,
                s = (ConfigServer.system_simple.sign_methods || []).some(function (i) {
                    return t === i;
                });
            e && s && this.signHttpData(e, t, i);
        }
        this.mHttp.send(ConfigApp.get_HTTP_URL(), JSON.stringify(i), "post", "json");
    }

    public signHttpData(t: string, i: string, e: any): void {
        e.timestamp = (new Date).getTime();
        var s = [
            "id=" + e.id,
            "method=" + i,
            "pf=" + e.pf,
            "timestamp=" + e.timestamp,
            "params=" + ObjectUtil.keys(e.params).filter(function (t) {
                return "pwd" != t && ("string" == typeof e.params[t] || "number" == typeof e.params[t]);
            }).sort().map(function (t) {
                return "p." + t + "=" + e.params[t];
            }).join("&")
        ].join("&"),
            n = sg.utils.FastSha256.hmac(t, s);
        e.sign = n;
    }

    /** 统一回包处理：0/2000 视为成功（runCallBack + clear + 临时池清理） */
    public format(t: any, e?: number): void {
        void 0 === e && (e = 0),
            this.isSending = !1;
        var s = this.mSendListDic[t.method], n = Number(t.return_code);
        if (Trace.log("<<<<==== Http返回数据【" + t.method + "】", t),
            0 == n || 2e3 == n) {
            s.reData(t, n), s.runCallBack(), s.clear(),
                NetHttp.newNetHttpObjDic && this.mID && NetHttp.newNetHttpObjDic[this.mID] && delete NetHttp.newNetHttpObjDic[this.mID];
        } else Trace.log("<<<<==== Http返回format格式化后code异常 ", s.re);
    }

    public onComplete(t: any): void {
        this.format(t, 1);
    }

    public onProcess(t: any): void {
        this.isSending = !0;
    }

    public onError(t: any): void {
        this.isSending = !1,
            Trace.log("<<<<==== Http返回错误error ", t),
            this.event("event_net_error");
    }

    /** r(1,i,"instance",getter,EventDispatcher._$SET_instance) —— 惰性单例 + 可写回（setter 语义按 Laya 标记补写） */
    public static get instance(): NetHttp {
        return NetHttp.sNetHttp = NetHttp.sNetHttp || new NetHttp();
    }
    public static set instance(v: NetHttp) {
        NetHttp.sNetHttp = v;
    }

    /** 一次性请求对象：自建实例入 newNetHttpObjDic 池，mID 为时间戳 */
    public static newNetHttpObj(t: string, e: any, s: any, n?: number): NetHttp {
        void 0 === n && (n = 60);
        var h = new NetHttp();
        return h.mID = (new Date).getTime() + "",
            h.send(t, e, s, n),
            NetHttp.newNetHttpObjDic[h.mID] = h,
            h;
    }

    public static checkReIsError(t: any): boolean {
        var i = !1;
        return t && t.status && "error" == t.status && (i = !0), i;
    }

    public static sNetHttp: NetHttp = null;
    public static STATUS_SERVER_CLOSE: number = 2e3;
    public static STATUS_SERVER_OK: number = 0;
    public static HTTP_POST: string = "post";
    public static HTTP_GET: string = "get";
    public static EVENT_NET_ERROR: string = "event_net_error";
    public static newNetHttpObjDic: any = {};
}

/**
 * 注册身份等价物：原文 o(i,"sg.net.NetHttp",t)（t=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(NetHttp, "sg.net.NetHttp", null, null);
