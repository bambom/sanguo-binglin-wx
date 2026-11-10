/**
 * sg.utils.ServerDate —— 带开服时区偏移的日期包装（ctor 经 TimeHelper.getOffsetMin
 * 校准 _offsetMs，getTime 反向扣除；批次 O）。
 *
 * 原文：code1.js 字节 [1132514,1133535)（ds= 声明器 @1132511，0 参 IIFE，注册
 * o(t,"sg.utils.ServerDate") 2 参字面量形态 @1132711，无基类）。前邻
 * `this.emiter=new T}]),t}()`、后邻 _s=（同簇下一声明器）。批次 L 已定界登记，
 * 本批随 TimeHelper（唯一 ctor 硬依赖 ps）落地。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-o/ServerDate.js
 *
 * 入批依据（任务步骤 2 ①，依赖解除型前置）：ctor 硬依赖 ps=TimeHelper.getOffsetMin
 * （原文 @1132606 闭包直引）——本批 TimeHelper 落地即解除；首触达在登录数据装载
 * 期（ModelUser:1517/1560/1589、ModelGame:597/829、ModelCountryPvp:144、
 * Tools.getTimeDate:199——批次 L §3 取证维持），位于预测下一死点 ModelGuide.
 * forceGuide（I §9 #1）之后一步，入批免除紧邻死点整轮 F8 往返。批次 B 期
 * externals 头注的 ds@1129362 为 find_def 粗估，本批 acorn 精界定界勘正。
 *
 * 身份（resolve_o.js，acorn 作用域链）：o=Laya.class、ps=TimeHelper（本批 ✓）、
 * vs=Tools（B ✓）、Date 内建；声明器单一 CallExpression（`}(),ds=function(){…}(),
 * _s=` 字节实证，非 Ee 式逗号双跳）。消费面：ModelUser/ModelGame/ModelCountryPvp/
 * Tools 均经 sg.utils.ServerDate 全局路径 new 实例（注册即接通，批次 B–D 文件
 * 零改动）。
 *
 * 保真注记：
 * - ctor 前三段 null/0 复位为纯赋值无读取者，移 TS 字段初始化器（批次 F/M 先例，
 *   观测等价）；后三段（getOffsetMin → 偏移毫秒 → new Date）保持逗号链原序；
 * - 原文注册 o(t,"sg.utils.ServerDate") 先于原型方法挂载（return 序列），TS 类
 *   定义期挂全 + 模块尾注册，观测等价（批次 A 先例）；
 * - setHours 四参缺省补 0 的逗号链（`void 0===i&&(i=0),…`）原样；getTime 返回
 *   `this._date.getTime()-this._offsetMs`（写入时加偏移、读取时扣除）；
 * - ctor 形参 t 遮蔽类变量 t（原文 `function t(t)`），类面未用，形参名照抄
 *   （MessagePack xorFrame 先例）。
 */

import { TimeHelper } from "./TimeHelper";
import { Tools } from "./Tools";

export class ServerDate {

    public _offsetMin: any = 0;
    public _offsetMs: any = 0;
    public _date: any = null;

    constructor(t?: any) {
        this._offsetMin = TimeHelper.getOffsetMin(),
            this._offsetMs = this._offsetMin * Tools.oneMinuteMilli,
            this._date = new Date(t + this._offsetMs);
    }

    public getFullYear(): any {
        return this._date.getFullYear();
    }

    public getMonth(): any {
        return this._date.getMonth();
    }

    public getDate(): any {
        return this._date.getDate();
    }

    public setHours(t: any, i?: any, e?: any, s?: any): void {
        void 0 === i && (i = 0),
            void 0 === e && (e = 0),
            void 0 === s && (s = 0),
            this._date.setHours(t, i, e, s);
    }

    public getHours(): any {
        return this._date.getHours();
    }

    public getMinutes(): any {
        return this._date.getMinutes();
    }

    public getSeconds(): any {
        return this._date.getSeconds();
    }

    public getMilliseconds(): any {
        return this._date.getMilliseconds();
    }

    public getTime(): number {
        return this._date.getTime() - this._offsetMs;
    }

    /** "yyyy-M-d H:m:s"（原样数字宽度，服务器时区已含在 _date 内） */
    public toServerTimeString(): any {
        return this._date.getFullYear() + "-" + (this._date.getMonth() + 1) + "-" + this._date.getDate() + " " + this._date.getHours() + ":" + this._date.getMinutes() + ":" + this._date.getSeconds();
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.ServerDate")（2 参，无基类）。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ServerDate, "sg.utils.ServerDate", null, null);
