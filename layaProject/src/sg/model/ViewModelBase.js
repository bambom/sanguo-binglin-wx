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
 * sg.model.ViewModelBase —— 视图模型基座。
 *
 * 原文：code1.js 字节 [1215338,1215852]（off 1215440，包装变量 As，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewModelBase.js
 */
var Handler = laya.utils.Handler;
var ViewManager_1 = require("../manager/ViewManager");
var ViewModelBase = /** @class */ (function (_super) {
    __extends(ViewModelBase, _super);
    function ViewModelBase() {
        var _this = _super.call(this) || this;
        _this.haveConfig = false;
        _this.mIsTestClose = false;
        _this.initData();
        return _this;
    }
    /** 原文 e.initData=function(){} —— 空实现，子类覆写 */
    ViewModelBase.prototype.initData = function () {
    };
    /** 原文 e.refreshData=function(t){} —— 空实现，子类覆写 */
    ViewModelBase.prototype.refreshData = function (t) {
    };
    /**
     * 发送业务请求。原文：pn.instance.send(t, i, e||P.create(this,this.sendCB), s)
     * pn = sg.net.NetSocket（批次外，经全局注册路径调用期解析）。
     */
    ViewModelBase.prototype.sendMethod = function (t, i, e, s) {
        i || (i = {});
        sg.net.NetSocket.instance.send(t, i, e || Handler.create(this, this.sendCB), s);
    };
    /**
     * 通用回调：更新用户数据；带 gift_dict 时弹奖励面板。
     * 原文：ue.instance.modelUser.updateData(i)；tn.instance.showRewardPanel(e)
     * ue = sg.manager.ModelManager；tn = sg.manager.ViewManager（批次 A 内，模块直引）。
     */
    ViewModelBase.prototype.sendCB = function (t) {
        var i = t.receiveData, e = i && i.gift_dict;
        e && ViewManager_1.ViewManager.instance.showRewardPanel(e);
        sg.manager.ModelManager.instance.modelUser.updateData(i);
    };
    Object.defineProperty(ViewModelBase.prototype, "active", {
        /** 原文 r(0,e,"active",getter) —— 只读实例属性，恒 false，子类覆写 */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "redPoint", {
        /** 原文 r(0,e,"redPoint",getter) —— 只读实例属性，恒 false，子类覆写 */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ViewModelBase;
}(laya.events.EventDispatcher));
exports.ViewModelBase = ViewModelBase;
/**
 * 注册身份等价物：原文 o(i,"sg.model.ViewModelBase",t)
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewModelBase, "sg.model.ViewModelBase", null, null);
//# sourceMappingURL=ViewModelBase.js.map