/**
 * sg.utils.SaveLocal —— 本地存储门面：LocalStorage(JSON) + 内存 _storageDict 双写，
 * emiter 广播 STORAGE_INIT/STORAGE_CHANGE；s=true 时键按玩家 zone 分区。
 *
 * 原文：code1.js 字节 [1128143,1132508]（包装变量 us，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/SaveLocal.js
 *
 * 依赖：q=laya.net.LocalStorage、T=laya.events.EventDispatcher（UMD 级别名，
 * 285255/286430 处实测）；ue=ModelManager、Rt=ConfigApp（批次 B 模块直引）。
 * 原文自引走 sg.utils.SaveLocal 全局路径，TS 化后改类直引（batch-a-report §6.4）。
 * 方法名 savaArr/savaObjByKey 原文拼写如此（save 少 e）。emiter 为 Laya.static
 * 惰性静态（ViewScenes.TOP_HEIGHT 同款换写）。
 */
import EventDispatcher = laya.events.EventDispatcher;
import { ModelManager } from "../manager/ModelManager";
import { ConfigApp } from "../cfg/ConfigApp";

export class SaveLocal {

    constructor() {
    }

    public static initStorage(i: any): void {
        null != i && (
            SaveLocal._storageDict = i,
                SaveLocal.emiter.event("STORAGE_INIT", SaveLocal._storageDict));
    }

    public static changeStorage(i: string, e?: string, s?: any): void {
        switch (void 0 === e && (e = ""), i) {
            case "operate_update": SaveLocal._storageDict[e] = s; break;
            case "operate_delete": delete SaveLocal._storageDict[e]; break;
            case "operate_clear": SaveLocal._storageDict = {};
        }
        SaveLocal.emiter.event("STORAGE_CHANGE", SaveLocal._storageDict);
    }

    /** s=true 时按当前玩家 zone 分区取键；优先 LocalStorage，缺省回落内存表 */
    public static getValue(i: string, e?: boolean): any {
        void 0 === e && (e = !1);
        var s = e ? i + "_" + ModelManager.instance.modelUser.zone : i;
        return laya.net.LocalStorage.getJSON(s) || SaveLocal._storageDict[s];
    }

    public static save(i: string, e: any, s?: boolean): void {
        if (void 0 === s && (s = !1), void 0 !== e) {
            var n = s ? i + "_" + ModelManager.instance.modelUser.zone : i;
            ConfigApp.releaseQQ() || (
                SaveLocal.changeStorage("operate_update", n, e),
                    laya.net.LocalStorage.setJSON(n, e));
        }
    }

    public static deleteObj(i: string, e?: boolean): void {
        void 0 === e && (e = !1);
        var s = e ? i + "_" + ModelManager.instance.modelUser.zone : i;
        ConfigApp.releaseQQ() || (
            SaveLocal.changeStorage("operate_delete", s),
                laya.net.LocalStorage.removeItem(s));
    }

    /** 原文拼写 savaArr：键下 i 子数组追加去重元素 */
    public static savaArr(t: string, i: string, e: any, s?: boolean): void {
        void 0 === s && (s = !1);
        var n = SaveLocal.getValue(t, s);
        if (n) {
            var h = n[i];
            -1 == h.indexOf(e) && h.push(e);
        } else (n = {})[i] = [e];
        SaveLocal.save(t, n, s);
    }

    public static deleteArr(t: string, i: string, e: any, s?: boolean): void {
        void 0 === s && (s = !1);
        var n = SaveLocal.getValue(t, s);
        if (n) {
            var h = n[i];
            -1 != h.indexOf(e) && (h.splice(h.indexOf(e), 1), SaveLocal.save(t, n, s));
        }
    }

    public static clearAll(): void {
        ConfigApp.releaseQQ() || (
            SaveLocal.changeStorage("operate_clear"),
                laya.net.LocalStorage.clear());
    }

    /** 原文拼写 savaObjByKey：按 mUID 分键覆写对象 */
    public static savaObjByKey(t: string, i: string, e: any, s?: boolean): void {
        void 0 === s && (s = !1);
        var n = SaveLocal.getValue(t, s);
        i = i + "_" + ModelManager.instance.modelUser.mUID,
            n ? (n[i] || (n[i] = {}), n[i] = e) : (n = {})[i] = e,
            SaveLocal.save(t, n, s);
    }

    public static KEY_USER: string = "local_save_key_user";
    public static KEY_USER_LIST: string = "local_save_key_user_list";
    public static KEY_WASH_EQUIP: string = "local_save_key_wash_equip";
    public static KEY_CHAT: string = "local_save_key_chat_";
    public static KEY_PVE_HERO: string = "local_save_key_pve_hero";
    public static KEY_HAPPY_SPARTA: string = "local_save_key_happy_sparta";
    public static KEY_SERVER_CFG: string = "local_save_key_server_cfg";
    public static KEY_SERVER_CFG_VERSION: string = "local_save_key_server_cfg_version";
    public static KEY_HERO_SKILL_SPECIAL: string = "key_hero_skill_special";
    public static KEY_GUIDE: string = "sg_local_save_key_guide";
    public static KEY_SETTINGS: string = "sg_local_save_key_settings";
    public static KEY_DUPLICATE_SETTINGS: string = "key_duplicate_settings";
    public static KEY_COUNTRY_KING: string = "_key_country_king";
    public static KEY_COUNTRY_KING_EVERY_TIPS: string = "_key_country_king_every_tips";
    public static KEY_ACT: string = "local_save_key_act_";
    public static KEY_REPEAT_ALERT: string = "local_save_key_repeat_alert_";
    public static KEY_NEW_HERO: string = "local_save_key_new_hero_";
    public static KEY_XYZ_BEGIN: string = "local_save_key_xyz_begin_";
    public static KEY_COUNTRY_TRUBUTR: string = "local_save_key_country_tribute_";
    public static KEY_YYB_LOGIN: string = "login_pf_yyb";
    public static KEY_GG_FB_LOGIN: string = "login_pf_gg_fb";
    public static KEY_VISITOR_USER_DATA: string = "visitor_user_data";
    public static KEY_AGREEMENT: string = "local_save_key_agreement";
    public static KEY_EMPEROR_TIPS_TIME: string = "emperor_tips_time_";
    public static KEY_SEE_RANK_WORLD: string = "see_rank_world_";
    public static KEY_SEE_OFFICE_MAIN: string = "see_rank_office_main_";
    public static KEY_LOCAL_CHAT_CHANNEL: string = "key_local_chat_channel_";
    public static KEY_LOCAL_CHAT_TIPS: string = "key_local_chat_tips_";
    public static KEY_LOCAL_RANK_TAB: string = "key_local_rank_tab_";
    public static KEY_LOCAL_APP_IDFA: string = "key_local_app_idfa";
    public static KEY_INSTALL_REPORT: string = "key_install_report";
    public static KEY_CITY_BUILD_GEAR: string = "key_city_build_gear";
    public static KEY_COUNTRY_NOTICE_TIME: string = "key_country_notice_time_";
    public static KEY_NEW_HERO_SKIN: string = "key_new_hero_skin";
    public static KEY_PAY_ALERT: string = "key_pay_alert_";
    public static KEY_TOMB_GID_TIME: string = "key_tomb_dig_time_";
    public static KEY_AFFICHE: string = "key_affiche";
    public static KEY_BIG_SHOT: string = "key_big_shot_";
    public static KEY_SCIENCE_ANI: string = "key_science_ani_";
    public static KEY_BAG_ITEM_RED_POINT: string = "key_bag_item_red_point";
    public static KEY_NEW_MILEPOST_DAYS: string = "key_new_milpost_days";
    public static KEY_NOTICE_PICTURE: string = "key_notice_picture_";
    public static KEY_LOOP_CARD_BUY: string = "key_loop_card_buy_";
    public static KEY_ESTATE_6_HERO: string = "key_estate_6_hero_";
    public static KEY_HOMELAND_PLANID: string = "sg_local_save_homeland_planid";
    public static KEY_WAR_HEROS: string = "sg_local_save_war_heros";
    public static KEY_GWENT_DATA: string = "gwent_data";
    public static KEY_KUNLUN_SALE: string = "kunlun_sale";
    public static KEY_STORY_NOTE: string = "key_story_note";
    public static KEY_PPID_FIGHTING: string = "key_ppid_fighting";
    public static KEY_GWENT_TRIM: string = "gwent_trim";
    public static KEY_GOD_POLICE: string = "god_police";
    public static KEY_WINESHOP_PICK: string = "wineshop_pick";
    public static KEY_WINESHOP_MEMORY: string = "wineshop_memory";
    public static KEY_WINESHOP_REVIEW: string = "wineshop_review";
    public static KEY_FREE_HISTORY: string = "free_history";
    public static KEY_HERITAGE_WISH: string = "heritage_wish";
    public static KEY_FREE_HERITAGE_RED: string = "free_heritage_red";
    public static KEY_SEA_CARD_DECK_INDEX: string = "sea_card_deck_index";
    public static KEY_SCHEME_EGG_TIPSGET: string = "scheme_egg_tipsget";
    public static KEY_SCHEME_EGG_TIPSSURE: string = "scheme_egg_tipisure";
    public static KEY_SCHEME_EGG_SHOP_RED: string = "scheme_egg_shop_red";
    public static KEY_SENDHERO_USECOIN: string = "sendhero_usecoin";
    public static _storageDict: any = {};
    public static STORAGE_INIT: string = "STORAGE_INIT";
    public static STORAGE_CHANGE: string = "STORAGE_CHANGE";
    public static UPDATE: string = "operate_update";
    public static DEL: string = "operate_delete";
    public static CLEAR: string = "operate_clear";

    /** Laya.static 惰性静态：存储事件派发器 */
    public static get emiter(): EventDispatcher {
        var v = new EventDispatcher();
        Object.defineProperty(SaveLocal, "emiter", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.SaveLocal")（2 参注册，无基类）。
 */
Laya.class(SaveLocal, "sg.utils.SaveLocal", null, null);
