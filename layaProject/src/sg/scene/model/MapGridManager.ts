/**
 * sg.scene.model.MapGridManager —— 地图网格管理（行列/格宽高、setGrid 惰性建 MapGrid 格，
 * getGridByPos 像素→菱形格坐标换算；编辑器态走 A* 节点绑定）。
 *
 * 原文：code1.js 字节 [1066668,1068559]（包装变量 ze，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/GridClass.js
 *
 * 批次 D 入批原因：HomeModel/MapModel 构造器 `new ze`（ModelManager 字段初始化链，
 * 构造期立即执行；2 参注册不在 class-inventory）。
 * 依赖：en=AStarFind、_e=AStarGrid（本批次，构造器直引）、be=TestUtils（批次 B，
 * init 期 mapEdit 开关）、Ie=sg.map.utils.Vector、We=sg.scene.model.MapGrid、
 * ve=sg.map.utils.MapUtils（批次外，全局注册路径，仅 init/setGrid/getGrid3 期触达）。
 */
import { AStarFind } from "../../map/model/astar/AStarFind";
import { AStarGrid } from "../../map/model/astar/AStarGrid";
import { TestUtils } from "../../map/utils/TestUtils";

export class MapGridManager {

    public grids: any[] = [];
    public rows: number = 0;
    public cols: number = 0;
    public gridW: number = 0;
    public gridH: number = 0;
    public gridHalfW: number = NaN;
    public gridHalfH: number = NaN;
    public width: number = 0;
    public height: number = 0;
    public hypotenuse: number = NaN;
    public halfhypotenuse: number = NaN;
    public hypotenuseV: any = null;
    public astarFind: AStarFind = new AStarFind();
    public astarGrid: AStarGrid = new AStarGrid();

    constructor() {
    }

    /** t=cols i=rows e=gridW s=gridH n=orientation（"staggered" 交错布局半格高差） */
    public init(t: number, i: number, e: number, s: number, n: string): void {
        this.cols = t,
            this.rows = i,
            this.gridW = e,
            this.gridH = s,
            this.gridHalfW = .5 * this.gridW,
            this.gridHalfH = .5 * this.gridH,
            this.width = this.cols * this.gridW,
            "staggered" == n ? (this.height = (.5 + .5 * this.rows) * this.gridH,
                this.hypotenuse = Math.sqrt(Math.pow(this.gridW / 2, 2) + Math.pow(this.gridH / 2, 2)),
                this.halfhypotenuse = .5 * this.hypotenuse) : this.height = this.rows * this.gridH,
            this.hypotenuseV = new sg.map.utils.Vector(this.gridW, 0).add(new sg.map.utils.Vector(0, this.gridH)),
            this.hypotenuseV.normalize().length = this.hypotenuse,
            this.grids = [],
            TestUtils.mapEdit ? this.initEditAstar() : this.initGrid();
    }

    public initGrid(): void {
        for (var t = 0, i = this.rows; t < i; t++)
            for (var e = 0, s = this.cols; e < s; e++)
                this.setGrid(e, t);
    }

    /** 编辑器态：A* 节点与格双向绑定（奇偶行错位 t--/i++ 补偿 staggered 偏移） */
    public initEditAstar(): void {
        this.astarFind.initAStar(this.astarGrid);
        for (var t = 1, i = 0, e = 0, s = this.rows; e < s; e++) {
            e % 2 == 0 ? t-- : i++;
            for (var n = 0, h = this.cols; n < h; n++) {
                var o = this.astarGrid.setNode(t + n, i + n),
                    r = this.setGrid(n, e);
                r.node = o,
                    o.grid = r;
            }
        }
    }

    /** 惰性建 [t][i] 处 MapGrid 格 */
    public setGrid(t: number, i: number): any {
        if (null == this.grids[t] && (this.grids[t] = []),
            null == this.grids[t][i]) {
            var e = new sg.scene.model.MapGrid(t, i);
            this.grids[t][i] = e;
        }
        return this.grids[t][i];
    }

    public getGrid(t: number, i: number): any {
        return null != this.grids[t] && null != this.grids[t][i] ? this.grids[t][i] : null;
    }

    public getGrid2(t: any): any {
        return this.getGrid(t.x, t.y);
    }

    public getGrid3(t: any): any {
        return this.getGrid2(sg.map.utils.MapUtils.parseKey(t));
    }

    /** 像素坐标 → 菱形格（staggered）：中心菱形判定 + 半格偏移换算 */
    public getGridByPos(t: number, i: number): any {
        var e: number, s: number, n = new sg.map.utils.Vector(),
            h = this.gridW,
            o = this.gridH,
            r = 0,
            a = 0;
        return e = (t - (Math.floor(t / h) * h + h / 2)) * o / 2,
            s = (i - (Math.floor(i / o) * o + o / 2)) * h / 2,
            Math.abs(e) + Math.abs(s) <= h * o / 4 ? (a = Math.floor(t / h), r = 2 * Math.floor(i / o)) : (t -= h / 2, a = Math.floor(t / h) + 1, i -= o / 2, r = 2 * Math.floor(i / o) + 1),
            n.x = a - (1 & r),
            n.y = r,
            n;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.scene.model.MapGridManager")（2 参注册，无基类）。
 */
Laya.class(MapGridManager, "sg.scene.model.MapGridManager", null, null);
