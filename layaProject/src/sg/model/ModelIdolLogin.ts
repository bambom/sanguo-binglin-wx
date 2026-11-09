/**
 * sg.model.ModelIdolLogin —— 偶像登录福利模型（active/redPoint 红点 +
 * send_reward 领取请求 + UPDATE_DATA 事件）。
 *
 * 原文：code1.js 字节 [2014501,2015660]（包装变量 ir，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 n(5725)="sg.model.ModelIdolLogin"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelIdolLogin.js
 *
 * 依赖：Gt=ConfigServer、ue=ModelManager、tn=ViewManager、pn=NetSocket（批次 B 模块直引）；
 * P=laya.utils.Handler（引擎）；ModelBase（批次 A）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { ViewManager } from "../manager/ViewManager";
import { NetSocket } from "../net/NetSocket";

export class ModelIdolLogin extends ModelBase {

    constructor() {
        super();
    }

    /** 奖励表（system_simple.idol_login.reward；无配置时空数组） */
    public reward_Array(): any[] {
        var i: any[] = [];
        return ConfigServer.system_simple.hasOwnProperty("idol_login") && (i = ConfigServer.system_simple.idol_login.reward),
            i;
    }

    /** 领取后广播 update_data */
    public checkData(t: any): void {
        t && this.event("update_data");
    }

    /** 领取指定档位：get_idol_login_reward → modelUser.updateData + 奖励弹窗 */
    public send_reward(t: any): void {
        NetSocket.instance.send("get_idol_login_reward", { reward_index: t }, Handler.create(this, function (t: any) {
            var s = t.receiveData.gift_dict;
            ModelManager.instance.modelUser.updateData(t.receiveData),
                s && ViewManager.instance.showRewardPanel(s);
        }));
    }

    /** 活动开启且已开服（open_day 起）且已领数 < 奖励档数 */
    public get active(): boolean {
        if (ModelManager.instance.modelUser.records.idol_login) {
            var i = ModelManager.instance.modelUser.records.idol_login.login_reward,
                s: any[] = [];
            ConfigServer.system_simple.hasOwnProperty("idol_login") && (s = ConfigServer.system_simple.idol_login.reward);
            var n = ModelManager.instance.modelUser.getGameDate(),
                h = ModelManager.instance.modelUser.records.idol_login.open_day;
            if (!h) return false;
            if (h && n - h >= 0 && i.length < s.length) return true;
        }
        return false;
    }

    /** 红点：开服天数对应档位尚未领取（login_reward.indexOf 天数 < 0） */
    public get redPoint(): boolean {
        if (ModelManager.instance.modelUser.records.idol_login) {
            var i = ModelManager.instance.modelUser.getGameDate(),
                s = ModelManager.instance.modelUser.records.idol_login.open_day,
                n = ModelManager.instance.modelUser.records.idol_login.login_reward;
            if (s && i - s >= 0 && n.indexOf(i - s) < 0) return true;
        }
        return false;
    }

    public static UPDATE_DATA: string = "update_data";
}

/**
 * 注册身份等价物：原文 o(s,n(5725),i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelIdolLogin, "sg.model.ModelIdolLogin", null, null);
