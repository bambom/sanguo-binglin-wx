/**
 * sg.crossService.view.CrossServiceTroopClip —— 跨服战兵队行军剪辑（EntityClip 基座：
 * init 挂 topLayer + 秒级 checkShow 视野显隐 + settings_changed 行军线开关；
 * event 吞点击；showWay 铺 lineM 路线段；showWay2 终点线/箭头缩放；move/启动
 * startTween 逐转弯点补间（getAllTurnPath）；rush 加速剪辑挂载；entity 访问器
 * 覆写=基类 _$get_entity + 本类 setter（建 CrossServiceHeroClip、挂监听、showWay、
 * move）；visible 经基类描述符 superGet/superSet）。
 *
 * 原文：code1.js 字节 [3234538,3242124)（7,586B；包装变量 _d，1 参 IIFE 基类实参
 * (Pu)=sg.scene.view.entity.EntityClip（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.view.CrossServiceTroopClip",t) @3234760；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceTroopClip.js
 *
 * extends 决策：原文基类 Pu=sg.scene.view.entity.EntityClip（未译；自身基类
 * bc=sg.map.view.IsoObject 亦未译）→ temp extends 已译真祖先 x=laya.ui.Component，
 * 原型链缺 EntityClip/IsoObject 两层；EntityClip 原型链成员（init/destroy 经
 * prototype 全局路径 + cast、_scene/_clip/_entity/_cleared 类型层声明零发射）；
 * IsoObject.prototype.clear 经全局路径 + cast（-af 新声明 sg.map.view.IsoObject）。
 * EntityClip/IsoObject 落地后 1 行重指向 + 恢复 super(t)（债登记 batch-af-report §5）。
 * ctor：原文 `i.__super.call(this,t)` 带实参 t；temp 基座 laya.ui.Component d.ts
 * ctor 为 constructor()（0 参），t 不被其消费（运行期等价），暂写 super()。
 * 依赖（模块直引）：kc=CrossServiceMap（J ✓）、tn=ViewManager（A ✓）、Ht=ConfigClass
 * （C ✓）、le=EffectManager（B ✓）、Cc=CrossServiceHeroClip（本批 ✓）；
 * P=laya.utils.Handler、Ct=laya.utils.Tween、ut=laya.display.Sprite、ht=
 * laya.maths.Rectangle、et=laya.maths.Point、s=Laya、Ts=Laya.Trace（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b instance:any；CHU_COUNTRY 调回点 cast）、Ws=sg.duplicate.ModelDuplicateSettings
 * （-b instance:any）、xn=sg.scene.view.InputManager（canClick 调回点 cast）、
 * Nl=sg.model.ModelTroop（TROOP_MOVE_BAITUI 调回点 cast）、ro=sg.duplicate.ModelDuplicate
 * （-b instance:any）、ve=sg.map.utils.MapUtils（tileToIso/getKey 调回点 cast；
 * parseKey 已声明）、Ie=sg.map.utils.Vector2D（-b ctor 已声明；lerp/TEMP/x/y 调回点
 * cast）、ye=sg.map.utils.Math2（radianToAngle 已声明）、Pu=sg.scene.view.entity.
 * EntityClip（-u 空 shell；prototype.init/destroy/_$get_entity 调回点 cast）、
 * bc=sg.map.view.IsoObject（-af 新声明空类；prototype.clear 调回点 cast）。
 * ctor 求值序：turnPoints/tween/index/_way/_animation/waySp1/2/3/rushClip/
 * rushRoatation 十字段初始化器原文先于 __super.call，TS 移到 super 后（纯赋值，
 * 观测等价，批次 H 先例）。
 * accessor 形态（批次 V「dataSource getter 包装形」先例）：原文 r(0,e,"entity",
 * t.prototype._$get_entity,setter) 的 getter 为基类函数本体直传，TS accessor 产生新
 * 函数——译文 `return (<基类原型>)._$get_entity.call(this)` 单 return 精确形状，
 * 调用语义/this 绑定/返回值等价；descriptor.get 身份差异如实记录（F8 装载期
 * EntityClip 未译，函数本体直传会在模块求值期读全局路径，包装形推迟到首次访问）。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Sprite = laya.display.Sprite;
import Rectangle = laya.maths.Rectangle;
import Point = laya.maths.Point;
import Component = laya.ui.Component;
import { CrossServiceMap } from "./CrossServiceMap";
import { Tools } from "../../utils/Tools";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigClass } from "../../cfg/ConfigClass";
import { EffectManager } from "../../manager/EffectManager";
import { CrossServiceHeroClip } from "./CrossServiceHeroClip";

export class CrossServiceTroopClip extends Component {

    public turnPoints: any = [];
    public tween: any = null;
    public index: number = 0;
    public _way: any = [];
    public _animation: any = null;
    public waySp1: any = null;
    public waySp2: any = null;
    public waySp3: any = null;
    public rushClip: any = null;
    public rushRoatation: number = 0;
    /** EntityClip/IsoObject 原型链成员（类型层声明，无初始化器零发射） */
    public _scene: any;
    public _clip: any;
    public _entity: any;
    public _cleared: any;

    constructor(t?: any) {
        super();
    }

    public init(): void {
        (<any>sg.scene.view.entity.EntityClip.prototype).init.call(this), CrossServiceMap.instance.mapLayer.topLayer.addChild(this), this.on("click", this, this.onClick);
        var i = 100;
        this.hitArea = new Rectangle(-50, -i, i, i), this.entityMarch.isMyCountry || (this.checkShow(), this.timerLoop(1e3, this, this.checkShow)), sg.duplicate.ModelDuplicateSettings.instance.on("settings_changed", this, this.checkLine), this.checkLine();
    }

    public event(t: any, i?: any): any {
        return "click" == t && !(<any>sg.scene.view.InputManager.instance).canClick || laya.events.EventDispatcher.prototype.event.call(this, t, i) && !1;
    }

    public setCity(t: any, i: any): void {
        var e: any = i.toScreenPos2();
        t.x = e.x, t.y = e.y, this._scene.mapLayer.topLayer.addChild(t), this._way.push(t);
    }

    public checkLine(): void {
        this.entityMarch.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? this.waySp1.visible = sg.duplicate.ModelDuplicateSettings.instance.getSetting("escape_line") && this.visible : this.entityMarch.isMyCountry && !this.entityMarch.isMine && (this.waySp1.visible = sg.duplicate.ModelDuplicateSettings.instance.getSetting("friend_line") && this.visible);
    }

    public showWay(): void {
        for (var t: any = this.entityMarch, i = new Sprite(), e = 0, n: any = this.entityMarch.marchData.length - 1; e < n; e++) {
            var h: any = sg.crossService.model.CrossServiceMapModel.instance.getCity(this.entityMarch.marchData[e][0]).mapGrid.toScreenPos2(), o: any = sg.crossService.model.CrossServiceMapModel.instance.getCity(this.entityMarch.marchData[e + 1][0]).mapGrid.toScreenPos2(), r = new Sprite(), a: any = Laya.loader.getRes("map3/lineM.png");
            o.subtract(h), r.graphics.fillTexture(a, 0, 0, o.length, a.height, "repeat-x", new Point(0, 0)), r.rotation = sg.map.utils.Math2.radianToAngle(o.angle), this.setCity(r, sg.crossService.model.CrossServiceMapModel.instance.getCity(this.entityMarch.marchData[e][0]).mapGrid);
        }
        this.setCity(i, t.startGrid), this.setCity(EffectManager.loadAnimation("building_aim", t.position <= 100 ? "in|stand" : "stand", 0, null, "map"), t.endGrid);
    }

    public checkShow(): void {
        this._scene.mapLayer.getTileGrid(this.x - CrossServiceMap.offset.x, this.y - CrossServiceMap.offset.y, Point.TEMP);
        var t: any = (<any>sg.map.utils.MapUtils).tileToIso(new sg.map.utils.Vector2D(Point.TEMP.x, Point.TEMP.y));
        Laya.Trace.log(this.entityMarch.hero + "---\x3e" + (t.x + 2) + "," + (t.y + 1)), this.visible = CrossServiceMap.instance.floorContainer.viewObj[(<any>sg.map.utils.MapUtils).getKey(t.x + 1, t.y)], this.waySp1 && this.waySp1.visible != this.visible && this.checkLine();
    }

    public onClick(): void {
        this.entityMarch.isMine ? ViewManager.instance.showView(ConfigClass.VIEW_CROSS_SERVICE_TROOP_DETAIL, this.entityMarch) : sg.duplicate.ModelDuplicate.instance.showHeroInfo(this.entityMarch.uid, this.entityMarch.hero);
    }

    public showWay2(): void {
        var t = new sg.map.utils.Vector2D(this.x, this.y), i: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(this.entityMarch.marchData[this.entityMarch.marchData.length - 1][0]).toScreenPos2();
        i.subtract(t), this.waySp2.scaleX = i.length / this.waySp2.texture.sourceWidth, this.waySp3.x = i.length - this.waySp3.width - 12, this.waySp1.rotation = sg.map.utils.Math2.radianToAngle(i.angle), this.waySp1.x = this.x, this.waySp1.y = this.y;
    }

    public changeCityHandler(): void {
        this.entityMarch.moveIndex != this.entityMarch.marchData.length - 1 && (this.entityMarch.isRush ? this.rushClip || (this.rushClip = EffectManager.loadAnimation("duplicate_speedup"), this._clip.addChildAt(this.rushClip, 0), this.rushClip.rotation = this.rushRoatation) : this.rushClip && (this.rushClip.destroy(), this.rushClip = null));
    }

    public repeatHandler(t: any): void {
        t < 4 || (this.move(), this.setUI());
    }

    public setUI(): void {
        var t: any = this.entityMarch.remainTime(0);
        this._animation.marchInfo.initUI(this.entityMarch.remainTime(), t);
    }

    public onRecallHandler(t: any): void {
        this.move(), this.setUI();
    }

    public move(t?: any): void {
        void 0 === t && (t = !0);
        var i: any = this.entityMarch;
        if (!i.cleared) if (i.isFinish) {
            var e: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(i.marchData[i.marchData.length - 1][0]).toScreenPos2();
            this.pos(e.x, e.y);
        } else {
            var n: any = i.position - i.getDistByIndex(i.moveIndex - 1), h: any = n / (1 * i.marchData[i.moveIndex][2] / 1), o: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(i.marchData[i.moveIndex][0]).toScreenPos2(), r: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(i.marchData[i.moveIndex + 1][0]).toScreenPos2(), a: any = h - parseInt(h.toString());
            (<any>sg.map.utils.Vector2D).lerp(o, r, a, (<any>sg.map.utils.Vector2D).TEMP), t && (this.x = (<any>sg.map.utils.Vector2D).TEMP.x, this.y = (<any>sg.map.utils.Vector2D).TEMP.y), this.index = 0, this.turnPoints = [], this.tween && this.tween.clear(), this.turnPoints = this.turnPoints.concat(this.getAllTurnPath(n, i.moveIndex));
            for (var l = i.moveIndex + 1, c = i.marchData.length - 1; l < c; l++) this.turnPoints = this.turnPoints.concat(this.getAllTurnPath(0, l));
            this.entityMarch.moveReadyTime > 0 ? (Laya.Trace.log("计时2---" + this.entityMarch.moveReadyTime + "----"), Laya.timer.once(this.entityMarch.moveReadyTime, this, this.startTween)) : this.startTween();
        }
    }

    public startTween(): void {
        if (this.tween && this.tween.clear(), this.tween = null, this.turnPoints.length != this.index) {
            var t: any = this.turnPoints[this.index];
            this.index++;
            var i: any = t[0], e: any = t[2] * t[3] / this.entityMarch.rate;
            t[5];
            if (0 == e) this.startTween();
            else {
                this.turnPoints.length == this.index && (e += 1);
                var s: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid2(i).toScreenPos2();
                this.tween = Tween.to(this, { x: s.x, y: s.y, update: this.waySp1 ? new Handler(this, this.showWay2) : null }, 1e3 * e, null, new Handler(this, this.startTween), 0, !1, !1);
                var n: any = this.y > s.y ? [0, 3] : [1, 2];
                this._animation.changeDir(this.x < s.x ? n[0] : n[1]), this.rushRoatation = sg.map.utils.Math2.radianToAngle(s.subtract(new sg.map.utils.Vector2D(this.x, this.y)).angle), this.rushClip && (this.rushClip.rotation = this.rushRoatation);
            }
        }
    }

    public getAllTurnPath(t: any, i: any): any {
        for (var e: any = this.entityMarch, s = [], n = 0, h: any = 1 * e.marchData[i][2] / e.marchData[i][1], o: any = t / (1 * e.marchData[i][2]), r: any = o - parseInt(o.toString()), a = r ? 1 - r : 0, l = Math.ceil(o); l < 1; l++) {
            var c: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(e.marchData[i][0]), u: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid3(e.marchData[i + 1][0]), d: any = new sg.map.utils.Vector2D(c.col, c.row), _: any = new sg.map.utils.Vector2D(u.col, u.row);
            0 == n ? (n = d.x == _.x ? 1 : -1, s.push([d, i, a, h, l]), a = 0) : (1 == n && d.x != _.x || -1 == n && d.y != _.y) && (s.push([d, i, a, h, l]), n = -n, a = 0), a++;
        }
        var m: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid2(sg.map.utils.MapUtils.parseKey(e.marchData[i + 1][0])), g: any = new sg.map.utils.Vector2D(m.col, m.row);
        return s.push([g, 1, a, h, l]), s;
    }

    public clear(): void {
        this._cleared || (<any>sg.map.view.IsoObject.prototype).clear.call(this);
    }

    public clearWay(): void {
        var t: any = this._way;
        Laya.timer.callLater(t, function () { for (var i = 0, e = t.length; i < e; i++) Tools.destroy(t[i]); }), this._way = [];
    }

    public destroy(i?: any): void {
        void 0 === i && (i = !0), (<any>sg.scene.view.entity.EntityClip.prototype).destroy.call(this, i), this._entity.off("dw.troop_move_dismiss_push", this, this.onRecallHandler), this._entity.off("repeat", this, this.repeatHandler), this._entity.off("dw.troop_change_city", this, this.changeCityHandler), this._entity.off("w.troop_move_delete", this, this.clear), this._entity.off("marchComplete", this, this.clear), sg.duplicate.ModelDuplicateSettings.instance.off("settings_changed", this, this.checkLine), this.entityMarch.view = null, this.clearWay();
    }

    /** r(0,e,"entity",t.prototype._$get_entity,setter) —— getter 为基类（Pu=EntityClip
     * 原型链）_$get_entity 函数本体（包装形等价，见类头注）；setter superSet 走基类
     * 描述符后建 CrossServiceHeroClip、挂事件、行军线、move（求值序逐项直译）。 */
    public get entity(): any {
        return (<any>sg.scene.view.entity.EntityClip.prototype)._$get_entity.call(this);
    }

    public set entity(t: any) {
        Laya.superSet(sg.scene.view.entity.EntityClip, this, "entity", t), this._animation = new CrossServiceHeroClip(), this._animation.init2(this.entityMarch), this._clip.addChild(this._animation), this._entity.on("dw.troop_move_dismiss_push", this, this.onRecallHandler), this._entity.on("repeat", this, this.repeatHandler), this._entity.on("dw.troop_change_city", this, this.changeCityHandler), this._entity.once("dw.troop_move_delete", this, this.clear), this._entity.once("marchComplete", this, this.clear), this.setUI(), this.changeCityHandler(), this.entityMarch.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI || this.entityMarch.isMyCountry && !this.entityMarch.isMine ? (this.waySp1 = new Sprite(), this.waySp2 = new Sprite(), this.waySp3 = new Sprite(), this.waySp1.addChild(this.waySp2), this.waySp1.addChild(this.waySp3), this.waySp2.texture = Laya.loader.getRes(this.entityMarch.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? "map3/lineD.png" : this.entityMarch.country == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? "map3/lineB.png" : "map3/lineG.png"), this.waySp3.texture = Laya.loader.getRes(this.entityMarch.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? "map3/jianD.png" : this.entityMarch.country == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? "map3/jianB.png" : "map3/jianG.png"), this.setCity(this.waySp1, this.entityMarch.startGrid)) : this.entityMarch.isMine && this.showWay(), this.move();
    }

    /** r(0,e,"visible",getter,setter) —— 经基类（Pu）描述符的 superGet/superSet 直译 */
    public get visible(): boolean {
        return Laya.superGet(sg.scene.view.entity.EntityClip, this, "visible");
    }

    public set visible(t: boolean) {
        Laya.superSet(sg.scene.view.entity.EntityClip, this, "visible", t);
    }

    /** r(0,e,"entityMarch",function(){return this.entity}) —— 纯读转发 */
    public get entityMarch(): any {
        return this.entity;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.CrossServiceTroopClip",t)
 * （t=Pu=sg.scene.view.entity.EntityClip，未译缓译；TS extends 层暂挂 laya.ui.Component）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopClip, "sg.crossService.view.CrossServiceTroopClip", null, null);
