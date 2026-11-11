/**
 * sg-externals-t.d.ts —— 批次 T 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 覆盖 16 个 sg.god.view.* 视图类（ViewChooseByType…ViewTalentInfo）触碰的批次外标识符：
 *  1. ui.god.* 16 个 IDE UI 基类（chooseByTypeUI/godCheckUI/…/godInfoUI，包装变量
 *     RP/FP/HP/OP/GP/WP/zP/YP/qP/KP/QP/JP/ZP/iD/eD/nD，@4144178–4159155 簇，基类
 *     tm=sg.view.ViewPanel 已译）——未译，本批视图类 extends 经全局注册路径在模块
 *     装载期解析（等价原 UMD 闭包 `(RP)` 实参绑定）。字段面取自各 UI 类构造器
 *     字段初始化器（this.X=null 序列，_uifields.js 实测）。
 *  2. sg.god.model.ModelGodIcon（Wi，池化名 i(7852)，@818936）—— new Wi(god) 数据壳。
 *  3. sg.god.model.ModelGodSkill（zi，池化名 i(8661)，@819363）—— 技能表静态
 *     （批次 R 在译；instanceof 值面 + 静态面）。
 *  4. sg.god.components.GodIcon/GodSkillItem/GodEquipItem/GodIconS（nO/pO/sO/uO）
 *     —— 批次 S 在译；本批仅作 list.itemRender 值引用（实例方法面由渲染回调 any 参承接）。
 *  5. sg.view.inside.ItemEquip（KX，@4743440）—— list_equip.itemRender 值引用。
 *  6. sg.activities.model.ModelPolice（Fh，@1634086）—— instance.cityUseGod。
 *  7. sg.god.model.ModelGodMain 实例成员面（interface 合并，类本体在 sg-externals.d.ts）。
 *
 * 规则同 sg-externals.d.ts：只声明本批代码实际触碰的成员面；类型未取证处用 any；
 * 成员名与原包逐字一致（godStateUpgredeUI 拼写保留）。既有声明不重复：
 * ModelWilderness($s)/ArrayUtils(ge)/ModelEquip(nr)/ModelGodMain 类体/bagItemUI(v_)
 * 已在 sg-externals*.d.ts，缺静态（ModelGod.getElementName 等 4 静态、
 * ModelEquip.getAllGodEquipInfoHtml）由调用点 (<any>) cast 承接（批次 Q clearEvents 先例）。
 */

declare namespace ui {
    namespace god {
        /** 类型面基座：sg.view.ViewPanel 已译，此处仅登记本批视图类 this 触碰的基座成员 */
        class GodViewPanelSurface extends laya.ui.View {
            currArg: any;
            closeSelf(over?: any): void;
        }
        /** ui.god.chooseByTypeUI（包装变量 RP，@4144284） */
        class chooseByTypeUI extends GodViewPanelSurface {
            imgName: any; txt_title: any; list: any;
        }
        /** ui.god.chooseByWuxingUI（包装变量 FP，@4144740） */
        class chooseByWuxingUI extends GodViewPanelSurface {
            imgName: any; txt_title: any;
            btn_0: any; txt_0: any; btn_1: any; txt_1: any; btn_2: any; txt_2: any;
            btn_3: any; txt_3: any; btn_4: any; txt_4: any;
        }
        /** ui.god.costConfirmUI（包装变量 HP，@4145136） */
        class costConfirmUI extends GodViewPanelSurface {
            box: any; bg: any; comTitle: any; txt_tips: any; btn_yes: any; btn_no: any;
            box_list: any; list: any; btn_right: any; btn_left: any;
        }
        /** ui.god.godBookUI（包装变量 OP，@4145582） */
        class godBookUI extends GodViewPanelSurface {
            comTitle: any; godItem: any; comType: any; tab: any; list: any; comName: any;
        }
        /** ui.god.godCheckUI（包装变量 GP，@4146483） */
        class godCheckUI extends GodViewPanelSurface {
            btn_help: any; comTitle: any; btn_detail: any; btn_recovery: any; btn_install: any;
            btn_lock: any; btn_book: any; comName: any; btn_wuxing: any; btn_type: any;
            btn_sort: any; list: any; txt_godNum: any; comGstr: any; comGagi: any;
            comScore: any; skillList: any; box_selectAll: any; btn_selectAll: any;
            btn_selectAll2: any; icon_god: any;
        }
        /** ui.god.godDetailUI（包装变量 WP，@4148128） */
        class godDetailUI extends GodViewPanelSurface {
            box: any; btn_help: any; comTitle: any; godItem: any; btn_right: any; btn_left: any;
            comName: any; comScore: any; btn_lock: any; list_equip: any; btn_state: any;
            txt_stateName: any; txt_state: any; btn_lv: any; txt_lvName: any; txt_lv: any;
            txt_equip: any; txt_skill: any; comGstr: any; comGagi: any; comType: any;
            skillList: any; btn_skillHelp: any; btn_equipHelp: any; btn_uninstall: any;
        }
        /** ui.god.godEquipUI（包装变量 zP，@4149018） */
        class godEquipUI extends GodViewPanelSurface {
            comTitle: any; boxLeft: any; list_equip: any; boxRight: any; list: any;
            txt_equip: any; txt_tips: any; icon: any; boxBottom: any; btn_install: any;
            com_cost: any;
        }
        /** ui.god.godRecoveryUI（包装变量 YP，@4151042） */
        class godRecoveryUI extends GodViewPanelSurface {
            box: any; bg: any; comTitle: any; txt_tips0: any; txt_tips1: any;
            btn_yes: any; btn_no: any; box_list: any; list: any; btn_right: any; btn_left: any;
        }
        /** ui.god.godResetUI（包装变量 qP，@4151624） */
        class godResetUI extends GodViewPanelSurface {
            box: any; bg: any; comTitle: any; btn_payReset: any; btn_reset: any;
            txt_tips1: any; txt_tips2: any; list: any; btn_l: any; btn_r: any;
            txt_reset: any; txt_payReset: any; com_cost: any;
        }
        /** ui.god.godSkillUI（包装变量 KP，@4153395） */
        class godSkillUI extends GodViewPanelSurface {
            comTitle: any; btn_forget: any; txt_name: any; txt_state: any; txt_info: any;
            tab: any; list: any; btn_upgrade: any; icon: any; com_item: any; com_gold: any;
        }
        /** ui.god.godSkillDeleteUI（包装变量 QP，@4154019） */
        class godSkillDeleteUI extends GodViewPanelSurface {
            btn_del: any; icon_item: any; txt_Info: any; txt_title: any; txt_tips: any;
            icon_gold: any; txt_back: any; com_cost: any;
        }
        /** ui.god.godSkillTipsUI（包装变量 JP，@4155020） */
        class godSkillTipsUI extends GodViewPanelSurface {
            icon: any; txt_name: any; txt_num: any; txt_type: any; txt_info: any;
        }
        /** ui.god.godSortUI（包装变量 ZP，@4155451） */
        class godSortUI extends GodViewPanelSurface {
            imgName: any; txt_title: any; list: any; btn_propCheck: any;
            btn_inbornCheck: any; btn_close: any;
        }
        /** ui.god.godStateUpgredeUI（包装变量 iD，@4156731；Upgrede 原文拼写如此） */
        class godStateUpgredeUI extends GodViewPanelSurface {
            ani_god: any; box: any; bg: any; comTitle: any; comScore: any; comName: any;
            txt_stateName: any; btn_reset: any; icon_god: any; txt_tips: any;
            txt_current: any; txt_after: any; comGagi: any; comGstr: any; com_cost: any;
            btn_upgrade: any; txt_state: any; box_ani: any; img_god: any;
        }
        /** ui.god.godUpgradeUI（包装变量 eD，@4157583） */
        class godUpgradeUI extends GodViewPanelSurface {
            box: any; bg: any; comTitle: any; txt_tips: any; txt_current: any;
            txt_after: any; comDef: any; comHpm: any; comAtk: any; btn_autoUpgrade: any;
            btn_upgrade: any; icon_god: any; btn_reset: any; com_cost: any;
            comScore: any; comName: any;
        }
        /** ui.god.godInfoUI（包装变量 nD，@4159007） */
        class godInfoUI extends GodViewPanelSurface {
            mBox: any; img_name: any; txt_name: any; container_info: any;
        }
    }
}

declare namespace sg {
    namespace god {
        namespace model {
            /** sg.god.model.ModelGodIcon（包装变量 Wi，池化名 i(7852)，@818936）——
             *  神灵图标数据壳（ctor(god, cfg?)；god/red/canClick/showLock/hid 等动态字段） */
            class ModelGodIcon {
                constructor(god?: any, cfg?: any);
                [key: string]: any;
            }
            /** sg.god.model.ModelGodSkill（包装变量 zi，池化名 i(8661)，@819363；批次 R 在译）——
             *  技能表静态 + instanceof 值面 */
            class ModelGodSkill {
                static allSkills: any;
                static getSkillByItemId(itemId: any): any;
                static getGodSkillNatureName(nature: any, flag?: any): any;
                static getLvInfo(id: any, lv: any): any;
                static getAllGodSkillInfoHtml(data: any): any;
                static getGodSkillName(id: any): any;
            }
            /** ModelGodMain 实例成员面增量（类本体声明在 sg-externals.d.ts，批次 T interface 合并） */
            interface ModelGodMain {
                cfg_rest: any;
                on(type: any, caller: any, listener: any, args?: any): any;
                off(type: any, caller: any, listener: any): any;
                event(type: any, data?: any): any;
                getModels(): any[];
                getModelsById(ids: any): any[];
                getModelsByWuxing(w: any): any[];
                getModelsByType(t: any): any[];
                getModelByEquip(equip: any): any;
                godChangeLock(id: any, lock: any): void;
                godInstall(hid: any, id: any, cb?: any): void;
                godUninstall(hid: any, cb?: any): void;
                godRecovery(ids: any): void;
                godReset(id: any, flag: any, cb?: any): void;
                godUpgrade(id: any, flag: any, cb?: any): void;
                godStateUpgrade(id: any, cb?: any): void;
                godSkillUpgrade(id: any, skillId: any, sindex: any, cb?: any): void;
                godSkillForget(id: any, sindex: any, cb?: any): void;
                godInstallEquip(id: any, equipId: any, propIndex: any, type: any, cb?: any): void;
                godUninstallEquip(id: any, type: any): void;
            }
        }
        namespace components {
            /** sg.god.components.GodIcon（包装变量 nO，@4351967）—— 批次 S 在译；itemRender 值引用 */
            class GodIcon { [key: string]: any; }
            /** sg.god.components.GodIconS（包装变量 uO，@4356754）—— 批次 S 在译；itemRender 值引用 */
            class GodIconS { [key: string]: any; }
            /** sg.god.components.GodSkillItem（包装变量 pO，@4360615）—— 批次 S 在译；itemRender 值引用 */
            class GodSkillItem { [key: string]: any; }
            /** sg.god.components.GodEquipItem（包装变量 sO，@4349912）—— 批次 S 在译；itemRender 值引用 */
            class GodEquipItem { [key: string]: any; }
        }
    }
    namespace activities {
        namespace model {
            /** sg.activities.model.ModelPolice（包装变量 Fh，@1634086）—— 城防神灵占用判定 */
            class ModelPolice {
                static instance: ModelPolice;
                cityUseGod(id: any): any;
            }
        }
    }
    namespace view {
        namespace inside {
            /** sg.view.inside.ItemEquip（包装变量 KX，@4743440）—— itemRender 值引用 */
            class ItemEquip { [key: string]: any; }
        }
        // 注：sg.view.ViewPanel 不在此重声明 —— sg-externals-u.d.ts 已有最小类面（批次 U）。
        // ViewGodCheck 原文字面路径 sg.view.ViewPanel.prototype.getSpriteByName 的类型缺口
        // 由调用点 <any> 断言桥接（断言在 emit 中擦除，链形态与 oracle 一致）。
    }
}
