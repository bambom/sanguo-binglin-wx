/**
 * sg.crossService.ui.TopTips —— 跨服战顶栏规则提示（show(t)：国别旗标 + 四条
 * dmg_all/res_all 战报内容（innerHTML）+ 三 tile 战绩 + setBuff 汇总敌方清怪
 * buff（filterCity/ascription_ini/neutral 网格归属计数）+ 背景条贴底堆叠 +
 * stage mousedown 一次性隐藏）。
 *
 * 原文：code1.js 字节 [5676657,5680052)（3,395B；包装变量 F1，1 参 IIFE 基类实参
 * (WU)=ui.duplicate.topUI（批次 X ✓ 已落地），明文 3 参注册
 * o(i,"sg.crossService.ui.TopTips",t) @5676703；wrapper 体 4 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/TopTips.js
 *
 * extends 决策：原文基类 WU=ui.duplicate.topUI（IDE 皮肤类，批次 X ✓ 落地；其自身
 * 基类 Z_=sg.view.ViewScenes 批次 A ✓）→ 直接模块直引真类。
 * 依赖（模块直引）：WU=topUI（X ✓）、vs=Tools（B ✓）、le=EffectManager（B ✓）、
 * ae=ColorManager（B ✓）、Gt=ConfigServer（B ✓）；s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：so=sg.crossService.model.CrossServiceMapModel
 * （-b instance:any；CHU_COUNTRY/HAN_COUNTRY 调回点 cast；AC 在途独占 model 目录，
 * 本批不 import）。
 * 皮肤字段（topUI：country_flag/tile_txt/content_1..4_txt/tile_1..3_txt/info_txt/
 * title_img/bg_1..4）由真基类类型面承载。
 */
import { topUI } from "../../ui/duplicate/topUI";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";
import { ColorManager } from "../../manager/ColorManager";
import { ConfigServer } from "../../cfg/ConfigServer";

export class TopTips extends topUI {

    constructor() {
        super();
    }

    public show(t: any): void {
        this.country_flag.setCountryFlag(t);
        var i: any = Tools.getMsgById(t == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? "500439" : "500440"), e: any = Tools.getMsgById(t == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? "500440" : "500439");
        this.tile_txt.text = Tools.getMsgById("500525", [i]), this.content_1_txt.style.color = this.content_2_txt.style.color = this.content_3_txt.style.color = this.content_4_txt.style.color = "#FFFFFF", this.content_1_txt.style.fontSize = this.content_2_txt.style.fontSize = this.content_3_txt.style.fontSize = this.content_4_txt.style.fontSize = 15, this.tile_1_txt.style.color = this.tile_2_txt.style.color = this.tile_3_txt.style.color = "#FFFFFF", this.tile_1_txt.style.fontSize = this.tile_2_txt.style.fontSize = this.tile_3_txt.style.fontSize = 15, EffectManager.changeSprColor(this.title_img, t, !0, ColorManager.getUIColor("COUNTRY_COLOR_FILTER_MATRIX"));
        var n: any = this.setBuff(0, t), h: any = this.setBuff(1, t);
        this.info_txt.text = Tools.getMsgById("500526", [Tools.percentFormat(n), Tools.percentFormat(h)]), this.content_1_txt.innerHTML = Tools.getMsgById("500519", [i, Tools.percentFormat(ConfigServer.duplicate.floor[4].dmg_all)]), this.content_2_txt.innerHTML = Tools.getMsgById("500521", [i, Tools.percentFormat(ConfigServer.duplicate.floor[7].dmg_all)]);
        for (var o: any = t == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY : (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY, r: any = sg.crossService.model.CrossServiceMapModel.instance.getHeadOffice(o), a: any = sg.crossService.model.CrossServiceMapModel.instance.getCountrys([o]).filter(function (t: any) { return 0 != t.monster && t != r; }).length, l = 0, c = 0, u: any = ConfigServer.duplicate.ascription_ini.length; c < u; c++)
            for (var d = 0, _: any = ConfigServer.duplicate.ascription_ini[c].length; d < _; d++) ConfigServer.duplicate.ascription_ini[c][d] != o || r.mapGrid.col == d && r.mapGrid.row == c || 0 == ConfigServer.duplicate.neutral[c][d] || l++;
        var m: any = l - a;
        this.content_3_txt.innerHTML = Tools.getMsgById("500523", [i, e, Tools.percentFormat(ConfigServer.duplicate.atk_win_buff[0])]), this.content_4_txt.innerHTML = Tools.getMsgById("500524", [i, e, Tools.percentFormat(ConfigServer.duplicate.monster_clear_buff[0])]), this.bg_1.height = this.content_1_txt.contextHeight + 8, this.bg_2.height = this.content_2_txt.contextHeight + 8, this.bg_3.height = this.content_3_txt.contextHeight + 8, this.bg_4.height = this.content_4_txt.contextHeight + 8, this.bg_2.y = this.tile_2_txt.y = this.bg_1.y + this.bg_1.height + 5, this.bg_3.y = this.tile_3_txt.y = this.bg_2.y + this.bg_2.height + 5, this.bg_4.y = this.bg_3.y + this.bg_3.height + 5, this.height = this.bg_4.y + this.bg_4.height + 5, this.visible = !0;
        var g: any = this;
        Laya.stage.once("mousedown", this, function () { g._destroyed || (g.visible = !1); }), Tools.textFitFontSize(this.tile_1_txt, Tools.getMsgById("500518", [sg.crossService.model.CrossServiceMapModel.instance.filterCity([{ type: "id", than: "=", value: 4 }, { type: "country", than: "=", value: t }]).length])), Tools.textFitFontSize(this.tile_2_txt, Tools.getMsgById("500520", [sg.crossService.model.CrossServiceMapModel.instance.filterCity([{ type: "id", than: "=", value: 7 }, { type: "country", than: "=", value: t }]).length])), Tools.textFitFontSize(this.tile_3_txt, Tools.getMsgById("500522", [m]));
    }

    public setBuff(t: any, i: any): any {
        for (var e: any = ["dmg_all", "res_all"][t], s: any = sg.crossService.model.CrossServiceMapModel.instance.filterCity([{ type: e, than: ">", value: 0 }, { type: "country", than: "=", value: i }]), n = 0, h = 0, o: any = s.length; h < o; h++) n += s[h][e];
        var r: any = i == (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY ? (<any>sg.crossService.model.CrossServiceMapModel).HAN_COUNTRY : (<any>sg.crossService.model.CrossServiceMapModel).CHU_COUNTRY, a: any = sg.crossService.model.CrossServiceMapModel.instance.getHeadOffice(r), l: any = sg.crossService.model.CrossServiceMapModel.instance.getCountrys([r]).filter(function (t: any) { return 0 != t.monster && t != a; }).length, c = 0;
        for (h = 0, o = ConfigServer.duplicate.ascription_ini.length; h < o; h++)
            for (var u = 0, d: any = ConfigServer.duplicate.ascription_ini[h].length; u < d; u++) ConfigServer.duplicate.ascription_ini[h][u] != r || a.mapGrid.col == u && a.mapGrid.row == h || 0 == ConfigServer.duplicate.neutral[h][u] || c++;
        return c - l >= ConfigServer.duplicate.monster_clear_num && (n += ConfigServer.duplicate.monster_clear_buff[t]), n;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.TopTips",t)
 * （t=WU=ui.duplicate.topUI，批次 X 真类）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(TopTips, "sg.crossService.ui.TopTips", null, null);
