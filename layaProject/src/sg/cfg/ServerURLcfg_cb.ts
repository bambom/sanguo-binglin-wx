/**
 * sg.cfg.ServerURLcfg_cb —— 「cb」渠道的服务器 URL 配置表（HelpConfig.server_url_cfg）。
 *
 * 原文：code1.js 字节 [526766,528131]（包装变量 zt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ServerURLcfg_cb.js
 *
 * 依赖：Wt=HelpConfig（批次 B 模块直引，serverAddress 测试网关覆盖）。
 */
import { HelpConfig } from "./HelpConfig";

export class ServerURLcfg_cb {

    public appVersionTxt: string;
    public appFunVersion: string;
    public CC_test: any;
    public CC_server: any;
    public CC_server_sanq: any;
    public CC_server_sanq_kr: any;
    public CC_server_just4fun_cn: any;
    public CC_server_gzsg_tw: any;
    public CC_server_viet: any;
    public CC_server_qqdt_cn: any;
    public CC_server_r2_kr: any;
    public CC_server_r2_tw: any;
    public CC_server_fy_tw: any;
    public CC_server_jp: any;

    constructor() {
        this.appVersionTxt = "v_1_0",
            this.appFunVersion = "6",
            this.CC_test = {
                http_url: HelpConfig.serverAddress || "http://192.168.1.116:8000/gateway/",
                copyright: "抵制不良游戏,拒绝盗版游戏。注意自我保护,谨防受骗上当。适度游戏益脑,沉迷游戏伤身。合理安排时间,享受健康生活。",
                des: "测试配置"
            },
            this.CC_server = { net_cfg_url: "http://cdn-cb.hzzhangyou.com/static/cb/", des: "标准配置" },
            this.CC_server_sanq = { net_cfg_url: "http://cb.iwy23.com/static/cb/", des: "标准配置" },
            this.CC_server_sanq_kr = { net_cfg_url: "http://cbkr.37games.com/static/cb/", des: "标准配置" },
            this.CC_server_just4fun_cn = { net_cfg_url: "http://sgfy.just4fun.sg/static/cb/", des: "标准配置" },
            this.CC_server_gzsg_tw = { net_cfg_url: "http://cb-cdn.sanguoslg.com/static/gzsg/", des: "标准配置" },
            this.CC_server_viet = { net_cfg_url: "http://sgz2-cdn.muugamevn.com/static/cb/", des: "标准配置" },
            this.CC_server_qqdt_cn = { net_cfg_url: "http://cbtx.17yqy.cn/static/h5/", des: "" },
            this.CC_server_r2_kr = { net_cfg_url: "http://cdn-zqe.guru-game.com/static/", des: "" },
            this.CC_server_r2_tw = { net_cfg_url: "http://cdn-zqe-xmgat.guru-game.com/static/", des: "" },
            this.CC_server_fy_tw = { net_cfg_url: "http://cbfy-cdn.dynastytk.com/static/h5/", des: "" },
            this.CC_server_jp = { net_cfg_url: "http://strategy-s1.fanyoy.com/client/static/cb/", des: "" };
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.ServerURLcfg_cb")（2 参注册，无基类）。
 */
Laya.class(ServerURLcfg_cb, "sg.cfg.ServerURLcfg_cb", null, null);
