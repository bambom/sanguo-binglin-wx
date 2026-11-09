/**
 * sg.model.ViewModelBase —— 视图模型基座。
 *
 * 原文：code1.js 字节 [1215338,1215852]（off 1215440，包装变量 As，基类 T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewModelBase.js
 */
import Handler = laya.utils.Handler;
import { ViewManager } from "../manager/ViewManager";

export class ViewModelBase extends laya.events.EventDispatcher {

    public haveConfig: boolean = false;
    public mIsTestClose: boolean = false;

    constructor() {
        super();               // 原文 i.__super.call(this)
        this.initData();
    }

    /** 原文 e.initData=function(){} —— 空实现，子类覆写 */
    public initData(): void {
    }

    /** 原文 e.refreshData=function(t){} —— 空实现，子类覆写 */
    public refreshData(t: any): void {
    }

    /**
     * 发送业务请求。原文：pn.instance.send(t, i, e||P.create(this,this.sendCB), s)
     * pn = sg.net.NetSocket（批次外，经全局注册路径调用期解析）。
     */
    public sendMethod(t: any, i?: any, e?: Handler, s?: any): void {
        i || (i = {});
        sg.net.NetSocket.instance.send(t, i, e || Handler.create(this, this.sendCB), s);
    }

    /**
     * 通用回调：更新用户数据；带 gift_dict 时弹奖励面板。
     * 原文：ue.instance.modelUser.updateData(i)；tn.instance.showRewardPanel(e)
     * ue = sg.manager.ModelManager；tn = sg.manager.ViewManager（批次 A 内，模块直引）。
     */
    public sendCB(t: any): void {
        var i = t.receiveData, e = i && i.gift_dict;
        e && ViewManager.instance.showRewardPanel(e);
        sg.manager.ModelManager.instance.modelUser.updateData(i);
    }

    /** 原文 r(0,e,"active",getter) —— 只读实例属性，恒 false，子类覆写 */
    public get active(): boolean {
        return false;
    }

    /** 原文 r(0,e,"redPoint",getter) —— 只读实例属性，恒 false，子类覆写 */
    public get redPoint(): boolean {
        return false;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.model.ViewModelBase",t)
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewModelBase, "sg.model.ViewModelBase", null, null);
