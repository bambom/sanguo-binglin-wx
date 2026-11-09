/**
 * sg.view.more.ViewNotice —— 战斗层右上事件通知（ViewManager.mLayerNotice）。
 *
 * 原文：code1.js 字节 [3694877,3697529]（off 3695103，包装变量 rx，基类 e_=sg.view.com.ItemBase）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewNotice.js
 *
 * 依赖：KB=ui.more.item_noticeUI（批次 B 模块直引）；ci=FightMain、_r=ModelHero、
 * Sr=ModelOfficial、No=MapModel、Dt=GotoManager、Ku=MapViewMain（批次外，全局路径）；
 * le=EffectManager（B）；tn=ViewManager（A）。
 */
import Tween = laya.utils.Tween;
import Handler = laya.utils.Handler;
import { ItemBase } from "../com/ItemBase";
import { item_noticeUI } from "../../ui/more/item_noticeUI";
import { Tools } from "../../utils/Tools";
import { EffectManager } from "../../manager/EffectManager";

export class ViewNotice extends ItemBase {

    public mTempArr: any[] = [];
    public upNumMax: number = 2;
    public mAddData: any = null;
    public mDelData: any = null;
    public mWaitArr: any[] = null;
    public clipIng: boolean = false;
    public mDelAllTime: number = 3;

    constructor() {
        super();
        this.mTempArr = [];
        this.mWaitArr = [];
        this.mouseThrough = true;
    }

    /** 通知入口：{cid,hid,status}；战斗层可见且当前城战斗中同 cid 忽略 */
    public input(t: any): void {
        var i = sg.manager.ViewManager.instance.mLayerFight.numChildren > 0;
        if (i) {
            var e = sg.fight.FightMain.getCurrCityId(), s = t.cid + "";
            if (e && e == s && 1 == t.status) return;
        }
        var n: any = {};
        n.id = (new Date).getTime(), n.info = t, n.status = 0;
        var h = n.ui = new item_noticeUI(),
            o = sg.model.ModelHero.getHeroName(t.hid),
            r = sg.model.ModelOfficial.getCityName(t.cid);
        if (h.tName.text = 0 == t.status ? Tools.getMsgById("_npc_info12") : Tools.getMsgById("_npc_info13"),
            h.tInfo.text = 0 == t.status ? Tools.getMsgById("_npc_info14", [o, r]) : Tools.getMsgById("_npc_info15", [o, r]),
            h.boxFight.visible = 1 == t.status,
            h.boxMove.visible = 0 == t.status,
            0 == t.status) {
            var a = sg.map.model.MapModel.instance.citys[t.cid];
            sg.cfg.ConfigApp.isLandscape && 9 == a.cityType
                ? EffectManager.fillCityAnimation(a, h.cityIcon, .4)
                : EffectManager.fillCityAnimation(a, h.cityIcon, 2);
        } else h.heroIcon.setHeroSkin(sg.manager.ModelManager.instance.modelGame.getModelHero(t.hid).getHeadId(false));
        h.btn_go.label = Tools.getMsgById("501030"),
            i || (h.btn_go.off("click", this, this.click), h.btn_go.on("click", this, this.click, [t.cid, h, t.status])),
            h.mouseEnabled = true,
            h.mouseThrough = true,
            this.mTempArr.push(n),
            this.check();
    }

    /** 点击前往：绑定跳转；战斗中再发进战斗网络请求 */
    public click(t: any, i: any, e: any): void {
        i.mouseEnabled = false,
            i.mouseThrough = true,
            sg.manager.ViewManager.instance.mLayerFight.numChildren < 1 && (
                sg.boundFor.GotoManager.boundFor({ type: 1, cityID: t }),
                    1 == e && sg.map.view.MapViewMain.instance.sendNetToInFight(sg.map.model.MapModel.instance.citys[t + ""]));
    }

    /** 队列调度：空闲即入列动画；满 3 秒整体淡出 */
    public check(): void {
        this.timer.clear(this, this.delAll),
            this.mTempArr.length > 0 && !this.clipIng
                ? (this.clipIng = true, this.addClip(this.mTempArr.shift()))
                : this.timer.once(1e3 * this.mDelAllTime, this, this.delAll);
    }

    public delAll(): void {
        var t: any, i = this.mWaitArr.concat();
        this.mWaitArr = [];
        for (var e = i.length, s = 0; s < e; s++)
            t = i[s], Tween.to(t.ui, { alpha: 0 }, 100, null, Handler.create(this, this.delAllEnd, [t]));
    }

    public delAllEnd(t: any): void {
        t && t.ui && t.ui.destroy(true);
    }

    /** 新通知滑入（右侧 380px 处） */
    public addClip(t: any): void {
        this.mWaitArr.push(t),
            this.mAddData = t,
            this.mAddData.status = 1,
            this.addChild(this.mAddData.ui),
            this.mAddData.ui.y = Laya.stage.height - 300,
            this.mAddData.ui.x = Laya.stage.width,
            Tween.to(this.mAddData.ui, { x: Laya.stage.width - 380 }, 200, null, Handler.create(this, this.waitClip));
    }

    /** 停止滑动：超上限移出最旧，其余整体上移 100px 腾位 */
    public waitClip(t?: any): void {
        void 0 === t && (t = false);
        this.mAddData = null,
            this.mWaitArr.length > this.upNumMax && this.delClip(this.mWaitArr.shift());
        for (var i = this.mWaitArr.length, e = 0; e < i; e++) {
            var s = this.mWaitArr[e];
            Tween.to(s.ui, { y: s.ui.y - 100 }, 200, null, e == i - 1 ? Handler.create(this, this.delEnd) : null);
        }
    }

    public delClip(t: any): void {
        this.mDelData = t,
            this.mDelData.status = 2,
            Tween.to(this.mDelData.ui, { y: this.mDelData.ui.y - 100, alpha: 0 }, 190);
    }

    public delEnd(): void {
        this.mDelData && this.mDelData.ui && this.mDelData.ui.destroy(true),
            this.mDelData = null,
            this.clipIng = false,
            this.check();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.more.ViewNotice",t)（t=e_=sg.view.com.ItemBase）。
 */
Laya.class(ViewNotice, "sg.view.more.ViewNotice", null, null);
