/**
 * sg.god.view.ViewGodReset —— 神灵重置（返还预览 + 免费元宝两种重置确认）。
 *
 * 原文：code1.js 字节 [6140610,6143094)（2484B；包装变量 f5，基类 qP=ui.god.godResetUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodReset",t)，off 6141524；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodReset.js
 *
 * 依赖：P=Handler、cs=ObjectUtil、vs=Tools、gs=StringUtil、ue=ModelManager、tn=ViewManager、
 * re=AssetsManager、Ze=ArrayUtil、yr=ModelItem（均批次 A–F 已译）；bo=ModelGodMain（ambient）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { StringUtil } from "../../utils/StringUtil";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { ModelItem } from "../../model/ModelItem";

export class ViewGodReset extends ui.god.godResetUI {

    public modelGod: any = null;
    public itemId: any = null;
    public costNum: number = 0;
    public itemNum: number = 0;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0033")),
            this.btn_reset.label = Tools.getMsgById("god_0033"),
            this.btn_payReset.label = Tools.getMsgById("god_0034"),
            Tools.textFitFontSize(this.txt_tips1, Tools.getMsgById("god_0035")),
            Tools.textFitFontSize(this.txt_tips2, Tools.getMsgById("god_0036")),
            Tools.textFitFontSize(this.txt_reset, Tools.getMsgById("god_0037", [StringUtil.numberToPercent(this.model.cfg_rest[0])])),
            Tools.textFitFontSize(this.txt_payReset, Tools.getMsgById("god_0038")),
            this.list.scrollBar.changeHandler = new Handler(this, this._onScrollChange),
            this.list.scrollBar.hide = !0,
            this.btn_reset.on("click", this, this._reset, [0]),
            this.btn_payReset.on("click", this, this._reset, [1]),
            this.btn_l.on("click", this, this._tweenTo, [-1]),
            this.btn_r.on("click", this, this._tweenTo, [1]),
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
            this.list.scrollTo(0);
    }

    public _setUI(): void {
        var t = this.model.cfg_rest[1];
        this.itemId = ObjectUtil.keys(t)[0],
            this.costNum = t[this.itemId],
            this.itemNum = ModelItem.getMyItemNum(this.itemId),
            this.com_cost.setData(AssetsManager.getAssetItemOrPayByID(this.itemId), [this.itemNum, this.costNum].join("/"), this.itemNum < this.costNum ? 1 : -1);
        var i = ModelManager.instance.modelProp.getRewardProp(this.modelGod.resetReturn);
        i = i.map(function (t: any) {
            return (t = t.slice(0, 2)).push(-1),
                t;
        }),
            this.btn_l.visible = this.btn_r.visible = i.length > 4,
            this.list.array = i;
    }

    public _tweenTo(t: any): void {
        this.list.tweenTo(this.list.startIndex + t);
    }

    public _onScrollChange(t: any): void {
        var i: any = this.list.array ? this.list.array.length : 0;
        this.btn_l.visible = i > this.list.repeatX && this.list.startIndex > 0,
            this.btn_r.visible = i > this.list.repeatX && this.list.startIndex < i - this.list.repeatX;
    }

    public _reset(t: any): any {
        return ArrayUtil.find(this.modelGod.skills, function (t: any) { return t && 0 === t.inborn }) ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0063"))
            : ArrayUtil.find(this.modelGod.equip, function (t: any) { return t instanceof Array }) ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0064"))
                : t && this.itemNum < this.costNum ? ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName(this.itemId)]))
                    : void ViewManager.instance.showAlert(Tools.getMsgById(t ? "god_0076" : "god_0075"), Handler.create(this, this._onClickOk, [t]));
    }

    public _onClickOk(t: any, i: any): void {
        0 === i && this.model.godReset(this.modelGod.id, t, Handler.create(this, this.closeSelf));
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodReset",t)（t=qP=ui.god.godResetUI）。
 */
Laya.class(ViewGodReset, "sg.god.view.ViewGodReset", null, null);
