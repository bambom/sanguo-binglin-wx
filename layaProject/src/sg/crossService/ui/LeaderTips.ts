/**
 * sg.crossService.ui.LeaderTips —— 跨服战盟主竞选面板（leaderUI 皮肤：display/undisplay
 * 事件驱动显隐；_display 走 _refresh 候选列表/本地已读 _undisplay/_showLeader 盟主展示
 * 三分支；_refresh 候选人 map-sort 聚合 + box 高度自适应 + 选中态 + 当选自动收起；
 * _refreshTime 倒计时文案；_onClick 竞选/退出；timeHelper/clearTimer 计时对）。
 *
 * 原文：code1.js 字节 [4139650,4142814)（3,164B；包装变量 PP，1 参 IIFE 基类实参 (Sg)=
 * ui.duplicate.leaderUI（未译缓译），明文 3 参注册 o(i,"sg.crossService.ui.LeaderTips",t)
 * @4140527；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-v/LeaderTips.js
 *
 * 批次 V 入批原因：sg.crossService.ui 首簇第 4 类（LeaderBase 同批互引 list.itemRender=UP；
 * 前邻 ui.duplicate.CrossServiceMainUI.createChildren 经 Bt.regComponent("sg.crossService.
 * ui.LeaderTips",PP) 注册为本皮肤子组件）。
 * extends 决策：原文基类 Sg=ui.duplicate.leaderUI（IDE 皮肤类，批次 X ✓ 落地；其自身
 * 基类 e_=sg.view.com.ItemBase 批次 A ✓）。波次 1 整合已重指向真基类（模块直引）。
 * 依赖：vs=Tools、us=SaveLocal、Gt=ConfigServer（B ✓ 模块直引）、UP=LeaderBase（本批）；
 * P=laya.utils.Handler、Ct=laya.utils.Tween、k=laya.utils.Ease（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：ho=sg.crossService.model.CrossServiceUserModel
 * （instance.*；LEADER_CHANGED 静态调回点 cast）、so=sg.crossService.model.CrossServiceMapModel
 * （instance.troops）、ro=sg.duplicate.ModelDuplicate（instance.enterTime/battleTime/quitLeader/
 * joinLeader）。
 * ctor 求值序：myLeader/maxShowNum 两字段初始化器原文先于 __super.call，TS 移到 super 后
 * （纯赋值，观测等价，批次 H 先例）；userModel 起的全部效应保持原序。
 * 皮肤字段（leaderUI：box1/box/txt_name/txt_power/txt_score/list/txt_tips/btn/box2/
 * icon_hero/txt_info1/txt_info2/btn_ok）类型层声明，无初始化器。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import { leaderUI } from "../../ui/duplicate/leaderUI";
import { Tools } from "../../utils/Tools";
import { SaveLocal } from "../../utils/SaveLocal";
import { ConfigServer } from "../../cfg/ConfigServer";
import { LeaderBase } from "./LeaderBase";

export class LeaderTips extends leaderUI {

    public myLeader: number = 0;
    public maxShowNum: number = 5;
    public userModel: any;
    public endTime: number;

    public box1: any;
    public box: any;
    public txt_name: any;
    public txt_power: any;
    public txt_score: any;
    public list: any;
    public txt_tips: any;
    public btn: any;
    public box2: any;
    public icon_hero: any;
    public txt_info1: any;
    public txt_info2: any;
    public btn_ok: any;

    constructor() {
        super();
        this.userModel = sg.crossService.model.CrossServiceUserModel.instance,
            this.endTime = sg.duplicate.ModelDuplicate.instance.enterTime + ConfigServer.duplicate.campaign_time * Tools.oneMinuteMilli,
            Tools.textFitFontSize(this.txt_name, Tools.getMsgById("_duplicate071")),
            Tools.textFitFontSize(this.txt_score, Tools.getMsgById("_duplicate072")),
            Tools.textFitFontSize(this.txt_power, Tools.getMsgById("_duplicate073")),
            Tools.textFitFontSize(this.btn_ok, Tools.getMsgById("_public183")),
            this.txt_info1.style.color = this.txt_info2.style.color = "#ffffff",
            this.txt_info1.style.align = this.txt_info2.style.align = "center",
            this.txt_info1.style.fontSize = 22,
            this.txt_info2.style.fontSize = 18,
            this.list.itemRender = LeaderBase,
            this.list.scrollBar.hide = !0,
            this.btn.on("click", this, this._onClick),
            this.btn_ok.on("click", this, this._undisplay),
            this.btn_ok.visible = !1,
            this.on("display", this, this._display),
            this.on("undisplay", this, this._undisplay);
    }

    public _display(): void {
        (this.visible = this.userModel.showLeader, this.visible) && (this.myLeader = this.userModel.myLeader, this.box2.visible = !1, ConfigServer.getServerTimer() < this.endTime ? (this._refresh(), this.userModel.on((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this._refresh), this.timerLoop(1e3, this, this._refreshTime)) : SaveLocal.getValue("LEADER" + this.endTime) ? this._undisplay() : this._showLeader());
    }

    public _hideChoosePanel(t?: any): void {
        void 0 === t && (t = 300),
            this.userModel.off((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this._refresh),
            this.clearTimer(this, this._refreshTime),
            this.visible = !0,
            Tween.to(this.box1, { y: this.box1.y + 300, alpha: 0 }, t, Ease.quadOut, Handler.create(this, this._showLeader));
    }

    public _showLeader(t?: any): void {
        var i = this;
        void 0 === t && (t = 300),
            SaveLocal.save("LEADER" + this.endTime, !0),
            this.visible = !0,
            this.box1.visible = !1,
            this.box2.visible = !0;
        var e: any = this.userModel.allUser[this.userModel.myLeader];
        e && (this.icon_hero.setHeroIcon(e.head, !1),
            Tools.textFitFontSize(this.txt_info1, Tools.getMsgById("500527", [e.uname])),
            Tools.textFitFontSize(this.txt_info2, Tools.getMsgById("500528")),
            Tween.to(this.box2, { bottom: 0, alpha: 1 }, t, Ease.quadIn, Handler.create(this, function () { i.btn_ok.visible = !0 })));
    }

    public _refresh(): void {
        var t: any = this,
            i: any = this.userModel.candidates.map(function (i: any) {
                var e: any = sg.crossService.model.CrossServiceMapModel.instance.troops[i], s = 0;
                return e.forEach(function (t: any) { s += t.power }),
                    { uid: i, uname: t.userModel.allUser[i].uname, prestige: t.userModel.allUser[i].prestige, power: s };
            }).sort(function (t: any, i: any) { return t.prestige === i.prestige ? t.power === i.power ? t.uid - i.uid : i.power - t.power : i.prestige - t.prestige }),
            e = i.length;
        this.list.array = i,
            (e = Math.min(e, this.maxShowNum)) ? (this.box.visible = !0, this.box.height = 42 + e * (this.list.getCell(0).height + this.list.spaceY)) : this.box.visible = !1,
            this.btn.selected = -1 !== this.userModel.candidates.indexOf(this.userModel.uid),
            this.userModel.myLeader && (this.myLeader = this.userModel.myLeader, this._hideChoosePanel());
    }

    public _refreshTime(): void {
        var t = this.endTime - ConfigServer.getServerTimer();
        t = Math.max(t, 0),
            Tools.textFitFontSize(this.txt_tips, Tools.getMsgById("_duplicate074", [Math.floor(t / 1e3)]));
    }

    public _onClick(): void {
        this.btn.selected ? sg.duplicate.ModelDuplicate.instance.quitLeader() : sg.duplicate.ModelDuplicate.instance.joinLeader();
    }

    public _undisplay(): void {
        this.visible = !1,
            this.userModel.off((<any>sg.crossService.model.CrossServiceUserModel).LEADER_CHANGED, this, this._refresh),
            this.clearTimer(this, this._undisplay),
            this.clearTimer(this, this._refreshTime);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.LeaderTips",t)（t=Sg=ui.duplicate.leaderUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(LeaderTips, "sg.crossService.ui.LeaderTips", null, null);
