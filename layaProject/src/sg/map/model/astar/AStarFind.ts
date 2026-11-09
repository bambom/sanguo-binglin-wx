/**
 * sg.map.model.astar.AStarFind —— A* 寻路（4/8 向格寻 + 城市连通图寻路 searchCity）。
 *
 * 原文：code1.js 字节 [1351463,1356406]（包装变量 en，基类 T=laya.events.EventDispatcher，
 * 注册 o(i,"sg.map.model.astar.AStarFind",t)）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/AStarFind.js
 *
 * 批次 D 入批原因：MapGridManager 构造器 `new en`（ModelManager 字段初始化链，
 * 构造期立即执行；原文 3 参注册但 wrapper 以 function(t){...}(T) 形式调用，
 * class-inventory 未收）。
 * 依赖：Ve=sg.scene.constant.ConfigConstant（批次外，WAY_DIST_UNIT/ENTITY_CITY，
 * 全局注册路径）、sg.map.model.entitys.EntityCity.getConnectKey（批次外）、
 * sg.map.model.MapModel（本批次，类直引）。search8 用 AS3 风格 sortOn("f",Array.NUMERIC)。
 */
export class AStarFind extends laya.events.EventDispatcher {

    public openListArray: any[] = null;
    public closedListArray: any[] = null;
    public grid: any = null;
    public endNode: any = null;
    public startNode: any = null;
    public pathArray: any[] = null;
    public straightCost: number = 1;
    public node: any = null;
    /** 估价函数（manhattan/euclidian/diagonal 之一） */
    public evaluation: (t: any) => number = null;
    public diagonalCost: number = Math.SQRT2;

    constructor() {
        super();
        this.evaluation = this.manhattan,
            this.diagonalCost = Math.SQRT2;
    }

    public initAStar(t: any): void {
        this.grid = t;
    }

    /** 由 endNode 沿 parent 回溯构造 pathArray（startNode 在首） */
    public buildPath(): void {
        this.pathArray = [];
        var t = this.endNode;
        for (this.pathArray.push(t); t != this.startNode;)
            t = t.parent,
                this.pathArray.unshift(t);
    }

    public manhattan(t: any): number {
        return Math.abs(t.unitsX - this.endNode.unitsX) * this.straightCost + Math.abs(t.unitsY - this.endNode.unitsY) * this.straightCost;
    }

    public euclidian(t: any): number {
        var i = t.unitsX - this.endNode.unitsX,
            e = t.unitsY - this.endNode.unitsY;
        return Math.sqrt(i * i + e * e) * this.straightCost;
    }

    public diagonal(t: any): number {
        var i = Math.abs(t.unitsX - this.endNode.unitsX),
            e = Math.abs(t.unitsY - this.endNode.unitsY),
            s = Math.min(i, e);
        return this.diagonalCost * s + this.straightCost * Math.abs(e - i);
    }

    /** 四向泛洪找相邻城市节点（去重 visited=i，结果压入 e） */
    public findNearCity(t: any, i: any[], e: any[]): void {
        var s = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        if (-1 == i.indexOf(t)) {
            i.push(t);
            for (var n = 0, h = s.length; n < h; n++) {
                var o = this.grid.getNode(t.unitsX + s[n][0], t.unitsY + s[n][1]);
                if (null != o && o.type) {
                    if (o.grid.getEntitysByType(sg.scene.constant.ConfigConstant.ENTITY_CITY).length) {
                        var r = o.grid.getEntitysByType(sg.scene.constant.ConfigConstant.ENTITY_CITY)[0];
                        -1 == e.indexOf(r) && e.push(r);
                    } else
                        this.findNearCity(o, i, e);
                }
            }
        }
    }

    /** 从城 t 出发收集可达城市群（s=已定城市，e=已见城市） */
    public checkCity(t: any): any[] {
        for (var i: any = null, e = [t], s = []; 0 != e.length;) {
            var n: any[] = [];
            var h = e.shift();
            i = h.mapGrid.node,
                this.findNearCity(i, [], n),
                sg.map.utils.ArrayUtils.remove(h, n);
            var o = i.grid.getEntitysByType(sg.scene.constant.ConfigConstant.ENTITY_CITY)[0];
            o.nearCitys = n,
                s.push(o),
                n = n.filter(function (t: any, i: number, n: any[]) {
                    return -1 == s.indexOf(t) && -1 == e.indexOf(t);
                }),
                e = e.concat(n);
        }
        return s;
    }

    /** 城市图 A*：t/i 为起终城市，e 为封锁/加成表（connect key → [加成, ...]） */
    public searchCity(t: any, i: any, e: any): boolean {
        this.openListArray = [],
            this.closedListArray = [];
        var s = t.mapGrid.node;
        var n = i.mapGrid.node;
        for (this.startNode = s, this.endNode = n, this.node = s, s.g = 0, n.h = this.evaluation(s), s.f = s.g + s.h; this.node != n;) {
            var h = this.node.city.geAlltNearDist();
            for (var o in h) {
                var r = sg.map.model.MapModel.instance.citys[parseInt(o)].mapGrid.node;
                var a = r != n && r.city.country != this.node.city.country;
                if (!(r == this.node || e && a)) {
                    var l = h[o].path / sg.scene.constant.ConfigConstant.WAY_DIST_UNIT;
                    var c = sg.map.model.entitys.EntityCity.getConnectKey(this.node.city.cityId, r.city.cityId);
                    var u = 1 + (e && e[c] ? e[c][0] : 0);
                    if (e && h[o].isWall) {
                        u = this.node.city.getMarchRate()[0];
                    }
                    var d = this.node.g + l / u;
                    var _ = .1 * this.evaluation(r);
                    var m = d + _;
                    -1 != this.openListArray.indexOf(r) || -1 != this.closedListArray.indexOf(r) ? r.f > m && (r.f = m, r.g = d, r.h = _, r.parent = this.node) : (r.f = m, r.g = d, r.h = _, r.parent = this.node, this.openListArray.push(r));
                }
            }
            if (this.closedListArray.push(this.node), 0 == this.openListArray.length) {
                return false;
            }
            this.openListArray.sort(function (t: any, i: any) {
                return t.f - i.f;
            }),
                this.node = this.openListArray.shift();
        }
        return this.buildPath(),
            this.pathArray = this.pathArray.map(function (t: any, i: number, e: any[]) {
                return t.city;
            }),
            true;
    }

    /** 4 向格寻（type 3/2 视为终格例外） */
    public search4(t: any, i: any): boolean {
        this.openListArray = [],
            this.closedListArray = [],
            this.startNode = t,
            this.endNode = i,
            this.startNode.g = 0,
            this.endNode.h = this.evaluation(this.startNode),
            this.startNode.f = this.startNode.g + this.startNode.h,
            this.node = this.startNode;
        for (var e = [[0, -1], [1, 0], [0, 1], [-1, 0]]; this.node != this.endNode;) {
            for (var s = 0, n = e.length; s < n; s++) {
                var h = this.grid.getNode(this.node.unitsX + e[s][0], this.node.unitsY + e[s][1]);
                if (null != h && (h != this.node && h.type && this.grid.canWalk(this.node.unitsX, h.unitsY) && this.grid.canWalk(h.unitsX, this.node.unitsY) && (h === this.endNode || -1 == [3, 2].indexOf(h.type)))) {
                    var o = this.straightCost;
                    var r = this.node.g + o * h.costMultiplier;
                    var a = this.evaluation(h);
                    var l = r + a;
                    -1 != this.openListArray.indexOf(h) || -1 != this.closedListArray.indexOf(h) ? h.f > l && (h.f = l, h.g = r, h.h = a, h.parent = this.node) : (h.f = l, h.g = r, h.h = a, h.parent = this.node, this.openListArray.push(h));
                }
            }
            if (this.closedListArray.push(this.node), 0 == this.openListArray.length) {
                return false;
            }
            this.openListArray.sort(function (t: any, i: any) {
                return t.f - i.f;
            }),
                this.node = this.openListArray.shift();
        }
        return this.buildPath(), true;
    }

    /** 8 向格寻（对角步 diagonalCost；AS3 风格 sortOn） */
    public search8(): boolean {
        for (; this.node != this.endNode;) {
            for (var t = Math.max(0, this.node.unitsX - 1), i = Math.min(this.grid.columns - 1, this.node.unitsX + 1), e = Math.max(0, this.node.unitsY - 1), s = Math.min(this.grid.rows - 1, this.node.unitsY + 1), n = t; n <= i; n++) {
                for (var h = e; h <= s; h++) {
                    var o = this.grid.getNode(n, h);
                    if (null != o && (o != this.node && o.type && this.grid.canWalk(this.node.unitsX, o.unitsY) && this.grid.canWalk(o.unitsX, this.node.unitsY))) {
                        var r = this.straightCost;
                        this.node.unitsX != o.unitsX && this.node.unitsY != o.unitsY && (r = this.diagonalCost);
                        var a = this.node.g + r * o.costMultiplier;
                        var l = this.evaluation(o);
                        var c = a + l;
                        -1 != this.openListArray.indexOf(o) || -1 != this.closedListArray.indexOf(o) ? o.f > c && (o.f = c, o.g = a, o.h = l, o.parent = this.node) : (o.f = c, o.g = a, o.h = l, o.parent = this.node, this.openListArray.push(o));
                    }
                }
            }
            if (this.closedListArray.push(this.node), 0 == this.openListArray.length) {
                return false;
            }
            (<any>this.openListArray).sortOn("f", (<any>Array).NUMERIC),
                this.node = this.openListArray.shift();
        }
        return this.buildPath(), true;
    }

    public get openList(): any[] {
        return this.openListArray;
    }

    public get closedList(): any[] {
        return this.closedListArray;
    }

    public get path(): any[] {
        return this.pathArray;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.map.model.astar.AStarFind",t)（t=T=EventDispatcher）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(AStarFind, "sg.map.model.astar.AStarFind", null, null);
