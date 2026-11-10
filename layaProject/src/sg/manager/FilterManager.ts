/**
 * sg.manager.FilterManager —— 禁言词过滤器（词库分组 cityName/talk/name、
 * 逐字符状态机替换、楼层号链接包装；批次 O，initLoginView 无条件 setBanWord）。
 *
 * 原文：code1.js 字节 [914461,917594)（ce= 声明器 @914458，0 参 IIFE，注册
 * o(t,"sg.manager.FilterManager") 2 参字面量形态 @914582，无基类）。前邻
 * EffectManager 簇尾 `animationCache={customGroup:{}}}]),t}()`、后邻 ue=ModelManager
 * （批次 B ✓）——sg.manager 簇。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-o/FilterManager.js
 *
 * 入批依据：ViewLoad.initLoginView:483 无条件 `sg.manager.FilterManager.instance.
 * setBanWord()`（装载退出闸门 → loadOthers → assetsAndServerCfgGet（isAssets&&
 * isServerCfg）→ mFunQueue.next() → initLoginView 链；checkPrivacy 之后第一调用）。
 * `.instance` 为 r(1,t,"instance",getter) 惰性访问器（批次 K 定案：读取即
 * `t.inst=t.inst||new t` 触发 ctor——ctor 纯 4 字段，硬路径 0 未译类）。
 * setBanWord 内 wx_37 条件链实证通过（"fs_ad_37"/"fs_h5_37"!=pf；releaseWeiXin()
 * 真值经 window.game37_pf="wx_37"，取 pf!=bugu_sg4_pf&&pf!=game37_fs_pf 分支）→
 * setNameBanWord("lc_name")+setTalkBanWord("lc_0") 必执行 → Base64.decode（同批 ✓）。
 *
 * 身份（resolve_o.js，acorn 作用域链；自由变量全解析）：
 *   Gt=ConfigServer（B ✓）、vs=Tools（B ✓）、gs=StringUtil（B ✓）、cs=ObjectUtil
 *   （B ✓）、Ze=ArrayUtil（B ✓）、Rt=ConfigApp（B ✓）、$=laya.wx.mini.MiniAdpter、
 *   s=Laya（s.loader.getRes）、ts=sg.utils.Base64（本批 ✓，同批直引）、
 *   wi=sg.fight.logic.utils.FightDuplicateUtils（池化 t(4327)→pool[4112]，批次 D
 *   ModelChat 期已登记；未译，floorWrap 全局路径调用期解析——玩法期楼层文案，
 *   装载/登录链 0 触达，译文已译调用面 ModelChat/Platform 均走 wordBan/nameBan）、
 *   o=Laya.class、r=s.getset、JSON/RegExp/console 内建。
 * 声明器单一 CallExpression（`}(),ce=function(){…}(),ue=` 字节实证，非 Ee 式
 * 逗号双跳）。批次 M §7 登记的 ce@914458/@914582 与本批 acorn 定界一致。
 *
 * 保真注记（求值序专项见 batch-o-report.md §5）：
 * - setBanWord 整体为单个 && 链表达式语句（三级门禁 + 括号内逗号序列副作用），
 *   `(this.setNameBanWord("lc_name"),this.useServerBanWords||(…,-1!=[…].indexOf(
 *   Rt.pf)&&this.setTalkBanWord("lc_wh")))` 的嵌套 ||/&&/逗号分组逐段保留；
 * - initBanWords 的 `t.hasOwnProperty(e)?(s=t[e]).hasOwnProperty(i)||(s[i]=""):
 *   (s[i]="",t[e]=s)` —— 三元两臂 + `(s=t[e])` 括号内赋值 + `||` 短路副作用
 *   原样（ViewLoad 丢括号勘误同形防护点）；
 * - replaceMsg 主循环 `h=this.getWordsByType(i)`（for-init 第三段）、命中 continue、
 *   `a&&(o=!0,s+=a[0],t=t.substr(a[0].length))` && 副作用链原样；
 * - floorWrap 的 `(l=""==i?l:gs.htmlFontColor(l,i))` 括号内赋值参与字符串拼接
 *   原样；`Gt.system_simple.floor_rep?…:"([1-9])[,]([1-9])"` 缺省正则原样；
 * - restoreBanWord 的 `catch(t){console.log(t),i={}}` 逗号链 + `cs.keys(i)` 返回
 *   原样；词库文件头 3 字符跳过（t.substring(3)）为原文 Base64 前缀约定；
 * - 尾部 `r(1,t,"instance",getter)` + `t.inst=null` → TS static get instance +
 *   静态字段（批次 K ModelPlayer 同款；getter-only 引擎安装只读访问器，TS static
 *   get 等价）；TYPE_CITY/TYPE_TALK/TYPE_NAME 赋值序照抄；
 * - ctor 4 字段前置赋值移 TS 字段初始化器（纯赋值无读取者，批次 F/M 先例）。
 */

import { ConfigServer } from "../cfg/ConfigServer";
import { ConfigApp } from "../cfg/ConfigApp";
import { Tools } from "../utils/Tools";
import { StringUtil } from "../utils/StringUtil";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ArrayUtil } from "../utils/ArrayUtil";
import { Base64 } from "../utils/Base64";
import MiniAdpter = laya.wx.mini.MiniAdpter;

export class FilterManager {

    public banWord_cityName: any = {};
    public banword_name: any = {};
    public banWord_talk: any = {};
    public useServerBanWords: boolean = false;

    public wordBan(t: any): any {
        var i = "";
        try { i = this.replaceMsg(t, 1); } catch (t) { }
        return i;
    }

    public hasBanWord(t: any): boolean {
        return this.wordBan(t) !== t;
    }

    public cityWrap(t: any, i?: any): any {
        return void 0 === i && (i = ""),
            null == t || "" == t ? "" : this.replaceMsg(t, 0, i);
    }

    public nameBan(t: any): any {
        var i = "";
        try { i = this.replaceMsg(t, 2); } catch (t) { }
        return i;
    }

    /** 楼层号 → 可点击楼层链接（wi=FightDuplicateUtils 未译，全局路径调用期解析） */
    public floorWrap(t: any, i?: any): any {
        if (void 0 === i && (i = ""), null == t || "" == t)
            return "";
        var e = "",
            s = ConfigServer.system_simple.floor_rep ? ConfigServer.system_simple.floor_rep : "([1-9])[,]([1-9])",
            n = new RegExp(s),
            h = t.match(n);
        if (h) {
            var o = h[0],
                r = t.split(o),
                a = "floor_" + sg.fight.logic.utils.FightDuplicateUtils.getFloorId(h[1], h[2]),
                l = sg.fight.logic.utils.FightDuplicateUtils.getFloorName(sg.fight.logic.utils.FightDuplicateUtils.getFloorId(h[1], h[2]), 2),
                c = "<span href='" + a + "'>" + (l = "" == i ? l : StringUtil.htmlFontColor(l, i)) + "</span>";
            e = r[0] + c + r[1];
        } else
            e = t;
        return e;
    }

    /** 逐字符状态机：标签/占位头部直通，命中词库最长词 → wrapWord，其余逐字透传 */
    public replaceMsg(t: any, i: any, e?: any): any {
        void 0 === e && (e = "");
        for (var s = "", n = [/^<.*?>/, /^\{\w+\}/], h = this.getWordsByType(i); t.length;) {
            for (var o = !1, r = 0; r < n.length; r++) {
                var a = t.match(n[r]);
                a && (o = !0, s += a[0], t = t.substr(a[0].length));
            }
            if (!o) {
                var l = t.charAt(0),
                    c = h[l];
                if (c) {
                    var u = ObjectUtil.keys(c).sort(function (t: any, i: any) { return i.length - t.length; }),
                        d = ArrayUtil.find(u, function (i: any) { return 0 === t.indexOf(i); });
                    if (d) {
                        t = t.substr(d.length),
                            s += this.wrapWord(d, i, e);
                        continue;
                    }
                }
                s += l,
                    t = t.substr(1);
            }
        }
        return s;
    }

    public wrapWord(t: any, i: any, e?: any): any {
        return void 0 === e && (e = ""),
            0 == i ? "<span href='" + Tools.getCityIDByName(t) + "'>" + (e ? StringUtil.htmlFontColor(t, e) : t) + "</span>"
                : 1 === i || 2 === i ? t.replace(/./g, "*")
                    : t;
    }

    public getWordsByType(t: any): any {
        return 0 === t ? this.banWord_cityName
            : 1 === t ? this.banWord_talk
                : 2 === t ? this.banword_name
                    : {};
    }

    public isLegalWord(t: any): boolean {
        return -1 != this.wordBan(t).indexOf("*");
    }

    /** 禁言词装载（fs 渠道除外；微信发行版下校验 pf 非 bugu_sg4/game37_fs 子渠道）：
     *  本地词库 lc_name + lc_0（cn 语言追加渠道词库），服务器词库已装则跳过本地 talk 词库 */
    public setBanWord(): void {
        "fs_ad_37" != ConfigApp.pf && "fs_h5_37" != ConfigApp.pf && (
            !ConfigApp.releaseWeiXin() || ConfigApp.pf != (<any>MiniAdpter.window).bugu_sg4_pf && ConfigApp.pf != (<any>MiniAdpter.window).game37_fs_pf
        ) && (
            this.setNameBanWord("lc_name"),
            this.useServerBanWords || (
                this.setTalkBanWord("lc_0"),
                "cn" == ConfigApp.lan() && (
                    "h5_360_3" == ConfigApp.pf ? this.setTalkBanWord("lc_iwy")
                        : "h5_360_2" == ConfigApp.pf ? this.setTalkBanWord("lc_4399")
                            : this.setTalkBanWord("lc_37"),
                    -1 != ["h5_360", "h5_360_2", "h5_360_3", "ad_360"].indexOf(ConfigApp.pf) && this.setTalkBanWord("lc_wh")
                )
            )
        );
    }

    public setCityBanWord(): void {
        var t: any[] = [];
        for (var i in ConfigServer.city) {
            var e = Tools.getMsgById(ConfigServer.city[i].name);
            t.push(e);
        }
        this.initBanWords(this.banWord_cityName, t);
    }

    public setNameBanWord(t: any): void {
        this.initBanWords(this.banword_name, this.restoreBanWord(Laya.loader.getRes("ad/" + t + ".txt")));
    }

    public setTalkBanWord(t: any): void {
        this.initBanWords(this.banWord_talk, this.restoreBanWord(Laya.loader.getRes("ad/" + t + ".txt")));
    }

    public setTalkBanWord_server(t: any): void {
        this.useServerBanWords = !0,
            this.initBanWords(this.banWord_talk, this.restoreBanWord(t));
    }

    /** 按首字符分桶建索引；`(s=t[e]).hasOwnProperty(i)||(s[i]="")` 原文求值序保留 */
    public initBanWords(t: any, i: any): void {
        i.filter(function (t: any) { return t && t.length >= 1; }).forEach(function (i: any) {
            var e = i.charAt(0),
                s: any = {};
            t.hasOwnProperty(e)
                ? (s = t[e]).hasOwnProperty(i) || (s[i] = "")
                : (s[i] = "", t[e] = s);
        });
    }

    /** 服务器下发词库解码（Base64 前缀 3 字符跳过 → JSON.parse → 键提取；异常回退空键集） */
    public restoreBanWord(t: any): any {
        if (!t) return [];
        var i: any = null;
        try {
            var e = Base64.decode(t.substring(3));
            i = JSON.parse(e);
        } catch (t) { console.log(t), i = {}; }
        return ObjectUtil.keys(i);
    }

    /* ---- 静态面（原文尾部序：r(1,t,"instance",getter) → t.inst=null → TYPE_*） ---- */
    public static inst: any = null;

    /** r(1,t,"instance",getter) —— 读取即构造并 memoize（批次 K getset 语义定案） */
    public static get instance(): FilterManager {
        return FilterManager.inst = FilterManager.inst || new FilterManager();
    }

    public static TYPE_CITY: number = 0;
    public static TYPE_TALK: number = 1;
    public static TYPE_NAME: number = 2;
}

/**
 * 注册身份等价物：原文 o(t,"sg.manager.FilterManager")（2 参，无基类）。
 * base 传 null 的原因见 NetPackage.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(FilterManager, "sg.manager.FilterManager", null, null);
