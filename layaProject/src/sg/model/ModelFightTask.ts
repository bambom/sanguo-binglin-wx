/**
 * sg.model.ModelFightTask —— 国战任务模型（任务刷新/预告/开场与结束时间轴/加成 buff，
 * ViewModelBase 惰性单例 sModel；构造即注册 socket 推送）。
 *
 * 原文：code1.js 字节 [1891729,1895585)（off 1892106，池化注册名 e(6590)→
 * "sg.model.ModelFightTask"，包装变量 Wo，IIFE 实参基类 i=As=sg.model.ViewModelBase；
 * sendMethod/event 继承自 ViewModelBase/EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-aa/ModelFightTask.js
 *
 * 身份（locate_aa.js / resolve_aa.js）：Gt=ConfigServer、pn=NetSocket、P=laya.utils.Handler、
 * vs=Tools、s=Laya（UMD 头别名表证）、Zs=QueueManager、tn=ViewManager、Rt=ConfigApp、
 * Ht=ConfigClass、js=ModelGuide（已译，模块直引）、p8=ViewHeroTalk（已译，模块直引，
 * 值参与 showView(["ViewHeroTalk",p8],…) 视图描述数组）、ps=TimeHelper（已译，模块直引）。
 *
 * 保真注记：ctor 尾段四连（cfg 取值+_refreshTask+NetSocket.on+registerHandler）在
 * super 后原序保留；_sendCallBack 的 o.map 两连（第二带 thisArg）逐字保留；
 * _initListener 的三元链 i<foreshow?…:i<begin||(i<end?(…):i<close&&…) 分组照抄；
 * getTxt 的 switch 判别式为逗号表达式（时间轴归并 s 后以 t 判别，ModelPf yybBox
 * switch 同款先例）；taskChanged 的 some(function(t){…},this) thisArg 保留；
 * active/redPoint 覆写基类访问器（redPoint 恒 !1）；静态 instance 为
 * r(1,…,sg.model.ViewModelBase._$SET_instance)——SET 标记 setter（TS getter-only，
 * ES5 sloppy 写静默忽略，ModelPlayer.ts:25 先例）；showHeroTalk 两处单参调用按
 * (<any>ViewManager.instance) cast（真类签名 2-4 参，ModelArena.ts:261 先例，
 * cast 不入 JS 产物）。
 */
import Handler = laya.utils.Handler;
import { ViewModelBase } from "./ViewModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { NetSocket } from "../net/NetSocket";
import { Tools } from "../utils/Tools";
import { QueueManager } from "../manager/QueueManager";
import { ViewManager } from "../manager/ViewManager";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigClass } from "../cfg/ConfigClass";
import { ModelGuide } from "../guide/model/ModelGuide";
import { ViewHeroTalk } from "../view/init/ViewHeroTalk";
import { TimeHelper } from "../utils/TimeHelper";

export class ModelFightTask extends ViewModelBase {

    public has_fight_task: boolean = !1;
    public citys: any[] = [];
    public taskData: any[] = [];
    public task_begin_time: number = 0;
    public task_end_time: number = 0;
    public foreshow_time: number = 0;
    public close_time: number = 0;
    public needPush: boolean = !1;
    public talkArgs: any = null;
    public cfg: any;

    constructor() {
        super();  // 原文 h.__super.call(this)（字段预置先于 super，H/O 位移归一）
        this["cfg"] = ConfigServer["system_simple"]["fight_task"], this["_refreshTask"](), NetSocket["instance"].on("event_socket_receive_from", this, this["event_socket_send_and_receive"]), NetSocket["instance"]["registerHandler"]("push_fight_task", new Handler(this, this["taskBegin"]));
    }

    public event_socket_send_and_receive(t: any, i: any, n: any): void {
        n && t === "get_fight_task" && Laya["timer"]["once"](6e3, this, this["_refreshTask"]);
    }

    public _refreshTask(t?: any): void {
        void 0 === t && (t = ""), this["has_fight_task"] = !1, this["sendMethod"]("get_fight_task", null, Handler["create"](this, this["_sendCallBack"]), t);
    }

    public _sendCallBack(t: any): void {
        var s = this, n = t["receiveData"], h = t["otherData"], o = n["country_fight_task"]["task"] || [];
        this["has_fight_task"] = n["has_fight_task"], this["citys"] = o["map"](function (t) {
            return parseInt(t[0]);
        }), this["taskData"] = o["map"](function (t) {
            return { cid: parseInt(t[0]), cfg: s["cfg"], state: t[1] };
        }, this), n["has_fight_task"] && (this["has_fight_task"] && this["_initListener"](), this["event"]("fight_task")), this["taskChanged"](h);
    }

    public _initListener(): void {
        var i = ConfigServer["getServerTimer"]();
        this["task_begin_time"] = Tools["getTodayMillWithHourAndMinute"](this["cfg"]["time_begin"]), this["task_end_time"] = Tools["getTodayMillWithHourAndMinute"](this["cfg"]["time_end"]), this["foreshow_time"] = this["task_begin_time"] - 1e3 * this["cfg"]["time_notice"], this["close_time"] = this["task_end_time"] + 1e3 * this["cfg"]["task_buff"][2], this["talkArgs"] = [[this["cfg"]["show_talk1"]], Handler["create"](ViewManager["instance"], function () {
            QueueManager["instance"]["mIsGoto"] = !0, ViewManager["instance"]["showView"](ConfigApp["isLandscape"] ? ConfigClass["VIEW_FIGHT_TASK_H"] : ConfigClass["VIEW_FIGHT_TASK"]);
        })], i < this["foreshow_time"] ? Laya["timer"]["once"](this["foreshow_time"] - i, this, this["taskForeShow"]) : i < this["task_begin_time"] || (i < this["task_end_time"] ? (this["needPush"] = this["active"], Laya["timer"]["once"](this["task_end_time"] - i + 6e3, this, this["taskEnd"])) : i < this["close_time"] && Laya["timer"]["once"](this["close_time"] - i, this, this["hideEntrance"]));
    }

    public taskForeShow(): void {
        this["event"]("fight_task");
    }

    public taskBegin(): void {
        this["_refreshTask"]("type_begin");
    }

    public taskEnd(): void {
        this["_refreshTask"]("type_end");
    }

    public taskChanged(t: any): void {
        if (this["active"] && !ModelGuide["forceGuide"]()) {
            switch (t) {
                case "type_begin":
                    ViewManager["instance"]["showView"](["ViewHeroTalk", ViewHeroTalk], this["talkArgs"]);
                    break;
                    case "type_end":
                        (<any>ViewManager["instance"])["showHeroTalk"]([this["taskData"]["some"](function (t) {
                        return 1 === t["state"];
                    }, this) ? this["cfg"]["show_talk3"] : this["cfg"]["show_talk4"]]);
            }
            this["event"]("fight_task_change");
        }
    }

    public hideEntrance(): void {
        this["event"]("fight_task"), this["event"]("hide_fight_task");
    }

    public getTxt(t?: any): any {
        void 0 === t && (t = 0);
        var s = "fight_task08", n = ConfigServer["getServerTimer"]();
        switch (n < this["task_begin_time"] ? s = "fight_task08" : n < this["task_end_time"] ? s = "fight_task09" : n < this["close_time"] && (s = this["taskData"]["some"](function (t) {
            return 1 === t["state"];
        }, this) ? "fight_task11" : "fight_task10"), t) {
            case 0:
                return Tools["getMsgById"](s, [TimeHelper["remainTimeStr"](this["remainTime"])]);
            case 1:
                return Tools["getMsgById"](s, [""])["split"]("\n")[0];
            case 2:
                return TimeHelper["remainTimeStr"](this["remainTime"]);
        }
        return "";
    }

    public foreshowTips(): void {
        (<any>ViewManager["instance"])["showHeroTalk"]([this["cfg"]["show_talk2"]]);
    }

    /* ---- r(0,a,name,getter) 实例访问器 ---- */

    public get cids_map(): any {
        var i = ConfigServer["getServerTimer"]();
        return i > this["task_begin_time"] && i < this["task_end_time"] ? this["citys"] : [];
    }

    public get canShow(): any {
        var i = ConfigServer["getServerTimer"]();
        return i > this["task_begin_time"] && i < this["close_time"];
    }

    public get buff(): any {
        var i = ConfigServer["getServerTimer"]();
        if (i > this["task_end_time"] && i < this["close_time"]) {
            var s = this["taskData"]["filter"](function (i) {
                return 1 === i["state"];
            }, this)["length"], n = this["cfg"]["task_buff"];
            return 0 === s ? [] : [n[0] * s, n[1] * s, this["close_time"] - i];
        }
        return [];
    }

    public get remainTime(): any {
        var i = ConfigServer["getServerTimer"]();
        return i < this["task_begin_time"] ? this["task_begin_time"] - i : i < this["task_end_time"] ? this["task_end_time"] - i : i < this["close_time"] ? this["close_time"] - i : 0;
    }

    public get active(): any {
        var i = ConfigServer["getServerTimer"](), s = i > this["foreshow_time"] && i < this["task_begin_time"], n = 2 === this["citys"]["length"] && i > this["task_begin_time"] && i < this["close_time"];
        return s || n;
    }

    public get redPoint(): any {
        return !1;
    }

    /* ---- r(1,h,"instance",getter,sg.model.ViewModelBase._$SET_instance) —— 惰性单例 ---- */

    public static get instance(): ModelFightTask {
        return ModelFightTask.sModel = ModelFightTask.sModel || new ModelFightTask;
    }

    public static SHOW_FIGHT_TASK_BTN: string = "fight_task";
    public static HIDE_FIGHT_TASK: string = "hide_fight_task";
    public static FIGHT_TASK_CHANGE: string = "fight_task_change";
    public static TYPE_END: string = "type_end";
    public static TYPE_BEGIN: string = "type_begin";
    public static sModel: ModelFightTask = null;
}

/**
 * 注册身份等价物：原文 o(h,e(6590),i)（池化名 e(6590)="sg.model.ModelFightTask"，
 * i=As=sg.model.ViewModelBase）。base 传 null：tsc extends 已建原型链（batch-a
 * 「注册等价决策」，同 ModelXYZ2/ModelArena）。
 */
Laya.class(ModelFightTask, "sg.model.ModelFightTask", null, null);
