/**
 * sg.model.ModelAwaken —— 武将觉醒模型（觉醒配置键/觉醒名/称号/背景动画/头像框/
 * 觉醒说明 html；静态缓存 awakenModels）。
 *
 * 原文：code1.js 字节 [1868154,1871386)（off 1868270，池化注册名 e(12928)→
 * "sg.model.ModelAwaken"，包装变量 Oo，IIFE 实参基类 i=Ns=sg.model.ModelBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-aa/ModelAwaken.js
 *
 * 身份（locate_aa.js / resolve_aa.js，acorn 全文件作用域 + 池串索引交叉 + 依赖声明器
 * 单一 init + 成员交叉证明）：vs=sg.utils.Tools、Gt=sg.cfg.ConfigServer、
 * re=sg.manager.AssetsManager、ae=sg.manager.ColorManager、gs=sg.utils.StringUtil、
 * ue=sg.manager.ModelManager、yr=sg.model.ModelItem（批次 F 已译，模块直引）。
 * 批次外全局注册路径：jr=sg.model.ModelTalent（getMsgByExplain，ambient 未列 →
 * (<any>) cast）、gr=sg.model.ModelHeroPure（getCfg → cast）、_r=sg.model.ModelHero
 * （getCfg → cast）、ki=sg.fight.logic.utils.FightObtain（containSk/obtainIn，本批
 * externals 新增）、te=sg.jigsaw.model.ModelJigsawPure（getPatternArrInfo，本批
 * externals 新增）、Li=sg.fight.logic.utils.FightStrUtils（getShowDayInfo，本批
 * externals 新增）。声明器单一 init 非 Ee 双跳（locate_aa 断言）。
 *
 * 保真注记：initData 的 for-in 判别式为逗号序列 `for(var n in this.id=t,this["data"]=i,i)`
 * （先赋 id/data 再以 i 为枚举对象，逐字保留）；getModel 的 `(o=new s)["initData"](h,r)`
 * 括号内 new 赋值后立即成员调用；getHeroAwakenInfo 的 `h+=c=…` 双重赋值链
 * （compound 后嵌 plain，右侧先归 c 再拼 h）；getCfgKey 的 `var e=t` 为**参数 t 的
 * 局部别名（真逻辑）**，与解码器别名 `var X=e/n`（物化后整句删除，批次 N 先例）区分；
 * 静态自引 `sg.model.ModelAwaken.*` 全局路径 → 类标识符直引（批次 I/O 先例）；
 * 静态数据 awakenModels={}。
 */
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { AssetsManager } from "../manager/AssetsManager";
import { ColorManager } from "../manager/ColorManager";
import { StringUtil } from "../utils/StringUtil";
import { ModelManager } from "../manager/ModelManager";
import { ModelItem } from "./ModelItem";
import { ModelBase } from "./ModelBase";

export class ModelAwaken extends ModelBase {

    public id: any = null;
    public hid: any = null;
    public awaken: number = 0;

    constructor() {
        super();  // 原文 s.__super.call(this)（字段预置先于 super，H/O 位移归一）
    }

    public initData(t: any, i: any): void {
        for (var n in this.id = t, this["data"] = i, i) this["hasOwnProperty"](n) && (this[n] = i[n]);
    }

    public getName(): any {
        return "";
    }

    public getInfoHtml(t: any, i: any): any {
        void 0 === i && (i = !1);
        var n;
        return this["data"] && this["data"]["testInfo"] && (n = Tools["getMsgById"]("test_0007", [this["data"]["testInfo"]])), n || (n = this["getExplainInfo"](t)), n || i || (n = Tools["getMsgById"]("msg_ModelTalent_1")), n;
    }

    public getExplainInfo(t: any): any {
        var n = ModelAwaken["getMsgId"](this["hid"], this["awaken"]);
        return (<any>sg.model.ModelTalent)["getMsgByExplain"](n, t);
    }

    public static getModel(t: any, i: any): any {
        var h = ModelAwaken["getCfgKey"](t, i), o = ModelAwaken["awakenModels"][h];
        if (!o) {
            var r = ModelAwaken["getConfig"](h);
            if (!r && !ModelAwaken["hasMsg"](t, i)) return null;
            (o = new ModelAwaken)["initData"](h, r), o["hid"] = t, o["awaken"] = i, ModelAwaken["awakenModels"][h] = o;
        }
        return o;
    }

    public static getCfgKey(t: any, i: any): any {
        var e = t;
        return i && (e = 1 == i ? t + "a" : t + "a" + i), e;
    }

    public static getConfig(t: any): any {
        var i;
        return t && (i = sg.fight.logic.utils.FightObtain["obtainIn"](t)), i;
    }

    public static getAwakenCfg(t: any, i: any): any {
        var h = ModelAwaken["getCfgKey"](t, i);
        return ModelAwaken["getConfig"](h);
    }

    public static getHeroName(t: any, i: any): any {
        void 0 === i && (i = 0);
        var h = Tools["getMsgById"]((<any>sg.model.ModelHeroPure)["getCfg"](t)["name"]);
        if (i) {
            var o = ModelAwaken["getCfgKey"](t, i), r = ModelAwaken["getConfig"](o);
            h = Tools["hasMsgById"]("hero_awakens_name") ? Tools["getMsgById"]("hero_awakens_name", [h, ModelAwaken["getPreName"](i, r)]) : Tools["getMsgById"]("hero_awaken_name", [h]),
                !r && (h = Tools["getMsgById"]("hero_awake_name", [h]));
        }
        return h;
    }

    public static getPreName(t: any, i?: any, s?: any): any {
        var n;
        return void 0 === s && (s = !1), i && i["awakenPre"] && (n = Tools["getMsgById"](i["awakenPre"])), !n && (n = Tools["getMsgById"]("awaken_pre_" + t)), s && (n = Tools["getMsgById"]("_hero66", [n])), n;
    }

    public static getTitle(t: any, i: any, n: any): any {
        var o = ModelAwaken["getCfgKey"](t, i), r = ModelAwaken["getConfig"](o);
        return n ? i <= 1 ? Tools["getMsgById"]("_hero58") : Tools["getMsgById"]("_hero65", [ModelAwaken["getPreName"](i, r)]) : i <= 1 ? Tools["getMsgById"]("_hero38") : Tools["getMsgById"]("_hero64", [ModelAwaken["getPreName"](i, r)]);
    }

    public static getBgAniName(t: any): any {
        var s = "awaken", n = ConfigServer["effect"]["awakenBgAni"];
        return n && n[t] && (s = n[t]), s;
    }

    public static getBgAniNeedAdd(t: any): any {
        var s = !0, n = ConfigServer["effect"]["awakenBgAniAdd"];
        return n && n["hasOwnProperty"](t) && (s = n[t]), s;
    }

    public static getHeadFrameSkin(t: any, i: any): any {
        var n = "later/bar_11_3.png";
        if (i) {
            var h = (<any>sg.model.ModelHero)["getCfg"](i);
            if (h && h["state"] < 0) return n;
        }
        var o = ConfigServer["effect"]["awakenHeadFrame"];
        return o && o[t] && (n = AssetsManager["getAssetLater"](o[t])), n;
    }

    public static getHeroAwakenInfo(t: any, i: any): any {
        var h = "";
        if (i >= 2) {
            var o = ModelAwaken["getHeroAwakenCfg"](t, i);
            if (o) {
                var r = "", a = o["pattern"];
                a && (r += sg.jigsaw.model.ModelJigsawPure["getPatternArrInfo"](a));
                var l = o["item"];
                l && (r && (r += StringUtil["getSpace"](!1, 1)), r += Tools["getMsgById"]("test_0006", [ModelItem["getItemName"](l[0]), l[1]]));
                var c = ModelAwaken["getPreName"](i, o, !0);
                h += c = Tools["getMsgById"]("test_0009", [c, r]), h += c = sg.fight.logic.utils.FightStrUtils["getShowDayInfo"](o);
            } else h = Tools["getMsgById"]("test_0037", [ModelAwaken["getPreName"](i)]);
            h && (h = ColorManager["getUIColor"]("FONT_COLOR_NULL") + ColorManager["getUIColor"]("FONT_COLOR_RED") + h);
        }
        return h;
    }

    public static getHeroAwakenCfg(t: any, i: any): any {
        if (i >= 2) {
            var n = (<any>sg.model.ModelHeroPure)["getCfg"](t);
            if (n) return n["awaken" + i];
        }
        return null;
    }

    public static getPreId(t: any): any {
        return "awaken" + t["substr"](4);
    }

    public static getMsgId(t: any, i: any): any {
        var h = ModelAwaken["getPreId"](t) + "_info";
        return i > 1 && (h += "_" + i), h;
    }

    public static hasMsg(t: any, i: any): any {
        var h = ModelAwaken["getMsgId"](t, i);
        return Tools["hasMsgById"](h);
    }

    public static getNoAwakenInfo(t: any): any {
        var n = t["hid"], h = t["awaken"], o = ModelAwaken["getCfgKey"](n, h), r = ModelAwaken["getConfig"](o), a = Tools["getMsgById"]("test_0038", [ModelAwaken["getPreName"](h, r)]);
        return ColorManager["getUIColor"]("FONT_COLOR_NULL") + a;
    }

    public static getAwakenMaxHeroNum(t: any): any {
        var s = 0;
        for (var n in ModelManager["instance"]["modelUser"]["hero"]) {
            var h = ModelManager["instance"]["modelUser"]["hero"][n];
            (h["hasOwnProperty"]("awaken_max") && h["awaken_max"] == t || h["hasOwnProperty"]("awaken") && 1 == t) && s++;
        }
        return s;
    }

    public static awakenModels: any = {};
}

/**
 * 注册身份等价物：原文 o(s,e(12928),i)（池化名 e(12928)="sg.model.ModelAwaken"，
 * i=Ns=sg.model.ModelBase）。base 传 null：tsc extends 已建原型链，注册仅重放命名
 * 空间挂载身份（batch-a-report「注册等价决策」，同 ModelItem/ModelXYZ2）。
 */
Laya.class(ModelAwaken, "sg.model.ModelAwaken", null, null);
