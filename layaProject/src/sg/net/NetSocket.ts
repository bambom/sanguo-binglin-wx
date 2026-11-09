/**
 * sg.net.NetSocket —— 长连接通道：URL 装配（ws/wss gateway）、心跳重连
 * （checkConnected / closeTimes 上限 9）、收包派发（MessagePack/JSON）、
 * 请求包登记（requestPkg/timeoutPkg）、监听注册（notificationMap/groups）、
 * 错误码分派（checkErrorCode）与服务器主动通知（notifyOnlyListeners）。
 *
 * 原文：code1.js 包装函数 function(t){...o(i,"sg.net.NetSocket",t)...}，
 * 基类 t=laya.events.EventDispatcher。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/NetSocket.js
 *
 * 别名：lt=laya.net.Socket；s=Laya；m=laya.utils.Browser；P=laya.utils.Handler；
 * Ts=Trace、vs=Tools、be=TestUtils、Rt=ConfigApp、Gt=ConfigServer、tn=ViewManager（模块直引）；
 * C7=sg.scene.view.TestButton、os=sg.utils.MessagePack、W7=sg.test.testpakcage.TestPackage、
 * Ee=sg.net.NetMethodCfg、js=sg.guide.model.ModelGuide、$t=sg.crossService.CrossServiceFacade、
 * ho=sg.crossService.model.CrossServiceUserModel、c4=sg.view.hero.ViewAwakenHero（批次外，环境声明）。
 * 原文方法体内以 i 指“本类”（i.isSpecailClose、i.pingTimer 等）→ TS 类直引。
 */
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";
import { Tools } from "../utils/Tools";
import { TestUtils } from "../map/utils/TestUtils";
import { ViewManager } from "../manager/ViewManager";

export class NetSocket extends laya.events.EventDispatcher {

    constructor() {
        super();
        this.timeoutPkg = {};
        this.groups = {};
        this.service_force_close = !1;
        this.sleepTime = [0, 0, 0];
        this.connectNum = 0;
        this.login_succ_num = 0;
        this.reConnetIng = !1;
        this.HTTP_URL = "";
        this.mSocket = null;
        this.closeTimes = 0;
        this.requestPkg = {};
        this.notificationMap = {};
        this.isCrossServiced = !1;
        this.className = NetSocket.clssName_1;
    }

    public timeoutPkg: any;
    public groups: any;
    public service_force_close: boolean;
    public sleepTime: number[];
    public connectNum: number;
    public login_succ_num: number;
    public reConnetIng: boolean;
    public HTTP_URL: string;
    public mSocket: laya.net.Socket;
    public closeTimes: number;
    public requestPkg: any;
    public notificationMap: any;
    public isCrossServiced: boolean;
    /** 原 wrapper 内直接挂在 this 上的实例字段（构造尾 className=i.clssName_1） */
    public className: string;

    public setSocketName(t: string): void {
        this.className = t;
    }

    /** e=!0 用 wss；路径固定 /gateway/ */
    public setURLtoConnect(t: string, i: number, e: boolean): void {
        var s = e ? "wss:" : "ws:";
        this.HTTP_URL = s + "//" + t + ":" + i + "/gateway/",
            this.clear(),
            this.init();
    }

    public init(): void {
        this.mSocket = new laya.net.Socket(),
            this.service_force_close = !1,
            this.closeTimes = 0,
            this.requestPkg = {},
            this.mSocket.on("open", this, this.openHandler),
            this.mSocket.on("message", this, this.receiveHandler),
            this.mSocket.on("close", this, this.closeHandler),
            this.mSocket.on("error", this, this.errorHandler),
            NetSocket.isSpecailClose || this.mSocket.connectByUrl(this.HTTP_URL),
            Laya.stage.on("visibilitychange", this, this.visibility_change);
    }

    public visibility_change(t: any): void {
        sg.scene.view.TestButton.log("隐藏与显示" + Laya.stage.isVisibility),
            this.sleepTime[Laya.stage.isVisibility ? 0 : 1] = laya.utils.Browser.now();
    }

    public clear(): void {
        this.service_force_close = !0,
            this.mSocket && (
                this.mSocket.offAll("open"),
                    this.mSocket.offAll("message"),
                    this.mSocket.offAll("close"),
                    this.mSocket.offAll("error"),
                    this.mSocket.close()
            ),
            this.mSocket = null;
    }

    public testClose(): void {
        this.mSocket.close();
    }

    /** 超过 9 次放弃重连并走 closeSocket 提示 */
    public reConnet(): void {
        if (this.closeTimes++, this.service_force_close = !1, this.closeTimes > 9)
            return Trace.log("====>>>> " + this.className + "N次重连失败的处理==", this.HTTP_URL, this.closeTimes),
                this.closeTimes = 0,
                sg.scene.view.TestButton.log("reConnet1"),
                void this.closeSocket({ msg: Tools.getMsgById("_lht57") });
        NetSocket.isSpecailClose || (
            Trace.log("====>>>> " + this.className + "开始重新连接 == ", this.HTTP_URL, this.closeTimes),
                sg.scene.view.TestButton.log("reConnet2"),
                this.mSocket.connectByUrl(this.HTTP_URL)
        );
    }

    public openHandler(t: any): void {
        sg.scene.view.TestButton.log("openHandler0");
        laya.utils.Browser.now();  // 原文此处即为孤立表达式，保留
        sg.scene.view.TestButton.log("openHandler2"),
            this.reConnetIng = !1,
            this.closeTimes > 0 ? Trace.log("<<<<==== " + this.className + "N次重新连接 成功打开 <<<<====", this.closeTimes, this.HTTP_URL)
                : Trace.log("<<<<==== " + this.className + "首次连接 成功打开 <<<<====", t, this.HTTP_URL),
            this.login_succ_num = 0,
            this.event("event_socket_opened"),
            this.closeTimes = 0,
            this.checkConnected();
    }

    /** 心跳：非测试态且非跨服名时按登录状态选择 2/1 通道并定时校验 */
    public checkConnected(): void {
        var t = this;
        ConfigApp.isTest || this.className != NetSocket.clssName_2 && (
            this.login_succ_num <= 0 ? this.connectNum = 2 : (
                this.connectNum = 1,
                    this.send("update_user", { key: ["coin"] }, laya.utils.Handler.create(this, function (i) {
                        i.receiveData && 1 == t.connectNum && (t.connectNum = 2);
                    }))
            ),
            sg.scene.view.TestButton.log("checkConnecte1"),
            Laya.timer.clear(this, this.checkConnectedResult),
            Laya.timer.once(NetSocket.pingTimer, this, this.checkConnectedResult)
        );
    }

    public checkConnectedResult(): void {
        2 == this.connectNum && this.checkConnected();
    }

    public receiveHandler(t: any): void {
        var i: any = {};
        "string" == typeof t ? i = JSON.parse(t) : t instanceof ArrayBuffer && (i = sg.utils.MessagePack.decode(t)),
            NetSocket.socketDelay ? Laya.timer.once(NetSocket.socketDelay, this, this.doReceive, [i]) : this.doReceive(i);
    }

    public doReceive(t: any): void {
        this.sleepTime[2] = laya.utils.Browser.now(),
            Trace.log("<<<<==== " + this.className + "socket 接收数据 receive <<<<====", "【" + t.method + "】", t),
            sg.scene.view.TestButton.preUpdate(t.method, t.data),
            this.isSpecail(t) ? this.closeSocket(t) : this.recevie(t);
    }

    public closeSocket(t: any): void {
        this.service_force_close = !0,
            this.event("event_socket_close", [this.service_force_close, t]),
            this.mSocket && this.mSocket.close();
    }

    public closeSocketTimeOut(t: any): void {
        this.reConnetIng ? this.checkConnected() : this.mSocket && (
            t && Trace.log("<<<<==== " + this.className + "网络ping功能出现超时 <<<<===="),
                this.mSocket.close()
        );
    }

    public closeHandler(t: any): void {
        Trace.log("<<<<==== " + this.className + "socket 关闭 closeHandler <<<<===="),
            this.service_force_close ? sg.scene.view.TestButton.log("closeHandler0") : (
                this.reConnetIng = !0,
                    Laya.timer.clear(this, this.reConnet),
                    Laya.timer.once(1e3, this, this.reConnet),
                    sg.scene.view.TestButton.log("closeHandler1"),
                    this.event("event_socket_close", [!1, null])
            );
    }

    public errorHandler(t: any): void {
        Trace.log("<<<<==== " + this.className + "socket 错误 errorHandler <<<<===="),
            sg.scene.view.TestButton.log("errorHandler0");
        var i = !1;
        laya.utils.Browser.window && (i = !0),
            this.event("event_socket_error", [!0, { msg: Tools.getMsgById("_lht56") }, i]);
    }

    public isSpecail(t: any): boolean {
        return "close" == t.method && (NetSocket.isSpecailClose = !0, !0);
    }

    public send(t: string, e: any, s?: any, n?: any): any {
        NetSocket.sMethodName = t, NetSocket.sSendData = e,
            sg.test.testpakcage.TestPackage.addPackage(t, e, !0, this);
        var h = sg.net.NetMethodCfg.createPkg(0);
        return h.sendMethod = t, h.sendData = e, h.otherData = n,
            h.sendTime = (new Date).getTime(), h.receiveHandler = s,
            sg.guide.model.ModelGuide.forceGuide() && (h.guideData = sg.guide.model.ModelGuide.getGuideData(t)),
            this.sendPkg(h, s);
    }

    public sendPkg(t: any, i: any): any {
        return this.requestPkg[t.pid] = t,
            this.mSocket && this.mSocket.connected && (
                this.event("event_socket_send_to", [t.sendMethod, !0]),
                    t.setTimeOut(NetSocket.timeOutTimer),
                    this.mSocket.send(t.getSendData())
            ),
            t;
    }

    /** i=!0 视为超时：登记 timeoutPkg、提示并触发 ping 超时关断；否则清包 */
    public selfSendPackageIsOver(t: any, i: boolean): void {
        var e = "";
        if (t) {
            var s = t.pid;
            e = t.sendMethod,
                i ? (
                    this.setTimeoutPkgRequest(s, e),
                        Trace.log("<<<<==== " + this.className + " : " + s + " : " + e + "出现超时 <<<<===="),
                        TestUtils.isTestShow && "login" === e && ViewManager.instance.showTipsTxt("长连登录超时", 5),
                        this.closeSocketTimeOut(null)
                ) : (
                    t.clearTimeOut(),
                        this.requestPkg.hasOwnProperty(s) && delete this.requestPkg[s]
                );
        }
        this.event("event_socket_receive_from", [e, !1, i]);
    }

    /** 核心收包：校时（本服/跨服）、礼包字典、请求包配对（超时包仍执行）、错误码、监听通知 */
    public recevie(t: any): void {
        if (null != t) {
            var e: any = null;
            t.hasOwnProperty("time") && (
                this.isCrossServiced ? sg.crossService.CrossServiceFacade.checkServerTime(Tools.getTimeStamp(t.time), !0)
                    : ConfigServer.checkServerTime(Tools.getTimeStamp(t.time), !0)
            ),
                this.isCrossServiced && t.hasOwnProperty("data") && t.data.hasOwnProperty("user") && sg.crossService.model.CrossServiceUserModel.instance.updateUserData(t.data);
            var s = -1;
            t.hasOwnProperty("code") && (s = Number(t.code)),
                t.data && t.data.gift_dict && sg.view.hero.ViewAwakenHero.checkGiftDict(t.data.gift_dict),
                sg.test.testpakcage.TestPackage.addPackage(t.method, t.data, !1, this);
            var n = !1;
            if (t.pid) {
                var h = t.pid;
                if (h > 0 && (e = this.requestPkg[h])) {
                    if (this.checkTimeoutPkg(h, t.method), this.selfSendPackageIsOver(e, !1), e.sendMethod == t.method) {
                        n = !0, e.receiveMethod = t.method, e.receiveData = t.data, e.reTime = (new Date).getTime(),
                            e.isTimeout(NetSocket.timeOutTimer) && Trace.log("==>>超时包==>>被执行了==>>" + this.className + "==>>", t);
                        var o = !1;
                        e.otherData && e.otherData.forceNotify && (o = !0),
                            0 == s || o ? (e.notify(), NetSocket.sRetrunMsg = "") : this.checkErrorCode(s, t);
                    }
                    e.clear();
                }
            }
            -1 != s && 0 != s || this.notifyOnlyListeners(t),
                this.event("event_socket_receive_to", [t, n]);
        }
    }

    public checkErrorCode(t: number, e: any): void {
        if (1e3 == t) this.closeSocket({ msg: Tools.getMsgById("msg_NetSocket_1") });
        else if (500 == t) {
            var s = Tools.getMsgById("msg_NetSocket_2") + t;
            e.data && e.data.msg ? e.data.msg = s + " " + e.data.msg : ViewManager.instance.showTipsTxt(s);
        } else t >= 2e3 && t <= 3e3 && (e.data && (e.data.code = t), this.closeSocket(e.data));
        t && this.event("event_socket_re_code_error", e),
            NetSocket.sRetrunMsg = t + "   " + (e.data && e.data.msg ? e.data.msg : "");
    }

    /** 无请求配对的服务器推送：逐个通知 notificationMap[method] 上的包 */
    public notifyOnlyListeners(t: any): void {
        var e = this.notificationMap[t.method], s: any = null;
        if (e) {
            Trace.log("**** 服务器主动通知过来的消息 ***", t.method, t),
                NetSocket.sRetrunMsg = "",
                t.hasOwnProperty("code") && this.checkErrorCode(Number(t.code), t),
                t.receipt && this.send("receive_receipt", { push_id: t.push_id });
            for (var n = 0, h = e.length; n < h; n++)
                (s = e[n]).receiveData = t.data, s.notify();
        }
    }

    public hasMethod(t: string): boolean {
        var i: string;
        for (i in this.requestPkg) {
            var e = this.requestPkg[i];
            if (e && e.sendMethod == t) return !0;
        }
        return !1;
    }

    /** 登记常驻监听；e 为组名时可整组移除 */
    public registerHandler(t: string, i: any, e?: string): boolean {
        if (this.hasRegisterHandler(t, i)) return !1;
        this.notificationMap[t] = this.notificationMap[t] || [];
        var s = this.notificationMap[t], n = sg.net.NetMethodCfg.createPkg();
        return n.sendMethod = t, n.receiveMethod = t, n.receiveHandler = i, s.push(n),
            e && !i.once && (this.groups[e] || (this.groups[e] = []), this.groups[e].push([t, i])),
            !0;
    }

    public removeAllHandler(t?: string): void {
        null == t ? this.notificationMap = {} : delete this.notificationMap[t];
    }

    public removeGroupHandler(t: string): void {
        var i = this.groups[t];
        if (i) {
            var e: any, s: any, n: any, h = 0;
            for (h = i.length - 1; h >= 0; h--)
                s = (e = i[h])[0], n = e[1], this.removeHandler(s, n);
            delete this.groups[t];
        }
    }

    /** e=!0 时顺带移除命中的监听 */
    public hasRegisterHandler(t: string, i: any, e?: boolean): boolean {
        if (void 0 === e && (e = !1), !this.notificationMap[t]) return !1;
        for (var s = this.notificationMap[t], n = s.length, h = !1, o = -1, r = 0; r < n; r++) {
            if (s[r].receiveHandler == i) {
                h = !0, o = r;
                break;
            }
        }
        return e && o >= 0 && s.splice(o, 1), h;
    }

    public removeHandler(t: string, i: any): boolean {
        return this.hasRegisterHandler(t, i, !0);
    }

    public setTimeoutPkgRequest(t: any, i: string): void {
        this.requestPkg.hasOwnProperty(t) && (
            this.timeoutPkg.hasOwnProperty(t) || (
                this.timeoutPkg[t] = [i],
                    Trace.log("==>>超时包==>>有新的包==>>", t, i, this.timeoutPkg)
            )
        );
    }

    public checkTimeoutPkg(t: any, i: string): void {
        this.timeoutPkg.hasOwnProperty(t) && (
            this.timeoutPkg[t].push(i),
                Trace.log("==>>超时包==>>已有超时包==>>", t, i, this.timeoutPkg, "==>>再次返回")
        );
    }

    /** r(0,e,"socket",getter) —— 实例 getter */
    get socket(): laya.net.Socket {
        return this.mSocket;
    }

    /** r(1,i,"instance",getter,EventDispatcher._$SET_instance) —— 惰性单例 + 可写回 */
    public static get instance(): NetSocket {
        return NetSocket.sNetSocket = NetSocket.sNetSocket || new NetSocket();
    }
    public static set instance(v: NetSocket) {
        NetSocket.sNetSocket = v;
    }

    public static EVENT_SOCKET_CLOSE: string = "event_socket_close";
    public static EVENT_SOCKET_ERROR: string = "event_socket_error";
    public static EVENT_SOCKET_OPENED: string = "event_socket_opened";
    public static EVENT_SOCKET_RELOAD: string = "event_socket_reload";
    public static EVENT_SOCKET_RE_CODE_ERROR: string = "event_socket_re_code_error";
    public static EVENT_SOCKET_SEND_TO: string = "event_socket_send_to";
    public static EVENT_SOCKET_RECEIVE_FROM: string = "event_socket_receive_from";
    public static EVENT_SOCKET_RECEIVE_TO: string = "event_socket_receive_to";
    public static socketDelay: number = 0;
    public static timeOutTimer: number = 15e3;
    public static pingTimer: number = 1e4;
    public static sNetSocket: NetSocket = null;
    public static isSpecailClose: boolean = !1;
    public static sMethodName: string = "";
    public static sSendData: any = null;
    public static sRetrunMsg: any = null;
    public static clssName_1: string = "本服";
    public static clssName_2: string = "跨服战";
}

/**
 * 注册身份等价物：原文 o(i,"sg.net.NetSocket",t)（t=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(NetSocket, "sg.net.NetSocket", null, null);
