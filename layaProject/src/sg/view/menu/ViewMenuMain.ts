/**
 * sg.view.menu.ViewMenuMain —— 常驻主菜单层（竖版/通用形态，无平台后缀）。
 *
 * 原文：code1.js 字节 [3346387,3351901]（包装变量 Jd，基类实参 Fu=ViewMenuMainBase，
 * 声明器 init 单一 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-10 批次 H）。
 * 注册：o(i,"sg.view.menu.ViewMenuMain",t)，t=Fu。o 实参字面量 @3346655。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-h/ViewMenuMain.js
 *
 * ViewManager.init 直 new（"sg4"===HelpConfig.type_ui 三元的无后缀分支；wx_37 F8 实测
 * 走本分支）。构造期仅 9 个 null 字段 + Fu ctor，零未译触达；重量级触达全在 init()
 * （ViewManager.initGame 于登录数据装载完成后调用），其间 new 的菜单闭包宽类
 * （i_/Yu/cJ/lJ/rJ/dJ/gK/Mit/Sc/Fl/hJ/oJ）批次 B 缓译清单维持，本批走全局注册路径。
 *
 * var 绑定（批次 H 双证：作用域链 + class-inventory assignedVar 全局唯一绑定）：
 *   Ct=laya.utils.Tween、P=laya.utils.Handler、k=laya.utils.Ease（引擎别名表）
 *   tn=ViewManager(A)、ue=ModelManager(B)、Rt=ConfigApp(B)、lr=ModelGame(D)、
 *   Qr=ModelViewHomeLand(D)、Z_=ViewScenes(A)
 *   i_=sg.view.menu.HomeBtnsBox、Yu=sg.view.menu.ViewMenuTop、cJ=sg.view.menu.ViewMenuUser、
 *   lJ=sg.view.menu.ViewMenuLeft、rJ=sg.view.menu.ViewMenuBottom、dJ=sg.view.menu.ViewTroopList、
 *   gK=sg.view.chat.ViewChatMain2、Mit=sg.view.qqdt.LanzuanBtn、Sc=sg.homeland.view.HomeLandViewMain、
 *   Fl=sg.homeland.view.BuildMenuAdd、hJ=sg.view.menu.ViewHomeLand_Build、oJ=sg.view.menu.ViewHomeLand_Change
 */
import Tween = laya.utils.Tween;
import Handler = laya.utils.Handler;
import Ease = laya.utils.Ease;
import { ViewMenuMainBase } from "./ViewMenuMainBase";
import { ViewManager } from "../../manager/ViewManager";
import { ModelManager } from "../../manager/ModelManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ModelGame } from "../../model/ModelGame";
import { ModelViewHomeLand } from "../../model/ModelViewHomeLand";
import { ViewScenes } from "../ViewScenes";

export class ViewMenuMain extends ViewMenuMainBase {

    public view_homeland_build: any = null;
    public view_homeland_change: any = null;
    public view_bottom: any = null;
    public view_user: any = null;
    public view_left: any = null;
    public view_troop: any = null;
    public home_Btns: any = null;
    public btn_switch: any = null;
    public mComChat: any = null;

    constructor() {
        super();  // 原文 i.__super.call(this)（9 字段前置为纯 null 赋值，顺序等价）
    }

    /** 组装六区菜单：主页按钮/顶栏/用户区/左列表/编队栏/切换钮，挂事件后布局 */
    public init(): void {
        ViewMenuMainBase.prototype.init.call(this),
            this.home_Btns = new sg.view.menu.HomeBtnsBox(),
            this.view_top = new sg.view.menu.ViewMenuTop(),
            this.view_top.cacheAs = "normal",
            this.view_user = new sg.view.menu.ViewMenuUser(),
            this.view_left = new sg.view.menu.ViewMenuLeft(),
            this.view_bottom = new sg.view.menu.ViewMenuBottom(),
            this.btn_switch = this.view_bottom.btn_switch || this.view_user.btn_switch,
            ModelGame.unlock(this.btn_switch, "menu_switch"),
            this.btn_switch.on("click", this, this.onClickSwitch),
            ModelManager.instance.modelGame.on("event_click_switch_btn", this, this.onClickSwitch),
            this.view_troop = new sg.view.menu.ViewTroopList(),
            this.home_Btns.visible = false,
            this.home_Btns.mouseThrough = true,
            this.addChildren(this.home_Btns, this.view_left, this.view_top, this.view_user, this.view_troop, this.view_bottom, this.btn_switch),
            ModelManager.instance.modelGame.off("event_show_chat", this, this.chatShowCallBack),
            ModelManager.instance.modelGame.on("event_show_chat", this, this.chatShowCallBack),
            ModelManager.instance.modelGame.off("event_hide_chat", this, this.chatHideCallBack),
            ModelManager.instance.modelGame.on("event_hide_chat", this, this.chatHideCallBack),
            ModelManager.instance.modelHomeLand.off(ModelViewHomeLand.CHOOSE_PANEL, this, this.homeLandBuildShow),
            ModelManager.instance.modelHomeLand.on(ModelViewHomeLand.CHOOSE_PANEL, this, this.homeLandBuildShow),
            ConfigApp.isLandscape && (
                this.mComChat = new sg.view.chat.ViewChatMain2(),
                ViewManager.instance.mLayerChat.addChild(this.mComChat),
                this.mComChat.x = -this.mComChat.width,
                this.mComChat.visible = false),
            this.layout(),
            ViewManager.instance.on("event_open_scene", this, this.setVisible, [false]),
            ViewManager.instance.on("event_close_all_scene", this, this.checkMap),
            ViewManager.instance.on("event_switch_map_start", this, this.switchMap);
    }

    public checkMap(): void {
        var t = ViewManager.instance.sceneMain.type;
        this.switchMap(t);
    }

    public switchMap(t: any): void {
        var i = 0 === t || 4 === t, e = 1 === t;
        this.home_Btns.visible = i,
            this.view_troop.visible = e;
        var s = i || e;
        this.btn_switch.visible = s,
            this.setVisible(s);
    }

    /** 家园面板切换：判别式为逗号表达式（先隐藏底栏与两 homeland 面板，再按 t 分发） */
    public homeLandBuildShow(t: any): void {
        switch (this.view_bottom.visible = false,
            this.view_homeland_build && (this.view_homeland_build.visible = false),
            this.view_homeland_change && (this.view_homeland_change.visible = false),
            t) {
            case ModelViewHomeLand.TYPE_CREATE:
                this.view_homeland_build || (this.view_homeland_build = new sg.view.menu.ViewHomeLand_Build(), this.view_homeland_build.bottom = 0, this.addChild(this.view_homeland_build)),
                    this.view_homeland_build.visible = true,
                    this.beginEditHome();
                break;
            case ModelViewHomeLand.TYPE_EDIT:
                this.view_homeland_change || (this.view_homeland_change = new sg.view.menu.ViewHomeLand_Change(), this.view_homeland_change.bottom = 0, this.addChild(this.view_homeland_change)),
                    this.view_homeland_change.visible = true;
                break;
            case ModelViewHomeLand.TYPE_QUIT:
                this.view_bottom.visible = true,
                    ModelViewHomeLand.CUR_PANEL_STATE = ModelViewHomeLand.TYPE_QUIT,
                    this.quitEditHome();
        }
    }

    public chatShowCallBack(t: any): void {
        this.mComChat && (
            this.mComChat.visible
                ? t && this.mComChat.preInputFunc(t)
                : (this.mComChat.visible = true,
                    this.mComChat.preInputFunc(t),
                    Tween.to(this.mComChat, { x: 0 }, 150, Ease.quadOut)),
            ModelManager.instance.modelGame.comChatVisible = this.mComChat.visible);
    }

    public chatHideCallBack(): void {
        var t = this;
        this.mComChat && this.mComChat.visible && Tween.to(this.mComChat, { x: -this.mComChat.width }, 150, Ease.quadOut, new Handler(this, function () {
            t.mComChat.visible = false, ModelManager.instance.modelGame.comChatVisible = false;
        }));
    }

    public tweenFun(): void {
        4 != ViewManager.instance.sceneMain.type && (
            this.view_bottom.visible = this.view_top.visible = this.view_user.visible = this.view_left.visible = true,
            this.setVisible(true));
    }

    /** 菜单布局：if 条件为逗号链（全部定位副作用先行，判别值取 isHorizontal）——保序保留 */
    public layout(): void {
        if (this.view_bottom.init(),
            this.view_user.checkNpcInfo(),
            this.view_user._checkMilepost(),
            this.view_left.initList(),
            this.view_bottom.bottom = 0,
            this.view_top.top = 0,
            this.view_user.top = ViewScenes.TOP_HEIGHT,
            this.view_user.left = 0,
            ConfigApp.isLandscape
                ? (this.view_left.top = 35, this.view_left.right = 200 + (ConfigApp.releaseMiniGame() ? 100 : 0))
                : (this.view_left.top = 160, this.view_left.left = 0),
            this.home_Btns.x = 530,
            this.home_Btns.top = ViewScenes.TOP_HEIGHT + (ConfigApp.isLandscape ? (ConfigApp.releaseMiniGame() ? 90 : 40) : 70),
            ConfigApp.isLandscape
                ? (this.view_troop.top = 165, this.view_troop.right = 4)
                : (this.view_troop.top = ViewScenes.TOP_HEIGHT + 152, this.view_troop.right = 10),
            ConfigApp.isHorizontal) {
            var t = ConfigApp.releaseMiniGame() ? 70 : ConfigApp.isbangs ? Number(ConfigApp.isbangs) : 0;
            this.view_user.top = 0,
                this.view_user.left = 0 + t,
                ConfigApp.releaseMiniGame() && (this.view_user.boxTop.left = 0 - t),
                this.view_user.right = 0,
                this.home_Btns.x = this.width - 100,
                this.view_bottom.left = this.view_bottom.right = 0,
                ConfigApp.isLandscape && (
                    this.view_bottom.guide_arrow.left = 6 + t,
                    this.view_bottom.btn_guide.left = 5 + t,
                    this.view_bottom.getChildByName("box_left").left = 13 + t,
                    this.view_bottom.getChildByName("box_task").left = 0 + t);
        }
        if ("h5_qqdt" == ConfigApp.pf || "h5_qqdt3" == ConfigApp.pf) {
            var i: any = new sg.view.qqdt.LanzuanBtn();
            i.centerX = this.view_top.x + this.view_top.width + 50,
                i.y = this.view_top.y + 50,
                this.addChild(i);
        }
    }

    /** 按名取按钮：本类字段 → 底/顶/编队/用户区 → 左列表/主页盒 → 家园编辑态兜底 */
    public getButton(t: any): any {
        var i = null;
        return (i = (this as any)[t]) || (i = this.view_bottom[t]),
            i || (i = this.view_top[t]),
            i || (i = this.view_troop[t]),
            i || (i = this.view_user[t]),
            i || (i = this.view_left.getSpriteByName(t)),
            i || (i = this.home_Btns.getSpriteByName(t)),
            !i && sg.homeland.view.HomeLandViewMain.instance && (
                sg.homeland.view.BuildMenuAdd.instance && sg.homeland.view.BuildMenuAdd.instance.visible && (i = sg.homeland.view.BuildMenuAdd.instance[t]),
                !i && this.view_homeland_build && (i = this.view_homeland_build.getSpriteByName(t)),
                !i && this.view_homeland_change && (i = this.view_homeland_change.getSpriteByName(t))),
            i;
    }

    public getTroop(t: any): any {
        return this.view_troop.getTroopByIndex(t);
    }

    public getTroopById(t: any): any {
        return this.view_troop.getTroopById(t);
    }

    public beginEditHome(): void {
        this.tweenFun(),
            [this.view_left, this.view_user, this.home_Btns, this.btn_switch].forEach(function (t: any) {
                Tween.to(t, { alpha: 0 }, 500, null), t.mouseEnabled = false;
            });
    }

    public quitEditHome(): void {
        this.tweenFun(),
            [this.view_left, this.view_user, this.home_Btns, this.btn_switch].forEach(function (t: any) {
                Tween.to(t, { alpha: 1 }, 500, null), t.mouseEnabled = true;
            });
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.menu.ViewMenuMain",t)（t=Fu=ViewMenuMainBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewMenuMain, "sg.view.menu.ViewMenuMain", null, null);
