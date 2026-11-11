/**
 * sg.crossService.model.CrossServiceTroopEntity —— 跨服战行军兵队实体：marchData
 * 行军表（setMarchData 补 floor_distance 与 rush 标记）、update 逐秒步进（换城
 * getEntityOne 落格 + 体力扣减 + hp_add 回血 + changeHpRed/dw.troop_change_city/
 * city 事件）、remainTime/changeIndex/getDistByIndex 距离换算、setData 全量落地
 * （for-in 头逗号序列副作用 + "army/country/uid/skin_id/hid/status/energy/
 * energy_buy_times/revive_times" 差量分支 + isMove 行军恢复/重置排程）、recall
 * 撤退行军重算（CHAHUI 反向/BAITUI·CHEJUN 归本营）、changeHP/changeEnergy/
 * setRate/fireEvent 通道；27 个访问器（含 cityId get/set 经 Laya.superSet 走
 * ModelTroop 基类描述符）。
 *
 * 原文：code1.js 字节 [2951173,2959725)（8,552B；包装变量 Tc，1 参 IIFE 基类实参
 * (Nl)=sg.model.ModelTroop（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.model.CrossServiceTroopEntity",t) @2951621；全类零池化）。
 * 前邻 `…(1750,430)}]),i}(Il)`（kc=CrossServiceMap 尾，批次 J）、后邻 `,Mc=`。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ac/CrossServiceTroopEntity.js
 *
 * extends 决策（批次 V §5 同款跨批债）：原文基类 Nl=sg.model.ModelTroop
 * （baseChain Nl<no=sg.scene.model.entitys.EntityBase<Ns=sg.model.ModelBase ✓ 已译）
 * 未译——F8 装载器急切求值全部模块，extends 未译全局路径会在模块求值期
 * ReferenceError 致类永不注册，故暂 extends 已译真祖先 ModelBase；原文字面全局
 * 路径 `sg.scene.model.entitys.EntityBase.prototype.initConfig/clear.call(this,…)`
 * 照抄（本类原文即用全局路径调基类方法，非 IIFE 参数）。
 * **ModelTroop/EntityBase 落地批次须把本文件 extends 重指向（1 行）并按批次协议
 * 复跑深比较**；重指前原型链缺 ModelTroop/EntityBase 层（army/uid/hero/state 等
 * 继承字段运行期由本类 setData 动态落地、EntityBase ctor 字段未初始化——静态轮
 * NOT_RUN，见报告）。
 *
 * 依赖（resolve_ac.js 双证）：已译模块直引——Gt=ConfigServer（B ✓）、ue=
 * ModelManager（B ✓）、$t=CrossServiceFacade（I ✓）、ho=CrossServiceUserModel、
 * so=CrossServiceMapModel（本批）；引擎——s=Laya、Ts=Laya.Trace、r=Laya.getset、
 * o=Laya.class；批次外（ambient 全局路径）——Nl=sg.model.ModelTroop
 * （TROOP_STATE_IDLE/MOVE/RECALL 已声明；TROOP_STATE_HURT/TROOP_MOVE_CHEHUI/
 * CHEJUN/BAITUI 调回点 (<any>) cast）、Ve=sg.scene.constant.ConfigConstant
 * （ENTITY_CROSS_SERVICE_TILE 调回点 (<any>) cast）、gr=sg.model.ModelHeroPure
 * （ambient 无 ctor 面 → new 调用点 (<any>) cast）、sg.scene.model.entitys.
 * EntityBase（本批 sg-externals-ac.d.ts 新增 ambient）。
 *
 * 保真注记：
 * - ctor 字段初始化器（marchData…moveIndex，23 项）原文先于 __super.call(this)，
 *   TS 移到 super() 后（纯字面赋值，批次 H 先例）；ctor 无 super 后效应。
 * - army/uid/hero/state/id/mapGrid/cleared 为原文继承面（ModelTroop/EntityBase
 *   实例字段，本类 setData/initConfig 动态读写；cleared 为 EntityBase 原型 getset
 *   读点）→ 类型层无初始化器声明（es5 发射零足迹；重指后不遮蔽继承面）。
 * - setData 首个 for-in 头逗号序列逐元素保序直译（`this.id=this.uid+"&"+this.hero`
 *   为序列第 6 元素、无 "id" in t 守卫——原文如此）；闭包内 `e._cleared` 经
 *   `var e: any = this` 触达（e 为 EntityBase 继承面）。
 * - cityId setter 的 `s.superSet(Nl,this,"cityId",t)` → Laya.superSet(
 *   sg.model.ModelTroop, this, "cityId", t)（LayaAir d.ts 声明 static superSet；
 *   Nl 全局路径照原文，批次 V CrossServiceTroopItem x/width 同款）。
 */
import { ModelBase } from "../../model/ModelBase";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelManager } from "../../manager/ModelManager";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { CrossServiceMapModel } from "./CrossServiceMapModel";
import { CrossServiceUserModel } from "./CrossServiceUserModel";

export class CrossServiceTroopEntity extends ModelBase {

    public marchData: any[] = [["0", 200], ["1", 200], ["2", 200], ["3", 200], ["4"]];
    public position: any = 0;
    public rate: any = 1;
    public rate2: any = 1;
    public _maxPath: any = 0;
    public _firstRush: boolean = !1;
    public country: any = 0;
    public title: any = null;
    public group: any = null;
    public awaken: any = 0;
    public moveType: any = 0;
    public energy: any = 0;
    public buyEnergyCoinCount: any = 0;
    public buyReciveCoinCount: any = 0;
    public skinId: any = null;
    public troopData: any = {};
    public tileEntity: any = null;
    public _modelHero: any = null;
    public currTileEntity: any = null;
    public moveIndex: any = -1;

    /** 继承面（ModelTroop/EntityBase）：类型层声明，无初始化器（es5 发射零足迹） */
    public army: any;
    public uid: any;
    public hero: any;
    public state: any;
    public id: any;
    public mapGrid: any;
    public cleared: any;

    constructor() {
        super();
    }

    public changeHP(t: any, i: any): void {
        var e = this.army[0].hp, s = this.army[1].hp;
        this.army[0].hp = Math.ceil(Math.min(this.army[0].hp + (i ? this.army[0].hp : this.army[0].hpm) * t, this.army[0].hpm)),
            this.army[1].hp = Math.ceil(Math.min(this.army[1].hp + (i ? this.army[1].hp : this.army[1].hpm) * t, this.army[1].hpm)),
            e == this.army[0].hp && s == this.army[1].hp || this.event("hpChange");
    }

    public getHpMax(): any {
        return this.army[0].hpm + this.army[1].hpm;
    }

    public getHpPer(): any {
        return (this.army[0].hp + this.army[1].hp) / this.getHpMax();
    }

    public initConfig(t: any): void {
        sg.scene.model.entitys.EntityBase.prototype.initConfig.call(this, t),
            this.setData(t),
            delete t.data,
            this._modelHero = this.isMine ? CrossServiceUserModel.instance.heros[this.hero] : new (<any>sg.model.ModelHeroPure)(t);
    }

    public update(): void {
        var t = this.moveIndex;
        this.position = Math.min(this.position + this.currSpeed, this.maxPath),
            this.changeIndex(),
            this.state == sg.model.ModelTroop.TROOP_STATE_MOVE && this.moveIndex != t && (this.mapGrid = CrossServiceMapModel.instance.mapGrid.getGrid3(this.marchData[this.moveIndex][0]), this.currTileEntity = this.mapGrid.getEntityOne((<any>sg.scene.constant.ConfigConstant).ENTITY_CROSS_SERVICE_TILE), this.changeEnergy(-ConfigServer.duplicate.energy[3]), 0 != this.currTileEntity.hp_add && (this.changeHP(this.currTileEntity.hp_add, !0), this.event("changeHpRed")), this.event("dw.troop_change_city"), this.country == CrossServiceMapModel.instance.country && CrossServiceMapModel.instance.event("dw.troop_change_city", this), this.fireEvent("city")),
            this.position >= this.maxPath && (Laya.timer.clear(this, this.update), this.event("marchComplete"));
    }

    public remainTime(t?: any): any {
        void 0 === t && (t = -1),
            this.changeIndex();
        var i = 1;
        -1 == t && (t = this.position);
        for (var e = 0, s = this.marchData.length - 1; e < s; e++) {
            var n = this.marchData[e][2], h = this.marchData[e][1], o = n;
            t > 0 && (o = n - t), o > 0 && (i += o / (h * this.rate)), t -= n;
        }
        return i - 1;
    }

    public changeIndex(): any {
        var t = 0;
        this.moveIndex = -1;
        for (var i = 0, e = this.marchData.length - 1; i < e; i++) {
            if (t += this.marchData[i][2], this.position < t) { this.moveIndex = i; break; }
        }
        return -1 == this.moveIndex && (this.moveIndex = this.marchData.length - 1),
            this.moveIndex;
    }

    public getDistByIndex(t: any): any {
        for (var i = 0, e = 0, s = t + 1; e < s; e++) { i += this.marchData[e][2] || 0 }
        return i;
    }

    public setData(t: any): void {
        if (this.cleared) throw new Error("11111111111");
        for (var i in "army" in t && (t.army ? this.army = t.army : this.army[1].hp = this.army[0].hp = 0), "country" in t && (this.country = t.country), "uid" in t && (this.uid = t.uid), "skin_id" in t && (this.skinId = t.skin_id), "hid" in t && (this.hero = t.hid), this.id = this.uid + "&" + this.hero, "status" in t && (this.state = t.status), "energy" in t && (this.energy = t.energy), "energy_buy_times" in t && (this.buyEnergyCoinCount = t.energy_buy_times), "revive_times" in t && (this.buyReciveCoinCount = t.revive_times), t) this.data[i] = t[i];
        if (this.troopData = this.data.data, "city" in t && (this.tileEntity && this.tileEntity.removeTroop(this), this.tileEntity = CrossServiceMapModel.instance.getCity(t.city)), this.rate = this.rate2 = 1, this.isMove) {
            this.moveType = this.troopData.type,
                this.moveIndex = this.troopData.index || 0,
                this.setMarchData(this.troopData.city_list),
                this.position = Math.max(0, Math.min(this.maxPath - 1, (this.troopData.have_dis || 0) + this.getDistByIndex(this.moveIndex - 1))),
                this._maxPath = 0,
                this.setRate(1),
                this.moveType != (<any>sg.model.ModelTroop).TROOP_MOVE_CHEJUN && this.moveType != (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI && this.moveType != (<any>sg.model.ModelTroop).TROOP_MOVE_CHEHUI || this.recall(this.troopData.start_time || 0, this.troopData.end_time || 0);
            var e: any = this;
            this.moveReadyTime > 0 ? Laya.timer.once(this.moveReadyTime, this, function () {
                e.isMove && !e._cleared && (Laya.Trace.log("计时1---" + ConfigServer.getServerTimer()), Laya.timer.loop(1e3, e, e.update, [e.troopData.start_time, e.troopData.end_time], !0, !0));
            }) : Laya.timer.loop(1e3, this, this.update, [this.troopData.start_time, this.troopData.end_time], !0, !0);
        } else Laya.timer.clear(this, this.update);
        this.tileEntity.addTroop(this),
            this.mapGrid = this.tileEntity.mapGrid;
    }

    public setMarchData(t: any): void {
        t = t || [],
            this.marchData = t;
        for (var i = !1, e = 0, s = this.marchData.length - 1; e < s; e++) {
            this.marchData[e].push(ConfigServer.duplicate.speed.floor_distance);
            var n = CrossServiceMapModel.instance.getCity(this.marchData[e][0]);
            e == this.moveIndex ? i = 1 == this.data.rush : 1 == n.rush ? i = !0 : -1 == n.rush && (i = !1),
                this.marchData[e].push(i);
        }
    }

    public setRate(t: any): void {
        this.rate2 = t,
            this.moveType != (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI && (t *= CrossServiceMapModel.instance.troopRate);
        var i = t / this.rate;
        this.rate = t,
            this.event("marchRateChange", i);
    }

    public clear(): void {
        Laya.timer.clear(this, this.update),
            Laya.timer.clear(this, this.clear),
            sg.scene.model.entitys.EntityBase.prototype.clear.call(this);
    }

    public recall(t: any, i: any): void {
        this.state = sg.model.ModelTroop.TROOP_STATE_RECALL;
        var e = [], s = CrossServiceFacade.getServerTimer();
        this.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_CHEHUI ? (e.push([this.marchData[1][0], ConfigServer.duplicate.speed.move_speed, 0, !1]), e.push([this.marchData[0][0], 0, 0, !1]), this.position = ConfigServer.duplicate.speed.floor_distance - this.position) : (e.push([this.cityId, this.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? ConfigServer.duplicate.speed.flee_speed : ConfigServer.duplicate.speed.retreat_speed, 0, !1]), e.push([CrossServiceMapModel.instance.getHeadOffice(this.country).mapGrid.getKey(), 0, 0, !1]), this.position = 0);
        var n = CrossServiceMapModel.instance.getCity(e[1][0]).mapGrid, h = CrossServiceMapModel.instance.getCity(e[0][0]).mapGrid, o = Math.sqrt(Math.pow(n.col - h.col, 2) + Math.pow(n.row - h.row, 2)) * ConfigServer.duplicate.speed.floor_distance;
        e[0][2] = o,
            this.position = this.position + Math.max(0, (s / 1e3 - t) * e[0][1]),
            this.moveIndex = 0,
            this.marchData = e,
            this._maxPath = 0,
            this._maxPath = this.maxPath,
            this.tileEntity && this.tileEntity.removeTroop(this);
    }

    public fireEvent(t: any): void {
        this.event("change", t);
    }

    public changeEnergy(t: any): void {
        var i = this.energy;
        this.energy = Math.max(0, this.energy + t),
            i != this.energy && this.event("energyChange");
    }

    /** r(0,e,"isMyCountry",getter) —— getter-only getset */
    public get isMyCountry(): any {
        return this.country == CrossServiceMapModel.instance.country;
    }

    /** r(0,e,"totalEnergy",getter) */
    public get totalEnergy(): any {
        return ConfigServer.duplicate.energy[1];
    }

    /** r(0,e,"canRecovery",getter) */
    public get canRecovery(): any {
        return this.state == sg.model.ModelTroop.TROOP_STATE_IDLE && !this.cityInFire && this.tileEntity.recovery && this.getHpPer() < 1;
    }

    /** r(0,e,"power",getter) */
    public get power(): any {
        return this.data.power;
    }

    /** r(0,e,"buyReveieCoin",getter) —— 原文拼写（Reveie）照抄 */
    public get buyReveieCoin(): any {
        return ConfigServer.duplicate.revive_cost[0][Math.min(ConfigServer.duplicate.revive_cost[0].length - 1, this.buyReciveCoinCount)] * CrossServiceMapModel.buyRate;
    }

    /** r(0,e,"currSpeed",getter) */
    public get currSpeed(): any {
        return this.marchData[this.moveIndex][1] * this.rate;
    }

    /** r(0,e,"isPowUp",getter) */
    public get isPowUp(): any {
        return this.data.power < ConfigServer.duplicate.level[CrossServiceMapModel.instance.level][0];
    }

    /** r(0,e,"userName",getter) */
    public get userName(): any {
        return CrossServiceUserModel.instance.allUser[this.uid].uname;
    }

    /** r(0,e,"canBuyReveie",getter) */
    public get canBuyReveie(): any {
        return 1 == ConfigServer.duplicate.revive_cost[1] || this.buyReciveCoinCount < ConfigServer.duplicate.revive_cost[0].length;
    }

    /** r(0,e,"cityInFire",getter) */
    public get cityInFire(): any {
        return this.state == sg.model.ModelTroop.TROOP_STATE_IDLE && this.tileEntity.fire;
    }

    /** r(0,e,"buyEnergyCoin",getter) */
    public get buyEnergyCoin(): any {
        return ConfigServer.duplicate.energy_buy[1][Math.min(ConfigServer.duplicate.energy_buy[1].length - 1, this.buyEnergyCoinCount)] * CrossServiceMapModel.buyRate;
    }

    /** r(0,e,"canBuyEnergy",getter) */
    public get canBuyEnergy(): any {
        return 1 == ConfigServer.duplicate.energy_buy[2] || this.buyEnergyCoinCount < ConfigServer.duplicate.energy_buy[1].length;
    }

    /** r(0,e,"isRush",getter) */
    public get isRush(): any {
        return this.marchData[this.moveIndex][3];
    }

    /** r(0,e,"startGrid",getter) */
    public get startGrid(): any {
        return CrossServiceMapModel.instance.mapGrid.getGrid3(this.marchData[0][0]);
    }

    /** r(0,e,"endGrid",getter) */
    public get endGrid(): any {
        return CrossServiceMapModel.instance.mapGrid.getGrid3(this.marchData[this.marchData.length - 1][0]);
    }

    /** r(0,e,"gridTile",getter) */
    public get gridTile(): any {
        return CrossServiceMapModel.instance.floors[this.mapGrid.col][this.mapGrid.row];
    }

    /** r(0,e,"endCity",getter) */
    public get endCity(): any {
        return this.endGrid.getEntityOne((<any>sg.scene.constant.ConfigConstant).ENTITY_CROSS_SERVICE_TILE);
    }

    /** r(0,e,"startCity",getter) */
    public get startCity(): any {
        return this.startGrid.getEntityOne((<any>sg.scene.constant.ConfigConstant).ENTITY_CROSS_SERVICE_TILE);
    }

    /** r(0,e,"modelHero",getter) */
    public get modelHero(): any {
        return this._modelHero;
    }

    /** r(0,e,"moveReadyTime",getter) */
    public get moveReadyTime(): any {
        return 1e3 * this.troopData.start_time - CrossServiceFacade.getServerTimer();
    }

    /** r(0,e,"recallTime",getter) */
    public get recallTime(): any {
        var t = this.tileEntity.mapGrid, i = this.position - this.getDistByIndex(this.moveIndex), e = CrossServiceMapModel.instance.myHeadOffice.mapGrid;
        return (i += Math.sqrt(Math.pow(t.col - e.col, 2) + Math.pow(t.row - e.row, 2)) * ConfigServer.duplicate.speed.floor_distance) / ConfigServer.duplicate.speed.retreat_speed;
    }

    /** r(0,e,"maxPath",getter) */
    public get maxPath(): any {
        return 0 == this._maxPath && (this._maxPath = this.getDistByIndex(this.marchData.length - 2)),
            this._maxPath;
    }

    /** r(0,e,"isFinish",getter) */
    public get isFinish(): any {
        return this.position >= this.maxPath;
    }

    /** r(0,e,"cityId",getter,setter) —— setter 经 Laya.superSet 走 ModelTroop 基类描述符 */
    public get cityId(): any {
        return this.tileEntity.cid;
    }
    public set cityId(t: any) {
        Laya.superSet(sg.model.ModelTroop, this, "cityId", t);
    }

    /** r(0,e,"canPushCity",getter) */
    public get canPushCity(): any {
        return !this.isMove && this.state != (<any>sg.model.ModelTroop).TROOP_STATE_HURT;
    }

    /** r(0,e,"isMove",getter) */
    public get isMove(): any {
        return this.state == sg.model.ModelTroop.TROOP_STATE_MOVE || this.state == sg.model.ModelTroop.TROOP_STATE_RECALL;
    }

    /** r(0,e,"isMine",getter) */
    public get isMine(): any {
        return this.uid == ModelManager.instance.modelUser.mUID;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.model.CrossServiceTroopEntity",t)
 * （t=Nl=sg.model.ModelTroop）。base 传 null 的原因见 sg/model/ModelBase.ts 尾注与
 * batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopEntity, "sg.crossService.model.CrossServiceTroopEntity", null, null);
