/**
 * sg.map.utils.TestUtils —— 调试工具集（帧耗时浮层、本地配置覆盖、文件下载/读取、
 * 测试数据过滤）。isTestShow 开关默认 0（关闭），生产路径全部短路。
 *
 * 原文：code1.js 字节 [928365,930928]（包装变量 be，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/TestUtils.js
 *
 * 依赖：Gt=ConfigServer（批次 B 模块直引，config）；Ts=Laya.Trace（② 模块直引）；
 * ut=laya.display.Sprite、pt=laya.display.Text、m=laya.utils.Browser、
 * s=Laya（引擎/UMD 级别名）。
 * 原文 readFile 内 `handleEvent=function(...)` 为隐式全局赋值（非 strict 污染
 * window），译文显式写到 window 以保持同语义。times/txt_time 为 Laya.static
 * 惰性静态（ViewScenes.TOP_HEIGHT 同款换写）。
 */
import Sprite = laya.display.Sprite;
import Text = laya.display.Text;
import { ConfigServer } from "../../cfg/ConfigServer";
import { Trace } from "../../laya/Trace";

export class TestUtils {

    constructor() {
    }

    public static init(): void {
        TestUtils.txt_time.autoSize = !0,
            TestUtils.txt_time.fontSize = 18,
            TestUtils.txt_time.color = "#FFFFFF",
            TestUtils.txt_time.stroke = 2,
            TestUtils.txt_time.strokeColor = "#000000",
            TestUtils.txt_time.x = 70,
            TestUtils.txt_time.y = 170,
            Laya.stage.addChild(TestUtils.txt_time);
    }

    /** 本地 localConfig 覆盖 ConfigServer.config（调试用） */
    public static checkLocalConfig(): boolean {
        if (!TestUtils.testLocalConfig || !TestUtils.localConfig) return !1;
        var i: any;
        for (i in TestUtils.localConfig)
            ConfigServer.config[i] = TestUtils.localConfig[i],
                Trace.log("本地文件 " + i + ".json  对配置进行了覆盖!");
        return !!i;
    }

    public static drawTest(t: any): void {
        var i = new Sprite();
        i.graphics.drawCircle(0, 0, 5e4, "FF0000"),
            t.addChild(i),
            i.alpha = .5;
    }

    /** 测试态清空限时任务与武将捕获列表 */
    public static filterUserData(i: any): void {
        2333 === TestUtils.isTestShow && (i.ftask = {}, i.hero_catch && (i.hero_catch.hero_list = []));
    }

    public static timeStart(i?: string): void {
        1 == TestUtils.isTestShow && (
            TestUtils._inited || (TestUtils._inited = !0, TestUtils.init()),
                null == i && (i = "TestUtils"),
                TestUtils.times[i] = TestUtils.times[i] || { start: 0, runTime: 0, maxTime: 0, intervalTime: laya.utils.Browser.now() },
                TestUtils.times[i].start = laya.utils.Browser.now());
    }

    public static getRumTime(i?: string): any {
        if (1 != TestUtils.isTestShow) return 0;
        for (var e in null == i && (i = "TestUtils"), TestUtils.txt_time.text = "", TestUtils.times) {
            if (i == e) {
                var s = laya.utils.Browser.now();
                TestUtils.times[e].runTime = s - TestUtils.times[i].start,
                    s - TestUtils.times[e].intervalTime >= 2e3 && (TestUtils.times[e].intervalTime = laya.utils.Browser.now(), TestUtils.times[e].maxTime = 0),
                    TestUtils.times[e].maxTime = Math.max(TestUtils.times[e].runTime, TestUtils.times[e].maxTime);
            }
            TestUtils.txt_time.changeText(TestUtils.txt_time.text + e + ":" + TestUtils.times[e].runTime + "ms\t(max:\t" + TestUtils.times[e].maxTime + ")\n");
        }
        return TestUtils.times[i].runTime;
    }

    public static downloadFile(t: any, i: any): void {
        var e = <HTMLAnchorElement>(<any>laya.utils.Browser.document.createElement("a"));
        e.setAttribute("href", "data:text/html;gb2312," + t),
            e.setAttribute("download", i),
            e.setAttribute("target", "_blank"),
            e.style.display = "none",
            e.click();
    }

    public static readFile(t: any): void {
        var i = <any>laya.utils.Browser.window.FileReader;
        if (!i) return console.log("当前浏览器不支持FileReader");
        var e = <HTMLInputElement>(<any>laya.utils.Browser.document.createElement("input"));
        e.setAttribute("type", "file"),
            e.onchange = function () {
                var s = e.files[0],
                    n = new i();
                n.addEventListener("loadend", (<any>laya.utils.Browser.window).handleEvent = function (i: any) { t && t.runWith(n.result); }),
                    n.readAsText(s);
            },
            e.click();
    }

    public static downloadFileByBase64(t: any, i: any): void {
        var e = <HTMLAnchorElement>(<any>laya.utils.Browser.document.createElement("a")),
            s = function (t: any) {
                for (var i = t.split(";base64,"), e = i[0].split(":")[1], s = (<any>laya.utils.Browser.window).atob(i[1]), n = s.length, h = new Uint8Array(n), o = 0; o < n; ++o) h[o] = s.charCodeAt(o);
                return new (<any>laya.utils.Browser.window).Blob([h], { type: e });
            }(t);
        (<any>laya.utils.Browser.document).createEvent("HTMLEvents").initEvent("click", !0, !0),
            e.download = i,
            e.href = (<any>laya.utils.Browser.window).URL.createObjectURL(s),
            e.click();
    }

    public static _inited: boolean = false;
    public static testSeason: any = -1;
    public static testAni: any = 0;
    public static isTestShow: any = 0;
    public static testLocalConfig: any = 0;
    public static testSubmitConfig: any = 1;
    public static localConfig: any = null;
    public static isTestMsg: any = 0;
    public static mapEdit: any = 0;

    /** Laya.static 惰性静态：计时表 */
    public static get times(): any {
        var v = new Object();
        Object.defineProperty(TestUtils, "times", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** Laya.static 惰性静态：帧耗时浮层文本 */
    public static get txt_time(): Text {
        var v = new Text();
        Object.defineProperty(TestUtils, "txt_time", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.map.utils.TestUtils")（2 参注册，无基类）。
 */
Laya.class(TestUtils, "sg.map.utils.TestUtils", null, null);
