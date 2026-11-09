/**
 * sg.model.ModelNGTask —— 名将任务模型（ng_task：跑马/等待双队列、刷新次数/购买次数、
 * 稀有度/类型筛选；freshTakeList 增量合并 last_task_keys；instance 惰性单例）。
 *
 * 原文：code1.js 字节 [2241406,2244451]（包装变量 kr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelNGTask"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelNGTask.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：cs=ObjectUtil、Gt=ConfigServer、vs=Tools（批次 B 模块直引）；
 * Mr=sg.model.ModelOfficeRight（批次外，全局注册路径：haveRight/func_gtaskcount 静态）。
 * runList/waitList 的 lock 位与 train_limit/train_id 权限位联动（原文顺序：run 先填后锁、
 * wait 先锁后填）。
 */
import { ModelBase } from "./ModelBase";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";

export class ModelNGTask extends ModelBase {

    public ng_task_data: any = {};
    public select_task: any = {};
    public dispatch_hids: any[] = [];
    public select_rarity: number = -1;
    public select_type: number = -1;
    public local_task_list: any[] = [];
    public last_task_keys: any = {};
    public queue_pos: any[] = [];
    public last_run_queue: any[] = [];
    public last_wait_queue: any[] = [];
    public send_type: number = -1;

    constructor() {
        super();
    }

    public initNgTaskData(t: any): void {
        this.ng_task_data = t,
            this.freshTakeList(),
            this.event("fresh_ng_task");
    }

    /** 新旧 task 键集差量合并（新增键在前、guide=1 unshift 提前） */
    public freshTakeList(): void {
        this.local_task_list = [];
        var i = ObjectUtil.keys(this.ng_task_data.task),
            s = ObjectUtil.keys(this.last_task_keys);
        if (s.length <= 0)
            s = i;
        else {
            var n, h: any[] = [];
            for (var o in s) {
                var r;
                if (n = s[o], i.indexOf(n) < 0)
                    for (var a in i)
                        r = i[a], s.indexOf(r) < 0 && h.push(r);
                else
                    h.push(n);
            }
            s = h;
        }
        for (var l = s.length, c = 0; c < l; c++) {
            var u = s[c],
                d = this.ng_task_data.task[u];
            d.id = u,
                1 == d.guide ? this.local_task_list.unshift(d) : this.local_task_list.push(d);
        }
        this.last_task_keys = this.ng_task_data.task;
    }

    /** r(0,h,"runList")：2 槽，train_limit[0]+特权位=可跑数；已占槽取 run_queue[r] */
    public get runList(): any[] {
        for (var i: any[] = [], s = this.ng_task_data.run_queue ? this.ng_task_data.run_queue : [],
                n = this.mConfig.train_limit, h = this.mConfig.train_id,
                o = n[0] + (sg.model.ModelOfficeRight.haveRight(h[0][0]) ? 1 : 0), r = 0; r < 2; r++) {
            var a: any = {};
            a.lock = -1,
                r < o && (a.lock = 0, s[r] && (a = s[r])),
                a.num = r,
                a.queue = "run",
                i.push(a);
        }
        return i;
    }

    public get mConfig(): any {
        return ConfigServer.gtask.ng_task;
    }

    public get ngTaskData(): any {
        return this.ng_task_data;
    }
    public set ngTaskData(t: any) {
        this.ng_task_data = t.user.ng_task,
            this.freshTakeList(),
            this.event("fresh_ng_task");
    }

    public get selectTask(): any {
        return this.select_task;
    }
    public set selectTask(t: any) {
        this.select_task = t;
    }

    public get taskList(): any[] {
        return this.local_task_list;
    }

    public get runDatas(): any[] {
        return this.ng_task_data.run_queue ? this.ng_task_data.run_queue : [];
    }

    public get waitDatas(): any[] {
        return this.ng_task_data.wait_queue ? this.ng_task_data.wait_queue : [];
    }

    /** 3 槽等待队列：train_limit[1]+2 特权位 */
    public get waitList(): any[] {
        for (var i: any[] = [], s = this.ng_task_data.wait_queue ? this.ng_task_data.wait_queue : [],
                n = this.mConfig.train_limit, h = this.mConfig.train_id,
                o = n[1] + (sg.model.ModelOfficeRight.haveRight(h[1][0]) ? 1 : 0) + (sg.model.ModelOfficeRight.haveRight(h[1][1]) ? 1 : 0), r = 0; r < 3; r++) {
            var a: any = {};
            r < o ? (a.lock = 0, s[r] && (a = s[r])) : a.lock = -1,
                a.num = r,
                a.queue = "wait",
                i.push(a);
        }
        return i;
    }

    public get remainTimes(): any {
        var i = this.maxTimes;
        return this.ngTaskData.receive_times && (i -= this.ngTaskData.receive_times), i;
    }

    public get dispatchHids(): any[] {
        return this.dispatch_hids;
    }
    public set dispatchHids(t: any[]) {
        this.dispatch_hids = t,
            this.event("fresh_dispatch_hids");
    }

    /** 距下次刷新毫秒 */
    public get remainFreshTime(): any {
        var i = ConfigServer.getServerTimer();
        return Tools.getTimeStamp(this.ngTaskData.refresh_time) + 1e3 * this.mConfig.gap_time - i;
    }

    public get selectRarity(): number {
        return this.select_rarity;
    }
    public set selectRarity(t: number) {
        this.select_rarity = t,
            this.event("fresh_dispatch_hids");
    }

    public get selectType(): number {
        return this.select_type;
    }
    public set selectType(t: number) {
        this.select_type = t,
            this.event("fresh_dispatch_hids");
    }

    /** 初始次数+官职特权，购买次数加成叠加 */
    public get maxTimes(): any {
        var i = this.mConfig.gtask_intial_num + sg.model.ModelOfficeRight.func_gtaskcount();
        return this.ngTaskData.buy_times && (i = this.ngTaskData.buy_times + i), i;
    }

    public get buyTimes(): any {
        var i = 0;
        return this.ngTaskData.buy_times && (i = this.ngTaskData.buy_times), i;
    }

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModel） */
    public static get instance(): ModelNGTask {
        return ModelNGTask.sModel || (ModelNGTask.sModel = new ModelNGTask()), ModelNGTask.sModel;
    }

    public static FRESH_NG_TASK: string = "fresh_ng_task";
    public static FRESH_DISPATCH_HIDS: string = "fresh_dispatch_hids";
    public static FRESH_QUEUE: string = "fresh_queue";
    public static sModel: ModelNGTask = null;
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelNGTask",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelNGTask, "sg.model.ModelNGTask", null, null);
