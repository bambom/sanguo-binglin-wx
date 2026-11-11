/**
 * sg.guide.view.ViewGuide —— 新手/条件引导视图总控（ModelGuide 事件面板：hintClick/hintDrag
 * 按配置查找点击目标（ui/scene/panel/city/building/homeEffect/hero_list 七路）并挂点击推进；
 * getClickRect/getHitArea 命中区计算；拖拽引导三段回调；gotoSomeWhere 建筑跳转气泡隐藏；
 * 引导期网络收发等待（waitMethodReceive/_methodReceived）与超时；instance 为 ctor 急切自写
 * 静态（原文 i.instance=this，非惰性 getset））。
 *
 * 原文：code1.js 字节 [3548613,3562241]（13,628B；包装变量 sp，基类 t=s_=sg.view.ViewBase，
 * 明文 3 参注册 o(i,"sg.guide.view.ViewGuide",t)，off 3549804；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/ViewGuide.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（ModelGuide.waitASecond
 * `sg.guide.view.ViewGuide.instance.arrow` 引导链；GuideChecker.startGuide → do_guide →
 * ModelGuide.doGuide → 各 event 面板位）。
 * 依赖（已译真类直引）：s_=ViewBase（基类）、El=GuideArrow、Ul=ClickContainer、C5=ViewBigmage
 * （本批次类）、js=ModelGuide、zs=GuideChecker（批次 Q）、ue=ModelManager、tn=ViewManager、
 * cs=ObjectUtil、Gt=ConfigServer、Rt=ConfigApp、Ht=ConfigClass、Ze=ArrayUtil、No=MapModel、
 * lr=ModelGame、pn=NetSocket、vs=Tools、Ut=Platform；et=laya.maths.Point、
 * ht=laya.maths.Rectangle、P=laya.utils.Handler、Z=laya.debug.tools.ObjectTools（引擎）；
 * s=Laya（timer）。
 * 批次外（ambient 全局路径，延迟调用面）：Dt=sg.boundFor.GotoManager、
 * Ku=sg.map.view.MapViewMain、Mtt=sg.view.task.ViewNewChapter、Ve=sg.scene.constant.
 * ConfigConstant、Ye=sg.scene.view.MapCamera（cID/bID static 缺口 (<any>) cast——批次 D/J
 * 先例）、ea=sg.puppet.model.ModelPuppetMap、pu=sg.view.wineshop.view.WineshopMap（instance
 * static 缺口 cast）、Yc=sg.puppet.view.PuppetMap（instance static 缺口 cast）、
 * qi=sg.guide.view.GuideFocus（focusIn static 缺口 cast；focusOut 已声明）、
 * xn=sg.scene.view.InputManager、ui.home.HomeMenuItemUI、sg.scene.view.ui.Bubble、
 * sg.map.model.entitys.EntityCity、sg.scene.view.entity.EntityClip、
 * sg.map.view.entity.EstateParkClip、sg.homeland.view.HomeLandBuild、
 * sg.view.effect.EffectUIBase；类内两处 sg.guide.view.ViewGuide 全局路径自引保留原文形态。
 */
import Point = laya.maths.Point;
import Rectangle = laya.maths.Rectangle;
import Handler = laya.utils.Handler;
import ObjectTools = laya.debug.tools.ObjectTools;
import { ViewBase } from "../../view/ViewBase";
import { GuideArrow } from "./GuideArrow";
import { ClickContainer } from "./ClickContainer";
import { ViewBigmage } from "./ViewBigmage";
import { ModelGuide } from "../model/ModelGuide";
import { GuideChecker } from "../model/GuideChecker";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewManager } from "../../manager/ViewManager";
import { ModelManager } from "../../manager/ModelManager";
import { NetSocket } from "../../net/NetSocket";
import { Tools } from "../../utils/Tools";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { MapModel } from "../../map/model/MapModel";
import { ModelGame } from "../../model/ModelGame";
import { Platform } from "../../laya/Platform";

export class ViewGuide extends ViewBase {

    public clickContainer: ClickContainer = null;
    public sceneMain: any = null;
    public currentView: any = null;
    public rect: any = null;
    public _finding: boolean = !1;
    public _findingPanel: boolean = !1;
    public guideConfig: any = null;
    public _currentButton: any = null;
    public _removeEvents: any = null;
    public _dragGuide: boolean = !1;
    public _bubbleLayer: any = null;
    public arrow: GuideArrow;
    public model: ModelGuide;

    constructor() {
        super();
        this.arrow = GuideArrow.instance,
            this.model = ModelGuide.instance,
            ViewGuide.instance = this,
            this.clickContainer = new ClickContainer(),
            this.mouseThrough = !0,
            this.addChild(this.clickContainer),
            this.model.on("goto", this, this.gotoSomeWhere),
            this.model.on("image", this, this.showImage),
            this.model.on("talks", this, this.showTalk),
            this.model.on("pause", this, this.pauseGuide),
            this.model.on("click", this, this.hintClick),
            this.model.on("drag", this, this.hintDrag),
            this.model.on("recruit_hero", this, this.recruitHero),
            this.model.on("use_prop", this, this.useProp),
            this.model.on("send_method", this, this.sendMethod),
            this.model.on("change_season", this, this.changeSeason),
            this.model.on("alien_first", this, this.nextStep),
            this.model.on("in_battle", this, this._inBattle),
            this.model.on("lock_screen", this, this._lockScreen),
            this.model.on("all_over", this, this.removeGuide),
            Laya.timer.frameLoop(1, this, this._onFrameLoop),
            this.init(),
            this.setBounds(new Rectangle(0, 0, Laya.stage.width, Laya.stage.height));
    }

    public _operateSprite(t: any, i: any): void {
        if (!(i.length < 3)) {
            var e: any = this.getClickSprite(t, i[0]);
            if (e) if ("function" == typeof e[i[1]]) e[i[1]].apply(e, i.slice(2));
            else {
                for (var s = i[1].split("."), n = s.length, h = 0; h < n; h++) e[s[h]] instanceof laya.display.Sprite && (e = e[s[h]]);
                e[s[n - 1]] = i[2];
            }
        }
    }

    public _onFrameLoop(): void {
        if (this._finding && this.guideConfig) {
            var t: any = this.guideConfig,
                i = t.type,
                e = t.objName,
                s: any = this.getClickSprite(i, e);
            if (t.operate) {
                var n: any = t.operate;
                if (n[0] instanceof Array) for (var h = n.length, o = 0; o < h; o++) this._operateSprite(i, n[o]);
                else this._operateSprite(i, n);
            }
            if ("list_0_btnAdd" === e && s && !1 === s.visible) return this.guideConfig = null, this.nextStep();
            s && s.parent && s.visible && (this._clearTimeout(), this._dragGuide ? (this._dragGuide = !1, this._initDragGuide(t, s)) : (this.rect = this.getClickRect(i, s), this._hintRect(s, this.rect, t), this.currentView || this.addEventToButton(s)));
        } else this._findingPanel && this.findPanel();
    }

    public _initDragGuide(t: any, i: any): void {
        var e: any = ViewManager.instance.getCurrentScene();
        e.guideDrag(t.objName, t.data),
            e.on("guide_drag_ready", this, this._dragReady, [t, i]),
            e.on("guide_drag_start", this, this._dragStart),
            e.once("guide_drag_end", this, this._dragEnd, [e]);
    }

    public _dragReady(t: any, i: any): void {
        var e: any = this._getScale(i),
            s = i.width * e[0],
            n = i.height * e[1],
            h = Math.max(.1 * s, 1);
        this.rect = new Rectangle(h, h, s - 2 * h, n - 2 * h),
            this._hintRect(i, this.rect, t);
    }

    public _dragStart(): void {
        this._lockScreen(!0);
    }

    public _dragEnd(t: any): void {
        t.off("guide_drag_ready", this, this._dragReady),
            t.off("guide_drag_start", this, this._dragStart),
            this._checkSave();
    }

    public _lockScreen(t: any): void {
        this.hide(),
            t && this.clickContainer.lock(),
            t || this.clickContainer.unlock(),
            t || ModelGame.stageLockOrUnlock("do_guide", !1, !0);
    }

    public gotoSomeWhere(t: any): void {
        var i = this;
        delete t.state, delete t.secondMenu, this.arrow.resetArrow();
        var e = this;
        if (Laya.timer.once(50, this, function () { sg.boundFor.GotoManager.boundFor(t, Handler.create(e, i.nextStep)) }), 2 === t.type) {
            var n = t.buildingID,
                h = t.hide_bubble;
            n && h && Laya.timer.once(60, this, function () {
                i._bubbleLayer = ViewManager.instance.sceneMain.mapLayer.bubbleLayer,
                    i._bubbleLayer.visible = !1,
                    GuideChecker.instance.once("STEP_OVER", sg.guide.view.ViewGuide.instance, i.showBubbleLayer);
            });
        }
    }

    public showBubbleLayer(): void {
        this._bubbleLayer && this._bubbleLayer.destroyed && (this._bubbleLayer.visible = !0),
            this._bubbleLayer = null;
    }

    public hintClick(t: any): void {
        if (this._lockScreen(!0), 0 === ObjectUtil.keys(t).length) return this._startFinding(!0);
        this.guideConfig = t, t.arrow || this.arrow.resetArrow();
        var i = 1;
        "city" !== t.type && "building" !== t.type || (i = 500),
            Laya.timer.once(i, this, this._startFinding);
    }

    public hintDrag(t: any): void {
        this._dragGuide = !0,
            this.hintClick(t);
    }

    public _startFinding(t?: any): void {
        void 0 === t && (t = !1),
            t ? (this._findingPanel = !0, this.arrow.resetArrow()) : this._finding = !0,
            this._checkTimeout();
    }

    public _checkTimeout(): void {
        var t = GuideChecker.instance.guideConfig.timeout || 5e3;
        Laya.timer.once(t, this, this._timeout);
    }

    public _clearTimeout(): void {
        this._finding = this._findingPanel = !1,
            Laya.timer.clear(this, this._timeout);
    }

    public _timeout(): void {
        this._clearTimeout(),
            GuideChecker.instance.timeout(),
            ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0207"));
    }

    public _hintRect(t: any, i: any, e: any): void {
        var n = this;
        Laya.timer.once(e.waitTime || 100, this, function () {
            n.clickContainer.hide(),
                e.rect && (<any>sg.guide.view.GuideFocus).focusIn(t, i, !1),
                e.arrow && n.arrow.show(i, t),
                n.clickContainer.show(t, i, e);
        });
    }

    public changeSeason(t: any): void {
        var i = t.season;
        -1 === i && (i = ModelManager.instance.modelUser.getGameSeason()),
            t.image && ViewManager.instance.showView(["ViewBigmage", ViewBigmage], { image: t.image, handler: Handler.create(this, this.nextStep) });
        var e = this;
        Laya.timer.once(1e3, this, function () { ViewManager.changeSeason(i, Handler.create(e, e.getSceneMain)) });
    }

    public showImage(t: any): void {
        if (this._lockScreen(!1), this.arrow.resetArrow(), t.txt) ViewManager.instance.showView(ConfigClass.VIEW_GUIDE_IMAGE, t);
        else if (ConfigApp.isLandscape) {
            if (t.chapter_id) {
                var i: any = ConfigServer.ctask.chapter["chapter_" + t.chapter_id],
                    e = { autoClose: 0, chapter_id: "chapter_" + t.chapter_id, next: t.next, break_index: i.talks_break, skin: i.chapter_map, titleSkin: i.chapter_title };
                ViewManager.instance.showView(ConfigClass.VIEW_CHAPTER_OPEN, e);
            }
        } else ViewManager.instance.showView(["ViewNewChapter", sg.view.task.ViewNewChapter], { skin: t.url, next: t.next });
    }

    public showTalk(): void {
        this.arrow.resetArrow(),
            this._lockScreen(!1);
    }

    public pauseGuide(t: any): void {
        this.arrow.resetArrow(),
            this._lockScreen(!1),
            sg.scene.view.InputManager.instance.canDrag = !0,
            ModelManager.instance.modelGame.inHome ? ModelManager.instance.modelGame.once("event_go_map", this, this.nextStep) : this.nextStep();
    }

    public recruitHero(t: any): void {
        var i = this,
            e = t.recruit_hero;
        this.arrow.resetArrow(),
            GuideChecker.instance.checkCanSaveGuide(),
            NetSocket.instance.send("recruit_hero", { hid: e }, Handler.create(this, function (e: any) {
                var s: any = ModelManager.instance.modelGame.getModelHero(e.sendData.hid);
                ModelManager.instance.modelUser.updateData(e.receiveData),
                    t.notPlay ? GuideChecker.instance.guideIndex += 3 : sg.boundFor.GotoManager.boundForPanel("hero_get_new", s.id),
                    i.nextStep();
            }));
    }

    public useProp(t: any): void {
        var i = this,
            e = t[0],
            s = t[1];
        this.arrow.resetArrow(),
            GuideChecker.instance.checkCanSaveGuide(),
            ModelManager.instance.modelProp.userPropSocket(e, s, -1, function () { i.nextStep() });
    }

    public sendMethod(t: any): void {
        this.arrow.resetArrow(),
            GuideChecker.instance.checkCanSaveGuide(),
            NetSocket.instance.send(t[0], t[1], Handler.create(this, this.sendCB));
    }

    public sendCB(t: any): void {
        var i: any = t.receiveData.gift_dict;
        ModelManager.instance.modelUser.updateData(t.receiveData),
            i && ViewManager.instance.showRewardPanel(i),
            this.nextStep();
    }

    public nextStep(): void {
        this.hide(),
            this.model.nextStep();
    }

    public _inBattle(): void {
        this.arrow.resetArrow(),
            this._lockScreen(!1);
    }

    public getClickSprite(t: any, i: any): any {
        var e: any = null;
        switch (t) {
            case "ui":
                ViewManager.instance.sceneMain instanceof sg.puppet.view.PuppetMap ? (<any>sg.puppet.view.PuppetMap).instance.menuPuppet && (e = (<any>sg.puppet.view.PuppetMap).instance.menuPuppet.getButton(i)) : ViewManager.instance.sceneMain instanceof sg.view.wineshop.view.WineshopMap ? (<any>sg.view.wineshop.view.WineshopMap).instance.menWineshop && (e = (<any>sg.view.wineshop.view.WineshopMap).instance.menWineshop.getButton(i)) : e = ViewManager.instance.mLayerMenu.getButton(i);
                break;
            case "scene":
                var s: any = ViewManager.instance.getCurrentScene();
                if (!s) return null;
                e = s.getSpriteByName(i);
                break;
            case "panel":
                var n: any = ViewManager.instance.getCurrentPanel();
                if (!n) return null;
                e = n.getSpriteByName(i);
                break;
            case "city":
                e = i instanceof Array ? this.getViewByCityID(parseInt(i[this.model.country])) : this.getViewByCityType(parseInt(i));
                break;
            case "building":
                e = -1 != i.indexOf("building") ? this.getViewByBuildingID(i) : this.getViewByBuildType(i);
                break;
            case "homeEffect":
                e = this.getHomeEffectByName(i);
                break;
            case "homeland":
            default:
                break;
            case "hero_list":
                e = ViewManager.instance.mLayerMenu.getTroop(parseInt(i));
        }
        return e;
    }

    public getClickRect(t: any, i: any): Rectangle {
        var e = new Point(i.x, i.y);
        ObjectTools.isNumber(i.centerX) && (e.x = (i.parent.width - i.width * i.scaleX) / 2 + i.centerX);
        var s = 0, n = 0, h = 0, o = 0,
            r: any = MapModel.instance.mapGrid;
        if (i.parent.localToGlobal(e), s = 0, n = 0, i instanceof ui.home.HomeMenuItemUI) s = (h = .8 * i.width) * (1 - .8) * .5, n = (o = .8 * i.height) * (1 - .8) * .5;
        else if ("city" === t) {
            if (i instanceof sg.scene.view.ui.Bubble) s = .5 * -(h = 60), n = -(o = 70);
            else if (i instanceof sg.map.model.entitys.EntityCity) h = i.entity.width, o = i.entity.height;
            else if (i instanceof sg.scene.view.entity.EntityClip) {
                h = .5 * r.gridW, o = .5 * r.gridH, s = .5 * (r.gridW - h), n = .5 * (r.gridH - o),
                    i instanceof sg.map.view.entity.EstateParkClip && (s = .5 * -h, n = .5 * -o);
            }
        } else if ("building" === t || "homeEffect" === t) i instanceof sg.scene.view.ui.Bubble ? (s = .5 * -(h = 60), n = -(o = 70)) : (i instanceof sg.scene.view.entity.EntityClip || i instanceof sg.homeland.view.HomeLandBuild) && (s = .5 * -(h = 80), n = .5 * -(o = 60));
        else {
            var a: any = this._getScale(i);
            h = i.width * a[0], o = i.height * a[1];
        }
        return h = Math.max(h, 20), o = Math.max(o, 20), new Rectangle(s + 1, n + 1, h - 2, o - 2);
    }

    public _getScale(t: any): any {
        for (var i = 1, e = 1; t instanceof laya.display.Sprite && t.parent && t.parent instanceof laya.display.Sprite && !(t.parent instanceof laya.display.Stage);) i *= t.scaleX, e *= t.scaleY, t = t.parent;
        return [i, e];
    }

    public addEventToButton(t: any): void {
        var i = t.parent;
        i && i.parent && i.parent instanceof laya.ui.List && i.offAll(),
            this._currentButton = t;
        var e = "click";
        t.name.match(/book_\d/) && (e = "mousedown"),
            t.once(e, this, this._onClickButton);
        var s: any = t.getEvents()[e];
        if (s instanceof Array) {
            var n = s.pop();
            s.splice(0, 0, n);
        }
    }

    public getViewByCityID(t: any): any {
        var i: any = MapModel.instance.citys[t].view;
        return this.currentView = i, i;
    }

    public getViewByBuildingID(t: any): any {
        var i: any = sg.boundFor.GotoManager.getBuild(t);
        return this.currentView = i, i;
    }

    public getViewByCityType(t: any): any {
        var i: any = null,
            e: any = (<any>sg.scene.view.MapCamera).cID,
            s: any = MapModel.instance.citys[e],
            n: any = s.view;
        if (!n) return null;
        var h: any = ArrayUtil.find(n.scene.mapLayer.menu.menus, function (i: any) { return i.name == t + "" });
        if (h) return h;
        switch (t) {
            case 0:
            case 1:
                i = n._bubble;
                break;
            case 2:
                s.ftaskEntity.view ? i = s.ftaskEntity.view : s.gtask.view && (i = s.gtask.view);
                break;
            case 3:
                i = s.ftaskEntity.view;
                break;
            case 4:
                var o: any = MapModel.instance.heroCatch,
                    r: any = MapModel.instance.heroDrink,
                    a = o.length > 0 ? o : r,
                    l: any = ArrayUtil.find(a, function (t: any) { return t.city == s });
                l && (i = l.view);
                break;
            case 5:
                var c: any = MapModel.instance.monsters[e];
                c || (c = MapModel.instance.monsters.capital),
                    c && (i = c.view);
                break;
            default:
                if (t >= 60 && t <= 70) i = sg.scene.constant.ConfigConstant.mapData.city[e].estatePark ? sg.map.view.MapViewMain.instance.estateViews[e + "_" + -1] : sg.map.view.MapViewMain.instance.estateViews[e + "_" + (t - 60)];
        }
        return this.currentView = i, i;
    }

    public getViewByBuildType(t: any): any {
        var i: any[] = (<any>sg.boundFor.GotoManager).getMenus(),
            e: any = ArrayUtil.find(i, function (i: any) { return i.name == t + "" });
        if (e) return e;
        if ("bubble" === t) {
            var s: any = (<any>sg.scene.view.MapCamera).bID;
            return ViewManager.instance.sceneMain instanceof sg.puppet.view.PuppetMap ? sg.puppet.model.ModelPuppetMap.instance.buildings[s].view.bubble : sg.boundFor.GotoManager.getBuild(s).bubble;
        }
        return null;
    }

    public getHomeEffectByName(t: any): any {
        var i = t,
            e = /_bubble$/i,
            s = !1;
        e.test(t) && (i = t.replace(e, ""), s = !0);
        var n: any = ViewManager.instance.sceneMain.effects[i];
        return n ? (n.stopMove(), s ? n.bubble : (this.currentView = n, n)) : null;
    }

    public _onClickView(t: any): void {
        t === this.currentView && (this.currentView = null, GuideChecker.instance.checkCanSaveGuide(), this.nextStep());
    }

    public _beforeMove(): void {
        sg.guide.view.GuideFocus.focusOut();
    }

    public _onClickButton(): void {
        if (this._lockScreen(!0), this.guideConfig && this.guideConfig.close) {
            var t: any = ViewManager.instance.getCurrentPanel();
            t && t.closeSelf();
        }
        this._currentButton ? (this._currentButton = null, this._checkSave()) : Laya.timer.once(250, this, this.nextStep);
    }

    public _checkSave(): void {
        GuideChecker.instance.checkCanSaveGuide(),
            GuideChecker.instance.needSave ? (GuideChecker.instance.once("auto_save", sg.guide.view.ViewGuide.instance, this.waitMethodReceive), this._checkTimeout()) : this.guideConfig && this.guideConfig.method ? this.waitMethodReceive(this.guideConfig.method) : this.nextStep();
    }

    public waitMethodReceive(t: any): void {
        this._clearTimeout(),
            NetSocket.instance.on("event_socket_receive_to", this, this._methodReceived, [t]),
            Laya.timer.once(5e3, this, this._showNetError);
    }

    public _methodReceived(t: any, i: any): void {
        i.method === t && (0 === i.code ? (this._stopWait(), this.nextStep()) : this._showNetError());
    }

    public _stopWait(): void {
        Laya.timer.clear(this, this._showNetError),
            NetSocket.instance.off("event_socket_receive_to", this, this._methodReceived);
    }

    public _showNetError(): void {
        this._stopWait(),
            ViewManager.instance.showWarnAlert(Tools.getMsgById("_lht59"), Handler.create(Platform, Platform.restart));
    }

    public onAddedBase(): void {
        ViewBase.prototype.onAddedBase.call(this),
            this.cacheAs = "normal",
            ViewManager.instance.on("event_switch_map_complete", this, this.getSceneMain),
            this.getSceneMain();
    }

    public onRemovedBase(): void {
        this.removeSceneMainEvents(),
            this.cacheAs = "none",
            ViewBase.prototype.onRemovedBase.call(this);
    }

    public getSceneMain(): void {
        this.removeSceneMainEvents(),
            this.sceneMain = ViewManager.instance.sceneMain,
            this.sceneMain.on("clickClip", this, this._onClickView),
            this.sceneMain.on("clickBubble", this, this._onClickView),
            this.sceneMain.on("clickEffect", this, this._onClickView),
            this.sceneMain.on("before_move", this, this._beforeMove);
    }

    public removeSceneMainEvents(): void {
        this.sceneMain && this.sceneMain.off("clickClip", this, this._onClickView),
            this.sceneMain && this.sceneMain.off("clickBubble", this, this._onClickView),
            this.sceneMain && this.sceneMain.off("clickEffect", this, this._onClickView),
            this.sceneMain && this.sceneMain.off("before_move", this, this._beforeMove),
            this.sceneMain = null;
    }

    public findPanel(): any {
        var t = !1,
            i: any = ViewManager.instance.getCurrentEffect();
        if (i instanceof sg.view.effect.EffectUIBase && "" === i.name) t = !0;
        else if (i = ViewManager.instance.getCurrentPanel()) switch (ObjectUtil.className(i)) {
            case "ViewHeroTalk":
            case "ViewHeroGetNew":
            case "ViewHeroGetNew2":
            case "ViewGuideImage":
            case "ViewGetReward":
            case "ViewFTaskOpen":
            case "ViewNewChapter":
            case "ViewReviveEvent":
            case "WineshopRecipeUnlock":
            case "ViewWineshopReward":
            case "ViewSeaRouteEvent":
            case "ViewUnLockAni":
                t = !0;
        }
        if (t && !1 !== i.mCanClose) {
            this._clearTimeout(),
                this.hide(),
                i.once("click", this, this._onClickButton);
            var e: any = i.getEvents().click;
            if (e instanceof Array) {
                var s = e.pop();
                e.splice(0, 0, s);
            }
        }
        return t;
    }

    public removeGuide(): void {
        this.hide();
    }

    public hide(): void {
        this.arrow.hide(),
            this.clickContainer.hide(),
            sg.guide.view.GuideFocus.focusOut();
    }

    public static getHitArea(t: any, i: any): any {
        var e: any;
        if (t && t.hitArea) {
            var n: any = t.hitArea;
            n.hit && n.hit._one && n.hit._one[2] instanceof Array && (e = n.hit._one[2]);
        }
        if (!e) {
            var h = i.width,
                o = i.height;
            e = [i.x, i.y, i.x + h, i.y, i.x + h, i.y + o, i.x, i.y + o, i.x, i.y];
        }
        t.localToGlobal(Point.TEMP.setTo(0, 0));
        var r = (e = e.map(function (t: any, i: any) { return t + (i % 2 == 0 ? Point.TEMP.x : Point.TEMP.y) }))[1],
            a = -300,
            l = -300,
            c = Laya.stage.width - a,
            u = Laya.stage.height - l;
        return [a, l, a, r].concat(e).concat([a, r, a, u, c, u, c, l, a, l]);
    }

    /** 原文尾序 i.instance=null（ctor 内 i.instance=this 急切自写，非惰性 getset） */
    public static instance: ViewGuide = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.ViewGuide",t)（明文 3 参，基类 t=s_=
 * sg.view.ViewBase）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(ViewGuide, "sg.guide.view.ViewGuide", null, null);
