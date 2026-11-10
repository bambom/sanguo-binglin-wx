/**
 * sg.view.init.ViewLoginChoose —— 登录方式三选一（登录/快速注册/游客）。
 *
 * 原文：code1.js 字节 [7436774,7437932]（off 7437130，包装变量 w8，基类 DW=ui.init.viewLoginChooseUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/ViewLoginChoose.js
 *
 * 依赖：vs=sg.utils.Tools、Ts=Laya.Trace、Rt=sg.cfg.ConfigApp、Gt=sg.cfg.ConfigServer、
 * fn=sg.net.NetHttp、Ut=Laya.Platform、fs=sg.utils.ThirdRecording、tn=sg.manager.ViewManager、
 * Ht=sg.cfg.ConfigClass（批次 B/A/C 模块）；
 * R8=sg.view.init.ViewRegistFast（批次外，showView 类值引用走全局注册路径）。
 */
import Handler = laya.utils.Handler;
import { viewLoginChooseUI } from "../../ui/init/viewLoginChooseUI";
import { Tools } from "../../utils/Tools";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { NetHttp } from "../../net/NetHttp";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigClass } from "../../cfg/ConfigClass";
import { Trace } from "../../laya/Trace";
import { Platform } from "../../laya/Platform";
import { ThirdRecording } from "../../utils/ThirdRecording";

export class ViewLoginChoose extends viewLoginChooseUI {

    /** 注册节流基准（ctor 先置 1e3 再归 0） */
    public mRegistTime: number = 1e3;

    constructor() {
        super();
        this.btn_reg.label = Tools.getMsgById("_lht87"),
            this.btn_fast.label = Tools.getMsgById("_lht88"),
            this.btn_login.label = Tools.getMsgById("_lht89"),
            this.mRegistTime = 0,
            this.btn_reg.on("click", this, this.click, [2]),
            this.btn_fast.on("click", this, this.click, [3]),
            this.btn_login.on("click", this, this.click, [1]);
    }

    public initData(): void {
        this.isAutoClose = !1;
    }

    /** 3=快速注册（节流+user_zone.register_fast）；1/2=VIEW_LOGIN 携 type */
    public click(t: any): void {
        if (3 == t) {
            if (this.registCheck()) return;
            Trace.log("2准备注册的channel--:" + ConfigApp.pf_channel),
                NetHttp.instance.send("user_zone.register_fast", { pf: ConfigApp.pf_channel }, Handler.create(this, this.registFast));
        } else
            ViewManager.instance.showView(ConfigClass.VIEW_LOGIN, [t]);
    }

    /** 注册节流：regist_gap_time 内拒绝 */
    public registCheck(): boolean {
        var t = !1, i = (new Date).getTime(),
            e = i - this.mRegistTime,
            s = 1e3 * (<any>ConfigServer.system_simple).regist_gap_time;
        return e >= s ? this.mRegistTime = i : (ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht72") + Tools.getTimeStyle(s - e)), t = !0), t;
    }

    /** 快速注册回包：错误走 tips；成功则 501 打点+setRegister+关闭本面板+ViewRegistFast（R8 全局路径） */
    public registFast(t: any): void {
        NetHttp.checkReIsError(t) ? ViewManager.instance.showTipsTxt(t.msg)
            : (Platform.checkGameStatus(501),
                ThirdRecording.setRegister(),
                ViewManager.instance.closePanel(),
                ViewManager.instance.showView(["ViewRegistFast", (<any>sg).view.init.ViewRegistFast /* R8 */], t));
    }

    public onRemoved(): void {
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewLoginChoose",t)（t=DW=ui.init.viewLoginChooseUI）。
 */
Laya.class(ViewLoginChoose, "sg.view.init.ViewLoginChoose", null, null);
