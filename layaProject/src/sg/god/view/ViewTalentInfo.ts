/**
 * sg.god.view.ViewTalentInfo —— 天赋/技能说明浮层（HTML 富文本 + 分割线图片化 + 滚动）。
 *
 * 原文：code1.js 字节 [6160595,6162641)（2046B；包装变量 w5，基类 nD=ui.god.godInfoUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewTalentInfo",t)，off 6161244；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewTalentInfo.js
 *
 * 依赖：vs=Tools、re=AssetsManager、be=TestUtils、Rt=ConfigApp（批次 A–F 已译）；
 * et=laya.maths.Point、U=laya.html.dom.HTMLDivElement、ut=laya.display.Sprite、
 * F=laya.ui.Image、laya.html.dom.HTMLImageElement（instanceof）—— 引擎面。
 * onAdded 内 /<Font color=\'#\w{6}\'>-{60}<\/Font>/gm 正则字面量保真（含 {6}/-{60}
 * 花括号与转义引号，原样照抄）。
 */
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { ConfigApp } from "../../cfg/ConfigApp";

export class ViewTalentInfo extends ui.god.godInfoUI {

    public _info: any = null;
    public infoOriH: number = 0;
    public title: any = null;
    public info: any = null;
    public lineContainer: any = null;
    public startPoint: any;

    constructor() {
        super();
        this.startPoint = new laya.maths.Point(),
            this._info = new laya.html.dom.HTMLDivElement(),
            this.infoOriH = this.container_info.height,
            this.container_info.addChild(this._info),
            this.container_info.vScrollBar.visible = !1,
            this._info.y = 2,
            this._info.width = this._info.style.width = this.container_info.width,
            this._info.style.color = "#fff",
            this._info.style.fontSize = 18,
            this._info.style.leading = 12,
            this._info.style.letterSpacing = 1,
            this.on("mousedown", this, this._onDown),
            this.on("mouseup", this, this._onUp),
            (ConfigApp.testFightType || TestUtils.isTestShow) && this.on("rightclick", this, this.closeSelf);
    }

    public initData(): void {
        this.title = this.currArg.title,
            this.info = this.currArg.info;
    }

    public onAdded(): void {
        var t = this;
        this._info.innerHTML = "",
            this.txt_name.text = this.title,
            ConfigApp.isLandscape ? this.img_name.width = Math.max(300, this.txt_name.textField.textWidth + 250)
                : Tools.textLayout2(this.txt_name, this.img_name, 300, 160);
        var i: any = /<Font color=\'#\w{6}\'>-{60}<\/Font>/gm,
            e = i.test(this.info);
        if (e) {
            var s = "<img src='" + AssetsManager.getAssetsUI("bg_31.png") + "'/>";
            this.info = this.info.replace(i, s);
        }
        this._info.innerHTML = this.info,
            this.lineContainer || (this.lineContainer = new laya.display.Sprite(),
                this.lineContainer.pos(this._info.x, this._info.y),
                this.container_info.addChild(this.lineContainer)),
            this.lineContainer.destroyChildren(),
            e && this._info._childs.forEach(function (i: any) {
                if (i instanceof laya.html.dom.HTMLImageElement) {
                    var e = i;
                    e.visible = !1;
                    var s = new laya.ui.Image((<any>e)._url);
                    s.pos(e.x, e.y),
                        s.width = t._info.width,
                        s.sizeGrid = "0,37,0,62,1",
                        t.lineContainer.addChild(s);
                }
            });
        var n = this._info.height = this._info.contextHeight;
        n = Math.max(100, n),
            n = Math.min(650, n),
            this.container_info.height = this._info.y + n,
            this.container_info.scrollTo(0, 0),
            this.container_info.refresh(),
            this.mBox.height = this.container_info.y + this.container_info.height + this.container_info.x;
    }

    public _onDown(t: any): void {
        this.startPoint.setTo(t.stageX, t.stageY);
    }

    public _onUp(t: any): void {
        this.startPoint.distance(t.stageX, t.stageY) > 10 || this.closeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewTalentInfo",t)（t=nD=ui.god.godInfoUI）。
 */
Laya.class(ViewTalentInfo, "sg.god.view.ViewTalentInfo", null, null);
