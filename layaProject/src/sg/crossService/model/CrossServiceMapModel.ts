/**
 * sg.crossService.model.CrossServiceMapModel —— 跨服战大地图数据模型：9×9 地图
 * （MapGridManager staggered）+ floors 地块表（initTile 按 Gt.duplicate.terrain 建
 * CrossServiceTileEntity）；init 装载链（addLog 假进度 + FunQueue 串行 loadMap/
 * loadRes/initNet）；initNet 六路 socket 注册（city_fire/city_monster/
 * troopEvent×7/cross_service_finish）+ initTroopRateTime 分时段行军速度排程；
 * onFightEndHandler/onTroopHandler 战报消费；sendMoveTroops/sendAddArmyNumTroops/
 * sendBuyEnergy/sendRecallTroops 出征通道；getTroop/getCity/getCountrys/
 * getHeadOffice/filterCity/getTroopPath（CHU 北上/HAN 南下 x/y 优先拼接路径 + rush
 * 提速 + 体力/距离代价）；resetRecovery 双区间体力/血量恢复；clear 全解绑 +
 * instance 置 null；8 个实例访问器 + buyRate/rewardRate 静态访问器（死 setter）+ CHU/HAN/
 * ZHONG_COUNTRY、instance 普通静态 + troopEvent Laya.static 惰性静态。
 *
 * 原文：code1.js 字节 [1691593,1702652)（11,059B；包装变量 so，1 参 IIFE 基类实参
 * (Ns)=sg.model.ModelBase（批次 A ✓），明文 3 参注册
 * o(i,"sg.crossService.model.CrossServiceMapModel",t) @1692047；全类零池化）。
 * 前邻 `…t(17454)]}]),s}(As)`（ModelDuplicateSettings 族类尾）、后邻 `,no=`
 * （EntityBase 声明器）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ac/CrossServiceMapModel.js
 *
 * 依赖（resolve_ac.js acorn 作用域链 + 注册字面量/inventory/池串三源双证）：
 * 已译模块直引——ze=MapGridManager（@1063685 注册字面）、ns=FunQueue（@1109956）、
 * Gt=ConfigServer（@508940 池串 t(17516)）、ue=ModelManager（@914724 池串 i(16259)）、
 * $t=CrossServiceFacade（I ✓）、Js=LoadeManager（@1300990）、kc=CrossServiceMap
 * （J ✓）、ho=CrossServiceUserModel/Ll=CrossServiceTileEntity/Tc=
 * CrossServiceTroopEntity（本批）；引擎——P=laya.utils.Handler、s=Laya、Ts=Laya.Trace
 * （@1195580 注册字面 "Trace"）、r=Laya.getset（n(11503)）、h=Laya.static
 * （(Laya.un,Laya.uns,Laya.static) 序列尾值）、o=Laya.class（n(5349)）。
 * 批次外（ambient 全局路径，延迟调用）：ro=sg.duplicate.ModelDuplicate
 * （instance:any 面）、Nl=sg.model.ModelTroop（TROOP_STATE_IDLE 已声明；
 * TROOP_MOVE_CHEHUI/CHEJUN 调回点 (<any>) cast）、ge=sg.map.utils.ArrayUtils
 * （sortOn 已声明）、ve=sg.map.utils.MapUtils（parseKey 已声明；than 调回点
 * (<any>) cast）；filterCity 的 `t[r].than instanceof laya.utils.Handler` 原文
 * 即字面全局路径，照抄。
 *
 * 保真注记：
 * - ctor 字段初始化器（floors…_revovery）原文先于 __super.call，TS 移到 super()
 *   后（批次 H 先例；纯赋值，ModelBase/EventDispatcher ctor 不读子类字段）；
 *   super 后效应（mapGrid/initQueue/country=CHU/instance=this/三国静态配置覆写/
 *   country=ho.instance.country）逐项保序在 ctor 体。
 * - 静态发射顺序：tsc 固定「全部静态访问器 defineProperty → 全部静态字段赋值」
 *   （实测 _t/o.ts 发射），原文顺序为 [buyRate,rewardRate 访问器,CHU=40,HAN=41,
 *   ZHONG=42,instance=null,troopEvent 访问器]。troopEvent 访问器定义提前：静态
 *   初始化序列内无任何访问器求值（buyRate/rewardRate/troopEvent 均惰性，CHU/HAN/
 *   ZHONG/instance 为字面量），模块求值完成前不可达，网效等价。
 * - buyRate/rewardRate 的 setter 实参 `sg.model.ModelBase._$SET_buyRate/_$SET_rewardRate`
 *   为死引用：全包仅此 2 处出现、无任何定义点（ModelBase oracle grep 0 命中），
 *   运行时为 undefined → 描述符 set:undefined（无 setter），与 TS getter-only
 *   访问器发射的描述符等价；全包无 buyRate/rewardRate 赋值点（写路径不可达）。
 * - `sg.crossService.model.CrossServiceMapModel.*` 全局路径自引（getTroopPath 5 处、
 *   buyRate/rewardRate getter 内 4 处、onTroopHandler 1 处）→ 类标识符直引
 *   （批次 O/I 先例，注册后同一对象）。
 * - instance 为普通静态数据（i.instance=null 显式初始化 + ctor 内 =this 覆写 +
 *   clear() 尾 =null 置空），非惰性 getter——CrossServiceMap（批次 J）ctor
 *   `(new so).init(...)` 直接构造、ViewManager/showScenes 读 instance 同源。
 * - initTroopRateTime/resetRecovery/clear 的 for-in 头部逗号序列（副作用先求值、
 *   遍历对象=序列末项）逐字保留；clear 的 `this.destroyed=!0` 为原文动态实例
 *   属性写 → 类型层无初始化器声明（es5 发射零足迹）。
 * - enemyHeadOffce 拼写照抄（原文缺 r）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "../../model/ModelBase";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { LoadeManager } from "../../manager/LoadeManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { CrossServiceMap } from "../view/CrossServiceMap";
import { MapGridManager } from "../../scene/model/MapGridManager";
import { FunQueue } from "../../utils/FunQueue";
import { CrossServiceUserModel } from "./CrossServiceUserModel";
import { CrossServiceTileEntity } from "./CrossServiceTileEntity";
import { CrossServiceTroopEntity } from "./CrossServiceTroopEntity";

export class CrossServiceMapModel extends ModelBase {

    public floors: any[] = [];
    public monster: any = {};
    public progress: any = 0;
    public FAKE_PROGRESS: any = .16;
    public troops: any = {};
    public troopRate: any = 1;
    public finishData: any = null;
    public _revovery: any[] = [];

    /** ctor 内赋值（super 后效应，原文逐项保序） */
    public mapGrid: any;
    public initQueue: any;
    public country: any;
    /** 原文 clear() 动态实例属性写（this.destroyed=!0）——类型层声明，无初始化器 */
    public destroyed: boolean;

    constructor() {
        super();
        this.mapGrid = new MapGridManager,
            this.initQueue = new FunQueue,
            this.country = CrossServiceMapModel.CHU_COUNTRY,
            CrossServiceMapModel.instance = this,
            CrossServiceMapModel.CHU_COUNTRY = ConfigServer.duplicate.grouping.country[0][0],
            CrossServiceMapModel.HAN_COUNTRY = ConfigServer.duplicate.grouping.country[1][0],
            CrossServiceMapModel.ZHONG_COUNTRY = ConfigServer.duplicate.grouping.country[2],
            this.country = CrossServiceUserModel.instance.country;
    }

    public initNet(): void {
        var t = this, e = CrossServiceMapModel.troopEvent;
        this.socket.registerHandler("dw.city_fire", new Handler(this, this.onCityFireHandler)),
            this.socket.registerHandler("dw.city_monster", new Handler(this, function (i: any) { var e = t.getCity(i.receiveData.cid); e.tileData.monster_num = i.receiveData.monster_num, e.event("dw.city_monster") })),
            this.socket.on("event_socket_receive_to", this, this.resetRecovery),
            CrossServiceFacade.init();
        for (var s = 0, n = e.length; s < n; s++) this.socket.registerHandler(e[s], new Handler(this, this.onTroopHandler));
        this.socket.registerHandler("dw.cross_service_finish", new Handler(this, function (t: any) { CrossServiceMap.instance.showFinish(t.receiveData.win_country, t.receiveData.win_type) })),
            this.initTroopRateTime(),
            this.initQueue.next();
    }

    public initTroopRateTime(): void {
        for (var t = CrossServiceFacade.getServerTimer(), i = 0, e = ConfigServer.duplicate.special_time.length; i < e; i++) {
            var n = sg.duplicate.ModelDuplicate.instance.battleTime + 60 * ConfigServer.duplicate.special_time[i][0] * 1e3 - t;
            if (n > 0) {
                for (var h in Laya.timer.once(n, this, this.initTroopRateTime, null, !0), this.troopRate = ConfigServer.duplicate.special_time[i][1], Laya.Trace.log("当前速度！！！！-----" + this.troopRate), this.troops) for (var o = this.troops[h], r = 0, a = o.length; r < a; r++) o[r].setRate(o[r].rate2);
                return;
            }
        }
        this.troopRate = ConfigServer.duplicate.special_time[i - 1][1], Laya.Trace.log("当前速度222！！！！-----" + this.troopRate);
    }

    public onCityFireHandler(t: any): void {
        var i = this.getCity(t.receiveData.city);
        "country" in t.receiveData && (i.country = t.receiveData.country),
            i.fire = !0,
            i.tileData.fight = i.tileData.fight || {},
            i.tileData.fight.fireCountry = t.receiveData.fire_country;
    }

    public onFightEndHandler(t: any, i?: any): void {
        void 0 === i && (i = !0);
        for (var e = t.city.cid, s = this.getCity(e); s.troops.length;) s.removeTroop(s.troops[0]);
        s.country = parseInt(t.city.country),
            s.fire = !1,
            Laya.Trace.log(e + "战斗结束！");
        for (var n = 0, h = t.city.troop_ids.length; n < h; n++) {
            var o = t.city.troop_ids[n],
                r = this.getTroop(o.split("_")[0], o.split("_")[1]);
            r.state == sg.model.ModelTroop.TROOP_STATE_IDLE && (r.isMine && Laya.Trace.log(r.hero + "加入本城！"), r.setData({ city: e }));
        }
    }

    public sendMoveTroops(t: any, i: any): void {
        var e = t.map(function (t: any) { return { hid: t, to_city_id: i.cid } });
        this.socket.send("dw.troop_move", e);
    }

    public sendAddArmyNumTroops(t: any, i?: any): void {
        void 0 === i && (i = !1),
            this.socket.send("w.troop_add", { hid: t, is_pay: i }, Handler.create(this, this.onTroopHandler));
    }

    public sendBuyEnergy(t: any, i: any): void {
        var e = this;
        this.socket.send("d.buy_energy", { hid: t }, Handler.create(this, function (t: any) {
            i.run(), e.onTroopHandler(t);
            var s: any = {};
            s.user = { coin: t.receiveData.user.coin }, ModelManager.instance.modelUser.updateData(s);
        }));
    }

    public sendRecallTroops(t: any, i: any): void {
        switch (i) {
            case (<any>sg.model.ModelTroop).TROOP_MOVE_CHEHUI:
                this.socket.send("dw.troop_move_dismiss", { hid: t });
                break;
            case (<any>sg.model.ModelTroop).TROOP_MOVE_CHEJUN:
                this.socket.send("dw.troop_runaway", { hid: t });
        }
    }

    public getTroop(t: any, i: any): any {
        for (var e = this.troops[t], s = 0, n = e.length; s < n; s++) if (e[s].hero == i) return e[s];
        return null;
    }

    public onTroopHandler(t: any): void {
        Laya.Trace.log("收到包" + t.receiveMethod);
        var i = null, e = t.receiveData.troop ? t.receiveData.troop : t.receiveData;
        if ("dw.fight_end" == t.receiveMethod) {
            var s = !1;
            this.onFightEndHandler(t.receiveData);
            for (var n = 0, h = this.getMyTroops.length; n < h; n++) (i = this.getMyTroops[n]).cityId == parseInt(t.receiveData.city.cid) && (i.index = -1, s = !0, i.event(t.receiveMethod, i), i.fireEvent(t.receiveMethod));
            if (!s) return;
        } else if ("dw.join_fight" == t.receiveMethod) (i = this.getTroop(e.uid || ModelManager.instance.modelUser.mUID, e.hid)).index = e.index, i.state = sg.model.ModelTroop.TROOP_STATE_IDLE, i.fireEvent(t.receiveMethod);
        else {
            if ("dw.troop_runaway_push" == t.receiveMethod && e.city == e.data.to_city_id) return;
            (i = this.getTroop(e.uid || ModelManager.instance.modelUser.mUID, e.hid)).setData(e), i.isMyCountry && "dw.troop_move_delete" == t.receiveMethod && CrossServiceMapModel.instance.event("dw.troop_move_delete"), i.event(t.receiveMethod, i), i.fireEvent(t.receiveMethod);
        }
        this.event(t.receiveMethod, { model: i, type: t.receiveMethod });
    }

    public init(t: any): void {
        this.progress = 0,
            LoadeManager.instance.showLoadPanel(),
            this.initQueue.complete = t,
            this.mapGrid.init(9, 9, 372, 212, "staggered"),
            this.initTile(),
            this.initQueue.init([new Handler(this, this.loadMap), new Handler(this, this.loadRes), new Handler(this, this.initNet)]);
    }

    public getCountrys(t: any): any {
        for (var i = [], e = 0, s = this.mapGrid.cols; e < s; e++) for (var n = 0, h = this.mapGrid.rows; n < h; n++) {
            var o = this.floors[e][n];
            -1 != t.indexOf(o.country) && i.push(o);
        }
        return i;
    }

    public loadMap(): void {
        var t = this;
        this.addLog(),
            CrossServiceFacade.instance.socket.send("dw.get_info", {}, new Handler(this, function (i: any) {
                for (var e in i.receiveData.troops) {
                    for (var s in i.receiveData.troops[e]) t.addTroop(i.receiveData.troops[e][s]);
                    t.troops[e] = sg.map.utils.ArrayUtils.sortOn(["power"], t.troops[e], !0);
                }
                for (var n in i.receiveData.cities) t.getCity(parseInt(n)).setData(i.receiveData.cities[n]);
                t.resetRecovery(),
                    5 != i.receiveData.status && 6 != i.receiveData.status || (t.finishData = { win_country: i.receiveData.win_country, win_type: i.receiveData.win_type }),
                    t.initQueue.next();
            }));
    }

    public addLog(): void {
        Laya.timer.clear(this, this.onGetInfoProgress),
            Laya.timer.frameLoop(1, this, this.onGetInfoProgress),
            this.socket.registerHandler("dw.get_info", new Handler(this, this.clearGetInfoProgress));
    }

    public clearGetInfoProgress(): void {
        Laya.timer.clear(this, this.onGetInfoProgress),
            this.onLoadImgProgress(.01);
    }

    public resetRecovery(): void {
        for (var t = this; this._revovery.length;) CrossServiceFacade.removeInterval(this._revovery.shift());
        this._revovery[0] = CrossServiceFacade.setInterval(sg.duplicate.ModelDuplicate.instance.battleTime, 1e3 * ConfigServer.duplicate.energy_add[0], new Handler(this, function () {
            for (var i in t.troops) for (var e = 0, s = t.troops[i].length; e < s; e++) {
                var n = t.troops[i][e];
                n.energy < ConfigServer.duplicate.energy[1] && (n.changeEnergy(Math.min(ConfigServer.duplicate.energy[1], ConfigServer.duplicate.energy_add[1])), n.fireEvent("energy"));
            }
        })),
            this._revovery[1] = CrossServiceFacade.setInterval(sg.duplicate.ModelDuplicate.instance.battleTime, 1e3 * ConfigServer.duplicate.recovery_time, new Handler(this, function () {
                for (var i in t.troops) for (var e = 0, s = t.troops[i].length; e < s; e++) {
                    var n = t.troops[i][e];
                    n.canRecovery && (n.changeHP(n.tileEntity.recovery, !1), n.fireEvent("hp"));
                }
            }));
    }

    public getCity(t: any): any {
        var i = sg.map.utils.MapUtils.parseKey(t);
        return this.floors[i.x][i.y];
    }

    public getMyTroopsPath(t: any): any {
        for (var i = this.getMyTroops, e = [], s = 0, n = i.length; s < n; s++) e.push(this.getTroopPath(i[s], t));
        return e;
    }

    public getHeadOffice(t: any): any {
        for (var i = 0, e = ConfigServer.duplicate.grouping.country.length; i < e; i++) if (ConfigServer.duplicate.grouping.country[i][0] == t) return this.getCity(ConfigServer.duplicate.grouping.country[i][1]);
        return null;
    }

    public filterCity(t: any): any {
        for (var i = [], e = 0, s = this.floors.length; e < s; e++) for (var n = 0, h = this.floors[n].length; n < h; n++) {
            for (var o = this.floors[e][n], r = 0, a = t.length; r < a && (!(t[r].than instanceof laya.utils.Handler) || t[r].than.runWith(o)) && (<any>sg.map.utils.MapUtils).than[t[r].than](o[t[r].type], t[r].value); r++);
            r == a && i.push(o);
        }
        return i;
    }

    public getTroopPath(t: any, i: any): any {
        if (t.state != sg.model.ModelTroop.TROOP_STATE_IDLE) return { model: t, canMove: !1, time: -1 };
        for (var e = [t.tileEntity], s = function (s: any) {
            for (var n = [], h = "x" == s ? i.x - t.mapGrid.col : i.y - t.mapGrid.row, o = "x" == s ? e[e.length - 1].mapGrid.row - e[0].mapGrid.row : e[e.length - 1].mapGrid.col - e[0].mapGrid.col, r = 0, a = Math.abs(h); r < a; r++) {
                var l = Math.abs(h) / h * (r + 1);
                "x" == s ? n.push(CrossServiceMapModel.instance.floors[t.mapGrid.col + l][t.mapGrid.row + o]) : n.push(CrossServiceMapModel.instance.floors[t.mapGrid.col + o][t.mapGrid.row + l]);
            }
            return n;
        }, n = 1 == (e = t.country == CrossServiceMapModel.CHU_COUNTRY && t.mapGrid.row < 4 || t.country == CrossServiceMapModel.HAN_COUNTRY && t.mapGrid.row > 4 ? (e = e.concat(s("x"))).concat(s("y")) : (e = e.concat(s("y"))).concat(s("x")))[0].rush ? ConfigServer.duplicate.speed.rush_speed : ConfigServer.duplicate.speed.move_speed, h = 0, o = 1, r = e.length; o < r; o++) {
            var a = e[o];
            h += ConfigServer.duplicate.speed.floor_distance / n, 1 == a.rush ? n = ConfigServer.duplicate.speed.rush_speed : -1 == a.rush && (n = ConfigServer.duplicate.speed.move_speed);
        }
        var l = 0, c = (e.length - 1) * ConfigServer.duplicate.energy[3] + ConfigServer.duplicate.energy[2];
        return i.x == t.mapGrid.col && i.y == t.mapGrid.row ? l = -1 : t.state != sg.model.ModelTroop.TROOP_STATE_IDLE || t.isReadyFight ? l = -2 : c > t.energy && (l = -4),
            h /= this.troopRate,
            { model: t, canMove: 0 == l, time: h, path: e, free: l, energy: c };
    }

    public addTroop(t: any): void {
        var i = new CrossServiceTroopEntity;
        i.initConfig(t),
            this.troops[i.uid] = this.troops[i.uid] || [],
            this.troops[i.uid].push(i);
    }

    public initTile(): void {
        for (var t = 0, i = this.mapGrid.cols; t < i; t++) {
            this.floors[t] = [];
            for (var e = 0, s = this.mapGrid.rows; e < s; e++) {
                var n = new CrossServiceTileEntity;
                n.initConfig({ col: t, row: e, id: ConfigServer.duplicate.terrain[e][t] }),
                    this.floors[t][e] = n;
            }
        }
    }

    public loadRes(): void {
        LoadeManager.loadImg(["map3/crossservice.json", "res/atlas/map3.atlas", "map3/map3_1.jpg", "map3/map3_2.jpg", "map3/map3_3.jpg", "map3/map3_4.jpg"], new Handler(this, this.onComplete), new Handler(this, this.onLoadImgProgress));
    }

    public onGetInfoProgress(): void {
        var t = this.FAKE_PROGRESS - .01;
        this.progress < t && (this.progress += .01, LoadeManager.instance.onProgress(this.progress));
    }

    public onLoadImgProgress(t: any): void {
        this.progress = this.FAKE_PROGRESS + t * (1 - this.FAKE_PROGRESS),
            LoadeManager.instance.onProgress(this.progress);
    }

    public onComplete(): void {
        LoadeManager.instance.onComplete(),
            Laya.timer.callLater(this.initQueue, this.initQueue.next);
    }

    public clear(): void {
        this.destroyed = !0,
            this.offAll(),
            Laya.Trace.log("清理大地图");
        for (var t = CrossServiceMapModel.troopEvent, e = 0, n = t.length; e < n; e++) this.socket.removeAllHandler(t[e]);
        for (var h in this.socket.removeAllHandler("dw.city_fire"), this.socket.removeAllHandler("dw.fight_end"), this.socket.removeAllHandler("dw.cross_service_finish"), this.socket.off("event_socket_receive_to", this, this.resetRecovery), CrossServiceFacade.clearAllInterval(), CrossServiceMapModel.instance = null, this.socket.removeAllHandler("dw.city_monster"), Laya.timer.clear(this, this.initTroopRateTime), this.troops) for (var o = 0, r = this.troops[h].length; o < r; o++) this.troops[h][o].clear();
    }

    /** r(0,e,"enemyCountry",getter) —— getter-only getset */
    public get enemyCountry(): any {
        return this.country == CrossServiceMapModel.CHU_COUNTRY ? CrossServiceMapModel.HAN_COUNTRY : CrossServiceMapModel.CHU_COUNTRY;
    }

    /** r(0,e,"socket",getter) */
    public get socket(): any {
        return CrossServiceFacade.instance.socket;
    }

    /** r(0,e,"myHeadOffice",getter) */
    public get myHeadOffice(): any {
        return this.getHeadOffice(this.country);
    }

    /** r(0,e,"level",getter) */
    public get level(): any {
        return sg.duplicate.ModelDuplicate.instance.level;
    }

    /** r(0,e,"getMyTroops",getter) */
    public get getMyTroops(): any {
        return this.troops[ModelManager.instance.modelUser.mUID];
    }

    /** r(0,e,"myCountrys",getter) */
    public get myCountrys(): any {
        return this.getCountrys([this.country]);
    }

    /** r(0,e,"enabled",getter) */
    public get enabled(): any {
        return CrossServiceFacade.getServerTimer() > sg.duplicate.ModelDuplicate.instance.battleTime && CrossServiceFacade.getServerTimer() < sg.duplicate.ModelDuplicate.instance.endTime;
    }

    /** r(0,e,"enemyHeadOffce",getter) —— 原文拼写（缺 r）照抄 */
    public get enemyHeadOffce(): any {
        return this.getHeadOffice(this.enemyCountry);
    }

    /** r(1,i,"buyRate",getter,sg.model.ModelBase._$SET_buyRate) —— setter 实参为死引用
     *  （全包无定义点，运行时 undefined → set:undefined 描述符 ≡ getter-only 发射；
     *  依据见文件头注） */
    public static get buyRate(): any {
        return CrossServiceMapModel.instance ? ConfigServer.duplicate.level[CrossServiceMapModel.instance.level][3][0] : 1;
    }

    /** r(1,i,"rewardRate",getter,sg.model.ModelBase._$SET_rewardRate) —— 同上死 setter */
    public static get rewardRate(): any {
        return CrossServiceMapModel.instance ? ConfigServer.duplicate.level[CrossServiceMapModel.instance.level][3][1] : 1;
    }

    public static CHU_COUNTRY: any = 40;
    public static HAN_COUNTRY: any = 41;
    public static ZHONG_COUNTRY: any = 42;
    /** 普通静态数据（原文 i.instance=null；ctor 内 =this 覆写、clear() 尾 =null 置空） */
    public static instance: CrossServiceMapModel = null;

    /** h(i,["troopEvent",function(){return this.troopEvent=[…7 串]}]) —— Laya.static
     *  惰性静态（首访问求值、defineProperty 缓存置换删 getter；批次 A §6.5 /
     *  批次 B HelpConfig 同款换写；getter 体内 this.troopEvent= 自写在原 sloppy
     *  模式下静默失败、表达式值即返回值，编译产物 strict 模式按引擎包装网效换写） */
    public static get troopEvent(): any {
        var v = ["dw.troop_move_push", "dw.troop_move_delete", "dw.troop_move_dismiss_push", "dw.troop_runaway_push", "dw.join_fight", "dw.fight_end", "dw.finish_fight"];
        Object.defineProperty(CrossServiceMapModel, "troopEvent", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.model.CrossServiceMapModel",t)
 * （t=Ns=sg.model.ModelBase）。base 传 null 的原因见 sg/model/ModelBase.ts 尾注与
 * batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceMapModel, "sg.crossService.model.CrossServiceMapModel", null, null);
