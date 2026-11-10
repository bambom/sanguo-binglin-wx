/**
 * ui.init.viewload_sg4UI —— IDE 生成 UI 类：ViewLoadsg4 的皮肤（init/viewload_sg4）。
 *
 * 原文：code1.js 字节 [4496962,4498025]（off 4497829，包装变量 NW，基类 Z_=sg.view.ViewScenes）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewload_sg4UI.js
 *
 * 字段不带初始化器（构造期 createView 契约，同 viewLoadUI.ts 头注）。
 * 与 viewLoadUI 字段面完全一致，仅 loadUI 路径不同（init/viewload_sg4）。
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";

export class viewload_sg4UI extends ViewScenes {

    public bgBox: any;
    public combox: any;
    public btn_login: any;
    public tuid: any;
    public btn_server: any;
    public tZone: any;
    public xuanqu: any;
    public tAll: any;
    public btn_clear1: any;
    public yybBox: any;
    public btnQQ: any;
    public btnWX: any;
    public googleBox: any;
    public btnFB: any;
    public btnGG: any;
    public btnReserve: any;
    public twBox: any;
    public twFB: any;
    public twReserve: any;
    public btn_register: any;
    public txt_register: any;
    public tCopyright: any;
    public btn_affiche: any;
    public txt_affiche: any;
    public progressBox: any;
    public adImg: any;
    public progressBarbg: any;
    public img0: any;
    public img1: any;
    public progressTxt: any;
    public txtShow: any;
    public proWidth: any;
    public progressBar: any;
    public imgProgressBar: any;
    public tVersion: any;
    public yybOut: any;
    public txt_out: any;
    public btn_tel: any;
    public txt_tel: any;
    public box_agreement: any;
    public btn_agree: any;
    public txt_agree: any;
    public ageNotice: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
        (<any>laya.ui.Component.prototype).createChildren.call(this);
        this.loadUI("init/viewload_sg4");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewload_sg4UI",t)（t=Z_=sg.view.ViewScenes）。
 */
Laya.class(viewload_sg4UI, "ui.init.viewload_sg4UI", null, null);
