/**
 * sg.view.init.ViewHintPanel —— 说明弹窗（ViewManager.showHintPanel 的面板）。
 *
 * 原文：code1.js 字节 [7404533,7406757]（off 7404688，包装变量 b8，基类 UW=ui.init.viewHintUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewHintPanel.js
 *
 * 依赖：js=sg.guide.model.ModelGuide（批次外，全局路径）；tt=laya.ui.Panel、
 * U=laya.html.dom.HTMLDivElement（引擎）。fontSize0/leading0 为 UI 动态属性（经 any）。
 */
import Panel = laya.ui.Panel;
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import Handler = laya.utils.Handler;
import { viewHintUI } from "../../ui/init/viewHintUI";

export class ViewHintPanel extends viewHintUI {

    public oriX_0: number = 0;
    public oriX_1: number = 0;
    public mPanel: Panel = null;
    public mHtml: HTMLDivElement = null;

    constructor() {
        super();
        this.oriX_0 = this.btn0.x;
        this.oriX_1 = this.btn1.x;
    }

    /** 装配：currArg {title,content,dataArr,align}；正文进滚动 Panel 内的富文本 */
    public onAdded(): void {
        sg.guide.model.ModelGuide.forceGuide() && this.closeSelf();
        var t = this.currArg.title,
            i = this.currArg.content,
            e = this.currArg.dataArr,
            s = this.currArg.align ? this.currArg.align : this.txt_content.align;
        this.txt_content.text = "";
        this.mPanel || (
            this.mPanel = new Panel(),
                this.mPanel.centerX = 0,
                this.mPanel.y = this.txt_content.y,
                this.mPanel.width = this.txt_content.width,
                this.mPanel.height = this.txt_content.height,
                this.mPanel.vScrollBarSkin = "comp/vscroll.png",
                (<any>this.mPanel).vScrollBar.visible = false,
                this.txt_content.parent.addChild(this.mPanel));
        this.mHtml || (
            this.mHtml = new HTMLDivElement(),
                this.mHtml.style.color = this.txt_content.color,
                this.mHtml.style.fontSize = (<any>this.txt_content).fontSize0,
                this.mHtml.style.leading = (<any>this.txt_content).leading0,
                this.mHtml.style.align = s,
                this.mHtml.width = this.mPanel.width,
                this.mHtml.x = 0,
                this.mPanel.addChild(this.mHtml));
        this.mHtml.innerHTML = i,
            (<any>this.mHtml).height = this.mHtml.contextHeight,
            this.mHtml.height < 180 ? this.mPanel.height = 180
                : this.mHtml.height > 340 ? this.mPanel.height = 340
                    : this.mPanel.height = this.mHtml.height,
            this.mHtml.y = this.mHtml.height < this.mPanel.height ? .5 * (this.mPanel.height - this.mHtml.height) : 0,
            this.mPanel.refresh(),
            this.box.height = this.mPanel.height + 160,
            this.btn0.x = this.oriX_0,
            this.btn1.x = this.oriX_1,
            this.btn0.centerX = void 0,
            (<any>this.btn0).clearEvents(),
            (<any>this.btn1).clearEvents(),
            this.btn0.visible = this.btn1.visible = false,
            this.comTitle.setViewTitle(t || sg.utils.Tools.getMsgById("_jia0082")),
            this.btn0.label = sg.utils.Tools.getMsgById("_public183"),
            this.btn1.label = sg.utils.Tools.getMsgById("_shogun_text03"),
            this._setButton(e),
            sg.utils.Tools.textFitFontSize(this.btn0),
            sg.utils.Tools.textFitFontSize(this.btn1);
    }

    /** 按钮配置：数组 → 逐个 btnN {name,handler}；否则单确认按钮 */
    public _setButton(t: any): void {
        if (!(t instanceof Array))
            return this.btn0.visible = true,
                this.btn0.centerX = 0,
                (<any>this.btn0).clearEvents(),
                void this.btn0.once("click", this, this._onClickButton);
        for (var i = 0; i < 2; ++i) {
            var e = t[i], s = (this as any)["btn" + i];
            e && (s.visible = true, s.label = e.name, (<any>s).clearEvents(), s.once("click", this, this._onClickButton, [e && e.handler ? e.handler : null]));
        }
        t.length < 2 && (this.btn0.centerX = 0);
    }

    public _onClickButton(t: any): void {
        this.closeSelf(),
            t instanceof Handler && t.run();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewHintPanel",t)（t=UW=ui.init.viewHintUI）。
 */
Laya.class(ViewHintPanel, "sg.view.init.ViewHintPanel", null, null);
