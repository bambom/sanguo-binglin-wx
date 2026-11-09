"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sg.view.com.ItemBase —— 道具/子项基座（768 个子孙类的祖先）。
 *
 * 原文：code1.js 字节 [3357329,3357534]（off 3357375，包装变量 e_，基类 Ju=sg.view.BaseSprite）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ItemBase.js
 */
var BaseSprite_1 = require("../BaseSprite");
var ItemBase = /** @class */ (function (_super) {
    __extends(ItemBase, _super);
    function ItemBase() {
        return _super.call(this) || this;
    }
    ItemBase.prototype.init = function () {
    };
    ItemBase.prototype.onChange = function (t) {
    };
    ItemBase.prototype.clear = function () {
    };
    ItemBase.prototype.onRemove = function () {
        this.clear();
    };
    return ItemBase;
}(BaseSprite_1.BaseSprite));
exports.ItemBase = ItemBase;
/**
 * 注册身份等价物：原文 o(i,"sg.view.com.ItemBase",t)（t=Ju=sg.view.BaseSprite）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ItemBase, "sg.view.com.ItemBase", null, null);
//# sourceMappingURL=ItemBase.js.map