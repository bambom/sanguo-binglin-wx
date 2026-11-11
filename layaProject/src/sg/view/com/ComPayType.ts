/**
 * sg.view.com.ComPayType —— 通用付费/展示组件基类（全库最大单类之一，35,742B wrapper；
 * 80 个原型方法：图标/文本/英雄头像/装备/科技/建筑/奖励盒/觉醒/才情/锦囊等全部 setData 族
 * 皮肤设定入口；16 个已译 ui.com.* / taskBaseDupUI 皮肤类的 extends 债基类，落地后由
 * 主会话重指向）。
 *
 * 原文：code1.js 字节 [3358725,3394467)（35,742B 函数体段；包装变量 n_，基类 Ju=
 * sg.view.BaseSprite，明文 3 参注册 o(i,"sg.view.com.ComPayType",t)，off 3358862；
 * 全类零池化；ctor 仅 5 个预置字段，其余 this.X 均为子类 loadUI 动态字段）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-ae/ComPayType.js
 *
 * 依赖（已译真类直引）：Rt=ConfigApp、vs=Tools、re=AssetsManager、le=EffectManager、
 * Gt=ConfigServer、zo=ModelBuiding、Js=LoadeManager、Vt=ConfigUI、ue=ModelManager、
 * Sr=ModelOfficial、Wt=HelpConfig、gs=StringUtil、yr=ModelItem、tn=ViewManager、
 * be=TestUtils、ae=ColorManager；引擎：Ct=Tween、P=Handler、Tt=URL、W=Label、k=Ease、
 * rt=ResourceVersion、s=Laya（s.timer）、laya.display.Sprite（instanceof 字面链）。
 * 批次外（ambient 全局路径）：_r=sg.model.ModelHero、Be=sg.model.ModelTitle、
 * nr=sg.model.ModelEquip、bo=sg.god.model.ModelGodMain、_s=sg.utils.Spine、
 * Oo=sg.model.ModelAwaken、Dt=sg.boundFor.GotoManager、Rr=sg.model.ModelScience、
 * Me=sg.model.ModelPrepare、jr=sg.model.ModelTalent、pr=sg.model.ModelHonour、
 * Se=sg.model.ModelScheme、To=sg.jigsaw.model.ModelJigsaw（以上 sg-externals.d.ts /
 * sg-externals-b.d.ts 已有面，缺面调用点 (<any>) 断言桥接）；Ka=sg.view.wineshop.model.
 * ModelRecipe、TJ=sg.view.soul.ItemSoulProp、$i=sg.jigsaw.model.ModelAdmireMap（本批
 * sg-externals-ae.d.ts 新增声明）。
 *
 * 保真点：80 方法按 oracle 顺序逐一对应；void 0===x 缺省守卫、逗号序列语句、丢弃求值
 * （如 setBuildingInfoInfo 内两次 getArmyMakeCfgByGrade 纯调用）、var 提升语义
 * （layoutHeroIcon 的 l 在 if 分支先写后于 else 分支 var 声明——按原文保留单 var）、
 * 正则字面量 /@(\w+)@/ 逐字、callFunc 隐式全局赋值（模块级 var 承接，见文首声明）。
 * ctor 预置 5 字段带初始化器（N5 位移：oracle [fields,SUPER] ≡ 编译 [SUPER,fields]，
 * 批次 T ViewGodCheck 同款）；其余 63 个子类契约动态字段零初始化器声明（类型层 only，
 * emit 零代码，不构成运行期新成员）。
 */
import Tween = laya.utils.Tween;
import Handler = laya.utils.Handler;
import URL = laya.net.URL;
import Label = laya.ui.Label;
import Ease = laya.utils.Ease;
import ResourceVersion = laya.net.ResourceVersion;
import { BaseSprite } from "../BaseSprite";
import { ConfigApp } from "../../cfg/ConfigApp";
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { ConfigServer } from "../../cfg/ConfigServer";
import { ModelBuiding } from "../../model/ModelBuiding";
import { LoadeManager } from "../../manager/LoadeManager";
import { ConfigUI } from "../../cfg/ConfigUI";
import { ModelManager } from "../../manager/ModelManager";
import { ModelOfficial } from "../../model/ModelOfficial";
import { HelpConfig } from "../../cfg/HelpConfig";
import { StringUtil } from "../../utils/StringUtil";
import { ModelItem } from "../../model/ModelItem";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { ColorManager } from "../../manager/ColorManager";

/**
 * 原文隐式全局：setHeroIcon 装载回调 `P.create(y,callFunc=function(){…})` 对未声明
 * 变量 callFunc 的赋值（sloppy 模式 = 写 window.callFunc）。此处以模块级 var 承接
 * 同一赋值-读取数据流；window 可见性差异见 batch-ae-report（全库检索无读者，各兄弟
 * 类同为只写方）。
 */
var callFunc: any;

export class ComPayType extends BaseSprite {

    /** ctor 预置字段（原文构造体在 i.__super.call(this) 前逐一预置；N5 位移等价） */
    public mImg: any = null;
    public mLabel: any = null;
    public currImgName: string = "";
    public currTxtVar: string = "";
    public tempSpine: any = null;

    /**
     * 子类契约动态字段（零初始化器声明——类型层 only，emit 零代码；运行期由各皮肤子类
     * loadUI/createChildren 注入，ComPayType 自身 ctor 不预置，与 oracle 一致）。
     * boxType/hero_id 为本类方法运行期写入的动态字段（oracle 亦无声明位）。
     */
    public textlabel: any;
    public tInfo: any;
    public t0: any;
    public t1: any;
    public t2: any;
    public bgColor: any;
    public txt_bg: any;
    public equipStar: any;
    public tbLvNext: any;
    public aImg: any;
    public tHero: any;
    public flag_container: any;
    public tbLv: any;
    public imgArrows: any;
    public aIcon: any;
    public imgLink: any;
    public imgGod: any;
    public glowBox: any;
    public imgName: any;
    public img: any;
    public icon_img: any;
    public label_txt: any;
    public flag_txt: any;
    public flag_img: any;
    public com_icon: any;
    public pNum: any;
    public bg: any;
    public tStatus: any;
    public imgAdd: any;
    public label: any;
    public equipType: any;
    public imgType: any;
    public icon: any;
    public bgbgbg: any;
    public tbName: any;
    public bIcon: any;
    public text0: any;
    public armyBox: any;
    public aBox: any;
    public pNumNext: any;
    public iBg: any;
    public ta0: any;
    public ta1: any;
    public ta2: any;
    public armyType: any;
    public tFunc: any;
    public boxType: any;
    public imgSelect: any;
    public tVar: any;
    public tName: any;
    public tLv: any;
    public imgMask: any;
    public stag: any;
    public cl: any;
    public pBox: any;
    public pImg: any;
    public pName: any;
    public aTips1: any;
    public aTips2: any;
    public armyLv: any;
    public func1: any;
    public func2: any;
    public func: any;
    public hero_id: any;

    constructor() {
        super();  // 原文 i.__super.call(this)（前移 5 个预置字段由 TS 字段初始化器承接）
    }

    public setData(t?, i?, e?, s?, n?, h?): void {
        if (void 0 === t && (t = ""), void 0 === i && (i = ""), void 0 === e && (e = -1), void 0 === s && (s = 0), void 0 === n && (n = ""), void 0 === h && (h = !0),
            this.mImg || (this.mImg = this.getChildByName("img"), this.mImg.visible = !1),
            this.mLabel || (this.mLabel = this.getChildByName("label"), this.mLabel.default_color || (this.mLabel.default_color = this.mLabel.color)),
            t && (this.mImg.visible = !0, this.mImg.skin = t),
            this.mLabel.text = i,
            this.mLabel && (this.mLabel.color = 0 == e ? ColorManager.getUIColor("FONT_COLOR_GREEN") : 1 == e ? ColorManager.getUIColor("FONT_COLOR_RED") : 2 == e ? "#c5dbff" : this.mLabel.default_color ? this.mLabel.default_color : "#fffbc1"),
            this.textlabel && "" != n) {
            var o = this.textlabel;
            o.width = this.width - 8, o.x = 4, o.text = n, Tools.textFitFontSize(o)
        }
        var r: any = this.getChildByName("bg");
        r && (r.visible = h), this.layout(s)
    }

    public setNum(t: any): void {
        this.mLabel = this.getChildByName("label"), this.mLabel.text = t + ""
    }

    public changeTxtColor(t: any): void {
        this.mLabel.color != t && (t == ColorManager.getUIColor("TXT_STATUS_OK") && this.mLabel.default_color ? this.mLabel.color = this.mLabel.default_color : this.mLabel.color = t)
    }

    public getTextFieldWidth(): any {
        return this.mLabel.x + this.mLabel.textField.textWidth * this.mLabel.scaleX
    }

    public getWidth(): any {
        return this.mLabel.x + this.mLabel.displayWidth
    }

    public layout(t?): void {
        if (void 0 === t && (t = 0), 0 == t) if ("type10000" == this.name) {
            var i = this.mImg && this.mImg.width ? this.mImg.width : 40, e = ConfigApp.isLandscape ? 2 : 5, s = Math.floor(.5 * (this.width - (i + e + this.mLabel.displayWidth)));
            if (this.mImg.visible = "" != this.mLabel.text, this.mImg.x = s, this.mLabel.x = this.mImg.x + i + e, this.textlabel) return;
            this.mLabel.y = .5 * this.height - .5 * this.mLabel.height, this.mImg.y = .5 * this.height - .5 * i
        } else this.name; else 1 == t ? (this.mImg.visible = !1, this.mLabel.x = .5 * (this.width - this.mLabel.displayWidth), this.mLabel.y = .5 * (this.height - this.mLabel.displayHeight)) : 2 == t && (this.mImg.visible = !1, this.mLabel.x = .5 * (this.width - this.mLabel.displayWidth))
    }

    public setHeroStar(t: any): void {
        for (var i, e = (<any>sg.model.ModelHero).getHeroStarGradeColor(t), s = t >= 0 ? t % 6 : 0, n = 1; n <= 5; n++) (i = <any>this.getChildByName("hStar" + n)).skin = n <= s ? AssetsManager.getAssetsUI("icon_66.png") : AssetsManager.getAssetsUI("icon_67.png"), EffectManager.changeSprColor(i, e)
    }

    public setRune(t?, i?, e?): void {
        void 0 === i && (i = !1), void 0 === e && (e = !0);
        var s: any = this.getChildByName("tName");
        (<any>this.getChildByName("img")).skin = t.getIcon(), s.text = t.getName(), s.visible = e, (<any>this.getChildByName("bgName")).visible = e, (<any>this.getChildByName("imgSelect")).visible = i
    }

    public setHeroType(t?, i?, e?): void {
        if (void 0 === i && (i = 0), void 0 === e && (e = !0), i < 0) this.visible = !1; else {
            this.visible = !0;
            var s: any = this.getChildByName("label"), n: any = this.getChildByName("img"), h: any = this.getChildByName("txtImg"), o = ConfigServer.system_simple.test_image ? ConfigServer.system_simple.test_image.hero_type : 0;
            if (s.visible = 0 == o, n.visible = 0 == o, h.visible = 1 == o, 0 == o) s.text = t, "en" == ConfigApp.lan() ? Tools.textFitFontSize2(s) : Tools.textFitFontSize(s); else {
                var r = "herotype_" + i + (e ? "" : "_m") + ".png";
                h.skin = AssetsManager.getAssetLater(r)
            }
        }
    }

    public setHeroProp4(t: any, i: any): void {
        var e: any = this.getChildByName("label");
        e.text = t, this.tVar.text = i + "";
        var s: any = this.getChildByName("bar");
        s.value = i / 100, "cn" != ConfigApp.lan() && (e.align = "right", e.left = NaN, e.width = e.textField.textWidth, e.x = s.left - e.width - 2)
    }

    public setHeroArmyProp4(t: any, i: any): void {
        (<any>this.getChildByName("txt")).text = t;
        var e: any = this.getChildByName("tVar"), s: any = this.getChildByName("img");
        0 == i ? (e.text = "", s.visible = !1) : (e.text = i + "", s.visible = !0)
    }

    public setHeroArmyProp4_1(t: any, i: any, e: any, s: any): void {
        (<any>this.getChildByName("txt")).text = i;
        var n: any = this.getChildByName("tVar"), h: any = this.getChildByName("img");
        0 == e ? (n.text = "", h.visible = !1) : (n.text = e + "", h.visible = !0), (<any>this.getChildByName("tProp")).text = "string" == typeof t ? t : (<any>sg.model.ModelHero).army_prop_name[t];
        var o: any = this.getChildByName("armyIcon");
        -1 == s ? o.visible = !1 : (o.visible = !0, o.setArmyIcon(s, ModelBuiding.getArmyCurrGradeByType(s)))
    }

    public setHeroTitle(t: any): void {
        var i, e;
        if (!Tools.isNullString(t) && t) {
            var s = (<any>sg.model.ModelTitle).getConfig(t);
            if (s) if (i = this.bg) {
                var n;
                s.res ? (i.skin = (<any>sg.model.ModelTitle).getResPath(s.res), i.visible = !0) : i.visible = !1, (n = this.getChildByName("fgArr")) && (n.removeSelf(), n.destroy()), s.fgArr && ((n = EffectManager.loadResArr(s.fgArr)).name = "fgArr", n.x = .5 * this.width, n.y = .5 * this.height, this.addChild(n)), (n = this.getChildByName("bgArr")) && (n.removeSelf(), n.destroy()), s.bgArr && ((n = EffectManager.loadResArr(s.bgArr)).name = "bgArr", n.x = .5 * this.width, n.y = .5 * this.height, this.addChildAt(n, 0)), e = this.getChildByName("tName"), s.label ? (e || ((e = new Label).name = "tName", e.width = this.width, e.fontSize = 20, e.color = "#FFFFFF", e.stroke = 4, e.align = "center", e.centerX = 0, e.centerY = 8), this.addChild(e), e.visible = !0, e.strokeColor = EffectManager.getFontColor(s.rarity, ColorManager.getUIColor("FONT_STROKE_COLORS")), Tools.textScale(e), Tools.textFitFontSize(e, (<any>sg.model.ModelTitle).getName(t), 0, 11, !1, !1)) : e && (e.visible = !1)
            } else {
                e = this.tName, Tools.textFitFontSize(e, (<any>sg.model.ModelTitle).getName(t), 0, 11, !1, !1);
                for (var h = parseInt(s.rarity), o = 1; o <= 4; o++) (i = this["lv" + o]).visible = h == o
            }
        }
    }

    public setArmyIcon(t?, i?, e?): void {
        void 0 === i && (i = 1), void 0 === e && (e = !1);
        var s: any = this.getChildByName("img"), n = e ? (<any>sg.model.ModelHero).army_icon_ui2[t] : (<any>sg.model.ModelHero).army_icon_ui[t];
        s.skin = AssetsManager.getAssetLater(n), e || EffectManager.changeSprColor(s, i - 1, !1)
    }

    public setArmyLv(t: any): void {
        if ("army_grade" == this.name) for (var i = !1, e = 0; e < 6; e++) i = e < t, (<any>this.getChildByName("grade" + e)).gray = !i
    }

    public setHeroEquipMaster(t: any): void {
        var i, e = null;
        if (t) {
            e = t.getMyHero();
            var s = t.installType();
            if (e) {
                (i = this.tHero).visible = !0, i.text = e.getName(), Tools.textFitFontSize(i), i.color = "#FFFFFF", i.strokeColor = e.getStrokeColor();
                var n = this.imgLink;
                n && (n.visible = s == (<any>sg.model.ModelEquip).INSTALL_TYPE_SOUL)
            }
            var h = this.imgGod;
            if (h && (h.visible = !1), s == (<any>sg.model.ModelEquip).INSTALL_TYPE_GOD) {
                h && (h.visible = !0);
                var o = (<any>sg.god.model.ModelGodMain.instance).getModelByEquip(t);
                (i = this.tHero).visible = !0, Tools.textFitFontSize(i, o.name), i.color = "#FFFFFF", i.strokeColor = ColorManager.getUIColor("FONT_STROKE_COLORS")[o.state]
            }
        }
    }

    public setHeroEquipType(t?, i?, e?, s?): void {
        void 0 === i && (i = 0), void 0 === e && (e = -1), void 0 === s && (s = !1), this.imgAdd.visible = !1, this.tStatus.visible = !1, this.tHero.visible = !1, this.glowBox.visible = !1, this.label.visible = !1, this.imgName.visible = !1;
        var n = this.equipType, h = this.imgType, o = this.img, r = this.imgLink, a = this.imgGod;
        h.visible = !1, n.visible = !1, o.visible = !1, h.filters = null, r && (r.visible = !1), a && (a.visible = !1), this.bgColor.visible = !0, this.bgColor.filters = null;
        var l = !1, c = this.glowBox;
        if (this.equipStar && (this.equipStar.visible = !1), t) {
            h.visible = !0, h.skin = t.getBack(), o.visible = !0;
            var u = AssetsManager.getAssetsICON(sg.model.ModelEquip.getIcon(t.id));
            o.skin = "", o.skin = u;
            var d = e > -1 ? e : t.getLv(), _ = t.getFrame(), m = -1 === _ ? d : _;
            if (EffectManager.changeSprColor(h, m), EffectManager.changeSprColor(this.bgColor, m), (t.isMine() || s) && !Tools.isNullString(t.special)) {
                l = !0;
                var g = c.specialAniName ? c.specialAniName : "";
                if (c.visible = !0, g != t.special) {
                    c.destroyChildren(), c.specialAniName = t.special;
                    var f = EffectManager.loadAnimation(t.special, "", 0);
                    ConfigServer.effect.equip_special_cover && ConfigServer.effect.equip_special_cover[t.special] || (f.blendMode = "lighter"), c.addChild(f)
                }
            }
            this.equipStar && (this.equipStar.visible = !0, this.equipStar.setEquipStart(d))
        } else h.visible = !1, -1 == i ? n.visible = !1 : (n.visible = !0, n.skin = (<any>sg.model.ModelEquip).getTypeImgUrl(i)), EffectManager.changeSprColor(this.bgColor, 0);
        l || (c.destroyChildren(), c.specialAniName && (c.specialAniName = ""))
    }

    public setHeroEquipEmbed(t?, i?, e?, s?): void {
        void 0 === s && (s = !1);
        var n = this.imgAdd, h = this.tStatus, o = this.label, r = this.imgName, a = this.tHero, l = this.equipType, c = this.imgType, u = this.img, d = this.glowBox, _ = this.imgLink, m = this.imgGod, g = this.equipStar;
        if (n.visible = !1, h.visible = !1, r.visible = o.visible = !1, a.visible = !1, _ && (_.visible = !1), m && (m.visible = !1), l.visible = !1, c.visible = !1, u.visible = !1, d.visible = !1, c.filters = null, this.bgColor.filters = null, g && (g.visible = !1), e) {
            c.visible = !0, c.skin = e.getBack(), r.visible = o.visible = !0, o.originalY || (o.originalY = o.y), r.originalY || (r.originalY = r.y), o.y = o.originalY, r.y = r.originalY, o.color = ColorManager.getUIColor("FONT_COLORS")[e.getLv()], o.text = e.getName(), Tools.textFitFontSize(o), u.visible = !0;
            var f = AssetsManager.getAssetsICON(sg.model.ModelEquip.getIcon(e.id));
            u.skin = "", u.skin = f;
            var p = e.getLv(), v = e.getFrame(), y = -1 === v ? p : v;
            if (EffectManager.changeSprColor(c, y), EffectManager.changeSprColor(this.bgColor, y), (e.isMine() || s) && !Tools.isNullString(e.special)) if (d.visible = !0, d.specialAniName == e.special) { } else {
                d.destroyChildren(), d.specialAniName = e.special;
                var b = EffectManager.loadAnimation(e.special, "", 0);
                ConfigServer.effect.equip_special_cover && ConfigServer.effect.equip_special_cover[e.special] || (b.blendMode = "lighter"), d.addChild(b)
            }
            g && (g.visible = !0, g.setEquipStart(p), g.visible && (o.y -= 10, r.y -= 10))
        } else d.destroyChildren(), d.specialAniName = "", l.visible = !0, l.skin = (<any>sg.model.ModelEquip).getTypeImgUrl(i), h.visible = !0, n.visible = !0, u.skin = "", u.visible = !0, t > 0 ? (h.text = Tools.getMsgById("_equip21"), n.skin = AssetsManager.getAssetsUI("icon_plusg.png")) : (h.text = Tools.getMsgById("_equip22"), n.skin = AssetsManager.getAssetsUI("icon_plusy.png")), EffectManager.changeSprColor(this.bgColor, 0);
        h.visible && Tools.textFitFontSize2(h)
    }

    public setEquipStart(t: any): void {
        if (0 != (<any>sg.model.ModelEquip).showStar) if (t < 0) this.visible = !1; else {
            this.visible = !0;
            for (var i = this.numChildren, e = 0; e < i; e++) {
                var s: any = this.getChildByName("img" + e);
                if (s.visible = e <= t, s.visible) {
                    var n = (this.width - (t + 1) * s.width) / 2;
                    s.x = n + s.width * e
                }
            }
        } else this.visible = !1
    }

    public getImgPanel(): any {
        return this.getChildByName("imgPanel")
    }

    public setBuildingTipsIcon(t?, i?, e?, s?, n?): void {
        if (void 0 === i && (i = ""), this.mImg = this.icon_img, this.mLabel = this.label_txt, this.mLabel.text = i, "txt_bg" in this && (Tools.isNullString(i) ? this.txt_bg.visible = !1 : (this.txt_bg.visible = !0, this.txt_bg.width = this.mLabel.textField.textWidth + 20)), this.centerImage(t), s) {
            var h = this.flag_txt;
            h.text = s, h.width = h.textField.textWidth, h.centerX = 0;
            var o = this.flag_img;
            o.skin = n, o.width = h.textField.textWidth + 20, this.flag_container.visible = !0
        } else "flag_container" in this && (this.flag_container.visible = !1);
        e && (this.getImgPanel().getChildByName("bg").skin = e)
    }

    public centerImage(t: any): void {
        this.mImg.skin = t, this.mImg.on("loaded", this, this.setImgCenter), this.setImgCenter()
    }

    public setImgCenter(): void {
        var t = Math.max(this.mImg.parent.width, this.mImg.parent.height);
        if (this.mImg.source) {
            var i = Math.max(this.mImg.source.sourceWidth, this.mImg.source.sourceHeight);
            this.mImg.size(this.mImg.source.sourceWidth, this.mImg.source.sourceHeight), this.mImg.scale(t / i, t / i), this.mImg.pos(.5 * (t - this.mImg.displayWidth), .5 * (t - this.mImg.displayHeight))
        }
    }

    public setBuildingTipsIcon3(t: any, i: any, e: any): void {
        if (this.icon.setHeroIcon(t, !0), i) {
            var s = this.flag_txt;
            s.text = i;
            var n = this.flag_img;
            n.skin = e, s.width = s.textField.textWidth, s.centerX = 0, n.width = s.textField.textWidth + 20
        }
    }

    public setBuildingTipsIcon4(t?, i?, e?, s?, n?): void {
        if (void 0 === i && (i = ""), this.mImg = this.icon_img, this.mLabel = this.label_txt, this.mLabel.text = i, "txt_bg" in this && (Tools.isNullString(i) ? this.txt_bg.visible = !1 : (this.txt_bg.visible = !0, this.txt_bg.width = this.mLabel.textField.textWidth + 20)), this.mImg.visible = !1, this.com_icon.visible = !0, this.com_icon.setData(t, -1, -1), this.com_icon.mouseEnabled = !1, s) {
            var h = this.flag_txt;
            h.text = s, h.width = h.textField.textWidth, h.centerX = 0;
            var o = this.flag_img;
            o.skin = n, o.width = h.textField.textWidth + 20, this.flag_container.visible = !0
        } else "flag_container" in this && (this.flag_container.visible = !1);
        e && (this.getImgPanel().getChildByName("bg").skin = e)
    }

    public setBuildingTipsIcon5(t: any, i: any): void {
        var e: any = this.getChildByName("imgPanel"), s = e.getChildByName("heroIcon"), n = e.getChildByName("label_txt");
        n.text = 1 == i ? Tools.getMsgById("city_control002") : "";
        var h = e.getChildByName("label_txt2");
        h.text = 2 == i ? Tools.getMsgById("city_control010") : "", e.getChildByName("label_bg").visible = 1 == i;
        var o = e.getChildByName("bg");
        o.destroyChildren();
        var r = { 1: "city_control_begin", 2: "glow041", 3: "glow041" }[i], a = EffectManager.loadAnimation(r, "", 0);
        a.x = o.width / 2, a.y = o.height / 2, o.addChild(a), 2 != i && 3 != i || a.scale(.8, .8), 3 == i && (h.text = Tools.getMsgById("city_control012"), n.text = ""), s.setHeroIcon(t)
    }

    public setReportTag(t?): void {
        void 0 === t && (t = !1);
        var i: any = this.getChildByName("imgPanel"), e: any = this.getChildByName("reportTag");
        i.gray = e.visible = t
    }

    public setBuildingTipsIcon2(t?, i?, e?): void {
        if (void 0 === i && (i = ""), this.mImg = this.icon_img, "icon_img" in this && (this.mImg.skin = t), "label_txt" in this) {
            this.mLabel = this.label_txt, this.mLabel.text = i, this.mLabel.fontSize = 20;
            var s = this.mLabel.parent;
            this.mLabel.y = .5 * (s.width - this.mLabel.fontSize), "txt_bg" in this && (this.txt_bg.visible = !1)
        }
        e && (this.getImgPanel().getChildByName("bg").skin = e)
    }

    public getNodeByName(t: any, i: any): any {
        var e, s;
        if (t instanceof Array) {
            for (var n = t, h = n.length, o = 0; o < h; o++) if ((s = n[o]) && (e = s.getChildByName(i))) return e
        } else t instanceof laya.display.Sprite && (e = (s = t).getChildByName(i));
        return e || (e = this.getChildByName(i)), e
    }

    public setHeroSkin(t?, i?, e?, s?): void {
        if (void 0 === i && (i = !0), void 0 === e && (e = -1), void 0 === s && (s = ""), -1 != t.indexOf("skin")) {
            var n = t.split("_");
            t = n[0].replace("skin", "hero") + "_0_" + n[1]
        }
        this.setHeroIcon(t, i, e, !0, !1, !1, null, !0, !0, s)
    }

    public setHeroFightIcon(t?, i?, e?, s?): void {
        void 0 === i && (i = -1), void 0 === e && (e = 0), void 0 === s && (s = !1), this.setHeroIcon(t, !0, i);
        var n = this.tLv;
        n && (e > 0 ? (n.setNum(e), n.visible = !0) : n.visible = !1), s && (this.scaleX = -this.scaleY, n && (n.scaleX = -n.scaleY))
    }

    public setHeroIcon(t?, i?, e?, s?, n?, h?, o?, r?, a?, l?, c?): void {
        void 0 === i && (i = !0), void 0 === e && (e = -1), void 0 === s && (s = !0), void 0 === n && (n = !1), void 0 === h && (h = !1), void 0 === r && (r = !0), void 0 === a && (a = !0), void 0 === l && (l = ""), void 0 === c && (c = !0);
        var u, d = this.getImgPanel(), _ = this.getNodeByName(d, "img"), m = this.getNodeByName(d, "heroBg"), g = this.getNodeByName(d, "bgf"), f = this.getNodeByName(d, "awakenBg"), p = this.getNodeByName(d, "imgAwaken");
        if (!t) return _ && (_.visible = !1), m && (m.visible = !1), g && (g.visible = e > -1, g.visible && EffectManager.changeSprColor(g, e, !1)), f && (f.visible = !1), void (p && (p.visible = !1));
        this.bgbgbg && (this.bgbgbg.visible = s), _ || (_ = (<any>this.getChildByName("imgBox")).getChildByName("img"));
        var v, y = this, b = 0, I = !1, x = "";
        if (-1 != t.indexOf("hero")) {
            if (-1 != t.indexOf("_")) {
                var w = t.split("_");
                t = w[0], w[1] && (b = Number(w[1])), w[2] && 0 != Number(w[2]) && (x = t.replace("hero", "skin") + "_" + w[2], I = !0)
            }
            v = sg.model.ModelHero.getHeroIcon(t)
        } else v = t;
        y.hero_id = I ? x : t;
        var C = AssetsManager.getAssetsHero(I ? x : v, i), k = !1;
        _ && i ? null != _.iconURL && _.iconURL == C || (k = !0) : (k = !0, -1 === AssetsManager.storeImgs.indexOf(_) && AssetsManager.storeImgs.push(_)), n && (this.visible = !k), LoadeManager.addTempHeroBigImg(C), d && (u = d.getChildByName("spineBox")) && (u.visible = !1);
        var T = (<any>sg.model.ModelHero).getRarityById(t);
        k ? (_.iconURL != C && (_.visible = !1), _.iconURL = C, LoadeManager.loadImg(C, Handler.create(y, function (e: any, s: any, n: any, h: any, o: any, r: any, d: any) {
            if (r == y.hero_id && n && n.parent) {
                if (n.iconURL != e && s || (s || (n.skin = ""), n.skin = e), h && (y.visible = !0), y.layoutHeroIcon(n, s, "" != x, o), ConfigApp.isLandscape && f && i && (f.width = f.height = _.width * _.scaleX * .9), u && u.destroyChildren(), 1 === ConfigUI.heroShowAss && (c = !1), 0 == i && ConfigApp.isLandscape && c) {
                    var m = ResourceVersion.manifest, g = "spine/" + (I ? x : t) + "/skeleton.sk";
                    if (m && m[g]) if (a) {
                        var p = EffectManager.newHeroSpineBox(I ? x : t, 0, 1.5, d, l, y);
                        u.addChild(p), p.pos(0, 0), p.scale(n.width / 640, n.width / 640)
                    } else {
                        y.tempSpine && (y.tempSpine.Destroy(), y.tempSpine = null), y.tempSpine = new sg.utils.Spine;
                        n.parent.height;
                        u && (u.visible = !0), y.tempSpine.Load(g, 1, n.width / 640, 0, 0, Handler.create(y, callFunc = function () { y.tempSpine && d && y.tempSpine.Play(0) }), u, a, t)
                    } else _.visible = !0
                } else _.visible = !0;
                u && (u.visible = !_.visible)
            }
        }, [C, i, _, n, h, I ? x : t, r]))) : (_.visible = !0, y.layoutHeroIcon(_, i, "" != x, h), u && (u.visible = !_.visible)), e > -1 ? (m && (m.visible = !0, EffectManager.changeSprColor(m, e, !1)), p && (p.visible = b), f && (f.visible = b, f.visible && (f.skin = (<any>sg.model.ModelHero).awakenImgUrl(t, !0), 4 != T && EffectManager.changeSprColor(f, e, !1))), g && (g.visible = !0, EffectManager.changeSprColor(g, e, !1))) : (m && (m.visible = !1), g && (g.visible = !1), f && (f.visible = !1), p && (p.visible = b)), p && b && (p.skin = (<any>sg.model.ModelAwaken).getHeadFrameSkin(b, t)), o && o.length > 0 && (_.scale(o[0], o[0]), _.centerY = o[1]), ConfigApp.isLandscape && f && (this.setHeroIconAwakenImg(b, e, !i), i && (f.width = f.height = _.width * _.scaleX * .9), this.setHeroIconAwakenAni(!i && b ? b : 0, e, T))
    }

    public setHeroIconAwakenImg(t: any, i: any, e: any): void {
        var s = this.getImgPanel(), n = this.getNodeByName(s, "awakenBg");
        n && (i = 0 == t ? -1 : i, n.visible = i > -1, n.visible && e ? this.setHeroIconAwakenRotate(!0) : this.setHeroIconAwakenRotate(!1), EffectManager.changeSprColor(n, i, !1))
    }

    public setHeroIconAwakenRotate(t: any): void {
        var i = this.getImgPanel(), e = this.getNodeByName(i, "awakenBg");
        e && (t ? (EffectManager.endFrameRotate(e), EffectManager.startFrameRotate(e, .2)) : (e.rotation = 0, EffectManager.endFrameRotate(e)))
    }

    public setHeroIconAwakenAni(t?, i?, e?): void {
        void 0 === i && (i = -1), void 0 === e && (e = 0);
        var s = this.getImgPanel(), n = this.getNodeByName(s, "awakenAniBox");
        if (n) if (n.visible = !0, EffectManager.changeSprColor(n, i, !1), t) {
            var h = "awakeneffect001";
            if (!n.getChildByName(h)) {
                n.destroyChildren();
                var o = EffectManager.loadAnimation(h, "", 0);
                n.addChild(o), o.name = h, n.scaleX = n.scaleY = 1.2, o.x = n.width / 2, o.y = n.height / 2
            }
        } else n.destroyChildren();
        t || this.setHeroIconAwakenRotate(!1)
    }

    public layoutHeroIcon(t: any, i: any, e: any, n: any): void {
        var h = this;
        if (void 0 === e && (e = !1), void 0 === n && (n = !1), !t.destroyed) {
            var o = Laya.loader.getRes(t.skin);
            if (o) {
                var r = o.sourceWidth, a = o.sourceHeight;
                if ("hero_icon1" == this.name) { }
                else if ("hero_icon1_sg4" == this.name) { }
                else if ("hero_icon2" == this.name) {
                    i ? (t.height = this.height, t.width = Math.floor(t.height * r / a)) : (t.width = this.width, t.height = Math.floor(t.width * a / r));
                    if (ConfigApp.isLandscape) this.parent && !i && e && (l = t.height, t.width = Math.floor(l * r / a)); else if (this.parent && !i) {
                        var l = (<any>this.parent).height;
                        this.height >= l ? (t.height = l, t.width = Math.floor(l * r / a), n && (this.centerY = .5 * (l - this.height))) : (n && (this.centerY = .5 * (this.height - l), this.scaleX = this.scaleY = 1.1), e && (l = t.height)), t.bottom = 0, e && (t.width = Math.floor(l * r / a))
                    }
                    e && "box_hero" == this.parent.name && !i && (t.width = r, t.height = a), t.x = Math.floor(.5 * (this.width - t.width)), n && !i && this.scaleX && (this.centerX = 0)
                }
            } else t.once("loaded", this, function () { h.layoutHeroIcon(t, i, e, n) })
        }
    }

    public setPVEStar(t: any): void {
        for (var i = 1; i <= 3; i++) (<any>this.getChildByName("hStar" + i)).skin = i <= t ? AssetsManager.getAssetsUI("icon_64.png") : AssetsManager.getAssetsUI("icon_64_0.png")
    }

    public setHeroSelection(t: any): void {
        var i = this.getNodeByName(this.getImgPanel(), "sImg");
        i && (i.visible = t)
    }

    public setCountryFlag(t: any): void {
        var i = ConfigServer.world.country_sign, e: any = this.getChildByName("label"), s: any = this.getChildByName("img");
        if (s || e) {
            s.visible = e.visible = !1, this.alpha = 1, this.setCountryColor(t);
            var n = i[t] ? i[t].name : "", h = i[t] ? i[t].icon : null;
            if (h) s.visible = !0, s.skin = AssetsManager.getAssetsUI(h); else if (n) {
                var o = EffectManager.getFontColor(t, ColorManager.getUIColor("COUNTRY_FONT_COLORS")), r = EffectManager.getFontColor(t, ColorManager.getUIColor("COUNTRY_FONT_STROKE_COLORS"));
                if (e.visible = !0, e.text = Tools.getMsgById(n), e.color = o, e.strokeColor = r, ConfigApp.isLandscape && e.fontSize0 >= 60) {
                    var a = r;
                    e.stroke = 4, EffectManager.changeSprGlowFilter(e, a, 6)
                }
            }
        } else this.alpha = .2
    }

    public setCountryColor(t: any): void {
        var i: any = this.getChildByName("flag");
        EffectManager.changeSprColor(i, t, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX"))
    }

    public setSkillItem(t?, i?, e?, s?): void {
        void 0 === s && (s = !0);
        var n, h: any = this.getChildByName("nameLabel"), o: any = this.getChildByName("lvLabel"), r: any = this.getChildByName("typeIcon"), a = 0;
        if (i instanceof sg.model.ModelHero) {
            var l = i;
            a = t.getLv(l)
        } else i >= 0 && (a = i);
        (h && (s ? (Tools.textScale(h), Tools.textFitFontSize2(h, t.getName())) : h.text = t.getName()), o) && (n = a ? a + "" : Tools.getMsgById("_skill27"), null != e ? (n += e, Tools.textFitFontSize(o, n, 0, 10, !1)) : Tools.textFitFontSize(o, n, 0, 10, !1));
        r && (t.data.type >= 0 ? (r.visible = !0, r.skin = t.getSkillTypeIcon()) : r.visible = !1);
        var c = 0, u = 0;
        if (u = 4 == t.type ? -1 : -2, t.getTypeValue() < 0 || null == i) c = -1; else {
            c = 0;
            for (var d = ConfigServer.system_simple.skill_color[t.cost_type], _ = d.length - 1; _ >= 0; _--) if (a >= d[_]) { c = _; break }
        }
        this.setSkillBgColor(c, u)
    }

    public setFilterSkillItem(t?, i?): void {
        void 0 === i && (i = !1);
        var e = t.id;
        if (-1 != e.indexOf("skill")) {
            var s = ModelManager.instance.modelGame.getModelSkill(e);
            this.setSkillItem(s, null)
        } else {
            var n: any = this.getChildByName("nameLabel"), h: any = this.getChildByName("lvLabel"), o: any = this.getChildByName("typeIcon");
            o.visible = !1, h.text = "", n.left = o.x;
            var r = t.name;
            TestUtils.isTestShow && t.num && (r += " " + t.num), Tools.textFitFontSize2(n, r)
        }
        var a: any = this.getChildByName("btnCheck");
        a.visible = !0, a.selected = i, this.setSkillBgColor(2, -1), this.gray = 0 == t.have
    }

    public setSkillBgColor(t: any, i: any): void {
        var e: any = this.getChildByName("bgImg"), s: any = this.getChildByName("bgKuang"), n: any = this.getChildByName("lineImg");
        e && EffectManager.changeSprColor(e, t), s && (s.visible = -1 != i, s.visible && EffectManager.changeSprColor(s, -2 == i ? t : i)), n && n.visible && EffectManager.changeSprColor(n, t)
    }

    public setSkillLineVisible(t: any): void {
        var i: any = this.getChildByName("lineImg");
        if (i && i.visible != t) {
            var e: any = this.getChildByName("nameLabel"), s: any = this.getChildByName("lvLabel");
            s && (s.visible = t), i.visible = t;
            var n = t ? 43 : -43;
            e.originalWidth || (e.originalWidth = e.width), e.originalWidth += n, e.right += n
        }
    }

    public setRankIndex(t?, i?, e?, s?): void {
        void 0 === i && (i = ""), void 0 === e && (e = !1), void 0 === s && (s = !1);
        var n = parseFloat(t), h: any = this.getChildByName("label"), o = n >= 1 && n <= 3;
        (<any>this.getChildByName("img1")).visible = 1 === n, (<any>this.getChildByName("img2")).visible = 2 === n, (<any>this.getChildByName("img3")).visible = 3 === n, (<any>this.getChildByName("img4")).visible = !o;
        var r = "";
        r = n <= 0 ? i || Tools.getMsgById("_public256") || "--" : n < 1 ? Tools.percentFormat(n) : n + "", e && o && (r = ""), s && (r = o ? "" : i), Tools.textFitFontSize(h, r)
    }

    public setScienceUI(t?, i?): void {
        void 0 === i && (i = !1);
        var e = this.img, s = this.bg;
        s.filters = null, e.visible = !1, t && (ConfigApp.isLandscape ? EffectManager.changeSprColor(s, t.type, !1, ColorManager.getUIColor("COLOR_SCIENCE_ITEM")) : s.skin = AssetsManager.getAssetLater((<any>sg.model.ModelScience).type_ui[t.type]), e.visible = !0, e.skin = AssetsManager.getAssetsScience(t.icon), i && EffectManager.changeSprColor(this.imgMask, t.color))
    }

    public setScienceIcon_H(t?, i?): void {
        void 0 === i && (i = !1);
        var e = this.icon, s = this.bg, n = this.stag, h = this.cl;
        if (t) {
            e.skin = AssetsManager.getAssetsScience(t.icon), "" != t.tag && (n.skin = AssetsManager.getAssetsScience(t.tag)), n.visible = "" != t.tag, h.visible = i;
            var o = ModelManager.instance.modelInside.getBuilding003().lv >= t.limit, r = (t.checkLock1(), t.checkLock2()), a = t.checkLock3();
            o && r[0] && !a[0] ? (this.gray = !1, -1 != t.color && EffectManager.changeSprColor(e, t.type, !1, ColorManager.getUIColor("COLOR_SCIENCE_ITEM")), EffectManager.changeSprColor(s, t.type, !1, ColorManager.getUIColor("COLOR_SCIENCE_ITEM"))) : (EffectManager.changeSprColorFilter(e, null), EffectManager.changeSprColorFilter(s, null), this.gray = !0)
        }
    }

    public setBuildingInfoLv(t?, i?, e?): void {
        void 0 === i && (i = !1), void 0 === e && (e = !0), this.imgName.visible = this.tbName.visible = e, e && Tools.textFitFontSize2(this.tbName, t.getName()), this.tbLv.text = "" + (i ? t.lv - 1 : t.lv);
        var s = i ? t.lv : t.lvNext(), n = t.checkIsMaxLv(s), h = t.checkIsMaxLv(s + 1);
        this.tbLvNext.text = (n ? this.tbLv.text : s) + (h ? "(" + Tools.getMsgById("_public9") + ")" : ""), this.bIcon.destroyChildren(), this.bIcon.addChild(t.getAnimation("", n ? t.lv : s)), this.tbLvNext.originalX || (this.tbLvNext.originalX = this.tbLvNext.x), this.tbLvNext.x = n ? this.tbLv.x : this.tbLvNext.originalX, this.tbLv.visible = 0 == n, this.imgArrows && (this.imgArrows.visible = 0 == n)
    }

    public setBuildingInfoInfo(t?, i?, e?, s?, n?): void {
        void 0 === i && (i = !1), void 0 === e && (e = !1), void 0 === s && (s = -1), void 0 === n && (n = !1), this.text0.text = Tools.getMsgById("_hero29"), Tools.textFitFontSize(this.text0), this.tInfo.off("link", this, (<any>sg.boundFor.GotoManager).gotoPanelById), this.tInfo.on("link", this, (<any>sg.boundFor.GotoManager).gotoPanelById), this.tInfo.mouseEnabled = !0;
        var h = t.produce > -1;
        this.armyBox.visible = !1, this.aBox.visible = !1, this.tInfo.visible = !h, this.tInfo.x = 6, this.tInfo.y = 6, ConfigApp.isLandscape && (this.tInfo.width = this.tInfo.parent.width - 2 * this.tInfo.x, this.tInfo.height = this.tInfo.parent.height - 2 * this.tInfo.y), this.tInfo.style.fontSize = 18, this.tInfo.style.color = "#c3ebff", this.tInfo.style.wordWrap = !0, this.tInfo.style.leading = 5, this.pBox.visible = h;
        var o = i ? t.lv - 1 : t.lv, r = i ? t.lv : t.lvNext();
        s >= 0 && (o = s, r = s + 1);
        var a = t.checkIsMaxLv(r);
        if (r = a ? o : r, h) {
            var l = t.getMyGiftEvery(o), c = t.getMyGiftEvery(r);
            this.pImg.skin = AssetsManager.getAssetPayIconBig(ModelBuiding.material_type[t.produce + 1]), this.pNum.text = Math.round(l[2]) + "/" + Tools.getMsgById("_public124"), this.pNumNext.text = Math.round(c[2]) + "/" + Tools.getMsgById("_public124"), this.pName.text = Tools.getNameByID(ModelBuiding.material_type[t.produce + 1]), this.pNumNext.y = a ? this.pNum.y : 154, this.pNum.visible = 0 == a, this.imgArrows && (this.imgArrows.visible = 0 == a)
        } else if (t.isArmy()) {
            var u = t.getArmyType(), d = "", _ = "", m = ModelBuiding.getArmyBuildingNewLvIndex(t.id, o, !0), g = ModelBuiding.getArmyBuildingNewLvIndex(t.id, o, !1);
            if (g >= 0 && (d = "", _ = Tools.getMsgById("_building47", [g + 1, ModelBuiding.getArmyBuildingLvCfg(t.id, g + 1)[3], (<any>sg.model.ModelHero).army_type_name[u]])), e) {
                this.iBg.visible = !1, this.aBox.visible = !0, this.tInfo.visible = !1;
                var f = "army" + u + ModelBuiding.getArmyNextGradeByType(u);
                if (this.aIcon.destroyChildren(), "ww" == HelpConfig.type_app) this.aImg && (this.aImg.skin = AssetsManager.getAssetsArmy(f)), this.aImg && (this.aImg.visible = !0); else {
                    this.aImg && (this.aImg.visible = !1);
                    var p = EffectManager.loadArmysIcon(f);
                    p.scaleX = 1.4, p.scaleY = 1.4, this.aIcon.addChild(p)
                }
                return this.aIcon.x = .5 * this.width, this.aIcon.y = 40 + .5 * (this.height - 40), this.aTips1.text = Tools.getMsgById("_building48"), void (this.aTips2.text = _)
            }
            var v, y = ModelBuiding.getArmyBuildingLvCfg(t.id, o), b = ModelBuiding.getArmyBuildingLvCfg(t.id, r), I = "", x = "", w = "";
            if (n) {
                ModelBuiding.getArmyMakeCfgByGrade(y[3], t.getArmyType()), v = sg.model.ModelPrepare.getArmyRankData(t.getArmyType(), y[3]), w = Tools.getMsgById("_building49", [v.atkBase, v.defBase, v.spdBase]), this.armyBox.visible = !0, this.iBg.visible = !1, this.tInfo.visible = !1, this.t0.text = Tools.getMsgById("_public125"), this.t1.text = Tools.getMsgById("_public126"), this.t2.text = Tools.getMsgById("_public127"), this.ta0.text = v.atkBase, this.ta1.text = v.defBase, this.ta2.text = v.spdBase, this.t0.width = this.t0.textField.textWidth, this.t1.width = this.t1.textField.textWidth, this.t2.width = this.t2.textField.textWidth;
                var C = 0;
                return this.t0.width > C && (C = this.t0.width), this.t1.width > C && (C = this.t1.width), this.t2.width > C && (C = this.t2.width), this.ta0.x = this.t0.x + C + 8, this.ta1.x = this.t0.x + C + 8, this.ta2.x = this.t0.x + C + 8, this.armyLv.text = Tools.getMsgById("100001", [ModelBuiding.getArmyBuildingLvCfg(t.id, m)[3]]), this.armyType.text = (<any>sg.model.ModelHero).army_type_name[u], void Tools.textFitFontSize(this.armyType)
            }
            var k = (<any>sg.model.ModelHero).army_type_name[u], T = t.getArmyNumMax(o), M = a ? "" : StringUtil.htmlFontColor("+" + (t.getArmyNumMax(r) - T), "#6dfe7e"), S = Tools.getMsgById("_building50", [k, T + M]), B = t.getArmyCanMakeNumMax(o), A = a ? "" : StringUtil.htmlFontColor("+" + (t.getArmyCanMakeNumMax(r) - B), "#6dfe7e");
            if (x = S + Tools.getMsgById("_building51", [k, B + A]), b) if (ConfigApp.isLandscape || b[0] < y[0] && (I = Tools.getMsgById("_building52")), o <= 0) x = "", d = Tools.getMsgById("_building53", [k]); else if (b[3] != y[3]) {
                ModelBuiding.getArmyMakeCfgByGrade(b[3], t.getArmyType());
                var L = sg.model.ModelPrepare.getArmyRankData(t.getArmyType(), b[3]);
                ModelBuiding.getArmyMakeCfgByGrade(y[3], t.getArmyType()), v = sg.model.ModelPrepare.getArmyRankData(t.getArmyType(), y[3]);
                var N = a ? "" : StringUtil.htmlFontColor("+1", "#6dfe7e"), U = a ? "" : StringUtil.htmlFontColor("+" + (L.atkBase - v.atkBase), "#6dfe7e"), E = a ? "" : StringUtil.htmlFontColor("+" + (L.defBase - v.defBase), "#6dfe7e"), P = a ? "" : StringUtil.htmlFontColor("+" + (L.spdBase - v.spdBase), "#6dfe7e");
                d = Tools.getMsgById("_building54", [k, ModelBuiding.getArmyBuildingLvCfg(t.id, m)[3] + N, v.atkBase + U, v.defBase + E, v.spdBase + P])
            }
            Tools.textFitFontSize2(this.tInfo, x + d + "" + I + w)
        } else Tools.textFitFontSize2(this.tInfo, t.getIntroduceStr())
    }

    public setOfficialIcon(t?, i?, e?): void {
        void 0 === i && (i = -1), void 0 === e && (e = "");
        var s: any = this.getChildByName("img"), n: any = this.getChildByName("label");
        if (-100 == t) s.visible = !1, n.text = ""; else {
            if (ConfigApp.isLandscape) {
                var h = ModelOfficial.getOfficalBGUrl(t);
                s.skin = h
            } else s.skin = AssetsManager.getAssetsUI("img_icon_42.png"), EffectManager.changeSprColor(s, ModelOfficial.getOfficerColorLevel(t, i));
            s.visible = !0, n.text = ModelOfficial.getOfficerName(t, i, e), Tools.textFitFontSize(n), Tools.textFitFontSize2(n)
        }
    }

    public setCityBuffs(t: any, i: any): void {
        this.func1.visible = 1 == t, this.func2.visible = 2 == t, this.func.visible = 3 == t, this.tFunc.text = i, Tools.textFitFontSize(this.tFunc)
    }

    public changeRewardBox(t: any): void {
        var i: any = (<any>this.getChildByName("box")).getChildByName("boxImg");
        i && (i.skin = t)
    }

    public setRewardBox(t: any): void {
        this.boxType = t;
        var i: any = this.getChildByName("box"), e: any = this.getChildByName("bgImg"), s = i.getChildByName("boxImg"), n: any = this.getChildByName("getImg");
        if (e && (e.anchorX ? (e.alpha = 2 != t ? 1 : .3, 1 == t ? EffectManager.startFrameRotate(e, .2) : EffectManager.endFrameRotate(e)) : e.visible = 1 == t), s) {
            var h = s.getChildByName("canImg");
            h ? (h.visible = 1 == t && 0 == (<any>ConfigApp).isLandscape, 2 == t ? (EffectManager.changeSprBrightness(s, .8), s.alpha = .7) : (EffectManager.changeSprColorFilter(s, null), s.alpha = 1)) : s.gray = 1 != t, s.scale(1, 1), Tween.clearAll(s), 1 == t && EffectManager.tweenLoop(s, { scaleX: 1.15, scaleY: 1.15 }, 300, Ease.sineInOut, null, 50, -1, 600)
        }
        n && (n.visible = 2 == t), i.rotation = 0, Tween.clearAll(i), 1 == t && EffectManager.tweenShake(i, { rotation: 5 }, 100, Ease.sineInOut, null, 650, -1, 900)
    }

    public setRewardBox2(t?, i?): void {
        void 0 === i && (i = !1);
        var e: any = this.getChildByName("box");
        e.scale(1, 1), Tween.clearAll(e);
        var s = e.getChildByName("boxImg"), n = e.getChildByName("canImg");
        s && (s.visible = 1 == t), n && (n.visible = 0 == t);
        var h: any = this.getChildByName("bgImg");
        h && (h.visible = !1), 0 == t && i && (EffectManager.tweenLoop(e, { scaleX: 1.15, scaleY: 1.15 }, 300, Ease.sineInOut, null, 50, -1, 600), EffectManager.tweenShake(e, { rotation: 5 }, 100, Ease.sineInOut, null, 650, -1, 900), h && (h.visible = !0, EffectManager.startFrameRotate(h, .3)))
    }

    public setRewardBox3(t: any): void {
        this.boxType = t;
        var i: any = this.getChildByName("box"), e: any = this.getChildByName("bgImg"), s = i.getChildByName("boxImg"), n: any = this.getChildByName("getImg");
        e && (e.anchorX ? (e.alpha = 2 != t ? 1 : .3, 1 == t ? EffectManager.startFrameRotate(e, .2) : EffectManager.endFrameRotate(e)) : e.visible = 1 == t), s && (s.skin = AssetsManager.getAssetLater(2 != t ? "honour_baoxiang1.png" : "honour_baoxiang2.png"), s.scale(1, 1), Tween.clearAll(s), 1 == t && EffectManager.tweenLoop(s, { scaleX: 1.15, scaleY: 1.15 }, 300, Ease.sineInOut, null, 50, -1, 600)), n && (n.visible = 2 == t), i.rotation = 0, Tween.clearAll(i), 1 == t && EffectManager.tweenShake(i, { rotation: 5 }, 100, Ease.sineInOut, null, 650, -1, 900)
    }

    public setDoubleTxt(t?, i?, e?): void {
        void 0 === e && (e = "coin");
        var s: any = this.getChildByName("box"), n = s.getChildByName("img"), h = s.getChildByName("label0"), o = s.getChildByName("label1"), r = s.getChildByName("imgLine");
        o.text = i + "";
        var a = n.width;
        "" == e ? (n.visible = !1, a = 0) : (n.skin = AssetsManager.getAssetItemOrPayByID(e), n.visible = !0), 0 == t || t == i ? (h.text = "", r.visible = !1, o.x = a + 1, s.width = a + o.width) : (h.text = t + "", r.visible = !0, h.x = a + 1, o.x = h.width + h.x + 5, s.width = a + h.width + o.width + 6, r.width = h.width, r.x = h.x), s.centerX = 0
    }

    public setIconTxt(t: any, i: any, e: any): void {
        var s: any = this.getChildByName("tTxt"), n: any = this.getChildByName("tNum"), h: any = this.getChildByName("img");
        if (h.skin = "" == i ? "" : AssetsManager.getAssetItemOrPayByID(i), s.text = t + "", n.text = e + "", h.centerY = s.centerY = n.centerY = 0, s.width = s.textField.textWidth, n.width = n.textField.textWidth, "" == i) s.x = (this.width - s.width) / 2; else {
            var o = s.width + h.width + n.width + 8;
            s.x = (this.width - o) / 2, h.x = s.x + s.width + 4, n.x = h.x + h.width + 4
        }
    }

    public setViewTitle(t?, i?): void {
        void 0 === i && (i = !1);
        var e: any = this.getChildByName("img"), s: any = this.getChildByName("label");
        s.text = t, s.width = s.textField.textWidth, ConfigApp.isLandscape ? e.width = Math.max(200, s.width + 96) : e.width = Math.max(200, s.width + 75), "" != t && (e.visible = s.visible = !0)
    }

    public setTextWithPic(t?, i?): void {
        void 0 === i && (i = 24);
        var e: any = this.getChildByName("html");
        e.style.color = "#FFFFFF", e.style.fontSize = i, e.style.wordWrap = !1;
        var s = /@(\w+)@/;
        if (s.test(t)) {
            var n = t.match(s)[1];
            e.offAll("click"), e.on("click", this, function (t: any) { t.target._url && ViewManager.instance.showItemTips(n) });
            var h = URL.formatURL(ModelItem.getIconUrl(n));
            t = t.replace(s, "<img src='" + h + "' style='width:28px;height:28px'/>"), e.innerHTML = t
        } else e.innerHTML = t;
        this.width = e.contextWidth
    }

    public setViewTitleSub(t: any, i: any): void {
        var e: any = this.getChildByName("img"), s: any = this.getChildByName("label"), n: any = this.getChildByName("sub");
        s.text = t, n.text = i, e.width = s.width + n.width + 150, this.width = e.width
    }

    public setAwakenIcon(t: any): void {
        var i: any = this.getChildByName("imgAwaken"), e: any = this.getChildByName("img_awaken"), n: any = this.getChildByName("img_awaken2"), h: any = this.getChildByName("img_awaken2_bg");
        if ("sg" == HelpConfig.type_app) {
            var o = ConfigServer.hero[t] ? ConfigServer.hero[t].rarity : 0;
            if (i.skin = AssetsManager.getAssetsUI(4 === o ? "icon_paopao1_1.png" : "icon_paopao1.png"), !e || !n) return;
            var r = ModelManager.instance.modelGame.getModelHero(t);
            if (0 == r.getAwakenTimes() || !(<any>sg.jigsaw.model.ModelJigsaw.instance).haveBuilding() || !r.awaken2Open()) return e.visible = !1, void (n.visible = !1);
            switch (e.visible = !0, e.skin = 1 == r.getAwaken() ? "later/awaken_2_1.png" : "later/awaken_2_5.png", Laya.timer.clear(this, this.tweenAwaken), h && (h.visible = !1), n.visible = !0, this.getAwaken2Status(r)) {
                case -1:
                    n.visible = !1;
                    break;
                case 0:
                    n.skin = "later/awaken_2_3.png";
                    break;
                case 1:
                    h && (h.visible = !0), n.skin = "later/awaken_2_4.png";
                    this.tweenAwaken(n, 1e3), Laya.timer.loop(2e3, this, this.tweenAwaken, [n, 1e3]);
                    break;
                case 2:
                    n.skin = "later/awaken_2_6.png";
                    break;
                case 3:
                    n.skin = "later/awaken_2_2.png"
            }
        }
    }

    public setTalentIcon(t: any): void {
        var i: any = this.getChildByName("tTalent"), e: any = this.getChildByName("imgTalent"), s: any = this.getChildByName("bgTalent"), n: any = this.getChildByName("txtImg"), h = (<any>sg.model.ModelTalent).getModel(t);
        if (h) {
            this.visible = !0, i.text = h.getName(), Tools.textFitFontSize2(i);
            var o = ConfigServer.hero[t] ? ConfigServer.hero[t].rarity : 0;
            e.skin = AssetsManager.getAssetsUI(4 == o ? "icon_paopao1_1.png" : "icon_paopao1.png");
            var r = ConfigServer.system_simple.test_image.hero_rarity;
            i.visible = 0 == r, e.visible = 0 == r, s.visible = 0 == r, n.visible = 1 == r, 1 == r && (n.skin = AssetsManager.getAssetLater("herorarity_" + ConfigServer.hero[t].rarity + ".png"))
        } else this.visible = !1
    }

    public tweenAwaken(t: any, i: any): void {
        Tween.to(t, { alpha: .5 }, i, Ease.linearNone), Tween.to(t, { alpha: 1 }, i, Ease.linearNone, null, i)
    }

    public getAwaken2Status(t: any): any {
        var i = t.getAwakenTimes();
        if (i >= 2) return 2 == t.getAwaken() ? 3 : 2;
        if (1 == i) {
            if (t.awaken2Open()) {
                var e = t.getAwaken2Cfg(), s = e.pattern;
                if (!this.canActiveAwaken2(s)) return 0;
                var n = e.item, h = n[0], o = n[1];
                return ModelItem.getMyItemNum(h) >= o ? 1 : 0
            }
            return -1
        }
        return -1
    }

    public canActiveAwaken2(t: any): any {
        for (var i = 0; i < t.length; i++) {
            var e = t[i], s = e[0], n = e[1];
            if (sg.jigsaw.model.ModelAdmireMap.instance.getMapRank(s) < n) return !1
        }
        return !0
    }

    public setSamllTitle(t?, i?): void {
        void 0 === i && (i = !1);
        var e: any = this.getChildByName("img"), s: any = this.getChildByName("bg"), n: any = this.getChildByName("label");
        n.text = t, s && (s.visible = i, s.centerX = 0), n.width = n.displayWidth, e.width = n.width + 240, e.centerX = n.centerX = 0
    }

    public setBtton(): void {
    }

    public setGotoBtn(t: any): void {
        this.getChildByName("img"), this.getChildByName("bg");
        var i: any = this.getChildByName("text");
        i.width = this.width - 43, i.text = t, Tools.textFitFontSize2(i)
    }

    public setHonourLv(t: any): void {
        var i: any = this.getChildByName("label"), e: any = this.getChildByName("img");
        i.text = t <= 0 ? "" : t + "", e.skin = (<any>sg.model.ModelHonour).honourIconUrl(t)
    }

    public setDevilLv(t: any): void {
        var i: any = this.getChildByName("label"), e: any = this.getChildByName("img");
        i.text = t <= 0 ? "" : t + "";
        var s = ColorManager.getUIColor("devilLv");
        i.color = s, i.strokeColor = EffectManager.mixColor(s, "0x880000", .5), i.stroke = 4;
        var n = ConfigServer.effect.imgDevilLv;
        n && (e.skin = AssetsManager.getAssetLater(n.res + ".png"), n.hasOwnProperty("x") && (i.centerX = n.x), n.hasOwnProperty("y") && (i.centerY = n.y), n.hasOwnProperty("fontSize") && (i.fontSize = n.fontSize))
    }

    public setHeroPower(t?, i?): void {
        var e;
        void 0 === i && (i = 0), e = 0 == i ? AssetsManager.getAssetsUI("icon_zhanli.png") : 1 == i ? AssetsManager.getAssetLater("btn_kuafu_jinzhi.png") : AssetsManager.getAssetLater("btn_kuafu_bujinzhi.png"), this.mImg || (this.mImg = this.getChildByName("img")), this.mLabel || (this.mLabel = this.getChildByName("label")), this.mImg.skin = e, this.mLabel.text = t + ""
    }

    public setItemSoul(): void {
    }

    public setSoulProp(t: any): void {
        var i: any = this.getChildByName("panel"), e = i.getChildByName("img1"), s = i.getChildByName("img2"), n = i.getChildByName("box");
        n.destroyChildren(), n.width = this.width - n.x, i.vScrollBar.visible = !1;
        for (var h = "", o = t.fontSize ? t.fontSize : 18, r = e.y, a = t.prop1 ? t.prop1 : [""], l = 0; l < a.length; l++) {
            h = a[l];
            var c = new sg.view.soul.ItemSoulProp(h, n.width, o);
            n.addChild(c), c.y = r, r += c.height
        }
        s.y = r + 2, r = s.y;
        for (var u = t.prop2 ? t.prop2 : [""], d = 0; d < u.length; d++) {
            h = u[d];
            var _ = new sg.view.soul.ItemSoulProp(h, n.width, o);
            n.addChild(_), _.y = r, r += _.height
        }
        n.height = r, i.vScrollBar.value = 0
    }

    public setReward(t: any, i: any): void {
        var e: any = this.getChildByName("icon"), s: any = this.getChildByName("label"), n: any = this.getChildByName("num");
        e.setData(t, -1, -1, !1), e.setOnlyIcon(), s.text = ModelItem.getItemName(t), Tools.textFitFontSize2(s), this.offAll("click"), this.on("click", this, ViewManager.instance.showItemTips, [t, -1, !1]), n && (n.text = i + "")
    }

    public setSchemeLv(t: any): void {
        if (this.visible = 0 != t, this.visible) {
            this.getChildByName("img");
            (<any>this.getChildByName("label")).text = t + ""
        }
    }

    public setSchemeType(t: any): void {
        (<any>this.getChildByName("img")).skin = (<any>sg.model.ModelScheme).getTypeIconUrlByType(t)
    }

    public setItemScheme(t?, i?, e?): void {
        void 0 === i && (i = -1), void 0 === e && (e = !0);
        var s: any = this.getChildByName("img"), n: any = this.getChildByName("hero"), h = (<any>sg.model.ModelScheme).getModelScheme(t, i);
        s.skin = h.getItemIconUrl(), this.getChildByName("comLv") && (<any>this.getChildByName("comLv")).setSchemeLv(h.lv), n && (n.text = e && h.heroModel ? h.heroModel.getName() : ""), this.getChildByName("comType") && (<any>this.getChildByName("comType")).setSchemeType(h.type), this.imgSelect && (this.imgSelect.visible = !1)
    }

    public setHeadIcon(t: any): void {
        var i: any = (<any>this.getChildByName("comHead")).getChildByName("imgPanel").getChildByName("img"), e = AssetsManager.getAssetsHero(sg.model.ModelHero.getHeroIcon(t), !0);
        i.skin = e
    }

    public setFavorExp(t?, i?, e?, s?): void {
        void 0 === e && (e = -1), void 0 === s && (s = -1);
        var n: any = this.getChildByName("panel_bg"), h: any = this.getChildByName("panel_fg"), o = Math.max(36 * Math.floor(i / 2), 1), r = Math.max(36 * Math.floor(t / 2) + (t % 2 == 1 ? 20 : 0), 1), a = Math.max(36 * Math.floor(s / 2), 1), l = Math.max(36 * Math.floor(e / 2) + (e % 2 == 1 ? 20 : 0), 1), c = (180 - o - 4) / 2, u = (180 - a - 4) / 2;
        -1 == s ? (n.x = h.x = c, -1 == e || e == t ? (n.width = o, h.width = r) : (n.width = o, h.width = l, Tween.to(h, { width: r }, 1e3, null, null))) : (n.x = h.x = u, n.width = a, h.width = l, Tween.to(h, { width: a }, 1e3, null, Handler.create(this, function () { Tween.to(n, { width: o, x: c }, 1e3, null, null), h.width = 1, Tween.to(h, { width: r, x: c }, 1e3, null, null) })))
    }

    public setRecipeStar(t?, i?): void {
        void 0 === i && (i = 5), t >= sg.view.wineshop.model.ModelRecipe.dishMaxLv && (t = sg.view.wineshop.model.ModelRecipe.dishMaxLv);
        for (var e, s = sg.view.wineshop.model.ModelRecipe.instance.recipeStage(t), n = s <= 1 ? s + 2 : s + 3, h = t <= 0 ? 0 : t % 5 > 0 ? t % 5 : 5, o = 1; o <= 5; o++) (e = <any>this.getChildByName("img" + o)).skin = o <= h ? AssetsManager.getAssetsUI("icon_66.png") : AssetsManager.getAssetsUI("icon_67.png"), EffectManager.changeSprColor(e, n)
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.com.ComPayType",t)（t=Ju=sg.view.BaseSprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 * 落地后 16 个 extends 债文件（batch-ad-report §5：15 个 ui.com.* + X 批 taskBaseDupUI）
 * 由主会话重指向本类并复验。
 */
Laya.class(ComPayType, "sg.view.com.ComPayType", null, null);
