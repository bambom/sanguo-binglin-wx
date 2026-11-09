/**
 * ui.menu.scenesTitleUI —— IDE 生成 UI 类：ViewScenes 标题条（menu/scenesTitle）。
 *
 * 原文：code1.js 字节 [3843704,3844013]（包装变量 OB，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/scenesTitleUI.js
 *
 * 字段不带初始化器（createView 契约，见 viewAlertUI.ts 头注）。
 * 批次 A ViewScenes.checkBg 经全局路径 new ui.menu.scenesTitleUI()；本类注册后
 * 全局路径解析到同一对象（batch-a-report「全局命名空间引用」节）。
 */
import { ItemBase } from "../../view/com/ItemBase";

export class scenesTitleUI extends ItemBase {

    public sg_title: any;
    public sg_img: any;
    public sg_txt: any;
    public sg_btn_close: any;
    public sg_btn_tips: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("menu/scenesTitle");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.menu.scenesTitleUI",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(scenesTitleUI, "ui.menu.scenesTitleUI", null, null);
