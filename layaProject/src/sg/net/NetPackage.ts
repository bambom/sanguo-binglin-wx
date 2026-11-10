/**
 * sg.net.NetPackage —— socket 请求/通知包值对象（"net_vo" 对象池），NetSocket
 * registerHandler/send 的 createPkg 供给源（F8 死点本体，批次 G）。
 *
 * 原文：code1.js 字节 [1018606,1020260)（IIFE_B，注册 o(t,"sg.net.NetPackage") 2 参形态，
 * 无基类；接口标记 s.imps(i,{"interfaces.IClear":!0})）。
 * var Ee=(IIFE_A(),IIFE_B()) 双跳：Ee=本类。原文 NetSocket 内 Ee.createPkg() ×2
 * （send @byte1403912 取实参 0、registerHandler @byte1416763 缺省 -1）即本类静态工厂。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-g/NetPackage.js
 *
 * 入批依据：ModelManager.init → new ModelCountryPvp → new ModelXYZ2 → ctor 内
 * NetSocket.instance.registerHandler(...) → Ee.createPkg()——构造期 100% 直静态调
 * （F8 实测死点 "Cannot read properties of undefined (reading 'createPkg')"）。
 *
 * 身份（作用域链+池化解码双证，resolve_g.js）：
 * pn=sg.net.NetSocket（char1399823）、Rt=sg.cfg.ConfigApp（426035）、Ts=Laya.Trace
 * （1195580，字面注册名 "Trace"）、Gt=sg.cfg.ConfigServer（508940）、Ut=Laya.Platform
 * （290507，批次 C）、os=sg.utils.MessagePack（1114213，池串 17079）、
 * st=laya.utils.Pool（284849，laya[n(10646)][n(1004)] 双池串）、s=Laya（UMD 第 3 参）。
 * os=MessagePack 未译（批次外，全局路径+ambient）；NetSocket 循环引用双方均为方法期
 * 触达（非模块求值期），CommonJS require 环安全。
 *
 * 保真注记：createPkg 原文以 this.pid++ 访问静态计数（Ee.createPkg() 调用形态下
 * this=类本身），TS 直引 NetPackage.pid 等价；cleared 为 r(0,i,"cleared",getter)
 * 原型 getter 恒真；isDel 的 e 局部变量与先行赋值比较照抄。
 */
import { NetSocket } from "./NetSocket";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";
import { Platform } from "../laya/Platform";

export class NetPackage {

    public sendMethod: string = null;
    public receiveMethod: string = null;
    public pid: number = -1;
    public otherData: any = null;
    public sendData: any = null;
    public guideData: any = null;
    public receiveData: any = null;
    public sendTime: number = 0;
    public reTime: number = 0;
    public receiveHandler: any = null;

    constructor() {
        // 原文构造器逐字段赋空——TS 字段初始化器等价（es5 输出同点位）
    }

    public isTimeout(t?: number): boolean {
        return void 0 === t && (t = 15e3),
            this.reTime - this.sendTime >= t;
    }

    public isDel(t?: number): boolean {
        void 0 === t && (t = 15e3);
        var i = (new Date).getTime(),
            e = !1;
        return this.sendTime > 0 && i - this.sendTime > t && (e = !0),
            e;
    }

    public setTimeOut(t?: number): void {
        void 0 === t && (t = 15e3),
            Laya.timer.clear(this, this.timeOut),
            Laya.timer.once(t, this, this.timeOut);
    }

    public timeOut(): void {
        NetSocket.instance.selfSendPackageIsOver(this, !0);
    }

    public notify(): void {
        null != this.receiveHandler && this.receiveHandler.runWith(this);
    }

    public getSendData(): any {
        var t: any = {
            pid: this.pid,
            lan: ConfigApp.lan(),
            method: this.sendMethod,
            params: this.sendData || {},
            cfg_version: ConfigApp.cfgVersion,
            app_version: ConfigApp.getAppVersion(),
            phone_id: [Platform.getType(), Platform.getPhoneIDs()],
            app_id: Platform.getAppName()
        };
        return Trace.log("====>>>> socket 发送请求 send ====>>>>", this.sendMethod, t),
            this.guideData && (t.guide = this.guideData),
            ConfigServer.system_simple.binary ? sg.utils.MessagePack.encode(t) : JSON.stringify(t);
    }

    public reset(): void {
        this.otherData = null,
            this.sendData = null,
            this.guideData = null,
            this.pid = -1,
            this.receiveData = null,
            this.receiveHandler = null,
            this.sendTime = 0,
            this.reTime = 0;
    }

    public clear(): void {
        this.clearTimeOut(),
            this.reset(),
            laya.utils.Pool.recover("net_vo", this);
    }

    public clearTimeOut(): void {
        Laya.timer.clear(this, this.timeOut);
    }

    /* ---- r(0,i,"cleared",getter) 原型访问器（无 setter） ---- */
    public get cleared(): boolean {
        return !0;
    }

    /* ---- 静态面 ---- */
    public static createPkg(i?: number): NetPackage {
        void 0 === i && (i = -1);
        var e = laya.utils.Pool.getItemByClass("net_vo", NetPackage);
        return -1 != i && (NetPackage.pid++, e.pid = NetPackage.pid),
            e;
    }

    public static pid: number = 1;
}

/**
 * 接口标记：原文 s.imps(i,{"interfaces.IClear":!0}) —— 引擎助手把字面量键写上原型，
 * TS 等价物为原型直写（无引擎 imps 类型面）。
 */
(<any>NetPackage.prototype)["interfaces.IClear"] = !0;

/**
 * 注册身份等价物：原文 o(t,"sg.net.NetPackage")（2 参，无基类）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(NetPackage, "sg.net.NetPackage", null, null);
