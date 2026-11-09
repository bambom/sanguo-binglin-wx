/**
 * sg.achievement.model.ModelAchievement —— 成就模型（efforts 分组数据 + tabLabels 页签 +
 * 红点/领奖 get_effort_reward；instance 惰性单例 + clear）。
 *
 * 原文：code1.js 字节 [1198996,1202714]（包装变量 Ms，基类 i=T=laya.events.EventDispatcher，
 * 池化注册名 n(12389)="sg.achievement.model.ModelAchievement"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelAchievement.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `sg.achievement.model.ModelAchievement.instance`。
 * 依赖：Gt=ConfigServer、ue=ModelManager、tn=ViewManager、vs=Tools、Ze=ArrayUtil、pn=NetSocket
 * （批次 B 模块直引）；lr=ModelGame（本批次类直引）；P=laya.utils.Handler（引擎）；
 * gL=sg.achievement.view.AchievementHint（off 3873641，批次外全局注册路径，延迟调用）；
modelInside=ModelInside（本批次）。
 * mergeNum：合服序号（duplicate.truce_<n> 开停战页签，switch 门槛过滤成就）。
 */
import Handler = laya.utils.Handler;
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { NetSocket } from "../../net/NetSocket";
import { ModelGame } from "../../model/ModelGame";

export class ModelAchievement extends laya.events.EventDispatcher {

    public cfg: any = null;
    public efforts: any[] = [];
    public hasNew: boolean = false;
    public tabLabels: any[] = null;

    constructor() {
        super();
    }

    /** 装配成就分组（efforts[1..4]，3=无分页统计位）；停战期（duplicate.truce_<mergeNum>）加第 5 页签 */
    public initModelAchievement(): void {
        this.cfg = ConfigServer.effort;
        var i = ModelManager.instance.modelUser;
        this.tabLabels = [
            { name: Tools.getMsgById("_jia0040"), index: 0, progress: "(0/0)", flag: 0 },
            { name: Tools.getMsgById("_jia0041"), index: 1, progress: "(0/0)", flag: 0 },
            { name: Tools.getMsgById("_jia0042"), index: 2, progress: "(0/0)", flag: 0 },
            { name: Tools.getMsgById("_jia0043"), index: 3, progress: "(0)", flag: 0 }];
        var s = ConfigServer.duplicate;
        for (var n in (s && 1 === s["switch"] && s["truce_" + i.mergeNum] && this.tabLabels.push({ name: Tools.getMsgById("_jia0154"), index: 4, progress: "(0/0)", flag: 0 }), this.cfg))
            if (n.match(/ach/)) {
                var h = this.cfg[n];
                var o = h.index.match(/(\d)_(\d+)/);
                var r = parseInt(o[1]);
                if (this.efforts[r] = this.efforts[r] || [], 3 !== r) {
                    var a = { id: n, sortIndex: parseInt(o[2]), typeIndex: r, time: 0, state: 0 };
                    (!h["switch"] || i.mergeNum >= h["switch"]) && this.efforts[r].push(a);
                }
            }
        this.refreshData(i.effort);
    }

    /** 合服停战页签去重后，若 effort 记录含 5_x 成就则补第 5 页签（index:5） */
    public _checkShowAchieve_5(): void {
        var i = Tools.getMsgById("_jia0043_1");
        if (!this.tabLabels.some(function (e: any) {
            return e.name === i;
        })) {
            var s = ModelManager.instance.modelUser;
            for (var n in s.effort) {
                var h = this.cfg[n].index.match(/(\d)_(\d+)/);
                if (5 === parseInt(h[1])) {
                    return void this.tabLabels.push({ name: i, index: 5, progress: "(0/0)", flag: 0 });
                }
            }
        }
    }

    /** t=records.effort：{achId:[time,state]}；未领(state==1)推 hasNew、排序并刷新页签进度 */
    public refreshData(t: any): void {
        var s = this;
        if (this.efforts && this.cfg) {
            this._checkShowAchieve_5(),
                this.tabLabels.forEach(function (t: any) {
                    t.flag = 0;
                });
            var n = ArrayUtil.padding([], this.efforts.length, 0);
            this.hasNew = false;
            var h: any[] = [];
            for (var o in t) {
                var r = t[o];
                var a = parseInt(this.cfg[o].index.match(/\d/)[0]);
                var l = this.efforts[a];
                if (l) {
                    var c = ArrayUtil.find(l, function (t: any) {
                        return t.id === o;
                    });
                    c ? (c.time = Tools.getTimeStamp(r[0]), c.state = r[1] + 1) : (c = { id: o, typeIndex: 3, time: Tools.getTimeStamp(r[0]), state: r[1] + 1 }, l.push(c)),
                        n[a]++,
                        1 === c.state && (
                            h.push(o),
                            this.tabLabels[a] && (this.tabLabels[a].flag = 1)
                        );
                }
            }
            h.length && (
                this.hasNew = true,
                ModelManager.instance.modelInside.updateBaseBuilding()
            ),
                this.hasNewAchieve() && new sg.achievement.view.AchievementHint(h),
                this.efforts.forEach(function (t: any) {
                    t.sort(function (t: any, i: any) {
                        return t.time && !i.time ? -1 : !t.time && i.time ? 1 : t.time && i.time ? i.time - t.time : t.sortIndex - i.sortIndex;
                    }),
                        t.forEach(function (t: any, i: number) {
                            t.index = i;
                        });
                }),
                this.tabLabels.forEach(function (t: any, e: number) {
                    t.progress = n[e] + "/" + s.efforts[e].length,
                        3 === e && (t.progress = n[e]);
                }),
                this.event("update_data");
        }
    }

    /** 4=停战页签；同 type+need 参数组只留 need 最小的一条（重复成就去重） */
    public getEffortsByIndex(t: number): any[] {
        var s = this;
        if (4 === t) {
            var n: any = {},
                h: any[] = [];
            return this.efforts[t].forEach(function (t: any, e: number) {
                if (0 === t.state) {
                    var r = s.cfg[t.id],
                        a = r.need,
                        l = r.type + JSON.stringify(a[1]);
                    n[l] ? a[0] < n[l].need ? (h.push(n[l].id), n[l].id = t.id) : h.push(t.id) : n[l] = { id: t.id, need: a[0] };
                }
            }),
                this.efforts[t].filter(function (t: any) {
                    return -1 === h.indexOf(t.id);
                });
        }
        return this.efforts[t];
    }

    public getEffortConfigById(t: any): any {
        return this.cfg[t];
    }

    public getTabLabels(): any[] {
        return this.tabLabels;
    }

    public hasNewAchieve(): boolean {
        return this.hasNew && !ModelGame.unlock(null, "effort").stop;
    }

    public getReward(t: any): void {
        NetSocket.instance.send("get_effort_reward", { effort_id: t }, Handler.create(this, this.getRewardCB), this.getEffortConfigById(t).reward);
    }

    public getRewardCB(t: any): void {
        var s = t.otherData;
        ModelManager.instance.modelUser.updateData(t.receiveData),
            ViewManager.instance.showRewardPanel(s),
            ModelManager.instance.modelInside.updateBaseBuilding();
    }

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModelAchievementr） */
    public static get instance(): ModelAchievement {
        return ModelAchievement.sModelAchievementr = ModelAchievement.sModelAchievementr || new ModelAchievement();
    }

    /** 切号清理（原文 r(1,...) 第 5 参为 EventDispatcher._$SET_instance，仅 getter 等价） */
    public static clear(): void {
        (<any>ModelAchievement.sModelAchievementr).clearEvents(),
            ModelAchievement.sModelAchievementr = null;
    }

    public static isGetAchi(t: any): boolean {
        return !!ModelManager.instance.modelUser.effort[t];
    }

    /** t=[[achiId, num], ...]：全取条件下取最后一档加成数 */
    public static getAchiAddNum(t: any): number {
        var s = 0;
        if (t)
            for (var n = 0; n < t.length; n++)
                sg.achievement.model.ModelAchievement.isGetAchi(t[n][0]) && (s = t[n][1]);
        return s;
    }

    public static UPDATE_DATA: string = "update_data";
    public static sModelAchievementr: ModelAchievement = null;
}

/**
 * 注册身份等价物：原文 o(s,n(12389),i)（i=T=laya.events.EventDispatcher）。
 */
Laya.class(ModelAchievement, "sg.achievement.model.ModelAchievement", null, null);
