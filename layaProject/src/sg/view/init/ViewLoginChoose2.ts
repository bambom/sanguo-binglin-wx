/**
 * sg.view.init.ViewLoginChoose2 —— 海外第三方登录方式列表（Apple/Facebook/Google/游客）。
 *
 * 原文：code1.js 字节 [7437940,7439380]（off 7438250，包装变量 C8，基类 RW=ui.init.viewLoginChoose2UI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/ViewLoginChoose2.js
 *
 * 依赖：Gt=sg.cfg.ConfigServer、Rt=sg.cfg.ConfigApp、re=sg.manager.AssetsManager、
 * vs=sg.utils.Tools、Ut=Laya.Platform、Br=sg.model.ModelPlayer（ambient 全局路径，
 * 批次外）、P=laya.utils.Handler（引擎）。
 * 与 ViewLoginChoose2_H 逻辑逐字一致，仅皮肤（list 横竖版）与注册名不同。
 */
import Handler = laya.utils.Handler;
import { viewLoginChoose2UI } from "../../ui/init/viewLoginChoose2UI";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";
import { Platform } from "../../laya/Platform";

export class ViewLoginChoose2 extends viewLoginChoose2UI {

    /** 登录方式表：构造期默认 4 项，onAdded 再按 pf 的 login_type 配置重装 */
    public data_btnList: any[];

    constructor() {
        super();
        this.data_btnList = [
            { type: 1, icon: "btn_open8_Apple.png", text_key: "_login_text6" },
            { type: 2, icon: "btn_open8_Facebook.png", text_key: "_login_text7" },
            { type: 3, icon: "btn_open8_Google.png", text_key: "_login_text8" },
            { type: 0, icon: "btn_open8_youke.png", text_key: "_login_text9" }
        ];
    }

    /** 按当前 pf 取 login_type 配置装配列表（56px 行高 + spaceY 间距） */
    public onAdded(): void {
        this.onlyCloseByBtn(!0),
            this.data_btnList = (<any>ConfigServer.system_simple).login_type[ConfigApp.pf],
            this.list.renderHandler = new Handler(this, this.listRender);
        var t: any[] = this.data_btnList;
        this.list.height = 56 * t.length + (t.length - 1) * this.list.spaceY,
            this.list.array = this.data_btnList;
    }

    public listRender(t: any, i: number): void {
        var e = this.list.array[i],
            s = t.getChildByName("btn_icon"),
            n = t.getChildByName("btn_text");
        s && (s.skin = AssetsManager.getAssetsCOMP(e.icon)),
            n && (n.text = Tools.getMsgById(e.text_key)),
            (<any>t).clearEvents(),
            t.on("click", this, this.btnClickFunc, [e.type]);
    }

    /** 平台登录（0=meng52 游客/1=apple/2=fb/3=gg）；成功回填 uid/token 到 ModelPlayer 并回 ViewLoad（currArg）续登 */
    public btnClickFunc(t: any): void {
        var i = this, e = "";
        switch (t) {
            case 0: e = "meng52"; break;
            case 1: e = "apple"; break;
            case 2: e = "fb"; break;
            case 3: e = "gg";
        }
        var s = this.currArg;
        Platform.login(Handler.create(s, function (t: any, e: any) {
            if (e) {
                s.yybOut.visible = !0,
                    Platform.login_type = e.login_type,
                    sg.model.ModelPlayer.instance.loginName = e.uid,
                    sg.model.ModelPlayer.instance.loginPwd = e.token;
                var n = "meng52" == e.login_type || "meng52_temp_user_pwd" == e.login_type;
                n || (s.loginPaOtherPf[ConfigApp.pf] = e),
                    "cb_google" != ConfigApp.pf && "cb_google1" != ConfigApp.pf || (s.loginPaOtherPf.fromPreRegister = e.fromPreRegister),
                    s.loginByPf(n),
                    s.initSocket(!1),
                    i.closeSelf(!0);
            }
        }), e);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewLoginChoose2",t)（t=RW=ui.init.viewLoginChoose2UI）。
 */
Laya.class(ViewLoginChoose2, "sg.view.init.ViewLoginChoose2", null, null);
