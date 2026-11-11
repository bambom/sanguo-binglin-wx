/**
 * sg.god.view.ViewGodBook —— 神灵图鉴（五行页签 + 图鉴红点 + 换神列表）。
 *
 * 原文：code1.js 字节 [6118918,6121052)（2134B；包装变量 u5，基类 OP=ui.god.godBookUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodBook",t)，off 6119390；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodBook.js
 *
 * 依赖：P=laya.utils.Handler、cs=ObjectUtil、vs=Tools、us=SaveLocal、ue=ModelManager、
 * Gt=ConfigServer（批次 A/B 已译）；bo=sg.god.model.ModelGodMain、Wi=sg.god.model.ModelGodIcon、
 * Gi=sg.god.model.ModelGod（ambient；getElementName/newGod 静态面）、uO=sg.god.components.GodIconS
 * （批次 S 在译，itemRender 值引用）。
 * getset：r(0,e,"currGod",getter,setter) → TS get/set 访问器（批次 K 语义定案）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { Tools } from "../../utils/Tools";
import { SaveLocal } from "../../utils/SaveLocal";
import { ModelManager } from "../../manager/ModelManager";
import { ConfigServer } from "../../cfg/ConfigServer";

export class ViewGodBook extends ui.god.godBookUI {

    public _newGods: any = {};
    public _currGod: any = null;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0004")),
            this.tab.labels = [0, 1, 2, 3, 4].map((<any>sg.god.model.ModelGod).getElementName).join(),
            this.tab.selectHandler = new Handler(this, this._onSelect),
            this.list.itemRender = sg.god.components.GodIconS,
            this.list.mouseHandler = new Handler(this, this._onClickItem),
            this.list.scrollBar.hide = !0,
            this.comType.visible = !1,
            this.godItem.offAll("click"),
            this.godItem.on("click", this, this._showTalent);
    }

    public onAdded(): void {
        this.tab.selectedIndex = 0,
            this._chooseGod(this.list.array[0].god);
    }

    public _onSelect(t: any): void {
        for (var i: any = ConfigServer.god.god,
            e = ObjectUtil.keys(i).filter(function (e: any) { return 1 === i[e].book && i[e].element === t }).sort(function (t: any, e: any) { return i[t].index - i[e].index }),
            s = [],
            n = e.length,
            h = 0; h < n; ++h) {
            var o = e[h];
            s.push(this._getNewGod(o));
            var r: any = ModelManager.instance.modelUser.god_change_unlock[o] || [];
            r.sort(function (t: any, i: any) { return t - i });
            for (var a = 0; a < r.length; ++a) {
                var l = r[a];
                s.push(this._getNewGod(o, l));
            }
        }
        this._refreshList(s);
    }

    public _getNewGod(t: any, i?: any): any {
        void 0 === i && (i = 0);
        var e = t + "_" + i;
        return this._newGods[e] || (this._newGods[e] = sg.god.model.ModelGod.newGod({ type: t, change: i })),
            this._newGods[e];
    }

    public _onClickItem(t: any, i: any): void {
        if ("click" === t.type) {
            var e = this.list.array[i].god;
            this._chooseGod(e);
        }
    }

    public _chooseGod(t?: any): void {
        var e = this;
        this.currGod = t || this.currGod;
        var s: any = SaveLocal.getValue(ViewGodBook.KEY_RED_POINT) || [];
        this.currGod && -1 === s.indexOf(this.currGod.aniId) && (s.push(this.currGod.aniId), SaveLocal.save(ViewGodBook.KEY_RED_POINT, s)),
            this.list.array.forEach(function (t: any) {
                t.red = -1 === s.indexOf(t.god.aniId),
                    t.selected = t.god === e.currGod;
            }),
            this.list.refresh();
    }

    public _refreshList(t: any): void {
        var e: any = SaveLocal.getValue(ViewGodBook.KEY_RED_POINT) || [];
        this.list.array = t.map(function (t: any) {
            var i = new sg.god.model.ModelGodIcon(t);
            return i.red = -1 === e.indexOf(i.god.aniId),
                i.canClick = !1,
                i;
        }),
            this._chooseGod();
    }

    public _showTalent(): void {
        this.currGod.showInfo(!0);
    }

    public onRemoved(): void {
        this.tab.selectedIndex = -1;
    }

    /** r(0,e,"currGod",getter,setter) —— getset 直译（求值序等价，批次 K 定案） */
    public get currGod(): any {
        return this._currGod;
    }
    public set currGod(t: any) {
        t && (this._currGod = t,
            this.comType.setUI(this.currGod),
            this.comName.setUI(this.currGod),
            this.godItem.dataSource = this.currGod);
    }

    public static KEY_RED_POINT: string = "god_book_red_point";
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodBook",t)（t=OP=ui.god.godBookUI）。
 */
Laya.class(ViewGodBook, "sg.god.view.ViewGodBook", null, null);
