/**
 * sg.god.components.GodIconBig —— 神灵大图标（等级/变化/五行/名将框显隐；_setUI 首句为
 * canCheck&&canRecovery 丢弃求值（与 GodIconS 的具名绑定 var t 不同，本类不落变量）；
 * 五行图取 GodIconS.WUXING_IMGS；click/rightclick 同一 _onClick）。
 *
 * 原文：code1.js 字节 [4353579,4354923]（1,344B；包装变量 rO，基类 Xf=ui.god.godIconBigUI
 * （IDE 生成 shell，未译，[3545921,3546293)），明文 3 参注册
 * o(i,"sg.god.components.GodIconBig",t)，off 4353736；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodIconBig.js
 *
 * 批次 S：sg.god.components 家族第 5 类。
 * 依赖（模块直引，已译）：le=EffectManager、lr=ModelGame(redCheckOnce 静态)、re=AssetsManager、
 * vs=Tools、ue=ModelManager(modelGame.getModelHero)、uO=GodIconS（本批次类直引，静态
 * WUXING_IMGS 依赖 __init$ 装载——LayaSample 尾 s.__init([...73 惰性模块…]) 调用面，
 * 入口接线归集成批次，见 LayaSample.ts 尾注）。
 * 构造顺序：原文 modelIcon/god 字段先于 __super.call；tsc 强制 super() 先行（位移等价先例）。
 */
import { EffectManager } from "../../manager/EffectManager";
import { ModelGame } from "../../model/ModelGame";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { GodIconS } from "./GodIconS";

export class GodIconBig extends ui.god.godIconBigUI {

    public modelIcon: any = null;
    public god: any = null;

    constructor() {
        super();
        this.on("click", this, this._onClick),
            this.on("rightclick", this, this._onClick);
    }

    public _setUI(): void {
        this.modelIcon.canCheck && this.god.canRecovery;
        if (this.boxLv.visible = this.modelIcon.showLv && this.god.lv > 0, this.txt_lv.text = this.god.lv + "", this.img_change.skin = this.god.change ? AssetsManager.getAssetLater("icon_56_1.png") : AssetsManager.getAssetsUI("icon_56.png"), this.img_god.skin = AssetsManager.getAssetGod(this.god.skin_m), EffectManager.changeSprColor(this.img_frame, this.god.state), this.img_wuxing.visible = this.modelIcon.showWuxing, this.img_wuxing.visible && (this.img_wuxing.skin = AssetsManager.getAssetLater(GodIconS.WUXING_IMGS[this.god.wuxing])), this.box_hero.visible = !this.modelIcon.showProp && this.modelIcon.showName && this.god.hid, this.box_hero.visible) {
            var t: any = ModelManager.instance.modelGame.getModelHero(this.god.hid);
            Tools.textFitFontSize(this.txt_hero, t.getName()),
                this.txt_hero.color = this.god.hid === this.modelIcon.hid ? "#00ff00" : "#ffffff",
                this.txt_hero.text || (this.box_hero.visible = !1);
        }
        ModelGame.redCheckOnce(this, !this.modelIcon.canCheck && this.modelIcon.red);
    }

    public _onClick(): void {
        this.modelIcon.canClick && this.god.showInfo();
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— 基链标记 getter 直译 */
    public get dataSource(): any {
        return (<any>ui.god.godIconBigUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        t && t.god && (this.modelIcon = this._dataSource = t, this.god = this.modelIcon.god, this._setUI());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodIconBig",t)（明文 3 参，
 * t=Xf=ui.god.godIconBigUI）。base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodIconBig, "sg.god.components.GodIconBig", null, null);
