/**
 * sg.scene.SceneMain —— TiledMap 场景基座：initScene(json) → 瓦片数据/图集图
 * 预检（checkMapDataIsLoaded/checkImagesIsLoaded）→ createMap（TiledMap 建图 +
 * EventLayer + InputManager 绑定 + 视口 padding 横竖屏二选一）→ initMap（mapSprite
 * 入场 + callLater 派发 complete）。HOME/MAP/MINI_MAP/CROSS_SERVICE/HOMELAND/
 * HOMELAND_USER/PUPPET/WINESHOP 为场景类型枚举（getSceneMain switch 的判别值源）。
 *
 * 原文：code1.js 字节 [2747824,2750740)（包装变量 Il，声明器单一 CallExpression
 * `},i}(ut),Il=function(t){…}(Il 前邻}` 实证；基类实参 ut=laya.display.Sprite）。
 * 注册：o(i,"sg.scene.SceneMain",t) 3 参，off 2748081。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-j/SceneMain.js
 *
 * 入批依据：sg.crossService.view.CrossServiceMap（批次 J 死点本体）的 extends 硬
 * 依赖——TS 基类表达式需运行时存在的构造器，未译则模块求值即 TypeError（批次 I
 * TestPakcageUI/MH 先例）。本类自基链止于引擎 Sprite，ctor 硬依赖仅 It=
 * laya.map.TiledMap（引擎）——**模块求值 0 未译触达**。
 *
 * 别名（作用域链解析，resolve_j.js acorn 实证）：s=Laya、P=laya.utils.Handler、
 * ht=laya.maths.Rectangle、et=laya.maths.Point、ut=laya.display.Sprite、
 * It=laya.map.TiledMap、W=laya.ui.Label、Rt=sg.cfg.ConfigApp（B ✓ 模块直引）、
 * be=sg.map.utils.TestUtils（B ✓ 模块直引）、le=sg.manager.EffectManager
 * （B ✓ 模块直引）、Ye=sg.scene.view.MapCamera（未译，ambient）、
 * Qc=sg.scene.view.EventLayer（未译，ambient）、xn=sg.scene.view.InputManager
 * （未译，ambient 既有；scene/on 走 (<any>) 调回点 cast，批次 D 先例）、
 * o=UMD 头注册助手。
 *
 * 保真注记：
 * - 原文 ctor 11 项字段赋值先于 __super.call(this)，TS 统一移到 super() 后
 *   （纯赋值无 super 链读取者，观测等价，批次 H 先例）；tMap=new It 同步后移。
 * - createMap 的 `var t=this` 闭包自引与 scaleChange 回调 bubbles 遍历原样保留；
 *   回调形参 i 遮蔽类名 i（原文如此——本译文类名标识符不同，无遮蔽）。
 * - rightMouseDown 局部 `var s=new ut` 遮蔽 Laya 别名 s（本方法不用 Laya，保留
 *   局部名）；emoji 日志串原文如此。
 * - destroy 的 tMap.destroy() 后置 null 三连（mapGrid/mapLayer/tMap）顺序保留。
 */
import Handler = laya.utils.Handler;
import Rectangle = laya.maths.Rectangle;
import Point = laya.maths.Point;
import Sprite = laya.display.Sprite;
import TiledMap = laya.map.TiledMap;
import Label = laya.ui.Label;
import { ConfigApp } from "../cfg/ConfigApp";
import { TestUtils } from "../map/utils/TestUtils";
import { EffectManager } from "../manager/EffectManager";

export class SceneMain extends Sprite {

    // ---- 实例字段（原文构造体逐项；初始化器见 ctor） ----
    public mapUrl: string;
    public mapGrid: any;
    public mapLayer: any;
    public minScale: number;
    public maxScale: number;
    public springMinScale: number;
    public springMaxScale: number;
    public type: number;
    public bubbles: any[];
    public created: boolean;
    public effects: any;
    public tMap: TiledMap;

    constructor() {
        super();
        this.mapUrl = null,
            this.mapGrid = null,
            this.mapLayer = null,
            this.minScale = 1,
            this.maxScale = 1,
            this.springMinScale = .05,
            this.springMaxScale = .2,
            this.type = -1,
            this.bubbles = [],
            this.created = !1,
            this.effects = {},
            this.tMap = new TiledMap();
    }

    /** 场景数据装载入口（json 路径），ViewLoad 系 initScene("map3/xxx.json") 同源 */
    public initScene(t: string): void {
        this.mapUrl = t,
            this.checkMapDataIsLoaded();
    }

    public checkMapDataIsLoaded(): void {
        Laya.loader.getRes(this.mapUrl) ? this.checkImagesIsLoaded() : Laya.loader.load(this.mapUrl, Handler.create(this, this.checkImagesIsLoaded));
    }

    public checkImagesIsLoaded(): void {
        var t: any = Laya.loader.getRes(this.mapUrl);
        this.mapGrid.cols || this.mapGrid.init(t.width, t.height, t.tilewidth, t.tileheight, t.orientation);
        var i = this.mapUrl.replace(/\b\w+\.json$/, ""), e = t.tilesets.map(function (t: any) { return i + t.image; });
        e.length && !Laya.loader.getRes(e[0]) ? Laya.loader.load(e, Handler.create(this, this.createMap)) : this.createMap();
    }

    public createMap(): void {
        var t = this;
        sg.scene.view.MapCamera.initScene(this),
            this.tMap.autoCacheType = "normal",
            this.tMap.antiCrack = !0;
        var i = new Rectangle(0, 0, Laya.stage.width, Laya.stage.height + 100),
            e = new Point(parseInt((512 / this.mapGrid.gridW).toString()) * this.mapGrid.gridW, parseInt((512 / this.mapGrid.gridH).toString()) * this.mapGrid.gridH);
        this.hitArea = new Rectangle(0, 0, Laya.stage.width, Laya.stage.height),
            this.size(Laya.stage.width, Laya.stage.height),
            this.mapLayer = new sg.scene.view.EventLayer(),
            this.mapLayer.scene = this,
            (<any>sg.scene.view.InputManager.instance).scene = this,
            (<any>sg.scene.view.InputManager.instance).on("click", this, this.onClickHandler),
            this.on("scaleChange", this, function (i: any) {
                for (var e = 0, s = t.bubbles.length; e < s; e++)
                    t.bubbles[e].visible && t.bubbles[e].resize();
            });
        var n: Rectangle = null;
        n = ConfigApp.isHorizontal ? new Rectangle(150, 150, -50, 0) : new Rectangle(150, 100, -50, -50),
            this.tMap.createMap(this.mapUrl, i, Handler.create(this, this.initMap), n, e, !0);
    }

    /** 子类覆写（CrossServiceMap.onClickHandler 转调 t.prototype.onClickHandler 即此空实现） */
    public onClickHandler(t: any): void {
    }

    public initMap(): void {
        var t = this;
        this.addChild(this.tMap.mapSprite()),
            this.tMap.setViewPortPivotByScale(0, 0),
            this.mapLayer.init(null, this.tMap),
            this.tMap.scale = 1,
            Laya.timer.callLater(this, function () {
                t.created = !0, t.event("complete");
            }),
            TestUtils.isTestShow && this.on("rightclick", this, this.rightMouseDown);
    }

    public move(t: any, i: any): void {
        this.tMap.moveViewPort(t, i),
            this.event("moveChange");
    }

    /** 子类覆写（CrossServiceMap.createClip 转调基类取 null） */
    public createClip(t?: any): any {
        return void 0 === t && (t = -1), null;
    }

    /** 测试态右键调试（isTestShow 门控）：坐标换算 + glow011 动画 + Label 打点 */
    public rightMouseDown(t: any): void {
        var i = t.stageX, e = t.stageY;
        i = Math.round(i / this.tMap.scale - this.tMap.viewPortX),
            e = Math.round(e / this.tMap.scale - this.tMap.viewPortY);
        var s = new Sprite();
        s.pos(i, e),
            this.mapLayer.effectLayer.addChild(s),
            s.localToGlobal(Point.TEMP.setTo(i, e));
        var n: any = EffectManager.loadAnimation("glow011");
        n.scale(.5, .5);
        var h = [i, e].join(), o = new Label(h);
        o.align = "center",
            o.anchorX = o.anchorY = .5,
            o.fontSize = 28,
            o.stroke = 4,
            o.strokeColor = "#FFFF00",
            s.addChildren(n, o),
            console.log("🚀 ~ 右键点击了：" + h);
    }

    public destroy(i?: boolean): void {
        void 0 === i && (i = !0),
            (<any>sg.scene.view.InputManager.instance).off("click", this, this.onClickHandler),
            this.tMap.destroy(),
            this.mapGrid = null,
            this.mapLayer = null,
            this.tMap = null,
            super.destroy(i);
    }

    // ---- 场景类型枚举（getSceneMain 的判别值源，i.HOME=0…i.WINESHOP=7） ----
    public static HOME: number = 0;
    public static MAP: number = 1;
    public static MINI_MAP: number = 2;
    public static CROSS_SERVICE: number = 3;
    public static HOMELAND: number = 4;
    public static HOMELAND_USER: number = 5;
    public static PUPPET: number = 6;
    public static WINESHOP: number = 7;
}

/**
 * 注册身份等价物：原文 o(i,"sg.scene.SceneMain",t)（t=ut=laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(SceneMain, "sg.scene.SceneMain", null, null);
