/**
 * sg.god.view.ViewChooseByType —— 神灵类型选择弹窗（list 单选回调）。
 *
 * 原文：code1.js 字节 [6116349,6116840)（491B；包装变量 a5，基类 RP=ui.god.chooseByTypeUI，
 * 明文 3 参注册 o(i,"sg.god.view.ViewChooseByType",t)，off 6116490；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-t/ViewChooseByType.js
 *
 * 依赖：P=laya.utils.Handler、cs=sg.utils.ObjectUtil（批次 A）、Gt=sg.cfg.ConfigServer（批次 B）、
 * nO=sg.god.components.GodIcon（批次 S 在译，ambient itemRender 值引用）。
 */
import Handler = laya.utils.Handler;
import { ObjectUtil } from "../../utils/ObjectUtil";
import { ConfigServer } from "../../cfg/ConfigServer";

export class ViewChooseByType extends ui.god.chooseByTypeUI {

    public handler: any = null;

    constructor() {
        super();
        this.list.itemRender = sg.god.components.GodIcon,
            this.list.renderHandler = new Handler(this, this._listRender);
    }

    public onAdded(): void {
        this.handler = this.currArg.handler;
        var t: any = ConfigServer.god;
        this.list.array = ObjectUtil.keys(t.god);
    }

    public _listRender(t: any): void {
        t.off("click", this, this._choose),
            t.on("click", this, this._choose, [t.dataSource]);
    }

    public _choose(t: any): void {
        this.handler && this.handler.runWith(t),
            this.closeSelf();
    }
}

/**
 * 注册身份等价物：原文 o(i,"sg.god.view.ViewChooseByType",t)（t=RP=ui.god.chooseByTypeUI）。
 */
Laya.class(ViewChooseByType, "sg.god.view.ViewChooseByType", null, null);
