/**
 * sg.model.ModelGame —— 游戏中枢模型：30+ 推送协议 handler 注册（initRegisterHandler）、
 * 模型工厂族（getModelHero/Skill/Shop/Equip/Rune/Science/Skin/Visit/Estate/Ftask）、
 * 防沉迷计时（checkTired/getTieldOpen）、功能解锁 unlock(func_open 九元组)、
 * 支付链 mbPay/toPay/tryToPay（MB 秒付分支 + Platform.pay）。
 *
 * 原文：code1.js 字节 [2081669,2105087]（包装变量 lr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelGame"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelGame.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造（全模型被引中枢）。
 * 依赖（批次 A/B/C 模块直引）：ue=ModelManager、pn=NetSocket、P=Handler、Gt=ConfigServer、
 * vs=Tools、gs=StringUtil、tn=ViewManager、Ts=Trace、us=SaveLocal、Rt=ConfigApp、Zs=QueueManager、
 * ae=ColorManager、fn=NetHttp、Ut=Platform、Ht=ConfigClass（VIEW_HERO_SEND/VIEW_MB_PAY/VIEW_PAY_SELF/
 * VIEW_HERO_DRINK/VIEW_HERO_CHOOSE/VIEW_MAIL_CONTENT）；本批类直引：Sr=ModelOfficial、Qo=ModelClimb、
 * Xo=ModelChat、Ar=ModelProp。
 * 批次外全局注册路径：hr=ModelEstate、$r=ModelVisit、Ko=ModelCityBuild、ar=ModelFTask、
 * ko=sg.interior.model.ModelCityControl、_r=ModelHero、Gr=ModelSkill、Or=ModelShop、nr=ModelEquip、
 * Pr=ModelRune、Rr=ModelScience、Vr=ModelSkin、Gh=sg.activities.model.ModelHappy、
 * xr=sg.model.ModelNewMilepost、$t=sg.crossService.CrossServiceFacade、ho=sg.crossService.model.CrossServiceUserModel、
 * Un=sg.view.fight.gwent.C_Gwent、Nn=sg.view.fight.champion_sg_new.C_Champion、Hn=sg.view.task.ng_task.C_NGTask、
 * Ao=sg.kunlun.model.ModelKunlunSale、ZK=sg.view.effect.BuildingFuncOpen、Ea=sg.view.levelupGift.LevelupGiftModelManager、
 * Fo=sg.model.ModelAntiAddiction、Ls=sg.activities.model.ModelFreeBuy、Zr=sg.puppet.model.ModelCountryStoreroom、
 * Ge=sg.puppet.PuppetUtils、lo=sg.festival.model.ModelFestival、Dt=sg.boundFor.GotoManager、
 * v8=sg.view.init.ViewHeroTalk2、js=sg.guide.model.ModelGuide、re=AssetsManager（mHeroBigIconAssets）。
 * unlock 的 `Gt.system_simple`（求值丢弃）与 checkGameTimeTipsTimer 的 timer 链为原文精确顺序。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { ViewManager } from "../manager/ViewManager";
import { Trace } from "../laya/Trace";
import { SaveLocal } from "../utils/SaveLocal";
import { ConfigApp } from "../cfg/ConfigApp";
import { QueueManager } from "../manager/QueueManager";
import { ColorManager } from "../manager/ColorManager";
import { NetHttp } from "../net/NetHttp";
import { Platform } from "../laya/Platform";
import { ConfigClass } from "../cfg/ConfigClass";
import { AssetsManager } from "../manager/AssetsManager";
import { ModelOfficial } from "./ModelOfficial";
import { ModelClimb } from "./ModelClimb";
import { ModelChat } from "./ModelChat";
import { ModelProp } from "./ModelProp";

export class ModelGame extends ModelBase {

    public inHome: boolean = false;
    public inMap: boolean = true;
    public gameTimer: number = 0;
    public gameTipsTimer: number = -1;
    public gameTipsTimerDes: number = 10;
    public creatNewTroopID: any = {};
    public comChatVisible: boolean = false;
    public mFirstGoToMap: boolean = true;
    public mPKnpcCaptainLocalData: any = null;

    constructor() {
        super();
        QueueManager.instance.on("event_close_panel", this, this.queueCallBack);
    }

    /** 30+ 推送 handler 注册总装 */
    public initRegisterHandler(): void {
        this.getRecords(),
            this.getCoinByOffice(),
            this.buildCityBuildHandler(),
            this.chatHandler(),
            this.creditSettleHandler(),
            this.clubAlienFight(),
            this.clubAlienChange(),
            this.clubRedBagUpdate(),
            this.bugMSGHandler(),
            this.updateUserHandler(),
            this.pushMsgHandler(),
            this.mailGiftMsg(),
            this.freeBuyMsg(),
            this.getEstateMSG(),
            this.pushTask(),
            this.pushLevelupGift(),
            this.pushEffort(),
            this.pushAuction(),
            this.pushNewTask(),
            this.pushHonour(),
            this.pushFreezeDo(),
            this.pushAsk(),
            this.pushAnswerLog(),
            this.getFefreshGwent(),
            this.getFefreshGodSale(),
            this.getFefreshGroup(),
            this.getFefreshNGTask(),
            this.getCountryStoreroomMSG(),
            this.getUserStoreroomMSG(),
            this.on("event_go_map", this, this._onGoMap);
    }

    public _onGoMap(): void {
        this.mFirstGoToMap || this.checkPKnpcCaptainLocal(true),
            this.mFirstGoToMap = false;
    }

    public queueCallBack(t: any): void {
        QueueManager.instance.showNext(t);
    }

    /** 领地到点收获/驻将完成检测（批量 event_estate_update） */
    public updateMyEstateStatus(): void {
        for (var i = false, s = 0; s < ModelManager.instance.modelUser.estate.length; s++) {
            var n = ModelManager.instance.modelUser.estate[s],
                h = sg.model.ModelEstate.myCountryEstates[n.city_id + "_" + n.estate_index];
            if (h) {
                -1 != h.next_harvest_time && ConfigServer.getServerTimer() > h.next_harvest_time && (h.event("event_estate_update"), h.getNextHarvestTime());
                var o = h.estateHero;
                o && !o.sendEvent && o.getTime() <= ConfigServer.getServerTimer() && (h.event("event_estate_update"), o.sendEvent = true, i = true);
            }
        }
        i && (ModelManager.instance.modelUser.setEstateManagerArr(), ModelManager.instance.modelUser.event("event_user_update", { user: { estate: "" } }));
    }

    public updateMyVisitStatus(): void {
        var t = false;
        for (var i in sg.model.ModelVisit.visitModels) {
            var n = sg.model.ModelVisit.visitModels[i];
            if (!n.sendEvent && n.visitHero)
                ConfigServer.getServerTimer() >= n.visitHero.getTime() && (sg.model.ModelVisit.updateData(i), n.sendEvent = true, t = true);
        }
        t && (ModelManager.instance.modelUser.setEstateManagerArr(), ModelManager.instance.modelUser.event("event_user_update", { user: { visit: "" } }));
    }

    public updateNewVisit(): void {
        for (var t in sg.model.ModelVisit.visitModels) {
            sg.model.ModelVisit.visitModels[t].clear();
        }
        this.getCityVisit();
    }

    public getModelCityBuild(t: any, i: any): any {
        return sg.model.ModelCityBuild.cityBuildModels && sg.model.ModelCityBuild.cityBuildModels[t] && sg.model.ModelCityBuild.cityBuildModels[t][i] ? sg.model.ModelCityBuild.cityBuildModels[t][i] : null;
    }

    public updateMyCityBuildStatus(): void {
        var t = false;
        for (var i in sg.model.ModelCityBuild.cityBuildModels) {
            var n = sg.model.ModelCityBuild.cityBuildModels[i];
            for (var h in n) {
                var o = n[h];
                if (!o.sendEvent && o.cityBuildHero)
                    ConfigServer.getServerTimer() >= o.cityBuildHero.getTime() && (o.sendEvent = 1, o.event(sg.model.ModelCityBuild.EVENT_UPDATE_CITY_BUILD), t = true);
            }
        }
        t && (ModelManager.instance.modelUser.setEstateManagerArr(), ModelManager.instance.modelUser.event("event_user_update", { user: { city_build: "" } }));
    }

    /** 城建任务模型重建（pctask_id 城 + 本国/开关城） */
    public initFtask(): void {
        for (var i in (sg.model.ModelFTask.ftaskModels = {}, ModelManager.instance.modelUser.ftask))
            if (ConfigServer.city[i] && ConfigServer.city[i].pctask_id) {
                var s = ModelManager.instance.modelUser.ftask[i];
                if (-1 == s[0])
                    { }
                else {
                    var n = new sg.model.ModelFTask(i);
                    (ModelOfficial.checkCityIsMyCountry(i) || sg.interior.model.ModelCityControl.isOpen() && s[3]) && (sg.model.ModelFTask.ftaskModels[i] = n);
                }
            }
        this.event("event_init_ftask");
    }

    public addFtask(t: any): void {
        if (!sg.model.ModelFTask.ftaskModels.hasOwnProperty(t) && -1 != ModelManager.instance.modelUser.ftask[t][0]) {
            var s = this.getModelFtask(t);
            sg.model.ModelFTask.ftaskModels[t] = s,
                this.event("event_add_ftask", s);
        }
    }

    public removeFtask(t: any): void {
        if (sg.model.ModelFTask.ftaskModels.hasOwnProperty(t)) {
            var s = sg.model.ModelFTask.ftaskModels[t];
            delete sg.model.ModelFTask.ftaskModels[t],
                s.event("event_remove_ftask", s);
        }
    }

    public checkFtask(): void {
        var t = ModelManager.instance.modelUser.ftask;
        for (var s in sg.model.ModelFTask.ftaskModels)
            t[s] && -1 == t[s][0] && this.removeFtask(s);
    }

    public getModelEstate(t: any, i: any): any {
        var s = t + "_" + i;
        if (!sg.model.ModelEstate.estateModels.hasOwnProperty(s) && null != ConfigServer.city[t].estate[i]) {
            if (sg.model.ModelEstate.estateModels[s] = new sg.model.ModelEstate(t, i), ModelOfficial.checkCityIsMyCountry(t))
                sg.model.ModelEstate.myCountryEstates[s] = sg.model.ModelEstate.estateModels[s];
            else
                for (var h = ModelManager.instance.modelUser.estate, o = 0; o < h.length; o++) {
                    var r = h[o];
                    if (r.city_id == t && r.estate_index == i) {
                        sg.model.ModelEstate.myCountryEstates[s] = sg.model.ModelEstate.estateModels[s];
                        break;
                    }
                }
        }
        return sg.model.ModelEstate.estateModels[s] ? sg.model.ModelEstate.estateModels[s] : null;
    }

    public getModelCityControl(t: any): any {
        if (sg.model.ModelFTask.ftaskModels && sg.model.ModelFTask.ftaskModels[t]) {
            var s = sg.model.ModelFTask.ftaskModels[t];
            if (s)
                return s.cityControl;
        }
        return null;
    }

    public getModelFtask(t: any): any {
        var s = ModelManager.instance.modelUser.ftask;
        return s && s[t] ? (!sg.model.ModelFTask.ftaskModels.hasOwnProperty(t) && (sg.model.ModelFTask.ftaskModels[t] = new sg.model.ModelFTask(t)), sg.model.ModelFTask.ftaskModels[t]) : null;
    }

    public getModelVisit(t: any): any {
        return sg.model.ModelVisit.visitModels[t];
    }

    public getModelHero(t: any): any {
        return t ? (!sg.model.ModelHero.heroModels.hasOwnProperty(t) && (sg.model.ModelHero.heroModels[t] = new sg.model.ModelHero(), sg.model.ModelHero.heroModels[t].initData(t, ConfigServer.hero[t])), sg.model.ModelHero.heroModels[t]) : null;
    }

    public getModelSkill(t: any): any {
        return t ? sg.model.ModelSkill.getModel(t) : null;
    }

    public getModelShop(t: any): any {
        return t ? (!sg.model.ModelShop.shopModels.hasOwnProperty(t) && (sg.model.ModelShop.shopModels[t] = new sg.model.ModelShop(), sg.model.ModelShop.shopModels[t].initData(t)), sg.model.ModelShop.shopModels[t]) : null;
    }

    public getModelEquip(t: any): any {
        return t ? (!sg.model.ModelEquip.equipModels.hasOwnProperty(t) && (sg.model.ModelEquip.equipModels[t] = new sg.model.ModelEquip(), sg.model.ModelEquip.equipModels[t].initData(t, sg.model.ModelEquip.getConfig(t))), sg.model.ModelEquip.equipModels[t]) : null;
    }

    public getModelRune(t: any): any {
        return t ? (!sg.model.ModelRune.runeModels.hasOwnProperty(t) && (sg.model.ModelRune.runeModels[t] = new sg.model.ModelRune(), sg.model.ModelRune.runeModels[t].initData(t, sg.model.ModelRune.getConfig(t))), sg.model.ModelRune.runeModels[t]) : null;
    }

    public getModelScience(t: any): any {
        return t ? (!sg.model.ModelScience.modelSciences.hasOwnProperty(t) && (sg.model.ModelScience.modelSciences[t] = new sg.model.ModelScience(), sg.model.ModelScience.modelSciences[t].initData(t, sg.model.ModelScience.getConfig(t))), sg.model.ModelScience.modelSciences[t]) : null;
    }

    public getModelSkin(t: any): any {
        return t ? (!sg.model.ModelSkin.skinModels.hasOwnProperty(t) && (sg.model.ModelSkin.skinModels[t] = new sg.model.ModelSkin(t), sg.model.ModelSkin.skinModels[t].initData(t, ConfigServer.hero_skin[t])), sg.model.ModelSkin.skinModels[t]) : null;
    }

    public pushMsgHandler(): void {
        NetSocket.instance.registerHandler("push_msg", new Handler(this, function (i: any) {
            if (!sg.guide.model.ModelGuide.forceGuide()) {
                var s = i.receiveData,
                    n = s.msg,
                    h = s.code;
                if (h) {
                    var o = "_push_msg_" + h;
                    n += Tools.getStr(Tools.sMsgDic, o, true);
                }
                ViewManager.instance.showAlert(n, null, null, "", true);
            }
        }));
    }

    public updateUserHandler(): void {
        NetSocket.instance.registerHandler("update_user", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public getRecords(): void {
        NetSocket.instance.registerHandler("push_records", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                sg.activities.model.ModelHappy.instance.event("event_update_sparta");
        }));
    }

    public getCoinByOffice(): void {
        NetSocket.instance.registerHandler("pay_son", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                ViewManager.instance.showIcon({ coin: i.receiveData.add_coin }, Laya.stage.width / 2, Laya.stage.height / 2),
                ViewManager.instance.showTipsTxt(Tools.getMsgById("530077", [i.receiveData.king_name, i.receiveData.add_coin]));
        }));
    }

    public buildCityBuildHandler(): void {
        var i = this;
        NetSocket.instance.registerHandler("build_city_build", new Handler(this, function (e: any) {
            ModelOfficial.updateCityBuild(e.receiveData),
                i.event("build_city_build", { cid: e.receiveData.cid, bid: e.receiveData.bid, name: e.receiveData.uname }),
                e.receiveData.bid && ConfigServer.city_build.great_wall && -1 != ConfigServer.city_build.great_wall.indexOf(e.receiveData.bid) && sg.model.ModelNewMilepost.instance.checkNewMilepost();
        }));
    }

    public bugMSGHandler(): void {
        var i = this;
        NetSocket.instance.registerHandler("bug_msg", new Handler(this, function (e: any) {
            ModelManager.instance.modelChat.isNewBugMSG = true,
                ModelManager.instance.modelUser.event("event_user_update", [{ user: "" }, true]),
                i.event("event_update_bug_msg");
        }));
    }

    /** 聊天双通道：pn "chat"（build_ballista 造弩广播国名着色）+ 跨服 d.chat */
    public chatHandler(): void {
        var i = this;
        NetSocket.instance.registerHandler("chat", new Handler(this, function (e: any) {
            if (e.receiveData instanceof Array) {
                if (ModelManager.instance.modelChat.acceptMSG(e.receiveData), ModelManager.instance.modelOfficel.setCallCD(e.receiveData[5]), e.receiveData[1] == "build_ballista") {
                    var n = StringUtil.htmlFontColor(Tools.getMsgById("country_" + e.receiveData[3][0]), ColorManager.getUIColor("COUNTRY_COLORS")[e.receiveData[3][0]]),
                        h = Tools.getMsgById(ConfigServer.country_pvp.ballista[e.receiveData[3][1]].name);
                    i.event("event_show_ballista_msg", [e.receiveData[3][0], n, h]);
                }
            } else
                e.receiveData.msg && ViewManager.instance.showTipsTxt(e.receiveData.msg);
        })),
            sg.crossService.CrossServiceFacade.instance.socket.registerHandler("d.chat", Handler.create(this, function (i: any) {
                Trace.log("=======收到跨服战聊天消息", i.receiveData),
                    typeof i.receiveData == "object" ? i.receiveData.user ? (sg.crossService.model.CrossServiceUserModel.instance.updateUserData(i.receiveData), ModelManager.instance.modelChat.acceptMSG(i.receiveData.chat)) : ModelManager.instance.modelChat.acceptMSG(i.receiveData) : i.receiveData.msg;
            }, null, false));
    }

    public creditSettleHandler(): void {
        NetSocket.instance.registerHandler("credit_settle", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.credit_settle = i.receiveData;
        }));
    }

    public clubAlienFight(): void {
        var i = this;
        NetSocket.instance.registerHandler(sg.model.ModelClub.SOCEKET_GET_CLUB_ALIEN, new Handler(this, function (e: any) {
            typeof e.receiveData == "boolean" && NetSocket.instance.send(sg.model.ModelClub.SOCEKET_GET_CLUB_ALIEN, {}, Handler.create(i, function (t: any) {
                ModelManager.instance.modelUser.updateData(t.receiveData),
                    ModelManager.instance.modelClub.event(sg.model.ModelClub.EVENT_ALIEN_MSG);
            }));
        }));
    }

    public clubAlienChange(): void {
        NetSocket.instance.registerHandler("club_alien_join_quit", new Handler(this, function (i: any) {
            i.receiveData && (ModelManager.instance.modelClub.updateAlien(i.receiveData), ModelManager.instance.modelClub.event(sg.model.ModelClub.EVENT_ALIEN_MSG), ModelManager.instance.modelUser.event("event_update_btm_btn"));
        }));
    }

    public clubRedBagUpdate(): void {
        var i = this;
        NetSocket.instance.registerHandler("get_club_redbag", new Handler(this, function (e: any) {
            typeof e.receiveData == "boolean" && NetSocket.instance.send("get_club_redbag", {}, new Handler(i, function (t: any) {
                ModelManager.instance.modelUser.updateData(t.receiveData),
                    ModelManager.instance.modelClub.event(sg.model.ModelClub.EVENT_COUNTRY_REDBAG),
                    ModelManager.instance.modelUser.event("event_user_update", [{ country_club: "" }, true]);
            }));
        }));
    }

    public pushTask(): void {
        NetSocket.instance.registerHandler("push_task", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public pushLevelupGift(): void {
        NetSocket.instance.registerHandler("levelup_gift", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public pushEffort(): void {
        NetSocket.instance.registerHandler("push_effort", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public pushAuction(): void {
        NetSocket.instance.registerHandler("push_auction", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public pushNewTask(): void {
        NetSocket.instance.registerHandler("push_new_task", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                ModelManager.instance.modelGame.event("event_new_task_push");
        }));
    }

    public pushHonour(): void {
        NetSocket.instance.registerHandler("push_honour", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData);
        }));
    }

    public pushFreezeDo(): void {
        NetSocket.instance.registerHandler("freeze_do", new Handler(this, function (i: any) {
            Trace.log("freeze_do:", i.receiveData),
                ModelManager.instance.modelChat.freezeDoCallBack(i.receiveData);
        }));
    }

    public pushAsk(): void {
        NetSocket.instance.registerHandler("push_ask", new Handler(this, function (i: any) {
            sg.festival.model.ModelFestival.instance.modelFestivalAsk.checkData(i.receiveData);
        }));
    }

    public pushAnswerLog(): void {
        NetSocket.instance.registerHandler("push_answer_question", new Handler(this, function (i: any) {
            sg.festival.model.ModelFestival.instance.modelFestivalAsk.pushAnswerQuestionCallBack(i.receiveData);
        }));
    }

    public mailGiftMsg(): void {
        NetSocket.instance.registerHandler("gift_msg", new Handler(this, function (i: any) {
            ModelManager.instance.modelChat.isNewMail = true,
                ModelManager.instance.modelUser.event("event_user_update", { user: "" }),
                ModelManager.instance.modelUser.event("event_update_mail_system"),
                "" != ModelChat.mCurUid && ModelManager.instance.modelChat.sendSocketGetMsg();
        }));
    }

    public freeBuyMsg(): void {
        var i = this;
        NetSocket.instance.registerHandler("free_buy", new Handler(this, function (e: any) {
            NetSocket.instance.send("get_free_buy", {}, new Handler(i, function (t: any) {
                ModelManager.instance.modelUser.checkFreeBuy(t.receiveData),
                    ModelManager.instance.modelUser.updateData(t.receiveData),
                    sg.activities.model.ModelFreeBuy.instance.addData();
            }));
        }));
    }

    public getEstateMSG(): void {
        NetSocket.instance.registerHandler("get_estate", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                sg.model.ModelEstate.removeMyEstate(i.receiveData.city_id, -1);
        }));
    }

    public getCountryStoreroomMSG(): void {
        NetSocket.instance.registerHandler("push_country_storeroom", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                sg.puppet.model.ModelCountryStoreroom.instance.event(sg.puppet.model.ModelCountryStoreroom.COUNTYR_STOREROOM_FRESH),
                sg.puppet.PuppetUtils.building_store.refresh();
        }));
    }

    public getUserStoreroomMSG(): void {
        NetSocket.instance.registerHandler("push_user_storeroom", new Handler(this, function (i: any) {
            ModelManager.instance.modelUser.updateData(i.receiveData),
                sg.puppet.model.ModelCountryStoreroom.instance.event(sg.puppet.model.ModelCountryStoreroom.COUNTYR_STOREROOM_FRESH);
        }));
    }

    public getFefreshGwent(): void {
        sg.view.fight.gwent.C_Gwent.instance.registerFefreshGwent();
    }

    public getFefreshGroup(): void {
        sg.view.fight.champion_sg_new.C_Champion.instance.registerFefreshGroup();
    }

    public getFefreshNGTask(): void {
        sg.view.task.ng_task.C_NGTask.instance.registerFefreshNGTask();
    }

    public getFefreshGodSale(): void {
        sg.kunlun.model.ModelKunlunSale.instance.register_FefreshGodSale();
    }

    /** 整点轮询捕将（首拍直接 updateData 触发链，其后 get_hero_catch + once 下一整点） */
    public heroCatchTimer(i?: any): void {
        var h = this;
        void 0 === i && (i = true);
        var o = this,
            r = function () {
                var e = (ConfigServer.getServerTimer(), Tools.getFullHourDis());
                Laya.timer.once(e + 1e3, o, h.heroCatchTimer, [false]);
            };
        i ? (ModelManager.instance.modelUser.updateData({ user: { hero_catch: ModelManager.instance.modelUser.hero_catch } }), r()) : NetSocket.instance.send("get_hero_catch", {}, new Handler(this, function (t: any) {
            ModelManager.instance.modelUser.updateData(t.receiveData),
                r();
        }));
    }

    public heroDrinkTimer(i?: any): void {
        var h = this;
        void 0 === i && (i = true);
        var o = this,
            r = function () {
                var e = h.getDrinkNextRefreshTime();
                -1 != e && Laya.timer.once(e + 1e3, o, h.heroDrinkTimer, [false]);
            };
        i ? (ModelManager.instance.modelUser.updateData({ user: { drink: ModelManager.instance.modelUser.drink } }), r()) : NetSocket.instance.send("get_drink", {}, new Handler(this, function (t: any) {
            ModelManager.instance.modelUser.updateData(t.receiveData),
                r();
        }));
    }

    public getDrinkNextRefreshTime(): any {
        var i = ConfigServer.system_simple.drink;
        if (Tools.isNullObj(i))
            return -1;
        for (var s = i.time, n = -1, h = 0, o = s.length; h < o; h++) {
            var r = s[h],
                a = Tools.getTodayMillWithHourAndMinute(r);
            if (ConfigServer.getServerTimer() <= a) {
                n = a - ConfigServer.getServerTimer();
                break;
            }
        }
        return -1 == n && (n = Tools.getTodayMillWithHourAndMinute(s[0]) + Tools.oneDayMilli - ConfigServer.getServerTimer()), n;
    }

    public getCityVisit(): void {
        var i = this;
        ModelGame.unlock(null, "map_visit").stop ? this.event("eventInitVisit") : NetSocket.instance.send("get_city_visit", {}, new Handler(this, function (e: any) {
            ModelOfficial.visit = e.receiveData,
                i.initVisit();
        }));
    }

    /** 拜访模型重建（Sr.visit 全量 + user.visit 旧档合并） */
    public initVisit(): void {
        var t;
        for (var s in (sg.model.ModelVisit.visitModels = {}, ModelOfficial.visit))
            s != "refresh_time" && ((t = new sg.model.ModelVisit()).initData(s, ModelOfficial.visit[s]), sg.model.ModelVisit.visitModels[s] = t);
        for (var n in ModelManager.instance.modelUser.visit) {
            var h = ModelManager.instance.modelUser.visit[n];
            null != h[0] && (sg.model.ModelVisit.visitModels[n] ? 0 == (t = sg.model.ModelVisit.visitModels[n]).isTodayVisit() && t.initOldData(n, t.visit_hid, h[1]) : ((t = new sg.model.ModelVisit()).initOldData(n, "", h[1]), sg.model.ModelVisit.visitModels[n] = t));
        }
        this.event("eventInitVisit");
    }

    /** 出兵确认入口：寻路结果为空且 fightType=1 提示 _country43；n.one 直发 */
    public checkTroopToAction(t: any, i: any, s: any, n: any): any {
        var o = parseInt(t),
            r = !(!n || !n.one),
            a = n && n.pos ? n.pos : 0,
            l = !(!n || !n.free) && n.free,
            c = n && n.power ? n.power : -1,
            u = n && n.fightType ? n.fightType : 3,
            d = ModelManager.instance.modelTroopManager.getMoveTroop(o, a, null, l);
        return d.length <= 0 && 1 == u ? (ViewManager.instance.showTipsTxt(Tools.getMsgById("_country43")), d) : (ViewManager.instance.showView(Tools.isNullObj(i) ? ConfigClass.VIEW_HERO_SEND : i, [o, d, s, r, a, c, u]), d);
    }

    public checkRealNameTimeTips(t: any): void {
        this.gameTipsTimer = -1,
            this.gameTimer = t,
            this.checkGameTimeTips();
    }

    /** 防沉迷疲劳提醒（tired_point 阶梯；timer 每 gameTipsTimerDes 秒推进） */
    public checkGameTimeTips(): void {
        var i = ModelGame.unlock(null, "tired_real_name");
        if (ModelGame.getTieldOpen() && i.visible) {
            var n = ModelGame.checkTired(this.gameTimer),
                h = 60 * n[n.length - 1];
            if (this.gameTimer >= h && this.gameTimer >= this.gameTipsTimer) {
                var o = this.gameTipsTimer < 0;
                this.gameTimer % h == 0 ? this.gameTipsTimer = (Math.ceil(this.gameTimer / h) + 1) * h : this.gameTipsTimer = Math.ceil(this.gameTimer / h) * h,
                    !o && this.event("event_real_name_check_tired_time", [this.gameTimer, n[n.length - 2]]);
            }
            Laya.timer.clear(this, this.checkGameTimeTipsTimer),
                Laya.timer.once(1e3 * this.gameTipsTimerDes, this, this.checkGameTimeTipsTimer);
        }
    }

    public checkGameTimeTipsTimer(): void {
        this.gameTimer += this.gameTipsTimerDes,
            this.checkGameTimeTips();
    }

    public checkPKnpc(): void {
        var i = this;
        NetSocket.instance.send("get_pk_npc", {}, Handler.create(this, function (e: any) {
            ModelManager.instance.modelUser.updateData(e.receiveData),
                i.checkPKnpcTimer(0),
                i.checkPKnpcCaptain(false);
        }));
    }

    /** 下一个 alien_time 整点定时（跨日回绕 24h+首档） */
    public checkPKnpcTimer(t?: any): void {
        if (void 0 === t && (t = 0), Laya.timer.clear(this, this.checkPKnpc), t > 0)
            Laya.timer.once(t, this, this.checkPKnpc);
        else {
            var n = ConfigServer.pk_npc.alien_time.length,
                h = ConfigServer.getServerTimer(),
                o = new sg.utils.ServerDate(h);
            o.setHours(0, 0, 0, 0);
            for (var r = o.getTime(), a = 0, l = 0; l < n; l++)
                if (h < r + (a = ConfigServer.pk_npc.alien_time[l][0] * Tools.oneHourMilli + ConfigServer.pk_npc.alien_time[l][1] * Tools.oneMinuteMilli)) {
                    0;
                    break;
                }
            var c = r + a - h;
            c <= 0 && (c = r + (a = (24 + ConfigServer.pk_npc.alien_time[0][0]) * Tools.oneHourMilli + ConfigServer.pk_npc.alien_time[0][1] * Tools.oneMinuteMilli) - h),
                c > 0 && Laya.timer.once(c + 1e3, this, this.checkPKnpc);
        }
    }

    /** ModelClimb（Qo）pk_npc 模型族装配（alien_my/captain 双源） */
    public checkPKnpcFightTimerStatus(): void {
        var t, s = ModelClimb.alien_my();
        for (var n in s)
            !ModelClimb.pk_npc_models.hasOwnProperty(n) && (ModelClimb.pk_npc_models[n] = t = new ModelClimb(), t.pk_npc_setData(n), t.pk_npc_init(), 1);
        ModelClimb.captain_my().length > 0 && ModelClimb.captain_curr().length > 0 && ModelClimb.captain_curr_timer() > 0 && !ModelClimb.pk_npc_models.hasOwnProperty("captain") && (ModelClimb.pk_npc_models.captain = t = new ModelClimb(), t.pk_npc_setData("captain"), t.pk_npc_init()),
            ModelManager.instance.modelGame.event("event_pk_npc_check_model", [ModelClimb.pk_npc_models, "captain"]);
    }

    /** 异族首领队长轮询（captain_curr_timer>0 时 min(20s,剩余) 后重拉） */
    public checkPKnpcCaptain(t: any, i?: any): void {
        var n = this;
        if (void 0 === i && (i = false), Laya.timer.clear(this, this.checkPKnpcCaptain), t) {
            var o = this;
            NetSocket.instance.send("get_pk_npc", {}, Handler.create(o, function (t: any) {
                ModelManager.instance.modelUser.updateData(t.receiveData),
                    o.checkPKnpcCaptain(false),
                    n.checkPKnpcCaptainLocal(i);
            }));
        } else {
            var r = ModelClimb.captain_curr_timer();
            if (r > 0) {
                var a = r - ConfigServer.getServerTimer(),
                    l = 2e4;
                a >= 0 && a > l && (l = a),
                    Laya.timer.once(l, this, this.checkPKnpcCaptain, [true]);
            }
        }
    }

    /** 队长首见对白（本地档 captian_+mUID；talks 来自 captain_nameandrew[3]） */
    public checkPKnpcCaptainLocal(t?: any): any {
        void 0 === t && (t = false);
        var s = null,
            n = ModelManager.instance.modelUser.pk_npc,
            h = n && n.captain && n.captain[0] ? n.captain[0] : [];
        if (0 == h.length)
            return null;
        var o = h[5],
            r = ConfigServer.pk_npc.captain_nameandrew[o];
        if (!r[3])
            return null;
        this.mPKnpcCaptainLocalData || (this.mPKnpcCaptainLocalData = SaveLocal.getValue("captian_" + ModelManager.instance.modelUser.mUID, true)),
            this.mPKnpcCaptainLocalData || (this.mPKnpcCaptainLocalData = {});
        var a = false;
        if (!this.mPKnpcCaptainLocalData.hasOwnProperty(o) && (this.mPKnpcCaptainLocalData[o] = 0, a = true), 0 == this.mPKnpcCaptainLocalData[o] && (s = { talks: r[3], hid: o }, t)) {
            if (sg.guide.model.ModelGuide.forceGuide())
                return null;
            sg.boundFor.GotoManager.instance.boundForCaptain(),
                a = true,
                this.mPKnpcCaptainLocalData[o] = 1,
                ViewManager.instance.showView(["ViewHeroTalk2", sg.view.init.ViewHeroTalk2], s);
        }
        return a && SaveLocal.save("captian_" + ModelManager.instance.modelUser.mUID, this.mPKnpcCaptainLocalData, true), s;
    }

    public setCaptianLoacalData(t: any): void {
        this.mPKnpcCaptainLocalData && (!this.mPKnpcCaptainLocalData.hasOwnProperty(t) || 1 != this.mPKnpcCaptainLocalData[t]) && (this.mPKnpcCaptainLocalData[t] = 1, SaveLocal.save("captian_" + ModelManager.instance.modelUser.mUID, this.mPKnpcCaptainLocalData, true));
    }

    public getWorldLv(): void {
        NetSocket.instance.send("get_world_lv", {}, Handler.create(this, function (i: any) {
            ModelManager.instance.modelUser.updateData({ user: { world_lv: i.receiveData } }),
                ModelManager.instance.modelGame.event("event_new_day_com_on");
        }));
    }

    public click_unlock(t: any): void {
        ViewManager.instance.showTipsTxt(t);
    }

    public clickHeroCatch(t: any, i: any): void {
        for (var n = ModelManager.instance.modelUser.hero_catch.hero_list, h = -1, o = 0; o < n.length; o++)
            if (t == n[o][1]) {
                h = o;
                break;
            }
        -1 != h && sg.boundFor.GotoManager.boundForPanel("hero_catch", "", [h, i]);
    }

    public clickHeroDrink(t: any, i: any): void {
        for (var n = ModelManager.instance.modelUser.drink.drink_list, h = -1, o = 0; o < n.length; o++)
            if (t == n[o][1]) {
                h = o;
                break;
            }
        -1 != h && ViewManager.instance.showView(ConfigClass.VIEW_HERO_DRINK, [h, i]);
    }

    public clearHeroIcon(): void {
        AssetsManager.mHeroBigIconAssets.clearAll(),
            AssetsManager.mHeroSmIconAssets.clearAll();
    }

    /** 基建升级奖励链：unlockFunc 门槛特效 + lvup_hero/ITEM_FATE 二选一 VIEW_HERO_CHOOSE */
    public checkBaseBuildUnlockFunc(t: any, i: any): void {
        if (t.isBase()) {
            var n = t.unlockFunc(t.lv),
                h = true;
            n && i < n.length && (h = false, ViewManager.instance.showViewEffect(sg.view.effect.BuildingFuncOpen.getEffect(t, i)));
            var o = ModelManager.instance.modelUser.getUseFunctionByKey("use_newpreward"),
                r = ConfigServer.system_simple["building_lvup_reward" + (o || "")];
            if (r[t.lv]) {
                var a = ConfigServer.system_simple.lvup_hero,
                    l = t.lv === a || r[t.lv].hasOwnProperty(ModelProp.ITEM_FATE);
                if (h && l)
                    return void ViewManager.instance.showView(ConfigClass.VIEW_HERO_CHOOSE);
            }
            h && sg.model.ModelGame.checkBaseBuildUpgradeGuide(t);
        }
    }

    public getShopTimes(t: any, i: any, s: any): any {
        var h = ConfigServer.shop;
        if (h.hasOwnProperty(t)) {
            var o = h[t];
            if (-1 != o.all_limit && o.add_limit && i == o.add_limit[0])
                return o.all_limit + s * o.add_limit[1];
        }
        return o.all_limit;
    }

    public showMailByTitle(t: any): void {
        NetSocket.instance.send("get_msg", {}, Handler.create(this, function (e: any) {
            ModelManager.instance.modelUser.updateData(e.receiveData);
            for (var n: any[] = [], h = e.receiveData.user.msg.sys, o = 0; o < h.length; o++) {
                var r: any = {},
                    a = h[o];
                r.title = a[0],
                    r.info = a[1],
                    r.gift = a[2],
                    r.time = a[3],
                    r.paixu = Tools.getTimeStamp(a[3]),
                    r.index = o,
                    r.isOpen = a[4];
                var l = a[5] + "";
                r.id = -1 != l.indexOf("|") ? l.split("|")[0] : l,
                    n.push(r);
            }
            for (var c = 0; c < n.length; c++)
                if (n[c] && 0 == n[c].isOpen && n[c].title == t) {
                    ViewManager.instance.showView(ConfigClass.VIEW_MAIL_CONTENT, n[c]);
                    break;
                }
        }));
    }

    public updateArmyScienceHammer(): void {
        sg.model.ModelArmyScience.updateHarmmer();
    }

    /** 工作模型分发（estate/visit/city_build 三类 obj） */
    public getModelWork(t: any): any {
        return t.hasOwnProperty("estate_obj") ? ModelManager.instance.modelGame.getModelEstate(t.estate_obj.cid, t.estate_obj.estate_index) : t.hasOwnProperty("visit_obj") ? ModelManager.instance.modelGame.getModelVisit(t.visit_obj.cid) : t.hasOwnProperty("cb_obj") ? ModelManager.instance.modelGame.getModelCityBuild(t.cb_obj.cid, t.cb_obj.bid) : null;
    }

    /**
     * static unlock(t,i,s) —— func_open 九元组功能解锁判定（visible/gray/stop/text 四态）；
     * sUnlockObj 结果缓存；t 传入按钮时直接改 gray/visible 并挂/解 click。
     * `Gt.system_simple;` 为求值丢弃（原文如此）。
     */
    public static unlock(t: any, i: any, s?: any): any {
        void 0 === s && (s = false);
        var n: any = {};
        if (ModelGame.sUnlockObj[i] && ModelGame.sUnlockObj[i].visible && !ModelGame.sUnlockObj[i].gray)
            return n.visible = true, n.gray = false, n.stop = false, n.text = "",
                t && (t.visible = true, t.gray = false, t.off("click", ModelManager.instance.modelGame, ModelManager.instance.modelGame.click_unlock)),
                n;
        ConfigServer.system_simple;
        var h = ConfigServer.system_simple.func_open[i];
        if (null == h)
            return Trace.log("配置不存在(前端控制-func_open)：", i), n.visible = true, n.gray = false, n.stop = false, n.text = "", ModelGame.sUnlockObj[i] = { visible: true, gray: false }, n;
        var o = h[0],
            r = h[1],
            a = h[2],
            l = h[3],
            c = h[4],
            u = h[5],
            d = h[6],
            _ = h[7] ? h[7] : "",
            m = h[8] ? h[8] : null,
            g = Tools.isNullString(c) ? 1 : ModelManager.instance.modelInside.getBuildingLv(c);
        if (m) {
            var f = ModelManager.instance.modelUser.mergeNum,
                v = ModelManager.instance.modelUser.loginDateNum;
            if (f < m[0] || f == m[0] && v < m[1])
                return n.visible = false, n.stop = true, n;
        }
        if (n.visible = 1 == o || !(o < 0) && g >= r, n.gray = 0 == a || g < l, d && -1 != d.indexOf(ModelManager.instance.modelUser.pf))
            return n.visible = 1 != o && -1 == o, n.stop = !(n.visible && !n.gray), n;
        var y = "";
        return n.gray ? y = 0 == a ? Tools.getMsgById(u + "") : Tools.isNullString(c) ? "" : Tools.getMsgById("190008", [ModelManager.instance.modelInside.getBuildingName(c), l]) : !Tools.isNullString(_) && 0 == ModelManager.instance.modelInside.getBuildingLv(_) && (y = Tools.getMsgById("190012", [ModelManager.instance.modelInside.getBuildingName(_)]), n.gray = true),
            n.stop = !(n.visible && !n.gray),
            n.text = y,
            t && (t.gray = n.gray, t.visible = n.visible, t.off("click", ModelManager.instance.modelGame, ModelManager.instance.modelGame.click_unlock), t.gray && y && t.on("click", ModelManager.instance.modelGame, ModelManager.instance.modelGame.click_unlock, [y])),
            s && n.gray && "" != y && ModelManager.instance.modelGame.click_unlock(y),
            ModelGame.sUnlockObj[i] = { visible: n.visible, gray: n.gray },
            n;
    }

    /** 子项红点角标（_red_check_img_ Image，i=true 加/取，false 移除） */
    public static redCheckOnce(t: any, i?: any, s?: any, n?: any): any {
        void 0 === i && (i = false),
            void 0 === n && (n = 1);
        var h;
        return t && t.numChildren > 0 && (h = t.getChildByName("_red_check_img_")),
            i && t ? !h && ((h = new laya.ui.Image(AssetsManager.getAssetsUI("bg_icon_03.png"))).name = "_red_check_img_", t.addChild(h), h.zOrder = t.numChildren, h.x = s && null !== s[0] ? s[0] - .5 * h.width : t.width - h.width, h.y = s && null !== s[1] ? s[1] - .5 * h.height : 0, h.scaleX = h.scaleY = n) : h && h.removeSelf(),
            i;
    }

    /** 防沉迷开关（mUserCode 身份证段年龄>=18） */
    public static getTieldOpen(): boolean {
        var t = false;
        if (Tools.isNullString(ModelManager.instance.modelUser.mUserCode))
            t = true;
        else {
            var i = parseInt(ModelManager.instance.modelUser.mUserCode.substr(6, 4)),
                s = parseInt(ModelManager.instance.modelUser.mUserCode.substr(10, 2)),
                n = parseInt(ModelManager.instance.modelUser.mUserCode.substr(12, 2)),
                h = new sg.utils.ServerDate(ConfigServer.getServerTimer()),
                o = h.getFullYear(),
                r = h.getMonth() + 1,
                a = h.getDate(),
                l = o - i;
            l > 18 || 18 == l && (s > r || s == r && n >= a) || (t = true);
        }
        return t;
    }

    public static getTiredCfg(): any {
        return ModelGame.getTieldOpen() ? ModelGame.checkTired(ModelManager.instance.modelGame.gameTimer) : ConfigServer.system_simple.tired_point[0];
    }

    public static getCurrProfitRate(): any {
        return ModelGame.getTiredCfg()[0];
    }

    public static checkTired(t: any): any {
        for (var s = ConfigServer.system_simple.tired_point, n = s.length, h = 0; h < n - 1 && !(t < 60 * s[h][2]); h++);
        return s[h];
    }

    /** 升级引导分流：ploy.levelup.reward → act_base_up；levelup_gift → 弹窗；否则 executeGuide */
    public static checkBaseBuildUpgradeGuide(t: any): void {
        var s = ConfigServer.ploy.levelup.reward[t.lv],
            n = ConfigServer.ploy.levelup_gift;
        s ? sg.boundFor.GotoManager.boundForPanel("act_base_up", String(t.lv)) : n && n.reward[t.lv] ? sg.view.levelupGift.LevelupGiftModelManager.instance.CreateViewByLv(t.lv) : sg.guide.model.ModelGuide.executeGuide();
    }

    public static stageLockOrUnlock(t: any, i: any, s?: any): void {
        void 0 === s && (s = false),
            i ? sg.model.ModelGame.sLockDic[t] = ModelGame.unlock : sg.model.ModelGame.sLockDic[t] && delete sg.model.ModelGame.sLockDic[t],
            s && (sg.model.ModelGame.sLockDic = {}),
            ModelManager.instance.modelGame.event("event_stage_lock_unlock", sg.model.ModelGame.sLockDic);
    }

    public static mbPay(t: any, i?: any, s?: any): void {
        void 0 === i && (i = ""),
            void 0 === s && (s = false),
            ModelManager.instance.modelMB.isCanMBPay(t) ? ViewManager.instance.showView(ConfigClass.VIEW_MB_PAY, [t, i, s]) : ModelGame.toPay(t, i, s);
    }

    /** 支付单组装（pay_config_pf + wx_pay_test 环境 + logpay 上报；Fo 防沉迷拦截后 Platform.pay） */
    public static toPay(t: any, i?: any, s?: any, n?: any): void {
        if (void 0 === i && (i = ""), void 0 === s && (s = false), n)
            n.run();
        else {
            var o, a = ConfigServer.pay_config_pf[t],
                l = ConfigServer.system_simple.wx_pay_test ? ConfigServer.system_simple.wx_pay_test : 0;
            o = {
                pid: t,
                zone: ModelManager.instance.modelUser.zone,
                uid: ModelManager.instance.modelUser.mUID,
                pf: ConfigApp.pf,
                buyQuantity: 10 * a[0],
                env: l,
                cfg: a,
                gids: s ? t + "_" + i : i,
                url: "",
                channel: ConfigApp.pf_channel,
                mbPay: n
            },
                ConfigApp.logpay && (o.pfcfg = ConfigServer.system_simple.pay[o.pf], (<any>NetHttp.instance).send("user_zone.log_pay", o));
            var c = ConfigApp.payIsSelf();
            sg.model.ModelAntiAddiction.instance.pay(t, new Handler(ModelGame, function () {
                c ? ViewManager.instance.showView(ConfigClass.VIEW_PAY_SELF, o) : Platform.pay(o, false);
            }));
        }
    }

    public static tryToPay(t: any, i?: any, s?: any, n?: any): void {
        void 0 === i && (i = ""),
            void 0 === s && (s = ""),
            void 0 === n && (n = false);
        var o = s ? n ? t + "_" + s : s : t;
        NetSocket.instance.send("try_to_pay", { pid: o, ptype: i }, new Handler(null, function (i: any) {
            i.receiveData ? ModelGame.mbPay(t, s, n) : ViewManager.instance.showTipsTxt("pay error");
        }));
    }

    /** 支付提醒每日一次（key_pay_alert_+mUID + pay_alert_pf 渠道表） */
    public static isOpenPayAlert(): boolean {
        var t = SaveLocal.getValue("key_pay_alert_" + ModelManager.instance.modelUser.mUID, true);
        if (t && t.time)
            return false;
        var s = ConfigServer.system_simple.pay_alert_pf;
        return !(!s || -1 == s.indexOf(ConfigApp.pf));
    }

    public static EVENT_NEW_DAY_COM_ON: string = "event_new_day_com_on";
    public static EVENT_SERVER_SELECT_CHANGE: string = "event_server_select_change";
    public static EVENT_HERO_LV_EXP_CHANGE: string = "event_hero_lv_exp_change";
    public static EVENT_HERO_SKILL_CHANGE: string = "event_hero_skill_change";
    public static EVENT_HERO_TROOP_EDIT_UI_CHANGE: string = "event_hero_troop_edit_ui_change";
    public static EVENT_PK_TIMES_CHANGE: string = "event_pk_times_change";
    public static EVENT_OFFICE_RIGHT_CHANGE: string = "event_office_right_change";
    public static EVENT_CHAMPION_BET_CHANGE: string = "event_champion_bet_change";
    public static EVENT_TASK_RED: string = "event_task_red";
    public static EVENT_TASK_WORK_CHANGE: string = "event_task_work_change";
    public static EVENT_TASK_WORK_GET_OR_DEL: string = "event_task_work_get_or_del";
    public static EVENT_TASK_MAIN_CLOSE_VIEW: string = "event_task_main_close_view";
    public static EVENT_GO_MAP: string = "event_go_map";
    public static EVENT_GO_HOME: string = "event_go_home";
    public static EVENT_REAL_NAME_CHECK_TIRED_TIME: string = "event_real_name_check_tired_time";
    public static EVENT_PK_NPC_CHECK_MODEL: string = "event_pk_npc_check_model";
    public static EVENT_ALIEN_FIGHT_START: string = "event_alien_fight_start";
    public static EVENT_ALIEN_FIGHT_END: string = "event_alien_fight_end";
    public static EVENT_CAPTAIN_FIGHT_START: string = "event_captain_fight_start";
    public static EVENT_CAPTAIN_FIGHT_END: string = "event_captain_fight_end";
    public static EVENT_UPDAET_BUG_MSG: string = "event_update_bug_msg";
    public static EVENT_ADD_ESTATE: string = "event_add_estate";
    public static EVENT_REMOVE_ESTATE: string = "event_remove_estate";
    public static EVENT_FIGHT_LOG_CHANGE: string = "event_fight_log_change";
    public static EVENT_CREDIT_CHANGE: string = "event_CREDIT_change";
    public static EVENT_STAGE_LOCK_UNLOCK: string = "event_stage_lock_unlock";
    public static EVENT_MAYOR_UDPATE: string = "event_mayor_update";
    public static EVENT_PAY_END: string = "event_pay_end";
    public static EVENT_PAY_LIST_UPDATE: string = "event_pay_list_update";
    public static EVENT_INVADE_CHANGE: string = "event_invade_change";
    public static EVENT_SHOW_BALLISTA_MSG: string = "event_show_ballista_msg";
    public static EVENT_CLOSE_EQUIP_MAIN: string = "event_close_equip_main";
    public static EVENT_UPDATE_EQUIP_MAIN: string = "event_update_equip_main";
    public static EVENT_NEW_TASK_PUSH: string = "event_new_task_push";
    public static EVENT_CLICK_ARENA_CLIP: string = "event_click_arena_clip";
    public static EVENT_EQUIP_ENHANCE_ING: string = "event_equip_enhance_ing";
    public static EVENT_SHOW_CHAT: string = "event_show_chat";
    public static EVENT_HIDE_CHAT: string = "event_hide_chat";
    public static EVENT_UPDATE_NEW_RANK_BTN: string = "event_update_new_rank_btn";
    public static EVENT_CLICK_SWITCH_BTN: string = "event_click_switch_btn";
    public static sUnlockObj: any = {};
    public static isShowLoadingAni: boolean = true;
    public static sLockDic: any = {};

    /**
     * 原文 h(r,["map_troop_status_str",function(){…}]) —— Laya.static 惰性静态
     * （静态 getter + defineProperty 换写，ViewScenes 同款）。
     */
    public static get map_troop_status_str(): any[] {
        var v = [Tools.getMsgById("_public161"), Tools.getMsgById("_public162"), Tools.getMsgById("_public163"), Tools.getMsgById("_public164"), Tools.getMsgById("_duplicate043")];
        Object.defineProperty(ModelGame, "map_troop_status_str", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(r,"sg.model.ModelGame",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelGame, "sg.model.ModelGame", null, null);
