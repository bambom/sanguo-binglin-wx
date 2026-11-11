/**
 * sg.god.view.ViewGodDetail —— 神灵详情（左右切换/装备槽/技能/属性、装载-卸载、
 * 技能与装备说明入口）。
 *
 * 原文：code1.js 字节 [6130022,6134437)（4415B；包装变量 _5，基类 WP=ui.god.godDetailUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodDetail",t)，off 6131032；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodDetail.js
 *
 * 依赖：vs=Tools、ue=ModelManager、tn=ViewManager、re=AssetsManager、le=EffectManager、
 * Gt=ConfigServer、Ht=ConfigClass、nr=sg.model.ModelEquip（ambient；getAllGodEquipInfoHtml
 * 缺静态调用点 cast）、yr=ModelItem（均批次 A–F 已译）；bo=ModelGodMain、
 * zi=sg.god.model.ModelGodSkill（instanceof 值面 + 静态，ambient）、sO=GodEquipItem（批次 S）；
 * x5/I5/w5=ViewGodUpgrade/ViewGodStateUpgrade/ViewTalentInfo（本批互引）。
 * _onClickLock 首段 `this.btn_lock,this.model.godChangeLock(...)` —— btn_lock 为丢弃求值，
 * 序列表达式保真保留（批次 Q puppet_guide 同类形态）。
 */
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewGodUpgrade } from "./ViewGodUpgrade";
import { ViewGodStateUpgrade } from "./ViewGodStateUpgrade";
import { ViewTalentInfo } from "./ViewTalentInfo";

export class ViewGodDetail extends ui.god.godDetailUI {

    public hid: any = null;
    public allGods: any = null;
    public godIndex: number = 0;
    public modelGod: any = null;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0002")),
            Tools.textFitFontSize(this.txt_skill, Tools.getMsgById("god_0060")),
            Tools.textFitFontSize(this.txt_equip, Tools.getMsgById("god_0006")),
            Tools.textFitFontSize(this.txt_lvName, Tools.getMsgById("god_lv")),
            Tools.textFitFontSize(this.txt_stateName, Tools.getMsgById("god_state")),
            this.btn_lock.on("click", this, this._onClickLock),
            this.btn_lv.on("click", this, this._onClickUpgrade),
            this.btn_state.on("click", this, this._onClickStateUpgrade),
            this.btn_uninstall.on("click", this, this._changeInstall),
            this.btn_skillHelp.on("click", this, this._showSkillInfo),
            this.btn_equipHelp.on("click", this, this._showEquipInfo),
            this.btn_help.on("click", this, this._onClickHelp),
            this.btn_left.on("click", this, this._onClickArrow, [-1]),
            this.btn_right.on("click", this, this._onClickArrow, [1]),
            this.list_equip.itemRender = sg.god.components.GodEquipItem,
            this.list_equip.scrollBar.hide = !0,
            this.comType.visible = !1;
    }

    public initData(): void {
        this.hid = this.currArg.hid,
            this.allGods = this.currArg.allGods,
            this.godIndex = this.currArg.index,
            this.modelGod = this.allGods[this.godIndex],
            this._refreshUI(),
            this.model.on("update_ui", this, this._refreshUI);
    }

    public _refreshUI(): void {
        var t = this;
        this.modelGod && (this.comType.setUI(this.modelGod),
            this.comName.setUI(this.modelGod),
            this.comScore.setNum(this.modelGod.score),
            this.comGstr.setNum(this.modelGod.gstr),
            this.comGagi.setNum(this.modelGod.gagi),
            this.godItem.dataSource = this.modelGod,
            this.btn_lock.skin = AssetsManager.getAssetsUI(this.modelGod.lock ? "btn_suo.png" : "btn_suo1.png"),
            Tools.textFitFontSize(this.txt_lv, this.modelGod.lv + ""),
            Tools.textFitFontSize(this.txt_state, this.modelGod.stateName),
            this.hid ? (this.btn_uninstall.visible = !0,
                Tools.textFitFontSize(this.btn_uninstall, Tools.getMsgById(this.modelGod.hid !== this.hid ? "god_0077" : "god_0049")),
                this.btn_uninstall.skin = AssetsManager.getAssetsUI(this.modelGod.hid !== this.hid ? "btn_ok.png" : "btn_no_s2.png"))
                : this.btn_uninstall.visible = !1,
            this.txt_state.color = EffectManager.getFontColor(this.modelGod.state),
            this.skillList.dataSource = this.modelGod,
            this.list_equip.array = this.modelGod.equip.map(function (i: any, e: any) {
                var s = i ? i[0] : "",
                    n = ConfigServer.god.god_state[e][1];
                return {
                    god: t.modelGod,
                    eId: s,
                    eType: n,
                    clickEnabled: !0,
                    showGod: !1,
                    showName: !1
                };
            }),
            this.btn_left.visible = this.godIndex > 0,
            this.btn_right.visible = this.godIndex < this.allGods.length - 1);
    }

    public _onClickLock(): void {
        this.btn_lock,
            this.model.godChangeLock(this.modelGod.id, !this.modelGod.lock);
    }

    public _onClickUpgrade(): void {
        ViewManager.instance.showView(["ViewGodUpgrade", ViewGodUpgrade], this.modelGod);
    }

    public _onClickStateUpgrade(): void {
        ViewManager.instance.showView(["ViewGodStateUpgrade", ViewGodStateUpgrade], this.modelGod);
    }

    public _changeInstall(): void {
        this.modelGod.hid !== this.hid ? this._install() : this._uninstall();
    }

    public _install(): void {
        var t = this;
        if (this.modelGod.hid) {
            var i = ModelManager.instance.modelGame.getModelHero(this.modelGod.hid);
            ViewManager.instance.showAlert(Tools.getMsgById("god_0067", [this.modelGod.name, i.getName()]), function (i: any) { 0 == i && t.model.godInstall(t.hid, t.modelGod.id) });
        } else this.model.godInstall(this.hid, this.modelGod.id);
    }

    public _uninstall(): void {
        var t = this;
        ViewManager.instance.showAlert(Tools.getMsgById("god_0057"), function (i: any) { 0 == i && t.model.godUninstall(t.hid) });
    }

    public _onClickCheck(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_GOD_CHECK, { hid: this.hid, god: this.modelGod }),
            this.closeSelf();
    }

    public _showSkillInfo(): void {
        if (0 === this.modelGod.skills.filter(function (t: any) { return t instanceof sg.god.model.ModelGodSkill }).length)
            return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0068"));
        var t = sg.god.model.ModelGodSkill.getAllGodSkillInfoHtml(this.modelGod.data.skill);
        ViewManager.instance.showView(["ViewTalentInfo", ViewTalentInfo], { title: Tools.getMsgById("god_0042"), info: t });
    }

    public _showEquipInfo(): void {
        if (0 === this.modelGod.equip.filter(function (t: any) { return t instanceof Array }).length)
            return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0069"));
        var t = (<any>sg.model.ModelEquip).getAllGodEquipInfoHtml(this.modelGod.data.equip, !0, !0);
        ViewManager.instance.showView(["ViewTalentInfo", ViewTalentInfo], { title: Tools.getMsgById("god_0001") + Tools.getMsgById("god_0006"), info: t });
    }

    public _onClickArrow(t: any): void {
        this.godIndex += t,
            this.btn_left.visible = this.godIndex > 0,
            this.btn_right.visible = this.godIndex < this.allGods.length - 1,
            this.modelGod = this.allGods[this.godIndex],
            this._refreshUI();
    }

    public _onClickHelp(): void {
        ViewManager.instance.showTipsPanel(Tools.getMsgById("god_0066"));
    }

    public onRemoved(): void {
        this.godItem.reset(),
            this.model.off("update_ui", this, this._refreshUI);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodDetail",t)（t=WP=ui.god.godDetailUI）。
 */
Laya.class(ViewGodDetail, "sg.god.view.ViewGodDetail", null, null);
