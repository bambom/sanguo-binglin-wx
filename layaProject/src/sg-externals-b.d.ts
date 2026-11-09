/**
 * sg-externals-b.d.ts —— 批次 B 触达的批次外运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 与 sg-externals.d.ts（批次 A）同规则：只声明批次 B 代码实际触碰的成员面；
 * 类型未取证处用 any；成员名与原包逐字一致；后续批次翻译到某类后删除对应声明
 * 并改真实 TS 模块 import。批次外类在 code1.js 内经 Laya.class 注册到全局 sg.*，
 * 调用期解析（= 原 UMD 闭包变量），本文件仅补类型层，不引入任何运行时桩。
 *
 * 身份依据（code1.js 注册处实测，工具 temp/sanguo-binglin-wx/analysis/batch_b/
 * find_def.js + identify_hosts.js；span 见 translation-ledger.md §6.1）：
 *   ss=sg.utils.FunMsgByValue @1108481、ge=sg.map.utils.ArrayUtils @918331、
 *   ps=sg.utils.TimeHelper @1141426、ds=sg.utils.ServerDate @1129362、
 *   ye=sg.map.utils.Math2 @924794、Vi=sg.god.model.ModelGodAct @814962（池化名 t(9746)）、
 *   ws=sg.zmPlatform.ConstantZM @1191140、nr=sg.model.ModelEquip、Kr=sg.model.ModelUser。
 * sg.sdks.* 渠道 SDK 类（ConfigApp.initH5sdk 装配）、sg.model.* 数据模型类
 * （ModelManager.init / ModelAlert / QueueManager 引用面）按注册名逐类登记。
 */
declare namespace sg {

    namespace utils {
        /** sg.utils.FunMsgByValue（包装变量 ss）—— {n} 占位逐参替换 */
        class FunMsgByValue {
            static msg_replace_func(t: any, i: any, e: any): any;
        }
        /** sg.utils.TimeHelper（包装变量 ps）—— 时间轴工具 */
        class TimeHelper {
            static getTimeStamp(i: any): any;
            static getSplicingTimeStamp(i: any, e?: any): any;
            static getOffsetMin(): any;
            static changeConfigTime(i: any): any;
            static remainTimeStr(i: any, mode: any): any;
            static timeFormat(fmt: any, t: any): any;
            static dateFormat(fmt: any, t: any): any;
        }
        /** sg.utils.ServerDate（包装变量 ds）—— 带开服偏移的日期包装（new 实例使用） */
        class ServerDate {
            constructor(v?: any);
            toServerTimeString(): any;
            setHours(h: any, m: any, s: any, ms: any): void;
            getTime(): number;
            getHours(): number;
            getMinutes(): number;
            getSeconds(): number;
            getMilliseconds(): number;
        }
        /** sg.utils.MessagePack（NetSocket 用） */
        class MessagePack {
            static decode(data: any): any;
        }
        /** sg.utils.FastSha256 */
        class FastSha256 {
            static hmac(a: any, b: any): any;
        }
    }

    namespace map {
        namespace utils {
            /** sg.map.utils.ArrayUtils（包装变量 ge）—— 含 sortOn 多键排序 */
            class ArrayUtils {
                static sortOn(keys: any, arr: any, a?: any, b?: any): any;
            }
            /** sg.map.utils.Math2（包装变量 ye）—— 角度换算等 */
            class Math2 {
                static radianToAngle(r: any): any;
            }
            /** sg.map.utils.Vector2（ObjectUtil 用；angle 属性） */
            class Vector2 {
                constructor(x?: any, y?: any);
                angle: any;
            }
        }
        namespace model {
            namespace entitys {
                /** sg.map.model.entitys.EntityCity（EffectManager 用） */
                class EntityCity {
                    static getCityRes(t: any): any;
                }
            }
        }
    }

    namespace god {
        namespace model {
            /** sg.god.model.ModelGodAct（包装变量 Vi，池化名 t(9746)）—— 含 Desm 串解密与测试注入 */
            class ModelGodAct {
                static desm(h: any, key: any): any;
                static cEnS: any;
                static deS: any;
                static benja(a: any): void;
                static bens(a: any): void;
            }
        }
    }

    namespace model {
        /** sg.model.ModelEquip（包装变量 nr）—— canBuyEquipItem 领取判定 + 装备表 */
        class ModelEquip {
            static canBuyEquipItem(id: any, e?: any): boolean;
            static equipModels: any;
        }
        // ---- ModelAlert / ModelManager / QueueManager / ConfigServer 引用面（批次外模型）----
        class ModelClimb {
            static checkClimbWill(): any;
            static checkPkWill(): any;
        }
        class ModelOfficial {
            static getImpeachStatus(): any;
            static getInvadeAwardMax(): any;
            static getInvadeCfg(s?: any): any;
            /** 国家公告/城市名（QueueManager、ViewNotice 引用面） */
            static countries: any;
            static cities: any;
            static getCityName(id?: any): any;
            static getCountrNoticeData(): any;
            static checkCountryKingTips(): any;
        }
        /** sg.model.ModelOffice（ConfigServer.useOffice37 / ModelAlert 官署红点） */
        class ModelOffice {
            static useOffice37(): any;
            static checkLocalRedPoint(): any;
            static checkOfficeWill(): any;
        }
        class ModelSPArmy { static redPoint: any; static models: any; }
        class ModelSoul { static redPoint: any; static models: any; }
        class ModelTask {
            static checkWorkWill(): any;
        }
        class ModelTaskBuild { static instance: any; }
        class ModelTaskCountry { static instance: any; }
        class ModelTaskDaily { static instance: any; }
        class ModelTaskOrder { static instance: any; }
        class ModelTaskPromote { static instance: any; }
        class ModelTaskTrain { static instance: any; }
        class ModelNewMilepost { static instance: any; }
        class ModelTreasureHunting { static instance: any; }
        class ModelLegend { static instance: any; }
        class ModelTomb { static instance: any; }
        class ModelChampion { static instance: any; }
        class ModelHappy { static instance: any; }
        class ModelArena { static instance: any; }
        class ModelAwaken { static instance: any; static awakenModels: any; }
        class ModelBlessHero { static instance: any; static clearModels(): any; }
        class ModelBuff { static instance: any; static expeditionCid: any; }
        class ModelChampionNew { static instance: any; }
        class ModelChat { static instance: any; }
        class ModelCountryPvp { static instance: any; }
        class ModelFightTask { static instance: any; }
        class ModelFormation { static instance: any; static getArmySize(...args: any[]): any; }
        class ModelGuild { static instance: any; }
        class ModelGwent { static instance: any; }
        class ModelIdolLogin { static instance: any; }
        class ModelInside { static instance: any; }
        class ModelMB { static instance: any; }
        class ModelNGTask { static instance: any; }
        class ModelNewTask { static instance: any; }
        class ModelSalePay { static instance: any; static getOverdueList(): any; }
        class ModelScheme { static instance: any; static models: any; }
        class ModelScience { static instance: any; static modelSciences: any; }
        class ModelSettings { static instance: any; }
        class ModelSkill { static instance: any; static skillModels: any; static isLearnable(id?: any): any; }
        class ModelTalent { static instance: any; static talentModels: any; }
        class ModelTradeShop { static instance: any; }
        class ModelTroopManager { static instance: any; }
        class ModelViewHomeLand { static instance: any; }
    }

    namespace view {
        namespace init {
            /** sg.view.init.ViewAffiche（ModelAlert 公告红点） */
            class ViewAffiche { static redCheck: any; }
            /** sg.view.init.ViewHeroTalk2（QueueManager 引用，与 ViewHeroTalk 区分） */
            class ViewHeroTalk2 { }
        }
        namespace hero {
            /** sg.view.hero.ViewAwakenHero */
            class ViewAwakenHero { static checkGiftDict(data?: any): any; }
        }
        namespace menu {
            /** sg.view.menu.ViewMenuTop（ViewMenuScene.view_top；闭包宽，批次外） */
            class ViewMenuTop { }
        }
    }

    namespace cfg {
        /** sg.cfg.ConfigColor */
        class ConfigColor {
            static defaultColorData: any;
            static standardMat: any;
        }
    }

    namespace scene {
        namespace constant {
            /** sg.scene.constant.ConfigConst（与 ConfigConstant 并存的另一个常量类，原文如此） */
            class ConfigConst {
                static init(): void;
            }
        }
    }

    namespace net {
        /** sg.net.NetMethodCfg（NetSocket 组包） */
        class NetMethodCfg {
            static createPkg(...args: any[]): any;
        }
        /** sg.net.NetVo（NetHttp 请求值对象） */
        class NetVo {
            constructor(t?: any, i?: any, e?: any, s?: any);
        }
    }

    namespace fight {
        namespace client {
            namespace cfg {
                /** sg.fight.client.cfg.ConfigFightView（Jt，视图常量） */
                class ConfigFightView {
                    static ARMY_ICON_BG: any;
                    static ARMY_ICON_FORMATION: any;
                    static SP_ARMY_ICON_BG: any;
                    static SP_ARMY_ICON_FORMATION: any;
                    static BAG_OFFSET_X: any;
                    static BAG_OFFSET_Y: any;
                    static SP_ARMY_ICON_STATENAME: any;
                    static isSlantScene: any;
                    static init(): void;
                }
            }
            namespace utils {
                /** sg.fight.client.utils.FightLoad */
                class FightLoad {
                    static getPersonResId(a: any): any;
                }
            }
        }
        namespace logic {
            namespace cfg {
                /** sg.fight.logic.cfg.ConfigFight（gi） */
                class ConfigFight {
                    static init(): void;
                }
            }
            namespace utils {
                /** sg.fight.logic.utils.FightPrint（Mi，测试打印） */
                class FightPrint {
                    static print(t: any, i?: any, e?: any): void;
                }
                /** sg.fight.logic.utils.FightUtils（Ni）—— 合并/数组转对象/混色 */
                class FightUtils {
                    static mergeObj(...args: any[]): any;
                    static arrayToObject(...args: any[]): any;
                    static mix(...args: any[]): any;
                }
            }
        }
    }

    namespace manager {
        /** sg.manager.FilterManager（ce） */
        class FilterManager { static instance: any; }
        /** sg.manager.ViewManager —— 真身为已译模块 ../manager/ViewManager.ts（批次 A）；
         * 批次 B 部分文件按原文走 sg.manager.ViewManager 全局注册路径（调用期同一对象），
         * 此处仅类型层占位（instance 取 any 以覆盖宽成员面）。 */
        class ViewManager { static instance: any; }
    }

    namespace crossService {
        namespace model {
            /** sg.crossService.model.CrossServiceUserModel */
            class CrossServiceUserModel { static instance: any; }
        }
    }

    namespace home {
        namespace model {
            /** sg.home.model.HomeModel（ModelManager.modelHome 实例化） */
            class HomeModel { }
        }
    }

    namespace heritage {
        /** sg.heritage.ModelTrait / ModelTraitAbility（xo/wo） */
        class ModelTrait { static instance: any; static traitModels: any; }
        class ModelTraitAbility { static instance: any; static abilityModels: any; }
    }

    namespace task {
        /** sg.task.TaskHelper */
        class TaskHelper {
            static instance: any;
            static clear(): void;
        }
    }

    namespace achievement {
        namespace model {
            /** sg.achievement.model.ModelAchievement */
            class ModelAchievement {
                static instance: any;
                static clear(): void;
            }
        }
    }

    namespace festival {
        namespace model {
            /** sg.festival.model.ModelFestival */
            class ModelFestival { static instance: any; }
        }
    }

    namespace activities {
        namespace model {
            /** sg.activities.model.* —— 活动侧数据模型（ModelManager 清场 / QueueManager 弹窗队列）*/
            class ModelActivities {
                static instance: any;
                static clear(): void;
            }
            class ModelMemberCard { static instance: any; }
            class ModelLoopCard { static instance: any; }
            class ModelWeekCard { static instance: any; }
            class ModelPayRank { static instance: any; }
        }
    }

    namespace guide {
        namespace model {
            /** sg.guide.model.GuideChecker（ModelManager 清场） */
            class GuideChecker {
                static instance: any;
                static clear(): void;
            }
        }
    }

    namespace kunlun {
        namespace model {
            /** sg.kunlun.model.ModelExorcism / ModelKunlunSale */
            class ModelExorcism { static instance: any; }
            class ModelKunlunSale { static instance: any; }
        }
    }

    namespace test {
        namespace testpakcage {
            /** sg.test.testpakcage.TestPackage（原文拼写 testpakcage 如此） */
            class TestPackage {
                static addPackage(a?: any, b?: any, c?: any, d?: any): any;
            }
        }
    }

    namespace duplicate {
        /** sg.duplicate.ModelDuplicate */
        class ModelDuplicate { static instance: any; }
    }

    namespace zmPlatform {
        /** sg.zmPlatform.ConstantZM（包装变量 ws）—— 平台常量（platform 覆盖 pf） */
        class ConstantZM {
            static platform: any;
        }
    }

    namespace sdks {
        /** sg.sdks.* —— H5/渠道 SDK 类（ConfigApp.initH5sdk 按渠道 new 装配到
         * Laya.Platform.h5_sdk；批次外，全部仅 ctor 契约 (pf, params)） */
        class H5CB37 { constructor(pf?: any, params?: any); }
        class H5CB37Kr { constructor(pf?: any, params?: any); }
        class H5CBAWY { constructor(pf?: any, params?: any); }
        class H5CBMOJIE { constructor(pf?: any, params?: any); }
        class H5CBMengWoAi { constructor(pf?: any, params?: any); }
        class H5CBR2 { constructor(pf?: any, params?: any); }
        class H5CBYYJH { constructor(pf?: any, params?: any); }
        class H5CBZhangWan { constructor(pf?: any, params?: any); }
        class H5FS37 { constructor(pf?: any, params?: any); }
        class WXFS37 { constructor(pf?: any, params?: any); }
        class H5JJ37 { constructor(pf?: any, params?: any); }
        class H5JJMG1 { constructor(pf?: any, params?: any); }
        class H5JJMG2 { constructor(pf?: any, params?: any); }
        class H5SG37 { constructor(pf?: any, params?: any); }
        class H5SG4BuGu { constructor(pf?: any, params?: any); }
        class H5SG5599 { constructor(pf?: any, params?: any); }
        class H5SG7477 { constructor(pf?: any, params?: any); }
        class H5SG77You { constructor(pf?: any, params?: any); }
        class H5SGBuGu { constructor(pf?: any, params?: any); }
        class H5SGChaoYi { constructor(pf?: any, params?: any); }
        class H5SGDQD { constructor(pf?: any, params?: any); }
        class H5SGMengyou { constructor(pf?: any, params?: any); }
        class H5SGMuYou { constructor(pf?: any, params?: any); }
        class H5SGMuYou1 { constructor(pf?: any, params?: any); }
        class H5SGQianGuo { constructor(pf?: any, params?: any); }
        class H5SGWakool { constructor(pf?: any, params?: any); }
        class H5SGWende { constructor(pf?: any, params?: any); }
    }
}

// ---------------------------------------------------------------------------
// ui.com.* —— IDE 生成 UI 组件类（regComponent 注册值 / EffectManager new item_bagUI）
// ---------------------------------------------------------------------------
declare namespace ui {
    namespace com {
        class panel_bg_btn_sUI { }
        class item_titleUI { }
        class payTypeBigUI { }
        class payTypeSUI { }
        class hero_icon1UI { }
        class hero_icon2UI { }
        class rank_index_img_tUI { }
        /** item_bagUI —— EffectManager 飞行背包道具（icon 子图 + pos/anchor/alpha 动效面） */
        class item_bagUI {
            icon: any;
            anchorX: any;
            anchorY: any;
            alpha: any;
            pos(x?: any, y?: any, speed?: any): any;
        }
    }
}

// ==================== 批次 C 增补 2026-11-10（Laya.Platform 翻译触达面）====================
// 追加规则：本节只新增声明（含与批次 A/B 既有 class 合并的 interface），零改动上文已有行。
// 身份依据（code1.js 注册处实测，工具 temp/sanguo-binglin-wx/analysis/batch_c/
// resolve_vars_c.js + probe_decl_c.js）：Ke=sg.sdks.Huawei、wn=sg.sdks.TxExeSdk、
// hs=sg.utils.MD5、ts=sg.utils.Base64、Bit=sg.view.qqdt.ViewQQDT、Lr=sg.model.ModelQQDT、
// oit=sg.view.menu.ViewPayWeb（showView 类引用，无成员访问）。
declare namespace sg.sdks {
    /** sg.sdks.Huawei（包装变量 Ke）—— 华为渠道签名/商店通道（obtainCheck/pay hw 分支） */
    class Huawei {
        static getToken(): any;
        static getSign(): any;
        static getAppID(): any;
        static getCallBackURL(): any;
        static getCpName(): any;
        static getMerchantId(): any;
    }
    /** sg.sdks.TxExeSdk（包装变量 wn）—— 腾讯应用宝 SDK（i=运行时 SDK 实例） */
    class TxExeSdk {
        static i: any;
    }
}
declare namespace sg.utils {
    /** sg.utils.MD5（包装变量 hs） */
    class MD5 {
        static md5(s: any): any;
    }
    /** sg.utils.Base64（包装变量 ts） */
    class Base64 {
        static decode(s: any): any;
    }
}
declare namespace sg.view {
    namespace qqdt {
        /** sg.view.qqdt.ViewQQDT（包装变量 Bit） */
        class ViewQQDT {
            static isTest: any;
        }
    }
    namespace menu {
        /** sg.view.menu.ViewPayWeb（包装变量 oit）—— muyou_ios_vn2/vn3 充值 WebView（类引用） */
        class ViewPayWeb {
        }
    }
}
declare namespace sg.model {
    /** sg.model.ModelQQDT（包装变量 Lr） */
    class ModelQQDT {
        static instance: ModelQQDT;
        openId: any;
        openKey: any;
    }
    /** 与批次 A 声明的 class ModelPlayer 合并（declaration merging，实例成员面）：
     * Laya.Platform login 的游客登录链（"meng52"/"meng52_temp_user_pwd"/thirdLoginType=="fb"） */
    interface ModelPlayer {
        thirdLoginType: any;
        getVisitorData(i: any, e: any): any;
        getVisitorDataTemp(i: any, e: any): any;
    }
}
