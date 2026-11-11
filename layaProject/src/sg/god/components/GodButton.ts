/**
 * sg.god.components.GodButton —— 神灵入口按钮（interfaces.IHeroButton 标记类；
 * setHero 按神灵激活态显隐并挂 update_ui 刷新监听；_onClick 打开神灵核对视图或提示）。
 *
 * 原文：code1.js 字节 [4348302,4348965]（663B；包装变量 iO，基类 jf=ui.god.btnGodUI
 * （IDE 生成 shell，未译，[3544925,3545160)），明文 3 参注册
 * o(i,"sg.god.components.GodButton",t)，off 4348400；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-s/GodButton.js
 *
 * 批次 S：sg.god.components 家族第 2 类。
 * 依赖（模块直引，已译）：tn=ViewManager、vs=Tools、re=AssetsManager、Ht=ConfigClass；
 * 批次外（ambient 全局路径，延迟调用）：bo=sg.god.model.ModelGodMain（批次 R 在译；
 * instance.active/on/off/getModels，实例面经 sg-externals-s.d.ts interface 合并增补）。
 * 构造顺序：原文 this.model=null 先于 __super.call；tsc 强制 super() 先行（字段为纯
 * 预置 null，super 链不观察，批次 H/O 位移等价先例）。
 */
import { ViewManager } from "../../manager/ViewManager";
import { Tools } from "../../utils/Tools";
import { AssetsManager } from "../../manager/AssetsManager";
import { ConfigClass } from "../../cfg/ConfigClass";

export class GodButton extends ui.god.btnGodUI {

    public model: any = null;

    constructor() {
        super();
        this.on("click", this, this._onClick);
    }

    public setHero(t: any): void {
        sg.god.model.ModelGodMain.instance.active ? (this.model = t, this.model.god ? (this.box_god.visible = !0, this.img_god.skin = AssetsManager.getAssetGod(this.model.godModel.skin_m)) : this.box_god.visible = !1, sg.god.model.ModelGodMain.instance.off("update_ui", this, this.setHero), sg.god.model.ModelGodMain.instance.on("update_ui", this, this.setHero, [t])) : this.visible = !1;
    }

    public _onClick(): void {
        sg.god.model.ModelGodMain.instance.getModels().length ? ViewManager.instance.showView(ConfigClass.VIEW_GOD_CHECK, { hid: this.model.id }) : ViewManager.instance.showTipsTxt(Tools.getMsgById("god_0021"));
    }
}

/**
 * 接口标记：原文 s.imps(e,{"interfaces.IHeroButton":!0})（s=Laya）。
 * 引擎语义实证（game.js getset/imps/un + __propun 字节）："interfaces.IHeroButton"
 * 全包从未经 Laya.interface 注册（game.js/code1.js 零 interface() 调用，__internals
 * 无此键）→ imps 仅在原型上定义空 __imps（un：{writable:!0,enumerable:!1,
 * configurable:!0}，键不标记）。此处按引擎实际效应直译（defineProperty 空对象）。
 */
Object.defineProperty(GodButton.prototype, "__imps", { value: {}, writable: !0, enumerable: !1, configurable: !0 });

/**
 * 注册身份等价物：原文 o(i,"sg.god.components.GodButton",t)（明文 3 参，t=jf=ui.god.btnGodUI）。
 * base 传 null 的原因见 ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(GodButton, "sg.god.components.GodButton", null, null);
