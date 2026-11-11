/**
 * sg.god.components.GodIconS —— 神灵小图标（可勾选 btn_check、锁定 img_lock、选中/五行/
 * 名将框；WUXING_IMGS 静态五行图池 + __init$ 惰性装载（LayaSample 尾 s.__init([...73 惰性
 * 模块…]) 列表含本类 uO，入口接线归集成批次）；本类被 godIconUI shell 的
 * regComponent("sg.god.components.GodIconS",uO) 以组件名注册，族内 GodIconBig/GodName
 * 读其 WUXING_IMGS 静态）。
 *
 * 原文：code1.js 字节 [4356597,4358415]（1,818B；包装变量 uO，基类 Kf=ui.god.godIconSUI
 * （IDE 生成 shell，未译，[3546301,3546729)），明文 3 参注册
 * o(i,"sg.god.components.GodIconS",t)，off 4356754；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodIconS.js
 *
 * 批次 S：sg.god.components 家族第 6 类。
 * 依赖（模块直引，已译）：le=EffectManager、lr=ModelGame(redCheckOnce 静态)、re=AssetsManager、
 * vs=Tools、ue=ModelManager(modelGame.getModelHero)。
 * 保真注记：_setUI 首段 `var t=this.modelIcon.canCheck&&this.god.canRecovery` 为具名绑定
 * （btn_check.visible=t 使用；GodIconBig 为丢弃求值无变量——两类不对称按原文保留）；
 * 五行图经自身静态 i.WUXING_IMGS 取值；txt_hero.overflow="scroll" 先于 textFitFontSize。
 */
import { EffectManager } from "../../manager/EffectManager";
import { ModelGame } from "../../model/ModelGame";
import { AssetsManager } from "../../manager/AssetsManager";
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";

export class GodIconS extends ui.god.godIconSUI {

    public modelIcon: any = null;
    public god: any = null;

    constructor() {
        super();
        this.on("click", this, this._onClick),
            this.on("rightclick", this, this._onClick);
    }

    public _setUI(): void {
        this.img_lock.visible = this.modelIcon.showLock && this.god.lock;
        var t: any = this.modelIcon.canCheck && this.god.canRecovery;
        if (this.btn_check.visible = t, this.btn_check.selected = this.btn_check.visible && this.modelIcon.checked, this.boxLv.visible = this.modelIcon.showLv && this.god.lv > 0, this.txt_lv.text = this.god.lv + "", this.img_change.skin = this.god.change ? AssetsManager.getAssetLater("icon_56_1.png") : AssetsManager.getAssetsUI("icon_56.png"), this.img_god.skin = AssetsManager.getAssetGod(this.god.skin_m), EffectManager.changeSprColor(this.img_frame, this.god.state), this.img_select.visible = !this.modelIcon.canCheck && this.modelIcon.selected, this.img_wuxing.visible = this.modelIcon.showWuxing, this.img_wuxing.visible && (this.img_wuxing.skin = AssetsManager.getAssetLater(GodIconS.WUXING_IMGS[this.god.wuxing])), this.box_hero.visible = !this.modelIcon.showProp && this.modelIcon.showName && this.god.hid, this.box_hero.visible) {
            var e: any = ModelManager.instance.modelGame.getModelHero(this.god.hid);
            this.txt_hero.overflow = "scroll",
                Tools.textFitFontSize(this.txt_hero, e.getName()),
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
        return (<any>ui.god.godIconSUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        t && t.god && (this.modelIcon = this._dataSource = t, this.god = this.modelIcon.god, this._setUI());
    }

    public static WUXING_IMGS: any = {};

    public static __init$(): void {
        GodIconS.WUXING_IMGS[0] = "bar_sl_huo.png",
            GodIconS.WUXING_IMGS[1] = "bar_sl_jin.png",
            GodIconS.WUXING_IMGS[2] = "bar_sl_mu.png",
            GodIconS.WUXING_IMGS[3] = "bar_sl_tu.png",
            GodIconS.WUXING_IMGS[4] = "bar_sl_shui.png";
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodIconS",t)（明文 3 参，t=Kf=ui.god.godIconSUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。__init$ 调用面为 code1.js 求值尾
 * s.__init([…,uO,…])（批次 A LayaSample.ts 尾注 NOT_RUN，入口接线归集成批次）。
 */
Laya.class(GodIconS, "sg.god.components.GodIconS", null, null);
