/**
 * sg.crossService.ui.MarkBase —— 跨服战地图新标记点（ctor 建档：glow_arr_rarity 光效 +
 * setData 定位文案/楼层坐标；newMark 臂播光效 + box_tips 补间入出；move 位移动画；
 * _onClick 跳转 boundForMap2；静态 getName 生成 MARK_SIGN+cid 键）。
 *
 * 原文：code1.js 字节 [4142822,4144170)（1,348B；包装变量 DP，1 参 IIFE 基类实参 (Ag)=
 * ui.duplicate.markBaseUI（未译缓译），明文 3 参注册 o(i,"sg.crossService.ui.MarkBase",t)
 * @4143227；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-v/MarkBase.js
 *
 * 批次 V 入批原因：sg.crossService.ui 首簇第 5 类（CrossServiceUI._refreshMarks new DP +
 * DP.getName 硬依赖，同批互引）。
 * extends 决策：原文基类 Ag=ui.duplicate.markBaseUI（IDE 皮肤类，未译，归后续批次；其
 * 自身基类 e_=sg.view.com.ItemBase 批次 A ✓）。本批暂 extends 已译真祖先 ItemBase，
 * 原型链缺 IDE 皮肤层；ui.duplicate.markBaseUI 落地后本文件 extends 需重指向——见
 * batch-v-report.md「extends 决策」。
 * 依赖：vs=Tools、le=EffectManager（B ✓ 模块直引）；P=laya.utils.Handler、Ct=
 * laya.utils.Tween、k=laya.utils.Ease、s=Laya（引擎）。
 * 批次外（ambient 全局路径，延迟调用）：ho=sg.crossService.model.CrossServiceUserModel
 * （instance.allUser/myLeader）、wi=sg.fight.logic.utils.FightDuplicateUtils
 * （getFloorName 既有声明；getFloorCoordinate 调回点 cast）、Dt=sg.boundFor.GotoManager
 * （instance.boundForMap2 调回点 cast）。
 * ctor 求值序：index/ani/cid 三字段初始化器原文先于 __super.call，TS 移到 super 后
 * （纯赋值，观测等价，批次 H 先例）；userModel 起的全部效应保持原序。
 * 皮肤字段（markBaseUI：box_tips/txt_tips/img/txt_pos）类型层声明，无初始化器。
 */
import Handler = laya.utils.Handler;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import { ItemBase } from "../../view/com/ItemBase";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";

export class MarkBase extends ItemBase {

    public index: number = 0;
    public ani: any = null;
    public cid: number = 0;
    public userModel: any;

    public box_tips: any;
    public txt_tips: any;
    public img: any;
    public txt_pos: any;

    constructor(t?: any) {
        super();
        this.userModel = sg.crossService.model.CrossServiceUserModel.instance,
            this.txt_tips.style.color = "#FFFFFF",
            this.txt_tips.style.fontSize = 20,
            this.txt_tips.style.wordWrap = !1,
            this.ani = EffectManager.loadAnimation("glow_arr_rarity", "", 2),
            this.ani.pos(.5 * this.width, .5 * this.height),
            this.ani.visible = !1,
            this.addChild(this.ani),
            this.setData(t),
            this.img.on("click", this, this._onClick);
    }

    public setData(t: any): void {
        var i = this;
        this.cid = t.cid, this.y = t.y;
        var e = t.newMark;
        Tools.textFitFontSize(this.txt_pos, (<any>sg.fight.logic.utils.FightDuplicateUtils).getFloorCoordinate(this.cid)),
            Tools.textFitFontSize(this.txt_tips, Tools.getMsgById("500529", [this.userModel.allUser[this.userModel.myLeader].uname, sg.fight.logic.utils.FightDuplicateUtils.getFloorName(this.cid, 2)])),
            Laya.timer.clearAll(this),
            Laya.timer.clearAll(this.box_tips),
            this.box_tips.alpha = 0,
            this.box_tips.x = -400;
        var n = this;
        e && (this.img.visible = !1, this.ani.visible = !0, this.ani.play(0), this.ani.on("complete", this, function () {
            i.ani.visible = !1, i.img.visible = !0, i.box_tips && Tween.to(i.box_tips, { x: 0, alpha: 1 }, 200, Ease.quadIn, Handler.create(n, function () {
                Laya.timer.once(3e3, i.box_tips, function () {
                    i.box_tips && Tween.to(i.box_tips, { x: -400, alpha: 0 }, 200, Ease.quadIn);
                });
            }));
        }));
    }

    public move(t: any, i: any): void {
        Tween.to(this, { y: i }, 200, Ease.quadIn);
    }

    public _onClick(): void {
        (<any>sg.boundFor.GotoManager.instance).boundForMap2(this.cid, 0, "", null, 500);
    }

    public static getName(t: any): any {
        return "MARK_SIGN" + t;
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.crossService.ui.MarkBase",t)（t=Ag=ui.duplicate.markBaseUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(MarkBase, "sg.crossService.ui.MarkBase", null, null);
