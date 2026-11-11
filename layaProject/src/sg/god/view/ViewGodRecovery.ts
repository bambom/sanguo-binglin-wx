/**
 * sg.god.view.ViewGodRecovery —— 神灵批量回收确认（选中列表 + 确认回收链）。
 *
 * 原文：code1.js 字节 [6139119,6140602)（1483B；包装变量 g5，基类 YP=ui.god.godRecoveryUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodRecovery",t)，off 6139659；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodRecovery.js
 *
 * 依赖：vs=Tools、tn=ViewManager（批次 A 已译）；bo=ModelGodMain、Wi=ModelGodIcon（ambient）；
 * nO=sg.god.components.GodIcon（批次 S 在译，值引用）；d5=ViewGodCheck（本批互引，
 * CHECK_MODE 静态事件回置）。
 */
import { Tools } from "../../utils/Tools";
import { ViewManager } from "../../manager/ViewManager";
import { ViewGodCheck } from "./ViewGodCheck";

export class ViewGodRecovery extends ui.god.godRecoveryUI {

    public gods: any = null;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0011")),
            Tools.textFitFontSize2(this.txt_tips0, Tools.getMsgById("god_0019")),
            this.btn_no.label = Tools.getMsgById("_star_text30"),
            this.btn_yes.label = Tools.getMsgById("_star_text29"),
            this.btn_no.on("click", this, this.closeSelf),
            this.btn_yes.on("click", this, this._onClickYes),
            this.btn_left.on("click", this, this._tweenTo, [-1]),
            this.btn_right.on("click", this, this._tweenTo, [1]),
            this.list.itemRender = sg.god.components.GodIcon,
            this.list.scrollBar.hide = !0;
    }

    public onAdded(): void {
        this.gods = this.currArg,
            this.list.array = this.gods.map(function (t: any) { return new sg.god.model.ModelGodIcon(t) });
        var t = this.list.array.length,
            i = .5 * (this.box_list.width - this.list.width * this.list.scaleX);
        if (t > this.list.repeatX) this.btn_left.visible = this.btn_right.visible = !0,
            this.list.x = i;
        else {
            this.btn_left.visible = this.btn_right.visible = !1;
            var e = (this.list.width - (this.list.repeatX - 1) * this.list.spaceX) / this.list.repeatX;
            this.list.x = i + (this.list.repeatX - t) * (this.list.spaceX + e) * .5 * this.list.scaleX;
        }
        Tools.textFitFontSize(this.txt_tips1, Tools.getMsgById("god_0020", [this.list.array.length]));
    }

    public _tweenTo(t: any): void {
        this.list.tweenTo(this.list.startIndex + t);
    }

    public _onClickYes(): void {
        var t = this;
        ViewManager.instance.showAlert(Tools.getMsgById("god_0017"), function (i: any) {
            0 == i && (t.model.godRecovery(t.gods.map(function (t: any) { return t.id })),
                t.model.event(ViewGodCheck.CHECK_MODE, !1),
                t.closeSelf());
        });
    }

    public onRemoved(): void {
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodRecovery",t)（t=YP=ui.god.godRecoveryUI）。
 */
Laya.class(ViewGodRecovery, "sg.god.view.ViewGodRecovery", null, null);
