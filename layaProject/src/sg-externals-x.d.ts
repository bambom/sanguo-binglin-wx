/**
 * sg-externals-x.d.ts —— 批次 X 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 X = ui.duplicate.* 34 个 IDE 皮肤 UI 类。本文件只声明：
 *  1. 本批译文（src/sg/ui/duplicate/*.ts createChildren 的 regComponent 调用）实际以
 *     全局注册路径引用、且现有 sg-externals*.d.ts 未声明的缓译组件类；
 *  2. 成员面按原文调用面最小化声明（regComponent 仅取类值，无成员触达 → 空类体）。
 * 已有声明不重复（ui.com.hero_icon1UI/hero_icon2UI/panel_bg_btn_sUI/item_titleUI 在
 * sg-externals-b.d.ts；ui.bag.bagItemUI 在 sg-externals.d.ts/-t；sg.duplicate.view.
 * DuplicateCountryBar 在 sg-externals-v.d.ts）——ambient namespace 合并，不改动既有文件。
 * 引擎类（laya.display.Text / laya.html.dom.HTMLDivElement / laya.ui.View）由
 * layaProject/LayaAir.d.ts 声明，不在此重复。
 * 身份证据（inventory byVar + 声明器注册双证）：batch-x-report §2、resolve_x.js。
 * 后续批次翻译到某类后，声明保留不删（Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace ui {

    namespace com {
        /** ui.com.hero_power2UI（包装变量 fT，声明器注册 @workcopy char3769747）——
         *  英雄战力条组件；leaderBaseUI / duplicateTroopItemUI / CrossServiceTroopDetailUI
         *  regComponent 引用；未译缓译 */
        class hero_power2UI { }
        /** ui.com.country_flag1UI（包装变量 vk，@char3751835）—— 国家旗标 1；
         *  rankBaseDupUI regComponent 引用；未译缓译 */
        class country_flag1UI { }
        /** ui.com.country_flag2UI（包装变量 bk，@char3752380）—— 国家旗标 2；
         *  duplicateCountryBarUI / reportBaseDupUI / CrossServiceCityInfo1UI / topUI /
         *  settleAccountsUI regComponent 引用；未译缓译 */
        class country_flag2UI { }
        /** ui.com.country_flag3UI（包装变量 xk，@char3753070）—— 国家旗标 3；
         *  CrossServiceFinishUI / settleAccountsUI regComponent 引用；未译缓译 */
        class country_flag3UI { }
        /** ui.com.rank_inder_img_t_bigUI（包装变量 SM，@char3791569）—— 排行名次大图；
         *  rankBaseDupUI regComponent 引用；未译缓译 */
        class rank_inder_img_t_bigUI { }
        /** ui.com.img_c_txt_cUI（包装变量 UT，@char3775337）—— 图-文-图组件；
         *  duplicateTroopItemUI regComponent 引用；未译缓译 */
        class img_c_txt_cUI { }
        /** ui.com.hero_lv2UI（包装变量 uT，@char3768259）—— 英雄等级 2；
         *  duplicateTroopItemUI regComponent 引用；未译缓译 */
        class hero_lv2UI { }
        /** ui.com.panel_bg_btnUI（包装变量 PC，@char3740342）—— 面板背景按钮；
         *  CrossServiceTroopDetailUI / duplicateTroopUI / faqUI / heroSendDupUI /
         *  rankDupUI / reportDupUI / taskDupUI / userInfoDupUI regComponent 引用；
         *  未译缓译 */
        class panel_bg_btnUI { }
        /** ui.com.btn_icon_txt_txtUI（包装变量 VC，@char3741967）—— 图标+双行文字按钮；
         *  CrossServiceTroopDetailUI / settleAccountsUI regComponent 引用；未译缓译 */
        class btn_icon_txt_txtUI { }
    }

    namespace menu {
        /** ui.menu.troopListUI（包装变量 $I，@char3682676）—— 兵队列表组件；
         *  CrossServiceMainUI regComponent 引用；未译缓译 */
        class troopListUI { }
    }

    namespace map {
        /** ui.map.troopEditArmyUI（包装变量 pB，@char3825565）—— 兵队编辑军组件；
         *  CrossServiceTroopDetailUI regComponent 引用；未译缓译 */
        class troopEditArmyUI { }
    }
}

declare namespace sg {

    namespace duplicate {
        namespace view {
            /** sg.duplicate.view.DuplicateBottomBar（包装变量 xD，@char4163029）——
             *  副本底栏；CrossServiceMainUI / settleAccountsUI regComponent 引用；未译缓译 */
            class DuplicateBottomBar { }
            /** sg.duplicate.view.DuplicateBottomIcon（包装变量 wD，@char4164785）——
             *  副本底栏图标；CrossServiceMainUI / settleAccountsUI regComponent 引用；未译缓译 */
            class DuplicateBottomIcon { }
            /** sg.duplicate.view.DuplicateIcon（包装变量 kD，@char4167134）——
             *  副本图标；duplicateTroopUI / settleAccountsUI / signupUI regComponent 引用；未译缓译 */
            class DuplicateIcon { }
        }
    }

    namespace view {
        namespace com {
            /** sg.view.com.TipsIcon（包装变量 CK，@char4826845）—— 提示图标组件；
             *  signupUI regComponent 引用；未译缓译 */
            class TipsIcon { }
        }
    }
}
