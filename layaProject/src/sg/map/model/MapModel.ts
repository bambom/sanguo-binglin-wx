/**
 * sg.map.model.MapModel —— 大地图模型（citys/marchs/heroCatch/heroDrink/monsters/thief/
 * arenas 雕像 + mapGrid 网格 + queueFun 串行装载；enterFrame 上报 online_is；
 * parseData 增量 + createTroops 行军装配；myCapital 我方王都 getter）。
 *
 * 原文：code1.js 字节 [1815627,1827522]（包装变量 No，基类 t=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.map.model.MapModel"，调用 (Ns)）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/MapModel.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `new sg.map.model.MapModel()`（F8 现死点）。
 * 依赖（批次 A/B 模块直引）：Ns=ModelBase、ue=ModelManager、tn=ViewManager、Rt=ConfigApp、
 * Gt=ConfigServer、pn=NetSocket、vs=Tools、cs=ObjectUtil、Js=LoadeManager、be=TestUtils、
 * Ts=Trace；P=laya.utils.Handler、s.timer=Laya.timer（引擎）。
 * 本批次类直引：Xr=ModelTroopManager、vr=ModelInside、Us=ModelOnlineReward（checkVars 哨兵）、
 * Uo=ModelArena、Sr=ModelOfficial、Kr=ModelUser（getCountryID）、ze=MapGridManager、ns=FunQueue。
 * 批次外（全局注册路径，延迟调用）：Ve=sg.scene.constant.ConfigConstant、ar=sg.model.ModelFTask、
 * Po=sg.model.ModelBuffManager、Nl=sg.model.ModelTroop、yr=sg.model.ModelItem、xe=sg.map.view.AroundManager、
 * sn=sg.map.model.CountryArmy、nn=sg.map.model.PatriotArmy、tc=sg.map.model.entitys.EntityMarch、
 * ou=sg.map.model.entitys.EntityMonster、nu=EntityHeroCatch、hu=EntityHeroDrink、$l=EntityArena、
 * su=EntityGtask、ModelFightLog_H、sg.scene.view.TestButton（reload 日志）。
 * enterFrame 以 checkVars 里各类对象自身为命名空间暂存 _1 首报标记与计数（原文如此）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "../../model/ModelBase";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { NetSocket } from "../../net/NetSocket";
import { Tools } from "../../utils/Tools";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { LoadeManager } from "../../manager/LoadeManager";
import { TestUtils } from "../utils/TestUtils";
import { Trace } from "../../laya/Trace";
import { ModelTroopManager } from "../../model/ModelTroopManager";
import { ModelInside } from "../../model/ModelInside";
import { ModelOnlineReward } from "../../activities/model/ModelOnlineReward";
import { ModelArena } from "../../model/ModelArena";
import { ModelOfficial } from "../../model/ModelOfficial";
import { ModelUser } from "../../model/ModelUser";
import { MapGridManager } from "../../scene/model/MapGridManager";
import { FunQueue } from "../../utils/FunQueue";

export class MapModel extends ModelBase {

    public citys: any = {};
    public marchs: any = {};
    public heroCatch: any[] = [];
    public heroDrink: any[] = [];
    public monsters: any = {};
    public thief: any[] = [];
    public testMap: any = null;
    public arenas: any[] = [];
    public reloading: boolean = false;
    /** 各心跳哨兵以类对象为字典（_1=首报标记，同名为计数） */
    public checkVars: any = { getMoveCityTroop: ModelTroopManager, reward: ModelOnlineReward, get_building_material: ModelInside, building_lv: ModelInside, online_reward: ModelOnlineReward };
    public _buffs: any[] = [];
    public mapGrid: MapGridManager = null;
    public queueFun: FunQueue = null;
    public reloadQueueFun: FunQueue = null;
    public my_count: number;
    public static instance: MapModel = null;

    constructor() {
        super();  // 原文字段初始化在 __super.call 之前，tsc 固定 super() 在前（等价性见 ModelBase 注）
        this.checkVars = { getMoveCityTroop: ModelTroopManager, reward: ModelOnlineReward, get_building_material: ModelInside, building_lv: ModelInside, online_reward: ModelOnlineReward },
            this._buffs = [],
            this.mapGrid = new MapGridManager(),
            this.queueFun = new FunQueue(),
            this.reloadQueueFun = new FunQueue(),
            MapModel.instance = this;
    }

    /** 心跳上报：各哨兵计数首次即收、此后每 1800 帧归零上报 online_is */
    public enterFrame(): void {
        var t: any;
        for (var i in this.checkVars)
            this.checkVars[i][i] && (this.checkVars[i][i + "_1"] ? this.my_count % 1800 == 0 && (t = t || {}) : (this.checkVars[i][i + "_1"] = 1, t = t || {}), t && (t[i] = this.checkVars[i][i], this.checkVars[i][i] = 0));
        this.my_count++,
            t && NetSocket.instance.send("online_is", t);
    }

    /** 断线重连：串行 initReloadTroop → initReloadMap → updateTroopItem */
    public reload(): void {
        var t = this;
        this.reloading = true,
            this.reloadQueueFun.clear(),
            this.reloadQueueFun.complete = new Handler(this, function () { t.reloading = false; }),
            sg.scene.view.TestButton.log("重新reload"),
            this.reloadQueueFun.init([new Handler(this, this.initReloadTroop), new Handler(this, this.initReloadMap), new Handler(this, this.updateTroopItem)]);
    }

    public updateTroopItem(): void {
        for (var t in (ModelManager.instance.modelTroopManager.event("w.troop_create", { model: null }), ModelManager.instance.modelTroopManager.troops))
            ModelManager.instance.modelTroopManager.troops[t].event("troopUpdate");
    }

    public initReloadTroop(): void {
        ModelManager.instance.modelTroopManager.reload(new Handler(this.reloadQueueFun, this.reloadQueueFun.next));
    }

    public initReloadMap(): void {
        var t = this;
        for (var i in this.marchs)
            this.removeMarch(i);
        NetSocket.instance.send("w.get_info", null, new Handler(this, function (i: any) {
            ModelArena.instance.arena = i.receiveData.pk_arena, t.parseData2(i.receiveData), t.reloadQueueFun.next();
        }), 1);
    }

    /** 装载地图资源（mapName/mapDataName/fubenName）→ w.get_info → 建 EntityCity → parseData → initMap(t) */
    public initLoadMap(t: any): void {
        var i = this;
        ModelArena.instance;
        var e = [sg.scene.constant.ConfigConstant.mapName, sg.scene.constant.ConfigConstant.mapDataName];
        sg.scene.constant.ConfigConstant.fubenName && e.push(sg.scene.constant.ConfigConstant.fubenName);
        var s = this;
        LoadeManager.loadImg(e, Handler.create(this, function () {
            NetSocket.instance.send("w.get_info", null, new Handler(s, function (e: any) {
                ModelArena.instance.arena = e.receiveData.pk_arena;
                var s = sg.scene.constant.ConfigConstant.mapConfigData;
                if (i.mapGrid.init(s.width, s.height, s.tilewidth, s.tileheight, s.orientation), !TestUtils.mapEdit) {
                    for (var n in sg.scene.constant.ConfigConstant.mapData.city) {
                        sg.scene.constant.ConfigConstant.mapData.city[n];
                        var h = new sg.map.model.entitys.EntityCity();
                        h.cityId = parseInt(n), h.initConfig(), i.citys[n] = h;
                    }
                    i.parseData(e.receiveData);
                }
                i.initMap(t);
            }));
        }));
    }

    public _showMapEdit(): void {
        (<any>this.queueFun).init();
    }

    /** t=完成回调；建城邻接 + path 皮肤资源表 + 六段串行 init（Ftask/Visit/Arena/Season/NewGuide/Other） */
    public initMap(t: any): void {
        var i = this;
        if (TestUtils.mapEdit)
            return this._showMapEdit();
        var e = sg.scene.constant.ConfigConstant.mapData.tileRes = {};
        for (var n in sg.scene.constant.ConfigConstant.mapData.path) {
            var h = n.split("_"),
                o = this.citys[h[0]],
                r = this.citys[h[1]];
            o.nearCitys.push(r),
                r.nearCitys.push(o);
            var a = sg.scene.constant.ConfigConstant.mapData.path[n],
                l = a.skinArr || [];
            a.path.slice(1, a.path.length - 1).forEach(function (t: any, i: number) {
                e[t] = { pathId: n, res: a.res, skin: l[i + 1] || 0 };
            });
        }
        var c = [Handler.create(this, this.initFtask), Handler.create(this, this.initVisit), Handler.create(this, this.initAerna), Handler.create(this, this.initSeason), Handler.create(this, this.initNewGuide), Handler.create(this, this.initOther)];
        this.queueFun.init(c),
            this.queueFun.complete = t,
            ModelManager.instance.modelUser.on("heroCatch", this, this.onAddHeroCatchHandler),
            ModelManager.instance.modelUser.on("heroDrink", this, this.onAddHeroDrinkHandler),
            ModelManager.instance.modelGame.on("event_pk_npc_check_model", this, this.onCheckNpcHandler),
            ModelManager.instance.modelGame.on("event_task_work_change", this, function (t: any) {
                if (t.icon)
                    i.addGtask(parseInt(t.cid), t.icon, t.id);
                else {
                    var e = i.citys[t.cid];
                    e.gtask && (e.gtask.clear(), e.gtask = null);
                }
            }),
            NetSocket.instance.registerHandler("w.city_fire", new Handler(this, this.onCityFireHandler)),
            NetSocket.instance.registerHandler("w.push_city_state", new Handler(this, this.onPushCityState)),
            NetSocket.instance.registerHandler("w.fight_end", new Handler(this, function (t: any) { i.onFightEndHandler(t.receiveData); })),
            NetSocket.instance.registerHandler("w.sync_attack_npc", new Handler(this, function (t: any) { i.checkThief(t.receiveData); })),
            NetSocket.instance.registerHandler("w.join_fire", new Handler(this, function (t: any) { i.citys[t.receiveData.city].isDetect = true; })),
            ConfigServer.system_simple.online_is && (Laya.timer.frameLoop(1, this, this.enterFrame), this.my_count = 0);
    }

    /** 建 8 座雕像并按 ModelArena 数据 initConfig */
    public parseAerna(): void {
        for (var t = 0; t < 8; t++) {
            var i = new sg.map.model.entitys.EntityArena();
            i.index = t,
                i.setPos(),
                this.arenas.push(i);
        }
        this.changeAerna(),
            this.queueFun.next();
    }

    public changeAerna(): void {
        for (var t = ModelArena.getArenaData(), i = 0; i < 8; i++)
            this.arenas[i].initConfig(t[(i + 1).toString()]);
    }

    public initAerna(): void {
        Trace.log("初始化雕像"),
            ModelArena.instance.on(ModelArena.EVENT_UPDATE_ARENA_CLIP, this, this.changeAerna),
            Laya.timer.callLater(this, this.parseAerna);
    }

    public initNewGuide(): void {
        var t = this;
        var i = sg.guide.model.ModelGuide.getGuideAssets();
        i ? LoadeManager.loadImg(i, Handler.create(this, function () { t.queueFun.next(); })) : this.queueFun.next();
    }

    public initSeason(): void {
        var t = this;
        var i = ModelManager.instance.modelUser.getGameSeason(-1, true);
        if (ConfigApp.testSeason) {
            var e = Number(ConfigApp.testSeason);
            e > -1 && e < 4 && (i = e);
        }
        ViewManager.changeSeason(i, Handler.create(this, function () {
            t.queueFun.next();
        }));
    }

    public initOther(): void {
        this.checkBuffs(),
            sg.model.ModelBuffManager.instance.on(sg.model.ModelBuffManager.BUFF_CHANGED, this, this.checkBuffs),
            this.queueFun.next(),
            this.queueFun = null,
            1 == ModelManager.instance.modelUser.getUseFunctionByKey("use_drink") ? ModelManager.instance.modelGame.heroDrinkTimer() : ModelManager.instance.modelGame.heroCatchTimer(),
            ModelManager.instance.modelGame.checkPKnpcTimer(1e3);
    }

    /** 城内 buff 增减：对变化城市的模型广播 BUFF_CHANGED */
    public checkBuffs(): void {
        var t = this;
        var i = this._buffs;
        this._buffs = sg.model.ModelBuffManager.instance.buffModels.filter(function (t: any) {
            return t.inCity;
        });
        var e = i.filter(function (i: any) {
            return -1 === t._buffs.indexOf(i);
        }),
            s = this._buffs.filter(function (t: any) {
                return -1 === i.indexOf(t);
            }),
            n = e.concat(s).map(function (t: any) {
                return t.cid;
            }),
            h = (<any>Tools).distinct ? null : null;
        var r: any[] = [];
        // 原文：ArrayUtil.distinct(n).map(cid -> citys[cid]).forEach(event BUFF_CHANGED)
        var d: any[] = [];
        for (var u = 0; u < n.length; u++) d.indexOf(n[u]) < 0 && d.push(n[u]);
        d.map(function (i: any) {
            return t.citys[i];
        }).forEach(function (t: any) {
            t.event(sg.model.ModelBuffManager.BUFF_CHANGED);
        });
    }

    public initVisit(): void {
        var t = this;
        ModelManager.instance.modelGame.once("eventInitVisit", this, function (i: any) {
            t.queueFun.next();
        }),
            ModelManager.instance.modelGame.getCityVisit();
    }

    public initFtask(): void {
        var t = this;
        ModelManager.instance.modelGame.on("event_add_ftask", this, function (i: any) {
            t.citys[parseInt(i.city_id)].ftask = i;
        }),
            ModelManager.instance.modelGame.once("event_init_ftask", this, function (i: any) {
                for (var e in sg.model.ModelFTask.ftaskModels)
                    t.citys[e].ftask = sg.model.ModelFTask.ftaskModels[e];
                t.queueFun.next();
            });
    }

    public onCheckNpcHandler(t: any): void {
        var i = t;
        for (var e in i)
            if (!this.monsters[e]) {
                var s = new sg.map.model.entitys.EntityMonster();
                s.initConfig(i[e]),
                    this.monsters[e] = s;
            }
    }

    public onAddHeroCatchHandler(t: any): void {
        if (1 != ModelManager.instance.modelUser.getUseFunctionByKey("use_drink")) {
            this.clearHeroCatch();
            var i = ModelManager.instance.modelUser.hero_catch;
            if (i && i.hero_list) {
                for (var e = 0, s = i.hero_list.length; e < s; e++) {
                    var n = i.hero_list[e],
                        h = parseInt(n[1]),
                        o = n[0].hid;
                    this.heroCatch[e] = this.heroCatch[e] || new sg.map.model.entitys.EntityHeroCatch(),
                        this.heroCatch[e].initConfig({ cityId: h, heroId: o });
                }
                this.event("heroCatch");
            }
        }
    }

    public onAddHeroDrinkHandler(): void {
        if (1 == ModelManager.instance.modelUser.getUseFunctionByKey("use_drink")) {
            this.clearHeroCatch();
            var t = ModelManager.instance.modelUser.drink,
                i = t.drink_list.length;
            this.heroDrink.splice(i);
            for (var e = 0; e < i; e++) {
                var s = t.drink_list[e],
                    n = parseInt(s[1]),
                    h = s[0][0][0].hid;
                this.heroDrink[e] = this.heroDrink[e] || new sg.map.model.entitys.EntityHeroDrink(),
                    this.heroDrink[e].initConfig({ cityId: n, heroId: h });
            }
            this.event("heroDrink");
        }
    }

    /** 原文：heroCatch 有则取之（不清理），否则逐个销毁 heroDrink 的 view */
    public clearHeroCatch(): void {
        this.heroCatch.length > 0 ? this.heroCatch : this.heroDrink.forEach(function (t: any) {
            t.view && Tools.destroy(t.view);
        });
    }

    /** 战斗结束：换帜/探测复位/ftask 增删/王都剧情/战报拉取（i=是否联动 ModelOfficial，默认 true） */
    public onFightEndHandler(t: any, i?: boolean): void {
        void 0 === i && (i = true),
            i && sg.model.ModelOfficial.updateFightEnd(t);
        var e = t.city.cid,
            s = this.citys[e],
            n = parseInt(t.city.country),
            h = s.country;
        n != s.country ? (s.country = n, s.isDetect = false) : !s.myCountry && s.isDetect && (s.isDetect = false);
        var o = ModelManager.instance.modelUser.country;
        if (h === o) {
            if (sg.model.ModelFTask.ftaskModels.hasOwnProperty(e + "")) {
                var r = ModelManager.instance.modelGame.getModelFtask(e + "");
                0 == r.status && (r.cityControl && "" != r.cityControl.hero_id || ModelManager.instance.modelGame.removeFtask(e));
            }
            10 === s.cityType && s.faithCountry === o && 1 === ModelManager.instance.modelCountryPvp.getStatus() && ModelManager.instance.modelCountryPvp.showHeroTalk("500062_maps");
        }
        if (s.myCountry && i) {
            var a = ModelManager.instance.modelUser.ftask[e + ""];
            a && -1 != a[0] ? ModelManager.instance.modelGame.addFtask(e + "") : ConfigServer.city[e].pctask_id && (ModelManager.instance.modelUser.ftask[e] && -1 == ModelManager.instance.modelUser.ftask[e][0] || NetSocket.instance.send("get_ftask", {}, Handler.create(this, function (t: any) {
                var i = Tools.copyObj(ModelManager.instance.modelUser.ftask);
                ModelManager.instance.modelUser.updateData(t.receiveData);
                var e = ModelManager.instance.modelUser.ftask;
                for (var s in e) i.hasOwnProperty(s) || ModelManager.instance.modelGame.addFtask(s);
            }))),
                h != o && (
                    8 == ConfigServer.city[e].cityType && ModelManager.instance.modelCountryPvp.showHeroTalk("500043", [Tools.getMsgById(ConfigServer.city[e].name)]),
                        9 == ConfigServer.city[e].cityType && ModelManager.instance.modelCountryPvp.showHeroTalk("500044"),
                        12 == ConfigServer.city[e].cityType && ModelManager.instance.modelCountryPvp.showHeroTalk("500043_maps", [Tools.getMsgById(ConfigServer.city[e].name)])
                );
        }
        s.fire = false,
            i && sg.model.ModelFightLog_H.instance.getFightLog(t.city);
    }

    /** 城火推送（跨服赛容错：空数据仅报错） */
    public onCityFireHandler(t: any): void {
        if (t) {
            var i = this.citys[t.receiveData.city];
            "country" in t.receiveData && (i.country = t.receiveData.country),
                i.fire = true,
                i.fireCountry = t.receiveData.fire_country,
                i.fightState = t.receiveData.state,
                i.fightTime = t.receiveData.fight_time,
                i.isDetect = t.receiveData.fire_country == ModelManager.instance.modelUser.country;
        } else
            console.error("跨服赛报错容错");
    }

    public onPushCityState(t: any): void {
        var i = this.citys[t.receiveData.cid];
        i.fightState = t.receiveData.state,
            "number" == typeof t.receiveData.country && (i.country = t.receiveData.country);
    }

    /** t=country（负数回绕 3） */
    public getCapitalId(t: number): any {
        return ConfigServer.country.country[t < 0 ? t + 3 : t].capital;
    }

    public getCapital(t: number): any {
        return this.citys[this.getCapitalId(t)];
    }

    /** 行军装配：country_army/patriot_army 先行注册；move/recall 态建 EntityMarch */
    public createMarch(t: any): void {
        if ("country_army" === t.xtype && new sg.map.model.CountryArmy().init(t), "patriot_army" === t.xtype && new sg.map.model.PatriotArmy().init(t), parseInt(t.status) == sg.model.ModelTroop.TROOP_STATE_MOVE || parseInt(t.status) == sg.model.ModelTroop.TROOP_STATE_RECALL) {
            var i = t.uid + "&" + t.hid;
            this.removeMarch(i);
            var e = new sg.map.model.entitys.EntityMarch(this, -1);
            e.initConfig(t),
                this.marchs[e.id] = e,
                this.event("w.troop_move_v1", e);
        }
    }

    public marchSpeedUp(t: any, i: any): void {
        if (this.marchs) {
            var e = this.marchs[t];
            e && e.setRate(i.data.speedup);
        }
    }

    public removeMarch(t: any): void {
        this.marchs[t] && this.marchs[t].clear();
    }

    /** 属性匹配查找（t={k:v,...} 任一命中即收） */
    public getCitys(t: any): any[] {
        var i: any[] = [];
        for (var e in this.citys) {
            var s = this.citys[e];
            for (var n in t)
                if (s[n] == t[n]) {
                    i.push(s);
                    break;
                }
        }
        return i;
    }

    public getFilterCitys(t: (s: any) => boolean): any[] {
        var i: any[] = [];
        for (var e in this.citys) {
            var s = this.citys[e];
            t(s) && i.push(s);
        }
        return i;
    }

    public getMyCountryCitys(t?: any): any[] {
        return (t = t || {}).country = ModelUser.getCountryID(), this.getCitys(t);
    }

    public recallMarch(t: any): void {
        var i = this.marchs[t];
        i && i.recall();
    }

    /** troops 二维 + ng_task_troops 镜像回程（city_list 尾段反转） */
    public createTroops(t: any): void {
        var s: any = null,
            n = t.troops;
        for (var i in n)
            for (var e in n[i])
                s = n[i][e],
                    this.createMarch(s);
        var h = t.ng_task_troops || {};
        for (var i in h)
            for (var e in h[i]) {
                for (var o = (s = ObjectUtil.clone(h[i][e], true)).data.city_list, r = o.length, a = ObjectUtil.clone(o.slice(0, r - 1), true).reverse(), l = (o = o.concat(a)).length, c = r - 1; c < l - 1; ++c)
                    o[c][1] = o[c + 1][1];
                o[l - 1] = [o[l - 1][0], 0],
                    s.data.city_list = o,
                    s.xtype = "ng_task_army",
                    this.createMarch(s);
            }
    }

    /** 编辑器测试数据全量 reset */
    public parseData2(t: any): void {
        this.testMap = t;
        var i = t.cities;
        for (var e in i)
            this.citys[e].reset(i[e]);
        this.createTroops(t);
    }

    /** 常规增量：cities 词表 + troops + 山贼 + gtask 图标 + AroundManager.initData */
    public parseData(t: any): void {
        TestUtils.isTestShow,
            this.testMap = t;
        var i = t.cities;
        for (var e in i) {
            var s = this.citys[e];
            s && s.setWordData(i[e]);
        }
        this.createTroops(t),
            this.checkThief(t.attack_npc);
        var n = sg.model.ModelTask.gTask_self_take();
        for (var h in n) {
            var o = n[h],
                r = sg.model.ModelTask.gTask_city_data(o.city_id, "gtask_collect");
            (!r || r.status < 1) || this.addGtask(parseInt(o.city_id), sg.model.ModelItem.getItemIconAssetUI(r.reward_key), h);
        }
        sg.map.view.AroundManager.initData();
    }

    /** t=cityId i=icon e=gtaskId；挂到 city.gtask 并广播 udpateGtask（原文拼写如此） */
    public addGtask(t: any, i: any, e: string): void {
        var s = new sg.map.model.entitys.EntityGtask();
        s.city = this.citys[t],
            s.icon = i,
            s.name = Tools.getMsgById(e + "_name"),
            s.city.gtask = s,
            s.initConfig(),
            s.city.event("udpateGtask");
    }

    /** 山贼刷新/倒计时（i=是否广播 w.sync_attack_npc）；xy 城（xyCityId）特殊剧对白 */
    public checkThief(t: any, i?: boolean): void {
        void 0 === i && (i = true);
        for (var e = ConfigServer.getServerTimer(), n = 0, h = 0, o = this.thief.length - 1; o > -1; o--) {
            var r = ConfigServer.getAttackNpcConfig(this.thief[o].type);
            e >= (n = 1e3 * this.thief[o].start_time + 1e3 * r.speed) ? this.thief.splice(o, 1) : h = 0 == h || h > n - e ? n - e : h;
        }
        if (t) {
            if (this.thief = this.thief.concat(t), this.event("w.sync_attack_npc", [t]), t[0] && t[0].cid == ModelManager.instance.modelCountryPvp.xyCityId + "") {
                var a = ["500045", "500046"];
                "xyz2" === ModelManager.instance.modelCountryPvp.tag && (a = ["500045_maps", "500046_maps"]),
                    ModelManager.instance.modelCountryPvp.showHeroTalk(ModelOfficial.getXYCountryId() == ModelManager.instance.modelUser.country ? a[0] : a[1]);
            }
        } else
            i && this.event("w.sync_attack_npc", [this.thief]);
        Laya.timer.clear(this, this.checkThiefUpdate),
            h > 0 && Laya.timer.loop(h, this, this.checkThiefUpdate);
    }

    public checkThiefUpdate(): void {
        this.thief && this.thief.length > 0 ? this.checkThief(null, false) : Laya.timer.clear(this, this.checkThiefUpdate);
    }

    /** 我方王都 */
    public get myCapital(): any {
        return this.getCapital(ModelUser.getCountryID());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.map.model.MapModel",t)（t=Ns=sg.model.ModelBase）。
 */
Laya.class(MapModel, "sg.map.model.MapModel", null, null);
