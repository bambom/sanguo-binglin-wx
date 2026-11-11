/**
 * sg.god.view.ViewCostConfirm —— 消耗确认弹窗（列表左右翻页 + 确认回调）。
 *
 * 原文：code1.js 字节 [6117667,6118910)（1243B；包装变量 c5，基类 HP=ui.god.costConfirmUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewCostConfirm",t)，off 6118213；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewCostConfirm.js
 *
 * 依赖：P=laya.utils.Handler、vs=sg.utils.Tools、v_=ui.bag.bagItemUI（ambient，批次 A 已声明）。
 */
import Handler = laya.utils.Handler;
import { Tools } from "../../utils/Tools";

export class ViewCostConfirm extends ui.god.costConfirmUI {

    public handler: any = null;
    public items: any = null;
    public tips: any = null;
    public title: any = null;

    constructor() {
        super();
        this.list.itemRender = ui.bag.bagItemUI,
            this.list.scrollBar.changeHandler = new Handler(this, this._onScrollChange),
            this.list.scrollBar.hide = !0,
            Tools.textFitFontSize(this.btn_yes, Tools.getMsgById("_star_text29")),
            Tools.textFitFontSize(this.btn_no, Tools.getMsgById("_star_text30")),
            this.btn_yes.on("click", this, this._onClickYes),
            this.btn_no.on("click", this, this.closeSelf),
            this.btn_left.on("click", this, this._tweenTo, [-1]),
            this.btn_right.on("click", this, this._tweenTo, [1]);
    }

    public initData(): void {
        this.handler = this.currArg.handler,
            this.items = this.currArg.items,
            this.tips = this.currArg.tips,
            this.title = this.currArg.title;
    }

    public onAdded(): void {
        this.list.array = this.items,
            this.txt_tips.text = this.tips,
            this.comTitle.setViewTitle(this.title);
    }

    public _tweenTo(t: any): void {
        this.list.tweenTo(this.list.startIndex + t);
    }

    public _onScrollChange(t: any): void {
        var i: any = this.list.array ? this.list.array.length : 0;
        this.btn_left.visible = i > this.list.repeatX && this.list.startIndex > 0,
            this.btn_right.visible = i > this.list.repeatX && this.list.startIndex < i - this.list.repeatX;
    }

    public _onClickYes(): void {
        this.handler && this.handler.run(),
            this.closeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewCostConfirm",t)（t=HP=ui.god.costConfirmUI）。
 */
Laya.class(ViewCostConfirm, "sg.god.view.ViewCostConfirm", null, null);
