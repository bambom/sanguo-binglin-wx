/**
 * sg.cfg.ConfigApp —— 启动配置应用：pf 渠道判定/URL 配置选择（checkPf 渠道→服务器表）、
 * initCfg URL 参数采集、字体（getFontKey/setFont/initFontSizeMap）、PC 高清缩放
 * （initPCHD）、平台开关（onAndroid/onIOS/releaseMiniGame/useMyLogin）、H5 SDK 装配
 * （initH5sdk）、PF_* 渠道常量表。
 *
 * 原文：code1.js 字节 [427902,455386]（包装变量 Rt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ConfigApp.js
 *
 * 依赖（批次 B/A 模块直引）：Wt=HelpConfig、Gt=ConfigServer、vs=Tools、
 * re=AssetsManager、be=sg.map.utils.TestUtils；引擎/UMD 级别名：
 * m=laya.utils.Browser、M=laya.display.css.Font、pt=laya.display.Text、
 * w=Laya.Config、Ut=Laya.Platform（批次外，全局名 Laya.Platform）；
 * initH5sdk 的 SDK 类经 sg.sdks.* 全局注册路径（批次外，ambient 声明）。
 * 原文自引走 sg.cfg.ConfigApp 全局路径，TS 化后改类直引（batch-a-report §6.4）。
 * fontData/appVersionTxt/appFunVersion/url_params 为 Laya.static 惰性静态
 * （ViewScenes.TOP_HEIGHT 同款换写）。长 pf 链已用
 * temp/.../batch_b/gen_pf_chains.js+to_ts.js 机械转换，避免手抄错漏。
 */
import { HelpConfig } from "./HelpConfig";
import { ConfigServer } from "./ConfigServer";
import { Tools } from "../utils/Tools";
import { AssetsManager } from "../manager/AssetsManager";
import { TestUtils } from "../map/utils/TestUtils";

export class ConfigApp {

    constructor() {
    }

    /** 测试级别（_isTest>0 为测试态）；setter 只在未关闭（>=0）时上调或显式负值关闭 */
    public static get isTest(): any {
        return ConfigApp._isTest > 0;
    }
    public static set isTest(i: any) {
        ConfigApp._isTest >= 0 && (ConfigApp._isTest = i < 0 ? i : Math.max(ConfigApp._isTest, i));
    }

    /** 测试态 3 且 192.168 内网时取当前页面作资源路径 */
    public static get UrlPath(): string {
        var e: any = laya.utils.Browser.window.location;
        return 3 === TestUtils.isTestShow && /192\.168/.test(e.host) ? e.protocol + "//" + e.host + e.pathname : "";
    }

    public static get isServer(): boolean {
        return ConfigApp.pf == "SERVER";
    }

    /** 横屏：cb 包强制横屏，否则看 isls 参数 */
    public static get isLandscape(): boolean {
        return "cb" == HelpConfig.type_app || !!ConfigApp.isls && ConfigApp.isls;
    }

    public static get is37SpecialModify(): boolean {
        return ConfigServer.system_simple.special_modify && ConfigServer.system_simple.special_modify == "type_sg_37";
    }

    public static get isPC(): boolean {
        return ConfigApp.mpc && 1 == Number(ConfigApp.mpc);
    }

    public static get isRightClose(): boolean {
        return ConfigApp.isLandscape;
    }

    public static get isHorizontal(): boolean {
        return ConfigApp.isLandscape || !!ConfigApp.isPC && ConfigApp.isPC;
    }

    public static get isPCHD(): boolean {
        return (ConfigApp.pchd ? parseInt(ConfigApp.pchd) : 0) > 0;
    }

    public static get isClientTest(): boolean {
        return ConfigApp.hasDocument && ConfigApp.testFightType;
    }

    public static releaseMiniGame(): boolean {
        return ConfigApp.releaseWeiXin() || ConfigApp.releaseQQ() || ConfigApp.releaseDouYin();
    }

    public static releaseWeiXin(): boolean {
        var s: any = laya.utils.Browser.window;
        return "wx" == ConfigApp.pf || ConfigApp.pf == "h5_changxiang" || ConfigApp.pf == s.bugu_pf || ConfigApp.pf == s.bugu_sg4_pf || ConfigApp.pf == s.yiyang_pf || ConfigApp.pf == s.game37_pf || ConfigApp.pf == s.twyx_pf || ConfigApp.pf == s.zhangwan_pf || ConfigApp.pf == s.game37_fs_pf || ConfigApp.pf == s.gzsgz_pf;
    }

    public static releaseQQ(): boolean {
        return ConfigApp.pf == "h5_qq";
    }

    public static releaseDouYin(): boolean {
        var s: any = laya.utils.Browser.window;
        return ConfigApp.pf == s.tt_bugu_pf || ConfigApp.pf == s.tt_37_pf;
    }

    public static get_HTTP_URL(): string {
        return ConfigApp.checkPf("http_url");
    }

    public static GET_ASSETS_URL(): string {
        return Tools.getURLexp("assets_url");
    }

    public static get_ASSETS_BASE_URL(): string {
        return ConfigApp.GET_ASSETS_URL() || ConfigApp.UrlPath || ConfigApp.checkPf("assets_base_url");
    }

    public static get_PAY_CALLBACK_URL(): string {
        return ConfigApp.checkPf("pay_callback");
    }

    public static get_ASSETS_VERSION_URL(): string {
        var s = ConfigApp.GET_ASSETS_URL();
        return s ? s + "version.json"
            : ConfigApp.cfgvers ? ConfigApp.cfgvers + ".json"
                : (ConfigApp.checkPf("assets_version_url") || ConfigApp.UrlPath) + "version.json";
    }

    public static get_NET_CFG_URL(): string {
        return ConfigApp.netCfgPfUrl ? ConfigApp.getURLType(decodeURI(ConfigApp.netCfgPfUrl)) : ConfigApp.checkPf("net_cfg_url");
    }

    public static get_Copyright(): string {
        return ConfigApp.checkPf("copyright");
    }

    public static get_AgreementCfg(): string {
        return ConfigApp.checkPf("agreement_cfg");
    }

    public static get_Agreement(): string {
        return ConfigApp.checkPf("agreement");
    }

    public static get_Privacy(): string {
        return ConfigApp.checkPf("privacy");
    }

    public static get_area_check(): string {
        return ConfigApp.checkPf("area_check");
    }

    public static get_data_report(): string {
        return ConfigApp.checkPf("data_report");
    }

    public static get_ping_url(): string {
        var s = ConfigApp.checkPf("ping_url");
        return s || "http://cdn2.ptkill.com/static/ping.html";
    }

    public static get_qq_CMDLINE(): string {
        return Tools.getURLexp("port");
    }

    public static get_notify_url(): string {
        return ConfigApp.checkPf("notify_url");
    }

    /** pf → server_url_cfg 表项（渠道分组）；命中后先试 myServerUrl（developer），再表内键，最后 sNetCfg */
    public static checkPf(e: string): string {
        var s: any;
        if (s = ConfigApp.pf == "developer" ? HelpConfig.server_url_cfg.CC_test
            : ConfigApp.pf.indexOf("r2g_kr") > -1 || ConfigApp.pf.indexOf("r2g_kr2") > -1 ? HelpConfig.server_url_cfg.CC_server_kr
                : ConfigApp.pf.indexOf("you77") > -1 ? HelpConfig.server_url_cfg.CC_server_jp
                    : ConfigApp.pf == "ios_mj1" ? HelpConfig.server_url_cfg.CC_server_mj1
                        : ConfigApp.pf == "dev_local" ? HelpConfig.server_url_cfg.CC_test_local
                            : ConfigApp.pf == "h5_y5" || ConfigApp.pf == "h5_wakool" ? HelpConfig.server_url_cfg.CC_server_tw_y5wa
                                : ConfigApp.pf == "dev_viet" || ConfigApp.pf == "dev_viet_sh" || ConfigApp.pf == "muyou_ios_vn" || ConfigApp.pf == "muyou_ios_vn1" || ConfigApp.pf == "muyou_ios_vn2" || ConfigApp.pf == "muyou_ios_vn3" || ConfigApp.pf == "muyou_ad_vn" || ConfigApp.pf == "muyou_ad_vn2" || ConfigApp.pf == "muyou_ad_vn1" || ConfigApp.pf == "muyou_hw_vn" || ConfigApp.pf == "muyou_h5_vn" || ConfigApp.pf == "muyou_h5_vn1" || ConfigApp.pf == "muyou_h5_vn2" ? HelpConfig.server_url_cfg.CC_server_viet
                                    : ConfigApp.pf == "dev_th" || ConfigApp.pf == "dev_th_sh" || ConfigApp.pf == "muyou_ad_tl" || ConfigApp.pf == "muyou_ios_tl" || ConfigApp.pf == "muyou_hw_tl" || ConfigApp.pf == "muyou_h5_tl" ? HelpConfig.server_url_cfg.CC_server_th
                                        : ConfigApp.pf == "dev_arab" || ConfigApp.pf == "jj_mina_ios_ar" || ConfigApp.pf == "jj_mina_ad_ar" ? HelpConfig.server_url_cfg.CC_server_arab
                                            : ConfigApp.pf == "dev_ea37_jp" || ConfigApp.pf == "dev_ea37_kr" || ConfigApp.pf == "ios_37_kr" || ConfigApp.pf == "ad_37_kr" || ConfigApp.pf == "h5_37_jp" || ConfigApp.pf == "h5_37_jp1" || ConfigApp.pf == "h5_37_kr" || ConfigApp.pf == "ios_37_jp" || ConfigApp.pf == "ad_37_jp" || ConfigApp.pf == "os_37_kr" ? HelpConfig.server_url_cfg.CC_server_ea37
                                                : ConfigApp.pf == "dev_37_tw" || ConfigApp.pf == "dev_37_twsh" || ConfigApp.pf == "ad_37_tw" || ConfigApp.pf == "h5_37_tw" || ConfigApp.pf == "ios_37_tw" ? HelpConfig.server_url_cfg.CC_server_ea37_tw
                                                    : ConfigApp.pf == "dev_cb_37" || ConfigApp.pf == "dev_cb_37_sh" || ConfigApp.pf == "cb_ad_37_cn" || ConfigApp.pf == "cb_ios_37_cn" || ConfigApp.pf == "cb_h5_37_cn" ? HelpConfig.server_url_cfg.CC_server_sanq
                                                        : ConfigApp.pf == "dev_37_kr" || ConfigApp.pf == "cb_ad_37_kr" || ConfigApp.pf == "cb_ios_37_kr" || ConfigApp.pf == "cb_os_37_kr" || ConfigApp.pf == "cb_h5_37_kr" ? HelpConfig.server_url_cfg.CC_server_sanq_kr
                                                            : ConfigApp.pf == "dev_j4f" || ConfigApp.pf == "cb_ad_just4fun" ? HelpConfig.server_url_cfg.CC_server_just4fun_cn
                                                                : ConfigApp.pf == "dev_qqdt3" || ConfigApp.pf == "h5_qqdt3" || ConfigApp.pf == "dev_cb_qqdt" || ConfigApp.pf == "cb_h5_qqdt" ? HelpConfig.server_url_cfg.CC_server_qqdt_cn
                                                                    : ConfigApp.pf == "dev_cb_tw" || ConfigApp.pf == "cb_google" || ConfigApp.pf == "cb_ios" || ConfigApp.pf == "cb_ad_mycard" || ConfigApp.pf == "cb_h5_yyjh" || ConfigApp.pf == "cb_h5_mojie" || ConfigApp.pf == "cb_hw_tw" || ConfigApp.pf == "cb_yuanqu_gg" || ConfigApp.pf == "cb_yuanqu_ios" ? HelpConfig.server_url_cfg.CC_server_gzsg_tw
                                                                        : ConfigApp.pf == "dev_indo" || ConfigApp.pf == "dev_viet_sh" || ConfigApp.pf == "indofun" || ConfigApp.pf == "indofun_gg" || ConfigApp.pf == "indofun_ios" || ConfigApp.pf == "indofun_oppo" ? HelpConfig.server_url_cfg.CC_server_ind
                                                                            : ConfigApp.pf == "dev_cb_viet" || ConfigApp.pf == "dev_cb_viet_sh" || ConfigApp.pf == "cb_muyou_ad_vn" || ConfigApp.pf == "cb_muyou_ad_vn1" || ConfigApp.pf == "cb_muyou_ad_vn2" || ConfigApp.pf == "cb_muyou_ios_vn" ? HelpConfig.server_url_cfg.CC_server_viet
                                                                                : ConfigApp.pf == "dev_cb_kr" || ConfigApp.pf == "dev_cb_kr_sh" || ConfigApp.pf == "cb_ad_r2_gg" || ConfigApp.pf == "cb_ad_r2_os" || ConfigApp.pf == "cb_ad_r2_ss" || ConfigApp.pf == "cb_ios_r2" || ConfigApp.pf == "cb_h5_r2" ? HelpConfig.server_url_cfg.CC_server_r2_kr
                                                                                    : ConfigApp.pf == "dev_cb_tw" || ConfigApp.pf == "dev_cb_tw_sh" || ConfigApp.pf == "cb_ad_r2_hk" || ConfigApp.pf == "cb_ios_r2_hk" ? HelpConfig.server_url_cfg.CC_server_r2_tw
                                                                                        : ConfigApp.pf == "dev_cb_tw_fy" || ConfigApp.pf == "dev_cb_tw_fy_sh" || ConfigApp.pf == "cb_ad_fy_hk" || ConfigApp.pf == "cb_ios_fy_hk" ? HelpConfig.server_url_cfg.CC_server_fy_tw
                                                                                            : ConfigApp.pf == "dev_cb_awy" || ConfigApp.pf == "dev_cb_awy_sh" || ConfigApp.pf == "cb_h5_awy" ? HelpConfig.server_url_cfg.CC_server_jp
                                                                                                : ConfigApp.pf == "dev_fs_37" || ConfigApp.pf == "dev_fs_37_sh" || ConfigApp.pf == "fs_ad_37" || ConfigApp.pf == "fs_h5_37" ? HelpConfig.server_url_cfg.CC_server_37_cn
                                                                                                    : ConfigApp.pf && ConfigApp.pf.indexOf("sg4") > -1 ? HelpConfig.server_url_cfg.CC_server_sg4bugu
                                                                                                        : HelpConfig.server_url_cfg.CC_server) {
            if (e == "http_url" && ConfigApp.myServerUrl && ConfigApp.myServerUrl.length > 0 && ConfigApp.pf == "developer")
                return ConfigApp.getURLType(ConfigApp.getNetCfg(e, ConfigApp.myServerUrl));
            if (s.hasOwnProperty(e)) return ConfigApp.getURLType(s[e]);
        }
        return ConfigApp.getURLType(ConfigApp.getNetCfg(e, ConfigApp.pf));
    }

    /** sNetCfg[pf][appVersion][key]（优先 anothercfg 子表） */
    public static getNetCfg(e: string, s: string): string {
        if (ConfigApp.sNetCfg && ConfigApp.sNetCfg.hasOwnProperty(s) && ConfigApp.sNetCfg[s].hasOwnProperty(ConfigApp.getAppVersion()) && ConfigApp.sNetCfg[s][ConfigApp.getAppVersion()].hasOwnProperty(e)) {
            if (!ConfigApp.anothercfg || !ConfigApp.sNetCfg[s][ConfigApp.getAppVersion()].hasOwnProperty(ConfigApp.anothercfg))
                return ConfigApp.sNetCfg[s][ConfigApp.getAppVersion()][e];
            if (ConfigApp.sNetCfg[s][ConfigApp.getAppVersion()][ConfigApp.anothercfg].hasOwnProperty(e))
                return ConfigApp.sNetCfg[s][ConfigApp.getAppVersion()][ConfigApp.anothercfg][e];
        }
        return "";
    }

    public static getAppVersion(): string {
        var s = Tools.getURLexp("app_version");
        return s || ConfigApp.appVersion;
    }

    /** httpSSL=yes 时 http → https */
    public static getURLType(i: string): string {
        return ConfigApp.httpSSL && ConfigApp.httpSSL == "yes" && i ? i.replace("http://", "https://") : i;
    }

    public static getNetCfgOther(i: string): any {
        return ConfigApp.sNetCfg && ConfigApp.sNetCfg.hasOwnProperty("force_update") && ConfigApp.sNetCfg.force_update[i] ? ConfigApp.sNetCfg.force_update[i] : null;
    }

    /** URL 参数 → 静态字段采集（initCfg；mpc 在 cb 包固定 "0"） */
    public static initCfg(): void {
        ConfigApp.thisPackageType = Tools.getURLexp("ptype"),
            ConfigApp.wsSSL = Tools.getURLexp("mssl"),
            ConfigApp.netCfgPfUrl = Tools.getURLexp("ncpurl"),
            ConfigApp.changeZonePf = Tools.getURLexp("czpf"),
            ConfigApp.otherLogoPngImg = Tools.getURLexp("mlogo"),
            ConfigApp.indexLoadingImg = Tools.getURLexp("ilimg"),
            ConfigApp.pcbgImg = Tools.getURLexp("pcbg"),
            ConfigApp.pcLogoImg = Tools.getURLexp("pclogo"),
            ConfigApp.minLogoImg = Tools.getURLexp("minlogo"),
            ConfigApp.loginBgImg = Tools.getURLexp("lbimg"),
            ConfigApp.myServerUrl = Tools.getURLexp("msurl"),
            ConfigApp.myPackagePf = Tools.getURLexp("mppf"),
            ConfigApp.disloading = Tools.getURLexp("disloading"),
            ConfigApp.auser = Tools.getURLexp("auser"),
            ConfigApp.lclip1 = Tools.getURLexp("lclip1"),
            ConfigApp.lclip2 = Tools.getURLexp("lclip2"),
            ConfigApp.chmj = Tools.getURLexp("chmj"),
            ConfigApp.loadtxt = Tools.getURLexp("loadtxt"),
            ConfigApp.midfa = Tools.getURLexp("idfa"),
            ConfigApp.opudid = Tools.getURLexp("opudid"),
            ConfigApp.mdevice = Tools.getURLexp("device"),
            ConfigApp.cfgvers = Tools.getURLexp("cfgvers"),
            ConfigApp.mLanguage = Tools.getURLexp("mlan"),
            ConfigApp.mpc = "cb" === HelpConfig.type_app ? "0" : Tools.getURLexp("mpc"),
            ConfigApp.plocal = Tools.getURLexp("plocal"),
            ConfigApp.bagname = Tools.getURLexp("bagname"),
            ConfigApp.mVsdebug = Tools.getURLexp("vsdebug"),
            ConfigApp.httpSSL = Tools.getURLexp("ussl"),
            ConfigApp.ilimgck = Tools.getURLexp("ilimgck"),
            ConfigApp.isls = Tools.getURLexp("isls"),
            ConfigApp.jcname = Tools.getURLexp("jcname"),
            ConfigApp.logpay = Tools.getURLexp("logpay"),
            ConfigApp.qentry = Tools.getURLexp("qentry"),
            ConfigApp.pchd = Tools.getURLexp("pchd"),
            ConfigApp.font1 = Tools.getURLexp("font1"),
            ConfigApp.font2 = Tools.getURLexp("font2"),
            ConfigApp.fontScale = Tools.getURLexp("fontScale"),
            ConfigApp.ageh = Tools.getURLexp("ageh"),
            ConfigApp.agev = Tools.getURLexp("agev"),
            ConfigApp.agealert = Tools.getURLexp("agealert"),
            ConfigApp.testSeason = Tools.getURLexp("testSeason"),
            ConfigApp.pay2to = Tools.getURLexp("pay2to"),
            ConfigApp.fontBig = Tools.getURLexp("fontBig"),
            ConfigApp.cfgVersion = Number(Tools.getURLexp("cfgnum") || "0"),
            ConfigApp.isbangs = Tools.getURLexp("isbangs"),
            ConfigApp.anothercfg = Tools.getURLexp("anothercfg"),
            ConfigApp.frontcs = Tools.getURLexp("frontcs"),
            ConfigApp.mustfull = Tools.getURLexp("mustfull");
    }

    /** 字体键：PC→pc/pc_dx；sg 包 ja/kr/th 特定渠道覆盖；cb 包 kr/chibi_jp/chibi；gz 包 guozhan */
    public static getFontKey(): string {
        var e = ConfigApp.lan(), s = ConfigApp.pf, n = ConfigApp.isPC, h = "default";
        n ? h = s == "h5_y5" || s == "h5_wakool" ? "pc_dx" : "pc"
            : "sg" == HelpConfig.type_app
                ? "ja" == e ? h = -1 != ["h5_37_jp", "h5_37_jp1", "ad_37_jp", "ios_37_jp"].indexOf(s) ? "37_ja" : "ja"
                    : "kr" == e ? h = -1 != ["ios_37_kr", "ad_37_kr", "h5_37_kr", "os_37_kr"].indexOf(s) ? "37_kr" : "kr"
                        : "th" == e && (h = e)
                : "cb" == HelpConfig.type_app ? h = "kr" == e ? "kr" : "ja" == e ? "chibi_jp" : "chibi"
                    : "gz" == HelpConfig.type_app && (h = "guozhan");
        return h;
    }

    public static setFont(): void {
        var M: any = laya.display.css.Font, pt: any = laya.display.Text;
        ConfigApp.font1 && (M.defaultFamily = ConfigApp.font1),
            ConfigApp.font2 && (M.defaultFont2 = ConfigApp.font2),
            ConfigApp.fontScale && (M.fontScale = parseFloat(ConfigApp.fontScale)),
            "ar" == ConfigApp.lan() && (pt.CharacterCache = !1, pt.setTextRightToLeft());
    }

    public static initFontSizeMap(i: any): void {
        var M: any = laya.display.css.Font;
        i && (M.fontSizeMapCfg = i, M.fontSizeMapValue = {}, M.fontSizeMapValueInv = {});
    }

    public static initFontLeadingMap(i: any): void {
        var M: any = laya.display.css.Font;
        i && (M.fontLeadingMapCfg = i);
    }

    public static onAndroid(): boolean {
        var e = !1;
        return (ConfigApp.pf == "test" || ConfigApp.pf == "jj_ad" || ConfigApp.pf == "google" || ConfigApp.pf == "cb_google" || ConfigApp.pf == "cb_google1" || ConfigApp.pf == "cb_ad_mycard" || "hw" == ConfigApp.pf || ConfigApp.pf == "hw_gzsgz" || ConfigApp.pf == "hw_jtzl" || ConfigApp.pf == "hw_tw" || ConfigApp.pf == "cb_hw_tw" || ConfigApp.pf == "cb_hw_cn" || ConfigApp.onAndroidYYB() || ConfigApp.pf == "vivo" || ConfigApp.pf == "oppo" || ConfigApp.pf == "yx7477" || ConfigApp.pf == "yx7477_1" || "mi" == ConfigApp.pf || "uc" == ConfigApp.pf || "mz" == ConfigApp.pf || ConfigApp.pf == "caohua" || ConfigApp.pf == "jj_ad_caohua" || ConfigApp.pf == "wende_ad" || ConfigApp.pf == "juedi" || ConfigApp.pf == "muyou_ad_vn" || ConfigApp.pf == "muyou_ad_vn2" || ConfigApp.pf == "cb_muyou_ad_vn" || ConfigApp.pf == "cb_muyou_ad_vn1" || ConfigApp.pf == "cb_muyou_ad_vn2" || ConfigApp.pf == "muyou_ad_vn1" || ConfigApp.pf == "muyou_ad_tl" || ConfigApp.pf == "muyou_hw_tl" || ConfigApp.pf == "muyou_hw_vn" || ConfigApp.pf == "jj_mina_ad_ar" || ConfigApp.pf == "jj_junhai_gg" || ConfigApp.pf == "jj_junhai_os" || ConfigApp.pf == "ad_37_jp" || ConfigApp.pf == "ad_37_kr" || ConfigApp.pf == "os_37_kr" || ConfigApp.pf == "ad_37_tw" || ConfigApp.pf == "cb_ad_37_cn" || ConfigApp.pf == "cb_ad_37_kr" || ConfigApp.pf == "cb_os_37_kr" || ConfigApp.pf == "r2g_xm_ad" || ConfigApp.pf == "r2g_kr_ad" || ConfigApp.pf == "r2g_kr_os" || ConfigApp.pf == "cb_ad_r2_gg" || ConfigApp.pf == "cb_ad_r2_os" || ConfigApp.pf == "cb_ad_r2_ss" || ConfigApp.pf == "you77_ad_jp" || ConfigApp.pf == "you77_ad_tw" || ConfigApp.pf == "you77_hw_jp" || ConfigApp.pf == "ad_360" || ConfigApp.pf == "ad_6kw" || ConfigApp.pf == "ad_xiaoy" || ConfigApp.pf == "ad_mengyou" || ConfigApp.pf == "cb_ad_just4fun" || ConfigApp.pf == "indofun_gg" || ConfigApp.pf == "indofun_oppo" || ConfigApp.pf == "r2g_kr2_gg" || ConfigApp.pf == "r2g_kr2_os" || ConfigApp.pf == "r2g_kr2_ss" || ConfigApp.pf == "cb_ad_r2_hk" || ConfigApp.pf == "cb_ad_fy_hk" || ConfigApp.pf == "cb_yuanqu_gg" || ConfigApp.pf == "cb_ad_zhangwan" || ConfigApp.pf == "cb_ad_zhangwan1" || ConfigApp.pf == "cb_ad_zhangwan2" || ConfigApp.pf == "sg4_ad_bugu" || ConfigApp.pf == "fs_ad_37") && (e = !0),
            laya.utils.Browser.onAndroid && e;
    }

    public static onAndroidYYB(i?: string): boolean {
        return void 0 === i && (i = ""),
            ("" != i ? i : ConfigApp.pf) == "yyb";
    }

    public static onIOS(): boolean {
        var e = !1;
        return (ConfigApp.pf == "ios" || ConfigApp.pf == "ios_sh" || ConfigApp.pf == "ios_sgzb" || ConfigApp.pf == "jj_ios" || ConfigApp.pf == "ios_mj1" || ConfigApp.pf == "ios_sg1" || ConfigApp.pf == "ios_hk" || ConfigApp.pf == "r2g_xm_ios" || ConfigApp.pf == "r2g_kr_ios" || ConfigApp.pf == "r2g_kr2_ios" || ConfigApp.pf == "cb_ios_r2" || ConfigApp.pf == "cb_ios_r2_hk" || ConfigApp.pf == "cb_ios_fy_hk" || ConfigApp.pf == "you77_ios_tw" || ConfigApp.pf == "you77_ios_jp" || ConfigApp.pf == "you77_ios_jp1" || ConfigApp.pf == "ios_tw" || ConfigApp.pf == "wende_ios" || ConfigApp.pf == "ios_37" || ConfigApp.pf == "ios_37_jp" || ConfigApp.pf == "ios_37_kr" || ConfigApp.pf == "ios_37_tw" || ConfigApp.pf == "cb_ios_37_cn" || ConfigApp.pf == "ios_37_wx2" || ConfigApp.pf == "cb_ios_37_kr" || ConfigApp.pf == "caohua_ios" || ConfigApp.pf == "muyou_ios_vn" || ConfigApp.pf == "muyou_ios_vn1" || ConfigApp.pf == "muyou_ios_vn2" || ConfigApp.pf == "muyou_ios_vn3" || ConfigApp.pf == "muyou_ios_tl" || ConfigApp.pf == "cb_muyou_ios_vn" || ConfigApp.pf == "jj_mina_ios_ar" || ConfigApp.pf == "jj_junhai_ios" || ConfigApp.pf == "ios_mengwoai" || ConfigApp.pf == "cb_ios" || ConfigApp.pf == "indofun_ios" || ConfigApp.pf == "cb_yuanqu_ios") && (e = !0),
            e;
    }

    public static onIOSlayaWK(): boolean {
        return !1;
    }

    public static lan(): string {
        return ConfigApp.mLanguage ? ConfigApp.mLanguage : "cn";
    }

    /** pchd 高清倍率：>=0 开视网膜画布（2+ 倍缩放）；-1 关；<=-2 倒数缩放；最后统一 CborderSize */
    public static initPCHD(i?: boolean): void {
        void 0 === i && (i = !1);
        var w: any = Laya.Config,
            s = ConfigApp.pchd ? parseInt(ConfigApp.pchd) : 0;
        s >= 0 ? (
            w.useRetinalCanvas = !0,
                1 != s || i ? s >= 2 && !i && (w.retinalScale = s + 1, w.textScale = s + 1) : (w.retinalScale = 2, w.textScale = 2)
        ) : -1 == s ? w.useRetinalCanvas = !1
            : s <= -2 && (w.useRetinalCanvas = !0, w.retinalScale = -1 / s, w.textScale = -1 / s),
            w.CborderSize = 12 * w.textScale;
    }

    public static initPCHDText(i?: boolean): void {
        void 0 === i && (i = !1);
        var w: any = Laya.Config;
        w.useRetinalCanvas = !0,
            !i && (w.textScale = 2),
            w.CborderSize = 12 * w.textScale;
    }

    /** 是否走游戏自有登录（SDK haveLogin 或渠道登录页 → false） */
    public static useMyLogin(): boolean {
        if (ConfigApp.loginSelfForce) return !0;
        var s = !0;
        return (Laya.Platform.h5_sdk && Laya.Platform.h5_sdk.haveLogin || ConfigApp.pf == "h5_37" || ConfigApp.pf == "h5_37_wx1" || ConfigApp.pf == "h5_37_wx2" || ConfigApp.pf == "h5_37_wx3" || ConfigApp.pf == "h5_37_yuewan" || ConfigApp.pf == "cb_h5_37" || ConfigApp.pf == "h5_kuku" || ConfigApp.pf == "h5_yyjh" || ConfigApp.pf == "h5_yyjh2" || ConfigApp.pf == "h5_yyjh_hk" || ConfigApp.pf == "jj_h5_yyjh" || ConfigApp.pf == "cb_h5_yyjh" || ConfigApp.pf == "cb_h5_yyjh_cn" || ConfigApp.pf == "cb_h5_mojie" || ConfigApp.pf == "h5_ch" || ConfigApp.pf == "h5_ch2" || ConfigApp.pf == "jj_h5_ch" || ConfigApp.releaseMiniGame() || "hw" == ConfigApp.pf || ConfigApp.pf == "hw_gzsgz" || ConfigApp.pf == "hw_jtzl" || ConfigApp.pf == "hw_tw" || ConfigApp.pf == "cb_hw_tw" || ConfigApp.pf == "cb_hw_cn" || ConfigApp.onAndroidYYB() || ConfigApp.pf == "vivo" || ConfigApp.pf == "oppo" || ConfigApp.pf == "yx7477" || ConfigApp.pf == "yx7477_1" || "mi" == ConfigApp.pf || "uc" == ConfigApp.pf || "mz" == ConfigApp.pf || ConfigApp.pf == "caohua" || ConfigApp.pf == "jj_ad_caohua" || ConfigApp.pf == "caohua_ios" || ConfigApp.pf == "indofun_ios" || ConfigApp.pf == "muyou_ios_vn" || ConfigApp.pf == "muyou_ios_vn1" || ConfigApp.pf == "muyou_ios_vn2" || ConfigApp.pf == "muyou_ios_vn3" || ConfigApp.pf == "muyou_ad_vn" || ConfigApp.pf == "muyou_ad_vn2" || ConfigApp.pf == "cb_muyou_ad_vn" || ConfigApp.pf == "cb_muyou_ad_vn1" || ConfigApp.pf == "cb_muyou_ad_vn2" || ConfigApp.pf == "cb_muyou_ios_vn" || ConfigApp.pf == "muyou_ad_vn1" || ConfigApp.pf == "muyou_ios_tl" || ConfigApp.pf == "muyou_ad_tl" || ConfigApp.pf == "muyou_hw_tl" || ConfigApp.pf == "muyou_hw_vn" || ConfigApp.pf == "jj_mina_ad_ar" || ConfigApp.pf == "jj_junhai_gg" || ConfigApp.pf == "jj_junhai_os" || ConfigApp.pf == "ad_37_jp" || ConfigApp.pf == "ad_37_kr" || ConfigApp.pf == "os_37_kr" || ConfigApp.pf == "ad_37_tw" || ConfigApp.pf == "cb_ad_37_cn" || ConfigApp.pf == "cb_ad_37_kr" || ConfigApp.pf == "cb_os_37_kr" || ConfigApp.pf == "jj_mina_ios_ar" || ConfigApp.pf == "jj_junhai_ios" || ConfigApp.pf == "juedi" || ConfigApp.pf == "wende_ad" || ConfigApp.pf == "google" || ConfigApp.pf == "cb_google" || ConfigApp.pf == "cb_google1" || ConfigApp.pf == "cb_ad_mycard" || ConfigApp.pf == "indofun_gg" || ConfigApp.pf == "indofun_oppo" || ConfigApp.pf == "ios_tw" || ConfigApp.pf == "r2g_xm_ad" || ConfigApp.pf == "r2g_kr_ad" || ConfigApp.pf == "r2g_kr_os" || ConfigApp.pf == "r2g_xm_ios" || ConfigApp.pf == "r2g_kr_ios" || ConfigApp.pf == "r2g_kr_h5" || ConfigApp.pf == "r2g_kr2_gg" || ConfigApp.pf == "r2g_kr2_os" || ConfigApp.pf == "r2g_kr2_ss" || ConfigApp.pf == "r2g_kr2_ios" || ConfigApp.pf == "r2g_kr2_h5" || ConfigApp.pf == "cb_ad_r2_gg" || ConfigApp.pf == "cb_ad_r2_os" || ConfigApp.pf == "cb_ad_r2_ss" || ConfigApp.pf == "cb_ios_r2" || ConfigApp.pf == "cb_h5_r2" || ConfigApp.pf == "cb_ad_r2_hk" || ConfigApp.pf == "cb_ios_r2_hk" || ConfigApp.pf == "cb_ad_fy_hk" || ConfigApp.pf == "cb_ios_fy_hk" || ConfigApp.pf == "you77_ios_tw" || ConfigApp.pf == "you77_ios_jp" || ConfigApp.pf == "you77_ios_jp1" || ConfigApp.pf == "you77_ad_tw" || ConfigApp.pf == "you77_ad_jp" || ConfigApp.pf == "you77_hw_jp" || ConfigApp.pf == "wende_ios" || ConfigApp.pf == "ios_37" || ConfigApp.pf == "ios_37_jp" || ConfigApp.pf == "ios_37_kr" || ConfigApp.pf == "ios_37_tw" || ConfigApp.pf == "cb_ios_37_cn" || ConfigApp.pf == "ios_37_wx2" || ConfigApp.pf == "cb_ios_37_kr" || ConfigApp.pf == "jj_h5_twyx" || ConfigApp.pf == "h5_twyx" || ConfigApp.pf == "h5_twyx2" || ConfigApp.pf == "h5_twyx3" || ConfigApp.pf == "h5_twyx4" || ConfigApp.pf == "h5_twyx5" || ConfigApp.pf == "cb_h5_twyx1" || ConfigApp.pf == "cb_h5_twyx2" || ConfigApp.pf == "h5_7k" || ConfigApp.pf == "jj_h5_7k" || ConfigApp.pf == "h5_360" || ConfigApp.pf == "h5_360_2" || ConfigApp.pf == "h5_360_3" || ConfigApp.pf == "ad_360" || ConfigApp.pf == "ad_6kw" || ConfigApp.pf == "ad_xiaoy" || ConfigApp.pf == "ad_mengyou" || ConfigApp.pf == "h5_1377" || ConfigApp.pf == "h5_leyou" || ConfigApp.pf == "jj_h5_leyou" || ConfigApp.pf == "h5_muzhi" || ConfigApp.pf == "h5_muzhi2" || ConfigApp.pf == "h5_hutao" || ConfigApp.pf == "h5_hutao2" || ConfigApp.pf == "changxiang" || ConfigApp.pf == "h5_6kw" || ConfigApp.pf == "h5_6kw2" || ConfigApp.pf == "h5_6kw3" || ConfigApp.pf == "h5_changwan" || ConfigApp.pf == "h5_shouqu" || ConfigApp.pf == "h5_qqdt" || ConfigApp.pf == "h5_qqdt2" || ConfigApp.pf == "h5_qqdt3" || ConfigApp.pf == "cb_h5_qqdt" || ConfigApp.pf == "cb_ad_just4fun" || ConfigApp.pf == "ios_mengwoai" || ConfigApp.pf == "cb_ios" || ConfigApp.pf == "h5_bugu" || ConfigApp.pf == "h5_bugu1" || ConfigApp.pf == "h5_bugu2" || ConfigApp.pf == "cb_h5_bugu" || ConfigApp.pf == "sg4_h5_bugu" || ConfigApp.pf == "sg4_h5_bugu1" || ConfigApp.pf == "cb_yuanqu_gg" || ConfigApp.pf == "cb_yuanqu_ios" || ConfigApp.pf == "cb_h5_zhangwan" || ConfigApp.pf == "cb_h5_yiyang" || ConfigApp.pf == "cb_ad_zhangwan" || ConfigApp.pf == "cb_ad_zhangwan1" || ConfigApp.pf == "cb_ad_zhangwan2" || ConfigApp.pf == "cb_h5_awy" || ConfigApp.pf == "sg4_ad_bugu" || ConfigApp.pf == "fs_ad_37") && (s = !1),
            s;
    }

    public static useSSL(): boolean {
        return !(!ConfigApp.wsSSL || ConfigApp.wsSSL != "yes");
    }

    public static logoUI(): string {
        return ConfigApp.otherLogoPngImg ? AssetsManager.getAssetsAD(ConfigApp.otherLogoPngImg + ".png") : "";
    }

    public static logoMinUI(): string {
        return ConfigApp.minLogoImg ? AssetsManager.getAssetsAD(ConfigApp.minLogoImg + ".png") : "";
    }

    /** 自有支付：pay_self_pf 命中且（area_check 为空或 isChina==1） */
    public static payIsSelf(): boolean {
        var e = !1;
        if (ConfigServer.system_simple.pay_self_pf && ConfigServer.system_simple.pay_self_pf.indexOf(ConfigApp.pf) > -1) {
            var s = ConfigApp.get_area_check();
            if (s && "" != s) e = !!(ConfigApp.isChina && "1" == ConfigApp.isChina);
            else e = !0;
        }
        return e;
    }

    public static payIsSelfH5(): boolean {
        var e = !1;
        return ConfigServer.system_simple.pay_self_h5_pf && ConfigServer.system_simple.pay_self_h5_pf.indexOf(ConfigApp.pf) > -1 && (e = !0),
            e;
    }

    public static atOnceLoginToEnter(): boolean {
        return ConfigApp.qentry == "yes";
    }

    /** 按渠道装配 H5 SDK（sg.sdks.*，批次外全局注册路径） */
    public static initH5sdk(): void {
        var params = Tools.getURLexpToObj(ConfigApp.url_params);
        switch (ConfigApp.pf) {
            case "cb_h5_mengwoai": Laya.Platform.h5_sdk = new sg.sdks.H5CBMengWoAi(ConfigApp.pf, params); break;
            case "jj_h5_37": Laya.Platform.h5_sdk = new sg.sdks.H5JJ37(ConfigApp.pf, params); break;
            case "jj_h5_mg1":
            case "jj_h5_mg3": Laya.Platform.h5_sdk = new sg.sdks.H5JJMG1(ConfigApp.pf, params); break;
            case "jj_h5_mg2": Laya.Platform.h5_sdk = new sg.sdks.H5JJMG2(ConfigApp.pf, params); break;
            case "h5_wende": Laya.Platform.h5_sdk = new sg.sdks.H5SGWende(ConfigApp.pf, params); break;
            case "h5_7477": Laya.Platform.h5_sdk = new sg.sdks.H5SG7477(ConfigApp.pf, params); break;
            case "h5_5599": Laya.Platform.h5_sdk = new sg.sdks.H5SG5599(ConfigApp.pf, params); break;
            case "h5_mengyou":
            case "h5_mengyou1": Laya.Platform.h5_sdk = new sg.sdks.H5SGMengyou(ConfigApp.pf, params); break;
            case "h5_y5":
            case "h5_wakool": Laya.Platform.h5_sdk = new sg.sdks.H5SGWakool(ConfigApp.pf, params); break;
            case "h5_chaoyi": Laya.Platform.h5_sdk = new sg.sdks.H5SGChaoYi(ConfigApp.pf, params); break;
            case "h5_qianguo":
            case "h5_qianqi": Laya.Platform.h5_sdk = new sg.sdks.H5SGQianGuo(ConfigApp.pf, params); break;
            case "h5_37_jp":
            case "h5_37_jp1":
            case "h5_37_kr":
            case "h5_37_tw": Laya.Platform.h5_sdk = new sg.sdks.H5SG37(ConfigApp.pf, params); break;
            case "h5_dqd": Laya.Platform.h5_sdk = new sg.sdks.H5SGDQD(ConfigApp.pf, params); break;
            case "muyou_h5_vn":
            case "muyou_h5_tl": Laya.Platform.h5_sdk = new sg.sdks.H5SGMuYou(ConfigApp.pf, params); break;
            case "muyou_h5_vn1":
            case "muyou_h5_vn2": Laya.Platform.h5_sdk = new sg.sdks.H5SGMuYou1(ConfigApp.pf, params); break;
            case "cb_h5_37_cn": Laya.Platform.h5_sdk = new sg.sdks.H5CB37(ConfigApp.pf, params); break;
            case "cb_h5_37_kr": Laya.Platform.h5_sdk = new sg.sdks.H5CB37Kr(ConfigApp.pf, params); break;
            case "you77_h5_jp": Laya.Platform.h5_sdk = new sg.sdks.H5SG77You(ConfigApp.pf, params); break;
            case "cb_h5_yyjh":
            case "cb_h5_yyjh_cn": Laya.Platform.h5_sdk = new sg.sdks.H5CBYYJH(ConfigApp.pf, params); break;
            case "cb_h5_mojie": Laya.Platform.h5_sdk = new sg.sdks.H5CBMOJIE(ConfigApp.pf, params); break;
            case "h5_bugu":
            case "h5_bugu1":
            case "h5_bugu2":
            case "cb_h5_bugu":
            case "sg4_h5_bugu":
            case "cb_h5_yiyang": Laya.Platform.h5_sdk = new sg.sdks.H5SGBuGu(ConfigApp.pf, params); break;
            case "sg4_h5_bugu1": Laya.Platform.h5_sdk = new sg.sdks.H5SG4BuGu(ConfigApp.pf, params); break;
            case "cb_h5_zhangwan": Laya.Platform.h5_sdk = new sg.sdks.H5CBZhangWan(ConfigApp.pf, params); break;
            case "cb_h5_r2":
            case "r2g_kr2_h5": Laya.Platform.h5_sdk = new sg.sdks.H5CBR2(ConfigApp.pf, params); break;
            case "cb_h5_awy": Laya.Platform.h5_sdk = new sg.sdks.H5CBAWY(ConfigApp.pf, params); break;
            case "fs_h5_37": Laya.Platform.h5_sdk = new sg.sdks.H5FS37(ConfigApp.pf, params);
        }
        if (ConfigApp.releaseWeiXin() && ConfigApp.pf === (<any>laya.utils.Browser.window).game37_fs_pf)
            Laya.Platform.h5_sdk = new sg.sdks.WXFS37(ConfigApp.pf, Tools.getURLexpToObj(ConfigApp.url_params));
    }

    public static checkPfIs37BySG(): boolean {
        return ConfigApp.pf == "ios_37";
    }

    public static pfIs37FuncH5(): boolean {
        return ConfigApp.pf == "h5_37" || ConfigApp.pf == "h5_37_wx1" || ConfigApp.pf == "h5_37_wx2" || ConfigApp.pf == "h5_37_wx3" || ConfigApp.pf == "h5_37_yuewan" || ConfigApp.pf == "cb_h5_37" || ConfigApp.pf == "cb_h5_37_cn";
    }

    public static pfIs37FuncOs(): boolean {
        return !(ConfigApp.pf != "cb_ad_37_cn" || !Laya.Platform.pf_login_data.platformAppId || Laya.Platform.pf_login_data.platformAppId != "37h5");
    }

    public static _isTest: number = 0;
    public static isUpdateApp: number = -1;
    public static updateAppURL: string = "";
    public static isNewHome: boolean = true;
    public static testFightType: any = 0;
    public static testTimeRate: number = 0;
    public static hasDocument: boolean = true;
    public static configTemp: boolean = true;
    public static copyrightTime: number = 0;
    public static appVersion: string = "v_1_1_0";
    public static cfgVersion: number = 0;
    public static sNetCfg: any = null;
    public static top: number = 70;
    public static topVal: number = 0;
    public static avoidTop: number = 0;
    public static avoidBottom: number = 0;
    public static ratioAvoidTop: number = 1.7;
    public static ratioAvoidBottom: number = 1.9;
    public static pay2to: any = null;
    public static ageh: any = null;
    public static agev: any = null;
    public static agealert: any = null;
    public static qentry: any = null;
    public static logpay: any = null;
    public static isls: any = null;
    public static jcname: any = null;
    public static ilimgck: any = null;
    public static thisPackageType: any = null;
    public static httpSSL: any = null;
    public static wsSSL: any = null;
    public static netCfgPfUrl: any = null;
    public static changeZonePf: any = null;
    public static otherLogoPngImg: any = null;
    public static indexLoadingImg: any = null;
    public static pcbgImg: any = null;
    public static pcLogoImg: any = null;
    public static minLogoImg: any = null;
    public static loginBgImg: any = null;
    public static myServerUrl: any = null;
    public static myPackagePf: any = null;
    public static disloading: any = null;
    public static loginSelfForce: boolean = false;
    public static auser: any = null;
    public static lclip1: any = null;
    public static lclip2: any = null;
    public static chmj: any = null;
    public static loadtxt: any = null;
    public static midfa: any = null;
    public static opudid: any = null;
    public static mdevice: any = null;
    public static cfgvers: any = null;
    public static mLanguage: any = null;
    public static mpc: any = null;
    public static plocal: any = null;
    public static bagname: any = null;
    public static isChina: any = null;
    public static mVsdebug: any = null;
    public static pchd: any = null;
    public static font1: any = null;
    public static font2: any = null;
    public static fontName: string = "msyh";
    public static fontChat: string = "msyh";
    public static fontScale: any = null;
    public static testSeason: any = null;
    public static fontBig: any = null;
    public static isbangs: any = null;
    public static anothercfg: any = null;
    public static frontcs: any = null;
    public static mustfull: any = null;
    public static isFirstInstall: boolean = true;
    /** 原文为直接成员写法 i.pf="developer"（短名未池化），已对照 oracle 尾段核验 */
    public static pf: string = "developer";
    public static pf_channel: string = "";

    public static PF_test: string = "developer";
    public static PF_SERVER: string = "SERVER";
    public static PF_pc: string = "pc";
    public static PF_WeiXin: string = "wx";
    public static PF_QQ: string = "h5_qq";
    public static PF_wx_changxiang: string = "h5_changxiang";
    public static PF_dev: string = "dev";
    public static PF_dev_local: string = "dev_local";
    public static PF_dev_hk: string = "dev_hk";
    public static PF_ios_meng52: string = "ios";
    public static PF_ios_meng52_sh: string = "ios_sh";
    public static PF_ios_meng52_sgzb: string = "ios_sgzb";
    public static PF_ios_jj_cn: string = "jj_ios";
    public static PF_ios_jj_cn_mj1: string = "jj_ios_mjm1";
    public static PF_ios_meng52_mjm1: string = "ios_mjm1";
    public static PF_ios_meng52_mjm2: string = "ios_mjm2";
    public static PF_ios_meng52_mjm5: string = "ios_mjm5";
    public static PF_ios_meng52_mjm6: string = "ios_mjm6";
    public static PF_ios_meng52_mj1: string = "ios_mj1";
    public static PF_ios_meng52_mj2: string = "ios_sg1";
    public static PF_ios_meng52_tw: string = "ios_tw";
    public static PF_ios_meng52_hk: string = "ios_hk";
    public static PF_ios_37: string = "ios_37";
    public static PF_37_ae: string = "ea37";
    public static PF_ios_37_jp: string = "ios_37_jp";
    public static PF_ad_37_jp: string = "ad_37_jp";
    public static PF_h5_37_jp: string = "h5_37_jp";
    public static PF_h5_37_jp1: string = "h5_37_jp1";
    public static PF_ios_37_kr: string = "ios_37_kr";
    public static PF_ad_37_kr: string = "ad_37_kr";
    public static PF_h5_37_kr: string = "h5_37_kr";
    public static PF_os_37_kr: string = "os_37_kr";
    public static PF_37_tw: string = "tw37";
    public static PF_ad_37_tw: string = "ad_37_tw";
    public static PF_ios_37_tw: string = "ios_37_tw";
    public static PF_h5_37_tw: string = "h5_37_tw";
    public static PF_wende_ios: string = "wende_ios";
    public static PF_yx7477: string = "yx7477";
    public static PF_yx7477_1: string = "yx7477_1";
    public static PF_7477_h5: string = "h5_7477";
    public static PF_37_h5: string = "h5_37";
    public static PF_37_h5_wx: string = "h5_37_wx1";
    public static PF_37_h5_wx2: string = "h5_37_wx2";
    public static PF_37_h5_wx3: string = "h5_37_wx3";
    public static PF_37_ios_wx2: string = "ios_37_wx2";
    public static PF_37_h5_yuewan: string = "h5_37_yuewan";
    public static PF_kuku_h5: string = "h5_kuku";
    public static PF_yyjh_h5: string = "h5_yyjh";
    public static PF_yyjh2_h5: string = "h5_yyjh2";
    public static PF_yyjh_hk_h5: string = "h5_yyjh_hk";
    public static PF_caohua1_h5: string = "h5_ch";
    public static PF_caohua2_h5: string = "h5_ch2";
    public static PF_tanwan_h5: string = "h5_twyx";
    public static PF_tanwan2_h5: string = "h5_twyx2";
    public static PF_tanwan3_h5: string = "h5_twyx3";
    public static PF_tanwan4_h5: string = "h5_twyx4";
    public static PF_tanwan5_h5: string = "h5_twyx5";
    public static PF_7k_h5: string = "h5_7k";
    public static PF_leyou_h5: string = "h5_leyou";
    public static PF_1377_h5: string = "h5_1377";
    public static PF_360_h5: string = "h5_360";
    public static PF_360_2_h5: string = "h5_360_2";
    public static PF_360_3_h5: string = "h5_360_3";
    public static PF_360_ad: string = "ad_360";
    public static PF_muzhi_h5: string = "h5_muzhi";
    public static PF_muzhi2_h5: string = "h5_muzhi2";
    public static PF_hutao_h5: string = "h5_hutao";
    public static PF_hutao2_h5: string = "h5_hutao2";
    public static PF_changxiang_h5: string = "changxiang";
    public static PF_qqdt_h5: string = "h5_qqdt";
    public static PF_qqdt_h52: string = "h5_qqdt2";
    public static PF_qqdt_h53: string = "h5_qqdt3";
    public static PF_6kw_h5: string = "h5_6kw";
    public static PF_6kw2_h5: string = "h5_6kw2";
    public static PF_6kw3_h5: string = "h5_6kw3";
    public static PF_changwan_h5: string = "h5_changwan";
    public static PF_shouqu_h5: string = "h5_shouqu";
    public static PF_wende_h5: string = "h5_wende";
    public static PF_5599_h5: string = "h5_5599";
    public static PF_Mengyou_h5: string = "h5_mengyou";
    public static PF_Mengyou1_h5: string = "h5_mengyou1";
    public static PF_Y5_h5: string = "h5_y5";
    public static PF_wakool_h5: string = "h5_wakool";
    public static PF_chaoyi_h5: string = "h5_chaoyi";
    public static PF_qianguo_h5: string = "h5_qianguo";
    public static PF_qianqi_h5: string = "h5_qianqi";
    public static PF_dqd_h5: string = "h5_dqd";
    public static PF_bugu_h5: string = "h5_bugu";
    public static PF_bugu_h5_1: string = "h5_bugu1";
    public static PF_bugu_h5_2: string = "h5_bugu2";
    public static PF_JJ_mg: string = "jj_h5_mg";
    public static PF_JJ_h5_mg1: string = "jj_h5_mg1";
    public static PF_JJ_h5_mg2: string = "jj_h5_mg2";
    public static PF_JJ_h5_mg3: string = "jj_h5_mg3";
    public static PF_JJ_JunHai: string = "jj_junhai";
    public static PF_JJ_JunHai_ios: string = "jj_junhai_ios";
    public static PF_JJ_JunHai_google: string = "jj_junhai_gg";
    public static PF_JJ_JunHai_onestore: string = "jj_junhai_os";
    public static PF_JJ_37_h5: string = "jj_h5_37";
    public static PF_JJ_tanwan_h5: string = "jj_h5_twyx";
    public static PF_JJ_yyjh_h5: string = "jj_h5_yyjh";
    public static PF_JJ_7k_h5: string = "jj_h5_7k";
    public static PF_JJ_leyou_h5: string = "jj_h5_leyou";
    public static PF_JJ_caohua_h5: string = "jj_h5_ch";
    public static PF_JJ_mina_ios_ar: string = "jj_mina_ios_ar";
    public static PF_JJ_mina_ad_ar: string = "jj_mina_ad_ar";
    public static PF_JJ_caohua_ad: string = "jj_ad_caohua";
    public static PF_and_1: string = "test";
    public static PF_and_jj_meng52: string = "jj_ad";
    public static PF_and_google: string = "google";
    public static PF_huawei: string = "hw";
    public static PF_huawei_tw: string = "hw_tw";
    public static PF_huawei_gzsgz: string = "hw_gzsgz";
    public static PF_huawei_jtzl: string = "hw_jtzl";
    public static PF_yyb: string = "yyb";
    public static PF_juedi: string = "juedi";
    public static PF_juedi_ad: string = "juedi_ad";
    public static PF_vivo: string = "vivo";
    public static PF_oppo: string = "oppo";
    public static PF_xiaomi: string = "mi";
    public static PF_uc: string = "uc";
    public static PF_meizu: string = "mz";
    public static PF_caohua: string = "caohua";
    public static PF_wende: string = "wende_ad";
    public static PF_caohua_ios: string = "caohua_ios";
    public static PF_muyou_ios_vn: string = "muyou_ios_vn";
    public static PF_muyou_ios_vn1: string = "muyou_ios_vn1";
    public static PF_muyou_ios_vn2: string = "muyou_ios_vn2";
    public static PF_muyou_ios_vn3: string = "muyou_ios_vn3";
    public static PF_muyou_ad_vn: string = "muyou_ad_vn";
    public static PF_muyou_ad_vn2: string = "muyou_ad_vn2";
    public static PF_muyou_ad_vn_local: string = "muyou_ad_vn1";
    public static PF_muyou_hw_vn: string = "muyou_hw_vn";
    public static PF_muyou_h5_vn: string = "muyou_h5_vn";
    public static PF_muyou_h5_vn1: string = "muyou_h5_vn1";
    public static PF_muyou_h5_vn2: string = "muyou_h5_vn2";
    public static PF_muyou_ios_tl: string = "muyou_ios_tl";
    public static PF_muyou_ad_tl: string = "muyou_ad_tl";
    public static PF_muyou_hw_tl: string = "muyou_hw_tl";
    public static PF_muyou_h5_tl: string = "muyou_h5_tl";
    public static PF_r2game_xm: string = "r2g_xm";
    public static PF_r2game_xm_ad: string = "r2g_xm_ad";
    public static PF_r2game_xm_ios: string = "r2g_xm_ios";
    public static PF_r2game_kr: string = "r2g_kr";
    public static PF_r2game_kr_ad: string = "r2g_kr_ad";
    public static PF_r2game_kr_ios: string = "r2g_kr_ios";
    public static PF_r2game_kr_onestore: string = "r2g_kr_os";
    public static PF_r2game_kr_h5: string = "r2g_kr_h5";
    public static PF_r2game_kr2: string = "r2g_kr2";
    public static PF_r2game_kr2_gg: string = "r2g_kr2_gg";
    public static PF_r2game_kr2_os: string = "r2g_kr2_os";
    public static PF_r2game_kr2_ss: string = "r2g_kr2_ss";
    public static PF_r2game_kr2_ios: string = "r2g_kr2_ios";
    public static PF_r2game_kr2_h5: string = "r2g_kr2_h5";
    public static PF_77you: string = "you77";
    public static PF_77you_ios_tw: string = "you77_ios_tw";
    public static PF_77you_ios_jp: string = "you77_ios_jp";
    public static PF_77you_ios_jp1: string = "you77_ios_jp1";
    public static PF_77you_ad_tw: string = "you77_ad_tw";
    public static PF_77you_ad_jp: string = "you77_ad_jp";
    public static PF_77you_hw_jp: string = "you77_hw_jp";
    public static PF_77you_h5_jp: string = "you77_h5_jp";
    public static PF_6kw_ad: string = "ad_6kw";
    public static PF_XiaoY_ad: string = "ad_xiaoy";
    public static PF_Mengyou_ad: string = "ad_mengyou";
    public static PF_indofun: string = "indofun";
    public static PF_indofun_ios: string = "indofun_ios";
    public static PF_indofun_google: string = "indofun_gg";
    public static PF_indofun_oppo: string = "indofun_oppo";
    public static PF_CB_h5_37: string = "cb_h5_37";
    public static PF_CB_ad_37_cn: string = "cb_ad_37_cn";
    public static PF_CB_h5_37_cn: string = "cb_h5_37_cn";
    public static PF_CB_ios_37_cn: string = "cb_ios_37_cn";
    public static PF_CB_37_kr: string = "cb_37_kr";
    public static PF_CB_ad_37_kr: string = "cb_ad_37_kr";
    public static PF_CB_ios_37_kr: string = "cb_ios_37_kr";
    public static PF_CB_os_37_kr: string = "cb_os_37_kr";
    public static PF_CB_h5_37_kr: string = "cb_h5_37_kr";
    public static PF_CB_ad_just4fun: string = "cb_ad_just4fun";
    public static PF_CB_google: string = "cb_google";
    public static PF_CB_google1: string = "cb_google1";
    public static PF_CB_ios: string = "cb_ios";
    public static PF_CB_huawei_tw: string = "cb_hw_tw";
    public static PF_CB_huawei_cn: string = "cb_hw_cn";
    public static PF_CB_ad_mycard: string = "cb_ad_mycard";
    public static PF_CB_ad_muyou_vn: string = "cb_muyou_ad_vn";
    public static PF_CB_ad_muyou_vn1: string = "cb_muyou_ad_vn1";
    public static PF_CB_ad_muyou_vn2: string = "cb_muyou_ad_vn2";
    public static PF_CB_ios_muyou_vn: string = "cb_muyou_ios_vn";
    public static PF_CB_h5_yyjh: string = "cb_h5_yyjh";
    public static PF_CB_h5_yyjh_cn: string = "cb_h5_yyjh_cn";
    public static PF_CB_h5_mojie: string = "cb_h5_mojie";
    public static PF_CB_yuanqu_gg: string = "cb_yuanqu_gg";
    public static PF_CB_yuanqu_ios: string = "cb_yuanqu_ios";
    public static PF_CB_bugu_h5: string = "cb_h5_bugu";
    public static PF_CB_h5_tanwan1: string = "cb_h5_twyx1";
    public static PF_CB_h5_tanwan2: string = "cb_h5_twyx2";
    public static PF_CB_h5_zhangwan: string = "cb_h5_zhangwan";
    public static PF_CB_ad_zhangwan: string = "cb_ad_zhangwan";
    public static PF_CB_ad_zhangwan1: string = "cb_ad_zhangwan1";
    public static PF_CB_ad_zhangwan2: string = "cb_ad_zhangwan2";
    public static PF_CB_h5_yiyang: string = "cb_h5_yiyang";
    public static PF_CB_h5_qqdt: string = "cb_h5_qqdt";
    public static PF_CB_r2: string = "cb_r2g_kr";
    public static PF_CB_ad_r2_google: string = "cb_ad_r2_gg";
    public static PF_CB_ad_r2_onestore: string = "cb_ad_r2_os";
    public static PF_CB_ad_r2_samsung: string = "cb_ad_r2_ss";
    public static PF_CB_ios_r2: string = "cb_ios_r2";
    public static PF_CB_h5_r2: string = "cb_h5_r2";
    public static PF_CB_r2_hk: string = "cb_r2g_hk";
    public static PF_CB_ad_r2_hk: string = "cb_ad_r2_hk";
    public static PF_CB_ios_r2_hk: string = "cb_ios_r2_hk";
    public static PF_CB_fy_hk: string = "cb_fy_hk";
    public static PF_CB_ad_fy_hk: string = "cb_ad_fy_hk";
    public static PF_CB_ios_fy_hk: string = "cb_ios_fy_hk";
    public static PF_CB_h5_awy: string = "cb_h5_awy";
    public static PF_SG4_h5_bugu: string = "sg4_h5_bugu";
    public static PF_SG4_h5_bugu1: string = "sg4_h5_bugu1";
    public static PF_SG4_ad_bugu: string = "sg4_ad_bugu";
    public static PF_FS_ad_37: string = "fs_ad_37";
    public static PF_FS_h5_37: string = "fs_h5_37";
    public static PF_CB_h5_mengwoai: string = "cb_h5_mengwoai";
    public static PF_ios_mengwoai: string = "ios_mengwoai";

    /** Laya.static 惰性静态：字体键 → 字体名 */
    public static get fontData(): any {
        var v = { ja: "A-OTF Sei Kaisho CB1 Std", kr: "SunBatang-Light", "37_kr": "SunBatang-Light", "37_ja": "Source Han Serif JP", pc: "Microsoft-Yahei", pc_dx: "Noto Sans", chibi: "msyh", chibi2: "fzlb", chibi_jp: "FTT-Skip B", guozhan: "han-yi-xue-jun", default: "Arial", th: "Adobe Thai" };
        Object.defineProperty(ConfigApp, "fontData", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：版本串（取自当前渠道 URL 配置对象） */
    public static get appVersionTxt(): string {
        var v = HelpConfig.server_url_cfg.appVersionTxt;
        Object.defineProperty(ConfigApp, "appVersionTxt", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：功能版本串 */
    public static get appFunVersion(): string {
        var v = HelpConfig.server_url_cfg.appFunVersion;
        Object.defineProperty(ConfigApp, "appFunVersion", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：启动可识别的 URL 参数名表 */
    public static get url_params(): string[] {
        var v = ["ptype", "ussl", "ncpurl", "czpf", "mlogo", "ilimg", "lbimg", "msurl", "mppf", "v", "disloading", "auser", "lclip1", "lclip2", "chmj", "loadtxt", "idfa", "opudid", "device", "cfgvers", "mlan", "mpc", "plocal", "bagname", "vsdebug", "mssl", "pcbg", "pclogo", "minlogo", "ilimgck", "isls", "indexType", "jcname", "logpay", "qentry", "spine", "app", "pchd", "font1", "font2", "fontScale", "ageh", "agev", "pay2to", "cfgnum", "isbangs", "agealert", "mustfull", "anothercfg", "frontcs", "uitype"];
        Object.defineProperty(ConfigApp, "url_params", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.cfg.ConfigApp")（2 参注册，无基类）。
 */
Laya.class(ConfigApp, "sg.cfg.ConfigApp", null, null);
