/**
 * sg.view.init.ViewStartup —— 启动黑屏遮罩（开场 splash；onRemoved 后进 VIEW_LOAD(VIEW_LOAD_SG4)）。
 *
 * 原文：code1.js 字节 [7467032,7467646]（off 7467097，包装变量 H8，基类 ZW=ui.init.viewStartupUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/ViewStartup.js
 *
 * 依赖（引擎别名）：ut=laya.display.Sprite、Ct=laya.utils.Tween、P=laya.utils.Handler；
 * Wt=sg.cfg.HelpConfig、tn=sg.manager.ViewManager、Ht=sg.cfg.ConfigClass（批次 B/A/C 模块）。
 */
import Sprite = laya.display.Sprite;
import Tween = laya.utils.Tween;
import Handler = laya.utils.Handler;
import { viewStartupUI } from "../../ui/init/viewStartupUI";
import { HelpConfig } from "../../cfg/HelpConfig";
import { ViewManager } from "../../manager/ViewManager";
import { ConfigClass } from "../../cfg/ConfigClass";

export class ViewStartup extends viewStartupUI {

    /** 关闭延时（onAdded 起算） */
    public closeTime: number = 5e3;

    constructor() {
        super();
    }

    /** 建全屏黑色遮罩 + label 淡入；closeTime 后 click_closeScenes（ViewScenes 基类） */
    public onAdded(): void {
        var t = this;
        (new Sprite()).graphics.drawRect(0, 0, this.width, this.height, "#000000"),
            this.addChildAt(this.mask, 0),
            this.timer.once(this.closeTime, this, function () { t.click_closeScenes(); }),
            this.label.visible = !0,
            this.label.alpha = 0,
            Tween.to(this.label, { alpha: 1 }, 1e3, null, new Handler(this, function () {
                Tween.to(t.label, { alpha: 0 }, 2e3, null, null, 2e3);
            }));
    }

    /** 类型路由：sg4 皮肤走 VIEW_LOAD_SG4，否则 VIEW_LOAD（type:0）——VIEW_LOAD 场景装载入口 */
    public onRemoved(): void {
        "sg4" === HelpConfig.type_ui
            ? ViewManager.instance.showView(ConfigClass.VIEW_LOAD_SG4, null, { type: 0 })
            : ViewManager.instance.showView(ConfigClass.VIEW_LOAD, null, { type: 0 });
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewStartup",t)（t=ZW=ui.init.viewStartupUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewStartup, "sg.view.init.ViewStartup", null, null);
