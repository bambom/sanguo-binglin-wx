/**
 * sg.model.ModelUser —— 玩家数据中枢模型：登录链（loginSocket/initUserLogin/
 * http_user_login/watchSession）、用户数据装配 initUserData（for-in 副作用链）、
 * 推送增量 updateData（90+ 连锁）、战力 getPower（sBestHid/sBestHeroArr 装配）、
 * 封地/拜访/城建排班 fastAdminArr + setEstateManagerArr、四季节气 getGameSeason、
 * 支付目录 getPayList/getPayMoney、15 个实例 getter（mergeZone/pay_coin/…）、
 * 国家军 arise 时间表、30+ EVENT 常量与 4 组惰性静态。
 *
 * 原文：code1.js 字节 [2414682,2459261]（包装变量 Kr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelUser"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelUser.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造（全模型根数据源）。
 * 直引依赖：ue=ModelManager、pn=NetSocket、fn=NetHttp、Gt=ConfigServer、vs=Tools、
 * tn=ViewManager、Ts=Trace、Rt=ConfigApp、Ut=Platform、Ht=ConfigClass、re=AssetsManager、
 * s=Laya、m=laya.utils.Browser、$=laya.wx.mini.MiniAdpter、P=Handler、K=laya.maths.MathUtil、
 * us=SaveLocal、ns=FunQueue、Sn=TaskHelper、Ms=ModelAchievement、No=MapModel、Xo=ModelChat、
 * Sr=ModelOfficial、$o=ModelClub、lr=ModelGame、ge=sg.map.utils.ArrayUtils、Wt=sg.cfg.HelpConfig、
 * Zs=QueueManager、Js=LoadeManager。
 * 批次外全局注册路径：Ue=sg.model.UserDataProxy、Be=sg.model.ModelTitle、
 * Ni=sg.fight.logic.utils.FightUtils、Pi=sg.fight.test.TestCopyright、
 * Di=sg.fight.test.TestCopyrightData、ci=sg.fight.FightMain、i8=sg.view.init.ViewAgeNotice、
 * ds=sg.utils.ServerDate、vQ=sg.view.effect.UserPowerChange、sn=sg.map.model.CountryArmy、
 * Pr=sg.model.ModelRune、Mr=sg.model.ModelOfficeRight、zs=sg.guide.model.GuideChecker、
 * Bs=sg.activities.model.ModelActivities、uo=sg.festival.model.ModelFestivalAsk、
 * Fo=sg.model.ModelAntiAddiction、hr=sg.model.ModelEstate、$r=sg.model.ModelVisit、
 * Jo=sg.model.ModelCounter、be=sg.map.utils.TestUtils、Go=sg.model.ModelBeast、
 * Ko=sg.model.ModelCityBuild、Ho=sg.model.ModelArmyUpgrade、mh=sg.activities.model.ModelAuction、
 * to=sg.altar.legend.model.ModelLegend、Hn=sg.view.task.ng_task.C_NGTask、qr=sg.model.ModelTomb、
 * qs=sg.homeland.model.ModelHomeLand、fs=sg.utils.ThirdRecording、rr=sg.model.ModelFormation、
 * Tr=sg.model.ModelOffice、Lo=sg.kunlun.model.ModelKunlunPeach、ce=sg.manager.FilterManager、
 * Dr=sg.model.ModelSalePay、pr=sg.model.ModelHonour、Vr=sg.model.ModelSkin、
 * Br=sg.model.ModelPlayer、zr=sg.model.ModelSPArmy、Gr=sg.model.ModelSkill、
 * ao=sg.explore.model.ModelTreasureHunting、Ea=sg.view.levelupGift.LevelupGiftModelManager、
 * Xh=sg.activities.model.ModelSurpriseGiftNew、Eo=sg.model.ModelBlessHero、
 * Ah=sg.activities.model.ModelOptionalOnes、Bh=sg.activities.model.ModelMemberCard、
 * _a=sg.view.bigShot.ModelBigShot、Sh=sg.activities.model.ModelLoopCard、
 * Ls=sg.activities.model.ModelFreeBuy、_r=sg.model.ModelHero、io=sg.altar.legendAwaken.model.ModelLegendAwaken、
 * Se=sg.model.ModelScheme、Bo=sg.kismet.model.ModelKismet、ro=sg.duplicate.ModelDuplicate、
 * zo=sg.model.ModelBuiding、Dt=sg.boundFor.GotoManager、jo=sg.model.ModelCabinet、
 * oo=sg.cross_pvp.model.ModelCrossPvp、Io=sg.heritage.ModelHeritage、ca=sg.seaRoute.ModelSeaRoute、
 * Yo=sg.model.ModelChampion、Rr=sg.model.ModelScience。
 *
 * 结构注记：
 * - loginSocket 的 if 条件为逗号链（timer.clear/off/on 副作用后接 isNullString 判定）；
 *   initUserData 的 for-in 对象、updateData 的内层 for-in 均为逗号表达式副作用链，逐处保留。
 * - 构造器字段初始化在 __super.call 之前（TS 字段初始化器在 super() 后发射，ModelBase
 *   构造不读子字段，语义等价）；ctor 重置静态 sInitLoadMax=0 与条件 new FunQueue 原文如此。
 * - getHead 的 `n[1]&&n[1];`、initUserData 的 `t.hasOwnProperty("head"),`、
 *   initModels 的 `ro.instance;`、initUserData 尾部 `jo.instance,oo.instance,Io.instance,
 *   ca.instance,Bo.instance`、sendSocketFastWork 回调内 `t.sendData;`、fastAdminArr 的
 *   `_[v],` 均为原文丢弃求值，如实保留。
 * - getCaptainID/getCaptainName 的 `var s=a.getCountryID(s<0?s+3:s)` 自引用 var 提升
 *   语义按原文保留（s 未初始化即参与比较）。
 * - 15 个 r(0,l,name,getter) 实例 getter 渲染为原型 get 访问器。
 */
import Handler = laya.utils.Handler;
import Browser = laya.utils.Browser;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import MathUtil = laya.maths.MathUtil;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { NetHttp } from "../net/NetHttp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { ConfigApp } from "../cfg/ConfigApp";
import { Platform } from "../laya/Platform";
import { ConfigClass } from "../cfg/ConfigClass";
import { AssetsManager } from "../manager/AssetsManager";
import { SaveLocal } from "../utils/SaveLocal";
import ArrayUtils = sg.map.utils.ArrayUtils;   // 无独立 TS 模块，走 ambient 全局注册路径（同批次 B/C 用法）
import { HelpConfig } from "../cfg/HelpConfig";
import { QueueManager } from "../manager/QueueManager";
import { LoadeManager } from "../manager/LoadeManager";
import { FunQueue } from "../utils/FunQueue";
import { TaskHelper } from "../task/TaskHelper";
import { ModelAchievement } from "../achievement/model/ModelAchievement";
import { MapModel } from "../map/model/MapModel";
import { ModelChat } from "./ModelChat";
import { ModelOfficial } from "./ModelOfficial";
import { ModelClub } from "./ModelClub";
import { ModelGame } from "./ModelGame";

export class ModelUser extends ModelBase {

    public pf: string = "";
    public merge_maps: string = "";
    public food: number = 0;
    public wood: number = 0;
    public iron: number = 0;
    public gold: number = 0;
    public merit: number = 0;
    public office: number = 1;
    public office37: any = {};
    public country: number = 0;
    public home: any = {};
    public property: any = {};
    public hero: any = {};
    public equip: any = {};
    public building_cd: any = {};
    public building_cd_arr: any[] = [];
    public pub_records: any = {};
    public baggage: any = {};
    public equip_cd: any[] = [];
    public shop: any = {};
    public star: any = {};
    public star_records: any = {};
    public add_time: any = null;
    public login_time: any = null;
    public coin: number = 0;
    public ucoin: number = 0;
    public mUID: string = "";
    public mUID_base: string = "";
    public mUID_merge: string = "";
    public mSessionid: string = "";
    public mFunQueue: FunQueue = null;
    public zone: any = null;
    public gameServerStartTimer: number = 0;
    public farm: number = 0;
    public history: number = 0;
    public guild_id: any = null;
    public application_log: any = {};
    public total_records: any = null;
    public office_right: any = null;
    public gtask: any = null;
    public uname: any = null;
    public alien_reward: any[] = [];
    public isLogin: boolean = !1;
    public pk_records: any = null;
    public pve_records: any = {};
    public climb_records: any = {};
    public head: string = "";
    public msg: any = {};
    public records: any = {};
    public shogun: any[] = [];
    public shogun_value: any = null;
    public hero_catch: any = {};
    public drink: any = {};
    public milepost_reward: any[] = [];
    public milepost_fight_reward: any[] = [];
    public estate: any[] = [];
    public visit: any = {};
    public science: any = {};
    public http_user_login_data: any = null;
    public credit: number = 0;
    public year_credit: number = 0;
    public credit_get_gifts: any[] = [];
    public credit_lv: number = 0;
    public credit_year: number = 0;
    public credit_settle: any = null;
    public is_credit_lv_up: number = 0;
    public last_year_credit: number = NaN;
    public credit_rool_gifts_num: number = NaN;
    public online_time: number = 0;
    public mUserCode: string = "";
    public city_build: any = {};
    public loginDateNum: number = -1;
    public birthday: any = null;
    public pk_npc: any = null;
    public ftask: any = null;
    public task: any = null;
    public use_ctask: number = 0;
    public effort: any = null;
    public effort_records: any = null;
    public mining: any = null;
    public banned_users: any = null;
    public year_build: number = NaN;
    public year_dead_num: number = NaN;
    public year_kill_num: number = NaN;
    public year_kill_troop: number = NaN;
    public quota_gift: any = null;
    public zones_user_num: any = null;
    public pay_ip_check: boolean = !1;
    public impeach_time: any = null;
    public accountId: any = null;
    public ip: any = null;
    public zone_login: any = null;
    public auction: any = null;
    public legend: any = null;
    public xyz: any = null;
    public pay_rank_gift: any = null;
    public bless_hero: any = null;
    public sale_pay: any = null;
    public member_check: number = 0;
    public member: any = null;
    public arena: any = null;
    public beast: any = null;
    public beast_index: number = 0;
    public beast_times: number = 0;
    public beast_lock_ids: any = null;
    public records_360: any[] = [];
    public legend_awaken: any = null;
    public legend_awaken_new: any = null;
    public new_task: any = null;
    public honour_log: any = null;
    public honour_task: any = null;
    public honour_hero: any = null;
    public honour_if_open: number = 0;
    public honour_num: number = 0;
    public honour_exp_multiple: number = 0;
    public honour_strength: number = 0;
    public counter_free_drop_days: number = 0;
    public skin_list: any = null;
    public duplicate_records: any = null;
    public sp_army: any = null;
    public soul: any = null;
    public optional_ones: any = null;
    public duplicate_ban_time: any = null;
    public big_shot: any = null;
    public levelup_gift: any = null;
    public tomb: any = null;
    public loop_card: any = null;
    public independ_addup: any = null;
    public surprise_gift_new: any = null;
    public surprise_gift_day: any = null;
    public surprise_gift_ever: any = null;
    public chat_cache: any = null;
    public scheme: any = null;
    public scheme_box: any = null;
    public heritage: any = null;
    public heritage_trait: any = null;
    public homeland: any = null;
    public homeland_building_plan: any = null;
    public alien_new_reward: any = null;
    public gwent: any = null;
    public doom_tower_exp: number = 0;
    public doom_type_exp: number[] = [0, 0, 0];
    public doom_tower_task: any = null;
    public doom_tower_records: any = null;
    public karma_exp: number = 0;
    public pk_rank: number = 0;
    public god: any = null;
    public god_change_unlock: any = null;
    public invitation: any = null;
    public wilderness: any = null;
    public god_sale: any = null;
    public peach: any = null;
    public use_function: any = null;
    public branch_story: any = null;
    public home_event: any = null;
    public free_activity: any = null;
    public awaken_pass: any = null;
    public cabinet: any = null;
    public touhu: any = null;
    public tenbattle: any = null;
    public tenbattle_limit: any = null;
    public cross_pvp: any = null;
    public cross_records: any = null;
    public cross_pvp_history: any = null;
    public kit: any = null;
    public kit_lock: any = null;
    public userPhoneCount: number = 0;
    public myPowerTemp: number = -1;
    public myPowerChangeNum: number = 0;
    public world_lv: number = 0;
    public free_buy_key: string = "";
    public isLoginHttp: boolean = !1;
    public champion_user: any = null;
    public myLastPowerNum: number = -1;
    public mHeroManagerArr: any[] = [];
    public userDataProxy: any = null;
    public data: any;

    constructor(i?: boolean) {
        super();
        this.userDataProxy = new sg.model.UserDataProxy();
        void 0 === i && (i = !0);
        ModelUser.sInitLoadMax = 0;
        i && (this.mFunQueue = new FunQueue());
    }

    public checkBanUserByID(t: any): boolean {
        return !(!this.banned_users || !this.banned_users[t]);
    }

    public checkOpen(t?: any, i?: any): number {
        return t || (t = 0),
            i || (i = 0),
            t > this.mergeNum ? -1 : t == this.mergeNum ? i > this.loginDateNum ? -1 : i == this.loginDateNum ? 0 : 1 : 1;
    }

    /** if 条件为逗号链（timer.clear/off/on 副作用后接 isNullString 判定）。 */
    public loginSocket(): void {
        if (Laya.timer.clear(this, this.updateSession), NetSocket.instance.off("event_socket_opened", this, this.loginSocket), NetSocket.instance.on("event_socket_opened", this, this.loginSocket), Tools.isNullString(this.mUID_base) || Tools.isNullString(this.mSessionid)) Trace.log("::::ModelUser 准备 socket 登录,没有 mUID_base mSessionid", this);
        else {
            this.zone = sg.model.ModelPlayer.recommendServer, Browser.onMiniGame && ConfigApp.pf == (<any>MiniAdpter.window).game37_pf && Platform.pf_login_data && (Platform.pf_login_data.ip = this.ip);
            var i: any = {
                uid: this.mUID_base,
                sessionid: this.mSessionid,
                zone: this.zone,
                user_code: this.mUserCode,
                pf_data: Platform.pf_login_data,
                pf: ConfigApp.pf,
                pf_key: sg.model.ModelPlayer.instance.mPlayer.name || ""
            };
            ConfigApp.checkPfIs37BySG() && delete i.pf_data,
                ConfigApp.frontcs && Browser.window.frontcsdata && (i.platform_add_time = Browser.window.frontcsdata),
                this.isLogin || LoadeManager.instance.showLoadPanel(0),
                NetSocket.instance.send("login", i, Handler.create(this, this.ws_sr_login));
        }
    }

    public ws_sr_login(t: any): void {
        NetSocket.instance.login_succ_num += 1,
            this.mFunQueue.init([Handler.create(this, this.loadOtherCfgs), Handler.create(this, this.initUserData, [t.receiveData]), Handler.create(this, this.initSupporUI)]);
    }

    public loadOtherCfgs(): void {
        var i = this;
        ConfigServer.loadCfgs_socket(this.mergeZone, Handler.create(null, function () {
            ViewManager.instance.event("event_show_carouse"), i.mFunQueue.next();
        }));
    }

    public initUserLogin(t: any, i?: any, s?: any): void {
        var h = this;
        NetHttp.instance.send("user_zone.login", t, Handler.create(this, function (e) {
            if (NetHttp.checkReIsError(e)) return ViewManager.instance.showTipsTxt(e.msg), void (ConfigApp.useMyLogin() && (ViewManager.instance.showView(ConfigClass.VIEW_LOGIN, -1), i && i.runWith([s, !0])));
            h.http_user_login(e), h.watchSession(e, t, i, s), i && i.runWith(s);
        }));
    }

    public watchSession(t: any, i?: any, n?: any, h?: any): void {
        if (t && t.sessionid) {
            var r = /\|(\d{10})\|/;
            if (r.test(t.sessionid)) {
                var a = 1e3 * (t.sessionid.match(r)[1] || 0) - ConfigServer.getServerTimer();
                a = Math.max(a, 3e3), Laya.timer.once(a, this, this.updateSession, [i, n, h]), NetSocket.instance.once("event_socket_close", this, this.updateSession, [i, n, h]);
            }
        }
    }

    public updateSession(t?: any, i?: any, s?: any): void {
        NetSocket.instance.socket && NetSocket.instance.socket.connected || this.initUserLogin(t, i, s);
    }

    public http_user_login(t: any): void {
        Platform.uploadActionData(10007, null),
            ConfigApp.isFirstInstall && Platform.uploadActionData(10008, null),
            Platform.checkGameStatus(1500),
            sg.model.ModelAntiAddiction.instance.age = t.user_age || -1,
            t && (this.member_check = t.member, this.isLoginHttp = !0, this.mUID = this.mUID_base = t.uid ? t.uid : "", this.mSessionid = t.sessionid ? t.sessionid : "", this.mUserCode = t.user_code ? t.user_code : "", this.zones_user_num = t.zones_user_num, this.accountId = t.user_id, this.ip = t.user_ip, this.zone_login = t.zone_login, ConfigServer.service_info = t.service_info, ConfigServer.service_zone_list = t.service_zone_list, sg.model.ModelPlayer.instance.setUID(this.mUID_base), sg.model.ModelPlayer.instance.setSessionid(this.mSessionid), sg.model.ModelPlayer.instance.setPlayerCardID(this.mUserCode), sg.model.ModelPlayer.instance.setName(t.username), sg.model.ModelPlayer.instance.setPWDs(t.pwd), sg.model.ModelPlayer.instance.setServerZonesFormate(this.zone_login, t.zones), sg.model.ModelPlayer.instance.setPlayerList(), sg.model.ModelPlayer.instance.tel = t.tel, sg.model.ModelPlayer.instance.clearReadyTemp(), this.http_user_login_data = t, this.ucoin = t.ucoin, ConfigServer.getAllZonesData(), Platform.uploadActionData(10009, null), ConfigApp.isFirstInstall && Platform.uploadActionData(10010, null));
    }

    public clear_uid_sessionid(): void {
        this.mUID = "",
            this.mUID_base = "",
            this.mSessionid = "",
            this.zone = "";
    }

    /** for-in 对象为逗号副作用链；`t.hasOwnProperty("head"),` 为丢弃求值；尾部 5 个
     *  `*.instance,` 为强制单例构造的丢弃求值（jo/oo/Io/ca/Bo）。 */
    public initUserData(t: any): void {
        if (t.hasOwnProperty("uid") && (this.mUID = t.uid), !this.isLogin) {
            for (var s in (Platform.checkGameStatus(2e3), sg.map.utils.TestUtils.filterUserData(t), this.data = t, t.records.writeList && (sg.map.utils.TestUtils.isTestShow = t.records.writeList), NetSocket.instance.registerHandler("sync_configs", new Handler(this, this.onConfigChange)), t)) this.hasOwnProperty(s) && (this[s] = t[s]);
            "-1" === this.merge_maps && (this.merge_maps = ""), ConfigServer.modifyMsgDict(), AssetsManager.modifyResourceVersion(), t.hasOwnProperty("merge_uid") && (this.mUID_merge = t.merge_uid), t.hasOwnProperty("head"), !t.hasOwnProperty("honour_hero") && (this.honour_hero = {}), t.hasOwnProperty("hero") && (this.checkHeros(this.hero), this.initHeroRelatedData()), t.hasOwnProperty("beast") && sg.model.ModelBeast.checkBeastSuperData(), t.hasOwnProperty("city_build") && sg.model.ModelCityBuild.initCityBuild(), (t.hasOwnProperty("visit") || t.hasOwnProperty("estate") || t.hasOwnProperty("city_build")) && this.setEstateManagerArr(), t.hasOwnProperty("records") && t.records.hasOwnProperty("redbag_num") && (ModelManager.instance.modelClub.u_redbag_num = t.records.redbag_num), t.hasOwnProperty("country_club") && ModelManager.instance.modelClub.updateData(t.country_club), t.hasOwnProperty("tomb") && sg.model.ModelTomb.instance.initData(t.tomb), t.hasOwnProperty("scheme_box") && sg.model.ModelScheme.checkSchemeHeroObj(), (t.hasOwnProperty("homeland") || t.hasOwnProperty("homeland_building_plan")) && sg.homeland.model.ModelHomeLand.instance.updateData(), t.hasOwnProperty("home") && sg.model.ModelArmyUpgrade.updateArmyUpgradeData(t), t.auction && sg.activities.model.ModelAuction.instance.refreshGlobalData(t.auction), t.legend && sg.altar.legend.model.ModelLegend.instance.refreshData(t.legend), t.god && sg.god.model.ModelGodMain.instance.refreshData(t.god), sg.view.task.ng_task.C_NGTask.instance.refreshData(t.ng_task), sg.model.ModelPlayer.instance.setCurrZone(this.zone), sg.model.ModelPlayer.instance.setZoneList(), sg.model.ModelPlayer.instance.setPlayerList();
            var n: any = {
                uid: this.mUID_base,
                zone: this.zone,
                lv: this.getLv()
            };
            if (ConfigApp.pf == "h5_37") {
                var h = Platform.get37h5_app_ext();
                h && (n.c_game_id = h);
            }
            (<any>NetHttp).newNetHttpObj("user_zone.set_zones", n),
                this.property = t.prop,
                t.hasOwnProperty("prop") && (ModelManager.instance.modelProp.getUserProp(t.prop), sg.model.ModelSPArmy.getSpArmyByBag()),
                this.pub_records = t.pub_records,
                this.formate_cd_list(),
                this.setGameStartTime(),
                ModelUser.checkRuneType(),
                ModelUser.checkEquipType(),
                Trace.log(this.getGameSeason(), "-----------自己的数据--------------", t, this),
                ModelManager.instance.modelInside.setArmyCdObj(0),
                ModelManager.instance.modelChat.initLocalMsgTime(),
                ModelManager.instance.modelChat.initPKYardNewLocalMsgTime(),
                sg.model.ModelFormation.initFormationObj(),
                sg.model.ModelOffice.setLocalRedPoint(),
                ModelChat.initFaceObj(),
                ModelChat.initFaceNameObj(),
                t.hasOwnProperty("chat_cache") && ModelManager.instance.modelChat.getChatCache(t.chat_cache),
                t.hasOwnProperty("peach") && sg.kunlun.model.ModelKunlunPeach.instance.updateData(t),
                sg.manager.FilterManager.instance.setCityBanWord(),
                sg.utils.ThirdRecording.setUid(this.mUID),
                sg.model.ModelHero.setFestivalHids(),
                sg.model.ModelSalePay.initModels(),
                sg.model.ModelHonour.instance.initHounour(),
                t.legend_awaken && sg.altar.legendAwaken.model.ModelLegendAwaken.instance.refreshData(t.legend_awaken),
                ViewManager.instance.event("event_show_carouse"),
                sg.model.ModelSkin.initLocalData(),
                sg.model.ModelChampion.instance.updateData(),
                sg.model.ModelChampion.instance.getMyPkYardHids(null, !0),
                ModelManager.instance.modelGame.initRegisterHandler(),
                sg.model.ModelCabinet.instance,
                sg.cross_pvp.model.ModelCrossPvp.instance,
                sg.heritage.ModelHeritage.instance,
                sg.seaRoute.ModelSeaRoute.instance,
                sg.kismet.model.ModelKismet.instance;
        }
        this.mFunQueue.next();
    }

    public onConfigChange(): void {
        ConfigApp.hasDocument && ((<any>ConfigServer).loadCfgs_socket(this.mergeZone), ConfigServer.modifyMsgDict());
    }

    public initSupporUI(): void {
        if (!this.isLogin)
            return 2 == ConfigApp.testFightType ? (sg.fight.test.TestCopyright.sendInit(), sg.fight.test.TestCopyrightData.init(), ViewManager.instance.initCheckTired(), ViewManager.instance.closeScenes(!0), void sg.fight.FightMain.startCountryBattle(null)) : (ModelManager.instance.modelGame.checkRealNameTimeTips(this.online_time), ViewManager.instance.closeScenes(!0), void (ModelUser.getCountryID() > -1 ? this.initModels(1) : ("ww" == HelpConfig.type_app ? ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_WW, Handler.create(this, this.initModels), { type: 0 }) : this.isMergeMaps ? ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_MAP0, Handler.create(this, this.initModels), { type: 0 }) : ConfigApp.isHorizontal ? ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY_PC, Handler.create(this, this.initModels), { type: 0 }) : ViewManager.instance.showView(ConfigClass.VIEW_COUNTRY, Handler.create(this, this.initModels), { type: 0 }))));
        MapModel.instance.reload();
    }

    /** `ro.instance;` 为丢弃求值。 */
    public initModels(t?: any): void {
        void 0 === t && (t = 0),
            Platform.uploadUserData(1, [t]),
            LoadeManager.instance.showLoadPanel(0),
            sg.guide.model.GuideChecker.instance.initGuide(),
            ModelManager.instance.modelInside.initCDlistener(),
            ModelManager.instance.modelProp.getPveGiftDict(),
            sg.activities.model.ModelActivities.instance.initModel(),
            TaskHelper.instance.initTaskModel(),
            sg.duplicate.ModelDuplicate.instance;
        var n = this;
        this.checkSaveLocal(),
            this.loadOtherAssets(),
            MapModel.instance.initLoadMap(new Handler(n, function () {
                LoadeManager.instance.onProgress(ModelUser.getInitLoadPer()), Laya.timer.once(100, n, n.initTroopModel);
            }));
    }

    public loadOtherAssets(): void {
        if (ConfigApp.isLandscape) {
            var i = [];
            "" != QueueManager.instance.showGetWeapen() && (i.push(AssetsManager.getAssetLater("bg_jy_1.png")), i.push(AssetsManager.getAssetLater("bg_jy_2.png"))), i.length > 0 && (<any>LoadeManager).loadImg(i);
        }
    }

    public checkSaveLocal(): void {
        var i = SaveLocal.getValue("key_affiche" + this.mUID_base) || { days: 0, mergeNum: 0 };
        (i.days < this.getGameDate() || i.mergeNum < this.mergeNum) && (i.days = Math.max(i.days, this.getGameDate()), i.mergeNum = Math.max(i.mergeNum, this.mergeNum), SaveLocal.save("key_affiche" + this.mUID_base, i));
    }

    public initTroopModel(): void {
        LoadeManager.instance.onProgress(ModelUser.getInitLoadPer());
        var i = this;
        ModelManager.instance.modelTroopManager.init(Handler.create(i, function () {
            LoadeManager.instance.onProgress(ModelUser.getInitLoadPer()), Laya.timer.once(100, i, i.initMainUI);
        }));
    }

    public initMainUI(): void {
        this.isLogin = !0,
            this.loadWaitToEnd();
    }

    public loadWaitToEnd(): void {
        Laya.timer.clear(this, this.loadWaitToEnd),
            ModelUser.sInitLoadMax < 1 || !ModelOfficial.countries ? (LoadeManager.instance.onProgress(ModelUser.getInitLoadPer()), Laya.timer.once(50, this, this.loadWaitToEnd)) : (LoadeManager.instance.onComplete(), ViewManager.instance.initGame(), ConfigServer.system_simple.indulge && ConfigServer.system_simple.indulge.pfs && -1 != ConfigServer.system_simple.indulge.pfs.indexOf(ConfigApp.pf) ? sg.model.ModelAntiAddiction.instance.age >= ConfigServer.system_simple.indulge.indulge_age_tips ? this.initQueue() : ViewManager.instance.showView(["ViewAgeNotice", sg.view.init.ViewAgeNotice], [Tools.getMsgById("indulge_title"), Tools.getMsgById("indulge_notice"), Handler.create(this, this.initQueue)]) : this.initQueue());
    }

    public initQueue(): void {
        Trace.log("------游戏启动后,各种功能显示-------"),
            sg.festival.model.ModelFestivalAsk.instance.showStartTips(),
            Platform.obtainCheck(),
            QueueManager.instance.checkInitQueue(),
            QueueManager.instance.showFirst(),
            ModelAchievement.instance.initModelAchievement(),
            sg.guide.model.GuideChecker.instance.startGuide();
    }

    /** 推送增量总装：内层 for-in 对象为逗号副作用链；`!!n.hasOwnProperty("mining")&&…`
     *  为原文布尔表达式语句。 */
    public updateData(t: any): void {
        if (!Tools.isNullObj(t) && !Tools.isNullObj(this.data)) {
            var n: any = {};
            if (t.hasOwnProperty("user") && (n = t.user), !Tools.isNullObj(n)) {
                sg.map.utils.TestUtils.filterUserData(n);
                var h = this.getLv(),
                    o = this.checkPayUpdate(n);
                o && this.event("event_top_update", [o]);
                this.checkBuyWeapon(n);
                var r = this.coin,
                    a = this.gold,
                    l = !1;
                n.hasOwnProperty("shogun_value") && !sg.fight.logic.utils.FightUtils.compareObj(this.shogun_value, n.shogun_value, null) && (l = !0);
                var c = this.year_credit,
                    u = ["hero", "records", "honour_hero", "homeland", "homeland_building_plan", "gwent", "god", "puppet", "puppet_arm", "free_activity", "awaken_pass"];
                for (var d in n)
                    if (-1 !== u.indexOf(d))
                        for (var _ in (void 0 === this[d] && (this[d] = {}), n[d])) this.data[d][_] = this[d][_] = n[d][_];
                    else this.data[d] = n[d], this.hasOwnProperty(d) && (this[d] = n[d]);
                this.getLv() > h && (Trace.log("官邸升级"), ModelManager.instance.modelInside.checkBuildingLvUp(), this.event("event_user_lv_up"));
                var m = n.hasOwnProperty("coin") ? n.coin : -1;
                m >= 0 && r != m && Platform.uploadUserData(4, [r, m]);
                var g = n.hasOwnProperty("gold") ? n.gold : -1;
                if (g >= 0 && a != g && Platform.uploadUserData(6, [a, g]), this.year_credit > c && this.event("event_update_credt"), t.hasOwnProperty("country_club") && ModelManager.instance.modelClub.updateData(t.country_club), t.hasOwnProperty("country_data")) {
                    var f = ModelOfficial.countries[ModelManager.instance.modelUser.country],
                        p = t.country_data;
                    for (var v in p) f.hasOwnProperty(v) && (f[v] = p[v]);
                }
                n.hasOwnProperty("alien_reward") && ModelManager.instance.modelClub.event(ModelClub.EVENT_COUNTRY_ALIEN_RED), n.hasOwnProperty("hero") && this.checkHeros(this.hero), n.hasOwnProperty("beast") && sg.model.ModelBeast.checkBeastSuperData();
                var y: any = !1;
                if (n.hasOwnProperty("prop")) {
                    var b = ConfigServer.shogun.shogun_book,
                        I = 0,
                        x = 0,
                        w = "";
                    for (x = 0; x < b.length; x++) w = b[x], I += this.property[w] ? this.property[w] : 0;
                    this.property = n.prop, ModelManager.instance.modelProp.getUserProp(n.prop), ModelManager.instance.modelProp.setLocalRedPointShow();
                    var C = 0;
                    for (x = 0; x < b.length; x++) w = b[x], C += this.property[w] ? this.property[w] : 0;
                    I != C && (ModelManager.instance.modelInside.updateBaseBuilding(), y = !0);
                }
                0 == y && n.hasOwnProperty("shogun") && ModelManager.instance.modelInside.updateBaseBuilding(), !t.methodName && this.checkRecords(n), n.hasOwnProperty("records_360") && sg.activities.model.ModelActivities.instance.refreshLeftList(), n.hasOwnProperty("building_cd") && this.formate_cd_list(), n.hasOwnProperty("office") && this.event("office"), n.hasOwnProperty("office37") && this.event("office_37"), n.hasOwnProperty("hero_catch") && 1 != ModelManager.instance.modelUser.getUseFunctionByKey("use_drink") && (this.event("heroCatch", Tools.getFullHourDis()), this.event("event_update_btm_btn")), n.hasOwnProperty("drink") && 1 == ModelManager.instance.modelUser.getUseFunctionByKey("use_drink") && (this.event("heroDrink"), this.event("event_update_btm_btn")), (n.hasOwnProperty("visit") || n.hasOwnProperty("estate") || n.hasOwnProperty("city_build")) && (this.setEstateManagerArr(), this.event("event_update_btm_btn")), n.hasOwnProperty("baggage") && ModelManager.instance.modelGame.inHome && ModelManager.instance.modelInside.getBuildingModel(sg.model.ModelBuiding.getBaggageId()).updateStatus(), n.hasOwnProperty("task") && TaskHelper.instance.onTaskProgressChange(n.task), n.hasOwnProperty("gtask") && TaskHelper.instance.event("refresh_task_story"), n.hasOwnProperty("effort") && ModelAchievement.instance.refreshData(n.effort), (n.hasOwnProperty("milepost_reward") || n.hasOwnProperty("milepost_fight_reward")) && ModelManager.instance.modelGame.event("event_CHECK_MILEPOST"), !!n.hasOwnProperty("mining") && sg.explore.model.ModelTreasureHunting.instance.refreshData(n.mining), n.hasOwnProperty("auction") && sg.activities.model.ModelAuction.instance.refreshGlobalData(n.auction), n.hasOwnProperty("legend") && sg.altar.legend.model.ModelLegend.instance.refreshData(n.legend), n.hasOwnProperty("bless_hero") && sg.model.ModelBlessHero.instance.refreshData(n.bless_hero), n.hasOwnProperty("legend_awaken") && sg.altar.legendAwaken.model.ModelLegendAwaken.instance.refreshData(n.legend_awaken), n.hasOwnProperty("duplicate_records") && sg.duplicate.ModelDuplicate.instance.refreshData(n.duplicate_records), n.hasOwnProperty("pk_npc") && ModelManager.instance.modelGame.checkPKnpcFightTimerStatus(), n.hasOwnProperty("star") && ModelUser.checkRuneType(), n.hasOwnProperty("equip") && ModelUser.checkEquipType(), n.hasOwnProperty("levelup_gift") && sg.view.levelupGift.LevelupGiftModelManager.instance.refreshData(n.levelup_gift), n.hasOwnProperty("tomb") && sg.model.ModelTomb.instance.updateData(n.tomb), n.hasOwnProperty("surprise_gift_new") && sg.activities.model.ModelSurpriseGiftNew.instance.updateNew(n.surprise_gift_new), n.hasOwnProperty("surprise_gift_day") && sg.activities.model.ModelSurpriseGiftNew.instance.updateDay(n.surprise_gift_day), n.hasOwnProperty("surprise_gift_ever") && sg.activities.model.ModelSurpriseGiftNew.instance.updateEver(n.surprise_gift_ever), n.hasOwnProperty("ng_task") && sg.view.task.ng_task.C_NGTask.instance.refreshData(n.ng_task), n.hasOwnProperty("msg") && ModelManager.instance.modelChat.setChatData(n.msg.usr), n.hasOwnProperty("scheme_box") && sg.model.ModelScheme.checkSchemeHeroObj(), (n.hasOwnProperty("homeland") || n.hasOwnProperty("homeland_building_plan")) && sg.homeland.model.ModelHomeLand.instance.updateData(), n.hasOwnProperty("home") && sg.model.ModelArmyUpgrade.updateArmyUpgradeData(n), n.hasOwnProperty("invitation") && sg.activities.model.ModelWXShare.instance.redPoint2(), n.hasOwnProperty("god") && sg.god.model.ModelGodMain.instance.refreshData(n.god), n.hasOwnProperty("peach") && sg.kunlun.model.ModelKunlunPeach.instance.updateData(n), Laya.timer.frameOnce(1, this, this.checkProIsChangePower, [n, l]), this.userDataProxy.checkUserData(n), this.event("event_user_update", t);
            }
        }
    }

    public onUserUpdate(t: any, i: any, s?: any, n?: any): void {
        this.userDataProxy.on(t, i, s, n);
    }

    public offUserUpdate(t: any, i: any, s?: any, n?: any): void {
        void 0 === n && (n = !1),
            this.userDataProxy.off(t, i, s, n);
    }

    public soloFightUpdateTroop(t: any): void {
        if (t.hasOwnProperty("pk_result")) {
            var s = t.pk_result.userTroop,
                n = "",
                h: any = {};
            for (var o in s) n = o, h.army = s[o], ModelManager.instance.modelTroopManager.setTroopData("troopUpdate", n, h);
        }
    }

    public checkProIsChangePower(t: any, i?: any): void {
        void 0 === i && (i = !1);
        if ((["hero", "skin_list", "science", "equip", "star", "home", "beast", "doom_tower_exp", "doom_type_exp", "god", "puppet", "puppet_arm", "jigsaw", "heritage_trait"]["some"](function (i) {
            return t.hasOwnProperty(i);
        })) || i) {
            var n = this.getPower(!0);
            sg.map.utils.TestUtils.isTestShow && console.log("getPower", n), n != this.myLastPowerNum && (this.myLastPowerNum = n, Platform.uploadUserData(7, [this.myLastPowerNum]));
        }
    }

    public checkPayUpdate(t: any): any {
        var s = null,
            n = ["gold", "food", "wood", "iron", "coin", "merit"],
            h = this;
        return n.forEach(function (i) {
            null != t[i] && t[i] < h[i] && ((s = s || {})[i] = t[i] - h[i]);
        }),
            s;
    }

    public checkRecords(t: any): void {
        var s = t.records;
        s && (sg.activities.model.ModelActivities.instance.refreshActivitiesData(s), s.pay_gtask_reward && this.checkGtaskReward(s.pay_gtask_reward), s.hasOwnProperty("redbag_num") && (ModelManager.instance.modelClub.u_redbag_num = s.redbag_num), s.hasOwnProperty("idol_login") && ModelManager.instance.modelIdolLogin.checkData(s.idol_login), s.freeze && this.checkFreeze(s.freeze)),
            t.member && sg.activities.model.ModelMemberCard.instance.refreshData(t.member),
            t.optional_ones && sg.activities.model.ModelOptionalOnes.instance.refreshData(t.optional_ones),
            t.big_shot && sg.view.bigShot.ModelBigShot.instance.refreshData(t.big_shot),
            t.loop_card && sg.activities.model.ModelLoopCard.instance.refreshData(t.loop_card),
            this.event("check_records");
    }

    public checkFreeze(t: any): void {
        var s = ConfigServer.getServerTimer(),
            n = 0;
        t[1] && (n = Tools.getTimeStamp(t[1])),
            1 === t[0] && s < n && Platform.restart();
    }

    public initHeroRelatedData(): void {
        for (var i in this.hero) {
            if (this.hero[i].sp_id)
                for (var s = this.hero[i].sp_id, n = 0; n < s.length; n++) s[n] && (sg.model.ModelSPArmy.getModel(s[n]).hid = i);
            if (this.hero[i].beast_ids)
                for (var h = this.hero[i].beast_ids, o = 0; o < h.length; o++) h[o] && (sg.model.ModelBeast.getModel(Number(h[o])).hid = i);
        }
    }

    /** for-in 对象为逗号副作用链（timer.clear 先行）。 */
    public checkHeros(t: any): void {
        var n = ConfigServer.getServerTimer();
        for (var h in (Laya.timer.clear(this, this.titleExpired), t)) {
            var o = t[h],
                r = o.adjutant;
            r ? (o.isCommander = !1, r[0] && (t[r[0]].commander = h, o.isCommander = !0), r[1] && (t[r[1]].commander = h, o.isCommander = !0)) : (o.isCommander = !1, o.adjutant = [null, null]), o.commander || (o.commander = "");
            var a = o.title;
            if (a) {
                var l = Tools.getTimeStamp(a[1]);
                sg.model.ModelHero.checkTitleIsOK(l) && Laya.timer.once(l - n, this, this.titleExpired, [h, a[0]], !1);
            }
        }
    }

    public titleExpired(t: any, i: any): void {
        NetSocket.instance.send("notice_expired_title", { hid: t }),
            this.hero[t].title = null;
        var n = this.myPowerTemp;
        this.getPower(!0) !== n && (sg.view.effect.UserPowerChange.titleName = sg.model.ModelHero.getTitleName(i), sg.view.effect.UserPowerChange.tips = Tools.getMsgById("_jia0188"));
    }

    public checkFreeBuy(t: any): void {
        var s = t.user;
        if (s && s.hasOwnProperty("records")) {
            var n = s.records.free_buy;
            if (n)
                for (var h in n)
                    if (null != n[h] && null == this.records.free_buy[h]) {
                        this.free_buy_key = n[h][0] + "_" + h;
                        break;
                    }
        }
    }

    public checkBuyWeapon(t: any): void {
        if (t && t.hasOwnProperty("records")) {
            var s = t.records.buy_weapon;
            if (s) {
                var n = this.records.buy_weapon;
                for (var h in s)
                    if (null == n || !n.hasOwnProperty(h)) {
                        this.free_buy_key = "buy_weapon_" + h;
                        break;
                    }
                this.records.buy_weapon = t.records.buy_weapon, sg.activities.model.ModelFreeBuy.instance.addData();
            }
        }
    }

    public checkPayMoneyAddArmy(t: any): boolean {
        var s = ConfigServer.system_simple;
        return this[s.fast_train_type] >= t && this.pay_money >= s.fast_train_pay && ModelGame.unlock(null, "fast_train").visible;
    }

    public checkGtaskReward(t: any): void {
        0 === t[2] && 0 === t[3] && Tools.getRemainTime(t[1]) > 0 && sg.activities.model.ModelFreeBuy.instance.gtaskTime !== Tools.getTimeStamp(t[1]) && (sg.activities.model.ModelFreeBuy.instance.gtaskTime = Tools.getTimeStamp(t[1]), this.free_buy_key = "gtask");
    }

    public formate_cd_list(): void {
        for (var i in (this.building_cd_arr = [], this.building_cd)) this.building_cd_arr.push({ id: i, cd: Tools.getTimeStamp(this.building_cd[i]) });
    }

    public getLocalCountry(): void {
    }

    public getLv(): any {
        return ModelManager.instance.modelInside.getBase().lv;
    }

    public getMyTitle(): any[] {
        return this.records.hasOwnProperty("title") ? this.records.title : [];
    }

    public getMyTitleCanSet(): boolean {
        var i = !1,
            s = this.getMyTitle(),
            n = s.length,
            h = ConfigServer.getServerTimer();
        for (var o = 0; o < n; o++)
            if (Tools.getTimeStamp(s[o][1]) > h) {
                i = !0;
                break;
            }
        return i;
    }

    public getMyTitleAll(): any[] {
        var t,
            s = this.getMyTitle(),
            n = [],
            h = ConfigServer.getServerTimer();
        for (var o in this.hero) this.hero[o] && ((t = this.hero[o].title) && (Tools.getTimeStamp(t[1]) > h && n.push(sg.model.ModelTitle.getSortObject(t, -1, o))));
        for (var r = s.length, a = 0; a < r; a++) t = s[a],
            Tools.getTimeStamp(t[1]) > h && n.push(sg.model.ModelTitle.getSortObject(t, a));
        return n = ArrayUtils.sortOn(["sort1", "sort2", "sort3"], n, !0);
    }

    public getStarList(t: any): any[] {
        var s = [],
            n = ConfigServer.star;
        for (var h in this.star) {
            var o: any = {},
                r = h,
                a = h.indexOf("|");
            if (a > -1 && (r = h.substring(0, a)), null == this.star[h].hid && n.hasOwnProperty(r)) {
                if (0 == t && n[r].fix_type >= 4) continue;
                if (1 == t && n[r].fix_type < 4) continue;
                var l = new sg.model.ModelRune;
                l.initData(r, n[r]), o.id = r, o.cid = h, o.fix_type = l.fix_type, o.exp_type = l.exp_type, o.name = l.name, o.lv = this.star[h].lv, o.exp = this.star[h].exp, o.index = l.index, o.icon = l.getImgName(), o.sortLv = -this.star[h].lv, o.sortExp = -this.star[h].exp, o.sortIndex = -l.index, s.push(o);
            }
        }
        return ArrayUtils.sortOn(["fix_type", "sortIndex", "sortLv", "sortExp"], s, !1),
            s;
    }

    public getTroops(): any[] {
        var t,
            s = ModelManager.instance.modelTroopManager.troops,
            n = "",
            h = [];
        for (var o in this.hero)
            if (n = this.mUID + "&" + o, !s.hasOwnProperty(n)) {
                if (t = ModelManager.instance.modelGame.getModelHero(o), this.getCommander(t.id)) continue;
                t.sortPower = t.getPower(), h.push(t);
            }
        return h;
    }

    public selectUserInfo(t: any): void {
        (t = Number(t)) < 0 || NetSocket.instance.send("user_info", { uid: t }, Handler.create(this, this.ws_sr_user_info, [t]));
    }

    public selectHeroInfo(t: any, i?: any, s?: any): void {
        void 0 === s && (s = ""),
            (t = Number(t)) < 0 || NetSocket.instance.send("user_info", { uid: t, zone: s }, Handler.create(this, this.ws_sr_hero_info, [t, i]));
    }

    public checkUserData(t: any, i?: any): void {
        var n = this,
            h = this;
        null != t && 0 != t.length && NetSocket.instance.send("update_user", { key: t }, new Handler(this, function (t) {
            if (n.updateData(t.receiveData), i)
                if (i instanceof laya.utils.Handler) i.run();
                else {
                    var o = Handler.create(h, i);
                    o && o.run();
                }
        }));
    }

    public checkUserOnline(t: any, i?: any): void {
        var n = this;
        NetSocket.instance.send("get_online", { uids: t }, new Handler(this, function (t) {
            if (i)
                if (i instanceof laya.utils.Handler) i.runWith(t.receiveData);
                else {
                    var h = Handler.create(n, i, [t.receiveData]);
                    h && h.runWith(t.receiveData);
                }
        }));
    }

    public ws_sr_user_info(t: any, i: any): void {
        i.receiveData.id = t,
            ViewManager.instance.showView(ConfigClass.VIEW_USER_INFO, i.receiveData);
    }

    public ws_sr_hero_info(t: any, i: any, s: any): void {
        var h = s.receiveData;
        if (h.id = t, h.hero && h.hero[i]) {
            var o = h.hero[i];
            if (o) return void ViewManager.instance.showView(ConfigClass.VIEW_HERO_INFO, o);
        }
        ViewManager.instance.showView(ConfigClass.VIEW_USER_INFO, h);
    }

    public getCommander(t: any): any {
        return this.hero[t] ? this.hero[t].commander : "";
    }

    public getMyHeroArr(t?: any, i?: any, s?: any, n?: any, h?: any, o?: any): any[] {
        void 0 === t && (t = !1),
            void 0 === i && (i = ""),
            void 0 === n && (n = !1),
            void 0 === h && (h = -1),
            void 0 === o && (o = !1);
        var a,
            l = [];
        for (var c in this.hero)
            if (!n || !this.getCommander(c)) {
                a = ModelManager.instance.modelGame.getModelHero(c);
                var u = null;
                -1 != h && ((u = new sg.model.ModelHero(!0)).setData(a.id), u.getPrepare(!0, a.getPrepareObjBy(-1, -1, null, h)), a = u),
                    o && ((u = new sg.model.ModelHero(!0)).getPrepare(!0, a.getPrepareObjBy(-1, -1, null, h, o)), u.setData(u.mModelPrepare.getData()), a = u),
                    t && (a.sortPower = a.getPower()),
                    a.id != i && (s ? s.indexOf(a.id) < 0 && l.push(a) : l.push(a));
            }
        return t && l.length > 1 && l.sort(<any>MathUtil.sortByKey("sortPower", !0)),
            l;
    }

    public setGameStartTime(): void {
        this.gameServerStartTimer = Tools.getGameServerStartTimer(this.mergeZone),
            this.loginDateNum = this.getGameDate();
    }

    public getGameDate(t?: any): number {
        return void 0 === t && (t = -1),
            Math.ceil(this.getGameTime(t) / Tools.oneDayMilli);
    }

    public getGameYear(t?: any): number {
        void 0 === t && (t = -1);
        var s = this.getGameDate();
        return Math.floor((s - 1) / 4);
    }

    public getGameTime(t?: any): number {
        return void 0 === t && (t = -1),
            (t > -1 ? t : ConfigServer.getServerTimer()) - this.gameServerStartTimer;
    }

    public getGameSeason(t?: any, i?: any): number {
        void 0 === t && (t = -1),
            void 0 === i && (i = !1);
        var n = (this.getGameDate() - 1) % 4;
        return i && sg.map.utils.TestUtils.testSeason >= 0 && (n = sg.map.utils.TestUtils.testSeason),
            n;
    }

    public getSeasonName(): any {
        return ModelUser.season_name[this.getGameSeason()];
    }

    public getPower(t?: any, i?: any): any {
        if (void 0 === t && (t = !1), void 0 === i && (i = -1), this.myPowerTemp > 0 && !t && i < 0) return this.myPowerTemp;
        var h = ConfigServer.system_simple.power_herocount,
            o = this.getLv(),
            r = h.length,
            a = -1,
            l = 0;
        for (l = 0; l < r; l++)
            if (o <= h[l][0]) {
                a = l;
                break;
            }
        r = h[a = a < 0 ? h.length - 1 : a][1];
        var c,
            u = {},
            d = {};
        for (c in this.hero) this.hero[c].commander ? u[c] = 1 : d[c] = 1;
        var _,
            m = [];
        for (c in u) _ = ModelManager.instance.modelGame.getModelHero(c),
            m.push({ num: _.getPower(_.getPrepare(!0)), hid: _.id });
        for (c in d) _ = ModelManager.instance.modelGame.getModelHero(c),
            m.push({ num: _.getPower(_.getPrepare(!0)), hid: _.id });
        m.length > 0 && m.sort(<any>MathUtil.sortByKey("num", !0)),
            r = r > m.length ? m.length : r,
            i > -1 && (r = i > r ? r : i);
        var g = 0;
        for (sg.model.ModelHero.sBestHid = m[0] ? m[0].hid : "", sg.model.ModelHero.sBestHeroArr = [], l = 0; l < r; l++) g += m[l].num,
            sg.model.ModelHero.sBestHeroArr.push(m[l].hid);
        return i < 0 && g != this.myPowerTemp && (Trace.log("检查 我的 power = ", r, g), this.myPowerTemp > 0 && t && (this.myPowerChangeNum += g - this.myPowerTemp, Laya.timer.clear(this, this.powerTipsClip), Laya.timer.once(1e3, this, this.powerTipsClip, [this.myPowerChangeNum])), this.myPowerTemp = g, this.event("event_user_update_power", g)),
            g;
    }

    public powerTipsClip(t: any): void {
        t && ViewManager.instance.showViewEffect(sg.view.effect.UserPowerChange.getEffect(t), 0, null, !1, !0, "_power_change_", !1);
    }

    /** `n[1]&&n[1];` 为原文丢弃求值。 */
    public getHead(t?: any): any {
        void 0 === t && (t = 0);
        var s = ModelUser.getUserHead(this.head);
        if (1 == t && -1 != s.indexOf("_")) {
            var n = s.split("_"),
                h = n[0];
            n[1] && n[1];
            s = h + "_0_" + (n[2] ? n[2] : "0");
        }
        return s;
    }

    public isPubOpen(): boolean {
        var i = ConfigServer.pub,
            s = this.pub_records.free_times;
        if (Tools.isNewDay(this.pub_records.free_time) && (s = 0), s < i.hero_box1.free) return !0;
        var n = i.hero_box2.prop_cost;
        if (ModelManager.instance.modelProp.isHaveItemProp(n[0], n[1])) return !0;
        var h = i.hero_box3.prop_cost;
        return !(!ModelManager.instance.modelProp.isHaveItemProp(h[0], h[1]));
    }

    public getCreditArr(): any[] {
        var i = this.year_credit,
            s = this.credit_lv,
            n = this.isMerge ? ConfigServer.credit["merge_" + ModelManager.instance.modelUser.mergeNum] : ConfigServer.credit,
            h = 0,
            o = 0,
            r = [],
            a = 0,
            l = 0;
        if (i >= n.clv_up[s]) {
            if (r = n.clv_added_ratio, a = n.clv_added[s], i >= (l = r[r.length - 1] * a)) {
                var c = n.clv_rool_reward[s][1],
                    u = Math.floor((i - l) / c);
                o = l + u * c, h = l + (u + 1) * c;
            }
        } else r = n.clv_first_ratio,
            a = n.clv_first[s],
            i >= (l = r[r.length - 1] * a) && (h = n.clv_up[s], o = l);
        for (var d = r.length - 1; d >= 0; d--) {
            var _ = a * r[d];
            if (!(i < _)) break;
            h = _, o = 0 == d ? 0 : a * r[d - 1];
        }
        return [Math.round(o), i, Math.round(h)];
    }

    public getEstateHarverst(): any[] {
        var i = [],
            s = ConfigServer.estate.harvest_time * Tools.oneMinuteMilli,
            n = ConfigServer.getServerTimer();
        for (var h = 0; h < this.estate.length; h++) {
            var o = this.estate[h];
            n - Tools.getTimeStamp(o.harvest_time) > s && i.push(h);
        }
        return i;
    }

    public setEstateManagerArr(): void {
        var i = [],
            s = ConfigServer.getServerTimer();
        for (var n = 0; n < this.estate.length; n++) {
            var h = this.estate[n];
            if (h.active_hid) {
                var o = Tools.getTimeStamp(h.active_harvest_time),
                    r: any = {};
                r.hid = h.active_hid, r.estateFinish = s >= o, r.sortTime = s - o, r.endTime = o, r.sortEvent = h.event ? 1 : 0, r.estate_index = n, r.estate_obj = { cid: h.city_id, estate_index: h.estate_index }, r.event_id = h.event ? h.event : "", i.push(r);
            }
        }
        for (var a in this.visit) {
            var l = this.visit[a],
                c = Tools.getTimeStamp(l[2]);
            if (l[0]) {
                var u: any = {};
                u.hid = l[0], u.estateFinish = s >= c, u.sortTime = s - c, u.endTime = c, u.sortEvent = l[3] ? 1 : 0, u.visit_obj = { cid: a, hid: l[0], o_hid: l[1] }, u.event_id = l[3] ? l[3] : "", null != l[2] && i.push(u);
            }
        }
        for (var d in this.city_build) {
            var _ = this.city_build[d];
            for (var m in _) {
                var g = _[m],
                    f = Tools.getTimeStamp(g[1]),
                    p: any = {};
                p.hid = g[0], p.estateFinish = s >= f, p.sortTime = s - f, p.endTime = f, p.sortEvent = g[2] ? 1 : 0, p.cb_obj = { cid: d, bid: m }, p.event_id = g[2] ? g[2] : "", i.push(p);
            }
        }
        ArrayUtils.sortOn(["sortEvent", "sortTime"], i, !0),
            this.mHeroManagerArr = i;
    }

    public getEstateBuildVisitReward(): void {
        var i = this.mHeroManagerArr,
            s = [];
        for (var n = 0; n < i.length; n++) {
            var h = i[n];
            "" == h.event_id && h.estateFinish && (h.estate_obj ? s.push({ estate_obj: h.estate_obj }) : h.visit_obj ? s.push({ visit_obj: h.visit_obj }) : h.cb_obj && s.push({ cb_obj: h.cb_obj }));
        }
        NetSocket.instance.send("estate_build_visit_reward", {}, new Handler(this, function (i) {
            i.receiveData.user.estate && (ModelManager.instance.modelUser.estate = i.receiveData.user.estate), i.receiveData.user.visit && (ModelManager.instance.modelUser.visit = i.receiveData.user.visit);
            for (var n = 0; n < s.length; n++) {
                var h = s[n];
                if (h.estate_obj) ModelManager.instance.modelGame.getModelEstate(h.estate_obj.cid, h.estate_obj.estate_index).event("event_estate_update");
                else h.visit_obj ? sg.model.ModelVisit.updateData(h.visit_obj.cid) : h.cb_obj && sg.model.ModelCityBuild.removeCityBuild(h.cb_obj.cid, h.cb_obj.bid);
            }
            ModelManager.instance.modelUser.updateData(i.receiveData), ModelManager.instance.modelUser.giftDictHandler(i.receiveData);
        }));
    }

    public getMyEstateHeroArr(t: any, i?: any, s?: any, n?: any): any[] {
        void 0 === i && (i = ""),
            void 0 === s && (s = !1);
        var o = "",
            r = [];
        if (0 == t) {
            var a = ConfigServer.estate.estate[i + ""],
                l = 0 == a.hero_debris ? a.active_get : "hero";
            if (o = sg.model.ModelSkill.getEstateSID(l, i + ""), 6 == i && ModelManager.instance.modelUser.records.estate_6_hids) {
                var c = ModelManager.instance.modelUser.records.estate_6_hids;
                !Tools.isNewDay(c[0]) && (r = c[1]);
            }
        } else 1 == t ? o = sg.model.ModelSkill.heroVisitSkillId : 2 == t && (o = sg.model.ModelSkill.cityBuildSkillId);
        var u,
            d,
            _ = [],
            m = 0,
            g = typeof i == "string" && ConfigServer.hero[i] ? i : "";
        for (var f in ("" != g && (m = (d = ModelManager.instance.modelGame.getModelHero(g)).getTopDimensionalArr()[2]), this.hero))
            if (u = ModelManager.instance.modelGame.getModelHero(f), !(n && -1 != n.indexOf(u.id) || 0 == t && i + "" == "6" && 4 == u.rarity)) {
                if (s) {
                    if ("" != u.getWork()) continue;
                    if (-1 != r.indexOf(f)) continue;
                    if (g == f) continue;
                }
                var p: any = {};
                p.hid = f, p.sortPower = u.getPower() ? u.getPower() : 1, p.sortSkill = "" == o ? 0 : ModelManager.instance.modelGame.getModelSkill(o).getLv(u), p.sortBusy = u.getHeroEstate().id, 0 == t && (p.sortNot = -1 == r.indexOf(f) ? 1 : 0), 1 == t && (p.sortMe = g == f ? 0 : 1, p.sortFate = d.isMyFate(u.id) ? 1 : 0, p.sortDim = u.getOneDimensional(m)), _.push(p);
            }
        return 0 == t ? ArrayUtils.sortOn(["sortNot", "sortBusy", "sortSkill", "sortPower"], _, !0) : 1 == t ? ArrayUtils.sortOn(["sortBusy", "sortMe", "sortFate", "sortSkill", "sortDim", "sortPower"], _, !0) : 2 == t && ArrayUtils.sortOn(["sortBusy", "sortSkill", "sortPower"], _, !0),
            _;
    }

    /** 封地/拜访/城建全排班；`_[v],` 为原文丢弃求值。 */
    public fastAdminArr(): any[] {
        var i = [],
            s = [],
            n = [],
            h = [],
            o = [],
            r = [],
            a = [];
        sg.model.ModelEstate.estateFastAdminArr(s, n, h, o, r, a);
        var l = [];
        sg.model.ModelVisit.visitFastAdminArr(l);
        var c = this.getAllCanWordHeros(),
            u = 0,
            d = 0,
            _ = {};
        for (u = 0; u < c.length; u++) _[c[u]] = "1";
        var m = ConfigServer.estate.estate[6],
            g = 0 == m.hero_debris ? m.active_get : "hero",
            f = sg.model.ModelSkill.getEstateSID(g, "6");
        for (this.sortEstate(c, f), u = 0; u < a.length; u++) {
            var p = a[u],
                v = this.getCacheHero(p.city_id, p.estate_index);
            if ("" != v && "1" == _[v]) {
                var y = ModelManager.instance.modelGame.getModelHero(v),
                    b = y.checkCanWork(0, "6");
                if (0 == b) {
                    _[v], p.hid = v, i.push(p);
                    continue;
                }
            }
            for (d = 0; d < c.length; d++) {
                var I = c[d];
                if ("1" == _[I] && 0 == (b = (y = ModelManager.instance.modelGame.getModelHero(I)).checkCanWork(0, "6"))) {
                    _[I] = "2", p.hid = I, i.push(p);
                    break;
                }
            }
            if ("" == p.hid) return i;
        }
        for (c = this.deleteUsedHeros(c, _), g = 0 == (m = ConfigServer.estate.estate[2]).hero_debris ? m.active_get : "hero", f = sg.model.ModelSkill.getEstateSID(g, "2"), this.sortEstate(c, f), u = 0; u < n.length; u++) {
            for (p = n[u], d = 0; d < c.length; d++)
                if ("1" == _[c[d]]) {
                    _[c[d]] = "2", p.hid = c[d], i.push(p);
                    break;
                }
            if ("" == p.hid) return i;
        }
        for (c = this.deleteUsedHeros(c, _), u = 0; u < l.length; u++) {
            var x = l[u],
                w = x.city_id,
                C = ModelManager.instance.modelGame.getModelVisit(w).visit_hid,
                k = this.getVisitHero(C, c, !0);
            "" != k && (ArrayUtils.remove(k, c), _[k] = "2", x.hid = k, i.push(x));
        }
        for (u = 0; u < l.length; u++) x = l[u],
            (Tools.isNullObj(x.hid) || "" == x.hid) && (w = x.city_id, C = ModelManager.instance.modelGame.getModelVisit(w).visit_hid, "" != (k = this.getVisitHero(C, c, !1)) && (ArrayUtils.remove(k, c), _[k] = "2", x.hid = k, i.push(x)));
        for (g = 0 == (m = ConfigServer.estate.estate[1]).hero_debris ? m.active_get : "hero", f = sg.model.ModelSkill.getEstateSID(g, "1"), this.sortEstate(c, f), u = 0; u < s.length; u++) {
            for (p = s[u], d = 0; d < c.length; d++)
                if ("1" == _[c[d]]) {
                    _[c[d]] = "2", p.hid = c[d], i.push(p);
                    break;
                }
            if ("" == p.hid) return i;
        }
        for (c = this.deleteUsedHeros(c, _), g = 0 == (m = ConfigServer.estate.estate[3]).hero_debris ? m.active_get : "hero", f = sg.model.ModelSkill.getEstateSID(g, "3"), this.sortEstate(c, f), u = 0; u < h.length; u++) {
            for (p = h[u], d = 0; d < c.length; d++)
                if ("1" == _[c[d]]) {
                    _[c[d]] = "2", p.hid = c[d], i.push(p);
                    break;
                }
            if ("" == p.hid) return i;
        }
        for (c = this.deleteUsedHeros(c, _), g = 0 == (m = ConfigServer.estate.estate[4]).hero_debris ? m.active_get : "hero", f = sg.model.ModelSkill.getEstateSID(g, "4"), this.sortEstate(c, f), u = 0; u < o.length; u++) {
            for (p = o[u], d = 0; d < c.length; d++)
                if ("1" == _[c[d]]) {
                    _[c[d]] = "2", p.hid = c[d], i.push(p);
                    break;
                }
            if ("" == p.hid) return i;
        }
        for (c = this.deleteUsedHeros(c, _), g = 0 == (m = ConfigServer.estate.estate[5]).hero_debris ? m.active_get : "hero", f = sg.model.ModelSkill.getEstateSID(g, "5"), this.sortEstate(c, f), u = 0; u < r.length; u++) {
            for (p = r[u], d = 0; d < c.length; d++)
                if ("1" == _[c[d]]) {
                    _[c[d]] = "2", p.hid = c[d], i.push(p);
                    break;
                }
            if ("" == p.hid) return i;
        }
        return c = this.deleteUsedHeros(c, _),
            i;
    }

    public getAllCanWordHeros(): any[] {
        var i = [];
        for (var s in this.hero) {
            "" == ModelManager.instance.modelGame.getModelHero(s).getWork() && i.push(s);
        }
        return i;
    }

    public getCacheHero(t: any, i: any): any {
        return ModelManager.instance.modelGame.getModelEstate(t, i).getLocalEstate6();
    }

    public getVisitHero(t: any, i: any, s?: any): string {
        void 0 === s && (s = !1);
        var h = "";
        if ("" == t || 0 == i.length) return h;
        for (var o = ModelManager.instance.modelGame.getModelHero(t), r = sg.model.ModelSkill.heroVisitSkillId, a = 0; a < i.length; a++) {
            var l = i[a];
            if (l != t && !(s && !o.isMyFate(l) || !s && o.isMyFate(l)))
                if ("" != h) {
                    var c = ModelManager.instance.modelGame.getModelHero(l),
                        u = ModelManager.instance.modelGame.getModelSkill(r).getLv(c),
                        d = ModelManager.instance.modelGame.getModelHero(h),
                        _ = ModelManager.instance.modelGame.getModelSkill(r).getLv(d);
                    if (_ < u) h = l;
                    else if (!(_ > u)) {
                        var m = o.getTopDimensionalArr()[2];
                        d.getOneDimensional(m) < c.getOneDimensional(m) && (h = l);
                    }
                } else h = l;
        }
        return h;
    }

    public sortEstate(t: any, i: any): void {
        t.sort(function (t, e) {
            var h = ModelManager.instance.modelGame.getModelHero(t),
                o = "" == i ? 0 : ModelManager.instance.modelGame.getModelSkill(i).getLv(h),
                r = ModelManager.instance.modelGame.getModelHero(e),
                a = "" == i ? 0 : ModelManager.instance.modelGame.getModelSkill(i).getLv(r);
            return o < a ? 1 : o > a ? -1 : h.getStar() < r.getStar() ? 1 : -1;
        });
    }

    public deleteUsedHeros(t: any, i: any): any[] {
        var n = [];
        for (var h = 0; h < t.length; h++) {
            var o = t[h];
            "1" == i[o] && n.push(o);
        }
        return n;
    }

    /** 回调内 `t.sendData;` 为原文丢弃求值。 */
    public sendSocketFastWork(t: any, i?: any): void {
        var n = { estate: [], visit: [] },
            h = [],
            o = [],
            r = !1;
        for (var a = 0; a < t.length; a++) {
            var l = t[a];
            if ("" != l.hid) {
                var c = [];
                if (l.type == "estate") {
                    c = n.estate;
                    var u = ModelManager.instance.modelGame.getModelEstate(l.city_id, l.estate_index);
                    "6" == u.id && (u.setLocalEstate6(l.hid), r = !0), c.push({ estate_index: u.user_index, hid: l.hid }), n.estate = c, h.push(u);
                }
                l.type == "visit" && ((c = n.visit).push({ city_id: l.city_id, hid: l.hid }), n.visit = c, o.push(ModelManager.instance.modelGame.getModelVisit(l.city_id)));
            }
        }
        r && sg.model.ModelEstate.saveLocalEstate6(),
            NetSocket.instance.send("fast_work", n, new Handler(this, function (t) {
                t.sendData;
                ModelManager.instance.modelUser.updateData(t.receiveData);
                for (var n = 0; n < h.length; n++) h[n] && h[n].event("event_estate_update");
                for (var r = 0; r < o.length; r++) o[r] && sg.model.ModelVisit.updateData(o[r].city_id);
                i && ViewManager.instance.closePanel(i);
            }));
    }

    public isFinishFtask(t: any): boolean {
        return ConfigServer.city[t].hasOwnProperty("pctask_id") ? !(!this.ftask || !this.ftask.hasOwnProperty(t) || -1 != this.ftask[t][0]) : (Trace.log("这个城市没有民情"), !0);
    }

    public isShowGuildAlien(): void {
    }

    public isEstateFinish(t: any): boolean {
        var s = this.estate[t];
        if (s) {
            var n = ConfigServer.getServerTimer();
            if (Tools.getTimeStamp(s.active_harvest_time) <= n) return !0;
        }
        return !1;
    }

    public isVisitFinish(t: any): boolean {
        var s = this.visit[t];
        if (s) {
            var n = ConfigServer.getServerTimer();
            if (Tools.getTimeStamp(s[2]) <= n) return !0;
        }
        return !1;
    }

    public isCityBuildFinish(t: any): boolean {
        var s = this.city_build[t.cid][t.bid];
        if (s) {
            var n = ConfigServer.getServerTimer();
            if (Tools.getTimeStamp(s[1]) <= n) return !0;
        }
        return !1;
    }

    public pveTimes(): any[] {
        var i = ConfigServer.pve.combat_times + sg.model.ModelScience.func_sum_type("pve_combat_times");
        return Tools.isNewDay(this.pve_records.combat_time) ? [i, i] : (i += ConfigServer.pve.combat_times_buy[0] * ModelManager.instance.modelUser.pve_records.buy_times, [this.pve_records.combat_times, i]);
    }

    public pveBuyArr(): any[] {
        var i = this.pve_records.buy_times,
            s = ConfigServer.pve.combat_times_buy,
            n = s.length - 1 - i;
        return Tools.isNewDay(this.pve_records.buy_time) && (i = 0, n = s.length - 1),
            n < 0 && (n = 0),
            [s[0], n, s[i + 1]];
    }

    public isPubCanBuy(t: any, i?: any): boolean {
        void 0 === i && (i = !0);
        var n = Tools.isNewDay(Tools.getTimeStamp(this.pub_records.draw_time)),
            h = Tools.isNewDay(Tools.getTimeStamp(this.pub_records.free_time)),
            o = ConfigServer.pub.draw_limit - this.pub_records.draw_times;
        if (!n && o <= 0) return i && ViewManager.instance.showTipsTxt(Tools.getMsgById("_pve_tips11")),
            !1;
        var r = ConfigServer.pub["hero_box" + (t + 1)];
        if (0 != t) {
            if (!ModelManager.instance.modelProp.isHaveItemProp(r.prop_cost[0], r.prop_cost[1]) && !Tools.isCanBuy(r.cost[0], r.cost[1], i)) return !1;
        } else {
            var a = r.free + ModelManager.instance.modelInside.getBuildingLv("building005"),
                l = this.pub_records.free_times;
            if ((n || h) && (l = 0), !(l < a)) return i && ViewManager.instance.showTipsTxt(Tools.getMsgById("_public42")),
                !1;
            if (!Tools.isCanBuy(r.cost[0], r.cost[1], i)) return !1;
        }
        return !0;
    }

    public troop_que_max(): any {
        return ConfigServer.system_simple.troop_que + sg.model.ModelOfficeRight.func_addtroop();
    }

    public resetCredit(): void {
        0 == this.getGameSeason() && NetSocket.instance.send("get_year_attr", {}, new Handler(this, function (i) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public getPayList(t?: any): any[] {
        void 0 === t && (t = !1);
        var s = [],
            n = ModelGame.unlock(null, "sale_pay").stop;
        for (var h in ConfigServer.pay_config_pf)
            if (!(h.indexOf("pay") < 0)) {
                var o = ConfigServer.pay_config_pf[h];
                if (t || 0 != o[1]) {
                    if (null != o[9]) {
                        if (o[9] instanceof Array && -1 != o[9].indexOf(ConfigApp.pf)) continue;
                        if (0 == o[9]) continue;
                    }
                    var r: any = {};
                    r.id = h, r.cost = this.getPayMoney(h, o[0]), r.cost_cfg = o[0], r.get = o[1], r.icon = o[2], r.redbag = [o[3], o[4]], r.text = o[5], r.first = o[6], r.salePayNum = n ? 0 : sg.model.ModelSalePay.getNumByPId(h);
                    var a = sg.model.ModelSalePay.getMaxSaleByPId(h);
                    r.salePayID = n || a == h ? "" : a, s.push(r);
                }
            }
        return s.sort(<any>MathUtil.sortByKey("get", !1)),
            s;
    }

    public getPayMoney(t: any, i: any): any {
        return ConfigServer.system_simple.pay_money && ConfigServer.system_simple.pay_money[ConfigApp.pf] && ConfigServer.system_simple.pay_money[ConfigApp.pf][t] ? ConfigServer.system_simple.pay_money[ConfigApp.pf][t] : i;
    }

    public recruit_hero_cb(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData);
        var s = t.sendData.hid;
        SaveLocal.savaArr("local_save_key_new_hero_" + ModelManager.instance.modelUser.mUID, "heros", s, !0),
            sg.boundFor.GotoManager.boundForPanel("hero_get_new", s);
    }

    public giftDictHandler(t: any): void {
        var i;
        if (t.hasOwnProperty("gift_dict")) i = t.gift_dict,
            t.hasOwnProperty("double_gift") && (i.double_gift = t.double_gift);
        else if (t.hasOwnProperty("gift_dict_list") && (i = t.gift_dict_list, t.hasOwnProperty("double_gift_list")))
            for (var n = 0; n < i.length; n++) i[n].double_gift = t.double_gift_list[n];
        ViewManager.instance.showRewardPanel(i);
    }

    public getMyChatBgData(): any[] {
        var i = [];
        return i.push({ id: "1", type: 0, skin: "bar_11_3_1.png" }),
            i.push({ id: "2", type: 0, skin: "bar_16_2.png" }),
            i.push({ id: "3", type: 0, skin: "bar_11_3.png" }),
            i;
    }

    public checkMyPkYard(): void {
        NetSocket.instance.send("get_my_pk_yard_hids", {}, Handler.create(this, function (t) { }));
    }

    public reset_red_dot_attr(t: any): void {
        NetSocket.instance.send("reset_red_dot_attr", { rtype: t }, Handler.create(this, function (t) {
            ModelManager.instance.modelUser.updateData(t.receiveData);
        }));
    }

    public checkCityInterior(t: any, i?: any, s?: any): boolean {
        void 0 === i && (i = !0),
            void 0 === s && (s = !1),
            t += "";
        var h = "";
        return 0 == <any>this.isFinishFtask(t) && (h = sg.interior.model.ModelCityControl.isOpen() ? s ? Tools.getMsgById("city_control004_1", [ModelOfficial.getCityName(t)]) : Tools.getMsgById("city_control004") : s ? Tools.getMsgById("_ftask_tips02", [ModelOfficial.getCityName(t)]) : Tools.getMsgById("_ftask_tips01")),
            "" != h && i && ViewManager.instance.showTipsTxt(h),
            "" == h;
    }

    public getUseFunctionByKey(t: any): any {
        return this.use_function && this.use_function[t] ? this.use_function[t] : 0;
    }

    public getUseFunctionByKey2(t: any): any {
        return this.use_function && this.use_function.hasOwnProperty(t) ? this.use_function[t] : ConfigServer.system_simple.hasOwnProperty(t) ? ConfigServer.system_simple[t] : 0;
    }

    /* ---- r(0,l,name,getter) 实例 getter（原型访问器，无 setter） ---- */

    public get mergeZone(): any {
        return Tools.getMyLoginZoneID();
    }

    public get pay_coin_daily(): any {
        return this.records.pay_time && !Tools.isNewDay(this.records.pay_time) ? this.records.pay_coin_daily : 0;
    }

    public get payAddBase(): any {
        return ConfigServer.system_simple.act_addbase ? this.pay_coin : this.pay_money;
    }

    public get pay_coin(): any {
        return this.records ? this.records.pay_coin : 0;
    }

    public get zoneNumberID(): any {
        var i = this.mergeZone;
        if (i.indexOf("h") > -1) {
            var s = i.substring(1).split("_");
            return 1e5 * (1e3 + Number(s[0])) + Number(s[1]) + "";
        }
        return i;
    }

    public get pay_money(): any {
        return this.records ? this.records.pay_money : 0;
    }

    public get tel(): any {
        return this.records.hasOwnProperty("tel") ? this.records.tel : "";
    }

    public get payAddBaseDaily(): any {
        return ConfigServer.system_simple.act_addbase ? this.pay_coin_daily : this.pay_money_daily;
    }

    public get pay_money_daily(): any {
        return this.records.pay_time && !Tools.isNewDay(this.records.pay_time) ? this.records.pay_money_daily : 0;
    }

    public get isMerge(): boolean {
        return this.mergeNum > 0;
    }

    public get canPay(): boolean {
        return (ConfigApp.pf !== "h5_qq" || !ConfigApp.onIOS()) && 0 !== ConfigServer.system_simple.pay_active;
    }

    public get currZone(): any {
        return this.mergeZone;
    }

    public get mergeNum(): any {
        return this.mergeZone ? ConfigServer.zone[this.mergeZone][8] : 0;
    }

    public get isMergeMaps(): boolean {
        return "" != this.merge_maps;
    }

    public get canTalk(): boolean {
        var i = this.records.freeze,
            s = ConfigServer.getServerTimer(),
            n = 0;
        return i && i[1] && (n = Tools.getTimeStamp(i[1])), !(i && 2 === i[0] && s < n) || (ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0145")), !1);
    }

    /* ---- 静态 ---- */

    public static getInitLoadPer(): number {
        return ModelUser.sInitLoadMax = Math.round(100 * (ModelUser.sInitLoadMax + ModelUser.sInitLoadPer)) / 100,
            ModelUser.sInitLoadMax;
    }

    public static getTenFoldCoin(t: any): any {
        return ConfigServer.system_simple.act_addbase ? t : 10 * t;
    }

    public static checkRuneType(): void {
        var i = "";
        for (var s in (ModelUser.rune_type_dic = {}, ModelManager.instance.modelUser.star)) {
            i = s.split("|")[0];
            var n = ConfigServer.star[i].fix_type;
            !ModelUser.rune_type_dic[n] && (ModelUser.rune_type_dic[n] = {}), ModelUser.rune_type_dic[n][s] = ModelManager.instance.modelUser.star[s];
        }
    }

    public static checkEquipType(): void {
        for (var i in ModelManager.instance.modelUser.equip) ModelUser.equip_type_dic[ConfigServer.equip[i].type] || (ModelUser.equip_type_dic[ConfigServer.equip[i].type] = {}),
            ModelUser.equip_type_dic[ConfigServer.equip[i].type][i] = ModelManager.instance.modelUser.equip[i];
    }

    public static getUserHead(t: any): any {
        return t || ConfigServer.system_simple.init_user.head;
    }

    public static getCountryID(t?: any): any {
        return void 0 === t && (t = ""),
            typeof t == "number" && Math.floor(t) == t ? t : "" == t ? ModelManager.instance.modelUser.country : parseInt(t);
    }

    /** `var s=a.getCountryID(s<0?s+3:s)` 自引用 var 提升语义按原文保留。 */
    public static getCaptainID(t?: any): any {
        void 0 === t && (t = "");
        var s = ModelUser.getCountryID(s < 0 ? s + 3 : s);
        return ConfigServer.country.country[s].capital;
    }

    public static getCaptainName(t?: any): any {
        void 0 === t && (t = "");
        var s = ModelUser.getCountryID(s < 0 ? s + 3 : s);
        return Tools.getMsgById(ConfigServer.city[ConfigServer.country.country[s].capital].name);
    }

    public static isShogunHasHero(): boolean {
        var i = ModelManager.instance.modelUser.shogun;
        for (var s = 0; s < i.length; s++) {
            var n = i[s];
            if (n)
                for (var h = 0; h < n.hids.length; h++)
                    if (n.hids[h] && -1 != n.hids[h].indexOf("hero")) return !0;
        }
        return !1;
    }

    public static getPayMoneyStr(t: any): any {
        return Tools.getMsgById("193004", [ModelUser.getPayCurrency(), t]);
    }

    public static getPayCurrency(): any {
        var i = Tools.getMsgById("_lht86"),
            s = ConfigServer.system_simple.pay_currency;
        if (!s) return i;
        var n = s[ConfigApp.pf];
        return n || i;
    }

    public static getPidByMoney(t: any): string {
        for (var s in ConfigServer.pay_config_pf) {
            if (!(s.indexOf("pay") < 0))
                if (ConfigServer.pay_config_pf[s][0] === t) return s;
        }
        return "";
    }

    public static getPidByGoodId(t: any): string {
        return ConfigServer.goods[t] ? ConfigServer.goods[t].pay_id : "";
    }

    public static getProductNameById(t: any): any {
        var s = ConfigServer.pay_config[t];
        if (s) return 0 == s[1] ? s[8] : s[1] + s[8];
        var n = ConfigServer.goods[t];
        return n ? Tools.getMsgById(n.info) : "";
    }

    public static getStrByPid(t: any): any {
        if (ConfigServer.pay_config_pf[t]) {
            var s = ModelManager.instance.modelUser.getPayMoney(t, ConfigServer.pay_config_pf[t][0]);
            return ModelUser.getPayMoneyStr(s);
        }
        return "";
    }

    public static getStrByGid(t: any): any {
        if (ConfigServer.goods[t]) {
            var s = ConfigServer.goods[t].pay_id;
            return ModelUser.getStrByPid(s);
        }
        return "";
    }

    public static isNewYear(): boolean {
        return ModelManager.instance.modelUser.getGameYear() > ModelManager.instance.modelUser.credit_year;
    }

    public static getCountryArmyAriseTime(): any {
        var t;
        if (null == ModelOfficial.cities) return null;
        if (0 == sg.model.ModelUser.isHaveCountryArmy()) return null;
        if (ConfigServer.country_army && ConfigServer.country_army.arise_time && ConfigServer.country_army.arise_time.length > 0) {
            for (var s = ConfigServer.getServerTimer(), n = new sg.utils.ServerDate(s), h = 60 * n.getHours() + n.getMinutes(), o = [], r = 0; r < ConfigServer.country_army.arise_time.length; r++) {
                var a = ConfigServer.country_army.arise_time[r];
                o.push(60 * a[0] + a[1]);
            }
            for (var l, c = {}, u = ConfigServer.country_army[ModelManager.instance.modelUser.country].target_city, d = 0; d < u.length; d++) {
                l = u[d][u[d].length - 1];
                var _ = ModelOfficial.cities[l].not_belong_country[ModelManager.instance.modelUser.country],
                    m = _ ? 1e3 * _ : 0,
                    g = ConfigServer.getServerTimer(),
                    f = 1e3 * ConfigServer.country_army.reaction_time;
                c[l] = 0 == m || m + f <= g ? 0 : f - (g - m);
            }
            var p = [];
            for (var v in sg.map.model.CountryArmy.map) {
                var y = sg.map.model.CountryArmy.map[v];
                y.country == ModelManager.instance.modelUser.country && -1 == p.indexOf(y.targetCity.cityId + "") && p.push(y.targetCity.cityId + "");
            }
            var b = o[0],
                I = o[o.length - 1],
                x = [],
                w = [];
            for (var C in c) {
                null == t && (t = {});
                var k = 0 == c[C] ? h : h + c[C] / Tools.oneMinuteMilli;
                if (k >= I) x = ConfigServer.country_army.arise_time[o.length - 1], null != (w = ConfigServer.country_army.arise_time[0])[2] ? w[2] = 1 : w.push(1);
                else if (k < b) w = ConfigServer.country_army.arise_time[0], null != (x = ConfigServer.country_army.arise_time[o.length - 1])[2] ? x[2] = -1 : x.push(-1);
                else
                    for (var T = 0; T < o.length; T++)
                        if (k >= o[T] && k < o[T + 1]) {
                            x = ConfigServer.country_army.arise_time[T], null != (w = ConfigServer.country_army.arise_time[T + 1])[2] ? w[2] = 0 : w.push(0), null != x[2] ? x[2] = 0 : x.push(0);
                            break;
                        }
                t[C] = -1 == p.indexOf(C) ? w : x;
            }
        }
        return t;
    }

    public static getCountryArmyAriseTime2(t?: any): any {
        if (void 0 === t && (t = ""), null == ModelOfficial.cities) return null;
        if (0 == sg.model.ModelUser.isHaveCountryArmy()) return null;
        var s = ModelOfficial.getCountryLandLost(t);
        if (null == s || 0 == s.length) return null;
        for (var n = [], h = ConfigServer.getServerTimer(), o = new sg.utils.ServerDate(h), r = 60 * o.getHours() + o.getMinutes(), a = [], l = ConfigServer.country_army.arise_time, c = 0; c < l.length; c++) {
            var u = l[c][0];
            a.push(60 * u[0] + u[1]);
        }
        if (r < a[0] && (n = [l[0][0][0], l[0][0][1], 0]), r >= a[a.length - 1] + ConfigServer.country_army.reaction_time) n = [l[0][0][0], l[0][0][1], 1];
        else
            for (var d = 0; d < a.length; d++) {
                var _ = a[d],
                    m = a[d] + ConfigServer.country_army.reaction_time,
                    g = a[d + 1] ? a[d + 1] : 0;
                if (r >= _ && r < m) {
                    n = [l[d][0][0], l[d][0][1], 0];
                    break;
                }
                if (r >= m && r < g) {
                    n = [l[d + 1][0][0], l[d + 1][0][1], 0];
                    break;
                }
            }
        return n;
    }

    public static isHaveCountryArmy(): boolean {
        var i = ConfigServer.country_army;
        if (null == i) return !1;
        var s = ModelManager.instance.modelUser.isMerge,
            n = ModelManager.instance.modelUser.loginDateNum;
        if (!s && n < i.expand_day[0]) return !1;
        if (s && n < i.expand_day[1]) return !1;
        var h = new sg.utils.ServerDate(ConfigServer.getServerTimer()),
            o = 60 * h.getHours() + h.getMinutes(),
            r = ConfigServer.country_army.armistice;
        if (ModelManager.instance.modelCountryPvp.mIsToday) {
            if (o < 60 * r[0] + r) return !1;
            if (ModelManager.instance.modelCountryPvp.checkActive()) return !1;
        }
        return !0;
    }

    public static isScienceBreakLv(): boolean {
        if (ConfigApp.testFightType) return !0;
        var i = ModelManager.instance.modelInside.getBuildingModel("building003");
        return !(!i || !(i.lv >= 9));
    }

    public static getPassPVEChapterIndex(): number {
        var i = ModelManager.instance.modelUser.pve_records.chapter,
            s = [];
        for (var n in i) {
            var h = Number(n.substring("chapter".length, n.length));
            s.push({ index: h, id: n });
        }
        if (0 == s.length) return 0;
        ArrayUtils.sortOn(["index"], s);
        for (var o = s.length - 1; o >= 0; o--) {
            var r = i[s[o].id].star;
            if (4 == Tools.getDictLength(r)) return o + 1;
        }
        return 0;
    }

    public static EVENT_PAY_SUCCESS: string = "event_pay_success";
    public static EVENT_IS_NEW_DAY: string = "event_is_new_day";
    public static EVENT_USER_UPDATE_POWER: string = "event_user_update_power";
    public static EVENT_USER_UPDATE: string = "event_user_update";
    public static EVENT_TOP_UPDATE: string = "event_top_update";
    public static EVENT_PROP_CHECK: string = "event_prop_check";
    public static EVENT_PVE_UPDATE: string = "event_pve_update";
    public static EVENT_USER_INFO_UPDATE: string = "event_user_info_update";
    public static EVENT_UPDATE_ARMY_UPGRADE: string = "event_update_army_upgrade";
    public static EVENT_UPDATE_MAIL_SYSTEM: string = "event_update_mail_system";
    public static EVENT_UPDATE_SHOGUN_HERO: string = "event_update_shogun_hero";
    public static EVENT_ACT_TIME_OUT: string = "event_act_time_out";
    public static EVENT_EQUIP_WASH: string = "event_equip_wash";
    public static EVNET_ESTATE_HERO: string = "event_estate_hero";
    public static EVNET_ESTATE_MAIN: string = "event_estate_Main_pdate";
    public static EVENT_CITY_BUILD_MAIN: string = "evnet_city_build_main";
    public static EVENT_UPDATE_BTM_BTN: string = "event_update_btm_btn";
    public static EVENT_UPDATE_ARMY_ITEM: string = "event_update_army_item";
    public static EVENT_UPDATE_CREDIT: string = "event_update_credt";
    public static EVENT_UPDATE_SKILL_NUM: string = "event_update_skill_num";
    public static EVENT_USER_LV_UP: string = "event_user_lv_up";
    public static rune_type_dic: any = {};
    public static equip_type_dic: any = {};
    public static sInitLoadPer: number = .1;
    public static sInitLoadMax: number = 0;
    public static CHECK_RECORDS: string = "check_records";

    /**
     * 原文 h(a,["country_name",…,"country_name2",…,"cost_id_arr",…,"season_name",…])
     * —— Laya.static 惰性静态（getter + defineProperty 换写）。
     */
    public static get country_name(): any[] {
        var v = [Tools.getMsgById("flag_0"), Tools.getMsgById("flag_1"), Tools.getMsgById("flag_2")];
        Object.defineProperty(ModelUser, "country_name", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get country_name2(): any[] {
        var v = [Tools.getMsgById("country_0"), Tools.getMsgById("country_1"), Tools.getMsgById("country_2")];
        Object.defineProperty(ModelUser, "country_name2", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get cost_id_arr(): string[] {
        var v = ["gold", "food", "wood", "iron"];
        Object.defineProperty(ModelUser, "cost_id_arr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get season_name(): any[] {
        var v = [Tools.getMsgById("_public149"), Tools.getMsgById("_public150"), Tools.getMsgById("_public151"), Tools.getMsgById("_public152")];
        Object.defineProperty(ModelUser, "season_name", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(a,"sg.model.ModelUser",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelUser, "sg.model.ModelUser", null, null);
