/**
 * sg-externals-ac.d.ts —— 批次 AC（sg.crossService.model 4 类）外部类型声明。
 *
 * 仅声明本批**新**标识符；既有 ambient 缺成员面不在本文件补（调用点 (<any>) cast，
 * 批次 J/V 先例）：sg.model.ModelTroop（-b：TROOP_STATE_IDLE/MOVE/RECALL/MONSTER
 * 已声明，TROOP_STATE_HURT/TROOP_MOVE_CHEHUI/CHEJUN/BAITUI cast）、sg.map.utils.
 * MapUtils（-b：parseKey 已声明，getKey/getAroundCrossServiceGrid/than cast）、
 * sg.scene.constant.ConfigConstant（主 externals：ENTITY_CROSS_SERVICE_TILE
 * cast）、sg.model.ModelHeroPure（主 externals：无 ctor 面，new 调用点 cast）、
 * sg.duplicate.ModelDuplicate（-b：instance:any 面足够）。
 * 已译真类（ConfigServer/ModelManager/LoadeManager/CrossServiceFacade/
 * CrossServiceMap/MapGridManager/FunQueue/Tools/ModelBase）走模块 import，不在此登记。
 */
declare namespace sg.scene.model.entitys {
    /** sg.scene.model.entitys.EntityBase（包装变量 no，wrapper [1702660,1703351)，
     *  明文注册 @1702876，基类 Ns=sg.model.ModelBase；ctor 预置 netId/id/_cleared 等）
     *  ——CrossServiceTileEntity（直接基类）/CrossServiceTroopEntity（经 ModelTroop）
     *  的基类，未译缓译。本批触达面：prototype.initConfig.call（Ll/Tc）、
     *  prototype.clear.call（Tc）。落地后两文件 extends 重指向并收敛本声明。 */
    class EntityBase {
        constructor(...args: any[]);
        initConfig(...args: any[]): any;
        clear(...args: any[]): any;
    }
}
