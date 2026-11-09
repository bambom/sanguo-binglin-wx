/**
 * sg.activities.model.ModelOnlineReward —— 在线时长奖励模型（cd 档位推进 +
 * 付费加档 pay_reward + 红点 canReward）。
 *
 * 原文：code1.js 字节 [1220367,1222484]（包装变量 Us，基类 i=T=laya.events.EventDispatcher，
 * 池化注册名 n(343)="sg.activities.model.ModelOnlineReward"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelOnlineReward.js
 *
 * 批次 D 入批原因：MapModel 构造器 checkVars 字典以 Us 类对象为值（构造期读取类引用，
 * 原为 UMD 闭包变量，TS 化后无全局运行时路径，须入批）。
 * 依赖：Gt=ConfigServer、ue=ModelManager、tn=ViewManager、vs=Tools、pn=NetSocket（批次 B）、
 * lr=ModelGame（本批次类直引）、Platform（批次 C）；P=laya.utils.Handler（引擎）。
 * 构造即 _initModel：读 ConfigServer.ploy.act_online + modelUser.records.online_reward。
 */
import Handler = laya.utils.Handler;
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { NetSocket } from "../../net/NetSocket";
import { ModelGame } from "../../model/ModelGame";
import { Platform } from "../../laya/Platform";

export class ModelOnlineReward extends laya.events.EventDispatcher {

    public cfg_pay_money: number = 9999;
    public cfg_online: any[] = null;
    public rewardIndex: number = 0;
    public nextRewardTime: number = 0;
    public reward: any = null;
    public pay_reward: any = null;
    public millisecond: number = 0;
    public totalTime: number = 0;

    constructor() {
        super();
        this._initModel();
    }

    public _initModel(): void {
        var i = ConfigServer.ploy.act_online;
        if (i) {
            this.cfg_pay_money = i.pay_money || 0,
                this.cfg_online = i.online || [];
            var s = ModelManager.instance.modelUser.records.online_reward;
            this.refreshData(s);
        }
    }

    /** t=records.online_reward [rewardIndex, lastTime]；推进档位并广播 update_ui */
    public refreshData(t: any): void {
        if (this.cfg_online && t && !(t.length < 2)) {
            if (this.rewardIndex = t[0], this.nomoreReward) {
                this.event("remove_self");
            } else {
                var s = this.cfg_online[this.rewardIndex];
                this.totalTime = s.cd * Tools.oneMinuteMilli,
                    this.nextRewardTime = Tools.getTimeStamp(t[1]) + this.totalTime,
                    this.reward = s.reward,
                    this.pay_reward = s.pay_reward,
                    this.event("update_ui");
            }
        }
    }

    public getRewardIndex(): number {
        return this.rewardIndex;
    }

    /** 付费加档判定（累计付费 ≥ cfg_pay_money） */
    public extraRewardFlag(): boolean {
        return ModelManager.instance.modelUser.payAddBase >= this.cfg_pay_money;
    }

    public getReward(): void {
        NetSocket.instance.send("get_online_reward", {}, Handler.create(this, this.getRewardCB));
    }

    public getRewardCB(t: any): void {
        Platform.uploadActionData(22, null);
        var n = t.receiveData,
            h = n.gift_dict;
        ModelManager.instance.modelUser.updateData(n),
            ViewManager.instance.showRewardPanel(h, 4 === this.rewardIndex ? this.showTips : null),
            !ModelManager.instance.modelGame.inHome && (ModelOnlineReward.online_reward = (ModelOnlineReward.online_reward || 0) + 1),
            this.event("update_data");
    }

    public showTips(): void {
        this.totalTime = -1,
            ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0045"));
    }

    /** 档位已耗尽（rewardIndex ≥ cfg_online.length） */
    public get nomoreReward(): boolean {
        return this.rewardIndex >= this.cfg_online.length;
    }

    public get remainTime(): number {
        var i = this.nextRewardTime - ConfigServer.getServerTimer();
        return Math.max(i, 0);
    }

    public get cfgPayMoney(): number {
        return this.cfg_pay_money;
    }

    /** 活动开启：可付费且 pay 功能未停 */
    public get active(): boolean {
        return ModelManager.instance.modelUser.canPay && !ModelGame.unlock(null, "pay").stop;
    }

    public get canReward(): boolean {
        return this.active && !this.nomoreReward && 0 === this.remainTime;
    }

    public get cfgOnline(): any[] {
        return this.cfg_online;
    }

    /** 家园区外领取计数（原文尾静态） */
    public static online_reward: number = null;

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModel；第 5 参为 EventDispatcher._$SET_instance 原文如此） */
    public static get instance(): ModelOnlineReward {
        return ModelOnlineReward.sModel = ModelOnlineReward.sModel || new ModelOnlineReward();
    }

    /** [remainTime, totalTime] 快照 */
    public static getRemainingTime(): any[] {
        return [ModelOnlineReward.instance.remainTime, ModelOnlineReward.instance.totalTime];
    }

    public static REMOVE_SELF: string = "remove_self";
    public static UPDATE_UI: string = "update_ui";
    public static sModel: ModelOnlineReward = null;
}

/**
 * 注册身份等价物：原文 o(s,n(343),i)（i=T=laya.events.EventDispatcher）。
 */
Laya.class(ModelOnlineReward, "sg.activities.model.ModelOnlineReward", null, null);
