/**
 * sg.map.model.astar.AStarGrid —— A* 网格（nodeArray 二维惰性建 AstarNode）。
 *
 * 原文：code1.js 字节 [920206,920962]（包装变量 _e，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/AStarGrid.js
 *
 * 批次 D 入批原因：MapGridManager 构造器 `new _e`（ModelManager 字段初始化链，
 * 构造期立即执行；2 参注册不在 class-inventory）。
 * setNode 的 `new me` = sg.map.model.astar.AstarNode（批次外，全局注册路径）。
 */
export class AStarGrid {

    public nodeArray: any[] = [];
    public startNode: any = null;
    public endNode: any = null;
    public columns: number = 0;
    public rows: number = 0;

    constructor() {
    }

    /** 惰性建 [t][i] 处 AstarNode 并返回 */
    public setNode(t: number, i: number): any {
        if (null == this.nodeArray[t] && (this.nodeArray[t] = []),
            null == this.nodeArray[t][i]) {
            var e = new sg.map.model.astar.AstarNode(t, i);
            this.nodeArray[t][i] = e;
        }
        return this.nodeArray[t][i];
    }

    public getNode(t: number, i: number): any {
        return null != this.nodeArray[t] && null != this.nodeArray[t][i] ? this.nodeArray[t][i] : null;
    }

    public canWalk(t: number, i: number): boolean {
        return null != this.nodeArray[t] && null != this.nodeArray[t][i] && 0 !== this.getNode(t, i).type;
    }

    public setEndNode(t: number, i: number): void {
        this.endNode = this.nodeArray[t][i];
    }

    public setStartNode(t: number, i: number): void {
        this.startNode = this.nodeArray[t][i];
    }

    public setWalkable(t: number, i: number, e: boolean): void {
        this.nodeArray[t][i].walkable = e;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.map.model.astar.AStarGrid")（2 参注册，无基类）。
 */
Laya.class(AStarGrid, "sg.map.model.astar.AStarGrid", null, null);
