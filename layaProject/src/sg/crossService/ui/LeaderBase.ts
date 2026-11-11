/**
 * sg.crossService.ui.LeaderBase —— 跨服战盟主竞选条目基座（ctor 挂 click；dataSource
 * getset：getter 复用基类（leaderUI 原型链）_$get_dataSource，setter 写 _dataSource 并
 * textFit 名称/威望 + setHeroPower 战力）。
 *
 * 原文：code1.js 字节 [4138938,4139376)（438B；包装变量 UP，1 参 IIFE 基类实参 (Mg)=
 * ui.duplicate.leaderBaseUI（未译缓译），明文 3 参注册 o(i,"sg.crossService.ui.LeaderBase",t)
 * @4139020；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-v/LeaderBase.js
 *
 * 批次 V 入批原因：sg.crossService.ui 首簇第 3 类（LeaderTips.list.itemRender 硬依赖，
 * 同批互引 UP）。
 * extends 决策：原文基类 Mg=ui.duplicate.leaderBaseUI（IDE 皮肤类，批次 X ✓ 落地；其
 * 自身基类 e_=sg.view.com.ItemBase 批次 A ✓）。波次 1 整合已重指向真基类（模块直引；
 * 皮肤字段 + createChildren 的 regComponent/loadUI 随真基类恢复）。
 * 依赖：vs=Tools（B ✓ 模块直引）；批次外（ambient 全局路径）：ro=sg.duplicate.ModelDuplicate
 * （instance.showUserInfo）、ui.duplicate.leaderBaseUI（prototype._$get_dataSource）。
 * 皮肤字段（leaderBaseUI：txt_name/txt_score/icon_power）为类型层声明（无初始化器，
 * viewAlertUI 批次 B「构造期 createView 契约」先例；实际由 loadUI/createView 创建）。
 */
import { leaderBaseUI } from "../../ui/duplicate/leaderBaseUI";
import { Tools } from "../../utils/Tools";

export class LeaderBase extends leaderBaseUI {

    public txt_name: any;
    public txt_score: any;
    public icon_power: any;

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public _onClick(): void {
        sg.duplicate.ModelDuplicate.instance.showUserInfo(String(this._dataSource.uid));
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— getter 为基类（leaderBaseUI
     * 原型链）_$get_dataSource 函数本体，setter 真值臂才写（求值序等价直译）。 */
    public get dataSource(): any {
        return (<any>ui.duplicate.leaderBaseUI.prototype)._$get_dataSource.call(this);
    }

    public set dataSource(t: any) {
        t && (this._dataSource = t,
            Tools.textFitFontSize(this.txt_name, t.uname),
            Tools.textFitFontSize(this.txt_score, t.prestige),
            this.icon_power.setHeroPower(t.power));
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.LeaderBase",t)（t=Mg=ui.duplicate.leaderBaseUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(LeaderBase, "sg.crossService.ui.LeaderBase", null, null);
