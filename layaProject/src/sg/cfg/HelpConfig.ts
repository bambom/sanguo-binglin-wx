/**
 * sg.cfg.HelpConfig —— 启动配置入口：App 渠道类型/服务器 URL 配置选择器。
 *
 * 原文：code1.js 字节 [526094,526760]（包装变量 Wt，2 参注册 o(t,"sg.cfg.HelpConfig")，
 * 无基类）。原文 r=类系统 getset 助手、h=Laya.static 惰性静态助手。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/HelpConfig.js
 *
 * 依赖：vs=Tools（批次 B 模块直引，getURLexp）；zt/jt/Yt=ServerURLcfg_cb/fs/sg
 * （批次 B 模块直引）。type_app/type_ui 为 Laya.static 惰性静态（首次访问求值并
 * 缓存为类数据属性），换写方式见 ViewScenes.TOP_HEIGHT（批次 A 同款）。
 */
import { Tools } from "../utils/Tools";
import { ServerURLcfg_cb } from "./ServerURLcfg_cb";
import { ServerURLcfg_fs } from "./ServerURLcfg_fs";
import { ServerURLcfg_sg } from "./ServerURLcfg_sg";

export class HelpConfig {

    constructor() {
    }

    /** 原文 r(1,t,"serverAddress",...) —— 静态只读访问器（未接测试网关时为空串） */
    public static get serverAddress(): string {
        return "";
    }

    /** 原文 r(1,t,"appName",...) —— URL 参数 app（渠道包名） */
    public static get appName(): string {
        return Tools.getURLexp("app");
    }

    /** 原文 r(1,t,"uiName",...) —— URL 参数 uitype（UI 形态） */
    public static get uiName(): string {
        return Tools.getURLexp("uitype");
    }

    /** 原文 r(1,t,"server_url_cfg",...) —— 按渠道选择服务器 URL 配置（结果缓存在 serverURLcfg） */
    public static get server_url_cfg(): any {
        if (HelpConfig.serverURLcfg) return HelpConfig.serverURLcfg;
        switch (HelpConfig.type_app) {
            case "cb": HelpConfig.serverURLcfg = new ServerURLcfg_cb(); break;
            case "fs": HelpConfig.serverURLcfg = new ServerURLcfg_fs(); break;
            default: HelpConfig.serverURLcfg = new ServerURLcfg_sg();
        }
        return HelpConfig.serverURLcfg;
    }

    public static TYPE_SG: string = "sg";
    public static TYPE_WW: string = "ww";
    public static TYPE_CB: string = "cb";
    public static TYPE_GZ: string = "gz";
    public static TYPE_FS: string = "fs";
    public static UI_SG4: string = "sg4";
    public static serverURLcfg: any = null;

    /** 原文 h(t,["type_app",...]) —— Laya.static 惰性静态：appName 缺省 "sg" */
    public static get type_app(): string {
        var v = HelpConfig.appName || "sg";
        Object.defineProperty(HelpConfig, "type_app", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 h(t,["type_ui",...]) —— Laya.static 惰性静态 */
    public static get type_ui(): string {
        var v = HelpConfig.uiName;
        Object.defineProperty(HelpConfig, "type_ui", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.HelpConfig")（2 参注册，无基类）。
 */
Laya.class(HelpConfig, "sg.cfg.HelpConfig", null, null);
