/**
 * sg.crossService.ui.CrossServiceFinish —— 跨服战结算面板（ctor(t,e)：t=-1 平局臂 /
 * t=国别臂（胜负文案按 myHeadOffice/enemyHeadOffce、旗标、gongxian 平/胜败文案）；
 * 结束语 + checkBg(1) + 淡入补间；initData 直调 ViewBase 原型）。
 *
 * 原文：code1.js 字节 [5675628,5676649)（1,021B；包装变量 R1，1 参 IIFE 基类实参
 * (VU)=ui.duplicate.CrossServiceFinishUI（批次 X ✓ 已落地），明文 3 参注册
 * o(i,"sg.crossService.ui.CrossServiceFinish",t) @5676520；wrapper 体 2 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceFinish.js
 *
 * extends 决策：原文基类 VU=ui.duplicate.CrossServiceFinishUI（IDE 皮肤类，批次 X ✓
 * 落地；其自身基类 tm=sg.view.ViewPanel 批次 A ✓）→ 直接模块直引真类。
 * 依赖（模块直引）：VU=CrossServiceFinishUI（X ✓）、vs=Tools（B ✓）、
 * 基座 initData 经 ViewBase（A ✓ 模块直引）；Ct=laya.utils.Tween（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b：instance:any + init/on/off/clear/sendBuyEnergy/getTroop；CHU_COUNTRY 调回点
 * cast；AC 在途独占 model 目录，本批不 import）。
 * 皮肤字段（CrossServiceFinishUI：textTitle/flag/gongxian_txt/jieshu_txt/pingju_txt）
 * 由真基类类型面承载；test_clip_vis 为本类 ctor 字段。
 */
import Tween = laya.utils.Tween;
import { CrossServiceFinishUI } from "../../ui/duplicate/CrossServiceFinishUI";
import { Tools } from "../../utils/Tools";
import { ViewBase } from "../../view/ViewBase";

export class CrossServiceFinish extends CrossServiceFinishUI {

    public test_clip_vis: boolean = !1;

    constructor(t?: any, e?: any) {
        super();
        -1 != t ? (this.textTitle.text = Tools.getMsgById("kuafu_27"), this.textTitle.color = "#FFFF99", this.textTitle.strokeColor = "#BB6600", this.gongxian_txt.text = 0 == e ? Tools.getMsgById("kuafu_28", [t != sg.crossService.model.CrossServiceMapModel.instance.country ? sg.crossService.model.CrossServiceMapModel.instance.myHeadOffice.getName(!1) : sg.crossService.model.CrossServiceMapModel.instance.enemyHeadOffce.getName(!1)]) : Tools.getMsgById("kuafu_29", [t == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? Tools.getMsgById("500439") : Tools.getMsgById("500440")]), this.pingju_txt.visible = !1, this.flag.setCountryFlag(t), this.flag.visible = this.textTitle.visible = !0) : (this.gongxian_txt.text = Tools.getMsgById("kuafu_33"), this.pingju_txt.visible = !0, this.pingju_txt.text = Tools.getMsgById("kuafu_32"), this.flag.visible = this.textTitle.visible = !1, this.gongxian_txt.centerY -= 64), this.jieshu_txt.text = Tools.getMsgById("kuafu_30"), this.checkBg(1), this.alpha = .1, Tween.to(this, { alpha: 1 }, 500), this.mouseEnabled = !1, this.mouseThrough = !0;
    }

    public initData(): void {
        ViewBase.prototype.initData.call(this);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceFinish",t)
 * （t=VU=ui.duplicate.CrossServiceFinishUI，批次 X 真类）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceFinish, "sg.crossService.ui.CrossServiceFinish", null, null);
