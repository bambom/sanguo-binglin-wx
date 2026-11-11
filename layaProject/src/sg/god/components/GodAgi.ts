/**
 * sg.god.components.GodAgi —— 神灵“神威”数值条组件（点击弹 god_0080 说明面板；
 * setNum 按两次 textWidth 丢弃求值测量后以双空格拼接数值染色）。
 *
 * 原文：code1.js 字节 [4347192,4347747]（555B；包装变量 ZH，基类 zf=ui.god.godPropUI
 * （IDE 生成 shell，未译，[3544683,3544917)，链 e_=sg.view.com.ItemBase←…←laya.ui.View），
 * 明文 3 参注册 o(i,"sg.god.components.GodAgi",t)，off 4347274；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodAgi.js
 *
 * 批次 S：sg.god.components 家族 14 类连续簇首类。
 * 依赖（模块直引，已译）：tn=ViewManager、vs=Tools、re=AssetsManager、gs=StringUtil、
 * ae=ColorManager；基类经 sg-externals-s.d.ts ambient ui.god.godPropUI（extends 类型层
 * 取 laya.ui.View 终段近似，运行时全局 ui.god 值由 shell 批次装载）。
 */
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { StringUtil } from "../../utils/StringUtil";
import { ColorManager } from "../../manager/ColorManager";

export class GodAgi extends ui.god.godPropUI {

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public _onClick(): void {
        ViewManager.instance.showTipsPanel(Tools.getMsgById("god_0080"), { width: 520 });
    }

    public setNum(t: any): void {
        this.img.skin = AssetsManager.getAssetLater("bar_sl_ss.png"),
            this.txt_name.text = Tools.getMsgById("god_gagi");
        this.txt_name.textField.textWidth;
        this.txt_name.text = t + "";
        this.txt_name.textField.textWidth;
        var i: any = StringUtil.repeat(" ", 2);
        this.txt_name.text = Tools.getMsgById("god_gagi") + i + t,
            this.txt_name.color = ColorManager.getUIColor("godGagi");
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodAgi",t)（明文 3 参，t=zf=ui.god.godPropUI）。
 * TS extends 提供原型链；base 传 null（Laya.__extend 会整体重置 tsc 已挂接的原型方法，
 * 见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」）。
 */
Laya.class(GodAgi, "sg.god.components.GodAgi", null, null);
