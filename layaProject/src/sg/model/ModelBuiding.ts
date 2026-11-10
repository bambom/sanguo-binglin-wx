/**
 * sg.model.ModelBuiding —— 建筑模型（升级/产出/兵营/检查气泡/前置条件/材料支付），
 * 注册名拼写 Buiding 缺 'l' 原文如此（批次 D §5.2 勘误后一致）。
 * ModelInside.setArmyCdObj 构造期静态读 sg.model.ModelBuiding.army_type_building。
 *
 * 原文：code1.js 字节 [1895593,1920866)（off 1895867，池化注册名 e(2217)，包装变量 zo，
 * IIFE 实参基类 i=Ns=sg.model.ModelBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-f/ModelBuiding.js
 *
 * 入批依据：ModelInside ctor → setArmyCdObj(2) else 分支遍历
 * `sg.model.ModelBuiding.army_type_building`（ModelManager.init 第 4 个 new，
 * 100% 立即触发；未译类静态读 = 运行时 TypeError，批次 F「构造期触达才扩」）。
 * 依赖（批次 A/B/D/F 直引）：ue=ModelManager、vs=Tools、Gt=ConfigServer、ae=ColorManager、
 * le=EffectManager、Rt=ConfigApp、tn=ViewManager、pn=NetSocket、P=laya.utils.Handler、
 * ut=laya.display.Sprite、Ze=ArrayUtil、lr=ModelGame、Tr=ModelOffice、Ms=ModelAchievement、
 * yr=ModelItem（本批）。
 * 批次外全局注册路径：qs=sg.homeland.model.ModelHomeLand、Xs=sg.homeland.model.
 * ModelHomelandBuild、si=sg.fight.client.utils.FightLoad、Mr=sg.model.ModelOfficeRight、
 * Rr=sg.model.ModelScience、fr=sg.model.ModelPowerLevel、to=sg.altar.legend.model.ModelLegend、
 * io=sg.altar.legendAwaken.model.ModelLegendAwaken、Ho=sg.model.ModelArmyUpgrade、
 * nr=sg.model.ModelEquip、Oa=sg.view.ScienceH.ModelScienceH、ke=sg.model.ModelDoomTower、
 * $s=sg.kunlun.model.ModelWilderness、To=sg.jigsaw.model.ModelJigsaw、
 * or=sg.model.ModelMeritExchange、Io=sg.heritage.ModelHeritage、ca=sg.seaRoute.ModelSeaRoute、
 * wr=sg.model.ModelSchemeEgg、Ni=sg.fight.logic.utils.FightUtils、Se=sg.model.ModelScheme、
 * jo=sg.model.ModelCabinet、iQ/hQ/nQ/sQ=sg.view.effect.BuildingUpgrade/3/2/1、
 * jC/KC/$C/JC=ui.com.building_tips0/1/2/3UI、_r=sg.model.ModelHero。
 * 静态自引 `sg.model.ModelBuiding.*` 全局路径原文如此（army_type 写回、
 * getArmyCurrGradeByType、isBaggageBubble(1)、getArmyMakeCfgByGrade、checkSinglePre、
 * getPreInfo、material_type、buildingModels）。
 *
 * 保真注记：checkMyStatus 大 switch 的气泡装配链（含 `ue.instance.modelUser.
 * champion_user;` isPVP 分支空读丢弃求值）；introduceEvery 的 60165_1 case 内 return、
 * 60180 case 改写 t 后 fall-through 汇合公式；getLvCfg 的 Precondition mergeNum 就地
 * delete 缓存槽；getArmyMakeMaxNum 的 `h>=0&&h<o&&(o=n)`（原文赋 n 非 h，疑似原文
 * 笔误照抄）；upOneLv 三元链 4 选 1 特效；r(0,a,"lv",getter,setter) 双向访问器。
 */
import Handler = laya.utils.Handler;
import Sprite = laya.display.Sprite;
import { ModelBase } from "./ModelBase";
import { ModelManager } from "../manager/ModelManager";
import { Tools } from "../utils/Tools";
import { ConfigServer } from "../cfg/ConfigServer";
import { ColorManager } from "../manager/ColorManager";
import { EffectManager } from "../manager/EffectManager";
import { ConfigApp } from "../cfg/ConfigApp";
import { ViewManager } from "../manager/ViewManager";
import { NetSocket } from "../net/NetSocket";
import { AssetsManager } from "../manager/AssetsManager";
import { StringUtil } from "../utils/StringUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { ModelGame } from "./ModelGame";
import { ModelAchievement } from "../achievement/model/ModelAchievement";
import { ModelItem } from "./ModelItem";

export class ModelBuiding extends ModelBase {

    public produce: any = -1;
    public index: any = 0;
    public id: any = null;
    public info: any = null;
    public name: any = null;
    public cfg: any = null;
    public introduce: any = null;
    public payIsAllEnough: any = 0;
    public produceTipsTimer: any = -1;
    public freeCDtipsTimer: any = -1;
    public armyMakeOKreadyGet: boolean = !1;
    /** 原文位于 __super.call(this) 之后（字段初始化器同样在 super() 后即刻执行，等价） */
    public mClassType: any = 1;

    constructor() {
        super();  // 原文 s.__super.call(this)
    }

    public initData(t: any, i: any): void {
        this.cfg = i,
            this.id = t,
            this.name = this.cfg.name,
            this.info = this.cfg.info,
            this.cfg.hasOwnProperty("produce") ? this.produce = this.cfg.produce : this.produce = -1,
            this.cfg.introduce ? this.introduce = this.cfg.introduce : this.introduce = null;
    }

    public getLockAnimationId(): any {
        return this.cfg.build_lock || "building_lock";
    }

    public getAnimationId(): any {
        if (sg.homeland.model.ModelHomeLand.instance.use_homeland) return sg.homeland.model.ModelHomelandBuild.getAnimationId(this.id);
        for (var i = this.lv ? this.cfg.res || this.id : this.getLockAnimationId(), s = this.lv; s > 0; s--) {
            var n = this.cfg.levelup[s];
            if (n && n.res) return n.res;
        }
        return i;
    }

    public getAnimationScale(): any {
        for (var i = this.cfg.ui_scale || 1, s = this.lv; s > 0; s--) {
            var n = this.cfg.levelup[s];
            if (n && n.ui_scale) return n.ui_scale;
        }
        return i;
    }

    public getAnimation(t?: any, i?: any, s?: any): Sprite {
        void 0 === t && (t = ""),
            void 0 === i && (i = 0),
            void 0 === s && (s = !1);
        var h = new Sprite(),
            o = EffectManager.loadAnimation(this.getAnimationId());
        h.addChild(o);
        var r = ConfigApp.isLandscape ? "_d" : "",
            a = "stand" + r;
        if ("" === t) {
            var l = 0;
            ConfigApp.isLandscape ? l = this.getAnimationScale() : (l = this.cfg.front_scale || 1, l = .9 / Math.pow(l, .6)), h.scale(l, l);
        } else !s && 3 === this.getArmyBuildingStatus() && (a = "attack" + r);
        if (this.isArmy() && (this.lv || i)) {
            var c = this.getArmyType(), u = sg.model.ModelBuiding.getArmyCurrGradeByType(c, i), d = "army" + c + "" + u;
            d = sg.fight.client.utils.FightLoad.getPersonResId(d);
            var _ = sg.homeland.model.ModelHomeLand.instance.use_homeland ? this.cfg.homeland_armyPos : this.cfg.armyPos;
            _ && _.forEach(function (t) {
                var e = EffectManager.loadAnimation(d, a);
                e.interval = 150, e.pos(t[0], t[1]), h.addChild(e);
            });
        }
        return h;
    }

    public isScience(): boolean {
        return this.id == "building003";
    }

    public isArmy(): boolean {
        return this.id == "building009" || this.id == "building010" || this.id == "building011" || this.id == "building012";
    }

    public isEquip(): boolean {
        return this.id == "building002";
    }

    public isPubHero(): boolean {
        return this.id == "building005";
    }

    public isStarRuneHero(): boolean {
        return this.id == "building006";
    }

    /** 原文拼写 isBagagage（双 g） */
    public isBagagage(): boolean {
        return this.id == "building004" || this.id == "building030";
    }

    public isPVE(): boolean {
        return this.id == "building007";
    }

    public isPVP(): boolean {
        return this.id == "building008";
    }

    public isAltar(): boolean {
        return this.id == "building025";
    }

    public isAwaken(): boolean {
        return this.id == "building026";
    }

    public isScheme(): boolean {
        return this.id == "building027";
    }

    public isRevivedTower(): boolean {
        return this.id == "building028";
    }

    public isKunlun(): boolean {
        return this.id == "building029";
    }

    public isJigsaw(): boolean {
        return this.id == "building031";
    }

    public isHeritage(): boolean {
        return this.id == "building032";
    }

    public isSeaRoute(): boolean {
        return this.id == "building033";
    }

    public isBase(): boolean {
        return this.id == "building001";
    }

    public getArmyType(): any {
        if (!ModelBuiding.army_type.hasOwnProperty(this.id)) {
            var i = ConfigServer.army.army_building;
            if (i) for (var n in i) i[n] == this.id && (sg.model.ModelBuiding.army_type[this.id] = Number(n));
        }
        return ModelBuiding.army_type[this.id];
    }

    public getArmyTypeName(): any {
        return sg.model.ModelHero.army_type_name[this.getArmyType()];
    }

    public getArmyMakePay(t: any, i?: any): number[] {
        void 0 === i && (i = !1);
        var h = ModelBuiding.getArmyMakeCfgByGrade(this.getArmyCurrGrade(), this.getArmyType()),
            o = t / 10 * (1 - sg.model.ModelOfficeRight.func_traincost() - sg.model.ModelScience.func_sum_type("army_consume") - sg.model.ModelPowerLevel.instance.func_sum_type("army_consume")) * (i ? ConfigServer.system_simple.fast_num[this.lv - 1] : 1);
        return [Math.floor(h[5] * o), Math.floor(h[6] * o), Math.floor(h[7] * o)];
    }

    public getArmyMakePayCoin(t: any): any {
        var s = this.getArmyMakePay(t, !0),
            n = ConfigServer.system_simple.fast_train_cost,
            h = s[0] / n[0],
            o = s[1] / n[1],
            r = s[2] / n[2],
            a = ModelManager.instance.modelUser.records.troop_add,
            l = a.food,
            c = a.season_num;
        ModelManager.instance.modelUser.getGameDate() - 1 != c && (l = 0);
        for (var u = ConfigServer.system_simple.fast_level, d = 1, _ = u.length; _;) if (l >= u[--_][0]) {
            d = u[_][1];
            break;
        }
        return (h + o + r) * d;
    }

    public getArmyMakeMaxNum(): any {
        var i = this.getArmyMakePay(10),
            s = i[0] ? Math.floor(ModelManager.instance.modelUser.food / i[0]) : -1,
            n = i[1] ? Math.floor(ModelManager.instance.modelUser.wood / i[1]) : -1,
            h = i[2] ? Math.floor(ModelManager.instance.modelUser.iron / i[2]) : -1,
            o = s;
        return n >= 0 && n < s && (o = n),
            h >= 0 && h < o && (o = n),
            10 * o;
    }

    public getArmyMakePayCheck(t: any): any[] {
        var s = this.getArmyMakePay(t),
            n = s[0],
            h = s[1],
            o = s[2],
            r = 0;
        return ModelManager.instance.modelUser.food < n && (n *= r = -1),
            ModelManager.instance.modelUser.wood < h && (h *= r = -1),
            ModelManager.instance.modelUser.iron < o && (o *= r = -1),
            [["food", n], ["wood", h], ["iron", o], r];
    }

    public getArmyCanMakeNumMax(t?: any): any {
        void 0 === t && (t = -1);
        var n = ModelBuiding.getArmyBuildingLvCfg(this.id, t > -1 ? t : this.lv)[1],
            h = this.getArmyMakeMaxNum(),
            o = Math.min(n, h) * (1 + sg.model.ModelScience.func_sum_type("army_add", this.id) + sg.model.ModelPowerLevel.instance.func_sum_type("army_add", this.id));
        return o -= o % 10,
            Math.floor(.001 * Math.ceil(1e3 * o));
    }

    public getArmyCurrGrade(): any {
        return ModelBuiding.getArmyBuildingLvCfg(this.id, this.lv)[3];
    }

    public getArmyScience(): any[] {
        var i = [];
        return this.isArmy() && ModelManager.instance.modelUser.home[this.id] && (i = ModelManager.instance.modelUser.home[this.id].science),
            i;
    }

    public getArmyNumMax(t?: any): any {
        void 0 === t && (t = -1);
        var n = 1 + sg.model.ModelOfficeRight.func_addarmylimit(this.id) + sg.model.ModelScience.func_sum_type("army_stock", this.id) + sg.model.ModelPowerLevel.instance.func_sum_type("army_stock", this.id);
        return Math.floor(ModelBuiding.getArmyBuildingLvCfg(this.id, t > -1 ? t : this.lv)[2] * n);
    }

    public getArmyNum(): any {
        var i = -1;
        return this.isArmy() && ModelManager.instance.modelUser.home[this.id] && (i = ModelManager.instance.modelUser.home[this.id].army_num),
            i;
    }

    public getArmyMakingNum(): any {
        var i = -1;
        return this.isArmy() && (i = ModelManager.instance.modelUser.home[this.id].army_mk_num),
            i;
    }

    public getArmyBuildingStatus(): any {
        if (this.isArmy()) {
            var i = this.getArmyNum(), s = this.getArmyCanMakeNumMax(), n = this.getArmyNumMax(), h = this.getMakingArmyLastTimer(), o = this.getArmyMakingNum(), r = !(s < 100) && 0 == this.getArmyMakePayCheck(s)[3], a = ModelManager.instance.modelInside.checkBuildingIsIng(this);
            return o > 0 ? h <= 0 ? 4 : 3 : a ? 5 : 0 == <any>r ? 2 : i >= n ? 1 : 0;
        }
        return -1;
    }

    public getMakingArmyLastTimer(): any {
        var i = -1;
        this.isArmy() && (i = Tools.getTimeStamp(ModelManager.instance.modelUser.home[this.id].army_time) - ConfigServer.getServerTimer());
        return i;
    }

    public armyTrainMakeIng(): void {
        this.isArmy() && (this.getArmyMakingNum() > 0 && this.getMakingArmyLastTimer() > 0 ? (this.armyMakeOKreadyGet = !1, ModelManager.instance.modelInside.event("army_building_train_update_cd", this)) : this.getArmyMakingNum() > 0 && this.getMakingArmyLastTimer() <= 0 && !this.armyMakeOKreadyGet && (this.armyMakeOKreadyGet = !0, this.updateStatus(!0)));
    }

    public canUpgrade(t: any, i?: any): boolean {
        if (void 0 === i && (i = !0), !this.getLvCfg(t)) return !1;
        var n = !0,
            h = this.checkPrecondition(null, t).length > 0,
            o = !1;
        if (i) for (var r = this.checkPay(null, t), a = r.length, l = 0; l < a; l++) if (!r[l][2]) {
            o = !0;
            break;
        }
        var c = this.lv > 0 && this.checkIsMaxLv(this.lv + 1);
        return (h || o || c) && (n = !1),
            n;
    }

    /** 大 switch：按建筑类型装配主界面检查气泡（info/up/bubble/bubblet/visible）。 */
    public checkMyStatus(): any {
        var i: any = {},
            n = ModelManager.instance.modelInside.checkBuildingIsIng(this),
            h = 0,
            o = 0,
            r = 0,
            a = this.checkIsMaxLv(this.lv + 1),
            l: any = {
                name: this.getName(), level: a ? Tools.getMsgById("_public9") : this.lv
            },
            c = !1,
            u = this.lv;
        if (this.lv <= 0) {
            var d = this.canUpgrade(1, !1);
            return this.isAltar() ? d = d && sg.altar.legend.model.ModelLegend.instance.canShow : this.isAwaken() && (d = d && sg.altar.legendAwaken.model.ModelLegendAwaken.instance.open), d ? (l.icon = "", l.ui = ui.com.building_tips1UI, l.level = u = 0, i.bubble = {
                icon: AssetsManager.getAssetLater("home_06.png"), ui: ui.com.building_tips3UI
            }) : u = -1, i.visible = u, i;
        }
        if (u = this.lv, i.visible = u, this.isArmy()) (r = this.getMakingArmyLastTimer()) > 0 ? (h = this.getArmyMakeCDms(this.getArmyMakingNum()), i.up = {
            total: h, cd: r, content: Tools.getMsgById("_building55", [this.getArmyTypeName()]), icon: AssetsManager.getAssetsUI((<any>EffectManager).army_icon_building_ui2[ModelBuiding.army_type[this.id]]), ui: ui.com.building_tips0UI, building: 1
        }, c = !0) : (o = this.getArmyMakingNum()) > 0 ? (i.bubble = {
            icon: AssetsManager.getAssetLater((<any>EffectManager).army_icon_building_ui[this.getArmyType()]), num: o, ui: ui.com.building_tips2UI
        }, i.info = l, c = !0) : i.info = l,
            !n && (r > 0 || 0 == this.getArmyMakingNum()) && sg.model.ModelArmyUpgrade.getModel(this.id).showBubblet(!0) && (i.bubblet = {
                icon: AssetsManager.getAssetLater("home_36.png"), ui: ui.com.building_tips3UI
            }, i.info = l, c = !0);
        else if (this.produce >= 0) if ((o = this.getMyGift(this.lv)) > 0 && !n) {
            var _ = AssetsManager.getAssetPayIconBig(sg.model.ModelBuiding.material_type[this.produce + 1]);
            i.bubble = {
                icon: _, num: o, ui: ui.com.building_tips1UI
            }, i.info = l;
        }
        else i.info = l;
        else if (this.isEquip()) {
            var m = sg.model.ModelEquip.getCDingModel();
            if (m) {
                var g = (r = m.getLastCDtimer()) <= 1e3;
                m.isUpgradeIng() > -1 ? g ? (i.bubble = {
                    icon: AssetsManager.getAssetsICON(sg.model.ModelEquip.getIcon(m.id)), ui: ui.com.building_tips2UI
                }, i.info = l, c = !0) : (h = 1e3 * m.getLvCD(m.getLv() + 1), i.up = {
                    total: h, cd: r, content: m.isMine() ? Tools.getMsgById("_building56", [m.getName(!1, !1)]) : Tools.getMsgById("_building57", [m.isSpecial() ? m.getName() : sg.model.ModelEquip.getTypeNameByType(m.type)]), icon: AssetsManager.getAssetsUI("icon_paopao09.png"), ui: ui.com.building_tips0UI, building: 2
                }, c = !0) : i.info = l;
            } else i.info = l;
        }
        else if (this.isScience()) {
            var f = sg.model.ModelScience.getCDingModel();
            if (f) {
                var p = (r = f.getLastCDtimer()) <= 1e3;
                if (f.isUpgradeIng() > -1) {
                    if (i.bubble = {
                        icon: AssetsManager.getAssetsScience(f.icon), ui: ui.com.building_tips2UI
                    }, p) i.info = l, c = !0;
                    else {
                        h = 1e3 * f.getLvCD(f.getLv() + 1);
                        var v = AssetsManager.getAssetsUI("icon_paopao09.png");
                        ConfigApp.isLandscape && (v = AssetsManager.getAssetsUI("icon_paopao10.png")), i.up = {
                            total: h, cd: r, content: Tools.getMsgById("_building58", [f.getName()]), icon: v, ui: ui.com.building_tips0UI, building: 2
                        }, c = !0;
                    }
                    ConfigApp.isLandscape && (i.bubble.mat = ColorManager.getUIColor("COLOR_SCIENCE_ITEM")[f.type], i.bubble = null);
                } else i.info = l;
            } else i.info = l;
            sg.model.ModelScience.check_science_day_get() ? (i.bubble = {
                icon: AssetsManager.getAssetsICON(ConfigServer.system_simple.science_show), ui: ui.com.building_tips2UI
            }, c = !0, n && (i.up = {
                total: 1e3 * this.getLvCD(this.lv), cd: this.getLastCDtimer(), content: Tools.getMsgById("_building59", [this.getName()]), icon: AssetsManager.getAssetsUI("icon_paopao08.png"), ui: ui.com.building_tips0UI, building: 0
            })) : !n && !c && !sg.view.ScienceH.ModelScienceH.instance.isUpgradeMax() && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_07.png"), ui: ui.com.building_tips2UI
            });
        }
        else if (this.isPubHero()) i.info = l,
            i.bubble = {
                icon: AssetsManager.getAssetLater("home_24.png"), ui: ui.com.building_tips2UI
            };
        else if (this.isStarRuneHero()) {
            i.info = l;
            var y = ModelManager.instance.modelUser.star_records, b = ConfigServer.system_simple.star_price, I = ModelManager.instance.modelProp.isHaveItemProp(b[5], 1), x = !!Tools.isNewDay(y.get_time) || y.get_times < b[4], w = !ModelGame.unlock(null, "star_get").stop;
            I && x && w && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_29.png"), ui: ui.com.building_tips2UI
            });
        }
        else if (this.isBase()) i.info = l,
            !ModelGame.unlock(null, "more_office").stop && sg.model.ModelOffice.checkOfficeCanUp() ? i.bubble = {
                icon: AssetsManager.getAssetLater("home_09.png"), ui: ui.com.building_tips2UI
            } : sg.model.ModelShogun.isOpen() && sg.model.ModelShogun.redPoint ? i.bubble = {
                icon: AssetsManager.getAssetLater("home_33.png"), ui: ui.com.building_tips2UI
            } : ModelAchievement.instance.hasNewAchieve() && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_51.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isAltar()) i.info = l,
            sg.altar.legend.model.ModelLegend.instance.redPoint && !ModelGame.unlock(null, "legend").stop && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_legend.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isRevivedTower()) {
            i.info = l;
            var C = sg.model.ModelDoomTower.getDoomLv() < ConfigServer.gwent.doom_tower.soul_lock, k = C ? "home67.png" : "home68.png";
            ConfigApp.isLandscape && (k = C ? "home_72.png" : "home_74.png");
            var T = AssetsManager.getAssetLater(k);
            i.bubble = {
                icon: T, ui: ui.com.building_tips2UI, xx: -3, yy: -90
            };
        }
        else if (this.isKunlun()) {
            i.info = l;
            var M = sg.kunlun.model.ModelWilderness.instance.checkHookCanGet(), S = AssetsManager.getAssetLater(M ? "gods_sh.png" : "home71.png");
            i.bubble = {
                icon: S, ui: ui.com.building_tips2UI
            };
        }
        else if (this.isJigsaw()) i.info = l,
            sg.jigsaw.model.ModelJigsaw.instance.showAdmireBubble ? i.bubble = {
                icon: AssetsManager.getAssetLater("home93.png"), ui: ui.com.building_tips2UI
            } : sg.jigsaw.model.ModelJigsaw.instance.showMeditationBubble && (i.bubble = {
                icon: AssetsManager.getAssetLater("home94.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isAwaken()) i.info = l,
            sg.altar.legendAwaken.model.ModelLegendAwaken.instance.drawOpen && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_63.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isPVE()) i.info = l,
            ModelManager.instance.modelClimb.isGetAward() ? (i.bubble = {
                icon: AssetsManager.getAssetsICON(ConfigServer.system_simple.pve_show), ui: ui.com.building_tips2UI
            }, c = !0) : sg.model.ModelMeritExchange.instance.redPoint && (i.bubble = {
                icon: AssetsManager.getAssetLater("home106.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isBagagage()) i.info = l,
            sg.model.ModelBuiding.isBaggageBubble() ? i.bubble = {
                icon: AssetsManager.getAssetLater("home_48.png"), ui: ui.com.building_tips2UI
            } : sg.model.ModelBuiding.isBaggageBubble1() && (i.bubble = {
                icon: AssetsManager.getAssetLater("home_59.png"), ui: ui.com.building_tips2UI
            });
        else if (this.isPVP()) i.info = l,
            ModelManager.instance.modelUser.champion_user;
        else if (this.isHeritage()) {
            i.info = l;
            var B = sg.heritage.ModelHeritage.instance.getBabbleData();
            B[0] && this.lv > 0 && (i.bubble = {
                icon: B[1], ui: ui.com.building_tips2UI
            });
        }
        else this.isSeaRoute() ? (i.info = l, sg.seaRoute.ModelSeaRoute.instance.active && (i.bubble = {
            icon: AssetsManager.getAssetLater("home100.png"), ui: ui.com.building_tips2UI
        })) : this.isScheme() ? (i.info = l, sg.model.ModelSchemeEgg.instance.haveDailyReward && (i.bubble = {
            icon: ModelItem.getIconUrl(sg.model.ModelSchemeEgg.instance.cfg.daily[0]), ui: ui.com.building_tips2UI
        })) : i.info = l;
        if (n && !c) {
            h = 1e3 * this.getLvCD(this.lv);
            var A = this.getLastCDtimer(), L: any[] = [];
            i.hasOwnProperty("bubble") && (L.push("bubble"), L.push(i.bubble)), (i = <any>{}).visible = u, i.up = {
                total: h, cd: A, content: Tools.getMsgById("_building59", [this.getName()]), icon: AssetsManager.getAssetsUI("icon_paopao08.png"), ui: ui.com.building_tips0UI, building: 0
            }, L.length > 0 && (i[L[0]] = L[1]), this.isFreeCanUse() && (i.visible = u, i.bubble = {
                icon: AssetsManager.getAssetLater("home_37.png"), ui: ui.com.building_tips1UI, building: 0
            });
        }
        return i.hasOwnProperty("info") && (l = i.info, !a && (l.up = this.canUpgrade(this.lv + 1)), i.info = l),
            i;
    }

    public isBusy(): boolean {
        if (this.isEquip()) {
            var i = sg.model.ModelEquip.getCDingModel();
            if (i && i.isUpgradeIng() > -1) return !0;
        }
        if (this.isScience()) {
            var s = sg.model.ModelScience.getCDingModel();
            if (s && s.isUpgradeIng() > -1) return !0;
        }
        return 3 === this.getArmyBuildingStatus();
    }

    public getArmyMakeCD(t: any): any {
        var n = sg.model.ModelScience.func_sum_type("army_rate", this.id),
            h = sg.model.ModelBuffManager.instance.getBuff("buff_country1"),
            o = h ? h.effect : 0,
            r = sg.model.ModelPowerLevel.instance.func_sum_type("army_rate", this.id);
        return Math.ceil(t * ModelBuiding.getArmyBuildingLvCfg(this.id, this.lv)[0] * .1) / (1 + n + o + r);
    }

    public getArmyMakeCDms(t: any): any {
        return 1e3 * this.getArmyMakeCD(t);
    }

    public getMyGift(t: any): any {
        if (this.produce >= 0) {
            if (this.giftTimer <= 0) return -1;
            var s = this.getMyGiftEvery(t), n = s[1] * Tools.oneMinuteMilli, h = ConfigServer.system_simple.material_gift_limit[1] * n, o = ConfigServer.getServerTimer() - this.giftTimer;
            o >= h && (o = h);
            var r = Math.floor(o / n);
            return Math.ceil(s[2] * r);
        }
        return -1;
    }

    public checkProduceTips(): boolean {
        var i = ConfigServer.getServerTimer(),
            s = i - this.giftTimer,
            n = ConfigServer.system_simple.material_gift_cd[1] * Tools.oneMinuteMilli,
            h = Math.ceil(s / n);
        if (this.produceTipsTimer < 0) this.produceTipsTimer = this.giftTimer + h * n;
        else if (i >= this.produceTipsTimer) return this.produceTipsTimer = this.giftTimer + h * n,
            !0;
        return !1;
    }

    public getMyGiftEvery(t: any): any[] {
        if (this.produce >= 0 && t > 0) {
            var n = ConfigServer.system_simple.material_gift[t - 1], h = ConfigServer.system_simple.material_gift_cd[1], o = ConfigServer.system_simple.material_scale[this.produce], r = 0, a = "";
            switch (ModelBuiding.check_produce_type.hasOwnProperty(this.id) ? ModelBuiding.check_produce_type[this.id] : -1) {
                case 0: a = "gold", r = sg.model.ModelOfficeRight.func_homegold();
                    break;
                case 1: a = "food", r = sg.model.ModelOfficeRight.func_homefood();
                    break;
                case 2: a = "wood", r = sg.model.ModelOfficeRight.func_homewood();
                    break;
                case 3: a = "iron", r = sg.model.ModelOfficeRight.func_homeiron();
                    break;
                default: a = "gold", r = 0;
            }
            return [n, h, n * o * (1 + r + sg.model.ModelScience.func_sum_type("fief_produce", a) + sg.model.ModelPowerLevel.instance.func_sum_type("fief_produce", a)) + sg.model.ModelCabinet.instance.getCapacityNum(this.produce)];
        }
        return [0, 0, 0];
    }

    public getName(): any {
        return Tools.getMsgById(this.name);
    }

    public getInfo(): any {
        return Tools.getMsgById(this.info);
    }

    public getIntroduceStr(t?: any): any {
        void 0 === t && (t = !0);
        var s = "";
        if (this.introduce) for (var n = this.introduce.length, h = 0; h < n; h++) {
            var o = this.introduceEvery(this.introduce[h], t ? 0 : -1);
            s += o, h < n - 1 && "" != o && (s += "<br/>");
        }
        return s;
    }

    /** 60xxx 文案模板参数装配；60165_1 case 内 return，60180 case 置空 t 后 fall-through。 */
    public introduceEvery(t: any, i?: any): any {
        void 0 === i && (i = 0);
        var h: any, o: any, r: any = null, a = "",
            l = this.checkIsMaxLv(this.lv + 1);
        switch (t) {
            case "60150": case "60151": case "60152": case "60153": r = [Math.floor(this.getMyGiftEvery(this.lv + i)[2])];
                break;
            case "60154": r = [(h = ModelManager.instance.modelInside.getBase()).lv + i, "1"];
                break;
            case "60155": h = ModelManager.instance.modelInside.getBase(), r = [sg.model.ModelHero.getMaxLv(h.lv + i), "3"];
                break;
            case "60156": r = [(h = ModelManager.instance.modelInside.getBuildingModel("building005")).lv + i + ConfigServer.pub.hero_box1.free, "1"];
                break;
            case "60157": h = ModelManager.instance.modelInside.getBuildingModel("building002"), r = [ModelManager.instance.modelGame.getShopTimes("treasuer_shop", h.id, h.lv + i), "2"];
                break;
            case "60158": r = [StringUtil.numberToPercent(this.scienceTroopSpd()), "1%"];
                break;
            case "60159": h = ModelManager.instance.modelInside.getBuildingModel(ModelBuiding.getBaggageId()), r = [this.baggageBuyNumBase(ConfigServer.system_simple.baggage.buy_gold, h.lv + i), ConfigServer.system_simple.baggage.buy_gold[1]];
                break;
            case "60160": h = ModelManager.instance.modelInside.getBuildingModel(ModelBuiding.getBaggageId()), r = [this.baggageBuyNumBase(ConfigServer.system_simple.baggage.buy_food, h.lv + i), ConfigServer.system_simple.baggage.buy_food[1]];
                break;
            case "60161": h = ModelManager.instance.modelInside.getBuildingModel(ModelBuiding.getBaggageId()), r = [this.baggageBuyNumBase(ConfigServer.system_simple.baggage.buy_wood, h.lv + i), ConfigServer.system_simple.baggage.buy_wood[1]];
                break;
            case "60162": h = ModelManager.instance.modelInside.getBuildingModel(ModelBuiding.getBaggageId()), r = [this.baggageBuyNumBase(ConfigServer.system_simple.baggage.buy_iron, h.lv + i), ConfigServer.system_simple.baggage.buy_iron[1]];
                break;
            case "60163": h = ModelManager.instance.modelInside.getBuildingModel(ModelBuiding.getBaggageId()), r = [this.baggageBuyTimes(h.lv + i), ConfigServer.system_simple.baggage.limit[1]];
                break;
            case "60164": h = ModelManager.instance.modelInside.getBuildingModel(ConfigServer.system_simple.building_soul[0]), r = [Tools.percentFormat(ConfigServer.system_simple.building_soul[1] + (h.lv + i) * ConfigServer.system_simple.building_soul[2]), Tools.percentFormat(ConfigServer.system_simple.building_soul[2])];
                break;
            case "60165": h = ModelManager.instance.modelInside.getBuildingModel("building007"), a = "building0", o = [this.getBuildingLvValue(a, h.lv + i), this.getBuildingLvValue(a, h.lv + i, "", !0)], r = ConfigApp.isLandscape ? [Tools.percentFormat(sg.fight.logic.utils.FightUtils.pointToPer(o[0])), Tools.percentFormat(sg.fight.logic.utils.FightUtils.pointToPer(o[1]))] : [o[0], o[1]];
                break;
            case "60165_1": return h = ModelManager.instance.modelInside.getBuildingModel("building007"), a = "building0", r = [this.getBuildingLvValue(a, h.lv + i, "hpmRate", !1), l ? "" : "+", l ? "" : this.getBuildingLvValue(a, h.lv + i, "hpmRate", !0), this.getBuildingLvValue(a, h.lv + i, "defRate", !1), l ? "" : "+", l ? "" : this.getBuildingLvValue(a, h.lv + i, "defRate", !0)], Tools.getMsgById(t, r);
            case "60166": !ConfigApp.isLandscape && (h = ModelManager.instance.modelInside.getBuildingModel("building007"), a = "building0", r = [(o = [this.getBuildingLvValue(a, h.lv + i), this.getBuildingLvValue(a, h.lv + i, "", !0)])[0], o[1]]);
                break;
            case "60167": h = ModelManager.instance.modelInside.getBuildingModel("building008"), a = "building1", o = [this.getBuildingLvValue(a, h.lv + i, "atkRate", !1, !0), this.getBuildingLvValue(a, h.lv + i, "atkRate", !0, !0)], r = [Tools.percentFormat(o[0]), Tools.percentFormat(o[1])];
                break;
            case "60167_1": h = ModelManager.instance.modelInside.getBuildingModel("building008"), a = "building1", r = [this.getBuildingLvValue(a, h.lv + i, "atk", !1), this.getBuildingLvValue(a, h.lv + i, "atk", !0)];
                break;
            case "60168": h = ModelManager.instance.modelInside.getBuildingModel("building008"), a = "building1", o = [this.getBuildingLvValue(a, h.lv + i, "defRate", !1, !0), this.getBuildingLvValue(a, h.lv + i, "defRate", !0, !0)], r = [Tools.percentFormat(o[0]), Tools.percentFormat(o[1])];
                break;
            case "60172": sg.model.ModelScheme.isStartOpenMaxLv && (l = !0), r = [sg.model.ModelScheme.levelupMaxLv, "1"];
                break;
            case "60171": ConfigServer.system_simple.building_equip && (h = ModelManager.instance.modelInside.getBuildingModel(ConfigServer.system_simple.building_equip[0]), r = [Tools.percentFormat(ConfigServer.system_simple.building_equip[1] + (h.lv + i) * ConfigServer.system_simple.building_equip[2]), Tools.percentFormat(ConfigServer.system_simple.building_equip[2])]);
                break;
            case "60176": h = ModelManager.instance.modelInside.getBuildingModel("building030");
                for (var c = sg.model.ModelCabinet.instance.getCabinetSeatArr(), u = 0, d = 0, _ = 0; _ < c.length; _++) 0 == c[_] ? u += 1 : h && c[_] == h.lv + i + 1 && (d += 1);
                r = [u, 0 == d ? "" : d];
                break;
            case "60180": sg.model.ModelSchemeEgg.instance.active || (t = "");
        }
        return l ? Tools.getMsgById(t, r ? [r[0], "", ""] : []) : Tools.getMsgById(t, r ? [r[0], r[1] ? "+" : "", r[1]] : []);
    }

    public scienceTroopSpd(): any {
        return ConfigServer.system_simple.building_army_go[1] + this.lv * ConfigServer.system_simple.building_army_go[2];
    }

    public baggageBuyNumBase(t: any, i: any): any {
        return t[0] + t[1] * i;
    }

    public baggageBuyTimes(t: any): any {
        return ConfigServer.system_simple.baggage.limit[0] + ConfigServer.system_simple.baggage.limit[1] * t;
    }

    public getBuildingLvValue(t: any, i: any, s?: any, n?: any, h?: any): any {
        void 0 === s && (s = ""),
            void 0 === n && (n = !1),
            void 0 === h && (h = !1);
        var r = ConfigServer.fight.propertyTransform[t],
            a = sg.fight.logic.utils.FightUtils.getRankValue(i, r, s, n);
        return h && (a = sg.fight.logic.utils.FightUtils.pointToPer(a)),
            a;
    }

    public upOneLv(t: any): boolean {
        if (0 == t && 1 == this.lv && this.produce >= 0 && ModelManager.instance.modelUser.home[this.id].material_time) {
            var s: any = {};
            s.$datetime = ConfigServer.getServerTimer(), ModelManager.instance.modelUser.home[this.id].material_time = s;
        }
        ConfigApp.isLandscape ? this.isBase() ? ViewManager.instance.showViewEffect(sg.view.effect.BuildingUpgrade.getEffect(this)) : this.produce > -1 ? ViewManager.instance.showViewEffect(sg.view.effect.BuildingUpgrade3.getEffect(this)) : this.isArmy() ? ViewManager.instance.showViewEffect(sg.view.effect.BuildingUpgrade2.getEffect(this)) : ViewManager.instance.showViewEffect(sg.view.effect.BuildingUpgrade1.getEffect(this)) : ViewManager.instance.showViewEffect(sg.view.effect.BuildingUpgrade.getEffect(this));
        return !1;
    }

    public lvNext(): any {
        return this.lv + 1;
    }

    public getLvCD(t: any): any {
        var s = this.getLvCfg(t),
            n = -1;
        return s && s.hasOwnProperty("cd") && (n = s.cd),
            n;
    }

    public checkIsMaxLv(t: any): boolean {
        return Tools.isNullObj(this.getLvCfg(t));
    }

    public unlockFunc(t: any): any {
        if (!this.checkIsMaxLv(t)) {
            var s = this.getLvCfg(t);
            if (s.hasOwnProperty("unlock_info")) return s.unlock_info;
        }
        return null;
    }

    public getLvCDminute(t: any): any {
        return this.getLvCD(t) / 60;
    }

    public checkIslv0toUnlock(): boolean {
        return this.lv <= 0;
    }

    public getLastCDtimerStyle(t?: any): any {
        return void 0 === t && (t = 0),
            Tools.getTimeStyle(this.getLastCDtimer() - t);
    }

    public getLastCDtimer(): any {
        return this.cd - ConfigServer.getServerTimer();
    }

    public getLastCDpercent(): any {
        return this.getLastCDtimer() / this.getLvCD(this.lv) * 1e3;
    }

    public getCDfree(): any {
        return sg.model.ModelOfficeRight.func_buildtime();
    }

    public isFreeCanUse(): boolean {
        var i = this.getLastCDtimer(),
            s = this.getCDfree() * Tools.oneMinuteMilli;
        return i > 0 && s >= i;
    }

    public isUpgradeIng(): boolean {
        var i = !1;
        return this.cd <= 0 ? i = !1 : (this.getLastCDtimer() > 0 && (i = !0), i);
    }

    public upgradeIng(): void {
        this.isUpgradeIng() ? (ModelManager.instance.modelInside.event("building_update_cd", this), this.event("building_update_cd")) : this.upgradeEnd(1);
    }

    public updateStatus(t?: any): void {
        void 0 === t && (t = !1),
            this.event("building_status_change", t ? this : null);
    }

    public upgradeEnd(t: any): void {
        ModelManager.instance.modelInside.event("building_builder_remove", this),
            ModelManager.instance.modelInside.event("building_update_end", this),
            this.updateStatus(!0);
    }

    /** Precondition 内 mergeNum 项命中即就地 delete 该等级缓存槽（原文写回 cfg.levelup）。 */
    public getLvCfg(t: any): any {
        var n = this.cfg.levelup,
            h = t + "",
            o = n[h];
        if (o && o.Precondition instanceof Array && o.Precondition.some(function (t) {
            return t[0] === "mergeNum" && ModelBuiding.checkSinglePre(t);
        })) return delete n[h],
            null;
        return o;
    }

    public checkCDupgradeIsOK(t: any): boolean[] {
        this.checkPay(null, t);
        var s = this.checkPrecondition(null, t);
        return [this.payIsAllEnough <= 0, 0 === s.length];
    }

    public netUpgrade(t: any, i?: any): void {
        var n = this;
        NetSocket.instance.send("kill_building_cd", t, Handler.create(this, function (t: any) {
            var h = t.sendData.item_id;
            ModelManager.instance.modelUser.updateData(t.receiveData), n.freeCDtipsTimer = ConfigServer.getServerTimer(), h < 0 ? n.upgradeEnd(1) : n.updateStatus(!0), i && i.run();
        }), t);
    }

    public checkPrecondition(t: any, i?: any): any[] {
        return void 0 === i && (i = 1),
            (t || Tools.getObjValue(this.getLvCfg(i), "Precondition", [])).filter(ModelBuiding.checkSinglePre).map(ModelBuiding.getPreInfo);
    }

    public checkPay(t: any, i?: any): any[] {
        return void 0 === i && (i = 1),
            t ? this.getMaterial(t) : this.getMaterial(Tools.getObjValue(this.getLvCfg(i), "material", null));
    }

    public getMaterial(t: any): any[] {
        var n = [];
        if (this.payIsAllEnough = 0, t) for (var h = t.length, o = 0, r = "", a = !1, l = 0; l < h; l++) (o = parseInt(t[l])) > 0 && (r = ModelBuiding.material_type[l], a = ModelBuiding.getMaterialEnough(r, o), n.push([r, o, a]), !a && (this.payIsAllEnough += 1));
        return n;
    }

    /* ---- r(0,a,name,getter[,setter]) 实例访问器 ---- */
    public get giftTimer(): any {
        return ModelManager.instance.modelUser.home.hasOwnProperty(this.id) && ModelManager.instance.modelUser.home[this.id].hasOwnProperty("material_time") ? Tools.getTimeStamp(ModelManager.instance.modelUser.home[this.id].material_time) : 0;
    }

    public get cd(): any {
        var i = 0;
        return ModelManager.instance.modelUser.building_cd[this.id] && (i = Tools.getTimeStamp(ModelManager.instance.modelUser.building_cd[this.id])), i;
    }

    public get lv(): any {
        return null == ModelManager.instance.modelUser.home[this.id] ? 0 : ModelManager.instance.modelUser.home[this.id].lv;
    }

    public set lv(t: any) {
        ModelManager.instance.modelUser.home[this.id].lv = t, ModelManager.instance.modelUser.updateData({
            user: {
                home: ModelManager.instance.modelUser.home
            }
        });
    }

    /* ---- 静态面 ---- */
    public static getBaggageId(): any {
        var i = "building004";
        return ConfigServer.system_simple.use_cabinet && ConfigServer.home.hasOwnProperty("building030") ? "building030" : i;
    }

    public static getArmyMakeCfgByGrade(t: any, i: any): any {
        return ConfigServer.army.army_ability[t][i];
    }

    public static getArmyMakeCfgByGradeByType(t: any): any {
        var s = ModelManager.instance.modelInside.getBuildingModelByArmyType(t);
        return sg.model.ModelBuiding.getArmyMakeCfgByGrade(s.getArmyCurrGrade(), s.getArmyType());
    }

    public static getArmyCurrGradeByType(t: any, i?: any): any {
        if (void 0 === i && (i = 0), !ConfigServer.home) return 0;
        var h = ModelManager.instance.modelInside.getBuildingModelByArmyType(t);
        return h ? ModelBuiding.getArmyBuildingLvCfg(h.id, i || h.lv)[3] : 0;
    }

    public static getArmyNextGradeByType(t: any): any {
        var n = ModelManager.instance.modelInside.getBuildingModelByArmyType(t),
            h = ModelBuiding.getArmyBuildingLvCfg(n.id, n.lv)[3],
            o = ConfigServer.system_simple.barracks[n.id];
        if (o[n.lv - 2] && o[n.lv - 2][3] != h) return ModelBuiding.getArmyCurrGradeByType(t);
        for (var r = o.length, a = n.lv; a < r; a++) if (h != o[a][3]) return o[a][3];
        return ModelBuiding.getArmyCurrGradeByType(t);
    }

    public static getArmyCurrScienceByType(t: any, i?: any): any[] {
        if (void 0 === i && (i = !1), !ConfigServer.home) return [1, 0];
        var n = ModelManager.instance.modelInside.getBuildingModelByArmyType(t);
        if (!n) return [1, 0];
        var h = n.getArmyScience();
        return i ? [h[0], h[6]] : h;
    }

    public static getArmyBuildingLvCfg(t: any, i?: any): any {
        if (void 0 === i && (i = -1), i >= 0) {
            var h = ModelBuiding.getArmyBuildingLvCfg(t, -1);
            if (i > h.length) return null;
            var o = i - 1;
            return o < 0 && (o = 0), h[o];
        }
        return ConfigServer.system_simple.barracks[t];
    }

    public static getArmyBuildingNewLvIndex(t: any, i: any, n?: any): any {
        void 0 === n && (n = !0);
        for (var o = ConfigServer.system_simple.barracks[t], r = o.length, a = ModelBuiding.getArmyBuildingLvCfg(t, i), l = -1, c = i - 1, u = c = c < 0 ? 0 : c; u < r; u++) if (a[3] != o[u][3]) {
            l = u;
            break;
        }
        return n && l < 0 && (l = r - 1),
            l;
    }

    public static get_soul_value(): any {
        var i = ModelManager.instance.modelInside.getBuildingModel(ConfigServer.system_simple.building_soul[0]);
        return ConfigServer.system_simple.building_soul[1] + i.lv * ConfigServer.system_simple.building_soul[2];
    }

    public static checkSinglePre(t: any): boolean {
        var n = t[0],
            h = t[1],
            o = ModelManager.instance.modelUser;
        switch (n) {
            case "office": return !sg.model.ModelOffice.useOffice37() && o.office < h;
            case "office37": return sg.model.ModelOffice.useOffice37() && -1 === o.office_right.indexOf(h);
            case "mergeNum": return o.mergeNum < h;
            case "time_limt": return !1;
            default: return !ModelBuiding.checkPreBuildLv(n, h);
        }
    }

    public static getPreInfo(t: any): any {
        var n = t[0],
            h = t[1],
            o = t.concat();
        if (n instanceof Array) {
            var r = ModelBuiding.getPreBuildId(n, h);
            o.splice(0, 1, r);
        }
        return o;
    }

    public static getPreBuildId(t: any, i: any): any {
        return (t = ArrayUtil.distinct(ArrayUtil.flat(t)).filter(function (t) {
            var n = ModelManager.instance.modelInside.getBuildingModel(t);
            return n && n.lv < i;
        }).sort(function (t, i) {
            var n = ModelManager.instance.modelInside.getBuildingModel(t), h = ModelManager.instance.modelInside.getBuildingModel(i);
            return n.isBusy() && !h.isBusy() ? 1 : !n.isBusy() && h.isBusy() ? -1 : h.lv - n.lv;
        }))[0];
    }

    public static checkPreBuildLv(t: any, i: any): boolean {
        if (typeof t == "string") return ModelBuiding.buildingLvIsOK(t, i);
        if (t instanceof Array) {
            var h = t[0], o = t.slice(1);
            if ("or" === h) return o.some(function (t) {
                return ModelBuiding.checkPreBuildLv(t, i);
            });
            if (h === "and") return o.every(function (t) {
                return ModelBuiding.checkPreBuildLv(t, i);
            });
        }
        return !1;
    }

    public static buildingLvIsOK(t: any, i: any): boolean {
        var n = ModelManager.instance.modelInside.getBuildingModel(t);
        return !!n && n.lv >= i;
    }

    public static getMaterialEnough(t: any, i: any): boolean {
        var n = 0;
        switch (t) {
            case "merit": n = ModelManager.instance.modelUser.merit;
                break;
            case "gold": n = ModelManager.instance.modelUser.gold;
                break;
            case "food": n = ModelManager.instance.modelUser.food;
                break;
            case "wood": n = ModelManager.instance.modelUser.wood;
                break;
            case "iron": n = ModelManager.instance.modelUser.iron;
                break;
            case "coin": n = ModelManager.instance.modelUser.coin;
        }
        return n >= i;
    }

    public static getMaterialTypeUI(t: any, i?: any): any {
        return void 0 === i && (i = !1),
            i ? AssetsManager.getAssetLater(ModelItem.getCostIcon(t, i)) : AssetsManager.getAssetsUI(ModelItem.getCostIcon(t, i));
    }

    public static getCostByCD(t: any, i?: any): any {
        return void 0 === i && (i = 0),
            Math.ceil(t / Number(ConfigServer.system_simple.cd_cost[i]));
    }

    /** for-in 对象为逗号表达式（默认参 t 装配 + home 表），原文如此。 */
    public static checkUpgradeBuild(t?: any): any {
        var i;
        for (var n in (void 0 === t && (t = !0), ModelManager.instance.modelUser.home)) if ((i = ModelManager.instance.modelInside.getBuildingModel(n)) && i.canUpgrade(i.lv + 1, t) && 0 === i.cd) return i;
        return null;
    }

    public static isBaggageBubble(): boolean {
        for (var i = ModelManager.instance.modelUser.baggage.material, s = 0; s < i.length; s++) if (i[s][1] > 0) return !0;
        return !1;
    }

    public static isBaggageBubble1(): boolean {
        var i = ConfigServer.system_simple.baggage.free_buy + sg.model.ModelOfficeRight.func_baggagefree();
        if (i > 0) {
            var s = ModelManager.instance.modelUser.baggage;
            if ((Tools.isNewDay(s.refresh_free_time) ? 0 : s.free_times) < i) return !0;
        }
        return !1;
    }

    public static NAME_HEAD: string = "building";
    public static TYPE_BUILDER: number = 0;
    public static buildingModels: any = {};
    public static CHECK_STATUS_INFO: string = "info";
    public static CHECK_STATUS_UP: string = "up";
    public static CHECK_STATUS_BUBBLE: string = "bubble";
    public static CHECK_STATUS_VISIBLE: string = "visible";
    public static CHECK_STATUS_BUBBLET: string = "bubblet";

    /* ---- h(s,[...]) 惰性静态：首次访问装配并 defineProperty 写回 ---- */
    public static get material_type(): any {
        var v = ["merit", "gold", "food", "wood", "iron", "coin"];
        Object.defineProperty(ModelBuiding, "material_type", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get material_type_name(): any {
        var v = {
            merit: Tools.getMsgById("190006"), gold: Tools.getMsgById("190001"), food: Tools.getMsgById("190002"), wood: Tools.getMsgById("190003"), iron: Tools.getMsgById("190004"), coin: Tools.getMsgById("190005")
        };
        Object.defineProperty(ModelBuiding, "material_type_name", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get check_produce_id(): any {
        var v = [{
            building013: 0, building014: 0, building015: 0
        }, {
            building022: 1, building023: 1, building024: 1
        }, {
            building019: 2, building020: 2, building021: 2
        }, {
            building016: 3, building017: 3, building018: 3
        }];
        Object.defineProperty(ModelBuiding, "check_produce_id", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get check_produce_type(): any {
        var v = {
            building013: 0, building014: 0, building015: 0, building022: 1, building023: 1, building024: 1, building019: 2, building020: 2, building021: 2, building016: 3, building017: 3, building018: 3
        };
        Object.defineProperty(ModelBuiding, "check_produce_type", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get army_type(): any {
        var v = {};
        Object.defineProperty(ModelBuiding, "army_type", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }

    public static get army_type_building(): any {
        var v = ["building009", "building010", "building011", "building012"];
        Object.defineProperty(ModelBuiding, "army_type_building", { value: v, writable: true, enumerable: true, configurable: true });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelBuiding",i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelBuiding, "sg.model.ModelBuiding", null, null);
