/**
 * sg.guide.model.ModelGuide —— 新手/条件引导调度器（forceGuide 登录 send 链 NetSocket.send:214
 * 无条件调用；isNewPlayerGuide/getGuideAssets 主线引导判定；executeGuide 条件引导执行入口；
 * instance 惰性单例，ctor 装配 GuideChecker 并挂 do_guide/all_over 监听）。
 *
 * 原文：code1.js 字节 [1274185,1278661]（4,476B；包装变量 js，基类 i=T=laya.events.EventDispatcher，
 * 池化 3 参注册 o(h,e(18180),i)，e(18180)→pool[17965]="sg.guide.model.ModelGuide"，off 1274575）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-q/ModelGuide.js
 *
 * 批次 Q 入批原因：NetSocket.send:214 `sg.guide.model.ModelGuide.forceGuide()` 无条件调用
 * （批次 I §9 #1 登记死点）——SDK 回包成功臂登录 send 100% 触达；forceGuide 首语句
 * `zs.inited` 静态读要求 GuideChecker 类对象在位（本批双类闭合）。
 * 依赖：zs=GuideChecker（本批次类直引）、cs=ObjectUtil、Kr=ModelUser(getCountryID 静态)、
 * ue=ModelManager、tn=ViewManager、vs=Tools、be=TestUtils、as=MusicManager、Gt=ConfigServer
 * （批次 A/B/C/D/K 模块直引）；P=laya.utils.Handler、s=laya 工厂命名空间→Laya.timer（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：sp=sg.guide.view.ViewGuide（waitASecond arrow）、
 * xn=sg.scene.view.InputManager（doGuide/guideOver canDrag）。
 */
import Handler = laya.utils.Handler;
import { GuideChecker } from "./GuideChecker";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ModelUser } from "../../model/ModelUser";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { MusicManager } from "../../utils/MusicManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { Tools } from "../../utils/Tools";

export class ModelGuide extends laya.events.EventDispatcher {

    public guideKeys: any = null;
    public inited: boolean = !1;
    public country: number = 0;
    public buildArray: any = null;
    public checker: any;

    constructor() {
        super();
        this.checker = GuideChecker.instance,
            this.guideKeys = ObjectUtil.keys(ModelGuide).filter(function (t: any) { return 0 === t.indexOf("GUIDE_") }).map(function (t: any) { return ModelGuide[t] }),
            this.checker.on("do_guide", this, this.beforeDoGuide),
            this.checker.on("all_over", this, this.guideOver);
    }

    public beforeDoGuide(): void {
        Laya.timer.callLater(this, this.doGuide, [this.checker.guideIndex]);
    }

    public doGuide(t?: any): void {
        if (this.checker._guideID) {
            this.lockScreen = !0,
                this.country = ModelUser.getCountryID(),
                sg.scene.view.InputManager.instance.canDrag = !1;
            var s: any = this.checker.getCurrentGuideData();
            TestUtils.isTestShow && console.log("%c 执行引导 " + t, "color:yellow;font-size:16px", s);
            var n: any = s.need;
            if (n instanceof Array && this.needInterrupt(n)) this.guideOver();
            else for (var h: any = ObjectUtil.keys(s), o = 0, r = (h = (h = this.guideKeys.filter(function (t: any) { return -1 !== h.indexOf(t) })).reverse()).length; o < r; o++) this.doGuideReal(h[o], s);
        }
    }

    public needInterrupt(t: any): any {
        var s = this,
            n: any = ModelManager.instance.modelUser.data,
            h: any = t.filter(function (t: any) {
                if (!(t instanceof Array)) return !1;
                var h = t[0];
                return !s.compare(n, h);
            });
        if (h.length) {
            var o = h[0];
            o[1] && ViewManager.instance.showTipsTxt(Tools.getMsgById(o[1], o[0]));
        }
        return !!h.length;
    }

    public compare(t: any, i: any): any {
        if (typeof i == "object") {
            for (var n in i) if (!this.compare(t[n], i[n])) return !1;
            return !0;
        }
        return typeof i == "string" ? t === i : typeof i == "number" && t >= i;
    }

    public doGuideReal(t: any, i: any): void {
        switch (t) {
            case "talks": this.showTalk(i[t]); break;
            case "save": this.nextStep(); break;
            case "delay": this.waitASecond(i[t]); break;
            case "in_battle": this.event("in_battle"); break;
            case "alien_first": this.firstAlien(); break;
            case "sound": MusicManager.playSoundUI(i[t]); break;
            default:
                t !== "recruit_hero" && (i = i[t]),
                    this.event(t, [ObjectUtil.clone(i)]);
        }
    }

    public showTalk(t: any): void {
        this.event("talks"),
            !(t instanceof Array) && (t = t[ModelManager.instance.modelUser.country]),
            ViewManager.instance.showHeroTalk(t, Handler.create(this, this.nextStep));
    }

    public firstAlien(): void {
        ModelManager.instance.modelGame.checkPKnpcTimer(1e3),
            this.nextStep();
    }

    public waitASecond(t: any): void {
        var n: any = sg.guide.view.ViewGuide.instance.arrow;
        t > 100 && n && n.resetArrow(),
            Laya.timer.once(t, this, this.nextStep);
    }

    public nextStep(): void {
        TestUtils.isTestShow && console.log("%c 引导 " + this.checker.guideIndex + " 执行结束", "color:green;font-size:16px"),
            this.lockScreen = !0,
            this.checker.continueGuide();
    }

    public guideOver(): void {
        this.lockScreen = !1,
            sg.scene.view.InputManager.instance.canDrag = !0,
            this.event("all_over");
    }

    /** r(0,a,"lockScreen",null,setter) —— getter 为 null 的 setter-only getset（求值序等价直译） */
    public set lockScreen(t: any) {
        this.event("lock_screen", [t]);
    }

    /** r(1,h,"instance",getter,laya.events.EventDispatcher._$SET_instance) —— 惰性静态单例（批次 K 定案形态） */
    public static get instance(): ModelGuide {
        return ModelGuide.sModel = ModelGuide.sModel || new ModelGuide();
    }

    public static isNewPlayerGuide(): any {
        if (!GuideChecker.inited) return !1;
        var i: any = ModelGuide.instance.checker;
        return !(!i || !i.canGuide) && ModelGuide.instance.checker.guideType === "main";
    }

    public static getGuideData(t?: any): any {
        return ModelManager.instance.modelUser.isLogin ? ModelGuide.instance.checker.getSaveData(t) : null;
    }

    public static forceGuide(): any {
        if (!GuideChecker.inited) return !1;
        var i: any = ModelGuide.instance.checker;
        return i && i.canGuide && i.force;
    }

    public static battleOver(): void {
        ModelGuide.forceGuide() && ModelGuide.instance.nextStep();
    }

    public static checkGuideDataWithKey(t?: any): any {
        return GuideChecker.instance.canGuide && Boolean(ModelGuide.instance.checker.checkGuideDataWithKey(t));
    }

    public static alreadyGuide(t?: any): any {
        return !ModelGuide.instance.checker.canGuide || t && GuideChecker.instance.isGuideAlreadyExecute(t);
    }

    public static executeGuide(t?: any, i?: any): void {
        if (void 0 === t && (t = ""), void 0 === i && (i = !0), ModelGuide.instance.checker.canGuide) {
            if (t) {
                if (!ConfigServer.guide[t]) return void (TestUtils.isTestShow && console.info("%c 缺少条件引导配置: " + t, "color:#fff000;font-size:16px"));
                TestUtils.isTestShow && console.info("%c 执行引导: " + t, "color:#fff000;font-size:16px");
            }
            if (0 != i) {
                ModelManager.instance.modelUser;
                if (ModelGuide.instance.checker.canGuide && !ModelGuide.forceGuide()) ModelGuide.instance.checker.initConditionGuide(t) && -1 === ["awaken_guide", "animal_guide", "gwentbattle_guide"].indexOf(t) && ViewManager.instance.closePanel(),
                    ModelManager.instance.modelGame.event("event_hide_chat");
            } else ModelGuide.instance.checker.initConditionGuide(t);
        }
    }

    public static executeWhenGuideOver(t: any): void {
        ModelGuide.instance.checker.once("all_over", ModelGuide.instance, function () { t.run(); });
    }

    public static getGuideAssets(): any {
        var i: any = ModelManager.instance.modelUser;
        i.records.guide;
        return ModelGuide.isNewPlayerGuide() ? ConfigServer.system_simple[i.use_ctask ? "AssetsNewGuide2" : "AssetsNewGuide"] : null;
    }

    public static GUIDE_NEED: string = "need";
    public static GUIDE_GOTO: string = "goto";
    public static GUIDE_CLICK: string = "click";
    public static GUIDE_DRAG: string = "drag";
    public static GUIDE_IMAGE: string = "image";
    public static GUIDE_TALK: string = "talks";
    public static GUIDE_RECRUIT: string = "recruit_hero";
    public static GUIDE_USEPROP: string = "use_prop";
    public static GUIDE_ALIEN: string = "alien_first";
    public static GUIDE_SEND_METHOD: string = "send_method";
    public static GUIDE_CHANGE_SEASON: string = "change_season";
    public static GUIDE_SAVE: string = "save";
    public static GUIDE_DELAY: string = "delay";
    public static GUIDE_BATTLE: string = "in_battle";
    public static GUIDE_SOUND: string = "sound";
    public static GUIDE_PAUSE: string = "pause";
    public static GUIDE_DRAG_READY: string = "guide_drag_ready";
    public static GUIDE_DRAG_START: string = "guide_drag_start";
    public static GUIDE_DRAG_END: string = "guide_drag_end";
    public static LOCK_SCREEN: string = "lock_screen";
    public static SINGLE_OVER: string = "single_over";
    public static ALL_OVER: string = "all_over";
    public static sModel: ModelGuide = null;
}

/**
 * 注册身份等价物：原文 o(h,e(18180),i)（池化 3 参，基类 i=T=laya.events.EventDispatcher；
 * e(18180)→pool[17965]="sg.guide.model.ModelGuide"，locate_q.js 池串交叉证）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelGuide, "sg.guide.model.ModelGuide", null, null);
