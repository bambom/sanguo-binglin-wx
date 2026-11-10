/**
 * sg-externals.d.ts —— 批次 A 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 背景：原包 code1.js 是单一 UMD 闭包，全部类/配置经包装变量互引并经 Laya.class
 * 注册到全局 sg 命名空间（sg 根对象由主包 game.js/code.js 链创建，台账 §5/§7-7）。
 * 批次 A 只翻译 11 类；译文引用未翻译类时，按原文语义经全局注册路径
 * （sg.xxx.Yyy / Laya.Yyy）在调用期解析——与原 UMD 闭包变量在调用期取值等价。
 *
 * 规则：
 *  1. 本文件只声明批次 A 代码实际触碰的成员面；类型未取证处用 any。
 *  2. 后续批次翻译到某类后，应删除对应声明并改用真实 TS 模块 import。
 *  3. 成员名与原包逐字一致（含拼写错误如 recodrd_pay_info、clerMyTimer、enaled、
 *     ModelBuiding、AssetsCounry——原文如此，不得"顺手修正"）。
 */

// ---------------------------------------------------------------------------
// sg.<ns>.<Class> —— code1.js 内注册的业务类（批次 A 之外）
// ---------------------------------------------------------------------------
declare namespace sg {

    namespace net {
        /** sg.net.NetSocket（包装变量 pn，off [1399548 区域]，批次 B 目标） */
        class NetSocket {
            static instance: NetSocket;
            send(method: any, data?: any, complete?: any, opts?: any): void;
            on(type: any, caller: any, listener: any, args?: any): EventDispatcherLike;
            off(type: any, caller: any, listener: any): EventDispatcherLike;
            registerHandler(name: any, handler: any): void;
            clear(): void;
            clearEvents(): void;
        }
        /** sg.net.NetHttp（包装变量 fn） */
        class NetHttp {
            static instance: NetHttp;
            send(method: any, data?: any, complete?: any, opts?: any): void;
        }
    }

    namespace manager {
        /** sg.manager.ModelManager（包装变量 ue，池化注册名 i(16259)） */
        class ModelManager {
            static instance: ModelManager;
            static clear(): void;
            init(): void;
            modelUser: any;      // 含 updateData(data)/event(...) 等
            modelGame: any;
            modelAlert: any;
            modelProp: any;
            modelInside: any;
            modelClub: any;
            modelTroopManager: any;
        }
        /** sg.manager.AssetsManager（包装变量 re） */
        class AssetsManager {
            static getAssetsUI(name: any): any;
            static getAssetItemOrPayByID(id: any): any;
            static getAssetLater(name: any): any;
            static clearTempAll(): void;
        }
        /** sg.manager.EffectManager（包装变量 le） */
        class EffectManager {
            static loadAnimation(url: any, skin?: any, n?: any): any;
            static getAnimation(name: any): any;
            static createIconFlight(a: any, b: any, c: any, d: any, e: any, f?: any, g?: any, h?: any, i?: any): void;
            static textFlight(a: any, b: any, c: any, d: any, e?: any): void;
            static itemFlight(a: any, b: any, c: any, d: any, e?: any, f?: any): void;
            static loadHeroAnimation(a: any, b?: any, c?: any): any;
            static setSprAccuracy(a: any, b: any, c?: any, d?: any, e?: any, f?: any, g?: any): void;
        }
        /** sg.manager.ColorManager（包装变量 ae） */
        class ColorManager {
            static getUIColor(name: any, i?: any): any;
        }
        /** sg.manager.QueueManager（包装变量 Zs，台账 §4 managers 组） */
        class QueueManager {
            static instance: QueueManager;
            mIsOver: boolean;
            event(type: string, data?: any): boolean;
        }
    }

    namespace cfg {
        /** sg.cfg.ConfigApp（包装变量 Rt，池化名 t(12677)） */
        class ConfigApp {
            static initCfg(): void;
            static initPCHD(flag: any): void;
            static initPCHDText(): void;
            static initH5sdk(): void;
            static setFont(): void;
            static releaseMiniGame(): boolean;
            static releaseWeiXin(): boolean;
            static get_NET_CFG_URL(): any;
            static get_ASSETS_BASE_URL(): any;
            static lan(): any;
            static myPackagePf: any;
            static pf: string;
            static pchd: any;
            static isLandscape: boolean;
            static isPC: boolean;
            static isHorizontal: boolean;
            static mVsdebug: boolean;
            static isFirstInstall: boolean;
            static cfgvers: any;
            static sNetCfg: any;
            /** 原文赋 parseInt 结果/布尔混用（initOnPC），按 any 保留动态语义 */
            static isTest: any;
            static testFightType: any;
            static pf_channel: string;
            static lclip1: any;
            static topVal: number;
            static avoidTop: number;
            static avoidBottom: number;
        }
        /** sg.cfg.ConfigServer（包装变量 Gt，池化名 t(17516)）——运行时由配置装载填充 */
        class ConfigServer {
            static system_simple: any;   // token_recharge/wait_time/assetSeasonCfg/deviation
            static notice: any;          // carouse_notice/notice_cn
            static zone: any;
            static title: any;
            static hero: any;
            static getServerName(zone: any): any;
        }
        /** sg.cfg.HelpConfig（包装变量 Wt） */
        class HelpConfig {
            static type_ui: string;
            static type_app: string;
        }
        /** sg.cfg.ConfigClass（包装变量 Ht）——视图类常量（惰性静态） */
        class ConfigClass {
            static VIEW_LOAD_SG4: any;
            static VIEW_LOAD: any;
            static VIEW_TIPS_INFO: any;
            static VIEW_GET_REWARD: any;
            static VIEW_BAG_ITEM_TIPS: any;
            static VIEW_EQUIP_MAKE_INFO: any;
            static VIEW_SHOP_SKILL_TIPS: any;
            static VIEW_HERO_TALENT_INFO: any;
            static VIEW_SOUL_TIPS: any;
            static VIEW_SCHEME_ITEM_TIPS: any;
            static VIEW_HERITAGE_INFO: any;
            static VIEW_SHOP_HERO_TIPS2: any;
            static VIEW_SHOP_HERO_TIPS: any;
            static VIEW_SHOP_EQUIP_TIPS: any;
            static VIEW_SP_ARMY_TIPS: any;
            static VIEW_GOD_SKILL_TIPS: any;
            static VIEW_ESTATE_CHOOSE_HERO: any;
            static VIEW_ESTATE_HERO: any;
            // ---- 批次 B 增补 2026-11-10（QueueManager/ModelAlert 队列与红点面）----
            static VIEW_NOTICE_PICTURE: any;
            static VIEW_WEEK_CARD: any;
            static VIEW_SALE_PAY_ALERT: any;
            static VIEW_PAY_RANK_TIPS: any;
            static VIEW_MEMBER_CARD: any;
            static VIEW_LOOP_CARD_REWARD_PANEL: any;
            static VIEW_EMPEROR_TIPS: any;
            static VIEW_CREDITRESULT: any;
            static VIEW_COUNTRY_TRIBUTARY_TIPS: any;
            static VIEW_COUNTRY_PVP_TIPS: any;
            static VIEW_COUNTRY_NOTICE_ALERT: any;
            static VIEW_COUNTRY_KING_TIPS: any;
        }
        /** sg.cfg.ConfigAssets（包装变量 Ft）——预载资源表（惰性静态） */
        class ConfigAssets {
            static AssetsInitLogin: any[];
            static loadingMask: any[];
            static AssetsCounry: any[];   // 原文拼写如此
            static setLoadingAssets(): any[];
        }
        /** sg.cfg.ConfigUI（包装变量 Vt，池化名 t(9379)） */
        class ConfigUI {
            static heroShowRadar: any;
        }
    }

    namespace utils {
        /** sg.utils.Tools（包装变量 vs，池化名 t(1377)） */
        class Tools {
            static isNullObj(o: any): boolean;
            static isNullString(s: any): boolean;
            static getURLexp(key: any): any;
            static getMsgById(id: any, args?: any): any;
            static getTimeStamp(v: any): any;
            static getServerOpenTimeCfg(): any;
            static getTimeDate(v: any): any;
            static getDictLength(d: any, flag?: boolean): number;
            static isCanBuy(type: any, cost: any): boolean;
            static checkAlertIsDel(key: any): boolean;
            static textFitFontSize(txt: any): void;
            static textLayout2(txt: any, img: any): void;
            static getTimeStyle(t: any, n?: any): any;
            static oneMinuteMilli: number;
            static sMsgLocalDic: any;
        }
        /** sg.utils.SaveLocal（包装变量 us） */
        class SaveLocal {
            static getValue(key: any): any;
        }
        /** sg.utils.ObjectUtil（包装变量 cs） */
        class ObjectUtil {
            static keys(o: any): string[];
            static values(o: any): any[];
            static clone(o: any, flag?: boolean): any;
        }
        /** sg.utils.ArrayUtil（包装变量 Ze） */
        class ArrayUtil {
            static distinct(arr: any): any[];
        }
        /** sg.utils.StringUtil（包装变量 gs） */
        class StringUtil {
            static htmlFontColor(html: any, color: any): any;
        }
        /** sg.utils.MusicManager（包装变量 as） */
        class MusicManager {
            static init(): void;
            static playSoundUI(name: any): void;
            static playBackMusic(): void;
        }
        /** sg.utils.ObjectSingle（包装变量 ls）——视图单例缓存（按 __className 键） */
        class ObjectSingle {
            static getInstance(cls: any): any;
            static clear(): void;
        }
        /** sg.utils.CustomLoader（包装变量 is，池化名 t(14882)） */
        class CustomLoader {
            static register(handler: any): void;
        }
        /** sg.utils.ThirdRecording（包装变量 fs） */
        class ThirdRecording {
            static setPay(info: any): void;
            // ---- 批次 D 增补 2026-11-10（ModelUser 统计上报）----
            static setUid(...args: any[]): any;
        }
        /** sg.utils.Spine（包装变量 _s） */
        class Spine {
            Load(path: any, a?: any, b?: any, c?: any, d?: any, cb?: any, parent?: any): void;
            Play(n?: any): void;
        }
    }

    namespace model {
        /** sg.model.ModelGame（包装变量 lr，池化名 t(11112)） */
        class ModelGame {
            static stageLockOrUnlock(method: any, lock: any, unlock?: any): void;
            static isShowLoadingAni: boolean;
            static unlock(id: any, name: any): any;  // 返回含 .stop
            // ---- 批次 D 增补 2026-11-10（ModelInside/ModelGame 引导门禁）----
            static sLockDic: any;
            static checkBaseBuildUpgradeGuide(...args: any[]): any;
        }
        /** sg.model.ModelUser（包装变量 Kr，池化名 t(6623)） */
        class ModelUser {
            static getCountryID(): any;
            // ---- 批次 D 增补 2026-11-10（ModelUser 国战军队判定；已译同名类走 import 消歧）----
            static isHaveCountryArmy(...args: any[]): any;
        }
        /** sg.model.ModelPlayer（包装变量 Br，池化名 t(16506)） */
        class ModelPlayer {
            static recommendServer: any;
            // ---- 批次 B 增补 2026-11-10（ConfigServer 服务器分区列表）----
            static instance: ModelPlayer;
            getServerZones(): any;
            getZoneList(): any;
        }
        /** sg.model.ModelClub（包装变量 $o，池化名 t(238)） */
        class ModelClub {
            static EVENT_COUNTRY_REDBAG: string;
            // ---- 批次 D 增补 2026-11-10（ModelChat/ModelClub 外星人消息）----
            static EVENT_ALIEN_MSG: any;
            static SOCEKET_GET_CLUB_ALIEN: any;   // 原文拼写如此（SOCKET）
        }
        /** sg.model.ModelVisit（包装变量 $r，池化名 t(1372)） */
        class ModelVisit {
            static visitModels: any;
            static EVENT_UPDATE_VISIT: string;
            // ---- 批次 D 增补 2026-11-10（ModelGame/ModelUser 访客数据面）----
            static visitFastAdminArr: any;
            static updateData(...args: any[]): any;
            initData(...args: any[]): any;
            initOldData(...args: any[]): any;
        }
        /** sg.model.ModelEstate（包装变量 hr，池化名 t(2664)） */
        class ModelEstate {
            static myEstates: any;
            // ---- 批次 B 增补 2026-11-10（ConfigServer 交易开关）----
            static isTradeOpen(): any;
            // ---- 批次 D 增补 2026-11-10（ModelGame/ModelUser 庄园静态面与构造）----
            constructor(...args: any[]);
            static estateModels: any;
            static estateFastAdminArr: any;
            static initEstate(...args: any[]): any;
            static myCountryEstates(...args: any[]): any;
            static removeMyEstate(...args: any[]): any;
            static saveLocalEstate6(...args: any[]): any;
            static updateCoutryEstate(...args: any[]): any;   // 原文拼写如此（Country）
        }
        /** sg.model.ModelOnlineReward（包装变量 Us，池化名 t(343)） */
        class ModelOnlineReward {
            static online_reward: number;
        }
        /** sg.model.ModelProp（包装变量 Ar，池化名 t(2865)） */
        class ModelProp {
            static ITEM_CREIDT: string;   // 原文拼写如此（credit）
            // ---- 批次 D 增补 2026-11-10（ModelProp PVE 礼包字典）----
            static pve_gift_dict: any;
        }
        /** sg.model.ModelBuiding（包装变量 zo，池化名 t(2217)）——批次 F 已译真实现
         *  （src/sg/model/ModelBuiding.ts，运行时 Laya.class 注册与本声明同对象；
         *  本声明保留供既有调用方全局路径类型，FontManager 先例） */
        class ModelBuiding {
            static material_type: any[];
            // ---- 批次 D 增补 2026-11-10（ModelInside/ModelUser 建筑静态面；注册名拼写 Buiding 原文如此）----
            static army_type_building: any;
            static buildingModels: any;
            static check_produce_id(...args: any[]): any;
            static getArmyBuildingLvCfg(...args: any[]): any;
            static getBaggageId(...args: any[]): any;
            static getMaterialEnough(...args: any[]): any;
            static isBaggageBubble(...args: any[]): any;
            static isBaggageBubble1(...args: any[]): any;
            // ---- 批次 F 增补 2026-11-10（译文内 sg.model.ModelBuiding.* 全局路径自引面）----
            static getArmyCurrGradeByType(...args: any[]): any;
            static getArmyMakeCfgByGrade(...args: any[]): any;
            static army_type: any;
        }
        /** sg.model.ModelItem（包装变量 yr，池化名 t(6604)）——批次 F 已译真实现
         *  （src/sg/model/ModelItem.ts；本声明保留供既有调用方全局路径类型） */
        class ModelItem {
            static checkItemGotoBag(id: any): boolean;
            // ---- 批次 B 增补 2026-11-10（AssetsManager 货币小图标）----
            static getItemIcon(id?: any): any;
            // ---- 批次 D 增补 2026-11-10（ModelClimb/ModelProp 道具静态与实例面）----
            static getItemIcon(id?: any, flag?: any): any;
            static getItemIconAssetUI(...args: any[]): any;
            static getItemName(...args: any[]): any;
            static getMyItemNum(...args: any[]): any;
            initData(...args: any[]): any;
        }
        /** sg.model.ModelHero（包装变量 _r，池化名 t(3066)） */
        class ModelHero {
            static getTitleInfo(id: any): any;
            static getTitleName(id: any): any;
            // ---- 批次 B 增补 2026-11-10（ConfigServer 清库 / EffectManager 立绘 / 公告名）----
            static HERO000: any;
            static heroModels: any;
            static getHeroName(id?: any): any;
            static getHeroRes(id?: any): any;
            static getHeroIcon(id?: any): any;
            /** ModelAlert 红点面 */
            static isShowNewHeroFeature(): any;
            static isShowHeroCounter(): any;
            static sBestHid: any;
            // ---- 批次 D 增补 2026-11-10（ModelChat/ModelUser 武将静态与实例面）----
            constructor(...args: any[]);
            static getHeroName(id?: any, b?: any): any;
            static getIndexById(...args: any[]): any;
            static getHeroStarColorName(...args: any[]): any;
            static checkTitleIsOK(...args: any[]): any;
            static rarity_name: any;
            static sBestHeroArr: any;
            static setFestivalHids(...args: any[]): any;
            setData(...args: any[]): any;
            getPrepare(...args: any[]): any;
            mModelPrepare: any;
            // ---- 批次 F 增补 2026-11-10（ModelBuiding 兵种名/等级面）----
            static getMaxLv(...args: any[]): any;
            static army_type_name: any;
        }
        /** sg.model.ModelHeroPure（包装变量 gr，池化名 t(17278)） */
        class ModelHeroPure {
            static getAwakenModel(id: any): any;
        }
        /** sg.model.ModelSkin（包装变量 Vr，池化名 t(12878)） */
        class ModelSkin {
            static getHeroId(id: any): any;
            // ---- 批次 B 增补 2026-11-10（ConfigServer 清库 / ViewSkinTips 皮肤名与星级）----
            static skinModels: any;
            static getName(id?: any): any;
            static getStarById(id?: any): any;
            static getInfoHtml(id?: any, n?: any): any;
            // ---- 批次 D 增补 2026-11-10（ModelGame 皮肤实例缓存）----
            constructor(...args: any[]);
            static initLocalData(...args: any[]): any;
        }
        /** sg.model.ModelBeast（包装变量 Go，池化名 t(6453)） */
        class ModelBeast {
            static showTipsPanel(id: any, flag: any): void;
            // ---- 批次 D 增补 2026-11-10（ModelUser 神兽静态面）----
            static checkBeastSuperData(...args: any[]): any;
            static getModel(...args: any[]): any;
            static getIndexById(...args: any[]): any;
            static setBeastPoint(...args: any[]): any;
            // ---- 批次 F 增补 2026-11-10（ModelItem.isCanOpen 背包容量）----
            static getBagCurNum(...args: any[]): any;
            static getBagTotalNum(...args: any[]): any;
        }
        /** sg.model.ModelRune（包装变量 Pr，池化名 t(14945)） */
        class ModelRune {
            static getNum(id: any): any;
            // ---- 批次 B 增补 2026-11-10（ConfigServer 清库）----
            static runeModels: any;
            // ---- 批次 D 增补 2026-11-10（ModelUser 符文静态与实例面）----
            static getConfig(...args: any[]): any;
            static getIndexById(...args: any[]): any;
            initData(...args: any[]): any;
            fix_type: any;
            exp_type: any;
            name: any;
            index: any;
            getImgName(...args: any[]): any;
            // ---- 批次 F 增补 2026-11-10（ModelItem.getItemName 星石实例名）----
            getName(...args: any[]): any;
        }
    }

    namespace guide {
        namespace view {
            /** sg.guide.view.GuideFocus（包装变量 qi） */
            class GuideFocus {
                static focusOut(): void;
                // ---- 批次 D 增补 2026-11-10（ModelUser 引导聚焦）----
                static focusInSprite(...args: any[]): any;
            }
            /** sg.guide.view.ViewGuide（包装变量 sp） */
            class ViewGuide {
                static instance: ViewGuide;
                // ---- 批次 Q 增补 2026-11-10（ModelGuide.waitASecond arrow 复位）----
                arrow: any;
            }
        }
        namespace model {
            /** sg.guide.model.GuideHelper（包装变量 ji @821667）—— GuideChecker.test 换旗 */
            class GuideHelper {
                static changeCountryFlag(...args: any[]): any;
            }
            /** sg.guide.model.ModelGuide（包装变量 js，池化名 t(18180)） */
            class ModelGuide {
                static forceGuide(): any;
                static battleOver(): void;
                // ---- 批次 B 增补 2026-11-10（NetSocket 引导数据注入）----
                static getGuideData(t?: any): any;
                // ---- 批次 D 增补 2026-11-10（ModelGame/ModelUser 引导执行面）----
                static instance: ModelGuide;
                static isNewPlayerGuide(...args: any[]): any;
                static executeGuide(...args: any[]): any;
                static getGuideAssets(...args: any[]): any;
                static once(...args: any[]): any;
                once(...args: any[]): any;
            }
        }
    }

    namespace map {
        namespace utils {
            /** sg.map.utils.TestUtils（包装变量 be） */
            class TestUtils {
                /** 原文赋 parseInt 结果/布尔开关混用，按 any 保留动态语义 */
                static isTestShow: any;
                static testSeason: any;
                static testAni: any;
                static isTestMsg: any;
                static mapEdit: any;
                // ---- 批次 D 增补 2026-11-10（ModelUser 测试过滤）----
                static filterUserData(...args: any[]): any;
            }
        }
        namespace view {
            /** sg.map.view.AroundManager（包装变量 xe） */
            class AroundManager {
                static initVexData(): void;
                // ---- 批次 D 增补 2026-11-10（MapModel 周边实体初始化）----
                static initData(...args: any[]): any;
            }
        }
        namespace model {
            /** sg.map.model.MapModel（包装变量 No） */
            class MapModel {
                static instance: MapModel;
                updateTroopItem(): void;
                // ---- 批次 B 增补 2026-11-10（ViewNotice 城市实体表）----
                citys: any;
            }
        }
    }

    namespace scene.view {
        /** sg.scene.view.TestButton（包装变量 C7） */
        class TestButton {
            static resetHelpData(): void;
            // ---- 批次 B 增补 2026-11-10（NetSocket 推送测试钩子）----
            static log(...args: any[]): void;
            static preUpdate(...args: any[]): void;
        }
        /** sg.scene.view.InputManager（包装变量 xn）——注意原文静态属性拼写 enaled */
        class InputManager {
            static instance: InputManager;
            enaled: boolean;
            // ---- 批次 Q 增补 2026-11-10（ModelGuide.doGuide/guideOver canDrag）----
            canDrag: any;
        }
    }

    namespace scene.constant {
        /** sg.scene.constant.ConfigConstant（包装变量 Ve） */
        class ConfigConstant {
            static mapName: string;
            static mapConfigData: any;
            // ---- 批次 D 增补 2026-11-10（MapModel/寻路常量面）----
            static mapData: any;
            static mapDataName: any;
            static fubenName: any;
            static homeConfigData: any;
            static ENTITY_CITY: any;
            static WAY_DIST_UNIT: any;
        }
    }

    namespace activities.model {
        /** sg.activities.model.ModelPhone（包装变量 Rh，池化名 t(1725)） */
        class ModelPhone {
            static instance: ModelPhone;
            isOpenView(): boolean;
        }
        /** sg.activities.model.ModelFreeBuy（包装变量 Ls，池化名 t(5087)） */
        class ModelFreeBuy {
            static instance: ModelFreeBuy;
            checkData(): void;
            mData: any[];
            viewID: any;
            // ---- 批次 D 增补 2026-11-10（ModelGame/ModelUser 免费礼包数据面）----
            addData(...args: any[]): any;
            gtaskTime: any;
        }
    }

    namespace view.bigShot {
        /** sg.view.bigShot.ModelBigShot（包装变量 _a，池化名 t(18234)） */
        class ModelBigShot {
            static instance: ModelBigShot;
            CreateBigShot(): void;
            // ---- 批次 D 增补 2026-11-10（ModelUser 大亨数据刷新）----
            refreshData(...args: any[]): any;
        }
    }

    namespace view.com {
        /** sg.view.com.MouseTips（包装变量 IK） */
        class MouseTips {
            static hideMouseTips(): void;
            // ---- 批次 B 增补 2026-11-10（EffectManager/ViewSkinTips 鼠标提示链）----
            static showMouseTips(...args: any[]): any;
        }
    }

    namespace view.init {
        /** sg.view.init.ViewAlert（包装变量 b6）—— ViewManager 经 .id/.checkBg/.init 使用 */
        class ViewAlert {
            id: string;
            checkBg(t?: any): void;
            init(): void;
        }
        /** sg.view.init.ViewAlert2（包装变量 e8）—— 同 ViewAlert 契约 */
        class ViewAlert2 {
            id: string;
            checkBg(t?: any): void;
            init(): void;
        }
        /** sg.view.init.ViewHintPanel（包装变量 b8） */
        class ViewHintPanel { }
        /** sg.view.init.ViewHeroTalk（包装变量 p8） */
        class ViewHeroTalk { }
    }

    namespace view.map {
        /** sg.view.map.ViewCreditResult（包装变量 xtt） */
        class ViewCreditResult { }
    }

    namespace view.effect {
        /** sg.view.effect.EffectUIBase（包装变量 hy） */
        class EffectUIBase {
            constructor(alpha?: any, e?: any, n?: any);
            name: string;
            width: number;
            height: number;
            y: number;
            init(): void;
            addChild(node: any): any;
        }
    }

    namespace view.menu {
        /** sg.view.menu.ViewMenuMain_sg4（包装变量 Zd） */
        class ViewMenuMain_sg4 { init(): void; width: number; height: number; view_top: any; }
        /** sg.view.menu.ViewMenuMain（包装变量 Jd） */
        class ViewMenuMain { init(): void; width: number; height: number; view_top: any; }
    }

    namespace view.more {
        /** sg.view.more.ViewNotice（包装变量 rx） */
        class ViewNotice { input(data: any): void; }
        /** sg.view.more.ViewCarouse（包装变量 tx） */
        class ViewCarouse {
            visible: boolean;
            clerMyTimer(): void;   // 原文拼写如此
            input(data: any): void;
        }
    }

    namespace view.loading {
        /** sg.view.loading.LoadingPanel_H（包装变量 S$） */
        class LoadingPanel_H { }
        /** sg.view.loading.LoadingPanel_V（包装变量 B$） */
        class LoadingPanel_V { }
    }

    namespace view.shop {
        /** sg.view.shop.ViewSkinTips（包装变量 $it） */
        class ViewSkinTips { }
    }

    namespace view.wineshop.view {
        /** sg.view.wineshop.view.WineshopMap（包装变量 pu） */
        class WineshopMap { }
    }

    namespace view.tower {
        /** sg.view.tower.ModelRevivedTower（包装变量 Wa，池化名 t(395)）—— 批次 Q 增补（GuideChecker gwent 分支 needGuide） */
        class ModelRevivedTower { static instance: any; }
    }

    namespace puppet.view {
        /** sg.puppet.view.ViewMenuScene（包装变量 zd） */
        class ViewMenuScene { init(): void; }
        /** sg.puppet.view.PuppetMap（包装变量 Yc） */
        class PuppetMap { }
    }

    namespace crossService {
        /** sg.crossService.CrossServiceFacade（包装变量 $t） */
        class CrossServiceFacade {
            static instance: CrossServiceFacade;
            socket: any;
            // ---- 批次 B 增补 2026-11-10（NetSocket 跨服校时）----
            static checkServerTime(t?: any, i?: any): void;
        }
        namespace view {
            /** sg.crossService.view.CrossServiceMap（包装变量 kc） */
            class CrossServiceMap {
                static instance: CrossServiceMap;
                ui: any;
            }
        }
    }

    namespace home.view {
        /** sg.home.view.HomeViewMain（包装变量 Mc） */
        class HomeViewMain { }
    }

    namespace homeland.view {
        /** sg.homeland.view.HomeLandViewMain（包装变量 Sc） */
        class HomeLandViewMain { static instance: HomeLandViewMain; }
    }

    namespace map.view {
        /** sg.map.view.MapViewMain（包装变量 Ku） */
        class MapViewMain {
            // ---- 批次 B 增补 2026-11-10（ViewNotice 战斗内跳转）----
            static instance: MapViewMain;
            sendNetToInFight(...args: any[]): any;
            // ---- 批次 D 增补 2026-11-10（ModelCountryPvp 加载完成探测）----
            loadComplete: any;
        }
    }

    namespace fight {
        /** sg.fight.FightMain（包装变量 ci，池化名 t(18007)） */
        class FightMain {
            static instance: FightMain;
            scene: any;
            client: any;
            // ---- 批次 B 增补 2026-11-10（ViewNotice 城市 / EffectManager 战斗态）----
            static getCurrCityId(): any;
            static inFight: any;
            // ---- 批次 D 增补 2026-11-10（ModelArena/ModelChat/ModelUser 战斗入口）----
            static startBattle(...args: any[]): any;
            static startCountryBattle(...args: any[]): any;
            static startLogBattle(...args: any[]): any;
            // ---- 批次 F 增补 2026-11-10（ModelXYZ2 图腾/神策击杀推送）----
            static receiveCityDestroy(...args: any[]): any;
            static receiveShenceKill(...args: any[]): any;
            exit(...args: any[]): any;
        }
        namespace logic.utils {
            /** sg.fight.logic.utils.PassiveStrUtils（包装变量 Ui，池化名 t(16572)） */
            class PassiveStrUtils {
                static translatePassiveInfo(a: any, b: any, c: any, d: any): any;
            }
        }
    }

    namespace god.model {
        /** sg.god.model.ModelGodMain（包装变量 bo，池化名 t(13453)） */
        class ModelGodMain {
            static instance: ModelGodMain;
            getModel(id: any): any;
            // ---- 批次 D 增补 2026-11-10（ModelInside/ModelUser 神灵开关与刷新）----
            active: any;
            refreshData(...args: any[]): any;
            // ---- 批次 F 增补 2026-11-10（ModelItem.isCanOpen 神格容量）----
            godCurNum: any;
            godLimitNum: any;
        }
        /** sg.god.model.ModelGod（包装变量 Gi，池化名 t(17504)） */
        class ModelGod {
            static newGod(cfg: any): any;
        }
    }

    namespace puppet.model {
        /** sg.puppet.model.ModelArmMain（包装变量 vn，池化名 t(17508)） */
        class ModelArmMain {
            static instance: ModelArmMain;
            getArm(id: any): any;
            // ---- 批次 Q 增补 2026-11-10（GuideChecker.getConditionGuideID puppet_guide）----
            getAllWeapon(...args: any[]): any;
            getAllHeart(...args: any[]): any;
        }
        /** sg.puppet.model.ModelPuppetReputation（包装变量 sa，池化名 t(13418)）—— 批次 Q 增补（GuideChecker puppet_guide finishIndents） */
        class ModelPuppetReputation { static instance: any; }
        // ---- 批次 D 增补 2026-11-10（ModelGame 国库事件面）----
        class ModelCountryStoreroom {
            static instance: any;
            static COUNTYR_STOREROOM_FRESH: any;   // 原文拼写 COUNTYR 如此
        }
    }

    namespace heritage {
        /** sg.heritage.ModelHeritage（包装变量 Io，池化名 t(10793)） */
        class ModelHeritage {
            static instance: ModelHeritage;
            getHeritageById(id: any): any;
            // ---- 批次 D 增补 2026-11-10（ModelInside 遗产开关与数据）----
            active: any;
            getBabbleData(...args: any[]): any;
        }
    }

    namespace kismet.model {
        /** sg.kismet.model.ModelKit（包装变量 se，池化名 t(6557)） */
        class ModelKit {
            static validate(id: any): boolean;
            // ---- 批次 D 增补 2026-11-10（MapModel 装件索引）----
            static getIndexById(...args: any[]): any;
        }
        /** sg.kismet.model.ModelKismet（包装变量 Bo，池化名 t(11187)） */
        class ModelKismet {
            static instance: ModelKismet;
            getKitById(id: any): any;
            // ---- 批次 Q 增补 2026-11-10（GuideChecker kismet_guide 分支）----
            canGuide: any;
        }
    }

    namespace boundFor {
        /** sg.boundFor.GotoManager（包装变量 Dt） */
        class GotoManager {
            static boundForPanel(name: any): void;
            // ---- 批次 B 增补 2026-11-10（QueueManager 跳转队列 / ViewNotice 城市跳转）----
            static instance: GotoManager;
            static boundFor(cfg: any): any;
            boundForMap(...args: any[]): any;
            boundForCaptain(...args: any[]): any;
            // ---- 批次 D 增补 2026-11-10（ModelInside/ModelGame/ModelUser 跳转宽面）----
            static boundForPanel(name: any, a?: any, b?: any): void;
            static getBuild(...args: any[]): any;
            static boundFor(...args: any[]): any;
            static boundForArena(...args: any[]): any;
            static boundForHeroCatche(...args: any[]): any;   // 原文拼写如此（Catch）
            static showView(...args: any[]): any;
            boundForPanel(...args: any[]): any;
            boundFor(...args: any[]): any;
            boundForArena(...args: any[]): any;
            boundForHeroCatche(...args: any[]): any;
            showView(...args: any[]): any;
        }
    }
}

// ---------------------------------------------------------------------------
// ui.* —— IDE 生成 UI 类（批次 A 引用到的）
// ---------------------------------------------------------------------------
declare namespace ui {
    namespace menu {
        /** ui.menu.scenesTitleUI（包装变量 OB）——ViewScenes 标题条 */
        class scenesTitleUI {
            sg_title: any;
            sg_img: any;
            sg_txt: any;
            sg_btn_close: any;
            sg_btn_tips: any;
        }
    }
    namespace bag {
        /** ui.bag.bagItemUI（包装变量 v_）——ViewManager.showIcon 飞行道具 */
        class bagItemUI {
            setData(id: any, n: any, x: any): void;
            setRightIcon(b: any): void;
            pos(x: any, y: any, speed?: any): any;
            scale(scaleX: any, scaleY?: any, speed?: any): any;
        }
    }
}

// ---------------------------------------------------------------------------
// Laya.<Name> —— code1.js 内以无点类名注册到 Laya 对象上的工具类
// ---------------------------------------------------------------------------
declare module Laya {
    /** 包装变量 Ts —— o(t,"Trace") → Laya.Trace */
    class Trace {
        static log(...args: any[]): void;
    }
    /** 包装变量 Lt —— o(t,"HtmlLoadClip") → Laya.HtmlLoadClip */
    class HtmlLoadClip {
        static isHtmlLoad: boolean;
        static setLoadValue(v: any, e?: any): void;
        static setLoadTxt(v: any): void;
        static delLoad(): void;
        static isH5Android(): boolean;
    }
    /** 包装变量 ks —— o(t,"ToJava") → Laya.ToJava */
    class ToJava {
        static init(): void;
    }
    /** 包装变量 Cs —— o(t,"ToIOS") → Laya.ToIOS */
    class ToIOS {
        static init(): void;
    }
    /** 包装变量 Ut —— o(t,"Platform") → Laya.Platform */
    class Platform {
        static initMiniGame(): void;
        static phoneInfoOnCheck: boolean;
        static uploadActionData(id: any, data: any): void;
        static getPhoneID(): void;
        static checkGameStatus(id: any): void;
        static initSDK(): void;
        static getServerIdFromOrderId(orderId: any): any;
        static restart(): void;
        static uploadUserData(id: any, arr: any): void;
        static payClose(data: any): void;
        static recodrd_pay_info: any;   // 原文拼写如此
        // ---- 批次 B 增补 2026-11-10（ConfigApp.initH5sdk 装配 SDK / ConfigServer 按渠道改写配置）----
        static h5_sdk: any;
        static pf_login_data: any;
        static changeConfigJsonHttpByPf(cfg: any): any;
    }

    /** 批次 B 增补 2026-11-10：ConfigApp.initPCHD 读写 Laya.Config（引擎运行时对象，d.ts 未登记） */
    var Config: any;

    // -----------------------------------------------------------------------
    // TBMiniGameAdapter —— IDE 自带模板 src/LayaSample.ts（2.x 模板，本批不可改动）
    // 引用；libs/layaAir.minigame.d.ts 已登记其余 12 个适配器（含 YKMiniAdapter），
    // 唯缺此类，故在此补登记。仅类型占位，1.8.17 运行时/业务代码不使用。
    // -----------------------------------------------------------------------
    class TBMiniGameAdapter { static init(): void; }
}

/** 事件派发最小面（避免循环依赖到引擎类型） */
interface EventDispatcherLike {
    on(type: string, caller: any, listener: any, args?: any): any;
    off(type: string, caller: any, listener: any): any;
}
