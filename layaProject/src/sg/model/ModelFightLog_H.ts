/**
 * sg.model.ModelFightLog_H —— 横屏战报模型（城市战报/收藏战报/分享/回放，ViewModelBase
 * 惰性单例 sModel；H 后缀=横屏 VIEW_FIGHT_LOG_H）。
 *
 * 原文：code1.js 字节 [1887258,1891721)（off 1887442，池化注册名 e(17837)→
 * "sg.model.ModelFightLog_H"，包装变量 Vo，IIFE 实参基类 i=As=sg.model.ViewModelBase；
 * sendMethod/sendCB/event 继承自 ViewModelBase/EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-aa/ModelFightLog_H.js
 *
 * 身份（locate_aa.js / resolve_aa.js）：ue=ModelManager、cs=ObjectUtil、No=MapModel、
 * pn=NetSocket、P=laya.utils.Handler、tn=ViewManager、Ht=ConfigClass、vs=Tools、
 * Rt=ConfigApp、Gt=ConfigServer、Xo=ModelChat（已译，模块直引）、Sr=ModelOfficial
 * （已译，模块直引）、s=Laya（UMD 头别名表证）。
 * 批次外全局注册路径：Rn=sg.view.more.fightlog.C_FightLog（logCities/cityLogFunc，
 * 本批 externals 新增）、ci=sg.fight.FightMain（startLogBattle ambient 已列直引；
 * checkPlayback 未列 → (<any>) cast，批次 F EffectManager 先例）。
 *
 * 保真注记：refreshFightLog 的 `(7!=s||8!=s||9!=s)&&` 恒真链逐字保留（原文如此）；
 * playbackShareLog 7 形参仅尾 3 参使用（t,i,s,n 未用，签名照抄）；shareFightLog 的
 * 冷却回调 `var t=o` 别名链物化删除；静态 instance 为 r(1,…,sg.model.ViewModelBase.
 * _$SET_instance)——SET 标记 setter（TS getter-only，ES5 sloppy 写静默忽略，
 * ModelPlayer.ts:25 先例）；SHARE_PLAY_VALUE_TEXT 为 h(a,[…]) 惰性静态（TS getter +
 * defineProperty value 写回，ModelItem material_type_ui 先例）；静态自引
 * `sg.model.ModelFightLog_H.*` → 类标识符直引（批次 I/O 先例）。
 */
import Handler = laya.utils.Handler;
import { ViewModelBase } from "./ViewModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ObjectUtil } from "../utils/ObjectUtil";
import { MapModel } from "../map/model/MapModel";
import { NetSocket } from "../net/NetSocket";
import { ViewManager } from "../manager/ViewManager";
import { ConfigClass } from "../cfg/ConfigClass";
import { Tools } from "../utils/Tools";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelChat } from "./ModelChat";
import { ModelOfficial } from "./ModelOfficial";

export class ModelFightLog_H extends ViewModelBase {

    public fightLogByCid: any = null;
    public fightLogData: any = null;
    public fightId: any = null;
    public curFightLog: any = null;
    public fightLog_city_id: any = null;
    public cityLogsData: any = null;

    constructor() {
        super();  // 原文 a.__super.call(this)（字段预置先于 super，H/O 位移归一）
    }

    public isMineBtnShow(): any {
        var i = !1, s = [];
        if (this["fightLogByCid"]) for (var n = 0; n < this["fightLogByCid"]["length"]; n++) {
            var h = this["fightLogByCid"][n];
            (h["troop1"]["uid"] == ModelManager["instance"]["modelUser"]["mUID_base"] || h["troop2"]["uid"] == ModelManager["instance"]["modelUser"]["mUID_base"]) && (i = !0), -1 == s["indexOf"](h["troop1"]["uid"]) && h["troop1"]["uid"] > 0 && s["push"](h["troop1"]["uid"]), -1 == s["indexOf"](h["troop2"]["uid"]) && h["troop2"]["uid"] > 0 && s["push"](h["troop2"]["uid"]);
        }
        return s["length"] < 3 && (i = !1), i;
    }

    public cityFightLog(t: any, i: any): void {
        this["fightId"] = i, this["fightLogByCid"] = [];
        for (var n = t["length"], h = 0; h < n; h++) {
            var o = t[h]["battles"];
            if (o["length"] > 0 && t[h]["fight_id"] == i) {
                this["curFightLog"] = t[h];
                for (var r = 0; r < o["length"]; r++) {
                    var a = o[r];
                    a["troop1"]["uid"] > 0 && a["troop2"]["uid"] > 0 && this["fightLogByCid"]["push"](a);
                }
            }
        }
    }

    public targetFightLog(t: any): any {
        if (this["fightLogData"]) for (var s = 0; s < this["fightLogData"]["length"]; s++) {
            var n = this["fightLogData"][s];
            if (n[12] == t) return n;
        }
        return [];
    }

    public collectionBattles(): any {
        for (var i = ModelManager["instance"]["modelUser"]["records"]["collection_battles"], s = ObjectUtil["keys"](i), n = [], h = 0; h < s["length"]; h++) {
            var o = i[s[h]];
            n["push"](o);
        }
        return n;
    }

    public cityLogBtnClickFunc(t: any): void {
        var s = MapModel["instance"]["citys"][t];
        -1 != sg.view.more.fightlog.C_FightLog["instance"]["logCities"]["indexOf"](t) || s["fire"] ? (this["fightLog_city_id"] = t, NetSocket["instance"]["send"]("get_city_fight_log", { cid: t }, Handler["create"](this, function (e) {
            sg.view.more.fightlog.C_FightLog["instance"]["cityLogFunc"](e["receiveData"]), ViewManager["instance"]["showView"](ConfigClass["VIEW_FIGHT_LOG_H"], [ModelFightLog_H["VIEW_TYPE_CITY"], e["receiveData"], t]);
        }), { cityId: t })) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("war_report_info21"));
    }

    public getFightLog(t: any): void {
        null != t && this["refreshFightLog"](t);
    }

    public refreshFightLog(t: any): void {
        if (ModelFightLog_H["View_Type"] == ModelFightLog_H["VIEW_TYPE_CITY"] && ConfigApp["isLandscape"] && null != t && this["fightLog_city_id"] == t["cid"]) {
            var s = ModelOfficial["getCityCfg"](t["cid"])["cityType"];
            (7 != s || 8 != s || 9 != s) && NetSocket["instance"]["send"]("get_city_fight_log", { cid: this["fightLog_city_id"] }, Handler["create"](this, function (t) {
                ModelFightLog_H["instance"]["event"](ModelFightLog_H["UPDATE_FIGHT_STATE"], [ModelFightLog_H["View_Type"], t["receiveData"], t["otherData"]["cityId"]]);
            }), { cityId: this["fightLog_city_id"] });
        }
    }

    public shareFightLog(t: any, i: any, n: any, h: any): void {
        void 0 === n && (n = ""), void 0 === h && (h = "");
        var r = ConfigServer["system_simple"]["war_report"];
        ModelFightLog_H["canShare"] && (ModelFightLog_H["canShare"] = !1, ModelChat["shareFightLog"](t, i, n, h), Laya["timer"]["once"](1e3 * r["share_cd"], this, function () {
            ModelFightLog_H["canShare"] = !0;
        }));
    }

    public playbackShareLog(t: any, i: any, s: any, n: any, h: any, o: any, r: any): void {
        void 0 === h && (h = ""), void 0 === o && (o = ""), ViewManager["instance"]["showView"](ConfigClass["VIEW_FIGHT_LOG_SHAREPLAY"], r[3][2]);
    }

    public sendBattleData(t: any): void {
        NetSocket["instance"]["send"]("get_battle_data", { battle_id: t }, Handler["create"](this, this["ws_SR_GET_BATTLE_DATA"]));
    }

    public ws_SR_GET_BATTLE_DATA(t: any): void {
        var s = t["receiveData"]["data"];
        s ? (<any>sg.fight.FightMain)["checkPlayback"](s["fight_time"], !1) ? sg.fight.FightMain["startLogBattle"](s) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_explore073")) : ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("fight_log_error_1"));
    }

    public sendCollectBattle(t: any, i: any, s: any): void {
        NetSocket["instance"]["send"]("collect_battle", { cid: t, fight_id: i, battle_id: s }, Handler["create"](this, this["ws_SR_GET_COLLECT_BATTLE"]));
    }

    public ws_SR_GET_COLLECT_BATTLE(t: any): void {
        ModelManager["instance"]["modelUser"]["updateData"](t["receiveData"]), ModelFightLog_H["instance"]["event"](ModelFightLog_H["UPDATE_FIGHTLOG"], [0]), ModelFightLog_H["instance"]["event"](ModelFightLog_H["UPDATE_COLLECT_STATE"]);
    }

    public sendCancelCollectBattle(t: any): void {
        NetSocket["instance"]["send"]("cancel_collect_battle", { battle_id: t }, Handler["create"](this, this["ws_SR_GET_CANCEL_COLLECT_BATTLE"]));
    }

    public ws_SR_GET_CANCEL_COLLECT_BATTLE(t: any): void {
        ModelManager["instance"]["modelUser"]["updateData"](t["receiveData"]), ModelFightLog_H["instance"]["event"](ModelFightLog_H["UPDATE_FIGHTLOG"], [0]), ModelFightLog_H["instance"]["event"](ModelFightLog_H["UPDATE_COLLECT_STATE"]);
    }

    /* ---- r(0,l,name,getter[,setter]) 实例访问器 ---- */

    public get curShowCityFightLog(): any {
        return this["curFightLog"];
    }

    public get fightLogs(): any {
        return this["fightLogData"];
    }

    public set fightLogs(t: any) {
        this["fightLogData"] = t;
    }

    public get cityLogs(): any {
        return this["cityLogsData"];
    }

    public set cityLogs(t: any) {
        this["cityLogsData"] = t;
    }

    /* ---- r(1,a,"instance",getter,sg.model.ViewModelBase._$SET_instance) —— 惰性单例 ---- */

    public static get instance(): ModelFightLog_H {
        return ModelFightLog_H.sModel = ModelFightLog_H.sModel || new ModelFightLog_H;
    }

    /* ---- h(a,[name,fn]) 惰性静态：首次访问装配并 defineProperty 写回 ---- */

    public static get SHARE_PLAY_VALUE_TEXT(): any {
        var v = { 1: "fight_log_text_9", 2: "fight_log_text_10", 11: "info_str", 12: "info_agi", 13: "info_cha", 14: "info_lead", 15: "fight_log_text_4", 16: "fight_log_text_5", 17: "fight_log_text_6", 18: "fight_log_text_7", 19: "fight_log_text_8" };
        Object.defineProperty(ModelFightLog_H, "SHARE_PLAY_VALUE_TEXT", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static ENUM_0: number = 0;
    public static ENUM_1: number = 1;
    public static ENUM_2: number = 2;
    public static ENUM_11: number = 11;
    public static ENUM_12: number = 12;
    public static ENUM_13: number = 13;
    public static ENUM_14: number = 14;
    public static ENUM_15: number = 15;
    public static ENUM_16: number = 16;
    public static ENUM_17: number = 17;
    public static ENUM_18: number = 18;
    public static ENUM_19: number = 19;
    public static sModel: ModelFightLog_H = null;
    public static UPDATE_FIGHTLOG: string = "update_fightlog";
    public static UPDATE_TAB_STATE: string = "update_tab_state";
    public static UPDATE_COLLECT_STATE: string = "update_collect_state";
    public static UPDATE_FIGHT_STATE: string = "fight_state";
    public static View_Type: number = 0;
    public static VIEW_TYPE_PERSON: number = 0;
    public static VIEW_TYPE_CITY: number = 1;
    public static canShare: boolean = !0;
    public static lastFightLogTabCnt: number = 0;
}

/**
 * 注册身份等价物：原文 o(a,e(17837),i)（池化名 e(17837)="sg.model.ModelFightLog_H"，
 * i=As=sg.model.ViewModelBase）。base 传 null：tsc extends 已建原型链（batch-a
 * 「注册等价决策」，同 ModelXYZ2/ModelArena）。
 */
Laya.class(ModelFightLog_H, "sg.model.ModelFightLog_H", null, null);
