/**
 * sg.view.ViewPanel —— 弹窗基座（628 个子孙类）。
 *
 * 原文：code1.js 字节 [3455667,3457537]（off 3456105，包装变量 tm，基类 s_=sg.view.ViewBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewPanel.js
 *
 * 构造期依赖：真实弹窗类（IDE UI 子类）在 super() 链内经 createChildren→loadUI→
 * 本类 createView 生成 mBg/btn_close（引擎 Component 构造触发），随后构造体才操作
 * mBg——该时序是原文隐含契约，见 batch-a-report.md。
 */
import Image = laya.ui.Image;
import { ViewBase } from "./ViewBase";
import { ViewManager } from "../manager/ViewManager";

export class ViewPanel extends ViewBase {

    public isAutoClose: boolean = true;
    /** 原文 this.btnCloseFun=!1 —— 可被 onlyCloseByBtn 覆写为真值/回调 */
    public btnCloseFun: any = false;

    constructor() {
        super();  // 原文 i.__super.call(this)（链内可能已生成 mBg/btn_close）

        // 原文：Rt.isHorizontal && !this.noAlignByPC && (…)；noAlignByPC 为子类约定属性，
        // 原文未声明（构造期为 undefined，恒走对齐分支），保持动态访问。
        sg.cfg.ConfigApp.isHorizontal && !(<any>this).noAlignByPC && (
            this.width = Laya.stage.width,
            this.height = Laya.stage.height);
        this.mBg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.mBg.alpha = .7;
        this.mBg.mouseEnabled = true;
        this.mBg.hitTestPrior = true;
        this.mBg.width = Laya.stage.width;
        this.mBg.height = Laya.stage.height;
        (<any>this).btn_close && (<any>this).btn_close.on("click", this, this.closeSelf);
    }

    /** 建蒙版后回laya.ui.View 原实现构建视图（原文直接调 View.prototype.createView） */
    public createView(t: any): void {
        this.mBg = new Image();
        this.mBg.name = "_$_bg_mask_$_";
        this.mBg.visible = false;
        this.addChild(this.mBg);
        (<any>laya.ui.View.prototype).createView.call(this, t);
    }

    public checkBg(t: any): void {
        this.mBg.visible = t > 0;
        this.height = Laya.stage.height;
    }

    public setTitle(t: any): void {
    }

    public onAddedBase(): void {
        sg.guide.view.GuideFocus.focusOut();
        this.on("click", this, this.onClick_bg);
        this.onAdded();
        this.test_clip_int(1);
    }

    /** 延迟 1 秒再监听背景点击（避免透传误关） */
    public delayClickEvent(): void {
        this.off("click", this, this.onClick_bg);
        Laya.timer.once(1e3, this, this.addClickEvent);
    }

    public addClickEvent(): void {
        this.on("click", this, this.onClick_bg);
    }

    public onRemovedBase(): void {
        this.off("click", this, this.onClick_bg);
        this.onRemoved();
        this.cacheAs = "none";
    }

    public onChange(t: any): void {
    }

    /**
     * 背景点击：非关闭来源且未限定按钮关闭 → 关闭自身；
     * 限定按钮关闭时仅响应 btn_close（原文条件结构逐句保留）。
     */
    public onClick_bg(t: any): void {
        "btn_close" != t.target.name && t.target != this.mBg || this.btnCloseFun
            ? this.btnCloseFun && "btn_close" == t.target.name && this.btnClickClose()
            : this.closeSelf();
    }

    /** 原文空实现，子类覆写 */
    public btnClickClose(): void {
    }

    public onlyCloseByBtn(t: boolean): void {
        this.btnCloseFun = t;
    }

    /** 原文默认参 t=true；作为 click 回调被调用时收到的是 Event（真值），行为保持 */
    public closeSelf(t?: any): void {
        void 0 === t && (t = true);
        this.isAutoClose && ViewManager.instance.closePanel(t ? this : null);
    }

    /** btn_close 定向查找：先在子树内找 __className 含 panel_bg_btn 的节点 */
    public getSpriteByName(i: string): any {
        if ("btn_close" === i) {
            var e = this._getPanelBgBtn(this);
            if (e) return e.getChildByName(i);
        }
        return super.getSpriteByName(i);
    }

    /** 递归查 __className 匹配 /panel_bg_btn/ 的节点（依赖 Laya.class 注册身份） */
    public _getPanelBgBtn(t: any): any {
        if (/panel_bg_btn/.test(t.__className)) return t;
        var i = (<any>t)._childs.length;
        if (i)
            for (var e = 0; e < i; ++e) {
                var s = (<any>t)._childs[e], n = this._getPanelBgBtn(s);
                if (n) return n;
            }
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewPanel",t)（t=s_=sg.view.ViewBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewPanel, "sg.view.ViewPanel", null, null);
