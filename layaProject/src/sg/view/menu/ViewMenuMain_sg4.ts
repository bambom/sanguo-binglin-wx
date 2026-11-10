/**
 * sg.view.menu.ViewMenuMain_sg4 —— 常驻主菜单层（sg4 版式形态）。
 *
 * 原文：code1.js 字节 [3351909,3353956]（包装变量 Zd，基类实参 Fu=ViewMenuMainBase，
 * 声明器 init 单一 CallExpression，非 Ee 式双跳——acorn 实证 2026-11-10 批次 H）。
 * 注册：o(i,"sg.view.menu.ViewMenuMain_sg4",t)，t=Fu。o 实参字面量 @3352205。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-h/ViewMenuMain_sg4.js
 *
 * ViewManager.init 直 new（"sg4"===HelpConfig.type_ui 三元的 sg4 分支；wx_37 F8 实测
 * 未走本分支，与 ViewMenuMain 同批交付以封闭直 new 面）。构造期触达：Fu ctor +
 * ue.instance.modelGame.on ×2（ModelManager/ModelGame 均 B/D 已译，引擎事件注册），
 * 零未译类触达。init() 的 Yu/VB/q_/td/K_/aJ 与 _showBuffs 的 nit 走全局注册路径
 * （批次 B 缓译清单维持）。
 *
 * var 绑定（批次 H 双证）：
 *   tn=ViewManager(A)、ue=ModelManager(B)、Gt=ConfigServer(B)、lr=ModelGame(D)、
 *   Ro=ModelAlert(B)
 *   Yu=sg.view.menu.ViewMenuTop、VB=ui.menu.top_sg4UI、q_=sg.view.menu.BoxOrder、
 *   td=sg.activities.view.ActIconList、K_=sg.view.menu.RightButtonBox、
 *   aJ=sg.view.menu.ViewMenuBottom_sg4、nit=sg.view.menu.ViewOrders
 */
import { ViewMenuMainBase } from "./ViewMenuMainBase";
import { ViewManager } from "../../manager/ViewManager";
import { ModelManager } from "../../manager/ModelManager";
import { ModelGame } from "../../model/ModelGame";
import { ModelAlert } from "../../model/ModelAlert";
import { ConfigServer } from "../../cfg/ConfigServer";

export class ViewMenuMain_sg4 extends ViewMenuMainBase {

    public view_bottom: any = null;
    public boxOrder: any = null;
    public actIconList: any = null;
    public rightBtns: any = null;

    constructor() {
        super();  // 原文 i.__super.call(this)（4 字段前置为纯 null 赋值，顺序等价）
        // 构造期即挂里程碑/切换钮事件（原文位于 __super 之后，译文字段初始化器
        // 在 super 后执行，观测序等价：字段均为 null 赋值，无读取者）
        ModelManager.instance.modelGame.on("event_CHECK_MILEPOST", this, this._checkMilepost),
            ModelManager.instance.modelGame.on("event_click_switch_btn", this, this.onClickSwitch);
    }

    /** 组装 sg4 菜单：顶栏（sg4 UI 实参）/订单条/活动图标列/右侧按钮组/底部栏 */
    public init(): void {
        ViewMenuMainBase.prototype.init.call(this),
            this.view_top = new (<any>sg.view.menu.ViewMenuTop)(new ui.menu.top_sg4UI()),
            this.view_top.cacheAs = "normal",
            this.boxOrder = new sg.view.menu.BoxOrder(),
            Laya.stage.width > Laya.stage.height || this.boxOrder.pos(0, this.view_top.y + this.view_top.height),
            this._checkMilepost(),
            this.actIconList = new sg.activities.view.ActIconList(),
            this.actIconList.pos(0, 120),
            this.rightBtns = new sg.view.menu.RightButtonBox(),
            this.rightBtns.y = this.actIconList.y,
            this.rightBtns.right = 0,
            this.view_bottom = new sg.view.menu.ViewMenuBottom_sg4(),
            ModelGame.unlock(this.view_bottom.btn_switch, "menu_switch"),
            this.view_bottom.btn_switch.on("click", this, this.onClickSwitch),
            this.view_bottom.btn_switch.visible = false,
            this.addChildren(this.view_top, this.boxOrder, this.actIconList, this.rightBtns, this.view_bottom),
            ViewManager.instance.on("event_open_scene", this, this.setVisible, [false]),
            ViewManager.instance.on("event_close_all_scene", this, this.checkMap),
            ViewManager.instance.on("event_switch_map_start", this, this.switchMap);
    }

    public checkMap(): void {
        var t = ViewManager.instance.sceneMain.type;
        this.switchMap(t);
    }

    public switchMap(t: any): void {
        var i = 0 === t || 4 === t || 1 === t;
        this.boxOrder.visible = this.rightBtns.visible = i,
            this.setVisible(i);
    }

    /** 里程碑红点自循环：order_check_time 秒复检（timer.clear 先行防重入） */
    public _checkMilepost(): void {
        var t = ConfigServer.system_simple.order_check_time || 15;
        if (this.timer.clear(this, this._checkMilepost),
            this.timer.once(1e3 * t, this, this._checkMilepost),
            this.view_bottom && this.view_bottom.btn_country) {
            var i = ModelAlert.checkInvadeWill();
            ModelGame.redCheckOnce(this.view_bottom.btn_country, i);
        }
    }

    public _showBuffs(): void {
        ViewManager.instance.showView(["", sg.view.menu.ViewOrders]);
    }

    public getButton(t: any): any {
        var i = null;
        return (i = (this as any)[t]) || (i = this.view_bottom[t]),
            i || (i = this.view_top[t]),
            i || (i = this.view_bottom[t]),
            i || (i = this.view_bottom.home_Btns.getSpriteByName(t)),
            i;
    }

    public getTroop(t: any): any {
        return this.view_bottom.troopBox.getTroopByIndex(t);
    }

    public getTroopById(t: any): any {
        return this.view_bottom.troopBox.getTroopById(t);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.menu.ViewMenuMain_sg4",t)（t=Fu=ViewMenuMainBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewMenuMain_sg4, "sg.view.menu.ViewMenuMain_sg4", null, null);
