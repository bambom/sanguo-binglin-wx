/**
 * sg.cfg.ServerURLcfg_sg —— 「sg」默认渠道的服务器 URL 配置表（HelpConfig.server_url_cfg
 * 的 default 分支；含韩/日/越/泰/阿拉伯/港澳台等发行区 CDN）。
 *
 * 原文：code1.js 字节 [528657,530461]（包装变量 Yt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ServerURLcfg_sg.js
 *
 * 依赖：Wt=HelpConfig（批次 B 模块直引）。
 */
import { HelpConfig } from "./HelpConfig";

export class ServerURLcfg_sg {

    public appVersionTxt: string;
    public appFunVersion: string;
    public CC_test: any;
    public CC_test_local: any;
    public CC_server: any;
    public CC_server_kr: any;
    public CC_server_jp: any;
    public CC_server_viet: any;
    public CC_server_th: any;
    public CC_server_arab: any;
    public CC_server_tw_y5wa: any;
    public CC_server_mj1: any;
    public CC_server_ea37: any;
    public CC_server_ea37_tw: any;
    public CC_server_qqdt_cn: any;
    public CC_server_ind: any;
    public CC_server_sg4bugu: any;

    constructor() {
        this.appVersionTxt = "v_7_0",
            this.appFunVersion = "2",
            this.CC_test = {
                http_url: HelpConfig.serverAddress || "http://192.168.1.116:8888/gateway/",
                copyright: "抵制不良游戏,拒绝盗版游戏。注意自我保护,谨防受骗上当。\n适度游戏益脑,沉迷游戏伤身。合理安排时间,享受健康生活。",
                des: "测试配置"
            },
            this.CC_test_local = {
                http_url: "http://192.168.1.116:8888/gateway/",
                assets_base_url: "http://192.168.1.66/release/test/",
                assets_version_url: "http://192.168.1.66/release/test/",
                des: "测试配置"
            },
            this.CC_server = { net_cfg_url: "http://cdn-sg.fle078.com/static/h5/", des: "标准配置" },
            this.CC_server_kr = { net_cfg_url: "http://r2cdn-kol.r2game.com/static/h5/", des: "标准配置-韩国" },
            this.CC_server_jp = { net_cfg_url: "http://cdn-zqwz.gamer10.com/static/h5/", des: "标准配置-日本" },
            this.CC_server_viet = { net_cfg_url: "http://zcwz-cdn.muugamevn.com/static/h5/", des: "标准配置-越南" },
            this.CC_server_th = { net_cfg_url: "http://sg-hc-tha.muugamevn.com/static/h5/", des: "标准配置-泰国" },
            this.CC_server_arab = { net_cfg_url: "http://zq-zy.menagame1.com/static/h5/", des: "标准配置-阿拉伯" },
            this.CC_server_tw_y5wa = { net_cfg_url: "http://cdn-hztz.wakool.net/static/h5/", des: "标准配置-港澳台-大象" },
            this.CC_server_mj1 = { net_cfg_url: "http://cdn2.ptkill.com/static/h5/", des: "标准配置-mj1" },
            this.CC_server_ea37 = { net_cfg_url: "http://cdn-sg-ea37.hwrescdn.com/static/ea/", des: "" },
            this.CC_server_ea37_tw = { net_cfg_url: "http://cdn-tw37sg.gm99.com/static/tw/", des: "" },
            this.CC_server_qqdt_cn = { net_cfg_url: "http://tx-web.tongght.com/static/h5/", des: "" },
            this.CC_server_ind = { net_cfg_url: "http://w3k-sgcdn.indofungames.com/static/h5/", des: "" },
            this.CC_server_sg4bugu = { net_cfg_url: "http://cdn1-sg4.loveyugame.com/static/h5/", des: "" };
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.ServerURLcfg_sg")（2 参注册，无基类）。
 */
Laya.class(ServerURLcfg_sg, "sg.cfg.ServerURLcfg_sg", null, null);
