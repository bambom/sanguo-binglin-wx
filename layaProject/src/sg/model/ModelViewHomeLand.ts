/**
 * sg.model.ModelViewHomeLand —— 封地（ homeland）建造视图模型：build_list 按 0/1（home 建筑）
 * 与 2/3/4（homeland 建/库/规划）分型聚合，cnt/cur_max/can_build 建造态，
 * 材料足量 cost_Array、内置规划 cur_Plan_ID 本地存档（SaveLocal 按 mUID 键）。
 *
 * 原文：code1.js 字节 [2459269,2464031]（包装变量 Qr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelViewHomeLand"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelViewHomeLand.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：ue=ModelManager、Gt=ConfigServer、cs=ObjectUtil、vs=Tools、us=SaveLocal（批次 B
 * 模块直引）；批次外全局注册路径：zo=sg.model.ModelBuiding（buildingModels 静态字典 +
 * getMaterialEnough 静态）、qs=sg.homeland.model.ModelHomeLand（instance：getBuildings/
 * getStock/getStockById/getStockNum/getPlanState）、yr=sg.model.ModelItem（getMyItemNum）。
 * homebuildByType 的聚合分支：-1!=h.indexOf(d) 已入库条目走 cur_max/cnt/id_list 合并，
 * 新条目按 Precondition[0] 与 building001 等级判 can_build（building001 恒 0）。
 */
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ConfigServer } from "../cfg/ConfigServer";
import { ObjectUtil } from "../utils/ObjectUtil";
import { Tools } from "../utils/Tools";
import { SaveLocal } from "../utils/SaveLocal";

export class ModelViewHomeLand extends ModelBase {

    public homeland_build_Obj: any = {};
    public hintBid: string = "";
    public builtArray: any[] = [];
    public local_plan_state: any = {};

    constructor() {
        super();
    }

    public build_list(t: number): any[] {
        var s: any[] = [];
        switch (t) {
            case 0:
            case 1:
                s = this.homebuildByType(t);
                break;
            case 2:
            case 3:
            case 4:
                s = this.homelandByType(t);
        }
        return s;
    }

    /** home.* 建筑按 homeland_building 尾 4 位聚合；buildingModels 缓存初始化（new zo+initData） */
    public homebuildByType(t: number): any[] {
        for (var s = ModelManager.instance.modelInside.getBuildingLv("building001"), n: any[] = [], h: any[] = [],
                o = ConfigServer.home, r = ObjectUtil.keys(o), a = ModelManager.instance.modelUser.mergeNum,
                l = 0; l < r.length; l++) {
            var c = r[l],
                u = o[c],
                d = u.homeland_building;
            u.id = d.substr(d.length - 4, 4),
                u.icon = d,
                u.build_id = u.res ? u.res : c,
                u.homeland_id = d,
                u.id_list = [c],
                this.addDataInObj(c, u),
                !sg.model.ModelBuiding.buildingModels.hasOwnProperty(c) && (sg.model.ModelBuiding.buildingModels[c] = new sg.model.ModelBuiding(), sg.model.ModelBuiding.buildingModels[c].initData(c, ConfigServer.home[c]));
            var _ = sg.model.ModelBuiding.buildingModels[c];
            u.cost_Array = _.checkPay();
            var m = u.levelup[1];
            if (u.type == t && m) {
                var g = m.Precondition[0];
                if (-1 != h.indexOf(d))
                    for (var f = 0; f < n.length; f++) {
                        var p = n[f];
                        d == p.homeland_id && ((!u.res && !g || g && s >= g[1]) && (p.cur_max += 1), p.cnt += 1, p.id_list.push(c), p.can_build = p.cur_max - this.built_num(p.build_id) > 0 ? 1 : 0, n[f] = p);
                    }
                else
                    u.cnt = 1,
                        u.cur_max = g && s >= g[1] || !g ? 1 : 0,
                        c == "building001" ? u.can_build = 0 : u.can_build = g && s >= g[1] && u.cur_max - this.built_num(u.build_id) > 0 ? 1 : 0,
                        h.push(d),
                        (!u.building_merge || u.building_merge && a >= u.building_merge) && n.push(u);
            }
        }
        return n;
    }

    /** homeland_build.* 地块建造项：cost_Array 三元组 [材料,数量,足量]；cnt=number_limit */
    public homelandByType(t: number): any[] {
        for (var s = ModelManager.instance.modelInside.getBuildingLv("building001"), n: any[] = [],
                h = ConfigServer.homeland_build, o = ObjectUtil.keys(h), r = 0; r < o.length; r++) {
            var a = o[r],
                l = h[a],
                c = a;
            l.id = c.substr(c.length - 4, 4),
                l.icon = c,
                l.build_id = a,
                l.id_list = [a],
                this.addDataInObj(a, l);
            for (var u: any[] = [], d = ObjectUtil.keys(l.cost), _ = 0; _ < d.length; _++) {
                var m = d[_],
                    g = l.cost[m],
                    f = sg.model.ModelBuiding.getMaterialEnough(m, g);
                u.push([m, g, f]);
            }
            l.cost_Array = u,
                l.type == t && (l.cnt = l.number_limit, l.can_build = l.cnt - this.built_num(a) > 0 && s >= l.level_limit ? 1 : 0, n.push(l));
        }
        return n;
    }

    /** 按 build_id 查配置（home 优先，homeland_build 兜底，homeland_building 回填） */
    public building_data(t: any): any {
        for (var s = ConfigServer.home, n = ObjectUtil.keys(s), h = 0; h < n.length; h++) {
            var o = n[h],
                r = s[o];
            if (o == t)
                return r.build_id = o, r;
        }
        var a = ConfigServer.homeland_build;
        if (-1 != ObjectUtil.keys(a).indexOf(t)) {
            var l = a[t];
            return l.build_id = t, l.homeland_building = t, l;
        }
        return null;
    }

    /** 同 homeland_building 已建数（顺带累计 builtArray 已建类型） */
    public built_num(t: any): number {
        for (var s = 0, n = sg.homeland.model.ModelHomeLand.instance.getBuildings(), h = this.building_data(t), o = 0; o < n.length; o++) {
            var r = n[o],
                a = this.building_data(r.hbtype);
            this.builtArray.indexOf(r.hbtype) < 0 && this.builtArray.push(r.hbtype),
                h.homeland_building == a.homeland_building && (s += 1);
        }
        return s;
    }

    /** t=build_id 剩余库存（stock 配置数-已建数；无配置 0） */
    public surplus_num(t: any, i?: any): number {
        void 0 === i && (i = "");
        var n = 0,
            h = sg.homeland.model.ModelHomeLand.instance.getBuildings(),
            o = sg.homeland.model.ModelHomeLand.instance.getStock();
        if (o[t]) {
            for (var r = o[t], a = 0, l = 0; l < h.length; l++) {
                h[l].hbtype == t && (a += 1);
            }
            n = r - a;
        } else
            n = 0;
        return n;
    }

    /** 五类全量预热后取 homeland_build_Obj[t] */
    public build_base_data(t: any): any {
        if (!this.homeland_build_Obj[t])
            for (var s = 0; s < 5; s++)
                this.build_list(s);
        return this.homeland_build_Obj[t] ? this.homeland_build_Obj[t] : null;
    }

    public addDataInObj(t: any, i: any): void {
        !this.homeland_build_Obj[t] && (this.homeland_build_Obj[t] = i);
    }

    public plan_id_String(t: number): string {
        var s = "";
        switch (t) {
            case 0:
                s = Tools.getMsgById("buy_skincoin19");
                break;
            case 1:
                s = Tools.getMsgById("homeland_text_6");
                break;
            case 2:
                s = Tools.getMsgById("homeland_text_7");
                break;
            case 3:
                s = Tools.getMsgById("homeland_text_8");
        }
        return s;
    }

    /** 规划状态缓存（<=0 恒 in_use；i=true 强制重查） */
    public plan_state(t: any, i?: any): any {
        void 0 === i && (i = false);
        if (!this.local_plan_state[t.toString()] || i) {
            var n = t <= 0 ? "in_use" : sg.homeland.model.ModelHomeLand.instance.getPlanState(t.toString());
            this.local_plan_state[t.toString()] = n;
        }
        return this.local_plan_state[t.toString()];
    }

    public stock_Array(): any[] {
        for (var i = sg.homeland.model.ModelHomeLand.instance.getStock(), s = ObjectUtil.keys(i), n: any[] = [], h = 0; h < s.length; h++) {
            var o = s[h],
                r = sg.homeland.model.ModelHomeLand.instance.getStockById(o),
                a = sg.homeland.model.ModelHomeLand.instance.getStockNum(o);
            a > 0 && n.push([o, a, r]);
        }
        return n;
    }

    public tabCanClick(t: any): boolean {
        var s = false;
        return this.build_list(t).length > 0 && (s = true), s;
    }

    /** 任一分型任一条目 can_build==1 即 true */
    public haveCanBuild(t: any): boolean {
        var i, n = false;
        for (var h in t) {
            i = t[h];
            for (var o = this.build_list(i), r = 0; r < o.length; r++) {
                1 == o[r].can_build && (n = true);
            }
        }
        return n;
    }

    /** 未达建造上限（cur_max<=已建数 为 false） */
    public buildCntTopLimit(t: any): boolean {
        var s = true,
            n = this.build_base_data(t),
            h = ModelManager.instance.modelHomeLand.built_num(n.build_id);
        return n.cur_max > h && (s = false), s;
    }

    /** cost_Array 全足量（item* 走 ModelItem.getMyItemNum，其余 ModelBuiding.getMaterialEnough） */
    public materialEnough(t: any): boolean {
        for (var i, n = true, h = this.build_base_data(t).cost_Array, o = h.length, r = NaN, a = 0; a < o; a++)
            if (i = h[a][0], r = Math.floor(h[a][1]), 0 == (n = i.indexOf("item") > -1 ? sg.model.ModelItem.getMyItemNum(i) >= r : sg.model.ModelBuiding.getMaterialEnough(i, r)))
                return n;
        return n;
    }

    public hintBidGuide(t: any): void {
        this.hintBid = t,
            ModelManager.instance.modelHomeLand.event(sg.model.ModelViewHomeLand.CHOOSE_PANEL, [sg.model.ModelViewHomeLand.TYPE_CREATE]);
    }

    public get lock_data(): any {
        return ConfigServer.homeland.title_lock;
    }

    public get built_array(): any[] {
        return this.builtArray;
    }
    public set built_array(t: any[]) {
        this.builtArray = t;
    }

    /** 内置规划 id 本地存档（缺省 "1"；<1 回退 "1"；setter 只写档不回读） */
    public get cur_Plan_ID(): any {
        var i = "1",
            s = "sg_local_save_homeland_planid" + ModelManager.instance.modelUser.mUID,
            n = SaveLocal.getValue(s);
        return n && n.plan_id ? (i = n.plan_id, parseInt(i) < 1 && (i = "1")) : this.cur_Plan_ID = i, i;
    }
    public set cur_Plan_ID(t: any) {
        var i = "sg_local_save_homeland_planid" + ModelManager.instance.modelUser.mUID;
        SaveLocal.save(i, { plan_id: t });
    }

    public get guideBid(): any {
        return this.hintBid;
    }
    public set guideBid(t: any) {
        this.hintBid = t;
    }

    public static CUR_PANEL_STATE: string = "";
    public static TYPE_CREATE: string = "create";
    public static TYPE_EDIT: string = "edit";
    public static TYPE_QUIT: string = "quit";
    public static TYPE_PLAN: string = "plan";
    public static CHOOSE_PANEL: string = "choose_panel";
    public static ADD_HOMELAND_BUILD: string = "ADD_HOMELAND_BUILD";
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelViewHomeLand",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelViewHomeLand, "sg.model.ModelViewHomeLand", null, null);
