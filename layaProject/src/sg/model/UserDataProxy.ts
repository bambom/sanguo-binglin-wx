/**
 * sg.model.UserDataProxy —— 用户数据字段监听代理（组合 EventDispatcher，非继承）。
 *
 * 原文：code1.js 字节 [1005370,1006256)（off 1005435，包装变量 Ue，2 参注册
 * o(t,"sg.model.UserDataProxy")，无基类——本类不是 EventDispatcher 子类，内部
 * _proxy 组合一个 EventDispatcher 实例分发事件）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-f/UserDataProxy.js
 *
 * F8 死点（2026-11-10 主会话实测）：ModelManager.init (ModelManager.js:52) →
 * new ModelUser (ModelUser.js:280) → `new sg.model.UserDataProxy()` —— 批次 D 留的
 * ambient 类型层无运行时实现，本类注册后解除。
 *
 * 构造器硬依赖：new T，T=laya.events.EventDispatcher（UMD 头别名，@char283810
 * `T=(laya.events.Event, laya.events.EventDispatcher)` 逗号表达式取后者；作用域链
 * 实证 Ue 包装内无 T 遮蔽）。方法体依赖（非构造期）：ue=ModelManager（批次 B）、
 * Ze=ArrayUtil（批次 B）、cs=ObjectUtil（批次 B）。
 * 引擎私有面：_proxy.getEvents()（game.js@362803 实测在场，1.8.17 d.ts 未声明，
 * (<any>) 调用，批次 E「引擎私有面」先例）。
 */
import EventDispatcher = laya.events.EventDispatcher;
import { ModelManager } from "../manager/ModelManager";
import { ArrayUtil } from "../utils/ArrayUtil";
import { ObjectUtil } from "../utils/ObjectUtil";

export class UserDataProxy {

    /** 字段名首段 → 监听中的完整字段路径数组 */
    public listenedFields: any;
    /** 内部分发器（原文 new T，T=laya.events.EventDispatcher） */
    public _proxy: EventDispatcher;

    constructor() {
        this.listenedFields = {},
            this._proxy = new EventDispatcher();
    }

    /** 注册字段监听：透传 _proxy.on 后刷新监听清单并立即对该字段做一次单点校验 */
    public on(t: string, i: any, e: Function, s?: any): void {
        this._proxy.on(t, i, e, s),
            this.refreshListenedFields(),
            this._checkSingleData(t, ModelManager.instance.modelUser.data);
    }

    /** 移除监听：原文 void 0===s&&(s=!1) 默认参语义 */
    public off(t: string, i: any, e: Function, s?: boolean): void {
        void 0 === s && (s = !1),
            this._proxy.off(t, i, e, s);
    }

    /** 重建 listenedFields：监听事件名（点分字段路径）按首段分组 */
    public refreshListenedFields(): void {
        var t = ArrayUtil.distinct(ObjectUtil.keys((<any>this._proxy).getEvents()));
        this.listenedFields = {};
        for (var i = 0; i < t.length; i++) {
            var e = t[i], s = e.split(".")[0];
            this.listenedFields[s] = this.listenedFields[s] || [], this.listenedFields[s].push(e);
        }
    }

    /** 数据推送校验：对 t 顶层键下所有监听字段逐个 _checkSingleData（forEach 第二参 thisArg= this 保留） */
    public checkUserData(t: any): void {
        var i = this;
        for (var e in t) {
            var s = this.listenedFields[e];
            s && s.length && s.forEach(function (e) {
                i._checkSingleData(e, t);
            }, this);
        }
    }

    /** 单字段校验：沿点分路径下钻 i；中途非 object 即返回（原文 `if("object"!=typeof s)return;`），终值以 [s] 数组派发 */
    public _checkSingleData(t: string, i: any): void {
        if (i) {
            for (var e = t.split("."), s = i, n = 0, h = e.length; n < h; n++) {
                var o = e[n];
                if ("object" != typeof s) return;
                s = s[o];
            }
            this._proxy.event(t, [s]);
        }
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.model.UserDataProxy")（2 参注册，无基类，同
 * ModelManager/NetMethodCfg 形态；base=null 决策见 batch-a-report.md「注册等价决策」）。
 */
Laya.class(UserDataProxy, "sg.model.UserDataProxy", null, null);
