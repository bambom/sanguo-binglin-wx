/**
 * sg.model.ModelPlayer —— 玩家账号模型（本机存档/自动登录/游客登录/分区选择）：
 * updateAll 从 SaveLocal 回填 mPlayer/mPlayerList（iOS 静态 userData/userListData
 * 优先），setUID/getUID、分区链 setServerZones/setServerZonesFormate/getCurrZone
 * （推荐区分排序：regist/force/开服时间/zones_user_num 权重 + ArrayUtils.sortOn）、
 * 登录凭证 setName/setPWD/getPWD、游客数据 getVisitorData（meng52 渠道注册）/
 * getVisitorDataTemp（临时账密）。ViewLoad.initData 挂接 event_login_ok（登录链根）。
 *
 * 原文：code1.js 字节 [2285428,2291074)（class-inventory: off 2285640，包装变量 Br，
 * 池化注册名 e(16506)="sg.model.ModelPlayer"，基类实参 (Ns)=sg.model.ModelBase，
 * 声明器单一 CallExpression：`…s}(Ns),Br=function(i){…}(Ns),Ar=` @2285380 实证，
 * 非 Ee 式逗号双跳）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-k/ModelPlayer.js
 *
 * 批次 K 入批原因：F8 第 9 次边界命中 `sg.model.ModelPlayer.instance` 读取
 * （ViewLoad.ts:196-198 loginAuto 挂接，sg.model.ModelPlayer 整类未注册）。
 *
 * .instance 形态（批次 J 判定法三分支）：**r(1,s,"instance",getter,
 * sg.model.ModelBase._$SET_instance)** —— getset 静态惰性 getter，读取即
 * `s.mModelPlayer=s.mModelPlayer||new s` 触发 ctor（区别于 CrossServiceFacade 的
 * h()=Laya.static 自毁 getter 与 CrossServiceMap 的 `i.instance=null` 普通静态短路）。
 * setter 实参 sg.model.ModelBase._$SET_instance 运行时为 undefined（ModelBase 无任何
 * getset 安装，全文件 0 处 r(1,Ns,·)——resolve_k.js 断言），引擎 getset（game.js
 * @351203 唯一定义实文）s&&!r 分支 → Object.defineProperty 只读访问器：getter 已
 * 安装、写被忽略。TS static get instance() 等价（ES5 sloppy 写静默失败）。
 *
 * 别名（作用域链解析，resolve_k.js；wrapper 内无未解遮蔽）：us=SaveLocal（B ✓）、
 * vs=Tools（B ✓）、Rt=ConfigApp（B ✓）、Ut=Platform（C ✓）、Gt=ConfigServer（B ✓）、
 * ue=ModelManager（B ✓）、ge=sg.map.utils.ArrayUtils（未译，ambient）、fn=NetHttp（B ✓）、
 * K=laya.maths.MathUtil、P=laya.utils.Handler、o=Laya.class/r=Laya.getset（UMD 头
 * 池串实证 pool[5134]/pool[11288]）、n/t=工厂解码器。局部遮蔽保真：getCurrZone 的
 * var s/h/o/r/a/l/c/u（原序）、setServerZonesFormate 的 var h/o 均按原名保留。
 *
 * 保真注记：
 * - ctor 8 字段原文在 __super.call(this) 之前，TS 字段初始化器 super() 后发射
 *   （ModelBase 构造不读子字段，观测等价——批次 A 先例）。
 * - updateAll 读静态走全局路径 sg.model.ModelPlayer.userData/userListData，译文用
 *   类标识符直引（注册后同一对象，批次 I Facade 先例）；三重条件链（isNullObj →
 *   isTest → useMyLogin）的 else 分支逗号副作用链逐处保留。
 * - getset 的 _$GET_instance / _$get_tel 标记属性不复刻（批次 D ModelUser r(0)
 *   渲染为先例：业务代码零消费点）。
 * - Platform.setUserDataForIos 原文单参调用（回调缺省），TS 签名 2 参必需 → 调回点
 *   (<any>) cast（批次 D 先例）；MathUtil.sortByKey 同（批次 E 先例）。
 * - getCurrZone 的 ternary 嵌套（1==s[3] 与 forbidNew 两分支各含 ""!=s[7]?0:1）、
 *   setUID 的三重 ternary+逗号链、setPlayerList 的 times=Gt.getServerTimer() 均按原文。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import ArrayUtils = sg.map.utils.ArrayUtils;
import { ModelBase } from "./ModelBase";
import { SaveLocal } from "../utils/SaveLocal";
import { Tools } from "../utils/Tools";
import { ConfigApp } from "../cfg/ConfigApp";
import { Platform } from "../laya/Platform";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { NetHttp } from "../net/NetHttp";

export class ModelPlayer extends ModelBase {

    /** 原文 this[i(10737)]=null */
    public mPlayer: any = null;
    /** 原文 this[i(7949)]=null */
    public mPlayerList: any = null;
    /** 原文 this[i(5863)]=!1 */
    public isTempPlayer: boolean = !1;
    /** 原文 this[i(3844)]="" */
    public mCurrZone: string = "";
    /** 原文 this[i(14627)]=""（tel 访问器 backing field，setter 强制 t+""） */
    public mTel: any = "";
    /** 原文 this[i(12221)]="" */
    public loginName: string = "";
    /** 原文 this[i(6111)]="" */
    public loginPwd: string = "";
    /** 原文 this[i(11179)]="" */
    public thirdLoginType: string = "";

    constructor() {
        super();  // 原文 s[i(15419)][i(7393)](this) = s.__super.call(this)
    }

    /** 本机/静态回填玩家数据；t=clearReadyTemp 开关（原文 h[e(6859)]） */
    public updateAll(t?: boolean): void {
        void 0 === t && (t = !1),
            this.mPlayer = SaveLocal.getValue("local_save_key_user"),
            this.mPlayerList = SaveLocal.getValue("local_save_key_user_list"),
            this.isTempPlayer = !0,
            Tools.isNullObj(this.mPlayer)
                ? ModelPlayer.userData
                    ? this.mPlayer = ModelPlayer.userData
                    : (this.mPlayer = {}, this.isTempPlayer = !1)
                : ConfigApp.isTest
                    ? Tools.isNullString(this.getUID()) && (this.isTempPlayer = !1)
                    : ConfigApp.useMyLogin() && (Tools.isNullString(this.getName()) || Tools.isNullString(this.getPWD())) && (this.isTempPlayer = !1),
            Tools.isNullObj(this.mPlayerList) && (ModelPlayer.userListData ? this.mPlayerList = ModelPlayer.userListData : this.mPlayerList = {}),
            t && this.clearReadyTemp();
    }

    /** 清除游客 ready 态存档标记 */
    public clearReadyTemp(): void {
        this.mPlayerList && this.mPlayerList.hasOwnProperty("ready") && delete this.mPlayerList.ready,
            this.mPlayerList && this.mPlayer.uid && this.mPlayer.uid == "ready" && (this.mPlayer = {});
    }

    /** 清账号=全量保存（原文仅转发 savePlayerAll） */
    public clearUser(): void {
        this.savePlayerAll();
    }

    /** 保存并回填 */
    public changeAll(): void {
        this.savePlayerAll(),
            this.updateAll();
    }

    /** 全量保存（本机 SaveLocal + iOS 平台档） */
    public savePlayerAll(): void {
        this.mPlayer && this.mPlayer.uid && (SaveLocal.save("local_save_key_user", this.mPlayer), SaveLocal.save("local_save_key_user_list", this.mPlayerList), (<any>Platform).setUserDataForIos({
            player: this.mPlayer,
            list: this.mPlayerList
        }));
    }

    /** 自动登录开关读取（缺省视为 "1"） */
    public getAutoLogin(): boolean {
        var i = SaveLocal.getValue("sg_auto_login"), s = Tools.isNullObj(i) ? "" : i + "";
        return "1" == (s = "" == s ? "1" : s);
    }

    /** 自动登录从未设置 */
    public isNullAutoLogin(): boolean {
        var i = SaveLocal.getValue("sg_auto_login");
        return Tools.isNullObj(i);
    }

    /** 自动登录开关写入（"1"/"0"） */
    public setAutoLogin(t: boolean): void {
        SaveLocal.save("sg_auto_login", t ? "1" : "0");
    }

    public getPlayer(): any {
        return this.mPlayer;
    }

    /** 切换账号：优先列表命中，次选 ready 游客档，否则空档 */
    public setUID(t: string): void {
        this.mPlayerList.hasOwnProperty(t) ? this.mPlayer = this.mPlayerList[t] : this.mPlayerList.hasOwnProperty("ready") ? this.mPlayer = this.mPlayerList.ready : this.mPlayer = {},
            this.mPlayer.uid = t,
            this.changeAll();
    }

    public getUID(): any {
        return this.mPlayer.hasOwnProperty("uid") ? this.mPlayer.uid : "";
    }

    /** 分区列表串（| 分隔，去前导 |） */
    public setServerZones(t: string): void {
        "|" == t.charAt(0) && (t = t.substr(1, t.length)),
            this.mPlayer.szs = t,
            this.changeAll();
    }

    /** 服务器分区对象 → 排序串（按 login_time 降序 sortByKey，空表回退 i） */
    public setServerZonesFormate(t: any, i: any): void {
        var n = "";
        if (t) {
            var h: any[] = [];
            for (var o in t) {
                var r = {
                    time: Tools.getTimeStamp(t[o].login_time),
                    id: o
                };
                h.push(r);
            }
            if (h.length > 0) {
                h.sort(<any>MathUtil.sortByKey("time", !1, !0));
                for (var a = 0; a < h.length; a++) n += "|" + h[a].id;
            } else n = i;
        } else n = i;
        this.setServerZones(n || "");
    }

    public getServerZones(): any {
        return this.mPlayer.hasOwnProperty("szs") ? this.mPlayer.szs : "";
    }

    public setSessionid(t: any): void {
        this.mPlayer.sessionid = t,
            this.changeAll();
    }

    public getSessionid(): any {
        return this.mPlayer.hasOwnProperty("sessionid") ? this.mPlayer.sessionid : "";
    }

    public setName(t: any): void {
        this.mPlayer.name = t,
            this.changeAll();
    }

    public getName(): any {
        return this.mPlayer.hasOwnProperty("name") ? this.mPlayer.name : "";
    }

    public setPhone(t: any): void {
        this.mPlayer.phone = t,
            this.changeAll();
    }

    public getPhone(): any {
        return this.mPlayer.hasOwnProperty("phone") ? this.mPlayer.phone : "";
    }

    public setPhoneCode(t: any): void {
        this.mPlayer.phoneCode = t,
            this.changeAll();
    }

    public getPhoneCode(): any {
        return this.mPlayer.hasOwnProperty("phoneCode") ? this.mPlayer.phoneCode : "";
    }

    public setPWD(t: any): void {
        this.mPlayer.pwd = t,
            this.changeAll();
    }

    public setPWDs(t: any): void {
        this.mPlayer.pwd_s = t,
            this.changeAll();
    }

    /** pwd 优先 pwd_s 回退空串 */
    public getPWD(): any {
        return this.mPlayer.pwd ? this.mPlayer.pwd : this.mPlayer.pwd_s ? this.mPlayer.pwd_s : "";
    }

    public setZone(t: any): void {
        this.mPlayer.z = t,
            this.changeAll();
    }

    public getZone(): any {
        return this.mPlayer.hasOwnProperty("z") ? this.mPlayer.z : "";
    }

    public getZoneList(): any {
        return this.mPlayer.hasOwnProperty("zs") ? this.mPlayer.zs : {};
    }

    /** 当前分区登录计数 +1 并保存 */
    public setZoneList(): void {
        var i = this.getZoneList();
        i.hasOwnProperty(this.getCurrZone()) ? i[this.getCurrZone()] += 1 : i[this.getCurrZone()] = 1,
            this.mPlayer.zs = i,
            this.changeAll();
    }

    public setPlayerList(): void {
        this.mPlayer.times = ConfigServer.getServerTimer(),
            this.mPlayerList[this.getUID()] = this.mPlayer,
            this.changeAll();
    }

    public setPlayerCardID(t: any): void {
        this.mPlayer.ucid = t,
            this.changeAll();
    }

    public getPlayerCardID(): any {
        return this.mPlayer.hasOwnProperty("ucid") ? this.mPlayer.ucid : "";
    }

    public setCurrZone(t: any): void {
        this.mCurrZone = t + "",
            this.setZone(this.mCurrZone);
    }

    /** 当前分区：缓存空时选推荐区（合法区过滤 → regist/force/开服时间/人数权重 sortOn） */
    public getCurrZone(): any {
        if (Tools.isNullString(this.mCurrZone)) {
            var i = this.getZone();
            if ("" != i && ConfigServer.zone.hasOwnProperty(i) && ConfigServer.checkZonePfIsOK(i)) return i;
            var s: any, n: any[] = [], h = ConfigServer.getServerTimer(), o = 0, r = 0, a = 0, l = 1, c = ModelManager.instance.modelUser.zones_user_num, u = -999999;
            for (var d in ConfigServer.zone) ConfigServer.checkZonePfIsOK(d) && 0 == (s = ConfigServer.zone[d])[8] && (
                o = Tools.getTimeStamp(s[2]), l = 0, a = 0, r = 0, u = -999999,
                1 == s[3] ? r = "" != s[7] ? 0 : 1 : r = h < Tools.getTimeStamp(s[2]) + ConfigServer.getForbidNewTime() ? "" != s[7] ? 0 : 1 : 0,
                h >= o && (l = 2),
                1 == r && (a = Number(l + "" + s[6] + o)),
                c && c[d] && c[d] > -1 && (u = -1 * Math.abs(Number(c[d]))),
                n.push({
                    nums: u, sortIndex: a, id: d, tms: o, regist: r, force: s[6]
                })
            );
            return n && n.length > 0 ? (ArrayUtils.sortOn(["nums", "sortIndex"], n, !0), n[0].id) : "";
        }
        return this.mCurrZone;
    }

    /** 游客数据：本机缓存优先，否则 meng52 渠道快速注册（成功即缓存并回调） */
    public getVisitorData(t: any, i: any): void {
        var n = SaveLocal.getValue("visitor_user_data");
        n ? i && i.runWith([0, n]) : NetHttp.instance.send("user_zone.register_fast", {
            pf: t
        }, Handler.create(null, function (t: any) {
            NetHttp.checkReIsError(t) || (n = {
                uid: t.username,
                token: t.pwd,
                login_type: "meng52"
            }, SaveLocal.save("visitor_user_data", n), i && i.runWith([0, n]));
        }));
    }

    /** 临时账密游客数据（不经网络，直接回当前登录名/密码） */
    public getVisitorDataTemp(t: any, i: any): void {
        var n = {
            uid: ModelPlayer.instance.loginName,
            token: ModelPlayer.instance.loginPwd,
            login_type: "meng52_temp_user_pwd"
        };
        i && i.runWith([0, n]);
    }

    /** 原文 r(0,h,e(3795),getter,setter)——实例访问器 tel（getter+setter 双安装） */
    public get tel(): any {
        return this.mTel;
    }
    public set tel(t: any) {
        this.mTel = t + "";
    }

    /**
     * 原文 r(1,s,e(15776),getter,sg[e(16914)][e(15683)][e(3786)]) —— getset 静态惰性
     * getter：读取即构造并 memoize 到 mModelPlayer；setter 实参 undefined → 引擎安装
     * 只读访问器（game.js getset s&&!r 分支）。详见类头「.instance 形态」节。
     */
    public static get instance(): ModelPlayer {
        return ModelPlayer.mModelPlayer = ModelPlayer.mModelPlayer || new ModelPlayer();
    }

    /** 原文 s[e(18464)]=e(14593) */
    public static EVENT_LOGIN_OK: string = "event_login_ok";
    /** 原文 s[e(7755)]=e(11595) */
    public static TEMP_UID_KEY_VALUE: string = "ready";
    /** 原文 s[e(10573)]=null（instance getter 的 memoize 槽） */
    public static mModelPlayer: ModelPlayer = null;
    /** 原文 s[e(12862)]="" */
    public static recommendServer: string = "";
    /** 原文 s[e(5869)]=null（ViewLoad.initData iOS 存档回填位） */
    public static userData: any = null;
    /** 原文 s[e(2225)]=null（同上，列表位） */
    public static userListData: any = null;
}

/**
 * 注册身份等价物：原文 o(s,e(16506),i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelPlayer, "sg.model.ModelPlayer", null, null);
