/**
 * sg.view.init.ViewLoginPhone —— 手机号验证码登录（tel_sign）。
 *
 * 原文：code1.js 字节 [7440838,7442975]（off 7441731，包装变量 T8，基类 HW=ui.init.viewLoginPhoneUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/ViewLoginPhone.js
 *
 * 依赖：vs=sg.utils.Tools、Gt=sg.cfg.ConfigServer、Rt=sg.cfg.ConfigApp、tn=sg.manager.ViewManager、
 * fn=sg.net.NetHttp、Br=sg.model.ModelPlayer（ambient 全局路径，批次外）、P=laya.utils.Handler。
 */
import Handler = laya.utils.Handler;
import { viewLoginPhoneUI } from "../../ui/init/viewLoginPhoneUI";
import { Tools } from "../../utils/Tools";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ViewManager } from "../../manager/ViewManager";
import { NetHttp } from "../../net/NetHttp";

export class ViewLoginPhone extends viewLoginPhoneUI {

    /** 验证码发送时刻（checkCodeTime 倒计时基准；recode 回包后再 +1e3 抵消一次轮询差） */
    public mCodeTime: number = 0;

    constructor() {
        super();
        this.text0.text = Tools.getMsgById("_login_text1"),
            this.text1.text = Tools.getMsgById("_login_text5"),
            this.text2.text = Tools.getMsgById("_phone02"),
            this.text3.text = Tools.getMsgById("_phone03"),
            this.txtNumber.prompt = Tools.getMsgById("_phone10"),
            this.txtCode.prompt = Tools.getMsgById("_phone11"),
            this.btn_login.label = Tools.getMsgById("_public183"),
            this.mCodeTime = 0,
            this.txtNumber.restrict = "0-9",
            this.txtNumber.maxChars = 11,
            this.txtCode.restrict = "0-9",
            this.txtCode.maxChars = 8,
            this.btn_code.on("click", this, this.click_code),
            this.btn_login.on("click", this, this.click_login),
            ConfigApp.isLandscape && (
                Tools.changeLabelFont(this.text0),
                Tools.changeLabelFont(this.text1),
                Tools.changeLabelFont(this.text2),
                Tools.changeLabelFont(this.text3),
                Tools.changeLabelFont(this.txtNumber),
                Tools.changeLabelFont(this.txtCode),
                Tools.changeLabelFont(this.btn_code.text),
                Tools.changeLabelFont(this.btn_login.text));
    }

    public initData(): void {
        this.checkCodeTime();
    }

    /** 每秒轮询验证码冷却（phone_code_time）：冷却中灰化并显示剩余秒数 */
    public checkCodeTime(): void {
        var t = (new Date).getTime(),
            i = 1e3 * (<any>ConfigServer.system_simple).phone_code_time,
            e = t - this.mCodeTime;
        e > i ? (this.btn_code.gray = !1, this.btn_code.label = Tools.getMsgById("_phone06"))
            : (this.btn_code.gray = !0, this.btn_code.label = Tools.getMsgById("_phone_tips09", [Math.floor(.001 * (i - e))])),
            this.timer.once(1e3, this, this.checkCodeTime);
    }

    /** 发验证码：11 位数字校验通过且非冷却中 → user_zone.send_login_sign */
    public click_code(): void {
        var t = this.txtNumber.text;
        !(t = t.replace(/\s/g, "")) || t &&11 != t.length ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_phone_tips07"))
            : this.btn_code.gray || NetHttp.instance.send("user_zone.send_login_sign", { tel: t }, Handler.create(this, this.recode));
    }

    public recode(t: any): void {
        NetHttp.checkReIsError(t) ? ViewManager.instance.showTipsTxt(t.msg) : this.mCodeTime = (new Date).getTime() + 1e3;
    }

    /** 登录：号码+≥6 位验证码写 ModelPlayer（setUID ready/setPhone/setPhoneCode/setPlayerList）→ event_login_ok */
    public click_login(): void {
        var t = this.txtNumber.text;
        t = t.replace(/\s/g, "");
        var i = this.txtCode.text;
        i = i.replace(/\s/g, ""),
            !t || t &&11 != t.length ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_phone_tips07"))
                : i && i.length >= 6 ? (
                    sg.model.ModelPlayer.instance.setUID("ready"),
                    sg.model.ModelPlayer.instance.setPhone(t),
                    sg.model.ModelPlayer.instance.setPhoneCode(i),
                    sg.model.ModelPlayer.instance.setPlayerList(),
                    ViewManager.instance.closePanel(),
                    sg.model.ModelPlayer.instance.event("event_login_ok", 2))
                    : ViewManager.instance.showTipsTxt(Tools.getMsgById("_phone_tips08"));
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewLoginPhone",t)（t=HW=ui.init.viewLoginPhoneUI）。
 */
Laya.class(ViewLoginPhone, "sg.view.init.ViewLoginPhone", null, null);
