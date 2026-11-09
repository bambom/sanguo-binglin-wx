/**
 * sg.manager.AssetsManager —— 资源路径工厂与预载调度：分目录 getVersionStr 取址
 * （hero/army/fight/country/ad/icon/…）、大图 LRU（storeMax 限制 + 显示链保活判定）、
 * 图集/动画/粒子装配（formatAssets/getAnimationAssets）、串行预载队列
 * （preLoadAniTasks → LoadeManager.loadImg）、动画模板分组创建
 * （createAnimationMap/createAnimationComplete）、位图字体内建（fightFont）、
 * 合服资源映射（modifyResourceVersion）。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类；实例部分为各目录的容量缓存器
 * （mHeroBigIconAssets 等 4 个惰性静态实例），静态部分为全局工厂。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/AssetsManager.js
 *
 * 模块直引：ue=ModelManager、Rt=ConfigApp、Gt=ConfigServer、Ft=ConfigAssets、
 * Js=LoadeManager、be=TestUtils、Ts=Trace；
 * 引擎：Y=laya.net.Loader、rt=laya.net.ResourceVersion、s=Laya、a=laya.display.Animation、
 * u=laya.display.BitmapFont、pt=laya.display.Text、P=laya.utils.Handler；
 * 批次外环境声明：_r=sg.model.ModelHero（HERO000）、yr=sg.model.ModelItem（getItemIcon）、
 * Mi=sg.fight.logic.utils.FightPrint（print）。
 * 原文自引 sg.manager.AssetsManager → TS 类直引。
 */
import { ModelManager } from "./ModelManager";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigAssets } from "../cfg/ConfigAssets";
import { LoadeManager } from "./LoadeManager";
import { TestUtils } from "../map/utils/TestUtils";
import { Trace } from "../laya/Trace";

export class AssetsManager {

    constructor() {
        this.img_url_dic = [];
        this.storeMax = 0;
        this.time_check = 5e3;
        this.time_del = 1e4;
    }

    public img_url_dic: string[];
    public storeMax: number;
    public time_check: number;
    public time_del: number;

    /** 记录使用顺序并在超容量时清理“未被显示”的最旧图 */
    public checkAssetTempArr(t: string, i: number): string {
        if ((this.storeMax = i, this.storeMax > 0) && (this.img_url_dic.indexOf(t) < 0 && this.img_url_dic.unshift(t), this.img_url_dic.length > this.storeMax)) {
            AssetsManager.storeImgs = AssetsManager.storeImgs.filter(this.imageDisplayed, this);
            var e = AssetsManager.storeImgs.map(function (t: any) {
                return t.skin;
            }), s = this.img_url_dic.filter(function (t: string) {
                return -1 === e.indexOf(t);
            });
            if (s.length) {
                var n = this.img_url_dic.indexOf(s[s.length - 1]), h = this.img_url_dic.splice(n, 1)[0];
                h !== t && LoadeManager.clearRes(h, !0);
            }
        }
        return t;
    }

    /** 递归判定节点是否仍在舞台显示链上 */
    public imageDisplayed(t: any): boolean {
        return !!t.parent && (t.parent instanceof laya.display.Stage || this.imageDisplayed(t.parent));
    }

    public clearAll(): void {
        Trace.log("清理 big hero 大图片", this.img_url_dic);
        for (var t = this.img_url_dic.length, i = 0; i < t; i++) laya.net.Loader.clearRes(this.img_url_dic[i], !0);
        this.img_url_dic = [];
    }

    /** 版本化目前为恒等（ResourceVersion.manifest 由引擎侧处理） */
    public static getVersionStr(t: string): string {
        return t;
    }

    public static clearTempAll(): void {
        AssetsManager.mHeroBigIconAssets.clearAll(),
            LoadeManager.clearTemp();
    }

    /** 合服时同名 .ani 资源成对替换（.png/.atlas 同步） */
    public static modifyAnimation(i: any, e: string, s: string): void {
        var n = /(\w+)\.ani$/;
        if (i[e] && i[s]) {
            var h = e.match(n)[1], o = s.match(n)[1],
                r = AssetsManager.getAnimationAssets(h), a = AssetsManager.getAnimationAssets(o);
            r && a && (i[r[0].url] = i[a[0].url], i[r[1].url] = i[a[1].url]);
        }
    }

    /** 合服映射写回 ResourceVersion.manifest */
    public static modifyResourceVersion(): void {
        var i = laya.net.ResourceVersion.manifest;
        if (ModelManager.instance.modelUser.isMergeMaps && i) {
            var e = ModelManager.instance.modelUser.mergeNum,
                s = ConfigServer.system_simple.resource_map || {};
            for (var n in s) {
                var h = s[n];
                h && h[e] && (/\.ani/.test(n) ? AssetsManager.modifyAnimation(i, n, h[e]) : i[n] = i[h[e]]);
            }
        }
    }

    /** e=!0 小图（容量 0），否则大图（容量 5）；缺图回退 HERO000 */
    public static getAssetsHero(i: string, e: boolean): string {
        var s = laya.net.ResourceVersion.manifest, n = !1;
        return e ? (s && s[AssetsManager.getVersionStr("hero/" + i + "_m.png")] && (n = !0),
            AssetsManager.mHeroSmIconAssets.checkAssetTempArr(AssetsManager.getVersionStr("hero/" + (n ? i : sg.model.ModelHero.HERO000) + "_m.png"), 0))
            : (s && s[AssetsManager.getVersionStr("hero/" + i + ".png")] && (n = !0),
                AssetsManager.mHeroBigIconAssets.checkAssetTempArr(AssetsManager.getVersionStr("hero/" + (n ? i : sg.model.ModelHero.HERO000) + ".png"), 5));
    }

    public static getAssetsCOMP(i: string): string {
        return AssetsManager.getVersionStr("comp/" + i);
    }

    public static getAssetsUI(i: string): string {
        return AssetsManager.getVersionStr("ui/" + i);
    }

    public static getAssetsQQDT(i: string): string {
        return AssetsManager.getVersionStr("lanzuan/" + i);
    }

    public static getAssetsCountry(i: string): string {
        return ModelManager.instance.modelUser.isMergeMaps ? AssetsManager.getVersionStr("countryMap0/" + i)
            : AssetsManager.getVersionStr((ConfigApp.isHorizontal ? "countryPC/" : "country/") + i);
    }

    public static getAssetsAD(i: string): string {
        return AssetsManager.getVersionStr("ad/" + i);
    }

    public static getAssetsArmy(i: string): string {
        return AssetsManager.mArmyIconAssets.checkAssetTempArr(AssetsManager.getVersionStr("army/" + i + ".png"), 0);
    }

    public static getAssetsFight(i: string, e?: boolean): string {
        return void 0 === e && (e = !0), AssetsManager.getVersionStr("fight/" + i + (e ? ".png" : ".jpg"));
    }

    public static getAssetsFightScene(i: string, e?: boolean): string {
        return void 0 === e && (e = !0), AssetsManager.getVersionStr("fight_scene/" + i + (e ? ".png" : ".jpg"));
    }

    public static getAssetsFightSceneSlant(i: string, e?: boolean): string {
        return void 0 === e && (e = !0), AssetsManager.getVersionStr("fight_scene_s/" + i + (e ? ".png" : ".jpg"));
    }

    public static getAssetsOther(i: string): string {
        return AssetsManager.mBuildIconAssets.checkAssetTempArr(AssetsManager.getVersionStr("build/" + i), 0);
    }

    public static getAssetsScience(i: string): string {
        return AssetsManager.getVersionStr("science/" + i);
    }

    /** e=!0 时等价 getAssetsUI（原文分支保留） */
    public static getAssetsICON(i: string, e?: boolean): string {
        return void 0 === e && (e = !1), e ? AssetsManager.getAssetsUI(i) : AssetsManager.getVersionStr("icon/" + i);
    }

    public static getAssetsNavigate(i: string): string {
        return AssetsManager.getVersionStr("home/navigate/" + i);
    }

    public static getAssetLater(i: string): string {
        return AssetsManager.getVersionStr("later/" + i);
    }

    public static getAssetFace(i: string): string {
        return AssetsManager.getVersionStr("face/" + i);
    }

    public static getAssetGod(i: string): string {
        return laya.net.ResourceVersion.manifest["hero/" + i] ? AssetsManager.getVersionStr("hero/" + i)
            : AssetsManager.getVersionStr("hero/hero000_m.png");
    }

    public static getAssetByFolder(i: string, e: string): string {
        var s = "";
        switch (e) {
            case "later":
            case "ui":
            case "icon":
                s = AssetsManager.getVersionStr(e + "/" + i);
        }
        return s;
    }

    /** 货币键 → 小图标；item 前缀走 ModelItem.getItemIcon */
    public static getAssetItemOrPayByID(i: string): string {
        if ("" == i) return "";
        var e = "img_icon_10.png";
        switch (i) {
            case "gold": e = "img_icon_04.png"; break;
            case "food": e = "img_icon_05.png"; break;
            case "wood": e = "img_icon_06.png"; break;
            case "iron": e = "img_icon_07.png"; break;
            case "coin": e = "img_icon_09.png"; break;
            case "merit": e = "img_icon_08.png";
        }
        return -1 != i.indexOf("item") ? AssetsManager.getAssetsICON(sg.model.ModelItem.getItemIcon(i)) : AssetsManager.getAssetsUI(e);
    }

    public static getAssetPayIconBig(i: string): string {
        var e = "img_icon_04_big.png";
        switch (i) {
            case "coin": e = "img_icon_09_big.png"; break;
            case "gold": e = "img_icon_04_big.png"; break;
            case "food": e = "img_icon_05_big.png"; break;
            case "wood": e = "img_icon_06_big.png"; break;
            case "iron": e = "img_icon_07_big.png"; break;
            case "merit": e = "img_icon_08_big.png";
        }
        return -1 != i.indexOf("item") ? AssetsManager.getAssetsICON(sg.model.ModelItem.getItemIcon(i)) : AssetsManager.getAssetLater(e);
    }

    public static getUrlAtlas(t: string): string {
        return "res/atlas/clip/" + t + ".atlas";
    }

    public static getUrlAnimation(t: string): string {
        var i = "clips/" + t;
        return i += ".ani";
    }

    public static getUrlParticle(t: string): string {
        return "particle/" + t + ".part";
    }

    public static getUrlSkeleton(t: string): string {
        return "spine/" + t + "/skeleton.sk";
    }

    /** e：0 清图、1 清图集（noAtlasAnimations 除外）、-1 递归逐项 */
    public static clearAssets(i: any, e: number): void {
        var n: any, h: string, o = 0, r = 0;
        if (i instanceof Array) {
            if (n = i, -1 == e) {
                for (r = n.length, o = 0; o < r; o++) AssetsManager.clearAssets(n[o], o);
                return;
            }
        } else {
            if ("string" != typeof i) return;
            n = [i];
        }
        for (r = n.length, o = 0; o < r; o++)
            if (h = n[o], 0 == e) Laya.loader.clearTextureRes(h);
            else if (1 == e && !ConfigAssets.noAtlasAnimations[h]) {
                var a = AssetsManager.getUrlAtlas(h);
                Laya.loader.clearTextureRes(a);
            }
    }

    /** 0 图片 / 1 动画（图集+json，去重）/ 2 粒子；返回装配方清单 */
    public static formatAssets(i: any, e: number, s?: any[], n?: boolean): any[] {
        var h: any;
        void 0 === n && (n = !0);
        var o: string, r = 0, a = 0;
        if (i instanceof Array) {
            if (h = i, -1 == e) {
                for (a = h.length, r = 0; r < a; r++) AssetsManager.formatAssets(h[r], r, s, n);
                return s;
            }
        } else {
            if ("string" != typeof i) return null;
            h = [i];
        }
        for (null == s && (s = []), a = h.length, r = 0; r < a; r++)
            if (o = h[r], 0 == e) {
                if (AssetsManager.loadedImages.hasOwnProperty(o)) continue;
                AssetsManager.loadedImages[o] = o, s.push({ url: o });
            } else if (1 == e) {
                if (n && AssetsManager.loadedAnimations.hasOwnProperty(o)) continue;
                AssetsManager.loadedAnimations[o] = o, s = AssetsManager.getAnimationAssets(o, s);
            } else if (2 == e) {
                if (AssetsManager.loadedParticles.hasOwnProperty(o)) continue;
                AssetsManager.loadedParticles[o] = o, s = AssetsManager.getParticleAssets(o, s);
            }
        return s;
    }

    public static getAnimationAssets(t: string, i?: any[]): any[] {
        return null == i && (i = []),
            ConfigAssets.noAtlasAnimations && ConfigAssets.noAtlasAnimations[t] || i.push({ url: AssetsManager.getUrlAtlas(t), type: "atlas" }),
            i.push({ url: AssetsManager.getUrlAnimation(t), type: "json" }),
            i;
    }

    public static getParticleAssets(t: string, i?: any[]): any[] {
        return null == i && (i = []),
            i.push({ url: AssetsManager.getUrlParticle(t), type: "json" }),
            i;
    }

    public static preLoadAssets2(i: any[], e?: any, s?: any, n?: any): void {
        AssetsManager.preLoadAssets(i[0], i[1], i[2], e, s, n);
    }

    /** 已全部载入（loadedAnimations 命中且 framesMap 有模板）则直接回调，否则入串行队列 */
    public static preLoadAssets(i: any, e: any, s: any, n?: any, h?: any, o?: any): void {
        if (!i && !s && e) {
            var r = 0, l = e.length, c = 0;
            for (r = 0; r < l; r++) {
                var u = e[r];
                if (u == AssetsManager.loadedAnimations[u]) {
                    var d = AssetsManager.getUrlAnimation(u);
                    if (!laya.display.Animation.framesMap[d + "#"]) break;
                    c++;
                }
            }
            if (c == l) return void (h && h.apply(n, o));
        }
        var _: any = {};
        _.imgArr = i, _.aniArr = e, _.partArr = s, _.caller = n, _.onCompletefun = h, _.args = o,
            AssetsManager.preLoadAniTasks.push(_),
            1 == AssetsManager.preLoadAniTasks.length && AssetsManager.doNextPreLoadAniTask();
    }

    public static doNextPreLoadAniTask(): void {
        if (AssetsManager.preLoadAniTasks.length > 0) {
            var i = AssetsManager.preLoadAniTasks[0], e: any[] = [];
            i.imgArr && AssetsManager.formatAssets(i.imgArr, 0, e),
                i.aniArr && AssetsManager.formatAssets(i.aniArr, 1, e),
                null != i.partArr && AssetsManager.formatAssets(i.partArr, 2, e),
                e.length > 0 ? LoadeManager.loadImg(e, laya.utils.Handler.create(null, function () {
                    AssetsManager.completePreLoadAniTask();
                })) : AssetsManager.completePreLoadAniTask();
        } else AssetsManager.completeAllPreLoadAniTask();
    }

    public static completePreLoadAniTask(): void {
        var i = AssetsManager.preLoadAniTasks.shift();
        AssetsManager.preLoadAniCompleteTasks.push(i),
            AssetsManager.doNextPreLoadAniTask();
    }

    public static completeAllPreLoadAniTask(): void {
        for (var i = AssetsManager.preLoadAniCompleteTasks.length, e = 0; e < i; e++) {
            var s = AssetsManager.preLoadAniCompleteTasks.shift();
            s && AssetsManager.createAnimationMap(s.aniArr, s.caller, s.onCompletefun, s.args);
        }
    }

    /** 按 framesMap 缺失项建动画模板；同组共享 createAniGroupID，全部就绪后统一回调 */
    public static createAnimationMap(i: any, e: any, s: any, n: any): void {
        if (i && 0 != i.length) {
            var h: any, o: any, r: any, l: any, c: string, u: string, d: any, _ = 0, m = 0, g: any[] = [];
            for (m = i.length, _ = 0; _ < m; _++)
                (c = i[_]).indexOf(".efc") > -1 || c == AssetsManager.loadedAnimations[c] && (
                    u = AssetsManager.getUrlAnimation(c),
                        laya.display.Animation.framesMap[u + "#"] || (
                            s && (h || (
                                AssetsManager.createAniGroupID++,
                                    h = { aniArr: o = [], caller: e, onCompletefun: s, args: n },
                                    AssetsManager.creatingAniGroupObj[AssetsManager.createAniGroupID] = h
                            ), o.push(c)),
                                (r = AssetsManager.creatingAniGroupMapping[c]) ? s && r.push(AssetsManager.createAniGroupID)
                                    : (r = [], AssetsManager.creatingAniGroupMapping[c] = r, s && r.push(AssetsManager.createAniGroupID),
                                        l = [c, u, d = new laya.display.Animation()], g.push(l))
                        )
                );
            if (m = g.length)
                for (_ = 0; _ < m; _++) {
                    var f: any;
                    c = (l = g[_])[0], u = l[1], d = l[2],
                        TestUtils.testAni && sg.fight.logic.utils.FightPrint.print("开始创建动画模板：" + c, null, "#66CC33"),
                        f = laya.utils.Handler.create(null, AssetsManager.createAnimationComplete, [c, d], !0),
                        d.loadAnimation(u, f);
                }
            else s && (h || s.apply(e, n));
        } else s && s.apply(e, n);
    }

    public static createAnimationComplete(i: string, e: any): void {
        var s: any, n: any, h: any, o = 0, r = AssetsManager.creatingAniGroupMapping[i], a = 0, l = r.length;
        for (TestUtils.testAni && sg.fight.logic.utils.FightPrint.print("动画模板创建完成：" + i, null, "#33CC66"),
                 a = 0; a < l; a++)
            if (s = r[a], (n = AssetsManager.creatingAniGroupObj[s]) && (o = (h = n.aniArr).indexOf(i)) >= 0 && (h.splice(o, 1), 0 == h.length)) {
                var c = n.onCompletefun, u = n.caller, d = n.args;
                c.apply(u, d), delete AssetsManager.creatingAniGroupObj[s];
            }
        e.clear(), delete AssetsManager.creatingAniGroupMapping[i];
    }

    public static preloadWelcomeScreen(t?: any, i?: any, e?: any): void {
        AssetsManager.preLoadAssets(ConfigAssets.WelcomeScreenImg, ConfigAssets.WelcomeScreenAni, null, t, i, e);
    }

    public static unloadWelcomeScreen(): void {
    }

    /** 串行：字体载入 → 注册 → 预载开场动画，再回调外部方法 */
    public static loadOthers(t: any, i: any, e: any): void {
        AssetsManager.m_caller = t,
            AssetsManager.m_method = i,
            AssetsManager.m_args = e,
            AssetsManager.m_nextArr = [AssetsManager.loadFonts, AssetsManager.initFonts, AssetsManager.loadAnimations],
            AssetsManager.nextLoad();
    }

    public static nextLoad(): void {
        AssetsManager.m_nextArr.length > 0 ? AssetsManager.m_nextArr.shift()()
            : AssetsManager.m_method ? AssetsManager.m_method.apply(AssetsManager.m_caller, AssetsManager.m_args)
                : console.log("AssetsManager.m_method缺失!");
    }

    public static loadFonts(): void {
        AssetsManager.m_bitmapFont = new laya.display.BitmapFont(),
            AssetsManager.m_bitmapFont.loadFont("bitmapFont/fightFont.fnt", laya.utils.Handler.create(null, AssetsManager.nextLoad));
    }

    public static initFonts(): void {
        AssetsManager.m_bitmapFont.setSpaceWidth(40),
            laya.display.Text.registerBitmapFont("fightFont", AssetsManager.m_bitmapFont),
            AssetsManager.nextLoad();
    }

    public static loadAnimations(): void {
        AssetsManager.preLoadAssets(null, ConfigAssets.InitAniArray, null, null, AssetsManager.nextLoad);
    }

    /** atlas 文件报错时取末段名（非 atlas 返回 null） */
    public static getErrorSrcName(t: string): any {
        var i = t.split(".");
        if ("atlas" == i[1]) return null;
        var e = i[0].split("/");
        return e[e.length - 1];
    }

    public static IMG_RES_UI: string = "ui/";
    public static IMG_QQDT_UI: string = "lanzuan/";
    public static IMG_RES_COMP: string = "comp/";
    public static IMG_RES_AD: string = "ad/";
    public static IMG_RES_ICON: string = "icon/";
    public static IMG_RES_HERO: string = "hero/";
    public static IMG_RES_BUILD: string = "build/";
    public static IMG_RES_ARMY: string = "army/";
    public static IMG_RES_SCIENCE: string = "science/";
    public static IMG_RES_NAVIGATE: string = "home/navigate/";
    public static IMG_RES_FIGHT: string = "fight/";
    public static IMG_RES_FIGHT_SCENE: string = "fight_scene/";
    public static IMG_RES_FIGHT_SCENE_S: string = "fight_scene_s/";
    public static IMG_RES_COUNTRY: string = "country/";
    public static IMG_RES_LATER: string = "later/";
    public static IMG_RES_FACE: string = "face/";
    public static IMG_GOLD: string = "img_icon_04.png";
    public static IMG_FOOD: string = "img_icon_05.png";
    public static IMG_WOOD: string = "img_icon_06.png";
    public static IMG_IRON: string = "img_icon_07.png";
    public static IMG_MERIT: string = "img_icon_08.png";
    public static IMG_COIN: string = "img_icon_09.png";
    public static IMG_TOKEN: string = "img_icon_11.png";
    public static FIGHT_FONT: string = "fightFont";
    public static FIGHT_FONT_PATH: string = "bitmapFont/fightFont.fnt";
    public static ATLAS_FOLDER: string = "res/atlas/clip/";
    public static ANI_FOLDER: string = "clips/";
    public static PARTICLE_FOLDER: string = "particle/";
    public static SPINE_FOLDER: string = "spine/";
    public static ATLAS_EXT: string = ".atlas";
    public static ANI_EXT: string = ".ani";
    public static EFC_EXT: string = ".efc";
    public static PART_EXT: string = ".part";
    public static SPINE_EXT: string = ".sk";
    public static PNG_EXT: string = ".png";
    public static JPG_EXT: string = ".jpg";
    public static loadedImages: any = {};
    public static loadedAnimations: any = {};
    public static loadedParticles: any = {};
    public static preLoadAniTasks: any[] = [];
    public static preLoadAniCompleteTasks: any[] = [];
    public static createAniGroupID: number = 0;
    public static creatingAniGroupObj: any = {};
    public static creatingAniGroupMapping: any = {};
    public static storeImgs: any[] = [];
    public static m_caller: any = null;
    public static m_method: any = null;
    public static m_args: any = null;
    public static m_nextArr: any = null;
    public static m_bitmapFont: laya.display.BitmapFont = null;

    /** Laya.static 惰性静态（横竖屏两套顺序） */
    public static get army_icon_building_ui(): string[] {
        var v = ConfigApp.isLandscape ? ["home_20.png", "home_21.png", "home_22.png", "home_23.png"] : ["home_20.png", "home_23.png", "home_21.png", "home_22.png"];
        Object.defineProperty(AssetsManager, "army_icon_building_ui", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get army_icon_building_ui2(): string[] {
        var v = ConfigApp.isLandscape ? ["icon_paopao11.png", "icon_paopao12.png", "icon_paopao13.png", "icon_paopao14.png"] : ["icon_paopao11.png", "icon_paopao13.png", "icon_paopao12.png", "icon_paopao14.png"];
        Object.defineProperty(AssetsManager, "army_icon_building_ui2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get mHeroBigIconAssets(): AssetsManager {
        var v = new AssetsManager();
        Object.defineProperty(AssetsManager, "mHeroBigIconAssets", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get mHeroSmIconAssets(): AssetsManager {
        var v = new AssetsManager();
        Object.defineProperty(AssetsManager, "mHeroSmIconAssets", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get mArmyIconAssets(): AssetsManager {
        var v = new AssetsManager();
        Object.defineProperty(AssetsManager, "mArmyIconAssets", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get mBuildIconAssets(): AssetsManager {
        var v = new AssetsManager();
        Object.defineProperty(AssetsManager, "mBuildIconAssets", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.manager.AssetsManager")（2 参注册，无基类）。
 */
Laya.class(AssetsManager, "sg.manager.AssetsManager", null, null);
