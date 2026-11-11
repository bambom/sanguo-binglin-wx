/**
 * sg.god.view.ViewGodSkill —— 神灵技能面板（五行页签/学习/升级/遗忘，消耗校验与红点）。
 *
 * 原文：code1.js 字节 [6143102,6149024)（5922B；包装变量 p5，基类 KP=ui.god.godSkillUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodSkill",t)，注册点 off 6144254；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodSkill.js
 *
 * 依赖：P=Handler、vs=Tools、ue=ModelManager、tn=ViewManager、be=TestUtils、re=AssetsManager、
 * le=EffectManager、as=MusicManager、Ze=ArrayUtil、lr=ModelGame、yr=ModelItem（均批次 A–F 已译）；
 * bo=ModelGodMain、zi=sg.god.model.ModelGodSkill（静态面，ambient）；
 * pO=sg.god.components.GodSkillItem（批次 S 在译，值引用）；v5=ViewGodSkillDelete（本批互引）。
 * getset：r(0,e,"currSkill",null,setter) —— getter 为 null 的 setter-only（ModelGuide.lockScreen
 * 同款，批次 K/Q 定案）。
 */
import Handler = laya.utils.Handler;
import { Tools } from "../../utils/Tools";
import { ModelManager } from "../../manager/ModelManager";
import { ViewManager } from "../../manager/ViewManager";
import { TestUtils } from "../../map/utils/TestUtils";
import { AssetsManager } from "../../manager/AssetsManager";
import { EffectManager } from "../../manager/EffectManager";
import { MusicManager } from "../../utils/MusicManager";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { ModelGame } from "../../model/ModelGame";
import { ModelItem } from "../../model/ModelItem";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ViewGodSkillDelete } from "./ViewGodSkillDelete";

export class ViewGodSkill extends ui.god.godSkillUI {

    public modelGod: any = null;
    public _skills: any = null;
    public _currSkill: any = null;
    public costItemNum: number = 0;
    public myItemNum: number = 0;
    public costGoldNum: number = 0;
    public myGoldNum: number = 0;
    public tabData: any[] = [
        { label: "" },
        { label: Tools.getMsgById("god_skill_nature_0"), nature: 0 },
        { label: Tools.getMsgById("god_skill_nature_1"), nature: 1 },
        { label: Tools.getMsgById("god_skill_nature_2"), nature: 2 },
        { label: Tools.getMsgById("god_skill_nature_3"), nature: 3 }
    ];
    public learnNum: number = 0;
    public romanNums: any[] = ["Ⅰ", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"];
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.comTitle.setViewTitle(Tools.getMsgById("god_0042")),
            this.btn_forget.label = Tools.getMsgById("ViewSkillUpgrade_1"),
            this.tab.dataSource = this.tabData.map(function (t: any) { return t.label }),
            this.tab.selectHandler = new Handler(this, this._onSelectTab),
            this.list.scrollBar.hide = !0,
            this.list.itemRender = sg.god.components.GodSkillItem,
            this.list.mouseHandler = new Handler(this, this._onClickItem),
            this.btn_upgrade.on("click", this, this._onClickUpgrade),
            this.btn_forget.on("click", this, this._onClickForget),
            this.txt_info.style.fontSize = 18,
            this.txt_info.style.leading = 3,
            this.com_item.on("click", this, this._showSource),
            this.com_gold.on("click", this, this._onClickCost, ["gold"]),
            this.txt_state.visible = !1;
    }

    public _showSource(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_BAG_SOURSE, this._currSkill.item);
    }

    public _onClickCost(t: any): void {
        ViewManager.instance.showItemTips(t);
    }

    public initData(): void {
        this.modelGod = this.currArg[0],
            this._currSkill = this.currArg[1];
    }

    public onAdded(): void {
        if (this._refreshUI(),
            this.model.on("update_ui", this, this._refreshUI),
            this._currSkill) this.tab.selectedIndex = 0,
            this.currSkill = this._currSkill;
        else {
            for (var t,
                i = this._skills.filter(function (t: any) { return 0 === t.lv }).sort(function (t: any, i: any) { return t.nature - i.nature }),
                e = 0,
                s = i.length; e < s; ++e) {
                var n = i[e];
                if (0 === n.lv && n.itemEnough) {
                    t = n;
                    break;
                }
            }
            t || (t = i[0] || this._skills[0]),
                this.tab.selectedIndex = ArrayUtil.findIndex(this.tabData, function (i: any) { return i.nature === t.nature }),
                this.currSkill = t;
        }
    }

    public _refreshUI(): void {
        var t = this;
        this._skills = this.modelGod.skills.filter(function (t: any) { return t });
        var i = this._skills.map(function (t: any) { return t.id });
        this.learnNum = i.length;
        var e = sg.god.model.ModelGodSkill.allSkills;
        for (var s in e) -1 === i.indexOf(s) && this._skills.push(e[s]);
        if (this.tab.items.forEach(function (i: any, e: any) {
            0 === e && (i.label = Tools.getMsgById("god_0039", [[t.learnNum, t.modelGod.skills.length].join("/")]),
                i.disabled = 0 === t.learnNum);
            var s = t.tabData[e].nature,
                n = t.modelGod.canLearnNewSkill,
                h = t._skills.filter(function (t: any) { return !(t.nature !== s || !t.itemEnough) && (t.lv > 0 || n && 0 === t.lv) }).length > 0;
            ModelGame.redCheckOnce(i, h);
        }),
            !(this.tab.selectedIndex < 0)) {
            var n = this.tabData[this.tab.selectedIndex].nature,
                h = this._skills;
            h = "number" == typeof n ? this._skills.filter(function (t: any) { return t.nature === n }).sort(function (t: any, i: any) { return (t.lv ? t.index : 1e3 + t.index) - (i.lv ? i.index : 1e3 + i.index) })
                : this.modelGod.skills.filter(function (t: any) { return t }),
                this.list.array = h.map(function (i: any) {
                    var e = i.itemEnough;
                    return 0 === i.lv && (e = e && t.modelGod.canLearnNewSkill),
                        {
                            skill: i,
                            selected: t._currSkill === i,
                            red: e,
                            showName: !0
                        };
                }),
                this._currSkill && (this.currSkill = this._skills.filter(function (i: any) { return i.id === t._currSkill.id })[0]);
        }
    }

    public _onSelectTab(t: any): void {
        this._refreshUI();
    }

    public _onClickItem(t: any): void {
        if ("click" === t.type) {
            var i = t.currentTarget.dataSource.skill;
            this.currSkill = i;
        }
    }

    public _onClickUpgrade(t: any): void {
        var i = this;
        if (!this._currSkill.upgradeCost) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0045"));
        if (0 === this._currSkill.lv && this.modelGod.learnedNum >= this.modelGod.unlockedNum)
            return 0 === this.modelGod.lockedNum ? ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0046"))
                : ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0047", [this.modelGod.skillUnlockLv]));
        if (this.myItemNum < this.costItemNum) return ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName(this._currSkill.item)]));
        if (this.myGoldNum < this.costGoldNum) return ViewManager.instance.showTipsTxt(Tools.getMsgById("502067", [ModelItem.getItemName("gold")]));
        var e = this._currSkill.sindex;
        0 === this._currSkill.lv && (e = ArrayUtil.findIndex(this.modelGod.skills, function (t: any) { return null === t })),
            this.model.godSkillUpgrade(this.modelGod.id, this._currSkill.id, e, Handler.create(this, function () {
                EffectManager.addEffectToSprite(i.icon.box, "god_skill_up", null, "", 1),
                    MusicManager.playSoundUI("god_skill_up");
            }));
    }

    public _onClickForget(t: any): void {
        if (this._currSkill.inborn && this._currSkill.lv <= 1) return ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0041"));
        ViewManager.instance.showView(["ViewGodSkillDelete", ViewGodSkillDelete], this._currSkill);
    }

    public onRemoved(): void {
        this.model.off("update_ui", this, this._refreshUI);
    }

    /** r(0,e,"currSkill",null,setter) —— getter 为 null 的 setter-only getset（ModelGuide.lockScreen 同款，批次 K/Q 定案） */
    public set currSkill(t: any) {
        var i = this;
        this._currSkill = t,
            this.icon.dataSource = this._currSkill,
            this.icon.box.gray = !1,
            this.txt_name.text = sg.god.model.ModelGodSkill.getGodSkillName(this._currSkill.id) + this.romanNums[this._currSkill.lv] + (TestUtils.isTestShow ? this._currSkill.id : ""),
            this.txt_state.text = Tools.getMsgById("god_skill_level_" + this._currSkill.lv) || "",
            Tools.textFitFontSize2(this.txt_info, this._currSkill.info),
            this.btn_forget.visible = this._currSkill.lv >= 1,
            this._currSkill.god !== this.modelGod ? this.btn_upgrade.label = Tools.getMsgById("god_0043")
                : this.btn_upgrade.label = Tools.getMsgById("god_0044");
        var e = this._currSkill.upgradeCost,
            s = 0 === this._currSkill.lv && this.modelGod.learnedNum >= this.modelGod.unlockedNum;
        if (!e || s) this.com_item.visible = this.com_gold.visible = !1,
            this.btn_upgrade.gray = !0;
        else {
            var n = this._currSkill.item;
            this.costItemNum = e[0],
                this.myItemNum = ModelItem.getMyItemNum(n),
                this.costGoldNum = e[1],
                this.myGoldNum = ModelItem.getMyItemNum("gold"),
                this.com_item.visible = this.com_gold.visible = !0,
                this.btn_upgrade.gray = !1,
                this.com_item.setData(AssetsManager.getAssetItemOrPayByID(n), [Tools.textSytle(this.myItemNum), Tools.textSytle(this.costItemNum)].join("/")),
                this.com_gold.setData(AssetsManager.getAssetItemOrPayByID("gold"), [Tools.textSytle(this.myGoldNum), Tools.textSytle(this.costGoldNum)].join("/")),
                Tools.textFitFontSize(this.com_gold.mLabel);
        }
        this.list.array && (this.list.array.forEach(function (t: any) {
            var e = t.skill;
            t.selected = e === i._currSkill;
            var s = e.itemEnough;
            0 === e.lv && (s = s && i.modelGod.canLearnNewSkill),
                t.red = s;
        }),
            this.list.refresh());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodSkill",t)（t=KP=ui.god.godSkillUI）。
 */
Laya.class(ViewGodSkill, "sg.god.view.ViewGodSkill", null, null);
