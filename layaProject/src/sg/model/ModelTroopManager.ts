/**
 * sg.model.ModelTroopManager —— 部队管理模型（troops 字典 uid&hid → ModelTroop，
 * w.troop_* 14 协议 handler 大 switch、行军寻路估价 getMoveCityTroop/getMoveTroop、
 * 路径权重 getPathDic/setCityDic）。
 *
 * 原文：code1.js 字节 [2401778,2414674]（包装变量 Xr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelTroopManager"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelTroopManager.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `new` 直接构造。
 * 依赖（批次 A/B 模块直引）：ue=ModelManager、pn=NetSocket、P=Handler、Gt=ConfigServer、
 * vs=Tools、tn=ViewManager、cs=ObjectUtil、as=MusicManager、be=TestUtils；K=laya.maths.MathUtil；
 * 本批类直引：No=MapModel、mn=ModelSettings（notifyActive getter）。
 * 批次外全局注册路径：Nl=sg.model.ModelTroop（TROOP_STATE_* 静态）、sn=sg.map.model.CountryArmy、
 * gi=sg.fight.logic.cfg.ConfigFight（REWARD_KEYS）、Jl=sg.map.model.entitys.EntityCity
 * （getConnectKey/getPathDist 静态）、pe=sg.map.utils.LogicOperation（armyFood/armyGo）、
 * Wo=sg.model.ModelFightTask（instance.buff）、Ko=sg.model.ModelCityBuild（getGreatWall）、
 * ar=sg.model.ModelFTask（ftaskModels）、js=sg.guide.model.ModelGuide。
 * w.finish_fight 分支 a 变量复用（外层 for 的 a 继续充当内层索引，原文如此）；
 * getMoveCityTroop 尾部自增计数 `s.getMoveCityTroop=(s.getMoveCityTroop||0)+1` 中 s 为
 * 类构造器自身（调用计数器，原文如此）。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { ObjectUtil } from "../utils/ObjectUtil";
import { MusicManager } from "../utils/MusicManager";
import { TestUtils } from "../map/utils/TestUtils";
import { MapModel } from "../map/model/MapModel";
import { ModelSettings } from "./ModelSettings";

export class ModelTroopManager extends ModelBase {

    public troops: any = {};
    public initCallBack: any = null;
    public mTroopStatusDic: any = {};

    constructor() {
        super();
    }

    public reload(t: any): void {
        var s = this;
        for (var n in this.troops)
            this.troops[n].setDead();
        this.troops = {},
            ModelManager.instance.modelTroopManager.event("w.troop_dissmiss", { model: null }),
            NetSocket.instance.send("w.get_my_troops", null, new Handler(this, function (e: any) {
                for (var h in (s.parseData(e.receiveData), e.receiveData)) {
                    var o = e.receiveData[h];
                    s.createMarch(o);
                }
                t.run();
            }));
    }

    /** 注册 14 个 w.* 协议 handler + 拉取部队；mapEdit 模式跳过 */
    public init(t: any): void {
        var s = this;
        if (!TestUtils.mapEdit) {
            this.initCallBack = t;
            for (var n = ["w.troop_status_change", "w.troop_move_push", "w.troop_move_v1_push", "w.troop_move_delete", "w.troop_dissmiss", "w.push_troop_update", "w.join_fight", "w.fight_ready", "w.fight_end", "w.finish_fight", "w.country_army_dead", "w.ng_task_troop_move", "w.ng_task_troop_delete"], h = 0, o = n.length; h < o; h++)
                NetSocket.instance.registerHandler(n[h], new Handler(this, this.onTroopHandler));
            NetSocket.instance.send("w.get_my_troops", null, new Handler(this, function (e: any) {
                s.parseData(e.receiveData),
                    t.run();
            })),
                ModelManager.instance.modelCountryPvp.on("event_xyz_move_speed", this, this.xyzSpeedUp);
        }
    }

    /** 战力/时间禁行门槛（records.move_power_limit） */
    public forbidMove(t: any): boolean {
        var s = ModelManager.instance.modelUser.records;
        if (!s.move_power_limit)
            return false;
        var n = s.move_power_limit[0],
            h = 1e3 * s.move_power_limit[1];
        return ConfigServer.getServerTimer() < h && n >= t;
    }

    public xyzSpeedUp(t: any): void {
        for (var s in MapModel.instance.marchs) {
            var n = MapModel.instance.marchs[s];
            n.startCity.cityId < 0 && n.setRate(n.rate2);
        }
    }

    public parseData(t: any): void {
        for (var s in t) {
            t[s].uid = ModelManager.instance.modelUser.mUID;
            var n = new sg.model.ModelTroop();
            n.setData(t[s]),
                this.troops[n.id] = n;
        }
    }

    /** 撤回判定：未出城(index<=0)、限时内、rate2==1 且非移动 */
    public canRecall(t: any): boolean {
        var s = MapModel.instance.marchs[ModelManager.instance.modelUser.mUID + "&" + t];
        return !!s && (!(s.index > 0) && (!(ConfigServer.getServerTimer() - 1e3 * s.startTime > 1e3 * ConfigServer.world.troop_move_dismiss_limit_time) && (1 == s.rate2 && 0 == s.moveType)));
    }

    public createMarch(t: any): void {
        MapModel.instance.createMarch(t);
    }

    /** w.* 协议分派中枢：mid 拼接、troops 字典维护、march 增删、奖励合并展示 */
    public onTroopHandler(t: any): void {
        var i, n = this, h = null, o = null, r = "mid", a = 0, l = 0;
        switch (t.receiveMethod) {
            case "w.troop_create":
                o = ModelManager.instance.modelUser.mUID,
                    t.sendData.uid = ModelManager.instance.modelUser.mUID,
                    r += ModelManager.instance.modelUser.mUID,
                    i = ModelManager.instance.modelGame.getModelHero(t.sendData.hid),
                    ModelManager.instance.modelGame.creatNewTroopID[i.id] = 1,
                    t.sendData.army = t.receiveData.hp,
                    (h = new sg.model.ModelTroop()).setData(t.sendData),
                    h.reset(),
                    t.sendData.is_xyz && (h.cityId = ModelManager.instance.modelCountryPvp.xyCountryFrontId),
                    this.troops[h.id] = h;
                break;
            case "w.troop_dissmiss":
                if (o = ModelManager.instance.modelUser.mUID + "&" + t.receiveData.hid, r += ModelManager.instance.modelUser.mUID, h = this.troops[o], t.receiveData.type) {
                    var c = t.receiveData.type,
                        u = ConfigServer.hero[t.receiveData.hid],
                        d = Tools.getMsgById(u.name),
                        _ = h.entityCity,
                        m = [d, _.getName()];
                    1 === c && m.push(_.getLimitLevel()),
                        ViewManager.instance.showTipsTxt(Tools.getMsgById("troopRemove" + c, m), 5);
                }
                h.setDead(),
                    delete this.troops[o],
                    MapModel.instance.removeMarch(o);
                break;
            case "w.troop_add":
                o = ModelManager.instance.modelUser.mUID + "&" + t.sendData.hid,
                    r += ModelManager.instance.modelUser.mUID,
                    (h = this.troops[o]) && (i = ModelManager.instance.modelGame.getModelHero(t.sendData.hid), h.setData({ army: t.receiveData.hp }));
                break;
            case "w.push_troop_update":
                o = ModelManager.instance.modelUser.mUID + "&" + t.receiveData.troop.hid,
                    r += ModelManager.instance.modelUser.mUID,
                    (h = this.troops[o]).setData(t.receiveData.troop);
                break;
            case "w.troop_status_change":
                o = t.receiveData.uid + "&" + t.receiveData.hid,
                    r += t.receiveData.uid,
                    (h = this.troops[o]) && h.setData(t.receiveData),
                    t.receiveData.status == sg.model.ModelTroop.TROOP_STATE_RECALL ? MapModel.instance.recallMarch(o) : t.receiveData.status == sg.model.ModelTroop.TROOP_STATE_MOVE && MapModel.instance.marchSpeedUp(o, t.receiveData);
                break;
            case "w.troop_move_v1_push":
                t.receiveData.forEach(function (t: any) {
                    n.onTroopHandler({ receiveData: t, receiveMethod: "w.troop_move_push" });
                });
                break;
            case "w.troop_move_push":
            case "w.ng_task_troop_move":
                if (o = t.receiveData.uid + "&" + t.receiveData.hid, t.receiveMethod === "w.ng_task_troop_move") {
                    t.receiveData.xtype = "ng_task_army",
                        o += "_ng";
                    var g = t.receiveData.data.city_list;
                    l = g.length;
                    var f = ObjectUtil.clone(g.slice(0, l - 1), true).reverse(),
                        p = (g = g.concat(f)).length;
                    for (a = l - 1; a < p - 1; ++a)
                        g[a][1] = g[a + 1][1];
                    g[p - 1] = [g[p - 1][0], 0],
                        t.receiveData.data.city_list = g;
                }
                r += t.receiveData.uid,
                    (h = this.troops[o]) && h.setData(t.receiveData),
                    this.createMarch(t.receiveData);
                break;
            case "w.troop_move_delete":
            case "w.ng_task_troop_delete":
                if (o = t.receiveData.uid + "&" + t.receiveData.hid, t.receiveMethod === "w.ng_task_troop_delete" && (o += "_ng"), r += t.receiveData.uid, h = this.troops[o]) {
                    var v = h.state;
                    h.setData(t.receiveData),
                        v == sg.model.ModelTroop.TROOP_STATE_RECALL && h.entityCity.addTroop(h);
                }
                MapModel.instance.removeMarch(o);
                break;
            case "w.join_fight":
                o = ModelManager.instance.modelUser.mUID + "&" + t.receiveData.hid,
                    r += ModelManager.instance.modelUser.mUID,
                    (h = this.troops[o]) && (h.state = sg.model.ModelTroop.TROOP_STATE_IDLE, h.setData(t.receiveData)),
                    MapModel.instance.removeMarch(o);
                break;
            case "w.fight_ready":
                o = ModelManager.instance.modelUser.mUID + "&" + t.receiveData.hid,
                    r += ModelManager.instance.modelUser.mUID,
                    (h = this.troops[o]) && h.setData(t.receiveData);
                break;
            case "w.finish_fight":
                o = ModelManager.instance.modelUser.mUID + "&" + t.receiveData.hid,
                    r += ModelManager.instance.modelUser.mUID,
                    (h = this.troops[o]) && (h.setData(t.receiveData), h.deaded && (h.setDead(), delete this.troops[o])),
                    ModelManager.instance.modelUser.updateData(t.receiveData);
                var y = sg.fight.logic.cfg.ConfigFight.REWARD_KEYS;
                for (l = y.length, a = 0; a < l; a++) {
                    var b = y[a],
                        I = t.receiveData[b];
                    if (I) {
                        var x;
                        if (I instanceof Array) {
                            x = {};
                            var w = I;
                            for (a = 0; a < w.length; a++) {
                                var C = w[a];
                                x.hasOwnProperty(C[0]) ? x[C[0]] = x[C[0]] + C[1] : x[C[0]] = C[1];
                            }
                        } else
                            x = I;
                        ViewManager.instance.showReward(x, false);
                    }
                }
                break;
            case "w.fight_end":
                o = ModelManager.instance.modelUser.mUID,
                    r += ModelManager.instance.modelUser.mUID;
                var k = false;
                for (var T in this.troops)
                    this.troops[T].cityId == parseInt(t.receiveData.city.cid) && (this.troops[T].index = -1, k = true);
                if (!k)
                    return;
                break;
            case "w.troop_move_v1":
                MusicManager.playSoundUI("troop_move"),
                    t.receiveData.move === "fail" && ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0208"));
                break;
            case "w.troop_break":
            case "w.troop_runaway":
                break;
            case "w.country_army_dead":
                var M = t.receiveData.uid,
                    S = sg.map.model.CountryArmy.map[M];
                S && S.destroy();
        }
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.event(t.receiveMethod, { model: h, mid: r }),
            h && h.event(t.receiveMethod, h),
            this.checkTroopStatus();
    }

    /** 空闲/开战状态红点通知（mTroopStatusDic 差量，通知 notifyActive 开） */
    public checkTroopStatus(): void {
        if (!sg.guide.model.ModelGuide.forceGuide() && ModelSettings.instance.notifyActive) {
            var i, s: any[] = [], n: any[] = [];
            for (i in this.troops) {
                var h = this.troops[i],
                    o = h.hero;
                n.push(o);
                var r = h.state == sg.model.ModelTroop.TROOP_STATE_IDLE && h.isReadyFight && h.index < 1;
                if (this.mTroopStatusDic[o]) {
                    var a = this.mTroopStatusDic[o];
                    a.status != sg.model.ModelTroop.TROOP_STATE_MOVE || h.state != sg.model.ModelTroop.TROOP_STATE_IDLE || r ? !a.isFight && r && s.push({ status: 1, cid: h.cityId, hid: o }) : s.push({ status: 0, cid: h.cityId, hid: o }),
                        a.status = h.state,
                        a.isFight = a.isFight || r;
                } else
                    this.mTroopStatusDic[o] = { status: h.state, isFight: r },
                        r && s.push({ status: 1, cid: h.cityId, hid: o });
            }
            for (i in this.mTroopStatusDic)
                -1 === n.indexOf(i) && delete this.mTroopStatusDic[i];
            for (var l = 0; l < s.length; l++)
                ViewManager.instance.showNotice(s[l]);
        }
    }

    public getTroop(t: any, i?: any): any {
        return void 0 === i && (i = -1),
            i < 0 && (i = ModelManager.instance.modelUser.mUID),
            this.troops[i + "&" + t];
    }

    /** i=0 可达列表 / -1 我方全部 / -2 仅同城管径 / 1 携带路径；f 权重含 1073741823.5 系哨兵值 */
    public getMoveCityTroop(t: any, i?: any, n?: any, h?: any): any[] {
        var o = this;
        void 0 === i && (i = 0),
            void 0 === h && (h = false);
        var r = this.getPathDic(),
            a: any[] = [];
        for (var l in this.troops)
            if (!n || l == n) {
                var c = this.troops[l],
                    u: any = { f: 0, model: c, type: 0, time: 0, food: 0 };
                if (c.cityId == t)
                    u.type = -1, -2 != i && (u.f = 1073741823.5);
                else if (c.state != sg.model.ModelTroop.TROOP_STATE_IDLE || c.isReadyFight)
                    u.type = -2, u.f = 1073741833.5;
                else if (-2 == i)
                    u.type = 0;
                else if (MapModel.instance.mapGrid.astarFind.searchCity(MapModel.instance.citys[c.cityId.toString()], MapModel.instance.citys[t.toString()], r)) {
                    if (-2 != i) {
                        var d = MapModel.instance.citys[t], _ = 0;
                        if (!MapModel.instance.citys[t].myCountry && (_ = d.getAttackError(c, false)), 0 != _)
                            u.type = -100 + _, u.f = 1073741853.5;
                        else {
                            var m = c.getModelHero().army[0] < 0 || sg.map.utils.LogicOperation.armyFood(c.getModelHero().army[0], c.army[0]) + c.getModelHero().army[1] < 0 ? 0 : sg.map.utils.LogicOperation.armyFood(c.getModelHero().army[1], c.army[1]);
                            if (0 != i)
                                for (var g = 0, f = MapModel.instance.mapGrid.astarFind.path.length - 1; g < f; g++) {
                                    var p = MapModel.instance.mapGrid.astarFind.path[g],
                                        v = MapModel.instance.mapGrid.astarFind.path[g + 1],
                                        y = sg.map.model.entitys.EntityCity.getConnectKey(p.cityId, v.cityId),
                                        b = (r[y] ? r[y][0] : 0) + 1,
                                        I = (r[y] ? r[y][1] : 0) + 1;
                                    u.f += sg.map.model.entitys.EntityCity.getPathDist(p, v) / b,
                                        u.food += m * sg.map.model.entitys.EntityCity.getPathDist(p, v) / I;
                                }
                            u.food = parseInt(u.food);
                            var x = sg.map.utils.LogicOperation.armyGo(c.hero),
                                w = t < 0 ? ModelManager.instance.modelCountryPvp.getSpeedNum() : 1,
                                C = (sg.model.ModelFightTask.instance.buff[1] || 0) + 1;
                            u.time = parseInt((u.f / x / w / C).toString()) + 1,
                                u.citys = MapModel.instance.mapGrid.astarFind.path.concat();
                        }
                    }
                } else
                    u.type = -3, u.f = 1073741843.5;
                if (0 == i) {
                    var k = !h || c.state == sg.model.ModelTroop.TROOP_STATE_IDLE;
                    -1 == u.type && k && (u.pwd = -1 * ModelManager.instance.modelGame.getModelHero(c.hero).getPower(), a.push(u));
                } else
                    (-1 == i || -2 == i || 1 == i && -1 != u.type) && (u.pwd = -1 * ModelManager.instance.modelGame.getModelHero(c.hero).getPower(), a.push(u));
            }
        return 0 == i ? a = a.sort(<any>MathUtil.sortByKey("pwd")) : sg.map.utils.ArrayUtils.sortOn(["f", "pwd"], a),
            (<any>ModelTroopManager).getMoveCityTroop = ((<any>ModelTroopManager).getMoveCityTroop || 0) + 1, a;
    }

    public setTroopData(t: any, i: any, s: any): void {
        var h = this.getTroop(i);
        if (h) {
            if (t === "troopUpdate")
                h.setData(s);
            h.deaded && (h.setDead(), delete this.troops[h.id]),
                this.event(t, { model: h, mid: "mid" + ModelManager.instance.modelUser.mUID }),
                h.event(t);
        }
    }

    /** 路段权重字典（faith/march rate 累计；长城跨段、直连小城段展开） */
    public getPathDic(): any {
        for (var i = MapModel.instance.getMyCountryCitys({ isFaith: true }), s: any = {}, n = 0, h = i.length; n < h; n++) {
            for (var o = i[n], r = 0, a = o.nearCitys.length; r < a; r++) {
                var l = o, c = o.nearCitys[r];
                if (this.setCityDic(l, c, s, o.getFaithRate()), 0 != o.cityType && o.myCountry)
                    for (this.setCityDic(l, c, s, o.getMarchRate()); 0 == c.cityType && 2 == c.nearCitys.length;) {
                        var u = c.nearCitys[0] == l ? c.nearCitys[1] : c.nearCitys[0];
                        this.setCityDic(c, u, s, o.getMarchRate()),
                            l = c,
                            c = u;
                    }
            }
            if (3 == o.cityType && o.isFaith && !sg.model.ModelFTask.ftaskModels[o.cityId.toString()])
                for (var d in sg.model.ModelOfficial.cities[o.cityId.toString()].build) {
                    var _ = sg.model.ModelCityBuild.getGreatWall(o.cityId.toString(), d, false);
                    for (var m in _)
                        this.setCityDic(o, MapModel.instance.citys[m], s, o.getMarchRate());
                }
        }
        return s;
    }

    public setCityDic(t: any, i: any, s: any, n: any): void {
        var o = sg.map.model.entitys.EntityCity.getConnectKey(t.cityId, i.cityId);
        s[o] = s[o] || [0, 0],
            s[o][0] += n[0],
            s[o][1] += n[1];
    }

    public isMax(): boolean {
        var t = 0;
        if (this.troops)
            for (var s in this.troops)
                t += 1;
        return t >= ModelManager.instance.modelUser.troop_que_max();
    }

    /** h=true 时忽略忙碌部队（不参与筛选则按 -2 剔除）；time 用 Math.round */
    public getMoveTroop(t: any, i?: any, s?: any, n?: any, h?: any): any[] {
        void 0 === i && (i = 0),
            void 0 === n && (n = false),
            void 0 === h && (h = false);
        var r = this.getPathDic(),
            a: any[] = [];
        for (var l in this.troops)
            if (!s || l == s) {
                var c = this.troops[l],
                    u: any = { f: 0, model: c, type: 0, time: 0, food: 0 };
                if (c.cityId == t)
                    u.type = -1, -2 != i && (u.f = 1073741823.5);
                else if (!1 !== h || c.state == sg.model.ModelTroop.TROOP_STATE_IDLE && !c.isReadyFight)
                    if (-2 == i)
                        u.type = 0;
                    else if (MapModel.instance.mapGrid.astarFind.searchCity(MapModel.instance.citys[c.cityId.toString()], MapModel.instance.citys[t.toString()], r)) {
                        if (-2 != i) {
                            var d = MapModel.instance.citys[t], _ = 0;
                            if (!MapModel.instance.citys[t].myCountry && (_ = d.getAttackError(c, false)), 0 != _)
                                u.type = -100 + _, u.f = 1073741853.5;
                            else {
                                var m = (c.getModelHero().army[0] < 0 ? 0 : sg.map.utils.LogicOperation.armyFood(c.getModelHero().army[0], c.army[0])) + (c.getModelHero().army[1] < 0 ? 0 : sg.map.utils.LogicOperation.armyFood(c.getModelHero().army[1], c.army[1]));
                                if (0 != i)
                                    for (var g = 0, f = MapModel.instance.mapGrid.astarFind.path.length - 1; g < f; g++) {
                                        var p = MapModel.instance.mapGrid.astarFind.path[g],
                                            v = MapModel.instance.mapGrid.astarFind.path[g + 1],
                                            y = sg.map.model.entitys.EntityCity.getConnectKey(p.cityId, v.cityId),
                                            b = (r[y] ? r[y][0] : 0) + 1,
                                            I = (r[y] ? r[y][1] : 0) + 1;
                                        u.f += sg.map.model.entitys.EntityCity.getPathDist(p, v) / b,
                                            u.food += m * sg.map.model.entitys.EntityCity.getPathDist(p, v) / I;
                                    }
                                u.food = parseInt(u.food);
                                var x = sg.map.utils.LogicOperation.armyGo(c.hero),
                                    w = t < 0 ? ModelManager.instance.modelCountryPvp.getSpeedNum() : 1,
                                    C = (sg.model.ModelFightTask.instance.buff[1] || 0) + 1;
                                u.time = Math.round(u.f / x / w / C) + 1,
                                    u.citys = MapModel.instance.mapGrid.astarFind.path.concat();
                            }
                        }
                    } else
                        u.type = -3, u.f = 1073741843.5;
                else
                    u.type = -2, u.f = 1073741833.5;
                var k = !n || c.state == sg.model.ModelTroop.TROOP_STATE_IDLE;
                0 == i ? -1 == u.type && k && (u.pwd = -1 * ModelManager.instance.modelGame.getModelHero(c.hero).getPower(), a.push(u)) : -1 == i || -2 == i ? k && (u.pwd = -1 * ModelManager.instance.modelGame.getModelHero(c.hero).getPower(), a.push(u)) : 1 == i && -1 != u.type && (u.pwd = -1 * ModelManager.instance.modelGame.getModelHero(c.hero).getPower(), a.push(u));
            }
        return 0 == i ? a = a.sort(<any>MathUtil.sortByKey("pwd")) : sg.map.utils.ArrayUtils.sortOn(["f", "pwd"], a), a;
    }

    /** 清除 XYZ（国战前线）负 cityId 部队与 march */
    public deleteXYZTroop(): void {
        for (var i in this.troops) {
            var s = this.troops[i],
                n = "mid" + ModelManager.instance.modelUser.mUID;
            s.cityId >= 0 || (s.setDead(), delete this.troops[i], this.event("w.troop_dissmiss", { model: s, mid: n }), s.event("w.troop_dissmiss", s));
        }
        for (var h in MapModel.instance.marchs)
            MapModel.instance.marchs[h].startCity.cityId > 0 || MapModel.instance.removeMarch(h);
    }

    public sendMoveTroops(t: any): void {
        for (var s: any[] = [], n = 0, h = t.length; n < h; n++)
            t[n] && t[n].citys && s.push({ hid: t[n].model.hero, speedup_item: t[n].useItem, city_list: t[n].citys.map(function (t: any) { return t.cityId; }) });
        NetSocket.instance.send("w.troop_move_v1", s, Handler.create(this, this.onTroopHandler));
    }

    public sendRemoveTroops(t: any, i: any): void {
        NetSocket.instance.send("w.troop_dissmiss", { hid: t, force: i });
    }

    public sendAddArmyNumTroops(t: any, i?: any): void {
        void 0 === i && (i = false),
            NetSocket.instance.send("w.troop_add", { hid: t, is_pay: i }, Handler.create(this, this.onTroopHandler));
    }

    /** 新手引导中强制 is_xyz=false（原文如此） */
    public sendCreateTroops(t: any, i?: any, s?: any): void {
        void 0 === i && (i = false),
            void 0 === s && (s = false),
            sg.guide.model.ModelGuide.isNewPlayerGuide() && (s = false),
            NetSocket.instance.send("w.troop_create", { hid: t, is_pay: i, is_xyz: s }, Handler.create(this, this.onTroopHandler));
    }

    public sendSpeedUpTroops(t: any, i: any, s: any): void {
        NetSocket.instance.send("w.troop_move_speedup", { hid: t, index: i }, s);
    }

    public sendRecallTroops(t: any): void {
        NetSocket.instance.send("w.troop_move_dismiss", { hid: t });
    }

    /** t=1 拆散 break / 其他 runaway；失败提示并关面板 */
    public breakOrRunaway(t: any, i: any, s: any, n: any): void {
        var h = this,
            o = 1 === t ? "w.troop_break" : "w.troop_runaway";
        NetSocket.instance.send(o, { hid: i, city_list: s }, Handler.create(this, function (t: any) {
            if (h.onTroopHandler(t), t.receiveData.move === "fail")
                return ViewManager.instance.showTipsTxt(Tools.getMsgById("_jia0208")), void ViewManager.instance.closePanel();
            n && n.run();
        }));
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelTroopManager",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelTroopManager, "sg.model.ModelTroopManager", null, null);
