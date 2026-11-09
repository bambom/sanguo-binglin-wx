/**
 * sg.utils.CustomLoader —— 自定义资源加载器：接管 image/atlas/json5 三类解析
 * （Loader.parserMap），支持资源包 XOR 加密（sp_type 派生密钥）、加密 json5 清单、
 * 多图 atlas 逐张装载与 Texture 注册。
 *
 * 原文：code1.js 字节 [1098377,1102295]（包装变量 is，2 参注册，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/CustomLoader.js
 *
 * 依赖（UMD 级别名，286430/284964 处实测）：Y=laya.net.Loader、Tt=laya.net.URL、
 * R=laya.net.HttpRequest、bt=laya.resource.Texture、E=laya.resource.HTMLImage、
 * rt=laya.net.ResourceVersion、m=laya.utils.Browser、s=Laya、P=laya.utils.Handler；
 * Rt=ConfigApp（批次 B 模块直引，get_ASSETS_VERSION_URL）。
 * 原文各类方法经 i.xxx 类自引，TS 化后改 CustomLoader 直引（batch-a-report §6.4）。
 */
import Handler = laya.utils.Handler;
import HttpRequest = laya.net.HttpRequest;
import Texture = laya.resource.Texture;
import HTMLImage = laya.resource.HTMLImage;
import URL = laya.net.URL;
import { ConfigApp } from "../cfg/ConfigApp";

export class CustomLoader {

    constructor() {
    }

    /** r(1,i,"sp_type",...) —— XOR 密钥流：单词组 join-split 后逐字符 charCode */
    public static get sp_type(): number[] {
        return ["put", "ResourceVersion", "sum", "use", "box", "fit", "buy", "day"].join("-").split("").map(function (t: string) { return t.charCodeAt(0); });
    }

    /** 接管 image/atlas/json5 解析；拉取 ASSETS_VERSION 清单后启用 ResourceVersion */
    public static register(e: any): void {
        CustomLoader.load_types = ["image", "atlas", CustomLoader.JSON5];
        for (var h = CustomLoader.load_types.length - 1; h >= 0; h--)
            laya.net.Loader.parserMap[CustomLoader.load_types[h]] = function (t: any) {
                CustomLoader.loadRes(t.url, function (s: any) {
                    CustomLoader.dispatch(t, s);
                });
            };
        var o = ConfigApp.get_ASSETS_VERSION_URL() + "?" + (new Date()).getTime();
        Laya.loader.load(o, Handler.create(null, function () {
            laya.net.ResourceVersion.enable(o, e);
        }), null, CustomLoader.JSON5);
    }

    public static unregister(): void {
        CustomLoader.load_types && CustomLoader.load_types.forEach(function (t: any) {
            delete laya.net.Loader.parserMap[t];
        });
    }

    public static dispatch(e: any, s: any): void {
        switch (e.type) {
            case "image": CustomLoader.parseImage(e, s); break;
            case "atlas": CustomLoader.parseAtlas(e, s); break;
            case CustomLoader.JSON5: CustomLoader.parseJson(e, s);
        }
    }

    /** arraybuffer 拉取；错误与空数据只打日志（不回调，Loader 侧按超时处理） */
    public static loadRes(e: any, s: any): void {
        var h = URL.formatURL(e),
            o = new HttpRequest();
        o.on("error", CustomLoader, function (t: any) {
            console.log("[CustomLoader] " + e + " | " + h);
        }),
            o.on("complete", CustomLoader, function (t: any) {
                t ? s(t) : console.log("[CustomLoader] No data! " + e + " | " + h);
            }),
            o.send(h, null, "get", "arraybuffer");
    }

    /** XOR 解密：按 sp_type 密钥流循环异或 */
    public static decrypt(e: any): ArrayBuffer {
        var n = new Uint8Array(e),
            h = CustomLoader.sp_type,
            o = h.length;
        for (var r = 0; r < n.length; r++) n[r] ^= h[r % o];
        return n.buffer;
    }

    public static arrayBufferToString(i: any): string {
        var s = (<any>laya.utils.Browser.window).TextDecoder;
        if (typeof s !== "undefined") return new s("utf-8").decode(i);
        for (var n = new Uint8Array(i), h = "", o = 0; o < n.length; o++) h += String.fromCharCode(n[o]);
        return h;
    }

    /** Blob URL 方式解出 Texture（加密图先 decrypt）；imgCache 缓存并在回调后回收 */
    public static _loadImage(e: any, s: any, n: any): void {
        CustomLoader.encryptImage && (e = CustomLoader.decrypt(e));
        var o = new Uint8Array(e),
            r = new (<any>laya.utils.Browser.window).Blob([o]),
            a = (<any>laya.utils.Browser.window).URL.createObjectURL(r),
            l: any = HTMLImage.create(a);

        function c(t?: boolean) {
            void 0 === t && (t = !1),
                l.onload = null,
                l.onerror = null,
                t && (<any>laya.utils.Browser.window).URL.revokeObjectURL(a),
                delete CustomLoader.imgCache[a];
        }
        CustomLoader.imgCache[a] = l,
            l.crossOrigin = "",
            l.onerror = function () {
                c(!0),
                    null != n && n();
            },
            l.onload = function () {
                c(!1);
                var t = new Texture(l);
                null != s && s(t);
            };
    }

    public static parseImage(e: any, s: any): void {
        var h = URL.formatURL(e.url);
        CustomLoader._loadImage(s, function (t: any) {
            t.url = h,
                e.endLoad(t);
        }, function () {
            console.log("[CustomLoader]" + e.url + " | " + h);
        });
    }

    /** ASSETS_VERSION_URL 命中的 json5 可能加密：首字符非 "{" 则先 decrypt；清单内 encryptImage=false 时撤销接管 */
    public static parseJson(e: any, s: any): void {
        var h = 0 === e.url.indexOf(ConfigApp.get_ASSETS_VERSION_URL()),
            o = CustomLoader.arrayBufferToString(s);
        if (h) {
            !("{" === o[0]) && (o = CustomLoader.arrayBufferToString(CustomLoader.decrypt(s)));
            var r = JSON.parse(o);
            CustomLoader.encryptImage = r.encryptImage || !1,
                CustomLoader.encryptImage || CustomLoader.unregister(),
                e.endLoad(r);
        } else e.endLoad(JSON.parse(o));
    }

    /** atlas：meta.image 多图逐张补装（倒序 toLoads），完成后 finishAtlas 注册帧 */
    public static parseAtlas(e: any, s: any): void {
        var h = e.url,
            o = CustomLoader.arrayBufferToString(s),
            r = JSON.parse(o);
        if (r.meta) {
            var a: any, l = h.indexOf("/") >= 0 ? "/" : "\\",
                c = h.lastIndexOf(l),
                u = c >= 0 ? h.substr(0, c + 1) : "";
            if (r.meta.image)
                for (var d = 0, _ = (a = r.meta.image.split(",")).length; d < _; d++)
                    a[d] = URL.formatURL(u + a[d]);
            else a = [],
                console.warn("图集元数据中缺少图片信息", h);
            a.reverse(),
                r.toLoads = a,
                r.pics = [],
                CustomLoader.loadNextAtlasImage(e, r);
        }
    }

    public static loadNextAtlasImage(e: any, s: any): void {
        var h = s.toLoads;
        if (0 !== h.length) {
            var o = h.pop(),
                r = URL.formatURL(o);
            CustomLoader.loadRes(r, function (t: any) {
                CustomLoader._loadImage(t, function (t: any) {
                    t.url = r,
                        s.pics.push(t),
                        CustomLoader.loadNextAtlasImage(e, s);
                }, function () {
                    console.log("[CustomLoader] load atlas image error:", o),
                        CustomLoader.loadNextAtlasImage(e, s);
                });
            });
        } else CustomLoader.finishAtlas(e, s);
    }

    public static finishAtlas(e: any, s: any): void {
        var h = s.frames,
            o = e.url.split("?")[0],
            r = s.meta && s.meta.prefix ? s.meta.prefix : o.substring(0, o.lastIndexOf(".")) + "/",
            a = s.pics,
            l = URL.formatURL(e.url),
            c = 1;
        s.meta && s.meta.scale && 1 != s.meta.scale && (c = parseFloat(s.meta.scale)),
            CustomLoader.registerAtlasFrames(h, a, r, l, c),
            delete s.pics,
            delete s.toLoads,
            e.endLoad(s);
    }

    /** 帧注册：atlasMap[目录 url] 收集帧 url，cacheRes 存 Texture，非 1 倍 scale 标 scaleRate */
    public static registerAtlasFrames(i: any, e: any, s: string, n: string, h: any): void {
        var r = (<any>laya.net.Loader).atlasMap,
            a: any = r[n] || (r[n] = []);
        a.dir = s;
        var l = 1 != h;
        for (var c in i) {
            var u = i[c],
                d: any = e[u.frame.idx ? u.frame.idx : 0];
            l && (d.scaleRate = h);
            var _ = URL.formatURL(s + c),
                m = Texture.create(d, u.frame.x, u.frame.y, u.frame.w, u.frame.h, u.spriteSourceSize.x, u.spriteSourceSize.y, u.sourceSize.w, u.sourceSize.h);
            laya.net.Loader.cacheRes(_, m),
                m.url = _,
                l || (laya.net.Loader.loadedMap[_].url = _),
                a.push(_);
        }
    }

    public static JSON5: string = "json5";
    public static load_types: any = null;
    public static imgCache: any = {};
    public static encryptImage: boolean = false;
}

/**
 * 注册身份等价物：原文 o(i,"sg.utils.CustomLoader")（2 参注册，无基类）。
 */
Laya.class(CustomLoader, "sg.utils.CustomLoader", null, null);
