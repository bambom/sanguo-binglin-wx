/**
 * ui.duplicate.taskBaseDupUI —— IDE 生成 UI 类：任务条目基皮肤（taskDup list 行；aniPanel/box_tips/img_get）（duplicate/taskBaseDup）。
 *
 * 原文：code1.js 字节 [3513457,3513810)（353B；包装变量 ff，声明器单一 init
 * 1 参 CallExpression（非 Ee 双跳）；基类实参 (n_)=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite；明文 3 参注册
 * o(i,"ui.duplicate.taskBaseDupUI",t) @3513642；全类零池化）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-x/taskBaseDupUI.js
 *
 * 字段不带初始化器：原文构造体在 super() 前预置 null，super() 链内 createChildren→loadUI→
 * createView 赋真实 UI 对象；TS 字段初始化器在 super() 之后执行，带 =null 会把已生成对象
 * 清空（viewAlertUI.ts 批次 B 先例注记）。字段声明顺序按原文构造体逐一对应：txt_name / aniPanel / box_tips / txt_tips / box_info / txt_info / img_get。
 * createChildren 保持原文单条逗号序列语句形态（批次 U/W 范式），无 regComponent 前置。
 * extends 债：原文基类 n_=sg.view.com.ComPayType（未译，inventory/声明器注册双证）——F8 急切求值 extends undefined 会崩，
 * 按 V 批文档化先例（batch-v-report §5）暂 extends 其已译真祖先 sg.view.BaseSprite（Ju，批次 A）；
 * ComPayType 落地后本文件 extends 重指向（1 行）并按批次协议复验 —— 见 batch-x-report §5。
 */
import { BaseSprite } from "../../view/BaseSprite";

export class taskBaseDupUI extends BaseSprite {

    public txt_name: any;
    public aniPanel: any;
    public box_tips: any;
    public txt_tips: any;
    public box_info: any;
    public txt_info: any;
    public img_get: any;

    constructor() {
        super();
    }

    public createChildren(): void {
        (<any>laya.ui.Component.prototype).createChildren.call(this), this.loadUI("duplicate/taskBaseDup");
    }
}

/**
 * 注册身份等价物：原文 o(i,"ui.duplicate.taskBaseDupUI",t)（t=n_=sg.view.com.ComPayType（未译）→ 暂 extends 其真祖先 sg.view.BaseSprite）。
 * base 传 null 的原因见 sg/model/ModelBase.ts 尾注与 batch-a-report.md「注册等价决策」。
 */
Laya.class(taskBaseDupUI, "ui.duplicate.taskBaseDupUI", null, null);
