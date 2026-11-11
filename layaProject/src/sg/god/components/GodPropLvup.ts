/**
 * sg.god.components.GodPropLvup —— 神灵属性升级对比条（setUI 用三次 textWidth 测量
 * 空格宽并以 1/3 空格对齐 name1/name2 两列 +/- 数值）。
 *
 * 原文：code1.js 字节 [4359839,4360299]（460B；包装变量 gO，基类 Jf=ui.god.godPropLvupUI
 * （IDE 生成 shell，未译，[3547225,3547474)），明文 3 参注册
 * o(i,"sg.god.components.GodPropLvup",t)，off 4359892；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodPropLvup.js
 *
 * 批次 S：sg.god.components 家族第 10 类。
 * 依赖（模块直引，已译）：gs=StringUtil（repeat）；Math 全局。
 */
import { StringUtil } from "../../utils/StringUtil";

export class GodPropLvup extends ui.god.godPropLvupUI {

    constructor() {
        super();
    }

    public setUI(t: any, i: any, e: any): void {
        this.txt_name1.text = t;
        var s: any = this.txt_name1.textField.textWidth;
        this.txt_name1.text = "+" + i;
        var n: any = this.txt_name1.textField.textWidth;
        this.txt_name1.text = " ";
        var h: any = this.txt_name1.textField.textWidth, o = Math.floor((this.txt_name1.width - s - n) / h), r: any = StringUtil.repeat(" ", Math.floor(o / 3));
        this.txt_name1.text = t + r + "+" + i,
            this.txt_name2.text = t + r + "+" + e;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodPropLvup",t)（明文 3 参，
 * t=Jf=ui.god.godPropLvupUI）。base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodPropLvup, "sg.god.components.GodPropLvup", null, null);
