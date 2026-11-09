/**
 * sg.model.ModelMB —— MB（手机厂商通道）支付能力模型：isCanMBPay 按渠道
 * （cb_fy_hk 走 pay_third_limit_money，其余 pay_config[id][0] 门槛）判断余额可付。
 *
 * 原文：code1.js 字节 [2226920,2227221]（包装变量 Ir，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 n(11322)="sg.model.ModelMB"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelMB.js
 *
 * 依赖：Rt=ConfigApp、Gt=ConfigServer、ue=ModelManager（批次 B 模块直引）；ModelBase（批次 A）。
 */
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { ModelManager } from "../manager/ModelManager";
import { ModelBase } from "./ModelBase";

export class ModelMB extends ModelBase {

    constructor() {
        super();
    }

    /** t=商品/支付项 id；true=当前余额可支付 */
    public isCanMBPay(t: any): boolean {
        if (ConfigApp.pf_channel == "cb_fy_hk") {
            var s = ConfigServer.system_simple.pay_third_limit_money || 10;
            return ModelManager.instance.modelUser.pay_money >= s;
        }
        var n = ConfigServer.pay_config[t];
        return ModelManager.instance.modelUser.ucoin >= n[0];
    }
}

/**
 * 注册身份等价物：原文 o(s,n(11322),i)（i=Ns=sg.model.ModelBase）。
 */
Laya.class(ModelMB, "sg.model.ModelMB", null, null);
