/**
 * sg.utils.FunQueue —— 串行函数队列（init 装载 → next 逐个 runWith → complete 收尾）。
 *
 * 原文：code1.js 字节 [1113095,1113565]（包装变量 ns，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/FunQueue.js
 *
 * 批次 D 入批原因：MapModel 构造器 `new ns`（ModelManager 字段初始化链，
 * 构造期立即执行，原 2 参注册不在 class-inventory）。
 * list 元素为带 runWith/clear 的 handler 型对象（Handler 或同契约对象）。
 */
export class FunQueue {

    public complete: any = null;
    public list: any[] = [];

    constructor() {
    }

    /** 装载队列并立即开跑（clear → list=t → next） */
    public init(t: any[]): void {
        this.clear(),
            this.list = t,
            this.next();
    }

    /** 逐个 clear 队列元素 */
    public clear(): void {
        if (this.list)
            for (var t: any, i = this.list.length, e = 0; e < i; e++)
                (t = this.list[e]) && t.clear();
    }

    public add(t: any): void {
        this.list && this.list.push(t);
    }

    /** 取队首 runWith(t)；队列空时执行 complete 一次并置空 */
    public next(t?: any): void {
        if (this.list && this.list.length > 0) {
            var i = this.list.shift();
            i && i.runWith(t);
        } else
            this.complete && (this.complete.run(), this.complete = null);
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.FunQueue")（2 参注册，无基类）。
 */
Laya.class(FunQueue, "sg.utils.FunQueue", null, null);
