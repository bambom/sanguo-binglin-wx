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
 * sg.model.ModelBase —— 数据模型基座。
 *
 * 原文：code1.js 字节 [1220219,1220360]（class-inventory: off 1220343，包装变量 Ns，
 * 池化注册名 n(2427)="sg.model.ModelBase"，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ModelBase.js
 *
 * 原文构造顺序为「先字段初始化、后 __super.call(this)」；tsc 的 ES5 输出固定 super()
 * 在前。EventDispatcher 基类构造不观察子类字段，两序等价（报告已记）。
 */
var ModelBase = /** @class */ (function (_super) {
    __extends(ModelBase, _super);
    function ModelBase() {
        var _this = _super.call(this) || this;
        /** 原文 this[i(7905)]=null，i(7905)="data" */
        _this.data = null;
        /** 原文 this[i(17417)]=null，i(17417)="mData" */
        _this.mData = null;
        /** 原文 this[i(17198)]=-1，i(17198)="mClassType" */
        _this.mClassType = -1;
        return _this;
    }
    return ModelBase;
}(laya.events.EventDispatcher));
exports.ModelBase = ModelBase;
/**
 * 注册身份等价物：原文 return o(e, n(2427), i), e
 *   → Laya.class(ModelBase, "sg.model.ModelBase", EventDispatcher)
 * 原包装内注册发生在原型方法挂接之前（Laya.__extend 随注册重置原型）；tsc 的 class
 * 语法已由 extends 建立原型链并先行挂好方法，故此处仅重放注册本身（base 传 null，
 * 避免 Laya.__extend 重置 tsc 已挂接的原型方法）。命名空间挂载、__className、
 * __isclass 等注册身份均与原文一致。差异面（基类静态属性拷贝、__super 标记）见
 * batch-a-report.md「注册等价决策」。
 */
Laya.class(ModelBase, "sg.model.ModelBase", null, null);
//# sourceMappingURL=ModelBase.js.map