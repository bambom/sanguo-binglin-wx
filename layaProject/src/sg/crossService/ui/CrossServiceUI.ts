/**
 * sg.crossService.ui.CrossServiceUI —— 跨服战主界面（CrossServiceMainUI 皮肤：ctor 建
 * 顶栏/标记盒 + 楚汉阵营角标 + 返回键 + 当选盟主条；init 兵队列表（itemRender=SP）+
 * 聊天条 + 开战/结束双倒计时排程 + FAQ 首览 + 标记刷新；updateUI 顶栏层数/增益聚合
 * （filterCity + ascription_ini 怪物清理计数）；_refreshMarks 差分 MarkBase 标记集
 * （newMark 光效标记 + 旧标记 move 补间）；showFinish 结算面板 + settle 按钮；
 * destroy 解绑城市易主/盟主变更事件并清倒计时；topBar getter-only getset）。
 *
 * 原文：code1.js 字节 [4130412,4137467)（7,055B；包装变量 AP，1 参 IIFE 基类实参 (kg)=
 * ui.duplicate.CrossServiceMainUI（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.ui.CrossServiceUI",t) @4130930；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-v/CrossServiceUI.js
 *
 * 批次 V 入批原因：sg.crossService.ui 首簇第 2 类（initTroop itemRender=SP、_refreshMarks
 * new DP/DP.getName 同批互引；前邻 kg=CrossServiceMainUI.createChildren 经 Bt.regComponent
 * 注册 sg.duplicate.view.DuplicateBottomBar 与本族 LeaderTips 子组件）。
 * extends 决策：原文基类 kg=ui.duplicate.CrossServiceMainUI（IDE 皮肤类，批次 X ✓ 落地；
 * 其自身基类 e_=sg.view.com.ItemBase 批次 A ✓）。波次 1 整合已重指向真基类（模块直引）。
 * 依赖（模块直引）：vs=Tools、us=SaveLocal、le=EffectManager、ae=ColorManager、re=
 * AssetsManager、Gt=ConfigServer、Rt=ConfigApp、Ht=ConfigClass、tn=ViewManager（A/B ✓）、
 * $t=CrossServiceFacade（I ✓）、kc=CrossServiceMap（J ✓，instance.created/springMinScale
 * 动态面调回点 cast）、SP=CrossServiceTroopItem、DP=MarkBase（本批）；P=laya.utils.Handler、
 * Ct=laya.utils.Tween、k=laya.utils.Ease、_=laya.ui.Box、s=Laya、Ts=Laya.Trace（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：CD=sg.duplicate.view.DuplicateCountryBar（new）、
 * Q$=sg.view.menu.ComChat（new/setWH）、F1=sg.crossService.ui.TopTips（new/show）、R1=
 * sg.crossService.ui.CrossServiceFinish（new）、yl=sg.crossService.ui.CrossServiceCountDown
 * （new）、ho=sg.crossService.model.CrossServiceUserModel（instance.*；LEADER_STATIC
 * LEADER_CHANGED 调回点 cast）、so=sg.crossService.model.CrossServiceMapModel（instance.*；
 * HAN_COUNTRY/CHU_COUNTRY 静态调回点 cast）、ro=sg.duplicate.ModelDuplicate（instance.*）、
 * Dt=sg.boundFor.GotoManager（instance/instance.boundForMap）、wi=
 * sg.fight.logic.utils.FightDuplicateUtils（getFloorCoordinate 调回点 cast）。
 * ctor 求值序：markCids/newCids/_tips 三字段初始化器原文先于 __super.call，TS 移到
 * super 后（纯赋值，观测等价，批次 H 先例）；userModel 起的全部效应保持原序。
 * 皮肤字段（CrossServiceMainUI：troopList/finishLayer/back_btn/chat_container/bottomBar/
 * view_leader/btn_settle/box_leader/heroIcon/txt_leader/icon_leader）类型层声明，无初始化器。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import { CrossServiceMainUI } from "../../ui/duplicate/CrossServiceMainUI";
import { Tools } from "../../utils/Tools";
import { SaveLocal } from "../../utils/SaveLocal";
import { TimeHelper } from "../../utils/TimeHelper";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewManager } from "../../manager/ViewManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { CrossServiceMap } from "../view/CrossServiceMap";
import { CrossServiceTroopItem } from "./CrossServiceTroopItem";
import { MarkBase } from "./MarkBase";

export class CrossServiceUI extends CrossServiceMainUI {

    public markCids: any = null;
    public newCids: any = null;
    public _tips: any = null;
    public userModel: any;
    public _topBar: any;
    public markBox: any;

    public troopList: any;
    public finishLayer: any;
    public back_btn: any;
    public chat_container: any;
    public bottomBar: any;
    public view_leader: any;
    public btn_settle: any;
    public box_leader: any;
    public heroIcon: any;
    public txt_leader: any;
    public icon_leader: any;

    constructor() {
        super();
        this.userModel = sg.crossService.model.CrossServiceUserModel.instance,
            this._topBar = new sg.duplicate.view.DuplicateCountryBar,
            this.markBox = new laya.ui.Box,
            ConfigApp.isPC && (this.isPCLayout(), (<any>CrossServiceMap.instance).springMinScale = 0),
            this.box_leader.visible = !1,
            this.box_leader.on("click", this, this._onClickLeader),
            this.back_btn.SetSkinAfterLoader("later/back_btn.png"),
            this.userModel.myLeader && this._showLeader(),
            this.addChild(this.markBox),
            this.markBox.y = Laya.stage.height - (this.chat_container.bottom + this.chat_container.height + 5);
    }

    public init(): void {
        sg.view.com.ItemBase.prototype.init.call(this),
            this.initTroop(),
            this.updateUI(null),
            this.back_btn.clickHandler = new Handler(sg.boundFor.GotoManager.instance, sg.boundFor.GotoManager.instance.boundForMap),
            this.mouseThrough = !0,
            this.width = (<any>this.parent).width,
            this.height = (<any>this.parent).height,
            sg.crossService.model.CrossServiceMapModel.instance.on("city_country_change", this, this.updateUI, [["buff", "country"]]),
            this.timerLoop(300, this, this.updateTime),
            this.addChild(this._topBar),
            this._topBar.centerX = 0,
            this._topBar.y = 50,
            this.addChildAt(this._topBar, 0),
            this._topBar.setLv(sg.crossService.model.CrossServiceMapModel.instance.level),
            this._topBar.btn_1.clickHandler = new Handler(this, this.showTips, [(<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY]),
            this._topBar.btn_2.clickHandler = new Handler(this, this.showTips, [(<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY]);
        var t: any = new sg.view.menu.ComChat(2);
        t.setWH(640, 80),
            ConfigApp.isLandscape && t.setWH(350, t.height),
            this.chat_container.addChild(t);
        var i: any = CrossServiceFacade.getServerTimer();
        if (i < sg.duplicate.ModelDuplicate.instance.battleTime) {
            var e: any = sg.duplicate.ModelDuplicate.instance.battleTime - i;
            e > 1e3 && Laya.timer.once(Math.max(e - 3e4, 50), this, this.showCountDown1, [e], !1);
        }
        if (i < sg.duplicate.ModelDuplicate.instance.endTime) {
            var n: any = sg.duplicate.ModelDuplicate.instance.endTime - i;
            n > 1e3 && Laya.timer.once(Math.max(n - 3e4, 50), this, this.showCountDown2, [n], !1);
        }
        SaveLocal.getValue("CrossServiceUI.config") || (SaveLocal.save("CrossServiceUI.config", 1), ViewManager.instance.showView(ConfigClass.VIEW_DUPLICATE_FAQ)),
            this.btn_settle.visible = !1,
            this._refreshMarks(!1),
            this.userModel.on((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this._refreshMarks);
    }

    public showTips(t: any): void {
        this._tips || (this._tips = new sg.crossService.ui.TopTips, this.finishLayer.addChildAt(this._tips, 0), this._tips.y = 160, this._tips.centerX = 0),
            this._tips.show(t);
    }

    public _showLeader(): void {
        var t: any = this.userModel.userData.country,
            i: any = this.userModel.myLeader;
        Tools.textFitFontSize(this.icon_leader.getChildByName("label"), Tools.getMsgById(t === (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY ? "_duplicate053" : "_duplicate054")),
            EffectManager.changeSprColor(this.icon_leader.getChildByName("img"), t, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX")),
            Tools.textFitFontSize(this.txt_leader, this.userModel.allUser[i].uname),
            this.heroIcon.setHeroIcon(this.userModel.allUser[i].head),
            this.box_leader.visible = this.userModel.showLeader;
    }

    public showCountDown1(t: any): void {
        Laya.Trace.log("准备倒计时！111111"),
            (<any>CrossServiceMap.instance).created && new sg.crossService.ui.CrossServiceCountDown(1, Math.min(3e4, t));
    }

    public showCountDown2(t: any): void {
        Laya.Trace.log("准备倒计时！22222"),
            (<any>CrossServiceMap.instance).created && new sg.crossService.ui.CrossServiceCountDown(2, Math.min(3e4, t));
    }

    public showFinish(t: any, i: any): void {
        var e: any = new sg.crossService.ui.CrossServiceFinish(t, i);
        this.finishLayer.addChild(e),
            this.btn_settle.visible = !0,
            this.btn_settle.dataSource = {
                name: Tools.getMsgById("kuafu_38"),
                skin: AssetsManager.getAssetLater("icon_duplicate8.png"),
                handler: new Handler(sg.duplicate.ModelDuplicate.instance, sg.duplicate.ModelDuplicate.instance.settleAccounts)
            },
            this.troopList.mouseEnabled = !1;
    }

    public updateTime(): void {
        CrossServiceFacade.getServerTimer() >= sg.duplicate.ModelDuplicate.instance.endTime ? (this._topBar.setInfo(Tools.getMsgById("kuafu_25")), this.clearTimer(this, this.updateTime)) : CrossServiceFacade.getServerTimer() >= sg.duplicate.ModelDuplicate.instance.battleTime ? this._topBar.setInfo(Tools.getMsgById("kuafu_23", [TimeHelper.timeFormat("mm:ss", sg.duplicate.ModelDuplicate.instance.endTime - CrossServiceFacade.getServerTimer())])) : CrossServiceFacade.getServerTimer() >= sg.duplicate.ModelDuplicate.instance.enterTime ? this._topBar.setInfo(Tools.getMsgById("kuafu_24", [TimeHelper.timeFormat("mm:ss", sg.duplicate.ModelDuplicate.instance.battleTime - CrossServiceFacade.getServerTimer())])) : this._topBar.setInfo("???");
    }

    public isPCLayout(): void {
        this.back_btn.top = 5,
            this.chat_container.bottom = 0;
    }

    public initTroop(): void {
        this.troopList.list.selectedIndex = -1,
            this.troopList.list.itemRender = CrossServiceTroopItem,
            this.troopList.list.scrollBar.visible = !1,
            this.troopList.list.dataSource = sg.crossService.model.CrossServiceMapModel.instance.getMyTroops,
            this.troopList.height = this.troopList.all.height = 486,
            this.troopList.bottom_arrow_img && (this.troopList.bottom_arrow_img.visible = !1),
            this.troopList.up_arrow_img && (this.troopList.up_arrow_img.visible = !1);
    }

    public updateUI(t: any): void {
        var i: any = this,
            e: any = sg.crossService.model.CrossServiceMapModel.instance;
        if (null != t && -1 == t.indexOf("country") || (this._topBar.setFloorNum((<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY, e.getCountrys([(<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY]).length), this._topBar.setFloorNum((<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY, e.getCountrys([(<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY]).length)), null == t || -1 != t.indexOf("buff")) {
            var s = function (t: any, e: any, s: any, n: any) {
                for (var h = 0, o = 0, r = s.length; o < r; o++)h += s[o][e];
                var a: any = n == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY : (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY,
                    l: any = sg.crossService.model.CrossServiceMapModel.instance.getHeadOffice(a),
                    c: any = sg.crossService.model.CrossServiceMapModel.instance.getCountrys([a]).filter(function (t: any) { return 0 != t.monster && t != l }).length,
                    u = 0;
                for (o = 0, r = ConfigServer.duplicate.ascription_ini.length; o < r; o++)for (var d = 0, _ = ConfigServer.duplicate.ascription_ini[o].length; d < _; d++)ConfigServer.duplicate.ascription_ini[o][d] != a || l.mapGrid.col == d && l.mapGrid.row == o || 0 == ConfigServer.duplicate.neutral[o][d] || u++;
                u - c >= ConfigServer.duplicate.monster_clear_num && (h += ConfigServer.duplicate.monster_clear_buff[0]),
                    i._topBar.setBuffNum(n, h);
            };
            s.apply(this, ["my", "dmg_all", sg.crossService.model.CrossServiceMapModel.instance.filterCity([{ type: "dmg_all", than: ">", value: 0 }, { type: "country", than: "=", value: (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY }]), (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY]),
                s.apply(this, ["enemy", "dmg_all", sg.crossService.model.CrossServiceMapModel.instance.filterCity([{ type: "dmg_all", than: ">", value: 0 }, { type: "country", than: "=", value: (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY }]), (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY]);
        }
    }

    public _refreshMarks(t: any): void {
        var i = this;
        void 0 === t && (t = !0);
        var e: any = this.userModel.markCids;
        this.chat_container.y;
        t || (this.markCids = e),
            this.newCids = e.filter(function (t: any) { return -1 === i.markCids.indexOf(t) }, this);
        var s: any = this.markCids.filter(function (t: any) { return -1 === e.indexOf(t) }, this),
            n = "",
            h: any = null;
        s.forEach(function (t: any, e: any) {
            n = MarkBase.getName(t),
                (h = i.markBox.getChildByName(n)) && h.destroy();
        }, this),
            e.forEach(function (s: any, o: any) {
                n = MarkBase.getName(s),
                    h = i.markBox.getChildByName(n);
                var r = 60 * (e.length - o) * -1;
                if (h) {
                    var a: any = i.markCids.indexOf(s);
                    a = t && -1 !== a ? i.markCids.length - a : r,
                        h.move(60 * a * -1, r);
                } else (h = new MarkBase({ cid: s, y: r, newMark: t && -1 !== i.newCids.indexOf(s) })).name = n,
                    i.markBox.addChild(h);
            }, this),
            this.markCids = e,
            this.userModel.myLeader && this._showLeader();
    }

    public _onClickLeader(): void {
        var t: any = this.userModel.myLeader;
        sg.duplicate.ModelDuplicate.instance.showUserInfo(String(t));
    }

    public _renderMark(t: any): void {
        var i: any = t.dataSource,
            e: any = t.getChildByName("box_tips"),
            n: any = t.getChildByName("img"),
            h: any = n.getChildByName("txt");
        n.visible = !0,
            Tools.textFitFontSize(h, (<any>sg.fight.logic.utils.FightDuplicateUtils).getFloorCoordinate(i)),
            Laya.timer.clearAll(e),
            e.alpha = 0,
            e.x = -400;
        var o = this;
        if (-1 !== this.newCids.indexOf(i)) {
            n.visible = !1;
            var r: any = e.getChildByName("txt_tips");
            r.style.color = "#FFFFFF",
                r.style.fontSize = 20,
                Tools.textFitFontSize(r, Tools.getMsgById("500529", [this.userModel.allUser[this.userModel.myLeader].uname, sg.fight.logic.utils.FightDuplicateUtils.getFloorName(i, 2)]));
            var a: any = EffectManager.loadAnimation("glow_arr_rarity", "", 1);
            t.addChild(a),
                a.pos(.5 * t.width, .5 * t.height),
                a.play(0),
                a.on("complete", this, function () {
                    n.visible = !0,
                        Tween.to(e, { x: 0, alpha: 1 }, 200, Ease.quadIn, Handler.create(o, function () {
                            Laya.timer.once(3e3, e, function () {
                                e && (e.alpha = 0);
                            });
                        }));
                });
        }
    }

    public destroy(t?: any): void {
        void 0 === t && (t = !0),
            sg.crossService.model.CrossServiceMapModel.instance.off("city_country_change", this, this.updateUI),
            this.userModel.off((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this._refreshMarks),
            Laya.timer.clear(this, this.showCountDown1),
            Laya.timer.clear(this, this.showCountDown2),
            laya.ui.View.prototype.destroy.call(this, t);
    }

    /** r(0,e,"topBar",getter) —— getter-only getset（求值序等价直译） */
    public get topBar(): any {
        return this._topBar;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceUI",t)
 * （t=kg=ui.duplicate.CrossServiceMainUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceUI, "sg.crossService.ui.CrossServiceUI", null, null);
