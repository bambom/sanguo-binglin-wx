/**
 * sg-externals-ag.d.ts —— 批次 AG 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 AG 翻译 ui.com.* 60 个 IDE 皮肤 UI 类（off ∈ [3655271,3763970)，全部明文 3 参注册
 * o(i,"ui.com.X",t)）。本文件只声明本批译文实际以全局注册路径引用、且现有 sg-externals*.d.ts
 * 未声明的标识符（createChildren 里 View.regComponent 的类值实参，原文为闭包变量；
 * 身份双证明见 batch-ag-report §2：inventory byVar + 全库唯一声明器 + 包装内注册字面量交叉）：
 *  1. ui.com.hero_radar_iconUI（包装变量 TT，@3779434）—— hero_radarUI 注册；
 *  2. ui.com.hero_icon5UI（包装变量 Wk，@3765738）—— building_tips101/6/9UI 注册（3 处）；
 *  3. ui.com.hero_icon6UI（包装变量 jk，@3766642）—— building_tips5UI 注册；
 *  4. ui.com.t_img_tUI（包装变量 HM，@3800580）—— SoldiersinformationUI 注册
 *     （注意：与批次 AD 已声明的 ui.com.t_img_t_tUI/GM@3801111 为不同类）。
 * 以上 4 类均属批次 AH 在途区间 [3764406,4513488)，按批次协议不走 import。
 *
 * 规则同 sg-externals.d.ts：成员名与原包逐字一致；后续批次翻译到某类后改真实
 * import（声明保留不删，Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace ui {

    namespace com {

        /** ui.com.hero_radar_iconUI（包装变量 TT，全库唯一声明器 @3779345，注册字面量
         *  o(i,"ui.com.hero_radar_iconUI",t)）—— 英雄雷达图图标子件；未译（批次 AH 在途），
         *  hero_radarUI.createChildren 以全局路径注册此类值。 */
        class hero_radar_iconUI { }

        /** ui.com.hero_icon5UI（包装变量 Wk，唯一声明器 @3765682，注册字面量在包装内）——
         *  英雄头像 5；未译（批次 AH 在途），building_tips101/6/9UI 以全局路径注册此类值。 */
        class hero_icon5UI { }

        /** ui.com.hero_icon6UI（包装变量 jk，唯一声明器 @3766586，注册字面量在包装内）——
         *  英雄头像 6；未译（批次 AH 在途），building_tips5UI 以全局路径注册此类值。 */
        class hero_icon6UI { }

        /** ui.com.t_img_tUI（包装变量 HM，唯一声明器 @3800524，注册字面量在包装内）——
         *  图/文组合行；未译（批次 AH 在途），SoldiersinformationUI 以全局路径注册此类值。 */
        class t_img_tUI { }
    }
}

// 依赖登记（不重复声明，避免与并行批次 TS2300）：
//  - ui.com.hero_icon2UI（包装变量 Hk，@3764615，AH 在途）：sg-externals-b.d.ts 已声明（同身份）；
//  - ui.bag.bagItemUI（包装变量 v_，@3408414）：sg-externals.d.ts 已声明（-t/-x/-y/-ad/-ah 亦登记）；
//  - laya.ui.View / laya.html.dom.HTMLDivElement：libs/LayaAir.d.ts 引擎本体；
//  - 基座 sg.view.com.ItemBase（批次 A）/ sg.view.com.ComPayType（批次 AE）：已译真类（本批直接 import）；
//  - 批内互引 ui.com.hero_icon1UI（Dk）/ ui.com.army_icon2UI（CC）：本批真类模块直引，无 ambient；
//  - 本批真类落地后，既有同名 ambient 声明（sg-externals-b.d.ts 的 panel_bg_btn_sUI/hero_icon1UI/
//    item_bagUI/building_tips0-3UI、sg-externals-x.d.ts 的 country_flag1/2/3UI 等）与本批模块类
//    并存不冲突（module 空间 vs 全局 namespace 空间；Laya.class 注册后两路径运行期同一对象）。
