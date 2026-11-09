/**
 * sg.manager.ViewManager —— 弹窗链/场景链管理者（show/close/分层）。
 *
 * 原文：code1.js 字节 [1313861,1351456]（off 1315256，包装变量 tn，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewManager.js
 *
 * 依赖说明（台账 §5/§7）：
 *  - 批次内类（ViewScenes/ViewPanel/LoadeManager）走模块 import；
 *  - 引擎类经 laya.* 限定名（原文同形态）；
 *  - 未翻译类经全局 sg.* 注册路径调用期解析（= 原 UMD 闭包变量），映射见
 *    src/sg-externals.d.ts 与 batch-a-report.md 附录。
 */
import Box = laya.ui.Box;
import Component = laya.ui.Component;
import Image = laya.ui.Image;
import Label = laya.ui.Label;
import Sprite = laya.display.Sprite;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import Browser = laya.utils.Browser;
import Ease = laya.utils.Ease;
import Handler = laya.utils.Handler;
import Point = laya.maths.Point;
import ResourceVersion = laya.net.ResourceVersion;
import Tween = laya.utils.Tween;
import { ViewScenes } from "../view/ViewScenes";
import { ViewPanel } from "../view/ViewPanel";
import { LoadeManager } from "./LoadeManager";

/** 原文 testShowPic 内 callFunc=function(){…} 为无 var 隐式全局（UMD 作用域泄漏）；
 * TS 化 containment 到模块级变量，行为差异见 batch-a-report.md「隐式全局」。 */
var callFunc: any;

export class ViewManager extends laya.events.EventDispatcher {

    // ---- 实例字段（原文构造体逐项） ----
    public carouse_count: number = 0;
    public isInPaySelfPanel: boolean = false;
    public isInHeroFeatures: boolean = false;
    public itemDict: any = {};
    public mLayerMap: any = null;
    public mLayerTop: any = null;
    public mLayerSceneParent: any = null;
    public mSceneBlack: any = null;
    public mSceneBg: any = null;
    public mLayerScenes: any = null;
    public mLayerPanel: any = null;
    public mLayerMenuScene: any = null;
    public mLayerMenu: any = null;
    public mLayerGuide: any = null;
    public mLayerLoading: any = null;
    public mLayerScenceEffect: any = null;
    public mLayerViewEffect: any = null;
    public mLayerEffect: any = null;
    public mLayerStageDisabled: any = null;
    public mDisabledSpr: any = null;
    public mDisabledAnimation: any = null;
    public mStageDisabledTween: any = null;
    public mLayerWarn: any = null;
    public mLayerClip: any = null;
    public mLayerFight: any = null;
    public mLayerChat: any = null;
    public mLayerNotice: any = null;
    public mLayerCarouse: any = null;
    public mLayerTxtTips: any = null;
    public mLayerTouchClip: any = null;
    public mScenesArr: any[] = [];
    public mScenesShow: any = null;
    public mPanelArr: any = {};
    public mPanelShow: any = null;
    public mHomeViewMain: any = null;
    public mMapViewMain: any = null;
    public mIsMove: boolean = false;
    public mSceneMain: any = null;
    public completeHandlers: any[] = [];
    public _sceneLocked: boolean = false;
    public _sceneWhiteList: any[] = null;
    public tempTestBox: any = null;
    /** 右侧扩展菜单容器（原文 this.mOtherMenu=new _，_=laya.ui.Box） */
    public mOtherMenu: Box;

    constructor() {
        super();  // 原文 i.__super.call(this)

        this.mOtherMenu = new Box();

        // 防篡改自毁（原文以字符数组拼接属性名）：
        //   [t[0],t[1],t[3],t[7],t[1],t[7],t[4],t[5],t[9],t[10]].join("")  = "onMiniGame"
        //   [t[0],t[1],t[2],t[2],t[3],t[7],t[1],t[7],t[4],t[5],t[9],t[10]].join("") = "onTTMiniGame"
        //   [t[2],t[0],t[0],t[8],t[6]].join("")                            = "Tools"
        // 非（微信/字节）小游戏宿主时，随机重排 sg.utils.Tools 的全部方法（原文行为保留；
        // Browser.onTTMiniGame 存在于 1.8.15beta 运行时、缺于 IDE 1.8.17 d.ts，经 any 访问）。
        const t = "onTMGasilme";
        if (!((<any>Browser)[[t[0], t[1], t[3], t[7], t[1], t[7], t[4], t[5], t[9], t[10]].join("")]
            || (<any>Browser)[[t[0], t[1], t[2], t[2], t[3], t[7], t[1], t[7], t[4], t[5], t[9], t[10]].join("")])) {
            var e = (<any>sg.utils)[[t[2], t[0], t[0], t[8], t[6]].join("")],
                s = sg.utils.ObjectUtil.keys(e).filter(function (k) { return "function" == typeof e[k]; }),
                n = s.length;
            s.forEach(function (k) { e[k] = e[s[Math.floor(Math.random() * n)]]; });
        }
    }

    public setItemPosDict(t: any, i: any): void {
        this.itemDict[t] = i;
    }

    /** 取道具锚点全局坐标（道具中心） */
    public getItemPos(t: any): any {
        var i = this.itemDict[t];
        return i ? i.localToGlobal(Point.TEMP.setTo(.5 * i.width, .5 * i.height)) : null;
    }

    /** 初始化全部层级：地图→场景(PC 套黑底)→菜单→战斗/聊天→特效→弹窗→公告/轮播→
     *  视图特效→特效→剪辑层→顶/引导/装载/文本提示/触摸剪辑→禁用层→警告层；再挂事件。 */
    public init(): void {
        var self = this;
        sg.utils.MusicManager.init();
        this.mLayerMap = new Component(), this.mLayerMap.visible = false, Laya.stage.addChild(this.mLayerMap);
        this.mLayerScenes = new Component(), sg.cfg.ConfigApp.isHorizontal && (this.mLayerScenes.centerX = 0);
        if (sg.cfg.ConfigApp.isPC) {
            this.mLayerSceneParent = new Component();
            this.mLayerSceneParent.top = this.mLayerSceneParent.bottom = this.mLayerSceneParent.left = this.mLayerSceneParent.right = 0;
            this.mSceneBlack = new Image();
            this.mSceneBlack.skin = "comp/blank_bg.png";
            this.mSceneBlack.alpha = 1;
            this.mSceneBlack.visible = true;
            this.mSceneBlack.on("click", this, function () {
                ViewManager.isLoadView || self.mLayerScenes.visible && self.mScenesShow && !self.mScenesShow.destroyed && self.mScenesShow.click_closeScenes();
            });
            this.mSceneBlack.top = this.mSceneBlack.bottom = this.mSceneBlack.left = this.mSceneBlack.right = 0;
            this.mLayerSceneParent.addChild(this.mSceneBlack);
            this.mLayerSceneParent.addChild(this.mLayerScenes);
            Laya.stage.addChild(this.mLayerSceneParent);
        } else Laya.stage.addChild(this.mLayerScenes);
        this.mLayerMenu = "sg4" === sg.cfg.HelpConfig.type_ui ? new sg.view.menu.ViewMenuMain_sg4() : new sg.view.menu.ViewMenuMain();
        Laya.stage.addChild(this.mLayerMenu);
        this.mOtherMenu.mouseThrough = true;
        this.mOtherMenu.centerX = 0;
        this.mOtherMenu.size(this.mLayerMenu.width, this.mLayerMenu.height);
        Laya.stage.addChild(this.mOtherMenu);
        this.mLayerMenuScene = new sg.puppet.view.ViewMenuScene();
        Laya.stage.addChild(this.mLayerMenuScene);
        this.mLayerFight = new Sprite();
        Laya.stage.addChild(this.mLayerFight);
        this.mLayerChat = new Sprite();
        Laya.stage.addChild(this.mLayerChat);
        this.mLayerScenceEffect = new Component();
        this.mLayerScenceEffect.mouseEnabled = false;
        this.mLayerScenceEffect.top = this.mLayerScenceEffect.bottom = this.mLayerScenceEffect.left = this.mLayerScenceEffect.right = 0;
        Laya.stage.addChild(this.mLayerScenceEffect);
        this.mLayerPanel = new Component();
        Laya.stage.addChild(this.mLayerPanel);
        this.mLayerNotice = new sg.view.more.ViewNotice();
        Laya.stage.addChild(this.mLayerNotice);
        this.mLayerCarouse = new sg.view.more.ViewCarouse();
        Laya.stage.addChild(this.mLayerCarouse);
        this.mLayerViewEffect = new Component();
        this.mLayerViewEffect.mouseThrough = true;
        Laya.stage.addChild(this.mLayerViewEffect);
        this.mLayerEffect = new Component();
        this.mLayerEffect.mouseEnabled = false;
        this.mLayerEffect.top = this.mLayerEffect.bottom = this.mLayerEffect.left = this.mLayerEffect.right = 0;
        Laya.stage.addChild(this.mLayerEffect);
        this.mLayerClip = new Sprite();
        this.mLayerClip.mouseThrough = true;
        this.mLayerClip.mouseEnabled = false;
        this.mLayerClip.cacheAs = "normal";
        Laya.stage.addChild(this.mLayerClip);
        this.mLayerTop = new Component();
        Laya.stage.addChild(this.mLayerTop);
        this.mLayerGuide = new Component();
        this.mLayerGuide.mouseThrough = true;
        Laya.stage.addChild(this.mLayerGuide);
        this.mLayerLoading = new Component();
        Laya.stage.addChild(this.mLayerLoading);
        this.mLayerTxtTips = new Component();
        this.mLayerTxtTips.mouseEnabled = false;
        this.mLayerTxtTips.mouseThrough = true;
        Laya.stage.addChild(this.mLayerTxtTips);
        this.mLayerTouchClip = new Component();
        this.mLayerTouchClip.mouseEnabled = false;
        this.mLayerTouchClip.mouseThrough = true;
        Laya.stage.addChild(this.mLayerTouchClip);
        this.mLayerStageDisabled = new Component();
        this.mLayerStageDisabled.top = this.mLayerStageDisabled.bottom = this.mLayerStageDisabled.left = this.mLayerStageDisabled.right = 0;
        this.mLayerStageDisabled.mouseEnabled = true;
        this.mLayerStageDisabled.mouseThrough = false;
        this.mLayerStageDisabled.visible = false;
        Laya.stage.addChild(this.mLayerStageDisabled);
        this.mLayerWarn = new Sprite();
        Laya.stage.addChild(this.mLayerWarn);
        sg.cfg.ConfigApp.isHorizontal && (
            this.mLayerPanel.centerX = 0,
            this.mLayerMenu.centerX = 0,
            this.mLayerLoading.centerX = 0,
            this.mLayerCarouse.centerX = 0,
            this.mLayerClip.width = Laya.stage.width,
            this.mLayerClip.height = Laya.stage.height);
        this.off("event_show_carouse", this, this.showCarouse);
        this.on("event_show_carouse", this, this.showCarouse);
        sg.net.NetSocket.instance.off("event_socket_send_to", this, this.event_socket_send_and_receive);
        sg.net.NetSocket.instance.on("event_socket_send_to", this, this.event_socket_send_and_receive);
        sg.net.NetSocket.instance.off("event_socket_receive_from", this, this.event_socket_send_and_receive);
        sg.net.NetSocket.instance.on("event_socket_receive_from", this, this.event_socket_send_and_receive);
        sg.net.NetSocket.instance.off("event_socket_close", this, this.event_socket_close_and_error);
        sg.net.NetSocket.instance.on("event_socket_close", this, this.event_socket_close_and_error);
        sg.net.NetSocket.instance.off("event_socket_error", this, this.event_socket_close_and_error);
        sg.net.NetSocket.instance.on("event_socket_error", this, this.event_socket_close_and_error);
        sg.net.NetSocket.instance.off("event_socket_opened", this, this.event_socket_opened);
        sg.net.NetSocket.instance.on("event_socket_opened", this, this.event_socket_opened);
        sg.net.NetSocket.instance.registerHandler("get_coin", new Handler(this, this.getCoin));
        sg.net.NetSocket.instance.registerHandler("push_buy_ucoin", new Handler(this, this.pushBuyUCoin));
        Laya.stage.off("mousedown", this, this.click_stage_down);
        Laya.stage.on("mousedown", this, this.click_stage_down);
        sg.net.NetSocket.instance.off("event_socket_re_code_error", this, this.event_socket_re_code_error);
        sg.net.NetSocket.instance.on("event_socket_re_code_error", this, this.event_socket_re_code_error);
        sg.crossService.CrossServiceFacade.instance.socket.off("event_socket_re_code_error", this, this.event_socket_re_code_error);
        sg.crossService.CrossServiceFacade.instance.socket.on("event_socket_re_code_error", this, this.event_socket_re_code_error);
        sg.cfg.ConfigApp.testFightType || sg.manager.ModelManager.instance.modelGame.on("event_stage_lock_unlock", this, this.checkStageDis);
        Laya.stage.off("visibilitychange", this, this.visibility_change);
        Laya.stage.on("visibilitychange", this, this.visibility_change);
    }

    public getLayerPanel(): any {
        return this.mLayerPanel;
    }

    public visibility_change(): void {
        Laya.Trace.log("---切换到前后台---");
    }

    /** URL 参数测试开关（test/testShow/testSeason/testAni/testMsg/mapEdit/tipsMsg） */
    public initOnPC(): void {
        var t: any;
        Browser.window && Browser.window.location && Browser.window.location.search && (
            (t = sg.utils.Tools.getURLexp("test")) && (sg.cfg.ConfigApp.isTest = parseInt(t)),
            (t = sg.utils.Tools.getURLexp("testShow")) && (sg.map.utils.TestUtils.isTestShow = parseInt(t)),
            (t || sg.utils.Tools.getURLexp("tipsMsg")) && Laya.timer.loop(500, null, sg.scene.view.TestButton.resetHelpData),
            (t = sg.utils.Tools.getURLexp("testSeason")) && (sg.map.utils.TestUtils.testSeason = parseInt(t)),
            (t = sg.utils.Tools.getURLexp("testAni")) && (sg.map.utils.TestUtils.testAni = parseInt(t)),
            (t = sg.utils.Tools.getURLexp("testMsg")) && (sg.map.utils.TestUtils.isTestMsg = parseInt(t)),
            (t = sg.utils.Tools.getURLexp("mapEdit")) && (sg.map.utils.TestUtils.mapEdit = parseInt(t), sg.map.utils.TestUtils.mapEdit && (sg.map.utils.TestUtils.isTestShow = 1)));
    }

    public event_socket_opened(): void {
        sg.model.ModelGame.stageLockOrUnlock("", false, true);
    }

    /** ucoin 充值到账：按订单号取档位、提示、刷新余额与渠道上报 */
    public pushBuyUCoin(t: any): void {
        var i = t.receiveData, e = "";
        if (i && i.ext_data && i.ext_data.order_id && (e = i.ext_data.order_id), "" != e) {
            var s = e.split("|")[0],
                n = sg.cfg.ConfigServer.system_simple.token_recharge;
            if (!sg.utils.Tools.isNullObj(n)) {
                var h = n[sg.cfg.ConfigApp.pf];
                if (!sg.utils.Tools.isNullObj(h)) {
                    var o = h[s];
                    if (!sg.utils.Tools.isNullObj(o)) {
                        var r = Number(o[0]), a = Number(o[2]);
                        this.showTipsPanel(sg.utils.Tools.getMsgById("_public281", [r + a])),
                            sg.net.NetHttp.instance.send("user_zone.get_user_zone", { uid: sg.manager.ModelManager.instance.modelUser.mUID_base }, new Handler(Laya.Platform, function (t: any) {
                                0 == Number(t.server_status) && (sg.manager.ModelManager.instance.modelUser.ucoin = Number(t.ucoin));
                            })),
                            sg.cfg.ConfigApp.releaseWeiXin() && sg.cfg.ConfigApp.pf == (<any>laya.wx.mini.MiniAdpter).window.game37_pf && -1 === sg.cfg.ConfigApp.pf.indexOf("cb_wx_37_cn") && (<any>laya.wx.mini.MiniAdpter).window.game37Sdk.sdkReport("pay", { orderNo: e, sid: Laya.Platform.getServerIdFromOrderId(e) });
                    }
                }
            }
        }
    }

    public getCoin(t: any): void {
        var i = t.receiveData;
        sg.manager.ModelManager.instance.modelUser.updateData(i);
        var e = i.gift_dict, s = e.coin / 10;
        Laya.Platform.uploadUserData(5, [s]),
            this.showRewardPanel(e, function () {
                sg.activities.model.ModelPhone.instance.isOpenView() ? sg.boundFor.GotoManager.boundForPanel("view_phone") : sg.view.bigShot.ModelBigShot.instance.CreateBigShot();
            }),
            sg.net.NetSocket.instance.send("get_club_redbag", {}, Handler.create(this, function (t: any) {
                sg.manager.ModelManager.instance.modelUser.updateData(t.receiveData),
                    sg.manager.ModelManager.instance.modelClub.event(sg.model.ModelClub.EVENT_COUNTRY_REDBAG),
                    sg.manager.ModelManager.instance.modelUser.event("event_user_update", [{ country_club: "" }, true]);
            })),
            this.showTipsTxt(sg.utils.Tools.getMsgById("_public115")),
            sg.manager.ModelManager.instance.modelUser.event("event_pay_success"),
            Laya.Platform.payClose(i),
            sg.utils.ThirdRecording.setPay(Laya.Platform.recodrd_pay_info);
    }

    /** 网络收发期间的舞台锁（白名单方法不解锁） */
    public event_socket_send_and_receive(t: any, i: any, e?: any): void {
        -1 === ["update_user", "w.get_city_info", "w.troop_move", "get_club_alien", "get_fight_log"].indexOf(t) && sg.model.ModelGame.stageLockOrUnlock(t, i);
    }

    /** 断线/错误：推荐服维护提示（2000 = 维护码），可带强制重启回调 */
    public event_socket_close_and_error(t: any, i?: any, e?: any): void {
        void 0 === e && (e = true);
        if (sg.model.ModelGame.stageLockOrUnlock("", false, true), t) {
            var s = sg.utils.Tools.getMsgById("_lht34");
            if (i && i.msg)
                if (i.code && 2e3 == i.code) {
                    sg.cfg.ConfigServer.zone[sg.model.ModelPlayer.recommendServer];   // 原文如此（无副作用表达式）
                    var n = sg.utils.Tools.getTimeStamp(sg.utils.Tools.getServerOpenTimeCfg());
                    s = sg.utils.Tools.getMsgById(i.msg, [sg.cfg.ConfigServer.getServerName(sg.model.ModelPlayer.recommendServer), sg.utils.Tools.getTimeDate(n).$datetime]);
                } else s = i.msg;
            this.showWarnAlert(s, e ? Handler.create(this, this.forceRestartGame) : null);
        }
    }

    public forceRestartGame(t: any): void {
        0 == t && Laya.Platform.restart();
    }

    /** 屏幕锁状态刷新（lclip1 开关控制） */
    public checkStageDis(t: any): void {
        if (!sg.cfg.ConfigApp.lclip1 || "yes" != sg.cfg.ConfigApp.lclip1) {
            var i = sg.utils.Tools.getDictLength(t) > 0;
            if (Laya.Trace.log("---现在还有谁在锁住屏幕--", i, t),
                this.mLayerStageDisabled.visible = i, i) {
                if (!sg.model.ModelGame.isShowLoadingAni) return void this.clearDisableSpr();
                this.showDisableSpr();
            } else this.clearDisableSpr();
        }
    }

    public testShowDisableSpr(): void {
        this.mLayerStageDisabled.visible = true;
        this.showDisableSpr();
    }

    public showDisableSpr(): void {
        if (!this.mDisabledSpr) {
            var t = ViewManager.createDisableSpr(this.mLayerStageDisabled);
            this.mDisabledSpr = t[0], this.mDisabledAnimation = t[1];
        }
        Tween.clearTween(this.mDisabledSpr),
            this.mDisabledAnimation.play();
        var e = sg.map.utils.TestUtils.isTestShow ? .8 : 1;
        Tween.to(this.mDisabledSpr, { alpha: e }, 100, null, null, sg.cfg.ConfigServer.system_simple.wait_time);
    }

    public clearDisableSpr(): void {
        this.mDisabledSpr && (Tween.clearTween(this.mDisabledSpr), this.mDisabledAnimation.stop(), this.mDisabledSpr.alpha = 0);
    }

    /** 主场景切换（同型不重建，仅补完成回调） */
    public switchMap(t: any, i?: any): void {
        this.mSceneMain && this.mSceneMain.type === t
            ? i && (this.mSceneMain.created ? i.run() : this.completeHandlers.push(i))
            : (this.mSceneMain && (
                sg.scene.view.InputManager.instance.enaled = false,   // 原文拼写 enaled
                this.completeHandlers.splice(0, this.completeHandlers.length),
                this.mSceneMain.off("complete", this, this._onComplete),
                this.mSceneMain.destroy()),
                this.resetMap(t, i));
    }

    public resetMap(t: any, i?: any): void {
        this.mSceneMain = this.getSceneMain(t),
            null === this.getCurrentScene() && this.event("event_switch_map_start", t),
            i && this.completeHandlers.push(i),
            this.mSceneMain.once("complete", this, this._onComplete);
    }

    public _onComplete(): void {
        this.mLayerMap.destroyChildren(),
            this.mLayerMap.addChild(this.mSceneMain),
            sg.scene.view.InputManager.instance.enaled = true;
        var t = this.mSceneMain.type, i = sg.manager.ModelManager.instance.modelGame;
        i.inMap = 1 === t, i.inHome = -1 !== [0, 4].indexOf(t),
            this.event("event_switch_map_complete", t),
            i.event("event_hide_chat"),
            i.inMap && i.event("event_go_map"),
            i.inHome && i.event("event_go_home"),
            this.completeHandlers.forEach(function (t) { t.run(); }),
            this.completeHandlers.splice(0, this.completeHandlers.length);
    }

    /** 场景工厂：3=跨服图 0=主城 1=大地图 4=内城 6=傀儡 7=酒馆 */
    public getSceneMain(t: any): any {
        switch (t) {
            case 3: return new sg.crossService.view.CrossServiceMap();
            case 0: return new sg.home.view.HomeViewMain();
            case 1: return new sg.map.view.MapViewMain();
            case 4: return sg.homeland.view.HomeLandViewMain.instance = new sg.homeland.view.HomeLandViewMain(), sg.homeland.view.HomeLandViewMain.instance;
            case 6: return new sg.puppet.view.PuppetMap();
            case 7: return new sg.view.wineshop.view.WineshopMap();
        }
        return null;
    }

    public initGame(): void {
        this.closeView(true),
            sg.map.view.AroundManager.initVexData(),
            this.switchMap(1),
            sg.guide.view.ViewGuide.instance || this.mLayerGuide.addChild(new sg.guide.view.ViewGuide()),
            this.initCheckTired(),
            this.mLayerMenu && (this.mLayerMenu.init(), this.mLayerMenu.view_top.setItemPosDict()),
            this.mLayerMenuScene && this.mLayerMenuScene.init();
    }

    public initCheckTired(): void {
        sg.manager.ModelManager.instance.modelGame.off("event_real_name_check_tired_time", this, this.event_real_name_check_tired_time),
            sg.manager.ModelManager.instance.modelGame.on("event_real_name_check_tired_time", this, this.event_real_name_check_tired_time);
    }

    public event_real_name_check_tired_time(t: any, i: any): void {
        this.showTipsTxt(sg.utils.Tools.getMsgById(i), 5);
    }

    /** 舞台按下：播放点击特效与音效，清触摸剪辑层 */
    public click_stage_down(t: any): void {
        this.mIsMove = false,
            this.mLayerTouchClip.numChildren > 0 && this.mLayerTouchClip.destroyChildren();
        var i = sg.manager.EffectManager.loadAnimation("touch_sc", "", 1);
        i.mouseEnabled = false, i.mouseThrough = true,
            i.x = Laya.stage.mouseX, i.y = Laya.stage.mouseY,
            sg.utils.MusicManager.playSoundUI("click"),
            this.mLayerTouchClip.addChild(i);
    }

    /** 场景切换白名单锁 */
    public setSceneLocked(t: boolean, i?: any[]): void {
        this._sceneLocked = t,
            this._sceneLocked ? this._sceneWhiteList = i || [] : this._sceneWhiteList = null;
    }

    /**
     * 弹窗链入口：h 可为类或 [name, class] 对；经 ObjectSingle 取单例，
     * ViewScenes 走场景链、其余走弹窗链；n.handler 延 500ms 触发。
     */
    public showView(t: any, i?: any, e?: any, n?: any): any {
        var h = t instanceof Array ? t[1] : t;
        if (!this._sceneLocked || -1 !== this._sceneWhiteList.indexOf(h)) {
            0 === e && (e = { type: 0 });
            var o = e || { type: 1, child: null }, r = 1, a = null;
            o.hasOwnProperty("type") && (r = o.type),
                o.hasOwnProperty("child") && (a = o.child);
            var l = sg.utils.ObjectSingle.getInstance(h);
            return l.currArg = i,
                l instanceof ViewScenes
                    ? this.showScenes(l, r, !sg.utils.Tools.isNullObj(a) && a)
                    : this.showPanel(l, r, a, n),
                n && n.handler && Laya.timer.once(500, n.handler, (<any>n.handler).run),
                l;
        }
        console.log("切换界面失败:", h.name);
    }

    /** 关闭弹窗与场景（原文顺序：先面板后场景） */
    public closeView(t?: any): void {
        this.mLayerPanel.numChildren > 0 && this.closePanel(),
            this.mScenesArr.length > 0 && this.closeScenes(t);
    }

    /** 信用结算提示 */
    public showCreditResult(): boolean {
        return !(!sg.manager.ModelManager.instance.modelUser.credit_settle || 0 == sg.manager.ModelManager.instance.modelUser.credit_settle.length)
            && (!sg.guide.model.ModelGuide.forceGuide()
                && (ViewManager.instance.showView(["ViewCreditResult", sg.view.map.ViewCreditResult]), true));
    }

    /**
     * 场景链：入栈新场景（checkArr 去重前置），e 控制是否先收存/关闭当前弹窗；
     * 显示后按场景栈恢复弹窗（仅非 e 分支）。
     */
    public showScenes(t: any, i?: number, e?: boolean): void {
        void 0 === i && (i = 1);
        void 0 === e && (e = false);
        sg.crossService.view.CrossServiceMap.instance && (sg.crossService.view.CrossServiceMap.instance.ui.visible = false),
            t && (
                e && (this.mScenesShow
                    ? (this.savePanelsByScenceArr(this.mScenesShow.id), this.mLayerScenes.removeChild(this.mScenesShow))
                    : this.closePanel()),
                this.mScenesShow = this.checkArr(this.mScenesArr, t),
                this.mScenesShow.checkBg(i)),
            this.mScenesShow.init(),
            this.mLayerScenes.addChild(this.mScenesShow),
            this.event("event_open_scene", this.mScenesShow.id),
            this.mLayerMap.visible = false,
            this.mOtherMenu.visible = false,
            t || this.openPanelsByScenceArr(this.mScenesShow.id),
            this.mLayerSceneParent && (this.mLayerMap.visible = true, this.mLayerSceneParent.visible = this.mScenesArr.length > 0);
    }

    /** 栈内已有则交换到栈顶，否则 unshift 入栈；返回栈顶 */
    public checkArr(t: any[], i: any): any {
        for (var e = false, s = -1, n = 0; n < t.length; n++)
            if (t[n] == i) { e = true; s = n; break; }
        if (e) {
            var h = t[s];
            t[s] = t[0], t[0] = h;
        } else t.unshift(i);
        return t[0];
    }

    public closeScenes(t?: any): void {
        void 0 === t && (t = false);
        this.setMenuTopVisible(true),
            this.closeScenesFunc(t),
            this.mLayerSceneParent && (this.mLayerSceneParent.visible = this.mScenesArr.length > 0);
    }

    /** 场景出栈：t 全清；逐层回退；清空后恢复主图/菜单并广播事件 */
    public closeScenesFunc(t?: any): void {
        void 0 === t && (t = false);
        t ? this.mScenesArr = []
            : this.mScenesArr.length > 0 && this.mLayerScenes.removeChild(this.mScenesArr.shift()),
            this.mScenesArr.length <= 0 && (sg.manager.AssetsManager.clearTempAll(), sg.crossService.view.CrossServiceMap.instance && (sg.crossService.view.CrossServiceMap.instance.ui.visible = true)),
            this.mScenesArr.length > 0
                ? (this.mScenesShow = this.mScenesArr[0], this.showScenes(null, this.mScenesShow.mBgType))
                : (this.mLayerScenes.removeChildren(), this.mScenesShow = null, this.mLayerMap.visible = true, this.mOtherMenu.visible = true, this.event("event_close_all_scene")),
            sg.manager.QueueManager.instance.mIsOver || (this.event("event_panel_clear"), sg.manager.QueueManager.instance.event("event_close_panel", "")),
            this.checkNoScence(),
            this.isNoScenceOrPanel();
    }

    /** 免费购弹窗入口 */
    public showFreeBuy(): boolean {
        return !sg.model.ModelGame.unlock(null, "pay").stop
            && ("" != sg.manager.ModelManager.instance.modelUser.free_buy_key
                && !sg.guide.model.ModelGuide.forceGuide()
                && (sg.activities.model.ModelFreeBuy.instance.checkData(),
                    0 == this.mScenesArr.length && sg.activities.model.ModelFreeBuy.instance.mData.length > 0
                        && (ViewManager.instance.showView(sg.activities.model.ModelFreeBuy.instance.viewID, null, null, { delayEvent: true }), true)));
    }

    /** 确认弹窗（ViewAlert），fun 收选择（0=确认） */
    public showAlert(t: any, i?: any, e?: any, s?: any, n?: boolean, h?: boolean, o?: string): void {
        void 0 === s && (s = "");
        void 0 === n && (n = false);
        void 0 === h && (h = false);
        void 0 === o && (o = "");
        var r = sg.manager.ModelManager.instance.modelAlert;
        r.only = n, r.force_btn = h, r.text = t, r.fun = i, r.cost_arr = e, r.text2 = s, r.isWarn = false, r.repeat_key = o,
            sg.utils.Tools.checkAlertIsDel(o) ? r.execute(0) : this.showView(["ViewAlert", sg.view.init.ViewAlert]);
    }

    public showWarnAlert(t: any, i?: any): void {
        this.showWarn(t, i, null, "", true, true);
    }

    /** 警告横幅（仅/强按钮变体 ViewAlert2），同文案去重 */
    public showWarn(t: any, i?: any, e?: any, s?: any, n?: boolean, h?: boolean): void {
        void 0 === s && (s = "");
        void 0 === n && (n = false);
        void 0 === h && (h = false);
        if (!(this.mLayerWarn && this.mLayerWarn.visible && this.mLayerWarn.showTxt && this.mLayerWarn.showTxt == t)) {
            var o = sg.manager.ModelManager.instance.modelAlert;
            o.only = n, o.force_btn = h, o.text = t, o.fun = i, o.cost_arr = e, o.text2 = s, o.isWarn = true;
            var r: any = null;
            (r = n && h ? new sg.view.init.ViewAlert2() : new sg.view.init.ViewAlert()).id = "ViewAlert",
                r.checkBg(1), r.init(),
                this.mLayerWarn.visible = true,
                this.mLayerWarn.showTxt = t,
                this.mLayerWarn.destroyChildren(),
                this.mLayerWarn.addChild(r);
        }
    }

    public clearWarn(): void {
        this.mLayerWarn.destroyChildren(),
            this.mLayerWarn.visible = false;
    }

    /** 次数购买确认：t 类型 0..8 决定 sendMethod 与文案 */
    public showBuyTimes(t: any, i: any, e: any, s: any): void {
        var n = "", h = sg.utils.Tools.getMsgById("_buy_times_0", [i]),
            o = sg.utils.Tools.getMsgById("_public148", [e, sg.utils.Tools.getTimeStyle(sg.cfg.ConfigServer.system_simple.deviation * sg.utils.Tools.oneMinuteMilli, 3)]),
            r = true;
        switch (t) {
            case 0: n = "buy_climb_times"; break;
            case 1: n = "buy_pk_times"; break;
            case 2: n = "buy_pve_times"; break;
            case 3: n = "buy_hero_catch_pk_times", h = sg.utils.Tools.getMsgById("_buy_times_1", [i]); break;
            case 4: n = "buy_limit_free_times", h = sg.utils.Tools.getMsgById("_buy_times_2", [i]), o = sg.utils.Tools.getMsgById("_jia0068", [e]); break;
            case 5: n = "buy_arena_times", o = ""; break;
            case 6: n = "buy_beast_times", h = sg.utils.Tools.getMsgById("_buy_times_3", [i]), o = ""; break;
            case 7: n = "buy_tomb_mattock", h = sg.utils.Tools.getMsgById("_buy_times_4", [i]), o = sg.utils.Tools.getMsgById("_public271", [e, sg.utils.Tools.getTimeStyle(sg.cfg.ConfigServer.system_simple.deviation * sg.utils.Tools.oneMinuteMilli, 3)]), r = false; break;
            case 8: n = "drink_buy_pk_times", h = sg.utils.Tools.getMsgById("_buy_times_1", [i]);
        }
        var a = this;
        this.showAlert(h, Handler.create(this, function (t: any) {
            if (0 == t) {
                if (!sg.utils.Tools.isCanBuy("coin", s)) return;
                sg.net.NetSocket.instance.send(n, {}, Handler.create(a, a.buyTimesRe), { auto: r });
            }
        }), ["coin", s], o);
    }

    public buyTimesRe(t: any): void {
        "buy_pve_times" == t.sendMethod && Laya.Platform.uploadActionData(202, null),
            t.otherData.auto
                ? (sg.manager.ModelManager.instance.modelUser.updateData(t.receiveData),
                    sg.manager.ModelManager.instance.modelGame.event("event_pk_times_change"),
                    ViewManager.instance.showTipsTxt(sg.utils.Tools.getMsgById("_public194")))
                : (ViewManager.instance.showTipsTxt(sg.utils.Tools.getMsgById("_tomb_tips05")),
                    sg.manager.ModelManager.instance.modelGame.event("event_pk_times_change", t.receiveData));
    }

    /**
     * 弹窗链：t 为空时用 e（必须是 ViewPanel 实例）——用于场景栈恢复的复用路径；
     * delayEvent 延迟背景点击。
     */
    public showPanel(t: any, i?: number, e?: any, s?: any): void {
        void 0 === i && (i = 1);
        null == s && (s = { delayEvent: false });
        if (t)
            this.mPanelShow = t, this.mPanelShow.checkBg(i);
        else {
            if (!(e instanceof ViewPanel)) return;
            this.mPanelShow = e;
        }
        this.mPanelShow.init(),
            this.mLayerPanel.addChild(this.mPanelShow),
            this.event("event_open_panel", this.mPanelShow.id),
            s && s.delayEvent && this.mPanelShow.delayClickEvent();
    }

    /** 恢复场景 id 名下暂存的弹窗栈 */
    public openPanelsByScenceArr(t: any): void {
        var i = this.mPanelArr[t];
        if (i) {
            for (var e = i.length, s = 0; s < e; s++) this.showPanel(null, 1, i[s]);
            delete this.mPanelArr[t];
        }
    }

    public isNoPanel(): boolean {
        return this.mLayerPanel.numChildren <= 0;
    }

    public isNoScence(): boolean {
        return this.mLayerScenes.numChildren <= 0;
    }

    /** 暂存当前弹窗栈到场景 id 名下并关面板 */
    public savePanelsByScenceArr(t: any): void {
        if (this.mLayerPanel.numChildren > 0) {
            for (var i = [], e = 0; e < this.mLayerPanel.numChildren; e++) i.push(this.mLayerPanel.getChildAt(e));
            this.mPanelArr[t] = i;
        }
        this.closePanel();
    }

    /** t 空 = 全关；指定面板关闭后回指栈顶并广播 panel_clear */
    public closePanel(t?: any): void {
        null == t
            ? (this.mLayerPanel.removeChildren(), this.mPanelShow = null)
            : (this.mLayerPanel.removeChild(t),
                this.mLayerPanel.numChildren > 0
                    ? this.mPanelShow = this.mLayerPanel.getChildAt(this.mLayerPanel.numChildren - 1)
                    : (this.mPanelShow = null,
                        sg.manager.QueueManager.instance.mIsOver || (this.event("event_panel_clear"), sg.manager.QueueManager.instance.event("event_close_panel", t.id)))),
            this.isNoScenceOrPanel();
    }

    public isNoScenceOrPanel(): void {
        null === this.mPanelShow && this.isNoScence() && this.event("no_scence_or_panel");
    }

    public checkNoScence(): void {
        Laya.timer.clear(this, this.checkNoScenceFun),
            Laya.timer.once(1e3, this, this.checkNoScenceFun);
    }

    /** 无场景且有主城建筑时串免费购/信用结算入口 */
    public checkNoScenceFun(): void {
        if (this.mScenesArr.length <= 0 && sg.manager.ModelManager.instance.modelUser.home && sg.manager.ModelManager.instance.modelUser.home.building001) {
            var t: any = this.showFreeBuy();
            0 == t && (t = this.showCreditResult());
        }
    }

    /** 服务器错误码弹文案；按 method 刷新关联数据面板 */
    public event_socket_re_code_error(t: any): void {
        if (t.data.msg) {
            var i = sg.map.utils.TestUtils.isTestShow ? "服务器: " : "";
            this.showTipsTxt(i + t.data.msg);
        }
        if (!sg.map.utils.TestUtils.isTestShow) {
            var e: any, s: any;
            switch (t.method) {
                case "get_task_reward": e = ["task"]; break;
                case "estate_harvest":
                case "estate_active_start":
                case "kill_estate_active_cd":
                case "estate_active_harvest":
                    e = ["estate"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新产业"),
                                sg.utils.ObjectUtil.values(sg.model.ModelEstate.myEstates).forEach(function (t: any) { t.event("event_estate_update"); });
                        });
                    break;
                case "hero_city_visit":
                case "kill_visit_cd":
                case "hero_city_visit_reward":
                    e = ["visit"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新拜访"),
                                sg.utils.ObjectUtil.values(sg.model.ModelVisit.visitModels).forEach(function (t: any) { t.event(sg.model.ModelVisit.EVENT_UPDATE_VISIT); });
                        });
                    break;
                case "build_city_build":
                case "city_build_event_reward":
                case "kill_city_build_cd":
                case "city_build_reward":
                    e = ["city_build"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新建设"),
                                sg.manager.ModelManager.instance.modelUser.event("evnet_city_build_main");   // 原文拼写 evnet
                        });
                    break;
                case "kill_building_cd": e = ["building_cd"]; break;
                case "get_online_reward":
                    e = ["gold", "prop", "records"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新在线领奖气泡"),
                                sg.model.ModelOnlineReward.online_reward = (sg.model.ModelOnlineReward.online_reward || 0) + 1;
                        });
                    break;
                case "get_science_reward":
                    e = ["prop", "records"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新崇贤馆"),
                                sg.manager.ModelManager.instance.modelGame.inHome && sg.manager.ModelManager.instance.modelInside.getBuildingModel("building003").updateStatus(true);
                        });
                    break;
                case "get_climb_reward":
                    e = ["coin", "gold", "prop", "climb_records"],
                        s = Handler.create(null, function () {
                            Laya.Trace.log("刷新教武堂"),
                                sg.manager.ModelManager.instance.modelGame.inHome && sg.manager.ModelManager.instance.modelInside.getBuildingModel("building007").updateStatus(true);
                        });
                    break;
                case "w.troop_move":
                case "w.troop_create":
                case "w.troop_dissmiss":
                case "w.troop_move_dismiss":
                case "w.troop_add":
                case "w.troop_break":
                case "w.troop_runaway":
                case "pk_npc_fight":
                case "do_ftask":
                    sg.manager.ModelManager.instance.modelTroopManager.reload(Handler.create(sg.map.model.MapModel.instance, sg.map.model.MapModel.instance.updateTroopItem));
            }
            e && sg.net.NetSocket.instance.send("update_user", { key: e }, Handler.create(this, function (t: any) {
                sg.manager.ModelManager.instance.modelUser.updateData(t.receiveData),
                    s && s.run();
            }));
        }
    }

    public showTipsPanel(t: any, i?: any, e?: any): void {
        void 0 === e && (e = "");
        this.showView(sg.cfg.ConfigClass.VIEW_TIPS_INFO, [t, i, e]),
            sg.view.com.MouseTips.hideMouseTips();
    }

    /** 顶部滚动文案条（t=文案，i=秒，s=y 偏移，e=是否常驻层） */
    public showTipsTxt(t: any, i?: number, e?: any, s?: number): void {
        void 0 === i && (i = 2);
        void 0 === s && (s = 0);
        if (!this.isInPaySelfPanel)
            if (sg.utils.Tools.isNullString(t)) Laya.Trace.log("show tips txt 没有文字配置");
            else {
                this.closeTipsTxt();
                var n = new Box(), h = new Image();
                h.skin = sg.manager.AssetsManager.getAssetsUI("icon_war007_1.png"),
                    h.width = 750, h.height = 80, h.alpha = 0,
                    n.addChild(h);
                var o = new HTMLDivElement();
                o.style.color = "#ffa627", o.style.align = "center", o.style.valign = "middle",
                    o.style.fontSize = 18, o.style.leading = 6, o.style.wordWrap = true,
                    o.innerHTML = t, o.width = 600,
                    n.addChild(o),
                    o.x = 75, o.y = .5 * (80 - o.contextHeight),
                    n.width = h.width, n.height = 80, n.x = 0, n.y = s, o.alpha = 0,
                    Tween.to(h, { alpha: 1 }, 300),
                    Tween.to(o, { alpha: 1 }, 300, null, null, 150),
                    e
                        ? Tween.to(n, { alpha: 0, y: s - 30 }, 300, null, Handler.create(n, n.destroy), 1e3 * i)
                        : (e = this.mLayerTxtTips, Tween.to(n, { alpha: 0, y: s - 30 }, 300, null, Handler.create(this, this.closeTipsTxt), 1e3 * i)),
                    (<any>e).centerX = 0, (<any>e).centerY = -120, (<any>e).addChild(n);
            }
    }

    public closeTipsTxt(): void {
        this.mLayerTxtTips.destroyChildren();
    }

    public showHintPanel(t: any, i?: any, e?: any, s?: any): void {
        this.showView(["ViewHintPanel", sg.view.init.ViewHintPanel], { content: t, title: i, dataArr: e }, null, s);
    }

    /** 奖励面板：t 支持 {type:count} 字典或其数组，空则不弹 */
    public showRewardPanel(t: any, i?: any, e?: boolean): void {
        void 0 === e && (e = false);
        if (null != t) {
            if (t instanceof Array) {
                if (0 == t.length) return;
                for (var s: any = false, n = 0; n < t.length; n++)
                    if (0 != sg.utils.Tools.getDictLength(t[n], true)) { s = true; break; }
                if (0 == s) return;
            } else if (0 == sg.utils.Tools.getDictLength(t, true)) return;
            this.showView(sg.cfg.ConfigClass.VIEW_GET_REWARD, [i, e, t]);
        }
    }

    /** 奖励飞图标：材质走 icon flight；道具走 bagItemUI 飞行 */
    public showIcon(t: any, i: any, e: any, n?: boolean, h?: string, o?: boolean, r?: number, a?: any): void {
        for (var l in
            (void 0 === n && (n = false),
                void 0 === h && (h = ""),
                void 0 === o && (o = true),
                void 0 === r && (r = .8),
                i = (i = i < 20 ? 20 : i) >= Laya.stage.width ? Laya.stage.width - 20 : i,
                t)) {
            var c = -1 !== l.indexOf("sale") ? "coin" : l,
                u = a || this.getItemPos(c) || this.getItemPos("bag");
            if (sg.model.ModelBuiding.material_type.indexOf(l) > -1)
                sg.manager.EffectManager.createIconFlight(sg.manager.AssetsManager.getAssetItemOrPayByID(l), i, e, u.x, u.y, 1, 20, this.mLayerClip),
                    sg.manager.EffectManager.textFlight(t[l], h, i, e, this.mLayerClip),
                    sg.manager.ModelManager.instance.modelUser.event("event_top_update", [t]);
            else if (!n) {
                var d = l, _ = 1, m = false;
                if ("number" == typeof t[l] ? _ = t[l] : t[l] instanceof Array && (_ = t[l][0], m = 1 == t[l][1]),
                    "title" == l || "equip" == l)
                    for (var g = t[l], f = 0; f < g.length; f++) { d = g[f]; break; }
                else "credit" == l && (d = sg.model.ModelProp.ITEM_CREIDT);
                if (!sg.model.ModelItem.checkItemGotoBag(d)) continue;
                var p = new ui.bag.bagItemUI();
                p.setData(d, _, -1), p.setRightIcon(m), p.pos(i, e), p.scale(r, r);
                var v = !(-1 != l.indexOf("beast") || -1 != l.indexOf("soul"));
                sg.manager.EffectManager.itemFlight(p, u.x, u.y, this.mLayerClip, o, v);
            }
        }
    }

    public showTextFlight(t: any, i: any, e?: string): void {
        void 0 === e && (e = "#ff1e00");
        var s = new Label();
        t.addChild(s), s.text = i, s.pos(.5 * t.width, 0), s.fontSize = 20, s.color = e,
            Tween.to(s, { y: s.y - 20, x: s.x + 20 }, 1200, Ease.sineInOut, Handler.create(this, function (t: any) { t.destroy(); }, [s]));
    }

    public showMattock(t: any, i: any, e: any, s: any, n: any): void {
        sg.manager.EffectManager.createIconFlight(sg.manager.AssetsManager.getAssetLater("img_dgts_chutou_m.png"), i, e, s, n, 1, t, this.mLayerClip),
            sg.manager.EffectManager.textFlight(t + "", "", i, e, this.mLayerClip),
            sg.utils.MusicManager.playSoundUI("get_reward");
    }

    public showCityBuildNum(t: any, i: any, e: any, s: any, n: any, h?: any): void {
        null == h && (h = this.mLayerClip),
            sg.manager.EffectManager.createIconFlight(sg.manager.AssetsManager.getAssetsUI("icon_paopao21.png"), i, e, s, n, .5, 20, h),
            sg.manager.EffectManager.textFlight(t + "", "", i, e, h);
    }

    public showReward(t: any, i?: boolean): void {
        void 0 === i && (i = true);
        i
            ? this.showIcon(t, Laya.stage.width / 2, Laya.stage.height / 2)
            : (sg.manager.ModelManager.instance.modelProp.getRewardProp(t, true),
                sg.manager.ModelManager.instance.modelUser.event("event_top_update", [t]));
    }

    public clearViewEffectSpecial(t: any): void {
        var i: any;
        (i = this.mLayerViewEffect.getChildByName(t)) && i.destroy(true);
    }

    /** 全屏视图特效层（EffectUIBase），可带蒙底（横屏 r 开关） */
    public showViewEffect(t: any, i?: number, e?: any, n?: boolean, h?: boolean, o?: string, r?: boolean): void {
        void 0 === i && (i = .5);
        void 0 === n && (n = false);
        void 0 === h && (h = false);
        void 0 === o && (o = "");
        void 0 === r && (r = true);
        n && this.mLayerViewEffect.destroyChildren();
        var a: any = new sg.view.effect.EffectUIBase(i, e, h);
        var l: Image;
        "" != o && (a.name = o),
            a.width = Laya.stage.width, a.height = Laya.stage.height, a.y = 0, a.init(),
            t && (
                t.mouseEnabled = false, t.mouseThrough = true, t.centerY = 0,
                a.addChild(t),
                sg.cfg.ConfigApp.isLandscape && r && (
                    l = new Image(),
                    l.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"),
                    l.alpha = .7, l.mouseEnabled = true, l.hitTestPrior = true,
                    l.width = Laya.stage.width, l.height = Laya.stage.height,
                    (<any>l).centerX = (<any>l).centerY = 0,
                    t.addChild(l), (<any>l).zOrder = -100)),
            this.mLayerViewEffect.addChild(a);
    }

    public showEffect(t: any, i?: boolean): void {
        void 0 === i && (i = true);
        i && (t.x = .5 * Laya.stage.width, t.y = .5 * Laya.stage.height),
            this.mLayerEffect.addChild(t);
    }

    public showScenceEffect(t: any, i?: boolean): void {
        void 0 === i && (i = true);
        i && (t.x = .5 * Laya.stage.width, t.y = .5 * Laya.stage.height),
            this.mLayerScenceEffect.addChild(t);
    }

    /** 层可见性整体切换（战斗进出用），菜单按场景状态恢复 */
    public visibleLayers(t: boolean): void {
        this.mLayerMap.visible = t,
            this.mLayerScenes.visible = t,
            this.mLayerMenuScene.visible = !!this.mScenesShow && t;
        var i = sg.fight.FightMain.instance.scene && sg.fight.FightMain.instance.scene.visible;
        this.mLayerMenu.visible = !this.mLayerMenuScene.visible && !i,
            this.mOtherMenu.visible = this.mLayerMenu.visible;
    }

    public showFightScenes(t: any): void {
        this.mLayerFight.addChild(t),
            this.visibleLayers(false),
            sg.guide.view.GuideFocus.focusOut();
        var i = sg.fight.FightMain.instance.client;
        i && i.playBGM();
    }

    public closeFightScenes(): void {
        this.visibleLayers(true);
        var t = this.sceneMain.type,
            i = 0 === t || 4 === t, e = 1 === t;
        this.mOtherMenu.visible = this.mLayerMenu.visible = this.mLayerMenu.visible && (i || e),
            this.mLayerFight.destroyChildren(),
            sg.utils.MusicManager.playBackMusic(),
            sg.guide.model.ModelGuide.battleOver();
    }

    public showHeroTalk(t: any, i: any, e?: string, s?: any): void {
        void 0 === e && (e = "");
        this.isInPaySelfPanel || (
            this.event("event_close_hero_talk"),
            ViewManager.instance.showView(["ViewHeroTalk", sg.view.init.ViewHeroTalk], [t, i, e], null, s));
    }

    public showNotice(t: any): void {
        sg.model.ModelGame.unlock(null, "army_push").stop || this.mLayerNotice && this.mLayerNotice.input(t);
    }

    /** 轮播公告：按 pf/zone 过滤合并内容；首轮( carouse_count<2 )或空内容不显示 */
    public showCarouse(): void {
        this.carouse_count += 1;
        var t = sg.cfg.ConfigServer.notice.carouse_notice;
        if (null != t) {
            var i = sg.manager.ModelManager.instance.modelUser.zone,
                e = sg.manager.ModelManager.instance.modelUser.mergeZone,
                s = sg.cfg.ConfigApp.pf,
                n: any[] = [],
                h = false,
                o: any[] = [];
            if (t.pf
                ? 0 == t.pf[0].length && 0 == t.pf[1].length ? h = true
                    : 0 != t.pf[0].length ? -1 != t.pf[0].indexOf(s) && (h = true)
                        : 0 != t.pf[1].length && -1 == t.pf[1].indexOf(s) && (h = true)
                : h = true,
                h) {
                o = t.content ? t.content : [];
                for (var r = 0; r < o.length; r++) n.push(o[r]);
                o = [];
            }
            if (t.zone_content) {
                t.zone_content[e] ? o = t.zone_content[e] : t.zone_content[i] && (o = t.zone_content[i]);
                for (var a = 0; a < o.length; a++) n.push(o[a]);
                o = [];
            }
            if (t.pf_content) {
                t.pf_content[s] && (o = t.pf_content[s]);
                for (var l = 0; l < o.length; l++) n.push(o[l]);
                o = [];
            }
            if (Laya.Trace.log("=========轮播公告", n),
                this.carouse_count < 2 || 0 == n.length)
                return this.mLayerCarouse.visible = false, void this.mLayerCarouse.clerMyTimer();
            if (this.mLayerCarouse) {
                this.mLayerCarouse.visible = true,
                    this.mLayerCarouse.getChildByName("carouse") && this.mLayerCarouse.removeChildByName("carouse");
                for (var c = 0; c < n.length; c++)
                    sg.cfg.ConfigServer.notice.notice_cn[n[c]] && o.push(sg.cfg.ConfigServer.notice.notice_cn[n[c]]);
                o.length > 0 && this.mLayerCarouse.input({ interval_time: sg.cfg.ConfigServer.notice.carouse_notice.interval_time, content: o });
            }
        }
    }

    /** 道具 tips 分发：按 id 子串路由到对应详情视图 */
    public showItemTips(t: any, i?: any, e?: boolean): void {
        void 0 === i && (i = -1);
        void 0 === e && (e = false);
        if (e && ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t, i]),
            -1 != t.indexOf("equip"))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_EQUIP_MAKE_INFO, sg.manager.ModelManager.instance.modelGame.getModelEquip(t));
        else if (-1 != t.indexOf("star"))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t, sg.model.ModelRune.getNum(t)]);
        else if (-1 != t.indexOf("title")) {
            var s = -1 != t.indexOf("_0") ? t.split("_")[0] : t,
                n = sg.cfg.ConfigServer.title[s].passive,
                h = -1 != t.indexOf("_0") ? sg.utils.Tools.getMsgById("titleinfo_random") : sg.fight.logic.utils.PassiveStrUtils.translatePassiveInfo(n, false, false, 3),
                o = sg.utils.StringUtil.htmlFontColor(sg.model.ModelHero.getTitleInfo(s), "#ffffff") + "<br/><br/>" + h;
            ViewManager.instance.showTipsPanel(o, { infoColor: "#ff9519" }, sg.model.ModelHero.getTitleName(s));
        } else if (-1 != t.indexOf("skill"))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SHOP_SKILL_TIPS, t);
        else if (-1 != t.indexOf("hero"))
            sg.cfg.ConfigServer.hero.hasOwnProperty(t) && ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_HERO_TALENT_INFO, sg.model.ModelHeroPure.getAwakenModel(t));
        else if (-1 != t.indexOf("sale"))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t]);
        else if (-1 != t.indexOf("skin")) {
            var r = sg.manager.ModelManager.instance.modelGame.getModelHero(sg.model.ModelSkin.getHeroId(t));
            ViewManager.instance.showView(["", sg.view.shop.ViewSkinTips], [r, t]);
        } else if (-1 != t.indexOf("soul"))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SOUL_TIPS, [t]);
        else if (-1 != t.indexOf(sg.manager.ModelManager.instance.modelProp.KEY_FACE))
            ViewManager.instance.showTipsPanel(sg.utils.Tools.getMsgById(t + "_info"));
        else if (-1 != t.indexOf("beast"))
            sg.model.ModelBeast.showTipsPanel(t, sg.map.utils.TestUtils.isTestShow);
        else if (-1 != t.indexOf("god")) {
            var a = t.split("_"), l = a[2] ? a[2] : null;
            (l ? sg.god.model.ModelGodMain.instance.getModel(l) : sg.god.model.ModelGod.newGod({ type: a[0], change: Number(a[1]) })).showInfo(null == l);
        } else if (-1 != t.indexOf("arm_")) {
            var c = t.split("_")[1];
            sg.puppet.model.ModelArmMain.instance.getArm(c).showInfo(3);
        } else if (-1 != t.indexOf(sg.manager.ModelManager.instance.modelProp.KEY_SCHEME))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SCHEME_ITEM_TIPS, t);
        else if (/^h\d{3}$/.test(t)) {
            var u = sg.heritage.ModelHeritage.instance.getHeritageById(t);
            u && ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_HERITAGE_INFO, [u, 2]);
        } else if (sg.kismet.model.ModelKit.validate(t))
            ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t, sg.kismet.model.ModelKismet.instance.getKitById(t).num]);
        else {
            var d = sg.manager.ModelManager.instance.modelProp.getItemProp(t);
            if (t == sg.model.ModelProp.ITEM_CREIDT)
                i = sg.manager.ModelManager.instance.modelUser.year_credit,
                    ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t, i]);
            else {
                if (!d) return;
                7 == d.type
                    ? sg.cfg.ConfigUI.heroShowRadar
                        ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SHOP_HERO_TIPS2, t)
                        : ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SHOP_HERO_TIPS, t)
                    : 2 == d.type
                        ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SHOP_SKILL_TIPS, t)
                        : d.equip_info && 1 == d.equip_info.length
                            ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SHOP_EQUIP_TIPS, t)
                            : 9 == d.type
                                ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_SP_ARMY_TIPS, t)
                                : 12 == d.type
                                    ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_GOD_SKILL_TIPS, t)
                                    : ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_BAG_ITEM_TIPS, [t, i]);
            }
        }
    }

    public getCurrentScene(): any {
        return this.mScenesShow;
    }

    public getCurrentPanel(): any {
        return this.mPanelShow;
    }

    public getCurrentEffect(): any {
        return this.mLayerViewEffect.getChildAt(0);
    }

    /** 支付图查看（点击销毁） */
    public showPayPicture(t: any): void {
        var i = new Box();
        i.width = Laya.stage.width, i.height = Laya.stage.height, (<any>i).centerX = (<any>i).centerY = 0,
            i.on("click", this, function () { i.destroyChildren(), i.destroy(), i = null; }),
            Laya.stage.addChild(i);
        var e = new Image();
        e.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"),
            e.alpha = .7, e.width = Laya.stage.width, e.height = Laya.stage.height,
            (<any>e).centerX = (<any>e).centerY = 0,
            i.addChild(e);
        var n = Math.min(Laya.stage.width - 100, Laya.stage.height - 100),
            h = new Image();
        h.skin = t, (<any>h).centerX = (<any>h).centerY = 0, h.width = n, h.height = n,
            i.addChild(h);
        var o = new HTMLDivElement();
        o.width = n, (<any>o).height = o.contextHeight,
            o.x = (Laya.stage.width - n) / 2, o.y = (Laya.stage.height - n) / 2 + n,
            o.style.backgroundColor = "#ffffff", o.style.align = "center", o.style.valign = "middle", o.style.leading = 8,
            o.innerHTML = sg.utils.Tools.getMsgById("_zhen0001"),
            i.addChild(o);
    }

    public showVIPPicture(): void {
        var t = new Box();
        t.width = Laya.stage.width, t.height = Laya.stage.height, (<any>t).centerX = (<any>t).centerY = 0,
            Laya.stage.addChild(t);
        var i = new Image();
        i.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"),
            i.alpha = .7, i.width = Laya.stage.width, i.height = Laya.stage.height,
            (<any>i).centerX = (<any>i).centerY = 0,
            t.addChild(i);
        var e = new Box();
        "cb_r2g_kr" == sg.cfg.ConfigApp.pf_channel ? (e.width = 1e3, e.height = 563) : (e.width = 563, e.height = 1e3),
            (<any>e).centerX = (<any>e).centerY = 0,
            t.addChild(e);
        var n = new Image();
        "cb_r2g_kr" == sg.cfg.ConfigApp.pf_channel
            ? (n.skin = "ad/cb_r2g_kr_vip.png", n.width = 1e3, n.height = 563)
            : (n.skin = "ad/r2g_kr_vip.png", n.width = 563, n.height = 1e3),
            (<any>n).centerX = (<any>n).centerY = 0,
            e.addChild(n);
        var h = new Box();
        "cb_r2g_kr" == sg.cfg.ConfigApp.pf_channel ? (h.x = 800, h.y = 70) : (h.x = 436, h.y = 75),
            h.width = 80, h.height = 80,
            h.on("click", this, function () { t.destroyChildren(), t.destroy(), t = null; }),
            e.addChild(h);
    }

    /** 测试图查看（hero/skin/advert/item/…路由，spine 可选，返回承载 Box） */
    public testShowPic(t: any, i?: number, e?: number, n?: number, h?: number, o?: boolean, r?: boolean, a?: number): any {
        var self = this;
        void 0 === i && (i = 0);
        void 0 === e && (e = 1);
        void 0 === n && (n = 0);
        void 0 === h && (h = 0);
        void 0 === o && (o = false);
        void 0 === r && (r = false);
        void 0 === a && (a = 0);
        var c: any, u = "";
        if (-1 != t.indexOf("hero") || -1 != t.indexOf("skin")) u = "hero/" + t + ".png";
        else if (-1 != t.indexOf("advert")) u = "ad/" + t + ".jpg", o = true;
        else if (-1 != t.indexOf("item") || -1 != t.indexOf("equip") || -1 != t.indexOf("soul") || -1 != t.indexOf("title") || -1 != t.indexOf("star") || -1 != t.indexOf("beast")) u = "icon/" + t + ".png", o = true;
        else {
            if (-1 === t.indexOf(".")) return null;
            u = t, o = true;
        }
        var k: any;
        if ((k = ResourceVersion.manifest || {}) && !k[u]) return null;
        // 原文此处 c 恒为 null（c=null 后判 c 取 fallback），保留退化赋值原样
        var d = (c = null) ? sg.manager.AssetsManager.getAssetLater(c[0]) : null,
            m = c ? c[1] : 0, g = c ? c[2] : 0, f = c ? c[3] : 640, p = c ? c[4] : 640,
            v = c ? c[5] : 0, y = c ? c[6] : 0;
        if (!this.tempTestBox) {
            this.tempTestBox = new Box(),
                (<any>this.tempTestBox).centerX = 0, (<any>this.tempTestBox).centerY = 0,
                this.tempTestBox.width = this.tempTestBox.width = Laya.stage.width,
                this.tempTestBox.height = Laya.stage.height,
                Laya.stage.addChild(this.tempTestBox);
            var b = new Image();
            b.skin = "ui/bg_26.png", b.sizeGrid = "5,5,5,5", b.x = m, b.y = g, b.name = "imgBlack",
                (<any>b).top = (<any>b).bottom = (<any>b).right = (<any>b).left = -5,
                this.tempTestBox.addChild(b);
        }
        this.tempTestBox.getChildByName("imgBlack").visible = o;
        var I = new Box();
        I.width = f, I.height = p, (<any>I).centerX = n, (<any>I).centerY = h, I.scale(e, e),
            this.tempTestBox.addChild(I);
        var x = new Box();
        x.x = (f - 640) / 2, x.y = (p - 640) / 2, x.width = 640, x.height = 640,
            I.addChild(x);
        if (a && ((<any>I).accuracy = a, I.cacheAs = "bitmap"),
            r && d) {
            var w = new Image(<any>d);
            w.x = m, w.y = g, w.width = f, w.height = p, (<any>I).mask = w,
                a && sg.manager.EffectManager.setSprAccuracy(I, a, null, 0, 0, v, y);
        }
        if (i <= 1) {
            var C = new Image();
            C.skin = u,
                x.addChild(C),
                (<any>C).centerX = (<any>C).centerY = 0;
        }
        if (x.scaleX = x.scaleY = 1,
            !(0 != i && 2 != i || -1 == t.indexOf("hero") && -1 == t.indexOf("skin"))) {
            var T = "spine/" + t + "/skeleton.sk";
            if ((k = ResourceVersion.manifest) && k[T]) {
                var M = new sg.utils.Spine();
                M.Load(T, 1, 1, 0, 0, Handler.create(this, callFunc = function () { M && M.Play(0); }), x);
            }
        }
        return this.tempTestBox.offAll("click"),
            this.tempTestBox.on("click", this, function () {
                self.tempTestBox.destroyChildren(), self.tempTestBox.destroy(), self.tempTestBox = null;
            }),
            I;
    }

    public testShowImage(t: any): void {
        var i = "testImage",
            e: any = Laya.stage.getChildByName(i);
        e && e.destroy(),
            (e = new Box()).name = i,
            e.width = Laya.stage.width, e.height = Laya.stage.height,
            Laya.stage.addChild(e),
            (<any>e).centerX = (<any>e).centerY = 0;
        var n = new Image("ui/bg_26.png");
        n.sizeGrid = "5,5,5,5",
            (<any>n).left = (<any>n).right = (<any>n).top = (<any>n).bottom = 0;
        var h = new Image(<any>t);
        (<any>h).centerX = (<any>h).centerY = 0,
            e.addChildren(n, h),
            e.on("click", e, e.destroy);
    }

    public testShowAni(t: any, i?: boolean, e?: string, n?: number): void {
        var h: any;
        void 0 === i && (i = true);
        void 0 === e && (e = "");
        void 0 === n && (n = 0);
        -1 != t.indexOf("|") && (e = t.split("|")[1], t = t.split("|")[0]),
            h = -1 != t.indexOf("hero") || -1 != t.indexOf("skin")
                ? sg.manager.EffectManager.loadHeroAnimation(t, i, e)
                : sg.manager.EffectManager.loadAnimation(t, e, n);
        var o: any = Laya.stage.getChildByName("testAni");
        o && o.destroy(),
            (o = new Box()).width = o.height = 640,
            Laya.stage.addChild(o),
            (<any>o).centerX = (<any>o).centerY = 0;
        var r = new Image();
        r.skin = "ui/bg_26.png", r.sizeGrid = "5,5,5,5",
            o.addChild(r),
            r.width = r.height = 640,
            o.addChild(h),
            h.x = h.y = 320,
            o.on("click", this, function () { o.destroyChildren(), o.destroy(); });
    }

    /** 重启确认弹窗 */
    public restartGame(t: any, i: any): void {
        this.showAlert(sg.utils.Tools.getMsgById("restartGame_info01", [t]), Handler.create(this, function (t: any) {
            i.runWith(t), 0 == t && Laya.Platform.restart();
        }), null, "", false, false, "");
    }

    public showInteriorChooseHero(t: any, i: any, e?: any): void {
        sg.cfg.ConfigApp.isLandscape
            ? ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_ESTATE_CHOOSE_HERO, [t, i, e])
            : ViewManager.instance.showView(sg.cfg.ConfigClass.VIEW_ESTATE_HERO, [0, i, t, e ? -1 : 0]);
    }

    public setMenuTopVisible(t: any): void {
        this.event("change_menu_top_visible", t);
    }

    /** 原文 r(0,e,"sceneMain",getter,setter) */
    public get sceneMain(): any {
        return this.mSceneMain;
    }
    public set sceneMain(t: any) {
        this.mSceneMain = t;
    }

    /** 原文 r(1,i,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 静态单例（只读） */
    public static get instance(): ViewManager {
        return ViewManager.sViewManager = ViewManager.sViewManager || new ViewManager();
    }

    /** 赛季资源切换：预载季节图集后替换缓存并重建当前场景 */
    public static changeSeason(t: any, e?: any): void {
        if (ViewManager.seasonNum !== t) {
            ViewManager.seasonNum = t;
            var n = sg.cfg.ConfigServer.system_simple.assetSeasonCfg,
                h = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "mini.png"],
                o: any[] = [],
                r = "home" + sg.model.ModelUser.getCountryID() + "_" + t;
            h = h.map(function (t) {
                return o.push("home/" + n[r] + "/" + t), "home/" + t;
            });
            var a = (sg.scene.constant.ConfigConstant.mapName.split("/")[0] || ""),
                l = sg.scene.constant.ConfigConstant.mapConfigData.tilesets.map(function (t: any) { return t.image; });
            sg.utils.ArrayUtil.distinct(l).forEach(function (i) {
                h.push(a + "/" + i), o.push(a + "/" + t + "/" + i);
            }),
                LoadeManager.loadImg(o, Handler.create(null, function () {
                    for (var t = 0, i = o.length; t < i; t++)
                        Laya.loader.clearRes(h[t]),
                            Laya.loader.cacheRes(h[t], Laya.loader.getRes(o[t]));
                    var n = ViewManager.instance.sceneMain;
                    if (n) {
                        var r = n.tMap._rect, a = r.x, l = r.y;
                        ViewManager.instance.resetMap(n.type),
                            ViewManager.instance.sceneMain.move(a, l);
                    }
                    e && e.run();
                }));
        } else e && e.run();
    }

    /** 全量清理：网络、单例、定时器（按 __className 归属 sg.）、舞台子节点，随后重启引导 */
    public static clear(): void {
        var t: any;
        var handlers = (<any>Laya.timer)._handlers;   // Timer._handlers 私有，d.ts 未暴露
        sg.net.NetSocket.instance.clear(),
            sg.net.NetSocket.instance.clearEvents(),
            sg.utils.ObjectSingle.clear();
        for (var i in handlers)
            if ((t = handlers[i]) && t.caller) {
                var e = t.caller.__className;
                e && e.indexOf("sg.") > -1 && (Laya.Trace.log(e), Laya.timer.clearAll(t.caller));
            }
        (<any>Laya.stage).clearEvents(),
            Laya.stage.destroyChildren(),
            sg.manager.ModelManager.clear(),
            ViewManager.sLaya.init();
    }

    /** 禁用层动效：glow503 + 加载文案（颜色取 ColorManager） */
    public static createDisableSpr(t: any): any[] {
        var i = new Sprite();
        i.alpha = 0, i.x = .5 * t.width, i.y = .4 * t.height;
        var e = sg.manager.EffectManager.getAnimation("glow503");
        i.addChild(e);
        var s = new Label(sg.utils.Tools.getMsgById("_public185"));
        return s.width = 200, s.x = .5 * -s.width, s.y = 30,
            s.color = sg.manager.ColorManager.getUIColor("LOAD_ANI_LABAL_COLOR"),
            s.stroke = 2,
            s.strokeColor = sg.manager.ColorManager.getUIColor("LOAD_ANI_LABAL_STROKE_COLOR"),
            s.fontSize = 18, s.align = "center",
            i.addChild(s),
            t.addChild(i),
            [i, e];
    }

    // ---- 静态字段（原文 i.EVENT_* 等逐项） ----
    public static EVENT_OPEN_PANEL: string = "event_open_panel";
    public static EVENT_OPEN_SCENE: string = "event_open_scene";
    public static EVENT_CLOSE_ALL_SCENE: string = "event_close_all_scene";
    public static EVENT_SWITCH_MAP_START: string = "event_switch_map_start";
    public static EVENT_SWITCH_MAP_COMPLETE: string = "event_switch_map_complete";
    public static EVENT_SHOW_CAROUSE: string = "event_show_carouse";
    public static EVENT_PANEL_CLEAR: string = "event_panel_clear";
    public static NO_SCENCE_OR_PANEL: string = "no_scence_or_panel";
    public static EVENT_CLOSE_HERO_TALK: string = "event_close_hero_talk";
    public static EVENT_HERO_TALK_CLOSED: string = "event_hero_talk_closed";
    public static EVENT_ENTER_FIGHT_SCENE: string = "event_enter_fight_scene";
    public static EVENT_EXIT_FIGHT_SCENE: string = "event_exit_fight_scene";
    public static EVENT_REWARD_PANEL_CLOSE: string = "event_reward_panel_close";
    public static CLOSE_RELICINFO_PANEL: string = "close_relicinfo_panel";
    /** 单例槽（原文 i.sViewManager=null；Nt.init 会置空重建） */
    public static sViewManager: ViewManager = null;
    /** 启动视图（原文 tn.sLaya=this，由 LayaSample 构造时回填） */
    public static sLaya: any = null;
    public static seasonNum: number = -1;
    public static isLoadView: boolean = true;
    public static CHANGE_MENU_TOP_VISIBLE: string = "change_menu_top_visible";
}

/**
 * 注册身份等价物：原文 o(i,"sg.manager.ViewManager",t)（t=T=laya.events.EventDispatcher）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewManager, "sg.manager.ViewManager", null, null);
