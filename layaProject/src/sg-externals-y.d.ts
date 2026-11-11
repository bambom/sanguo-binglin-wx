/**
 * sg-externals-y.d.ts —— 批次 Y 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 Y 翻译 ui.god.* 28 个 + ui.inside.equipItemUI 共 29 个 IDE 皮肤 UI 类
 * （批次 S 报告 §8 登记的 F8 装载前置依赖：S 的 14 个 components 模块装载期
 * __extends 解析 ui.god.*UI 全局值）。本文件只声明本批译文实际以全局路径引用、
 * 且现有 sg-externals*.d.ts 未声明的标识符：
 *  1. ui.com.hero_icon_equipUI（包装变量 Jk，@3769285）—— createChildren 里
 *     View.regComponent 的类值实参（原文 Jk），未译缓译，保持全局注册路径
 *     （viewAlertUI.ts 批次 B 先例）。ui.com.panel_bg_btnUI（PC）由并行批次 X
 *     在 sg-externals-x.d.ts 声明（见尾注依赖登记）。
 *  2. sg.god.components.{GodItem,GodType,GodName,GodStr,GodAgi,GodScore,
 *     GodSkillList,GodIconBig,GodPropLvup}（9 个）—— 批次 S 已译真类的全局注册
 *     路径值面（Laya.class 注册后与本声明同一对象）；本批 createChildren 仅作
 *     regComponent 类值实参引用，成员面由批 S 真类承载，此处不重复声明成员。
 *     GodIconS/GodSkillItem/GodEquipItem 已由 sg-externals-t.d.ts 声明，不重复。
 *
 * 规则同 sg-externals.d.ts：成员名与原包逐字一致；后续批次翻译到某类后改真实
 * import（声明保留不删，Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace ui {

    namespace com {
        /** ui.com.hero_icon_equipUI（包装变量 Jk，唯一声明器 @3769285，注册字面量
         *  o(i,"ui.com.hero_icon_equipUI",t)）—— 武将装备图标；未译缓译，
         *  equipItemUI.createChildren 以全局路径注册此类值。 */
        class hero_icon_equipUI { }
    }
}

declare namespace sg {

    namespace god {
        namespace components {
            /** 批次 S 已译真类（src/sg/god/components/）——以下为全局注册路径值面
             *  （Laya.class 注册名逐字对应），本批仅作 regComponent 类值实参引用。 */
            class GodItem { [key: string]: any; }
            class GodType { [key: string]: any; }
            class GodName { [key: string]: any; }
            class GodStr { [key: string]: any; }
            class GodAgi { [key: string]: any; }
            class GodScore { [key: string]: any; }
            class GodSkillList { [key: string]: any; }
            class GodIconBig { [key: string]: any; }
            class GodPropLvup { [key: string]: any; }
        }
    }
}

// 依赖登记（不重复声明，避免与并行批次 TS2300）：
//  - ui.com.panel_bg_btnUI（包装变量 PC，同身份 @3746387）：批次 X 在译期间已抢先在
//    sg-externals-x.d.ts 声明（2026-11-11 实测 tsc-y1.txt TS2300 后让位），本批
//    godBookUI/godCheckUI/godDetailUI/godEquipUI/godSkillUI 引用其声明；
//  - ui.com.panel_bg_btn_sUI / ui.com.item_titleUI / ui.com.payTypeSUI：
//    sg-externals-b.d.ts 已声明；
//  - ui.bag.bagItemUI：sg-externals.d.ts 已声明；
//  - sg.god.components.GodIconS/GodSkillItem/GodEquipItem：sg-externals-t.d.ts 已声明；
//  - laya.ui.View / laya.html.dom.HTMLDivElement：libs/LayaAir.d.ts 引擎本体；
//  - 批内互引（godIconUI/godIconSUI/godSkillItemUI/equipItemUI）走真实 import，
//    不经本文件。
