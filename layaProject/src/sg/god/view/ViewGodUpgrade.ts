/**
 * sg.god.view.ViewGodUpgrade —— 神灵升级（单次/自动升级，多级预演与消耗汇总确认）。
 *
 * 原文：code1.js 字节 [6157356,6160587)（3231B；包装变量 x5，基类 eD=ui.god.godUpgradeUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodUpgrade",t)，off 6157857；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodUpgrade.js
 *
 * 依赖：P=Handler、cs=ObjectUtil、vs=Tools、ue=ModelManager、tn=ViewManager、re=AssetsManager、
 * le=EffectManager、as=MusicManager、yr=ModelItem、Gt=ConfigServer（批次 A–F 已译）；
 * bo=ModelGodMain、Gi=sg.god.model.ModelGod（getGodLvObj 静态 cast）—— ambient；
 * c5=ViewCostConfirm、f5=ViewGodReset（本批互引）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ModelItem } from "../../model/ModelItem";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ViewCostConfirm } from "./ViewCostConfirm";
import { ViewGodReset } from "./ViewGodReset";

export class ViewGodUpgrade extends ui.god.godUpgradeUI {

    public modelGod: any = null;
    public itemId: any = null;
    public costNum: number = 0;
    public itemNum: number = 0;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0022")),
            this.btn_upgrade.label = Tools.getMsgById("god_0026"),
            this.btn_autoUpgrade.label = Tools.getMsgById("god_0027"),
            this.btn_reset.on("click", this, this._onClickReset),
            this.btn_upgrade.on("click", this, this._upgrade, [!1]),
            this.btn_autoUpgrade.on("click", this, this._upgrade, [!0]),
            this.com_cost.on("click", this, this._onClickCost);
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
        var t = this.modelGod.upgradeCost,
            i = Tools.getMsgById("rslt_armys"),
            e = i + Tools.getMsgById("_hero9"),
            s = i + Tools.getMsgById("_hero10"),
            n = i + Tools.getMsgById("_hero12"),
            h = (<any>sg.god.model.ModelGod).getGodLvObj(this.modelGod.lv);
        if (Tools.textFitFontSize(this.txt_current, Tools.getMsgById("god_0023", [this.modelGod.lv])),
            Tools.textFitFontSize(this.txt_after, Tools.getMsgById("god_0024", [(t ? 1 : 0) + this.modelGod.lv])),
            t) {
            var o = (<any>sg.god.model.ModelGod).getGodLvObj(this.modelGod.lv + 1);
            this.itemId = ObjectUtil.keys(t)[0],
                this.costNum = t[this.itemId],
                this.itemNum = ModelItem.getMyItemNum(this.itemId),
                this.com_cost.visible = !0,
                this.btn_autoUpgrade.gray = this.btn_upgrade.gray = !1,
                this.com_cost.setData(AssetsManager.getAssetItemOrPayByID(this.itemId), [this.itemNum, this.costNum].join("/"), this.itemNum < this.costNum ? 1 : -1),
                this.comAtk.setUI(e, h.atk, o.atk),
                this.comDef.setUI(s, h.def, o.def),
                this.comHpm.setUI(n, h.hpm, o.hpm);
        } else Tools.textFitFontSize(this.txt_after, Tools.getMsgById("god_0081")),
            this.com_cost.visible = !1,
            this.btn_autoUpgrade.gray = this.btn_upgrade.gray = !0,
            this.comAtk.setUI(e, h.atk, 0),
            this.comDef.setUI(s, h.def, 0),
            this.comHpm.setUI(n, h.hpm, 0);
        this.icon_god.dataSource = { god: this.modelGod, selected: !1 },
            this.comName.setUI(this.modelGod),
            this.comScore.setNum(this.modelGod.score);
        var r = this.modelGod.skillUnlockLv;
        r ? Tools.textFitFontSize(this.txt_tips, Tools.getMsgById("god_0025", [r])) : this.txt_tips.text = "";
    }

    public _upgrade(t?: any): any {
        if (void 0 === t && (t = !1), !this.modelGod.upgradeCost) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0031"));
        if (this.itemNum < this.costNum) return ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName(this.itemId)]));
        if (t) {
            for (var i = {},
                e = ConfigServer.god.god_level,
                s = 0,
                n = this.modelGod.lv; n <= e.length; ++n) {
                var h = e[n - 1][this.modelGod.wuxing],
                    o = ObjectUtil.keys(h)[0],
                    r = h[o] + (i[o] || 0);
                if (ModelItem.getMyItemNum(o) < r) break;
                s++,
                    i[o] = r;
            }
            var a = Tools.getMsgById("god_0022"),
                l = Tools.getMsgById("god_0074", [this.modelGod.lv + s]),
                c = ModelManager.instance.modelProp.getRewardProp(i);
            c.forEach(function (t: any) { t[2] = -1 }),
                ViewManager.instance.showView(["ViewCostConfirm", ViewCostConfirm], { title: a, items: c, tips: l, handler: Handler.create(this, this._lvUp, [t]) });
        } else this._lvUp(t);
    }

    public _lvUp(t: any): void {
        var i = this;
        this.model.godUpgrade(this.modelGod.id, t, Handler.create(this, function () {
            EffectManager.addEffectToSprite(i.icon_god.box, "god_level_up", null, "", 1),
                MusicManager.playSoundUI("god_level_up");
        }));
    }

    public _onClickReset(): void {
        if (this.modelGod.lv <= 1 && this.modelGod.state <= 0) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0065"));
        ViewManager.instance.showView(["ViewGodReset", ViewGodReset], this.modelGod);
    }

    public onRemoved(): void {
        this.model.off("update_ui", this, this._setUI);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodUpgrade",t)（t=eD=ui.god.godUpgradeUI）。
 */
Laya.class(ViewGodUpgrade, "sg.god.view.ViewGodUpgrade", null, null);
