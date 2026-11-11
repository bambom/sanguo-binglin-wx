/**
 * sg-externals-aa.d.ts —— 批次 AA（sg.model 第二段 4 类）外部类型声明。
 *
 * 仅声明本批**新**标识符（原文证据：resolve_aa.js 依赖变量声明器单一 init + 注册名
 * 池化解码 + 成员交叉证明）；既有 ambient 缺成员面不在本文件补（调用点 (<any>) cast，
 * 批次 J/V/AC 先例）：
 * - sg.fight.logic.cfg.ConfigFight（-b 已有：init/REWARD_KEYS/overflowSpeedUp；
 *   ModelBeast 触达 beastSuperValue/beastSuperUnlock/beastHasSkill/beastResonance/
 *   beastSortArr/beastSuperSkill/beastSuperSkillDefaultPassive 7 面未列 → cast）。
 * - sg.fight.logic.utils.FightUtils（-b 已有：mergeObj 直引；getRankObj/
 *   objectToArray/sortArray/getObjectLength/multPassive 未列 → cast）。
 * - sg.fight.logic.utils.PassiveStrUtils（主 externals 已有：translatePassiveInfo；
 *   translateRsltInfo/getAttrsInfo/translateSkillInfo 未列 → cast）。
 * - sg.fight.FightMain（主 externals 已有：startLogBattle 直引；checkPlayback 未列
 *   → cast）。
 * - sg.model.ModelSkill（-b 已有：getModel 直引）。
 * - sg.model.ModelTalent/ModelHeroPure/ModelHero（getMsgByExplain/getCfg 未列 → cast）。
 * 已译真类（Tools/ConfigServer/ModelManager/ViewManager/ColorManager/StringUtil/
 * EffectManager/Trace/NetSocket/ObjectUtil/TestUtils/ModelBase/ViewModelBase/
 * ModelItem/ModelChat/ModelOfficial/ModelGuide/TimeHelper 等）走模块 import，不在此登记。
 */
declare namespace sg {
    namespace view {
        namespace more {
            namespace fightlog {
                /** sg.view.more.fightlog.C_FightLog（包装变量 Rn，明文注册
                 *  @1888008 附近，批次 AA resolve_aa.js 声明器+注册名+成员交叉证明）。
                 *  ModelFightLog_H 触达面：instance.logCities.indexOf / instance.cityLogFunc。 */
                class C_FightLog {
                    static instance: C_FightLog;
                    logCities: any;
                    cityLogFunc(data: any): void;
                }
            }
        }
    }

    namespace fight {
        namespace logic {
            namespace utils {
                /** sg.fight.logic.utils.FightObtain（包装变量 ki，注册名明文）。
                 *  ModelAwaken 触达 obtainIn；ModelBeast 触达 containSk。 */
                class FightObtain {
                    static containSk(...args: any[]): any;
                    static obtainIn(...args: any[]): any;
                }
                /** sg.fight.logic.utils.FightStrUtils（包装变量 Li，注册名明文）。
                 *  ModelAwaken.getHeroAwakenInfo 触达 getShowDayInfo。 */
                class FightStrUtils {
                    static getShowDayInfo(...args: any[]): any;
                }
            }
        }
    }

    namespace jigsaw {
        namespace model {
            /** sg.jigsaw.model.ModelJigsawPure（包装变量 te，注册名明文）。
             *  ModelAwaken.getHeroAwakenInfo 触达 getPatternArrInfo。 */
            class ModelJigsawPure {
                static getPatternArrInfo(...args: any[]): any;
            }
        }
    }
}
