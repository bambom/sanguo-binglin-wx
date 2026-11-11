/**
 * sg.god.components.GodStr —— 神灵“神略”数值条组件（结构同 GodAgi，换
 * bar_sl_sl.png/god_gstr/godGstr 皮肤串；两次 textWidth 丢弃求值测量保留）。
 *
 * 原文：code1.js 字节 [4358423,4358978]（555B；包装变量 dO，基类 zf=ui.god.godPropUI
 * （IDE 生成 shell，未译，[3544683,3544917)，与 GodAgi 同基），明文 3 参注册
 * o(i,"sg.god.components.GodStr",t)，off 4358505；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodStr.js
 *
 * 批次 S：sg.god.components 家族第 7 类。
 * 依赖（模块直引，已译）：tn=ViewManager、vs=Tools、re=AssetsManager、gs=StringUtil、
 * ae=ColorManager。
 */
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { StringUtil } from "../../utils/StringUtil";
import { ColorManager } from "../../manager/ColorManager";

export class GodStr extends ui.god.godPropUI {

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public _onClick(): void {
        ViewManager.instance.showTipsPanel(Tools.getMsgById("god_0080"), { width: 520 });
    }

    public setNum(t: any): void {
        this.img.skin = AssetsManager.getAssetLater("bar_sl_sl.png"),
            this.txt_name.text = Tools.getMsgById("god_gstr");
        this.txt_name.textField.textWidth;
        this.txt_name.text = t + "";
        this.txt_name.textField.textWidth;
        var i: any = StringUtil.repeat(" ", 2);
        this.txt_name.text = Tools.getMsgById("god_gstr") + i + t,
            this.txt_name.color = ColorManager.getUIColor("godGstr");
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodStr",t)（明文 3 参，t=zf=ui.god.godPropUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodStr, "sg.god.components.GodStr", null, null);
