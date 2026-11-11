/**
 * sg.god.view.ViewGodSkillTips —— 神灵技能道具说明浮层。
 *
 * 原文：code1.js 字节 [6150153,6150866)（713B；包装变量 y5，基类 JP=ui.god.godSkillTipsUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewGodSkillTips",t)，off 6150278；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewGodSkillTips.js
 *
 * 依赖：vs=Tools、gs=StringUtil、be=TestUtils、ae=ColorManager（import 直引，oracle 别名形态
 * ae.getUIColor 对齐）、yr=ModelItem、tn=ViewManager、Ht=ConfigClass（批次 A–F 已译）；
 * zi=sg.god.model.ModelGodSkill（静态面，ambient）。
 */
import { Tools } from "../../utils/Tools";
import { StringUtil } from "../../utils/StringUtil";
import { TestUtils } from "../../map/utils/TestUtils";
import { ViewManager } from "../../manager/ViewManager";
import { ColorManager } from "../../manager/ColorManager";
import { ConfigClass } from "../../cfg/ConfigClass";
import { ModelItem } from "../../model/ModelItem";

export class ViewGodSkillTips extends ui.god.godSkillTipsUI {

    public itemId: any = null;

    constructor() {
        super();
        this.txt_info.style.fontSize = 16,
            this.txt_info.style.leading = 8;
    }

    public onAdded(): void {
        this.itemId = this.currArg;
        var t = sg.god.model.ModelGodSkill.getSkillByItemId(this.itemId);
        this.icon.dataSource = t,
            this.icon.box.gray = !1,
            this.txt_name.text = ModelItem.getItemName(this.itemId) + (TestUtils.isTestShow ? " " + this.itemId : ""),
            this.txt_type.text = sg.god.model.ModelGodSkill.getGodSkillNatureName(t.nature, !0),
            this.txt_num.text = Tools.getMsgById("_public18", [ModelItem.getMyItemNum(t.item)]);
        var i = ColorManager.getUIColor("godSkillCurrValue");
        this.txt_info.innerHTML = StringUtil.formatHtml(sg.god.model.ModelGodSkill.getLvInfo(t.id, 1), i);
    }

    public _showSource(): void {
        ViewManager.instance.showView(ConfigClass.VIEW_BAG_SOURSE, this.itemId);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewGodSkillTips",t)（t=JP=ui.god.godSkillTipsUI）。
 */
Laya.class(ViewGodSkillTips, "sg.god.view.ViewGodSkillTips", null, null);
