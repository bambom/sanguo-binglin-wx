/**
 * sg.utils.FontManager —— 全局字体切换/字号偏移管理器（ModelSettings.font setter 的执行者）。
 *
 * 原文：code1.js 字节 [1484422,1485370]（off 1484475，包装变量 An，基类
 * T=laya.events.EventDispatcher）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-e/FontManager.js
 *
 * F8 死点（2026-11-10 主会话实测）：ModelManager 构造链 → new ModelSettings →
 * _initModel → font setter → sg.utils.FontManager.setFont undefined
 * （ModelSettings.js:211）——本类注册后解除。
 *
 * 引擎别名依赖：M=laya.display.css.Font、f=laya.display.css.CSSStyle、
 * w=Laya.Config（UMD 头 w=s[n(562)]，池串 562="Config"；fontOffset 为引擎
 * 1.8.15beta Config 静态初值 1，1.8.17 d.ts 未声明，经 <any> 读写；
 * Font.defaultFont2 / CSSStyle.filterStyles / CSSStyle.styles 同为
 * 1.8.17 d.ts 未声明的引擎私有静态，同经 <any>）。
 */
export class FontManager extends laya.events.EventDispatcher {

    constructor() {
        super();  // 原文 i.__super.call(this)
    }

    /** r(1,i,"instance",getter,EventDispatcher._$SET_instance) —— 惰性单例 + 可写回 */
    public static get instance(): FontManager {
        return FontManager.sModel = FontManager.sModel || new FontManager();
    }
    public static set instance(v: FontManager) {
        FontManager.sModel = v;
    }

    /** 沿 parent 链递归：带 originalFont 或（有父且父自带 font/style）的显示对象不参与全局换字 */
    public static checkIgnore(t: any): boolean {
        return !!t.originalFont || !(!(t = t.parent) || !t.font && !t.style) && FontManager.checkIgnore(t);
    }

    /** 全局换字体：先写 Font 静态默认族（defaultFont2/EMPTY.family/defaultFamily 链式赋值），再遍历 CSSStyle.styles（filterStyles 先滤）逐样式换 family 并还原 fontSize/leading */
    public static setFont(t: any): void {
        (<any>laya.display.css.Font).defaultFont2 = laya.display.css.Font.EMPTY.family = laya.display.css.Font.defaultFamily = t,
            (<any>laya.display.css.CSSStyle).filterStyles(),
            (<any>laya.display.css.CSSStyle).styles.forEach(function (e: any) {
                var s = e.ower;  // 原文拼写 ower（引擎 CSSStyle 私有字段 _ower 对应的公开面）
                if (!FontManager.checkIgnore(s)) {
                    var n = 0, h = 0;
                    s.font ? (n = s.fontSize0, h = s.leading0, s.font = t, s.fontSize = n, s.leading = h)
                        : (n = e.fontSize0, h = e.leading0, e.fontFamily = t, e.ower.repaint(), e.fontSize = n, e.leading = h);
                }
            });
    }

    /** 全局字号偏移：按 Config.fontOffset 差值调全部样式尺寸（缺省归 0），写回偏移并广播 EVENT_CHANGE_FONT */
    public static changeSize(t?: any): void {
        void 0 === t && (t = 0),
            (<any>laya.display.css.CSSStyle).filterStyles(),
            (<any>laya.display.css.CSSStyle).styles.forEach(function (i: any) {
                var e = i.ower, s = 0;
                e.font ? (s = e.fontSize0, e.fontSize = s - (<any>Config).fontOffset + t) : (s = i.fontSize0, i.fontSize = s - (<any>Config).fontOffset + t);
            }),
            (<any>Config).fontOffset = t,
            FontManager.instance.event("event_change_font");
    }

    public static EVENT_CHANGE_FONT: string = "event_change_font";
    public static sModel: FontManager = null;
}

/**
 * 注册身份等价物：原文 return o(i,"sg.utils.FontManager",t), i（t=T=EventDispatcher）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(FontManager, "sg.utils.FontManager", null, null);
