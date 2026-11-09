/**
 * sg.view.com.ItemBase —— 道具/子项基座（768 个子孙类的祖先）。
 *
 * 原文：code1.js 字节 [3357329,3357534]（off 3357375，包装变量 e_，基类 Ju=sg.view.BaseSprite）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ItemBase.js
 */
import { BaseSprite } from "../BaseSprite";

export class ItemBase extends BaseSprite {

    constructor() {
        super();  // 原文 i.__super.call(this)
    }

    public init(): void {
    }

    public onChange(t: any): void {
    }

    public clear(): void {
    }

    public onRemove(): void {
        this.clear();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.com.ItemBase",t)（t=Ju=sg.view.BaseSprite）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ItemBase, "sg.view.com.ItemBase", null, null);
