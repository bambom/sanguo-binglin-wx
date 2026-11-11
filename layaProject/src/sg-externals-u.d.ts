/**
 * sg-externals-u.d.ts —— 批次 U 外部运行时绑定（sg.guide.view.* 6 类的外围依赖面）。
 * 规则同 sg-externals.d.ts：仅类型声明、零运行时代码；只声明本批代码实际触碰的成员面，
 * 类型未取证处用 any；后续批次翻译到对应类后删除相应声明并改用真实 TS 模块 import。
 *
 * 本批新增（与既有 sg-externals.d.ts / sg-externals-b.d.ts 零 class 级重复）：
 *  - ui.guide.guideImageUI / guideSkipUI：ViewBigmage/ViewGuideImage/ViewGuideSkip 的
 *    IDE 皮肤基类（原文包装变量 hD @4159163 / oD @4159426，基类 tm=sg.view.ViewPanel，
 *    未译——译文落地前 extends 取全局注册路径；F8 模块求值依赖其先行，batch-u-report §7）；
 *  - ui.home.HomeMenuItemUI（ViewGuide.getClickRect instanceof 缩放判定）；
 *  - sg.view.ViewPanel 最小面（ViewGuideSkip.onAddedBase 的
 *    sg.view.ViewPanel.prototype.onAddedBase 转调 + isAutoClose/closeSelf/mCurrArg）；
 *  - sg.boundFor.GotoManager（Dt @400231）、sg.view.task.ViewNewChapter（Mtt）、
 *    sg.puppet.model.ModelPuppetMap（ea @2484556 池化）、sg.scene.view.entity.EntityClip、
 *    sg.map.view.entity.EstateParkClip、sg.homeland.view.HomeLandBuild、
 *    sg.view.effect.EffectUIBase（ViewGuide instanceof/类引用面）；
 *  - laya.debug.tools.ObjectTools（Z，code1.js @284685 池化解码实证
 *    `Z=(laya.display.Node,laya.debug.tools.ObjectTools)`）。
 *
 * 成员缺口增补（instance 成员走 interface 合并；static 缺口不改声明，由调用点
 * (<any>) cast 承接——批次 D/J 先例，cast 为纯类型层，发射 AST 不变）：
 *  - interface sg.map.view.MapViewMain { estateViews }（instance 成员）。
 *  - static 缺口（cast 承接，不入本文件）：sg.map.utils.Math2.angleToRadian、
 *    sg.scene.view.MapCamera.cID/bID、sg.guide.view.GuideFocus.focusIn、
 *    sg.puppet.view.PuppetMap.instance、sg.view.wineshop.view.WineshopMap.instance。
 */

declare module laya.debug {
    module tools {
        /** laya.debug.tools.ObjectTools（包装变量 Z，@284685 池化解码：laya.display.Node 丢弃序 + debug.tools.ObjectTools） */
        class ObjectTools {
            static isNumber(v: any): boolean;
        }
    }
}

declare namespace ui {
    namespace guide {
        /** ui.guide.guideImageUI（包装变量 hD @4159163，基类 tm=sg.view.ViewPanel）—— ViewBigmage/ViewGuideImage 皮肤基类，未译 */
        class guideImageUI extends sg.view.ViewPanel {
            box: any;
            img: any;
            words: any;
        }
        /** ui.guide.guideSkipUI（包装变量 oD @4159426，基类 tm=sg.view.ViewPanel）—— ViewGuideSkip 皮肤基类，未译 */
        class guideSkipUI extends sg.view.ViewPanel {
            box_skip: any;
            box_back: any;
            btn_back: any;
            btn_skip: any;
            txt_title_new: any;
            txt_title_old: any;
            txt_tips_new: any;
            txt_tips_old: any;
            img_tips_new1: any;
            img_tips_new2: any;
            img_tips_old1: any;
            img_tips_old2: any;
        }
    }
    namespace home {
        /** ui.home.HomeMenuItemUI —— ViewGuide.getClickRect instanceof 缩放判定，未译（原文读 width/height） */
        class HomeMenuItemUI {
            width: number;
            height: number;
        }
    }
}

declare namespace sg {
    namespace view {
        /** sg.view.ViewPanel 最小面（真实模块已译 ../../view/ViewPanel.ts，全局注册路径在运行时等价；
         *  此处仅供 ViewGuideSkip 的 prototype 转调与皮肤基类链的类型面） */
        class ViewPanel extends laya.ui.View {
            mCurrArg: any;
            isAutoClose: boolean;
            onAddedBase(): void;
            closeSelf(): void;
        }
        namespace task {
            /** sg.view.task.ViewNewChapter（包装变量 Mtt）—— ViewGuide.showImage 竖屏章节图视图，未译 */
            class ViewNewChapter { }
        }
        // sg.view.effect.EffectUIBase / sg.boundFor.GotoManager 已在 sg-externals.d.ts 声明
        // （EffectUIBase.name 等；GotoManager boundFor/boundForPanel/getBuild/instance）——
        // 不重复声明；GotoManager.getMenus static 缺口按批次 D/J 先例由调用点 (<any>) cast 承接。
    }
    namespace scene {
        namespace view {
            namespace entity {
                /** sg.scene.view.entity.EntityClip —— ViewGuide.getClickRect instanceof，未译 */
                class EntityClip { }
            }
        }
    }
    namespace map {
        namespace view {
            namespace entity {
                /** sg.map.view.entity.EstateParkClip —— ViewGuide.getClickRect instanceof，未译 */
                class EstateParkClip { }
            }
        }
    }
    namespace homeland {
        namespace view {
            /** sg.homeland.view.HomeLandBuild —— ViewGuide.getClickRect instanceof，未译 */
            class HomeLandBuild { }
        }
    }
    namespace puppet {
        namespace model {
            /** sg.puppet.model.ModelPuppetMap（包装变量 ea @2484556 池化注册）—— ViewGuide.getViewByBuildType 兵寨建筑，未译 */
            class ModelPuppetMap {
                static instance: ModelPuppetMap;
                buildings: any;
            }
        }
    }
}

// ---- instance 成员缺口增补（interface 合并；目标类声明在 sg-externals.d.ts / sg-externals-b.d.ts）----
declare namespace sg.map.view {
    /** sg.map.view.MapViewMain（包装变量 Ku）estateViews：ViewGuide.getViewByCityType 庄园区视图表 */
    interface MapViewMain {
        estateViews: any;
    }
}
declare namespace sg.map.model.entitys {
    /** sg.map.model.entitys.EntityCity entity：ViewGuide.getClickRect 城池实体宽高来源 */
    interface EntityCity {
        entity: any;
    }
}
