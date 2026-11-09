/**
 * Laya.Platform —— 平台适配层/SDK 通路（注册名 "Platform"，无点注册挂 Laya.Platform）。
 * 纯静态类：空构造 function t(){} + 82 个静态方法 + 18 个静态数据字段 + 惰性静态 eventListener。
 *
 * 原文：code1.js 字节 [291956,401265]（包装变量 Ut，2 参注册 o(t,"Platform")，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-c/Platform_p1.js +
 *         Platform_p2.js（token 区间 [310280,310383) 位于静态方法 pay 体内，oracle 按红线拆两段）。
 *
 * 译文方法：scope-aware 标识符重命名 + 字节保真方法体（语句边界换行，var 提升正确），
 * 重命名/等价改写清单见 xform_c.js（gen/verify 共用，验证器独立重推导逐字节比对）。
 * 重命名对照：t→Platform（类自身）| s→Laya（UMD 第 3 参 Laya 的仅有的 4 处自由引用，均 s.timer.*）
 *   Rt→ConfigApp vs→Tools ks→ToJava Cs→ToIOS fn→NetHttp tn→ViewManager ue→ModelManager
 *   Gt→ConfigServer cs→ObjectUtil us→SaveLocal as→MusicManager gs→StringUtil（批次 A/B 模块直引）
 *   P→Handler $→MiniAdpter m→Browser gt→TTMiniAdapter ot→laya.renders.Render（引擎别名）
 *   O→laya.debug.tools.JsonTool c→laya.debug.tools.Base64Tool（d.ts 未收录，any 链，EffectManager 同款）
 *   Ke→sg.sdks.Huawei Dr→sg.model.ModelSalePay Br→sg.model.ModelPlayer zs→sg.guide.model.GuideChecker
 *   ws→sg.zmPlatform.ConstantZM wn→sg.sdks.TxExeSdk Bit→sg.view.qqdt.ViewQQDT Lr→sg.model.ModelQQDT
 *   oit→sg.view.menu.ViewPayWeb ts→sg.utils.Base64 hs→sg.utils.MD5 ce→sg.manager.FilterManager
 *   Dt→sg.boundFor.GotoManager（批次外类：ambient 全局路径，调用期解析，见 sg-externals-b.d.ts）
 *
 * 类型层等价改写（不改运行时语义，逐处见 xform_c.js）：
 *   ① 空 if 体 ";" → "{}"（TS1313；批次 B ObjectUtil 同款）；② 动态扩展的对象字面量 var 声明
 *   补 ": any"（TS2339；原文 JS 弱类型动态加属性）；③ 3 处 NetHttp.instance.getRequest(1 参)/
 *   postRequest(2 参) 调用点 cast (<any>NetHttp.instance)（批次 B NetHttp 签名较原文收紧，
 *   ④ ModelSalePay.getCoinNumByPID / ConstantZM.initPlatform|reportCreateRole 调用点 cast
 *   （静态成员批次 A/B ambient 未收录，红线禁改既有声明行，改调用点类型层 cast）
 *   本批红线禁改批次 B 文件；原文调用点即缺省）。
 *
 * token 处置（红线）：原文 pay 方法 cb_google/cb_google1 分支回调内 i.refresh_token="<103 字节
 * Google OAuth refresh token>"（原值见 OriginProject 原包该偏移 [310280,310383)，此处脱敏占位）：
 * 译文按 layaProject/code1.js 工作副本同款等长 `1//XXXX…` 占位（103 字符），原值零复制。
 *
 * 原文顺序完整保留：register → 82 方法 → 18 数据静态 → h(eventListener) → return t。
 */
import Handler = laya.utils.Handler;
import Browser = laya.utils.Browser;
import MiniAdpter = laya.wx.mini.MiniAdpter;
import TTMiniAdapter = laya.tt.mini.TTMiniAdapter;
import EventDispatcher = laya.events.EventDispatcher;
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ObjectUtil } from "../utils/ObjectUtil";
import { ToJava } from "./ToJava";
import { ToIOS } from "./ToIOS";
import { NetHttp } from "../net/NetHttp";
import { ViewManager } from "../manager/ViewManager";
import { ModelManager } from "../manager/ModelManager";
import { MusicManager } from "../utils/MusicManager";
import { StringUtil } from "../utils/StringUtil";
import { SaveLocal } from "../utils/SaveLocal";

export class Platform {

    constructor() {
    }

    /** 原文：t.getUserDataForIos=function(t)，字节 [292004,292239) */
    public static getUserDataForIos(t: any): any {
    "jj_ios"==ConfigApp.pf?ToIOS.callFunc("getUserData",function(i){
        t&&t.runWith(i)
    },{userStandard:"local_save_key_user_list"}):"jj_ad"==ConfigApp.pf&&ToJava.callMethod("getUserData",{userStandard:"local_save_key_user_list"},t)
    }

    /** 原文：t.setUserDataForIos=function(t,i)，字节 [292240,292569) */
    public static setUserDataForIos(t: any, i: any): any {
    "jj_ios"==ConfigApp.pf?ToIOS.callFunc("setUserData",function(t){
        i&&i.runWith(t)
    },{userStandard:"local_save_key_user_list",userStandardData:encodeURI(JSON.stringify(t))}):"jj_ad"==ConfigApp.pf&&ToJava.callMethod("setUserData",{userStandard:"local_save_key_user_list",userStandardData:encodeURI(JSON.stringify(t))},i)
    }

    /** 原文：t.force_update=function()，字节 [292570,292866) */
    public static force_update(): any {
    console.log("force_update");
    var i=ConfigApp.getNetCfgOther(ConfigApp.pf_channel);
    i&&(ConfigApp.onAndroid()?ToJava.callMethod("force_update_check",null,Handler.create(null,function(e,s){
        Platform.force_update_link(i,e)
    })):ConfigApp.onIOS()&&ToIOS.callFunc("force_update_check",function(e){
        Platform.force_update_link(i,e)
    },{}))
    }

    /** 原文：t.force_update_link=function(i,e)，字节 [292867,293271) */
    public static force_update_link(i: any, e: any): any {
    var s=e,n=i.check,h=!1;
    if(!Tools.isNullString(s)&&n)for(var o=n.length,r=0;r<o;r++)if(n[r]+""==s){
        h=!0;
        break
    }
    if(h){
        var a: any =<any>{title:"更新提示",msg:"請您更新下載最新版",btn_ok:"更新",url:i.url};
        ConfigApp.onIOS()?ToIOS.callFunc("force_update_link",function(t){},a):ConfigApp.onAndroid()&&ToJava.callMethod("force_update_link",a,Handler.create(null,function(e,s){
            Platform.force_update_link(i,e)
        }))
    }
    }

    /** 原文：t.initMiniGame=function()，字节 [293272,294491) */
    public static initMiniGame(): any {
    if(ConfigApp.releaseQQ()){}else if(ConfigApp.releaseWeiXin()){
        if(MiniAdpter.window.wx.setKeepScreenOn({keepScreenOn:!0}),"h5_changxiang"==ConfigApp.pf){}else if(ConfigApp.pf==MiniAdpter.window.bugu_pf)MiniAdpter.window.huoSdk.init({app_id:MiniAdpter.window.bugu_app_id,mp_id:MiniAdpter.window.bugu_mp_id});else if(ConfigApp.pf==MiniAdpter.window.yiyang_pf)MiniAdpter.window.huoSdk.init({app_id:MiniAdpter.window.yiyang_app_id,mp_id:MiniAdpter.window.yiyang_mp_id});else if(ConfigApp.pf==MiniAdpter.window.twyx_pf)MiniAdpter.window.gameSDK.init("1.0.0",function(){
            console.log("init success")
        },function(t){
            console.log("init fail"),console.log(t)
        });else if(ConfigApp.pf==MiniAdpter.window.zhangwan_pf){
            var t=MiniAdpter.window.zwsdk;
            MiniAdpter.window.zwsdk=new t({app_id:MiniAdpter.window.zhangwan_app_id,game_id:MiniAdpter.window.zhangwan_game_id})
        }
    }else if(ConfigApp.releaseDouYin())if(ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf)TTMiniAdapter.window.huoSdk.init({app_id:TTMiniAdapter.window.tt_bugu_app_id,mp_id:TTMiniAdapter.window.tt_bugu_mp_id});else if(ConfigApp.pf==TTMiniAdapter.window.tt_37_pf){
        var i=TTMiniAdapter.window.tt37Sdk;
        TTMiniAdapter.window.tt37Sdk=new i({gameParams:{fx_game_id:TTMiniAdapter.window.tt_37_fx_game_id,zy_game_id:TTMiniAdapter.window.tt_37_zy_game_id,c_game_id:TTMiniAdapter.window.tt_37_c_game_id,fx_c_game_id:TTMiniAdapter.window.tt_37_fx_c_game_id,midas_pay_type:TTMiniAdapter.window.tt_37_midas_pay_type,ios_pay_type:TTMiniAdapter.window.tt_37_ios_pay_type,mini_program_appid:TTMiniAdapter.window.tt_37_mini_program_appid}})
    }
    }

    /** 原文：t.initShare=function()，字节 [294492,294585) */
    public static initShare(): any {
    ConfigApp.releaseQQ()||ConfigApp.releaseWeiXin()&&(ConfigServer.system_simple.wx_share,ConfigApp.pf)
    }

    /** 原文：t.shareFunCheck=function()，字节 [294586,294731) */
    public static shareFunCheck(): any {
    Platform.share_wx_and_qq=!1,"test"==ConfigApp.pf&&ToJava.callMethod("isNewShare","",Handler.create(null,function(i,e){
        Platform.share_wx_and_qq=!0
    }))
    }

    /** 原文：t.share_on_off=function()，字节 [294732,294899) */
    public static share_on_off(): any {
    return Platform.h5_sdk?Platform.h5_sdk.shareOpen:ConfigApp.pfIs37FuncH5()?Platform.pf_login_data.shared_switch:"h5_360_3"!==ConfigApp.pf||Platform.h5_sdk_obj.isSupportMethod("share")
    }

    /** 原文：t.share=function(i)，字节 [294900,296238) */
    public static share(i: any): any {
    void 0===i&&(i=0);
    if(Platform.h5_sdk)Platform.h5_sdk.share();else if(ConfigApp.releaseWeiXin()){
        ConfigServer.system_simple.share_pf[ConfigApp.pf];
        ConfigApp.pf==MiniAdpter.window.game37_pf&&MiniAdpter.window.game37Sdk.share({extraData:ModelManager.instance.modelUser.mUID_merge,successCb:function(){
            Platform.eventListener.event("event_share_ok")
        }})
    }else if(ConfigApp.releaseQQ()){}else{
        var e=ConfigServer.system_simple.share_pf[ConfigApp.pf],s=[],n: any =<any>{};
        s.push(Tools.getMsgById(e[0])),s.push(Tools.getMsgById(e[1])),s.push(e[2]),s.push(e[3]),s.push(i),n.linkURL=e[3],n.imgURL=e[2],n.title=Tools.getMsgById(e[0]),n.des=Tools.getMsgById(e[1]),"test"==ConfigApp.pf?e&&ToJava.callMethod("share",s,Handler.create(null,function(i,e){
            Platform.eventListener.event("event_share_ok")
        })):"google"==ConfigApp.pf?e&&ToJava.callMethod("share",n,Handler.create(null,function(i,e){
            Platform.eventListener.event("event_share_ok")
        })):"h5_360_3"===ConfigApp.pf&&n.title?Platform.h5_sdk_obj.share({title:n.title,content:n.des,imgurl:n.imgURL},function(i){
            "ok"===i.success&&Platform.eventListener.event("event_share_ok")
        }):ConfigApp.onIOS()?e&&("ios_tw"==ConfigApp.pf||"ios_hk"==ConfigApp.pf?ToIOS.callFunc("share_fb",function(i){
            Platform.eventListener.event("event_share_ok")
        },{arr:s}):ToIOS.callFunc("share_wx",function(i){
            Platform.eventListener.event("event_share_ok")
        },{arr:s})):"developer"==ConfigApp.pf?Platform.eventListener.event("event_share_ok"):ConfigApp.pfIs37FuncH5()&&Platform.h5_sdk_obj.share(n.des,n.title,n.imgURL,function(){
            Platform.eventListener.event("event_share_ok")
        },function(){})
    }
    }

    /** 原文：t.getAppName=function()，字节 [296239,296441) */
    public static getAppName(): any {
    return""!=Platform.appName||(ConfigApp.releaseWeiXin()?Platform.appName="minigame":ConfigApp.releaseQQ()?Platform.appName="qqmini":ConfigApp.releaseDouYin()?Platform.appName="ttmini":laya.renders.Render.isConchApp||(Platform.appName="web")),Platform.appName
    }

    /** 原文：t.getType=function()，字节 [296442,296593) */
    public static getType(): any {
    return ConfigApp.releaseWeiXin()?"minigame":ConfigApp.releaseQQ()?"qqmini":ConfigApp.releaseDouYin()?"ttmini":ConfigApp.onAndroid()?"and":Browser.onIOS?"ios":"web"
    }

    /** 原文：t.restart=function()，字节 [296594,296742) */
    public static restart(): any {
    ConfigApp.releaseMiniGame()||Browser.window&&Browser.window.location&&(Browser.window.reloadparent&&Browser.window.reloadparent(),Browser.window.location.reload())
    }

    /** 原文：t.exit=function()，字节 [296743,296809) */
    public static exit(): any {
    ConfigApp.onAndroid()&&ToJava.callMethod("exit",null,null)
    }

    /** 原文：t.pay_re=function(t)，字节 [296810,296905) */
    public static pay_re(t: any): any {
    ToJava.savePlayerInfo({type:"pay_success_event",info:t.re_params.order},null)
    }

    /** 原文：t.pay_callback=function(t)，字节 [296906,296979) */
    public static pay_callback(t: any): any {
    return ConfigApp.get_HTTP_URL().replace("gateway",t)
    }

    /** 原文：t.payHtml=function(i)，字节 [296980,297558) */
    public static payHtml(i: any): any {
    Laya.timer.clear(Platform,Platform.payHtmlEnd);
    var e=ObjectUtil.clone(i,!0);
    e.pid=i.gids?i.gids:i.pid,i.wx_pay?NetHttp.instance.send(ConfigApp.isLandscape?"user_zone.wxv3_h5_order":"user_zone.wx_h5_pay",e,Handler.create(null,function(i){
        var e=i.toString();
        e=e.replace("https://","weixin://"),ConfigApp.onAndroidYYB()?Platform.other_fun(e):ConfigApp.pay2to?Browser.window.location.href=e:Browser.window.openHtml(e)
    })):(e.pf="aipinglewan1",NetHttp.instance.send("user_zone.zfb_h5_pay",e,Handler.create(null,function(i){
        ConfigApp.onAndroidYYB()?Platform.other_fun(i.toString()):ConfigApp.pay2to?Browser.window.location.href=i.toString():Browser.window.openHtml(i.toString())
    })))
    }

    /** 原文：t.paySelfSDK=function(t)，字节 [297559,298214) */
    public static paySelfSDK(t: any): any {
    var i=ObjectUtil.clone(t,!0);
    if(i.pid=t.gids?t.gids:t.pid,t.wx_pay){
        ModelManager.instance.modelUser.mUID,ConfigServer.getServerTimer(),NetHttp.instance.send("user_zone.weixin_app_pay",i,Handler.create(null,function(t){
            var i=[];
            i.push(t.appid),i.push(t.partnerid),i.push(t.prepayid),i.push(t.package),i.push(t.noncestr),i.push(t.timestamp),i.push(t.sign),ConfigApp.onIOS()?(ToIOS.callFunc("wx_pay",null,{arr:i}),ToIOS.callFunc("wx_share2",null,{arr:i})):ToJava.pay(i,null)
        }))
    }else ConfigApp.onIOS()?NetHttp.instance.send("user_zone.pay",i,Handler.create(null,function(t){
        Browser.window.openFrame("   ",t.toString())
    })):NetHttp.instance.send("user_zone.pay",i,Handler.create(null,function(t){
        ToJava.openAlipay(t.toString())
    }))
    }

    /** 原文：t.payWX=function(i)，字节 [298215,298480) */
    public static payWX(i: any): any {
    Laya.timer.clear(Platform,Platform.payHtmlEnd);
    var e=ObjectUtil.clone(i,!0);
    e.pid=i.gids?i.gids:i.pid,e.openid=ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].openid,NetHttp.instance.send("user_zone.gzsgz_wxv3_order",e,Handler.create(null,function(t){
        console.log(t)
    }))
    }

    /** 原文：t.payHtmlEnd=function()，字节 [298481,298535) */
    public static payHtmlEnd(): any {
    Laya.timer.clear(Platform,Platform.payHtmlEnd)
    }

    /** 原文：t.payCanShowUI=function()，字节 [298536,298895) */
    public static payCanShowUI(): any {
    var t=!0;
    return ConfigApp.releaseWeiXin()?"h5_changxiang"==ConfigApp.pf||(ConfigApp.pf==MiniAdpter.window.bugu_pf||ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf||ConfigApp.pf==MiniAdpter.window.yiyang_pf||ConfigApp.pf==MiniAdpter.window.game37_pf||ConfigApp.pf==MiniAdpter.window.twyx_pf||ConfigApp.pf==MiniAdpter.window.zhangwan_pf||ConfigApp.pf==MiniAdpter.window.game37_fs_pf||ConfigApp.pf==MiniAdpter.window.gzsgz_pf?t=!0:Browser.onIOS&&(t=!1)):ConfigApp.releaseQQ()&&Browser.onIOS&&(t=!1),t
    }

    /** 原文：t.obtainCheck=function()，字节 [298896,299162) */
    public static obtainCheck(): any {
    "hw_gzsgz"!=ConfigApp.pf&&"hw_jtzl"!=ConfigApp.pf&&"cb_hw_tw"!=ConfigApp.pf&&"cb_hw_cn"!=ConfigApp.pf||ToJava.callMethod("obtainCheck",null,Handler.create(null,function(t,i){
        NetHttp.instance.send(sg.sdks.Huawei.getToken(),t,Handler.create(null,function(t){
            ToJava.callMethod("consume",t,null)
        }))
    },null,!1))
    }

    /** 原文：t.pay=function(i,e)，字节 [299163,334223) */
    public static pay(i: any, e: any): any {
    void 0===e&&(e=!1);
    var s=ConfigServer.system_simple.pay[ConfigApp.pf],n=ConfigServer.system_simple.pay_money[ConfigApp.pf];
    ConfigServer.system_simple.pay_number&&ConfigServer.system_simple.pay_number[ConfigApp.pf]&&(n=ConfigServer.system_simple.pay_number[ConfigApp.pf]);
    var h,o,r,a=s?s[i.pid]:"",l=n?n[i.pid]:"",u=ModelManager.instance.modelUser,d=ConfigServer.getServerTimer(),_=ConfigServer.getServerName(u.zone),g=null,f=i.gids?i.gids:i.pid,p=f+";"+i.zone+";"+i.uid+";"+i.pf,v=f+"|"+i.zone+"|"+i.uid+"|"+d,y=f+"|"+i.zone+"|"+i.uid+"|"+ConfigApp.pf,b=f+"|"+i.zone+"|"+i.uid+"|"+Math.round(d/1e3),I=Tools.getMsgById("coin_name"),x=i.cfg[0],w=["pay1","pay2","pay3","pay4","pay5","pay6","pay7","pay8"].indexOf(f)>-1;
    if(e)return Platform.recodrd_pay_info=[],Platform.recodrd_pay_info.push("coin"),Platform.recodrd_pay_info.push(I+ModelManager.instance.modelUser.mUID),Platform.recodrd_pay_info.push(i.pid),Platform.recodrd_pay_info.push((<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)),Platform.recodrd_pay_info.push("CNY"),Platform.recodrd_pay_info.push(x),Platform.recodrd_pay_info.push(i.wx_pay?"weixin":"alipay"),ConfigApp.payIsSelfH5()&&e?void Platform.payHtml(i):void Platform.paySelfSDK(i);
    if(Platform.h5_sdk)Platform.h5_sdk.pay(v,i,_);else if(ConfigApp.releaseWeiXin())if("h5_changxiang"==ConfigApp.pf){}else if(ConfigApp.pf==MiniAdpter.window.bugu_pf||ConfigApp.pf==MiniAdpter.window.yiyang_pf)MiniAdpter.window.huoSdk.checkPay({data:{"order-currency":"CNY","order-cp_order_id":v,"order-product_price":x,"order-product_id":i.pid,"order-product_cnt":1,"order-product_name":I,"order-ext":v,"role-event":"","role-server_id":u.zone+"","role-server_name":ConfigServer.getServerName(u.zone),"role-role_id":Tools.isNullString(u.mUID_merge)?u.mUID:u.mUID_merge,"role-role_name":u.uname,"role-role_level":u.getLv(),"role-role_vip":0,"role-merge_server_id":u.mergeZone,"role-merge_server_name":ConfigServer.getServerName(u.mergeZone),"role-current_camp_name":0==u.country?"魏":1==u.country?"蜀":"吴"}}).then(function(t){
        console.log("checkPay - then"),console.log(t),"success"==t.msg?MiniAdpter.window.huoSdk.mpPayQuery({data:{"order-order_id":t.data.order_id}}).then(function(t){
            console.log("mpPayQuery - then"),console.log(t),"success"!=t.msg&&ViewManager.instance.showTipsTxt(t.msg)
        }):ViewManager.instance.showTipsTxt(t.msg)
    });else if(ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf)o=<any>{uid:Platform.pf_login_data.uid,appid:Platform.pf_login_data.appid,sid:ModelManager.instance.modelUser.zone,sname:ConfigServer.getServerName(ModelManager.instance.modelUser.zone),amount:x,cporder:v,itemid:i.pid,itemname:I,extinfo:ConfigApp.pf,rolename:u.uname,roleid:u.mUID_merge,level:u.getLv(),vip:0},MiniAdpter.window.chnsdk.pay(o,function(t){
        console.log(t)
    });else if(ConfigApp.pf==MiniAdpter.window.game37_pf){
        o=<any>{appid:MiniAdpter.window.game37_platform_id,game_id:MiniAdpter.window.game37_game_id,uid:u.http_user_login_data.re_params[ConfigApp.pf].data.uid,sid:Number(u.zone),actor_id:u.mUID,order_no:v,money:x,game_coin:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),product_id:i.pid,subject:"Gold",time:Math.floor(.001*ConfigServer.getServerTimer())+""},0==v.indexOf("ucoin")?o.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:"ucoin"})):o.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:""})),ConfigApp.frontcs&&(o.order_no=v+"|"+ConfigApp.frontcs[5]);
        var C="";
        -1!==ConfigApp.pf.indexOf("cb_wx_37_cn")||"wx_37_4"==ConfigApp.pf?(C="user_zone.get_cb_37_cn_sign",o.action="pay"):C="user_zone.get_wx_37_sign",NetHttp.instance.send(C,o,Handler.create(null,function(t){
            o.sign=t.sign,o.order_ip=t.ip,o.referer=u.http_user_login_data.re_params[ConfigApp.pf].data.referer,o.app_ext=u.http_user_login_data.re_params[ConfigApp.pf].data.app_ext;
            var i: any =<any>{pcPayCb:function(t){
                ViewManager.instance.showPayPicture(t.img)
            }};
            MiniAdpter.window.game37Sdk.pay(o,i)
        }))
    }else if(ConfigApp.pf==MiniAdpter.window.twyx_pf)o=<any>{uid:Number(u.http_user_login_data.re_params[MiniAdpter.window.twyx_pf].uid),zone_id:u.zone,zone_name:ConfigServer.getServerName(u.zone),role_id:u.mUID,role_name:u.uname,role_level:u.getLv(),role_currency:u.coin,amt:x,game_fee:10*x,item_id:i.pid,item_name:I,item_desc:I,ext:v},MiniAdpter.window.gameSDK.cpSDK.makePayment(o);else if(ConfigApp.pf==MiniAdpter.window.zhangwan_pf)o=<any>{order:{cp_order_id:v,amount:100*x+"",product_price:100*x+"",product_id:f,product_cnt:"1",product_name:I,product_desc:I,ext:MiniAdpter.window.zhangwan_pf},role:{event:"recharge",server_id:u.zone,server_name:ConfigServer.getServerName(u.zone),cp_role_id:u.mUID_merge,role_name:u.uname,role_level:u.getLv()+"",role_vip:"0"}},MiniAdpter.window.zwsdk.createOrder(o).then(function(t){
        console.log("createOrder - then"),console.log(t)
    });else if(ConfigApp.pf==MiniAdpter.window.gzsgz_pf)Platform.payWX(i);else i.env,i.buyQuantity;else if(ConfigApp.releaseQQ()){}else if(ConfigApp.releaseDouYin())ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf?TTMiniAdapter.window.huoSdk.checkPay({data:{"order-currency":"CNY","order-cp_order_id":v,"order-product_price":x,"order-product_id":i.pid,"order-product_cnt":1,"order-product_name":I,"order-ext":v,"role-event":"","role-server_id":u.zone,"role-server_name":ConfigServer.getServerName(u.zone),"role-role_id":u.mUID_merge,"role-role_name":u.uname,"role-role_level":u.getLv(),"role-role_vip":0,"role-merge_server_id":u.mergeZone,"role-merge_server_name":ConfigServer.getServerName(u.mergeZone),"role-current_camp_name":0==u.country?"魏":1==u.country?"蜀":"吴"}}).then(function(t){
        console.log("checkPay - then"),console.log(t),"success"==t.msg?TTMiniAdapter.window.huoSdk.mpPayQuery({data:{"order-order_id":t.data.order_id}}).then(function(t){
            console.log("mpPayQuery - then"),console.log(t),"success"!=t.msg&&ViewManager.instance.showTipsTxt(t.msg)
        }):ViewManager.instance.showTipsTxt(t.msg)
    }):ConfigApp.pf==TTMiniAdapter.window.tt_37_pf&&(o=<any>{appid:u.http_user_login_data.re_params[ConfigApp.pf].data.appid,game_id:u.http_user_login_data.re_params[ConfigApp.pf].data.game_id,uid:u.http_user_login_data.re_params[ConfigApp.pf].data.uid,sid:Number(u.zone),actor_id:u.mUID_merge,order_no:v,money:x,game_coin:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),product_id:i.pid,subject:"Gold",time:Math.floor(.001*ConfigServer.getServerTimer())+""},0==v.indexOf("ucoin")?o.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:"ucoin"})):o.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:""})),NetHttp.instance.send("user_zone.get_wx_37_sign",o,Handler.create(null,function(t){
        o.sign=t.sign,o.order_ip=t.ip,o.referer=u.http_user_login_data.re_params[ConfigApp.pf].data.referer,TTMiniAdapter.window.tt37Sdk.pay(o,function(t){
            TTMiniAdapter.window.tt.downloadFile({url:t.img,header:{"content-type":"application/json"},success:function(t){
                ViewManager.instance.showPayPicture(t.tempFilePath)
            },fail:function(t){
                ViewManager.instance.showTipsTxt(t.errMsg)
            }})
        })
    })));else if("h5_qqdt"==ConfigApp.pf||"h5_qqdt2"==ConfigApp.pf||"h5_qqdt3"==ConfigApp.pf||"cb_h5_qqdt"==ConfigApp.pf){
        var k=Tools.getURLexpToObj(ConfigApp.url_params);
        k.uid=ModelManager.instance.modelUser.mUID,k.pid=f,k.zone=i.zone,k.uid=i.uid,"h5_qqdt"==ConfigApp.pf||"h5_qqdt3"==ConfigApp.pf||"cb_h5_qqdt"==ConfigApp.pf?NetHttp.instance.send("user_zone."+ConfigApp.pf+"_buy_goods",k,new Handler(Platform,function(i){
            var e=ConfigServer.system_simple.qq_blue.appId,s=i.url_params,n=(sg.view.qqdt.ViewQQDT.isTest,0);
            ConfigApp.get_qq_CMDLINE()?sg.sdks.TxExeSdk.i.buyBox(e,s,n,k.openid,k.openkey):Platform.h5_sdk_obj.BuyBox.show(e,s,n,"充值",function(){
                console.log("关闭")
            },function(){
                console.log("购买成功！")
            })
        })):NetHttp.instance.send("user_zone.h5_qqdt_buy_goods_m",k,new Handler(Platform,function(t){
            ConfigServer.system_simple.qq_blue.appId,t.url_params,sg.view.qqdt.ViewQQDT.isTest;
            var i: any =<any>{m:"buy",c:"goods",params:t.url_params,pf:k.pf,sessionid:"openid",sessiontype:"kp_accesstoken",openid:k.openid,openkey:k.access_token,sandbox:"1"},e="";
            for(var s in i)e+="&"+s+"="+encodeURI(i[s]);
            e=e.substr(1,e.length),Browser.window.openFrame("    ","https://pay.qq.com/h5/index.shtml?"+e)
        }))
    }else if(ConfigApp.onAndroid()){
        if("hw"==ConfigApp.pf||"hw_tw"==ConfigApp.pf||"hw_gzsgz"==ConfigApp.pf||"hw_jtzl"==ConfigApp.pf)if(Platform.pf_login_data.v){
            var T=Platform.getPayByHuaWei(i,y)[0];
            ToJava.pay(T,Handler.create(null,function(t,i){
                NetHttp.instance.send(sg.sdks.Huawei.getToken(),t,Handler.create(null,function(t){
                    ToJava.callMethod("consume",t,null)
                }))
            }))
        }else if(Platform.pf_login_data.hw_pay_new){
            var M=Platform.getPayByHuaWei(i,y),S=M[0];
            NetHttp.instance.send(sg.sdks.Huawei.getSign(),M[1],Handler.create(null,function(t){
                S.sign=t.sign,ToJava.pay(S,Handler.create(null,function(t,i){}))
            }))
        }else{
            var B=Platform.getGameUserDataPay2(i,y),A=B[0];
            h=B[1],NetHttp.instance.send(sg.sdks.Huawei.getSign(),A,Handler.create(null,function(t){
                h.push(t.sign),ToJava.pay(h,Handler.create(null,function(t,i){}))
            }))
        }else if("cb_hw_tw"==ConfigApp.pf||"cb_hw_cn"==ConfigApp.pf)o=<any>{pfProductId:a,payload:y},ToJava.pay(o,null);else if(ConfigApp.onAndroidYYB())Platform.pay_yyb(i,e);else if("juedi"==ConfigApp.pf||"juedi_ad"==ConfigApp.pf){}else if("wende_ad"==ConfigApp.pf)o=<any>{name:I,des:I+i.cfg[1],amount:100*x,pid:v,sname:ModelManager.instance.modelUser.zone,uname:ModelManager.instance.modelUser.uname},ToJava.pay2(o,Handler.create(null,function(t,i){}));else if("vivo"==ConfigApp.pf){
            var L=ObjectUtil.clone(i,!0);
            L.pid=i.gids?i.gids:i.pid,Platform.pf_login_data.v&&(L.v=Platform.pf_login_data.v),NetHttp.instance.send("user_zone.get_vivo_sign",L,Handler.create(null,function(i){
                var e=[];
                Platform.pf_login_data.v?(e.push(Platform.pf_login_data.openid),e.push(i.cpOrderNumber),e.push(i.productName),e.push(i.productDesc),e.push(i.orderAmount),e.push(i.notifyUrl),e.push(i.signature),ToJava.pay(e,Handler.create(null,function(t,i){}))):(e.push(Platform.pf_login_data.openid),e.push(i.orderNumber),e.push(i.accessKey),e.push(i.orderTitle),e.push(i.orderDesc),e.push(i.orderAmount),e.push(i.cpOrderNumber),ToJava.pay(e,Handler.create(null,function(t,i){})))
            }))
        }else if("oppo"==ConfigApp.pf){
            var N=ObjectUtil.clone(i,!0);
            N.pid=i.gids?i.gids:i.pid,NetHttp.instance.send("user_zone.get_oppo_sign",N,Handler.create(null,function(t){
                var i=[];
                i.push(t.cpOrderNumber),i.push(t.cpOrderNumber),i.push(100*x),i.push(I),i.push(I),i.push(t.notifyUrl),ToJava.pay(i,Handler.create(null,function(t,i){}))
            }))
        }else if("yx7477"==ConfigApp.pf||"yx7477_1"==ConfigApp.pf)(o=<any>{}).goodsName=I,o.orderNo=v,o.ext=v,o.tips="1",o.amount=x,o.exchange=10,ToJava.pay(o,Handler.create(null,function(t,i){}));else if("mi"==ConfigApp.pf)ToJava.pay([v,i.pid,1],Handler.create(null,function(t,i){}));else if("mz"==ConfigApp.pf){
            var U: any =<any>{app_id:"3238111"};
            U.cp_order_id=i.uid+"|"+d,U.uid=Platform.pf_login_data.uid,U.product_id="0",U.product_subject=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)+I,U.product_body="",U.product_unit=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),U.buy_amount=1,U.product_per_price=x,U.create_time=d,U.total_price=x,U.user_info=v,U.pay_type="0",NetHttp.instance.send("user_zone.get_mz_sign",U,Handler.create(null,function(t){
                U.sign_type="md5",U.sign=t.sign,ToJava.pay(U,Handler.create(null,function(t,i){}))
            }))
        }else if("caohua"==ConfigApp.pf||"jj_ad_caohua"==ConfigApp.pf){
            var E: any =<any>{},D=v;
            E.ProductId=i.pid,E.ProductName=I,E.ProductDesc=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)+I,E.BuyNum=1,E.Balance=ModelManager.instance.modelUser.coin,E.Extension=D,E.Price=x,E.Ratio=10,E.ServerId=i.zone,E.ServerName=i.zone,E.RoleId=ModelManager.instance.modelUser.mUID,E.RoleName=ModelManager.instance.modelUser.uname,E.RoleLevel=ModelManager.instance.modelUser.getLv(),E.Vip="0",E.PayNotifyUrl="",E.OrderID=D,ToJava.pay(E,Handler.create(null,function(t,i){}))
        }else if("uc"==ConfigApp.pf){
            var R: any =<any>{};
            R.callbackInfo=v,R.amount=x+"",R.cpOrderId=i.uid+"|"+d,R.accountId=ModelManager.instance.modelUser.accountId,NetHttp.instance.send("user_zone.get_uc_sign",R,Handler.create(null,function(t){
                R.sign=t.sign,ToJava.pay(R,Handler.create(null,function(t,i){}))
            }))
        }else if("google"==ConfigApp.pf)(o=<any>{}).google_pid=a,o.pid=f,ToJava.pay(o,Handler.create(null,function(i,e){
            i.order=v,NetHttp.instance.send("user_zone.gg_callback",i,Handler.create(Platform,Platform.pay_re))
        })),(o=<any>{}).google_pid=a,o.user_id=i.zone+"|"+i.uid,o.order_id=v,ToJava.callMethod("payNew",o,Handler.create(null,function(i,e){
            i.pf=ConfigApp.pf,i.pid=f,i.order=v,NetHttp.instance.send("user_zone.gg_callback_v3",i,Handler.create(Platform,Platform.pay_re))
        }));else if("cb_google"==ConfigApp.pf||"cb_google1"==ConfigApp.pf)(o=<any>{}).google_pid=a,o.user_id=i.zone+"|"+i.uid,o.order_id=v,(r=[]).push(ConfigServer.system_simple.event_tokens[ConfigApp.pf][i.pid]),0==u.pay_money&&(u.getLv()<=8?r.push("2c31ap"):u.getLv()<=12?r.push("36b02j"):u.getLv()<=14?r.push("93jpy7"):u.getLv()<=16?r.push("vdw559"):u.getLv()<=18?r.push("rc7jc0"):u.getLv()<=21?r.push("h3qc3e"):u.getLv()<=24&&r.push("wxdjjz")),o.event_tokens=r,ToJava.pay(o,Handler.create(null,function(i,e){
            i.pf=ConfigApp.pf,i.pid=f,i.order=v,i.refresh_token="1//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",NetHttp.instance.send("user_zone.cb_gg_callback",i,Handler.create(Platform,Platform.pay_re))
        }));else if("cb_yuanqu_gg"==ConfigApp.pf)(o=<any>{}).google_pid=a,o.user_id=i.zone+"|"+i.uid,o.order_id=v,ToJava.pay(o,null);else if("cb_ad_mycard"==ConfigApp.pf)(o=<any>{}).FacServiceId="BJM",o.FacTradeSeq=f+"-"+i.zone+"-"+i.uid+"-"+d,o.FacGameId="RedCliff-MyCard",o.FacGameName="國戰三國",o.TradeType="1",o.ServerId=u.zone+"",o.CustomerId=u.mUID,o.PaymentType="",o.ItemCode="",o.ProductName=i.pid,o.Amount=l,o.Currency="TWD",o.SandBoxMode=!1,o.FacReturnURL="",o.event_token=ConfigServer.system_simple.event_tokens[ConfigApp.pf][i.pid],NetHttp.instance.send("user_zone.cb_ad_mycard_auth_global",o,Handler.create(null,function(t){
            ToJava.pay(t,Handler.create(null,function(t,i){
                NetHttp.instance.send("user_zone.cb_ad_mycard_verify",t,Handler.create(null,function(t){}))
            }))
        }));else if("muyou_ad_vn"==ConfigApp.pf||"muyou_ad_vn2"==ConfigApp.pf||"cb_muyou_ad_vn"==ConfigApp.pf||"cb_muyou_ad_vn1"==ConfigApp.pf||"cb_muyou_ad_vn2"==ConfigApp.pf||"muyou_ad_vn1"==ConfigApp.pf||"muyou_ad_tl"==ConfigApp.pf||"muyou_hw_tl"==ConfigApp.pf||"muyou_hw_vn"==ConfigApp.pf)if("muyou_ad_vn"==ConfigApp.pf)(o=<any>{}).orderNo=v,o.game_id="24",o.playerId=u.mUID_merge,o.userId=Platform.pf_login_data.user_id,o.timestamp=Math.floor(.001*ConfigServer.getServerTimer())+"",o.productId=a,o.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.muyou_pay_sign",o,Handler.create(null,function(t){
            o.sn=t.sign,o.deviceId="",o.deviceNo="",o.playerName=u.mUID_merge,o.playerLevel=u.getLv()+"",o.serverId=u.zone,o.serverName=u.zone,o.postAmount=l,o.productName=i.pid,o.productDesc=i.pid,o.extra=v;
            var e="https://upac.muugame.com/purchase/index?data="+(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString(o));
            Browser.window.openFrame("    ",e)
        }));else{
            var F: any =<any>{};
            F.order_id=v,F.skuId=a,F.gameMoney="1",F.gameMoneyName=a,F.gamePayExtra=v,F.priceCode="VND",F.priceAmount=l,F.productDesc=I,"muyou_ad_vn2"==ConfigApp.pf&&u.office>=2&&w?ToJava.callMethod("showPayDialog",F,null):ToJava.pay(F,Handler.create(null,function(t,i){}))
        }else if("jj_mina_ad_ar"==ConfigApp.pf){
            var H: any =<any>{};
            H.uid=Platform.pf_login_data.uid,H.amount=l,H.currency="USD",H.local_amount=l,H.local_currency="USD",H.product_id=a,H.pay_notify_url="SI-http://warzd.ptkill.com/jj_mina_ad_ar_callback/",H.extension=v,H.product_name=I,H.server_id=ModelManager.instance.modelUser.zone,H.pay_money=ModelManager.instance.modelUser.pay_money+"",ToJava.pay(H,Handler.create(null,function(t,i){}))
        }else if("jj_junhai_gg"==ConfigApp.pf||"jj_junhai_os"==ConfigApp.pf){
            var G: any =<any>{};
            G.order_id=v,G.product_id=a,G.product_name=I,G.product_desc=I,G.ratio="10",G.count=x+"",G.amount=100*l,G.currency="KRW","jj_junhai_gg"==ConfigApp.pf?G.pay_notify_url=ConfigApp.getURLType("http://warjh.ptkill.com/jj_junhai_gg_callback/"):"jj_junhai_os"==ConfigApp.pf&&(G.pay_notify_url=ConfigApp.getURLType("http://warjh.ptkill.com/jj_junhai_os_callback/")),G.role_id=u.mUID,G.role_name=u.uname,G.role_level=u.getLv()+"",G.server_id=u.zone+"",G.server_name=ConfigServer.getServerName(u.zone),G.real_money=ModelManager.instance.modelUser.pay_money+"",ToJava.pay(G,Handler.create(null,function(t,i){}))
        }else if("ad_37_jp"==ConfigApp.pf||"ad_37_kr"==ConfigApp.pf||"os_37_kr"==ConfigApp.pf||"ad_37_tw"==ConfigApp.pf||"cb_ad_37_kr"==ConfigApp.pf||"cb_os_37_kr"==ConfigApp.pf){
            var V: any =<any>{};
            V.product_id=a,V.role_id=ModelManager.instance.modelUser.mUID+"",V.role_name=ModelManager.instance.modelUser.uname+"",V.role_level=ModelManager.instance.modelUser.getLv()+"",V.server_id=ModelManager.instance.modelUser.zone+"",V.order_id=v,V.remark=v+"|"+ConfigApp.pf,V.coinNum=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)+"",ToJava.pay(V,Handler.create(null,function(t,i){}))
        }else if("cb_ad_37_cn"==ConfigApp.pf)(o=<any>{}).game_id=Platform.pf_login_data.game_id,o.uid=Platform.pf_login_data.uid,o.sid=ModelManager.instance.modelUser.zone,o.actor_id=ModelManager.instance.modelUser.mUID_merge,o.order_no=v,o.money=x,o.game_coin=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),o.product_id=f,o.subject="Gold",o.time=Math.floor(.001*ConfigServer.getServerTimer()),o.ext="",o.action="pay",NetHttp.instance.send("user_zone.get_cb_37_cn_sign",o,Handler.create(null,function(t){
            o.sign=t.sign,o.radio="10",o.sname=ConfigServer.getServerName(u.zone)+"",o.actor_name=ModelManager.instance.modelUser.uname+"",ToJava.pay(o,Handler.create(null,function(t,i){}))
        }));else if("fs_ad_37"==ConfigApp.pf)(o=<any>{}).order_id=v,o.product_name=x+"元礼包",o.dcn=Tools.getMsgById("coin_name"),o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.ext=ConfigApp.pf,o.role_id=u.mUID_merge,o.role_name=u.uname,o.role_level=u.getLv(),o.money=x,o.radio=10,ToJava.pay(o,Handler.create(null,function(t,i){}));else if("r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf){
            var W: any =<any>{};
            W.ggpid=a,W.sid=ModelManager.instance.modelUser.zone,W.r2uid=Platform.pf_login_data.uid,W.uid=ModelManager.instance.modelUser.mUID,W.uname=ModelManager.instance.modelUser.uname,W.pid=v,W.adjust_pay_event="",W.adjust_pay_money=0,W.content_id="1",W.content_type="pay",W.currency="r2g_xm_ad"==ConfigApp.pf?"USD":"KRW",W.revenue=l,ToJava.pay(W,Handler.create(null,function(t,i){}))
        }else if("r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf)(o=<any>{}).product_id=a,o.server_id=ModelManager.instance.modelUser.zone,o.uid=Platform.pf_login_data.uid,o.role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname+"",o.role_level=ModelManager.instance.modelUser.getLv()+"",o.order_id=v,o.ext=ConfigApp.pf,ToJava.pay(o,Handler.create(null,function(t,i){}));else if("cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf||"cb_ad_r2_hk"==ConfigApp.pf)(o=<any>{}).product_id=a,o.server_id=ModelManager.instance.modelUser.zone,o.uid=Platform.pf_login_data.uid,o.role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname+"",o.role_level=ModelManager.instance.modelUser.getLv()+"",o.order_id=v,o.ext=ConfigApp.pf,ToJava.pay(o,Handler.create(null,function(t,i){}));else if("cb_ad_fy_hk"==ConfigApp.pf){
            var z=ConfigServer.system_simple.pay_name[ConfigApp.pf],j=z?z[i.pid]:"",Y=ConfigServer.system_simple.pay_desc[ConfigApp.pf],q=Y?Y[i.pid]:"";
            (o=<any>{}).user_id=u.accountId,o.role_id=u.mUID_merge,o.role_name=u.uname,o.role_level=u.getLv()+"",o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.order_id=v+"|"+ConfigApp.pf,o.notify_url=ConfigApp.get_notify_url(),o.ext=ConfigApp.pf,o.price=l,o.pf_product_id=a,o.pf_product_name=j,o.pf_product_desc=q,o.product_id=f,o.product_name="對應商品",ToJava.pay(o,Handler.create(null,function(t,i){}))
        }else if("you77_ad_jp"==ConfigApp.pf||"you77_ad_tw"==ConfigApp.pf||"you77_hw_jp"==ConfigApp.pf){
            var X: any =<any>{};
            X.goods_name=ConfigServer.system_simple.pay.you77_ad_tw[i.pid],X.cporder=v,X.fee=l,X.ext=v,("you77_ad_tw"==ConfigApp.pf||"you77_ad_jp"==ConfigApp.pf||"you77_hw_jp"==ConfigApp.pf)&&(X.currency="USD"),ToJava.pay(X,Handler.create(null,function(t,i){}))
        }else if("indofun_gg"==ConfigApp.pf||"indofun_oppo"==ConfigApp.pf)(o=<any>{}).product_id=f,o.order_id=v+"|"+ConfigApp.pf,o.goods_id=a,o.goods_name=i.pid,o.goods_money=l,o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.role_id=u.mUID,o.role_name=u.uname,o.role_level=u.getLv()+"",o.real_money=ModelManager.instance.modelUser.pay_money+"",o.ext=v,ToJava.pay(o,Handler.create(null,function(t,i){}));else if("ad_360"==ConfigApp.pf){
            var K: any =<any>{};
            K.qihoo_user_id=ModelManager.instance.modelUser.accountId,K.money_amount=100*x,K.product_name=I,K.product_id=i.pid,K.url=ConfigApp.getURLType("http://qh.ptkill.com/ad_360_callback/"),K.app_name="天下纷争",K.app_user_name=ModelManager.instance.modelUser.uname,K.app_user_id=ModelManager.instance.modelUser.mUID,K.ext=v,K.order_id=v,K.pay_code=1025,K.exchange_rate="10",ToJava.pay(K,Handler.create(null,function(t,i){}))
        }else if("ad_6kw"==ConfigApp.pf){
            var Q: any =<any>{};
            Q.product_id=i.pid,Q.product_name=I,Q.product_desc=I,Q.price=x+"",Q.ratio="10",Q.buy_num="1",Q.coin_num=i.cfg[1]+"",Q.server_id=u.zone+"",Q.server_name=ConfigServer.getServerName(u.zone),Q.role_id=u.mUID+"",Q.role_name=u.uname,Q.role_level=u.getLv()+"",Q.pay_notify_url=ConfigApp.getURLType("http://qh.ptkill.com/ad_6kw_callback/"),Q.vip="0",Q.order_id=v,Q.extension=v,ToJava.pay(Q,Handler.create(null,function(t,i){}))
        }else if("ad_xiaoy"==ConfigApp.pf){
            var J: any =<any>{};
            J.order_id=v,J.product_id=i.pid,J.price=x+"",J.pay_desc=I,J.pay_notify_url=ConfigApp.getURLType("http://qh.ptkill.com/ad_xiaoy_callback/"),ToJava.pay(J,Handler.create(null,function(t,i){}))
        }else if("ad_mengyou"==ConfigApp.pf){
            var Z: any =<any>{};
            Z.order_id=v,Z.product_name=I,Z.price=x+"",Z.ratio="10",Z.server_id=u.zone+"",Z.server_name=ConfigServer.getServerName(u.zone),Z.role_id=u.mUID+"",Z.role_name=u.uname,Z.role_level=u.getLv()+"",Z.extension=v,ToJava.pay(Z,Handler.create(null,function(t,i){}))
        }else"cb_ad_just4fun"==ConfigApp.pf?((o=<any>{}).order_id=v,o.product_id=a,o.product_name=I,o.amount=l,o.currency="USD",o.sku_type="inapp",o.ext=v,o.role_id=ModelManager.instance.modelUser.mUID,o.role_name=ModelManager.instance.modelUser.uname,o.role_level=ModelManager.instance.modelUser.getLv()+"",o.server_id=ModelManager.instance.modelUser.zone,o.server_name=ConfigServer.getServerName(u.zone),ToJava.pay(o,Handler.create(null,function(t,i){}))):"cb_ad_zhangwan"==ConfigApp.pf?((o=<any>{}).event="",o.server_id=ModelManager.instance.modelUser.zone+"",o.server_name=ConfigServer.getServerName(u.zone)+"",o.cp_role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname+"",o.role_level=ModelManager.instance.modelUser.getLv()+"",o.role_vip="0",o.cp_order_id=v,o.amount=100*x+"",o.product_price=100*x+"",o.product_id=f,o.product_cnt="1",o.product_name=I,o.product_des=I,o.ext=ConfigApp.pf,ToJava.pay(o,Handler.create(null,function(t,i){}))):"cb_ad_zhangwan1"==ConfigApp.pf||"cb_ad_zhangwan2"==ConfigApp.pf?((o=<any>{}).product_price=x,o.product_name=I,o.product_des=I,o.cp_order_id=v,o.server_id=ModelManager.instance.modelUser.zone+"",o.server_name=ConfigServer.getServerName(u.zone)+"",o.cp_role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname+"",o.role_level=ModelManager.instance.modelUser.getLv(),ToJava.pay(o,Handler.create(null,function(t,i){}))):"sg4_ad_bugu"==ConfigApp.pf&&((o=<any>{}).price=x,o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.role_id=u.mUID_merge,o.role_name=u.uname,o.role_level=u.getLv(),o.product_id=f,o.product_name=I,o.product_desc=I,o.order_id=v,o.ext=v,ToJava.pay(o,Handler.create(null,function(t,i){})))
    }else if(ConfigApp.onIOS())if("wende_ios"==ConfigApp.pf)o=<any>{name:I,des:I+i.cfg[1],amount:100*x,pid:v,productId:a,sname:ModelManager.instance.modelUser.zone,uname:ModelManager.instance.modelUser.uname,uid:ModelManager.instance.modelUser.mUID+""},ToIOS.callFunc("pay",function(t){},o);else if("ios_37"==ConfigApp.pf)(o=<any>{}).game_id="617",o.order_no=v,o.uid=ModelManager.instance.modelUser.accountId,o.sid=ModelManager.instance.modelUser.zone,o.actor_id=ModelManager.instance.modelUser.mUID,o.money=x,o.subject=I,o.time=Math.floor(.001*d),NetHttp.instance.send("user_zone.get_ios_37_sign",o,Handler.create(null,function(t){
        o.order_ip=t.ip,o.sign=t.sign,o.product_id=i.pid,ToIOS.callFunc("nice_sq",function(t){},o)
    }));else if("ios_37_jp"==ConfigApp.pf||"ios_37_kr"==ConfigApp.pf||"ios_37_tw"==ConfigApp.pf||"cb_ios_37_kr"==ConfigApp.pf)(o=<any>{}).product_id=a,o.role_id=ModelManager.instance.modelUser.mUID+"",o.role_name=ModelManager.instance.modelUser.uname+"",o.role_level=ModelManager.instance.modelUser.getLv()+"",o.server_id=ModelManager.instance.modelUser.zone+"",o.order_id=v,o.remark=v+"|"+ConfigApp.pf,o.coinNum=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)+"",ToIOS.callFunc("pay",function(t){},o);else if("cb_ios_37_cn"==ConfigApp.pf||"ios_37_wx2"==ConfigApp.pf)(o=<any>{}).game_id=Platform.pf_login_data.game_id,o.uid=ModelManager.instance.modelUser.accountId+"",o.sid=ModelManager.instance.modelUser.zone,o.actor_id=ModelManager.instance.modelUser.mUID_merge,o.order_no=v,o.money=l,o.game_coin=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),o.product_id=a,o.subject="Gold",o.time=Math.floor(.001*ConfigServer.getServerTimer()),o.ext="",o.action="pay",NetHttp.instance.send("user_zone.get_cb_37_cn_sign",o,Handler.create(null,function(t){
        o.sign=t.sign,ToIOS.callFunc("pay",function(t){},o)
    }));else if("cb_ios"==ConfigApp.pf)(o=<any>{}).product_id=a,o.order_id=p,o.check_url=ConfigApp.get_HTTP_URL(),o.event_token=ConfigServer.system_simple.event_tokens[ConfigApp.pf][i.pid],o.revenue=l,o.currency="USD",ToIOS.callFunc("pay",function(t){},o);else if("cb_yuanqu_ios"==ConfigApp.pf)(o=<any>{}).product_id=a,o.order_id=p,o.check_url=ConfigApp.get_HTTP_URL(),o.event_token="bc02t0",o.revenue=l,o.currency="USD",ToIOS.callFunc("pay",function(t){},o);else if("ios_mengwoai"==ConfigApp.pf){
        o=<any>{};
        var tt=f+";"+i.zone+";"+i.uid+";"+d;
        o.order_id=tt,o.product_id=a,ToIOS.callFunc("pay",function(t){},o)
    }else if("r2g_xm_ios"==ConfigApp.pf||"r2g_kr_ios"==ConfigApp.pf)(o=<any>{}).ggpid=a,o.sid=ModelManager.instance.modelUser.zone+"",o.r2uid=Platform.pf_login_data.uid+"",o.uid=ModelManager.instance.modelUser.mUID+"",o.pid=v,o.adjust_pay_event="",o.adjust_pay_money=0,o.content_id="1",o.content_type="pay",o.currency="r2g_xm_ios"==ConfigApp.pf?"USD":"KRW",o.revenue=l+"",o.revenue2=l,ToIOS.callFunc("pay",function(t){},o);else if("r2g_kr2_ios"==ConfigApp.pf)(o=<any>{}).product_id=a,o.server_id=ModelManager.instance.modelUser.zone,o.role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname,o.role_level=ModelManager.instance.modelUser.getLv()+"",o.order_id=v,o.ext=ConfigApp.pf,ToIOS.callFunc("pay",function(t){},o);else if("cb_ios_r2"==ConfigApp.pf||"cb_ios_r2_hk"==ConfigApp.pf)(o=<any>{}).product_id=a,o.server_id=ModelManager.instance.modelUser.zone,o.role_id=ModelManager.instance.modelUser.mUID_merge,o.role_name=ModelManager.instance.modelUser.uname,o.role_level=ModelManager.instance.modelUser.getLv()+"",o.order_id=v,o.ext=ConfigApp.pf,ToIOS.callFunc("pay",function(t){},o);else if("cb_ios_fy_hk"==ConfigApp.pf)(o=<any>{}).amount=l,o.product_id=a,o.product_name=I,o.product_desc=I,o.order_id=v+"|"+ConfigApp.pf,o.notify_url=ConfigApp.get_notify_url(),o.ext=ConfigApp.pf,o.user_id=u.accountId,o.role_id=u.mUID_merge,o.role_name=u.uname,o.role_level=u.getLv()+"",o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),ToIOS.callFunc("pay",function(t){},o);else if("you77_ios_tw"==ConfigApp.pf||"you77_ios_jp"==ConfigApp.pf||"you77_ios_jp1"==ConfigApp.pf)o=<any>{goods_name:a,cporder:v,fee:l,ext:v},"you77_ios_tw"==ConfigApp.pf?o.currency="USD":"you77_ios_jp"!=ConfigApp.pf&&"you77_ios_jp1"!=ConfigApp.pf||(o.currency="USD"),ToIOS.callFunc("pay",function(t){},o);else if("caohua_ios"==ConfigApp.pf)(o=<any>{}).Name=I,o.Detail=i.cfg[1],o.Amt=100*x,o.RoleId=ModelManager.instance.modelUser.mUID,o.RoleName=ModelManager.instance.modelUser.uname,o.RoleLevel=ModelManager.instance.modelUser.getLv(),o.extraInfo=v,o.orderNo=v,ToIOS.callFunc("pay",function(t){},o);else if("indofun_ios"==ConfigApp.pf)(o=<any>{}).product_id=f,o.order_id=v+"|"+ConfigApp.pf,o.goods_id=a,o.goods_name=i.pid,o.goods_money=l,o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.role_id=u.mUID+"",o.role_name=u.uname,o.role_level=u.getLv()+"",o.real_money=ModelManager.instance.modelUser.pay_money+"",o.ext=v,ToIOS.callFunc("pay",function(t){},o);else if("muyou_ios_vn"==ConfigApp.pf||"muyou_ios_vn1"==ConfigApp.pf||"muyou_ios_vn2"==ConfigApp.pf||"muyou_ios_vn3"==ConfigApp.pf||"muyou_ios_tl"==ConfigApp.pf||"cb_muyou_ios_vn"==ConfigApp.pf)if("muyou_ios_vn"==ConfigApp.pf||"cb_muyou_ios_vn"==ConfigApp.pf){
        var it=ConfigApp.payIsSelfH5();
        it?((o=<any>{}).orderNo=v,o.game_id="muyou_ios_vn"==ConfigApp.pf?"26":"74",o.playerId=u.mUID+"",o.userId=Platform.pf_login_data.user_id,o.timestamp=Math.floor(.001*ConfigServer.getServerTimer())+"",o.productId=a,o.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.muyou_pay_sign",o,Handler.create(null,function(t){
            o.sn=t.sign,o.deviceId="",o.deviceNo="",o.playerName=u.mUID+"",o.playerLevel=u.getLv()+"",o.serverId=u.zone+"",o.serverName=u.zone+"",o.postAmount=l,o.productName=i.pid,o.productDesc=i.pid,o.extra=v;
            var e="https://upac.muugame.com/purchase/index?data="+(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString(o));
            Browser.window.openFrame("    ",e)
        }))):((o=<any>{}).orderNo=v,o.extraInfo=v,o.product_id=a,o.currency=l,o.product_name=I,ToIOS.callFunc("pay",function(t){},o))
    }else"muyou_ios_vn2"==ConfigApp.pf||"muyou_ios_vn3"==ConfigApp.pf?u.office>=2&&w?((o=<any>{}).orderNo=v,o.extraInfo=v,o.product_id=a,o.currency=l,o.product_name=I,o.userId=Platform.pf_login_data.user_id,o.token=Platform.pf_login_data.token,o.pid=i.pid,ViewManager.instance.showView(["ViewPayWeb",sg.view.menu.ViewPayWeb],{payObj:o})):(it=ConfigApp.payIsSelfH5())?((o=<any>{}).orderNo=v,o.game_id="muyou_ios_vn3"==ConfigApp.pf?"26":"23",o.playerId=u.mUID_merge,o.userId=Platform.pf_login_data.user_id,o.timestamp=Math.floor(.001*ConfigServer.getServerTimer())+"",o.productId=a,o.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.muyou_pay_sign",o,Handler.create(null,function(t){
        o.sn=t.sign,o.deviceId="",o.deviceNo="",o.playerName=u.mUID_merge,o.playerLevel=u.getLv()+"",o.serverId=u.zone,o.serverName=u.zone,o.postAmount=l,o.productName=i.pid,o.productDesc=i.pid,o.extra=v;
        var e=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString(o)),s="";
        s="muyou_ios_vn3"==ConfigApp.pf?"https://shop.mocgame.vn/purchase/index?data="+e:"https://pay.mgolgames.com/purchase/index?data="+e,Browser.window.openFrame("    ",s)
    }))):((o=<any>{}).orderNo=v,o.extraInfo=v,o.product_id=a,o.currency=l,o.product_name=I,ToIOS.callFunc("pay",function(t){},o)):((o=<any>{}).orderNo=v,o.extraInfo=v,o.product_id=a,o.currency=l,o.product_name=I,ToIOS.callFunc("pay",function(t){},o));else if("jj_mina_ios_ar"==ConfigApp.pf)(o=<any>{}).pid=a,o.price=l,o.ext=v,o.pay_money=ModelManager.instance.modelUser.pay_money+"",ToIOS.callFunc("pay",function(t){},o);else if("jj_junhai_ios"==ConfigApp.pf)(o=<any>{}).order_id=v,o.product_id=a,o.product_name=I,o.product_count=10*x+"",o.pay_money=100*l+"",o.notify_url=ConfigApp.getURLType("https://warjh.ptkill.com/jj_junhai_ios_callback/"),o.currency_code="KRW",o.server_id=u.zone,o.server_name=ConfigServer.getServerName(u.zone),o.role_id=u.mUID+"",o.role_name=u.uname,o.real_money=ModelManager.instance.modelUser.pay_money+"",ToIOS.callFunc("pay",function(t){},o);else if("ios_mj1"==ConfigApp.pf||"ios_sg1"==ConfigApp.pf){
        var et=a;
        et&&ToIOS.pay(function(t){},{pid:et,url:ConfigApp.get_HTTP_URL(),ext:p})
    }else{
        var st=a;
        st&&ToIOS.pay(function(t){},{pid:st,url:ConfigApp.get_HTTP_URL(),ext:p})
    }else if("h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf){
        var nt: any =<any>{};
        nt.appid=Platform.pf_login_data.appid,nt.game_id=Platform.pf_login_data.game_id,nt.uid=Platform.pf_login_data.uid,nt.sid=ModelManager.instance.modelUser.zone,"h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf?nt.actor_id=ModelManager.instance.modelUser.mUID:nt.actor_id=ModelManager.instance.modelUser.mUID_merge,nt.order_no=v,nt.money=x,nt.game_coin=(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),nt.product_id=i.pid,nt.subject="Gold",nt.time=Math.floor(.001*d),0==v.indexOf("ucoin")?nt.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:"ucoin"})):nt.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:""}));
        var ht="";
        switch(ConfigApp.pf){case"h5_37":ht="user_zone.get_h5_37_sign";break;case"h5_37_wx1":case"h5_37_wx2":ht="user_zone.get_wx_37_sign";break;case"h5_37_yuewan":ht="user_zone.get_h5_37_yuewan_sign";break;case"cb_h5_37":ht="user_zone.get_cb_h5_37_sign"}
        NetHttp.instance.send(ht,nt,Handler.create(null,function(i){
            nt.referer=Platform.pf_login_data.referer,nt.order_ip=i.ip,nt.sign=i.sign,Platform.h5_sdk_obj.pay(nt)
        }))
    }else if("h5_37_wx3"==ConfigApp.pf)nt=<any>{appid:Platform.pf_login_data.appid,game_id:Platform.pf_login_data.game_id,uid:Platform.pf_login_data.uid,sid:ModelManager.instance.modelUser.zone,actor_id:ModelManager.instance.modelUser.mUID_merge,order_no:v,money:i.cfg[0],game_coin:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),product_id:i.pid,subject:"Gold",time:Math.floor(.001*ConfigServer.getServerTimer())},0==v.indexOf("ucoin")?nt.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:"ucoin"})):nt.ext=(<any>laya.debug).tools.Base64Tool.encodeStr2((<any>laya.debug).tools.JsonTool.getJsonString({pay_type:""})),nt.action="pay",NetHttp.newNetHttpObj("user_zone.get_cb_37_cn_sign",nt,Handler.create(null,function(i){
        nt.referer=Platform.pf_login_data.referer,nt.order_ip=i.ip,nt.sign=i.sign,Platform.h5_sdk_obj.pay(nt)
    }));else if("h5_kuku"==ConfigApp.pf){
        var ot=v;
        Platform.h5_sdk_obj.pay(100*x,i.pid,"GOLD",i.uid,ot)
    }else if("h5_yyjh"==ConfigApp.pf||"h5_yyjh2"==ConfigApp.pf||"jj_h5_yyjh"==ConfigApp.pf||"h5_yyjh_hk"==ConfigApp.pf){
        var rt: any =<any>{},at=Tools.getURLexpToObj(ConfigApp.url_params),lt=["h5_yyjh","h5_yyjh2","jj_h5_yyjh","h5_yyjh_hk"].indexOf(ConfigApp.pf),ct=["3866c245e0791eaabc84a49efe2d0ef2","09fe331c3dc8a3d5a10d05345f1b7e17","f3c9a6e058f9e6b12f380366583a96b1","686daecfb67ed9f0cb51e5188de2f31b"][lt],ut=["user_zone.get_yyjh_pay_sign","user_zone.get_yyjh2_pay_sign","user_zone.get_jj_yyjh_pay_sign","user_zone.get_yyjh_hk_pay_sign"][lt];
        rt.cporder=v,rt.userid=at.userid,rt.server_id=ModelManager.instance.modelUser.zone,rt.roleid=ModelManager.instance.modelUser.mUID,rt.amt=x,rt.goodsid=i.pid,rt.appkey=ct,rt.time=Math.floor(.001*ConfigServer.getServerTimer()),rt.custom="",NetHttp.instance.send(ut,rt,Handler.create(null,function(i){
            Platform.h5_sdk_obj.Pay({safeCode:i.code.toString()})
        }))
    }else if("h5_ch"==ConfigApp.pf){
        var dt=ConfigServer.system_simple.pay[ConfigApp.pf+ConfigApp.chmj];
        Platform.h5_sdk_obj.pay({cpOrderNo:v,extraInfo:ConfigApp.chmj,productIdentifier:dt?dt[i.pid]:"",orderAmt:100*x,orderDetail:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid)+I,callBackUrl:"",roleLevel:ModelManager.instance.modelUser.getLv(),roleId:ModelManager.instance.modelUser.mUID,roleName:ModelManager.instance.modelUser.uname,mhtOrderName:I},function(t){})
    }else if("h5_ch2"==ConfigApp.pf||"jj_h5_ch"==ConfigApp.pf)Platform.h5_sdk_obj.pay_v(v,u.getLv(),100*x,ConfigApp.chmj,"");else if("jj_h5_twyx"==ConfigApp.pf||"h5_twyx"==ConfigApp.pf||"h5_twyx2"==ConfigApp.pf||"h5_twyx3"==ConfigApp.pf||"h5_twyx5"==ConfigApp.pf||"cb_h5_twyx1"==ConfigApp.pf||"cb_h5_twyx2"==ConfigApp.pf)g=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params),Platform.h5_sdk_obj.pay({buyNum:1,coin:100,game_id:g.appid,server_id:u.zone,server_name:String(u.zone),uid:g.uid,role_name:u.uname,role_level:u.getLv(),vip:"",money:x,game_gold:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),role_id:u.mUID,product_id:v,product_name:I,product_desc:I,ext:v});else if("h5_twyx4"==ConfigApp.pf)g=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params),Platform.h5_sdk_obj.pay({buyNum:1,coinNum:100,gameId:g.appid,serverId:u.zone,serverName:String(u.zone),uid:g.uid,roleName:u.uname,roleLevel:u.getLv(),vip:"",money:x,gameGold:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),roleId:u.mUID,productId:v,productName:I,productDesc:I,ext:v});else if("h5_7k"==ConfigApp.pf||"jj_h5_7k"===ConfigApp.pf){
        var _t="h5_7k"==ConfigApp.pf?"user_zone.get_h5_7k_sign":"user_zone.get_jj_h5_7k_sign";
        NetHttp.instance.send(_t,{userid:Tools.getURLexpToObj(ConfigApp.url_params).userid,order_id:b},Handler.create(null,function(i){
            Platform.h5_sdk_obj.Pay({safeCode:i.code})
        }))
    }else if("h5_leyou"==ConfigApp.pf||"jj_h5_leyou"==ConfigApp.pf){
        var mt=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params);
        Platform.h5_sdk_obj.getinfo(mt.userid,u.zone,u.mUID,x,i.pid,v,"",mt.appkey,mt.banid,mt.token)
    }else if("h5_360"==ConfigApp.pf){
        var ft=Tools.getURLexpToObj(ConfigApp.url_params).qid;
        NetHttp.instance.send("user_zone.get_h5_360_sign",{item_id:v,amount:x,qid:ft},Handler.create(null,function(i){
            var e: any =<any>{goods:{goods_name:I,rate:.1},game:{gkey:"zqwzh5",gname:""},order:{amount:x,timestamp:Math.floor(.001*ConfigServer.getServerTimer())},checkin:{qid:ft,exts:i.exts}};
            Platform.h5_sdk_obj.h5Game.emit(Platform.h5_sdk_obj.CONST.EVENT.BUY.START,e)
        }))
    }else if("h5_360_2"==ConfigApp.pf)g=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params),NetHttp.instance.send("user_zone.get_h5_360_2_sign",{order_id:v},Handler.create(null,function(i){
        var e=i.tid;
        Platform.h5_sdk_obj.pay(e).then(function(t){}).catch(function(t){})
    }));else if("h5_360_3"==ConfigApp.pf)NetHttp.instance.send("user_zone.get_h5_360_3_sign",{fee:100*x,feeid:i.pid},Handler.create(null,function(e){
        var s=e.check;
        Platform.h5_sdk_obj.pay({check:s,feeid:i.pid,fee:100*x,feename:I,extradata:v,serverid:u.zone,servername:String(u.zone),roleid:String(u.mUID),rolename:u.uname,rolelevel:String(u.getLv())},function(t){
            "1"!==t.retcode&&"2"!==t.retcode||t.msg&&ViewManager.instance.showTipsTxt(t.msg)
        })
    }));else if("r2g_kr_h5"==ConfigApp.pf){
        Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params);
        Browser.window.parent.postMessage({action:"callPay",server:u.zone},"*")
    }else if("h5_1377"==ConfigApp.pf){
        var pt=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params);
        Platform.h5_sdk_obj.pay({buyNum:1,ext:v,coin:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),game_gold:(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid),game_id:pt.appid,money:x,product_desc:I,product_id:i.pid,product_name:I,server_id:u.zone,server_name:String(u.zone),role_id:u.mUID,role_name:u.uname,role_level:u.getLv(),uid:pt.uid,vip:0})
    }else if("h5_muzhi"==ConfigApp.pf||"h5_muzhi2"===ConfigApp.pf){
        var vt=Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params);
        NetHttp.instance.send("h5_muzhi"==ConfigApp.pf?"user_zone.get_h5_muzhi_sign":"user_zone.get_h5_muzhi2_sign",{game_id:vt.gameId,cp_order_id:v,amount:100*x,userId:vt.userId,server_id:u.zone,level:u.getLv()},Handler.create(null,function(e){
            Platform.h5_sdk_obj.placeOrder({game_id:vt.gameId,cp_order_id:v,amount:100*x,userId:vt.userId,pay_type:"h5_ios_on_line"===vt.h5Type?"iospay":"",coin_name:I,server_id:u.zone,role_id:u.mUID,transData:v,packetId:vt.packet_id,level:u.getLv(),sign:e,product_id:i.pid})
        }))
    }else if("h5_hutao"==ConfigApp.pf||"h5_hutao2"===ConfigApp.pf){
        Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params);
        var yt=ModelManager.instance.modelUser.accountId;
        Platform.h5_sdk_obj.pay({uid:yt[0],server_id:String(u.zone),role_id:String(u.mUID),role_name:u.uname,role_level:u.getLv(),cp_order_num:v,total_fee:100*x,ext:v,appstore_id:""})
    }else"changxiang"==ConfigApp.pf?Platform.h5_sdk_obj.purchase({productName:I,productId:i.pid,productPrice:100*x,cpOrderId:v,roleId:String(u.mUID),roleName:u.uname,roleLevel:u.getLv(),serverId:String(u.zone),serverName:ConfigServer.getServerName(u.zone),roleVip:0,notifyUrl:ConfigApp.getURLType("http://qh.ptkill.com/changxiang_callback/")}):"h5_changwan"==ConfigApp.pf?Platform.h5_sdk_obj.pay_v(v,String(u.getLv()),100*x,"",""):"h5_shouqu"==ConfigApp.pf?Platform.h5_sdk_obj.pay({cp_order_id:v,money:100*x,coin_unit:I,ratio:10,server_id:String(u.zone),server_name:_,role_id:u.mUID,role_name:u.uname,level:u.getLv(),cb_pay:function(t){
        console.log(t)
    }}):"h5_6kw"==ConfigApp.pf||"h5_6kw2"==ConfigApp.pf||"h5_6kw3"==ConfigApp.pf?Platform.h5_sdk_obj.CallParentMethods("pay",{cpOrder:v,serverId:u.zone,serverName:String(u.zone),roleID:u.mUID,roleName:u.uname,roleLevel:u.getLv(),goodsName:I,goodsID:i.pid,cost:x,desc:"",notifyURL:""}):NetHttp.instance.send("user_zone.pay",i,Handler.create(null,function(t){}))
    }

    /** 原文：t.bindPhone=function(t,i)，字节 [334224,334366) */
    public static bindPhone(t: any, i: any): any {
    "cb_ad_fy_hk"==ConfigApp.pf?ToJava.callMethod("bindPhone",null,null):"cb_ios_fy_hk"==ConfigApp.pf&&ToIOS.callFunc("bindPhone",null,null)
    }

    /** 原文：t.bindOther=function(t,i)，字节 [334367,335008) */
    public static bindOther(t: any, i: any): any {
    if("r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf)ToJava.callMethod("toBind",null,null);else if("r2g_xm_ios"==ConfigApp.pf||"r2g_kr_ios"==ConfigApp.pf)ToIOS.callFunc("toBind",null,null);else if(ConfigApp.pfIs37FuncOs())ToJava.callMethod("toBind",null,Handler.create(null,function(i,e){
        t&&t()
    }));else if("muyou_ad_vn"==ConfigApp.pf||"muyou_ad_vn2"==ConfigApp.pf||"cb_muyou_ad_vn1"==ConfigApp.pf||"cb_muyou_ad_vn2"==ConfigApp.pf){
        var e: any =<any>{role_id:String(ModelManager.instance.modelUser.mUID),server_id:String(ModelManager.instance.modelUser.zone)};
        ToJava.callMethod("toBind",e,null)
    }else"cb_ad_fy_hk"==ConfigApp.pf?ToJava.callMethod("toBind",null,null):"cb_ios_fy_hk"==ConfigApp.pf&&ToIOS.callFunc("toBind",null,null)
    }

    /** 原文：t.unBindOther=function()，字节 [335009,335205) */
    public static unBindOther(): any {
    "r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf?ToJava.callMethod("toUnBind",null,null):"r2g_xm_ios"!=ConfigApp.pf&&"r2g_kr_ios"!=ConfigApp.pf||ToIOS.callFunc("toUnBind",null,null)
    }

    /** 原文：t.helpOther=function()，字节 [335206,336868) */
    public static helpOther(): any {
    var i: any =<any>{};
    i.rolename=ModelManager.instance.modelUser.uname,i.rolelevel=ModelManager.instance.modelUser.getLv(),i.serverid=ModelManager.instance.modelUser.zone,Platform.h5_sdk?Platform.h5_sdk.handleService():"r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf||"cb_yuanqu_gg"==ConfigApp.pf?ToJava.callMethod("toHelp",i,null):"r2g_xm_ios"==ConfigApp.pf||"r2g_kr_ios"==ConfigApp.pf||"cb_yuanqu_ios"==ConfigApp.pf?ToIOS.callFunc("toHelp",null,i):"r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf?ToJava.callMethod("toHelp",i,null):"r2g_kr2_ios"==ConfigApp.pf?ToIOS.callFunc("toHelp",null,i):"cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf?ToJava.callMethod("toHelp",i,null):"cb_ios_r2"==ConfigApp.pf?ToIOS.callFunc("toHelp",null,i):"cb_ad_fy_hk"==ConfigApp.pf?ToJava.callMethod("toHelp",i,null):"cb_ios_fy_hk"==ConfigApp.pf?ToIOS.callFunc("toHelp",null,i):ConfigApp.releaseWeiXin()?"h5_changxiang"==ConfigApp.pf||(ConfigApp.pf==MiniAdpter.window.twyx_pf?MiniAdpter.window.gameSDK.cpSDK.connectCustomer(function(){
        console.log("调用客服接口成功")
    },function(t){
        console.error(t)
    }):ConfigApp.pf==MiniAdpter.window.zhangwan_pf?MiniAdpter.window.zwsdk.customMessage():ConfigApp.pf==MiniAdpter.window.bugu_pf?MiniAdpter.window.wx.openCustomerServiceConversation({success:function(t){
        console.log("success =",t)
    },fail:function(t){
        console.log("fail =",t)
    },complete:function(t){
        console.log("complete =",t)
    }}):ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf?MiniAdpter.window.chnsdk.openCustomerService():ConfigApp.pf==MiniAdpter.window.game37_pf&&-1!==ConfigApp.pf.indexOf("cb_wx_37_cn")&&MiniAdpter.window.wx.openCustomerServiceConversation({success:function(t){
        console.log("success =",t)
    },fail:function(t){
        console.log("fail =",t)
    },complete:function(t){
        console.log("complete =",t)
    }})):ConfigApp.releaseDouYin()&&ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf&&TTMiniAdapter.window.wx.openCustomerServiceConversation({type:3})
    }

    /** 原文：t.bbsOther=function()，字节 [336869,337470) */
    public static bbsOther(): any {
    "r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf?ToJava.other_fun("https://game.naver.com/lounge/Samguk_Origin/board",null):"r2g_kr_ios"==ConfigApp.pf?ToIOS.callFunc("toBBS",null,{}):ConfigApp.releaseWeiXin()?ConfigApp.pf==MiniAdpter.window.game37_pf?MiniAdpter.window.game37Sdk.navigateToCommunity({url:ConfigServer.system_simple.bbs_list[ConfigApp.pf]}):ConfigApp.pf==MiniAdpter.window.bugu_pf&&MiniAdpter.window.huoSdk.openLbMiniApp():"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf?Platform.h5_sdk_obj.sdkOpenView({url:ConfigServer.system_simple.bbs_list[ConfigApp.pf]}):"ios_37_wx2"==ConfigApp.pf&&ToIOS.callFunc("openWebView",null,{url:ConfigServer.system_simple.bbs_list[ConfigApp.pf]})
    }

    /** 原文：t.helpService=function()，字节 [337471,337612) */
    public static helpService(): any {
    "r2g_xm_ad"!=ConfigApp.pf&&"r2g_kr_ad"!=ConfigApp.pf&&"r2g_kr_os"!=ConfigApp.pf&&"r2g_xm_ios"!=ConfigApp.pf&&"r2g_kr_ios"!=ConfigApp.pf||Platform.helpOther()
    }

    /** 原文：t.handleUserCenter=function()，字节 [337613,337681) */
    public static handleUserCenter(): any {
    Platform.h5_sdk&&Platform.h5_sdk.handleUserCenter()
    }

    /** 原文：t.payClose=function(i)，字节 [337682,338171) */
    public static payClose(i: any): any {
    var e="";
    i&&i.ext_data&&i.ext_data.order_id&&(e=i.ext_data.order_id),ModelManager.instance.modelGame.event("event_pay_end"),ConfigApp.releaseWeiXin()?ConfigApp.pf!=MiniAdpter.window.game37_pf||-1!==ConfigApp.pf.indexOf("cb_wx_37_cn")||Tools.isNullString(e)||i.hasOwnProperty("ucoin_pay")&&i.ucoin_pay||MiniAdpter.window.game37Sdk.sdkReport("pay",{orderNo:e,sid:Platform.getServerIdFromOrderId(e)}):ConfigApp.onAndroid()?"cb_ad_fy_hk"==ConfigApp.pf&&Platform.payCloseWithCBFY():ConfigApp.onIOS()?"cb_ios_fy_hk"==ConfigApp.pf&&Platform.payCloseWithCBFY():laya.renders.Render.isConchApp
    }

    /** 原文：t.getServerIdFromOrderId=function(t)，字节 [338172,338290) */
    public static getServerIdFromOrderId(t: any): any {
    if(t&&-1!=t.indexOf("|")){
        var i=t.split("|");
        if(i.length>=2)return i[1]
    }
    return""
    }

    /** 原文：t.payCloseWithCBFY=function()，字节 [338291,338703) */
    public static payCloseWithCBFY(): any {
    var i=ModelManager.instance.modelUser.pay_money,e=SaveLocal.getValue(ConfigApp.pf+"_showThirdPay");
    i>=700&&!e&&(SaveLocal.save(ConfigApp.pf+"_showThirdPay",!0),Platform.payThird());
    var s=SaveLocal.getValue(ConfigApp.pf+"_showVIP");
    i>=5e3&&!s&&(SaveLocal.save(ConfigApp.pf+"_showVIP",!0),"cb_ad_fy_hk"==ConfigApp.pf?ToJava.other_fun("https://line.me/ti/p/5BECvXf_6b",null):"cb_ios_fy_hk"==ConfigApp.pf&&ToIOS.callFunc("openLink",null,{link:"https://line.me/ti/p/5BECvXf_6b"}))
    }

    /** 原文：t.pay_yyb=function(i,e)，字节 [338704,339076) */
    public static pay_yyb(i: any, e: any): any {
    void 0===e&&(e=!1);
    var s=10*(<any>sg.model.ModelSalePay).getCoinNumByPID(i.pid,!0),n=(i.gids?i.gids:i.pid)+";"+i.zone+";"+i.uid+";"+i.pf,h=[s,n,Platform.login_type];
    ToJava.pay2(h,Handler.create(null,function(t,i){
        var e=i;
        e.pf=ConfigApp.pf,e.zoneId=1,e.amt=s,e.ext=n,e.billno=ModelManager.instance.modelUser.mUID+"A"+ConfigServer.getServerTimer(),NetHttp.instance.send("user_zone.yyb_pay",e,Handler.create(null,function(t){}))
    }))
    }

    /** 原文：t.initSDK=function()，字节 [339077,341479) */
    public static initSDK(): any {
    if(""==ConfigApp.pf_channel&&(ConfigApp.pf_channel=ConfigApp.pf),ConfigApp.onAndroid())ToJava.initSDK(ConfigApp.pf,Handler.create(null,function(i,e){
        Platform.initSDKback(i,"jj_ad"==ConfigApp.pf?"jj_ad":"test")
    })),ToJava.callMethod("music_play",null,Handler.create(null,function(){
        MusicManager.resume()
    },null,!1)),ToJava.callMethod("music_stop",null,Handler.create(null,function(){
        MusicManager.pause()
    },null,!1));else if(ConfigApp.onIOS())"ios"==ConfigApp.pf?ToIOS.callFunc("initSDK",function(i){
        Platform.initSDKback(i,"ios")
    },{package_type:ConfigApp.thisPackageType}):Platform.initSDKback(0,ConfigApp.pf);else if("h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf)Platform.h5_sdk_obj=Browser.window.initSDK(),!Platform.h5_sdk_obj||"h5_37_wx1"!=ConfigApp.pf&&"h5_37_wx2"!=ConfigApp.pf&&"h5_37_wx3"!=ConfigApp.pf||(Platform.h5_sdk_obj.getItem(ConfigApp.pf,function(t){
        SaveLocal.initStorage(t)
    }),SaveLocal.emiter.on("STORAGE_CHANGE",null,function(i){
        Platform.h5_sdk_obj.setItem(ConfigApp.pf,i)
    }));else if("h5_kuku"==ConfigApp.pf)Platform.h5_sdk_obj=Browser.window.initSDK(),Platform.h5_sdk_obj.config("GK-20190327111838-1927",function(t){},null);else if("h5_yyjh"==ConfigApp.pf||"h5_yyjh2"==ConfigApp.pf||"jj_h5_yyjh"==ConfigApp.pf||"h5_yyjh_hk"==ConfigApp.pf){
        Platform.h5_sdk_obj=Browser.window.initSDK();
        var i=Tools.getURLexpToObj(ConfigApp.url_params),e=["3866c245e0791eaabc84a49efe2d0ef2","09fe331c3dc8a3d5a10d05345f1b7e17","f3c9a6e058f9e6b12f380366583a96b1","686daecfb67ed9f0cb51e5188de2f31b"][["h5_yyjh","h5_yyjh2","jj_h5_yyjh","h5_yyjh_hk"].indexOf(ConfigApp.pf)];
        Platform.h5_sdk_obj.Init({account:i.userid,appkey:e,vaildCode:i.vaildCode})
    }else if("h5_ch"==ConfigApp.pf){
        var s=ConfigApp.chmj?ConfigApp.chmj:"1";
        Platform.h5_sdk_obj=Browser.window.initSDK(s),Platform.h5_sdk_obj.ready(function(t){})
    }else if("h5_ch2"==ConfigApp.pf||"jj_h5_ch"==ConfigApp.pf)Platform.h5_sdk_obj=Browser.window.initSDK();else if("jj_h5_twyx"==ConfigApp.pf||"h5_twyx"==ConfigApp.pf||"h5_twyx2"==ConfigApp.pf||"h5_twyx3"==ConfigApp.pf||"h5_twyx4"==ConfigApp.pf||"h5_twyx5"==ConfigApp.pf||"cb_h5_twyx1"==ConfigApp.pf||"cb_h5_twyx2"==ConfigApp.pf||"h5_7k"==ConfigApp.pf||"jj_h5_7k"==ConfigApp.pf||"h5_leyou"==ConfigApp.pf||"jj_h5_leyou"==ConfigApp.pf||"h5_360"==ConfigApp.pf||"h5_360_2"==ConfigApp.pf||"h5_360_3"==ConfigApp.pf||"h5_1377"==ConfigApp.pf||"h5_muzhi"==ConfigApp.pf||"h5_muzhi2"===ConfigApp.pf||"h5_hutao"===ConfigApp.pf||"h5_hutao2"===ConfigApp.pf||"changxiang"===ConfigApp.pf||"h5_changwan"===ConfigApp.pf||"h5_shouqu"===ConfigApp.pf||"h5_qqdt"===ConfigApp.pf||"h5_qqdt2"===ConfigApp.pf||"h5_qqdt3"===ConfigApp.pf||"cb_h5_qqdt"==ConfigApp.pf||"h5_6kw2"===ConfigApp.pf||"h5_6kw3"===ConfigApp.pf||"h5_6kw"===ConfigApp.pf)if(ConfigApp.get_qq_CMDLINE()){
        var n=Tools.getURLexpToObj(ConfigApp.url_params);
        sg.sdks.TxExeSdk.i.setURLtoConnect(n.openid,n.port)
    }else Platform.h5_sdk_obj=Browser.window.initSDK();else"r2g_kr_h5"==ConfigApp.pf?Platform.h5_sdk_obj={}:Platform.initSDKback(0,ConfigApp.pf)
    }

    /** 原文：t.initSDKback=function(i,e)，字节 [341480,341597) */
    public static initSDKback(i: any, e: any): any {
    if(i&&"string"==typeof i){
        var s=i;
        s&&s.indexOf(e)>-1&&(ConfigApp.pf_channel=s)
    }
    Platform.force_update()
    }

    /** 原文：t.logout=function(i)，字节 [341598,342385) */
    public static logout(i: any): any {
    Platform.h5_sdk?Platform.h5_sdk.switchAccount():ConfigApp.onAndroid()?ToJava.logout(i):ConfigApp.onIOS()?"ios_37"==ConfigApp.pf?ToIOS.callFunc("logout_sq",null,ConfigApp.pf):ToIOS.callFunc("logout",function(t){
        i&&i.runWith([0,t])
    },ConfigApp.pf):"h5_ch"==ConfigApp.pf?Platform.h5_sdk_obj.logout(function(t){
        i&&i.runWith([0,t])
    }):"h5_hutao"==ConfigApp.pf||"h5_hutao2"===ConfigApp.pf?(Platform.h5_sdk_obj.logout(),Platform.restart()):"h5_changwan"==ConfigApp.pf?(Platform.h5_sdk_obj.loginout(),Platform.restart()):"jj_h5_twyx"==ConfigApp.pf||"h5_twyx"==ConfigApp.pf||"h5_twyx2"==ConfigApp.pf||"h5_twyx3"==ConfigApp.pf||"h5_twyx4"==ConfigApp.pf||"h5_twyx5"==ConfigApp.pf||"cb_h5_twyx1"==ConfigApp.pf||"cb_h5_twyx2"==ConfigApp.pf||"h5_1377"==ConfigApp.pf?Platform.h5_sdk_obj.switchUser():"h5_360_3"==ConfigApp.pf?Platform.h5_sdk_obj.isSupportMethod("spChangeAccount")&&Platform.h5_sdk_obj.spChangeAccount():"h5_qqdt3"!=ConfigApp.pf&&"cb_h5_qqdt"!=ConfigApp.pf||!ConfigApp.get_qq_CMDLINE()||sg.sdks.TxExeSdk.i.exitApp()
    }

    /** 原文：t.login_cancel=function(t)，字节 [342386,342543) */
    public static login_cancel(t: any): any {
    ConfigApp.onAndroid()?ToJava.callMethod("login_cancel",null,t):ConfigApp.onIOS()&&ToIOS.callFunc("login_cancel",function(i){
        t&&t.runWith([0,i])
    },null)
    }

    /** 原文：t.login=function(i,e)，字节 [342544,352524) */
    public static login(i: any, e: any): any {
    if(void 0===e&&(e=""),Platform.h5_sdk)Platform.h5_sdk.login(i);else if(ConfigApp.releaseWeiXin())if("h5_changxiang"==ConfigApp.pf){}else if(ConfigApp.pf==MiniAdpter.window.bugu_pf||ConfigApp.pf==MiniAdpter.window.yiyang_pf)MiniAdpter.window.huoSdk.login().then(function(t){
        i&&i.runWith([0,t]),MiniAdpter.window.huoSdk.getShareInfo({data:{path:""}}).then(function(t){
            MiniAdpter.window.wx.onShareAppMessage(function(){
                return MiniAdpter.window.huoSdk.addShareInfo({data:{to_target:"wx"}}),{title:t.data.title,imageUrl:t.data.image,query:"state="+t.data.state}
            }),MiniAdpter.window.wx.showShareMenu()
        })
    },function(t){
        "string"==typeof t&&ViewManager.instance.showTipsTxt(t)
    }).catch();else if(ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf)MiniAdpter.window.chnsdk.login(function(e){
        Platform.pf_login_data=e.data,i&&i.runWith([0,e.data])
    });else if(ConfigApp.pf==MiniAdpter.window.game37_pf)MiniAdpter.window.game37Sdk.login(function(e){
        i&&i.runWith([0,e]);
        var s=ObjectUtil.clone(e);
        for(var n in s.data){
            var h=s.data[n];
            s[n]=h
        }
        delete s.data,Platform.pf_login_data=s
    });else if(ConfigApp.pf==MiniAdpter.window.twyx_pf)MiniAdpter.window.gameSDK.entryGame(function(){
        console.log("成功进入游戏"),MiniAdpter.window.gameSDK.cpSDK.loginUserInfo(function(t){
            i&&i.runWith([0,t])
        }),MiniAdpter.window.gameSDK.cpSDK.checkSubscribe().then(function(t){
            console.log("已经关注公众号")
        },function(t){
            console.log("尚未关注公众号")
        })
    });else if(ConfigApp.pf==MiniAdpter.window.zhangwan_pf){
        var n=MiniAdpter.window.wx.getEnterOptionsSync();
        MiniAdpter.window.zwsdk.login({state:n.status||"",query:n}).then(function(t){
            console.log("login - then"),console.log(t),i&&i.runWith([0,t.data.data])
        })
    }else ConfigApp.pf==MiniAdpter.window.gzsgz_pf&&MiniAdpter.window.wx.login({success:function(t){
        console.log("--调用 wx.login 接口返回：",t),t.code?i&&i.runWith([0,t.code]):(console.log("登录失败！"+t.errMsg),i&&i.runWith([500,null]))
    },fail:function(){
        console.log("--调用 wx.login 接口返回失败"),i&&i.runWith([500,null])
    }});else if(ConfigApp.releaseQQ()){}else if(ConfigApp.releaseDouYin())ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf?TTMiniAdapter.window.huoSdk.login().then(function(t){
        i&&i.runWith([0,t])
    },function(t){
        "string"==typeof t&&ViewManager.instance.showTipsTxt(t)
    }):ConfigApp.pf==TTMiniAdapter.window.tt_37_pf&&TTMiniAdapter.window.tt37Sdk.login().then(function(t){
        i&&i.runWith([0,t])
    },function(t){
        "string"==typeof t&&ViewManager.instance.showTipsTxt(t)
    });else if(ConfigApp.onAndroid())"hw"==ConfigApp.pf||"hw_gzsgz"==ConfigApp.pf||"hw_jtzl"==ConfigApp.pf||"hw_tw"==ConfigApp.pf||"cb_hw_tw"==ConfigApp.pf||"cb_hw_cn"==ConfigApp.pf||"juedi"==ConfigApp.pf||"wende_ad"==ConfigApp.pf||"vivo"==ConfigApp.pf||"oppo"==ConfigApp.pf||"yx7477"==ConfigApp.pf||"yx7477_1"==ConfigApp.pf||"mi"==ConfigApp.pf||"uc"==ConfigApp.pf||"mz"==ConfigApp.pf||"caohua"==ConfigApp.pf||"jj_ad_caohua"==ConfigApp.pf||"muyou_ad_vn"==ConfigApp.pf||"muyou_ad_vn2"==ConfigApp.pf||"cb_muyou_ad_vn"==ConfigApp.pf||"cb_muyou_ad_vn1"==ConfigApp.pf||"cb_muyou_ad_vn2"==ConfigApp.pf||"muyou_ad_vn1"==ConfigApp.pf||"muyou_ad_tl"==ConfigApp.pf||"muyou_hw_tl"==ConfigApp.pf||"muyou_hw_vn"==ConfigApp.pf||"jj_mina_ad_ar"==ConfigApp.pf||"jj_junhai_gg"==ConfigApp.pf||"jj_junhai_os"==ConfigApp.pf||"ad_37_jp"==ConfigApp.pf||"ad_37_kr"==ConfigApp.pf||"os_37_kr"==ConfigApp.pf||"ad_37_tw"==ConfigApp.pf||"cb_ad_37_cn"==ConfigApp.pf||"cb_ad_37_kr"==ConfigApp.pf||"cb_os_37_kr"==ConfigApp.pf||"r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf||"r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf||"cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf||"cb_ad_r2_hk"==ConfigApp.pf||"cb_ad_fy_hk"==ConfigApp.pf||"you77_ad_jp"==ConfigApp.pf||"you77_ad_tw"==ConfigApp.pf||"you77_hw_jp"==ConfigApp.pf||"indofun_gg"==ConfigApp.pf||"indofun_oppo"==ConfigApp.pf||"ad_360"==ConfigApp.pf||"ad_6kw"==ConfigApp.pf||"ad_xiaoy"==ConfigApp.pf||"ad_mengyou"==ConfigApp.pf||"cb_ad_zhangwan"==ConfigApp.pf||"cb_ad_zhangwan1"==ConfigApp.pf||"cb_ad_zhangwan2"==ConfigApp.pf||"cb_ad_just4fun"==ConfigApp.pf||"sg4_ad_bugu"==ConfigApp.pf||"fs_ad_37"==ConfigApp.pf?(ToJava.login(ConfigApp.pf,i),Platform.getPayListInfo()):ConfigApp.onAndroidYYB()?"meng52"==e?sg.model.ModelPlayer.instance.getVisitorData(ConfigApp.pf,i):"meng52_temp_user_pwd"==e||"fb"==sg.model.ModelPlayer.instance.thirdLoginType?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,i):ToJava.login(e,i):"google"==ConfigApp.pf?("meng52"==e?sg.model.ModelPlayer.instance.getVisitorData(ConfigApp.pf,i):"meng52_temp_user_pwd"==e||"fb"==sg.model.ModelPlayer.instance.thirdLoginType?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,i):ToJava.login(e,i),ToJava.callMethod("sendPayParams",null,Handler.create(null,function(t){
        ToJava.log("收到移动端的 sendPayParams 回调，re1 = "+JSON.stringify(t)),t.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.gg_callback_v3",t,Handler.create(null,function(t){
            ToJava.log("收到后端的 NetMethodCfg.HTTP_GG_CALLBACK_V3 回调，re2 = "+JSON.stringify(t)),ToJava.callMethod("consumePurchase",t,null)
        }))
    },null,!1))):"cb_google"==ConfigApp.pf||"cb_google1"==ConfigApp.pf?(ToJava.callMethod("getPreRegister",null,Handler.create(null,function(t,s){
        var n=t.fromPreRegister,h=Handler.create(null,function(t,e){
            e.fromPreRegister=n,i.runWith([t,e])
        });
        "meng52"==e?sg.model.ModelPlayer.instance.getVisitorData(ConfigApp.pf,h):"meng52_temp_user_pwd"==e?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,h):ToJava.login(e,h)
    })),ToJava.callMethod("sendPayParams",null,Handler.create(null,function(t){
        ToJava.log("收到移动端的 sendPayParams 回调，re1 = "+JSON.stringify(t)),t.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.cb_gg_callback",t,Handler.create(null,function(t){
            ToJava.log("收到后端的 NetMethodCfg.HTTP_CB_GG_CALLBACK 回调，re2 = "+JSON.stringify(t)),ToJava.callMethod("consumePurchase",t,null)
        }))
    },null,!1))):"cb_ad_mycard"==ConfigApp.pf?"meng52"==e?sg.model.ModelPlayer.instance.getVisitorData(ConfigApp.pf,i):"meng52_temp_user_pwd"==e?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,i):ToJava.login(e,i):"cb_yuanqu_gg"==ConfigApp.pf?("meng52_temp_user_pwd"==e?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,i):ToJava.login(e,i),Platform.getPayListInfo(),ToJava.callMethod("sendPayParams",null,Handler.create(null,function(t){
        t.pf=ConfigApp.pf,NetHttp.instance.send("user_zone.cb_gg_callback",t,Handler.create(null,function(t){
            ToJava.callMethod("consumePurchase",t,null)
        }))
    },null,!1))):i&&i.runWith([0,null]);else if("wende_ios"==ConfigApp.pf||"r2g_xm_ios"==ConfigApp.pf||"r2g_kr_ios"==ConfigApp.pf||"you77_ios_tw"==ConfigApp.pf||"you77_ios_jp"==ConfigApp.pf||"you77_ios_jp1"==ConfigApp.pf||"caohua_ios"==ConfigApp.pf||"indofun_ios"==ConfigApp.pf||"muyou_ios_vn"==ConfigApp.pf||"muyou_ios_vn1"==ConfigApp.pf||"muyou_ios_vn2"==ConfigApp.pf||"muyou_ios_vn3"==ConfigApp.pf||"muyou_ios_tl"==ConfigApp.pf||"cb_muyou_ios_vn"==ConfigApp.pf||"jj_mina_ios_ar"==ConfigApp.pf||"jj_junhai_ios"==ConfigApp.pf||"ios_tw"==ConfigApp.pf||"ios_37_jp"==ConfigApp.pf||"ios_37_kr"==ConfigApp.pf||"ios_37_tw"==ConfigApp.pf||"cb_ios_37_cn"==ConfigApp.pf||"ios_37_wx2"==ConfigApp.pf||"cb_ios_37_kr"==ConfigApp.pf||"cb_ios"==ConfigApp.pf||"ios_mengwoai"==ConfigApp.pf||"cb_yuanqu_ios"==ConfigApp.pf){
        var h=!1;
        "ios_tw"!=ConfigApp.pf&&"cb_ios"!=ConfigApp.pf&&"cb_yuanqu_ios"!=ConfigApp.pf||(h=!0),"meng52"==e&&h?sg.model.ModelPlayer.instance.getVisitorData(ConfigApp.pf,i):"meng52_temp_user_pwd"==e&&h||"fb"==sg.model.ModelPlayer.instance.thirdLoginType&&h?sg.model.ModelPlayer.instance.getVisitorDataTemp(ConfigApp.pf,i):ToIOS.callFunc("login",function(t){
            i&&i.runWith([0,t])
        },h?{type:e}:ConfigApp.pf)
    }else if("cb_ios_r2"==ConfigApp.pf||"cb_ios_r2_hk"==ConfigApp.pf)ToIOS.callFunc("login",function(t){
        i&&i.runWith([0,t])
    },ConfigApp.pf),Platform.getPayListInfo();else if("r2g_kr2_ios"==ConfigApp.pf)ToIOS.callFunc("login",function(t){
        i&&i.runWith([0,t])
    },ConfigApp.pf),Platform.getPayListInfo();else if("cb_ios_fy_hk"==ConfigApp.pf)ToIOS.callFunc("login",function(t){
        i&&i.runWith([0,t])
    },ConfigApp.pf),Platform.getPayListInfo();else if("ios_37"==ConfigApp.pf){
        var o=SaveLocal.getValue("local_save_key_user"),r="",a="";
        o&&(r=o.name,a=o.pwd_s),r&&r.indexOf("ios_37")>-1&&(r="",a="");
        var l=!0,c=SaveLocal.getValue("local_save_key_user_list"),u: any =<any>{};
        for(var d in c)u[c[d].name]=c[d].pwd_s;
        ToIOS.callFunc("is_ios_sq",function(t){
            l=!1,ToIOS.callFunc("login_sq",function(t){
                i&&i.runWith([0,t])
            },{name:r,pwd:a})
        },u),Laya.timer.once(2e3,null,function(){
            l&&ViewManager.instance.showWarnAlert("请前往苹果商店更新APP到最新版本",Handler.create(null,function(){
                Browser.window.openHtml("https://apps.apple.com/app/id1435453697")
            }))
        })
    }else if("h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf){
        if(i){
            var _=Tools.getURLexpToObj(ConfigApp.url_params);
            "h5_37_wx1"!=ConfigApp.pf&&"h5_37_wx2"!=ConfigApp.pf&&"h5_37_wx3"!=ConfigApp.pf&&"h5_37_yuewan"!=ConfigApp.pf&&"cb_h5_37"!=ConfigApp.pf||delete _.fx_c_game_id,"h5_37_wx1"!=ConfigApp.pf&&"h5_37_wx2"!=ConfigApp.pf&&"h5_37_wx3"!=ConfigApp.pf&&"h5_37_yuewan"!=ConfigApp.pf||!_.app_version||delete _.app_version,i.runWith([0,_])
        }
    }else if("h5_kuku"==ConfigApp.pf)Platform.h5_sdk_obj.getUserInfo(function(t){
        i.runWith([0,t])
    });else if("h5_yyjh"==ConfigApp.pf||"h5_yyjh2"===ConfigApp.pf||"jj_h5_yyjh"==ConfigApp.pf||"h5_yyjh_hk"===ConfigApp.pf){
        if(i){
            var g=Tools.getURLexpToObj(ConfigApp.url_params);
            i.runWith([0,g])
        }
    }else if("h5_ch"==ConfigApp.pf)Platform.h5_sdk_obj.login(function(t){
        200==t.code&&(t.data.config_type=ConfigApp.chmj,i.runWith([0,t.data]))
    });else if("h5_ch2"===ConfigApp.pf||"jj_h5_ch"==ConfigApp.pf)Platform.h5_sdk_obj.login_v(function(t,e){
        i&&i.runWith([0,{config_type:ConfigApp.chmj,token:t,userid:e}])
    });else if("jj_h5_twyx"==ConfigApp.pf||"h5_twyx"==ConfigApp.pf||"h5_twyx2"==ConfigApp.pf||"h5_twyx3"==ConfigApp.pf||"h5_twyx5"==ConfigApp.pf||"h5_twyx4"==ConfigApp.pf||"cb_h5_twyx1"==ConfigApp.pf||"cb_h5_twyx2"==ConfigApp.pf)Platform.h5_sdk_url_data=Tools.getURLexpToObj(ConfigApp.url_params),"1"===Tools.getURLexp("mpc")&&(Platform.h5_sdk_url_data.mpc=1),i&&i.runWith([0,Platform.h5_sdk_url_data]);else if("h5_7k"==ConfigApp.pf||"jj_h5_7k"===ConfigApp.pf)i&&i.runWith([0,Tools.getURLexpToObj(ConfigApp.url_params)]);else if("r2g_kr_h5"===ConfigApp.pf){
        var f=Tools.getURLexpToObj(ConfigApp.url_params);
        f.r2g_kr_h5=1,i&&i.runWith([0,f])
    }else if("h5_leyou"===ConfigApp.pf||"jj_h5_leyou"===ConfigApp.pf||"h5_360"===ConfigApp.pf||"h5_1377"===ConfigApp.pf||"h5_muzhi"===ConfigApp.pf||"h5_muzhi2"===ConfigApp.pf)i&&i.runWith([0,Tools.getURLexpToObj(ConfigApp.url_params)]);else if("h5_360_2"===ConfigApp.pf)Platform.h5_sdk_obj.getUserInfo().then(function(t){
        (<any>sg.zmPlatform.ConstantZM).initPlatform({userInfo:t,params:Tools.getURLexpToObj(ConfigApp.url_params)}),i&&i.runWith([0,t])
    }).catch(function(t){});else if("h5_360_3"===ConfigApp.pf){
        var p=Platform.h5_sdk_obj.getUserInfo();
        if((<any>sg.zmPlatform.ConstantZM).initPlatform({userInfo:p,params:Tools.getURLexpToObj(ConfigApp.url_params)}),i&&i.runWith([0,p]),Platform.h5_sdk_obj.isSupportMethod("setShareInfo")){
            var v=ConfigServer.system_simple.share_pf[ConfigApp.pf];
            v&&Platform.h5_sdk_obj.setShareInfo({title:Tools.getMsgById(v[0]),content:Tools.getMsgById(v[1]),imgurl:v[2]},function(i){
                "ok"===i.success&&Platform.eventListener.event("event_share_ok")
            })
        }
    }else"h5_hutao"===ConfigApp.pf||"h5_hutao2"===ConfigApp.pf?Platform.h5_sdk_obj.login(function(t,e,s){
        i&&i.runWith([0,{code:t,verify_url:e,sign:s}])
    }):"h5_changwan"===ConfigApp.pf?Platform.h5_sdk_obj.login_v(function(t){
        var e=SaveLocal.getValue("my_h5_args");
        e=ObjectUtil.mergeObjects([e,Tools.getURLexpToObj(ConfigApp.url_params)]),i&&i.runWith([0,e])
    }):"changxiang"===ConfigApp.pf?Platform.h5_sdk_obj.login(function(t){
        i&&i.runWith([0,t])
    }):"h5_qqdt"==ConfigApp.pf||"h5_qqdt2"==ConfigApp.pf||"h5_qqdt3"==ConfigApp.pf||"cb_h5_qqdt"==ConfigApp.pf||"h5_6kw"==ConfigApp.pf||"h5_6kw2"==ConfigApp.pf||"h5_6kw3"==ConfigApp.pf?i&&i.runWith([0,Tools.getURLexpToObj(ConfigApp.url_params)]):"h5_shouqu"==ConfigApp.pf?Platform.h5_sdk_obj.getUser(function(t){
        i&&i.runWith([0,t])
    }):i&&i.runWith([0,null])
    }

    /** 原文：t.isNet=function()，字节 [352525,352649) */
    public static isNet(): any {
    return!!ConfigApp.releaseMiniGame()||(laya.renders.Render.isConchApp?0!=Browser.window.conch.config.getNetworkType():navigator.onLine)
    }

    /** 原文：t.getPhoneID=function()，字节 [352650,352818) */
    public static getPhoneID(): any {
    ConfigApp.onAndroid()?ToJava.getPhoneID(ConfigApp.pf,Handler.create(null,function(i,e){
        Platform.phoneID=e
    })):ConfigApp.onIOS()&&ToIOS.callFunc("getPhoneID",function(i){
        Platform.phoneID=i
    },{})
    }

    /** 原文：t.getPhoneIDs=function()，字节 [352819,353016) */
    public static getPhoneIDs(): any {
    return Platform.phoneID&&""!=Platform.phoneID||(ConfigApp.midfa&&""!=ConfigApp.midfa?Platform.phoneID=ConfigApp.midfa:ConfigApp.mdevice&&""!=ConfigApp.mdevice&&(Platform.phoneID=ConfigApp.mdevice),"h5_360_2"==ConfigApp.pf&&(Platform.phoneID="")),Platform.phoneID
    }

    /** 原文：t.showGameIndex=function()，字节 [353017,353268) */
    public static showGameIndex(): any {
    Browser.window.clearLoadingDiv&&Browser.window.clearLoadingDiv(),Browser.window.clearLoadingDivClip&&Browser.window.clearLoadingDivClip(),ConfigApp.onIOS()&&ToIOS.callFunc("clearIndexLogo",null,null),ConfigApp.onAndroid()&&ToJava.callMethod("clearIndexLogo",null,null)
    }

    /** 原文：t.checkPackage=function()，字节 [353269,353394) */
    public static checkPackage(): any {
    ConfigApp.onAndroid()&&ToJava.callMethod("checkPackage",ConfigApp.pf,Handler.create(null,function(t,i){
        ConfigApp.isUpdateApp=1
    }))
    }

    /** 原文：t.checkPackageAlert=function()，字节 [353395,353435) */
    public static checkPackageAlert(): any {
    return!1
    }

    /** 原文：t.uploadUserData=function(i,e)，字节 [353436,353520) */
    public static uploadUserData(i: any, e: any): any {
    try{
        Platform.uploadUserData2(i,e)
    }catch(t){
        console.warn(t)
    }
    }

    /** 原文：t.uploadUserData2=function(i,e)，字节 [353521,377441) */
    public static uploadUserData2(i: any, e: any): any {
    var s=null,n=ModelManager.instance.modelUser,h=ConfigServer.getServerName(n.zone),o=Tools.getURLexpToObj(ConfigApp.url_params);
    if(Platform.h5_sdk)Platform.h5_sdk.log(i,h),Platform.h5_sdk.logUser(i,e);else if(ConfigApp.releaseWeiXin())if("h5_changxiang"==ConfigApp.pf){}else if(ConfigApp.pf==MiniAdpter.window.bugu_pf||ConfigApp.pf==MiniAdpter.window.yiyang_pf)1!=i&&2!=i&&7!=i&&1e3!=i||(s=<any>{"role-event":1==i?"online":2==i||7==i?"levelup":"create","role-server_id":n.zone,"role-server_name":ConfigServer.getServerName(n.zone),"role-role_id":n.mUID_merge,"role-role_name":n.uname,"role-role_level":n.getLv(),"role-role_vip":0,"role-combat_num":2==i||7==i?n.getPower():0,"role-role_ext_info":{role_gang_id:"",role_gang_name:"",role_rebirth_num:0,role_country:0==n.country?"魏":1==n.country?"蜀":"吴"},"role-role_create_time":Math.floor(.001*Tools.getTimeStamp(n.add_time))+""},1!=i&&2!=i&&7!=i||(s["role-merge_server_id"]=n.mergeZone,s["role-merge_server_name"]=ConfigServer.getServerName(n.mergeZone),s["role-current_camp_name"]=0==n.country?"魏":1==n.country?"蜀":"吴"),MiniAdpter.window.huoSdk.updateRole({data:s}).then(function(t){
        console.log("updateRole - then"),console.log(t)
    }));else if(ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf)1e3!=i&&1!=i&&2!=i||(s=<any>{roleid:n.mUID_merge,rolename:n.uname,level:n.getLv(),sid:n.zone,sname:ConfigServer.getServerName(n.zone),time:Math.floor(.001*ConfigServer.getServerTimer()),vip:0,power:2==i?n.getPower():0,createtime:Math.floor(.001*Tools.getTimeStamp(n.add_time))},1e3==i?(s.type="login",s.new=1):1==i?(s.type="login",s.new=0):2==i&&(s.type="levelup",s.new=0),MiniAdpter.window.chnsdk.onUserInfo(s));else if(ConfigApp.pf==MiniAdpter.window.twyx_pf){
        var r=NaN;
        if(1e3==i)r=2;else if(1==i)r=3;else{
            if(2!=i)return;
            r=4
        }
        s=<any>{data_type:r,zone_id:n.zone,zone_name:ConfigServer.getServerName(n.zone),role_id:n.mUID,role_name:n.uname,role_level:n.getLv(),role_currency:n.coin},MiniAdpter.window.gameSDK.cpSDK.dataReport(s)
    }else if(ConfigApp.pf==MiniAdpter.window.zhangwan_pf){
        var a="";
        if(1e3==i)a="create";else if(1==i)a="online";else{
            if(2!=i)return;
            a="main_city_upgrade"
        }
        s=<any>{role:{event:a,server_id:ModelManager.instance.modelUser.zone,server_name:ConfigServer.getServerName(ModelManager.instance.modelUser.zone),cp_role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv(),power:0==ModelManager.instance.modelUser.country?"魏":1==ModelManager.instance.modelUser.country?"蜀":"吴",combat_num:2==i?ModelManager.instance.modelUser.getPower():0,main_city_level:ModelManager.instance.modelUser.getLv(),chapter_index:0}},MiniAdpter.window.zwsdk.updateRole(s).then(function(t){
            console.log("updateRole - then"),console.log(t)
        })
    }else ConfigApp.pf==MiniAdpter.window.game37_pf&&(0!=i&&2!=i&&5!=i||Platform.syncInvitationData(),1e3==i?MiniAdpter.window.game37Sdk.sdkReport("createRole",{roleName:n.uname}):1==i?MiniAdpter.window.game37Sdk.sdkReport("enterGame",{server_id:n.zone,server_name:h}):2==i&&(MiniAdpter.window.game37Sdk.sdkReport("levelUpdate",{roleName:n.uname,roleLevel:n.getLv()}),3==n.getLv()&&MiniAdpter.window.game37Sdk.sdkReport("finishTutorial")));else if(ConfigApp.releaseDouYin())ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf&&(1!=i&&2!=i&&7!=i&&1e3!=i||(s=<any>{"role-event":1==i?"online":2==i||7==i?"levelup":"create","role-server_id":n.zone,"role-server_name":ConfigServer.getServerName(n.zone),"role-role_id":n.mUID_merge,"role-role_name":n.uname,"role-role_level":n.getLv(),"role-role_vip":0,"role-combat_num":2==i||7==i?n.getPower():0,"role-role_ext_info":{role_gang_id:"",role_gang_name:"",role_rebirth_num:0,role_country:0==n.country?"魏":1==n.country?"蜀":"吴"},"role-role_create_time":Math.floor(.001*Tools.getTimeStamp(n.add_time))+""},1!=i&&2!=i&&7!=i||(s["role-merge_server_id"]=n.mergeZone,s["role-merge_server_name"]=ConfigServer.getServerName(n.mergeZone),s["role-current_camp_name"]=0==n.country?"魏":1==n.country?"蜀":"吴"),TTMiniAdapter.window.huoSdk.updateRole({data:s}).then(function(t){
        console.log("updateRole - then"),console.log(t)
    })));else if(ConfigApp.onAndroid())if("juedi"==ConfigApp.pf||"juedi_ad"==ConfigApp.pf)ToJava.savePlayerInfo(Platform.getGameUserDataJUEDI(i,e),null);else if("wende_ad"==ConfigApp.pf)s=<any>{uid:ModelManager.instance.modelUser.mUID+"",sid:ModelManager.instance.modelUser.zone+"",sname:ModelManager.instance.modelUser.zone+"",uname:ModelManager.instance.modelUser.uname+"",lv:ModelManager.instance.modelUser.getLv()+""},ToJava.savePlayerInfo(s,null);else if("google"==ConfigApp.pf)(s=Platform.toFacebook(i,e))&&ToJava.savePlayerInfo(s,null);else if("cb_google"==ConfigApp.pf||"cb_google1"==ConfigApp.pf)s=<any>{},0==i?s.event_tokens=["h6716u"]:1==i?(s.event_tokens=["yg7g52"],s.skus_list=ConfigServer.system_simple.pay[ConfigApp.pf]):2==i&&(3==n.getLv()?s.event_tokens=["63eqdq"]:5==n.getLv()?s.event_tokens=["bbg1f1"]:10==n.getLv()?s.event_tokens=["po8d2o"]:15==n.getLv()&&(s.event_tokens=["ug5i2v"])),ToJava.savePlayerInfo(s,null);else if("cb_yuanqu_gg"==ConfigApp.pf)s=<any>{type:i+""},ToJava.savePlayerInfo(s,null);else if("cb_ad_mycard"==ConfigApp.pf)s=<any>{},0==i?s.event_tokens=["cud8fw"]:1==i?(s.event_tokens=["jibpeq"],s.skus_list=ConfigServer.system_simple.pay[ConfigApp.pf]):2==i&&(3==n.getLv()?s.event_tokens=["wfprrd"]:5==n.getLv()?s.event_tokens=["gnpa9n"]:10==n.getLv()?s.event_tokens=["vb1oho"]:15==n.getLv()&&(s.event_tokens=["ljjrva"])),ToJava.savePlayerInfo(s,null);else if("muyou_ad_vn"==ConfigApp.pf||"muyou_ad_vn2"==ConfigApp.pf||"cb_muyou_ad_vn"==ConfigApp.pf||"cb_muyou_ad_vn1"==ConfigApp.pf||"cb_muyou_ad_vn2"==ConfigApp.pf||"muyou_ad_vn1"==ConfigApp.pf||"muyou_ad_tl"==ConfigApp.pf||"muyou_hw_tl"==ConfigApp.pf||"muyou_hw_vn"==ConfigApp.pf){
        if((s=<any>{type:i+"",server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+""})&&ToJava.savePlayerInfo(s,null),5==i){
            s=<any>{};
            var l=n.pay_coin;
            l>=2e3?s=<any>{aj_key:"bvn2ol",fb_key:"total_gold62000"}:l>=300?s=<any>{aj_key:"wd6n49",fb_key:"total_gold300"}:l>=60&&ConfigServer.getServerTimer()-Tools.getTimeStamp(ModelManager.instance.modelUser.add_time)<=1728e5&&(s=<any>{aj_key:"x89lxd",fb_key:"h48_gold60"}),2==ObjectUtil.keys(s).length&&ToJava.callMethod("uploadEventKey",s,null)
        }
    }else if("jj_mina_ad_ar"==ConfigApp.pf)(s=<any>{type:i+"",uid:Platform.pf_login_data.uid,server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",coin:ModelManager.instance.modelUser.coin+""})&&ToJava.savePlayerInfo(s,null);else if("jj_junhai_gg"==ConfigApp.pf||"jj_junhai_os"==ConfigApp.pf)(s=<any>{type:i+"",server_id:String(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",http_user_login_data:n.http_user_login_data,products:ConfigServer.system_simple.pay[ConfigApp.pf]})&&ToJava.savePlayerInfo(s,null);else if("ad_37_jp"==ConfigApp.pf||"ad_37_kr"==ConfigApp.pf||"os_37_kr"==ConfigApp.pf||"ad_37_tw"==ConfigApp.pf||"cb_ad_37_kr"==ConfigApp.pf||"cb_os_37_kr"==ConfigApp.pf)s=<any>{type:i+"",uid:Platform.pf_login_data.uid,server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",coin:ModelManager.instance.modelUser.coin+""},4==i?(s.oldCoin=e[0]+"",s.newCoin=e[1]+""):6==i?(s.oldGold=e[0]+"",s.newGold=e[1]+""):7==i&&(s.power=e[0]+""),s&&ToJava.savePlayerInfo(s,null);else if("cb_ad_37_cn"==ConfigApp.pf)1!=i&&2!=i&&1e3!=i||(s=<any>{type:i+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_type:"",role_level:ModelManager.instance.modelUser.getLv()+"",role_bron_level:"0",role_ctime:Math.floor(.001*Tools.getTimeStamp(ModelManager.instance.modelUser.add_time))+"",party_name:"",vip_level:"0",balance:ModelManager.instance.modelUser.coin+"",total_coin:"0",consume_coin:"0",role_level_mtime:Math.floor(.001*ConfigServer.getServerTimer())+""},ToJava.savePlayerInfo(s,null));else if("r2g_xm_ad"==ConfigApp.pf||"r2g_kr_ad"==ConfigApp.pf||"r2g_kr_os"==ConfigApp.pf)(s=Platform.toR2GameAppsFlyer(i,e))&&ToJava.savePlayerInfo(s,null);else if("r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf)0!=i&&1!=i&&2!=i||(s=<any>{type:i+"",uid:Platform.pf_login_data.uid+"",server_id:n.zone,role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+"",role_create_time:Math.floor(.001*Tools.getTimeStamp(ModelManager.instance.modelUser.add_time))+"",last_login_time:"",total_recharge_amount:ModelManager.instance.modelUser.pay_money+"",title:ModelManager.instance.modelUser.office+"",gold:ModelManager.instance.modelUser.coin+"",sliver_coin:ModelManager.instance.modelUser.gold+"",food:ModelManager.instance.modelUser.food+"",wood:ModelManager.instance.modelUser.wood+"",stone:ModelManager.instance.modelUser.iron+""},ToJava.savePlayerInfo(s,null),1==i&&(sg.guide.model.GuideChecker.instance.off("newplayer_guide_over",null,Platform.endNewPlayerGuide),sg.guide.model.GuideChecker.instance.on("newplayer_guide_over",null,Platform.endNewPlayerGuide)));else if("cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf||"cb_ad_r2_hk"==ConfigApp.pf)0!=i&&1!=i&&2!=i||(s=<any>{type:i+"",uid:Platform.pf_login_data.uid+"",server_id:n.zone,role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+"",role_create_time:Math.floor(.001*Tools.getTimeStamp(ModelManager.instance.modelUser.add_time))+"",last_login_time:"",total_recharge_amount:ModelManager.instance.modelUser.pay_money+"",title:ModelManager.instance.modelUser.office+"",gold:ModelManager.instance.modelUser.coin+"",sliver_coin:ModelManager.instance.modelUser.gold+"",food:ModelManager.instance.modelUser.food+"",wood:ModelManager.instance.modelUser.wood+"",stone:ModelManager.instance.modelUser.iron+""},ToJava.savePlayerInfo(s,null),1==i&&(sg.guide.model.GuideChecker.instance.off("newplayer_guide_over",null,Platform.endNewPlayerGuide),sg.guide.model.GuideChecker.instance.on("newplayer_guide_over",null,Platform.endNewPlayerGuide)));else if("cb_ad_fy_hk"==ConfigApp.pf)1e3!=i&&1!=i&&2!=i||(s=<any>{type:i+"",user_id:n.accountId,role_id:n.mUID_merge,role_name:n.uname,role_level:n.getLv()+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone)},ToJava.savePlayerInfo(s,null));else if("you77_ad_jp"==ConfigApp.pf||"you77_ad_tw"==ConfigApp.pf||"you77_hw_jp"==ConfigApp.pf)(s=Platform.toYou77(i,e))&&ToJava.savePlayerInfo(s,null);else if("indofun_gg"==ConfigApp.pf||"indofun_oppo"==ConfigApp.pf)s=<any>{type:i+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",role_vip:"0",role_power:"0"},7==i&&(s.role_power=ModelManager.instance.modelUser.getPower()+""),ToJava.savePlayerInfo(s,null);else if("ad_6kw"==ConfigApp.pf)(s=Platform.to6KW(i,e))&&ToJava.savePlayerInfo(s,null);else if("ad_xiaoy"==ConfigApp.pf)(s=<any>{type:i,role_id:String(n.mUID),role_name:n.uname,server_id:n.zone})&&ToJava.savePlayerInfo(s,null);else if("ad_mengyou"==ConfigApp.pf)0!=i&&1!=i&&2!=i||(s=<any>{dsid:n.zone,dsname:ConfigServer.getServerName(n.zone),drid:n.mUID+"",drname:n.uname,drlevel:n.getLv()+"",drbalance:n.coin+"",drvip:"0",dparty:"",rolectime:Math.floor(.001*Tools.getTimeStamp(n.add_time)),rolelevelmtime:Math.round(.001*ConfigServer.getServerTimer()),dext:""},0==n.country?s.dcountry="魏":1==n.country?s.dcountry="蜀":s.dcountry="吴",0==i?s.eid=31:1==i?s.eid=32:2==i&&(s.eid=35),ToJava.savePlayerInfo(s,null));else if("ad_360"==ConfigApp.pf)(s=<any>{type:i,method:"mobile"})&&ToJava.savePlayerInfo(s,null);else if("caohua"==ConfigApp.pf||"jj_ad_caohua"==ConfigApp.pf)0!=i&&1!=i&&2!=i||ToJava.savePlayerInfo(Platform.toChaohua(i),null);else if("yx7477"==ConfigApp.pf||"yx7477_1"==ConfigApp.pf)1e3!=i&&1!=i&&2!=i||ToJava.savePlayerInfo({role:ModelManager.instance.modelUser.uname,lv:ModelManager.instance.modelUser.getLv()},null);else if("cb_ad_just4fun"==ConfigApp.pf)s=<any>{type:i+"",uid:Platform.pf_login_data.uid,role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),coin:ModelManager.instance.modelUser.coin+""},4==i?(s.oldCoin=e[0]+"",s.newCoin=e[1]+""):6==i?(s.oldGold=e[0]+"",s.newGold=e[1]+""):7==i&&(s.power=e[0]+""),s&&ToJava.savePlayerInfo(s,null);else if("cb_ad_zhangwan"==ConfigApp.pf){
        var c="";
        if(1e3==i)c="create";else if(1==i)c="online";else{
            if(2!=i)return;
            c="main_city_upgrade"
        }
        (s=<any>{event:c,server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),cp_role_id:n.mUID_merge,role_name:n.uname+"",role_level:n.getLv()+"",power:0==n.country?"魏":1==n.country?"蜀":"吴",main_city_level:n.getLv()+"",chapter_index:"0",role_vip:"0",combat_num:2==i?n.getPower()+"":"0"})&&ToJava.savePlayerInfo(s,null)
    }else if("cb_ad_zhangwan1"==ConfigApp.pf||"cb_ad_zhangwan2"==ConfigApp.pf){
        if(1e3!=i&&1!=i&&2!=i)return;
        s=<any>{event:i,cp_role_id:n.mUID_merge,role_name:n.uname,role_level:n.getLv(),server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone)},ToJava.savePlayerInfo(s,null)
    }else if("sg4_ad_bugu"==ConfigApp.pf){
        if(1e3!=i&&1!=i&&2!=i)return;
        s=<any>{type:i,role_id:n.mUID_merge,role_name:n.uname,role_level:n.getLv(),role_vip:"0",role_time:Tools.getTimeStamp(n.add_time),server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),ext:""},ToJava.savePlayerInfo(s,null)
    }else"fs_ad_37"==ConfigApp.pf?1!=i&&2!=i&&1e3!=i||(s=<any>{type:i+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),server_time:Math.floor(.001*n.gameServerStartTimer)+"",role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+"",balance:ModelManager.instance.modelUser.coin+"",role_time:Math.floor(.001*Tools.getTimeStamp(ModelManager.instance.modelUser.add_time))+"",time:Math.floor(.001*ConfigServer.getServerTimer())+""},ToJava.savePlayerInfo(s,null)):1==i&&("oppo"==ConfigApp.pf?ToJava.savePlayerInfo(Platform.getGameUserDataOPPO(),null):"uc"==ConfigApp.pf?ToJava.savePlayerInfo(Platform.getGameUserDataUC(),null):ToJava.savePlayerInfo(Platform.getGameUserData3(),null));else if("h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf)(s=<any>{}).appid=Platform.pf_login_data.appid,s.game_id=Platform.pf_login_data.game_id,s.uid=Platform.pf_login_data.uid,s.serverid=n.zone,s.servername=ConfigServer.getServerName(n.zone),s.rolename=n.uname,"h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf?s.roleid=n.mUID:s.roleid=n.mUID_merge,1e3==i?(s.timestamp=Tools.getTimeStamp(n.add_time),Platform.h5_sdk_obj.log(s,"create")):1==i&&(s.rolelevel=n.getLv(),s.viplevel=0,s.fightvalue=0,s.balance=n.coin,s.country=n.country,s.countryid=n.country,s.countryrolename="",s.timestamp=ConfigServer.getServerTimer(),s.rolecreatetime=Tools.getTimeStamp(n.add_time),s.roles=[],Platform.h5_sdk_obj.log(s,"server"),s.isnewrole=!!e&&0==e[0],Platform.h5_sdk_obj.log(s,"entergame"));else if("ios_37"==ConfigApp.pf)1e3!=i&&1!=i||ToIOS.callFunc("report_sq",function(t){},{sid:ModelManager.instance.modelUser.zone+"",sname:h,type:i+""});else if("ios_37_jp"==ConfigApp.pf||"ios_37_kr"==ConfigApp.pf||"ios_37_tw"==ConfigApp.pf||"cb_ios_37_kr"==ConfigApp.pf)s=<any>{type:i+"",server_id:String(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+""},4==i?(s.oldCoin=e[0]+"",s.newCoin=e[1]+""):6==i?(s.oldGold=e[0]+"",s.newGold=e[1]+""):7==i&&(s.power=e[0]+""),ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("cb_ios_37_cn"==ConfigApp.pf||"ios_37_wx2"==ConfigApp.pf)s=<any>{type:i+"",server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+""},ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("cb_ios"==ConfigApp.pf)s=<any>{},0==i?s.event_tokens=["h6716u"]:1==i?s.event_tokens=["yg7g52"]:2==i&&(3==n.getLv()?s.event_tokens=["63eqdq"]:5==n.getLv()?s.event_tokens=["bbg1f1"]:10==n.getLv()?s.event_tokens=["po8d2o"]:15==n.getLv()&&(s.event_tokens=["ug5i2v"])),ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("caohua_ios"==ConfigApp.pf)0!=i&&1!=i&&2!=i||ToIOS.callFunc("info",function(t){},Platform.toChaohua(i));else if("indofun_ios"==ConfigApp.pf)s=<any>{type:i+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",role_vip:"0",role_power:"0"},7==i&&(s.role_power=ModelManager.instance.modelUser.getPower()+""),ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("muyou_ios_vn"==ConfigApp.pf||"muyou_ios_vn1"==ConfigApp.pf||"muyou_ios_vn2"==ConfigApp.pf||"muyou_ios_vn3"==ConfigApp.pf||"muyou_ios_tl"==ConfigApp.pf||"cb_muyou_ios_vn"==ConfigApp.pf)s=<any>{type:i+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+""},ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("jj_mina_ios_ar"==ConfigApp.pf)s=<any>{type:i+"",products:ConfigServer.system_simple.pay[ConfigApp.pf],uid:Platform.pf_login_data.uid,server_id:String(n.zone),server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_level:ModelManager.instance.modelUser.getLv()+"",coin:ModelManager.instance.modelUser.coin+""},ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("jj_junhai_ios"==ConfigApp.pf)s=<any>{type:i+"",server_id:String(n.zone),role_id:ModelManager.instance.modelUser.mUID+"",role_name:ModelManager.instance.modelUser.uname+"",role_level:ModelManager.instance.modelUser.getLv()+"",http_user_login_data:n.http_user_login_data},ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("you77_ios_tw"==ConfigApp.pf||"you77_ios_jp"==ConfigApp.pf||"you77_ios_jp1"==ConfigApp.pf){
        if(!(s=Platform.toYou77(i,e)))return;
        ToIOS.callFunc("info",function(t){},s)
    }else if("wende_ios"==ConfigApp.pf)s=<any>{uid:ModelManager.instance.modelUser.mUID+"",type:i+"",sid:ModelManager.instance.modelUser.zone+"",sname:ModelManager.instance.modelUser.zone+"",uname:ModelManager.instance.modelUser.uname+"",lv:ModelManager.instance.modelUser.getLv()+"",vip:"0",money:ModelManager.instance.modelUser.coin+""},ToIOS.callFunc("info",function(t){},s);else if("ios_tw"==ConfigApp.pf||"ios"==ConfigApp.pf||"ios_hk"==ConfigApp.pf)(s=Platform.toFacebook(i,e))&&ToIOS.callFunc("savePlayerInfo",function(t){},s);else if("h5_yyjh"==ConfigApp.pf||"h5_yyjh2"==ConfigApp.pf||"jj_h5_yyjh"==ConfigApp.pf||"h5_yyjh_hk"==ConfigApp.pf)(s=Platform.toYYJH(i))&&Platform.h5_sdk_obj.RoleInfo(s);else if("h5_ch"==ConfigApp.pf)1==i?Platform.h5_sdk_obj.enterGame({serverName:n.zone,serverId:n.zone,roleLevel:n.getLv(),roleName:n.uname,roleId:n.mUID}):2==i&&Platform.h5_sdk_obj.roleLevel({roleLevel:n.getLv()});else if("h5_ch2"==ConfigApp.pf||"jj_h5_ch"==ConfigApp.pf)Platform.h5_sdk_obj.sdk_enterGame(n.zone,n.zone,n.mUID,n.uname);else if("r2g_xm_ios"==ConfigApp.pf||"r2g_kr_ios"==ConfigApp.pf)(s=Platform.toR2GameAppsFlyer(i,e))&&ToIOS.callFunc("savePlayerInfo",null,s);else if("r2g_kr2_ios"==ConfigApp.pf)s=<any>{type:i+"",uid:Platform.pf_login_data.uid+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:n.mUID_merge,role_name:n.uname,role_level:n.getLv()+"",role_create_time:Math.floor(.001*Tools.getTimeStamp(n.add_time))+"",total_recharge_amount:n.pay_money+"",title:n.office+"",gold:n.coin+"",sliver_coin:n.gold+"",food:n.food+"",wood:n.wood+"",stone:n.iron+""},ToIOS.callFunc("savePlayerInfo",null,s),1==i&&(ConfigServer.system_simple.open_client&&1==ConfigServer.system_simple.open_client&&ToIOS.callFunc("openLounge1",null,null),sg.guide.model.GuideChecker.instance.off("newplayer_guide_over",null,Platform.endNewPlayerGuide),sg.guide.model.GuideChecker.instance.on("newplayer_guide_over",null,Platform.endNewPlayerGuide));else if("cb_ios_r2"==ConfigApp.pf||"cb_ios_r2_hk"==ConfigApp.pf)s=<any>{type:i+"",uid:Platform.pf_login_data.uid+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone),role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,role_level:ModelManager.instance.modelUser.getLv()+"",role_create_time:Math.floor(.001*Tools.getTimeStamp(ModelManager.instance.modelUser.add_time))+"",total_recharge_amount:ModelManager.instance.modelUser.pay_money+"",title:ModelManager.instance.modelUser.office+"",gold:ModelManager.instance.modelUser.coin+"",sliver_coin:ModelManager.instance.modelUser.gold+"",food:ModelManager.instance.modelUser.food+"",wood:ModelManager.instance.modelUser.wood+"",stone:ModelManager.instance.modelUser.iron+""},ToIOS.callFunc("savePlayerInfo",null,s),1==i&&(ConfigServer.system_simple.open_client&&1==ConfigServer.system_simple.open_client&&ToIOS.callFunc("openLounge1",null,null),sg.guide.model.GuideChecker.instance.off("newplayer_guide_over",null,Platform.endNewPlayerGuide),sg.guide.model.GuideChecker.instance.on("newplayer_guide_over",null,Platform.endNewPlayerGuide));else if("cb_ios_fy_hk"==ConfigApp.pf)s=<any>{type:i+"",user_id:n.accountId,role_id:n.mUID_merge,role_name:n.uname,role_level:n.getLv()+"",server_id:n.zone,server_name:ConfigServer.getServerName(n.zone)},ToIOS.callFunc("savePlayerInfo",null,s);else if("jj_h5_twyx"==ConfigApp.pf||"h5_twyx"==ConfigApp.pf||"h5_twyx2"==ConfigApp.pf||"h5_twyx3"==ConfigApp.pf||"h5_twyx5"==ConfigApp.pf||"h5_twyx4"==ConfigApp.pf||"cb_h5_twyx1"==ConfigApp.pf||"cb_h5_twyx2"==ConfigApp.pf){
        Platform.h5_sdk_url_data=o;
        var u={1e3:1,1:3,2:4}[i],d: any =<any>{dataType:u,appid:o.appid,serverID:n.zone,serverName:ConfigServer.getServerName(n.zone),userId:o.uid,roleID:n.mUID_base,roleName:n.uname,roleLevel:n.getLv(),moneyNum:n.coin,role_create_time:Math.floor(.001*Tools.getTimeStamp(n.add_time)),fight:0,role_career:"",role_sex:1,vip_level:0};
        u&&Platform.h5_sdk_obj.reportUserInfo(d),1e3==i&&(d.dataType=2,Platform.h5_sdk_obj.reportUserInfo(d))
    }else if("h5_7k"===ConfigApp.pf||"jj_h5_7k"===ConfigApp.pf)Platform.h5_sdk_url_data=o,1===i&&Platform.h5_sdk_obj.RoleInfo({serverid:n.zone,servername:n.zone+"",roleid:n.mUID,rolename:n.uname,rolelevel:n.getLv(),appkey:"h5_7k"===ConfigApp.pf?"f0cab6ba16c0436702f896fe3c6632dc":"46fc1a6626a6d2317893b8cb8ebde833",account:o.userid});else if("h5_leyou"===ConfigApp.pf||"jj_h5_leyou"==ConfigApp.pf){
        Platform.h5_sdk_url_data=o;
        var _=ConfigApp.get_data_report();
        0==i?(_+=StringUtil.substitute("user/role?userid={0}&username={1}&appkey={2}&banid={3}&servername={4}&roleid={5}&rolename={6}",[o.userid,o.username,o.appkey,o.banid,String(n.zone),n.mUID,n.uname]),(<any>NetHttp.instance).getRequest(_)):2===i&&(_+=StringUtil.substitute("user/level?userid={0}&username={1}&appkey={2}&banid={3}&servername={4}&roleid={5}&rolename={6}&level={7}",[o.userid,o.username,o.appkey,o.banid,String(n.zone),n.mUID,n.uname,n.getLv()]),(<any>NetHttp.instance).getRequest(_))
    }else if("h5_1377"===ConfigApp.pf){
        Platform.h5_sdk_url_data=o;
        var g={0:1,1:3,2:4,6:5}[i];
        g&&Platform.h5_sdk_obj.report_user_action({type:g,gameId:o.appid,serverId:n.zone,serverName:String(n.zone),uid:o.uid,roleId:n.mUID,roleName:n.uname,roleLevel:n.getLv(),money:n.coin}),0==i&&Platform.h5_sdk_obj.report_user_action({type:2,gameId:o.appid,serverId:n.zone,serverName:String(n.zone),uid:o.uid,roleId:n.mUID,roleName:n.uname,roleLevel:n.getLv(),money:n.coin})
    }else if("h5_360_2"===ConfigApp.pf)Platform.h5_sdk_obj.getUserInfo().then(function(e){
        var s=Tools.getTimeStamp(n.add_time);
        1===i?Platform.h5_sdk_obj.logRoleLogin(e.plat_user_id,n.mUID,n.zone,n.uname,n.getLv()):0===i&&Platform.h5_sdk_obj.logRoleCreation(e.plat_user_id,n.mUID,n.zone,n.uname,n.getLv(),s);
        var h: any =<any>{plat_user_id:e.plat_user_id,roleid:n.mUID,server_id:n.zone,server_name:String(n.zone),level:n.getLv(),power:0,rolename:n.uname,createTime:s};
        0!==i&&2!==i&&3!==i||Platform.h5_sdk_obj.logRoleInfo(h);
        var o: any =<any>{0:"role_create",1:"role_login",2:"role_update"};
        o[i]&&Platform.h5_sdk_obj.pushRoleInfo(o[i],h)
    }).catch(function(t){
        console.warn&&console.warn(t)
    });else if("h5_360_3"===ConfigApp.pf){
        var f: any =<any>{0:1,1:3,2:4,6:5};
        f[i]&&Platform.h5_sdk_obj.reportRoleStatus({datatype:f[i],serverid:n.zone,servername:String(n.zone),roleid:n.mUID,rolename:n.uname,rolelevel:n.getLv(),fightvalue:0,moneynum:n.coin}),0==i&&(Platform.h5_sdk_obj.reportRoleStatus({datatype:2,serverid:n.zone,servername:String(n.zone),roleid:n.mUID,rolename:n.uname,rolelevel:n.getLv(),fightvalue:0,moneynum:n.coin}),(<any>sg.zmPlatform.ConstantZM).reportCreateRole())
    }else if("h5_muzhi"===ConfigApp.pf||"h5_muzhi2"===ConfigApp.pf)Platform.h5_sdk_obj.uploadRole({u:o.userId,g:o.gameId,s:n.zone,sn:String(n.zone),r:n.mUID,rn:n.uname,rl:n.getLv(),cn:n.pay_money,rvl:"0"});else if("r2g_kr_h5"===ConfigApp.pf)0===i&&Browser.window.parent.postMessage({action:"createRole",server:n.zone,role:n.uname,roleid:n.mUID,level:n.getLv()},"*"),1===i&&Browser.window.parent.postMessage({action:"gameLogin",server:n.zone,role:n.uname,roleid:n.mUID,level:n.getLv()},"*");else if("h5_hutao"===ConfigApp.pf||"h5_hutao2"===ConfigApp.pf){
        var p: any =<any>{0:1,1:-1===n.country?0:2,2:3,6:4},v=ModelManager.instance.modelUser.accountId;
        v.length&&p[i]&&Platform.h5_sdk_obj.role({uid:v[0],server_id:String(n.zone),server_name:String(n.zone),role_id:String(n.mUID),role_name:n.uname,role_level:n.getLv(),update_time:Math.floor(ConfigServer.getServerTimer()/1e3),type:p[i]}),1==i&&Platform.h5_sdk_obj.selectServer({uid:v[0],server_id:String(n.zone),server_name:String(n.zone),timestamp:Math.round(ConfigServer.getServerTimer()/1e3)})
    }else if("h5_6kw"===ConfigApp.pf||"h5_6kw2"==ConfigApp.pf||"h5_6kw3"==ConfigApp.pf){
        ({0:"1",1:"1",2:"1"})[i]&&Platform.h5_sdk_obj.CallParentMethods("role",{serverId:n.zone,serverName:String(n.zone),roleID:n.mUID,roleName:n.uname,roleLevel:n.getLv(),payLevel:"1",desc:""})
    }else if("h5_changwan"===ConfigApp.pf){
        ({1:"1"})[i]&&Platform.h5_sdk_obj.sdk_enterGame(String(n.zone),String(n.zone),String(n.mUID),n.uname)
    }else if("h5_shouqu"===ConfigApp.pf)0===i&&Platform.h5_sdk_obj.roleCreated({server_id:String(n.zone),server_name:h,role_id:n.mUID,role_name:n.uname}),1===i&&(Platform.h5_sdk_obj.gameLoad("finish"),Platform.h5_sdk_obj.serverSelected({server_id:String(n.zone),server_name:h})),2===i&&Platform.h5_sdk_obj.roleLevelUp({server_id:String(n.zone),server_name:h,role_id:n.mUID,role_name:n.uname,level:n.getLv()});else if("changxiang"===ConfigApp.pf){
        var y: any =<any>{0:"createrole",1:"entergame",2:"roleupgrade"};
        y[i]&&Platform.h5_sdk_obj.reportRoleInfo({roleId:String(n.mUID),roleName:n.uname,roleLevel:n.getLv(),serverId:String(n.zone),serverName:h,roleVip:0,rolePower:0,roleGold:0,roleDiamond:n.coin,reportType:y[i]})
    }
    }

    /** 原文：t.uploadActionData=function(i,e)，字节 [377442,383524) */
    public static uploadActionData(i: any, e: any): any {
    var s=null;
    if(Platform.h5_sdk)Platform.h5_sdk.logAction(i,e);else if(ConfigApp.releaseWeiXin())ConfigApp.pf==MiniAdpter.window.game37_pf&&10007==i&&Platform.pf_login_data.loginReport();else if(ConfigApp.onAndroid())if("ad_37_jp"!=ConfigApp.pf&&"ad_37_kr"!=ConfigApp.pf&&"os_37_kr"!=ConfigApp.pf&&"ad_37_tw"!=ConfigApp.pf&&"cb_ad_37_kr"!=ConfigApp.pf&&"cb_os_37_kr"!=ConfigApp.pf||(s=<any>{type:i+""},1==i?s.progress=e[0]+"":2==i?s.index=e[0]+"":3==i?s.channel=e[0]+"":4==i&&(s.index=e[0]+""),ToJava.saveActionInfo(s,null)),"cb_ad_just4fun"==ConfigApp.pf)s=<any>{type:i+""},1==i?s.progress=e[0]+"":2==i?s.index=e[0]+"":3==i?s.channel=e[0]+"":4==i&&(s.index=e[0]+""),ToJava.saveActionInfo(s,null);else if("jj_junhai_gg"==ConfigApp.pf||"jj_junhai_os"==ConfigApp.pf)s=<any>{type:i+""},4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":8==i&&(s.key=e[0]+""),ToJava.saveActionInfo(s,null);else if("muyou_ad_tl"==ConfigApp.pf||"muyou_hw_tl"==ConfigApp.pf){
        if(s=<any>{type:i+""},10==i){
            var n=e[2];
            "guide_talk004"==n||"new_guide_talk004"==n?s.event="fmvopc":"guide_talk008"==n||"new_guide_talk008"==n?s.event="492hoi":"guide_talk011"==n||"new_guide_talk011"==n?s.event="olx31i":"guide_talk028"==n?s.event="v3tekb":"guide_talk033"==n&&(s.event="60d3o1")
        }
        ToJava.saveActionInfo(s,null)
    }else if("indofun_gg"==ConfigApp.pf||"indofun_oppo"==ConfigApp.pf)s=<any>{type:i+""},1==i?s.progress=e[0]+"":(2==i||4==i)&&(s.index=e[0]+""),ToJava.saveActionInfo(s,null);else if("cb_yuanqu_gg"==ConfigApp.pf)s=<any>{type:i+""},e&&(s.params=e),ToJava.saveActionInfo(s,null);else if("cb_google"==ConfigApp.pf||"cb_google1"==ConfigApp.pf){
        if(s=<any>{type:i+""},0==i)s.event_tokens=["4u6y78"];else if(1==i||10002==i){
            var h=e[0];
            !Platform.isUpdateResoueceBegin&&h<.3?(Platform.isUpdateResoueceBegin=!0,1==i?s.event_tokens=["f34z8w"]:10002==i&&(s.event_tokens=["nmudhd","f34z8w"])):!Platform.isUpdateResouece30per&&h>=.3&&h<.6?(Platform.isUpdateResouece30per=!0,1==i?s.event_tokens=["ox4xeu"]:10002==i&&(s.event_tokens=["8s1u28","ox4xeu"])):!Platform.isUpdateResouece60per&&h>=.6&&h<1?(Platform.isUpdateResouece60per=!0,1==i?s.event_tokens=["4ll2b7"]:10002==i&&(s.event_tokens=["b1mq9c","4ll2b7"])):Platform.isUpdateResoueceEnd||1!=h||(Platform.isUpdateResoueceEnd=!0,1==i?s.event_tokens=["ru53z8"]:10002==i&&(s.event_tokens=["1m7txv","ru53z8"]))
        }else 9==i?s.event_tokens=["n75if2"]:300==i?s.event_tokens=["v1jmhv"]:304==i?s.event_tokens=["c147o8"]:1e4==i?s.event_tokens=["1ptuq2"]:10001==i?s.event_tokens=["v26767"]:10003==i?s.event_tokens=["cthr2u"]:10004==i?s.event_tokens=["5g59kq"]:10005==i?s.event_tokens=["460fs7"]:10006==i?s.event_tokens=["e6vo0w"]:10008==i?s.event_tokens=["ikfsc8"]:10010==i&&(s.event_tokens=["4cei2h"]);
        ToJava.saveActionInfo(s,null)
    }else"muyou_ad_vn2"==ConfigApp.pf?(s=<any>{},17==i&&"chapter_5"==e[0]?ConfigServer.getServerTimer()-Tools.getTimeStamp(ModelManager.instance.modelUser.add_time)<=864e5&&(s=<any>{aj_key:"yz8cfc",fb_key:"h24_chapter5"}):4==i&&1==e[0]?ConfigServer.getServerTimer()-Tools.getTimeStamp(ModelManager.instance.modelUser.add_time)<=1296e5&&(s=<any>{aj_key:"boyadq",fb_key:"h36_dafu"}):25==i&&"406"==e[0]&&ConfigServer.getServerTimer()-Tools.getTimeStamp(ModelManager.instance.modelUser.add_time)<=1728e5&&(s=<any>{aj_key:"31imxa",fb_key:"h48_mf"}),2==ObjectUtil.keys(s).length&&ToJava.callMethod("uploadEventKey",s,null)):"cb_muyou_ad_vn"==ConfigApp.pf||"cb_muyou_ad_vn1"==ConfigApp.pf||"cb_muyou_ad_vn2"==ConfigApp.pf?(s=<any>{type:i+""},e&&(s.params=e),ToJava.saveActionInfo(s,null)):"r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf?(s=<any>{type:i+""},4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":17==i?s.chapter=e[0]:30==i?(s.kind=e[0],s.task_id=e[1]):33==i&&(s.bid=e[0]),ToJava.saveActionInfo(s,null),"r2g_kr2_gg"==ConfigApp.pf&&4==i&&1==e[0]&&ToJava.callMethod("rateAppInGooglePlay",null,null)):"cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf||"cb_ad_r2_hk"==ConfigApp.pf?(s=<any>{type:i+""},1==i||10002==i?(h=e[0],!Platform.isUpdateResoueceBegin&&h<.3?(Platform.isUpdateResoueceBegin=!0,s.status="start"):Platform.isUpdateResoueceEnd||1!=h?s.status="other":(Platform.isUpdateResoueceEnd=!0,s.status="end")):2==i||4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":17==i?s.chapter=e[0]:30==i?(s.kind=e[0],s.task_id=e[1]):33==i&&(s.bid=e[0]),ToJava.saveActionInfo(s,null),"cb_ad_r2_gg"==ConfigApp.pf&&4==i&&1==e[0]&&(ToJava.callMethod("rateAppInGooglePlay",null,null),NetHttp.instance.send("user_zone.cb_r2g_send_gift",{uid:ModelManager.instance.modelUser.mUID,zone:ModelManager.instance.modelUser.zone},null))):"cb_ad_37_cn"==ConfigApp.pf&&9==i&&(s=<any>{type:i+"",server_id:sg.model.ModelPlayer.recommendServer,server_name:ConfigServer.getServerName(sg.model.ModelPlayer.recommendServer)},ToJava.saveActionInfo(s,null));else"ios_37_jp"==ConfigApp.pf||"ios_37_kr"==ConfigApp.pf||"ios_37_tw"==ConfigApp.pf||"cb_ios_37_kr"==ConfigApp.pf?(s=<any>{type:i+""},1==i?s.progress=e[0]+"":2==i?s.index=e[0]+"":3==i?s.channel=e[0]+"":4==i&&(s.index=e[0]+""),ToIOS.callFunc("saveActionInfo",function(t){},s)):"jj_junhai_ios"==ConfigApp.pf?(s=<any>{type:i+""},4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":8==i&&(s.key=e[0]+""),ToIOS.callFunc("saveActionInfo",function(t){},s)):"indofun_ios"==ConfigApp.pf?(s=<any>{type:i+""},1==i?s.progress=e[0]+"":(2==i||4==i)&&(s.index=e[0]+""),ToIOS.callFunc("saveActionInfo",function(t){},s)):"cb_muyou_ios_vn"==ConfigApp.pf?(s=<any>{type:i+""},e&&(s.params=e),ToIOS.callFunc("saveActionInfo",function(t){},s)):"cb_yuanqu_ios"==ConfigApp.pf?(s=<any>{},9==i?(s.adjust="a04ufi",s.facebook="sss"):304==i?s.adjust="u9d79c":17==i&&"chapter_1"==e[0]&&(s.adjust="z2trw5"),ToIOS.callFunc("saveActionInfo",function(t){},s)):"r2g_kr2_ios"==ConfigApp.pf?(s=<any>{type:i+""},4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":17==i?s.chapter=e[0]:30==i?(s.kind=e[0],s.task_id=e[1]):33==i&&(s.bid=e[0]),ToIOS.callFunc("saveActionInfo",null,s),4==i&&1==e[0]&&(ToIOS.callFunc("rateAppInAppStore",null,null),NetHttp.instance.send("user_zone.cb_r2g_send_gift",{uid:ModelManager.instance.modelUser.mUID,zone:ModelManager.instance.modelUser.zone},null))):"cb_ios_r2"==ConfigApp.pf?(s=<any>{type:i+""},1==i||10002==i?(h=e[0],!Platform.isUpdateResoueceBegin&&h<.3?(Platform.isUpdateResoueceBegin=!0,s.status="start"):Platform.isUpdateResoueceEnd||1!=h?s.status="other":(Platform.isUpdateResoueceEnd=!0,s.status="end")):4==i?s.index=e[0]+"":7==i?s.day=e[0]+"":17==i&&(s.chapter=e[0]),ToIOS.callFunc("saveActionInfo",null,s),4==i&&1==e[0]&&(ToIOS.callFunc("rateAppInAppStore",null,null),NetHttp.instance.send("user_zone.cb_r2g_send_gift",{uid:ModelManager.instance.modelUser.mUID,zone:ModelManager.instance.modelUser.zone},null))):"cb_ios_37_cn"!=ConfigApp.pf&&"ios_37_wx2"!=ConfigApp.pf||(s=<any>{type:i+""},9==i&&(s.server_id=sg.model.ModelPlayer.recommendServer,s.server_name=ConfigServer.getServerName(sg.model.ModelPlayer.recommendServer),ToIOS.callFunc("saveActionInfo",function(t){},s)))
    }

    /** 原文：t.toChaohua=function(i)，字节 [383525,383968) */
    public static toChaohua(i: any): any {
    var e: any =<any>{},s=ModelManager.instance.modelUser,n=Math.floor(.001*ConfigServer.getServerTimer());
    return e.type=i,e.ServerID=s.zone,e.ServerName=s.zone,e.RoleID=s.mUID,e.RoleName=s.uname,e.RoleLevel=s.getLv(),e.GameBalance=s.coin,e.VipLevel="0",e.PartyName="无",e.RoleCreateTime=n,e.PartyId="",e.GameRoleGender=Platform.pf_login_data.channelId,e.GameRolePower="",e.PartyRoleId="",e.PartyRoleName="",e.ProfessionId="",e.Profession="",e.Friendlist="",e
    }

    /** 原文：t.toYYJH=function(t)，字节 [383969,384443) */
    public static toYYJH(t: any): any {
    var i=null;
    if(1==t){
        i=<any>{};
        var e=ModelManager.instance.modelUser,s=(ConfigServer.getServerTimer(),Tools.getURLexpToObj(ConfigApp.url_params)),n=["3866c245e0791eaabc84a49efe2d0ef2","09fe331c3dc8a3d5a10d05345f1b7e17","f3c9a6e058f9e6b12f380366583a96b1","686daecfb67ed9f0cb51e5188de2f31b"][["h5_yyjh","h5_yyjh2","jj_h5_yyjh","h5_yyjh_hk"].indexOf(ConfigApp.pf)];
        i.serverid=e.zone,i.servername=e.zone,i.roleid=e.mUID,i.rolename=e.uname,i.rolelevel=e.getLv(),i.appkey=n,i.account=s.userid
    }
    return i
    }

    /** 原文：t.getGameUserData1=function()，字节 [384444,384778) */
    public static getGameUserData1(): any {
    var t: any =<any>{},i=ModelManager.instance.modelUser;
    return t.roleId=i.mUID+"",t.roleName=i.uname+"",t.roleLevel=i.getLv()+"",t.serverId=i.zone+"",t.serverName=ConfigServer.getServerName(i.zone),t.balance=i.coin+"",t.vipLevel="0",t.partyName=(i.guild_id?i.guild_id:"无")+"",t.extra="0",t.timeRoleCreate="-1",t.timeRoleUpgrade="-1",t
    }

    /** 原文：t.getGameUserData2=function()，字节 [384779,385081) */
    public static getGameUserData2(): any {
    var t: any =<any>{},i=ModelManager.instance.modelUser;
    return t.roleId=i.mUID+"",t.roleName="",t.roleLevel=i.getLv()+"",t.serverId=i.zone+"",t.serverName="",t.vipLevel="0",t.roleFightValue=Tools.getDictLength(i.hero)+"",t.roleProfession="",t.rolePayTotal="",t.roleCoin1=i.coin+"",t.roleCoin2="",t
    }

    /** 原文：t.getGameUserData3=function()，字节 [385082,385212) */
    public static getGameUserData3(): any {
    var t=[],i=ModelManager.instance.modelUser;
    return t.push(i.zone+""),t.push(i.getLv()+""),t.push(i.uname+""),t
    }

    /** 原文：t.getGameUserDataOPPO=function()，字节 [385213,385373) */
    public static getGameUserDataOPPO(): any {
    var t=[],i=ModelManager.instance.modelUser;
    return t.push(i.mUID+""),t.push(i.uname+""),t.push(i.getLv()),t.push(i.zone+""),t.push("1"),t
    }

    /** 原文：t.getGameUserDataUC=function()，字节 [385374,385569) */
    public static getGameUserDataUC(): any {
    var t: any =<any>{},i=ModelManager.instance.modelUser;
    return t.id=i.mUID,t.name=i.uname,t.lv=i.getLv(),t.time=Math.floor(.001*Tools.getTimeStamp(i.add_time)),t.zid=i.zone,t.zname=i.zone,t
    }

    /** 原文：t.getGameUserDataPay=function(t)，字节 [385570,385880) */
    public static getGameUserDataPay(t: any): any {
    var i: any =<any>{};
    ModelManager.instance.modelUser;
    return i.orderInfo=t,i.amt=t.amt+"",i.roleName=t.role_name+"",i.roleLevel=t.role_level+"",i.roleId=t.role_id+"",i.channel=t.server_id+"",i.channelName=t.server_name+"",i.subject=t.app_subject+"",i.orderNo=t.app_order_no+"",i.extra=t.app_ext+"",i
    }

    /** 原文：t.getGameUserDataPay2=function(t,i)，字节 [385881,386365) */
    public static getGameUserDataPay2(t: any, i: any): any {
    var e=[],s=(ModelManager.instance.modelUser,t.cfg,<any>{}),n=ConfigServer.system_simple.pay[ConfigApp.pf];
    s.productNo=n[t.pid],e.push(n[t.pid]),s.applicationID=sg.sdks.Huawei.getAppID(),e.push(sg.sdks.Huawei.getAppID());
    var h=t.uid+"A"+ConfigServer.getServerTimer();
    return s.requestId=h,e.push(h),s.merchantId=sg.sdks.Huawei.getMerchantId(),e.push(sg.sdks.Huawei.getMerchantId()),e.push("X6"),e.push(sg.sdks.Huawei.getCpName()),s.sdkChannel=3,e.push("3"),s.url=sg.sdks.Huawei.getCallBackURL(),e.push(sg.sdks.Huawei.getCallBackURL()),s.urlver="2",e.push("2"),e.push(i),[s,e]
    }

    /** 原文：t.getPayByHuaWei=function(t,i)，字节 [386366,386914) */
    public static getPayByHuaWei(t: any, i: any): any {
    var e: any =<any>{},s: any =<any>{},n=t.cfg,h=t.uid+"A"+ConfigServer.getServerTimer();
    return s.productName=e.productName=Tools.getMsgById("coin_name"),s.productDesc=e.productDesc="游戏内使用",s.applicationID=e.applicationID=sg.sdks.Huawei.getAppID(),s.requestId=e.requestId=h,s.amount=e.amount=n[0]+".00",s.merchantId=e.merchantId=sg.sdks.Huawei.getMerchantId(),s.serviceCatalog="X6",s.merchantName=sg.sdks.Huawei.getCpName(),s.sdkChannel=e.sdkChannel=3,s.url=e.url=sg.sdks.Huawei.getCallBackURL(),s.currency=e.currency="CNY",s.country=e.country="CN",s.urlver=e.urlver="2",s.extReserved=i,[s,e]
    }

    /** 原文：t.getPayByHuaWei_tw=function(t,i)，字节 [386915,387466) */
    public static getPayByHuaWei_tw(t: any, i: any): any {
    var e: any =<any>{},s: any =<any>{},n=t.cfg,h=t.uid+"A"+ConfigServer.getServerTimer();
    return s.productName=e.productName=Tools.getMsgById("coin_name"),s.productDesc=e.productDesc="游戏内使用",s.applicationID=e.applicationID=sg.sdks.Huawei.getAppID(),s.requestId=e.requestId=h,s.amount=e.amount=n[0]+".00",s.merchantId=e.merchantId=sg.sdks.Huawei.getMerchantId(),s.serviceCatalog="X6",s.merchantName=sg.sdks.Huawei.getCpName(),s.sdkChannel=e.sdkChannel=3,s.url=e.url=sg.sdks.Huawei.getCallBackURL(),s.currency=e.currency="CNY",s.country=e.country="CN",s.urlver=e.urlver="2",s.extReserved=i,[s,e]
    }

    /** 原文：t.getPayListInfo=function()，字节 [387467,388506) */
    public static getPayListInfo(): any {
    if("hw_tw"==ConfigApp.pf){
        var i: any =<any>{};
        i.applicationID=sg.sdks.Huawei.getAppID(),i.merchantId=sg.sdks.Huawei.getMerchantId(),i.requestId=ConfigServer.getServerTimer()+"";
        var e=ConfigServer.system_simple.pay[ConfigApp.pf],s="";
        for(var n in e)s+=e[n]+"|";
        i.productNos=s.substr(0,s.length-1),ToJava.callMethod("getPayList",i,Handler.create(null,function(i,e){
            Platform.pay_list_info=i
        }))
    }else if("cb_yuanqu_gg"==ConfigApp.pf){
        var h=ConfigServer.system_simple.pay[ConfigApp.pf],o=[];
        for(var r in h)o.push(h[r]);
        ToJava.callMethod("getPayList",o,Handler.create(null,function(i,e){
            Platform.pay_list_info=i
        }))
    }else"r2g_kr2_gg"==ConfigApp.pf||"r2g_kr2_os"==ConfigApp.pf||"r2g_kr2_ss"==ConfigApp.pf?ToJava.callMethod("showVIPPicture",null,Handler.create(null,function(t){
        ViewManager.instance.showVIPPicture()
    },null,!1)):"r2g_kr2_ios"==ConfigApp.pf?ToIOS.callFunc("showVIPPicture",function(t){
        ViewManager.instance.showVIPPicture()
    },null):"cb_ad_r2_gg"==ConfigApp.pf||"cb_ad_r2_os"==ConfigApp.pf||"cb_ad_r2_ss"==ConfigApp.pf?ToJava.callMethod("showVIPPicture",null,Handler.create(null,function(t){
        ViewManager.instance.showVIPPicture()
    },null,!1)):"cb_ios_r2"==ConfigApp.pf&&ToIOS.callFunc("showVIPPicture",function(t){
        ViewManager.instance.showVIPPicture()
    },null)
    }

    /** 原文：t.toR2GameAppsFlyer=function(i,e)，字节 [388507,388956) */
    public static toR2GameAppsFlyer(i: any, e: any): any {
    var s: any =<any>{},n=!1,h=!1;
    if(0==i)s.event="event_create";else if(1==i){
        s.event="event_login",n=!0,h=ModelManager.instance.modelUser.getMyHeroArr().length<1
    }else if(2==i){
        var o=e[0];
        s.event="event_update",s.lv=o
    }else s=null;
    return n&&(s.uid=Platform.pf_login_data.uid+"",s.roleid=ModelManager.instance.modelUser.mUID+"",s.rolename=ModelManager.instance.modelUser.uname,s.rolelv=ModelManager.instance.modelUser.getLv()+"",s.sid=ModelManager.instance.modelUser.zone+"",s.isnew=h),s
    }

    /** 原文：t.toYou77=function(i,e)，字节 [388957,389246) */
    public static toYou77(i: any, e: any): any {
    var s: any =<any>{},n=ModelManager.instance.modelUser;
    return 0==i||1==i||2==i||1e3==i||2e3==i?(s.type=i+"",s.server_id=n.zone,s.server_name=n.zone,s.role_id=n.mUID+"",s.role_name=n.uname,s.level=n.getLv()+"",s.vip="0",s.token=Platform.pf_login_data.token_string,2e3==i&&(s.day=e[0])):s=null,s
    }

    /** 原文：t.to6KW=function(i,e)，字节 [389247,389691) */
    public static to6KW(i: any, e: any): any {
    var s: any =<any>{},n=ModelManager.instance.modelUser;
    return 0==i||1==i||2==i?(0==i?s.data_type="2":1==i?s.data_type="3":2==i&&(s.data_type="4"),s.user_id=Platform.pf_login_data.user_id+"",s.user_name=Platform.pf_login_data.user_name,s.role_id=n.mUID+"",s.role_name=n.uname,s.role_level=n.getLv()+"",s.role_ctime=Math.floor(.001*Tools.getTimeStamp(n.add_time)),s.pay_level="0",s.server_id=n.zone,s.server_name=ConfigServer.getServerName(n.zone),s.extension=""):s=null,s
    }

    /** 原文：t.toPanbao=function(t,i)，字节 [389692,389979) */
    public static toPanbao(t: any, i: any): any {
    var e: any =<any>{},s=ModelManager.instance.modelUser;
    return 0==t||1==t||2==t?(0==t?e.op_type="1":1==t?e.op_type="2":2==t&&(e.op_type="3"),e.role_id=s.mUID+"",e.role_name=s.uname,e.role_level=s.getLv()+"",e.server_id=s.zone,e.server_name=ConfigServer.getServerName(s.zone),e.vip="0"):e=null,e
    }

    /** 原文：t.toFacebook=function(t,i)，字节 [389980,390754) */
    public static toFacebook(t: any, i: any): any {
    var e: any =<any>{},s=ModelManager.instance.modelUser;
    if(e.testV=2019,0==t)e.eventId="6u2cny",e.type="create",e.uid=s.mUID,e.sid=s.zone,e.ms=ConfigServer.getServerTimer(),e.pf=ConfigApp.pf_channel,e.upload_pf=ConfigApp.pf;else if(1==t)e.eventId="413fx8",e.type="login",e.uid=s.mUID,e.sid=s.zone,e.ms=ConfigServer.getServerTimer(),e.pf=ConfigApp.pf_channel,e.upload_pf=ConfigApp.pf;else if(2==t){
        e.type="update",e.uid=s.mUID,e.sid=s.zone,e.ms=ConfigServer.getServerTimer(),e.pf=ConfigApp.pf_channel,e.upload_pf=ConfigApp.pf;
        var n=i?i[0]:0;
        3==n?e.eventId="7af5ck":5==n?e.eventId="ge4h0z":10==n?e.eventId="4gew71":15==n?e.eventId="ldp60l":e=null
    }else 5==t?(e.eventId="5spd5s",e.type="pay_success_event",e.money=i?i[0]:0,e.moneyType="CNY",e.uid=s.mUID,e.sid=s.zone,e.ms=ConfigServer.getServerTimer(),e.pf=ConfigApp.pf_channel,e.upload_pf=ConfigApp.pf):e=null;
    return e
    }

    /** 原文：t.endNewPlayerGuide=function()，字节 [390755,390915) */
    public static endNewPlayerGuide(): any {
    "cb_ios_r2"==ConfigApp.pf||"r2g_kr2_ios"==ConfigApp.pf?ToIOS.callFunc("endNewPlayerGuide",null,null):ToJava.callMethod("endNewPlayerGuide",null,null)
    }

    /** 原文：t.getGameUserDataJUEDI=function(i,e)，字节 [390916,391567) */
    public static getGameUserDataJUEDI(i: any, e: any): any {
    var s=[],n=ModelManager.instance.modelUser,h=null,o=Math.floor(.001*ConfigServer.getServerTimer()),r=Math.floor(.001*Tools.getTimeStamp(n.add_time));
    (h=Platform.pf_login_data.data?JSON.parse(Platform.pf_login_data.data):Platform.pf_login_data)&&h.channel_openid&&(s.push(h.channel_openid),s.push(h.user_id));
    var a=n.getLv();
    s.push(n.mUID),s.push(n.uname),s.push(a+""),s.push(n.zone+""),s.push(n.zone+""),s.push(0),s.push(n.coin),s.push(r);
    var l=0;
    if(0==i?l=1:1==i?l=2:2==i?l=3:4==i&&(l=4),s.push(l),s.push(o),3==l)s.push(a-1),s.push(a),s.push(o);else if(4==l&&e){
        s.push(o),s.push(e[0]);
        var c=e[0]-e[1];
        s.push(Math.abs(c)),s.push(c>0?2:1),s.push("")
    }
    return s
    }

    /** 原文：t.checkGameStatus=function(t)，字节 [391568,391599) */
    public static checkGameStatus(t: any): any {}

    /** 原文：t.other_fun=function(t)，字节 [391600,391661) */
    public static other_fun(t: any): any {
    ConfigApp.onAndroid()&&ToJava.other_fun(t,null)
    }

    /** 原文：t.shieldFont=function(i,e,s)，字节 [391662,396872) */
    public static shieldFont(i: any, e: any, s: any): any {
    if(void 0===s&&(s=!0),s){
        if(i=sg.manager.FilterManager.instance.nameBan(i),-1!=(i=sg.manager.FilterManager.instance.wordBan(i)).indexOf("*"))return void ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"));
        var n=Tools.langData,h=0,o=0,r=0,a=[];
        if(n.forEach(function(t){
            var e=t[0],s=t[1],n=t[2],l=t[3]*n;
            h=l>h?l:h;
            var c=new RegExp("["+s+"]","gm");
            0===s.length&&(c=/\S/gm);
            var u=(i.match(c)||[]).length;
            o+=u*n,r+=u,a.push(e)
        }),o>h)return void ViewManager.instance.showTipsTxt(Tools.getMsgById("_lan_3"));
        if(r<i.length){
            var l=a.map(function(t){
                return Tools.getMsgById("_lan_"+t)
            }).join(Tools.getMsgById("_lan2"));
            return void ViewManager.instance.showTipsTxt(Tools.getMsgById("_lan1",[l]))
        }
    }
    var c=ConfigServer.system_simple.third_ban&&-1!==ConfigServer.system_simple.third_ban.indexOf(ConfigApp.pf);
    if("h5_twyx2"===ConfigApp.pf&&!1===s){
        var u=ModelManager.instance.modelUser,d="S"+u.zone,_=Platform.pf_login_data.uid,g=Math.floor(.001*ConfigServer.getServerTimer()),f: any =<any>{gkey:"716",tkey:"10",server_id:d,qid:_,role_id:u.mUID,name:u.uname,type:4,content:i,time:g,ip:u.ip||"210.123.123.123",toqid:"",toname:"",sign:sg.utils.MD5.md5("716"+d+_+g+"b4c44397e3416d0587985fb08b67")};
        (<any>NetHttp.instance).postRequest("https://apichat.693975.com/index.php",Platform.sortObjkeyToString(f))
    }
    if(Platform.h5_sdk)Platform.h5_sdk.checkInput(i,e,s);else if(ConfigApp.releaseWeiXin())if(c){
        var p=ConfigServer.getServerTimer()+"",v: any =<any>{game_key:Browser.onAndroid?"ofGkJuxkoLYlgRVt":"CjquiLFFggZKrRSH",nonce:p,timestamp:p},y=Platform.sortObjkeyToString(v)+"ovtgJVHdaDqUXwgBvlKFANBdYpIhdHSi",b=sg.utils.MD5.md5(y);
        v.sign=b.toLowerCase(),(<any>NetHttp.instance).postRequest("https://api.cxgame.net/app/sdk/v1/wx/get-wx-token",Platform.sortObjkeyToString(v),Handler.create(null,function(n){
            Platform.checkMsg("https://qh.ptkill.com/wx_ban/",{token:n.access_token,content:i},e,s)
        }))
    }else if(ConfigApp.pf==MiniAdpter.window.bugu_pf||ConfigApp.pf==MiniAdpter.window.yiyang_pf)MiniAdpter.window.huoSdk.checkMsg({data:{content:i}}).then(function(t){
        var s: any =<any>{platform:"bugu_slg",app_id:MiniAdpter.window.bugu_app_id,account:ModelManager.instance.modelUser.mUID_merge,mg_mem_id:ModelManager.instance.modelUser.http_user_login_data.re_params[ConfigApp.pf].data.mg_mem_id,server_id:ModelManager.instance.modelUser.zone,server_name:ConfigServer.getServerName(ModelManager.instance.modelUser.zone),role_id:ModelManager.instance.modelUser.mUID_merge,role_name:ModelManager.instance.modelUser.uname,type:"0",content:i,msg_time:Math.floor(.001*ConfigServer.getServerTimer())};
        (<any>NetHttp.instance).postRequest("https://h5i.cceuc.com/chat/receive",s,Handler.create(null,function(t){
            1==t.code?e&&e.runWith(i):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
        }),["Content-Type","application/json; charset=utf-8"])
    },function(t){
        ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
    });else if(ConfigApp.pf==MiniAdpter.window.bugu_sg4_pf)MiniAdpter.window.chnsdk.msgSecCheck(i,function(t){
        1==t.state.code&&100==t.data.label?e&&e.runWith(i):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
    });else if(ConfigApp.pf==MiniAdpter.window.zhangwan_pf){
        var I: any =<any>{zw_app_id:"08d55e92b9d4dbe134a3fd36d287d59a",cp_role_id:ModelManager.instance.modelUser.mUID_merge,action_time:Tools.dateFormat(ConfigServer.getServerTimer(),1),context:i,context_type:s?"nick":"chat",user_id:ModelManager.instance.modelUser.mUID_base,ip:ModelManager.instance.modelUser.ip,room_id:ModelManager.instance.modelChat.cur_channel+"",server_id:ModelManager.instance.modelUser.zone,main_game_id:28,open_server_time:Tools.dateFormat(ModelManager.instance.modelUser.gameServerStartTimer,1)},x=Platform.sortObjkeyToString(I)+"$&#@*##%#!*!",w=sg.utils.MD5.md5(x).substring(1,17).toUpperCase();
        (<any>NetHttp.instance).postRequest("https://zyouapi.wozhangwan.com/server/chat/chatRickReport",I,Handler.create(null,function(t){
            console.log("谛听 AI 监控返回结果: "+JSON.stringify(t)),1==t.status_code&&"pass"==t.data.suggestion?MiniAdpter.window.zwsdk.checkMsg({content:i}).then(function(t){
                console.log("ZWSDK 敏感词检测结果: "+JSON.stringify(t)),1==t.status_code&&1==t.data.data.check_result?e&&e.runWith(i):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
            }):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
        }),["Content-Type","application/json","Authorization",w])
    }else e&&e.runWith(i);else if(ConfigApp.releaseDouYin())ConfigApp.pf==TTMiniAdapter.window.tt_bugu_pf?TTMiniAdapter.window.huoSdk.checkMsg({data:{content:i}}).then(function(t){
        e&&e.runWith(i)
    },function(t){
        ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
    }):e&&e.runWith(i);else if("cb_ad_zhangwan"==ConfigApp.pf||"cb_ad_zhangwan1"==ConfigApp.pf||"cb_ad_zhangwan2"==ConfigApp.pf){
        var C: any =<any>{data_id:ModelManager.instance.modelUser.mUID+"_"+ModelManager.instance.modelUser.zone+"_"+ConfigServer.getServerTimer(),context:i,context_type:s?"nick":"chat",token:"BPE72F6JIOQ3W91V",user_id:ModelManager.instance.modelUser.mUID_merge+"",room_id:ModelManager.instance.modelChat.cur_channel+"",area:ModelManager.instance.modelUser.zone+"",role_id:ModelManager.instance.modelUser.mUID+"",ip:ModelManager.instance.modelUser.ip+""};
        (<any>NetHttp.instance).postRequest("https://gtf.ai.xingzheai.cn/v2.0/game_chat_ban/detect_text",C,Handler.create(null,function(t){
            ToJava.log("谛听AI监控返回结果: "+JSON.stringify(t)),0==t.code&&"pass"==t.data.suggestion?e&&e.runWith(i):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005"))
        }),["Content-Type","application/json"])
    }else if(ConfigApp.releaseQQ()&&c)Platform.checkMsg("https://sg3.ptkill.com/qq_ban/",{content:i},e,s);else if("h5_qqdt"!=ConfigApp.pf&&"h5_qqdt2"!=ConfigApp.pf&&"h5_qqdt3"!=ConfigApp.pf&&"cb_h5_qqdt"!=ConfigApp.pf||!c)e&&e.runWith(i);else{
        var k="";
        switch(ConfigApp.pf){case"cb_h5_qqdt":k="https://cbtx.17yqy.cn/qqgame_ban/";break;case"h5_qqdt3":k="https://tengxun.ptkill.com/qqgame_ban/";break;default:k="https://qh.ptkill.com/qqgame_ban/"}
        Platform.checkMsg(k,{content:i,isname:s,openid:sg.model.ModelQQDT.instance.openId,openkey:sg.model.ModelQQDT.instance.openKey,pf:ConfigApp.pf},e,s)
    }
    }

    /** 原文：t.checkMsg=function(t,i,e,s)，字节 [396873,397475) */
    public static checkMsg(t: any, i: any, e: any, s: any): any {
    void 0===s&&(s=!0),(<any>NetHttp.instance).postRequest(t,i,Handler.create(null,function(t){
        var n=t&&(t.errcode||t.errCode);
        "h5_qqdt"==ConfigApp.pf||"h5_qqdt2"==ConfigApp.pf||"h5_qqdt3"==ConfigApp.pf||"cb_h5_qqdt"==ConfigApp.pf?0!=(n=Number(t&&t.ret))?ViewManager.instance.showTipsTxt(Tools.getMsgById("193005")):t&&t.text_result_list_&&t.text_result_cnt_>0?0!=t.text_result_list_[0].check_ret_?ViewManager.instance.showTipsTxt(Tools.getMsgById("193005")):e&&e.runWith(t.text_result_list_[0].result_text_):ViewManager.instance.showTipsTxt(Tools.getMsgById("193005")):87014===n?s&&ViewManager.instance.showTipsTxt(Tools.getMsgById("193005")):e&&e.runWith(i.content)
    }))
    }

    /** 原文：t.sortObjkeyToString=function(t)，字节 [397476,397636) */
    public static sortObjkeyToString(t: any): any {
    var i=[];
    for(var e in t)i.push(e);
    i.sort();
    for(var s=i.length,n="",h=0;h<s;h++)n+="&"+i[h]+"="+t[i[h]];
    return n=n.substring(1)
    }

    /** 原文：t.sortObjkeyToString2=function(t,i)，字节 [397637,397806) */
    public static sortObjkeyToString2(t: any, i: any): any {
    var e=[];
    for(var s in t)e.push(s);
    e.sort();
    for(var n=e.length,h="",o=0;o<n;o++)i&&i.indexOf(e[o])>-1||(h+=e[o]+"="+t[e[o]]);
    return h
    }

    /** 原文：t.changeNameDownFrame=function()，字节 [397807,397934) */
    public static changeNameDownFrame(): any {
    "h5_mengyou"!=ConfigApp.pf&&"h5_mengyou1"!=ConfigApp.pf||Browser.window.parent.postMessage({cmd:"downFrame"},"*")
    }

    /** 原文：t.changeConfigJsonHttpByPf=function(t)，字节 [397935,398301) */
    public static changeConfigJsonHttpByPf(t: any): any {
    var i,e: any =<any>{},s="",n="",h="",o=!1;
    for(var r in"h5_y5"!=ConfigApp.pf&&"h5_wakool"!=ConfigApp.pf&&"dev_hk"!=ConfigApp.pf||(s="hk.ptkill.com",n="zqwz.youxi567.com",h="hk-hztz.wakool.net",o=!0),t)(i=t[r]).indexOf(s)>-1&&o?i=i.replace(s,h):i.indexOf(n)>-1&&o&&(i=i.replace(n,h)),i=i.indexOf("?")>-1?i:i+"?",e[r]=i+(ConfigApp.cfgVersion?ConfigApp.cfgVersion:"");
    return e
    }

    /** 原文：t.checkIndexImgURL=function(i,e)，字节 [398302,398606) */
    public static checkIndexImgURL(i: any, e: any): any {
    ConfigApp.ilimgck&&("h5_37"==ConfigApp.pf||"h5_37_wx1"==ConfigApp.pf||"h5_37_wx2"==ConfigApp.pf||"h5_37_wx3"==ConfigApp.pf||"h5_37_yuewan"==ConfigApp.pf||"cb_h5_37"==ConfigApp.pf)&&Platform.h5_sdk_obj&&Platform.h5_sdk_obj.getLoadImg?Platform.h5_sdk_obj.getLoadImg(function(t){
        t?i(ConfigApp.getURLType((t.indexOf("http")<0?"http:":"")+t)):e()
    }):e()
    }

    /** 原文：t.get37h5_app_ext=function()，字节 [398607,398770) */
    public static get37h5_app_ext(): any {
    var t=Tools.getURLexpToObj(ConfigApp.url_params);
    if(t&&t.app_ext){
        var i=JSON.parse(sg.utils.Base64.decode(t.app_ext));
        if(i)return i.c_game_id+""
    }
    return null
    }

    /** 原文：t.verify=function()，字节 [398771,398819) */
    public static verify(): any {
    Platform.h5_sdk&&Platform.h5_sdk.verify()
    }

    /** 原文：t.syncInvitationData=function()，字节 [398820,399380) */
    public static syncInvitationData(): any {
    if(ConfigServer.system_simple.get_friend&&0!=ConfigServer.system_simple.get_friend.switch&&ModelManager.instance.modelUser.invitation&&ModelManager.instance.modelUser.invitation.master){
        var i: any =<any>{uid:ModelManager.instance.modelUser.mUID,master_uid:ModelManager.instance.modelUser.invitation.master,buildinglv:ModelManager.instance.modelUser.getLv(),money:ModelManager.instance.modelUser.pay_money,pf_data:Platform.pf_login_data,zone:ModelManager.instance.modelUser.zone};
        NetHttp.instance.send("user_zone.sync_invitation",i,Handler.create(null,function(t){
            console.log("user_zone.sync_invitation 回调数据 data = "+JSON.stringify(t))
        }))
    }
    }

    /** 原文：t.payThird=function()，字节 [399381,399974) */
    public static payThird(): any {
    var i=ModelManager.instance.modelUser,e=ConfigServer.getServerTimer();
    if("cb_fy_hk"==ConfigApp.pf_channel){
        var s=i.accountId,n="tkslg",h=sg.utils.MD5.md5(s+i.mUID_merge+i.zone+n+e+"").toLowerCase(),o=Platform.pf_login_data.token,r="https://www.dynastytk.com/h5sdk/pay?sign="+h+"&game_code="+n+"&user_id="+s+"&role_id="+i.mUID_merge+"&role_name="+encodeURI(i.uname)+"&server_code="+i.zone+"&server_name="+encodeURI(ConfigServer.getServerName(i.zone))+"&local_language=TW&time="+e+"&pic=&token="+o+"&role_level="+i.getLv();
        "cb_ad_fy_hk"==ConfigApp.pf?ToJava.other_fun(r,null):"cb_ios_fy_hk"==ConfigApp.pf&&ToIOS.callFunc("openLink",null,{link:r})
    }
    }

    /** 原文：t.openEIQ=function()，字节 [399975,400377) */
    public static openEIQ(): any {
    ConfigApp.releaseWeiXin()?ConfigApp.pf==MiniAdpter.window.game37_pf?MiniAdpter.window.game37Sdk.navigateToQuestionnaire({sid:ModelManager.instance.modelUser.zone,actor_id:ModelManager.instance.modelUser.mUID}):ConfigApp.pf==MiniAdpter.window.game37_fs_pf&&MiniAdpter.window.wx.navigateToMiniProgram({appId:"wxd947200f82267e58",path:"pages/wjxqList/wjxqList?activityId=tK7P9qT"}):"fs_ad_37"==ConfigApp.pf&&ToJava.other_fun("https://shouyou.wjx.cn/vm/wwIQe7L.aspx",null)
    }

    /** 原文：t.get37SendData=function()，字节 [400378,400574) */
    public static get37SendData(): any {
    var i=Platform.pf_login_data,e: any =<any>{};
    return e.game_id=i.game_id,e.appId=i.appid,e.op=i.appid,e.appid=i.appid,e.app_ext=i.app_ext,e.guid=i.guid,e.clientId=i.clientId,e.uid=i.uid,e
    }

    /** 原文：t.openActivityList=function()，字节 [400575,400772) */
    public static openActivityList(): any {
    var t=ConfigServer.system_simple.activity_list[ConfigApp.pf];
    Tools.isNullObj(t)||(0!=t.length?sg.boundFor.GotoManager.boundForPanel("community_activity"):ViewManager.instance.showTipsTxt(Tools.getMsgById("_public282")))
    }

    /** 原文：t.EVENT_SHARE_OK="event_share_ok"，字节 [400773,400806) */
    public static EVENT_SHARE_OK: string = "event_share_ok";

    /** 原文：t.pf_login_data=null，字节 [400807,400827) */
    public static pf_login_data: any = null;

    /** 原文：t.login_type=""，字节 [400828,400843) */
    public static login_type: string = "";

    /** 原文：t.recodrd_pay_info=null，字节 [400844,400867) */
    public static recodrd_pay_info: any = null;

    /** 原文：t.phoneID=""，字节 [400868,400880) */
    public static phoneID: string = "";

    /** 原文：t.appName=""，字节 [400881,400893) */
    public static appName: string = "";

    /** 原文：t.phoneInfoOnCheck=!1，字节 [400894,400915) */
    public static phoneInfoOnCheck: boolean = !1;

    /** 原文：t.share_wx_and_qq=!1，字节 [400916,400936) */
    public static share_wx_and_qq: boolean = !1;

    /** 原文：t.h5_sdk_obj=null，字节 [400937,400954) */
    public static h5_sdk_obj: any = null;

    /** 原文：t.h5_sdk_url_data=null，字节 [400955,400977) */
    public static h5_sdk_url_data: any = null;

    /** 原文：t.TAG_LOGIN_TYPE_MENG52="meng52"，字节 [400978,401010) */
    public static TAG_LOGIN_TYPE_MENG52: string = "meng52";

    /** 原文：t.TAG_LOGIN_TYPE_TUP="meng52_temp_user_pwd"，字节 [401011,401054) */
    public static TAG_LOGIN_TYPE_TUP: string = "meng52_temp_user_pwd";

    /** 原文：t.pay_list_info=null，字节 [401055,401075) */
    public static pay_list_info: any = null;

    /** 原文：t.h5_sdk=null，字节 [401076,401089) */
    public static h5_sdk: any = null;

    /** 原文：t.isUpdateResoueceBegin=!1，字节 [401090,401116) */
    public static isUpdateResoueceBegin: boolean = !1;

    /** 原文：t.isUpdateResouece30per=!1，字节 [401117,401143) */
    public static isUpdateResouece30per: boolean = !1;

    /** 原文：t.isUpdateResouece60per=!1，字节 [401144,401170) */
    public static isUpdateResouece60per: boolean = !1;

    /** 原文：t.isUpdateResoueceEnd=!1，字节 [401171,401195) */
    public static isUpdateResoueceEnd: boolean = !1;

    /** 原文：h(t,["eventListener",function(){return this.eventListener=new T}])（Laya.static 惰性静态，
     * T=laya.events.EventDispatcher；getter + defineProperty 缓存置换等价，ViewScenes.TOP_HEIGHT 同型） */
    public static get eventListener(): any {
        var v: any = new EventDispatcher();
        Object.defineProperty(Platform, "eventListener", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }
}

/**
 * 注册身份等价物：原文 o(t,"Platform")（2 参，无 base/miniName，无点注册挂 Laya.Platform）。
 * base 传 null 的原因见 batch-a-report.md「注册等价决策」（跳过 __extend，无静态拷贝）。
 */
Laya.class(Platform, "Platform", null, null);
