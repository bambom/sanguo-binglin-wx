/**
 * sg.god.view.ViewGodSortBy —— 神灵排序方式选择（属性/天赋显示开关 + 排序键回传）。
 *
 * 原文：code1.js 字节 [6150874,6153044)（2170B；包装变量 b5，基类 ZP=ui.god.godSortUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodSortBy",t)，off 6151371；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodSortBy.js
 *
 * 依赖：P=Handler、vs=Tools（批次 A 已译）；bo=ModelGodMain（ambient）；
 * d5=ViewGodCheck（本批互引：showProp/showInborn/inRecovery 静态读写）。
 * 惰性静态：h(i,["mData",function(){return this.mData=[...]}]) → TS static get +
 * Object.defineProperty memoize（ConfigAssets/ViewScenes 批次 A 同款换写）。
 */
import Handler = laya.utils.Handler;
import { Tools } from "../../utils/Tools";
import { ViewGodCheck } from "./ViewGodCheck";

export class ViewGodSortBy extends ui.god.godSortUI {

    public handler: any = null;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.txt_title.text = Tools.getMsgById("_beast_text25"),
            Tools.textLayout2(this.txt_title, this.imgName, 340, 245),
            Tools.textFitFontSize(this.btn_propCheck, Tools.getMsgById("god_0086")),
            Tools.textFitFontSize(this.btn_inbornCheck, Tools.getMsgById("god_0087")),
            this.btn_propCheck.on("click", this, this._onSelectShowProp),
            this.btn_inbornCheck.on("click", this, this._onSelectShowInborn),
            this.list.renderHandler = new Handler(this, this._listRender);
    }

    public onAdded(): void {
        this.btn_propCheck.selected = ViewGodCheck.showProp,
            this.btn_inbornCheck.selected = ViewGodCheck.showInborn,
            this.btn_propCheck.disabled = this.btn_inbornCheck.disabled = ViewGodCheck.inRecovery,
            this.handler = this.currArg.handler,
            this.list.array = ViewGodSortBy.mData;
    }

    public _onSelectShowProp(): void {
        this.btn_propCheck.selected = !this.btn_propCheck.selected,
            ViewGodCheck.showProp = this.btn_propCheck.selected,
            this.model.event("update_ui");
    }

    public _onSelectShowInborn(): void {
        this.btn_inbornCheck.selected = !this.btn_inbornCheck.selected,
            ViewGodCheck.showInborn = this.btn_inbornCheck.selected,
            this.model.event("update_ui");
    }

    public _listRender(t: any): void {
        Tools.textFitFontSize(t, t.dataSource.text),
            t.selected = t.dataSource.key === this.currArg.key && t.dataSource.bigFirst === this.currArg.bigFirst,
            t.off("click", this, this._choose),
            t.on("click", this, this._choose, [t.dataSource]);
    }

    public _choose(t: any): void {
        this.handler && this.handler.runWith([t.key, t.bigFirst]),
            this.closeSelf();
    }

    /** h(i,["mData",function(){...}]) —— Laya.static 惰性静态（读取即求值并 memoize） */
    public static get mData(): any[] {
        var v: any[] = [
            { text: Tools.getMsgById("god_gstr") + Tools.getMsgById("god_0009"), key: "gstr", bigFirst: !0 },
            { text: Tools.getMsgById("god_gstr") + Tools.getMsgById("god_0010"), key: "gstr", bigFirst: !1 },
            { text: Tools.getMsgById("god_gagi") + Tools.getMsgById("god_0009"), key: "gagi", bigFirst: !0 },
            { text: Tools.getMsgById("god_gagi") + Tools.getMsgById("god_0010"), key: "gagi", bigFirst: !1 },
            { text: Tools.getMsgById("god_score2") + Tools.getMsgById("god_0009"), key: "score", bigFirst: !0 },
            { text: Tools.getMsgById("god_score2") + Tools.getMsgById("god_0010"), key: "score", bigFirst: !1 },
            { text: Tools.getMsgById("god_0008") + Tools.getMsgById("god_0009"), key: "index", bigFirst: !0 },
            { text: Tools.getMsgById("god_0008") + Tools.getMsgById("god_0010"), key: "index", bigFirst: !1 }
        ];
        Object.defineProperty(ViewGodSortBy, "mData", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodSortBy",t)（t=ZP=ui.god.godSortUI）。
 */
Laya.class(ViewGodSortBy, "sg.god.view.ViewGodSortBy", null, null);
