/**
 * sg.model.ModelTradeShop —— 商栈/黑市商店（trade_shop：刷新/购买协议、active 开关、
 * 按 need_deal 成交次数排序的 tradeList；get-only 属性族走 r(0,h,...) 无 setter）。
 *
 * 原文：code1.js 字节 [2305903,2308171]（包装变量 Er，基类 i=As=sg.model.ViewModelBase，
 * 明文注册名 "sg.model.ModelTradeShop"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelTradeShop.js
 *
 * 批次 D 入批原因：ModelManager.init() `new` 直接构造。
 * 依赖：pn=NetSocket、ue=ModelManager、P=Handler、Gt=ConfigServer、tn=ViewManager、vs=Tools
 * （批次 B 模块直引）；K=laya.maths.MathUtil（引擎）；lr=ModelGame、Ms=ModelAchievement（本批类直引）。
 */
import Handler = laya.utils.Handler;
import MathUtil = laya.maths.MathUtil;
import { ViewModelBase } from "./ViewModelBase";
import { NetSocket } from "../net/NetSocket";
import { ModelManager } from "../manager/ModelManager";
import { ConfigServer } from "../cfg/ConfigServer";
import { ViewManager } from "../manager/ViewManager";
import { Tools } from "../utils/Tools";
import { ModelGame } from "./ModelGame";
import { ModelAchievement } from "../achievement/model/ModelAchievement";

export class ModelTradeShop extends ViewModelBase {

    public serverTradeData: any = null;

    constructor() {
        super();
    }

    public sendRefreshShop(): void {
        NetSocket.instance.send("user_refresh_shop", { shop_id: "trade_shop" }, Handler.create(this, this.cbRefreshShop));
    }

    public cbRefreshShop(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.event(ModelTradeShop.REFRESH_SHOP);
    }

    public send_GetShop(): void {
        NetSocket.instance.send("get_shop", { shop_id: "trade_shop" }, Handler.create(this, this.cbGetShop));
    }

    public cbGetShop(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData),
            this.event(ModelTradeShop.REFRESH_SHOP);
    }

    public sendBuyShop(t: any, i: any): void {
        NetSocket.instance.send("buy_shop", { shop_id: "trade_shop", goods_id: t }, Handler.create(this, this.cbBuyShop), [i]);
    }

    public cbBuyShop(t: any): void {
        ModelManager.instance.modelUser.updateData(t.receiveData),
            ModelManager.instance.modelProp.getRewardProp(t.receiveData.gift_dict, true);
        var n = t.otherData[0];
        ViewManager.instance.showIcon(t.receiveData.gift_dict, n.x, n.y),
            this.event(ModelTradeShop.REFRESH_SHOP);
    }

    /** r(0,h,"active")：func_open 求值为丢弃表达式（原文如此）；estate.trade 开关+合服序号 */
    public get active(): any {
        var i = ConfigServer.estate,
            s = ModelManager.instance.modelUser.mergeNum,
            n = "trade_shop";
        ConfigServer.system_simple.func_open;
        return (!n || !ModelGame.unlock(null, n, false).stop) && (1 == i.trade["switch"] && s >= i.trade.merge_times);
    }

    /** 刷新费用阶梯：按已刷新次数取 cost_refresh[s]，越界取末档 */
    public get cfgCostRefresh(): any {
        var i = this.tradeConfig.cost_refresh,
            s = ModelManager.instance.modelUser.shop.trade_shop.user_refresh_times;
        return i && i.length > 0 ? s >= i.length ? i[i.length - 1] : i[s] : null;
    }

    /** 商栈总购买上限 = trade.all_limit + 成就加成（getAchiAddNum 全取条件取末档） */
    public get allLimitNum(): any {
        return ConfigServer.trade.all_limit + ModelAchievement.getAchiAddNum(ConfigServer.trade.effort_add);
    }

    /** 未达 need_deal 的条目按剩余次数升序补在已解锁条目之后（MathUtil.sortByKey） */
    public get tradeList(): any[] {
        this.serverTradeData = ModelManager.instance.modelTradeShop.tradeConfig;
        var i: any[] = [],
            s = ModelManager.instance.modelUser.shop.trade_shop,
            n: any[] = [];
        for (var h in s.goods) {
            var o = s.goods[h];
            o.push(h);
            var r = this.serverTradeData.lattice[h];
            if (r)
                if (0 == r.need_deal || ModelManager.instance.modelUser.total_records.trade_buy_times >= r.need_deal)
                    i.push(o);
                else {
                    var a = r.need_deal - ModelManager.instance.modelUser.total_records.trade_buy_times;
                    n.push({ need_deal: r.need_deal, data: o, need_times: a });
                }
        }
        for (var l in (n.sort(<any>MathUtil.sortByKey("need_times")), n))
            i.push(n[l].data);
        return i;
    }

    /** 距下次免费刷新秒数；过期即触发 send_GetShop 补拉 */
    public get lastTimeNum(): any {
        var i = ModelManager.instance.modelUser.shop.trade_shop,
            s = Tools.getTimeStamp(i.refresh_time) - ConfigServer.getServerTimer();
        return s < 0 && this.send_GetShop(), s;
    }

    public get userTradeData(): any {
        return ModelManager.instance.modelUser.shop.trade_shop;
    }

    public get tradeConfig(): any {
        return ConfigServer.trade;
    }

    public static TRADE_SHOP_KEY: string = "trade_shop";
    public static REFRESH_SHOP: string = "REFRESH_SHOP";
}

/**
 * 注册身份等价物：原文 o(s,"sg.model.ModelTradeShop",i)（i=As=sg.model.ViewModelBase）。
 */
Laya.class(ModelTradeShop, "sg.model.ModelTradeShop", null, null);
