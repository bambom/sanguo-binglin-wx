/**
 * sg.god.components.GodEquipItem —— 神灵装备格组件（_setEquip 金装装配/染色、
 * _setNull 空格红点与加号皮肤、_onClick 锁定/金装/不可用三分支；dataSource setter
 * 为 5 参 getset：getter=基链 _$get_dataSource 标记 + 自定义 setter 派发装配）。
 *
 * 原文：code1.js 字节 [4349565,4351879]（2,314B；包装变量 sO，基类 Yf=ui.inside.equipItemUI
 * （IDE 生成 shell，未译，[3545168,3545475)），明文 3 参注册
 * o(i,"sg.god.components.GodEquipItem",t)，off 4349912；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodEquipItem.js
 *
 * 批次 S：sg.god.components 家族第 3 类（最大）。
 * 依赖（模块直引，已译）：ue=ModelManager、lr=ModelGame(redCheckOnce 静态/getModelEquip 经
 * modelGame 实例)、vs=Tools、re=AssetsManager、le=EffectManager、ae=ColorManager、
 * Gt=ConfigServer(fight/god)、Ze=ArrayUtil、tn=ViewManager；
 * 批次外（ambient 全局路径，延迟调用）：nr=sg.model.ModelEquip（getTypeNums 调用点 cast，
 * getTypeNameByType 既有 ambient）、m5=sg.god.view.ViewGodEquip（showView 类值）。
 * 构造顺序：原文 9 字段初始化器先于 __super.call，其后 .95 缩放定位与点击监听；
 * tsc 强制 super() 先行（字段纯预置，super 链不观察；缩放/定位/监听仍全部后置，批次 H/O
 * 位移等价先例）。dataSource getter 按原文 r(0,e,"dataSource",t.prototype._$get_dataSource,
 * setter) 的基链标记直译（tsc ES5 super.prop 读会以原型为 receiver，不可用，实测见
 * verify_s 归一集⑧）。
 */
import { ModelManager } from "../../manager/ModelManager";
import { ModelGame } from "../../model/ModelGame";
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { ViewManager } from "../../manager/ViewManager";

export class GodEquipItem extends ui.inside.equipItemUI {

    public eId: string = "";
    public eType: number = 0;
    public god: any = null;
    public locked: boolean = !1;
    public eindex: number = 0;
    public showGod: boolean = !1;
    public showName: boolean = !1;
    public clickEnabled: boolean = !1;
    public haveGoldEquip: boolean = !1;

    constructor() {
        super();
        var t: any = .95;
        this.item.scale(t, t),
            this.item.pos(.5 * (this.width - this.item.width * t), .5 * (this.height - this.item.height * t)),
            this.item.on("click", this, this._onClick);
    }

    public _setEquip(): void {
        var t: any = ModelManager.instance.modelGame.getModelEquip(this.eId);
        if (this.item.setHeroEquipEmbed(0, 0, t), ModelGame.redCheckOnce(this, !1), this.haveGoldEquip = !0, this.item.tHero.text = "", this.item.tStatus.visible = !1, this.item.label.visible = this.item.imgName.visible = this.showName, this.item.tHero.visible = this.god && this.showGod, this.god) {
            var i: any = this.imgGod;
            i && (i.visible = this.item.tHero.visible),
                Tools.textFitFontSize(this.item.tHero, this.god.name),
                this.item.tHero.color = "#FFFFFF",
                this.item.tHero.strokeColor = ColorManager.getUIColor("FONT_STROKE_COLORS")[this.god.state];
            var e: any = this.god.equip[this.eindex][1];
            EffectManager.changeSprColor(this.item.bgColor, e),
                EffectManager.changeSprColor(this.item.imgType, e);
        }
    }

    public _setNull(): void {
        this.item.setHeroEquipEmbed((<any>sg.model.ModelEquip).getTypeNums(this.eType, !1), this.eType),
            this.item.tStatus.text = Tools.getMsgById("god_0079"),
            this.haveGoldEquip = !1;
        var t: any, i: any = ModelManager.instance.modelUser.equip;
        for (var e in i) if ((t = ModelManager.instance.modelGame.getModelEquip(e)).type == this.eType && t.getLv() >= ConfigServer.fight.equipMaxLv) {
            this.haveGoldEquip = !0;
            break;
        }
        ModelGame.redCheckOnce(this, !this.locked && this.haveGoldEquip),
            this.item.imgAdd.skin = AssetsManager.getAssetsUI(this.locked ? "icon_duilie03_1.png" : "icon_plusg.png"),
            this.item.tStatus.visible = !this.locked;
    }

    public _onClick(): any {
        if (this.clickEnabled) return this.locked ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0052")) : this.haveGoldEquip ? void ViewManager.instance.showView(["ViewGodEquip", sg.god.view.ViewGodEquip], this.dataSource) : ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0078", [sg.model.ModelEquip.getTypeNameByType(this.eType)]));
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— getter=基链标记（getter 为基类
     *  _$get_dataSource 的 5 参 getset，等价直译：标记经原型链解析后以本实例为 receiver） */
    public get dataSource(): any {
        return (<any>ui.inside.equipItemUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        var i: any = this;
        t && (this._dataSource = t, this.eType = t.eType, this.showGod = t.showGod, this.showName = t.showName, this.clickEnabled = t.clickEnabled, this.eId = t.eId || "", this.god = t.god, this.locked = this.god && -1 === this.god.equipUnlockedTypes.indexOf(this.eType), this.eindex = ArrayUtil.findIndex(ConfigServer.god.god_state, function (t: any) { return t[1] === i.eType }), this.eId ? this._setEquip() : this._setNull());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodEquipItem",t)（明文 3 参，
 * t=Yf=ui.inside.equipItemUI）。base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodEquipItem, "sg.god.components.GodEquipItem", null, null);
