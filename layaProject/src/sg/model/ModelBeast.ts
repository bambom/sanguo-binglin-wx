/**
 * sg.model.ModelBeast —— 神兽模型（升级/超级属性/共鸣/技能/背包容量/过滤清单，
 * 实例 _id/valueArr/type/pos/star/lv/superArr/ban/hid + 静态缓存 _models/superPropKeys）。
 *
 * 原文：code1.js 字节 [1871394,1887250)（off 1871795，池化注册名 e(6453)→
 * "sg.model.ModelBeast"，包装变量 Go，IIFE 实参基类 i=Ns=sg.model.ModelBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-aa/ModelBeast.js
 *
 * 身份（locate_aa.js / resolve_aa.js，acorn 全文件 + 池串交叉 + 声明器单一 init +
 * 成员交叉证明）：vs=Tools、gs=StringUtil、ae=ColorManager、le=EffectManager、
 * Gt=ConfigServer、Ts=Trace（o(t,"Trace")→Laya.Trace，已译模块直引）、tn=ViewManager、
 * ue=ModelManager、pn=NetSocket、P=laya.utils.Handler、cs=ObjectUtil、s=Laya
 * （UMD 头别名表证）。
 * 批次外全局注册路径：Gr=sg.model.ModelSkill（getModel，ambient 已列直引）、
 * Ni=sg.fight.logic.utils.FightUtils（mergeObj ambient 已列直引；getRankObj/
 * objectToArray/sortArray/getObjectLength/multPassive 未列 → (<any>) cast）、
 * gi=sg.fight.logic.cfg.ConfigFight（-b 已有 ambient：init/REWARD_KEYS/
 * overflowSpeedUp；beast* 7 面未列 → (<any>) cast，批次 J/V 先例）、
 * ki=sg.fight.logic.utils.FightObtain（containSk，本批 externals 新增）、
 * Ui=sg.fight.logic.utils.PassiveStrUtils（translateRsltInfo/getAttrsInfo/
 * translateSkillInfo ambient 未列 → cast）、be=sg.map.utils.TestUtils（已译直引）、
 * ge=sg.map.utils.ArrayUtils（sortOn ambient 已列直引）。
 *
 * 保真注记：ctor 双段（预置段→super→参数段，两段各 9/8 原子效应原序保留）；
 * canUpToLv 的 `Gt.beast.upgrade;` 裸读丢弃求值逐字保留；lvUpNeedObj 的
 * if 条件 `h[t-2]?h[t-2][this.pos]:null`（三元判空，值丢弃）与 else 臂
 * Trace.log("===modelBeast lv error",t)；getIndexById 的 `t["beast"["length"]+0]`
 * 计算下标原文如此（"beast".length=5，即 t[5]/t[6]/t[7]，照抄不化简）；
 * getAllSuperInfo 的 `var y=y=o.join("\n")` 双重赋值原文照抄；getOneBeastInfoHtml
 * 的 `var m=(t[4],new s(0,t))` 逗号丢弃 t[4]；getFilterList 的
 * `ue.instance.modelUser.beast;` 裸读丢弃 + `c>=97&&(c-=31.5)` 浮点步进 +
 * `if(0==d.isOpenState)continue`（for-in 内 continue）；sortBeastArr 尾语句为对
 * 形参 t 的赋值（无 return，丢弃）；testMsg 回调 `var e=s,n=i.receiveData` 别名
 * 链物化；getValueArr 静态的 `[(h=t)[5],…]` 数组元素内赋值；getBeasts 的
 `(typeof t["pos"]!=="number"||…)` 恒真分组照抄；静态自引 `sg.model.ModelBeast.*`
 * → 类标识符直引（批次 I/O 先例）；id/posName/typeName 为 r(0,a,…) 实例访问器；
 * sortKeyArr 为 h(s,[…]) 惰性静态（TS getter + defineProperty value 写回，
 * ModelItem material_type_ui 先例）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { ColorManager } from "../manager/ColorManager";
import { EffectManager } from "../manager/EffectManager";
import { ConfigServer } from "../cfg/ConfigServer";
import { Trace } from "../laya/Trace";
import { ViewManager } from "../manager/ViewManager";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ObjectUtil } from "../utils/ObjectUtil";
import { TestUtils } from "../map/utils/TestUtils";

export class ModelBeast extends ModelBase {

    public _id: number = 0;
    public valueArr: any = null;
    public type: any = null;
    public pos: any = 0;
    public star: any = 0;
    public lv: number = 0;
    public superArr: any = null;
    public ban: boolean = !1;
    public hid: any = null;
    public redPoint: boolean = !1;

    constructor(i: any, e: any) {
        super();  // 原文 s.__super.call(this)（字段预置先于 super，H/O 位移归一）
        this["hid"] = "", this["_id"] = i, this["valueArr"] = e, this["type"] = e[0], this["pos"] = e[1], this["star"] = e[2], this.lv = e[3], this["superArr"] = e[4], this["ban"] = !!e[5];
    }

    public isHaveSuperProp(t: any): any {
        if (this["superArr"] && this["superArr"]["length"] > 0) for (var s = 0; s < this["superArr"]["length"]; s++) if (this["superArr"][s][0] == t) return !0;
        return !1;
    }

    public getName(t?: any): any {
        return void 0 === t && (t = !1), ModelBeast["getBeastNameByTypeAndPos"](this["type"], this["pos"], t ? this.id : null);
    }

    public getIcon(): any {
        return ModelBeast["getIconByType"](this["type"]);
    }

    public getLvObj(t: any): any {
        return 0 == t ? {} : (t < 0 && (t = this.lv), ModelBeast["getLvObjByPos"](t, this["pos"], this["star"]));
    }

    public getLvPower(t?: any): any {
        void 0 === t && (t = -1);
        var s = this["getLvObj"](t);
        for (var n in s) if (n != "power") return s[n];
        return "";
    }

    public getLvInfo(t?: any, i?: any): any {
        void 0 === t && (t = -1), void 0 === i && (i = !1);
        var n = (<any>sg.fight.logic.utils.PassiveStrUtils)["translateRsltInfo"](Tools["getMsgById"]("cond"), this["getLvObj"](t), i);
        return n && i && (n = StringUtil["substituteWithColor"](n, ColorManager["getUIColor"]("beastLvNum"), ColorManager["getUIColor"]("beastLvInfo"))), n;
    }

    public getSkillLvInfo(t?: any, i?: any): any {
        void 0 === t && (t = -1), void 0 === i && (i = !0);
        var h = ModelBeast["getSkillId"](this["type"]);
        if (h) {
            var o = sg.model.ModelSkill["getModel"](h);
            t < 0 && (t = this.lv);
            var r = o["getInfoHtml"](t);
            return r && i && (r = StringUtil["substituteWithLineAndColor"](r, ColorManager["getUIColor"]("skillInfoNum"), ColorManager["getUIColor"]("skillInfo"))), r;
        }
        return null;
    }

    public isUnlockSuper(t: any): any {
        return ModelBeast["isSuperUnlock"](t, this.lv);
    }

    public getValueArr(t?: any): any {
        var s = [this["type"], this["pos"], this["star"], this.lv, this["superArr"]];
        return t && s["push"](this["ban"]), s;
    }

    public getSuperInfoAndColor(t: any): any {
        var s = this["superArr"][t];
        return s ? ModelBeast["getSuperInfoAndColorArr"](s[0], s[1]) : null;
    }

    public getSuperHtmlInfo(): any {
        if (!this["superArr"]) return "";
        for (var i = this["superArr"]["length"], s = "", n = 0; n < i; n++) {
            s += this["getOneSuperHtmlInfo"](n), n < i - 1 && (s += StringUtil["getEnter"](!0));
        }
        return s;
    }

    public getOneSuperHtmlInfo(t: any): any {
        var n = this["getSuperInfoAndColor"](t);
        if (!n) return "";
        var h = ModelBeast["getSuperUnlockLv"](t), o = this["isUnlockSuper"](t);
        return "<Font color='" + ColorManager["getUIColor"]("FONT_COLORS")[n[1]] + "'>" + Tools["getMsgById"]("_equip26") + n[0] + "</Font>" + (o ? "" : "<Font color='#828282'>" + StringUtil["getSpace"](!0, 4) + Tools["getMsgById"]("_beast_text34", [h]) + "</Font>");
    }

    public maxLv(): any {
        return ModelBeast["getMaxLv"](this["star"]);
    }

    public canUpToLv(): any {
        var i = this.lv, s = this["maxLv"](), n = 0;
        if (!(i < s)) return 0;
        ConfigServer["beast"]["upgrade"];
        for (var h = i + 1; h <= s; h++) {
            var o = this["lvUpNeedObj"](h), r = !0;
            for (var a in o) !Tools["isCanBuy"](a, o[a], !1) && (r = !1);
            if (!r) break;
            n = h;
        }
        return n;
    }

    public lvUpNeedObj(t: any, i?: any): any {
        void 0 === i && (i = 0);
        var n = 0 == i ? this.lv : i;
        if (t <= n) return null;
        var h = ConfigServer["beast"]["upgrade"], o = {};
        if (h[t - 2] ? h[t - 2][this["pos"]] : null) for (var r = t - 2; r >= n - 1; r--) {
            var a = h[r][this["pos"]];
            for (var l in a) o[l] ? o[l] = o[l] + a[l] : o[l] = a[l];
        } else Trace["log"]("===modelBeast lv error", t);
        return o;
    }

    public checkLv(t?: any): any {
        return void 0 === t && (t = !1), this.lv == this["maxLv"]() ? (t && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_beast_tips0")), !1) : 0 != this["canUpToLv"]() || (t && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_beast_tips1")), !1);
    }

    public isLock(): any {
        return -1 != ModelManager["instance"]["modelUser"]["beast_lock_ids"]["indexOf"](this.id + "");
    }

    public getResonanceStar(t: any): any {
        if ("" != this["hid"]) for (var s = ModelManager["instance"]["modelGame"]["getModelHero"](this["hid"])["getBeastResonanceArr"](), n = 0; n < s["length"]; n++) if (s[n][0] == this["type"] && s[n][1] == t) return s[n][2];
        return -1;
    }

    public install(t: any): void {
        t && (ModelBeast["checkOneBeastSuperData"](this.id, !1), this["hid"] = t);
    }

    public uninstall(): void {
        this["hid"] && (ModelBeast["checkOneBeastSuperData"](this.id, !0), this["hid"] = "");
    }

    /* ---- r(0,a,name,getter) 实例访问器 ---- */

    public get id(): any {
        return this["_id"];
    }

    public get posName(): any {
        return ModelBeast["getPosName"](this["pos"]);
    }

    public get typeName(): any {
        return ModelBeast["getTypeName"](this["type"]);
    }

    /* ---- 静态 ---- */

    public static clearModels(): void {
        ModelBeast["_models"] = {};
    }

    public static getModel(t: any): any {
        if (!ModelBeast["_models"][t]) {
            var n = ModelManager["instance"]["modelUser"]["beast"][t];
            if (n) {
                var h = new ModelBeast(t, n);
                ModelBeast["_models"][t] = h;
            } else ModelBeast["_models"][t] = null;
        }
        return ModelBeast["_models"][t];
    }

    public static updateModel(t: any): void {
        delete ModelBeast["_models"][t], ModelBeast["getModel"](t);
    }

    public static getIndexById(t: any): any {
        var s = t["beast"["length"] + 0]["charCodeAt"](0), n = Number(t["beast"["length"] + 1]);
        return 1e3 * (10 - Number(t["beast"["length"] + 2])) + 100 * n + s;
    }

    public static setBeastPoint(t: any): void {
        for (var s = ModelManager["instance"]["modelUser"]["beast_index"] - t, n = ModelManager["instance"]["modelUser"]["beast_index"], h = s; h < n; h++) {
            ModelBeast["getModel"](h + "")["redPoint"] = !0;
        }
    }

    public static getBeastNameByTypeAndPos(t: any, i: any, n: any): any {
        var o = Tools["getMsgById"]("_beastName", [ModelBeast["getTypeName"](t), ModelBeast["getPosName"](i)]);
        return n && TestUtils["isTestShow"] && (o += " " + n), o;
    }

    public static getBeastName(t: any, i?: any): any {
        return void 0 === i && (i = !1), ModelBeast["getBeastNameByTypeAndPos"](t[5], parseInt(t[6]), i ? t : null);
    }

    public static getIconByType(t: any): any {
        return "beastType_" + t + ".png";
    }

    public static getLvObjByPos(t: any, i: any, s?: any): any {
        void 0 === s && (s = -1), s >= 0 && (t = Math["min"](ModelBeast["getMaxLv"](s), t));
        var h = ConfigServer["fight"]["beastLv"][i];
        return h ? (<any>sg.fight.logic.utils.FightUtils)["getRankObj"](t, h) : {};
    }

    public static getAllLvInfo(t: any, i?: any): any {
        void 0 === i && (i = !1);
        var n = ModelBeast["getAllLvObj"](t);
        return (<any>sg.fight.logic.utils.PassiveStrUtils)["getAttrsInfo"](n, 2, i, ColorManager["getUIColor"]("beastLvNum"), ColorManager["getUIColor"]("beastLvInfo"));
    }

    public static getAllLvObj(t: any): any {
        var i, s, h = {}, o = t["length"], r = 0;
        for (r = 0; r < o; r++) {
            var a = t[r];
            if (a) {
                if (a instanceof ModelBeast) {
                    var l = a;
                    if (l["ban"]) continue;
                    i = l["getLvObj"](-1);
                } else {
                    if (!(a instanceof Array)) continue;
                    if ((s = a)[5]) continue;
                    i = ModelBeast["getLvObjByPos"](s[3], s[1], s[2]);
                }
                sg.fight.logic.utils.FightUtils["mergeObj"](h, i);
            }
        }
        return h;
    }

    public static getAllProInfoByHid(t: any): any {
        var n = ModelManager["instance"]["modelUser"]["hero"][t]["beast_ids"], h = "";
        if (n) {
            for (var o = [], r = 0; r < n["length"]; r++) n[r] && o["push"](ModelBeast["getModel"](n[r]));
            h = ModelBeast["getAllLvInfo"](o) + "\n" + ModelBeast["getAllSuperInfo"](o);
        }
        return h;
    }

    public static getPosName(t: any): any {
        return Tools["getMsgById"]("_beastPos_" + t);
    }

    public static getTypeName(t: any): any {
        return Tools["getMsgById"]("_beastType_" + t);
    }

    public static getPropName(t: any): any {
        return Tools["getMsgById"]("beast_name_" + t);
    }

    public static getSuperValueArr(t: any): any {
        if (t >= (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperValue"]["length"]) t = (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperValue"]["length"] - 1;
        else if (t < 0) return [0, 0];
        return (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperValue"][t];
    }

    public static isSuperUnlock(t: any, i: any): any {
        return i >= (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperUnlock"][t];
    }

    public static getSuperUnlockLv(t: any): any {
        return (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperUnlock"][t];
    }

    public static getSkillObj(t: any): any {
        var i;
        if ((<any>sg.fight.logic.cfg.ConfigFight)["beastHasSkill"]) {
            i = {};
            var h, o, r, a = t["length"], l = 0, c = 0;
            for (l = 0; l < a; l++) {
                var u = t[l];
                if (u) {
                    if (u instanceof ModelBeast) {
                        var d = u;
                        if (d["ban"]) continue;
                        o = d["type"], c = d.lv;
                    } else {
                        if (!(u instanceof Array)) continue;
                        if ((h = u)[5]) continue;
                        o = h[0], c = h[3];
                    }
                    (r = ModelBeast["getSkillId"](o)) && (!i[r] && (i[r] = 0), i[r] += c);
                }
            }
        }
        return i;
    }

    public static getSkillId(t: any): any {
        var i;
        if ((<any>sg.fight.logic.cfg.ConfigFight)["beastHasSkill"] && (i = "skillBeast" + t, sg.fight.logic.utils.FightObtain["containSk"](i))) return i;
        return null;
    }

    public static getResonanceSkillObj(t: any): any {
        for (var s = {}, n = ModelBeast["getResonanceArr"](t), h = n["length"], o = 0; o < h; o++) {
            var r = n[o];
            s["beastResonance" + r[0] + r[1]] = r[2] + 1;
        }
        return s;
    }

    public static getResonanceArr(t: any): any {
        var i, s, h = [], o = {}, r = t["length"], a = 0, l = 0, c = 0;
        for (a = 0; a < r; a++) {
            var u = t[a];
            if (u) {
                if (u instanceof ModelBeast) {
                    var d = u;
                    if (d["ban"]) continue;
                    i = d["type"], c = d["star"];
                } else {
                    if (!(u instanceof Array)) continue;
                    if ((s = u)[5]) continue;
                    i = s[0], c = s[2];
                }
                for (!o[i] && (o[i] = [0, 0, 0, 0, 0]), l = 0; l <= c; l++) o[i][l]++;
            }
        }
        for (i in o) {
            s = o[i], r = (<any>sg.fight.logic.cfg.ConfigFight)["beastResonance"]["length"];
            var _ = !0;
            for (a = 0; a < r; a++) if (_) for (_ = !1, c = s["length"] - 1; c >= 0; c--) {
                if (s[c] >= (<any>sg.fight.logic.cfg.ConfigFight)["beastResonance"][a]) {
                    h["push"]([i, (<any>sg.fight.logic.cfg.ConfigFight)["beastResonance"][a], c]), _ = !0;
                    break;
                }
            }
        }
        return h;
    }

    public static getTypeCount(t: any): any {
        var i, s, h = t["length"], o = 0, r = {};
        for (o = 0; o < h; o++) {
            var a = t[o];
            if (a) {
                if (a instanceof ModelBeast) {
                    var l = a;
                    if (l["ban"]) continue;
                    i = l["type"];
                } else {
                    if (!(a instanceof Array)) continue;
                    if ((s = a)[5]) continue;
                    i = s[0];
                }
                !r[i] && (r[i] = 0), r[i]++;
            }
        }
        return (<any>sg.fight.logic.utils.FightUtils)["getObjectLength"](r);
    }

    public static getConditionalNum(t: any, i: any, s: any): any {
        var n, h, r = t["length"], a = 0, l = 0, c = 0;
        for (a = 0; a < r; a++) {
            var u = t[a];
            if (u) {
                if (u instanceof ModelBeast) {
                    var d = u;
                    if (d["ban"]) continue;
                    n = d["type"], l = d["star"];
                } else {
                    if (!(u instanceof Array)) continue;
                    if ((h = u)[5]) continue;
                    n = h[0], l = h[2];
                }
                n == i && l >= s && c++;
            }
        }
        return c;
    }

    public static getAllResonanceInfo(t: any, i?: any, s?: any): any {
        void 0 === i && (i = !1), void 0 === s && (s = !1);
        var h, o, r, a, l = !1;
        a || (a = []), t["length"] > 1 && (l = (h = t[1])[1] == (<any>sg.fight.logic.cfg.ConfigFight)["beastResonance"][(<any>sg.fight.logic.cfg.ConfigFight)["beastResonance"]["length"] - 1], r = ModelBeast["getResonanceInfoArr"](h[0], h[1], h[2], i, s)), t["length"] > 0 && (h = t[0], o = ModelBeast["getResonanceInfoArr"](h[0], h[1], h[2], i, s), a = r ? l ? [o[0], r[0], o[1]] : o["concat"](r) : o);
        var c = s ? "<br/>" : "\n\n";
        return a["join"](c);
    }

    public static getAllInfoHtml(t: any): any {
        var s = ModelBeast["getResonanceArr"](t), n = StringUtil["packingFontSize"](ModelBeast["getAllResonanceInfo"](s, !1, !0), EffectManager["getFontSize"](6)), h = StringUtil["packingFontSize"](ModelBeast["getAllLvInfo"](t, !0), EffectManager["getFontSize"](4)), o = StringUtil["packingFontSize"](ModelBeast["getAllSuperInfo"](t, !0), EffectManager["getFontSize"](4));
        return n = n + StringUtil["getEnter"](!0) + h + StringUtil["getEnter"](!0) + o;
    }

    public static getTitleInfo(): any {
        return Tools["getMsgById"]("_beast_text12");
    }

    public static getStarName(t: any): any {
        return Tools["getColorInfo"](t + 1);
    }

    public static getStarColor(t: any): any {
        return EffectManager["getFontColor"](t + 1);
    }

    public static getResonanceInfoArr(t: any, i: any, n: any, h?: any, o?: any): any {
        void 0 === h && (h = !1), void 0 === o && (o = !1);
        var a, l = [], c = "null", u = ModelBeast["getTypeName"](t), d = n + 1, _ = ModelBeast["getStarName"](d), m = "#AACCDD";
        o && (_ = "[" + _ + "]", m = ModelBeast["getStarColor"](d));
        var g = sg.model.ModelSkill["getModel"]("beastResonance" + t + i), f = o ? "<br/>" : "\n";
        return g && (c = g["getBeastResonanceEnergyInfo"](d, o)), 4 == i ? (h && n < 4 && (a = Tools["getMsgById"]("_beastResonanceNext", [i, _, u]), o && (a = StringUtil["substituteWithLineAndColor"](a, m, "#AAAAAA")), c += f + a), l["push"](c), a = Tools["getMsgById"]("_beastResonance_" + t), o && (a = StringUtil["substituteWithLineAndColor"](a, "#FFCC66", "#FFCC66")), c = a, l["push"](c)) : 8 == i && (h && n < 4 && (a = Tools["getMsgById"]("_beastResonanceNext", [i, _, u]), o && (a = StringUtil["substituteWithLineAndColor"](a, m, "#AAAAAA")), c += f + a), l["push"](c)), l;
    }

    public static getResonanceInfo(t: any, i: any, s: any, n?: any, h?: any): any {
        void 0 === n && (n = !1), void 0 === h && (h = !1);
        var r = h ? "<br/>" : "\n\n";
        return ModelBeast["getResonanceInfoArr"](t, i, s, n, h)["join"](r);
    }

    public static getAllSuperInfo(t: any, i?: any): any {
        void 0 === i && (i = !1);
        var n = ModelBeast["getAllSuperObject"](t), h = (<any>sg.fight.logic.utils.FightUtils)["objectToArray"](n, 1);
        (<any>sg.fight.logic.utils.FightUtils)["sortArray"](h, "0", (<any>sg.fight.logic.cfg.ConfigFight)["beastSortArr"]);
        for (var o = [], r = h["length"], a = 0; a < r; a++) {
            var l = h[a], c = l[0], u = l[1], d = ModelBeast["getSuperBeastObj"](c, u, !0), _ = "_beastSuper_" + c, m = (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperSkill"][c];
            if (m) {
                var g = m["infoArr"];
                if (g) {
                    var f = [], p = 0, v = g["length"];
                    for (p = 0; p < v; p++) f["push"]((<any>sg.fight.logic.utils.PassiveStrUtils)["translateSkillInfo"](d, g[p], 0, i, !0));
                    o["push"](Tools["getMsgById"](_, f));
                }
            }
        }
        var y = y = o["join"]("\n");
        return i && (y = StringUtil["substituteWithLineAndColor"](y, "#FFAAEE", "#DD66CC")), y;
    }

    public static getAllSuperObject(t: any): any {
        var i, s, h = {}, o = t["length"], r = 0, a = 0, l = 0;
        for (r = 0; r < o; r++) {
            var c = t[r];
            if (c) {
                if (c instanceof ModelBeast) {
                    var u = c;
                    if (u["ban"]) continue;
                    i = u["superArr"], l = u.lv;
                } else {
                    if (!(c instanceof Array)) continue;
                    if ((s = c)[5]) continue;
                    i = s[4], l = s[3];
                }
                var d = i["length"];
                for (a = 0; a <= d; a++) if ((s = i[a]) && l >= (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperUnlock"][a]) {
                    var _ = {}, m = ModelBeast["getSuperValueArr"](s[1])[0];
                    _[s[0]] = m, sg.fight.logic.utils.FightUtils["mergeObj"](h, _);
                }
            }
        }
        return h;
    }

    public static getSuperInfoAndColorArr(t: any, i: any): any {
        var s, h = ModelBeast["getSuperValueArr"](i), o = ModelBeast["getSuperBeastObj"](t, h[0], !0), r = "_beastSuper_" + t;
        if (o) {
            var a = [], l = (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperSkill"][t]["infoArr"];
            if (l) {
                var c = 0, u = l["length"];
                for (c = 0; c < u; c++) a["push"]((<any>sg.fight.logic.utils.PassiveStrUtils)["translateSkillInfo"](o, l[c], 0, !1, !0));
            }
            s = Tools["getMsgById"](r, a);
        } else s = Tools["getMsgById"](r, [h[0]]);
        return [s, h[1]];
    }

    public static getSuperBeastObj(t: any, i: any, s?: any): any {
        void 0 === s && (s = !1);
        var h, o = (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperSkill"][t];
        return o && (h = {}, o["beast"] && (h["beast"] = ObjectUtil["clone2"](o["beast"])), o["skill"] && (h["skill"] = ObjectUtil["clone2"](o["skill"])), o["special"] && (h["special"] = ObjectUtil["clone2"](o["special"])), s && o["passive"] && (h["passive"] = ObjectUtil["clone2"](o["passive"])), (<any>sg.fight.logic.utils.FightUtils)["multPassive"](h, i)), h;
    }

    public static getSuperPassiveObj(t: any, i: any): any {
        var s, h = (<any>sg.fight.logic.cfg.ConfigFight)["beastSuperSkill"][t];
        return h && (s = h["passive"] ? ObjectUtil["clone2"](h["passive"]) : ObjectUtil["clone2"]((<any>sg.fight.logic.cfg.ConfigFight)["beastSuperSkillDefaultPassive"]), (<any>sg.fight.logic.utils.FightUtils)["multPassive"](s, i)), s;
    }

    public static getBeastValueArr(t: any): any {
        return ModelManager["instance"]["modelUser"]["beast"][t];
    }

    public static get_gift_dict_key(t: any): any {
        if (typeof t == "string") {
            var s = t, n = parseInt(s);
            if (!n && s["indexOf"]("|") >= 0 && (s = s["split"]("|")[1], n = parseInt(s)), n) return s;
        }
        return null;
    }

    public static getValueArr(t: any): any {
        var i;
        if (typeof t == "string") {
            var h = ModelBeast["get_gift_dict_key"](t);
            h ? i = ModelBeast["getBeastValueArr"](h) : i = [(h = t)[5], parseInt(h[6]), parseInt(h[7]), 1];
        } else {
            if (t instanceof Array) i = t;
            else if (t instanceof ModelBeast) i = t["valueArr"];
        }
        return i;
    }

    public static showTipsPanel(t: any, i?: any): void {
        void 0 === i && (i = !1);
        var h = ModelBeast["getValueArr"](t);
        if (h) {
            var o;
            if (i) if (typeof t == "string") o = t;
            else if (t instanceof Array) o = t["toString"]();
            else if (t instanceof ModelBeast) {
                o = t.id;
            }
            var r = ModelBeast["getOneBeastInfoHtml"](h, 5, o);
            ViewManager["instance"]["showTipsPanel"](r, 560);
        }
    }

    public static getOneBeastInfoHtml(t: any, i?: any, n?: any): any {
        void 0 === i && (i = 0);
        var o, r, a, l = "", c = t[0], u = t[1], d = t[2], _ = t[3], m = (t[4], new ModelBeast(0, t)), g = ModelBeast["getBeastNameByTypeAndPos"](c, u, n);
        r = ModelBeast["getStarColor"](d), o = Tools["getMsgById"]("beast_info_formate"), o = StringUtil["replaceSpace"](o), o = StringUtil["replaceEnter"](o), o = Tools["replaceMsg"](o, [g, _]), a = StringUtil["htmlFontColor"](o, r), l += a = StringUtil["packingFontSize"](a, EffectManager["getFontSize"](i + 3)), l += StringUtil["getEnter"](!0);
        var f = m["getLvInfo"](_, !0);
        f && (f = StringUtil["packingFontSize"](f, EffectManager["getFontSize"](i)), l += StringUtil["getEnter"](!0) + f);
        var p = m["getSkillLvInfo"]();
        p && (p = StringUtil["packingFontSize"](p, EffectManager["getFontSize"](i)), l += StringUtil["getEnter"](!0) + p);
        var v = m["getSuperHtmlInfo"]();
        if (v && (v = StringUtil["packingFontSize"](v, EffectManager["getFontSize"](i)), l += StringUtil["getEnter"](!0) + v), i) {
            var y = EffectManager["getFontSize"](i);
            l = StringUtil["packingFontSize"](l, y);
        }
        return l;
    }

    public static getMaxLv(t: any): any {
        return ConfigServer["beast"]["upgrade_limit"][t];
    }

    public static getBagTotalNum(): any {
        var i = ConfigServer["beast"]["add_bag"], s = ModelManager["instance"]["modelUser"]["beast_times"];
        return i[0] + s * i[2];
    }

    public static getBagCurNum(): any {
        var i = ModelManager["instance"]["modelUser"]["beast"], s = ModelManager["instance"]["modelUser"]["hero"], n = Tools["getDictLength"](i), h = 0;
        for (var o in s) if (s[o]["beast_ids"]) for (var r = 0; r < s[o]["beast_ids"]["length"]; r++) null != s[o]["beast_ids"][r] && (h += 1);
        return n - h;
    }

    public static buyBagNumNeedCoin(): any {
        var i = 0, s = ConfigServer["beast"]["add_bag"], n = ModelManager["instance"]["modelUser"]["beast_times"];
        return n < s[1] && (i = s[3 + n] ? s[3 + n] : s[s["length"] - 1]), i;
    }

    public static getBeasts(t: any): any {
        var s = [], n = ModelManager["instance"]["modelUser"]["beast"];
        for (var h in t = t || {}, n) {
            var o = ModelBeast["getModel"](Number(h));
            if ("" == o["hid"] && ((typeof t["pos"] !== "number" || -1 === t["pos"] || o["pos"] === t["pos"]) && (!t["type"] || o["type"] === t["type"]) && (!t["prop"] || o["isHaveSuperProp"](t["prop"])))) {
                var r = t["stars"] || [];
                r["length"] && -1 === r["indexOf"](o["star"]) || s["push"]({ data: o, sortLock: o["isLock"]() ? 1 : 0, sortLv: o.lv, sortStar: o["star"], sortPos: -1 * o["pos"], sortType: o["type"]["charCodeAt"](0), sortId: Number(h) });
            }
        }
        return s;
    }

    public static sortBeastArr(t: any, i?: any, s?: any): void {
        void 0 === i && (i = ""), void 0 === s && (s = !0);
        var h = "" == i ? ModelBeast["sortKeyArr"] : [i];
        if ("" != i) for (var o = 0; o < ModelBeast["sortKeyArr"]["length"]; o++) ModelBeast["sortKeyArr"][o] != i && h["push"](ModelBeast["sortKeyArr"][o]);
        t = sg.map.utils.ArrayUtils["sortOn"](h, t, s, !0);
    }

    public static getAllTypeArr(): any {
        var i = [], s = ModelManager["instance"]["modelUser"]["beast"];
        for (var n in s) {
            var h = s[n], o: any = !1;
            if ("" == ModelBeast["getModel"](n)["hid"]) {
                for (var r = 0; r < i["length"]; r++) if (i[r]["key"] == h[0]) {
                    o = !0;
                    break;
                }
                if (0 == o) {
                    var a = {}, l = h[0]["charCodeAt"](0);
                    a["key"] = h[0], a["text"] = ModelBeast["getTypeName"](h[0]), a["sortType"] = l, i["push"](a);
                }
            }
        }
        return sg.map.utils.ArrayUtils["sortOn"](["sortType"], i, !1, !0), i;
    }

    public static testMsg(t: any, i: any): void {
        NetSocket["instance"]["send"](t, i, new Handler(null, function (i) {
            var n = i["receiveData"];
            Trace["log"](t, "==", n);
        }));
    }

    public static isOpen(): any {
        if (ConfigServer["beast"]) {
            var i = null != ConfigServer["beast"]["switch"] ? ConfigServer["beast"]["switch"] : -1, s = ModelManager["instance"]["modelUser"]["mergeNum"];
            return i >= 0 && i <= s;
        }
        return !1;
    }

    public static getFilterList(): any {
        var i = [], s = [], n = [], h = ConfigServer["fight"]["beastSuperSkill"];
        ModelManager["instance"]["modelUser"]["beast"];
        if (null == h) return [];
        for (var o in h) {
            var r: any = {};
            r.id = o;
            var a = ModelBeast["getPropName"](o);
            r["name"] = "" == a ? o : a;
            var l = ModelBeast["superPropKeys"][o] > 0 ? ModelBeast["superPropKeys"][o] : 0;
            if (r["have"] = l > 0 ? 1 : 0, r["num"] = l, 1 == o["length"]) {
                var c = o["charCodeAt"](0);
                c >= 97 && (c -= 31.5), r["index"] = -c, i["push"](r);
            } else {
                var u = o["substr"](1, o["length"] - 1);
                if (u = "skill" + u, sg.fight.logic.utils.FightObtain["containSk"](u)) {
                    var d = ModelManager["instance"]["modelGame"]["getModelSkill"](u);
                    if (0 == d["isOpenState"]) continue;
                    r["index"] = -d["index"], r["type"] = -d["type"], 4 == d["type"] ? s["push"](r) : d["type"] <= 3 && n["push"](r);
                }
            }
        }
        return sg.map.utils.ArrayUtils["sortOn"](["have", "index"], i, !0), sg.map.utils.ArrayUtils["sortOn"](["have", "type", "index"], s, !0), sg.map.utils.ArrayUtils["sortOn"](["have", "index"], n, !0), [i, s, n];
    }

    public static checkBeastSuperData(): void {
        ModelBeast["superPropKeys"] = {};
        var i = ModelManager["instance"]["modelUser"]["beast"];
        for (var n in i) {
            ModelBeast["getModel"](n)["hid"] || ModelBeast["checkOneBeastSuperData"](n, !0);
        }
    }

    public static checkOneBeastSuperData(t: any, i: any): void {
        for (var h = ModelManager["instance"]["modelUser"]["beast"][t][4], o = 0; o < h["length"]; o++) {
            var r = h[o][0];
            !ModelBeast["superPropKeys"]["hasOwnProperty"](r) && (ModelBeast["superPropKeys"][r] = 0), ModelBeast["superPropKeys"][r] += i ? 1 : -1;
        }
    }

    /* ---- 静态数据 ---- */

    public static EVENT_BEAST_FILTER: string = "event_beast_filter";
    public static EVENT_BEAST_FILTER_CB: string = "event_beast_filter_cb";
    public static EVENT_BEAST_SORT: string = "event_beast_sort";
    public static EVENT_BEAST_UPDATE: string = "event_beast_update";
    public static EVENT_BEAST_LIST_REFRESH: string = "event_beast_list_refresh";
    public static _models: any = {};
    public static recoverBid: number = -1;
    public static beastLen: number = 0;
    public static superPropKeys: any = {};

    /* ---- h(s,["sortKeyArr",fn]) 惰性静态：首次访问装配并 defineProperty 写回 ---- */

    public static get sortKeyArr(): any {
        var v = ["sortLock", "sortLv", "sortStar", "sortPos", "sortType", "sortId"];
        Object.defineProperty(ModelBeast, "sortKeyArr", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,e(6453),i)（池化名 e(6453)="sg.model.ModelBeast"，
 * i=Ns=sg.model.ModelBase）。base 传 null：tsc extends 已建原型链（batch-a
 * 「注册等价决策」，同 ModelItem/ModelXYZ2）。
 */
Laya.class(ModelBeast, "sg.model.ModelBeast", null, null);
