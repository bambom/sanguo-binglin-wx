/**
 * sg.model.ModelProp —— 背包/道具模型（property 配置面 + userProp 背包列表 + 礼物字典
 * getRewardProp 分类型装配 + 横屏本地红点档 + pve_gift_dict 掉落索引）。
 *
 * 原文：code1.js 字节 [2291082,2301802]（包装变量 Ar，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 n(xxx)="sg.model.ModelProp"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelProp.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：Gt=ConfigServer、ue=ModelManager、pn=NetSocket、P=Handler、vs=Tools、us=SaveLocal、
 * Ts=Trace、tn=ViewManager、Rt=ConfigApp、ge=sg.map.utils.ArrayUtils（批次 A/B 模块直引或
 * externals）；批次外全局注册路径：yr=sg.model.ModelItem（道具实例 6 资源构造）、
 * nr=sg.model.ModelEquip、_r=sg.model.ModelHero、Be=sg.model.ModelTitle、se=sg.kismet.model.ModelKit、
 * Pr=sg.model.ModelRune、Go=sg.model.ModelBeast、Wr=sg.model.ModelSoul、qt=sg.chessBoard.model.ModelRelic、
 * hr=sg.model.ModelEstate（isTradeOpen）、Rr=sg.model.ModelScience（func_sum_type）。
 * getRewardPropObj equip/title/chatBg 三分支引用循环外变量 f/m/y 且 equip 分支缺 x
 * （原文如此：var 提升泄漏，未触达分支不取值），译文逐字保留。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { Tools } from "../utils/Tools";
import { SaveLocal } from "../utils/SaveLocal";
import { Trace } from "../laya/Trace";
import { ViewManager } from "../manager/ViewManager";
import { ConfigApp } from "../cfg/ConfigApp";

export class ModelProp extends ModelBase {

    public allProp: any = {};
    public userProp: any[] = [];
    public itemID: string = "";
    public buildUpGift: any = {};
    public hasOpenBox: boolean = false;
    public sortKeyDict: any = { kit: -2, chatBg: -1, face: 0, awaken: 1, sale_depot: 2, scheme: 3, tc: 4, soul: 5, beast: 6, equip: 7, title: 8, star: 9, coin: ConfigApp.isLandscape ? -1 : 10, item: 11, credit: 12, relic: 13 };
    public materialIndexObj: any = { token: -1007, coin: -1006, merit: -1005, gold: -1004, food: -1003, wood: -1002, iron: -1002 };
    public KEY_FACE: string = "spec";
    public KEY_TC: string = "tc";
    public KEY_SCHEME: string = "scheme";
    public sLocalRedData: any = null;
    public runeConfig: any;
    public userModel: any;
    public food: any;
    public wood: any;
    public iron: any;
    public gold: any;
    public coin: any;
    public merit: any;

    constructor() {
        super();
        this.runeConfig = ConfigServer.star,
            this.userModel = ModelManager.instance.modelUser,
            this.food = new sg.model.ModelItem(),
            this.wood = new sg.model.ModelItem(),
            this.iron = new sg.model.ModelItem(),
            this.gold = new sg.model.ModelItem(),
            this.coin = new sg.model.ModelItem(),
            this.merit = new sg.model.ModelItem();
    }

    /** 使用道具（use_prop）；gtaskItemId 使用提示 _bag_text23，否则奖励面板 */
    public userPropSocket(t: any, i: any, n?: any, h?: any): void {
        var r = this;
        void 0 === n && (n = -1);
        var a: any = {};
        a.item_id = t,
            a.item_num = i,
            a.range_index = n;
        var l = this;
        NetSocket.instance.send("use_prop", a, Handler.create(this, function (t: any) {
            if (ModelProp.clickUseProp = true, ModelManager.instance.modelUser.updateData(t.receiveData), h && typeof h == "function") {
                var i = Handler.create(l, h);
                i && i.run();
            }
            t.sendData.item_id == r.gtaskItemId ? ViewManager.instance.showTipsTxt(Tools.getMsgById("_bag_text23", [t.sendData.item_num])) : ViewManager.instance.showRewardPanel(t.receiveData.gift_dict);
        }));
    }

    public newItem(t: any): any {
        var s = ConfigServer.property[t];
        if (!s)
            return Trace.log("错误的道具id ", t), null;
        var n = s.name ? s.name : h + " has no name",
            h = t + "",
            o = s.info ? s.info : h + " has no info",
            r = s.icon ? s.icon : h + " has no icon",
            a = s.type ? s.type : 1,
            l = s.source ? s.source : null,
            c = s.quality ? s.quality : 0,
            u = s.index ? s.index : 0,
            d = s.awardid ? "awardid" : s.range ? s.range : null,
            _ = new sg.model.ModelItem();
        return _.initData(n, h, o, a, r, l, c, u, d), _;
    }

    public newTc(t: any): any {
        var s = ConfigServer.nativeCfg[t];
        if (!s)
            return Trace.log("错误的特产id ", t), null;
        var n = t + "_name",
            h = t + "",
            o = t + "_info",
            r = s.rarity,
            a = s.index ? s.index : 0,
            l = new sg.model.ModelItem();
        return l.initData(n, h, o, 0, "", null, r, a, null), l;
    }

    public newMaterial(t: any): any {
        var s = ConfigServer.system_simple.material_info[t],
            n = s.name ? s.name : h + " has no name",
            h = t + "",
            o = s.info ? s.info : h + " has no info",
            r = s.icon ? s.icon : h + " has no icon",
            a = s.type ? s.type : 1,
            l = s.source ? s.source : null,
            c = s.quality ? s.quality : 0,
            u = this.materialIndexObj[t],
            d = new sg.model.ModelItem();
        return d.initData(n, h, o, a, r, l, c, u, null), d;
    }

    /** t=user.property：全量重建背包列表（num!=0 才入包） */
    public getUserProp(t: any): void {
        for (var s in (this.userProp = [], t)) {
            var n = this.getItemProp(s);
            n && 0 != n.num && this.userProp.push(n);
        }
        this.hasBoxProp();
    }

    /** 有可开箱道具（awardid 且 type 不在 10/11） */
    public hasBoxProp(): void {
        this.hasOpenBox = false;
        var i = ModelManager.instance.modelUser.property,
            s = ConfigServer.property;
        for (var n in i)
            if (i[n] > 0 && s[n] && s[n].awardid && -1 == [10, 11].indexOf(s[n].type)) {
                this.hasOpenBox = true;
                break;
            }
    }

    /** t=gift_dict（对象或对象数组）；装配后按 [3,2] 升序 */
    public getRewardProp(t: any, i?: any): any[] {
        if (void 0 === i && (i = false), !t)
            return [];
        var n: any[] = [],
            h: any = {};
        if (t instanceof Array)
            for (var o: any[] = [], r = 0; r < t.length; r++) {
                h = t[r],
                    o = this.getRewardPropObj(h, i),
                    o = sg.map.utils.ArrayUtils.sortOn(["3", "2"], o, false, false);
                for (var a = 0; a < o.length; a++)
                    n.push(o[a]);
            }
        else
            typeof t == "object" && (h = t, n = this.getRewardPropObj(h, i), n = sg.map.utils.ArrayUtils.sortOn(["3", "2"], n, false, false));
        return n;
    }

    /** 分支泄漏保留：title 分支 m、equip 分支 f、chatBg 分支用 y 的 length（原文如此） */
    public getRewardPropObj(t: any, i: any): any[] {
        var n: any[] = [],
            h = 0,
            o: any[] = [];
        if (t.double_gift) {
            for (var r = 0; r < t.double_gift.length; r++)
                o.push(t.double_gift[r]);
            delete t.double_gift;
        }
        var a = 0;
        for (var l in t)
            if (l == "prop") {
                var c = t.prop;
                for (var u in c)
                    n.push([u, c[u], this.getItemProp(u).index, this.sortKeyDict.item]),
                        i && this.setItemPropNew(u);
            } else if (l == "title")
                for (var d = t[l], _ = 0; _ < d.length; _++) {
                    var m = d[_];
                    n.push([m, 1, -sg.model.ModelTitle.getIndexById(m), this.sortKeyDict.title]);
                }
            else if (l == "equip") {
                var g = t[l];
                for (a = 0; a < g.length; a++) {
                    var f = g[a];
                    n.push([f, 1, -sg.model.ModelEquip.getIndexById(f), this.sortKeyDict.equip]);
                }
            } else if (l == "credit")
                n.push([sg.model.ModelProp.ITEM_CREIDT, t[l], 0, this.sortKeyDict.credit]);
            else if (l == "awaken") {
                var p = t[l];
                for (a = 0; a < p.length; a++)
                    n.push([p[a], 1, sg.model.ModelHero.getIndexById(p[a]), this.sortKeyDict.awaken]);
            } else if (l == "skin") {
                var v = t[l];
                for (a = 0; a < v.length; a++)
                    n.push([v[a], 1, this.sortKeyDict.skin]);
            } else if (l == "face") {
                var y = t[l];
                for (a = 0; a < y.length; a++)
                    n.push([y[a], 1, this.sortKeyDict.face]);
            } else if (l == "chatBg") {
                var b = t[l];
                for (a = 0; a < y.length; a++)
                    n.push([b[a], 1, this.sortKeyDict.chatBg]);
            } else if (l === "cachet")
                n.push([l, t[l]]);
            else if (/^h\d{3}$/.test(l))
                n.push([l, t[l]]);
            else if (sg.kismet.model.ModelKit.validate(l))
                n.push([l, t[l], sg.kismet.model.ModelKit.getIndexById(l), this.sortKeyDict.kit]);
            else {
                var I = l,
                    x = t[I];
                if (-1 != I.indexOf("star")) {
                    I.length;
                    var w = I.substr(0, 6);
                    n.push([I, x, sg.model.ModelRune.getIndexById(w), this.sortKeyDict.star]);
                } else if (-1 != I.indexOf("title"))
                    n.push([I, x, -sg.model.ModelTitle.getIndexById(m), this.sortKeyDict.title]);
                else if (-1 != I.indexOf("equip"))
                    n.push([I, -sg.model.ModelEquip.getIndexById(f), this.sortKeyDict.equip]);
                else if (ConfigServer.system_simple.sale_depot && ConfigServer.system_simple.sale_depot[I]) {
                    var C = ConfigServer.system_simple.sale_depot[I],
                        k = C[2] ? C[2] : [];
                    (0 == k.length || -1 == k.indexOf(ModelManager.instance.modelUser.pf)) && n.push([C[0] + "|" + C[1], x, 0, this.sortKeyDict.sale_depot]);
                } else if (-1 != I.indexOf("beast"))
                    n.push([I, x, sg.model.ModelBeast.getIndexById(I), this.sortKeyDict.beast]),
                        h += x;
                else if (-1 != I.indexOf("soul"))
                    n.push([I, x, sg.model.ModelSoul.getIndexById(I), this.sortKeyDict.soul]);
                else if (-1 != I.indexOf(this.KEY_TC))
                    n.push([I, x, this.getItemProp(I).index, this.sortKeyDict[this.KEY_TC], -1 != o.indexOf(I) ? 1 : 0]);
                else if (-1 != I.indexOf(this.KEY_SCHEME))
                    n.push([I, x, this.getItemProp(I).index, this.sortKeyDict[this.KEY_SCHEME], -1 != o.indexOf(I) ? 1 : 0]);
                else if (-1 != I.indexOf("relic")) {
                    var T = sg.chessBoard.model.ModelRelic.getModel(I);
                    n.push([I, x, T.index, this.sortKeyDict.relic, -1 != o.indexOf(I) ? 1 : 0]);
                } else {
                    if (I === "add_gods")
                        t[I].forEach(function (t: any) {
                            var e = ModelManager.instance.modelUser.god[t],
                                h = e.type + "_" + (e.change || 0) + "_" + t;
                            n.push([h, 1, 0, 0, false]);
                        });
                    else if (I === "god_data") {
                        var M = t[I],
                            S = M.type + "_" + (M.change || 0);
                        n.push([S, 1, 0, 0, false]);
                    } else if (-1 != I.indexOf("arm_"))
                        n.push([I]);
                    else {
                        var B = this.getItemProp(I);
                        B && x > 0 && (B.addNum = x, n.push([I, x, B.index, this.sortKeyDict[I == "coin" ? "coin" : "item"]]), i && this.setItemPropNew(I));
                    }
                }
            }
        return i && sg.model.ModelBeast.setBeastPoint(h), n;
    }

    /** 配置奖励数组形态化（equip/title/face 单列 [id,1]，sale_depot 带 pf 过滤） */
    public getCfgPropArr(t: any): any[] {
        for (var s: any[] = [], n = 0; n < t.length; n++) {
            var h = t[n];
            if (h[0] == "equip" || h[0] == "title" || h[0] == "face")
                for (var o = 0; o < h[1].length; o++)
                    s.push([h[1][o], 1]);
            else if (ConfigServer.system_simple.sale_depot && ConfigServer.system_simple.sale_depot[h[0]]) {
                var r = ConfigServer.system_simple.sale_depot[h[0]],
                    a = r[2] ? r[2] : [];
                (0 == a.length || -1 == a.indexOf(ModelManager.instance.modelUser.pf)) && s.push([r[0] + "|" + r[1], h[1], -1]);
            } else
                s.push(h);
        }
        return s;
    }

    public clearRewardProp(): void {
        for (var i in this.allProp)
            this.allProp[i] && (this.allProp[i].isNew = 1);
    }

    /** 背包页签过滤（0 消耗/礼物 1-2 材料 3 礼盒 4 阵法/特产 13 其他） */
    public getPropType(t: number): any[] {
        var i, n: any[] = [],
            h = [1, 9, 10, 11];
        for (var o in this.userProp)
            if (0 != (i = this.userProp[o]).num)
                switch (t) {
                    case 0:
                        -1 != h.indexOf(i.type) && n.push(i);
                        break;
                    case 1:
                    case 2:
                        i.type == t + 1 && n.push(i);
                        break;
                    case 3:
                        (4 == i.type || 8 == i.type) && n.push(i);
                        break;
                    case 4:
                        (0 == i.id.indexOf(this.KEY_SCHEME) || 0 == i.id.indexOf(this.KEY_TC)) && n.push(i);
                        break;
                    case 13:
                        13 == i.type && n.push(i);
                }
        return sg.map.utils.ArrayUtils.sortOn(["isNew", "index"], n, false), n;
    }

    public getItemProp(t: any): any {
        var i;
        return this.allProp ? this.allProp.hasOwnProperty(t) ? i = this.allProp[t] : (-1 != t.indexOf("item") ? (i = this.newItem(t), this.allProp[t] = i) : -1 != t.indexOf(this.KEY_TC) || -1 != t.indexOf(this.KEY_SCHEME) ? (i = this.newTc(t), this.allProp[t] = i) : this.materialIndexObj[t] && (i = this.newMaterial(t), this.allProp[t] = i), i) : null;
    }

    public isHaveItemProp(t: any, i: any): boolean {
        if (ModelManager.instance.modelUser.property.hasOwnProperty(t)) {
            if (ModelManager.instance.modelUser.property[t] >= i)
                return true;
        } else if ((t == "coin" || t == "gold" || t == "wood" || t == "iron" || t == "iron" || t == "merit") && ModelManager.instance.modelUser[t] >= i)
            return true;
        return false;
    }

    public setItemPropNew(t: any): void {
        this.getItemProp(t) && (this.getItemProp(t).isNew = 0);
    }

    /** pve 掉落索引（army.upgrade_cost 去重 + battle_type=1 奖励 ×加成取整，>=99 记 chapter id） */
    public getPveGiftDict(): void {
        for (var i = ConfigServer.army.upgrade_cost, n: any[] = [], h = 0; h < i.length; h++)
            for (var o = i[h], r = 0; r < 4; r++)
                -1 == n.indexOf(o[r][0]) && n.push(o[r][0]),
                    -1 == n.indexOf(o[r][1]) && n.push(o[r][1]);
        var a = ConfigServer.pve.battle;
        for (var l in a)
            if (1 == a[l].battle_type) {
                var c = a[l].reward;
                for (var u in c) {
                    var d: any = {};
                    if (-1 != u.indexOf("item") && -1 != n.indexOf(u)) {
                        var _ = sg.model.ModelScience.func_sum_type("pve_get");
                        _ = 0 == _ ? c[u] : Math.floor((_ + 1) * c[u]),
                            ModelProp.pve_gift_dict.hasOwnProperty(u) ? (d = ModelProp.pve_gift_dict[u], _ >= 99 && (d[l] = _)) : _ >= 99 && (d[l] = _),
                            ModelProp.pve_gift_dict[u] = d;
                    }
                }
            }
    }

    /** 道具来源关卡列表（chapter_merge[mergeNum] 内，灰度优先标记 1 个） */
    public getPveSourceById(t: any): any[] {
        var s: any[] = [];
        if (sg.model.ModelProp.pve_gift_dict && sg.model.ModelProp.pve_gift_dict.hasOwnProperty(t)) {
            var n = sg.model.ModelProp.pve_gift_dict[t],
                h = ConfigServer.pve.chapter_merge[ModelManager.instance.modelUser.mergeNum],
                o = 0;
            for (var r in n) {
                var a = ConfigServer.pve.battle[r].chapter_belong,
                    l = Number(a.substring("chapter".length, a.length));
                if (l <= h) {
                    var c = false;
                    if (1 == <any>(c = !ModelManager.instance.modelUser.pve_records.chapter[a] || !ModelManager.instance.modelUser.pve_records.chapter[a].star.hasOwnProperty(r)) && 1 == o)
                        continue;
                    1 == <any>c && (o += 1);
                    var u = c ? 1 : 0,
                        d = l;
                    s.push({ id: r, num: n[r], gray: c, sort1: u, sort2: d });
                }
            }
            s = sg.map.utils.ArrayUtils.sortOn(["sort1", "sort2"], s, true);
        }
        return s;
    }

    /** 等级缩放奖励：[门槛,倍率,基量] 组按 getLv 线性插值 */
    public getRewardByLv(t: any): any[] {
        var s: any = {},
            n = ModelManager.instance.modelUser.getLv();
        for (var h in t)
            if (t[h] instanceof Array)
                if (typeof t[h][0] == "string")
                    s[h] = t[h];
                else {
                    for (var o = t[h], r = 1; r < o.length && !(n < o[r][0]); r++);
                    var a = o[r - 1][1] * n + o[r - 1][2];
                    a > 0 && (s[h] = a);
                }
            else
                s[h] = t[h];
        return this.getRewardProp(s, false);
    }

    /** 横屏背包红点档（竖屏恒空对象） */
    public getLocalRedPoint(): any {
        if (!ConfigApp.isLandscape)
            return {};
        var i = this.sLocalRedData ? this.sLocalRedData : SaveLocal.getValue("key_bag_item_red_point" + ModelManager.instance.modelUser.mUID, true);
        return i || (i = {}),
            this.sLocalRedData = i,
            this.sLocalRedData;
    }

    public setLocalRedPoint(t: any, i: any): void {
        if (ConfigApp.isLandscape) {
            var n = this.sLocalRedData ? this.sLocalRedData : SaveLocal.getValue("key_bag_item_red_point" + ModelManager.instance.modelUser.mUID, true);
            n || (n = {}),
                n[t] = i,
                this.sLocalRedData = n,
                SaveLocal.save("key_bag_item_red_point" + ModelManager.instance.modelUser.mUID, n, true);
        }
    }

    /** 无持有道具的红点清 0 落档 */
    public setLocalRedPointShow(): void {
        var i = ModelManager.instance.modelUser.property,
            s = this.getLocalRedPoint(),
            n = false;
        for (var h in s)
            !i[h] && (s[h] = 0, n = true);
        n && SaveLocal.save("key_bag_item_red_point" + ModelManager.instance.modelUser.mUID, s, true);
    }

    public setLocalRedPointHide(t: any, i?: any): void {
        void 0 === i && (i = 1),
            this.setLocalRedPoint(t, i),
            ModelManager.instance.modelUser.event("event_user_update", [{ prop: "" }, true]);
    }

    public get gtaskItemId(): any {
        return ConfigServer.gtask.gtask_add_item ? ConfigServer.gtask.gtask_add_item : "";
    }

    public static showTradeTab(): boolean {
        return sg.model.ModelEstate.isTradeOpen();
    }

    public static pve_gift_dict: any = {};
    public static clickUseProp: boolean = false;

    /**
     * 原文 h(s,["boxImg",…,"material_type",…]) —— 12 个 Laya.static 惰性静态：
     * 首查求值（横/竖屏道具 id 分叉）并缓存为类自身数据属性。
     * 静态 getter + defineProperty 换写（ViewScenes.TOP_HEIGHT 同款，逐对独立）。
     */
    public static get boxImg(): string {
        var v = ConfigApp.isLandscape ? "item0059" : "item055";
        Object.defineProperty(ModelProp, "boxImg", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_CREIDT(): string {
        var v = ConfigApp.isLandscape ? "item0026" : "item041";
        Object.defineProperty(ModelProp, "ITEM_CREIDT", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_FATE(): string {
        var v = ConfigApp.isLandscape ? "item0086" : "item088";
        Object.defineProperty(ModelProp, "ITEM_FATE", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_SKIN_COIN(): string {
        var v = ConfigApp.isLandscape ? "item0031" : "item1091";
        Object.defineProperty(ModelProp, "ITEM_SKIN_COIN", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_TRHEE_LAMP(): string {
        var v = ConfigApp.isLandscape ? "item0332" : "item1123";
        Object.defineProperty(ModelProp, "ITEM_TRHEE_LAMP", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_SEVEN_LAMP(): string {
        var v = ConfigApp.isLandscape ? "item0333" : "item1124";
        Object.defineProperty(ModelProp, "ITEM_SEVEN_LAMP", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_PVP(): string {
        var v = ConfigApp.isLandscape ? "item0016" : "item078";
        Object.defineProperty(ModelProp, "ITEM_PVP", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_HERO_SOUL(): string {
        var v = ConfigApp.isLandscape ? "item0020" : "item801";
        Object.defineProperty(ModelProp, "ITEM_HERO_SOUL", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_STONE(): string {
        var v = ConfigApp.isLandscape ? "item0027" : "item162";
        Object.defineProperty(ModelProp, "ITEM_STONE", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_PRAY(): string {
        var v = ConfigApp.isLandscape ? "item0028" : "item163";
        Object.defineProperty(ModelProp, "ITEM_PRAY", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get ITEM_SP_ARMY(): string {
        var v = ConfigApp.isLandscape ? "item0073" : "item1103";
        Object.defineProperty(ModelProp, "ITEM_SP_ARMY", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
    public static get material_type(): string[] {
        var v = ["merit", "gold", "food", "wood", "iron", "coin"];
        Object.defineProperty(ModelProp, "material_type", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,n(xxx),i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelProp, "sg.model.ModelProp", null, null);
