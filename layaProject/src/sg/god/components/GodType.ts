/**
 * sg.god.components.GodType —— 神灵属性格（setUI 按属性类型换 icon 图；点击触发
 * god.showInfo(!0) 详情）。
 *
 * 原文：code1.js 字节 [4363077,4363369]（292B；包装变量 yO，基类 ep=ui.god.godTypeUI
 * （IDE 生成 shell，未译，[3548386,3548605)），明文 3 参注册
 * o(i,"sg.god.components.GodType",t)，off 4363173；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodType.js
 *
 * 批次 S：sg.god.components 家族第 14 类（簇尾）。
 * 依赖（模块直引，已译）：re=AssetsManager（getAssetsICON）。
 * 构造顺序：原文 god 字段先于 __super.call；tsc 强制 super() 先行（位移等价先例）。
 */
import { AssetsManager } from "../../manager/AssetsManager";

export class GodType extends ui.god.godTypeUI {

    public god: any = null;

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public _onClick(): void {
        this.god.showInfo(!0);
    }

    public setUI(t: any): void {
        this.god = t,
            this.img_god.skin = AssetsManager.getAssetsICON(this.god.type + ".png");
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodType",t)（明文 3 参，t=ep=ui.god.godTypeUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodType, "sg.god.components.GodType", null, null);
