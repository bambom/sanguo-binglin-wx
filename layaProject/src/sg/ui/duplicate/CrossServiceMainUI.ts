/**
 * ui.duplicate.CrossServiceMainUI —— IDE 生成 UI 类：跨服战主界面皮肤（troopList/finishLayer/chat_container/盟主条）（duplicate/CrossServiceMain）。
 *
 * 原文：code1.js 字节 [3493859,3494577)（718B；包装变量 kg，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (e_)=sg.view.com.ItemBase（批次 A 已译）；明文 3 参注册
 * o(i,"ui.duplicate.CrossServiceMainUI",t) @3494144；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/CrossServiceMainUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：troopList / finishLayer / back_btn / chat_container / bottomBar / view_leader / btn_settle / box_leader / heroIcon / txt_leader / icon_leader。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式）；Bt=laya.ui.View（Ee 双跳
 * 声明器 @workcopy char285716 池串解码 + structure-map alias 双证）→ import View 别名。
 * regComponent 组件引用（身份证据 batch-x-report §2）：
 *   ui.menu.troopListUI ← ui.menu.troopListUI（引用形式 ui.menu.troopListUI，缓译全局注册路径）
 *   sg.duplicate.view.DuplicateBottomBar ← sg.duplicate.view.DuplicateBottomBar（引用形式 sg.duplicate.view.DuplicateBottomBar，缓译全局注册路径）
 *   sg.crossService.ui.LeaderTips ← sg.crossService.ui.LeaderTips（批次 V 已译）（引用形式 LeaderTips，已译 import）
 *   sg.duplicate.view.DuplicateBottomIcon ← sg.duplicate.view.DuplicateBottomIcon（引用形式 sg.duplicate.view.DuplicateBottomIcon，缓译全局注册路径）
 *   ui.com.hero_icon1UI ← ui.com.hero_icon1UI（引用形式 ui.com.hero_icon1UI，缓译全局注册路径）
 * V 批 extends 债基类：src/sg/crossService/ui/CrossServiceUI.ts（V 批暂 extends ItemBase → 重指向本类）。
 */
import View = laya.ui.View;
import { ItemBase } from "../../view/com/ItemBase";
import { LeaderTips } from "../../crossService/ui/LeaderTips";

export class CrossServiceMainUI extends ItemBase {

    public troopList: any;
    public finishLayer: any;
    public back_btn: any;
    public chat_container: any;
    public bottomBar: any;
    public view_leader: any;
    public btn_settle: any;
    public box_leader: any;
    public heroIcon: any;
    public txt_leader: any;
    public icon_leader: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("ui.menu.troopListUI", ui.menu.troopListUI), View.regComponent("sg.duplicate.view.DuplicateBottomBar", sg.duplicate.view.DuplicateBottomBar), View.regComponent("sg.crossService.ui.LeaderTips", LeaderTips), View.regComponent("sg.duplicate.view.DuplicateBottomIcon", sg.duplicate.view.DuplicateBottomIcon), View.regComponent("ui.com.hero_icon1UI", ui.com.hero_icon1UI), (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/CrossServiceMain");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.CrossServiceMainUI",t)（t=e_=sg.view.com.ItemBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceMainUI, "ui.duplicate.CrossServiceMainUI", null, null);
