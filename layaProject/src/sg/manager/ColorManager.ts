/**
 * sg.manager.ColorManager —— UI 颜色键解析：ConfigServer.color.uiColor 覆盖
 * ConfigColor.defaultColorData 兜底，缓存到 colorData；INPUT_OK/INPUT_ERROR 语义键。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ColorManager.js
 *
 * Gt=sg.cfg.ConfigServer（模块直引）；Ot=sg.cfg.ConfigColor（批次外，环境声明，
 * 仅用其 defaultColorData）。原文自引 sg.manager.ColorManager 全局路径 → TS 类直引。
 */
import { ConfigServer } from "../cfg/ConfigServer";

export class ColorManager {

    constructor() {
    }

    /** 键 → 颜色串：uiColor 优先，defaultColorData 兜底，备选键 i 次之，最终 #EEEEEE；结果缓存 */
    public static getUIColor(t: string, i?: string): any {
        var e: string;
        ColorManager.colorData[t] || (
            ConfigServer.color.uiColor && ConfigServer.color.uiColor[t] ? e = ConfigServer.color.uiColor[t]
                : sg.cfg.ConfigColor.defaultColorData[t] && (e = sg.cfg.ConfigColor.defaultColorData[t]),
                e || i && ConfigServer.color.uiColor && ConfigServer.color.uiColor[i] && (e = ConfigServer.color.uiColor[i]),
                e || (e = "#EEEEEE"),
                ColorManager.colorData[t] = e
        );
        return ColorManager.colorData[t];
    }

    public static hasUIColor(t: string): boolean {
        return !(!ConfigServer.color.uiColor || !ConfigServer.color.uiColor[t]);
    }

    public static getInputColor(i: boolean): string {
        return ColorManager.getUIColor(i ? "INPUT_OK" : "INPUT_ERROR");
    }

    public static WHITE: string = "#FFFFFF";
    public static BLACK: string = "#000000";
    public static GREY: string = "#808080";
    public static defaultColor: string = "#EEEEEE";
    public static colorData: any = {};
}

/**
 * 注册身份等价物：原文 o(t,"sg.manager.ColorManager")（2 参注册，无基类）。
 */
Laya.class(ColorManager, "sg.manager.ColorManager", null, null);
