/**
 * sg-externals-v.d.ts —— 批次 V 外部运行时绑定（仅类型声明，无任何运行时代码）。
 *
 * 批次 V = sg.crossService.ui 首簇 5 类（CrossServiceTroopItem/CrossServiceUI/
 * LeaderBase/LeaderTips/MarkBase）。本文件只声明：
 *  1. 本批译文实际以全局注册路径引用、且现有 sg-externals*.d.ts 未声明的标识符；
 *  2. 成员面按原文调用面最小化声明（类型未取证处 any）。
 * 既有 ambient 类缺成员面（ho.LEADER_CHANGED、so.HAN_COUNTRY、Nl.TROOP_STATE_HURT
 * 等）不在此补——批次 J 先例：调回点 (<any>) cast。
 * 后续批次翻译到某类后，声明保留不删（Laya.class 注册后两路径运行期同一对象）。
 */

declare namespace sg {

    namespace view {
        namespace com {
            /** sg.view.com.ItemBase —— 批次 A 已译（Laya.class 注册全局路径）；
             *  CrossServiceUI.init 经全局路径取 prototype.init（原文直引全局链） */
            class ItemBase {
                init(): void;
            }
        }
        namespace menu {
            /** sg.view.menu.ComChat（包装变量 Q$，inventory [5186368,5187433]）——
             *  跨服战聊天条（ctor 层级参数 + setWH），CrossServiceUI.init 消费；未译缓译 */
            class ComChat {
                constructor(t?: any);
                setWH(...args: any[]): any;
                height: any;
            }
        }
    }

    namespace duplicate {
        namespace view {
            /** sg.duplicate.view.DuplicateCountryBar（包装变量 CD，inventory [4171675,4173220]）——
             *  跨服战顶栏（setLv/setFloorNum/setBuffNum/setInfo/btn_1/btn_2），
             *  CrossServiceUI ctor/init/updateUI/updateTime 消费；未译缓译 */
            class DuplicateCountryBar {
                constructor(...args: any[]);
                setLv(...args: any[]): any;
                setFloorNum(...args: any[]): any;
                setBuffNum(...args: any[]): any;
                setInfo(...args: any[]): any;
                btn_1: any;
                btn_2: any;
                centerX: any;
                y: any;
            }
        }
    }

    namespace crossService {
        namespace ui {
            /** sg.crossService.ui.TopTips（包装变量 F1，inventory [5676657,5680052]）——
             *  顶栏提示条（show），CrossServiceUI.showTips 消费；同族后续批次 */
            class TopTips {
                constructor(...args: any[]);
                show(...args: any[]): any;
                y: any;
                centerX: any;
            }
            /** sg.crossService.ui.CrossServiceFinish（包装变量 R1，inventory [5675628,5676649]）——
             *  跨服战结算面板 ctor(t,i)，CrossServiceUI.showFinish 消费；同族后续批次 */
            class CrossServiceFinish {
                constructor(t?: any, i?: any);
            }
            /** sg.crossService.ui.CrossServiceCountDown（包装变量 yl，inventory [2742219,2743340]）——
             *  开战倒计时 ctor(type,ms)，CrossServiceUI.showCountDown1/2 消费；同族后续批次 */
            class CrossServiceCountDown {
                constructor(t?: any, i?: any);
            }
        }
    }
}

declare namespace ui {

    namespace duplicate {
        /** ui.duplicate.CrossServiceTroopItemUI（包装变量 Cg，inventory [3493254,3493851]，
         *  基类 e_=sg.view.com.ItemBase）—— CrossServiceTroopItem 的未译 IDE 基类；
         *  本批译文经全局路径取 prototype._$get_dataSource 及 superGet/superSet 类参 */
        class CrossServiceTroopItemUI {
        }
        /** ui.duplicate.leaderBaseUI（包装变量 Mg，inventory [3494925,3495247]，基类 e_）——
         *  LeaderBase 的未译 IDE 基类；本批译文经全局路径取 prototype._$get_dataSource */
        class leaderBaseUI {
        }
    }
}
