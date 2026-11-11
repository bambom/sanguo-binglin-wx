/**
 * sg.model.ModelArmyUpgrade —— 兵器升级（打铁/锤数）模型：每个兵营建筑一个实例，
 * 静态缓存 sArmyUpgradeModels；科技上限/成功率/锤数恢复/可升级判定/气泡提示。
 *
 * 原文：code1.js 字节 [1864460, 1868146)（Ho= 声明器 @1864457，单声明器非 Ee 式，
 * 0 参 IIFE (Ns)，池化 3 参注册 o(s,e(16660),i) @1864598，e(16660)→
 * pool[16445]="sg.model.ModelArmyUpgrade"，base i=Ns=sg.model.ModelBase）。
 * 前邻 ModelAntiAddiction 尾 `}(Ns),Ho=`、后邻 `(Ns),Oo=`（ModelAwaken）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-z/ModelArmyUpgrade.js
 * sha256 16=95f24d70fb6e98f6（3686B），work↔origin 逐字节一致，token 区间 overlap=0。
 *
 * 身份（locate_z.js / resolve_z.js，acorn 作用域链 + 池串/注册双源交叉）：
 *   ue=ModelManager（t(16259)@917600 ✓，.instance.modelUser/.modelInside）、
 *   Gt=ConfigServer、vs=Tools、gs=StringUtil、tn=ViewManager、lr=ModelGame、
 *   zo=ModelBuiding（army_type_building）、re=AssetsManager（getAssetsArmy）、
 *   Rr=sg.model.ModelScience（批次外：func_sum_type 直接引用，func_max_type
 *   调用点 cast）、Ns=ModelBase、sg 全局根。
 *   0 未译类。
 *
 * 保真注记：
 * - ctor 原文预设（mId/mModelBuilding/mIndex/mIsMaxHammer）先于
 *   `s.__super.call(this)`；ModelBase ctor 只写自身字段不读子字段、不派发
 *   initData（initData(t) 由 getModel 显式调用，带建筑 id 参数）→ extends
 *   形态顺序等价（批次 A 先例；字段声明顺序=原预设顺序）。
 * - getMaxPro 调用 getArmyAddValue() 两次（条件+取值）——原文如此，逐字保留
 *   （不做提取共享变量的“优化”）。
 * - canUp 三段 tips 判定（_public12/_public250/_public12/_building15/_building14）
 *   与 `return i&&showTipsTxt(...),!1` 逗号 return 逐字保留；cost 遍历
 *   `u=="hammer"` 分支与 Tools.isCanBuy 兜底顺序照抄。
 * - updateHarmmer：`0==n.mIsMaxHammer&&n.showBubblet()&&0==n.nextAddNumTime()
 *   &&(...)` 三重短路链；updateArmyUpgradeData：`if(h.mIsMaxHammer)
 *   0==(0==h.nextAddNumTime())&&(...)` 双重 0 比较（`0==(0==x)` 原文如此）。
 * - getModel：`s.sArmyUpgradeModels[t]?i=...:((i=new s).initData(t),...),i`
 *   三目+括号逗号链逐字保留；`new s` = new ModelArmyUpgrade。
 * - `sg.model.ModelArmyUpgrade.getModel` 全局路径自引（updateHarmmer/
 *   updateArmyUpgradeData 各 1 处）→ 类标识符直引（批次 O/I 先例）。
 * - 解码器别名（var t=e / var i=e 等）物化后整句删除（批次 N 先例）；
 *   其余 var 声明与局部名照抄。
 *
 * 类型层等价改写（不改运行时语义，批次 C「调用点 cast」先例）：
 *   Rr.func_max_type（环境声明面缺）→ (<any>sg.model.ModelScience)["func_max_type"]；
 *   Rr.func_sum_type 已声明 → sg.model.ModelScience["func_sum_type"] 直接引用。
 */

import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { ModelBuiding } from "./ModelBuiding";
import { ModelGame } from "./ModelGame";
import { ViewManager } from "../manager/ViewManager";
import { AssetsManager } from "../manager/AssetsManager";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";

export class ModelArmyUpgrade extends ModelBase {

    public mId: any = "";
    public mModelBuilding: any = null;
    public mIndex: any = 0;
    public mIsMaxHammer: any = !1;

    constructor() {
        super();               // 原文 s.__super.call(this)（预设/构造顺序等价性见头部注记）
    }

    /** 绑定建筑：记兵种 id、兵种下标、建筑模型（由静态 getModel 显式调用） */
    public initData(t: any): void {
        this["mId"] = t,
            this["mIndex"] = ModelBuiding["army_type_building"]["indexOf"](t),
            this["mModelBuilding"] = ModelManager["instance"]["modelInside"]["getBuildingModel"](this["mId"]);
    }

    /** 最大等级：基础 + 科技（上限类型非 0 时加成），封顶配置最大值 */
    public getMaxLv(): any {
        var i = this["getBaseMaxLv"]();
        0 != (<any>sg.model.ModelScience)["func_max_type"]("army_hammer", this["mModelBuilding"].id) && (i += sg.model.ModelScience["func_sum_type"]("army_hammer", this["mModelBuilding"].id));
        var s = this["getCfgMaxLv"]();
        return i > s && (i = s), i;
    }

    public getBaseMaxLv(): any {
        var i = ConfigServer["army"]["army_add_limit"];
        return this["mModelBuilding"].lv * i[0] + i[1];
    }

    public getCfgMaxLv(): any {
        var i = ConfigServer["army"]["army_add_value"];
        return i[i["length"] - 1][0];
    }

    public getSicence(): any {
        return ModelManager["instance"]["modelUser"]["home"][this["mId"]]["science"];
    }

    public getLv(): any {
        return this["getSicence"]()[0];
    }

    public getPro(): any {
        return this["getSicence"]()[1];
    }

    /** 最大进度：当前档加成的 3 倍（四舍五入），无档 0 */
    public getMaxPro(): any {
        return this["getArmyAddValue"]() ? Math["round"](3 * this["getArmyAddValue"]()[1]) : 0;
    }

    public getSuccessRate(): any {
        var i = this["getSicence"]()[5];
        return StringUtil["numberToPercent"](i);
    }

    /** 当前等级命中的加成档（等级 ≤ 档上限的首档），无命中 null */
    public getArmyAddValue(): any {
        for (var i = ConfigServer["army"]["army_add_value"], s = 0; s < i["length"]; s++) if (this["getLv"]() <= i[s][0]) return i[s];
        return null;
    }


    /** 距下一次锤数恢复的毫秒数：锤满为 0 */
    public nextAddNumTime(): any {
        if (this["hammerNums"] == this["maxHammerNums"]) return 0;
        var i = ConfigServer["getServerTimer"](), s = ConfigServer["army"]["hammer_times"], n = Tools["getTimeStamp"](this["getSicence"]()[2]);
        return s[1] * Tools["oneMinuteMilli"] - Math["floor"]((i - n) % (s[1] * Tools["oneMinuteMilli"]));
    }

    public getArmyIconUrl(): any {
        return ModelArmyUpgrade["getArmyIconUrlById"](this["mModelBuilding"].id);
    }

    /** 气泡提示：未达等级/进度上限（或已达但锤满）时显示 */
    public showBubblet(t: any): any {
        if (void 0 === t && (t = !1), ModelGame["unlock"](null, "army_upgrade")["stop"]) return !1;
        var s = this;
        return !(s["getLv"]() >= s["getMaxLv"]() && s["getPro"]() >= s["getMaxPro"]()) && (!t || !!s["mIsMaxHammer"]);
    }

    /** 可升级判定：0/1 锤升级只看进度；其余查等级上限与科技加成、逐资源校验 */
    public canUp(t: any, i: any): any {
        var n = this["getPro"](), h = this["getMaxPro"]();
        if (0 == t || 1 == t) {
            if (n >= h) return !1;
        } else {
            var o = this["getLv"]();
            if (o >= this["getCfgMaxLv"]()) return i && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_public12")), !1;
            var r = this["getBaseMaxLv"](), a = sg.model.ModelScience["func_sum_type"]("army_hammer", this["mId"]), l = (<any>sg.model.ModelScience)["func_max_type"]("army_hammer", this["mId"]);
            if (l > 0) {
                if (o >= r + a) return i && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_public250")), !1;
                if (o >= r + l) return i && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_public12")), !1;
            } else if (o >= r) return i && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_building15")), !1;
        }
        var c = ConfigServer["army"]["army_add_cost"][t][0];
        for (var u in c) {
            if (u == "hammer") {
                if (this["hammerNums"] < c[u]) return i && ViewManager["instance"]["showTipsTxt"](Tools["getMsgById"]("_building14")), !1;
            } else if (!Tools["isCanBuy"](u, c[u], i)) return !1;
        }
        return !0;
    }

    /** r(0,h,"armyName") —— 兵种名（按兵种下标取 skill_type_N 文案） */
    public get armyName(): any {
        var i = ["skill_type_0", "skill_type_1", "skill_type_2", "skill_type_3"][this["mIndex"]];
        return Tools["getMsgById"](i);
    }

    /** r(0,h,"armyIcon") —— 兵种图标（按兵种下标） */
    public get armyIcon(): any {
        return ["icon_army07.png", "icon_army08.png", "icon_army09.png", "icon_army10.png"][this["mIndex"]];
    }

    /** r(0,h,"hammerNums") —— 当前锤数：0 级 0；按时间差折算并封顶 */
    public get hammerNums(): any {
        if (0 == this["mModelBuilding"].lv) return 0;
        var i = ConfigServer["getServerTimer"](), s = ConfigServer["army"]["hammer_times"], n = Tools["getTimeStamp"](this["getSicence"]()[2]), h = Math["floor"]((i - n) / (s[1] * Tools["oneMinuteMilli"]));
        return h = h > this["maxHammerNums"] ? this["maxHammerNums"] : h;
    }

    /** r(0,h,"maxHammerNums") —— 锤数上限 */
    public get maxHammerNums(): any {
        return ConfigServer["army"]["hammer_times"][0];
    }

    /** 取（并缓存）建筑的升级模型；非兵营建筑返回 null */
    public static getModel(t: any): any {
        var i, h = ModelManager["instance"]["modelInside"]["getBuildingModel"](t);
        return h && h["isArmy"]() ? (ModelArmyUpgrade["sArmyUpgradeModels"][t] ? i = ModelArmyUpgrade["sArmyUpgradeModels"][t] : ((i = new ModelArmyUpgrade())["initData"](t), ModelArmyUpgrade["sArmyUpgradeModels"][t] = i), i) : null;
    }

    /** 按建筑 id 取兵种图标 URL：army + 兵种类型 + 当前等阶 */
    public static getArmyIconUrlById(t: any): any {
        var s = ModelManager["instance"]["modelInside"]["getBuildingModel"](t);
        return AssetsManager["getAssetsArmy"]("army" + s["getArmyType"]() + "" + s["getArmyCurrGrade"]());
    }

    /** 锤满标记巡检：锤未满且可显示气泡且恰好恢复 → 标记并刷新建筑状态 */
    public static updateHarmmer(): void {
        for (var i = ModelBuiding["army_type_building"], s = 0; s < i["length"]; s++) {
            var n = sg.model.ModelArmyUpgrade["getModel"](i[s]);
            0 == n["mIsMaxHammer"] && n["showBubblet"]() && 0 == n["nextAddNumTime"]() && (n["mIsMaxHammer"] = !0, ModelManager["instance"]["modelInside"]["getBuildingModel"](n["mId"])["updateStatus"](!0));
        }
    }

    /** 家园数据更新：已标锤满且锤数恰好恢复 → 清标记并刷新建筑状态 */
    public static updateArmyUpgradeData(t: any): void {
        if (t && t["home"]) for (var s = ModelBuiding["army_type_building"], n = 0; n < s["length"]; n++) {
            var h = sg.model.ModelArmyUpgrade["getModel"](s[n]);
            if (h["mIsMaxHammer"]) 0 == <any>(0 == h["nextAddNumTime"]()) && (h["mIsMaxHammer"] = !1, ModelManager["instance"]["modelInside"]["getBuildingModel"](h["mId"])["updateStatus"](!0));
        }
    }

    /** 建筑实例缓存（键=建筑 id） */
    public static sArmyUpgradeModels: any = {};
}

/**
 * 注册身份等价物：原文 return 前注册 o(s,e(16660),i)（池化，i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelArmyUpgrade, "sg.model.ModelArmyUpgrade", null, null);
