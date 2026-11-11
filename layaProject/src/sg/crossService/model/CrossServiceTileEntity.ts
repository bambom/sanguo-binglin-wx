/**
 * sg.crossService.model.CrossServiceTileEntity —— 跨服大地图地块实体：initConfig
 * 经 EntityBase.initConfig 绑定 Gt.duplicate.floor[id] 配置 + 落格（addEntity）
 * + 视野格（MapUtils.getAroundCrossServiceGrid）收集；addTroop/removeTroop 驻军
 * 增减（w.troop_add/w.troop_dissmiss 事件）；setData 国家/驻军表（so.instance.
 * getTroop 按 "uid_hid" 拆分解析）/火态落地（floor 配置不符抛 "配置不对！"）；
 * getIdelTroops 按国家滤闲置驻军；12 个访问器（res_all/country±/monster/rush/
 * dmg_all/wait/recovery/res_defense/type/hp_add/fireCountry/fire±）。
 *
 * 原文：code1.js 字节 [2783269,2785777)（2,508B；包装变量 Ll，1 参 IIFE 基类实参
 * (no)=sg.scene.model.entitys.EntityBase（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.model.CrossServiceTileEntity",t) @2783464；全类零池化）。
 * 前邻 `…"y: "+i},i}(ut)`（ut=Sprite 族类尾）、后邻 `,Nl=`（ModelTroop 声明器）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ac/CrossServiceTileEntity.js
 *
 * extends 决策（批次 V §5 同款跨批债）：原文基类 no=sg.scene.model.entitys.
 * EntityBase（inventory baseChain no<sg.model.ModelBase ✓ 已译）未译——F8 装载器
 * 急切求值全部模块，extends 未译全局路径会在模块求值期 ReferenceError 致类永不注
 * 册，故暂 extends 已译真祖先 ModelBase；`t.prototype.initConfig.call(this,…)` 的
 * t（IIFE 基类实参）按原文语义以全局注册路径 sg.scene.model.entitys.EntityBase
 * 传参（同族 CrossServiceTroopEntity.initConfig 原文即该字面全局路径）。
 * **EntityBase 落地批次须把本文件 extends 重指向（1 行）并按批次协议复跑深比较**；
 * 重指前原型链缺 EntityBase 层（ctor 字段 netId/id/_cleared 等未初始化、
 * EntityBase.prototype.initConfig 运行期缺目标——静态轮 NOT_RUN，见报告）。
 *
 * 依赖（resolve_ac.js 双证）：已译模块直引——Gt=ConfigServer（B ✓）、vs=Tools
 * （B ✓）、so=CrossServiceMapModel（本批）；批次外（ambient 全局路径）——
 * Nl=sg.model.ModelTroop（TROOP_STATE_IDLE ambient 已声明）、ve=sg.map.utils.
 * MapUtils（parseKey 已声明；getKey/getAroundCrossServiceGrid 调回点 (<any>)
 * cast）、Ve=sg.scene.constant.ConfigConstant（ENTITY_CROSS_SERVICE_TILE 调回点
 * (<any>) cast）、sg.scene.model.entitys.EntityBase（本批 sg-externals-ac.d.ts
 * 新增 ambient：ctor/initConfig 面）；r=Laya.getset、o=Laya.class。
 *
 * 保真注记：
 * - ctor：原文序列 [字段初始化 8 项][void 0===t&&(t=-1)][i.__super.call(this,t)]；
 *   TS 形态 [param-default][super][字段初始化 8 项]——字段位移越过 super（批次 H
 *   先例；_map=so.instance 为静态数据读，ModelBase ctor 不读子类字段；EntityBase
 *   ctor 未译、待重指时复核，见报告债注）。
 * - super(...[t])：暂代基类 ModelBase ctor 类型层为 0 参（TS2554），真基类
 *   EntityBase ctor 收 t（cid）；展开写法发射 `_super.apply(this,[t])`，与原文
 *   `i.__super.call(this,t)` 网效等价（同实参、同 this 绑定）。**EntityBase 落地
 *   重指 extends 时一并改回 super(t) 直写**。
 * - id/mapGrid 为原文继承面（EntityBase 实例字段/本类 initConfig 赋值）→ 类型层
 *   无初始化器声明（es5 发射零足迹；重指后不遮蔽继承面）。
 * - getParamConfig 为 EntityBase 原型方法（原文继承调用，本类未声明）→ 调用点
 *   (<any>) cast（批次 V 既有 ambient 缺成员面先例），EntityBase 落地后随重指收敛。
 * - setData 的 `so.instance` → CrossServiceMapModel.instance（本批真类直引）；
 *   toString3/monster_num 等经 any 面触达。
 */
import { ModelBase } from "../../model/ModelBase";
import { ConfigServer } from "../../cfg/ConfigServer";
import { Tools } from "../../utils/Tools";
import { CrossServiceMapModel } from "./CrossServiceMapModel";

export class CrossServiceTileEntity extends ModelBase {

    /** ctor 体内初始化（原文 ctor 序列逐项；TS 字段初始化器形态会被 TS2376 禁止
     *  ——本类 ctor 需在 super 前执行 `void 0===t&&(t=-1)` 参数缺省，批次 J
     *  CrossServiceMap ctor 体赋值同款形态） */
    public buff: any;
    public _country: any;
    public viewGrids: any;
    public troops: any;
    public cid: any;
    public _fire: any;
    public tileData: any;
    public _map: any;

    /** 继承面（EntityBase）：类型层声明，无初始化器（es5 发射零足迹） */
    public id: any;
    /** 继承面（EntityBase/initConfig 赋值）：同上 */
    public mapGrid: any;

    constructor(t?: any) {
        void 0 === t && (t = -1);
        super(...[t]);
        this.buff = 0,
            this._country = 0,
            this.viewGrids = [],
            this.troops = [],
            this.cid = 0,
            this._fire = !1,
            this.tileData = null,
            this._map = CrossServiceMapModel.instance;
    }

    public getIdelTroops(t?: any): any {
        return void 0 === t && (t = 0),
            -1 != t && (t = t || this._country),
            this.troops.filter(function (i: any) { return i.state == sg.model.ModelTroop.TROOP_STATE_IDLE && (-1 == t || i.country == t) });
    }

    public getName(t?: any): any {
        return void 0 === t && (t = !0),
            Tools.getMsgById((<any>this).getParamConfig("name"), [t ? this.mapGrid.toString3() : ""]);
    }

    public initConfig(i: any): void {
        this.id = i.id,
            sg.scene.model.entitys.EntityBase.prototype.initConfig.call(this, ConfigServer.duplicate.floor[this.id]),
            this.mapGrid = this._map.mapGrid.getGrid(i.col, i.row),
            this.mapGrid.addEntity(this);
        for (var e: any = (<any>this).getParamConfig("view"), s: any = (<any>sg.map.utils.MapUtils).getAroundCrossServiceGrid(e), n = 0, h = s.length; n < h; n++) {
            var o: any = this._map.mapGrid.getGrid(this.mapGrid.col + s[n][0], this.mapGrid.row + s[n][1]);
            o && this.viewGrids.push(o);
        }
        this.cid = (<any>sg.map.utils.MapUtils).getKey(this.mapGrid.col, this.mapGrid.row);
    }

    public addTroop(t: any): void {
        t.tileEntity && t.tileEntity.removeTroop(t),
            t.canPushCity && -1 == this.troops.indexOf(t) && (this.troops.push(t), this.event("w.troop_add"));
    }

    public removeTroop(t: any): void {
        var i = this.troops.indexOf(t);
        -1 != i && (this.troops.splice(i, 1), this.event("w.troop_dissmiss"));
    }

    public setData(t: any): void {
        if (this._country = parseInt(t.country),
            this.troops = t.troop_ids.map(function (t: any) { var i = t.split("_"); return CrossServiceMapModel.instance.getTroop(i[0], i[1]) }),
            this._fire = null != t.fight,
            this.tileData = t,
            this.id != t.floor) throw new Error("配置不对！");
    }

    /** r(0,e,"res_all",getter) —— getter-only getset */
    public get res_all(): any {
        return (<any>this).getParamConfig("res_all") || 0;
    }

    /** r(0,e,"country",getter,setter) */
    public get country(): any {
        return this._country;
    }
    public set country(t: any) {
        this._country != t && (this._country = t, this.event("city_country_change"), CrossServiceMapModel.instance.event("city_country_change", this));
    }

    /** r(0,e,"monster",getter) */
    public get monster(): any {
        return this.tileData.monster_num;
    }

    /** r(0,e,"rush",getter) */
    public get rush(): any {
        return (<any>this).getParamConfig("rush") || 0;
    }

    /** r(0,e,"dmg_all",getter) */
    public get dmg_all(): any {
        return (<any>this).getParamConfig("dmg_all") || 0;
    }

    /** r(0,e,"wait",getter) */
    public get wait(): any {
        return (<any>this).getParamConfig("wait") || 0;
    }

    /** r(0,e,"recovery",getter) */
    public get recovery(): any {
        return (<any>this).getParamConfig("recovery") || 0;
    }

    /** r(0,e,"res_defense",getter) */
    public get res_defense(): any {
        return (<any>this).getParamConfig("res_defense") || 0;
    }

    /** r(0,e,"type",getter) */
    public get type(): any {
        return (<any>sg.scene.constant.ConfigConstant).ENTITY_CROSS_SERVICE_TILE;
    }

    /** r(0,e,"hp_add",getter) */
    public get hp_add(): any {
        return (<any>this).getParamConfig("hp_add") || 0;
    }

    /** r(0,e,"fireCountry",getter) */
    public get fireCountry(): any {
        return this.tileData.fight.fireCountry;
    }

    /** r(0,e,"fire",getter,setter) */
    public get fire(): any {
        return this._fire;
    }
    public set fire(t: any) {
        this._fire = t, this.event("dw.city_fire", this);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.model.CrossServiceTileEntity",t)
 * （t=no=sg.scene.model.entitys.EntityBase）。base 传 null 的原因见
 * sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTileEntity, "sg.crossService.model.CrossServiceTileEntity", null, null);
