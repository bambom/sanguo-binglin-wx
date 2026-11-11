/**
 * sg.god.components.GodIcon —— 神灵图标（含小图标 icon_s 内嵌、天赋 box_inborn 列表、
 * 神威 box_prop 数值；dataSource setter 派发 _setUI）。
 *
 * 原文：code1.js 字节 [4351887,4352822]（935B；包装变量 nO，基类 qf=ui.god.godIconUI
 * （IDE 生成 shell，未译，[3545483,3545913)，其 createChildren 引用本族 GodIconS），
 * 明文 3 参注册 o(i,"sg.god.components.GodIcon",t)，off 4351967；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodIcon.js
 *
 * 批次 S：sg.god.components 家族第 4 类。
 * 依赖（模块直引，已译）：le=EffectManager。
 * 构造顺序：原文 modelIcon/god 字段先于 __super.call；tsc 强制 super() 先行
 * （纯预置 null，批次 H/O 位移等价先例）。dataSource getset 同 GodEquipItem 形态。
 */
import { EffectManager } from "../../manager/EffectManager";

export class GodIcon extends ui.god.godIconUI {

    public modelIcon: any = null;
    public god: any = null;

    constructor() {
        super();
    }

    public _setUI(): void {
        if (this.icon_s.dataSource = this.dataSource, this.icon_s.img_select.bottom = 0, this.box_inborn.visible = !1, this.god.skills && this.modelIcon.showInborn) {
            this.icon_s.img_select.bottom = -1 * this.box_inborn.height,
                this.box_inborn.visible = !0;
            var t: any = this.god.skills.filter(function (t: any) { return t && t.inborn });
            t.length ? (this.list_inborn.visible = !0, this.list_inborn.repeatX = t.length) : this.list_inborn.visible = !1,
                EffectManager.changeSprColor(this.img_skillFrame, this.god.state);
        }
        this.modelIcon.showProp ? (this.icon_s.txt_hero.text = "", this.box_prop.visible = !0, this.txt_gstr.text = this.god.gstr + "", this.txt_gagi.text = this.god.gagi + "") : this.box_prop.visible = !1;
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— 基链标记 getter 直译 */
    public get dataSource(): any {
        return (<any>ui.god.godIconUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        t && t.god && (this.modelIcon = this._dataSource = t, this.god = this.modelIcon.god, this._setUI());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodIcon",t)（明文 3 参，t=qf=ui.god.godIconUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodIcon, "sg.god.components.GodIcon", null, null);
