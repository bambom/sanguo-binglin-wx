/**
 * sg.task.TaskHelper —— 任务中心聚合器（每日/训练/建造/委任/晋升/国家任务 + 主线/章节 +
 * gtask 引导任务；refreshMainTask 驱动主界面任务条；instance 惰性单例）。
 *
 * 原文：code1.js 字节 [1455992,1462654]（包装变量 Sn，基类 t=T=laya.events.EventDispatcher，
 * 明文注册名 "sg.task.TaskHelper"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/TaskHelper.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `sg.task.TaskHelper.instance`。
 * 依赖：ue=ModelManager、tn=ViewManager、vs=Tools、gs=StringUtil、Ze=ArrayUtil、
 * cs=ObjectUtil、pn=NetSocket、Ut=Platform（批次 A/B/C 模块直引）；P=laya.utils.Handler（引擎）；
 * Kr=ModelUser（本批次类直引，getHtmlStr 的 getCountryID 为静态）。
 * 批次外（全局注册路径，延迟调用）：cl=ModelTaskDaily、ml=ModelTaskTrain、al=ModelTaskBuild、
 * dl=ModelTaskOrder、_l=ModelTaskPromote、ul=ModelTaskMain、ua=ModelTaskChapter、ll=ModelTaskCountry、
 * Yr=ModelTask、js=ModelGuide、Tr=ModelOffice、nr=ModelEquip、_r=ModelHero、Gr=ModelSkill、
 * Dt=sg.boundFor.GotoManager（402079）、qi=sg.guide.view.GuideFocus、sg.task.model.ModelTaskBase。
 */
import Handler = laya.utils.Handler;
import { ModelManager } from "../manager/ModelManager";
import { ViewManager } from "../manager/ViewManager";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { ObjectUtil } from "../utils/ObjectUtil";
import { NetSocket } from "../net/NetSocket";
import { Platform } from "../laya/Platform";
import { ModelUser } from "../model/ModelUser";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";

export class TaskHelper extends laya.events.EventDispatcher {

    public taskMain: any = null;
    public taskDaily: any = null;
    public taskTrain: any = null;
    public taskBuild: any = null;
    public taskOrder: any = null;
    public taskPromote: any = null;
    public taskCountry: any = null;
    public taskChapter: any = null;
    public stroyTask: any = null;

    constructor() {
        super();
    }

    /** 登录后装配任务模型单例并挂 get_reward/换天/故事刷新监听；use_ctask 时以章节任务替代主线 */
    public initTaskModel(): void {
        this.taskDaily = sg.task.model.ModelTaskDaily.instance,
            this.taskDaily.typeIndex = 0,
            this.taskDaily.on("get_reward", this, this.getReward),
            this.taskTrain = sg.task.model.ModelTaskTrain.instance,
            this.taskTrain.typeIndex = 2,
            this.taskTrain.on("get_reward", this, this.getReward),
            this.taskBuild = sg.task.model.ModelTaskBuild.instance,
            this.taskBuild.typeIndex = 3,
            this.taskBuild.on("get_reward", this, this.getReward),
            this.taskOrder = sg.task.model.ModelTaskOrder.instance,
            this.taskOrder.typeIndex = 4,
            this.taskOrder.on("get_reward", this, this.getReward),
            this.taskPromote = sg.task.model.ModelTaskPromote.instance,
            this.taskPromote.typeIndex = 5,
            this.taskPromote.on("get_reward", this, this.getReward),
            this.taskCountry = sg.model.ModelTaskCountry.instance,
            this.taskCountry.typeIndex = 6,
            this.taskCountry.on("get_reward", this, this.getReward);
        var t = ModelManager.instance.modelUser;
        t.use_ctask ? this.taskChapter = sg.task.model.ModelTaskChapter.instance : (this.taskMain = sg.task.model.ModelTaskMain.instance, this.taskMain.typeIndex = 1, this.taskMain.on("get_reward", this, this.getReward)),
            t.on("event_is_new_day", this, this.getTask),
            this.onTaskProgressChange(t.task),
            this.on("refresh_task_story", this, this.refreshMainTask);
    }

    public getTask(): void {
        NetSocket.instance.send("get_task", null, new Handler(this, this.getTaskCB));
    }

    public getTaskCB(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData);
    }

    /** t=records.task（daily/common/main/chapter 分桶刷新 + 主条刷新 + 红点事件） */
    public onTaskProgressChange(t: any): void {
        this.taskDaily.refreshTaskData(t.daily),
            this.taskTrain.refreshTaskData(t.common),
            this.taskBuild.refreshTaskData(t.common),
            this.taskOrder.refreshTaskData(t.common),
            this.taskPromote.refreshTaskData(t.common),
            this.taskCountry.refreshTaskData(t),
            t.main && this.taskMain && this.taskMain.refreshTaskData(t.main),
            t.chapter && this.taskChapter && this.taskChapter.refreshData(t.chapter),
            this.refreshMainTask(),
            ModelManager.instance.modelGame.event("event_task_red");
    }

    public getReward(t: any): void {
        NetSocket.instance.send("get_task_reward", { kind: t.kind, task_id: t.task_id }, Handler.create(this, this.getRewardCB), t.gift_dict);
    }

    public getRewardCB(t: any): void {
        Platform.uploadActionData(30, [t.sendData.kind, t.sendData.task_id]);
        var i = t.receiveData,
            e = t.otherData,
            s = i && i.gift_dict || e;
        ModelManager.instance.modelUser.updateData(i),
            s && ViewManager.instance.showRewardPanel(s);
    }

    /** 主线任务条点击：可领则领，否则按类型跳转（boundFor 链） */
    public onClickStory(): void {
        var t = this.stroyTask,
            i = null;
        if (t instanceof sg.task.model.ModelTaskBase) {
            var e = t.getFirstData();
            if (1 === e.taskState && "main" === t.type) {
                this.getReward({ kind: t.type, task_id: e.task_id, gift_dict: e.reward });
            } else {
                if ("main" === t.type) {
                    if (i = e.goto_cfg, "main_2" === e.task_id) {
                        var s = ViewManager.instance.mLayerMenu.getTroop(0);
                        s.mModel && (s = ViewManager.instance.mLayerMenu.getTroop(1)),
                            sg.boundFor.GotoManager.instance.boundForMap(),
                            sg.guide.view.GuideFocus.focusInSprite(s);
                    } else
                        "ts_catch" === e.type ? sg.boundFor.GotoManager.instance.boundForHeroCatche() : 1 === i.type && e.need[1] instanceof Array && 3 === e.need[1].length ? sg.boundFor.GotoManager.instance.boundFor(ObjectUtil.mergeObjects([{ cityID: e.need[1][ModelUser.getCountryID()] }], i)) : sg.boundFor.GotoManager.instance.boundFor(i);
                } else
                    sg.boundFor.GotoManager.instance.boundForPanel("task", t.typeIndex);
            }
        } else
            ConfigApp.isLandscape ? "gtask" === t ? sg.boundFor.GotoManager.instance.boundForPanel("task", "0") : "chapter" === t && sg.boundFor.GotoManager.instance.boundForPanel("task", "-1") : "gtask" === t ? sg.boundFor.GotoManager.instance.boundForPanel("task") : "chapter" === t ? sg.boundFor.GotoManager.instance.boundForPanel("chapter") : Trace.log("No task!!!");
    }

    public hintReward(): void {
        if (this.stroyTask && this.stroyTask.getFirstData) {
            var t = this.stroyTask.getFirstData().reward;
            ViewManager.instance.showRewardPanel(t, null, true);
        }
    }

    /** 主任务条刷新：按 show_rule 优先级找首个可领/进行中任务；gtask/章节优先接管 */
    public refreshMainTask(): void {
        var t = "",
            i = "",
            e = false,
            s = null,
            n = null,
            h = null,
            o = 0,
            r = 0,
            a = 0,
            l: any[] = [],
            c = { main: this.taskMain, common: [this.taskTrain, this.taskBuild, this.taskOrder, this.taskPromote], daily: this.taskDaily },
            u = ConfigServer.task.show_rule;
        for (r = 0, a = u.length; r < a; r++)
            l = l.concat(c[u[r]]);
        for (l = l.filter(function (t: any) { return t }), sg.guide.model.ModelGuide.isNewPlayerGuide() && (l = [l[0]]), r = 0, a = l.length; r < a; r++)
            if ((s = l[r]) && (h = s.getFirstData()) && h.task_id) {
                if (1 === (o = h.taskState)) {
                    n = s,
                        e = true;
                    break;
                }
                null === n && 0 === o && (n = s);
            }
        if (this._checkGTask())
            return this.stroyTask = "gtask", void this._showGTask();
        if (this.taskChapter && this.taskChapter.active)
            return this.stroyTask = "chapter", void this._showChapter();
        var d = sg.model.ModelTask.getStoryData();
        d && 0 == ModelManager.instance.modelUser.getUseFunctionByKey("use_ng_task") ? (this.stroyTask = "gtask", this.event("refresh_main_task_view", [d.name, StringUtil.substituteWithColor(d.info), false])) : null !== n ? (t = n.chineseName, h = n.getFirstData(), i = n.getHTMLByData(h, h.value), this.event("refresh_main_task_view", [t, i, e]), this.stroyTask = n) : (this.stroyTask = null, Trace.log("======================  Task all finished   =========================="));
    }

    public _checkGTask(): boolean {
        for (var t = sg.model.ModelTask.gTask_self_take_arr(), i = 0, e = t.length; i < e; i++) {
            var s = t[i];
            if (0 !== s.status) {
                sg.model.ModelTask.gTask_need(s.id);
                if (sg.model.ModelTask.gTask_score(s) >= 1)
                    return true;
            }
        }
        return false;
    }

    public _showGTask(): void {
        this.event("refresh_main_task_view", [Tools.getMsgById("add_task0"), StringUtil.substituteWithColor(Tools.getMsgById("gtask_hint04")), true]);
    }

    public _showChapter(): void {
        this.event("refresh_main_task_view", [Tools.getMsgById(this.taskChapter.chapterName), StringUtil.substituteWithColor(this.taskChapter.tipsWords), this.taskChapter.redPoint]);
    }

    /** r(1,i,"instance",...) —— 惰性单例（写回 sTaskHelper） */
    public static get instance(): TaskHelper {
        return TaskHelper.sTaskHelper = TaskHelper.sTaskHelper || new TaskHelper();
    }

    public static clear(): void {
        (<any>TaskHelper.sTaskHelper).clearEvents(),
            TaskHelper.sTaskHelper = null;
    }

    /** 任务描述富文本：need 数组按类型转 [名称]，进度着色（e>=need 绿 #5ff9a0 / 黄 #E7B818） */
    public static getHtmlStr(t: any, e: any): string {
        var s = Tools.getMsgById(TaskHelper.getMapping(t.info));
        var n = t.need;
        var h = ModelUser.getCountryID();
        var o = ObjectUtil.clone(t.need, true).map(function (t: any) {
            return t instanceof Array && 3 === t.length && (t = ArrayUtil.flat(t)[h], /^\d+$/.test(t) && (t = "c_" + t)),
                /^skill\d+$/.test(t) ? "[" + sg.model.ModelSkill.getSkillName(t) + "]" : /^building\d+$/.test(t) ? "[" + ModelManager.instance.modelInside.getBuildingModel(String(t)).getName() + "]" : /^[bc]_?\d+$/.test(t) ? "[" + Tools.getMsgById(t) + "]" : t;
        });
        switch (t.type) {
            case "get_office":
                o[1] = "[" + (sg.model.ModelOffice.useOffice37() ? o[1] : sg.model.ModelOffice.getOfficeName(o[1])) + "]";
                break;
            case "com_sand":
                console.log(o);
                var r = Number(String(o[2]).match(/\d+/)[0]);
                0 === (r %= 12) && (r = 12),
                    o[2] = "[" + r + "]";
                break;
            case "equip_num":
                o[1] = "[" + (sg.model.ModelEquip.getTypeNameByType(o[1]) ? sg.model.ModelEquip.getTypeNameByType(o[1]) : Tools.getMsgById("_public3")) + "]";
                break;
            case "equip_quality":
                o[1] = "[" + (sg.model.ModelEquip.getTypeNameByType(o[1]) ? sg.model.ModelEquip.getTypeNameByType(o[1]) : Tools.getMsgById("_public3")) + "]",
                    o[2] = "[" + Tools.getColorInfo(o[2]) + "]";
                break;
            case "hero_quality":
                var a = o[1] % 6;
                o[1] = "[" + sg.model.ModelHero.getHeroStarColorName(o[1]) + (a ? a + Tools.getMsgById("ctask_005") : "") + "]";
                break;
            case "have_hero":
                for (var l = n[1], c = [], u = 0, d = l.length; u < d; u++)
                    c.push(sg.model.ModelHero.rarity_name[l[u]]);
                o[1] = "[" + c.join(Tools.getMsgById("_jia0140")) + "]";
        }
        return o = o.map(function (t: any) {
            return /\d+$/.test(t) ? "[" + Number(String(t).match(/\d+/)[0]) + "]" : t;
        }),
            s = StringUtil.substitute(s, o),
            s += StringUtil.substitute("[({0}/{1})]", e, n[0]),
            StringUtil.substituteWithColor(s, e >= n[0] ? "#5ff9a0" : "#E7B818");
    }

    public static getMapping(t: any): any {
        return sg.model.ModelOffice.useOffice37() && (ConfigServer.system_simple.mapping || {})[t] || t;
    }

    public static GET_REWARD: string = "get_reward";
    public static REFRESH_TASK_STORY: string = "refresh_task_story";
    public static REFRESH_MAIN_TASK_VIEW: string = "refresh_main_task_view";
    public static sTaskHelper: TaskHelper = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.task.TaskHelper",t)（t=T=laya.events.EventDispatcher）。
 */
Laya.class(TaskHelper, "sg.task.TaskHelper", null, null);
