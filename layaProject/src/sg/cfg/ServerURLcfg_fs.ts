/**
 * sg.cfg.ServerURLcfg_fs —— 「fs」渠道的服务器 URL 配置表（HelpConfig.server_url_cfg）。
 *
 * 原文：code1.js 字节 [528137,528651]（包装变量 jt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ServerURLcfg_fs.js
 *
 * 依赖：Wt=HelpConfig（批次 B 模块直引）。
 */
import { HelpConfig } from "./HelpConfig";

export class ServerURLcfg_fs {

    public appVersionTxt: string;
    public appFunVersion: string;
    public CC_test: any;
    public CC_server: any;
    public CC_server_37_cn: any;

    constructor() {
        this.appVersionTxt = "v_1_0",
            this.appFunVersion = "1",
            this.CC_test = {
                http_url: HelpConfig.serverAddress,
                copyright: "抵制不良游戏,拒绝盗版游戏。注意自我保护,谨防受骗上当。\n适度游戏益脑,沉迷游戏伤身。合理安排时间,享受健康生活。",
                des: "测试配置"
            },
            this.CC_server = { net_cfg_url: "http://cdn-sghhj.akbing.com/static/", des: "标准配置" },
            this.CC_server_37_cn = { net_cfg_url: "http://cdn-sghhj.akbing.com/static/", des: "" };
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.ServerURLcfg_fs")（2 参注册，无基类）。
 */
Laya.class(ServerURLcfg_fs, "sg.cfg.ServerURLcfg_fs", null, null);
