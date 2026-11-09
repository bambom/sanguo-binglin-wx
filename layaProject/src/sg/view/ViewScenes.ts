/**
 * sg.view.ViewScenes —— 场景基座（131 个直接子类）。
 *
 * 原文：code1.js 字节 [3452502,3455659]（off 3453034，包装变量 Z_，基类 s_=sg.view.ViewBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewScenes.js
 *
 * 构造期依赖与 ViewPanel 相同：真实场景类在 super() 链内经 createView 生成 mBg
 * 后，构造体才设置 mBg 的坐标/尺寸（batch-a-report.md「构造期 createView 契约」）。
 */
import Image = laya.ui.Image;
import Rectangle = laya.maths.Rectangle;
import { ViewBase } from "./ViewBase";
import { ViewManager } from "../manager/ViewManager";

export class ViewScenes extends ViewBase {

    /** 顶部区高度（构造时按横竖屏取 70/60） */
    public HEIGHT_TOP: number;
    public HEIGHT_TITLE_TOP: number;
    /** 标题条（ui.menu.scenesTitleUI 实例，checkBg 时惰性创建） */
    public mBoxTitle: any;

    constructor() {
        super();  // 原文 i.__super.call(this)

        this.HEIGHT_TOP = sg.cfg.ConfigApp.isLandscape ? 70 : 60;
        this.HEIGHT_TITLE_TOP = sg.cfg.ConfigApp.isLandscape ? 70 : 60;
        this.mBoxTitle = null;

        // 以下对 mBg 的操作依赖 super() 链内 createView 已生成 mBg（原文时序契约）
        if (sg.cfg.ConfigApp.isPC) {
            this.mBg.x = 0;
            this.mBg.height = Laya.stage.height;
            this.mBg.width = sg.cfg.ConfigApp.isLandscape ? 1138 : 640;
        } else if (sg.cfg.ConfigApp.isLandscape) {
            this.mBg.x = -Math.ceil((Laya.stage.width - 1138) / 2);
            this.mBg.width = Laya.stage.width + 1;
            this.mBg.height = Laya.stage.height + 1;
            this.mBg.mouseEnabled = true;
            this.mBg.mouseThrough = false;
            this.width = 1138;
            this.height = 640;
        } else {
            this.mBg.height = Laya.stage.height;
            this.mBg.width = Laya.stage.width;
        }
        this.test_clip_vis = false;
    }

    /** 建蒙底后回 laya.ui.View 原实现构建视图（原文直接调 View.prototype.createView） */
    public createView(t: any): void {
        this.mBg = new Image();
        this.mBg.name = "_$_bg_mask_$_";
        this.addChild(this.mBg);
        (<any>laya.ui.View.prototype).createView.call(this, t);
    }

    /** 设置提示按钮文案并绑定 ViewManager.showTipsPanel 弹窗 */
    public setTips(t: any): void {
        var i = this.sg_btn_tips;
        i && (
            i.visible = "" !== t,
            i.visible && (
                i.off("click", ViewManager.instance, ViewManager.instance.showTipsPanel),
                i.on("click", ViewManager.instance, ViewManager.instance.showTipsPanel, [t])));
    }

    /** 设置提示按钮皮肤与点击回调 */
    public setBtnHandler(t: any, i: any): void {
        var e = this.sg_btn_tips;
        e && (
            e.visible = true,
            e.SetSkinAfterLoader(t),
            e.width = e.height = 47,
            e.off("click", this, this.btnHandler),
            e.on("click", this, this.btnHandler, [i]));
    }

    public btnHandler(t: any): void {
        t.run();
    }

    public clearTipsBtn(): void {
        var t = this.sg_btn_tips;
        t && (t.visible = false, t.off("click", this, this.btnHandler));
    }

    /** 标题文案：横屏自适应字号，竖屏图文混排 */
    public setTitle(t: any, i?: any): void {
        this.mBoxTitle && (
            this.mBoxTitle.sg_txt.text = t,
            sg.cfg.ConfigApp.isLandscape
                ? sg.utils.Tools.textFitFontSize(this.mBoxTitle.sg_txt)
                : sg.utils.Tools.textLayout2(this.mBoxTitle.sg_txt, this.mBoxTitle.sg_img));
    }

    public click_closeScenes(): void {
        ViewManager.instance.closeScenes();
    }

    /**
     * 场景层次三态（1=带标题、2=无标题、3=全屏无菜单），0=复位；
     * 横屏时 2 折叠为 1 处理（原文 t=2==t?1:t）。
     */
    public checkBg(t: any): void {
        this.mBgType = t;
        var e = 0, n = 0, h = 0;
        t > 0 && (
            this.mBoxTitle || (this.mBoxTitle = new ui.menu.scenesTitleUI()),
            this.mBoxTitle.sg_title.visible = true);
        sg.cfg.ConfigApp.isLandscape && (
            this.mBoxTitle && 2 == t && (this.mBoxTitle.sg_txt.text = ""),
            t = 2 == t ? 1 : t);
        if (0 == t) {
            this.y = 0;
            this.height = Laya.stage.height;
        } else if (1 == t) {
            e = -(this.HEIGHT_TOP + ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal);
            n = this.HEIGHT_TOP + ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal;
            h = -this.HEIGHT_TITLE_TOP;
            this.fLayer(e, n, h);
        } else if (2 == t) {
            e = -(ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal);
            n = ViewScenes.TOP_HEIGHT + sg.cfg.ConfigApp.topVal;
            h = 0;
            this.fLayer(e, n, h);
            this.mBoxTitle.sg_title.visible = false;
        } else if (3 == t) {
            this.fLayer(0, 0, 0);
            this.mBoxTitle.sg_title.visible = false;
            ViewManager.instance.setMenuTopVisible(false);
        }
    }

    /** 场景分层：蒙底 y/皮肤、场景 y、标题条 y 与关闭键绑定、命中区 */
    public fLayer(t: number, i: number, e: number, n?: any): void {
        void 0 === n && (n = "bg_20.png");
        this.mBg.y = t;
        sg.utils.Tools.isNullString(n) || (this.mBg.skin = sg.manager.AssetsManager.getAssetsUI(n));
        this.y = i;
        this.mBoxTitle.y = e;
        this.addChild(this.mBoxTitle);
        this.mBoxTitle.sg_btn_close.off("click", this, this.click_closeScenes);
        this.mBoxTitle.sg_btn_close.on("click", this, this.click_closeScenes);
        this.height = Laya.stage.height - this.y;
        this.hitArea = this.mRect = new Rectangle(this.x, e, this.width, this.height + Math.abs(e));
    }

    public onAddedBase(): void {
        this.onAdded();
    }

    public onRemovedBase(): void {
        this.onRemoved();
    }

    public showCloseButton(): void {
        this.mBoxTitle && this.mBoxTitle.visible && (this.mBoxTitle.sg_btn_close.visible = true);
    }

    public hideCloseButton(): void {
        this.mBoxTitle && this.mBoxTitle.visible && (this.mBoxTitle.sg_btn_close.visible = false);
    }

    public getSpriteByName(i: string): any {
        return "btn_close" === i ? this.mBoxTitle.sg_btn_close : super.getSpriteByName(i);
    }

    /** 原文 r(0,e,"sg_btn_tips",getter) —— 只读实例属性，代理标题条上的提示按钮 */
    public get sg_btn_tips(): any {
        return this.mBoxTitle && this.mBoxTitle.sg_btn_tips ? this.mBoxTitle.sg_btn_tips : null;
    }

    /**
     * 原文 h(i,["TOP_HEIGHT",function(){return this.TOP_HEIGHT=Rt.isLandscape?0:45}])
     * —— Laya.static 惰性静态：首次访问时求值并缓存为类自身数据属性。
     * 此处以静态 getter + defineProperty 换写精确等价其惰性求值/缓存语义。
     */
    public static get TOP_HEIGHT(): number {
        var v = sg.cfg.ConfigApp.isLandscape ? 0 : 45;
        Object.defineProperty(ViewScenes, "TOP_HEIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewScenes",t)（t=s_=sg.view.ViewBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewScenes, "sg.view.ViewScenes", null, null);
