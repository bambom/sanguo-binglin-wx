/**
 * sg.crossService.ui.CrossServiceCountDown —— 跨服战开战/结束倒计时浮字
 * （ctor(t,e)：文字样式取 CrossServiceMap.instance.ui.topBar.tInfo 双倍字号、
 * 入场缩放补间；TimeHelper.countDown mode=6 interval=300 倒计时，update 回调
 * 按类型取 battleTime/endTime − getServerTimer 渲染 mm:ss，complete 回调淡出 +
 * playSoundUI duplicate_start/duplicate_end）。
 *
 * 原文：code1.js 字节 [2742219,2743340)（1,121B；包装变量 yl，1 参 IIFE 基类实参
 * (ut)=laya.display.Sprite，明文 3 参注册 o(i,"sg.crossService.ui.CrossServiceCountDown",
 * t) @2743185；wrapper 体 2 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceCountDown.js
 *
 * extends 决策：原文基类 ut=laya.display.Sprite（引擎）→ 直接 extends Sprite。
 * 依赖：kc=CrossServiceMap（J ✓ 模块直引）、vs=Tools（B ✓）、ps=TimeHelper（B ✓）、
 * as=MusicManager（B ✓）、$t=CrossServiceFacade（I ✓）；P=laya.utils.Handler、
 * Ct=laya.utils.Tween、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：ro=sg.duplicate.ModelDuplicate
 * （-b：instance:any 面足够，battleTime/endTime 取成员）。
 * ctor 求值序：原文 super 首位，两条逗号序列语句逐语句保序直译。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Sprite = laya.display.Sprite;
import Text = laya.display.Text;
import { CrossServiceMap } from "../view/CrossServiceMap";
import { Tools } from "../../utils/Tools";
import { TimeHelper } from "../../utils/TimeHelper";
import { MusicManager } from "../../utils/MusicManager";
import { CrossServiceFacade } from "../CrossServiceFacade";

export class CrossServiceCountDown extends Sprite {

    public text: any;

    constructor(t?: any, e?: any) {
        super();
        this.text = new Text(), this.addChild(this.text);
        this.text.color = "#FFFFFF", this.text.strokeColor = "#000000", this.text.stroke = 2, this.text.width = 2 * CrossServiceMap.instance.ui.topBar.tInfo.width, this.text.height = 2 * CrossServiceMap.instance.ui.topBar.tInfo.height, this.text.fontSize = 2 * CrossServiceMap.instance.ui.topBar.tInfo.fontSize0, this.text.align = "center", this.text.pivot(this.text.width / 2, this.text.height / 2), CrossServiceMap.instance.ui.addChild(this), this.x = Laya.stage.width / 2, this.y = CrossServiceMap.instance.ui.topBar.tInfo.y + 60, this.alpha = 0, this.scale(.1, .1), Tween.to(this, { y: this.y + 100, scaleX: 1, scaleY: 1, alpha: 1 }, 400);
        var n: any = this;
        TimeHelper.countDown(this.text, e, {
            interval: 300, mode: 6,
            complete: new Handler(n, function () { Tween.to(n, { alpha: 0 }, 200), MusicManager.playSoundUI(1 == t ? "duplicate_start" : "duplicate_end"); }),
            update: new Handler(n, function (i: any) {
                var e: any = (1 == t ? sg.duplicate.ModelDuplicate.instance.battleTime : sg.duplicate.ModelDuplicate.instance.endTime) - CrossServiceFacade.getServerTimer();
                n.text.text = Tools.getMsgById(1 == t ? "kuafu_36" : "kuafu_37", [e <= 0 ? "00:00" : TimeHelper.dateFormat("mm:ss", e)]);
            })
        });
    }

    public destroy(i?: any): void {
        void 0 === i && (i = !0), Tween.clearAll(this), laya.display.Sprite.prototype.destroy.call(this, i);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceCountDown",t)
 * （t=ut=laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceCountDown, "sg.crossService.ui.CrossServiceCountDown", null, null);
