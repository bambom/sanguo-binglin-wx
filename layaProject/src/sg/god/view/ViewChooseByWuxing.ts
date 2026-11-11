/**
 * sg.god.view.ViewChooseByWuxing —— 五行选择弹窗（btn_0…btn_4 五键回调下标）。
 *
 * 原文：code1.js 字节 [6116848,6117659)（811B；包装变量 l5，基类 FP=ui.god.chooseByWuxingUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewChooseByWuxing",t)，off 6117458；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewChooseByWuxing.js
 *
 * 依赖：vs=sg.utils.Tools、Gi=sg.god.model.ModelGod（ambient 静态 getElementName —— 缺静态
 * 调用点 cast，sg-externals.d.ts 既有类体不可改）。
 */
import { Tools } from "../../utils/Tools";

export class ViewChooseByWuxing extends ui.god.chooseByWuxingUI {

    public handler: any = null;

    constructor() {
        super();
        Tools.textFitFontSize(this.txt_title, Tools.getMsgById("god_0059")),
            this.btn_0.on("click", this, this._choose, [0]),
            this.btn_1.on("click", this, this._choose, [1]),
            this.btn_2.on("click", this, this._choose, [2]),
            this.btn_3.on("click", this, this._choose, [3]),
            this.btn_4.on("click", this, this._choose, [4]),
            Tools.textFitFontSize(this.txt_0, (<any>sg.god.model.ModelGod).getElementName(0)),
            Tools.textFitFontSize(this.txt_1, (<any>sg.god.model.ModelGod).getElementName(1)),
            Tools.textFitFontSize(this.txt_2, (<any>sg.god.model.ModelGod).getElementName(2)),
            Tools.textFitFontSize(this.txt_3, (<any>sg.god.model.ModelGod).getElementName(3)),
            Tools.textFitFontSize(this.txt_4, (<any>sg.god.model.ModelGod).getElementName(4));
    }

    public onAdded(): void {
        this.handler = this.currArg.handler;
    }

    public _choose(t: any): void {
        this.handler && this.handler.runWith(t),
            this.closeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewChooseByWuxing",t)（t=FP=ui.god.chooseByWuxingUI）。
 */
Laya.class(ViewChooseByWuxing, "sg.god.view.ViewChooseByWuxing", null, null);
