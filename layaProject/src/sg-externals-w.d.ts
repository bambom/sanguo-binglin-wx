/**
 * sg-externals-w.d.ts —— 批次 W 外部运行时绑定（ui.guide.guideImageUI / guideSkipUI）。
 *
 * 本批零新增声明：两个皮肤 UI 类的依赖面全部已有多方承接——
 *  - 基类 sg.view.ViewPanel：真类直引 ../../view/ViewPanel（import，非 ambient）；
 *  - laya.ui.Component.prototype.createChildren / loadUI：引擎链上既有声明
 *    （laya.d.ts；(<any>) cast 处 prototype 转调，cast 为纯类型层，发射 AST 不变）；
 *  - Laya.class 注册：引擎既有声明（batch-a「注册等价决策」）。
 *
 * 本批落地后，sg-externals-u.d.ts 中 ui.guide.guideImageUI / guideSkipUI 的临时
 * ambient 声明（批次 U 为 ViewBigmage/ViewGuideImage/ViewGuideSkip 的 extends 类型面
 * 所设）与真实模块并存不冲突（模块内类名 vs 全局命名空间路径），按批次交接由主会话收敛。
 */
