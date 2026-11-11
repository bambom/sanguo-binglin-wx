/**
 * sg.guide.view.ViewGuideSkip —— 跳过引导确认面板（ConfigClass.VIEW_GUIDE_SKIP 位：
 * GuideChecker.startGuide checkSkip 真时弹出；「继续引导」回滚 records.guide=["g001",0]
 * 重启主线；「跳过引导」走 GuideChecker.jumpGuide 礼包链；onAddedBase 装配文案与图高）。
 *
 * 原文：code1.js 字节 [6164301,6165438]（1,137B；包装变量 T5，基类 t=oD=ui.guide.guideSkipUI，
 * 明文 3 参注册 o(i,"sg.guide.view.ViewGuideSkip",t)，off 6164469；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-u/ViewGuideSkip.js
 *
 * 批次 U 入批依据：sg.guide.view 家族批次任务（GuideChecker.startGuide → ViewManager
 * showView(ConfigClass.VIEW_GUIDE_SKIP) 面板位）。
 * 依赖：oD=ui.guide.guideSkipUI（未译皮肤基类——extends 全局注册路径，batch-u-report §7）；
 * sg.view.ViewPanel（onAddedBase 全局路径 prototype 转调，原文明写全局链）；
 * Js=LoadeManager、re=AssetsManager、ue=ModelManager、vs=Tools、zs=GuideChecker
 * （批次 Q 真类直引）。
 */
import { LoadeManager } from "../../manager/LoadeManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { ModelManager } from "../../manager/ModelManager";
import { Tools } from "../../utils/Tools";
import { GuideChecker } from "../model/GuideChecker";

export class ViewGuideSkip extends ui.guide.guideSkipUI {

    constructor() {
        super();
        this.isAutoClose = !1,
            this.box_skip.once("click", this, this._jumpGuide),
            this.box_back.once("click", this, this._continueGuide);
    }

    public onAddedBase(): void {
        sg.view.ViewPanel.prototype.onAddedBase.call(this), LoadeManager.loadTemp(this.btn_back, AssetsManager.getAssetsAD("actPay1_12.png")), LoadeManager.loadTemp(this.btn_skip, AssetsManager.getAssetsAD("actPay1_13.png")), this.txt_title_new.text = Tools.getMsgById("_jia0111"), this.txt_title_old.text = Tools.getMsgById("_jia0112"), this.txt_tips_new.text = Tools.getMsgById("_jia0113"), this.txt_tips_old.text = Tools.getMsgById("_jia0114"), this.txt_tips_new.height = this.txt_tips_new.textField.textHeight, this.img_tips_new1.height = this.img_tips_new2.height = this.txt_tips_new.height + 8, this.txt_tips_old.height = this.txt_tips_old.textField.textHeight, this.img_tips_old1.height = this.img_tips_old2.height = this.txt_tips_old.height + 8;
    }

    public _continueGuide(): void {
        ModelManager.instance.modelUser.records.guide = ["g001", 0], GuideChecker.instance.startGuide(), this.isAutoClose = !0, this.closeSelf();
    }

    public _jumpGuide(): void {
        GuideChecker.instance.jumpGuide(), this.isAutoClose = !0, this.closeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.guide.view.ViewGuideSkip",t)（明文 3 参，基类 t=oD=
 * ui.guide.guideSkipUI）。base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md
 * 「注册等价决策」。
 */
Laya.class(ViewGuideSkip, "sg.guide.view.ViewGuideSkip", null, null);
