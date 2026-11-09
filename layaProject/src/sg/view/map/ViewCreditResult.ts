/**
 * sg.view.map.ViewCreditResult —— 信用结算面板（ViewManager.showCreditResult）。
 *
 * 原文：code1.js 字节 [7937666,7940238]（off 7938711，包装变量 xtt，基类 Vj=ui.map.creditResultUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewCreditResult.js
 *
 * 依赖：vs=Tools、Rt=ConfigApp、Gt=ConfigServer、ue=ModelManager、re=AssetsManager、
 * Zs=QueueManager、pn=NetSocket（批次 B 模块直引）；tn=ViewManager、Js=LoadeManager（A）；
 * Ar=sg.model.ModelProp（批次外全局路径）。adImg 为 UI 动态节点。
 */
import Handler = laya.utils.Handler;
import { creditResultUI } from "../../ui/map/creditResultUI";
import { ViewManager } from "../../manager/ViewManager";
import { LoadeManager } from "../../manager/LoadeManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";
import { QueueManager } from "../../manager/QueueManager";
import { NetSocket } from "../../net/NetSocket";

export class ViewCreditResult extends creditResultUI {

    public arr: any[] = [];
    public reData: any = null;
    /** UI 动态节点（loadUI 挂载） */
    public adImg: any;

    constructor() {
        super();
        this.btn0.on("click", this, this.btnClick),
            this.btn1.on("click", this, this.btnClick),
            this.list.renderHandler = new Handler(this, this.listRender),
            this.list.scrollBar.visible = false,
            this.comTitle.setViewTitle(Tools.getMsgById("_credit_text19")),
            this.label0.text = Tools.getMsgById("_credit_text20"),
            this.label1.text = Tools.getMsgById("_credit_text21"),
            this.label2.text = Tools.getMsgById("_credit_text22"),
            this.label3.text = Tools.getMsgById("_credit_text23"),
            this.label4.text = Tools.getMsgById("_credit_text24"),
            this.btn0.label = Tools.getMsgById("_credit_text28"),
            this.btn1.label = Tools.getMsgById("_credit_text29"),
            ConfigApp.isLandscape
                ? (Tools.textFitFontSize(this.label0), Tools.textFitFontSize(this.label1), Tools.textFitFontSize(this.label2), Tools.textFitFontSize(this.label3), Tools.textFitFontSize(this.label4))
                : (Tools.textFitFontSize2(this.label0), Tools.textFitFontSize2(this.label1), Tools.textFitFontSize2(this.label2), Tools.textFitFontSize2(this.label3), Tools.textFitFontSize2(this.label4)),
            Tools.textFitFontSize(this.btn0),
            Tools.textFitFontSize(this.btn1);
    }

    /** credit_settle=[排名,奖励dict,数量,文案...]；有排名走榜单分支 */
    public onAdded(): void {
        this.comHero && ConfigServer.credit.credit_result_hero && this.comHero.setHeroIcon(ConfigServer.credit.credit_result_hero, !ConfigApp.isLandscape),
            this.adImg && LoadeManager.loadTemp(this.adImg, AssetsManager.getAssetsAD("bg_167.png")),
            this.arr = ModelManager.instance.modelUser.credit_settle,
            null != this.arr && 0 != this.arr.length
                ? (this.isAutoClose = false, this.setData())
                : this.closeSelf();
    }

    public setData(): void {
        var t = this.arr[1];
        if (this.com0.setData(AssetsManager.getAssetItemOrPayByID(sg.model.ModelProp.ITEM_CREIDT), this.arr[2]),
            this.text1.text = this.arr[3] + "",
            this.text2.text = this.arr[4] + "",
            this.text3.text = this.arr[5] + "",
            null == t || 0 == Tools.getDictLength(t))
            this.comIndex.setRankIndex(0, Tools.getMsgById("_public101")),
                this.list.visible = false,
                this.text5.text = Tools.getMsgById("_credit_text17"),
                this.btn0.visible = false,
                this.btn1.visible = true;
        else {
            this.comIndex.setRankIndex(this.arr[0], Tools.getMsgById("_public101")),
                this.text5.text = "",
                this.list.visible = true,
                this.btn0.visible = true,
                this.btn1.visible = false;
            var i = ModelManager.instance.modelProp.getRewardProp(t);
            if (this.list.array = i, ConfigApp.isLandscape) {
                var e = i.length;
                this.list.width = this.list.getCell(0).width * e + this.list.spaceX * (e - 1),
                    (<any>this.list).centerX = 0;
            }
        }
    }

    public listRender(t: any, i: any): void {
        t.setName("");
    }

    public btnClick(): void {
        QueueManager.instance.mIsGoto = true,
            NetSocket.instance.send("del_credit_settle", {}, new Handler(this, this.callBack));
    }

    public callBack(t: any): void {
        this.reData = t.receiveData,
            ModelManager.instance.modelUser.updateData(this.reData),
            ViewManager.instance.showRewardPanel(this.reData.gift_dict),
            ViewManager.instance.closePanel(this);
    }

    public onRemoved(): void {
        this.isAutoClose = true;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.map.ViewCreditResult",t)（t=Vj=ui.map.creditResultUI）。
 */
Laya.class(ViewCreditResult, "sg.view.map.ViewCreditResult", null, null);
