/**
 * sg.test.testpakcage.TestPackage —— 测试发包收藏面板（调试工具；原文命名空间
 * 拼写 testpakcage 如此，全文件唯一 sg.test.* 注册，家族封闭 n=1）。
 *
 * 关键运行时角色：NetSocket.send/recevie 首行无条件调用静态 addPackage
 * （NetSocket.ts:210/259、ConfigClass.VIEW_TESTPACKAGE 惰性对）——类与命名空间
 * 必须存在，否则任何收发包（含登录 send）即 TypeError；addPackage 体
 * `be.isTestShow&&i.all.push({...})` 在 isTestShow 关闭（默认）时短路，仅登记。
 *
 * 原文：code1.js 字节 [6608398,6611004)（包装变量 W7，`W7=function(t){...}(MH)`，
 * 声明器单一 CallExpression；`i}(MH),z7=` @6611003 实证）。
 * 注册：o(i,"sg.test.testpakcage.TestPackage",t)，基类 t=MH=ui.test.TestPakcageUI
 * （本批同步翻译）；oracle：.../oracle/batch-i/TestPackage.js
 *
 * 别名：us=SaveLocal（B ✓）、be=TestUtils（B ✓）、tn=ViewManager（A ✓）、
 * P=laya.utils.Handler；i.__super→super()。
 *
 * 保真注记：
 * - 原文 ctor `this.selelctItem=null` 在 __super 之前，TS 译为 super() 后显式
 *   null 赋值（纯赋值无 super 链读取者，观测等价，批次 H 先例）；selelctItem
 *   拼写（多一 l）原文如此。
 * - ctor `i.instance=this` 静态实例登记、`i.shoucang` 每次构造从 SaveLocal
 *   重读并覆写（原文行为照抄）。
 * - renderItem 闭包内 `var e` 遮蔽外层形参 e、catch(t) 遮蔽外层 t（原文如此）。
 */
import Handler = laya.utils.Handler;
import { SaveLocal } from "../utils/SaveLocal";
import { TestUtils } from "../map/utils/TestUtils";
import { ViewManager } from "../manager/ViewManager";
import { TestPakcageUI } from "../ui/test/TestPakcageUI";

export class TestPackage extends TestPakcageUI {

    /** 当前选中收藏项（原文拼写 selelctItem） */
    public selelctItem: any;

    constructor() {
        super();
        this.selelctItem = null;
        var t = this;
        TestPackage.instance = this;
        var e: any = SaveLocal.getValue("lichuang/shoucang");
        TestPackage.shoucang = e ? JSON.parse(e.toString()) : [],
        this.log_list.renderHandler = new Handler(this, this.renderItem),
        this.tab.selectHandler = new Handler(this, this.changeSelete),
        this.back.clickHandler = new Handler(this, function () {
            t.selectContent.visible = !0, t.editContent.visible = !1;
            try {
                var i = JSON.parse(t.inputText.text);
                t.selelctItem.content = i, t.save();
            } catch (t) { ViewManager.instance.showTipsTxt("有错误！"); }
        }),
        this.tab.selectedIndex = 0,
        this.editContent.visible = !1,
        this.send.clickHandler = new Handler(this, function () { t.sendPackage(t.selelctItem); }),
        this.mouseThrough = !1;
    }

    /** 收藏落盘 */
    public save(): void {
        var t = JSON.stringify(TestPackage.shoucang);
        SaveLocal.save("lichuang/shoucang", t);
    }

    /** tab 过滤：3=收藏页；否则按 type（0=全部）过滤 all */
    public changeSelete(): void {
        var t = this;
        3 == this.tab.selectedIndex ? this.log_list.dataSource = TestPackage.shoucang.concat() : this.log_list.dataSource = TestPackage.all.filter(function (i: any) {
            return 0 == t.tab.selectedIndex || t.tab.selectedIndex == i.type;
        });
    }

    /** 收藏列表 cell 渲染：备注编辑、go/send、收藏切换、时间、编辑跳转 */
    public renderItem(t: any, e: any): void {
        t.mouseThrough = !0;
        var s = this;
        var n: any = this.log_list.dataSource[e];
        t.getChildByName("beizhu").offAll("change"),
        t.getChildByName("name").text = n.title,
        t.getChildByName("beizhu").text = n.beizhu ? n.beizhu : "备注无",
        t.getChildByName("beizhu").on("change", this, function () { n.beizhu = t.getChildByName("beizhu").text; }),
        t.getChildByName("go").visible = n.send,
        t.getChildByName("go").clickHandler = new Handler(this, function () { s.sendPackage(n); }),
        t.getChildByName("save").label = -1 == TestPackage.shoucang.indexOf(n) ? "收藏" : "取出",
        t.getChildByName("save").clickHandler = new Handler(this, function () {
            var e = TestPackage.shoucang.indexOf(n);
            -1 == e ? TestPackage.shoucang.push(n) : (TestPackage.shoucang.splice(e, 1), 3 == s.tab.selectedIndex && s.callLater(s.changeSelete)),
            s.save(),
            t.getChildByName("save").label = -1 == TestPackage.shoucang.indexOf(n) ? "收藏" : "取出";
        }),
        t.getChildByName("time").text = new Date(n.time).toLocaleDateString() + " " + new Date(n.time).toLocaleTimeString(),
        t.getChildByName("edit").clickHandler = new Handler(this, function () { s.selectContent.visible = !1, s.editContent.visible = !0, s.showContent(n); });
    }

    /** 编辑页回填 */
    public showContent(t: any): void {
        this.inputText.text = JSON.stringify(t.content), this.title_txt.text = t.title, this.beizhu_txt.text = t.beizhu || "", this.selelctItem = t;
    }

    /** 发包（caller=NetSocket 实例） */
    public sendPackage(t: any): void {
        t.caller.send(t.title, t.content);
    }

    public show(): void {
        this.visible = !0, this.changeSelete();
    }

    public hide(): void {
        this.visible = !1, this.changeSelete();
    }

    /** 收发包登记（send=!0 发包 / !1 收包）；isTestShow 关闭时短路 */
    public static addPackage(t: any, e: any, s: any, n: any): any {
        TestUtils.isTestShow && TestPackage.all.push({ type: s ? 1 : 2, time: (new Date).getTime(), send: s, content: e, beizhu: "", title: t, caller: n });
    }

    public static shoucang: any[] = [];
    public static all: any[] = [];
    public static instance: TestPackage = null;
}

/**
 * 注册身份等价物：原文 o(i,"sg.test.testpakcage.TestPackage",t)（t=MH=
 * ui.test.TestPakcageUI）。base 传 null 见「注册等价决策」（batch-a-report.md）。
 */
Laya.class(TestPackage, "sg.test.testpakcage.TestPackage", null, null);
