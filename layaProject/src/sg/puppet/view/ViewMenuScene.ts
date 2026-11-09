/**
 * sg.puppet.view.ViewMenuScene —— 场景层菜单（ViewManager.mLayerMenuScene）。
 *
 * 原文：code1.js 字节 [3334856,3335220]（off 3334946，包装变量 zd，基类 Fu=sg.view.menu.ViewMenuMainBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewMenuScene.js
 *
 * 依赖：Yu=sg.view.menu.ViewMenuTop（批次外，全局注册路径）；tn=ViewManager（批次 A）。
 */
import { ViewMenuMainBase } from "../../view/menu/ViewMenuMainBase";
import { ViewManager } from "../../manager/ViewManager";

export class ViewMenuScene extends ViewMenuMainBase {

    constructor() {
        super();
        this.mouseThrough = true;
        this.visible = false;
    }

    /** 场景菜单初始化：顶部条 + 场景开/全关联动显隐 */
    public init(): void {
        super.init();
        this.view_top = new sg.view.menu.ViewMenuTop();
        this.addChild(this.view_top);
        ViewManager.instance.on("event_open_scene", this, this.setVisible, [true]);
        ViewManager.instance.on("event_close_all_scene", this, this.setVisible, [false]);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.puppet.view.ViewMenuScene",t)（t=Fu=sg.view.menu.ViewMenuMainBase）。
 */
Laya.class(ViewMenuScene, "sg.puppet.view.ViewMenuScene", null, null);
