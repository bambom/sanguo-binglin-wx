/**
 * sg.god.view.ViewGodEquip —— 神灵装备选择/安装（装备列表 + 属性位选择 + 消耗校验）。
 *
 * 原文：code1.js 字节 [6134445,6139111)（4666B；包装变量 m5，基类 zP=ui.god.godEquipUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodEquip",t)，off 6135038；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodEquip.js
 *
 * 依赖：P=Handler、vs=Tools、ue=ModelManager、tn=ViewManager、be=TestUtils、re=AssetsManager、
 * le=EffectManager、as=MusicManager、Ze=ArrayUtil、Gt=ConfigServer、Ht=ConfigClass、yr=ModelItem
 * （均批次 A–F 已译）；bo=ModelGodMain、ge=sg.map.utils.ArrayUtils（ambient sortOn）、
 * KX=sg.view.inside.ItemEquip、nr=sg.model.ModelEquip（instanceof 值面，ambient）。
 * 丢弃求值保真：_onSelectProp 首句 `this.list.getCell(t);`、_onClick 中段
 * `this.currEquip.installType();`、尾句 `i.busyHint()`（序列位置原样保留）。
 * getset：r(0,e,"currEquip",getter,setter) → TS get/set。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ModelItem } from "../../model/ModelItem";

export class ViewGodEquip extends ui.god.godEquipUI {

    public god: any = null;
    public eType: number = -1;
    public eindex: number = -1;
    public _currEquip: any = null;
    public _propIndex: number = -1;
    public itemId: any = null;
    public costNum: number = 0;
    public itemNum: number = 0;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            Tools.textFitFontSize(this.txt_tips, Tools.getMsgById("god_0051")),
            this.list_equip.itemRender = sg.view.inside.ItemEquip,
            this.list_equip.renderHandler = new Handler(this, this._equipRender),
            this.list_equip.mouseHandler = new Handler(this, this._onClickEquip),
            this.list_equip.scrollBar.hide = !0,
            this.list.renderHandler = new Handler(this, this._propRender),
            this.btn_install.on("click", this, this._onClick),
            this.com_cost.on("click", this, this._onClickCost);
    }

    public _onClickCost(): void {
        ViewManager.instance.showItemTips(this.itemId);
    }

    public initData(): void {
        var t = this;
        this.eType = this.currArg.eType,
            this.god = this.currArg.god,
            this.eindex = ArrayUtil.findIndex(ConfigServer.god.god_state, function (i: any) { return i[1] === t.eType }),
            this._refreshUI(),
            this.list_equip.scrollTo(0),
            this.model.on("update_ui", this, this._refreshUI);
    }

    public _refreshUI(): void {
        var t: any,
            i = ModelManager.instance.modelUser.equip,
            e = [];
        for (var s in i) (t = ModelManager.instance.modelGame.getModelEquip(s)).type == this.eType && (t.sortIsCurEid = 0,
            this.god.equip[this.eindex] && (t.sortIsCurEid = this.god.equip[this.eindex][0] == t.id ? 1 : 0),
            t.sortInstallType = t.installType() ? 0 : 1,
            e.push(t));
        sg.map.utils.ArrayUtils.sortOn(["sortIsCurEid", "sortInstallType", "index"], e, !0),
            this.list_equip.array = e.filter(function (t: any) { return t.getLv() >= ConfigServer.fight.equipMaxLv }),
            this.currEquip = this.currEquip || this.list_equip.array[0];
    }

    public _equipRender(t: any, i: any): void {
        var e = this.list_equip.array[i];
        t.setDataChange(e),
            t.showSelect(e === this.currEquip),
            TestUtils.isTestShow && (t.off("rightclick", this, this.popInfo),
                t.on("rightclick", this, this.popInfo, [e]));
    }

    public _propRender(t: any, i: any): void {
        var e = t.getChildByName("selectedImg"),
            s = t.getChildByName("propTxt");
        s.color = EffectManager.getFontColor(i),
            Tools.textFitFontSize2(s, t.dataSource),
            e.visible = this._propIndex === i;
        var n = this.god.equip[this.eindex] || [];
        (<any>EffectManager.addEffectToSprite)(t, "god_seal_equip").visible = this.currEquip.id === n[0] && n[1] === i,
            t.off("click", this, this._onSelectProp),
            t.on("click", this, this._onSelectProp, [i]);
    }

    public _onSelectProp(t: any): void {
        this.list.getCell(t);
        this._propIndex = t,
            this.list.refresh(),
            this._setButton();
    }

    public popInfo(t: any): void {
        t instanceof sg.model.ModelEquip && ViewManager.instance.showView(ConfigClass.VIEW_EQUIP_MAKE_INFO, t);
    }

    public _onClickEquip(t: any, i: any): void {
        "click" === t.type && (this.currEquip = this.list_equip.array[i]);
    }

    public _setButton(): void {
        var t = this.god.equip[this.eindex];
        this.com_cost.visible = Boolean(this.itemId),
            t ? this.currEquip.id === t[0] && this._propIndex === t[1] ? (this.com_cost.visible = !1,
                this.btn_install.label = Tools.getMsgById("god_0007"))
                : this.btn_install.label = Tools.getMsgById("god_0050")
                : this.btn_install.label = Tools.getMsgById("god_0006");
    }

    public _onClick(): void {
        var t = this,
            i: any = null;
        if (this.god.hid && !(i = ModelManager.instance.modelGame.getModelHero(this.god.hid)).idle) return i.busyHint();
        this.currEquip.installType();
        var e = this.god.equip[this.eindex] || [];
        if (!(i = this.currEquip.getMyHero()) || i.idle)
            return -1 === this._propIndex ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0053"))
                : this.currEquip.id === e[0] && this._propIndex === e[1] ? ViewManager.instance.showAlert(Tools.getMsgById("god_0055"), function (i: any) { 0 == i && t.model.godUninstallEquip(t.god.id, t.currEquip.type) })
                    : this.itemNum < this.costNum ? ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName(this.itemId)]))
                        : void (e[0] ? ViewManager.instance.showAlert(Tools.getMsgById("god_0048"), function (i: any) { 0 == i && t._installEquip() }) : this._installEquip());
        i.busyHint();
    }

    public _installEquip(): void {
        var t = this;
        this.model.godInstallEquip(this.god.id, this.currEquip.id, this._propIndex, this.currEquip.type, Handler.create(this, function () {
            EffectManager.addEffectToSprite(t.list.getCell(t._propIndex), "god_get_equip", null, "", 1),
                MusicManager.playSoundUI("god_get_equip");
        }));
    }

    public onRemoved(): void {
        this.currEquip = null,
            this.model.off("update_ui", this, this._refreshUI);
    }

    /** r(0,e,"currEquip",getter,setter) —— getset 直译（求值序等价，批次 K 定案） */
    public get currEquip(): any {
        return this._currEquip;
    }
    public set currEquip(t: any) {
        if (this._currEquip = t, this.currEquip) {
            this.list_equip.refresh();
            var i = this.model.getModelByEquip(this.currEquip);
            this.icon.dataSource = {
                god: i,
                eId: this.currEquip.id,
                eType: this.eType,
                showGod: !0,
                showName: !1
            },
                this.txt_equip.color = this.icon.item.label.color,
                this.txt_equip.text = this.icon.item.label.text;
            var e = this.god.getInstallEquipCost(this.eType);
            this.itemId = ObjectUtil.keys(e)[0],
                this.itemId && (this.costNum = e[this.itemId],
                    this.itemNum = ModelItem.getMyItemNum(this.itemId),
                    this.com_cost.setData(AssetsManager.getAssetItemOrPayByID(this.itemId), [this.itemNum, this.costNum].join("/"), this.itemNum < this.costNum ? 1 : -1));
            var s = this.god.equip[this.eindex] || [];
            this._propIndex = this.currEquip.id === s[0] ? s[1] : -1,
                this._setButton();
            for (var n = [], h = this.currEquip.getShowLv(), o = 0; o <= h; ++o) n.push(this.currEquip.getLvInfo(o));
            this.list.array = n;
        }
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodEquip",t)（t=zP=ui.god.godEquipUI）。
 */
Laya.class(ViewGodEquip, "sg.god.view.ViewGodEquip", null, null);
