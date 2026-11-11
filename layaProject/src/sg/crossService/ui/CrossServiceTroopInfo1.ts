/**
 * sg.crossService.ui.CrossServiceTroopInfo1 —— 跨服战兵队行军信息条（_ui=
 * TroopInfo1UI 皮肤 + _country2=country_flag2UI 旗标；init 挂 topLayer bubbles、
 * 撤军态隐藏进度条、isMine 建气泡容器；changeHpRed 双矩阵滤镜补间闪红；
 * changeStateHandler 切 _ui/_country2 显隐）。
 *
 * 原文：code1.js 字节 [2943155,2945334)（2,179B；包装变量 wc，1 参 IIFE 基类实参
 * (vl)=sg.scene.view.ui.ScaleIcon（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.ui.CrossServiceTroopInfo1",t) @2943284；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceTroopInfo1.js
 *
 * extends 决策：原文基类 vl=sg.scene.view.ui.ScaleIcon（未译、不在任何已落地/在途
 * 批次 oracle 清单）→ temp extends 其已译真祖先 ut=laya.display.Sprite，原型链缺
 * ScaleIcon 层；initScene/resize 调回点 (<any>) cast；destroy 的 t.prototype.destroy
 * 按原文以全局注册路径传 ScaleIcon（落地后 1 行重指向 + 恢复，债登记 §5）。
 * 依赖（模块直引）：kc=CrossServiceMap（J ✓）、Sk=ui.duplicate.CrossServiceTroopInfo1UI
 * （X ✓ 皮肤真类）、vs=Tools（B ✓）、le=EffectManager（B ✓）、ae=ColorManager（B ✓）；
 * P=laya.utils.Handler、ut=laya.display.Sprite、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：bk=ui.com.country_flag2UI（-x 既有 shell，
 * _country2 字段 any 面消费）、_r=sg.model.ModelHero（getFlagName 调回点 cast）、
 * Nl=sg.model.ModelTroop（TROOP_MOVE_BAITUI 调回点 cast）。
 * ctor 求值序：_entity/_bubbleContainer 两 null 字段初始化器原文先于 __super.call，
 * TS 移到 super 后（纯赋值，观测等价，批次 H 先例）；_ui/_country2 构造效应保持
 * 原序（super 后首位）。
 */
import Handler = laya.utils.Handler;
import Sprite = laya.display.Sprite;
import { CrossServiceMap } from "../view/CrossServiceMap";
import { CrossServiceTroopInfo1UI } from "../../ui/duplicate/CrossServiceTroopInfo1UI";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";

export class CrossServiceTroopInfo1 extends Sprite {

    public _entity: any = null;
    public _bubbleContainer: any = null;
    public _ui: any;
    public _country2: any;

    constructor() {
        super();
        this._ui = new CrossServiceTroopInfo1UI(), this._country2 = new ui.com.country_flag2UI();
    }

    public init(t: any, i: any): void {
        if (this._entity = t, this._ui.icon.setHeroIcon(this._entity.modelHero.getHeadId(!1), !0, 2), Tools.textFitFontSize(this._ui.countDown_txt, this._entity.userName), this.addChild(this._ui), CrossServiceMap.instance.bubbles.push(this), this._country2.setCountryFlag(this._entity.country), this._country2.getChildByName("label").text = (<any>sg.model.ModelHero).getFlagName(this._entity.hero), this.addChild(this._country2), this._country2.y = -10, this._country2.scale(.8, .8), this._ui.bg_img.gray = this._entity.moveType > 1, this._ui.bg_img.gray || EffectManager.changeSprColor(this._ui.bg_img, this._entity.country, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX")), i = [[CrossServiceMap.instance.minScale, -1], [CrossServiceMap.instance.maxScale - .1, -1], [100, -1]], this._entity.moveType == (<any>sg.model.ModelTroop).TROOP_MOVE_BAITUI ? (this._ui.time_pro.visible = !1, this._ui.countDown_txt.pivotY = -8) : (this._ui.time_pro.visible = !0, this._ui.countDown_txt.pivotY = 0, this._entity.on("hpChange", this, this.updateHp), this.updateHp()), this._entity.isMine) {
            this._bubbleContainer = new Sprite();
            var e: any = CrossServiceMap.instance.troopBubbles[this._entity.hero];
            this._bubbleContainer.addChild(e), e.pos(0, 0), this.addChild(this._bubbleContainer);
        }
        (<any>this).initScene(CrossServiceMap.instance, i), (<any>this).resize(), this._entity.on("changeHpRed", this, this.changeHpRed);
    }

    public changeHpRed(): void {
        var t: any = this, i = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], e = [1, 0, 0, 0, 200, 0, .5, 0, 0, 0, 0, 0, .5, 0, 0, 0, 0, 0, 1, 0];
        EffectManager.translationMatrix(this._ui.time_pro, i, e, 500, new Handler(this, function () { EffectManager.translationMatrix(t._ui.time_pro, e, i, 400); }));
    }

    public updateHp(): void {
        this._ui.time_pro.value = this._entity.getHpPer();
    }

    public destroy(i?: any): void {
        void 0 === i && (i = !0), this._bubbleContainer && this._bubbleContainer.removeChildren(), (<any>sg.scene.view.ui.ScaleIcon.prototype).destroy.call(this, i), this._entity.off("hpChange", this, this.updateHp), this._entity.off("changeHpRed", this, this.changeHpRed);
    }

    public changeStateHandler(t: any): void {
        this._ui.visible = !(this._country2.visible = 0 == t), this._bubbleContainer && (this._bubbleContainer.y = this._ui.visible ? -15 : 15), this._country2.visible && (this._country2.visible = !this._ui.bg_img.gray);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.CrossServiceTroopInfo1",t)
 * （t=vl=sg.scene.view.ui.ScaleIcon，未译缓译；TS extends 层暂挂 laya.display.Sprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceTroopInfo1, "sg.crossService.ui.CrossServiceTroopInfo1", null, null);
