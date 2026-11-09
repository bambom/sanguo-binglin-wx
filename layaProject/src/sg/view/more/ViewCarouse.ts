/**
 * sg.view.more.ViewCarouse —— 顶部轮播公告（ViewManager.mLayerCarouse）。
 *
 * 原文：code1.js 字节 [3689644,3692056]（off 3689862，包装变量 tx，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewCarouse.js
 *
 * 依赖：xC=ui.com.item_carouseUI（批次 B 模块直引）、U=laya.html.dom.HTMLDivElement。
 * this.timer 为引擎 Node.timer（默认 Laya.timer）。
 */
import HTMLDivElement = laya.html.dom.HTMLDivElement;
import { ItemBase } from "../com/ItemBase";
import { item_carouseUI } from "../../ui/com/item_carouseUI";

export class ViewCarouse extends ItemBase {

    public label_arr: HTMLDivElement[] = null;
    public index_content: number = 0;
    public tween_label_arr: number[] = null;
    public _time: any = null;
    public _content: any[] = null;
    public item: item_carouseUI = null;
    public is_next_one: boolean = false;
    public next_count: number = 0;
    public out_count: number = 0;

    constructor() {
        super();
    }

    /** 轮播入口：{interval_time, content[]}；建富文本条循环滚动（异常时整体隐藏） */
    public input(t: any): void {
        try {
            this.clerMyTimer();
            this._time = t.interval_time ? t.interval_time : [10, 20];
            this._content = t.content;
            this.label_arr = [];
            this.item = new item_carouseUI();
            this.item.name = "carouse";
            this.addChild(this.item);
            this.item.panel.removeChildren();
            for (var i = 0; i < this._content.length; i++) {
                this.createLabel();
                var e = this.label_arr[i];
                this.item.panel.addChild(e),
                    e.innerHTML = this._content[i],
                    e.x = this.item.panel.width,
                    (<any>e).y = (this.item.panel.height - e.contextHeight) / 2 + 2;
            }
            this.item.left = 86;
            this.item.top = 80;
            this.next_count = this.out_count = 0;
            this.tween_label_arr = [0];
            this.tweenLabel();
        } catch (t) {
            this.visible = false;
        }
    }

    /** 逐帧左移：尾部露出时接续下一条（1），完全移出时回收（2） */
    public tweenLabel(): void {
        for (var t = 0; t < this.tween_label_arr.length; t++) {
            var i = this.tween_label_arr[t];
            this.label_arr[i].x -= 1;
            var e = this.label_arr[i].x, s = this.label_arr[i].width;
            e + s <= this.item.panel.width && !this.is_next_one && (this.is_next_one = true, this.labelChange(i, 1)),
                e + s <= 0 && (this.is_next_one = false, this.labelChange(i, 2));
        }
        this.timer.frameOnce(1, this, this.tweenLabel);
    }

    /** 1=延迟 _time[0] 秒接入下一条；2=移出回收，全部走完一轮后休眠 _time[1] 秒重启 */
    public labelChange(t: number, i: number): void {
        if (1 == i) {
            if (this.next_count += 1, this.next_count == this._content.length) return;
            var e = null == this.label_arr[t + 1] ? 0 : t + 1;
            this.timer.once(1e3 * this._time[0], this, this.fun1, [e]);
        } else if (2 == i) {
            if (this.out_count += 1, this.out_count == this._content.length) {
                this.out_count = this.next_count = 0,
                    this.timer.clear(this, this.tweenLabel);
                for (var s = 0; s < this._content.length; s++)
                    this.label_arr[s].innerHTML = this._content[s],
                        this.label_arr[s].x = this.item.panel.width;
                this.visible = false,
                    this.timer.once(1e3 * this._time[1], this, this.fun2);
            }
            var n = this.label_arr[t];
            null != n && (n.x = this.item.panel.width),
                -1 != this.tween_label_arr.indexOf(t) && this.tween_label_arr.splice(this.tween_label_arr.indexOf(t), 1);
        }
    }

    public fun1(t: number): void {
        -1 == this.tween_label_arr.indexOf(t) && this.tween_label_arr.push(t);
    }

    public fun2(): void {
        this.visible = true,
            this.tween_label_arr = [0],
            this.tweenLabel();
    }

    public createLabel(): void {
        var t = new HTMLDivElement();
        t.style.color = "#FFFFFF",
            t.style.align = "left",
            t.style.valign = "center",
            t.style.fontSize = 18,
            t.style.leading = 6,
            t.style.wordWrap = false,
            this.label_arr.push(t);
    }

    /** 原文拼写 clerMyTimer（clear） */
    public clerMyTimer(): void {
        this.timer.clear(this, this.tweenLabel),
            this.timer.clear(this, this.fun1),
            this.timer.clear(this, this.fun2);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.more.ViewCarouse",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(ViewCarouse, "sg.view.more.ViewCarouse", null, null);
