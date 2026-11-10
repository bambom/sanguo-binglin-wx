/**
 * sg.model.ModelItem —— 道具模型（背包装配/品质/图标/来源/CD 道具/合成），
 * ModelProp 构造器直接 new ×6（food/wood/iron/gold/coin/merit 货币槽）。
 *
 * 原文：code1.js 字节 [2216912,2222427)（off 2217270，池化注册名 e(6604)，包装变量 yr，
 * IIFE 实参基类 i=Ns=sg.model.ModelBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-f/ModelItem.js
 *
 * 入批依据：ModelProp ctor `this.food=new sg.model.ModelItem()` 等 ×6
 * （ModelManager.init 第 5 个 new，100% 立即触发，批次 F「ctor 直 new 才扩」）。
 * 依赖（批次 A/B/D 直引）：vs=Tools、Gt=ConfigServer、ae=ColorManager、tn=ViewManager、
 * ue=ModelManager、re=AssetsManager、be=sg.map.utils.TestUtils、K=laya.maths.MathUtil。
 * 批次外全局注册路径：Gr=sg.model.ModelSkill、Go=sg.model.ModelBeast、
 * bo=sg.god.model.ModelGodMain、Pt=sg.boundFor.FuncChecker、Pr=sg.model.ModelRune、
 * nr=sg.model.ModelEquip、Wr=sg.model.ModelSoul、_r=sg.model.ModelHero。
 * 静态自引：getIconUrl/getItemIconAssetUI 内 `sg.model.ModelItem.getItemIcon` 全局路径
 * （原文如此；运行时与真类同对象，Laya.class 注册后等价）。
 *
 * 保真注记：info getter 的 skill 分支模板串；num getter 的 `this._num=s.getMyItemNum
 * (this.id),this._num` 双求值；getMyItemNum 的货币短路赋值链；material_type_ui/
 * material_type_ui_bg 为 h(s,[...]) 惰性静态（首次访问装配并写回）。
 */
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { ColorManager } from "../manager/ColorManager";
import { ViewManager } from "../manager/ViewManager";
import { AssetsManager } from "../manager/AssetsManager";

export class ModelItem extends ModelBase {

    public id: any = null;
    public name: any = null;
    public _info: any = null;
    public icon: any = null;
    public type: any = NaN;
    public source: any = null;
    /** 原文拼写 ratity（非 rarity） */
    public ratity: any = 0;
    public index: any = NaN;
    public _num: any = 0;
    public addNum: any = 0;
    public boxT: any = null;
    public awardid: any = null;
    public range: any = null;
    public isNew: any = 1;
    public equip_info: any = null;
    public compose: any = null;

    constructor() {
        super();  // 原文 s.__super.call(this)
    }

    public initData(t: any, i: any, s: any, n: any, h: any, o: any, r: any, a: any, l: any): ModelItem {
        if (this.id = i, this.name = Tools.getMsgById(t), this._info = s, this.type = n, this.icon = h, this.source = o, this.ratity = r, this.index = a, this.boxT = l, ConfigServer.property.hasOwnProperty(this.id)) {
            var u = ConfigServer.property[this.id], d = u.hasOwnProperty("equip_info") ? u.equip_info : "";
            typeof d == "string" ? this.equip_info = "" == d ? [] : [d] : this.equip_info = d, 0 == this.equip_info.length && (this.equip_info = null), this.compose = u.hasOwnProperty("compose") ? u.compose : null;
        }
        return this;
    }

    public getModelSkill(): any {
        var i = this.id.substr(4);
        return sg.model.ModelSkill.getModel("skill" + i);
    }

    public getName(t?: boolean, i?: boolean): any {
        void 0 === t && (t = !1),
            void 0 === i && (i = !1);
        var n = this.name;
        return t && sg.map.utils.TestUtils.isTestShow && (n += (i ? "\n" : " ") + this.id),
            n;
    }

    public getColor(): any {
        var i = this.ratity;
        return i <= 0 && (i = 0),
            i > ColorManager.getUIColor("FONT_COLORS").length - 1 && (i = ColorManager.getUIColor("FONT_COLORS").length - 1),
            ColorManager.getUIColor("FONT_COLORS")[i];
    }

    public isCanOpen(t: any, i?: boolean): boolean {
        if (void 0 === i && (i = !0), 10 == this.type) {
            if (t + sg.model.ModelBeast.getBagCurNum() > sg.model.ModelBeast.getBagTotalNum()) return i && ViewManager.instance.showTipsTxt(Tools.getMsgById("_beast_tips10")), !1;
        } else if (11 == this.type && t + sg.god.model.ModelGodMain.instance.godCurNum > sg.god.model.ModelGodMain.instance.godLimitNum) return i && ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0012")),
            !1;
        return !0;
    }

    public itemInNativeCfg(): any {
        if (0 == this.type) {
            var i = ConfigServer.nativeCfg;
            if (i[this.id]) return i[this.id];
        }
        return null;
    }

    public cityHaveTC(): any[] {
        var i = [];
        if (0 == this.type) {
            var s = ConfigServer.city;
            for (var n in s) {
                var h = s[n];
                if (h.trade) -1 != h.trade.indexOf(this.id) && (h.id = n, i.push(h));
            }
        }
        return i;
    }

    public hasSource(): boolean {
        return !!this.source || 3 == this.type;
    }

    public canOpen(): boolean {
        return !!this.boxT;
    }

    public canCompose(): boolean {
        return !!this.compose;
    }

    /* ---- r(0,a,name,getter) 实例 getter ---- */
    public get info(): any {
        var i = this.getModelSkill();
        return i ? Tools.getMsgById("skill_type") + "：" + i.getTypeStr() + "\n" + i.getReplaceHtml("info", 1, !1) : Tools.getMsgById(this._info);
    }

    public get num(): any {
        return this._num = ModelItem.getMyItemNum(this.id), this._num;
    }

    /* ---- 静态面 ---- */
    public static getBuildingUpdateItems(t?: any): any[] {
        void 0 === t && (t = 0);
        var s = [],
            n = ConfigServer.system_simple.item_cd[t],
            h = ModelManager.instance.modelUser.property;
        for (var o in n) {
            var r = 0;
            h[o] && (r = h[o]), s.push({
                id: o, cd: n[o], num: r
            });
        }
        return s.sort(<any>laya.maths.MathUtil.sortByKey("id", !1, !1)),
            s;
    }

    public static getMyItemNum(t: any): any {
        var s = 0;
        return (t == "coin" || t == "gold" || t == "food" || t == "wood" || t == "iron" || t == "merit") && (s = ModelManager.instance.modelUser[t]),
            ModelManager.instance.modelUser.property.hasOwnProperty(t) && (s = ModelManager.instance.modelUser.property[t]),
            s;
    }

    public static getItemQuality(t: any): any {
        var s = 0;
        return ConfigServer.property.hasOwnProperty(t) && (s = ConfigServer.property[t].quality),
            s;
    }

    public static getItemType(t: any): any {
        var s = 0;
        return ConfigServer.property.hasOwnProperty(t) && (s = ConfigServer.property[t].type),
            s;
    }

    public static getItemIcon(t: any, i?: any): any {
        void 0 === i && (i = !0);
        var h = ModelItem.getCostIcon(t, i);
        return Tools.isNullString(h) && (ConfigServer.property.hasOwnProperty(t) ? h = ConfigServer.property[t].icon : ConfigServer.nativeCfg.hasOwnProperty(t) && (h = t + ".png")),
            h;
    }

    public static getIconUrl(t: any): any {
        return t == "coin" || t == "gold" || t == "wood" || t == "food" || t == "iron" || t == "merit" || t == "token" ? AssetsManager.getAssetLater(sg.model.ModelItem.getItemIcon(t, !0)) : AssetsManager.getAssetsICON(sg.model.ModelItem.getItemIcon(t, !0));
    }

    public static getItemInfo(t: any): any {
        var s = "";
        return ConfigServer.property.hasOwnProperty(t) && (s = ConfigServer.property[t].info, s = Tools.getMsgById(s)),
            s;
    }

    public static getItemIDByHero(t: any): string {
        return t.replace("hero", "item");
    }

    public static getItemIconAssetUI(t: any, i?: any): any {
        void 0 === i && (i = !0);
        var h = ModelItem.getCostIcon(t, i),
            o = ModelItem.getItemIcon(t, i);
        return i && !Tools.isNullString(h) ? AssetsManager.getAssetLater(h) : AssetsManager.getAssetsICON(o, !Tools.isNullString(h));
    }

    public static getCostIcon(t: any, i?: any): any {
        void 0 === i && (i = !0);
        var h = i ? ModelItem.material_type_ui_bg : ModelItem.material_type_ui;
        return h[t] ? h[t] : "";
    }

    public static getItemSource(t: any): any[] {
        var s = [],
            n = ModelManager.instance.modelProp.getItemProp(t);
        if (!n || !n.source) return s;
        for (var h = 1; h < 99; ++h) {
            var o = n.source[h];
            if (!o) break;
            var r = o.gotoArr.check || o.gotoArr.panelID;
            if (r) if (!sg.boundFor.FuncChecker.check(r)) continue;
            var a = {
                index: h, title: o.getway, gotoArr: o.gotoArr, icon: AssetsManager.getAssetLater(o.icon + ".png"), show: o.hasOwnProperty("show") ? o.show : 1
            };
            s.push(a);
        }
        return s;
    }

    public static getItemName(t: any): any {
        var s = "";
        if (ModelManager.instance.modelProp.getItemProp(t)) s = ModelManager.instance.modelProp.getItemProp(t).name;
        else if (-1 != t.indexOf("star")) {
            var n = t.substr(0, 6), h = new sg.model.ModelRune();
            h.initData(n, ConfigServer.star[n]), s = h.getName();
        }
        else -1 != t.indexOf("equip") ? s = sg.model.ModelEquip.getName(t, 0) : -1 != t.indexOf("title") ? s = Tools.getMsgById(t) : -1 != t.indexOf("soul") ? s = sg.model.ModelSoul.getName(t) : -1 != t.indexOf("hero") ? s = sg.model.ModelHero.getHeroName(t, 1) : -1 != t.indexOf(ModelManager.instance.modelProp.KEY_FACE) ? s = Tools.getMsgById("face_" + t) : 0 == t.indexOf(ModelManager.instance.modelProp.KEY_TC) && (s = Tools.getMsgById(t + "_name"));
        return s;
    }

    public static checkCDitemStatus(t: any, i: any, n: any, h?: any): any[] {
        void 0 === h && (h = 0);
        var r = [0, 0],
            a = ModelItem.getMyItemNum(t);
        if (i > a) return r[0] = -1,
            r;
        var l = ModelItem.getCDitemNum(t, h),
            c = l * i - .001 * n / 60,
            u = i - Math.floor(c / l);
        return c >= l && u >= a && (r[1] = u),
            r;
    }

    public static getCDitemNum(t: any, i?: any): any {
        return void 0 === i && (i = 0),
            ConfigServer.system_simple.item_cd[i][t];
    }

    public static checkItemGotoBag(t: any): boolean {
        var s = !1;
        return (ModelManager.instance.modelProp.getItemProp(t) || -1 != t.indexOf("sale")) && (s = !0),
            s;
    }

    /* ---- h(s,[...]) 惰性静态：首次访问装配并 defineProperty 写回
     *（ModelGame/ModelUser 惰性静态同款换写，batch-d §13 注记） ---- */
    public static get material_type_ui(): any {
        var v = {
            merit: "img_icon_08.png", gold: "img_icon_04.png", food: "img_icon_05.png", wood: "img_icon_06.png", iron: "img_icon_07.png", coin: "img_icon_09.png", token: "img_icon_11.png"
        };
        Object.defineProperty(ModelItem, "material_type_ui", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get material_type_ui_bg(): any {
        var v = {
            merit: "img_icon_08_big.png", gold: "img_icon_04_big.png", food: "img_icon_05_big.png", wood: "img_icon_06_big.png", iron: "img_icon_07_big.png", coin: "img_icon_09_big.png", token: "img_icon_11_big.png"
        };
        Object.defineProperty(ModelItem, "material_type_ui_bg", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelItem",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelItem, "sg.model.ModelItem", null, null);
