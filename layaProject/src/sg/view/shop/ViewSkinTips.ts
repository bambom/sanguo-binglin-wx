/**
 * sg.view.shop.ViewSkinTips —— 皮肤详情 tips（ViewManager.showItemTips 的 skin 分支）。
 *
 * 原文：code1.js 字节 [8351838,8352803]（off 8352224，包装变量 $it，基类 Aq=ui.shop.skinTipsUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewSkinTips.js
 *
 * 依赖：Vr=sg.model.ModelSkin（批次外，全局路径）；re=AssetsManager、gs=StringUtil、
 * ae=ColorManager、vs=Tools、Rt=ConfigApp（批次 B/A）。
 */
import { skinTipsUI } from "../../ui/shop/skinTipsUI";
import { Tools } from "../../utils/Tools";
import { StringUtil } from "../../utils/StringUtil";
import { ColorManager } from "../../manager/ColorManager";

export class ViewSkinTips extends skinTipsUI {

    public modelHero: any = null;
    public skin_id: any = null;

    constructor() {
        super();
        Tools.textFitFontSize(this.text0, Tools.getMsgById("buy_skincoin16")),
            this.text1.text = "",
            this.infoHtml.style.wordWrap = true,
            this.infoHtml.style.fontSize = (<any>this.text1).fontSize0,
            this.infoHtml.style.leading = (<any>this.text1).leading0,
            sg.cfg.ConfigApp.isLandscape ? this.infoHtml.style.align = "left" : this.infoHtml.style.align = "center";
    }

    /** currArg = [modelHero, skin_id]：皮肤名/立绘/星级/富文本说明 */
    public onAdded(): void {
        this.modelHero = this.currArg[0],
            this.skin_id = this.currArg[1],
            this.txt_title.text = sg.model.ModelSkin.getName(this.skin_id),
            this.heroIcon.setHeroSkin(this.skin_id, false);
        var t = sg.model.ModelSkin.getStarById(this.skin_id);
        this.imgStar.skin = sg.manager.AssetsManager.getAssetLater("icon_yingxiongpifu_xing" + t + ".png");
        var i = sg.model.ModelSkin.getInfoHtml(this.skin_id);
        i = StringUtil.substituteWithColor(i, ColorManager.getUIColor("FONT_COLOR_NUM"), this.text1.color),
            this.infoHtml.innerHTML = i,
            (<any>this.infoHtml).height = this.infoHtml.contextHeight,
            this.infoHtml.y = (this.infoHtml.parent.height - this.infoHtml.height) / 2;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.shop.ViewSkinTips",t)（t=Aq=ui.shop.skinTipsUI）。
 */
Laya.class(ViewSkinTips, "sg.view.shop.ViewSkinTips", null, null);
