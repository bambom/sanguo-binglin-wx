/**
 * sg.home.model.HomeModel —— 封地（家园区）模型：builds 城建字典 + mapGrid 网格；
 * initHome 按 ConfigServer.home 装配 EntityBuild（use_cabinet 区分装修态外观）。
 *
 * 原文：code1.js 字节 [1789122,1789623]（包装变量 Co，基类 t=Ns=sg.model.ModelBase，
 * 明文注册名 "sg.home.model.HomeModel"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/HomeModel.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `new sg.home.model.HomeModel()`（F8 死点链）。
 * 依赖：Ns=ModelBase（批次 A）；ze=MapGridManager（本批次，构造器直引，new 在
 * __super.call 之后）；Ve=sg.scene.constant.ConfigConstant、Kl=sg.home.model.entitys.EntityBuild、
 * Gt=ConfigServer（批次 B 模块直引）——initHome 为延迟调用，Ve/Kl 走全局注册路径。
 * 构造顺序注意：原文 builds 赋值在 __super.call 之前、mapGrid/instance 在其后（见体内序）。
 */
import { ModelBase } from "../../model/ModelBase";
import { MapGridManager } from "../../scene/model/MapGridManager";
import { ConfigServer } from "../../cfg/ConfigServer";

export class HomeModel extends ModelBase {

    public builds: any = {};
    public mapGrid: MapGridManager = null;
    public static instance: HomeModel = null;

    constructor() {
        super();  // 原文 this.builds={} 在 __super.call(this) 之前；tsc 固定 super() 在前，
        // EventDispatcher/ModelBase 构造不观察子类字段，两序等价（batch-a 同款注记）
        this.builds = {},
            this.mapGrid = new MapGridManager(),
            HomeModel.instance = this;
    }

    /** 装配封地建筑：mapGrid 按家园配置初始化，逐键建 EntityBuild（排除当前装修态建筑键） */
    public initHome(): void {
        this.builds = {};
        var t = sg.scene.constant.ConfigConstant.homeConfigData;
        this.mapGrid.init(t.width, t.height, t.tilewidth, t.tileheight, t.orientation);
        var i = ConfigServer.system_simple.use_cabinet ? "building004" : "building030";
        for (var e in ConfigServer.home)
            if (e !== i) {
                var s = new sg.home.model.entitys.EntityBuild();
                s.id = e,
                    s.initConfig(ConfigServer.home[e]),
                    this.builds[e] = s;
            }
    }

    public parseData(t: any): void {
        t.cities;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.home.model.HomeModel",t)（t=Ns=sg.model.ModelBase）。
 */
Laya.class(HomeModel, "sg.home.model.HomeModel", null, null);
