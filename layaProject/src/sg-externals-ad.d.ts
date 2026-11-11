/**
 * sg-externals-ad.d.ts —— 批次 AD 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 AD 翻译 ui.com.* 23 个 IDE 皮肤 UI 类（regOff ∈ [3543406,3640000)，
 * 全部明文 3 参注册 o(i,"ui.com.X",t)）。本文件只声明本批译文实际以全局路径引用、
 * 且现有 sg-externals*.d.ts 未声明的标识符（createChildren 里 View.regComponent
 * 的类值实参，原文为包装变量 GM/zC/WC；identity 双证明见 batch-ad-report §2：
 * inventory byVar + 声明器注册字面量 + reg-name 交叉 11/11 MATCH）：
 *  1. ui.com.t_img_t_tUI（包装变量 GM，@3801111）—— effect_army_upgradeUI 注册；
 *  2. ui.com.building_info_lvUI（包装变量 zC，@3749070）—— effect_building_upgrade
 *     {,1,2,3}UI / effect_puppet_build_upgradeUI 注册（5 处）；
 *  3. ui.com.building_info_infoUI（包装变量 WC，@3748676）—— effect_building_upgradeUI 注册。
 *
 * 规则同 sg-externals.d.ts：成员名与原包逐字一致；后续批次翻译到某类后改真实
 * import（声明保留不删，Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace ui {

    namespace com {
        /** ui.com.t_img_t_tUI（包装变量 GM，唯一声明器 @3769569 邻域，注册字面量
         *  o(i,"ui.com.t_img_t_tUI",t)）—— 图/文字组合行；未译缓译，
         *  effect_army_upgradeUI.createChildren 以全局路径注册此类值。 */
        class t_img_t_tUI { }

        /** ui.com.building_info_lvUI（包装变量 zC，注册字面量 o(i,"ui.com.building_info_lvUI",t)）
         *  —— 建筑等级信息行；未译缓译，本批 5 个 effect_building* 皮肤以全局路径注册此类值。 */
        class building_info_lvUI { }

        /** ui.com.building_info_infoUI（包装变量 WC，注册字面量 o(i,"ui.com.building_info_infoUI",t)）
         *  —— 建筑信息说明行；未译缓译，effect_building_upgradeUI.createChildren 以全局路径注册此类值。 */
        class building_info_infoUI { }
    }
}

// 依赖登记（不重复声明，避免与并行批次 TS2300）：
//  - ui.com.hero_icon_equipUI（包装变量 Jk）：sg-externals-y.d.ts 已声明（同身份）；
//  - ui.bag.bagItemUI（包装变量 v_）：sg-externals.d.ts 已声明（-t/-x/-y 亦各有一份登记）；
//  - laya.ui.View / laya.html.dom.HTMLDivElement：libs/LayaAir.d.ts 引擎本体；
//  - 基座 sg.view.com.ItemBase / sg.view.BaseSprite：批次 A 已译真类（本批直接 import）。
