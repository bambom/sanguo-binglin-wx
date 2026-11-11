/**
 * sg.god.view.ViewGodStateUpgrade —— 神灵进阶（状态升级：消耗校验、进阶动画、上限分支）。
 *
 * 原文：code1.js 字节 [6153052,6157348)（4296B；包装变量 I5，基类 iD=ui.god.godStateUpgredeUI
 * （Upgrede 原文拼写如此），明文 3 参注册 o(i,"sg.god.view.ViewGodStateUpgrade",t)，off 6154259；
 * 全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodStateUpgrade.js
 *
 * 依赖：P=Handler、cs=ObjectUtil、vs=Tools、gs=StringUtil、ue=ModelManager、tn=ViewManager、
 * re=AssetsManager、le=EffectManager、as=MusicManager、yr=ModelItem、nr=sg.model.ModelEquip
 * （getTypeNameByType，ambient 已声明）（批次 A–F 已译）；U=laya.html.dom.HTMLDivElement；
 * bo=ModelGodMain、Gi=sg.god.model.ModelGod（静态面 cast：getGstrGagiFinal/getGodStateName）
 * —— ambient；f5=ViewGodReset（本批互引）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { StringUtil } from "../../utils/StringUtil";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ModelItem } from "../../model/ModelItem";
import { ViewGodReset } from "./ViewGodReset";

export class ViewGodStateUpgrade extends ui.god.godStateUpgredeUI {

    public modelGod: any = null;
    public itemId: any = null;
    public costNum: number = 0;
    public itemNum: number = 0;
    public ani_b: any = null;
    public ani_f: any = null;
    public count: number = 0;
    public isPlaying: boolean = !1;
    public model: any;
    public html_state: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.html_state = new laya.html.dom.HTMLDivElement(),
            this.comTitle.setViewTitle(Tools.getMsgById("god_0028")),
            this.txt_stateName.text = Tools.getMsgById("god_state"),
            this.txt_stateName.visible = this.txt_state.visible = !1,
            this.btn_upgrade.label = Tools.getMsgById("god_0029"),
            this.btn_reset.on("click", this, this._onClickReset),
            this.btn_upgrade.on("click", this, this._upgrade),
            this.com_cost.on("click", this, this._onClickCost),
            this.txt_state.parent.addChild(this.html_state),
            this.html_state.style.color = this.txt_stateName.color,
            this.html_state.style.fontSize = 18,
            this.html_state.style.letterSpacing = 1,
            this.html_state.width = this.comName.width,
            this.html_state.pos(this.comName.x, this.txt_stateName.y),
            this.ani_b = EffectManager.loadAnimation("god_state_up", "", 3),
            this.ani_b.blendMode = "lighter",
            this.ani_f = EffectManager.loadAnimation("god_state_up1", "", 3),
            this.box_ani.addChildren(this.ani_b, this.ani_f),
            this.ani_b.zOrder = -1,
            this.ani_f.zOrder = 1,
            this.ani_b.pos(.5 * this.box_ani.width, .5 * this.box_ani.height),
            this.ani_f.pos(this.ani_b.x, this.ani_b.y),
            this.box_ani.visible = this.isPlaying = !1;
    }

    public _onClickCost(): void {
        ViewManager.instance.showItemTips(this.itemId);
    }

    public initData(): void {
        this.modelGod = this.currArg;
    }

    public onAdded(): void {
        this._setUI(),
            this.model.on("update_ui", this, this._setUI);
    }

    public _setUI(): void {
        var t = this.modelGod.stateUpgradeCost,
            i = Tools.getMsgById("god_gstr"),
            e = Tools.getMsgById("god_gagi"),
            s = this.modelGod.data,
            n = (<any>sg.god.model.ModelGod).getGstrGagiFinal(s.state, s.gstr, s.gagi, s.skill);
        if (Tools.textFitFontSize(this.txt_current, (<any>sg.god.model.ModelGod).getGodStateName(this.modelGod.state)),
            t) {
            Tools.textFitFontSize(this.txt_after, (<any>sg.god.model.ModelGod).getGodStateName(this.modelGod.state + 1));
            var h = (<any>sg.god.model.ModelGod).getGstrGagiFinal(s.state + 1, s.gstr, s.gagi, s.skill);
            this.itemId = ObjectUtil.keys(t)[0],
                this.costNum = t[this.itemId],
                this.itemNum = ModelItem.getMyItemNum(this.itemId),
                this.com_cost.visible = !0,
                this.btn_upgrade.gray = !1,
                this.com_cost.setData(AssetsManager.getAssetItemOrPayByID(this.itemId), [this.itemNum, this.costNum].join("/"), this.itemNum < this.costNum ? 1 : -1),
                this.comGstr.setUI(i, n[0], h[0]),
                this.comGagi.setUI(e, n[1], h[1]);
        } else Tools.textFitFontSize(this.txt_after, Tools.getMsgById("god_0082")),
            this.com_cost.visible = !1,
            this.btn_upgrade.gray = !0,
            this.comGstr.setUI(i, n[0], 0),
            this.comGagi.setUI(e, n[1], 0);
        this.icon_god.dataSource = { god: this.modelGod, selected: !1 };
        var o = EffectManager.getFontColor(this.modelGod.state);
        this.html_state.innerHTML = this.txt_stateName.text + "&nbsp;&nbsp;" + StringUtil.htmlFontColor(this.modelGod.stateName, o),
            this.comName.setUI(this.modelGod),
            this.comScore.setNum(this.modelGod.score);
        var r = sg.model.ModelEquip.getTypeNameByType(this.modelGod.equipUnlockType);
        r ? Tools.textFitFontSize(this.txt_tips, Tools.getMsgById("god_0030", [r])) : Tools.textFitFontSize(this.txt_tips, "");
    }

    public _upgrade(): any {
        var t = this;
        if (!this.isPlaying) return this.modelGod.stateUpgradeCost ? this.itemNum < this.costNum ? ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName(this.itemId)]))
            : void this.model.godStateUpgrade(this.modelGod.id, Handler.create(this, function () {
                t._loadAnimation(),
                    MusicManager.playSoundUI("god_state_up");
            }))
            : ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0032"));
    }

    public _loadAnimation(): void {
        AssetsManager.preLoadAssets([AssetsManager.getAssetGod(this.modelGod.skin)], ["god_state_up", "god_state_up1"], null, this, this._showAnimation);
    }

    public _showAnimation(): void {
        this.count = 0,
            this.box_ani.visible = this.isPlaying = !0,
            this.img_god.skin = "",
            this.img_god.skin = AssetsManager.getAssetGod(this.modelGod.skin),
            this.ani_god.play(0, !1),
            this.ani_b.play(0, !1),
            this.ani_f.play(0, !1),
            EffectManager.changeSprColor(this.ani_b, this.modelGod.state),
            this.ani_god.once("complete", this, this._onComplete),
            this.ani_b.once("complete", this, this._onComplete),
            this.ani_f.once("complete", this, this._onComplete);
    }

    public _onComplete(): void {
        this.count++,
            this.count === this.box_ani._childs.length && (console.log("_onComplete", this.count),
                this.box_ani.visible = this.isPlaying = !1);
    }

    public _onClickReset(): void {
        if (this.modelGod.lv <= 1 && this.modelGod.state <= 0) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0065"));
        ViewManager.instance.showView(["ViewGodReset", ViewGodReset], this.modelGod);
    }

    public onRemoved(): void {
        this.ani_god.stop(),
            this.ani_b.stop(),
            this.ani_f.stop(),
            this.box_ani.visible = this.isPlaying = !1,
            this.model.off("update_ui", this, this._setUI);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodStateUpgrade",t)（t=iD=ui.god.godStateUpgredeUI）。
 */
Laya.class(ViewGodStateUpgrade, "sg.god.view.ViewGodStateUpgrade", null, null);
