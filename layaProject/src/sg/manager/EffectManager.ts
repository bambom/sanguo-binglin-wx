/**
 * sg.manager.EffectManager —— 特效/动画工具箱：粒子装载（Particle2D）、
 * 动画装载与播放队列（loadAnimation/getAnimation/setAnimationQueue/framesMap
 * 模板复用）、鼠标悬浮提示绑定（MouseTips）、精灵变色/HSB/发光滤镜
 * （ColorFilter/GlowFilter + ColorTool/FightUtils 混色）、缓动辅助
 * （tweenLoop/tweenShake/blinkSprColor）、飞行动效（createIconFlight/
 * spriteFlight/textFlight/labelBezierFlight 贝塞尔）、兵形头像装配、
 * 欢迎界面骨架屏（Spine/欢迎粒子）、英雄升星特效。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类，全静态。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/EffectManager.js
 *
 * 引擎别名：it=laya.particle.Particle2D、ut=laya.display.Sprite、F=laya.ui.Image、
 * _=laya.ui.Box、W=laya.ui.Label、pt=laya.display.Text、a=laya.display.Animation、
 * at=laya.ani.bone.Skeleton、y=laya.filters.ColorFilter、S=laya.filters.GlowFilter、
 * b=laya.debug.tools.ColorTool（d.ts 未收录，经 any）、Ct=laya.utils.Tween、
 * k=laya.utils.Ease、ht=laya.maths.Rectangle、et=laya.maths.Point、P=laya.utils.Handler、
 * s=Laya（s.scaleTimer 引擎 d.ts 未收录，经 any）、m=laya.utils.Browser、rt=ResourceVersion。
 * 模块直引：Js=LoadeManager、re=AssetsManager、Rt=ConfigApp、Gt=ConfigServer、
 * Ft=ConfigAssets、Vt=ConfigUI、ae=ColorManager、Wt=HelpConfig、vs=Tools、be=TestUtils、tn=ViewManager。
 * 批次外环境声明：IK=sg.view.com.MouseTips、Jl=sg.map.model.entitys.EntityCity、
 * si=sg.fight.client.utils.FightLoad、Jt=sg.fight.client.cfg.ConfigFightView、
 * ci=sg.fight.FightMain、Ni=sg.fight.logic.utils.FightUtils、_r=sg.model.ModelHero、
 * _s=sg.utils.Spine、IC=ui.com.item_bagUI、rr=sg.model.ModelFormation、
 * Ot=sg.cfg.ConfigColor（standardMat）。
 * 原文自引 sg.manager.EffectManager → TS 类直引。
 */
import { LoadeManager } from "./LoadeManager";
import { AssetsManager } from "./AssetsManager";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigAssets } from "../cfg/ConfigAssets";
import { ConfigUI } from "../cfg/ConfigUI";
import { ColorManager } from "./ColorManager";
import { HelpConfig } from "../cfg/HelpConfig";
import { Tools } from "../utils/Tools";
import { TestUtils } from "../map/utils/TestUtils";
import { ViewManager } from "./ViewManager";

/** 原文多处 callFunc=function(){...} 为无 var 隐式全局（UMD 作用域泄漏，与 ViewManager.testShowPic 同型）；
 * TS 化 containment 到模块级变量，行为差异见 batch-a-report.md「隐式全局」。 */
var callFunc: any;

export class EffectManager {

    constructor() {
    }

    /** 原文即空实现（由 loadParticle 直接建粒子） */
    public static clearParticle(t: any, i: any): void {
    }

    /** 装载粒子并挂到容器；a 为快进秒数 */
    public static loadParticle(t: string, i?: number, e?: number, n?: any, h?: boolean, o?: number, r?: number, a?: number, l?: number): laya.particle.Particle2D {
        void 0 === i && (i = -1), void 0 === e && (e = -1), void 0 === h && (h = !0),
            void 0 === o && (o = -99999), void 0 === r && (r = -99999), void 0 === a && (a = 0), void 0 === l && (l = 0);
        var c = new laya.particle.Particle2D(null);
        return LoadeManager.loadImg(AssetsManager.getUrlParticle(t), laya.utils.Handler.create(null, function (t: any) {
            c && !c.destroyed && (
                t && (
                    e > 0 && (t.maxPartices = e),
                        i > 0 && (t.emissionRate = i),
                        l > 0 && (t.duration = l),
                        c.setParticleSetting(t), c.emitter.emissionRate = t.emissionRate
                ),
                    null == n || n.destroyed || (
                        h ? n.addChild(c) : n.addChildAt(c, 0),
                            o > -99999 && (c.x = o),
                            r > -99999 && (c.y = r)
                    ),
                    a > 0 && (<any>Laya).scaleTimer.once(100, null, function () {
                        c && c.advanceTime && (<any>c).advanceTime2(a);
                    }),
                    c.play()
            );
        })),
            c;
    }

    public static loadParticleByArr(t: any[], i: any, e: any, s?: number): any[] {
        var n: any[];
        if (void 0 === s && (s = 0), t && t.length > 0) {
            n = [];
            for (var h = t.length, o = 0; o < h; o++) {
                var r = t[o], a = r[5] ? i : e,
                    l = EffectManager.loadParticle(r[0], r[1], r[2], a, r[5], ConfigApp.isLandscape ? 225 : r[3], r[4], s);
                n.push(l);
            }
        }
        return n;
    }

    /** 测试态给节点挂 MouseTips 悬浮说明；i 为说明内容（串或 [串] 或 [[..]]） */
    public static checkMouseTips(t: any, i: any): boolean {
        return !(!t || !TestUtils.isTestShow && !ConfigApp.testFightType) && (
            t.off("mouseover", null, sg.view.com.MouseTips.showMouseTips),
                t.off("mouseout", null, sg.view.com.MouseTips.hideMouseTips),
                !!i
        );
    }

    public static bindMouseTips(i: any, e: any): void {
        if (EffectManager.checkMouseTips(i, e) && (
            "string" == typeof e && (e = [[e]]),
                e instanceof Array && !(e[0] instanceof Array) && (e = [e]),
                e
        ))
            if (i.on("mouseover", null, sg.view.com.MouseTips.showMouseTips, [i, e]),
                i.on("mouseout", null, EffectManager.hideMouseTips),
                i instanceof laya.ui.ComboBox) i.on("change", null, EffectManager.changeMouseTips, [i, e]);
            else if (i instanceof laya.ui.Box)
                for (var s = i, n = s.numChildren, h = 0; h < n; h++) {
                    var o = s.getChildAt(h);
                    o instanceof laya.ui.ComboBox && o.on("change", null, EffectManager.changeMouseTips, [i, e]);
                }
    }

    public static changeMouseTips(i: any, e: any): void {
        EffectManager.testMouseOver(i) && Laya.timer.callLater(null, sg.view.com.MouseTips.showMouseTips, [i, e]);
    }

    public static testMouseOver(i: any): boolean {
        var e = !1;
        if (!EffectManager.testVisible(i)) return e;
        var s = i.mouseX, n = i.mouseY;
        i.scrollRect && (s -= i.scrollRect.x, n -= i.scrollRect.y);
        var h = i.hitArea;
        return h ? e = h.contains(s, n)
            : (i.width > 0 && i.height > 0 || i.mouseThrough) && (
                i.mouseThrough ? e = i.getGraphicBounds().contains(s, n)
                    : ((h = EffectManager._rect).setTo(0, 0, i.width, i.height), e = h.contains(s, n))
            ),
            e;
    }

    public static testVisible(i: any): boolean {
        if (!i.visible) return !1;
        var e = i.parent;
        return e ? !!EffectManager.testVisible(e) : i instanceof laya.display.Stage && i.visible;
    }

    public static hideMouseTips(): void {
        sg.view.com.MouseTips.hideMouseTips();
    }

    public static getHeroAniRes(t: any): any {
        return sg.model.ModelHero.getHeroRes(t);
    }

    /** 缺资源回退默认英雄动画；e=!0 加 "s" 后缀并播 down */
    public static loadHeroAnimation(i: any, e?: boolean, s?: string, n?: number, h?: string): laya.display.Animation {
        var o: any;
        void 0 === e && (e = !0), void 0 === s && (s = ""), void 0 === n && (n = -3), void 0 === h && (h = ""),
            o = EffectManager.getHeroAniRes(i),
            o = sg.fight.client.utils.FightLoad.getPersonResId(o),
            e && (o += "s"),
            ConfigServer.effect.checkRes && !ConfigServer.effect.hasRes.hasOwnProperty(o) && (o = ConfigAssets.DefaultHeroAniName);
        var r = new laya.display.Animation;
        return r = EffectManager.loadAnimation(o, s, n, r, h),
            e ? r.play(0, !0, "down")
                : sg.fight.client.cfg.ConfigFightView.isSlantScene ? r.play(0, !0, "stand_d") : r.play(0, !0, "stand"),
            r;
    }

    public static fillCityAnimation(t: any, i: any, e?: number, s?: number, n?: boolean): void {
        void 0 === e && (e = 1), void 0 === s && (s = .9), void 0 === n && (n = !0);
        var h = sg.map.model.entitys.EntityCity.getCityRes(t), o = h.split("_");
        h = o[0];
        var r = EffectManager.loadAnimation(h);
        if (n) {
            var a = Math.min(i.width / 200, i.height / 150), l = t.getParamConfig("scale");
            ConfigApp.isLandscape ? 9 == t.cityType && (a = .8, l = 1.2)
                : 8 == t.cityType ? (a = .4, l = 1.2)
                    : 9 == t.cityType && (a = .55, l = 1.4),
                l > 1 && (a /= Math.pow(l, s)),
                e *= a, r.scale(e, e), r.x = .5 * i.width, r.y = i.height * (.57 - .03 * (l - 1));
        } else r.x = .5 * i.width, r.y = .5 * i.height;
        o.length > 1 && (r.scaleX *= -1),
            i.addChild(r);
    }

    public static loadAnimationsAndCall(t: any[], i: any, e: any, s: any): void {
        t.length > 0 ? AssetsManager.preLoadAssets(null, t, null, i, e, s) : e.apply(i, s);
    }

    /** 装载单动画并返回占位 Animation；战斗内走 preLoadAssets，否则直载 */
    public static loadAnimationAndCall(i: string, e?: any, s?: any, n?: any, h?: any, o?: string): laya.display.Animation {
        void 0 === o && (o = ""), null == h && (h = new laya.display.Animation);
        var r = AssetsManager.loadedAnimations[i];
        if (r ? i != r && (i = r) : AssetsManager.loadedAnimations[i] = i,
            sg.fight.FightMain.inFight) {
            var l = [i];
            AssetsManager.preLoadAssets(null, l, null, e, s, n);
        } else {
            var c: laya.utils.Handler;
            s && (c = laya.utils.Handler.create(e, s, n));
            var u = AssetsManager.getAnimationAssets(i);
            LoadeManager.loadImg(u, c);
        }
        return EffectManager.ignoreAni[i] || (
            o ? "fight" != o && (
                EffectManager.animationCache.customGroup[o] = EffectManager.animationCache.customGroup[o] || {},
                    EffectManager.animationCache.customGroup[o][i] = 1
            ) : (h.on("undisplay", h, EffectManager.onCacheDisplayHandler, [h, i, "undisplay"]),
                h.on("display", h, EffectManager.onCacheDisplayHandler, [h, i, "display"]))
        ),
            h;
    }

    public static loadAnimation(i: any, e?: string, s?: number, n?: any, h?: string): laya.display.Animation {
        var o: string, l: string;
        void 0 === e && (e = ""), void 0 === s && (s = 0), void 0 === h && (h = ""),
            null == n && (n = new laya.display.Animation),
            "string" == typeof i ? o = i : o = i.res;
        var r = AssetsManager.loadedAnimations[o];
        if (r ? o != r && (o = r) : AssetsManager.loadedAnimations[o] = o,
            l = AssetsManager.getUrlAnimation(o),
            laya.display.Animation.framesMap[l + "#"]) EffectManager.getAnimation(i, e, s, n);
        else {
            var c = AssetsManager.getAnimationAssets(o);
            LoadeManager.loadImg(c, laya.utils.Handler.create(null, EffectManager.getAnimation, [i, e, s, n]));
        }
        return EffectManager.ignoreAni[o] || (
            h ? "fight" != h && (
                EffectManager.animationCache.customGroup[h] = EffectManager.animationCache.customGroup[h] || {},
                    EffectManager.animationCache.customGroup[h][o] = 1
            ) : (n.on("undisplay", n, EffectManager.onCacheDisplayHandler, [n, o, "undisplay"]),
                n.on("display", n, EffectManager.onCacheDisplayHandler, [n, o, "display"]))
        ),
            n;
    }

    /** 按描述数组批量装节点（ani/img），bg 项垫底 */
    public static loadResArr(i: any[], e?: any): laya.display.Sprite {
        null == e && (e = new laya.display.Sprite);
        for (var s = 0; s < i.length; s++) {
            var n = i[s], h = EffectManager.loadResOne(n);
            n.bg ? e.addChildAt(h, 0) : e.addChild(h);
        }
        return e;
    }

    public static loadResOne(i: any, e?: any): any {
        if (!i) return null;
        if (e || (e = new laya.display.Sprite), i.ani) e = EffectManager.loadAnimation(i.ani);
        else if (i.img) {
            var s = new laya.ui.Image(AssetsManager.getVersionStr(i.path + "/" + i.img + ".png"));
            e = s, i.anchorX && (s.anchorX = i.anchorX), i.anchorY && (s.anchorY = i.anchorY);
        }
        return i.add && (e.blendMode = "lighter"),
            i.x && (e.x = i.x), i.y && (e.y = i.y),
            i.scale && e.scale(i.scale, i.scale),
            i.scaleX && (e.scaleX *= i.scaleX), i.scaleY && (e.scaleY *= i.scaleY),
            i.pivotX && (e.pivotX = i.pivotX), i.pivotY && (e.pivotY = i.pivotY),
            i.alpha && (e.alpha = i.alpha),
            e;
    }

    public static clearCacheGroup(i: string): void {
        var e = EffectManager.animationCache.customGroup[i];
        if (e) {
            for (var n in e) Laya.loader.clearTextureRes(AssetsManager.getUrlAtlas(n));
            delete EffectManager.animationCache.customGroup[i];
        }
    }

    /** 引用计数为 0 时清对应图集纹理 */
    public static onCacheDisplayHandler(i: any, e: string, n: string): void {
        "undisplay" == n
            ? (EffectManager.animationCache[e]--, EffectManager.animationCache[e] || (delete EffectManager.animationCache[e], Laya.loader.clearTextureRes(AssetsManager.getUrlAtlas(e))))
            : (EffectManager.animationCache[e] = EffectManager.animationCache[e] || 0, EffectManager.animationCache[e]++);
    }

    public static loadSkeleton(t: string, i?: any): laya.ani.bone.Skeleton {
        var e = new laya.ani.bone.Skeleton;
        return e.load(AssetsManager.getUrlSkeleton(t), i), e;
    }

    public static getAnimationOnly(t: string, i?: any): laya.display.Animation {
        null == i && (i = new laya.display.Animation);
        var e = AssetsManager.loadedAnimations, s = e[t];
        return s || TestUtils.testAni && console.error("loadedAnimations未找到 " + t + " ,", e),
            i.loadAnimation(AssetsManager.getUrlAnimation(s)),
            i;
    }

    public static playAnimation(t: string, i?: string, e?: number, s?: any): laya.display.Animation {
        return void 0 === i && (i = ""), void 0 === e && (e = 0),
            (s = EffectManager.getAnimationOnly(t, s)).play(e, !0, i, !1),
            s;
    }

    /** e 播放模式：-3 循环/停止二选一；其余入 setAnimationQueue（-2 停住） */
    public static playAnimationByEndType(t: any, i?: string, e?: number): any {
        return void 0 === i && (i = ""), void 0 === e && (e = 0),
            t && (
                -3 == e ? t.isPlaying ? t.play(0, !0, t.actionName) : t.stop()
                    : (EffectManager.setAnimationQueue(t, Tools.isNullString(i) ? "" : i, e), -2 == e && t.stop())
            ),
            t;
    }

    public static delayShowAnimation(t: any, i: any, e?: any, n?: number, h?: string, o?: number, r?: number, a?: number): any {
        return void 0 === n && (n = 0), void 0 === h && (h = ""), void 0 === o && (o = 0),
            void 0 === r && (r = 0), void 0 === a && (a = 1),
            !t || t.destroyed ? null
                : (
                    i || (i = t),
                        0 == n ? EffectManager.tweenShowAnimation(t, i, h, o, r, a)
                            : (e || (e = (<any>Laya).scaleTimer), t.alpha = 0, t.stop(),
                                e.once(n, i, EffectManager.tweenShowAnimation, [t, i, h, o, r / e.scale, a], !1))
                ),
            t;
    }

    public static tweenShowAnimation(t: any, i: any, e?: string, s?: number, n?: number, h?: number): any {
        return void 0 === e && (e = ""), void 0 === s && (s = 0), void 0 === n && (n = 0), void 0 === h && (h = 1),
            t && !t.destroyed && EffectManager.playAnimationByEndType(t, e, s),
            i || (i = t),
            i && !i.destroyed && (n ? (i.alpha = .1 * h, laya.utils.Tween.to(i, { alpha: h }, n)) : i.alpha = h),
            t;
    }

    public static hasAnimation(t?: string): boolean {
        return void 0 === t && (t = ""),
            !(!t || (t = AssetsManager.getUrlAnimation(t) + "#", !laya.display.Animation.framesMap[t]));
    }

    public static getAnimation(t: any, i?: string, e?: number, n?: any): laya.display.Animation {
        var h: string, o: any;
        return void 0 === i && (i = ""), void 0 === e && (e = 0),
            "string" == typeof t ? h = t : (h = t.res, o = t),
            n = EffectManager.getAnimationOnly(h, n),
            EffectManager.modifyAnimation(n, o),
            EffectManager.playAnimationByEndType(n, i, e),
            Laya.timer.callLater(n, n.event, ["loaded"]),
            n;
    }

    public static modifyAnimation(t: any, i: any): any {
        return i ? (
            i.scale ? t.scale(i.scale * (i.scaleX ? i.scaleX : 1), i.scale * (i.scaleY ? i.scaleY : 1))
                : (i.scaleX && (t.scaleX = i.scaleX), i.scaleY && (t.scaleY = i.scaleY)),
                i.rota && (t.rotation = i.rota),
                i.speed && (t.speed = i.speed),
                i.alpha && (t.alpha = i.alpha),
                i.x && (t.x = i.x), i.y && (t.y = i.y),
                i.skewX && (t.skewX = i.skewX), i.skewY && (t.skewY = i.skewY),
                i.HSB && EffectManager.changeSprHSB(t, i.HSB),
                i.isAdd && (t.blendMode = "lighter"),
                t
        ) : t;
    }

    /** "|" 分段播放队列：e 决定结束方式（-1/-4 循环、1 自毁、2 finished 事件、3 停、4 末帧） */
    public static setAnimationQueue(t: any, i?: string, e?: number, n?: string, h?: any): any {
        void 0 === i && (i = ""), void 0 === e && (e = 0), void 0 === n && (n = "");
        var o = i.split("|"), r = o[0], a = n.split("|"), l = a[0] ? parseInt(a[0]) : 0;
        return h || (h = (<any>Laya).scaleTimer),
            o.length > 1 ? (
                o.shift(), a.length > 1 && a.shift(),
                    -1 != e && -4 != e || (o.push(r), a.push(<any>l)),
                    i = o.join("|"), n = a.join("|"),
                    t.play(0, !1, r),
                    l ? (-4 == e && (l += 500), h.once(l, t, EffectManager.setAnimationQueue, [t, i, e, n, h], !1))
                        : -4 == e ? t.once("complete", h, h.once, [500, t, EffectManager.setAnimationQueue, [t, i, e, n, h], !1])
                            : t.once("complete", t, EffectManager.setAnimationQueue, [t, i, e, n, h])
            ) : 0 == e ? t.play(0, !0, r)
                : (t.play(0, !1, r),
                    1 == e ? l ? h.once(l, t, EffectManager.destroyAnimation, [t], !1) : t.once("complete", t, EffectManager.destroyAnimation, [t])
                        : 2 == e ? t.once("complete", t, function () {
                            t.event("finished");
                        })
                            : 3 == e ? t.stop()
                                : 4 == e && t.gotoAndStop(t.count - 1)),
            t;
    }

    public static destroyAnimation(t: any): void {
        t && !t.destroyed && (t.event("dead"), t.removeSelf(), Laya.timer.callLater(null, Tools.destroy, [t]));
    }

    public static popAnimation(i: any, e: number, n: number, h?: any): laya.display.Animation {
        var o = EffectManager.loadAnimation(i, "", 1);
        return o.pos(e, n), null == h && (h = Laya.stage), h.addChild(o), o;
    }

    /** 信息字号：档位表 × 语言倍率，下限 e[0] */
    public static getFontSize(t: number): number {
        var i = ConfigApp.lan(), e = ConfigServer.system_simple.info_font_size;
        e || (e = [11, 12, 13, 14, 15, 16, 17, 18, 20, 22]);
        var s = ConfigServer.system_simple.info_font_size_lan, n = s && s[i] ? s[i] : 1,
            h = e[Math.min(t, e.length - 1)];
        return Math.max(e[0], Math.ceil(h * n));
    }

    public static mixColor(t: string, i: string, e?: number): any {
        void 0 === e && (e = .5);
        var s = (<any>laya.debug).tools.ColorTool.getRGBByRGBStr(t), n = (<any>laya.debug).tools.ColorTool.getRGBByRGBStr(i);
        return (<any>laya.debug).tools.ColorTool.getRGBStr(sg.fight.logic.utils.FightUtils.mix(s, n, e));
    }

    /** 渐变混色滤镜（i→e） */
    public static translationMatrix(t: any, i: any, e: any, s: number, n?: any): void {
        t.trans_oo && laya.utils.Tween.clearAll(t.trans_oo);
        var h: any = { f: 0 };
        t.trans_oo = h,
            laya.utils.Tween.to(h, {
                f: 1,
                update: new laya.utils.Handler(null, function () {
                    t.destroyed || (t.filters = [new laya.filters.ColorFilter(sg.fight.logic.utils.FightUtils.mix(i, e, h.f, !0))]);
                })
            }, s, null, n);
    }

    /** 英雄立绘底座（Spine/图/描边遮罩按 system_simple.spine_mask 配置） */
    public static newHeroSpineBox(t: string, i?: number, e?: number, s?: boolean, n?: string, h?: any): laya.ui.Box {
        void 0 === i && (i = 0), void 0 === e && (e = 1.5), void 0 === s && (s = !0), void 0 === n && (n = "");
        var o: any, r = "", a = new laya.ui.Box;
        if (0 != t.indexOf("hero") && 0 != t.indexOf("skin")) return a;
        r = "hero/" + t + ".png", e && ((<any>a).accuracy = e, a.cacheAs = "bitmap");
        var l = ConfigServer.system_simple.spine_mask;
        if (!l) return a;
        "" == n ? o = l[t] ? l[t] : l.default : (o = l[n]) || (o = l.default);
        var c: string, u = o[0], d = !1;
        -1 != u.indexOf(".ani") ? (d = !0, c = u.split(".")[0]) : c = AssetsManager.getAssetLater(o[0]);
        var m = o[1], g = o[2], f = o[3], p = o[4], v = o[5], y = o[6];
        a.width = f, a.height = p;
        var b = new laya.ui.Box;
        b.width = 640, b.height = 640, a.addChild(b);
        var I = !1;
        if (i <= 1) {
            var x = new laya.ui.Image;
            x.skin = r, b.addChild(x), x.centerX = x.centerY = 0;
        }
        var w = new laya.display.Sprite;
        if (w.alpha = 0, w.graphics.drawRect(m, g, f, p, "#FFFFFF"), a.addChild(w),
            0 == i || 2 == i) {
            var C = laya.net.ResourceVersion.manifest, k = "spine/" + t + "/skeleton.sk";
            if (C && C[k]) {
                I = !0;
                var T = new sg.utils.Spine;
                (<any>a).spine_hero_id = t,
                    (<any>T).Load(k, 1, 1, 0, 0, laya.utils.Handler.create(h, callFunc = function () {
                        T && (T.Play(0), 0 == <any>s && (<any>T).Stop());
                    }), b, !0, t);
            }
        }
        if (I) {
            var M: any;
            if (d) M = EffectManager.loadAnimation(c);
            else M = new laya.ui.Image(c);
            M.x = m, M.y = g, M.width = f, M.height = p, a.mask = M;
        }
        return e && EffectManager.setSprAccuracy(a, e, null, 0, 0, v, y), a;
    }

    public static setSprAccuracy(i: any, e?: number, s?: any, n?: number, h?: number, o?: number, r?: number): any {
        if (void 0 === e && (e = 2), void 0 === n && (n = 0), void 0 === h && (h = 0),
            void 0 === o && (o = 0), void 0 === r && (r = 0), n && h) {
            var a = new laya.maths.Rectangle(-16, -16, n * e + 32, h * e + 32);
            i.setBounds(a);
        }
        return 1 == e ? (
            delete i.accuracy, delete i.accuracyMask, delete i.accuracyExtraWidth, delete i.accuracyExtraHeight,
                i.cacheAs = "none"
        ) : (
            i.accuracyExtraWidth = o, i.accuracyExtraHeight = r, i.accuracy = e,
                s || (s = i.mask),
                s && (i.accuracyMask = s, EffectManager.updateSprAccuracyMask(i)),
                i
        );
    }

    public static updateSprAccuracyMask(t: any): void {
        if (t && t.accuracyMask) {
            var i = t.accuracyMask, e = t.accuracy, s = t.accuracyExtraWidth, n = t.accuracyExtraHeight, h = e;
            h = Math.max(1, h);
            var o = new laya.maths.Rectangle(-16, -16, Math.ceil(i.width * h + 32 + s), Math.ceil(i.height * h + 32 + n));
            i.setBounds(o), i.reCache();
        }
        t.reCache();
    }

    public static getColorMat(t: string, i?: number): any[] {
        var e: any[];
        if (void 0 === i && (i = 1), "#" == t.charAt(0)) {
            var s = (<any>laya.debug).tools.ColorTool.getRGBByRGBStr(t),
                n = s[0] / 255 * i, h = s[1] / 255 * i, o = s[2] / 255 * i;
            e = [n, n, n, 0, 0, h, h, h, 0, 0, o, o, o, 0, 0, 0, 0, 0, 1, 0];
        }
        return e;
    }

    /** 变色矩阵：# 串走 RGB 交换矩阵；命名色走 uiColor 配置（HSB 或矩阵表） */
    public static getChangeColorMat(i: any, e?: any): any[] {
        var s: any[];
        if ("string" == typeof i) {
            var n = i;
            if ("#" == n.charAt(0)) {
                var h = (<any>laya.debug).tools.ColorTool.getRGBByRGBStr(n),
                    o = h[0] / 255, r = h[1] / 255, a = h[2] / 255;
                s = [o, a, r, 0, 0, r, o, a, 0, 0, a, r, o, 0, 0, 0, 0, 0, 1, 0];
            }
        }
        if (!s)
            if (null == e)
                if (ConfigUI.changeColorMatUseHSB) {
                    var l = (e = ColorManager.getUIColor("COLOR_FILTER_TRANS"))[i];
                    l && (s = EffectManager.getHSBMat(l[0], l[1], l[2]));
                } else s = (e = ColorManager.getUIColor("COLOR_FILTER_MATRIX"))[i];
            else s = e[i];
        return s;
    }

    public static getHSBMat(t: number, i: number, e: number): any[] {
        var s = NaN, n = NaN, h = NaN, o = NaN;
        (t %= 1) < 1 / 3 ? (s = o = 3 * (1 / 3 - t), n = 1 - o, h = 0)
            : t < 2 / 3 ? (s = 0, n = o = 3 * (2 / 3 - t), h = 1 - o)
                : (s = 1 - (o = 3 * (1 - t)), n = 0, h = o);
        var r = ColorManager.getUIColor("RGB_BRIGHTNESS"), a = (1 - i) * e,
            l = [r[0] * a, r[1] * a, r[2] * a];
        return [l[0] + (s *= e *= i), l[1] + (n *= e), l[2] + (h *= e), 0, 0,
            l[0] + h, l[1] + s, l[2] + n, 0, 0,
            l[0] + n, l[1] + h, l[2] + s, 0, 0,
            0, 0, 0, 1, 0];
    }

    public static changeSprColor(i: any, e: any, s?: boolean, n?: any): any {
        return void 0 === s && (s = !0),
            EffectManager.changeSprColorFilter(i, EffectManager.getChangeColorMat(e, n), s);
    }

    public static changeSprColorTrans(i: any, e: any, s: any, n: any, h?: boolean): any {
        return void 0 === h && (h = !0),
            EffectManager.changeSprColorFilter(i, EffectManager.getHSBMat(e, s, n), h);
    }

    public static changeSprHSB(t: any, i: any, e?: boolean): any {
        return void 0 === e && (e = !0),
            i ? EffectManager.changeSprColorTrans(t, i[0], i[1], i[2], e) : t;
    }

    public static changeSprHue(t: any, i: any, e?: boolean): any {
        if (void 0 === e && (e = !0), !i || 1 == i) return t.filters = null, t.cacheAs = "none", t;
        var s = NaN, n = NaN, h = NaN, o = NaN;
        (i %= 1) < 1 / 3 ? (s = o = 3 * (1 / 3 - i), n = 1 - o, h = 0)
            : i < 2 / 3 ? (s = 0, n = o = 3 * (2 / 3 - i), h = 1 - o)
                : (s = 1 - (o = 3 * (1 - i)), n = 0, h = o);
        var r = [s, n, h, 0, 0, h, s, n, 0, 0, n, h, s, 0, 0, 0, 0, 0, 1, 0];
        return EffectManager.changeSprColorFilter(t, r, e);
    }

    public static changeSprSaturation(t: any, i: number, e?: boolean, s?: any[]): any {
        if (void 0 === e && (e = !0), 1 == i) return t.filters = null, t.cacheAs = "none", t;
        s || (s = ColorManager.getUIColor("RGB_BRIGHTNESS"));
        var n = 1 - i, h = [s[0] * n, s[1] * n, s[2] * n],
            o = [h[0] + i, h[1], h[2], 0, 0, h[0], h[1] + i, h[2], 0, 0, h[0], h[1], h[2] + i, 0, 0, 0, 0, 0, 1, 0];
        return EffectManager.changeSprColorFilter(t, o, e);
    }

    public static changeSprBrightness(t: any, i: number, e?: boolean): any {
        if (void 0 === e && (e = !0), 1 == i) return t.filters = null, t.cacheAs = "none", t;
        var s = [i, 0, 0, 0, 0, 0, i, 0, 0, 0, 0, 0, i, 0, 0, 0, 0, 0, 1, 0];
        return EffectManager.changeSprColorFilter(t, s, e);
    }

    public static changeSprColorTo(t: any, i: number, e: number, s: number, n?: boolean): any {
        void 0 === n && (n = !0);
        var h = [0, 0, 0, i, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1, 0];
        return EffectManager.changeSprColorFilter(t, h, n);
    }

    public static changeSprColorFilter(t: any, i: any[], e?: boolean): any {
        if (void 0 === e && (e = !0), i) {
            var s = new laya.filters.ColorFilter(i);
            t.filters = [s], e && (t.cacheAs = "bitmap");
        } else t.filters = null, t.cacheAs = "none";
        return t;
    }

    public static changeSprGlowFilter(t: any, i: string, e?: number, s?: number, n?: number, h?: boolean): any {
        void 0 === e && (e = 4), void 0 === s && (s = 0), void 0 === n && (n = 0), void 0 === h && (h = !0);
        var o = new laya.filters.GlowFilter(i, e, s, n);
        return t.filters = [o],
            h ? t.cacheAs = "bitmap" : (t.filters = null, t.cacheAs = "none"),
            t;
    }

    public static changeSprShadowFilter(i: any, e?: string, s?: number, n?: number, h?: number, o?: boolean): any {
        return void 0 === e && (e = "#000000"), void 0 === s && (s = 4), void 0 === n && (n = 6),
            void 0 === h && (h = 6), void 0 === o && (o = !0),
            EffectManager.changeSprGlowFilter(i, e, s, n, h);
    }

    /** 往返两次 update 补间做呼吸闪色，结束后还原 */
    public static blinkSprColor(t: any, i: any[], e: number, s: number, n?: any, h?: number, o?: number): any {
        return void 0 === o && (o = 0),
            t.blinkRatio = 0,
            laya.utils.Tween.to(t, {
                update: new laya.utils.Handler(null, EffectManager.mergeSprColorFilter, [t, i]),
                blinkRatio: 1
            }, e, n),
            laya.utils.Tween.to(t, {
                update: new laya.utils.Handler(null, EffectManager.mergeSprColorFilter, [t, i]),
                blinkRatio: 0
            }, s, <any>h, laya.utils.Handler.create(null, EffectManager.changeSprColorFilter, [t, null]), e + o),
            t;
    }

    public static mergeSprColorFilter(t: any, i: any[], e?: number): void {
        if (void 0 === e && (e = -1), t && !t.destroyed) {
            e < 0 && (e = t.blinkRatio || .5);
            for (var s = 1 - e, n = [], h = sg.cfg.ConfigColor.standardMat, o = 0, r = i.length; o < r; o++)
                n[o] = h[o] * s + i[o] * e;
            EffectManager.changeSprColorFilter(t, n);
        }
    }

    public static getFontColor(t: number, i?: any[]): any {
        return t < 0 ? ColorManager.getUIColor("FONT_COLOR_NULL")
            : (null == i && (i = ColorManager.getUIColor("FONT_COLORS")), t >= i.length && (t = i.length - 1), i[t]);
    }

    public static startFrameRotate(i: any, e: number): void {
        i.frameRotate = function (t: any, i: number) {
            t.rotation += i;
        },
            i.once("removed", null, EffectManager.endFrameRotate, [i]),
            (<any>Laya).scaleTimer.frameLoop(1, i, i.frameRotate, [i, e], !1);
    }

    public static frameRotate(i: any, e: number): void {
        i && !i.destroyed ? i.rotation += e : EffectManager.endFrameRotate(i);
    }

    public static endFrameRotate(i: any): void {
        i.off("removed", null, EffectManager.endFrameRotate),
            i.frameRotate && (<any>Laya).scaleTimer.clear(i, i.frameRotate);
    }

    /** 往复补间循环（o 计数上限） */
    public static tweenLoop(t: any, i: any, e: number, s?: any, n?: laya.utils.Handler, h?: number, o?: number, r?: number, a?: number): void {
        if (void 0 === h && (h = 0), void 0 === o && (o = -1), void 0 === r && (r = 0), void 0 === a && (a = 0),
            t && !t.destroyed) {
            var l: any = {};
            for (var c in i) l[c] = "update" == c ? i[c] : t[c];
            laya.utils.Tween.to(t, i, e, s, null, h),
                laya.utils.Tween.to(t, l, e, s, laya.utils.Handler.create(null, function () {
                    o >= 0 && --o < 0 ? n && n.run() : EffectManager.tweenLoop(t, i, e, s, n, r, o, r, a);
                }), h + e + a);
        }
    }

    /** 往返抖动（目标值→反值→还原） */
    public static tweenShake(t: any, i: any, e: number, s?: any, n?: laya.utils.Handler, h?: number, o?: number, r?: number): void {
        if (void 0 === h && (h = 0), void 0 === o && (o = -1), void 0 === r && (r = 0), t && !t.destroyed) {
            var a: string, l: any = {};
            for (a in i) "update" == a ? l[a] = i[a] : (i[a], l[a] = t[a]);
            var c: any = {};
            for (a in i) "number" == typeof i[a] ? c[a] = -i[a] : c[a] = i[a];
            laya.utils.Tween.to(t, i, e, s, null, h),
                laya.utils.Tween.to(t, c, e, s, null, h + e),
                laya.utils.Tween.to(t, l, e, s, laya.utils.Handler.create(null, function () {
                    o >= 0 && --o < 0 ? n && n.run() : EffectManager.tweenShake(t, i, e, s, n, r, o, r);
                }), h + 2 * e);
        }
    }

    public static addUIAnimation(t: any, i: string, e?: number, s?: number, n?: number, h?: boolean): laya.display.Animation {
        void 0 === e && (e = 1), void 0 === s && (s = 0), void 0 === n && (n = 0), void 0 === h && (h = !1);
        var o = t.getChildByName(i);
        return o || (
            (o = EffectManager.loadAnimation(i)).scale(e, e),
                o.name = i, h && (o.blendMode = "lighter"), o.pos(s, n), t.addChild(o)
        ),
            o;
    }

    /** 飘字上升 */
    public static createLabelRise(t: string, i: number, e: number, n?: number, h?: number, o?: string, r?: string, a?: any): laya.ui.Label {
        void 0 === n && (n = 2e3), void 0 === h && (h = 40), void 0 === o && (o = "#FFFF00"), void 0 === r && (r = "#333333");
        var l = new laya.ui.Label;
        return l.pos(i, e), l.stroke = 3, l.strokeColor = r, l.color = o, l.fontSize = h, l.text = t,
            l.align = "center", l.valign = "middle", l.height = h + 10, l.anchorX = .5, l.anchorY = .5,
            l.scaleX = .5, l.scaleY = .5,
            laya.utils.Tween.to(l, { scaleX: 1, scaleY: 1 }, 300, laya.utils.Ease.backOut),
            laya.utils.Tween.to(l, { y: e - 80 }, n, laya.utils.Ease.sineIn),
            laya.utils.Tween.to(l, { alpha: 0, scaleX: 1.5, scaleY: 1.5 }, 300, laya.utils.Ease.sineIn,
                laya.utils.Handler.create(null, Tools.destroy, [l]), n - 300),
            null == a && (a = Laya.stage),
            a.addChild(l),
            l;
    }

    /** 图标群飞（散开→上浮→贝塞尔汇入） */
    public static createIconFlight(t: string, i: number, e: number, n: number, h: number, o?: number, r?: number, a?: any): laya.ui.Box {
        void 0 === o && (o = 1), void 0 === r && (r = 20);
        var l = new laya.ui.Box, c = .15 * Math.sqrt(Math.pow(n - i, 2) + Math.pow(h - e, 2)) + 400,
            u = 250, d = 40;
        h > e && (d = -d);
        for (var m = 0; m < r; m++) {
            var g = 100 * Math.random(), f = new laya.ui.Image(t), p = Math.random() * Math.PI * 2,
                v = 50 * (.6 * Math.random() + .7), y = v * Math.cos(p), b = v * Math.sin(p),
                I = .5 * (i + n) + 1.5 * y, x = e + 1.5 * b + d * (.6 * Math.random() + .7),
                w = 10 * (.6 * Math.random() + .7);
            f.alpha = 0, f.scale(.5, .5), f.anchorX = .5, f.anchorY = .5,
                y += i, b += e, f.x = i, f.y = e, (<any>f).temp = 0, l.addChild(f),
                laya.utils.Tween.to(f, { alpha: 1, scaleX: o, scaleY: o, x: y, y: b }, u, laya.utils.Ease.backOut, null, g),
                laya.utils.Tween.to(f, { y: b + w }, 200, laya.utils.Ease.linearNone, null, g + u),
                laya.utils.Tween.to(f, {
                    update: new laya.utils.Handler(null, EffectManager.bezierFlight, [f, y, b + w, I, x, n, h]),
                    temp: 1
                }, c, laya.utils.Ease.sineIn, null, g + u + 200),
                laya.utils.Tween.to(f, { alpha: .2 }, .2 * c, laya.utils.Ease.linearNone,
                    laya.utils.Handler.create(null, Tools.destroy, [f]), g + u + 200 + .8 * c);
        }
        return null == a && (a = Laya.stage),
            a.addChild(l),
            EffectManager.popAnimation("glow011", i, e, l).scale(.6, .6),
            l;
    }

    public static textFlight(t: any, i: string, e: number, n: number, h?: any, o?: number, r?: string): laya.display.Text {
        if (void 0 === o && (o = -1), void 0 === r && (r = "#ffffff"), "" == t || " " == i) return null;
        var a = new laya.display.Text;
        a.x = e, a.y = n;
        var l = Number(t);
        return a.text = i + (l > 0 ? " +" + t : t),
            a.fontSize = 30, a.color = r, a.strokeColor = "#000000", a.stroke = 2,
            a.x + a.width > Laya.stage.width && (a.x = Laya.stage.width - a.width),
            null == h && (h = Laya.stage),
            a.pivotY = .5 * a.height,
            h.addChild(a),
            a.scaleX = .9, a.scaleY = .9,
            laya.utils.Tween.to(a, { y: a.y + 50 * o, scaleX: 1.1, scaleY: 1.1 }, 800, null,
                laya.utils.Handler.create(Laya.stage, function () {
                    a.destroy();
                }), 0, !1, !1),
            a;
    }

    public static comFlight(t: any, i: number, e: number, n?: any): void {
        null == n && (n = Laya.stage),
            n.addChild(t), t.x = i, t.y = e,
            laya.utils.Tween.to(t, { y: t.y - 100 }, 800, laya.utils.Ease.sineInOut,
                laya.utils.Handler.create(Laya.stage, function () {
                    t.destroy();
                }), 0, !1, !1);
    }

    public static itemFlight(i: any, e: number, s: number, n: any, h?: boolean, o?: boolean): number {
        return void 0 === h && (h = !0), void 0 === o && (o = !1),
            o && EffectManager.popAnimation("glow044", 68, 69, i),
            EffectManager.spriteFlight(i, e, s, 136, 136, n, h);
    }

    /** 精灵飞入（终点带背包图标三连跳）；返回总时长 */
    public static spriteFlight(t: any, i: number, e: number, n?: number, h?: number, o?: any, r?: boolean): number {
        if (void 0 === n && (n = 0), void 0 === h && (h = 0), void 0 === r && (r = !0), null == t || t.destroyed) return 0;
        var a = t.localToGlobal(new laya.maths.Point);
        t.pos(a.x, a.y);
        var l = 450, c = 10 * Math.random() - 5 + a.x, u = 20 * Math.random() - 30 + a.y,
            d = Math.sqrt(Math.pow(i - c, 2) + Math.pow(e - u, 2)) * (ConfigApp.isHorizontal ? .1 : .15) + 400,
            _ = ConfigApp.isHorizontal ? 100 : 40,
            m = t.globalScaleX, g = t.globalScaleY;
        t.cacheAs = "bitmap", e >= a.y && (_ = -_);
        var f = .5 * (c + i), p = u + _;
        if (t.pivotX = .5 * n, t.pivotY = .5 * h, t.scaleX = m, t.scaleY = g, t.temp = 0,
            laya.utils.Tween.to(t, { x: c, y: u }, l, laya.utils.Ease.backOut, null),
            laya.utils.Tween.to(t, {
                update: new laya.utils.Handler(null, EffectManager.bezierFlight, [t, c, u, f, p, i, e]),
                temp: 1
            }, d, laya.utils.Ease.sineIn, null, 450),
            laya.utils.Tween.to(t, { scaleX: .3, scaleY: .3 }, .8 * d, laya.utils.Ease.sineIn, null, 450 + .2 * d),
            laya.utils.Tween.to(t, { alpha: .2 }, .2 * d, laya.utils.Ease.linearNone,
                laya.utils.Handler.create(null, Tools.destroy, [t]), 450 + .8 * d),
            null == o && (o = Laya.stage),
            o.addChild(t),
            r) {
            var v = new ui.com.item_bagUI;
            v.anchorX = v.anchorY = .5, v.alpha = 0, v.icon.cacheAs = "bitmap";
            var y = EffectManager.getBagPos();
            v.pos(y.x, y.y),
                ConfigApp.testFightType ? Laya.stage.addChild(<any>v) : ViewManager.instance.showEffect(v, !1),
                laya.utils.Tween.to(v, { alpha: 1 }, 100, laya.utils.Ease.linearNone, null, 450 + d - 50),
                laya.utils.Tween.to(v.icon, { y: 15 }, 100, laya.utils.Ease.backInOut, null, 450 + d + 0),
                laya.utils.Tween.to(v.icon, { y: 5 }, 100, laya.utils.Ease.backInOut, null, 450 + d + 100),
                laya.utils.Tween.to(v.icon, { y: 15 }, 100, laya.utils.Ease.backInOut, null, 450 + d + 200),
                laya.utils.Tween.to(v, { alpha: 0 }, 500, laya.utils.Ease.sineIn,
                    laya.utils.Handler.create(null, Tools.destroy, [v]), 450 + d + 500);
        }
        return 450 + d;
    }

    public static getBagPos(): any {
        var t = ViewManager.instance.getItemPos("bag");
        return t || (t = new laya.maths.Point(Laya.stage.width / 2 + sg.fight.client.cfg.ConfigFightView.BAG_OFFSET_X, Laya.stage.height + sg.fight.client.cfg.ConfigFightView.BAG_OFFSET_Y)),
            t;
    }

    /** temp 0→1 二次贝塞尔插值 */
    public static bezierFlight(t: any, i: number, e: number, s: number, n: number, h: number, o: number): void {
        if (t && !t.destroyed) {
            var r = t.temp, a = 1 - r,
                l = a * a * i + 2 * r * a * s + r * r * h,
                c = a * a * e + 2 * r * a * n + r * r * o;
            t.x = l, t.y = c;
        }
    }

    /** 兵头像：army_icon=1 时用 item 图标，否则按阵型表摆动画小人 */
    public static loadArmysIcon(t: any, i?: boolean): any {
        if (void 0 === i && (i = !0), 1 === ConfigUI.army_icon) {
            var e = AssetsManager.getAssetsArmy("item_" + t), s = new laya.ui.Image(e);
            return s.anchorX = s.anchorY = .5, s;
        }
        var n = new laya.display.Sprite;
        i && sg.fight.client.cfg.ConfigFightView.ARMY_ICON_BG && n.addChild(EffectManager.loadResOne(sg.fight.client.cfg.ConfigFightView.ARMY_ICON_BG)),
            t = sg.fight.client.utils.FightLoad.getPersonResId(t);
        var h = "stand";
        return ConfigApp.isLandscape && (n.scaleX = -1, h = "stand_d"),
            EffectManager.loadAnimationAndCall(t, null, function () {
                var i = sg.model.ModelFormation.getArmySize(t),
                    e = sg.fight.client.cfg.ConfigFightView.ARMY_ICON_FORMATION[t] ? sg.fight.client.cfg.ConfigFightView.ARMY_ICON_FORMATION[t] : sg.fight.client.cfg.ConfigFightView.ARMY_ICON_FORMATION[i],
                    s = 0;
                for (s = e.length - 1; s >= 0; s--) {
                    var o = EffectManager.getAnimation(t, h, 4), r = e[s];
                    n.addChild(o), o.pos(r[0], r[1]);
                    var a = (1 - .1 * r[2]) * (r.length > 3 ? r[3] : 1);
                    o.scale(a, a, !0), EffectManager.changeSprBrightness(o, 1 - .1 * r[2]);
                }
            }),
            n;
    }

    public static loadArmysAnimation(t: any, i?: boolean): laya.display.Sprite {
        void 0 === i && (i = !0);
        var e = new laya.display.Sprite;
        return i && sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_BG && e.addChild(EffectManager.loadResOne(sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_BG)),
            EffectManager.loadAnimationAndCall(t, null, function () {
                var i = sg.model.ModelFormation.getArmySize(t),
                    s = sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_FORMATION[t] ? sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_FORMATION[t] : sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_FORMATION[i],
                    n = 0;
                for (n = s.length - 1; n >= 0; n--) {
                    var h = EffectManager.getAnimation(t, sg.fight.client.cfg.ConfigFightView.SP_ARMY_ICON_STATENAME, -1), o = s[n];
                    e.addChild(h), h.pos(o[0], o[1]);
                    var r = (1 - .1 * o[2]) * (o.length > 3 ? o[3] : 1);
                    h.scale(r, r, !0);
                }
            }),
            e;
    }

    public static loadWelcomeScreen(): laya.display.Sprite {
        var t = new laya.display.Sprite;
        return AssetsManager.preloadWelcomeScreen(null, EffectManager.getWelcomeScreen, [t]),
            t;
    }

    /** 欢迎界面：按包类型（sg/ww/cb）装配 Spine 骨架与粒子，竖屏非 ww 加手机底图 */
    public static getWelcomeScreen(t?: any): any {
        var i: any, e = Laya.stage.width, n = Laya.stage.height;
        if (t = t || new laya.display.Sprite, ConfigApp.testFightType) return t;
        if ("1" === Tools.getURLexp("indexType") && !ConfigApp.isHorizontal)
            return (i = EffectManager.loadAnimation("glow501", "stand")).x = -4, t.addChild(i), t.pos(e / 2, n / 2), t;
        var h = new laya.display.Sprite, o = new laya.display.Sprite, r = new laya.display.Sprite,
            a = new laya.display.Sprite, l = new laya.display.Sprite, c = new laya.display.Sprite,
            u = new laya.display.Sprite;
        if (!ConfigApp.isHorizontal && "ww" !== HelpConfig.type_app) {
            var d = new laya.ui.Image;
            LoadeManager.loadTemp(d, AssetsManager.getAssetsAD("bg_phone.jpg"));
            var _ = Laya.stage.height / 1144;
            _ > 1 && d.scale(_, _), d.centerX = d.centerY = 0, t.addChild(d);
        }
        t.addChildren(r, c, o, l, h, a, u),
            h.name = "spr_a", o.name = "spr_b", r.name = "spr_c", u.name = "spr_ui", a.name = "spr_a",
            l.name = "spr_part_b", c.name = "spr_part_c";
        var g: any, f = Tools.getURLexp("spine") || "default";
        if (f += ConfigApp.isHorizontal ? "/pc" : "/phone",
            "sg" == HelpConfig.type_app)
            for (var p = laya.net.ResourceVersion.manifest, v = 1; v <= 5; ++v) {
                if (!("kr" != ConfigApp.lan())) break;
                var y = f + "/" + v;
                if (!p || p[AssetsManager.getUrlSkeleton(y)]) {
                    var b = EffectManager.loadSkeleton(y);
                    h.addChild(b), -1 !== f.indexOf("37") && 2 === v && (b.blendMode = "lighter");
                }
            }
        else if ("ww" == HelpConfig.type_app) {
            h.addChild(EffectManager.loadSkeleton("s_a"));
            var I = EffectManager.loadSkeleton("s_c");
            I.scaleX = I.scaleY = 1.05, r.addChild(I), r.addChild(EffectManager.loadSkeleton("s_b"));
        } else if ("cb" == HelpConfig.type_app) {
            var x = new sg.utils.Spine;
            x.Load(AssetsManager.getUrlSkeleton("main_a"), 1, 1, 0, 0, laya.utils.Handler.create(null, callFunc = function () {
                x && x.Play(0);
            }), h);
            var w = new sg.utils.Spine;
            w.Load(AssetsManager.getUrlSkeleton("main_b"), 1, 1, 0, 0, laya.utils.Handler.create(null, callFunc = function () {
                w && w.Play(0);
            }), o);
            var C = new sg.utils.Spine;
            C.Load(AssetsManager.getUrlSkeleton("main_c"), 1, 1, 0, 0, laya.utils.Handler.create(null, callFunc = function () {
                C && C.Play(0);
            }), r);
        }
        var k = 100, T = laya.utils.Browser.clientHeight / laya.utils.Browser.clientWidth / (n / e) * n * .6;
        if ("sg" == HelpConfig.type_app)
            (g = EffectManager.loadParticle("p018", 15, 15, r, !0, 0, 200)).scaleX = g.scaleY = 6,
                (g = EffectManager.loadParticle("p019", 30, 30, h, !0, k, T - 100)).scaleX = g.scaleY = 3,
                -1 === f.indexOf("37") && (
                    ConfigApp.isHorizontal ? g = EffectManager.loadParticle("p020", 10, 100, h, !0, k, T - 100)
                        : (g = EffectManager.loadParticle("p020", 10, 50, h, !0, k, T - 100),
                            EffectManager.loadParticle("p017", 100, 400, h, !0, k, T - 150))
                );
        else if ("ww" == HelpConfig.type_app)
            g = EffectManager.loadParticle("p017", 100, 400, o, !0, k, T - 600),
                (g = EffectManager.loadParticle("p021", 20, 500, h, !0, k, T - 400)).scaleX = g.scaleY = 3,
                (g = EffectManager.loadParticle("p020", 20, 500, h, !0, k, T - 300)).scaleX = g.scaleY = 3,
                (g = EffectManager.loadParticle("p020", 20, 500, h, !0, k, T - 200)).scaleX = g.scaleY = 3,
                g = EffectManager.loadParticle("p017", 100, 400, h, !0, k, T - 500);
        else if ("cb" == HelpConfig.type_app) {
            EffectManager.loadParticle("pMain006", -1, -1, l, !0, k, -300),
                EffectManager.loadParticle("pMain007", -1, -1, c, !0, k, -300),
                EffectManager.loadParticle("pMain008", -1, -1, l, !0, -540, -300),
                EffectManager.loadParticle("pMain009", -1, 1500, a, !0, -100, 0),
                EffectManager.loadParticle("pMain010", -1, -1, l, !0, -400, 0),
                EffectManager.loadParticle("pMain011", -1, 300, l, !0, -400, 200);
            var M = AssetsManager.getAssetsAD("aaa.png");
            LoadeManager.loadImg(M, laya.utils.Handler.create(null, function () {
                var t = new laya.ui.Image(M);
                t.pos(-1 * n, -.5 * n);
                var i = new laya.ui.Image(M);
                i.scaleX = -1, t.anchorX = i.anchorX = 1, i.pos(n, -.5 * n), t.height = i.height = n;
                var e = new laya.ui.Image;
                e.graphics.drawRect(-1 * (n + t.width + 500), -.5 * n, 500, n, "#000");
                var s = new laya.ui.Image;
                s.graphics.drawRect(n + t.width, -.5 * n, 500, n, "#000"),
                    u.addChildren(e, s, t, i);
            }));
        }
        return t.pos(e / 2, n / 2), t;
    }

    public static loadHeroStarUp(t: any, i: any, e?: any, s?: any, n?: any): laya.display.Sprite {
        var h = new laya.display.Sprite,
            o = ConfigApp.isLandscape ? ["glow008bg", "glow008fg", "glow008fg_f"] : ["glow008bg", "glow008fg"];
        return AssetsManager.preLoadAssets([AssetsManager.getAssetsHero(t, !1)], o, null, null, EffectManager.getHeroStarUp, [t, i, h, e, s, n]),
            h;
    }

    public static getHeroStarUp(t: any, i: any, e?: any, n?: any, h?: any, o?: any): laya.display.Animation {
        var r: any, l: laya.ui.Image;
        return null == e && (e = new laya.display.Animation),
            r = EffectManager.loadAnimation("glow008bg", "", 1),
            EffectManager.changeSprColor(r, i, !1), e.addChild(r),
            (l = new laya.ui.Image(AssetsManager.getAssetsHero(t, !1))).anchorX = .5, l.anchorY = .5,
            l.scale(.8, .8, !0), l.alpha = 0,
            laya.utils.Tween.to(l, { alpha: 1 }, 200),
            laya.utils.Tween.to(l, { scaleX: 1.2, scaleY: 1.2 }, 500, laya.utils.Ease.circOut),
            laya.utils.Tween.to(l, { alpha: 0 }, 200, laya.utils.Ease.sineIn,
                laya.utils.Handler.create(l, function () {
                    l.destroy(), h && h.apply(n, o);
                }), 2e3),
            e.addChild(l),
            r = EffectManager.loadAnimation("glow008fg", "", 1),
            EffectManager.changeSprColor(r, i, !1), e.addChild(r),
            ConfigApp.isLandscape && (
                (r = EffectManager.loadAnimation("glow008fg_f", "", 1)).blendMode = "lighter",
                    EffectManager.changeSprColor(r, i, !1), e.addChild(r)
            ),
            e.pos(Laya.stage.width / 2, Laya.stage.height / 2),
            e;
    }

    /** 把动画效果按目标精灵尺寸缩放后挂其父级（命名复用 ani_key） */
    public static addEffectToSprite(t: any, i: string, e: any, s?: string, n?: number, h?: boolean): laya.display.Animation {
        void 0 === s && (s = ""), void 0 === n && (n = 0), void 0 === h && (h = !0);
        var o = "ani_" + i + "_" + t.name;
        if (1 != n && t.parent[o]) return t.parent[o].visible = !0, t.parent[o];
        var r = new laya.display.Animation;
        // 编译修复时对照 oracle 修正：原文此处无 return（逗号链顺序执行到函数末尾 return），
        // 误译的 return 会跳过下方锚点定位并返回 blendMode 值。已还原为原文控制流。
        h && r.once("loaded", null, function () {
            r.scaleX = t.width * t.scaleX / (<any>r).aniW, r.scaleY = t.height * t.scaleY / (<any>r).aniH;
        }),
            EffectManager.loadAnimation(i, s, n, r), r.blendMode = e;
        var l = t.anchorX || 0, c = t.anchorY || 0;
        return r.x = t.x + t.width * (.5 * t.scaleX - l), r.y = t.y + t.height * (.5 * t.scaleY - c),
            t.parent.addChild(r), t.parent[o] = r,
            r;
    }

    public static labelBezierFlight(t: any, i: any): void {
        var e = i.startX, s = i.startY, n = i.endX, h = i.endY,
            o = [e - 200, e + 200][320 == e ? Tools.getRandom(0, 2) : e > 320 ? 1 : 0], r = s - 200;
        t.temp = 0,
            laya.utils.Tween.to(t, { y: s - 20 }, 300, laya.utils.Ease.linearNone, null, 0),
            laya.utils.Tween.to(t, {
                update: new laya.utils.Handler(null, EffectManager.bezierFlight, [t, e, s - 20, o, r, n, h]),
                temp: 1
            }, 500, laya.utils.Ease.sineIn, laya.utils.Handler.create(null, Tools.destroy, [t]), 300);
    }

    public static getGodAni(i: string): laya.display.Animation {
        return laya.net.ResourceVersion.manifest["clips/" + i + ".ani"] ? EffectManager.loadAnimation(i) : EffectManager.loadAnimation("god100_0");
    }

    public static particlesDic: any = {};

    /** Laya.static 惰性静态 */
    public static get _rect(): laya.maths.Rectangle {
        var v = new laya.maths.Rectangle();
        Object.defineProperty(EffectManager, "_rect", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get ignoreAni(): any {
        var v = { touch_sc: 1, glow000: 1 };
        Object.defineProperty(EffectManager, "ignoreAni", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get animationCache(): any {
        var v = { customGroup: {} };
        Object.defineProperty(EffectManager, "animationCache", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.manager.EffectManager")（2 参注册，无基类）。
 */
Laya.class(EffectManager, "sg.manager.EffectManager", null, null);
