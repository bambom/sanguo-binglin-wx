/**
 * sg.god.view.ViewGodSkillDelete —— 神灵技能遗忘确认（返还预览 + 确认链）。
 *
 * 原文：code1.js 字节 [6149032,6150145)（1113B；包装变量 v5，基类 QP=ui.god.godSkillDeleteUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodSkillDelete",t)，off 6149447；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodSkillDelete.js
 *
 * 依赖：P=Handler、vs=Tools、tn=ViewManager、yr=ModelItem（批次 A–F 已译）；
 * bo=ModelGodMain（ambient）。txt_Info 大小写原样（原文如此，非 txt_info）。
 */
import Handler = laya.utils.Handler;
import { Tools } from "../../utils/Tools";
import { ViewManager } from "../../manager/ViewManager";
import { ModelItem } from "../../model/ModelItem";

export class ViewGodSkillDelete extends ui.god.godSkillDeleteUI {

    public god: any = null;
    public godSkill: any = null;
    public mBackItems: any = null;
    public model: any;

    constructor() {
        super();
        this.model = sg.god.model.ModelGodMain.instance,
            this.btn_del.on("click", this, this._click),
            this.btn_del.label = Tools.getMsgById("ViewSkillUpgrade_1"),
            this.txt_title.text = Tools.getMsgById("ViewSkillUpgrade_1"),
            this.txt_back.text = Tools.getMsgById("god_0040"),
            this.txt_tips.text = Tools.getMsgById("god_0041"),
            this.com_cost.on("click", this, this._onClickCost);
    }

    public _onClickCost(): void {
        ViewManager.instance.showItemTips("coin");
    }

    public initData(): void {
        this.godSkill = this.currArg,
            this.god = this.godSkill.god;
        var t = this.godSkill.deleteReturn;
        this.icon_item.setData(this.godSkill.item, t[0], -1),
            this.icon_gold.setData("gold", t[1], -1),
            this.com_cost.setData(ModelItem.getIconUrl("coin"), this.godSkill.resetCost + ""),
            this.txt_Info.text = Tools.getMsgById("_skill3", [this.godSkill.lv, this.godSkill.name]);
    }

    public _click(): void {
        ViewManager.instance.showAlert(this.txt_Info.text, Handler.create(this, this._onClickOk));
    }

    public _onClickOk(t: any): void {
        0 === t && this.model.godSkillForget(this.god.id, this.godSkill.sindex, Handler.create(this, this.closeSelf));
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodSkillDelete",t)（t=QP=ui.god.godSkillDeleteUI）。
 */
Laya.class(ViewGodSkillDelete, "sg.god.view.ViewGodSkillDelete", null, null);
