/**
 * sg.model.ModelAdjutant —— 副将纯静态工具类（目标 id 解析/副将特配/技能 id/
 * 装备最终伤害/副将天赋与搭档判定/测试全等级信息拼装）。
 *
 * 原文：code1.js 字节 [1849227, 1852025)（Do= 声明器 @1849224，单声明器非 Ee 式，
 * 0 参 IIFE (Ns)，池化 3 参注册 o(s,e(15157),i) @1849302，e(15157)→
 * pool[14942]="sg.model.ModelAdjutant"，base i=Ns=sg.model.ModelBase）。
 * 前邻 ModelBuffManager 尾 `}(As),Do=`、后邻 `(Ns),Ro=`（ModelAlert）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-z/ModelAdjutant.js
 * sha256 16=74da810be2bbf654（2798B），work↔origin 逐字节一致，token 区间 overlap=0。
 *
 * 身份（locate_z.js 110 断言 / resolve_z.js 49 断言，acorn 作用域链 + 池串/注册
 * 双源交叉）：Do=本类（盘点 assignedVar+池化注册名双证）；依赖
 *   gi=sg.fight.logic.cfg.ConfigFight（t(13433)@664120 ✓）、
 *   Ni=sg.fight.logic.utils.FightUtils（t(6558)@721767 ✓）、
 *   ki=sg.fight.logic.utils.FightObtain（t(1554)@695406 ✓）、
 *   Oo=sg.model.ModelAwaken（批次外明文注册，本仓已译模块直引）、
 *   jr=sg.model.ModelTalent（批次外）、gr=sg.model.ModelHeroPure（批次外）、
 *   Gr=sg.model.ModelSkill（批次外）、_r=sg.model.ModelHero（批次外）、
 *   Gt=ConfigServer、vs=Tools、gs=StringUtil、le=EffectManager、
 *   Ns=ModelBase（t 字面注册双证）、sg 全局根。
 *   0 未译类。
 *
 * 保真注记：
 * - 全静态类：ctor 仅 `s.__super.call(this)`（=super()），无字段无 initData
 *   （ModelBase ctor 不派发 initData，无构造期覆写问题，正常 extends 等价，
 *   批次 A 先例）；
 * - getAdjutantHeroSkillIdByHid 条件头 `if(void 0===h&&(h=0),h){` 逗号链照抄；
 * - getTestAllLvInfo：`_=(c[2],c[3]||0)`、`f=(c[6],!0)` 弃值逗号序列逐字保留；
 *   `r(0==i?4497:1037)` 条件池化串物化为 `0==i?"_hero48":"_hero49"`；
 *   `w=new gr({hid:u,awaken:g}).getTalentInfoHtml(!1,!1,!1)` 保留 new 表达式；
 * - `sg.model.ModelAdjutant.getAdjutantExtraId` 全局路径自引（hasAdjTalent 2 处）
 *   → 类标识符直引（批次 O/I 先例）；
 * - 解码器别名局部（var r=e / var n=e / var s=e / var i=e / var l=e）唯一用途
 *   是池串调用，物化后整句删除（批次 N 先例）；其余 var 声明与局部名照抄。
 *
 * 类型层等价改写（不改运行时语义，批次 C「调用点 cast」先例）：
 *   gi.adjutantSpecial/ratePoint、Ni.getValueByOpePath/compareValueMult/
 *   checkCondition/getAdjutantEquipDmgFinal、jr.getAdjPairId、gr.getCfg/ctor/
 *   getTalentInfoHtml、_r.getHeroStarGradeColor —— 依赖类未译或环境声明面不足，
 *   调用点 `(<any>全局路径)["成员"]` cast；Ni.mergeObj、ki.obtainIn、
 *   Gr.getModel、_r.getHeroName、Oo.getCfgKey（已译模块）直接引用。
 */

import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { EffectManager } from "../manager/EffectManager";
import { ModelAwaken } from "./ModelAwaken";

export class ModelAdjutant extends ModelBase {

    constructor() {
        super();               // 原文 s.__super.call(this)
    }

    /** 目标 id 解析：数组按索引/星级取值，标量原样，空返回 null */
    public static getTargetId(t: any, i: any, s: any): any {
        return void 0 === s && (s = -1), t ? (t instanceof Array ? (4 == t["length"] && s >= 0 ? t[s] : t[i]) : t) : null;
    }

    /** 副将特配额外 id：adjutant_<type>_extra 存在且宿主条件满足时取目标 id */
    public static getAdjutantExtraId(t: any, i: any, n: any, h: any, o: any): any {
        var a = (<any>sg.fight.logic.cfg.ConfigFight)["adjutantSpecial"][i];
        if (a) {
            var l = "adjutant_" + t + "_extra";
            if (a[l] && ModelAdjutant["checkHostCondition"](a[l + "_cond"], o))
                return ModelAdjutant["getTargetId"](a[l], n, h);
        }
        return null;
    }

    /** 副将配置对象：base 键 + 觉醒键合并；指定属性名时只收集该属性 */
    public static getAdjObj(t: any, i: any, s: any): any {
        void 0 === s && (s = "");
        var h = {};
        if (!(<any>sg.fight.logic.cfg.ConfigFight)["adjutantSpecial"]) return h;
        var o, r, a = ["base", t];
        i && a["push"](ModelAwaken["getCfgKey"](t, 1));
        for (var l = a["length"], c = 0; c < l; c++) r = a[c], (o = (<any>sg.fight.logic.cfg.ConfigFight)["adjutantSpecial"][r]) && (s ? o["hasOwnProperty"](s) && (h[s] = o[s]) : sg.fight.logic.utils.FightUtils["mergeObj"](h, o, !1));
        return h;
    }

    public static getAdjObjValue(t: any, i: any, n: any): any {
        return ModelAdjutant["getAdjObj"](t, i, n)[n];
    }

    /** 帧颜色类型：配置数组长度达到 12 用第 4 档，否则 -1 */
    public static getFrameColorType(t: any): any {
        return t["length"] >= 12 ? 4 : -1;
    }

    /** 单条件求值：取操作路径值（缺省 0）后多值比较 */
    public static checkOneCondition(t: any, i: any): any {
        var s, h = t[0], o = 1;
        if (i) {
            var r = t[1];
            null == (s = (<any>sg.fight.logic.utils.FightUtils)["getValueByOpePath"](i, h, !0, !0)) && (s = 0),
                o = (<any>sg.fight.logic.utils.FightUtils)["compareValueMult"](s, t[2], r, t[3], t[4]);
        }
        return o;
    }

    /** 宿主条件：FightUtils.checkCondition 以本类为求值宿主逐条判定 */
    public static checkHostCondition(t: any, i: any): any {
        var n = 1;
        return t && i && (n = (<any>sg.fight.logic.utils.FightUtils)["checkCondition"](t, this, this["checkOneCondition"], [i])), n;
    }

    /** 按武将 hid 取副将技能 id：先觉醒特配（条件满足），再基础特配，最后按英雄类型查表 */
    public static getAdjutantHeroSkillIdByHid(t: any, i: any, n: any, h: any, o: any): any {
        var r, a;
        if (void 0 === h && (h = 0), h) {
            var c = ModelAwaken["getCfgKey"](t, h);
            (a = (<any>sg.fight.logic.cfg.ConfigFight)["adjutantSpecial"][c]) && ModelAdjutant["checkHostCondition"](a["adjutant_skill_hero_cond"], o) && (r = ModelAdjutant["getTargetId"](a["adjutant_skill_hero"], i, n));
        }
        if ((!r && ((a = (<any>sg.fight.logic.cfg.ConfigFight)["adjutantSpecial"][t]) && ModelAdjutant["checkHostCondition"](a["adjutant_skill_hero_cond"], o) && (r = ModelAdjutant["getTargetId"](a["adjutant_skill_hero"], i, n))), !r)) {
            var u = ConfigServer["hero"][t];
            r = ModelAdjutant["getAdjutantHeroSkillId"](u["type"], i);
        }
        return r;
    }

    public static getAdjutantHeroSkillId(t: any, i: any): any {
        return ConfigServer["system_simple"]["adjutant_skill_hero"][t][i];
    }

    public static getAdjutantArmySkillIdByHid(t: any, i: any): any {
        var h = ConfigServer["hero"][t];
        return ModelAdjutant["getAdjutantArmySkillId"](h["army"][i]);
    }

    public static getAdjutantArmySkillId(t: any): any {
        return ConfigServer["system_simple"]["adjutant_skill_army"][t];
    }

    public static getEquipDmgFinal(t: any): any {
        return (<any>sg.fight.logic.utils.FightUtils)["getAdjutantEquipDmgFinal"](t);
    }

    /** 装备最终伤害百分比：最终伤害 / ConfigFight.ratePoint，0 位小数 */
    public static getEquipDmgFinalPercent(t: any): any {
        var n = ModelAdjutant["getEquipDmgFinal"](t);
        return Tools["percentFormat"](n / (<any>sg.fight.logic.cfg.ConfigFight)["ratePoint"], 0);
    }

    /** 副将天赋持有：基础键 + 觉醒键（adj 后缀）依次查 FightObtain，扩展天赋/技能条件满足即真 */
    public static hasAdjTalent(t: any, i: any, s: any, n: any, h: any): any {
        var o, a = [t];
        n && (o = ModelAwaken["getCfgKey"](t, n), a["push"](o));
        var l = 0, c = a["length"];
        for (l = 0; l < c; l++) {
            var u = (o = a[l]) + "adj";
            if (sg.fight.logic.utils.FightObtain["obtainIn"](u)) return !0;
            if (h) {
                if (sg.model.ModelAdjutant["getAdjutantExtraId"]("talent", o, i, s, h)) return !0;
                if (sg.model.ModelAdjutant["getAdjutantExtraId"]("skill", o, i, s, h)) return !0;
            }
        }
        return !1;
    }

    /** 副将搭档：ModelTalent.getAdjPairId 生成键后查 FightObtain */
    public static hasAdjPair(t: any, i: any, s: any): any {
        var h = (<any>sg.model.ModelTalent)["getAdjPairId"](t, i, s);
        return !!(sg.fight.logic.utils.FightObtain["obtainIn"](h));
    }

    /** 测试全等级信息 HTML：星级/技能名/装备伤害段/天赋段（弃值逗号序列逐字保留） */
    public static getTestAllLvInfo(t: any, i: any, n: any, h: any, o: any): any {
        void 0 === o && (o = !1);
        var a = "", l = (<any>sg.model.ModelHeroPure)["getCfg"](h);
        if (!l) return a;
        if (t) {
            var c = t[i];
            if (c) {
                var u = c[0];
                if (ConfigServer["hero"][u]) {
                    var d = c[1] || 0, _ = (c[2], c[3] || 0), m = c[4] || 0, g = c[5] || 0, f = (c[6], !0),
                        p = ModelAdjutant["getAdjutantHeroSkillIdByHid"](u, i, n, g, l),
                        v = sg.model.ModelSkill["getModel"](p),
                        y = Tools["getMsgById"](0 == i ? "_hero48" : "_hero49") + " " + sg.model.ModelHero["getHeroName"](u, g);
                    if (a = StringUtil["htmlFontColor"](y, EffectManager["getFontColor"]((<any>sg.model.ModelHero)["getHeroStarGradeColor"](_))),
                        a += StringUtil["getEnter"](f),
                        v) {
                        var b = Tools["getMsgById"]("fight_skill_lv", [v["getName"](), d]);
                        if (m) {
                            var I = ModelAdjutant["getEquipDmgFinalPercent"](m);
                            b = Tools["getMsgById"]("fight_adjutant_dmg_final", [b, I]);
                        }
                        a += StringUtil["htmlFontColor"](b, EffectManager["getFontColor"](v["getColor"](d))),
                            a += StringUtil["getEnter"](f),
                            a += StringUtil["substituteWithLineAndColor"](v["getInfoHtml"](d), "#CCEEFF", "#77BBCC");
                    }
                    var x = !1;
                    if ((ModelAdjutant["hasAdjTalent"](u, i, n, g, l) || ModelAdjutant["hasAdjPair"](h, u, g)) && (x = !0), x) {
                        var w = new (<any>sg.model.ModelHeroPure)({ hid: u, awaken: g })["getTalentInfoHtml"](!1, !1, !1);
                        w && (a += StringUtil["getEnter"](f) + w);
                    }
                }
            }
        }
        return a;
    }
}

/**
 * 注册身份等价物：原文 return 前注册 o(s,e(15157),i)（池化，i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelAdjutant, "sg.model.ModelAdjutant", null, null);
