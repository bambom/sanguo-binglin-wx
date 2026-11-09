/**
 * sg.model.ModelGuild —— 军团数据模型（原文为空实现占位：setData/updateData 空体）。
 *
 * 原文：code1.js 字节 [2106574,2106733]（包装变量 ur，基类 i=Ns=sg.model.ModelBase，
 * 池化注册名 n(6518)="sg.model.ModelGuild"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelGuild.js
 */
import { ModelBase } from "./ModelBase";

export class ModelGuild extends ModelBase {

    constructor() {
        super();
    }

    public setData(t: any): void {
    }

    public updateData(t: any): void {
    }
}

/**
 * 注册身份等价物：原文 o(s,n(6518),i)（i=Ns=sg.model.ModelBase）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注。
 */
Laya.class(ModelGuild, "sg.model.ModelGuild", null, null);
