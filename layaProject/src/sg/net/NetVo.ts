/**
 * sg.net.NetVo —— NetHttp 请求值对象：ctor 组装统一请求 VO（id/lan/pf/method/
 * params/cfg_version/app_version/phone_id/app_id），reData 归一回包数据（非数组/
 * 字符串/数字载荷补 server_status+re_params）、runCallBack 单/双层数组分发、
 * clear 清空（F8 死点本体，批次 M）。
 *
 * 原文：code1.js 字节 [1020265,1021379)（var 语句声明器 Pe=，0 参 IIFE，注册
 * o(t,"sg.net.NetVo") 2 参字面量形态 @byte1020733，无基类、无静态面）。
 * 前邻 = NetPackage IIFE_B 尾 `t}()),`（批次 G），后邻 = `,De=`（sg.outline.view.ui.
 * MiniMapHelper）。oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/
 * oracle/batch-m/NetVo.js。
 *
 * 入批依据：F8 第 11 次边界命中 `sg.net.NetVo is not a constructor` at
 * NetHttp.send（NetHttp.js:47 ← ConfigServer.loadCfgs_http:231 ← ViewLoad.
 * initServerConfig:397 ← MessagePack.create 同步回调）。原文消费点唯一：
 * NetHttp.send `var n=new Pe(t,i,e,s)`（char1396446，全文件 Pe 恰 2 引用：
 * 1 声明 + 此处）；NetHttp.format 经 mSendListDic[t.method] 回调 reData/
 * runCallBack/clear。sg.net 家族封闭：全文件恰 5 个字面量注册（NetMethodCfg/
 * NetPackage/NetVo/NetHttp/NetSocket），池串 sg.net.* 0 条——本类为家族最后缺口，
 * 至此 sg.net.* 全译。
 *
 * 身份（作用域链+别名表双证，resolve_m.js）：Mt=laya.utils.Utils（引擎别名，
 * getGID @LayaAir.d.ts:28359）、Rt=sg.cfg.ConfigApp（批次 B）、Ut=Laya.Platform
 * （批次 C）、Gt=sg.cfg.ConfigServer（批次 B）、vs=sg.utils.Tools（批次 B）、
 * o=Laya.class（UMD 助手）。
 *
 * 保真注记：ctor 8 字段前置默认赋值移至 TS 字段初始化器（纯赋值无读取者，
 * 观测等价，批次 H/I 先例）；`this.id=Mt.getGID()+""` 的数字转字符串形态保留；
 * reData 的三支短路链（Array/string/number 载荷直通，否则补 server_status+
 * re_params）按 && 优先于 || 的原运算序照抄；runCallBack 数组载荷包一层
 * [this.mData] 分发保留；clear 五字段置 null 顺序照抄。
 */
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { Platform } from "../laya/Platform";

export class NetVo {

    public id: string = "";
    public method: string = "";
    public data: any = null;
    public callback: any = null;
    public timeout: number = 15;
    public re: any = null;
    public mData: any = null;
    public sendData: any = null;

    constructor(t: string, i?: any, e?: any, s?: number) {
        void 0 === s && (s = 15);
        this.method = t,
            this.data = i || {},
            this.callback = e,
            this.id = laya.utils.Utils.getGID() + "",
            this.timeout = s,
            this.sendData = {
                id: this.id,
                lan: ConfigApp.lan(),
                pf: ConfigApp.pf,
                method: this.method,
                params: this.data,
                cfg_version: ConfigApp.cfgVersion,
                app_version: ConfigApp.getAppVersion(),
                phone_id: [Platform.getType(), Platform.getPhoneIDs()],
                app_id: Platform.getAppName()
            };
    }

    /** 归一回包：校准服务器时间；Array/string/number 载荷直通，其余补 server_status/re_params */
    public reData(t: any, i?: number): void {
        void 0 === i && (i = 0);
        this.re = t,
            ConfigServer.checkServerTime(Tools.getTimeStamp(this.re.server_now)),
            this.mData = this.re.data,
            this.mData && this.mData instanceof Array || this.mData && "string" == typeof this.mData || this.mData && "number" == typeof this.mData || (this.mData || (this.mData = {}), this.mData.server_status = i, this.mData.re_params = this.re.params);
    }

    /** 回调分发：数组载荷包一层再 runWith，其余直接 runWith */
    public runCallBack(): void {
        this.callback && (this.mData && this.mData instanceof Array ? this.callback.runWith([this.mData]) : this.callback.runWith(this.mData));
    }

    public clear(): void {
        this.callback = null,
            this.sendData = null,
            this.re = null,
            this.data = null,
            this.mData = null;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.net.NetVo")（2 参，无基类）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 * 注册后 NetHttp.send 的全局路径 `new sg.net.NetVo(t,i,e,s)`（批次 B 译文形态，
 * 原文 new Pe）与本模块导出运行期同一对象。
 */
Laya.class(NetVo, "sg.net.NetVo", null, null);
