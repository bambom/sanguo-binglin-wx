/**
 * ui.init.viewLoadUI —— IDE 生成 UI 类：ViewLoad 的皮肤（init/viewLoad，竖版）。
 *
 * 原文：code1.js 字节 [4495044,4496099]（off 4495911，包装变量 BW，基类 Z_=sg.view.ViewScenes）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/viewLoadUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createView
 * （loadUI）赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把
 * 已生成对象清空（batch-a-report.md「构造期 createView 契约」）。
 * createChildren 先 regComponent("HTMLDivElement", U=laya.html.dom.HTMLDivElement)。
 */
import View = laya.ui.View;
import { ViewScenes } from "../../view/ViewScenes";

export class viewLoadUI extends ViewScenes {

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
        this.loadUI("init/viewLoad");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.init.viewLoadUI",t)（t=Z_=sg.view.ViewScenes）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(viewLoadUI, "ui.init.viewLoadUI", null, null);
