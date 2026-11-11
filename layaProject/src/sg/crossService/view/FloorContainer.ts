/**
 * sg.crossService.view.FloorContainer —— 跨服战楼层/遮罩/标记容器（init 铺 TileClip
 * 楼层网格 + initMask 双 Sprite 遮罩/标记；getTileViewField 汇本国城 viewGrids +
 * 兵队周边格（getAroundCrossServiceGrid）；updateMask 遮罩显隐缩放补间并触发楼层
 * onUpdateUI；checkMask 供信息条查询）。
 *
 * 原文：code1.js 字节 [2750748,2753490)（2,742B；包装变量 xl，1 参 IIFE 基类实参
 * (ut)=laya.display.Sprite，明文 3 参注册 o(i,"sg.crossService.view.FloorContainer",
 * t) @2751093；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/FloorContainer.js
 *
 * extends 决策：原文基类 ut=laya.display.Sprite（引擎）→ 直接 extends Sprite。
 * 依赖（模块直引）：kc=CrossServiceMap（J ✓）、Gt=ConfigServer（B ✓）；
 * 批内互引：a_=TileClip、dd=CrossServiceClip（本批 ✓）；
 * P=laya.utils.Handler、Ct=laya.utils.Tween、k=laya.utils.Ease、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b：instance:any 面足够；AC 在途独占 model 目录，本批不 import）、
 * ve=sg.map.utils.MapUtils（-b：parseKey 已声明；getKey/getAroundCrossServiceGrid
 * 调回点 cast）、Nl=sg.model.ModelTroop（-b：TROOP_STATE_RECALL 已声明；
 * TROOP_MOVE_BAITUI 调回点 cast）。
 * ctor 求值序：floors/viewObj/masks/marks 四 {} 字段初始化器原文先于 __super.call，
 * TS 移到 super 后（纯赋值，观测等价，批次 H 先例）。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Sprite = laya.display.Sprite;
import { CrossServiceMap } from "./CrossServiceMap";
import { ConfigServer } from "../../cfg/ConfigServer";
import { TileClip } from "./TileClip";
import { CrossServiceClip } from "./CrossServiceClip";

export class FloorContainer extends Sprite {

    public floors: any = {};
    public viewObj: any = {};
    public masks: any = {};
    public marks: any = {};
    public campContainer: any;
    public clipContainer: any;
    public maskContainer: any;
    public markContainer: any;

    constructor() {
        super();
        this.campContainer = new Sprite(), this.clipContainer = new Sprite(), this.maskContainer = new Sprite(), this.markContainer = new Sprite(), this.addChild(this.campContainer), this.addChild(this.clipContainer), this.addChild(this.maskContainer), this.addChild(this.markContainer);
    }

    public init(): void {
        CrossServiceMap.instance.mapLayer.floorLayer.addChild(this);
        for (var t = 0, i: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.cols; t < i; t++)
            for (var e = 0, s: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.rows; e < s; e++) {
                var n: any = sg.crossService.model.CrossServiceMapModel.instance.floors[t][e], h: any = (n.getParamConfig("material"), new TileClip(CrossServiceMap.instance));
                h.entity = n, n.view = h, h.init(), this.clipContainer.addChild(h), this.floors[(<any>sg.map.utils.MapUtils).getKey(t, e)] = h;
            }
        this.initMask(), sg.crossService.model.CrossServiceMapModel.instance.on("city_country_change", this, this.updateMask), sg.crossService.model.CrossServiceMapModel.instance.on("dw.troop_change_city", this, this.updateMask), sg.crossService.model.CrossServiceMapModel.instance.on("dw.troop_move_delete", this, this.updateMask), sg.crossService.model.CrossServiceMapModel.instance.on("dw.troop_runaway_push", this, this.updateMask), this.updateMask();
    }

    public initMask(): void {
        for (var t = 0, i: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.cols; t < i; t++)
            for (var e = 0, n: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.rows; e < n; e++) {
                var h = new CrossServiceClip(CrossServiceMap.instance), o = new CrossServiceClip(CrossServiceMap.instance);
                h.texture = Laya.loader.getRes("map3/mask.png");
                var r: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid(t, e).toScreenPos2();
                h.pivot(h.texture.width / 2, h.texture.height / 2), o.pivot(h.pivotX, h.pivotY), h.pos(r.x - sg.crossService.model.CrossServiceMapModel.instance.mapGrid.gridHalfW + h.pivotX, r.y - sg.crossService.model.CrossServiceMapModel.instance.mapGrid.gridHalfH + h.pivotY), o.pos(h.x, h.y), this.maskContainer.addChild(h), this.markContainer.addChild(o);
                var a: any = (<any>sg.map.utils.MapUtils).getKey(t, e);
                this.masks[a] = h, this.marks[a] = o;
            }
    }

    public getTileViewField(): any {
        for (var t = {}, i: any = sg.crossService.model.CrossServiceMapModel.instance.myCountrys, e = 0, s = i.length; e < s; e++)
            for (var n = 0, h = i[e].viewGrids.length; n < h; n++) {
                var o: any = i[e].viewGrids[n];
                t[(<any>sg.map.utils.MapUtils).getKey(o.col, o.row)] = !0;
            }
        for (var r in sg.crossService.model.CrossServiceMapModel.instance.troops)
            for (var a = 0, l: any = sg.crossService.model.CrossServiceMapModel.instance.troops[r].length; a < l; a++) {
                var c: any = sg.crossService.model.CrossServiceMapModel.instance.troops[r][a];
                c.state == sg.model.ModelTroop.TROOP_STATE_RECALL && c.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI || c.isMyCountry && this.setTroopView(c, t);
            }
        return t;
    }

    public setTroopView(t: any, i: any): void {
        for (var e: any = ConfigServer.duplicate.player_view, s: any = (<any>sg.map.utils.MapUtils).getAroundCrossServiceGrid(e), n = 0, h = s.length; n < h; n++) {
            var o: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.getGrid(t.mapGrid.col + s[n][0], t.mapGrid.row + s[n][1]);
            o && (i[(<any>sg.map.utils.MapUtils).getKey(o.col, o.row)] = !0);
        }
    }

    public updateMask(): void {
        for (var t: any = this.getTileViewField(), i = 0, e: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.cols; i < e; i++)
            for (var s = 0, n: any = sg.crossService.model.CrossServiceMapModel.instance.mapGrid.rows; s < n; s++) {
                var h: any = (<any>sg.map.utils.MapUtils).getKey(i, s), o = !t[h];
                o != this.masks[h].visible && (this.masks[h].visible = !0, Tween.to(this.masks[h], { scaleX: o ? 1 : 0, scaleY: o ? 1 : 0 }, 300, Ease.linearIn, new Handler(this, function (t: any, i: any) { t.visible = i; }, [this.masks[h], o]), 0, !0, !0), this.floors[h].onUpdateUI());
            }
        this.viewObj = t;
    }

    public getMark(t: any): any {
        return this.marks[t];
    }

    public checkMask(t: any): any {
        return this.viewObj[t.getKey()];
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.FloorContainer",t)
 * （t=ut=laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(FloorContainer, "sg.crossService.view.FloorContainer", null, null);
