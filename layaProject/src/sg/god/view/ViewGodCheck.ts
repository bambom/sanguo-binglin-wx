/**
 * sg.god.view.ViewGodCheck —— 神灵管理主面板（筛选/排序/批量回收模式/装载/卸载）。
 *
 * 原文：code1.js 字节 [6121060,6130014)（8954B；包装变量 d5，基类 GP=ui.god.godCheckUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodCheck",t)，off 6122077；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodCheck.js
 *
 * 依赖：P=Handler、cs=ObjectUtil、vs=Tools、us=SaveLocal、ue=ModelManager、tn=ViewManager、
 * be=TestUtils、re=AssetsManager、le=EffectManager、as=MusicManager、Ze=ArrayUtil、Gt=ConfigServer、
 * Ht=ConfigClass（均批次 A–F 已译）；bo=ModelGodMain、Wi=ModelGodIcon、$s=ModelWilderness、
 * Fh=ModelPolice、Gi=ModelGod（ambient）；nO=sg.god.components.GodIcon（批次 S 在译，值引用）；
 * u5/l5/g5/b5=ViewGodBook/ViewChooseByWuxing/ViewGodRecovery/ViewGodSortBy（本批互引）。
 * sg.view.ViewPanel.prototype.getSpriteByName —— 原文即字面全局路径直引已译基座（oracle 1:1；
 * 类型面由 sg-externals-u.d.ts 的 ViewPanel 最小类面 + 调用点 <any> 断言桥接，断言 emit 擦除）。
 * getset：r(0,e,"currGod",getter,setter) → TS get/set；静态 4 项（CHECK_MODE/inRecovery/
 * showProp/showInborn + KEY_RED_POINT）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { SaveLocal } from "../../utils/SaveLocal";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewGodBook } from "./ViewGodBook";
import { ViewChooseByWuxing } from "./ViewChooseByWuxing";
import { ViewGodRecovery } from "./ViewGodRecovery";
import { ViewGodSortBy } from "./ViewGodSortBy";
import { ViewChooseByType } from "./ViewChooseByType";

export class ViewGodCheck extends ui.god.godCheckUI {

    public hid: string = "";
    public _currGod: any = null;
    public _selectIndex: number = -1;
    public _filtered: boolean = !1;
    public sortData: any = { key: "", bigFirst: !0 };
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0003")),
            this.btn_lock.on("click", this, this._onClickLock),
            this.btn_book.on("click", this, this._onClickBook),
            this.btn_wuxing.on("click", this, this._onClickWuxing),
            this.btn_type.on("click", this, this._onClickType),
            this.btn_sort.on("click", this, this._onClickSort),
            this.btn_help.on("click", this, this._onClickHelp),
            this.btn_type.label = Tools.getMsgById("_beast_text3"),
            this.btn_type.visible = !1,
            this.btn_detail.on("click", this, this._onClickDetail),
            this.btn_install.on("click", this, this._onClickInstall),
            this.btn_recovery.on("click", this, this._onClickRecovery),
            this.btn_selectAll.label = Tools.getMsgById("god_0085"),
            this.btn_selectAll.on("click", this, this._onClickSelectAll),
            this.btn_selectAll2.mouseEnabled = !1,
            this.list.itemRender = sg.god.components.GodIcon,
            this.list.mouseHandler = new Handler(this, this._onClickItem),
            this.list.scrollBar.hide = !0;
    }

    public onAdded(): void {
        this.currArg ? (this.hid = this.currArg.hid,
            this.hid ? this.currGod = ModelManager.instance.modelGame.getModelHero(this.hid).godModel
                : this.currGod = this.currArg.god) : (this.hid = "", this.currGod = null),
            this._resetFilter(),
            this._sortBy(),
            this.model.on("update_ui", this, this._refreshList),
            this._changeCheckMode(!1),
            this.model.on(ViewGodCheck.CHECK_MODE, this, this._changeCheckMode);
    }

    public _onClickItem(t: any, e: any): void {
        if ("click" === t.type) {
            var s = this.list.array[e];
            if (ViewGodCheck.inRecovery) this._checkGod(s);
            else {
                var n = s.god;
                this.currGod === n ? this._showDetail() : this._chooseGod(n);
            }
        }
    }

    public _checkGod(t: any): any {
        var i = t.god;
        return i.hid ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0014"))
            : i.lock ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0015"))
                : i.lv > 1 || i.state > 0 ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0016"))
                    : sg.activities.model.ModelPolice.instance.cityUseGod(i.id) ? ViewManager.instance.showTipsTxt(Tools.getMsgById("gods42"))
                        : (t.checked = !t.checked, void this._refreshCheckedGods());
    }

    public _refreshList(t?: any): void {
        var e = this;
        if (!t) {
            var s = this.list.array.map(function (t: any) { return t.god.id });
            t = this.model.getModelsById(s);
        }
        var n: any = SaveLocal.getValue(ViewGodCheck.KEY_RED_POINT) || [];
        if (this.list.array = t.map(function (t: any) {
            var i = new sg.god.model.ModelGodIcon(t);
            return i.showLock = !0,
                i.hid = e.hid,
                i.red = -1 !== n.indexOf(i.god.id),
                e._initGodIcon(i),
                i;
        }),
            this._resizeList(),
            !ViewGodCheck.inRecovery) {
            var h = this.model.getModels();
            if (0 === h.length) return this.closeSelf();
            var o = this.currGod && -1 !== h.indexOf(this.currGod) ? this.currGod : h[0];
            this._chooseGod(o);
        }
    }

    public _initGodIcon(t: any): void {
        t.canClick = !1,
            ViewGodCheck.inRecovery ? (t.canCheck = !0, t.checked = !1, t.showProp = t.showInborn = !0)
                : (t.canCheck = t.checked = !1, t.showProp = ViewGodCheck.showProp, t.showInborn = ViewGodCheck.showInborn);
    }

    public _chooseGod(t?: any): void {
        var e = this;
        this.currGod = t || this.currGod,
            this.btn_lock.skin = AssetsManager.getAssetsUI(this.currGod.lock ? "btn_suo.png" : "btn_suo1.png");
        var s: any = SaveLocal.getValue(ViewGodCheck.KEY_RED_POINT) || [];
        -1 === s.indexOf(this._currGod.id) && (s.push(this._currGod.id), SaveLocal.save(ViewGodCheck.KEY_RED_POINT, s)),
            this.list.array.forEach(function (t: any) {
                t.red = -1 === s.indexOf(t.god.id),
                    t.selected = t.god === e.currGod;
            }),
            this.list.refresh();
    }

    public _onClickLock(): void {
        this.model.godChangeLock(this.currGod.id, !this.currGod.lock);
    }

    public _onClickBook(): void {
        ViewManager.instance.showView(["ViewGodBook", ViewGodBook]);
    }

    public _onClickRecovery(): void {
        if (this.btn_recovery.gray) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0070"));
        this.model.event(ViewGodCheck.CHECK_MODE, !ViewGodCheck.inRecovery);
    }

    public _onClickSelectAll(): void {
        var t = this.btn_selectAll2.selected;
        if (!t && 0 === this.list.array.filter(function (t: any) { return t.god.canRecovery }).length)
            return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0071"));
        this._onSelectAll(!t);
    }

    public _onSelectAll(t: any): void {
        this.btn_selectAll.selected = this.btn_selectAll2.selected = t,
            this.list.array.forEach(function (i: any) {
                i.checked = i.god.canRecovery && t;
            }),
            this._refreshCheckedGods();
    }

    public _refreshCheckedGods(): void {
        if (ViewGodCheck.inRecovery) {
            this.list.refresh();
            var t = this.list.array.filter(function (t: any) { return t.checked }).length;
            this.txt_godNum.text = Tools.getMsgById("_public73", [t]),
                this.btn_selectAll.selected = this.btn_selectAll2.selected = t > 0 && this.list.array.filter(function (t: any) { return t.god.canRecovery }).length === t;
        }
    }

    public _resizeList(): void {
        var t = this.list.cells[0];
        if (t) {
            var e = t.height,
                s = ViewGodCheck.inRecovery || ViewGodCheck.showInborn ? 10 : 10 - t.box_inborn.height;
            this.list.spaceY !== s && (this.list.spaceY = s,
                this.list.repeatY = Math.ceil(this.list.height / (e + this.list.spaceY)),
                this.list.refresh()),
                this.callLater(this._locateGod);
        }
    }

    public _locateGod(): void {
        var t = this,
            e = 0;
        this.currGod && (e = ArrayUtil.findIndex(this.list.array, function (i: any) { return i.god === t.currGod }) || 0),
            this.list.scrollTo(ViewGodCheck.inRecovery ? 0 : e);
    }

    public _changeCheckMode(t: any): void {
        ViewGodCheck.inRecovery = t,
            this.list.array.forEach(this._initGodIcon),
            this.box_selectAll.visible = ViewGodCheck.inRecovery,
            this.btn_selectAll.selected = this.btn_selectAll2.selected = !1,
            ViewGodCheck.inRecovery ? (this.txt_godNum.text = Tools.getMsgById("_public73", [0]),
                this.btn_book.visible = this.btn_lock.visible = !1,
                Tools.textFitFontSize(this.btn_recovery, Tools.getMsgById("_star_text30")),
                Tools.textFitFontSize(this.btn_detail, Tools.getMsgById("_star_text29")),
                this.btn_install.visible = !1)
                : (this.txt_godNum.text = "",
                    this.btn_book.visible = this.btn_lock.visible = !0,
                    Tools.textFitFontSize(this.btn_recovery, Tools.getMsgById("god_0011")),
                    this.btn_recovery.gray = 0 === sg.kunlun.model.ModelWilderness.instance.gethookOnTime(),
                    this._chooseGod(),
                    Tools.textFitFontSize(this.btn_detail, Tools.getMsgById("god_0058"))),
            this._resizeList();
    }

    public _onClickInstall(): void {
        var t = this;
        if (this.hid) {
            if (!this.currGod.hid) return this._install();
            if (this.currGod.hid !== this.hid) {
                var i = ModelManager.instance.modelGame.getModelHero(this.currGod.hid);
                ViewManager.instance.showAlert(Tools.getMsgById("god_0067", [this.currGod.name, i.getName()]), function (i: any) { 0 == i && t._install() });
            } else this.model.godUninstall(this.hid, Handler.create(this, function () { }));
        }
    }

    public _onClickDetail(): void {
        if (ViewGodCheck.inRecovery) {
            var t = this.list.array.filter(function (t: any) { return t.checked }).map(function (t: any) { return t.god });
            if (!t.length) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0018"));
            ViewManager.instance.showView(["ViewGodRecovery", ViewGodRecovery], t);
        } else this._showDetail();
    }

    public _showDetail(): void {
        var t = this.list.array.map(function (t: any) { return t.god });
        ViewManager.instance.showView(ConfigClass.VIEW_GOD_DETAIL, { hid: this.hid, index: t.indexOf(this.currGod), allGods: t });
    }

    public _install(): void {
        var t = this;
        this.model.godInstall(this.hid, this.currGod.id, Handler.create(this, function () {
            var i = t.list.cells.filter(function (i: any) { return i.god && i.god.id === t.currGod.id })[0];
            i && EffectManager.addEffectToSprite(i, "glow031_1", null, "", 1),
                MusicManager.playSoundUI("god_level_up");
        }));
    }

    public _resetFilter(): void {
        this._filtered = !1,
            this.btn_wuxing.label = Tools.getMsgById("god_0061"),
            this._refreshList(this.model.getModels()),
            this._sort();
    }

    public _onClickWuxing(): void {
        var t = this;
        if (this._onSelectAll(!1), this._filtered) return this._resetFilter();
        ViewManager.instance.showView(["ViewChooseByWuxing", ViewChooseByWuxing], {
            handler: Handler.create(this, function (i: any) {
                t._filtered = !0,
                    t.btn_wuxing.label = Tools.getMsgById("god_0062", [(<any>sg.god.model.ModelGod).getElementName(i)]),
                    t._refreshList(t.model.getModelsByWuxing(i)),
                    t._sort();
            })
        });
    }

    public _onClickType(): void {
        var t = this;
        ViewManager.instance.showView(["ViewChooseByType", ViewChooseByType], {
            handler: Handler.create(this, function (i: any) {
                t._refreshList(t.model.getModelsByType(i)),
                    t._sort();
            })
        });
    }

    public _onClickSort(): void {
        ViewManager.instance.showView(["ViewGodSort", ViewGodSortBy], { key: this.sortData.key, bigFirst: this.sortData.bigFirst, handler: Handler.create(this, this._sortBy) });
    }

    public _sortBy(t?: any, i?: any): void {
        void 0 === t && (t = ""),
            void 0 === i && (i = !0),
            "" === t || this.sortData.key === t && this.sortData.bigFirst === i ? (t = "lv", i = !0, this.btn_sort.label = Tools.getMsgById("god_0013"))
                : this.btn_sort.label = ArrayUtil.find(ViewGodSortBy.mData, function (e: any) { return e.key === t && e.bigFirst === i }).text,
            this.sortData.key = t,
            this.sortData.bigFirst = i,
            this._sort();
    }

    public _sort(): void {
        var t = this.sortData.key,
            i = this.sortData.bigFirst;
        this.list.array.sort(function (e: any, s: any) {
            return (e.god[t] - s.god[t]) * (i ? -1 : 1) || s.god.index - e.god.index;
        }),
            this.list.refresh(),
            this.list.scrollTo(0);
    }

    public _onClickHelp(): void {
        ViewManager.instance.showTipsPanel(Tools.getMsgById("god_0066"));
    }

    public onRemoved(): void {
        this._selectIndex = -1,
            ViewGodCheck.inRecovery = !1,
            this.model.off(ViewGodCheck.CHECK_MODE, this, this._changeCheckMode);
    }

    public getSpriteByName(t: any): any {
        var i: any = /(.+)_(\d+)/;
        if (i.test(t)) {
            var e = t.match(i),
                s = this[e[1]],
                n = parseFloat(e[2]);
            if (s && "number" == typeof n) {
                var h = s.list.getCell(n);
                if (h) return h.box;
            }
        }
        return (<any>sg.view.ViewPanel.prototype).getSpriteByName.call(this, t);
    }

    /** r(0,e,"currGod",getter,setter) —— getset 直译（求值序等价，批次 K 定案） */
    public get currGod(): any {
        return this._currGod;
    }
    public set currGod(t: any) {
        if (this._currGod = t, t) {
            var i = new sg.god.model.ModelGodIcon(this.currGod);
            i.showLock = !0,
                i.showName = !1,
                this.icon_god.dataSource = i,
                this.comName.setUI(this.currGod),
                this.comScore.setNum(this.currGod.score),
                this.comGstr.setNum(this.currGod.gstr),
                this.comGagi.setNum(this.currGod.gagi),
                this.skillList.dataSource = this._currGod,
                this.hid ? (this.btn_install.visible = !0,
                    Tools.textFitFontSize(this.btn_install, Tools.getMsgById(this.currGod.hid !== this.hid ? "god_0077" : "god_0049")),
                    this.btn_install.skin = AssetsManager.getAssetsUI(this.currGod.hid !== this.hid ? "btn_ok.png" : "btn_no_s2.png"))
                    : this.btn_install.visible = !1;
        }
    }

    public static CHECK_MODE: string = "check_mode";
    public static inRecovery: boolean = !1;
    public static showProp: boolean = !1;
    public static showInborn: boolean = !1;
    public static KEY_RED_POINT: string = "god_check_red_point";
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodCheck",t)（t=GP=ui.god.godCheckUI）。
 */
Laya.class(ViewGodCheck, "sg.god.view.ViewGodCheck", null, null);
