/**
 * sg.crossService.CrossServiceFacade —— 跨服战长连接门面：持有独立 NetSocket
 * （isCrossServiced=!0，clssName_2），d.login 跨服登录（凭主服 mUID_base/
 * mSessionid），服务器时间双轨校准（serverNow/serverNow2 + runGameStartTimer/
 * runGameStartTimer2，longAdjusted 只前进不回退），全局定时器池（intervals/
 * globalId，updateTime 1s 补偿 tick，由 s.timer.loop 驱动）。
 *
 * 原文：code1.js 字节 [540014,542486)（包装变量 $t，声明器单一 CallExpression，
 * 非 Ee 式逗号双跳；`,$t=function(){...}(),Jt=` @540011 实证）。
 * 注册：o(t,"sg.crossService.CrossServiceFacade") —— 2 参形式，无基类（ctor 无
 * __super，组合 NetSocket，同 UserDataProxy 先例），base=null 注册即原文等价。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-i/CrossServiceFacade.js
 *
 * 别名（作用域链解析，wrapper 内无遮蔽）：pn=NetSocket（B ✓）、Rt=ConfigApp（B ✓）、
 * ue=ModelManager（B ✓）、vs=Tools（B ✓）、Ts=Trace（B ✓）、Ut=Platform（C ✓）、
 * tn=ViewManager（A ✓）、P=laya.utils.Handler、Br=sg.model.ModelPlayer（ambient，
 * 批次 D 勘误册）、ho=sg.crossService.model.CrossServiceUserModel（**未译，仅
 * event_socket_opened 回调触达，缓译**）、s=Laya、o/h=UMD 头注册/惰性静态助手。
 *
 * 保真注记：
 * - 原文 getServerTimer 体内以全局路径 sg.crossService.CrossServiceFacade.* 自引用
 *   （非闭包 t；getServerTimer 的形参 t 遮蔽类名），译文用本类标识符直引——注册后
 *   同一对象，观测等价（NetSocket.ts 头注「i 指本类→TS 类直引」先例）。
 * - h(t,["instance",...,"startTime",...]) 惰性静态：静态 getter + Object.defineProperty
 *   值写回（ModelBuiding/ModelUser 批次 F/D 同款）；首次访问构造并缓存。
 * - checkServerTime/updateTime/setInterval 保留原逗号链与 || 短路结构；
 *   setInterval 形参 s 遮蔽 Laya（原文如此，本方法不用 Laya）。
 * - event_socket_opened 回调 t.inited=!0 为类静态写入 → CrossServiceFacade.inited。
 */
import Handler = laya.utils.Handler;
import { NetSocket } from "../net/NetSocket";
import { ConfigApp } from "../cfg/ConfigApp";
import { ModelManager } from "../manager/ModelManager";
import { Tools } from "../utils/Tools";
import { Trace } from "../laya/Trace";
import { Platform } from "../laya/Platform";
import { ViewManager } from "../manager/ViewManager";

export class CrossServiceFacade {

    constructor() {
        this.socket = new NetSocket();
    }

    /** 独立跨服长连接（ctor 组合创建，非主服 NetSocket.instance） */
    public socket: NetSocket;

    /** 建立跨服连接：数组参 [host,port] 或回退 192.168.1.116:10000（原文如此） */
    public start(t?: any): void {
        this.socket.isCrossServiced = !0,
        this.socket.setSocketName(NetSocket.clssName_2),
        t && t.length ? this.socket.setURLtoConnect(t[0], t[1], ConfigApp.useSSL()) : (<any>this.socket).setURLtoConnect("192.168.1.116", "10000", ConfigApp.useSSL()),
        this.socket.on("event_socket_opened", this, this.event_socket_opened);
    }

    /** 连接建立后自动跨服登录；成功回调 ho.setData + inited 置位（ho 未译走 ambient 全局路径） */
    public event_socket_opened(): void {
        var i: any = ModelManager.instance.modelUser;
        if (Tools.isNullString(i.mUID_base) || Tools.isNullString(i.mSessionid)) Trace.log("::::ModelUser 准备 socket 登录,没有 mUID_base mSessionid", this);
        else {
            var e: any = {
                uid: i.mUID_base, sessionid: i.mSessionid, zone: i.zone, user_code: i.mUserCode,
                pf_data: Platform.pf_login_data, pf: ConfigApp.pf, pf_key: sg.model.ModelPlayer.instance.mPlayer.name || ""
            };
            ConfigApp.checkPfIs37BySG() && delete e.pf_data,
            this.socket.send("d.login", e, Handler.create(this, function (i: any) {
                sg.crossService.model.CrossServiceUserModel.instance.setData(i.receiveData), CrossServiceFacade.inited = !0;
            }));
        }
    }

    /** inited 后切跨服地图（switchMap(3)） */
    public gotoCrossMap(i?: any): void {
        CrossServiceFacade.inited && ViewManager.instance.switchMap(3, i);
    }

    /** 结束跨服：关闭 socket（closeHandler；原文 0 参调用，B 译文签名含参 → cast 调回点） */
    public end(): void {
        (<any>this.socket).closeHandler();
    }

    /** 服务器时间校准：e=!0 强制；longAdjusted 只允许假→真单向（原文 `t.longAdjusted||(t.longAdjusted=e)`） */
    public static checkServerTime(i: any, e?: any): void {
        void 0 === e && (e = !1);
        var s = (new Date).getTime();
        isNaN(i) || i <= 0 || (
            (0 === CrossServiceFacade.serverNow || e && (!1 === CrossServiceFacade.longAdjusted || i > CrossServiceFacade.serverNow + (s - CrossServiceFacade.runGameStartTimer))) && (CrossServiceFacade.longAdjusted || (CrossServiceFacade.longAdjusted = e), CrossServiceFacade.serverNow = i, CrossServiceFacade.runGameStartTimer = s),
            CrossServiceFacade.serverNow2 = i,
            CrossServiceFacade.runGameStartTimer2 = s
        );
    }

    /** 服务器时间（t=!0 用第二轨 serverNow2）；原文以全局路径自引用本类静态 */
    public static getServerTimer(t?: any): any {
        return void 0 === t && (t = !1),
            t ? CrossServiceFacade.serverNow2 + ((new Date).getTime() - CrossServiceFacade.runGameStartTimer2)
              : CrossServiceFacade.serverNow + ((new Date).getTime() - CrossServiceFacade.runGameStartTimer);
    }

    /** 启动 1s 补偿 tick（s.timer.loop，Laya.timer） */
    public static init(): void {
        Laya.timer.loop(1e3, CrossServiceFacade, CrossServiceFacade.updateTime, null, !0, !0);
    }

    /** 补偿执行到期的 interval（按 count 差额补跑） */
    public static updateTime(): void {
        for (var i in CrossServiceFacade.intervals)
            for (var e = Math.max(0, parseInt(((CrossServiceFacade.getServerTimer(!0) - CrossServiceFacade.intervals[i].start) / CrossServiceFacade.intervals[i].interval).toString())); CrossServiceFacade.intervals[i].count < e;)
                CrossServiceFacade.intervals[i].handler.run(), CrossServiceFacade.intervals[i].count++;
    }

    /** 登记定时器（键 = globalId 字符串），返回 globalId；形参 s 遮蔽 Laya（原文如此） */
    public static setInterval(i: any, e: any, s: any): any {
        return CrossServiceFacade.globalId++,
            CrossServiceFacade.intervals[CrossServiceFacade.globalId.toString()] = { start: i, interval: e, handler: s, count: Math.max(0, parseInt(((CrossServiceFacade.getServerTimer(!0) - i) / e).toString())) },
            CrossServiceFacade.globalId;
    }

    public static removeInterval(i: any): void {
        delete CrossServiceFacade.intervals[i.toString()];
    }

    public static clearAllInterval(): void {
        CrossServiceFacade.intervals = {};
    }

    public static inited: boolean = !1;
    public static serverNow: number = 0;
    public static serverNow2: number = 0;
    public static runGameStartTimer: number = 0;
    public static runGameStartTimer2: number = 0;
    public static longAdjusted: boolean = !1;
    public static intervals: any = {};
    public static globalId: number = 0;

    /** 原文 h(t,[...]) 惰性静态：this.instance=new t（首访构造并以自身属性缓存） */
    public static get instance(): CrossServiceFacade {
        var v = new CrossServiceFacade();
        Object.defineProperty(CrossServiceFacade, "instance", { value: v, writable: !0, enumerable: !0, configurable: !0 });
        return v;
    }

    /** 原文 h(t,[...]) 惰性静态：this.startTime=Date.now() */
    public static get startTime(): number {
        var v = (new Date).getTime();
        Object.defineProperty(CrossServiceFacade, "startTime", { value: v, writable: !0, enumerable: !0, configurable: !0 });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.crossService.CrossServiceFacade")（2 参，无基类）。
 * base=null 与原文完全一致（原类即无基类；「注册等价决策」见 batch-a-report.md）。
 */
Laya.class(CrossServiceFacade, "sg.crossService.CrossServiceFacade", null, null);
