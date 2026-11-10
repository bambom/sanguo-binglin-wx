/**
 * sg.model.ModelXYZ2 —— XYZ2 玩法模型（图腾/塔/国策 buff/神策击杀推送），
 * ModelCountryPvp 构造器直接 new（sg.model.ModelXYZ2 运行时触达）。
 *
 * 原文：code1.js 字节 [2330641,2336288)（off 2330879，池化注册名 e(7664)，包装变量 Hr，
 * IIFE 实参基类 i=As=sg.model.ViewModelBase；sendMethod/sendCB 继承自 ViewModelBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-f/ModelXYZ2.js
 *
 * 入批依据：ModelCountryPvp ctor `new sg.model.ModelXYZ2(this)`（ModelManager.init
 * 第 3 个 new，ModelUser 后 100% 立即触发，批次 F「ctor 直 new 才扩」）。
 * 依赖（批次 A/B/D 直引）：ue=ModelManager、pn=NetSocket、P=laya.utils.Handler、
 * Gt=ConfigServer、No=sg.map.model.MapModel、Sr=ModelOfficial、vs=Tools、gs=StringUtil、
 * ae=ColorManager、cs=ObjectUtil、Ze=ArrayUtil、tn=ViewManager、s=Laya（timer）。
 * 批次外全局注册路径：eo=sg.bigDevil.model.ModelBigDevil（devilCountry）、
 * ci=sg.fight.FightMain（receiveCityDestroy/receiveShenceKill）、
 * jK=sg.view.countryPvp.ShenceKillPush（create）。
 *
 * 保真注记：_checkTuteng 的 `this.cfg.country.new_score_city[e.cityId];` 为丢弃求值；
 * _checkTower 的 `(o=h<mSunrise?…:towerAvailableTime-h)>0&&…` 先赋值再比较；
 * mockTianhuo/mockTianlei 为原文测试方法（中文串原样保留）。
 */
import Handler = laya.utils.Handler;
import { ViewModelBase } from "./ViewModelBase";
import { ModelManager } from "../manager/ModelManager";
import { NetSocket } from "../net/NetSocket";
import { ConfigServer } from "../cfg/ConfigServer";
import { MapModel } from "../map/model/MapModel";
import { ModelOfficial } from "./ModelOfficial";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { ColorManager } from "../manager/ColorManager";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { ViewManager } from "../manager/ViewManager";

export class ModelXYZ2 extends ViewModelBase {

    public modelPvp: any = null;
    public city_hp: any = null;
    public country_mp: any = null;
    public _inited: boolean = !1;
    public shenceData: any[] = [];

    constructor(i?: any) {
        super();  // 原文 h.__super.call(this)
        this.modelPvp = i,
            NetSocket.instance.registerHandler("w.push_shence_kill", new Handler(this, this._pushShenceKill));
    }

    public refreshData(t: any): void {
        this.city_hp = t.city_hp,
            this.country_mp = t.country_mp,
            !this._inited && (this._inited = !0, this._initTuteng(), this._initTower()),
            this._checkTuteng();
    }

    public _initTuteng(): void {
        var i = this;
        this.getCityByType(10).forEach(function (e) {
            i.city_hp[e.cityId][0] <= 0 && (e.destroyed = !0);
        });
    }

    public _checkTuteng(): void {
        var i = this,
            s = this.getCityByType(10),
            n = ModelManager.instance.modelUser.country;
        s.forEach(function (e) {
            var h = i.getTutengHp(e.cityId);
            i.cfg.country.new_score_city[e.cityId];
            !e.destroyed && h <= 0 && (e.destroyed = !0, e.faithCountry === n && ModelManager.instance.modelCountryPvp.showHeroTalk("500063_maps"), sg.fight.FightMain.receiveCityDestroy(e.cityId + ""));
        });
    }

    public _initTower(): void {
        this._checkTower();
    }

    public _checkTower(): void {
        var i = this.getCityByType(12),
            n = this.towerAvailable;
        if (i.forEach(function (i) {
            i.inBuilding = !n;
        }), this.modelPvp.mSunrise) {
            var h = ConfigServer.getServerTimer(), o = 0;
            (o = h < this.modelPvp.mSunrise ? this.modelPvp.mSunrise - h : this.towerAvailableTime - h) > 0 && Laya.timer.once(o, this, this._checkTower);
        }
    }

    public getCityByType(t: any): any[] {
        return this.modelPvp.xyCityDoorsIds.concat(this.modelPvp.xyCityId).map(function (t) {
            return MapModel.instance.citys[t];
        }).filter(function (e) {
            return e.cityType === t;
        });
    }

    public getTutengDestoryTime(t: any): number {
        if (!this.city_hp || !this.city_hp[t]) return -1;
        var s = this.city_hp[t],
            n = this.cfg.tuteng_hp,
            h = s[0],
            o = MapModel.instance.citys[t];
        if (o.country !== sg.bigDevil.model.ModelBigDevil.devilCountry && o.country !== o.faithCountry) {
            var r = 1e3 * s[1];
            return r += Math.ceil((this.tutengMaxHp - h) / n[2]) * n[1] * 1e3, Math.max(r - ConfigServer.getServerTimer(), 0);
        }
        return h > 0 ? -1 : 0;
    }

    public getTutengHp(t: any): any {
        if (!this.city_hp || !this.city_hp[t]) return this.tutengMaxHp;
        var s = this.city_hp[t],
            n = this.cfg.tuteng_hp,
            h = s[0],
            o = MapModel.instance.citys[t];
        if (o.country !== sg.bigDevil.model.ModelBigDevil.devilCountry && o.country !== o.faithCountry) {
            var r = 1e3 * s[1];
            h -= (ConfigServer.getServerTimer() - r) / (1e3 * n[1]) * n[2];
        }
        return Math.max(Math.ceil(h), 0);
    }

    public _getTutengHpHistory(t: any): any {
        var i = this,
            s = this.city_hp[t] || [],
            n = MapModel.instance.citys[t],
            o = s[2] || {};
        o[n.country] = o[n.country] || 0;
        var r = ObjectUtil.keys(o).map(parseFloat).sort(),
            a = ColorManager.getUIColor("COUNTRY_COLORS"),
            l = r.map(function (e) {
                var a = o[e] || 0;
                return n.country === e && (a += s[0] - i.getTutengHp(t)), {
                    country: e, num: Math.floor(a / i.tutengMaxHp * 100)
                };
            }).filter(function (t) {
                return t.num > 0;
            }).map(function (t) {
                var e = StringUtil.htmlFontColor(Tools.getMsgById("country_" + t.country), a[t.country]);
                return Tools.getMsgById("xyz2_text041", [e, t.num + "%"]);
            });
        (s[3] || []).forEach(function (t) {
            var n = StringUtil.htmlFontColor(Tools.getMsgById("country_" + t[3]), a[t[3]]), h = Math.floor(t[4] / i.tutengMaxHp * 100);
            l.push(Tools.getMsgById("xyz2_text042", [n, h + "%"]));
        });
        var c = ModelManager.instance.modelUser.country;
        return l.push(Tools.getMsgById(n.faithCountry === c ? "xyz2_text043_1" : "xyz2_text043", this.cfg.tuteng_hp.slice(1))),
            l.join("<br/>");
    }

    public showTutengHpHistory(t: any): void {
        var s = t.getName(),
            n = this._getTutengHpHistory(t.cityId);
        ViewManager.instance.showTipsPanel(n, {
            titleAlign: "center", width: 500
        }, s);
    }

    public getCountryMp(t: any): any {
        if (!(this.cfg && this.cfg.xyz2_buffs && this.modelPvp.isOpen && this.country_mp)) return 0;
        var s = this.cfg.xyz2_buffs.country_mp,
            n = this.country_mp.mp[t],
            h = 1e3 * this.country_mp.t;
        return n += Math.floor((ConfigServer.getServerTimer() - h) / (1e3 * s[2])) * s[3],
            Math.min(n, this.maxMp);
    }

    public getBuffId(t: any): any {
        if (!this.cfg || !this.cfg.xyz2_buffs || !this.modelPvp.isOpen) return "";
        var s = MapModel.instance.citys[t],
            n = ModelManager.instance.modelUser.country,
            h = ModelManager.instance.modelUser.mUID,
            o = ModelOfficial.getOfficersByID(n, h);
        if (-1 === this.cfg.xyz2_buffs.permission.indexOf(o)) return "";
        var r = this.cfg.xyz2_buffs.buff;
        for (var a in r) {
            var l = r[a].available;
            if ((!r[a].no_faith || s.faithCountry !== n) && -1 !== l.indexOf(t)) return a;
        }
        return "";
    }

    public getBuffCfg(t: any): any {
        return this.cfg && this.cfg.xyz2_buffs ? this.cfg.xyz2_buffs.buff[t] : null;
    }

    public useBuff(t: any): void {
        var s = this.getBuffId(t),
            n = this.getBuffCfg(s);
        if (this.getCountryMp(ModelManager.instance.modelUser.country) < n.consume_mp) return ViewManager.instance.showTipsTxt(Tools.getMsgById("xyz2_text048"));
        MapModel.instance.citys[t].event("show_effect", n.buff_res),
            this.sendMethod("w.release_shence_skill", {
                bid: s, cid: t
            });
    }

    public _pushShenceKill(t: any): void {
        this.sendCB(t);
        var s = t.receiveData.data;
        s[1] === "sc1" ? this.shenceData.push(s) : (this.shenceData = this.shenceData.concat(s), s.forEach(function (t) {
            sg.fight.FightMain.receiveShenceKill(t[2]);
        })),
            this._showPushKill();
    }

    public _showPushKill(): void {
        var i = sg.view.countryPvp.ShenceKillPush.create();
        i.displayedInStage || ViewManager.instance.mLayerTop.addChild(i);
    }

    public mockTianhuo(): void {
        this.shenceData.push([[30000000110, "阿尔戈沃尔特", 0, "hero724"], "sc1", "-20", []]),
            this._showPushKill();
    }

    public mockTianlei(): void {
        var i = ArrayUtil.padding([], 101, "").map(function () {
            var e = "我如果笋干对战选择服务器钩行阵时烧肉然而说如果", s = Math.floor(Math.random() * (e.length - 6)), n = s + 2 + Math.floor(5 * Math.random());
            return [e.slice(s, n), 1, ["hero711", "hero716", "hero726"][Math.floor(3 * Math.random())]];
        });
        this.shenceData.push([[30000000110, "授人以渔而已", 2, "hero704"], "sc2", "-31", i]),
            this._showPushKill();
    }

    /* ---- r(0,a,name,getter) 实例 getter（原型访问器，无 setter） ---- */
    public get towerAvailable(): boolean {
        if (!this.modelPvp.isOpen) return !0;
        var i = ConfigServer.getServerTimer();
        return i < this.modelPvp.mSunrise || i > this.towerAvailableTime;
    }

    public get cfg(): any {
        return ConfigServer.country_pvp;
    }

    public get towerAvailableTime(): any {
        return this.modelPvp.mSunrise ? this.modelPvp.mSunrise + 1e3 * this.cfg.towerLockedTime : ConfigServer.getServerTimer() - 1;
    }

    public get maxMp(): any {
        return this.cfg && this.cfg.xyz2_buffs && this.country_mp ? this.cfg.xyz2_buffs.country_mp[1] : 0;
    }

    public get tutengMaxHp(): any {
        return this.cfg.tuteng_hp[0];
    }

    public static SHENCE_TIANHUO: string = "sc1";
    public static SHENCE_TIANLEI: string = "sc2";
}

/**
 * 注册身份等价物：原文 o(h,"sg.model.ModelXYZ2",i)（i=As=sg.model.ViewModelBase）。
 * base 传 null：tsc extends 已建原型链，注册仅重放命名空间挂载身份（batch-a-report
 * 「注册等价决策」，同 ModelGame/ModelItem）。
 */
Laya.class(ModelXYZ2, "sg.model.ModelXYZ2", null, null);
