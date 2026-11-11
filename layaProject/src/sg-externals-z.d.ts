/**
 * 批次 Z 环境声明增补（sg.model ModelBlessHero/ModelBuffManager/ModelAdjutant/
 * ModelAntiAddiction/ModelArmyUpgrade 的批次外依赖）。
 *
 * 既有声明复用（本文件不重复声明，避免环境合并冲突）：
 *   sg.fight.logic.utils.FightObtain.obtainIn —— sg-externals-aa.d.ts（批次 AA）
 *   sg.fight.logic.utils.FightUtils.mergeObj —— sg-externals-b.d.ts
 *   sg.fight.FightMain.startBattle —— sg-externals.d.ts（批次 D 增补）
 *   sg.boundFor.GotoManager.boundForPanel(name,a?,b?) —— sg-externals.d.ts（批次 B/D 增补）
 *   sg.model.ModelSkill.getModel / sg.model.ModelHero.getHeroName —— sg-externals-b/d.ts
 *   sg.model.ModelBuff.expeditionCid —— sg-externals-b.d.ts
 *   sg.model.ModelScience.func_sum_type —— sg-externals-b.d.ts（批次 D 增补）
 *   sg.guide.model.ModelGuide.forceGuide —— sg-externals.d.ts
 * 其余声明面不足成员按批次 C「调用点 cast」先例在调用点 (<any>路径)["成员"] 处理：
 *   ModelBuff.getBuffCfg/NO_CID/isBuff/isNewInterface/getBuffMaxNum/ctor、
 *   ModelTalent.getAdjPairId、ModelHeroPure.getCfg/ctor/getTalentInfoHtml、
 *   ModelHero.getHeroStarGradeColor、ModelScience.func_max_type、
 *   ConfigFight.adjutantSpecial/ratePoint、FightUtils.getValueByOpePath/
 *   compareValueMult/checkCondition/getAdjutantEquipDmgFinal。
 */

declare namespace sg {
    namespace model {
        /** sg.model.ModelAdjutant —— 本批次翻译类经 o(s,"sg.model.ModelAdjutant",Ns)
         *  注册的全局身份（Laya.class 挂载，与模块导出同类）。原文 checkOneCondition
         *  内 2 处经全局路径 sg["model"]["ModelAdjutant"]["getAdjutantExtraId"] 自引，
         *  照抄全局路径所需的最小声明面（既有 sg-externals*.d.ts 未声明此类）。 */
        class ModelAdjutant {
            static getAdjutantExtraId(...args: any[]): any;
        }
    }
    namespace view {
        namespace init {
            /** sg.view.init.ViewAntiAddiction（包装变量 s8，注册名明文 @7346393 附近，
             *  批次外未译）—— 实名认证/防沉浸提示面板静态入口（ModelAntiAddiction 依赖） */
            class ViewAntiAddiction {
                static showReadName(): void;
                static showIndulgeCurfew(): void;
                /** isHoliday：当日上限是否节假日档（原文传 holiday_time 比较布尔） */
                static showDayTime(isHoliday?: any): void;
                static showPayLimit1(): void;
                static showPayLimit(...args: any[]): void;
            }
        }
    }
}
