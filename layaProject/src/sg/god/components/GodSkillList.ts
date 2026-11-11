/**
 * sg.god.components.GodSkillList —— 神灵技能列表（ctor 装配 list 滚动/渲染/鼠标
 * Handler 与左右翻页按钮；_setUI 按 skills/lockedNum 映射 array；_onClickItem 打开
 * ViewGodSkill 技能详情；dataSource setter 派发 _setUI）。
 *
 * 原文：code1.js 字节 [4361754,4363069]（1,315B；包装变量 vO，基类 ip=ui.god.godSkillListUI
 * （IDE 生成 shell，未译，[3548076,3548378)），明文 3 参注册
 * o(i,"sg.god.components.GodSkillList",t)，off 4362081；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodSkillList.js
 *
 * 批次 S：sg.god.components 家族第 13 类。
 * 依赖（模块直引，已译）：P=laya.utils.Handler（引擎）、pO=GodSkillItem（本批次类直引，
 * list.itemRender 类值）、tn=ViewManager、vs=Tools；
 * 批次外（ambient 全局路径，延迟调用）：p5=sg.god.view.ViewGodSkill（showView 类值，
 * ambient 见 sg-externals-s.d.ts）。
 * 构造顺序：原文 model 字段先于 __super.call，其后 list 装配链；tsc 强制 super() 先行
 * （纯预置 null，super 链（loadUI 建 list）不观察；装配链仍后置，位移等价先例）。
 */
import Handler = laya.utils.Handler;
import { GodSkillItem } from "./GodSkillItem";
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";

export class GodSkillList extends ui.god.godSkillListUI {

    public model: any = null;

    constructor() {
        super();
        this.list.scrollBar.changeHandler = new Handler(this, this._onScrollChange),
            this.list.scrollBar.hide = !0,
            this.list.itemRender = GodSkillItem,
            this.list.mouseHandler = new Handler(this, this._onClickItem),
            this.btn_l.on("click", this, this._tweenTo, [-1]),
            this.btn_r.on("click", this, this._tweenTo, [1]);
    }

    public _setUI(): void {
        var t: any = this, i = this.model.skills.length - this.model.lockedNum;
        this.list.array = this.model.skills.map(function (e: any, s: any) {
            if (e) return { red: e.itemEnough, skill: e };
            var n: any = s >= i;
            return { red: !n && t.model.canLearnNewSkill, locked: n };
        }),
            this.list.scrollTo(0),
            this._onScrollChange(0);
    }

    public _tweenTo(t: any): void {
        this.list.tweenTo(this.list.startIndex + t);
    }

    public _onScrollChange(t: any): void {
        var i: any = this.list.array ? this.list.array.length : 0;
        this.btn_l.visible = i > this.list.repeatX && this.list.startIndex > 0,
            this.btn_r.visible = i > this.list.repeatX && this.list.startIndex < i - this.list.repeatX;
    }

    public _onClickItem(t: any): void {
        if ("click" === t.type) {
            var i: any = t.currentTarget;
            if (i.locked) ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0047", [this.model.skillUnlockLv]));
            else {
                var e: any = this.model, s: any = i.model;
                ViewManager.instance.showView(["ViewGodSkill", sg.god.view.ViewGodSkill], [e, s]);
            }
        }
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— 基链标记 getter 直译 */
    public get dataSource(): any {
        return (<any>ui.god.godSkillListUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        t && (this.model = this._dataSource = t, this._setUI());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodSkillList",t)（明文 3 参，
 * t=ip=ui.god.godSkillListUI）。base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodSkillList, "sg.god.components.GodSkillList", null, null);
