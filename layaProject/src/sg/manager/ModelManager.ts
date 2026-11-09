/**
 * sg.manager.ModelManager —— 全局 Model 单例容器（init() 逐个构造登录后数据层）。
 *
 * 原文：code1.js 字节 [917600,919323]（包装变量 ue，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ModelManager.js
 *
 * 依赖：Ro=ModelAlert（批次 B 模块直引）、pn=NetSocket（③）、Ts=Laya.Trace（②）、
 * P=laya.utils.Handler（引擎）。批次外模型经全局注册路径（见各行内注）。
 * 原文自引走 sg.manager.ModelManager 全局路径，TS 化后改类直引（batch-a-report §6.4）。
 * instance 为 r(1,...) 静态访问器（每次访问走 getter，惰性建单例并写回 sModelManager）。
 * 字段 modelOfficel 原文拼写如此（official 缺 i）。
 */
import Handler = laya.utils.Handler;
import { ModelAlert } from "../model/ModelAlert";
import { NetSocket } from "../net/NetSocket";
import { Trace } from "../laya/Trace";

export class ModelManager {

    public modelUser: any = null;
    public modelGame: any = null;
    public modelInside: any = null;
    public modelProp: any = null;
    public modelClimb: any = null;
    public modelGuild: any = null;
    public modelOfficel: any = null;
    public modelAlert: ModelAlert = null;
    public modelClub: any = null;
    public modelCountryPvp: any = null;
    public modelChat: any = null;
    public modelNewTask: any = null;
    public modelMB: any = null;
    public modelTradeShop: any = null;
    public modelHomeLand: any = null;
    public modelIdolLogin: any = null;
    public modelGwent: any = null;
    public modelChampionNew: any = null;
    public modelNGTask: any = null;
    public modelMap: any = new sg.map.model.MapModel();
    public modelHome: any = new sg.home.model.HomeModel();
    public modelTroopManager: any = new sg.model.ModelTroopManager();
    public taskHelper: any = sg.task.TaskHelper.instance;
    public modelAchievement: any = sg.achievement.model.ModelAchievement.instance;
    public modelSettings: any = sg.model.ModelSettings.instance;

    constructor() {
    }

    /** 登录完成后构造全部数据层（Ro=ModelAlert 为批次 B 模块直引；Uo=ModelArena 仅取单例副作用） */
    public init(): void {
        this.modelGame = new sg.model.ModelGame(),
            this.modelUser = new sg.model.ModelUser(),
            this.modelCountryPvp = new sg.model.ModelCountryPvp(),
            this.modelInside = new sg.model.ModelInside(),
            this.modelProp = new sg.model.ModelProp(),
            this.modelClimb = new sg.model.ModelClimb(),
            this.modelGuild = new sg.model.ModelGuild(),
            this.modelOfficel = new sg.model.ModelOfficial(),
            this.modelAlert = new ModelAlert(),
            this.modelChat = new sg.model.ModelChat(),
            this.modelClub = new sg.model.ModelClub(),
            this.modelMB = new sg.model.ModelMB(),
            this.modelTradeShop = new sg.model.ModelTradeShop(),
            this.modelHomeLand = new sg.model.ModelViewHomeLand(),
            this.modelIdolLogin = new sg.model.ModelIdolLogin(),
            this.modelGwent = new sg.model.ModelGwent(),
            this.modelChampionNew = new sg.model.ModelChampionNew(),
            this.modelNGTask = new sg.model.ModelNGTask(),
            this.modelNewTask = new sg.model.ModelNewTask(),
            sg.model.ModelArena.instance,
            Trace.log("===ModelManager===初始化===");
    }

    /** r(1,e,"instance",...) —— 静态访问器：惰性建单例并缓存到 sModelManager */
    public static get instance(): ModelManager {
        return ModelManager.sModelManager = ModelManager.sModelManager || new ModelManager();
    }

    /** 批量补齐 uid→{uname,head,country}；未命中缓存时走 w.get_user_list 请求后回调 */
    public static getUserInfo(t: any[], s: any): void {
        var h = ModelManager.instance.modelUser;
        !ModelManager.userDict[h.mUID] && (ModelManager.userDict[h.mUID] = { uname: h.uname, head: h.head, country: h.country }),
            (t = t.filter(function (t) { return !ModelManager.userDict[t] })).length
                ? NetSocket.instance.send("w.get_user_list", { uids: t }, new Handler(ModelManager, function (t: any) {
                    t.receiveData.forEach(function (t: any) {
                        ModelManager.userDict[t[0]] = { uname: t[1], head: t[2], country: t[3] };
                    }),
                        s.run();
                }))
                : s.run();
    }

    /** 切号/重登清空：GuideChecker/TaskHelper/ModelAchievement/ModelActivities + 单例置空 */
    public static clear(): void {
        sg.guide.model.GuideChecker.clear(),
            sg.task.TaskHelper.clear(),
            sg.achievement.model.ModelAchievement.clear(),
            sg.activities.model.ModelActivities.clear(),
            ModelManager.sModelManager = null;
    }

    public static sModelManager: ModelManager = null;
    public static userDict: any = {};
}

/**
 * 注册身份等价物：原文 o(e,"sg.manager.ModelManager")（2 参注册，无基类）。
 */
Laya.class(ModelManager, "sg.manager.ModelManager", null, null);
