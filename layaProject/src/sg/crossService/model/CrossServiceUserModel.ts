/**
 * sg.crossService.model.CrossServiceUserModel —— 跨服战用户模型：setData 落地
 * 盟主数据/全量用户/本人 hero_data（ModelHeroPure 实例化入 heros 表）+ chat_cache
 * 回填；socketReady 注册 dw.country_leader 盟主变更推送；likeUser/unlikeUser 点赞
 * 通道；updateUserData 差量字段合并 + 按字段名派发 "<field>Change"；12 个 getter-only
 * 访问器（candidates/enemyCountry/showLeader/markCids/uid/task/socket/like_uids/
 * isLeader/enemyLeader/myLeader/unlike_uids）；LEADER_CHANGED="leader_changed"
 * 静态；instance 为 Laya.static 惰性单例（h() 形态）。
 *
 * 原文：code1.js 字节 [1703359,1705377)（2,018B；包装变量 ho，1 参 IIFE 基类实参
 * (Ns)=sg.model.ModelBase（批次 A ✓），明文 3 参注册
 * o(i,"sg.crossService.model.CrossServiceUserModel",t) @1703489，注册为 ctor 后
 * 语句；全类零池化）。前邻 `…cleared}),i}(Ns)`、后邻 `,oo=`。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ac/CrossServiceUserModel.js
 *
 * 依赖（resolve_ac.js acorn 作用域链 + 注册字面量/inventory 双证）：
 * 已译模块直引——Gt=ConfigServer（B ✓）、ue=ModelManager（B ✓）、
 * $t=CrossServiceFacade（I ✓）、so=CrossServiceMapModel（本批）；引擎——
 * P=laya.utils.Handler（UMD 头 `P=(laya.html.dom.HTMLImageElement,
 * laya.utils.Handler)` 池解码实证）、r=Laya.getset、h=Laya.static、o=Laya.class。
 * 批次外（ambient 全局路径，延迟调用）：gr=sg.model.ModelHeroPure（@2155802，
 * ambient 无 ctor 面 → new 调用点 (<any>) cast，批次 V 调回点 cast 先例）。
 *
 * 保真注记：
 * - ctor 字段初始化器（heros={},country=-1,allUser={},userData={},leaderData=null）
 *   原文先于 i.__super.call(this)，TS 移到 super() 后（纯赋值，ModelBase/
 *   EventDispatcher ctor 不读子类字段，观测等价，批次 H 先例）；ctor 无 super 后效应。
 * - setData 首句 for-in 头为逗号序列（全局路径自引 leaderData 写 + allUser 写 +
 *   (t=t.me).hero_data 求值，遍历对象=序列末项）；序列逐元素保序直译，
 *   `sg.crossService.model.CrossServiceUserModel.instance` 自引路径 → 类标识符
 *   直引（批次 O TimeHelper/批次 I Facade 先例，注册后同一对象）。
 * - onLeaderChange 的 `i.LEADER_CHANGED`（闭包类自引）→ CrossServiceUserModel.
 *   LEADER_CHANGED；静态发射顺序：tsc 固定「全部静态访问器 defineProperty →
 *   全部静态字段赋值」，原文序 [LEADER_CHANGED="leader_changed", h(instance)]
 *   发射为 [instance 访问器, LEADER_CHANGED 赋值]——模块求值期内无静态求值交叉
 *   （instance 惰性、LEADER_CHANGED 字面量），网效等价。
 * - instance 为 h(i,["instance",function(){return this.instance=new i}]) ——
 *   Laya.static 惰性静态：首访问求值、defineProperty 缓存置换（删 getter）、后续
 *   读走数据属性（批次 A §6.5 ViewScenes.TOP_HEIGHT / 批次 B HelpConfig.type_app
 *   同款换写）。原 getter 体内 this.instance=new i 自写在 sloppy 模式下对 get-only
 *   访问器静默失败、其表达式值即返回值；编译产物为 strict 模式，字面自写会抛
 *   TypeError，故按引擎包装网效（求值一次+缓存）换写，自写表达式值以 var v 捕获。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "../../model/ModelBase";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { CrossServiceMapModel } from "./CrossServiceMapModel";

export class CrossServiceUserModel extends ModelBase {

    public heros: any = {};
    public country: any = -1;
    public allUser: any = {};
    public userData: any = {};
    public leaderData: any = null;

    constructor() {
        super();
    }

    public setData(t: any): void {
        for (var i in CrossServiceUserModel.instance.leaderData = t.country_leader, this.allUser = t.users, (t = t.me).hero_data) {
            var e: any = new (<any>sg.model.ModelHeroPure)(t.hero_data[i]);
            this.heros[i] = e;
        }
        this.country = t.country,
            this.userData = t,
            t.hasOwnProperty("chat_cache") && ModelManager.instance.modelChat.getChatCache(t.chat_cache),
            this.socketReady();
    }

    public socketReady(): void {
        this.socket.registerHandler("dw.country_leader", Handler.create(this, this.onLeaderChange, null, !1));
    }

    public onLeaderChange(t: any): void {
        this.leaderData = t.receiveData,
            this.event(CrossServiceUserModel.LEADER_CHANGED);
    }

    public likeUser(t: any): void {
        this.socket.send("d.like_user", { uid: t }, Handler.create(this, this.updateUserData, null, !1));
    }

    public unlikeUser(t: any): void {
        this.socket.send("d.unlike_user", { uid: t }, Handler.create(this, this.updateUserData, null, !1));
    }

    public updateUserData(t: any): void {
        for (var i in t.user) this.userData[i] = t.user[i], this.event(i + "Change");
    }

    /** r(0,e,"candidates",getter) —— getter-only getset */
    public get candidates(): any {
        return this.leaderData[this.country].uids || [];
    }

    /** r(0,e,"enemyCountry",getter) */
    public get enemyCountry(): any {
        return this.country == CrossServiceMapModel.CHU_COUNTRY ? CrossServiceMapModel.HAN_COUNTRY : CrossServiceMapModel.CHU_COUNTRY;
    }

    /** r(0,e,"showLeader",getter) */
    public get showLeader(): any {
        return ConfigServer.duplicate && 0 !== ConfigServer.duplicate.campaign_switch;
    }

    /** r(0,e,"markCids",getter) */
    public get markCids(): any {
        return this.leaderData[this.country].cids || [];
    }

    /** r(0,e,"uid",getter) */
    public get uid(): any {
        return this.userData.uid;
    }

    /** r(0,e,"task",getter) */
    public get task(): any {
        return this.userData.task;
    }

    /** r(0,e,"socket",getter) */
    public get socket(): any {
        return CrossServiceFacade.instance.socket;
    }

    /** r(0,e,"like_uids",getter) */
    public get like_uids(): any {
        return this.userData.like_uids || [];
    }

    /** r(0,e,"isLeader",getter) */
    public get isLeader(): any {
        return this.uid === this.myLeader;
    }

    /** r(0,e,"enemyLeader",getter) */
    public get enemyLeader(): any {
        return this.leaderData[this.enemyCountry].leader;
    }

    /** r(0,e,"myLeader",getter) */
    public get myLeader(): any {
        return this.leaderData[this.country].leader;
    }

    /** r(0,e,"unlike_uids",getter) */
    public get unlike_uids(): any {
        return this.userData.unlike_uids || [];
    }

    public static LEADER_CHANGED: string = "leader_changed";

    /** h(i,["instance",function(){return this.instance=new i}]) —— Laya.static 惰性单例
     *  （首访问 new + defineProperty 缓存置换；换写依据见文件头注） */
    public static get instance(): CrossServiceUserModel {
        var v = new CrossServiceUserModel();
        Object.defineProperty(CrossServiceUserModel, "instance", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.model.CrossServiceUserModel",t)
 * （t=Ns=sg.model.ModelBase）。base 传 null 的原因见 sg/model/ModelBase.ts 尾注与
 * batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceUserModel, "sg.crossService.model.CrossServiceUserModel", null, null);
