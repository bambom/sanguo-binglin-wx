/**
 * sg-externals-s.d.ts —— 批次 S 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 S 翻译 sg.god.components.* 14 个 UI 组件类（GodAgi/GodButton/GodEquipItem/
 * GodIcon/GodIconBig/GodIconS/GodStr/GodItem/GodName/GodPropLvup/GodScore/
 * GodSkillItem/GodSkillList/GodType）。本文件只声明：
 *  1. 14 类的 IDE 生成 UI 基类（ui.god.*UI 12 个 + ui.inside.equipItemUI，
 *     尚未翻译；字段清单=各 shell wrapper ctor 字段初始化器逐字取证
 *     [_ui_shells.json，code1.js 字节 [3544683,3548605) 连续簇]，仅声明本批
 *     代码实际触碰的成员；imgGod 为 equipItemUI 的 UI 元数据子节点——shell ctor
 *     未预声明、oracle GodEquipItem._setUI 实读，按 any 声明）。
 *     类型层 extends laya.ui.View（真实链 View←BaseSprite←ItemBase←shell 的
 *     引擎终段近似，本批仅触碰引擎成员+shell 字段）；运行时 __extends 解析
 *     全局 ui.god.* 值（由 shell 批次 Laya.class 注册装载）。
 *  2. 未翻译依赖类：sg.god.model.ModelGodSkill（批次 R 在译，此处仅类型面：
 *     instanceof 值 + getGodSkillName 静态）、sg.god.view.ViewGodEquip /
 *     ViewGodSkill（仅类值，showView 传参面）。
 *  3. interface 合并增补：sg.god.model.ModelGodMain 增实例 on/off/getModels
 *     （sg-externals.d.ts 已有 class 声明，interface 只能补实例成员，静态不并）。
 * 规则同 sg-externals.d.ts：成员名与原包逐字一致；后续批次翻译到某类后改真实 import。
 */

declare namespace ui {

    namespace god {
        /** ui.god.godPropUI（包装变量 zf，[3544683,3544917)，基 e_=ItemBase）—— GodAgi/GodStr 基类 */
        class godPropUI extends laya.ui.View {
            img: any;
            txt_name: any;
        }
        /** ui.god.btnGodUI（包装变量 jf，[3544925,3545160)）—— GodButton 基类 */
        class btnGodUI extends laya.ui.View {
            box_god: any;
            img_god: any;
        }
        /** ui.god.godIconUI（包装变量 qf，[3545483,3545913)）—— GodIcon 基类 */
        class godIconUI extends laya.ui.View {
            icon_s: any;
            box_inborn: any;
            list_inborn: any;
            img_skillFrame: any;
            box_prop: any;
            txt_gstr: any;
            txt_gagi: any;
        }
        /** ui.god.godIconBigUI（包装变量 Xf，[3545921,3546293)）—— GodIconBig 基类 */
        class godIconBigUI extends laya.ui.View {
            boxLv: any;
            txt_lv: any;
            img_change: any;
            img_god: any;
            img_frame: any;
            img_wuxing: any;
            box_hero: any;
            txt_hero: any;
        }
        /** ui.god.godIconSUI（包装变量 Kf，[3546301,3546729)）—— GodIconS 基类 */
        class godIconSUI extends laya.ui.View {
            img_lock: any;
            btn_check: any;
            boxLv: any;
            txt_lv: any;
            img_change: any;
            img_god: any;
            img_frame: any;
            img_select: any;
            img_wuxing: any;
            box_hero: any;
            txt_hero: any;
        }
        /** ui.god.godItemUI（包装变量 Qf，[3546737,3546956)）—— GodItem 基类 */
        class godItemUI extends laya.ui.View {
            img_god: any;
        }
        /** ui.god.godNameUI（包装变量 $f，[3546964,3547217)）—— GodName 基类 */
        class godNameUI extends laya.ui.View {
            txt_name: any;
            img: any;
            txt_icon: any;
        }
        /** ui.god.godPropLvupUI（包装变量 Jf，[3547225,3547474)）—— GodPropLvup 基类 */
        class godPropLvupUI extends laya.ui.View {
            txt_name1: any;
            txt_name2: any;
        }
        /** ui.god.godScoreUI（包装变量 Zf，[3547482,3547699)）—— GodScore 基类 */
        class godScoreUI extends laya.ui.View {
            txt: any;
        }
        /** ui.god.godSkillItemUI（包装变量 tp，[3547707,3548068)）—— GodSkillItem 基类 */
        class godSkillItemUI extends laya.ui.View {
            box: any;
            img_skill: any;
            img_frame: any;
            img_lock: any;
            box_name: any;
            txt_name: any;
            txt_num: any;
            img_select: any;
        }
        /** ui.god.godSkillListUI（包装变量 ip，[3548076,3548378)）—— GodSkillList 基类 */
        class godSkillListUI extends laya.ui.View {
            list: any;
            btn_l: any;
            btn_r: any;
        }
        /** ui.god.godTypeUI（包装变量 ep，[3548386,3548605)）—— GodType 基类 */
        class godTypeUI extends laya.ui.View {
            img_god: any;
        }
    }

    namespace inside {
        /** ui.inside.equipItemUI（包装变量 Yf，[3545168,3545475)，shell ctor 字段 item/imgSuc/select）
         *  —— GodEquipItem 基类；imgGod 为 UI 元数据子节点（loadUI("inside/equipItem") 运行期建，
         *  oracle GodEquipItem._setUI 实读，shell 未预声明，按 any）。 */
        class equipItemUI extends laya.ui.View {
            item: any;
            imgGod: any;
        }
    }
}

declare namespace sg {

    namespace god.view {
        /** sg.god.view.ViewGodEquip（包装变量 m5，未译）—— GodEquipItem._onClick showView 类值 */
        class ViewGodEquip { }
        /** sg.god.view.ViewGodSkill（包装变量 p5，未译）—— GodSkillList._onClickItem showView 类值 */
        class ViewGodSkill { }
    }
}

// 依赖登记（不重复声明，避免与并行批次 TS2300）：
//  - sg.god.model.ModelGodSkill（instanceof 值 + getGodSkillName 静态）由 sg-externals-t.d.ts
//    声明（批次 T 在译，实测 2026-11-11 含 static getGodSkillName(id:any):any）；
//  - sg.god.model.ModelGodMain 实例面 on/off/getModels 由 sg-externals-t.d.ts interface 合并
//    增补（class 主体在 sg-externals.d.ts）。
// 本批仅以上述既有声明为编译前提；若该文件撤回，需由主会话在合并时归位其一。
