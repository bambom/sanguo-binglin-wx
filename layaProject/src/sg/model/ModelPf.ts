/**
 * sg.model.ModelPf —— 渠道平台登录/登出通道（login_success/pf_login/pf_logout/
 * pf_use_logout 四静态，空构造器，无基类；批次 P，F8 第 16 次边界死点本体）。
 *
 * 原文：code1.js 字节 [952054,958943)（Te= 声明器 @952051，0 参 IIFE，池化 2 参
 * 注册 o(i,t(849))，t(849)→pool[634]="sg.model.ModelPf"，无基类）。前邻 sg.fight
 * 簇尾 `…o+=m[12004)]}}return o},i}()`、后邻 Me=（下一声明器）——sg.model 簇。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-p/ModelPf.js
 *
 * 入批依据：F8 第 16 次边界 `Cannot read properties of undefined (reading
 * 'pf_login')` at ViewLoad.checkPFLoginBySDK:535 ← initLoginView:510 ——实测
 * useMyLogin() 为假（wx_37 走 SDK 通道），:567 `ModelManager.instance.modelUser.
 * isLoginHttp || sg.model.ModelPf.pf_login(this, ConfigApp.pf)`，ModelPf 未注册
 * 即死。批次 E finddef 登记 Te@952050（本批 acorn 精界 supersede：声明器 952051、
 * wrapper 952054）。
 *
 * 身份（locate_p.js/resolve_p.js，acorn 作用域链 + 池串索引交叉）：
 *   Ut=sg.laya.Platform（C ✓，注册字面 "Platform" @290507，本类写其静态
 *   pf_login_data/login_type，调 login/logout/restart）、Rt=ConfigApp（B ✓，
 *   pf/pf_channel/isLandscape/onAndroidYYB/get_qq_CMDLINE/releaseWeiXin/
 *   releaseQQ/releaseDouYin）、Ht=ConfigClass（B ✓，VIEW_LOGIN/
 *   VIEW_LOGIN_CHOOSE_2(_H)）、Br=ModelPlayer（K ✓，instance.loginName/loginPwd/
 *   thirdLoginType）、tn=ViewManager（A ✓，instance.showTipsTxt/showView）、
 *   Gt=ConfigServer（B ✓，getServerTimer）、us=SaveLocal（B ✓，getValue/save/
 *   deleteObj）、vs=Tools（B ✓，getMsgById）、$=laya.wx.mini.MiniAdpter、
 *   P=laya.utils.Handler、gt=laya.tt.mini.TTMiniAdapter、m=laya.utils.Browser
 *   （onIOS）、o=Laya.class、sg 全局、n=字符串解码器、JSON 内建。
 *   **0 未译类**（登录/装载链全硬路径已译或引擎）。
 * 声明器单一 CallExpression（`}(),Te=function(){…}(),Me=` 字节实证，非 Ee 式
 * 逗号双跳）。无 `.instance` 惰性访问器（纯静态类，r(1,…) 形态 0 处）。
 *
 * 保真注记（求值序专项见 batch-p-report.md §5）：
 * - login_success 首语句三段形态：`Ut[h(368)]=n`（Platform.pf_login_data 写）
 *   → `var o=n,r=!1,a=!1`（o 局部遮蔽外层 Laya.class 别名——TS 无外层遮蔽，
 *   局部名照抄）→ 单条逗号表达式（hw 族/juedi 三元 → `!r&&a?(12 分支渠道
 *   归并长三元链,loginByPf(),initSocket(!1)):!a&&r&&Ut.restart()`）；
 * - pf_login 条件头为逗号链（btn_server/btn_login/yybOut 三写 + loginStatus=1
 *   + releaseWeiXin 判定同表达式），wx 回调内 changxiang/window pf 族双臂分组、
 *   `return X,void showView(...)` 逗号 return、`o=三元` 先赋值再作
 *   Ut.login 第 2 参（P.create 恒 2 参，X 归 login）、YYB 分支
 *   `us.getValue(...),Gt.getServerTimer()` 弃值逗号 +
 *   `switch(h.yybBox.visible=!0,s)` 判别式逗号（case 0/default 共 break 顺序
 *   照抄）、尾臂 `P.create(h,ModelPf.login_success,[h,e])` 方法引用+实参数组；
 * - pf_logout 三元两臂：真值臂 logout(P.create(n,cb))，假值臂整段括号逗号链
 *   （logout(null) 起 + onAndroidYYB&&(yybBox 写,deleteObj) 尾）；回调内
 *   `e=="google"?…:…cb 族?…:e=="ios_tw"&&…` 三元链后 `,o&&n.checkPFLogin
 *   BySDK()` 逗号续接（o 局部旗标）；
 * - pf_use_logout 巨型 || 链中间嵌 `(i=="h5_qqdt3"||i=="cb_h5_qqdt")&&Rt.
 *   get_qq_CMDLINE()`（先例：|| 链中缀 && 组），三元两臂 `A&&B…||C&&D&&E` /
 *   `!!Ut.h5_sdk&&Ut.h5_sdk.switchSupport` 分组逐字保留；
 * - `sg.model.ModelPf.*` 全局路径自引 3 处 → 类标识符直引（批次 O TimeHelper/
 *   批次 I Facade 先例）；池化串 t(N)/h(N) 全部物化为字面量；解码器别名局部
 *   （var t=n / var h=t / var e=n / var s=n / var h=s 等）唯一用途是池串调用，
 *   物化后整句删除（批次 N ModelGodAct 先例），其余 var 声明照抄。
 *
 * 类型层等价改写（不改运行时语义，批次 C「调用点 cast」先例）：
 *   Platform.login 原文形参 (i,e) 且 e 缺省补 ""（批次 C 交付 Platform.ts:621
 *   签名 (i:any,e:any) 收严 2 必参，红线不改）——本类 4 处 1 参调用点
 *   (<any>Platform)["login"](...) cast（wx/qq/douyin/尾臂 login_success 引用）；
 *   其余 4 处（google/cb_ios/cb_google/YYB）为 2 参形态 Ut.login(P.create(h,cb),X)
 *   ——字符串 X 是 Platform.login 第 2 参（登录类型），P.create 恒 2 参（verify_p.js
 *   AST 深比对曾抓到首译把 X 误嵌 create 第 3 参，已按原文嵌套改正）。
 */

import Handler = laya.utils.Handler;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import TTMiniAdapter = laya.tt.mini.TTMiniAdapter;
import Browser = laya.utils.Browser;
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigClass } from "../cfg/ConfigClass";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { SaveLocal } from "../utils/SaveLocal";
import { ViewManager } from "../manager/ViewManager";
import { ModelPlayer } from "./ModelPlayer";
import { Platform } from "../laya/Platform";

export class ModelPf {
    constructor() {
    }

    public static login_success(i: any, e: any, s: any, n: any): any {
        Platform.pf_login_data = n;
        var o: any = n, r = !1, a = !1;
        "hw" == e || e == "hw_tw" || e == "hw_gzsgz" || e == "hw_jtzl" ? n["hasOwnProperty"]("re") ? a = !0 : n["hasOwnProperty"]("change") && (r = !0) : e == "juedi" ? (n["hasOwnProperty"]("result") && "0" == n["result"] && (o = JSON.parse(n["data"])), a = !0) : a = !0,
            !r && a ? (e == "r2g_xm_ad" || e == "r2g_xm_ios" ? (ConfigApp["pf_channel"] = "r2g_xm", i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "r2g_kr_ad" || e == "r2g_kr_os" || e == "r2g_kr_h5" || e == "r2g_kr_ios" ? (ConfigApp["pf_channel"] = "r2g_kr", i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "r2g_kr2_gg" || e == "r2g_kr2_os" || e == "r2g_kr2_ss" || e == "r2g_kr2_ios" || e == "r2g_kr2_h5" ? (ConfigApp["pf_channel"] = "r2g_kr2", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "cb_ad_r2_gg" || e == "cb_ad_r2_os" || e == "cb_ad_r2_ss" || e == "cb_ios_r2" || e == "cb_h5_r2" ? (ConfigApp["pf_channel"] = "cb_r2g_kr", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "cb_ad_r2_hk" || e == "cb_ios_r2_hk" ? (ConfigApp["pf_channel"] = "cb_r2g_hk", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "cb_ad_fy_hk" || e == "cb_ios_fy_hk" ? (ConfigApp["pf_channel"] = "cb_fy_hk", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "you77_ios_tw" || e == "you77_ios_jp" || e == "you77_ios_jp1" || e == "you77_ad_tw" || e == "you77_ad_jp" || e == "you77_hw_jp" ? (ConfigApp["pf_channel"] = "you77", i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "ad_37_jp" || e == "ad_37_kr" || e == "os_37_kr" || e == "ios_37_jp" || e == "ios_37_kr" || e == "h5_37_jp" || e == "h5_37_jp1" || e == "h5_37_kr" ? (ConfigApp["pf_channel"] = "ea37", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "cb_ad_37_kr" || e == "cb_ios_37_kr" || e == "cb_os_37_kr" || e == "cb_h5_37_kr" ? (ConfigApp["pf_channel"] = "cb_37_kr", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "ad_37_tw" || e == "ios_37_tw" || e == "h5_37_tw" ? (ConfigApp["pf_channel"] = "tw37", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "indofun_ios" || e == "indofun_gg" || e == "indofun_oppo" ? (ConfigApp["pf_channel"] = "indofun", o.pf = ConfigApp.pf, i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "jj_junhai_ios" || e == "jj_junhai_gg" || e == "jj_junhai_os" ? (ConfigApp["pf_channel"] = "jj_junhai", i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : e == "jj_h5_mg1" || e == "jj_h5_mg2" || e == "jj_h5_mg3" ? (ConfigApp["pf_channel"] = "jj_h5_mg", i["loginPaOtherPf"][ConfigApp["pf_channel"]] = o) : i["loginPaOtherPf"][e] = o, i["loginByPf"](), i["initSocket"](!1)) : !a && r && Platform["restart"]();
    }

    public static pf_login(i: any, e: any, s: any): any {
        var h = i;
        if (h["btn_server"]["visible"] = !1,
            h["btn_login"]["visible"] = !1,
            h["yybOut"]["visible"] = ModelPf["pf_use_logout"](e),
            h["loginStatus"] = 1,
            ConfigApp["releaseWeiXin"]()) (<any>Platform)["login"](Handler["create"](h, function (t, i) {
            ConfigApp.pf == "h5_changxiang" ? 200 == t && i ? (h["loginPaOtherPf"][ConfigApp.pf] = i, h["loginByPf"](), h["initSocket"](!1)) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_lht48")) : (ConfigApp.pf == MiniAdpter["window"]["bugu_pf"] || ConfigApp.pf == MiniAdpter["window"]["bugu_sg4_pf"] || ConfigApp.pf == MiniAdpter["window"]["yiyang_pf"] || ConfigApp.pf == MiniAdpter["window"]["game37_pf"] || ConfigApp.pf == MiniAdpter["window"]["twyx_pf"] || ConfigApp.pf == MiniAdpter["window"]["zhangwan_pf"] || ConfigApp.pf == MiniAdpter["window"]["game37_fs_pf"] || ConfigApp.pf == MiniAdpter["window"]["gzsgz_pf"]) && (0 == t && i ? (h["loginPaOtherPf"][ConfigApp.pf] = i, h["loginByPf"](), h["initSocket"](!1)) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_lht48")))
        }));
        else if (ConfigApp["releaseQQ"]()) (<any>Platform)["login"](Handler["create"](h, function (t, i) {
            var s = ConfigApp.pf + (Browser["onIOS"] ? "_ios" : "_ad");
            h["loginPaOtherPf"][s] = i, h["loginByPf"](), h["initSocket"](!1)
        }));
        else if (ConfigApp["releaseDouYin"]()) (<any>Platform)["login"](Handler["create"](h, function (t, i) {
            (ConfigApp.pf == TTMiniAdapter["window"]["tt_bugu_pf"] || ConfigApp.pf == TTMiniAdapter["window"]["tt_37_pf"]) && (0 == t && i ? (h["loginPaOtherPf"][ConfigApp.pf] = i, h["loginByPf"](), h["initSocket"](!1)) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_lht48")))
        }));
        else if (e == "google" || e == "ios_tw") {
            var o = "";
            switch (s) {
                case 3:
                    o = "fb";
                    break;
                case 4:
                    o = "gg";
                    break;
                case 5:
                    o = "meng52"
            }
            if ("" != o) return ModelPlayer["instance"]["thirdLoginType"] = o, void ViewManager["instance"]["showView"](ConfigClass["VIEW_LOGIN"], 1);
            o = ModelPlayer["instance"]["loginName"] && ModelPlayer["instance"]["loginPwd"] ? "meng52_temp_user_pwd" : "meng52",
                Platform["login"](Handler["create"](h, function (t, i) {
                    if (i) {
                        h["yybOut"]["visible"] = !0, Platform["login_type"] = i["login_type"];
                        var o = i["login_type"] == "meng52" || i["login_type"] == "meng52_temp_user_pwd";
                        ModelPlayer["instance"]["loginName"] = i["uid"], ModelPlayer["instance"]["loginPwd"] = i["token"], !o && (h["loginPaOtherPf"][e] = i), h["loginByPf"](o), h["initSocket"](!1)
                    }
                }), o)
        }
        else if (ConfigApp.pf == "cb_ios" || ConfigApp.pf == "cb_ad_mycard" || ConfigApp.pf == "cb_yuanqu_gg" || ConfigApp.pf == "cb_yuanqu_ios") ModelPlayer["instance"]["loginName"] && ModelPlayer["instance"]["loginPwd"] ? Platform["login"](Handler["create"](h, function (t, i) {
            if (i) {
                h["yybOut"]["visible"] = !0, Platform["login_type"] = i["login_type"], ModelPlayer["instance"]["loginName"] = i["uid"], ModelPlayer["instance"]["loginPwd"] = i["token"];
                var o = i["login_type"] == "meng52" || i["login_type"] == "meng52_temp_user_pwd";
                !o && (h["loginPaOtherPf"][e] = i), h["loginByPf"](o), h["initSocket"](!1)
            }
        }), "meng52_temp_user_pwd") : ViewManager["instance"]["showView"](ConfigApp["isLandscape"] ? ConfigClass["VIEW_LOGIN_CHOOSE_2_H"] : ConfigClass["VIEW_LOGIN_CHOOSE_2"], h);
        else if (ConfigApp.pf == "cb_google" || ConfigApp.pf == "cb_google1") {
            var r = "";
            r = ModelPlayer["instance"]["loginName"] && ModelPlayer["instance"]["loginPwd"] ? "meng52_temp_user_pwd" : "meng52",
                Platform["login"](Handler["create"](h, function (t, i) {
                    if (i) {
                        h["yybOut"]["visible"] = !0, Platform["login_type"] = i["login_type"], ModelPlayer["instance"]["loginName"] = i["uid"], ModelPlayer["instance"]["loginPwd"] = i["token"];
                        var o = i["login_type"] == "meng52" || i["login_type"] == "meng52_temp_user_pwd";
                        !o && (h["loginPaOtherPf"][e] = i), (ConfigApp.pf == "cb_google" || ConfigApp.pf == "cb_google1") && (h["loginPaOtherPf"]["fromPreRegister"] = i["fromPreRegister"]), h["loginByPf"](o), h["initSocket"](!1)
                    }
                }), r)
        }
        else if (ConfigApp["onAndroidYYB"](e)) {
            var a = "";
            SaveLocal["getValue"]("login_pf_yyb"), ConfigServer["getServerTimer"]();
            switch (h["yybBox"]["visible"] = !0, s) {
                case 0:
                default:
                    break;
                case 1:
                    a = "qq";
                    break;
                case 2:
                    a = "wx"
            }
            "" != a && Platform["login"](Handler["create"](h, function (t, i) {
                if (0 == t && i) if (i["hasOwnProperty"]("re")) {
                    h["yybOut"]["visible"] = !0;
                    var o = i;
                    o["login_type"] = a, o["get_time"] = ConfigServer["getServerTimer"](), Platform["login_type"] = a, SaveLocal["save"]("login_pf_yyb", o), h["loginPaOtherPf"][e] = o, h["loginByPf"](), h["initSocket"](!1)
                } else if (i["hasOwnProperty"]("un")) {
                    var r = "qq" == i.un ? "QQ" : "微信", l = "qq" == i.un ? "微信" : "QQ";
                    ViewManager["instance"]["showTipsTxt"]("没有安装" + r + ",请您选择" + l + "登录游戏")
                }
            }), a)
        }
        else (<any>Platform)["login"](Handler["create"](h, ModelPf["login_success"], [h, e]))
    }

    public static pf_logout(i: any, e: any): any {
        var n = i;
        ModelPf["pf_use_logout"](e) ? Platform["logout"](Handler["create"](n, function (t, i) {
            if (i && 0 == t) {
                n["yybOut"]["visible"] = !1, n["btn_server"]["visible"] = !1, n["btn_login"]["visible"] = !1, n["loginStatus"] = 1;
                var o = !0;
                e == "google" ? (n["googleBox"]["visible"] = !0, o = !1) : e == "cb_ios" || e == "cb_google" || e == "cb_google1" || e == "cb_ad_mycard" || e == "cb_yuanqu_gg" || e == "cb_yuanqu_ios" ? (ViewManager["instance"]["showView"](ConfigApp["isLandscape"] ? ConfigClass["VIEW_LOGIN_CHOOSE_2_H"] : ConfigClass["VIEW_LOGIN_CHOOSE_2"], n), o = !1) : e == "ios_tw" && (n["twBox"]["visible"] = !0, o = !1), o && n["checkPFLoginBySDK"]()
            }
        })) : (Platform["logout"](null), n["yybOut"]["visible"] = !1, n["btn_server"]["visible"] = !1, n["btn_login"]["visible"] = !1, n["loginStatus"] = 1, ConfigApp["onAndroidYYB"](e) && (n["yybBox"]["visible"] = !0, SaveLocal["deleteObj"]("login_pf_yyb")))
    }

    public static pf_use_logout(i: any): any {
        return i == "juedi" || i == "google" || i == "cb_google" || i == "cb_google1" || i == "cb_ios" || i == "cb_ad_mycard" || i == "cb_yuanqu_gg" || i == "cb_yuanqu_ios" || i == "ios_tw" || i == "caohua" || i == "jj_ad_caohua" || i == "caohua_ios" || i == "indofun_ios" || i == "muyou_ios_vn" || i == "muyou_ios_vn1" || i == "muyou_ios_vn2" || i == "muyou_ios_vn3" || i == "muyou_ios_tl" || i == "cb_muyou_ios_vn" || i == "muyou_ad_tl" || i == "muyou_hw_tl" || i == "jj_mina_ad_ar" || i == "jj_junhai_gg" || i == "jj_junhai_os" || i == "ad_37_jp" || i == "ad_37_kr" || i == "os_37_kr" || i == "ad_37_tw" || i == "cb_ad_37_cn" || i == "cb_ad_37_kr" || i == "cb_os_37_kr" || i == "jj_mina_ios_ar" || i == "jj_junhai_ios" || i == "jj_h5_twyx" || i == "h5_twyx" || i == "h5_twyx2" || i == "h5_twyx3" || i == "h5_twyx4" || i == "h5_twyx5" || i == "cb_h5_twyx1" || i == "cb_h5_twyx2" || i == "h5_1377" || i == "r2g_xm_ad" || i == "r2g_kr_ad" || i == "r2g_kr_os" || i == "r2g_kr2_gg" || i == "r2g_kr2_os" || i == "r2g_kr2_ss" || i == "r2g_kr2_ios" || i == "r2g_xm_ios" || i == "r2g_kr_ios" || i == "r2g_kr_h5" || i == "cb_ad_r2_gg" || i == "cb_ad_r2_os" || i == "cb_ad_r2_ss" || i == "cb_ios_r2" || i == "cb_ad_r2_hk" || i == "cb_ios_r2_hk" || i == "cb_ad_fy_hk" || i == "cb_ios_fy_hk" || i == "you77_ios_tw" || i == "you77_ios_jp" || i == "you77_ios_jp1" || i == "you77_ad_tw" || i == "you77_ad_jp" || i == "you77_hw_jp" || i == "indofun_gg" || i == "indofun_oppo" || i == "ad_6kw" || i == "ad_xiaoy" || i == "ad_mengyou" || i == "h5_hutao" || i == "h5_changwan" || i == "ios_37" || i == "ios_37_jp" || i == "ios_37_kr" || i == "ios_37_tw" || i == "cb_ios_37_cn" || i == "ios_37_wx2" || i == "cb_ios_37_kr" || i == "h5_hutao2" || i == "cb_ad_zhangwan1" || i == "cb_ad_zhangwan2" || (i == "h5_qqdt3" || i == "cb_h5_qqdt") && ConfigApp["get_qq_CMDLINE"]() || i == "cb_ad_just4fun" || i == "sg4_ad_bugu" || i == "fs_ad_37" ? ConfigApp.pf != "jj_h5_twyx" && ConfigApp.pf != "h5_twyx" && ConfigApp.pf != "h5_twyx2" && ConfigApp.pf != "h5_twyx3" && ConfigApp.pf != "h5_twyx5" && ConfigApp.pf != "h5_twyx4" && ConfigApp.pf != "cb_h5_twyx1" && ConfigApp.pf != "cb_h5_twyx2" || Platform["h5_sdk_url_data"] && Platform["h5_sdk_url_data"]["switchUserBtn"] && 1 === Platform["h5_sdk_url_data"]["switchUserBtn"] : !!Platform["h5_sdk"] && Platform["h5_sdk"]["switchSupport"]
    }
}

/**
 * 注册身份等价物：原文 o(i,t(849))（池化 2 参，无基类；t(849)→pool[634]
 * ="sg.model.ModelPf"，locate_p.js 池串交叉证）。base 传 null 的原因见
 * NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelPf, "sg.model.ModelPf", null, null);
