/**
 * sg.cfg.ConfigServer —— 服务器配置中枢：sys.new_get_config_v1 拉取/缓存（HTTP/Socket/
 * 战斗测试三通道）、monkey 版本回退（errorConfigs）、配置写回静态字段、合服表合并、
 * 开服时间轴（zone 表状态/图标/全量列表）。
 *
 * 原文：code1.js 字节 [510807,525088]（包装变量 Gt，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ConfigServer.js
 *
 * 依赖（批次 B/A 模块直引）：Rt=ConfigApp、ue=ModelManager、pn=NetSocket、fn=NetHttp、
 * vs=Tools、be=sg.map.utils.TestUtils、Ft=ConfigAssets、Vt=ConfigUI、us=SaveLocal、
 * cs=ObjectUtil、Js=LoadeManager(A)、os=sg.utils.MessagePack（批次外）；
 * 引擎：P=laya.utils.Handler、K=laya.maths.MathUtil、v=laya.utils.Color、s=Laya。
 * 批次外（全局注册路径，见各行内注）：Tr=ModelOffice、Vi=sg.god.model.ModelGodAct、
 * hr=ModelEstate、Eo=ModelBlessHero、_r/nr/Pr/Gr/jr/Oo/Rr/Vr/zr/Wr/Se=各模型缓存类、
 * xo/wo=sg.heritage.ModelTrait(ModelTraitAbility)、Ut=Laya.Platform、
 * ce=sg.manager.FilterManager、ws=sg.zmPlatform.ConstantZM、
 * Ni=sg.fight.logic.utils.FightUtils、gi=sg.fight.logic.cfg.ConfigFight、
 * Jt=sg.fight.client.cfg.ConfigFightView、Ve=sg.scene.constant.ConfigConst、
 * Br=ModelPlayer。原文自引走 sg.cfg.ConfigServer 全局路径，TS 化后改类直引。
 * FIGHT_CFG_WHITE_LIST/FIGHT_TEST_WHITE_LIST/merge_cfg_list 为 Laya.static 惰性静态
 * （ViewScenes.TOP_HEIGHT 同款换写；白名单重复项如 "skill" 按原文保留）。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { ConfigApp } from "./ConfigApp";
import { ConfigAssets } from "./ConfigAssets";
import { ConfigUI } from "./ConfigUI";
import { ModelManager } from "../manager/ModelManager";
import { LoadeManager } from "../manager/LoadeManager";
import { NetSocket } from "../net/NetSocket";
import { NetHttp } from "../net/NetHttp";
import { Tools } from "../utils/Tools";
import { SaveLocal } from "../utils/SaveLocal";
import { ObjectUtil } from "../utils/ObjectUtil";
import { TestUtils } from "../map/utils/TestUtils";

export class ConfigServer {

    constructor() {
    }

    /** r(1,i,"pay_config_pf",...) —— 按渠道 pf 选支付配置（无分支回落 pay_config） */
    public static get pay_config_pf(): any {
        return !ConfigServer._pay_config_pf && (
            ConfigServer.pay_config && ConfigServer.pay_config.pf && ConfigServer.pay_config.pf[ConfigApp.pf]
                ? ConfigServer._pay_config_pf = ConfigServer.pay_config.pf[ConfigApp.pf]
                : ConfigServer._pay_config_pf = ConfigServer.pay_config),
            ConfigServer._pay_config_pf;
    }

    public static get country_king_icon(): any[] {
        return ConfigServer.system_simple.king_img ? ConfigServer.system_simple.king_img : [];
    }

    public static get country_task_icon(): any[] {
        return ConfigServer.system_simple.country_task_img ? ConfigServer.system_simple.country_task_img : [];
    }

    public static get equip_make_special(): any {
        return ConfigServer.system_simple.equip_make_special;
    }

    /** 合服优先 climb_new，回落 climb */
    public static get climb(): any {
        var i: any;
        return !ModelManager.instance.modelUser.merge_maps && ModelManager.instance.modelUser.isMerge && (i = ConfigServer.config.climb_new),
            !i && (i = ConfigServer.config.climb),
            i;
    }

    public static get officeCfg(): any {
        return sg.model.ModelOffice.useOffice37() ? ConfigServer.office37 : ConfigServer.office;
    }

    public static getRewardPool(i: any, e: any): void {
        NetSocket.instance.send("get_award", { award_ids: i }, Handler.create(null, function (t: any) {
            var n = t.receiveData.award;
            n && e.runWith(n);
        }));
    }

    /**
     * 配置落盘：服务器态只保留战斗白名单键；本地态先试 TestUtils 覆盖；
     * e=true（首次/全量）时把 config 逐键提升为类静态字段。
     */
    public static writeCfg(e: boolean): void {
        var s: any, h = false;
        if (ConfigApp.isServer)
            for (s in ConfigServer.config) -1 == ConfigServer.FIGHT_CFG_WHITE_LIST.indexOf(s) && delete ConfigServer.config[s];
        else h = TestUtils.checkLocalConfig();
        if (!h && e)
            for (s in ConfigServer.config) (<any>ConfigServer)[s] = ConfigServer.config[s];
        ConfigServer.initMsg();
    }

    /** 文案字典初始化 + 简繁开关（return_msg[100] 首字母 n=繁体默认开） */
    public static initMsg(): void {
        !ConfigServer.return_msg && (ConfigServer.return_msg = {});
        var e = ConfigServer.return_msg[100];
        e && ("n" == e[0] ? !sg.god.model.ModelGodAct.cEnS && (sg.god.model.ModelGodAct.deS = !1) : sg.god.model.ModelGodAct.deS = !0),
            Tools.sMsgDic = ConfigServer.return_msg;
    }

    /** 合服服文案键映射（msg_map[键][合服数] → 目标键） */
    public static modifyMsgDict(): void {
        if (ModelManager.instance.modelUser.isMergeMaps) {
            var s = ModelManager.instance.modelUser.mergeNum,
                n = ConfigServer.system_simple.msg_map || {};
            for (var h in n) {
                var o = n[h];
                o && o[s] && (Tools.sMsgDic[h] = Tools.sMsgDic[o[s]]);
            }
        }
    }

    /** color.color2id/id2color → laya.utils.Color.colorMap */
    public static checkColorCfg(): void {
        var e = ConfigServer.color;
        if (e) {
            var s = e.color2id || {},
                n = e.id2color || {},
                h = (<any>laya.utils.Color).colorMap = <any>{};
            for (var o in s) h[o] = n[s[o]];
        }
    }

    public static formatTo(i: any): void {
        ConfigApp.hasDocument = !1,
            ConfigServer.writeCfgOldMode(i);
    }

    public static writeCfgOldMode(i: any): void {
        ConfigApp.cfgVersion = Number(i.cfg_version);
        var s = i.cfg;
        ConfigServer.config = s,
            ConfigServer.writeCfg(!0),
            ConfigServer.resetConfig();
    }

    /** 配置生效流水：清模型缓存 → 战斗表展开 → 合服合并 → 战斗测试覆盖 → 各配置 init */
    public static resetConfig(): void {
        ConfigServer.clearAllModel(),
            ConfigApp.testFightType && sg.god.model.ModelGodAct.benja([ConfigServer.config.effect, ConfigServer.config.effect_1, ConfigServer.config.skill_2]),
            ConfigServer.mergeData(),
            ConfigServer.mergeFightTestData(),
            ConfigApp.testFightType && (sg.god.model.ModelGodAct.bens(Tools.sMsgDic), sg.god.model.ModelGodAct.benja([ConfigServer.config.equip_skill, ConfigServer.config.inborn])),
            sg.fight.logic.cfg.ConfigFight.init(),
            ConfigApp.hasDocument && (
                ConfigApp.initFontSizeMap(ConfigServer.system_simple.font_size_map),
                    ConfigApp.initFontLeadingMap(ConfigServer.system_simple.font_leading_map),
                    1 != ConfigApp.testFightType && sg.scene.constant.ConfigConst.init(),
                    ConfigServer.checkColorCfg(),
                    ConfigServer.property = ConfigServer.config.prop,
                    ConfigServer.nativeCfg = ConfigServer.config.native,
                    ConfigServer.science_type = ConfigServer.science.science_type,
                    ConfigServer.checkQuickDic(),
                    NetSocket.timeOutTimer = ConfigServer.system_simple.hasOwnProperty("net_timeout") ? ConfigServer.system_simple.net_timeout : 15e3,
                    ConfigAssets.noAtlasAnimations = ConfigServer.config.effect.noAtlasAnimations,
                    ConfigUI.init(),
                    sg.fight.client.cfg.ConfigFightView.init(),
                    !ConfigApp.testFightType && ConfigServer.checkCityEstate());
    }

    /** 横屏且交易未开时剔除 city estate 中的 "2"（竖屏专用）项 */
    public static checkCityEstate(): void {
        if (ConfigApp.isLandscape) {
            if (sg.model.ModelEstate.isTradeOpen()) return;
            for (var s in ConfigServer.city) {
                var n = ConfigServer.city[s].estate;
                if (n)
                    for (var h = n.length - 1; h >= 0; h--) {
                        var o = n[h];
                        o && ("2" == o[0] && (n[h] = null));
                    }
            }
        }
    }

    /** 合服配置合并：merge_cfg_list 每组把前置表并进末位总表 */
    public static mergeData(): void {
        var s = 0,
            n = ConfigServer.merge_cfg_list.length,
            h = ConfigServer.config;
        for (s = 0; s < n; s++) {
            var o = ConfigServer.merge_cfg_list[s],
                r = 0,
                a = o.length,
                l = (<any>ConfigServer)[o[a - 1]];
            if (l)
                for (r = 0; r < a - 1; r++) {
                    var c = h[o[r]];
                    for (var u in c) l[u] = c[u];
                }
        }
    }

    /** 战斗测试配置覆盖（fight_test 表深合并进已生效配置） */
    public static mergeFightTestData(): void {
        if (ConfigApp.testFightType) {
            var s: any, n = ConfigServer.fight_test;
            if (n)
                for (s in n) {
                    var h = (<any>ConfigServer)[s],
                        o = n[s];
                    h && sg.fight.logic.utils.FightUtils.mergeObj(h, o, !0, "=", !1, !1, !1, !1);
                }
        }
    }

    public static clearAllModel(): void {
        sg.model.ModelBlessHero.clearModels(),
            sg.model.ModelHero.heroModels = {},
            sg.model.ModelEquip.equipModels = {},
            sg.model.ModelRune.runeModels = {},
            sg.model.ModelSkill.skillModels = {},
            sg.model.ModelTalent.talentModels = {},
            sg.model.ModelAwaken.awakenModels = {},
            sg.model.ModelScience.modelSciences = {},
            sg.heritage.ModelTrait.traitModels = {},
            sg.heritage.ModelTraitAbility.abilityModels = {},
            sg.model.ModelSkin.skinModels = {},
            sg.model.ModelSPArmy.models = {},
            sg.model.ModelSoul.models = {},
            sg.model.ModelScheme.models = {};
    }

    /** 首拉配置（HTTP）：先取 system_simple 策略表，再全量；ban_words_url 顺带拉敏感词 */
    public static loadCfgs_http(e: any): void {
        NetHttp.instance.send("sys.new_get_config_v1", { pf: ConfigApp.pf, lan: ConfigApp.lan() }, Handler.create(null, function (t: any) {
            var h = Laya.Platform.changeConfigJsonHttpByPf(t.config_dict);
            h && h.system_simple && ConfigServer.getStrategy(h, Handler.create(null, function () {
                ConfigServer.loadCfgs(h, e);
            })),
                t.ban_words_url && NetHttp.instance.getRequest(t.ban_words_url, Handler.create(null, function (t: any) {
                    sg.manager.FilterManager.instance.setTalkBanWord_server(t);
                }));
        }), 180);
    }

    /** 重连/切服重拉（Socket，带 zone）；error_config 增量记入本地 */
    public static loadCfgs_socket(e: any, s: any): void {
        NetHttp.instance.send("sys.new_get_config_v1", { pf: ConfigApp.pf, lan: ConfigApp.lan(), zone: e }, Handler.create(null, function (t: any) {
            var h = Laya.Platform.changeConfigJsonHttpByPf(t.config_dict);
            ConfigServer.loadCfgs(h, Handler.create(ConfigServer, ConfigServer.onConfigChanged, [s])),
                SaveLocal.save("error_config", ConfigServer.errorConfigs);
        }));
    }

    public static onConfigChanged(i: any): void {
        ConfigServer.resetConfig(),
            i && i.run();
    }

    /** 战斗测试拉取：白名单外配置舍弃并打印，bin 按数组缓冲加载 */
    public static loadCfgs_fightTest(i: any): void {
        var s = TestUtils.testSubmitConfig ? "sys.fight_test_get_configs" : "sys.new_get_config";
        NetHttp.instance.send(s, { pf: ConfigApp.pf, lan: ConfigApp.lan() }, Handler.create(null, function (t: any) {
            var n = Laya.Platform.changeConfigJsonHttpByPf(t.config_dict),
                h: any = {};
            sg.fight.logic.utils.FightUtils.arrayToObject(ConfigServer.FIGHT_TEST_WHITE_LIST, h),
                sg.fight.logic.utils.FightUtils.arrayToObject(ConfigServer.FIGHT_CFG_WHITE_LIST, h);
            var o: any[] = [];
            for (var r in n) !h[r] && (o.push(r), delete n[r]);
            o.length > 0 && console.log("舍弃配置：", o);
            var a = ObjectUtil.values(n).map(function (t: any) {
                return { url: t, type: /\.bin\b/.test(t) ? "arraybuffer" : "json" };
            });
            LoadeManager.load(a, Handler.create(null, function () {
                ConfigServer.updateFightTestConfig(n),
                    i && i.runWith(t);
            }));
        }));
    }

    public static updateFightTestConfig(e: any): void {
        var s: any;
        // 原文 for (i.config={}, s in e)：JS 允许逗号表达式作 for-in 头部（s 为赋值目标），
        // TS2406 拆为循环前赋值，求值时机相同（均先于首次迭代）。
        ConfigServer.config = {};
        for (s in e) {
            var h = e[s];
            try {
                ConfigServer.updateCfg(s, h);
            } catch (t) { }
        }
        ConfigServer.writeCfg(!0),
            ConfigServer.resetConfig();
    }

    public static initErrorConfigs(): void {
        ConfigServer.errorConfigs = SaveLocal.getValue("error_config") || {};
    }

    /** 先拉 system_simple（决定其余配置加载策略/合服过滤） */
    public static getStrategy(e: any, n: any): void {
        ConfigServer.initErrorConfigs();
        var o = "system_simple",
            r = ConfigServer.getCfgUrlByKey(e, o);
        Laya.loader.load(r, Handler.create(null, function () {
            ConfigServer.updateCfg(o, r),
                n.run();
        }), null, /\.bin\b/.test(r) ? "arraybuffer" : null);
    }

    /** 配置 URL：去尾 "?"、error_config 回退（v 序号回退计数）、合服 zone 参数 */
    public static getCfgUrlByKey(e: any, s: string): string {
        var h = e[s],
            o = ConfigServer.errorConfigs[s];
        "?" === h[h.length - 1] && (h = h.slice(0, h.length - 1));
        var r = -1 !== h.indexOf("?") ? "&" : "?";
        if (o) {
            var a = o[0],
                l = o[1];
            -1 !== h.indexOf(a + "") && (h += [r, "error_config", "=", l].join(""));
        }
        var c = ModelManager.instance.modelUser.mergeZone,
            u = "";
        return c && (u = r + "zone=" + c),
            h + u;
    }

    /** 合并新 dict，按 cfg_load 合服区间过滤键后加载 */
    public static loadCfgs(e: any, s: any): void {
        ConfigServer.cfg_dict = ObjectUtil.mergeObjects([ConfigServer.cfg_dict, e]);
        var h: any = {};
        ConfigServer.system_simple && ConfigServer.system_simple.cfg_load && (h = ConfigServer.system_simple.cfg_load);
        var o = ObjectUtil.keys(e),
            r = ModelManager.instance.modelUser.mergeNum;
        o = o.filter(function (t: any) {
            var i = h[t] || [-99, 99];
            return i[0] <= r && r <= i[1];
        }),
            ConfigServer.loadCfgsWithKeys(o, s);
    }

    public static loadCfgsWithKeys(e: any[], n: any): void {
        var o = e.map(function (t: any) {
            return ConfigServer.getCfgUrlByKey(ConfigServer.cfg_dict, t);
        });
        Laya.loader.load(o.map(function (t: any) {
            return { url: t, type: /\.bin\b/.test(t) ? "arraybuffer" : "json" };
        }), Handler.create(null, ConfigServer.updateCfgs, [e, n]));
    }

    public static updateCfgs(e: any[], s: any): void {
        e.forEach(function (t: any) {
            var s = ConfigServer.getCfgUrlByKey(ConfigServer.cfg_dict, t);
            ConfigServer.updateCfg(t, s);
        }),
            ConfigServer.writeCfg(!1),
            s && s.run();
    }

    /** 单表生效：bin 走 MessagePack 解码；monkey_version 低于 URL v 时记 errorConfigs 回退计数 */
    public static updateCfg(e: string, n: string): void {
        var o: any = Laya.loader.getRes(n);
        if (o instanceof ArrayBuffer && (o = sg.utils.MessagePack.decode(o)), o.monkey_version) {
            var r = /v=(\d+)\D?/;
            if (r.test(n)) {
                var a = parseFloat(n.match(r)[1]),
                    l = parseFloat(o.monkey_version),
                    c = ConfigServer.errorConfigs[e];
                c
                    ? c[0] === a
                        ? l < a && (ConfigServer.errorConfigs[e] = [a, c[1] + 1], console.warn(l, a))
                        : delete ConfigServer.errorConfigs[e]
                    : l < a && (ConfigServer.errorConfigs[e] = [a, 1]);
            }
            o = o.monkey_config;
        }
        (<any>ConfigServer)[e] = ConfigServer.config[e] = o;
    }

    /** 服务器时间校准：首次或（强制 s 且未长调/落后）时重置基准 */
    public static checkServerTime(e: any, s?: boolean): void {
        void 0 === s && (s = !1);
        var h = (new Date()).getTime();
        isNaN(e) || e <= 0 || (
            0 === ConfigServer.serverNow || s && (!1 === ConfigServer.longAdjusted || e > ConfigServer.serverNow + (h - ConfigServer.runGameStartTimer))
        ) && (
            ConfigServer.longAdjusted || (ConfigServer.longAdjusted = s),
                ConfigServer.serverNow = e,
                ConfigServer.runGameStartTimer = h
        );
    }

    /** 可学技能索引 + 技能/SP 军团 type 字典 */
    public static checkQuickDic(): void {
        var e: any, n = 0;
        for (e in ConfigServer.learnableSkills = {}, ConfigServer.skill)
            if (sg.model.ModelSkill.isLearnable(e)) {
                ConfigServer.learnableSkills[e] = 1;
                var h = ConfigServer.skill[e];
                h.hasOwnProperty("type") && (n = h.type, !ConfigServer.skill_type_dic[n] && (ConfigServer.skill_type_dic[n] = {}), ConfigServer.skill_type_dic[n][e] = h);
            }
        for (e in ConfigServer.sp_army) {
            var o = ConfigServer.sp_army[e];
            o.hasOwnProperty("type") && (n = o.type, !ConfigServer.sp_army_type_dic[n] && (ConfigServer.sp_army_type_dic[n] = {}), ConfigServer.sp_army_type_dic[n][e] = o);
        }
    }

    public static getServerTimer(): number {
        return ConfigServer.serverNow + ((new Date()).getTime() - ConfigServer.runGameStartTimer);
    }

    public static getLocalCfg(): any {
        return SaveLocal.getValue("local_save_key_server_cfg");
    }

    public static setLocalCfg(i: any): void {
        SaveLocal.save("local_save_key_server_cfg", i);
    }

    public static getLocalCfgVersion(): number {
        return Number(SaveLocal.getValue("local_save_key_server_cfg_version"));
    }

    public static setLocalCfgVersion(i: any): void {
        SaveLocal.save("local_save_key_server_cfg_version", i);
    }

    /** zone 是否允许当前 pf：zone_pf[zone]=[白名单,黑名单] */
    public static checkZonePfIsOK(i: any): boolean {
        var s = !1,
            n = ConfigApp.pf;
        sg.zmPlatform.ConstantZM.platform && (n = sg.zmPlatform.ConstantZM.platform);
        var h = i + "";
        if (ConfigServer.zone_pf && ConfigServer.zone_pf[h]) {
            var o = ConfigServer.zone_pf[h],
                r = o[0];
            if (r && 0 != r.length) s = r.indexOf(n) > -1;
            else {
                var a = o[1];
                s = !0,
                    a && 0 != a.length && a.indexOf(n) > -1 && (s = !1);
            }
        } else s = !0;
        return s;
    }

    /** changeZonePf=yes 且 pf_change_zone 命中上次 zone 时强制 pf=test */
    public static checkIsChangeCurrPfTo(): void {
        var e = !1,
            s = SaveLocal.getValue("local_save_key_user"),
            n: any = null;
        if (s && s.z && (n = s.z + ""), ConfigApp.changeZonePf && ConfigApp.changeZonePf == "yes")
            if (ConfigServer.system_simple.pf_change_zone) {
                var h = ConfigServer.system_simple.pf_change_zone[ConfigApp.myPackagePf];
                h && h && h.length > 0 ? h.indexOf(n) > -1 && (e = !0) : e = !0;
            } else e = !0;
        e && (ConfigApp.pf = "test");
    }

    /** 服务器是否「合服标记」（service_info[0]==0 全服合；service_zone_list 枚举） */
    public static checkServerIsMade(i: any, e?: boolean): boolean {
        void 0 === e && (e = !1);
        var n = ConfigServer.service_info ? ConfigServer.service_info : ConfigServer.system_simple.service_info;
        if (n && 0 == n[0]) return !0;
        var h = i + "",
            o = !1,
            r = ConfigServer.service_zone_list ? ConfigServer.service_zone_list : ConfigServer.system_simple.service_zone_list,
            a = Tools.getMyLoginZoneID(e ? h : "");
        if (r)
            for (var l = r.length, c = "", u = 0; u < l; u++)
                if ((c = r[u] + "") == h || c == a) { o = !0; break }
        return o;
    }

    public static checkServerIsMadeTxt(e: any, s?: boolean): string {
        return void 0 === s && (s = !1),
            ConfigServer.checkServerIsMade(e, s) ? Tools.getMsgById("_public236") : "";
    }

    public static getAttackNpcConfig(i: any): any {
        return i == "thief_three" ? ConfigServer.country_pvp[i] : ConfigServer.attack_city_npc[i];
    }

    public static getForbidNewTime(): any {
        return ConfigServer.system_simple.forbid_new_pf && ConfigServer.system_simple.forbid_new_pf[ConfigApp.pf]
            ? ConfigServer.system_simple.forbid_new_pf[ConfigApp.pf] * Tools.oneMinuteMilli
            : ConfigServer.system_simple.forbid_new * Tools.oneMinuteMilli;
    }

    /** 服务器名：zone 表 [0]；测试态显示登录 zone/h 标识；n=true 追加合服标记文案 */
    public static getServerName(e: any, s?: any, n?: boolean, h?: boolean): string {
        if (void 0 === n && (n = !1), void 0 === h && (h = !1), !e) return "Null Zone";
        var r = ConfigServer.zone[e + ""],
            a = r ? r[0] : e + " zone ban";
        if (TestUtils.isTestShow) {
            var l = Tools.getMyLoginZoneID(e);
            a = -1 !== l.indexOf("h") ? l + " ( " + e + " )" : Tools.getMsgById("_server_text1") + l;
        }
        return a + (n ? ConfigServer.checkServerIsMadeTxt(e, h) : "");
    }

    /** 全量区列表：pf 过滤 + 推荐区过滤 + 开服时间窗；tms 降序 + zone 号索引 */
    public static getAllZonesData(): void {
        var e: any, s: any, h = sg.model.ModelPlayer.instance.getServerZones().split("|");
        sg.model.ModelPlayer.instance.getZoneList();
        ConfigServer.sAllZonesArr = [];
        var o = ConfigServer.system_simple.sever_showtime * Tools.oneMinuteMilli,
            r = 0,
            a = ConfigServer.getServerTimer(),
            l: any[] = [];
        for (e in ConfigServer.zone) {
            if (parseInt(e)) {
                var c = parseInt(e);
                l.push(c);
            }
            if ((ConfigServer.checkZonePfIsOK(e) || !(h.indexOf(e) < 0)) && (s = ConfigServer.zone[e], !(Number(s[8]) > 0) && a >= (r = Tools.getTimeStamp(s[2])) - o)) {
                if (ConfigServer.system_simple.sever_only && 1 == ConfigServer.system_simple.sever_only)
                    if (0 == ConfigServer.checkIcon(e) && h.indexOf(e) < 0) continue;
                ConfigServer.sAllZonesArr.push({ id: e, arr: s, tms: r });
            }
        }
        ConfigServer.sZonesIndexObj = {},
            ConfigServer.sAllZonesArr.sort(MathUtil.sortByKey("tms", !0)),
            l.sort(<any>MathUtil.sortByKey("0", !1));
        for (var u = 0; u < l.length; u++) ConfigServer.sZonesIndexObj[l[u] + ""] = u;
    }

    /** 区图标状态：推荐区 2；有 icon(7 号位) 0；新服/禁新 2；默认 0 */
    public static checkIcon(i: any): number {
        var s = sg.model.ModelPlayer.instance.getServerZones().split("|"),
            n = ConfigServer.zone["" + i],
            h = 0;
        return s.indexOf(i + "") > -1 ? h = 2 : h = "" != n[7] ? 0 : 1 == n[3] || ConfigServer.getServerTimer() < Tools.getTimeStamp(n[2]) + ConfigServer.getForbidNewTime() ? 2 : 0,
            h;
    }

    /** 区状态：4 维护(zone[10])；3 未开；1 新服；2 将老；5 即将开 */
    public static checkZoneStatus(i: any): number {
        var s = ConfigServer.zone["" + i],
            n = 0,
            h = ConfigServer.getServerTimer(),
            o = Tools.getTimeStamp(s[2]);
        return s && s[10] ? 4 : (
            h < o ? n = 3 : 0 == s[4] ? n = h < (o = Tools.getTimeStamp(s[2]) + ConfigServer.system_simple.sever_new * Tools.oneMinuteMilli) ? 1 : 2 : n = 1 == s[4] ? 2 : 3 == s[4] ? 5 : 1,
                n);
    }

    public static replaceHero(e: any): any {
        return ConfigServer.system_simple.hero_map ? ConfigServer.system_simple.hero_map[e] : e;
    }

    public static sAllZonesArr: any = null;
    public static sZonesIndexObj: any = {};
    public static serverNow: number = 0;
    public static runGameStartTimer: number = 0;
    public static longAdjusted: boolean = false;
    public static return_msg: any = null;
    public static config: any = {};
    public static system_simple: any = null;
    public static pay_config: any = null;
    public static _pay_config_pf: any = null;
    public static country: any = null;
    public static home: any = null;
    public static hero: any = null;
    public static property: any = null;
    public static pub: any = null;
    public static army: any = null;
    public static skill: any = null;
    public static equip: any = null;
    public static shop: any = null;
    public static star: any = null;
    public static fate: any = null;
    public static zone: any = null;
    public static zone_pf: any = null;
    public static pk: any = null;
    public static guild: any = null;
    public static office: any = null;
    public static office37: any = null;
    public static city: any = null;
    public static inborn: any = null;
    public static world: any = null;
    public static pve: any = null;
    public static fight: any = null;
    public static fight_test: any = null;
    public static effect: any = null;
    public static home_effect: any = null;
    public static home_event: any = null;
    public static pk_yard: any = null;
    public static pk_yard_new: any = null;
    public static title: any = null;
    public static shogun: any = null;
    public static equip_wash: any = null;
    public static estate: any = null;
    public static goods: any = null;
    public static trade: any = null;
    public static festival: any = null;
    public static visit: any = null;
    public static science: any = null;
    public static science_type: any = null;
    public static credit: any = null;
    public static gtask: any = null;
    public static city_build: any = null;
    public static pk_npc: any = null;
    public static ftask: any = null;
    public static guide: any = null;
    public static task: any = null;
    public static ctask: any = null;
    public static effort: any = null;
    public static pk_robot: any = null;
    public static attack_city_npc: any = null;
    public static npc_info: any = null;
    public static country_pvp: any = null;
    public static notice: any = null;
    public static country_club: any = null;
    public static mining: any = null;
    public static legend: any = null;
    public static country_army: any = null;
    public static bless_hero: any = null;
    public static bless_hero_npc: any = null;
    public static arena: any = null;
    public static beast: any = null;
    public static legend_awaken: any = null;
    public static new_task: any = null;
    public static hero_skin: any = null;
    public static duplicate: any = null;
    public static duplicate_shop: any = null;
    public static sp_army: any = null;
    public static dungeon_date: any = null;
    public static fight_scene: any = null;
    public static equip_skill: any = null;
    public static service_info: any = null;
    public static service_zone_list: any = null;
    public static color: any = null;
    public static nativeCfg: any = null;
    public static scheme: any = null;
    public static special: any = null;
    public static special2: any = null;
    public static homeland: any = null;
    public static homeland_build: any = null;
    public static gwent: any = null;
    public static revived_tower: any = null;
    public static god: any = null;
    public static kunlun: any = null;
    public static city_control: any = null;
    public static puppet: any = null;
    public static wineshop: any = null;
    public static story: any = null;
    public static free: any = null;
    public static jigsaw: any = null;
    public static big_devil: any = null;
    public static cross_pvp: any = null;
    public static heritage: any = null;
    public static heritage_library: any = null;
    public static sea_route: any = null;
    public static kismet: any = null;
    public static learnableSkills: any = null;
    public static skill_type_dic: any = {};
    public static sp_army_type_dic: any = {};
    public static honour: any = null;
    public static soul: any = null;
    public static tomb: any = null;
    public static ploy: any = null;
    public static sgame: any = null;
    public static ERROR_CONFIG: string = "error_config";
    public static ignore_cfgs: any = null;
    public static cfg_dict: any = {};
    public static errorConfigs: any = null;

    /** Laya.static 惰性静态：服务器态保留的战斗配置白名单（重复项按原文） */
    public static get FIGHT_CFG_WHITE_LIST(): string[] {
        var v = ["system_simple", "hero", "equip", "equip_skill", "equip_wash", "star", "army", "skill", "skill_1", "skill_2", "skill", "world", "inborn", "inborn_1", "inborn_2", "fate", "pk_robot", "climb", "climb_new", "fight", "fight_1", "fight_2", "title", "science", "mining", "beast", "hero_skin", "duplicate", "sp_army", "special", "special2", "soul", "scheme", "god", "return_msg", "fight_test", "fight_test_1", "fight_test_2", "fight_test_3", "fight_test_4"];
        Object.defineProperty(ConfigServer, "FIGHT_CFG_WHITE_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：战斗测试保留白名单 */
    public static get FIGHT_TEST_WHITE_LIST(): string[] {
        var v = ["return_msg", "pve", "effect", "effect_1", "effect_2", "prop", "city", "pf_system_simple", "puppet", "legend", "color", "country", "bless_hero", "world", "fight_scene", "honour", "country_club", "bless_hero_npc", "native", "client_config", "heritage", "heritage_library", "kismet"];
        Object.defineProperty(ConfigServer, "FIGHT_TEST_WHITE_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：合服合并组（前表并入末位总表） */
    public static get merge_cfg_list(): string[][] {
        var v = [["inborn_1", "inborn_2", "inborn"], ["skill_1", "skill_2", "skill"], ["fight_1", "fight_2", "fight"], ["fight_scene", "effect_1", "effect_2", "effect"], ["fight_test_1", "fight_test_2", "fight_test_3", "fight_test_4", "fight_test"]];
        Object.defineProperty(ConfigServer, "merge_cfg_list", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.cfg.ConfigServer")（2 参注册，无基类）。
 */
Laya.class(ConfigServer, "sg.cfg.ConfigServer", null, null);
