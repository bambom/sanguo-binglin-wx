/**
 * sg.god.components.GodScore —— 神灵评分条（setNum 纯文本设置；ctor 挂空函数 click
 * 监听占位——原文即 this.on("click",this,function(){})，空 handler 保留）。
 *
 * 原文：code1.js 字节 [4360307,4360484]（177B；包装变量 fO，基类 Zf=ui.god.godScoreUI
 * （IDE 生成 shell，未译，[3547482,3547699)），明文 3 参注册——本类注册在 return 序列首位
 * o(i,"sg.god.components.GodScore",t)，off 4360395；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodScore.js
 *
 * 批次 S：sg.god.components 家族第 11 类（最小，177B）。无外部依赖（仅基类与引擎）。
 */
export class GodScore extends ui.god.godScoreUI {

    constructor() {
        super();
        this.on("click", this, function () { });
    }

    public setNum(t: any): void {
        this.txt.text = t + "";
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodScore",t)（明文 3 参，t=Zf=ui.god.godScoreUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注。
 */
Laya.class(GodScore, "sg.god.components.GodScore", null, null);
