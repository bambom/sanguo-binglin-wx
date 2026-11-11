/**
 * sg.god.components.GodSkillItem —— 神灵技能格（_setUI 灰阶/锁定/边框染色/数量；
 * dataSource setter 先清 five 字段再按 ModelGodSkill 实例或描述对象装配——原文对
 * `t instanceof sg.god.model.ModelGodSkill` 直接使用全局注册路径）。
 *
 * 原文：code1.js 字节 [4360492,4361746]（1,254B；包装变量 pO，基类 tp=ui.god.godSkillItemUI
 * （IDE 生成 shell，未译，[3547707,3548068)，godSkillListUI shell 以 regComponent 引用本类），
 * 明文 3 参注册 o(i,"sg.god.components.GodSkillItem",t)，off 4360615；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodSkillItem.js
 *
 * 批次 S：sg.god.components 家族第 12 类；GodSkillList（本批次类直引）的 itemRender。
 * 依赖（模块直引，已译）：lr=ModelGame(redCheckOnce 静态)、yr=ModelItem(getIconUrl/
 * getMyItemNum 静态)、re=AssetsManager、le=EffectManager；
 * 批次外（ambient 全局路径，延迟调用）：zi=sg.god.model.ModelGodSkill（批次 R 在译；
 * instanceof 值 + getGodSkillName 静态，ambient 见 sg-externals-s.d.ts）。
 * 构造顺序：原文 5 字段先于 __super.call；tsc 强制 super() 先行（位移等价先例）。
 */
import { ModelGame } from "../../model/ModelGame";
import { ModelItem } from "../../model/ModelItem";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";

export class GodSkillItem extends ui.god.godSkillItemUI {

    public model: any = null;
    public locked: boolean = !1;
    public red: boolean = !1;
    public showName: boolean = !1;
    public selected: boolean = !1;

    constructor() {
        super();
    }

    public _setUI(): void {
        this.box_name.visible = this.showName,
            this.img_select.visible = this.selected,
            ModelGame.redCheckOnce(this, this.red),
            this.model ? (this.box.gray = 0 === this.model.lv, this.img_lock.visible = !1, this.img_skill.skin = ModelItem.getIconUrl(this.model.item), this.img_frame.skin = AssetsManager.getAssetLater(this.model.inborn ? "bar_sl_jnd_1.png" : "bar_sl_jnd.png"), EffectManager.changeSprColor(this.img_frame, this.model.lv - 1), this.showName && (this.txt_name.text = sg.god.model.ModelGodSkill.getGodSkillName(this.model.id), this.txt_num.text = ModelItem.getMyItemNum(this.model.item) + "")) : (this.img_lock.visible = !0, this.img_skill.skin = "", this.img_frame.skin = AssetsManager.getAssetLater("bar_sl_jnd.png"), this.img_lock.skin = AssetsManager.getAssetsUI(this.locked ? "icon_duilie03_1.png" : "icon_plusg.png"), EffectManager.changeSprColor(this.img_frame, -1));
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— 基链标记 getter 直译；
     *  setter 首句无条件 _dataSource=t（族内唯一，余类 t&& 前置） */
    public get dataSource(): any {
        return (<any>ui.god.godSkillItemUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        this._dataSource = t,
            this.model = null,
            this.locked = !1,
            this.showName = !1,
            this.selected = !1,
            t instanceof sg.god.model.ModelGodSkill ? this.model = t : t && (this.model = t.skill, this.locked = t.locked, this.red = t.red, this.showName = t.showName, this.selected = t.selected),
            this._setUI();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodSkillItem",t)（明文 3 参，
 * t=tp=ui.god.godSkillItemUI）。base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodSkillItem, "sg.god.components.GodSkillItem", null, null);
