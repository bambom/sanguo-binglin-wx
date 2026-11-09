/**
 * sg.view.init.ViewHeroTalk —— 主线武将对话（ViewManager.showHeroTalk 的面板）。
 *
 * 原文：code1.js 字节 [7373632,7377654]（off 7373799，包装变量 p8，基类 AW=ui.map.eventTalk1UI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewHeroTalk.js
 *
 * 依赖：Rt=ConfigApp、ue=ModelManager、vs=Tools、re=AssetsManager（批次 B 模块直引）；
 * tn=ViewManager（批次 A）；Gt=ConfigServer（B）、_r=ModelHero、Ut=Laya.Platform、
 * K=laya.maths.MathUtil（引擎）。UI 动态节点（cbComHero/box0/box1/aniShow1/aniShow2/
 * cbHtml0/cbHtml1/nameBg0/nameBg1）由 loadUI 从 UI JSON 动态挂载，原文未在 UI 类
 * 预声明，译文在使用类补声明（动态成员，均 any）。
 */
import Image = laya.ui.Image;
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { eventTalk1UI } from "../../ui/map/eventTalk1UI";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";

export class ViewHeroTalk extends eventTalk1UI {

    public talk_list: any[] = [];
    public click_count: number = 0;
    public fun: any = null;
    public mMaxHero: any = "";
    public lastHid: any = "";
    // ---- UI 动态节点（loadUI 挂载，原文未预声明） ----
    public cbComHero: any;
    public box0: any;
    public box1: any;
    public aniShow1: any;
    public aniShow2: any;
    public cbHtml0: any;
    public cbHtml1: any;
    public nameBg0: any;
    public nameBg1: any;

    constructor() {
        super();
        ConfigApp.isLandscape && (this.mBg.alpha = .85);
    }

    public onAdded(): void {
        ViewManager.instance.on("event_close_hero_talk", this, this.eventCallBack),
            this.click_count = 0,
            this.talk_list = this.currArg[0],
            this.fun = this.currArg[1],
            this.mMaxHero = this.currArg[2],
            this.lastHid = "",
            this.comHero.hid = "",
            this.talk_list ? this.setData() : ViewManager.instance.closePanel(this);
    }

    public eventCallBack(): void {
        this.closeSelf();
    }

    /**
     * 对话装配：talk_list 项 [头像id, 名文案key, 正文key, 参数?, 附加?]；
     * 纯数字头像按战力取自己武将；boxusr=玩家头像；boxherotop=榜首；
     * 横屏双立绘交替，竖屏单立绘左右交替；bigHero 附加换大图。
     */
    public setData(): void {
        if (this.click_count != this.talk_list.length) {
            var t = this.talk_list[this.click_count], i = t[0];
            if (!isNaN(parseInt(i))) {
                var e: any, s: any[] = [];
                for (var n in ConfigServer.hero)
                    (e = ModelManager.instance.modelGame.getModelHero(n)).isOpenState && e.isMine() && (e.sortPower = e.getPower(e.getPrepare()), s.push(e));
                s.sort(<any>MathUtil.sortByKey("sortPower", true)),
                    (e = s[i] || s[0]) && (t[0] = i = e.id, t[1] = e.name, t[3] = [Tools.getMsgById(e.name)]);
            }
            if ("boxusr" == i) {
                var h = ModelManager.instance.modelUser.getHead();
                t[0] = h;
                var o = ModelManager.instance.modelUser.uname;
                t[1] = o;
            }
            if ("boxherotop" == i) {
                var r = ModelManager.instance.modelGame.getModelHero(this.mMaxHero);
                t[0] = r.id, t[1] = r.name;
            }
            i = t[0];
            var a = t[3] ? t[3] : null;
            this.titleLabel.text = "",
                this.infoLabel.text = "",
                this.htmlLabel0.style.fontSize = (<any>this.titleLabel).fontSize0,
                this.htmlLabel0.style.color = this.titleLabel.color;
            var l = "1" == t[1] || "1" == Tools.getMsgById(t[1]) ? sg.model.ModelHero.getHeroName(i) : Tools.getMsgById(t[1]);
            l = "" == l ? t[1] : l,
                this.htmlLabel1.style.fontSize = (<any>this.infoLabel).fontSize0,
                this.htmlLabel1.style.color = this.infoLabel.color,
                this.htmlLabel1.style.leading = ConfigApp.isLandscape ? 10 : 6;
            var c = Tools.getMsgById(t[2], a);
            if (this.comHero.alpha = 1, ConfigApp.isLandscape) {
                var u = this.cbComHero, d = this.box0, _ = this.box1;
                if (this.lastHid == t[0] && "1" != t[0] || (
                    d.visible = this.click_count % 2 == 0,
                        _.visible = this.click_count % 2 != 0,
                        this.lastHid = t[0],
                        d.visible ? this.aniShow1.play(0, false) : this.aniShow2.play(0, false)),
                    d.visible) {
                    this.comHero.hid && this.comHero.hid == i || (
                        this.comHero.hid = i,
                            this.comHero.setHeroIcon(i, !ConfigApp.isLandscape, -1, true, true, false, null, true, true, "other_hero2"));
                    u.hid = "",
                        this.htmlLabel0.style.align = "center",
                        this.htmlLabel0.innerHTML = l,
                        this.htmlLabel1.style.align = "center",
                        Tools.textFitLayout(this.htmlLabel1, c),
                        (<any>this.htmlLabel1).height = this.htmlLabel1.contextHeight,
                        this.htmlLabel1.y = (this.htmlLabel1.parent.height - this.htmlLabel1.height) / 2;
                }
                if (_.visible) {
                    u.hid && u.hid == i || (
                        u.hid = i,
                            u.setHeroIcon(i, false, -1, true, true, false, null, true, true, "other_hero2")),
                        this.comHero.hid = "";
                    var m = this.cbHtml0;
                    m.style.fontSize = (<any>this.htmlLabel0).fontSize0,
                        m.style.color = this.htmlLabel0.style.color,
                        m.style.align = "center",
                        m.innerHTML = l;
                    var g = this.cbHtml1;
                    g.style.fontSize = (<any>this.htmlLabel1).fontSize0,
                        g.style.color = this.htmlLabel1.style.color,
                        g.style.leading = (<any>this.htmlLabel1).leading0,
                        g.style.align = this.htmlLabel1.style.align,
                        Tools.textFitLayout(g, c),
                        (<any>g).height = g.contextHeight,
                        g.y = (g.parent.height - g.height) / 2;
                }
                this.nameBg0 && (this.nameBg0.visible = "" != l),
                    this.nameBg1 && (this.nameBg1.visible = "" != l);
            } else
                this.htmlLabel0.innerHTML = l,
                    Tools.textFitFontSize2(this.htmlLabel1, c),
                    this.comHero.hid && this.comHero.hid == i || (
                        this.comHero.hid = i,
                            this.comHero.setHeroIcon(i, !ConfigApp.isLandscape, -1, true, true)),
                    this.lastHid == t[0] && "1" != t[0] || (
                        this.comHero.left = this.comHero.right = NaN,
                            this.click_count % 2 == 0 ? this.comHero.left = 50 : this.comHero.right = 50,
                            this.lastHid = t[0]);
            if ((t[4] || {}).bigHero) {
                this.comHero.alpha = 0;
                var f = AssetsManager.getAssetsHero(sg.model.ModelHero.getHeroIcon(this.lastHid), false),
                    p = new Image(<any>f);
                p.name = "bigHero",
                    p.scale(.7, .7),
                    (<any>p).centerX = 0,
                    (<any>p).bottom = 130,
                    this.comHero.parent.addChildAt(p, 0);
            }
        } else ViewManager.instance.closePanel(this);
    }

    /** 逐条推进：埋点→横屏广播关闭索引→计数+1 重装配 */
    public onClick_bg(t: any): void {
        Laya.Platform.uploadActionData(10, this.talk_list[this.click_count]),
            ConfigApp.isLandscape && ViewManager.instance.event("event_hero_talk_closed", { index: this.click_count, len: this.talk_list.length }),
            this.click_count += 1,
            this.setData();
    }

    public onRemoved(): void {
        ViewManager.instance.off("event_close_hero_talk", this, this.eventCallBack);
        var t = this.comHero.parent.getChildByName("bigHero");
        if (t && t.destroy(), this.fun)
            if (this.fun instanceof Handler) this.fun.runWith(null);
            else {
                var i = Handler.create(this, this.fun);
                i && i.run();
            }
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewHeroTalk",t)（t=AW=ui.map.eventTalk1UI）。
 */
Laya.class(ViewHeroTalk, "sg.view.init.ViewHeroTalk", null, null);
