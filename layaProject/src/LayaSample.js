var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.TBPluginAdapter.init();
        Laya.TBMiniAdapter.init();
        Laya.TBMiniGameAdapter.init();
        Laya.HWMiniAdapter.init();
        Laya.TTMiniAdapter.init();
        Laya.BLMiniAdapter.init();
        Laya.ALIMiniAdapter.init();
        Laya.VVMiniAdapter.init();
        Laya.QGMiniAdapter.init();
        Laya.KGMiniAdapter.init();
        Laya.BMiniAdapter.init();
        Laya.QQMiniAdapter.init();
        Laya.MiniAdpter.init();
        Laya.init(600, 400, WebGL);
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map