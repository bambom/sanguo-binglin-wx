/**
 * sg.crossService.view.CrossServiceMap —— 跨服战大地图场景（type=3，getSceneMain
 * case 3 直 new）：SceneMain 基座 + FloorContainer 楼层容器 + CrossServiceMapModel
 * 数据驱动（ctor 内 (new so).init(Handler(this,this.init)) 装载后 init 建视角），
 * 兵队气泡（initTroopBubble/Bubble+building_tips6UI）、买兵/买体力弹窗
 * （checkBuyArmy/buyArmy/alertBuyEnergy）、战报处理（onEventHandler 的
 * dw.troop_move_push/dw.troop_runaway_push）、结束面板（showFinish）。
 *
 * **批次 J 死点本体**：ViewManager.showScenes 首行与 closeScenes 尾段均读
 * `sg.crossService.view.CrossServiceMap.instance`（ViewManager.ts:470/509）——
 * `sg.crossService.view` 命名空间此前不存在（批次 I 仅注册 sg.crossService.
 * CrossServiceFacade），F8 报 `Cannot read properties of undefined (reading
 * 'CrossServiceMap')`。本类注册后命名空间补全；`.instance` 原文为**普通静态**
 * （`i.instance=null` 显式初始化，ctor 内 `i.instance=this` 覆写，非 h() 惰性
 * getter）——未构造时为 null，showScenes 首行 `&&` 短路，ctor 不在启动路径执行。
 *
 * 原文：code1.js 字节 [2945838,2951165)（function 表达式 span，kc= 前缀 3B 不含；（包装变量 kc，声明器单一 CallExpression
 * `},i}(bl),kc=function(t){…}(Il),Tc=` 实证——非 Ee 式逗号双跳；基类实参
 * Il=sg.scene.SceneMain，本批同译）。注册：o(i,"sg.crossService.view.
 * CrossServiceMap",t) 3 参 @2946123。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-j/CrossServiceMap.js
 *
 * 别名（resolve_j.js acorn 作用域链 + var-map-all/别名表/池串三源双证）：
 * 已译模块直引——Il=SceneMain（本批）、$t=CrossServiceFacade（I ✓）、Rt=ConfigApp
 * （B ✓）、Gt=ConfigServer（B ✓）、Ht=ConfigClass（C ✓）、tn=ViewManager（A ✓）、
 * vs=Tools（B ✓）、ue=ModelManager（B ✓）、as=MusicManager（B ✓）、be=TestUtils
 * （B ✓）、le=EffectManager（B ✓）；引擎——P=laya.utils.Handler、et=
 * laya.maths.Point、ht=laya.maths.Rectangle、s=Laya、o/h=UMD 头注册/惰性静态
 * 助手；未译（ambient 全局路径）——so=sg.crossService.model.CrossServiceMapModel
 * （[1691593,1702652) 缓译，批次 I §3）、xl=sg.crossService.view.FloorContainer
 * （[2750748,2753490)）、Ye=sg.scene.view.MapCamera（@1072389，2 参注册缺口）、
 * xn=sg.scene.view.InputManager、_d=sg.crossService.view.CrossServiceTroopClip
 * （@3234760）、Vd=sg.puppet.view.ViewMenuCross（@3334362）、Ws=sg.duplicate.
 * ModelDuplicateSettings（@1260090）、Ic=sg.scene.view.ui.Bubble（@2936258）、
 * ik=ui.com.building_tips6UI（@3752483）、Nl=sg.model.ModelTroop（ambient 既有，
 * TROOP_STATE_* 已声明）、ci=sg.fight.FightMain（池串 17792 双证，ambient 既有）、
 * ve=sg.map.utils.MapUtils（ambient 既有，getKey/tileToIso 调回点 cast）、
 * Ie=sg.map.utils.Vector2D（@930931，2 参注册缺口）、Ve=sg.scene.constant.
 * ConfigConstant（ambient 既有，ENTITY_CROSS_SERVICE_TILE 调回点 cast）。
 *
 * 保真注记：
 * - ctor 字段（含 `new xl`、`i.instance=this`）原文在 __super 之前，TS 移到
 *   super() 后（纯赋值，FloorContainer ctor 不读父链状态，观测等价，批次 H 先例）。
 * - `i.instance=this` / destroy 尾 `i.instance=null` 为**类静态读写** →
 *   CrossServiceMap.instance（原文非惰性 getter）。
 * - onClickHandler 内 `e.stageX-i.offset.x*…` 的 i 是类（读 h() 惰性静态
 *   offset=Point(1750,430)），译文以 CrossServiceMap.offset 直引（注册后同一
 *   对象，NetSocket.ts 头注先例）。
 * - initMap 局部 var o/r（tileWidth/2、tileHeight/2）遮蔽 UMD 助手 o/注册器
 *   （本方法不用助手，保留局部名）；initTroopBubble 局部 var s（Bubble）遮蔽
 *   Laya（同上）。
 * - tMap.limitRect 为 1.8.15beta 运行时面（1.8.17 d.ts 未声明）→ (<any>) cast
 *   （批次 E 引擎私有面先例）。
 * - MapUtils.getKey/tileToIso、ConfigConstant.ENTITY_CROSS_SERVICE_TILE、
 *   InputManager.instance.scene 既有 ambient 未声明 → 调回点 (<any>) cast。
 */
import Handler = laya.utils.Handler;
import Point = laya.maths.Point;
import Rectangle = laya.maths.Rectangle;
import { SceneMain } from "../../scene/SceneMain";
import { CrossServiceFacade } from "../CrossServiceFacade";
import { ConfigApp } from "../../cfg/ConfigApp";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { MusicManager } from "../../utils/MusicManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { EffectManager } from "../../manager/EffectManager";

export class CrossServiceMap extends SceneMain {

    // ---- 实例字段（原文构造体逐项；初始化器见 ctor） ----
    public _scene: any;
    public ui: any;
    public _isFinish: boolean;
    public troopBubbles: any;
    public floorContainer: any;

    constructor() {
        super();
        this._scene = null,
            this.ui = null,
            this._isFinish = !1,
            this.troopBubbles = {},
            this.floorContainer = new sg.crossService.view.FloorContainer(),
            this.type = 3,
            CrossServiceMap.instance = this,
            this.minScale = .5,
            this.maxScale = 1,
            sg.scene.view.MapCamera.initScene(this),
            new sg.crossService.model.CrossServiceMapModel().init(new Handler(this, this.init));
    }

    /** MapModel 装载完成回调（ctor 内 (new so).init 触发）：视角限制 + 场景 json 装载 + 事件订阅 */
    public init(): void {
        this.mapGrid = sg.crossService.model.CrossServiceMapModel.instance.mapGrid,
            ConfigApp.isPC ? (<any>this.tMap).limitRect.setTo(0, 0, 50, 80) : (<any>this.tMap).limitRect.setTo(0, 40, 50, 320),
            this._scene = (<any>sg.scene.view.InputManager.instance).scene,
            this.initScene("map3/crossservice.json"),
            sg.crossService.model.CrossServiceMapModel.instance.on("dw.troop_move_push", this, this.onEventHandler),
            sg.crossService.model.CrossServiceMapModel.instance.on("dw.troop_runaway_push", this, this.onEventHandler);
    }

    public onEventHandler(t: any): void {
        var i = t.type, e = t.model;
        switch (i) {
            case "dw.troop_move_push":
            case "dw.troop_runaway_push":
                this.addTroop(e);
        }
    }

    /** 基座 initMap 扩展：四分图手工铺地 + 兵队/气泡初始化 + 视角定焦 + 菜单 UI */
    public initMap(): void {
        SceneMain.prototype.initMap.call(this),
            this.mapLayer.effectLayer.pos(0, 0);
        var i: any = Laya.loader.getRes("map3/map3_1.jpg"), e: any = Laya.loader.getRes("map3/map3_2.jpg"),
            n: any = Laya.loader.getRes("map3/map3_3.jpg"), h: any = Laya.loader.getRes("map3/map3_4.jpg"),
            o = -this.tMap.tileWidth / 2, r = -this.tMap.tileHeight / 2;
        this.mapLayer.floorLayer.graphics.drawTexture(i, o, r),
            this.mapLayer.floorLayer.graphics.drawTexture(e, i.width + o, r),
            this.mapLayer.floorLayer.graphics.drawTexture(n, o, i.height + r),
            this.mapLayer.floorLayer.graphics.drawTexture(h, i.width + o, i.height + r),
            this.initTroopBubble(),
            this.floorContainer.init(),
            this.initTroop(),
            sg.scene.view.MapCamera.zoom(-.2),
            this.tMap.scale = .8,
            sg.scene.view.MapCamera.lookAtCrossServiceGrid((<any>sg.map.utils.MapUtils).getKey(ConfigServer.duplicate.focusing[sg.crossService.model.CrossServiceMapModel.instance.country][0], ConfigServer.duplicate.focusing[sg.crossService.model.CrossServiceMapModel.instance.country][1])),
            this.ui = new sg.puppet.view.ViewMenuCross(),
            this.ui.size(this.width, this.height),
            this.addChild(this.ui),
            this.ui.menuCross.init(),
            sg.crossService.model.CrossServiceMapModel.instance.finishData && this.showFinish(sg.crossService.model.CrossServiceMapModel.instance.finishData.win_country, sg.crossService.model.CrossServiceMapModel.instance.finishData.win_type),
            MusicManager.playMusic(MusicManager.BG_CROSSSERVICE);
    }

    public initTroop(): void {
        for (var t in sg.crossService.model.CrossServiceMapModel.instance.troops)
            for (var i in sg.crossService.model.CrossServiceMapModel.instance.troops[t])
                this.addTroop(sg.crossService.model.CrossServiceMapModel.instance.troops[t][i]);
    }

    public addTroop(t: any): void {
        if (t.state == sg.model.ModelTroop.TROOP_STATE_MOVE || t.state == sg.model.ModelTroop.TROOP_STATE_RECALL) {
            var i = new sg.crossService.view.CrossServiceTroopClip(this);
            i.entity = t, t.view = i, i.init();
        }
    }

    public onClickHandler(e: any): void {
        if (SceneMain.prototype.onClickHandler.call(this, e), !TestUtils.mapEdit && this.visible && this.mouseEnabled && !this._isFinish) {
            var s = e.stageX, n = e.stageY;
            s = s / this.tMap.scale - this.tMap.viewPortX - this.mapGrid.gridHalfW,
                n = n / this.tMap.scale - this.tMap.viewPortY - this.mapGrid.gridHalfH,
                this.mapLayer.getTilePositionByScreenPos(e.stageX - CrossServiceMap.offset.x * this.tMap.scale, e.stageY - CrossServiceMap.offset.y * this.tMap.scale, Point.TEMP);
            var h = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid2((<any>sg.map.utils.MapUtils).tileToIso(new sg.map.utils.Vector2D(Point.TEMP.x, Point.TEMP.y)));
            if (h) h.getEntityOne((<any>sg.scene.constant.ConfigConstant).ENTITY_CROSS_SERVICE_TILE).view.onClick();
        }
    }

    public inFight(t: any, i: any): void {
        if (sg.crossService.model.CrossServiceMapModel.instance) {
            i.mode = 80,
                i.country = t.country;
            var e = Math.floor(CrossServiceFacade.getServerTimer() / 1e3);
            if (!i.last_battle_result) {
                var s = Math.max(0, i.fight_time - e);
                s > 0 && (i.readyTime = 1e3 * s);
            }
            i.duplicate_level = sg.crossService.model.CrossServiceMapModel.instance.level,
                sg.fight.FightMain.startCountryBattle(i, this, this.outFight, [t]);
        }
    }

    public outFight(t: any): void {
        CrossServiceFacade.instance.socket.send("dw.unfollow_fight", {
            cid: t.cid
        });
    }

    public createClip(i?: number): any {
        return void 0 === i && (i = -1), SceneMain.prototype.createClip.call(this, i);
    }

    public destroy(e?: boolean): void {
        void 0 === e && (e = !0),
            Laya.loader.clearTextureRes("map3/map3_1.jpg"),
            Laya.loader.clearTextureRes("map3/map3_2.jpg"),
            Laya.loader.clearTextureRes("map3/map3_3.jpg"),
            Laya.loader.clearTextureRes("map3/map3_4.jpg"),
            this.ui && this.ui.destroy(),
            sg.crossService.model.CrossServiceMapModel.instance.off("dw.troop_move_push", this, this.onEventHandler),
            sg.crossService.model.CrossServiceMapModel.instance.off("dw.troop_runaway_push", this, this.onEventHandler),
            sg.duplicate.ModelDuplicateSettings.instance.off("settings_changed", this, this.checkBubble),
            sg.crossService.model.CrossServiceMapModel.instance.clear(),
            super.destroy(e),
            EffectManager.clearCacheGroup("map"),
            CrossServiceMap.instance = null;
    }

    public showFinish(t: any, i: any): void {
        this.ui.menuCross.showFinish(t, i),
            this._isFinish = !0;
    }

    public alertBuyEnergy(t: any, i: any): void {
        ViewManager.instance.showAlert(Tools.getMsgById("_duplicate028", [ConfigServer.duplicate.energy_buy[0]]), function (e: any) {
            e || sg.crossService.model.CrossServiceMapModel.instance.sendBuyEnergy(t, i);
        }, ["coin", sg.crossService.model.CrossServiceMapModel.instance.getTroop(ModelManager.instance.modelUser.mUID, t).buyEnergyCoin]);
    }

    public checkBuyArmy(t: any): boolean {
        return !!(t.troopData && t.troopData.end_time - CrossServiceFacade.getServerTimer() / 1e3 > ConfigServer.duplicate.revive_cost[2]) || (ViewManager.instance.showTipsTxt(Tools.getMsgById("kuafu_22")), !1);
    }

    public buyArmy(t: any): boolean {
        if (!this.checkBuyArmy(t)) return !1;
        var i = this;
        return !!Tools.isCanBuy("coin", t.buyReveieCoin, !0) && (ViewManager.instance.showAlert(Tools.getMsgById("kuafu_21", [t.buyReveieCoin, t.buyReciveCoinCount, ConfigServer.duplicate.revive_cost[0].length]), new Handler(this, function (e: any) {
            0 == e && i.checkBuyArmy(t) && CrossServiceFacade.instance.socket.send("d.revive_troop_army", {
                hid: t.hero
            }, new Handler(i, function (i: any) {
                var e: any = {};
                e.user = {
                    coin: i.receiveData.user.coin
                },
                    ModelManager.instance.modelUser.updateData(e),
                    t.changeHP(ConfigServer.duplicate.revive_cost[3], !1),
                    t.fireEvent("coin_hp");
            }));
        })), !0);
    }

    /** 我的部队气泡（Bubble 容器 + building_tips6UI 图标，highlight 设置联动） */
    public initTroopBubble(): void {
        for (var t: any = sg.crossService.model.CrossServiceMapModel.instance.getMyTroops, i = 0, e = t.length; i < e; i++) {
            var s = new sg.scene.view.ui.Bubble();
            s.initScene(this);
            var n = new ui.com.building_tips6UI(), h = t[i].modelHero;
            n.setBuildingTipsIcon3(h.getHeadId(!1)),
                n.icon_img.visible = !1,
                s.addChild(n),
                this.troopBubbles[h.id] = s,
                s.hitArea = new Rectangle(-n.width / 2, -n.height, n.width, n.height),
                s.on("click", this, function (t: any) {
                    t.cityInFire || ViewManager.instance.showView(ConfigClass.VIEW_CROSS_SERVICE_TROOP_DETAIL, t);
                }, [t[i]]);
        }
        sg.duplicate.ModelDuplicateSettings.instance.on("settings_changed", this, this.checkBubble),
            this.checkBubble();
    }

    public checkBubble(): void {
        for (var t in this.troopBubbles)
            this.troopBubbles[t].visible = sg.duplicate.ModelDuplicateSettings.instance.getSetting("highlight");
    }

    /** 原文 i.instance=null（普通静态字段：ctor 覆写、destroy 清 null，非惰性 getter） */
    public static instance: CrossServiceMap = null;

    /** 原文 h(i,["offset",function(){return this.offset=new et(1750,430)}]) 惰性静态：
     * 首访构造并以自身数据属性缓存（ModelBuiding/CrossServiceFacade 批次 F/I 同款）。 */
    public static get offset(): Point {
        var v = new Point(1750, 430);
        Object.defineProperty(CrossServiceMap, "offset", { value: v, writable: !0, enumerable: !0, configurable: !0 });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.CrossServiceMap",t)
 * （t=Il=sg.scene.SceneMain，`}(Il)` 实测）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 * 本注册同时创建 sg.crossService.view 命名空间（ViewManager.showScenes:470 /
 * closeScenes:509 的读取前提）。
 */
Laya.class(CrossServiceMap, "sg.crossService.view.CrossServiceMap", null, null);
