/**
 * sg.view.init.ViewAlert —— 确认/警告弹窗（ViewManager.showAlert/showWarn 的面板）。
 *
 * 原文：code1.js 字节 [6938789,6941589]（off 6939105，包装变量 b6，基类 QH=ui.init.viewAlertUI）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/ViewAlert.js
 *
 * 依赖：vs=sg.utils.Tools、Rt=sg.cfg.ConfigApp、ue=sg.manager.ModelManager、
 * re=sg.manager.AssetsManager、tn=sg.manager.ViewManager（批次 B/A 模块直引）；
 * this.md 为 ModelAlert 实例字段（ue.instance.modelAlert）。
 */
import { viewAlertUI } from "../../ui/init/viewAlertUI";
import { Tools } from "../../utils/Tools";

export class ViewAlert extends viewAlertUI {

    /** 弹窗数据（ModelManager.instance.modelAlert，原文 this.md） */
    public md: any = null;
    public mArr: any[] = null;
    public mCenterX: number = 0;

    constructor() {
        super();
        this.btn0.on("click", this, this.onClick, [this.btn0]);
        this.btn1.on("click", this, this.onClick, [this.btn1]);
        this.btnCheck.on("click", this, this.checkClick);
        Tools.setBtnHitRectangle(this.btnCheck, 80, 80);
        this.mCenterX = this.btn0.centerX;
    }

    /** 弹窗内容装配：标题/正文/消耗行/复选框/按钮布局（竖屏按可见元素重排） */
    public initData(): void {
        if (this.comTitle && this.comTitle.setViewTitle(Tools.getMsgById("_public203")),
            sg.cfg.ConfigApp.isLandscape) {
            var t = (<any>this).tTitle, i = (<any>this).imgTitle;
            t.text = Tools.getMsgById("_public203"),
                Tools.textLayout2(t, i, 300, 220);
        }
        this.btn0.label = Tools.getMsgById("_public183");
        this.btn1.label = Tools.getMsgById("_shogun_text03");
        (<any>this).ttt.text = Tools.getMsgById("treasure_text03");
        this.md = sg.manager.ModelManager.instance.modelAlert,
            this.onlyCloseByBtn(this.md.force_btn),
            this.text1.text = this.text2.text = "",
            this.text1.valign = "top",
            this.text1.wordWrap = true,
            this.text1.text = this.md.text,
            this.text1.height = this.text1.textField.textHeight,
            this.text2.text = this.md.text2,
            this.text2.height = this.text2.textField.textHeight,
            this.md.cost_arr && this.comtype.setData(sg.manager.AssetsManager.getAssetItemOrPayByID(this.md.cost_arr[0]), this.md.cost_arr[1]),
            this.box0.visible = null != this.md.cost_arr,
            this.box1.visible = "" != this.md.repeat_key,
            this.text2.visible = "" != this.md.text2,
            this.btn1.visible = !this.md.only,
            this.md.only ? this.btn0.centerX = 0
                : (this.btn0.centerX = this.mCenterX, this.btn1.centerX = -1 * this.mCenterX),
            sg.cfg.ConfigApp.isLandscape && (
                this.btn0.y = "" == this.md.repeat_key ? .5 * (this.btn0.parent.height - this.btn0.height) : this.btn0.parent.height - this.btn0.height,
                this.btn1.y = "" == this.md.repeat_key ? .5 * (this.btn1.parent.height - this.btn1.height) : this.btn1.parent.height - this.btn1.height),
            this.btnCheck.selected = false,
            "" != this.md.repeat_key && (
                this.text3.text = Tools.getMsgById("193006"),
                sg.cfg.ConfigApp.isLandscape || (
                    this.text3.width = this.text3.textField.textWidth,
                    this.btnCheck.x = this.text3.width + 10,
                    this.box1.width = this.btnCheck.x + this.btnCheck.width,
                    this.box1.centerX = 0)),
            this.mArr = sg.cfg.ConfigApp.isLandscape ? [this.text1, this.box0, this.text2] : [this.text1, this.box0, this.text2, this.box1];
        for (var e: any[] = [], s = 0, n = 0, h = 0; h < this.mArr.length; h++)
            s += this.mArr[h].visible ? this.mArr[h].height : 0,
                n += 0 != h && this.mArr[h].visible ? 1 : 0,
                this.mArr[h].visible && e.push(this.mArr[h]);
        s += 14 * n,
            this.contentBox.height = s,
            this.contentBox.centerY = 0;
        for (var o = 0, r = 0; r < e.length; r++)
            e[r].y = o,
                o += e[r].height + 14;
    }

    public onAdded(): void {
        this.bg && ((<any>this.bg.getChildByName("btn_close")).visible = false);
    }

    /** 按钮：警告走 clearWarn，普通走 closePanel；btn0=确认（execute(0)+记录不再提示） */
    public onClick(t: any): void {
        switch (this.md.isWarn ? sg.manager.ViewManager.instance.clearWarn() : sg.manager.ViewManager.instance.closePanel(this), t) {
            case this.btn0: this.md.execute(0), this.setLocal(); break;
            case this.btn1: this.md.execute(1);
        }
    }

    public checkClick(): void {
        this.btnCheck.selected = !this.btnCheck.selected;
    }

    /** 复选“不再提示”：repeat_key 写入本地删除表 */
    public setLocal(): void {
        "" != this.md.repeat_key && this.btnCheck.selected && Tools.setAlertIsDel(this.md.repeat_key);
    }

    public onRemoved(): void {
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.view.init.ViewAlert",t)（t=QH=ui.init.viewAlertUI）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(ViewAlert, "sg.view.init.ViewAlert", null, null);
