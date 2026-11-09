/**
 * sg.cfg.ConfigUI —— UI 开关/显示模式默认值表；init() 用服务器 system_simple 下发
 * 的 uiShowMode 节覆盖同名字段。
 *
 * 原文：code1.js 字节 [525094,526088]（包装变量 Vt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ConfigUI.js
 *
 * 依赖：Gt=ConfigServer（批次 B 模块直引）。原文自引走 sg.cfg.ConfigUI 全局路径，
 * TS 化后改类直引（batch-a-report §6.4）。bagTab/heroBtnArr/heroBtnUp/heroBtnDown
 * 为 Laya.static 惰性静态（换写方式见 ViewScenes.TOP_HEIGHT，批次 A 同款）。
 */
import { ConfigServer } from "./ConfigServer";

export class ConfigUI {

    /** 服务器 uiShowMode 节覆盖同名静态字段 */
    public static init(): void {
        var n = ConfigServer.system_simple[ConfigUI.UI_SHOW_MODE];
        for (var e in n) sg.cfg.ConfigUI.hasOwnProperty(e) && ((<any>ConfigUI)[e] = n[e]);
    }

    public static UI_SHOW_MODE: string = "uiShowMode";
    public static skillForceUnlockMode: number = 0;
    public static skillUseTitleChangeColor: number = 0;
    public static skillShowLearnIcon: number = 1;
    public static skillShowNextLv: number = 1;
    public static skillShowRound: number = 1;
    public static skillShowOnly: number = 1;
    public static skillAutoHeight: number = 0;
    public static skillOthersAlpha: number = 1;
    public static skillLockedAlpha: number = .4;
    public static heroShowRadar: number = 0;
    public static heroInfoShowGroup: number = 1;
    public static battleTroopInfoType: number = 0;
    public static battleHeroInfoType: number = 0;
    public static battleFinishSandTableType: number = 0;
    public static battleCountryBarType: number = 0;
    public static equipShowStar: number = 0;
    public static equipShowTab: number = 1;
    public static roadShowMode: number = 0;
    public static heroShowNew: number = 0;
    public static heroShowCounter: number = 0;
    public static heroBtnCon: number = 2;
    public static use_newoffice: number = 0;
    public static use_city_look: number = 0;
    public static use_map_city: number = 0;
    public static use_new_army_upgrade: number = 0;
    public static use_new_climb: number = 0;
    public static spArmyShowBaseInfo: number = 0;
    public static spArmyShowProp: number = 1;
    public static finishMatchType: number = 0;
    public static heroShowAss: number = 0;
    public static army_icon: number = 0;
    public static buildInfo: number = 0;
    public static changeColorMatUseHSB: number = 0;
    public static cb_heroInfo: number = 0;

    /** Laya.static 惰性静态：背包页签 */
    public static get bagTab(): number[] {
        var v = [0, 1, 2, 3, 4];
        Object.defineProperty(ConfigUI, "bagTab", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：武将页按钮（star/honour/skin/awaken/beast/soul/revive/god） */
    public static get heroBtnArr(): string[] {
        var v = ["star", "honour", "skin", "awaken", "beast", "soul", "revive", "god"];
        Object.defineProperty(ConfigUI, "heroBtnArr", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：武将页上排按钮 */
    public static get heroBtnUp(): string[] {
        var v = ["kismet"];
        Object.defineProperty(ConfigUI, "heroBtnUp", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：武将页下排按钮（两形态） */
    public static get heroBtnDown(): string[][] {
        var v = [["god", "soul", "beast", "skin", "formation"], ["puppet"]];
        Object.defineProperty(ConfigUI, "heroBtnDown", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.cfg.ConfigUI")（2 参注册，无基类）。
 */
Laya.class(ConfigUI, "sg.cfg.ConfigUI", null, null);
