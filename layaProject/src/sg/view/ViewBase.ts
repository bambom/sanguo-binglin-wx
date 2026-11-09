/**
 * sg.view.ViewBase —— 视图控制器基座（ViewPanel/ViewScenes 的父类）。
 *
 * 原文：code1.js 字节 [3357542,3358717]（off 3357707，包装变量 s_，基类 Ju=sg.view.BaseSprite）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-a/ViewBase.js
 */
import List = laya.ui.List;
import Tab = laya.ui.Tab;
import Sprite = laya.display.Sprite;
import { BaseSprite } from "./BaseSprite";

export class ViewBase extends BaseSprite {

    public id: string = "";
    /** 当前视图参数（原文 getset currArg） */
    public mCurrArg: any = null;
    /**
     * 全屏蒙版。原文构造体先 this.mBg=null 再 super()；真实 UI 子类在 super() 链内经
     * createView 生成 mBg。tsc 字段初始化在 super() 之后执行，若此处带 =null 会把
     * createView 刚生成的 mBg 清空（破坏原文时序），故不设初始值——未建视图时为
     * undefined 而非 null，全文仅做真值判断，等价（batch-a-report.md 已记）。
     */
    public mBg: any;
    public mBgType: number = 0;
    public mIsOpen: boolean = false;

    constructor() {
        super();  // 原文 i.__super.call(this)
        this.on("display", this, this._$7__onDisplay);   // 原文注册名保持混淆形态 _$7__onDisplay
    }

    /** 原文空实现（混淆名 _$7__onDisplay，display 事件回调占位） */
    public _$7__onDisplay(): void {
    }

    public onRemove(): void {
        this.mIsOpen = false;
        this.onRemovedBase();
    }

    public onAdd(): void {
        this.mIsOpen = true;
        this.onAddedBase();
    }

    public init(): void {
        this.once("removed", this, this.onRemove);
        this.once("added", this, this.onAdd);
        this.initData();
    }

    public clearEvent(): void {
        this.off("removed", this, this.onRemove);
        this.off("added", this, this.onAdd);
    }

    public initData(): void {
    }

    public checkBg(t: any): void {
    }

    public onAddedBase(): void {
    }

    public onRemovedBase(): void {
    }

    public onAdded(): void {
    }

    public onRemoved(): void {
    }

    public clear(): void {
    }

    /**
     * 按名字取显示对象：优先 "xxx_N" 形式命中 List 的 cell / Tab 的 items，
     * 其次本实例同名属性、子节点树；均须为 laya.display.Sprite。
     */
    public getSpriteByName(t: string): any {
        var i = /(.+)_(\d+)/;
        if (i.test(t)) {
            var e = t.match(i), s = (this as any)[e[1]], n: any = null, h = parseFloat(e[2]);
            if (s instanceof List ? n = s.getCell(h) : s instanceof Tab && (n = s.items[h]), n)
                return n;
        }
        return (this as any)[t] instanceof Sprite ? (this as any)[t]
            : this.getChildByName(t) instanceof Sprite ? this.getChildByName(t)
                : void 0;
    }

    /** 原文 r(0,e,"currArg",getter,setter) —— 实例属性 currArg 读写 mCurrArg */
    public get currArg(): any {
        return this.mCurrArg;
    }
    public set currArg(t: any) {
        this.mCurrArg = t;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.ViewBase",t)（t=Ju=sg.view.BaseSprite）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewBase, "sg.view.ViewBase", null, null);
