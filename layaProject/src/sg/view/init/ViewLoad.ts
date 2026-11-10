/**
 * sg.view.init.ViewLoad —— VIEW_LOAD 启动装载场景（竖版皮肤 init/viewLoad）：
 * 进度假动画 → 资源/服务器配置装载 → 登录面板装配 → 账号登录/平台登录 → socket 建链 → 进区。
 *
 * 原文：code1.js 字节 [7378694,7404525]（off 7380941，包装变量 y8，基类 BW=ui.init.viewLoadUI，
 * 注册实参 `}(BW)` 实测）。oracle：…/oracle/batch-e/ViewLoad.js
 *
 * 依赖（批次 A/B/C/D 模块直引）：vs=sg.utils.Tools、Rt=sg.cfg.ConfigApp、Gt=sg.cfg.ConfigServer、
 * Ft=sg.cfg.ConfigAssets、Wt=sg.cfg.HelpConfig、Ht=sg.cfg.ConfigClass、Js=sg.manager.LoadeManager、
 * re=sg.manager.AssetsManager、le=sg.manager.EffectManager、as=sg.utils.MusicManager、
 * ue=sg.manager.ModelManager、tn=sg.manager.ViewManager、Ts=Laya.Trace、ks=Laya.ToJava、
 * Cs=Laya.ToIOS、Lt=Laya.HtmlLoadClip、ns=sg.utils.FunQueue、fn=sg.net.NetHttp、pn=sg.net.NetSocket、
 * us=sg.utils.SaveLocal、cs=sg.utils.ObjectUtil、fs=sg.utils.ThirdRecording、lr=sg.model.ModelGame；
 * 引擎别名：P=Handler、F=laya.ui.Image、M=laya.display.css.Font、H=laya.display.Input、
 * m=Browser、s=Laya、$=MiniAdpter、gt=laya.tt.mini.TTMiniAdapter。
 * 批次外（ambient/全局路径，惰性触达）：Br=sg.model.ModelPlayer、Fo=sg.model.ModelAntiAddiction、
 * Z4=sg.view.init.ViewAffiche、be=sg.map.utils.TestTools、ce=sg.manager.FilterManager、
 * i8=sg.view.init.ViewAgeNotice、n8=sg.view.init.ViewBinding、N8=sg.view.init.ViewPrivacy、
 * Te=sg.model.ModelPf、Rh=sg.activities.model.ModelPhone、ms=sg.utils.SpinePools、
 * os=sg.utils.MessagePack、Jt=sg.fight.client.cfg.ConfigFightView。
 *
 * 勘误注记：event_net_error 内 P.create(t,…) 的自由 `t` 为包装参数（=BW 基类），
 * 非本方法局部（wrapper 闭包词法），译文以 viewLoadUI 类值直引等价。
 */
import Handler = laya.utils.Handler;
import Browser = laya.utils.Browser;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import { Platform } from "../../laya/Platform";
import { viewLoadUI } from "../../ui/init/viewLoadUI";
import { Tools } from "../../utils/Tools";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigAssets } from "../../cfg/ConfigAssets";
import { HelpConfig } from "../../cfg/HelpConfig";
import { ConfigClass } from "../../cfg/ConfigClass";
import { LoadeManager } from "../../manager/LoadeManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { Trace } from "../../laya/Trace";
import { ToJava } from "../../laya/ToJava";
import { ToIOS } from "../../laya/ToIOS";
import { HtmlLoadClip } from "../../laya/HtmlLoadClip";
import { FunQueue } from "../../utils/FunQueue";
import { NetHttp } from "../../net/NetHttp";
import { NetSocket } from "../../net/NetSocket";
import { SaveLocal } from "../../utils/SaveLocal";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ThirdRecording } from "../../utils/ThirdRecording";
import { ModelGame } from "../../model/ModelGame";

export class ViewLoad extends viewLoadUI {

    public FAKE_PROGRESS: number = .1;
    public CONFIG_PROGRESS: number = .5;
    public extraProgress: number = 0;
    public mLastProgress: number = 0;
    public mProgress: number = 0;
    public mUpdateProgress: number = 0;
    public isComplete: boolean = !1;
    public mStartTime: number = 0;
    public progressAni: any = null;
    public progressImg: any = null;
    public mHasPlayBgClip: boolean = !1;
    public mFunQueue: any = null;
    public isAssets: boolean = !1;
    public isServerCfg: boolean = !1;
    public loginPa: any = null;
    public loginPaOtherPf: any = null;
    public mBgClip: any = null;
    public mBgImg: any = null;
    public httpStatus: number = -1;
    public isCheckLoginHttp: boolean = !1;
    public loginStatus: number = NaN;
    public checkGameStatusIndex: number = 0;
    public isClickedLoginBtn: boolean = !1;
    public isEnterGameUser: boolean = !1;
    public mProwidth: number = 0;
    public txtArr: any[] = [];
    public txtIndex: number = 0;
    public txtArrEd: any[] = null;
    public txtStop: boolean = !1;
    public config_error_times: number = 0;
    public gameReadyLogin: boolean = !1;
    public new_version: number = 0;
    public update_duration: number = 0;
    public update_tips: string = "";
    public mPcLogo: any = null;
    public error_times_login: number = 0;
    /** 皮肤动态字段（viewLoadUI 基座字段表未列，运行时由皮肤 JSON 装配；不得带初始化器覆盖 super() 装配值） */
    public btn_setting: any;
    public text_setting: any;

    constructor() {
        super();
        this.test_clip_vis = !1,
            this.checkGameStatusIndex = 0,
            this.btn_affiche.visible = !1,
            this.btn_server.on("click", this, this.click_server),
            this.btn_register.on("click", this, this.click_register),
            this.btn_tel.on("click", this, this.click_tel),
            this.yybOut.on("click", this, this.click_logout),
            this.btnQQ.on("click", this, this.click_yyb, [1]),
            this.btnWX.on("click", this, this.click_yyb, [2]),
            this.btnFB.on("click", this, this.click_yyb, [3]),
            this.btnGG.on("click", this, this.click_yyb, [4]),
            this.btnReserve.on("click", this, this.click_yyb, [5]),
            this.twFB.on("click", this, this.click_yyb, [3]),
            this.twReserve.on("click", this, this.click_yyb, [5]),
            this.btn_clear1.on("click", this, function () {
                SaveLocal.clearAll();
            }),
            ModelManager.instance.modelGame.on("event_server_select_change", this, this.event_server_select_change),
            this.xuanqu.text = Tools.getMsgById("ViewLoad_1"),
            this.img0 && (this.img0.visible = !ConfigApp.disloading && (ConfigApp.isPC || ConfigApp.isLandscape)),
            this.img1 && (this.img1.visible = !ConfigApp.disloading && (ConfigApp.isPC || ConfigApp.isLandscape)),
            this.mProwidth = this.proWidth.width,
            this.progressBox.width = 640,
            this.imgProgressBar.width = this.mProwidth,
            "sg" == HelpConfig.type_app && (
                this.txtShow.color = "#eebb77",
                this.txtShow.strokeColor = "#332211",
                this.txtShow.stroke = 2),
            this.progressTxt.font = "msyh",
            this.txtShow.font = (<any>laya.display.css.Font).defaultFont2,
            this.box_agreement.visible = !1,
            this.visible = !HtmlLoadClip.isHtmlLoad,
            this.btn_login.label = "",
            this.ageNotice && (this.ageNotice.visible = !1),
            this.btn_setting && (
                this.btn_setting.visible = !1,
                this.btn_setting.on("click", this, this.click_setting));
    }

    public click_register(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_LOGIN, 1);
    }

    /** 公告入口：新版 use_new_notice 走 VIEW_AFFICHE1 */
    public click_affiche(): void {
        (<any>ConfigServer.system_simple).hasOwnProperty("use_new_notice") && (<any>ConfigServer.system_simple).use_new_notice
            ? ViewManager.instance.showView(ConfigClass.VIEW_AFFICHE1)
            : ViewManager.instance.showView(ConfigClass.VIEW_AFFICHE);
    }

    public click_tel(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_PHONE, 1);
    }

    public click_setting(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_SETTINGS_H);
    }

    /** 服务器切换：frontcs 取首选；否则取玩家区名（zone[8]>0 标“新”） */
    public event_server_select_change(t: any): void {
        sg.model.ModelPlayer.recommendServer = ConfigApp.frontcs ? ConfigApp.frontcs[0] : t;
        var i = ConfigServer.getServerName(sg.model.ModelPlayer.recommendServer, null, !0);
        if (sg.map.utils.TestUtils.isTestShow) {
            this.tZone.text = i;
        } else {
            var e = Tools.getMyLoginZoneID();
            ConfigServer.zone && ConfigServer.zone[e] && ConfigServer.zone[e][8] > 0 && (i = Tools.getMsgById("_lht80", [e.substring(1)])),
                this.tZone.text = i;
        }
    }

    public click_server(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_SERVER_LIST);
    }

    public onAdded(): void {
        ConfigApp.isLandscape && (
            (Math.min(Laya.stage.width, 1280) - 1138) / 2 > 0 && (this.width = 1280),
            sg.utils.SpinePools.instance.OnStart());
    }

    public onRemoved(): void {
        NetHttp.instance.off("event_net_error", this, this.event_net_error),
            sg.model.ModelPlayer.instance.off("event_login_ok", this, this.loginAuto),
            Laya.loader.off("error", this, this.onError),
            this.destroy(!0);
    }

    /** 装载初始化：iOS 存档回填、错误/登录事件挂接、PC/索引底图、LOGO、登录面板参数复位、文案轮播启动 */
    public initData(): void {
        var t = this;
        Platform.checkPackage(),
            Platform.getUserDataForIos(Handler.create(null, function (t: any) {
                if (t) {
                    var i = JSON.parse(decodeURI(t));
                    (<any>sg.model.ModelPlayer).userData = i.player,
                        (<any>sg.model.ModelPlayer).userListData = i.list;
                }
            })),
            sg.model.ModelPlayer.instance.off("event_login_ok", this, this.loginAuto),
            sg.model.ModelPlayer.instance.on("event_login_ok", this, this.loginAuto),
            NetHttp.instance.off("event_net_error", this, this.event_net_error),
            NetHttp.instance.on("event_net_error", this, this.event_net_error);
        var i = new laya.ui.Image;
        ConfigApp.isPC && (ConfigApp.pcbgImg ? LoadeManager.loadTemp(i, AssetsManager.getAssetsAD(ConfigApp.pcbgImg + ".jpg"), this.loadingImgSucc) : LoadeManager.loadTemp(i, AssetsManager.getAssetsAD("bg_pc.jpg"), this.loadingImgSucc)),
            i.centerX = i.centerY = 0,
            this.addChild(i),
            i.zOrder = -1,
            ConfigApp.isPC || (ConfigApp.indexLoadingImg ? LoadeManager.loadTemp(this.adImg, AssetsManager.getAssetsAD(ConfigApp.indexLoadingImg + ".jpg"), this.loadingImgSucc) : Platform.checkIndexImgURL(function (i: any) { LoadeManager.loadTemp(t.adImg, i, t.loadingImgSucc); }, function () { LoadeManager.loadTemp(t.adImg, AssetsManager.getAssetsAD("bg_loading1.jpg"), t.loadingImgSucc); })),
            this.bgBox.removeChildren(),
            this.bgBox.visible = !1;
        var e = ConfigApp.logoUI();
        if (e) {
            var s = new laya.ui.Image;
            ConfigApp.isPC || ConfigApp.isLandscape ? s.centerY = -200 : "fs" == HelpConfig.type_app ? s.centerY = -250 : s.top = -200,
                s.centerX = 0,
                LoadeManager.loadTemp(s, e),
                this.bgBox.addChild(s);
        }
        var n = ConfigApp.logoMinUI();
        if (n) {
            var h = new laya.ui.Image;
            h.skin = n,
                h.top = 0,
                h.left = 30,
                this.bgBox.addChild(h);
        }
        ConfigApp.loginBgImg && (
            this.mBgImg = new laya.ui.Image,
            ConfigApp.isLandscape ? (this.mBgImg.centerX = 0, this.mBgImg.centerY = 0) : (this.mBgImg.top = 0, this.mBgImg.bottom = 0, this.mBgImg.left = 0, this.mBgImg.right = 0),
            this.bgBox.addChildAt(this.mBgImg, 0),
            LoadeManager.loadTemp(this.mBgImg, AssetsManager.getAssetsAD(ConfigApp.loginBgImg + ".jpg"))),
            this.loginPaOtherPf = {},
            this.gameReadyLogin = !1,
            sg.model.ModelPlayer.recommendServer = "",
            this.httpStatus = -1,
            this.yybOut.visible = !1,
            this.yybBox.visible = !1,
            this.googleBox.visible = !1,
            this.twBox.visible = !1,
            this.combox.visible = !1,
            this.progressBox.visible = !0,
            this.adImg.visible = !ConfigApp.isPC,
            this.tCopyright.text = ConfigApp.get_Copyright(),
            this.tCopyright.font = (<any>laya.display.css.Font).defaultFont2,
            this.btn_register.visible = !1,
            ConfigApp.pf.indexOf("r2g") > -1 && (this.yybOut.skin = "comp/icon_80.png"),
            this.btn_tel.visible = !1,
            this.tVersion.text = (ConfigApp.appVersionTxt + "_" + ConfigApp.appFunVersion).replace(/\_/g, "."),
            "h5_360_2" == ConfigApp.pf && (
                this.tVersion.text = "适龄提示:16岁以上",
                this.tVersion.color = "#FFFFFF"),
            this.isAssets = !1,
            this.isServerCfg = !1,
            this.tuid.maxChars = 8,
            this.tuid.restrict = "0-9",
            this.mFunQueue = new FunQueue,
            this.mFunQueue.init([Handler.create(this, this.initAssetsAndServerCfg), Handler.create(this, this.initLoginView)]),
            this.txtArrEd = [],
            this.txtArr = (<any>Tools).sMsgLocalDic ? (<any>Tools).sMsgLocalDic.loadingTxtArr : [],
            this.txtIndex = Tools.getRandom(0, this.txtArr.length),
            this.txtStop = !1,
            this.onTxtShow();
    }

    public loadingImgSucc(): void {
        Platform.showGameIndex();
    }

    /** 轮播文案（4s 换条，loadingTxtArr 抽样不重复池耗尽重置） */
    public onTxtShow(): void {
        this.txtStop || (
            ConfigApp.loadtxt && "yes" == ConfigApp.loadtxt ? this.txtShow.text = "首次启动需要网络语言包资源,消耗20MB流量" : this.txtShow.text = this.txtArr[this.txtIndex],
            HtmlLoadClip.setLoadTxt(this.txtShow.text, this.txtShow.color),
            -1 == this.txtArrEd.indexOf(this.txtIndex) && this.txtArrEd.push(this.txtIndex),
            this.txtArrEd.length == this.txtArr.length && (this.txtArrEd = []),
            this.txtIndex = Tools.getRandom(0, this.txtArr.length, this.txtArrEd),
            this.timer.once(4e3, this, this.onTxtShow));
    }

    /** 进度动画件（发光 progressImg + loading_progress 动画）+ disloading 隐进度 */
    public initLoadProgress(): void {
        this.mStartTime = (new Date).getTime(),
            this.progressAni = EffectManager.loadAnimation("loading_progress"),
            this.progressImg = new laya.ui.Image(AssetsManager.getAssetsCOMP("glow.png")),
            this.progressAni.y = this.progressBar.y + 40,
            this.progressAni.blendMode = "lighter",
            this.progressAni.scale(.9, .9),
            this.progressImg.scale(1.8, 1.8),
            this.progressImg.y = 4,
            this.progressImg.blendMode = "lighter",
            this.progressBar.addChild(this.progressImg),
            this.progressBar.parent.addChild(this.progressAni),
            ConfigApp.disloading && "yes" == ConfigApp.disloading && (
                this.progressBarbg.alpha = 0,
                this.progressBar.alpha = 0,
                this.progressTxt.visible = !1,
                ConfigApp.loadtxt && "yes" == ConfigApp.loadtxt ? this.txtShow.text = "首次启动需要网络语言包资源,消耗20MB流量" : this.txtShow.visible = !1,
                this.progressImg.alpha = 0,
                this.progressAni.visible = !1),
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
    }

    /** 阶段一：进度动画启动 + MessagePack.create 内联回调推进服务器配置 */
    public initAssetsAndServerCfg(): void {
        var t = this;
        this.initLoadProgress(),
            (<any>sg.utils.MessagePack).create(function () {
                t.initServerConfig();
            });
    }

    /** 资源清单按 pf 选词表头（360 渠道差分）→ loadImg 主装载 */
    public loadAssets(): void {
        var t: any[] = [];
        t = "h5_360_3" == ConfigApp.pf ? [ConfigAssets.AssetsInitWord[1]].concat(ConfigAssets.AssetsInit)
            : "h5_360_2" == ConfigApp.pf ? [ConfigAssets.AssetsInitWord[2]].concat(ConfigAssets.AssetsInit)
                : [ConfigAssets.AssetsInitWord[0]].concat(ConfigAssets.AssetsInit),
            (<any>LoadeManager.loadImg)(t, Handler.create(this, this.onOtherComplete), Handler.create(this, this.onOtherProgress, null, !1));
    }

    /** 帧循环：0 段假进度（FAKE_PROGRESS 上限）；否则速度自适应收敛到 1 后转 newVersion/loadOthers */
    public onFrameLoop(): void {
        var t: any = NaN;
        if (0 == this.mProgress) {
            t = .01,
                this.mLastProgress = Math.min(this.FAKE_PROGRESS, this.mLastProgress + t),
                this.showProgressBar(this.mLastProgress),
                ConfigApp.isFirstInstall ? Platform.uploadActionData(10002, [this.mLastProgress]) : Platform.uploadActionData(1, [this.mLastProgress]);
        } else {
            // [批次 E 勘误 2026-11-10] 原文（oracle/batch-e/ViewLoad.js）：
            //   (t=this.mProgress-this.mLastProgress)>=1e-4&&(t=Math.max(1e-4,Math.min(.3,.1*t)))
            // 括号内赋值先求差值、内层 .1*t 用差值；此前译文丢了赋值括号，求值序变为
            // 布尔 && 且内层引用入口 NaN —— onFrameLoop else 分支每帧产出 NaN，进度条
            // NaN% 且退出条件 e>=1 永假，F8 装载循环永不退出（第 13 次推进后冻结根因）。
            (t = this.mProgress - this.mLastProgress) >= 1e-4 && (t = Math.max(1e-4, Math.min(.3, .1 * t)));
            var i: any = NaN;
            this.mProgress < 1 ? (i = this.mProgress / ((new Date).getTime() - this.mStartTime) * 1e3, i = Math.max(.05, Math.min(1, i))) : (i = 2, t += .02),
                t *= i,
                this.mLastProgress = this.mLastProgress + t;
            var e = Math.min(1, this.mLastProgress);
            this.showProgressBar(e),
                ConfigApp.isFirstInstall ? Platform.uploadActionData(10002, [e]) : Platform.uploadActionData(1, [e]),
                HtmlLoadClip.setLoadValue(4, e),
                this.mProgress >= 1 && e >= 1 && this.isComplete && (
                    this.tuid.text = "",
                    Laya.timer.clear(this, this.onFrameLoop),
                    this.newVersion ? this.loadNewVersion() : this.loadOthers());
        }
    }

    /** 强更进度页（update_tips 文案 + update_duration 时长条） */
    public loadNewVersion(): void {
        this.txtShow.text = this.update_tips,
            this.txtArrEd = [],
            this.txtIndex = 0,
            this.txtArr = [this.update_tips],
            this.showProgressBar(0),
            this.progressBar.blendMode = "lighter",
            this.txtShow.color = "#33eeff",
            HtmlLoadClip.setLoadTxt(this.update_tips, this.txtShow.color),
            Laya.timer.frameLoop(1, this, this.onUpdating);
    }

    public onUpdating(): void {
        this.mUpdateProgress = 1 / (60 * this.update_duration),
            this.showProgressBar(this.mUpdateProgress),
            HtmlLoadClip.setLoadValue(5, this.mUpdateProgress),
            this.mUpdateProgress >= 1 && (
                SaveLocal.save("new_version", this.new_version),
                Laya.timer.clear(this, this.onUpdating),
                this.loadOthers());
    }

    public loadOthers(): void {
        var t = this;
        (<any>AssetsManager).loadOthers(this, function () {
            t.isAssets = !0,
                t.assetsAndServerCfgGet();
        });
    }

    /** 条宽/百分比 + 前置光斑 x 往返（<=0 起跳 / <200 衰减 / 越界回卷 -200） */
    public showProgressBar(t: number): void {
        t += this.extraProgress,
            t = Math.min(t, 1),
            this.progressBar.width = t * this.mProwidth,
            this.progressTxt.text = Math.round(100 * t) + "%";
        var i = this.progressBar.width;
        this.progressAni.x = i,
            i += 200,
            this.progressImg.x <= 0 ? this.progressImg.x += 15 : this.progressImg.x < i ? this.progressImg.x += 10 * (i - this.progressImg.x) / (i + 200) + 5 : this.progressImg.x = -200;
    }

    public onConfigProgress(t: number): void {
        Math.floor(10 * t);
        this.mProgress = t * (this.CONFIG_PROGRESS - this.FAKE_PROGRESS) + this.FAKE_PROGRESS;
    }

    public onOtherProgress(t: number): void {
        Math.floor(10 * t);
        this.mProgress = t * (1 - this.CONFIG_PROGRESS) + this.CONFIG_PROGRESS;
    }

    public onError(t: any): void {
        Trace.log(t);
    }

    public onConfigComplete(): void {
        this.loadAssets();
    }

    public onOtherComplete(): void {
        Trace.log("ViewLoad onComplete"),
            this.mProgress = 1,
            this.isComplete = !0,
            "h5_shouqu" === ConfigApp.pf && (<any>Platform.h5_sdk_obj).gameLoad("choose");
    }

    /** 阶段二：登录 BGM + 欢迎动画 + loadCfgs_http → 回调置 isServerCfg 并触发装载 */
    public initServerConfig(): void {
        var t = this;
        MusicManager.playMusic(MusicManager.BG_LOGIN),
            this.mBgClip = EffectManager.loadWelcomeScreen(),
            this.mBgClip.visible = !ConfigApp.isPC || !ConfigApp.pcbgImg,
            Laya.loader.on("error", this, this.onError),
            (<any>ConfigServer).loadCfgs_http(Handler.create(this, function () {
                t.isServerCfg = !0,
                    t.loadAssets();
            })),
            "h5_shouqu" === ConfigApp.pf && (<any>Platform.h5_sdk_obj).gameLoad("start");
    }

    /** 复制更新地址 + 警告框循环提示（1s 重入） */
    public updateApp(): void {
        var t = this;
        (<any>Browser.window).copytest1(ConfigApp.updateAppURL),
            ViewManager.instance.showWarnAlert(Tools.getMsgById("_lht71") + "\n sg.ptkill.com/www1/", Handler.create(this, function () {
                ViewManager.instance.showTipsTxt("复制下载地址成功"),
                    Laya.timer.once(1e3, t, t.updateApp);
            }));
    }

    /** 网络错误：就绪期(<5 次)重试登录链；否则配置重拉 2 次后弹窗重试 */
    public event_net_error(): void {
        if (Platform.checkGameStatus(500), this.gameReadyLogin)
            return this.error_times_login += 1,
                void (this.error_times_login < 5 ? ConfigApp.useMyLogin() ? ViewManager.instance.showView(ConfigClass.VIEW_LOGIN, -1) : this.checkPFLoginBySDK() : ViewManager.instance.showWarnAlert(Tools.getMsgById("_lht59"), Handler.create(viewLoadUI, function () { Platform.restart(); })));
        if (this.httpStatus = 2e3, this.config_error_times < 2)
            this.config_error_times += 1,
                this.initServerConfig();
        else {
            var t = this;
            ViewManager.instance.showWarnAlert(Tools.getMsgById("_lht59"), Handler.create(t, function () {
                t.initServerConfig();
            }));
        }
    }

    public assetsAndServerCfgGet(): void {
        this.isAssets && this.isServerCfg && this.mFunQueue.next();
    }

    /** 欢迎动画 glow502 播放（等待无面板窗口） */
    public playBgClip(): void {
        if (!this.mHasPlayBgClip && this.mBgClip)
            if (this.btn_server.visible && ViewManager.instance.isNoPanel()) {
                this.mHasPlayBgClip = !0;
                var t = this.mBgClip.getChildByName("glow502");
                t && EffectManager.setAnimationQueue(t, "in|stand", 2);
            } else
                Laya.timer.once(1e3, this, this.playBgClip);
    }

    /** 隐私协议首显判断（show_privacy_contract 含本 pf 且未确认过） */
    public checkPrivacy(): void {
        (<any>ConfigServer.system_simple).show_privacy_contract && -1 !== (<any>ConfigServer.system_simple).show_privacy_contract.indexOf(ConfigApp.pf) && (SaveLocal.getValue("key_privacy_contract") || ViewManager.instance.showView(ConfigClass.VIEW_PRIVACY_CONTRACT));
    }

    /** 登录视图装配：禁言词、bgClip 居中、面板复位、测试模式列表/自动登录路由、年龄角标、公告 */
    public initLoginView(): void {
        this.checkPrivacy(),
            Platform.uploadActionData(0, null),
            ConfigApp.isFirstInstall && Platform.uploadActionData(10003, null),
            (<any>laya.display.Input).sendTxtByLan = Tools.getMsgById("_chat_text12"),
            sg.manager.FilterManager.instance.setBanWord(),
            ConfigApp.loginBgImg || (
                Tools.check1280Img(this.mBgClip, !0),
                this.bgBox.addChildAt(this.mBgClip, 0),
                this.mBgClip && (this.mBgClip.x = (this.width - this.mBgClip.width) / 2)),
            this.txtStop = !0,
            this.gameReadyLogin = !0,
            this.isCheckLoginHttp = !1,
            this.bgBox.visible = !0,
            this.btn_setting && (this.btn_setting.visible = !0),
            this.progressBox.visible = !1,
            this.adImg.visible = !1,
            this.txt_affiche.text = Tools.getMsgById("load_button_01"),
            this.txt_register.text = Tools.getMsgById("load_button_02"),
            this.txt_out.text = Tools.getMsgById("load_button_03"),
            this.txt_tel.text = Tools.getMsgById("load_button_04"),
            Tools.textFitFontSize(this.txt_register),
            Tools.textFitFontSize(this.txt_affiche),
            Tools.textFitFontSize(this.txt_out),
            Tools.textFitFontSize(this.txt_tel),
            ConfigApp.isTest = (<any>ConfigServer.system_simple).is_test,
            ConfigServer.checkIsChangeCurrPfTo(),
            Trace.isOn = ConfigApp.isTest || sg.map.utils.TestUtils.isTestShow;
        var t = ConfigApp.useMyLogin();
        Platform.initShare(),
            this.visible = !0,
            HtmlLoadClip.delLoad(),
            Trace.log("---是否是测试模式--m", ConfigApp.isTest),
            this.btn_register.visible = t,
            this.combox.visible = !0,
            this.btn_login.label = Tools.getMsgById("_lht49"),
            this.text_setting && (this.text_setting.text = Tools.getMsgById("_settings001")),
            this.btn_login.off("click", this, this.onClick_login),
            this.tuid.visible = ConfigApp.isTest,
            this.tAll.visible = ConfigApp.isTest,
            this.btn_login.visible = !1,
            this.btn_server.visible = !1,
            sg.model.ModelPlayer.instance.updateAll(!0),
            this.tuid.text = sg.model.ModelPlayer.instance.getUID(),
            this.isEnterGameUser = sg.model.ModelPlayer.instance.isTempPlayer;
        var i = sg.model.ModelPlayer.instance.isTempPlayer && !0;
        if (sg.model.ModelPlayer.instance.loginName = sg.model.ModelPlayer.instance.getName(), sg.model.ModelPlayer.instance.loginPwd = sg.model.ModelPlayer.instance.getPWD(), Laya.stage.on("viewload_login_frontcs", this, this.onClick_login), ConfigApp.isTest) {
            var e = "", n = sg.model.ModelPlayer.instance.mPlayerList;
            n && (e = ObjectUtil.keys(n).filter(function (t: any) {
                return !!n[t].uid;
            }).sort(function (t: any, i: any) {
                return n[i].times - n[t].times;
            }).join(",")),
                this.tAll.text = e,
                this.btn_login.visible = !ConfigApp.frontcs,
                this.btn_login.on("click", this, this.onClick_login, [200]),
                i && this.loginAuto(200);
        } else
            this.btn_login.on("click", this, this.onClick_login, [100]),
                ConfigApp.auser && "" != ConfigApp.auser ? (sg.model.ModelPlayer.instance.loginName = ConfigApp.auser, sg.model.ModelPlayer.instance.loginPwd = ConfigApp.auser, this.loginAuto(0)) : t ? i ? this.loginAuto(0) : (<any>ConfigServer.system_simple).is_fast_register && 1 == (<any>ConfigServer.system_simple).is_fast_register ? NetHttp.instance.send("user_zone.register_fast", { pf: ConfigApp.pf_channel }, Handler.create(this, this.registFast)) : ViewManager.instance.showView(ConfigClass.VIEW_LOGIN_CHOOSE) : this.checkPFLoginBySDK();
        this.setAgeNitce(),
            ConfigApp.frontcs && ((<any>Browser.window).frontcsIsNew ? (this.progressBox.visible = !0, this.adImg.visible = !0, this.bgBox.visible = !1) : this._showAffiche()),
            this.tuid.visible && this.stage.on("keyup", this, this._onKeyUp);
    }

    /** 回车/空格：有面板先关；tuid 聚焦时按 uid 匹配置 isCheckLoginHttp 后 loginAuto(200) */
    public _onKeyUp(t: any): void {
        var i = t.keyCode;
        if (13 === i || 32 === i) {
            if (ViewManager.instance.getCurrentPanel())
                return ViewManager.instance.closePanel();
            if (this.tuid.focus) {
                this.tuid.focus = !1;
                var e = this.tuid.text;
                e ? this.isCheckLoginHttp = e === String(sg.model.ModelPlayer.instance.getUID()) : this.tuid.focus = this.isCheckLoginHttp = !1,
                    this.loginAuto(200);
            } else
                this.tuid.focus = !0;
        }
    }

    /** SDK 平台登录入口（bgBox 点按重试） */
    public checkPFLoginBySDK(): void {
        this.bgBox.off("click", this, this.loginAgain),
            this.bgBox.on("click", this, this.loginAgain),
            sg.model.ModelPf.pf_login(this, ConfigApp.pf);
    }

    public loginAgain(): void {
        ModelManager.instance.modelUser.isLoginHttp || sg.model.ModelPf.pf_login(this, ConfigApp.pf);
    }

    /** 年龄角标（agev/ageh 布局 + fs_ad_37 动态 URL + 点击路由） */
    public setAgeNitce(): void {
        if (this.ageNotice && ConfigApp.agev) {
            var t = this.ageNotice;
            if (t.visible = !ConfigApp.frontcs, ConfigApp.ageh) {
                t.bottom = NaN,
                    t.left = NaN,
                    t.right = 18;
                var i = this.yybOut.visible || this.btn_register.visible ? 1 : 0;
                t.y = [12, 90][i];
            }
            t.offAll(),
                t.on("click", this, this.clickAgeNotice),
                "fs_ad_37" == ConfigApp.pf && (
                    t.visible = !1,
                    ToJava.callMethod("getAgeNoticeURL", null, Handler.create(null, function (i: any, e: any) {
                        var s = i.url;
                        s && "" != s && (
                            t.visible = !0,
                            t.scale(.24, .24),
                            t.skin = s);
                    })));
        }
    }

    public clickAgeNotice(): void {
        if (!ConfigApp.ageh)
            if (ConfigApp.agealert) ViewManager.instance.showView(["ViewAgeNotice", (<any>sg).view.init.ViewAgeNotice /* i8 */]);
            else if ((<any>ConfigServer.system_simple).age_notice_url) {
                var t = (<any>ConfigServer.system_simple).age_notice_url;
                (<any>Browser.window).openFrame && (<any>Browser.window).openFrame("  ", t);
            } else
                "fs_ad_37" == ConfigApp.pf && ToJava.callMethod("clickAgeNotice", null, null);
    }

    /** 登出：第三方绑定判断路由（绑定提示/换号列表/直接登出） */
    public click_logout(): void {
        var t = !1;
        if ("google" == ConfigApp.pf || "cb_google" == ConfigApp.pf || "cb_google1" == ConfigApp.pf || "cb_ios" == ConfigApp.pf || "cb_ad_mycard" == ConfigApp.pf || "ios_tw" == ConfigApp.pf || "cb_yuanqu_gg" == ConfigApp.pf || "cb_yuanqu_ios" == ConfigApp.pf) {
            var i = this;
            if ("" == sg.model.ModelPlayer.instance.getName())
                t = !0;
            else
                (<any>sg.activities.model.ModelPhone).isBindingFBorGG(sg.model.ModelPlayer.instance.getName()) ? ViewManager.instance.showAlert(Tools.getMsgById("_lht82"), function (t: any) { 0 == t && (SaveLocal.deleteObj("visitor_user_data"), sg.model.ModelPf.pf_logout(i, ConfigApp.pf)); })
                    : "google" == ConfigApp.pf || "ios_tw" == ConfigApp.pf ? ViewManager.instance.showAlert(Tools.getMsgById("_lht78"), function (t: any) { 0 == t && sg.model.ModelPf.pf_logout(i, ConfigApp.pf); })
                        : "cb_google" == ConfigApp.pf || "cb_google1" == ConfigApp.pf || "cb_ios" == ConfigApp.pf || "cb_ad_mycard" == ConfigApp.pf || "cb_yuanqu_gg" == ConfigApp.pf || "cb_yuanqu_ios" == ConfigApp.pf ? "cb_google" == ConfigApp.pf || "cb_google1" == ConfigApp.pf || "cb_yuanqu_gg" == ConfigApp.pf ? ViewManager.instance.showHintPanel(Tools.getMsgById("_lht83"), null, [{ name: Tools.getMsgById("_lht85"), handler: Handler.create(this, function () { ViewManager.instance.showView(ConfigApp.isLandscape ? ConfigClass.VIEW_LOGIN_CHOOSE_2_H : ConfigClass.VIEW_LOGIN_CHOOSE_2, i); }) }, { name: Tools.getMsgById("_lht84"), handler: Handler.create(this, function () { ViewManager.instance.showView(["ViewBinding", (<any>sg).view.init.ViewBinding /* n8 */]); }) }]) : ViewManager.instance.showView(["ViewBinding", (<any>sg).view.init.ViewBinding /* n8 */]) : t = !0;
        } else
            t = !0;
        t && sg.model.ModelPf.pf_logout(this, ConfigApp.pf);
    }

    public click_yyb(t: any): void {
        sg.model.ModelPf.pf_login(this, ConfigApp.pf, t);
    }

    /** 登录按钮：协议勾选前置 → 实名/防沉迷检查 → 100 直连 socket，否则 loginAuto */
    public onClick_login(t: any): void {
        Platform.uploadActionData(9, null),
            ConfigApp.isFirstInstall && Platform.uploadActionData(10004, null),
            "1" != ConfigApp.get_AgreementCfg() && "2" != ConfigApp.get_AgreementCfg() || this.btn_agree.selected
                ? sg.model.ModelAntiAddiction.instance.checkRealNameInGame() && sg.model.ModelAntiAddiction.instance.checkIndulge() && (
                    this.isClickedLoginBtn = !0,
                    100 == t ? this.initSocket(!0) : (this.tuid.text != sg.model.ModelPlayer.instance.getUID() && (this.isCheckLoginHttp = !1), this.loginAuto(t)))
                : this._alertAgreement();
    }

    /** 登录路由（2 手机 /200 uid /默认 username）后按 isCheckLoginHttp 决定 socket 直连 */
    public loginAuto(t: any): void {
        this.loginStatus = t;
        var i = this;
        (<any>Platform).login(Handler.create(i, function (e: any, s: any) {
            2 == t ? (i.loginByPhone(), i.initSocket(!1)) : 200 == t ? (i.loginByUserName("uid"), i.initSocket(!0)) : (i.loginByUserName("username"), i.initSocket(!1));
        }));
    }

    /** 公告显示：测试态改 uid 聚焦；is_note>0 且有公告数据时挂公告按钮+红点+首弹 */
    public _showAffiche(): void {
        if (sg.map.utils.TestUtils.mapEdit || sg.map.utils.TestUtils.isTestShow >= 3)
            this.tuid.focus = this.tuid.visible;
        else if (sg.model.ModelAntiAddiction.instance.checkRealNameInDay()) {
            var t = (<any>ConfigServer).notice.notice;
            if (t && t.length) {
                var i = (<any>ConfigServer.system_simple).is_note;
                i > 0 && (<any>sg.view.init.ViewAffiche).tabData.length && (
                    this.btn_affiche.visible = !ConfigApp.frontcs,
                    this.btn_affiche.on("click", this, this.click_affiche),
                    ModelGame.redCheckOnce(this.btn_affiche, (<any>sg.view.init.ViewAffiche).redCheck()),
                    1 === i && (<any>ConfigServer.system_simple).hasOwnProperty("use_new_notice") && (<any>ConfigServer.system_simple).use_new_notice ? ViewManager.instance.showView(ConfigClass.VIEW_AFFICHE1) : ViewManager.instance.showView(ConfigClass.VIEW_AFFICHE));
            }
        }
    }

    public _alertAgreement(): void {
        ViewManager.instance.showAlert(Tools.getMsgById("_agree05"), null, null, "", !0);
    }

    /** 协议勾选条装配（btn_checkok 皮肤 + innerHTML 文案 + link 路由） */
    public _showAgreement(): void {
        "" != ConfigApp.get_AgreementCfg() ? (
            this.box_agreement.visible = !0,
            this.btn_agree.visible = "0" != ConfigApp.get_AgreementCfg(),
            this.btn_agree.skin = "",
            this.btn_agree.skin = AssetsManager.getAssetsUI("btn_checkok.png"),
            this.btn_agree.clickHandler = new Handler(this, this._handleSelectedAgreement),
            this.btn_agree.selected = "2" == ConfigApp.get_AgreementCfg() || <any>SaveLocal.getValue("local_save_key_agreement", !1),
            this.txt_agree.visible = !0,
            (<any>this.txt_agree.style).color = "#fff",
            (<any>this.txt_agree.style).fontSize = 18,
            (<any>this.txt_agree.style).letterSpacing = 1,
            (<any>this.txt_agree.style).align = "center",
            (<any>this.txt_agree.style).wordWrap = !1,
            this.txt_agree.innerHTML = Tools.getMsgById("_agree02"),
            this.txt_agree.on("link", this, this._showAgreementContent),
            this.txt_agree.width = this.txt_agree.getBounds().width,
            this.box_agreement.width = this.box_agreement.getBounds().width)
            : this.box_agreement.visible = !1;
    }

    public _handleSelectedAgreement(): void {
        SaveLocal.save("local_save_key_agreement", this.btn_agree.selected, !1);
    }

    /** 协议/隐私全文：微信 showModal / 抖音 tt.showModal / 37 渠道 showFeature / openFrame 回退 */
    public _showAgreementContent(t: any): void {
        var i = this;
        "1" == t ? ConfigApp.releaseWeiXin() ? ConfigApp.pf == (<any>MiniAdpter.window).game37_pf && -1 === ConfigApp.pf.indexOf("cb_wx_37_cn") ? ViewManager.instance.showView(["ViewPrivacy", (<any>sg).view.init.ViewPrivacy /* N8 */], { data: t }) : LoadeManager.load(ConfigApp.get_Agreement(), Handler.create(this, function () {
            var t = Laya.loader.getRes(ConfigApp.get_Agreement());
            (<any>MiniAdpter.window).wx.showModal({ title: Tools.getMsgById("_agree01"), content: t, showCancel: !1, confirmText: Tools.getMsgById("_agree03"), success: function (t: any) { 1 == t.confirm && (i.btn_agree.selected = !0, SaveLocal.save("local_save_key_agreement", !0, !1)); } });
        })) : ConfigApp.releaseDouYin() ? LoadeManager.load(ConfigApp.get_Agreement(), Handler.create(this, function () {
            var t = Laya.loader.getRes(ConfigApp.get_Agreement());
            (<any>laya.tt.mini.TTMiniAdapter.window).tt.showModal({ title: Tools.getMsgById("_agree01"), content: t, showCancel: !1, confirmText: Tools.getMsgById("_agree03"), success: function (t: any) { t.confirm && (i.btn_agree.selected = !0, SaveLocal.save("local_save_key_agreement", !0, !1)); } });
        })) : "cb_ad_37_cn" == ConfigApp.pf ? ToJava.callMethod("showFeature", { type: "agreement" }, null) : "cb_ios_37_cn" == ConfigApp.pf || "ios_37_wx2" == ConfigApp.pf ? ToIOS.callFunc("showFeature", function (t: any) { }, { type: "agreement" }) : "fs_ad_37" == ConfigApp.pf ? ToJava.callMethod("showFeature", { type: "agreement" }, null) : (<any>Browser.window).openFrame("   ", ConfigApp.get_Agreement())
            : "2" == t && (ConfigApp.releaseWeiXin() ? ConfigApp.pf == (<any>MiniAdpter.window).game37_pf && -1 === ConfigApp.pf.indexOf("cb_wx_37_cn") ? ViewManager.instance.showView(["ViewPrivacy", (<any>sg).view.init.ViewPrivacy /* N8 */], { data: t }) : LoadeManager.load(ConfigApp.get_Privacy(), Handler.create(this, function () {
                var t = Laya.loader.getRes(ConfigApp.get_Privacy());
                (<any>MiniAdpter.window).wx.showModal({ title: Tools.getMsgById("_agree04"), content: t, showCancel: !1, confirmText: Tools.getMsgById("_agree03"), success: function (t: any) { 1 == t.confirm && (i.btn_agree.selected = !0, SaveLocal.save("local_save_key_agreement", !0, !1)); } });
            })) : ConfigApp.releaseDouYin() ? LoadeManager.load(ConfigApp.get_Privacy(), Handler.create(this, function () {
                var t = Laya.loader.getRes(ConfigApp.get_Privacy());
                (<any>laya.tt.mini.TTMiniAdapter.window).tt.showModal({ title: Tools.getMsgById("_agree04"), content: t, showCancel: !1, confirmText: Tools.getMsgById("_agree03"), success: function (t: any) { t.confirm && (i.btn_agree.selected = !0, SaveLocal.save("local_save_key_agreement", !0, !1)); } });
            })) : "cb_ad_37_cn" == ConfigApp.pf ? ToJava.callMethod("showFeature", { type: "privacy" }, null) : "cb_ios_37_cn" == ConfigApp.pf || "ios_37_wx2" == ConfigApp.pf ? ToIOS.callFunc("showFeature", function (t: any) { }, { type: "privacy" }) : "fs_ad_37" == ConfigApp.pf ? ToJava.callMethod("showFeature", { type: "privacy" }, null) : (<any>Browser.window).openFrame("   ", ConfigApp.get_Privacy()));
    }

    public loginByUserName(t: any): void {
        for (var i in this.loginPa = { uid: this.tuid.text, pf: ConfigApp.pf_channel, username: sg.model.ModelPlayer.instance.loginName, pwd: sg.model.ModelPlayer.instance.loginPwd }, this.loginPa.utype = t, this.loginPaOtherPf)
            this.loginPa[i] = this.loginPaOtherPf[i];
    }

    public loginByPf(t?: any): void {
        for (var i in void 0 === t && (t = !1), t ? (this.loginPa = { uid: "", pf: ConfigApp.pf, username: sg.model.ModelPlayer.instance.loginName, pwd: sg.model.ModelPlayer.instance.loginPwd }, this.loginPa.utype = "username") : this.loginPa = { uid: this.tuid.text, pf: ConfigApp.pf_channel, username: sg.model.ModelPlayer.instance.loginName, pwd: sg.model.ModelPlayer.instance.loginPwd }, this.loginPaOtherPf)
            this.loginPa[i] = this.loginPaOtherPf[i];
    }

    public loginByPhone(): void {
        for (var t in this.loginPa = { utype: "tel_sign", pf: ConfigApp.pf_channel, tel: sg.model.ModelPlayer.instance.getPhone(), sign: sg.model.ModelPlayer.instance.getPhoneCode() }, this.loginPaOtherPf)
            this.loginPa[t] = this.loginPaOtherPf[t];
    }

    /** isCheckLoginHttp 已验 → 直连 socket；否则 initUserLogin(httpLogin) */
    public initSocket(t: any): void {
        t && this.isCheckLoginHttp ? this.loginSocket()
            : (ModelManager.instance.modelUser.isLoginHttp = !1,
                ModelManager.instance.modelUser.initUserLogin(this.loginPa, Handler.create(this, this.httpLogin), t),
                this.setAgeNitce());
    }

    /** HTTP 登录回包：区服解析（getServerZones→zone 匹配→h5_37 ext 校验→setCurrZone 回退）、
     *  自动进区/公告/防沉迷 init、h5_hutao 悬浮窗 */
    public httpLogin(t: any, i?: any): void {
        if (void 0 === i && (i = !1), i)
            this.btn_affiche.visible = !1;
        else {
            NetHttp.instance.checkArea(),
                this.tuid.text = sg.model.ModelPlayer.instance.getUID(),
                this.btn_login.visible = !ConfigApp.frontcs,
                this.yybBox.visible = !1,
                this.googleBox.visible = !1,
                this.twBox.visible = !1,
                this.isCheckLoginHttp = !0,
                this.btn_server.visible = !ConfigApp.frontcs;
            var e = sg.model.ModelPlayer.instance.getServerZones(),
                n = e.split("|"),
                h = !0,
                o = !1;
            if (n && n.length > 0 && e) {
                for (var r = null, a = n.length; a > 0; a--)
                    if (ConfigServer.zone[n[a - 1]]) {
                        r = n[a - 1];
                        break;
                    }
                r ? this.event_server_select_change(n[n.length - 1]) : h = !1;
            } else
                h = !1;
            if (h && "h5_37" == ConfigApp.pf) {
                var l = Platform.get37h5_app_ext();
                ModelManager.instance.modelUser.mUserCode && l && ModelManager.instance.modelUser.mUserCode != l && 1 != Number(l) && (h = !1);
            }
            if (!h) {
                sg.model.ModelPlayer.instance.setCurrZone("");
                var c = sg.model.ModelPlayer.instance.getCurrZone();
                Tools.isNullString(c) ? (this.btn_login.visible = !1, this.btn_server.visible = !1) : this.event_server_select_change(c);
            }
            this.loginStatus >= 0 ? (o = !0, ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht51"))) : -1 == this.loginStatus && ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht50"));
            var u = this;
            if (!this.isClickedLoginBtn && !this.isEnterGameUser && o && ConfigApp.atOnceLoginToEnter() ? this.timer.once(100, null, function () { u.onClick_login(100); }) : ConfigApp.frontcs ? (<any>Browser.window).frontcsIsNew ? Laya.timer.once(200, null, function () { Laya.stage.event("viewload_login_frontcs", 100); }) : Laya.stage.event("viewload_httplogin_ok") : this._showAffiche(), "h5_hutao" == ConfigApp.pf || "h5_hutao2" == ConfigApp.pf) {
                var d = ModelManager.instance.modelUser.accountId;
                (<any>Platform.h5_sdk_obj).float(d[0], d[1]),
                    (<any>Platform.h5_sdk_obj).registerLogout(Platform.restart);
            }
            ConfigApp.frontcs || this._showAgreement(),
                sg.model.ModelAntiAddiction.instance.init(),
                sg.model.ModelAntiAddiction.instance.checkRealNameInDay(!0);
        }
    }

    /** socket 直连：zone 服务器地址/端口 + 开服时间校验（未开走 _lht54 提示） */
    public loginSocket(): void {
        var t = ConfigServer.zone[Tools.getMyLoginZoneID()],
            i = t[1],
            e = ConfigServer.getServerTimer(),
            s = Tools.getTimeStamp(t[2]);
        e < s ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht54", [Tools.getTimeStyle(s - e)])) : i[0] && 0 != i[1] ? (NetSocket.instance.off("event_socket_opened", this, this.event_socket_opened), NetSocket.instance.on("event_socket_opened", this, this.event_socket_opened), NetSocket.instance.setURLtoConnect(i[0], i[1], ConfigApp.useSSL())) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht81"));
    }

    public event_socket_opened(): void {
        NetSocket.instance.off("event_socket_opened", this, this.event_socket_opened),
            ModelManager.instance.modelUser.loginSocket(),
            this.clear(),
            (<any>sg.fight.client.cfg.ConfigFightView).enterZone(),
            Laya.stage.offAll("viewload_login_frontcs"),
            Laya.stage.offAll("viewload_httplogin_ok");
    }

    public registUserFastByFirst(): void {
        NetHttp.instance.send("user_zone.register_fast", { pf: ConfigApp.pf_channel }, Handler.create(this, this.registFast));
    }

    public registFast(t: any): void {
        NetHttp.checkReIsError(t) ? ViewManager.instance.showTipsTxt(t.msg)
            : (Platform.checkGameStatus(201),
                ThirdRecording.setRegister(),
                sg.model.ModelPlayer.instance.loginName = t.username,
                sg.model.ModelPlayer.instance.loginPwd = t.pwd,
                sg.model.ModelPlayer.instance.event("event_login_ok", -1));
    }

    /** 收尾：隐藏、清计时/装载事件、销毁进度件、isLoadView 复位 */
    public clear(): void {
        Trace.log("ViewLoad clear"),
            this.visible = !1,
            this.mBgClip.removeChildren(),
            this.stage.off("keyup", this, this._onKeyUp),
            Laya.loader.off("error", this, this.onError),
            Laya.loader.off("complete", this, this.onConfigComplete),
            Laya.loader.off("progress", this, this.onConfigProgress),
            Laya.loader.off("complete", this, this.onOtherComplete),
            Laya.loader.off("progress", this, this.onOtherProgress),
            this.timer.clear(this, this.onFrameLoop),
            this.timer.clear(this, this.playBgClip),
            this.progressAni && (
                this.progressAni.destroy(),
                this.progressAni = null),
            this.progressImg && (
                this.progressImg.destroy(),
                this.progressImg = null),
            (<any>ViewManager).isLoadView = !1;
    }

    /** r(0,e,"newVersion",getter) —— 强更判定：本地 new_version 与 loading_show 三元组比对 */
    get newVersion(): boolean {
        var t = <any>SaveLocal.getValue("new_version") || 0,
            i = Boolean(<any>SaveLocal.getValue("local_save_key_user")),
            e = (<any>ConfigServer.system_simple).loading_show;
        return e instanceof Array && (this.new_version = e[0], this.update_duration = e[1] / 1e3, this.update_tips = Tools.getMsgById(e[2])),
            !!(i && this.new_version && t < this.new_version) || (!t && this.new_version && SaveLocal.save("new_version", this.new_version), !1);
    }
}

/**
 * 注册身份等价物：原文 return …,o(i,"sg.view.init.ViewLoad",t), …（t=BW=ui.init.viewLoadUI，`}(BW)` 实测）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewLoad, "sg.view.init.ViewLoad", null, null);
