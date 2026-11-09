/**
 * sg.model.ModelGwent —— 酒馆棋盘/多维远征（gwent）模型：地下城选择、路线图
 * （stage/stair/spot 三级）、奇遇 secret 状态本地档（gwent_data+mUID）、上阵英雄维度聚合。
 *
 * 原文：code1.js 字节 [2106741,2112704]（包装变量 dr，基类 i=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.model.ModelGwent"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelGwent.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：Gt=ConfigServer、ue=ModelManager、pn=NetSocket、P=Handler、us=SaveLocal、Rt=ConfigApp
 * （批次 B 模块直引）；lr=ModelGame（本批类直引）；批次外全局注册路径：
 * ge=sg.map.utils.ArrayUtils（sortOn 多键降序）、Un=sg.view.fight.gwent.C_Gwent
 * （instance.event/findNextNode + UPDATE_UI 静态）。
 * isOpen 的 system_simple.func_open 为丢弃求值（原文如此）。
 */
import Handler = laya.utils.Handler;
import { ModelBase } from "./ModelBase";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { SaveLocal } from "../utils/SaveLocal";
import { ConfigApp } from "../cfg/ConfigApp";
import { ModelGame } from "./ModelGame";

export class ModelGwent extends ModelBase {

    public cur_map_data: any = {};
    public cur_route: any[] = [];
    public cur_choice_dungeon: string = "";
    public cur_heros_dimensional: any = {};
    public cur_stage: number = -1;
    public cur_stair: number = -1;
    public cur_spot: number = -1;
    public cur_node_data: any = null;
    public parent_node_pos: any[] = [];
    public cur_selected_dtype: string = "";
    public link_pos_Array: any[] = [];
    public cur_secret_id: string = "";
    public move_hero: string = "";
    public is_boss: boolean = false;

    constructor() {
        super();
    }

    /** gwent.switch + 合服 truce + 开服 delay 天 + unlock("gwent") 未停 */
    public isOpen(): boolean {
        var i = false;
        if (!ConfigServer.gwent)
            return i;
        ConfigServer.system_simple.func_open;
        var s = ModelManager.instance.modelUser.mergeNum,
            n = ModelManager.instance.modelUser.getGameDate();
        return 1 == ConfigServer.gwent["switch"] && s >= ConfigServer.gwent.truce && n >= ConfigServer.gwent.delay && (i = true),
            i && !ModelGame.unlock(null, "gwent").stop;
    }

    /** 已解锁地下城配置列表（dtype 回填） */
    public dungeonsData(): any[] {
        for (var i: any[] = [], s = ConfigServer.gwent.unlock, n = ConfigServer.gwent.dungeons, h = s.length, o = 0; o < h; o++) {
            var r = s[o],
                a = n[r];
            a.dtype = r,
                i.push(a);
        }
        return i;
    }

    public initGwentData(): void {
        var i = ModelManager.instance.modelUser.gwent;
        i && i.choice_dungeon && (this.cur_choice_dungeon = i.choice_dungeon, this.setMapData());
    }

    /** 我方英雄四维（str/agi/cha/lead）+ 战力排序（sortOn sum/sortPower 降序） */
    public mineHeroes(): any[] {
        this.cur_heros_dimensional = {};
        var i: any[] = [],
            s = ModelManager.instance.modelUser.hero;
        for (var n in s) {
            var h = ModelManager.instance.modelGame.getModelHero(n);
            if (h.isMine()) {
                var o = h.getPrepare(true),
                    r = h.mModelPrepare.getData().str,
                    a = h.mModelPrepare.getData().agi,
                    l = h.mModelPrepare.getData().cha,
                    c = h.mModelPrepare.getData().lead,
                    u: any = {};
                u.hmd = h,
                    u.sortPower = h.getPower(o),
                    u.sum = r + a + l + c,
                    i.push(u),
                    this.cur_heros_dimensional[h.id] = [r, a, l, c];
            }
        }
        return sg.map.utils.ArrayUtils.sortOn(["sum", "sortPower"], i, true), i;
    }

    public send_ChoiceDungeon(t: any, i: any): void {
        var n = this;
        NetSocket.instance.send("choice_gwent_dungeon", { dtype: t }, Handler.create(this, function (t: any) {
            n.initLocalData(),
                n.cb_ChoiceDungeon(t),
                i.run(),
                sg.view.fight.gwent.C_Gwent.instance.event(sg.view.fight.gwent.C_Gwent.UPDATE_UI);
        }));
    }

    public cb_ChoiceDungeon(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData);
        var s = t.receiveData.user.gwent;
        this.cur_choice_dungeon = s.choice_dungeon,
            this.setMapData();
    }

    /** 换图本地档重置（cur_secret 回 2；换地下城重写 cur_dungeon/stage）+ 清 gwent_trim */
    public initLocalData(): void {
        var i = SaveLocal.getValue("gwent_data" + ModelManager.instance.modelUser.mUID, true);
        if (i) {
            var s: any = {};
            s.cur_secret = 2,
                SaveLocal.save("gwent_data" + ModelManager.instance.modelUser.mUID, s, true);
        }
        i && i.cur_dungeon != this.cur_choice_dungeon && ((i = <any>{}).cur_dungeon = this.cur_choice_dungeon, i.cur_stage = this.curStage, i.cur_secret = 2, SaveLocal.save("gwent_data" + ModelManager.instance.modelUser.mUID, i, true)),
            SaveLocal.deleteObj("gwent_trim", true);
    }

    /** 从 user.gwent.stage 重放路线：首个未完成层为当前层；奇遇未开启时回溯 secret 分支 */
    public setMapData(): void {
        var i = ModelManager.instance.modelUser.gwent;
        if (null != i.choice_dungeon) {
            var s = -1,
                n = SaveLocal.getValue("gwent_data" + ModelManager.instance.modelUser.mUID, true);
            (!n || n && !n.cur_dungeon) && ((n = <any>{}).cur_dungeon = this.cur_choice_dungeon, n.cur_stage = s + 1, n.cur_secret = 2, SaveLocal.save("gwent_data" + ModelManager.instance.modelUser.mUID, n, true)),
                n && n.cur_stage >= 0 && n.cur_dungeon == this.cur_choice_dungeon && (s = n.cur_stage);
            for (var h = i.stage, o = h.length, r = 0; r < o; r++) {
                var a = h[r];
                if (s == r && 1 == a.finish)
                    return this.cur_map_data = a, this.cur_stage = r, this.cur_route = a.route, this.link_pos_Array = [],
                        void (this.cur_route.length > 0 && (this.link_pos_Array.push(this.cur_route[this.cur_route.length - 1]), sg.view.fight.gwent.C_Gwent.instance.findNextNode(this.cur_route[this.cur_route.length - 1])));
                if (0 == a.finish) {
                    if (this.cur_map_data = a, this.cur_stage = r, this.cur_route = a.route, this.link_pos_Array = [], n && 1 == n.cur_secret) {
                        this.cur_secret_id = "";
                        var l = this.cur_route[this.cur_route.length - 1];
                        if (this.cur_map_data.map[l[0]] && this.cur_map_data.map[l[0]][l[1]]) {
                            var c = this.cur_map_data.map[l[0]][l[1]];
                            this.serverData.event[c.event.id].globle.type == "secret" ? (this.cur_secret_id = c.event.id, this.parent_node_pos = l, this.cur_map_data = c.event.data, this.cur_route = c.event.data.route) : this.secretState = 2;
                        } else
                            this.secretState = 2;
                    }
                    return void (this.cur_route.length > 0 && (this.link_pos_Array.push(this.cur_route[this.cur_route.length - 1]), sg.view.fight.gwent.C_Gwent.instance.findNextNode(this.cur_route[this.cur_route.length - 1])));
                }
            }
        }
    }

    public curMapData(): any {
        return this.cur_map_data;
    }

    public send_GwentHeros(t: any): void {
        var s = this;
        NetSocket.instance.send("choice_gwent_heros", { heros: this.cur_heros_dimensional }, Handler.create(this, function (e: any) {
            s.cb_GwentHeros(e),
                t && t.run();
        }));
    }

    public cb_GwentHeros(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData);
    }

    public send_GwentSpot(t: any, i: any, s: any, n: any): void {
        var h = this;
        NetSocket.instance.send("choice_gwent_spot", { stage: t, stair: i, spot: s }, Handler.create(this, function (t: any) {
            h.cb_GwentSpot(t),
                n && n.run();
        }));
    }

    public cb_GwentSpot(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.curStair = t.sendData.stair,
            this.curSpot = t.sendData.spot,
            this.setMapData(),
            sg.view.fight.gwent.C_Gwent.instance.event(sg.view.fight.gwent.C_Gwent.UPDATE_UI);
    }

    /** 开服 delay 天后返回当前天数，否则 -1 */
    public get delayDays(): any {
        var i = -1,
            s = ModelManager.instance.modelUser.getGameDate();
        return s >= ConfigServer.gwent.delay && (i = s), i;
    }

    /** 奇遇状态本地档（1=secret 分支中，2=常态）；无档建档默认 2 */
    public get secretState(): any {
        var i = SaveLocal.getValue("gwent_data" + ModelManager.instance.modelUser.mUID, true);
        return !i && ((i = <any>{}).cur_secret = 2, SaveLocal.save("gwent_data" + ModelManager.instance.modelUser.mUID, i, true)), i.cur_secret;
    }
    public set secretState(t: any) {
        var i = SaveLocal.getValue("gwent_data" + ModelManager.instance.modelUser.mUID, true);
        i.cur_secret = t,
            SaveLocal.save("gwent_data" + ModelManager.instance.modelUser.mUID, i, true);
    }

    public get serverData(): any {
        return ConfigServer.gwent;
    }

    /** 因果道具缺省 item2002 */
    public get karmaItem(): any {
        return this.serverData.karma_item ? this.serverData.karma_item : "item2002";
    }

    public get curSpot(): any {
        return this.cur_spot;
    }
    public set curSpot(t: any) {
        this.cur_spot = t;
    }

    public get curStage(): any {
        return this.cur_stage;
    }

    public get curRoute(): any[] {
        return this.cur_route;
    }

    public get curStair(): any {
        return this.cur_stair;
    }
    public set curStair(t: any) {
        this.cur_stair = t;
    }

    public get choice_dungeon(): any {
        return this.cur_choice_dungeon;
    }

    public get parentNodePos(): any[] {
        return this.parent_node_pos;
    }

    /** 已完成层号数组（boss 层恒空） */
    public get finishStairArray(): any[] {
        var i, s: any[] = [];
        if (!this.isBossStage)
            for (var n in this.cur_route) {
                i = this.cur_route[n],
                    1 == this.cur_map_data.map[i[0]][i[1]].finish && s.push(i[0]);
            }
        return s;
    }

    /** 当前节点数据（spot_data 存在时下钻一层） */
    public get curNodeData(): any {
        return this.cur_node_data = this.cur_map_data.map[this.curStair][this.curSpot],
            this.cur_node_data.spot_data && (this.cur_node_data = this.cur_node_data.spot_data),
            this.cur_node_data;
    }

    public get curToken(): any {
        return ModelManager.instance.modelUser.gwent.token;
    }

    /** 全层 finish 即 boss 层；横屏且本地档 stage 未走完时回退 false（原文如此） */
    public get isBossStage(): any {
        var i = false,
            s = ModelManager.instance.modelUser.gwent.stage,
            n = SaveLocal.getValue("gwent_data" + ModelManager.instance.modelUser.mUID, true);
        if (s) {
            for (var h = s.length, o = 0, r = 0; r < h; r++) {
                1 == s[r].finish && (o += 1);
            }
            o >= h && (i = true),
                ConfigApp.isLandscape && n && n.cur_stage && n.cur_stage < h && (i = false);
        }
        return i;
    }

    public get gwentTrim(): any {
        return ConfigServer.gwent.gwent_trim;
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelGwent",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelGwent, "sg.model.ModelGwent", null, null);
