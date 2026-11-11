/**
 * sg-externals-af.d.ts —— 批次 AF（sg.crossService.ui/view 12 类）外部类型声明。
 *
 * 仅声明本批译文实际以全局注册路径引用、且现有 sg-externals*.d.ts / sg-externals.d.ts
 * 未声明的标识符（新增前已逐一 grep 全部 externals 文件核实缺口）。成员面按原文
 * 调用面最小化声明（类型未取证处 any）。
 *
 * 不在本文件重复/不补（既有声明沿用，缺成员面调回点 (<any>) cast，批次 J/V 先例）：
 *  - sg.scene.view.entity.EntityClip：-u 空 shell（prototype.init/destroy/_$get_entity
 *    调回点 cast；本批 CrossServiceClip/CrossServiceTroopClip temp extends 债，
 *    见 batch-af-report §5）。
 *  - sg.scene.view.MapCamera：-b（initScene/zoom/lookAtCrossServiceGrid 已声明）。
 *  - sg.map.utils.MapUtils：-b（parseKey 已声明；getKey/tileToIso/
 *    getAroundCrossServiceGrid cast）。
 *  - sg.map.utils.Vector2D：-b ctor 已声明（lerp/TEMP/x/y/angle/subtract cast）。
 *  - sg.map.utils.Math2：-b radianToAngle 已声明。
 *  - sg.model.ModelTroop：-b（TROOP_STATE_IDLE/MOVE/RECALL 已声明；TROOP_STATE_HURT/
 *    TROOP_MOVE_CHEHUI/CHEJUN/BAITUI cast）。
 *  - sg.model.ModelHero：主 externals（getFlagName/getCurrPowerType cast）。
 *  - sg.duplicate.ModelDuplicate / ModelDuplicateSettings：-b instance:any 面足够。
 *  - sg.crossService.model.CrossServiceMapModel / CrossServiceUserModel：-b 既有
 *    （AC 在途批独占 model 目录真类，落地后本批 ambient 路径与真类同对象）。
 *  - ui.com.country_flag2UI：-x 既有 shell（_country2 字段 any 面消费）。
 *  - sg.scene.view.ui.ScaleIcon 之外的本批基类（MarchMatrixClip）：仅 extends 债，
 *    无代码引用，不声明。
 */

declare namespace sg.scene.view.ui {
    /** sg.scene.view.ui.ScaleIcon（包装变量 vl，inventory [2741414,2742211]，基类
     *  ut=laya.display.Sprite）—— CrossServiceCityInfo1 / CrossServiceTroopInfo1 的
     *  未译基类（initScene/resize/destroy）；本批译文经全局路径取 prototype.destroy
     *  （cast）并以 (<any>) cast 调 initScene/resize；未译缓译，落地后两文件 extends
     *  重指向并收敛本声明（batch-af-report §5 债登记） */
    class ScaleIcon {
    }
}

declare namespace sg.map.view {
    /** sg.map.view.entity.MarchMatrixClip 的引擎侧基类 sg.map.view.IsoObject（inventory
     *  基类链 bc；未译）—— CrossServiceTroopClip.clear 经全局路径取 prototype.clear
     *  （cast）；未译缓译（EntityClip/MarchMatrixClip 落地批一并处理） */
    class IsoObject {
    }
    /** sg.map.view.CityFightBar（包装变量 Du，inventory [3141511,3142427]，基类 _=
     *  laya.ui.Box）—— 城战条（setInfo 五参），CrossServiceCityInfo1.updateFight
     *  `new Du` + addChild + y 消费；未译缓译 */
    class CityFightBar {
        constructor(...args: any[]);
        setInfo(...args: any[]): any;
    }
}

declare namespace sg.scene.view {
    /** sg.scene.view.Effect（包装变量 Ql，inventory [2847788,2848372]，基类 ut=
     *  laya.display.Sprite）—— 场景特效剪辑（init 链式返回 this），
     *  TileClip.onCityFireHandler `(new Ql).init({id:"building_fire",loop:!0})` 消费；
     *  未译缓译 */
    class Effect {
        constructor(...args: any[]);
        init(...args: any[]): any;
    }
}

declare namespace sg.duplicate.view {
    /** sg.duplicate.view.ViewHeroSendDup（包装变量 e0，inventory [5769305,5773994]，
     *  基类 uE 未入册）—— 派兵视图类值，TileClip.onClick `tn.instance.showView(
     *  ["ViewHeroSendDup",e0],entity)` 作数组第二元素类值实参；未译缓译 */
    class ViewHeroSendDup {
    }
}

declare namespace sg.map.utils {
    /** sg.map.utils.DistributionUtil（包装变量 fe，声明器 @922457，逗号序列末值——
     *  序列首段 sg.map.utils.DisplayUtils IIFE 求值后弃）—— 子件横向/纵向分布，
     *  CrossServiceTroopDetail.update `fe.distribution(btn_container,w,mode)` 消费；
     *  未译缓译 */
    class DistributionUtil {
        static distribution(...args: any[]): any;
    }
}
