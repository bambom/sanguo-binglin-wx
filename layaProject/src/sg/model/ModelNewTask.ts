/**
 * sg.model.ModelNewTask —— 新手/合服新任务模型（isOpen 开关+合服序号门槛、
 * getTaskData 装配任务条目、talkType 双向对话切换；isMergeEntry 首查缓存 _merge_entry）。
 *
 * 原文：code1.js 字节 [2239393,2241398]（包装变量 Cr，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 n(10771)="sg.model.ModelNewTask"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelNewTask.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：Gt=ConfigServer、ue=ModelManager、vs=Tools、gs=StringUtil、pn=NetSocket（批次 B 模块
 * 直引）；lr=ModelGame（本批次类直引）；P=laya.utils.Handler（引擎）。
 * 勘误依据（decode_oracle.js 无损解码）：getTaskData 的 s.countryArr 中 s 为类构造器自身
 * （wrapper 词法作用域，类上无该静态，运行时与原包同为 undefined 读取，分支不触发时无副作用）；
 * getNewTaskData 的 P 回调（updateData + modelGame.event）为 resolved 工具丢失内容，按原文补。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { NetSocket } from "../net/NetSocket";
import { ModelGame } from "./ModelGame";

export class ModelNewTask extends ModelBase {

    public _talkType: number = 0;
    public _merge_entry: number = -1;

    constructor() {
        super();
    }

    /** new_task.switch 存在且 0<=switch<=mergeNum（合服序号） */
    public isOpen(): any {
        if (ConfigServer.new_task) {
            var i = null != ConfigServer.new_task["switch"] ? ConfigServer.new_task["switch"] : -1,
                s = ModelManager.instance.modelUser.mergeNum;
            return i >= 0 && i <= s;
        }
        return false;
    }

    /** 已领（-1==进度）条目装配；task_num[0]/[1] 为丢弃求值（原文逗号表达式） */
    public getTaskData(): any[] {
        var i: any[] = [],
            n = ConfigServer.new_task,
            h = (n.task_num[0], n.task_num[1], ModelManager.instance.modelUser.new_task.task_dict);
        Tools.getDictLength(h);
        for (var o in h) {
            var r = o,
                a = n.task_box1[r] ? n.task_box1[r] : n.task_box2[r],
                l = a.type,
                c = a.need,
                u = ModelManager.instance.modelUser.getGameSeason(),
                d = -1 == h[o][2] || h[o][2] >= c[0] ? c[0] : h[o][2],
                _ = null != h[o][3] ? h[o][3] == "all" ? Tools.getMsgById("new_task_text6") : ModelNewTask.countryArr[h[o][3]] : "",
                m = null != h[o][3] ? h[o][3] == "all" ? Tools.getMsgById("new_task_text7") : ModelNewTask.countryArr[h[o][3]] : "",
                g = StringUtil.substituteWithColor(Tools.getMsgById(a.info, ["[(" + d + "/" + c[0] + ")", m]), "#E7B818", "#abc9ff"),
                f = {
                    id: r, type: l, finish: h[o][2] >= c[0], get: -1 == h[o][2], pro: h[o][2],
                    name: Tools.getMsgById(a.name, [_]), reward: a.reward[u], info: g, rarity: a.rarity,
                    icon: a.icon ? "bg_mz_gongji" : "bg_mz_fangyu", fast_finish: a.fast_finish
                };
            0 == <any>f.get && i.push(f);
        }
        return i;
    }

    public redPoint(): boolean {
        return !!this.isOpen() && this.getTaskData().length > 0;
    }

    public getNewTaskData(): void {
        NetSocket.instance.send("get_new_task", {}, new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                ModelManager.instance.modelGame.event("event_new_task_update");
        }));
    }

    /** 合服入口显示：首查按 new_task.entry_merge<=mergeNum 与 unlock("new_task") 判定并缓存 1/0 */
    public isMergeEntry(): boolean {
        if (0 == this._merge_entry)
            return false;
        if (1 == this._merge_entry)
            return true;
        if (ConfigServer.new_task) {
            if (0 == this.isOpen())
                return false;
            if (ModelGame.unlock(null, "new_task").stop)
                return false;
            var i = null != ConfigServer.new_task.entry_merge ? ConfigServer.new_task.entry_merge : -1,
                s = ModelManager.instance.modelUser.mergeNum,
                n = i >= 0 && i <= s;
            return this._merge_entry = n ? 1 : 0, n;
        }
        return false;
    }

    /** r(0,a,"talkType",...) —— 变更即 event_talk_type_change */
    public get talkType(): number {
        return this._talkType;
    }
    public set talkType(t: number) {
        this._talkType != t && (
            this._talkType = t,
            this.event("event_talk_type_change")
        );
    }

    public static EVENT_NEW_TASK_UPDATE: string = "event_new_task_update";
    public static EVENT_TALK_TYPE_CHANGE: string = "event_talk_type_change";

    /**
     * 原文 h(s,["countryArr",function(){return this.countryArr=[…country_0/1/2]}])
     * —— Laya.static 惰性静态：首次访问时求值（三条本地化国名）并缓存为类自身数据属性。
     * 静态 getter + defineProperty 换写（ViewScenes.TOP_HEIGHT 同款）。
     */
    public static get countryArr(): any[] {
        var v = [Tools.getMsgById("country_0"), Tools.getMsgById("country_1"), Tools.getMsgById("country_2")];
        Object.defineProperty(ModelNewTask, "countryArr", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,n(10771),i)（i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注。
 */
Laya.class(ModelNewTask, "sg.model.ModelNewTask", null, null);
