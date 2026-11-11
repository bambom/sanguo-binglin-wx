/**
 * sg.crossService.view.CrossServiceClip —— 跨服战地砖剪辑基座（ctor 透传实体参；
 * layoutPos 按 entity.mapGrid.toScreenPos2 定位；entity 取值链为 EntityClip
 * 原型访问器，TileClip/CrossServiceTroopClip 同族基类）。
 *
 * 原文：code1.js 字节 [3234332,3234530)（198B；包装变量 dd，1 参 IIFE 基类实参
 * (Pu)=sg.scene.view.entity.EntityClip（未译缓译），明文 3 参注册
 * o(i,"sg.crossService.view.CrossServiceClip",t) @3234388；wrapper 体 2 语句；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-af/CrossServiceClip.js
 *
 * extends 决策：原文基类 Pu=sg.scene.view.entity.EntityClip（未译；其自身基类
 * bc=sg.map.view.IsoObject 亦未译）→ temp extends 其已译真祖先 x=laya.ui.Component
 * （IsoObject 的引擎基类，LayaAir.d.ts 真类），原型链缺 EntityClip/IsoObject 两层；
 * entity 为类型层声明（无初始化器、零运行时形状差异，运行期由 EntityClip 原型访问器
 * 提供；EntityClip/IsoObject 落地后 1 行重指向 + 恢复 super(t)，债登记 §5）。
 * ctor：原文 `i.__super.call(this,t)` 带实参 t；temp 基座 laya.ui.Component 的
 * d.ts ctor 为 constructor()（0 参），t 在 Component ctor 体内不被消费（运行期等价），
 * 故暂写 super()，重指向时恢复 super(t)。
 */
import Component = laya.ui.Component;

export class CrossServiceClip extends Component {

    /** 类型层声明（原文继承自 EntityClip 原型访问器 _$get_entity/_$set_entity；
     * 声明无初始化器不发射任何代码，运行期取值链不变） */
    public entity: any;
    /** EntityClip/IsoObject 原型链实例字段（类型层声明，无初始化器零发射；
     * 供本类子层 TileClip 及自身 destroy/事件链消费） */
    public _scene: any;
    public _clip: any;
    public _entity: any;
    public _cleared: any;

    constructor(t?: any) {
        super();
    }

    public layoutPos(): void {
        var t: any = this.entity.mapGrid.toScreenPos2();
        this.pos(t.x, t.y);
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.view.CrossServiceClip",t)
 * （t=Pu=sg.scene.view.entity.EntityClip，未译缓译；TS extends 层暂挂 laya.ui.Component）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(CrossServiceClip, "sg.crossService.view.CrossServiceClip", null, null);
