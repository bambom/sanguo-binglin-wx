/**
 * sg-externals-ah.d.ts —— 批次 AH 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 AH 翻译 ui.com.* 63 个 IDE 皮肤 UI 类（regOff ∈ [3764406,4513488)，全部明文
 * 3 参注册 o(i,"ui.com.X",t)；FORM A 59 类 + FORM B 逗号组元素 4 类，见 batch-ah-report §1）。
 * 本文件只声明本批译文实际以全局路径引用、且现有 sg-externals*.d.ts 未声明的标识符
 * （createChildren 里 View.regComponent 的类值实参；身份证明 batch-ah-report §2：
 * inventory byVar + 注册字面量 @regOff 交叉 8/8 MATCH）：
 *  1. ui.com.equip_starUI（包装变量 Bk，@3761635 regOff）—— hero_icon_equipUI 注册；
 *     AG 在途区间 [3655271,3763970)（未落地，不 import，全局注册路径）。
 *
 * 规则同 sg-externals.d.ts：成员名与原包逐字一致；后续批次翻译到某类后改真实
 * import（声明保留不删，Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace ui {

    namespace com {

        /** ui.com.equip_starUI（包装变量 Bk，inventory off 3761635，注册字面量
         *  o(i,"ui.com.equip_starUI",t)）—— 装备星标；未译缓译（AG 在途区间独占，
         *  本批不 import），hero_icon_equipUI.createChildren 以全局路径注册此类值。 */
        class equip_starUI { }
    }
}

// 依赖登记（不重复声明，避免与并行/既有批次 TS2300）：
//  - ui.com.panel_bg_btnUI（包装变量 PC，@3746443，AG 在途区间）：sg-externals-x.d.ts 已声明（同身份；-y 亦登记让位说明）；
//  - ui.bag.bagItemUI（包装变量 v_，@3408414）：sg-externals.d.ts 已声明（-t/-x/-y/-ad 亦各有一份登记）；
//  - laya.ui.View / laya.html.dom.HTMLDivElement：libs/LayaAir.d.ts 引擎本体；
//  - 基座 sg.view.com.ComPayType（批次 AE ✓）/ sg.view.ViewPanel（已译真类）：模块直引 import。
//  本批内互引（hero_lv2UI/hero_icon8UI/item_titleUI）走真实 import（批次 Y「批内互引」先例），不经本文件。
//  收敛注记：ui.com.t_img_t_tUI（-ad shell）、ui.com.hero_icon_equipUI（-y shell）自本批起有真类
//  （src/sg/ui/com/ 同名模块）；ambient 声明保留，运行期 Laya.class 注册后两路径同一对象。
