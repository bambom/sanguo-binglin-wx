/**
 * sg.god.components.GodItem —— 神灵格子项（_setUI 换神灵头像；reset 清空；dataSource
 * setter 派发 _setUI；点击触发 god.showInfo()）。
 *
 * 原文：code1.js 字节 [4358986,4359420]（434B；包装变量 _O，基类 Qf=ui.god.godItemUI
 * （IDE 生成 shell，未译，[3546737,3546956)），明文 3 参注册
 * o(i,"sg.god.components.GodItem",t)，off 4359082；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodItem.js
 *
 * 批次 S：sg.god.components 家族第 8 类。
 * 依赖（模块直引，已译）：re=AssetsManager。
 * 构造顺序：原文 god 字段先于 __super.call；tsc 强制 super() 先行（位移等价先例）。
 */
import { AssetsManager } from "../../manager/AssetsManager";

export class GodItem extends ui.god.godItemUI {

    public god: any = null;

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public _setUI(): void {
        this.img_god.skin = AssetsManager.getAssetGod(this.god.skin);
    }

    public reset(): void {
        this.god = null,
            this.img_god.skin = "";
    }

    public _onClick(): void {
        this.god.showInfo();
    }

    /** r(0,e,"dataSource",t.prototype._$get_dataSource,setter) —— 基链标记 getter 直译 */
    public get dataSource(): any {
        return (<any>ui.god.godItemUI.prototype)["_$get_dataSource"].call(this);
    }

    public set dataSource(t: any) {
        t && (this.god = this._dataSource = t, this._setUI());
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodItem",t)（明文 3 参，t=Qf=ui.god.godItemUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodItem, "sg.god.components.GodItem", null, null);
