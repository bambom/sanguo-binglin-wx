/**
 * sg.view.init.ViewLogin —— 账号密码登录/注册/实名/手机/快速登录面板。
 *
 * 原文：code1.js 字节 [7430471,7436766]（off 7431915，包装变量 x8，基类 PW=ui.init.viewLoginUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/ViewLogin.js
 *
 * 依赖（批次 B/A/C/D 模块直引）：vs=sg.utils.Tools、Rt=sg.cfg.ConfigApp、Gt=sg.cfg.ConfigServer、
 * tn=sg.manager.ViewManager、Ht=sg.cfg.ConfigClass、Ts=Laya.Trace、fn=sg.net.NetHttp、
 * Ut=Laya.Platform、fs=sg.utils.ThirdRecording、lr=sg.model.ModelGame、K=laya.maths.MathUtil；
 * T8=sg.view.init.ViewLoginPhone（本批模块直引）；
 * Br=sg.model.ModelPlayer、Fo=sg.model.ModelAntiAddiction（ambient 全局路径，批次外）；
 * D8=sg.view.init.ViewRealName、R8=sg.view.init.ViewRegistFast（批次外 showView 类值，(<any>sg) 全局路径）。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { viewLoginUI } from "../../ui/init/viewLoginUI";
import { Tools } from "../../utils/Tools";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigClass } from "../../cfg/ConfigClass";
import { Trace } from "../../laya/Trace";
import { NetHttp } from "../../net/NetHttp";
import { Platform } from "../../laya/Platform";
import { ThirdRecording } from "../../utils/ThirdRecording";
import { ModelGame } from "../../model/ModelGame";
import { ViewLoginPhone } from "./ViewLoginPhone";

export class ViewLogin extends viewLoginUI {

    public mType: number = 0;
    public mRegistTime: number = 1e3;

    constructor() {
        super();
        this.btn_phone.label = Tools.getMsgById("_login_text1"),
            this.btn_real.label = Tools.getMsgById("_login_text2"),
            this.btn_register.label = Tools.getMsgById("_login_text3"),
            this.btn_fast.label = Tools.getMsgById("_login_text4"),
            this.btn_login.on("click", this, this.click, [0]),
            this.btn_register.on("click", this, this.click, [1]),
            this.btn_real.on("click", this, this.click, [2]),
            this.btn_phone.on("click", this, this.click, [3]),
            this.btn_fast.on("click", this, this.click, [4]),
            this.btn_users.on("click", this, this.click, [5]),
            this.btn_fb.on("click", this, this.click_facebook),
            this.tName.maxChars = 32,
            this.tName.on("input", this, this.changeTxt),
            this.tPwd1.restrict = "0-9a-zA-Z",
            this.tPwd1.maxChars = 16,
            this.tPwd2.restrict = "0-9a-zA-Z",
            this.tPwd2.maxChars = 16,
            this.tName.on("click", this, this.onTxtClick, [1]),
            this.tPwd1.on("click", this, this.onTxtClick, [2]),
            this.tPwd2.on("click", this, this.onTxtClick, [3]),
            this.mRegistTime = 0,
            this.listName.renderHandler = new Handler(this, this.listRender),
            this.listName.selectEnable = !0,
            this.listName.selectHandler = new Handler(this, this.listSelect),
            ConfigApp.isLandscape && (
                Tools.changeLabelFont(this.comTitle),
                Tools.changeLabelFont(this.tName),
                Tools.changeLabelFont(this.tPwd1),
                Tools.changeLabelFont(this.tPwd2),
                Tools.changeLabelFont(this.btn_phone.text),
                Tools.changeLabelFont(this.btn_login.text),
                Tools.changeLabelFont(this.btn_real.text),
                Tools.changeLabelFont(this.btn_register.text),
                Tools.changeLabelFont(this.btn_fast.text));
    }

    public listRender(t: any, i: number): void {
        var e = this.listName.array[i],
            s = t.getChildByName("uname");
        s.text = e.name,
            ConfigApp.isLandscape && Tools.changeLabelFont(s);
    }

    public listSelect(t: any): void {
        if (t > -1) {
            var i = this.listName.array[t];
            this.tName.text = i.name,
                this.tPwd1.text = i.pwd ? i.pwd : i.pwd_s ? i.pwd_s : "",
                this.listBox.visible = !1;
        }
    }

    public changeTxt(): void {
    }

    /** 登录面板装配：按 currArg(mType) 预填账号、实名开关（lr.unlock/ModelAntiAddiction.age）、布局 */
    public initData(): void {
        this.tName.prompt = Tools.getMsgById("_public229"),
            this.tPwd1.prompt = Tools.getMsgById("_public230"),
            this.tPwd2.prompt = Tools.getMsgById("_public231"),
            this.btn_fb.visible = !1,
            this.mType = this.currArg,
            this.listBox.visible = !1,
            this.btn_users.visible = !0,
            this.boxReg.visible = !1,
            this.tPwd2.visible = !1,
            this.btn_login.visible = !0,
            this.btn_register.visible = !0,
            this.btn_phone.visible = "ios_tw" != ConfigApp.pf && "google" != ConfigApp.pf,
            this.btn_fast.visible = !0,
            this.boxReal.visible = "ios_tw" != ConfigApp.pf && "google" != ConfigApp.pf,
            this.btn_login.label = Tools.getMsgById("_lht69"),
            ModelGame.unlock(this.btn_real, "tired_real_name"),
            this.btn_real.visible && !sg.model.ModelPlayer.instance.isTempPlayer && (this.btn_real.visible = !1),
            this.btn_real.visible,
            this.comTitle.text = Tools.getMsgById("_public139");
        var t = 1 != this.mType;
        this.tName.text = t ? "" : sg.model.ModelPlayer.instance.getName(),
            this.tPwd1.text = t ? "" : sg.model.ModelPlayer.instance.getPWD(),
            this.tPwd2.text = "",
            this.click_auto(!0),
            Platform.checkGameStatus(1301),
            2 == this.mType && this.click(1),
            this.btn_real.visible = -1 == sg.model.ModelAntiAddiction.instance.age,
            ConfigApp.isLandscape || (this.mBox.centerY = ConfigApp.isPC ? 0 : -120);
    }

    public onTxtClick(t: any): void {
        console.log("onTxtClick:::", t),
            Platform.checkGameStatus(1400 + t);
    }

    public click_auto(t: any): void {
        sg.model.ModelPlayer.instance.setAutoLogin(!0);
    }

    /** 关闭自判：注册态需先 initData 校验；i=非登录页进入时不可关 */
    public closeSelf(t?: any): void {
        void 0 === t && (t = !0);
        var i = 1 != this.mType, e = !1;
        t && i ? (e = !0, this.boxReg.visible ? this.initData() : ViewManager.instance.showTipsTxt(Tools.getMsgById("_public140"))) : e = !0,
            e && ViewManager.instance.closePanel(t ? this : null);
    }

    public click_facebook(): void {
        var t = this;
        Platform.login(Handler.create(null, function (i: any, e: any) {
            e && (t.tName.text = e.uid, t.tPwd1.text = e.pwd, t.http_user_login(!0));
        }), "fb");
    }

    /** 0=登录提交 1=切注册 2=实名 3=手机 4=快速注册 5=账号列表 */
    public click(t: any): void {
        if (1 == t) Platform.checkGameStatus(1304), this.boxReg.visible = !0, this.tPwd2.visible = !0, this.tPwd1.text = "", this.tPwd2.text = "", this.tName.text = "", this.comTitle.text = Tools.getMsgById("_public145"), this.btn_login.label = Tools.getMsgById("_lht68"), this.btn_users.visible = !1, this.btn_real.visible = !1, this.btn_register.visible = !1, this.boxReal.visible = !1, this.btn_fast.visible = !1, this.btn_phone.visible = !1;
        else if (2 == t) ViewManager.instance.showView(["ViewRealName", (<any>sg).view.init.ViewRealName /* D8 */], null, { type: 0 });
        else if (3 == t) Platform.checkGameStatus(1302), ViewManager.instance.showView(["ViewLoginPhone", ViewLoginPhone /* T8 */], null, { type: 1 });
        else if (4 == t) {
            if (this.registCheck()) return;
            Trace.log("2准备注册的channel--:" + ConfigApp.pf_channel),
                NetHttp.instance.send("user_zone.register_fast", { pf: ConfigApp.pf_channel }, Handler.create(this, this.registFast));
        } else if (5 == t) {
            if (Platform.checkGameStatus(1305), this.listBox.visible = !this.listBox.visible, this.listBox.visible) {
                var i: any, e: any[] = [];
                for (var s in sg.model.ModelPlayer.instance.mPlayerList)
                    (i = sg.model.ModelPlayer.instance.mPlayerList[s]).uid && "ready" == i.uid || i.name && i.name != this.tName.text && (i.times || (i.times = 1), e.push(i));
                e.sort(<any>MathUtil.sortByKey("times", !0)),
                    this.listName.dataSource = e,
                    this.listName.selectedIndex = -1;
            }
        } else
            this.boxReg.visible ? this.func_register() : (Platform.checkGameStatus(1303), this.func_login(!0));
    }

    public registFast(t: any): void {
        NetHttp.checkReIsError(t) ? ViewManager.instance.showTipsTxt(t.msg)
            : (Platform.checkGameStatus(501),
                ThirdRecording.setRegister(),
                this.closeSelf(!1),
                ViewManager.instance.showView(["ViewRegistFast", (<any>sg).view.init.ViewRegistFast /* R8 */], t));
    }

    /** 注册节流：regist_gap_time 内拒绝 */
    public registCheck(): boolean {
        var t = !1, i = (new Date).getTime(),
            e = i - this.mRegistTime,
            s = 1e3 * (<any>ConfigServer.system_simple).regist_gap_time;
        return e >= s ? this.mRegistTime = i : (ViewManager.instance.showTipsTxt(Tools.getMsgById("_lht72") + Tools.getTimeStyle(s - e)), t = !0), t;
    }

    /** 注册表单校验（3 段长度+两次一致）→ user_zone.register */
    public func_register(): void {
        if (!this.registCheck()) {
            var t = !1, i = !1, e = !1, s = this.tName.text;
            if ((s = s.replace(/\s/g, "")).length >= 3)
                if (t = !0, this.tPwd1.text.length >= 6)
                    if (i = !0, this.tPwd2.text.length >= 6)
                        if (e = !0, this.tPwd1.text == this.tPwd2.text) {
                            if (t && i && e && !0) {
                                var n = { username: s, pf: ConfigApp.pf_channel, pwd: this.tPwd1.text, pwd1: this.tPwd2.text };
                                Trace.log("1准备注册的channel--:" + ConfigApp.pf_channel),
                                    NetHttp.instance.send("user_zone.register", n, Handler.create(this, this.http_user_register));
                            }
                        } else ViewManager.instance.showTipsTxt(Tools.getMsgById("_public144"));
                        else ViewManager.instance.showTipsTxt(Tools.getMsgById("_public143"));
                    else ViewManager.instance.showTipsTxt(Tools.getMsgById("_public142"));
                else ViewManager.instance.showTipsTxt(Tools.getMsgById("_public141"));
        }
    }

    public func_login(t: any): void {
        var i = !1, e = this.tName.text;
        (e = e.replace(/\s/g, "")).length >= 2 ? (i = !0, this.tPwd1.text.length >= 6 ? i && !0 && this.http_user_login(t) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_public142"))) : ViewManager.instance.showTipsTxt(Tools.getMsgById("_public141"));
    }

    public http_user_register(t: any): void {
        Platform.checkGameStatus(502),
            NetHttp.checkReIsError(t) ? ViewManager.instance.showTipsTxt(t.msg) : (ThirdRecording.setRegister(), this.func_login(!1));
    }

    /** 账密落 ModelPlayer → event_login_ok（0=按钮/自动，-1=注册后） */
    public http_user_login(t: any): void {
        var i = this.tName.text;
        i = i.replace(/\s/g, ""),
            sg.model.ModelPlayer.instance.loginName = i,
            sg.model.ModelPlayer.instance.loginPwd = this.tPwd1.text,
            this.closeSelf(!1),
            sg.model.ModelPlayer.instance.event("event_login_ok", t ? 0 : -1);
    }

    public onRemoved(): void {
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewLogin",t)（t=PW=ui.init.viewLoginUI）。
 */
Laya.class(ViewLogin, "sg.view.init.ViewLogin", null, null);
