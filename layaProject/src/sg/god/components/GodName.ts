/**
 * sg.god.components.GodName —— 神灵名条（setUI 名字自适应字号 + 状态色 + 元素名/元素色 +
 * 五行小图；测试开关追加 type/id 调试串）。
 *
 * 原文：code1.js 字节 [4359428,4359831]（403B；包装变量 mO，基类 $f=ui.god.godNameUI
 * （IDE 生成 shell，未译，[3546964,3547217)），明文 3 参注册——注意本类注册在 return
 * 序列首位 o(i,"sg.god.components.GodName",t)，原型方法后挂，off 4359481；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodName.js
 *
 * 批次 S：sg.god.components 家族第 9 类。
 * 依赖（模块直引，已译）：vs=Tools、be=TestUtils、le=EffectManager、re=AssetsManager、
 * uO=GodIconS（本批次类直引，WUXING_IMGS 静态）；
 * 批次外（ambient 全局路径，延迟调用）：Gi=sg.god.model.ModelGod（批次 R 在译；
 * getGodElementName/getElementColor 静态不在既有 ambient 面，调用点 cast）。
 */
import { Tools } from "../../utils/Tools";
import { TestUtils } from "../../map/utils/TestUtils";
import { EffectManager } from "../../manager/EffectManager";
import { AssetsManager } from "../../manager/AssetsManager";
import { GodIconS } from "./GodIconS";

export class GodName extends ui.god.godNameUI {

    constructor() {
        super();
    }

    public setUI(t: any): void {
        Tools.textFitFontSize(this.txt_name, t.name + (TestUtils.isTestShow ? " " + t.type + " id:" + t.id : "")),
            this.txt_name.color = EffectManager.getFontColor(t.state),
            this.txt_icon.text = (<any>sg.god.model.ModelGod).getGodElementName(t.type),
            this.txt_icon.color = (<any>sg.god.model.ModelGod).getElementColor(t.wuxing),
            this.img.skin = AssetsManager.getAssetLater(GodIconS.WUXING_IMGS[t.wuxing]);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodName",t)（明文 3 参，t=$f=ui.god.godNameUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodName, "sg.god.components.GodName", null, null);
