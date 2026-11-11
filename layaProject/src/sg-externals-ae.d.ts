/**
 * sg-externals-ae.d.ts —— 批次 AE（sg.view.com.ComPayType）触达的批次外运行时绑定
 * （仅类型声明，无任何运行时代码）。
 *
 * 与 sg-externals.d.ts / sg-externals-b.d.ts 同规则：只声明本批代码实际触碰的成员面；
 * 类型未取证处用 any；成员名与原包逐字一致；后续批次翻译到某类后删除对应声明
 * 并改真实 TS 模块 import。批次外类在 code1.js 内经 Laya.class 注册到全局 sg.*，
 * 调用期解析（= 原 UMD 闭包变量），本文件仅补类型层，不引入任何运行时桩。
 *
 * 身份依据（本批 resolve_ae.js 三重证据：inventory assignedVar + 字节空间注册解码 +
 * 引擎别名表；decl 偏移为 code1.js 工作副本字节）：
 *   Ka=sg.view.wineshop.model.ModelRecipe（decl@2690302，reg@2690801）、
 *   TJ=sg.view.soul.ItemSoulProp（decl@5294354，reg@5294963）、
 *   $i=sg.jigsaw.model.ModelAdmireMap（decl@847509，reg 显式明文）。
 * 其余批次外引用面（ModelHero/ModelTitle/ModelEquip/ModelGodMain/Spine/ModelAwaken/
 * GotoManager/ModelScience/ModelPrepare/ModelTalent/ModelHonour/ModelScheme/
 * ModelJigsaw）已在 sg-externals.d.ts / sg-externals-b.d.ts 声明，本文件不重复；
 * 缺面成员调用点以 (<any>) 断言桥接（emit 擦除，链与 oracle 全等，批次 Q/T 先例）。
 */
declare namespace sg {

    namespace view {
        namespace wineshop {
            namespace model {
                /** sg.view.wineshop.model.ModelRecipe（包装变量 Ka）—— ComPayType.setRecipeStar */
                class ModelRecipe {
                    static dishMaxLv: any;
                    static instance: ModelRecipe;
                    recipeStage(t: any): any;
                }
            }
        }
        namespace soul {
            /** sg.view.soul.ItemSoulProp（包装变量 TJ）—— ComPayType.setSoulProp 构造 */
            class ItemSoulProp {
                constructor(t: any, i: any, e: any);
                y: any;
                height: any;
            }
        }
    }

    namespace jigsaw {
        namespace model {
            /** sg.jigsaw.model.ModelAdmireMap（包装变量 $i）—— ComPayType.canActiveAwaken2 */
            class ModelAdmireMap {
                static instance: ModelAdmireMap;
                getMapRank(t: any): any;
            }
        }
    }
}
