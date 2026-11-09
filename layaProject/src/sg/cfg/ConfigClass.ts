/**
 * sg.cfg.ConfigClass —— 视图表（509 个 VIEW_* 惰性常量，ViewManager.showView 的 ["name",Class] 对）。
 *
 * 原文：code1.js 字节 [457904,502891]（off 457936，包装变量 Ht，2 参注册 o(t,"sg.cfg.ConfigClass")，无基类）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-c/ConfigClass.js
 *
 * 原文形态：function t(){} 空构造 + h(t,[...509 对...])（Laya.static 惰性静态）+ return t。
 * 每对原文：function(){return this.VIEW_X=["<viewName>",VAR]}—— 首次访问求值并缓存为类自身
 * 数据属性（ViewScenes.TOP_HEIGHT 同型，batch-a-report §6.5）。此处以静态 getter +
 * Object.defineProperty 缓存置换精确等价。
 *
 * 类引用等价：原文第二元素是 UMD 闭包内的包装变量（H8/w8/C8/y8/I8…，各出现一次）；
 * 闭包变量在 UMD 求值期即取到类构造器，本译文的 sg.* 全局路径在 getter 首次访问时求值——
 * 二者在「全部包装器已执行、类已 Laya.class 注册」之后是同一对象（惰性求值时序相同）。
 * 行尾注释保留原包装变量名供对照；5 个非常规定义（逗号表达式取尾值/4 参注册）单行注明。
 * viewName 字符串逐字保留（含空串与原文拼写 VIewChangeHead/ViewwineshopGuest/VIEW_PVE_TROOP_H）。
 */

export class ConfigClass {

    constructor() {
    }

    /** 原文 getter：this.VIEW_STARTUP=["ViewStartup",H8] */
    public static get VIEW_STARTUP(): any {
        var v: any = ["ViewStartup", (<any>sg).view.init.ViewStartup /* H8 */];
        Object.defineProperty(ConfigClass, "VIEW_STARTUP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOGIN_CHOOSE=["ViewLoginChoose",w8] */
    public static get VIEW_LOGIN_CHOOSE(): any {
        var v: any = ["ViewLoginChoose", (<any>sg).view.init.ViewLoginChoose /* w8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOGIN_CHOOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOGIN_CHOOSE_2=["ViewLoginChoose2",C8] */
    public static get VIEW_LOGIN_CHOOSE_2(): any {
        var v: any = ["ViewLoginChoose2", (<any>sg).view.init.ViewLoginChoose2 /* C8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOGIN_CHOOSE_2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOGIN_CHOOSE_2_H=["ViewLoginChoose2_H",k8] */
    public static get VIEW_LOGIN_CHOOSE_2_H(): any {
        var v: any = ["ViewLoginChoose2_H", (<any>sg).view.init.ViewLoginChoose2_H /* k8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOGIN_CHOOSE_2_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOGIN=["ViewLogin",x8] */
    public static get VIEW_LOGIN(): any {
        var v: any = ["ViewLogin", (<any>sg).view.init.ViewLogin /* x8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOGIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOAD=["ViewLoad",y8] */
    public static get VIEW_LOAD(): any {
        var v: any = ["ViewLoad", (<any>sg).view.init.ViewLoad /* y8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOAD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOAD_SG4=["ViewLoadsg4",I8] */
    public static get VIEW_LOAD_SG4(): any {
        var v: any = ["ViewLoadsg4", (<any>sg).view.init.ViewLoadsg4 /* I8 */];
        Object.defineProperty(ConfigClass, "VIEW_LOAD_SG4", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AFFICHE=["ViewAffiche",Z4] */
    public static get VIEW_AFFICHE(): any {
        var v: any = ["ViewAffiche", (<any>sg).view.init.ViewAffiche /* Z4 */];
        Object.defineProperty(ConfigClass, "VIEW_AFFICHE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AFFICHE1=["ViewAffiche1",t8] */
    public static get VIEW_AFFICHE1(): any {
        var v: any = ["ViewAffiche1", (<any>sg).view.init.ViewAffiche1 /* t8 */];
        Object.defineProperty(ConfigClass, "VIEW_AFFICHE1", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PRIVACY_CONTRACT=["ViewPrivacyContract",U8] */
    public static get VIEW_PRIVACY_CONTRACT(): any {
        var v: any = ["ViewPrivacyContract", (<any>sg).view.init.ViewPrivacyContract /* U8 */];
        Object.defineProperty(ConfigClass, "VIEW_PRIVACY_CONTRACT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AFFICHE_MERGE=["ViewAfficheMerge",UZ] */
    public static get VIEW_AFFICHE_MERGE(): any {
        var v: any = ["ViewAfficheMerge", (<any>sg).activities.view.ViewAfficheMerge /* UZ */];
        Object.defineProperty(ConfigClass, "VIEW_AFFICHE_MERGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PHONE=["ViewPhone",L8] */
    public static get VIEW_PHONE(): any {
        var v: any = ["ViewPhone", (<any>sg).view.init.ViewPhone /* L8 */];
        Object.defineProperty(ConfigClass, "VIEW_PHONE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY=["ViewCountry",l8] */
    public static get VIEW_COUNTRY(): any {
        var v: any = ["ViewCountry", (<any>sg).view.init.ViewCountry /* l8 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_PC=["ViewCountryPC",d8] */
    public static get VIEW_COUNTRY_PC(): any {
        var v: any = ["ViewCountryPC", (<any>sg).view.init.ViewCountryPC /* d8 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_PC", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_WW=["ViewCountryWW",_8] */
    public static get VIEW_COUNTRY_WW(): any {
        var v: any = ["ViewCountryWW", (<any>sg).view.init.ViewCountryWW /* _8 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_WW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_MAP0=["ViewCountryMap0",u8] */
    public static get VIEW_COUNTRY_MAP0(): any {
        var v: any = ["ViewCountryMap0", (<any>sg).view.init.ViewCountryMap0 /* u8 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_MAP0", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SERVER_LIST=["ViewServerList",F8] */
    public static get VIEW_SERVER_LIST(): any {
        var v: any = ["ViewServerList", (<any>sg).view.init.ViewServerList /* F8 */];
        Object.defineProperty(ConfigClass, "VIEW_SERVER_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_MAIN=["ViewHeroMain",T4] */
    public static get VIEW_HERO_MAIN(): any {
        var v: any = ["ViewHeroMain", (<any>sg).view.hero.ViewHeroMain /* T4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_FEATURES=["ViewHeroFeatures",v4] */
    public static get VIEW_HERO_FEATURES(): any {
        var v: any = ["ViewHeroFeatures", (<any>sg).view.hero.ViewHeroFeatures /* v4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_FEATURES", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_FEATURES2=["ViewHeroFeatures2",y4] */
    public static get VIEW_HERO_FEATURES2(): any {
        var v: any = ["ViewHeroFeatures2", (<any>sg).view.hero.ViewHeroFeatures2 /* y4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_FEATURES2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_FEATURES2_H=["ViewHeroFeatures2_H",b4] */
    public static get VIEW_HERO_FEATURES2_H(): any {
        var v: any = ["ViewHeroFeatures2_H", (<any>sg).view.hero.ViewHeroFeatures2_H /* b4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_FEATURES2_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STAR_UPGRADE=["ViewStarUpgrade",V4] */
    public static get VIEW_STAR_UPGRADE(): any {
        var v: any = ["ViewStarUpgrade", (<any>sg).view.hero.ViewStarUpgrade /* V4 */];
        Object.defineProperty(ConfigClass, "VIEW_STAR_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STAR_UPGRADE2=["ViewStarUpgrade2",W4] */
    public static get VIEW_STAR_UPGRADE2(): any {
        var v: any = ["ViewStarUpgrade2", (<any>sg).view.hero.ViewStarUpgrade2 /* W4 */];
        Object.defineProperty(ConfigClass, "VIEW_STAR_UPGRADE2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LV_UPGRADE=["ViewLvUpgrade",F4] */
    public static get VIEW_LV_UPGRADE(): any {
        var v: any = ["ViewLvUpgrade", (<any>sg).view.hero.ViewLvUpgrade /* F4 */];
        Object.defineProperty(ConfigClass, "VIEW_LV_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PRO_NORMAL_ITEM=["ViewProNormalItem",H4] */
    public static get VIEW_PRO_NORMAL_ITEM(): any {
        var v: any = ["ViewProNormalItem", (<any>sg).view.hero.ViewProNormalItem /* H4 */];
        Object.defineProperty(ConfigClass, "VIEW_PRO_NORMAL_ITEM", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SKILL_UPGRADE=["ViewSkillUpgrade",G4] */
    public static get VIEW_SKILL_UPGRADE(): any {
        var v: any = ["ViewSkillUpgrade", (<any>sg).view.hero.ViewSkillUpgrade /* G4 */];
        Object.defineProperty(ConfigClass, "VIEW_SKILL_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SKILL_DELETE=["ViewSkillDelete",O4] */
    public static get VIEW_SKILL_DELETE(): any {
        var v: any = ["ViewSkillDelete", (<any>sg).view.hero.ViewSkillDelete /* O4 */];
        Object.defineProperty(ConfigClass, "VIEW_SKILL_DELETE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_EQUIP_LIST=["ViewHeroEquipList",p4] */
    public static get VIEW_HERO_EQUIP_LIST(): any {
        var v: any = ["ViewHeroEquipList", (<any>sg).view.hero.ViewHeroEquipList /* p4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_EQUIP_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_RUNE_SET=["ViewHeroRuneSet",A4] */
    public static get VIEW_HERO_RUNE_SET(): any {
        var v: any = ["ViewHeroRuneSet", (<any>sg).view.hero.ViewHeroRuneSet /* A4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_RUNE_SET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_RUNE_UPGRADE=["ViewHeroRuneUpgrade",N4] */
    public static get VIEW_HERO_RUNE_UPGRADE(): any {
        var v: any = ["ViewHeroRuneUpgrade", (<any>sg).view.hero.ViewHeroRuneUpgrade /* N4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_RUNE_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_TITLE=["ViewHeroTitle",D4] */
    public static get VIEW_HERO_TITLE(): any {
        var v: any = ["ViewHeroTitle", (<any>sg).view.hero.ViewHeroTitle /* D4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_TITLE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_GET_NEW=["ViewHeroGetNew",C4] */
    public static get VIEW_HERO_GET_NEW(): any {
        var v: any = ["ViewHeroGetNew", (<any>sg).view.hero.ViewHeroGetNew /* C4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_GET_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_GET_NEW2=["ViewHeroGetNew2",k4] */
    public static get VIEW_HERO_GET_NEW2(): any {
        var v: any = ["ViewHeroGetNew2", (<any>sg).view.hero.ViewHeroGetNew2 /* k4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_GET_NEW2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_INFO_TIPS=["ViewHeroInfoTips",M4] */
    public static get VIEW_HERO_INFO_TIPS(): any {
        var v: any = ["ViewHeroInfoTips", (<any>sg).view.hero.ViewHeroInfoTips /* M4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_INFO_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_TALENT_INFO=["ViewHeroTalentInfo",P4] */
    public static get VIEW_HERO_TALENT_INFO(): any {
        var v: any = ["ViewHeroTalentInfo", (<any>sg).view.hero.ViewHeroTalentInfo /* P4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_TALENT_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_COMMISSION=["ViewHeroCommission",m4] */
    public static get VIEW_HERO_COMMISSION(): any {
        var v: any = ["ViewHeroCommission", (<any>sg).view.hero.ViewHeroCommission /* m4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_COMMISSION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TESTPACKAGE=["TestPackage",W7] */
    public static get VIEW_TESTPACKAGE(): any {
        var v: any = ["TestPackage", (<any>sg).test.testpakcage.TestPackage /* W7 */];
        Object.defineProperty(ConfigClass, "VIEW_TESTPACKAGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_WEAK_INFO=["ViewHeroWeakInfo",R4] */
    public static get VIEW_HERO_WEAK_INFO(): any {
        var v: any = ["ViewHeroWeakInfo", (<any>sg).view.hero.ViewHeroWeakInfo /* R4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_WEAK_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOP_MAIN=["ViewShopMain",Xit] */
    public static get VIEW_SHOP_MAIN(): any {
        var v: any = ["ViewShopMain", (<any>sg).view.shop.ViewShopMain /* Xit */];
        Object.defineProperty(ConfigClass, "VIEW_SHOP_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUILD_MAIN=["ViewGuildMain",h4] */
    public static get VIEW_GUILD_MAIN(): any {
        var v: any = ["ViewGuildMain", (<any>sg).view.guild.ViewGuildMain /* h4 */];
        Object.defineProperty(ConfigClass, "VIEW_GUILD_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_SELF=["ViewPaySelf",A8] */
    public static get VIEW_PAY_SELF(): any {
        var v: any = ["ViewPaySelf", (<any>sg).view.init.ViewPaySelf /* A8 */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_SELF", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_MAIN=["ViewBagMain",t3] */
    public static get VIEW_BAG_MAIN(): any {
        var v: any = ["ViewBagMain", (<any>sg).view.bag.ViewBagMain /* t3 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUB_MAIN=["ViewPubMain",v9] */
    public static get VIEW_PUB_MAIN(): any {
        var v: any = ["ViewPubMain", (<any>sg).view.inside.ViewPubMain /* v9 */];
        Object.defineProperty(ConfigClass, "VIEW_PUB_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUB_SHOW_HERO=["ViewPubShowHero",y9] */
    public static get VIEW_PUB_SHOW_HERO(): any {
        var v: any = ["ViewPubShowHero", (<any>sg).view.inside.ViewPubShowHero /* y9 */];
        Object.defineProperty(ConfigClass, "VIEW_PUB_SHOW_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUB_SHOW_HERO2=["ViewPubShowHero2",b9] */
    public static get VIEW_PUB_SHOW_HERO2(): any {
        var v: any = ["ViewPubShowHero2", (<any>sg).view.inside.ViewPubShowHero2 /* b9 */];
        Object.defineProperty(ConfigClass, "VIEW_PUB_SHOW_HERO2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUB_SHOW_HERO3=["ViewPubShowHero3",I9] */
    public static get VIEW_PUB_SHOW_HERO3(): any {
        var v: any = ["ViewPubShowHero3", (<any>sg).view.inside.ViewPubShowHero3 /* I9 */];
        Object.defineProperty(ConfigClass, "VIEW_PUB_SHOW_HERO3", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAGAGAGE_MAIN=["ViewBaggageMain",J8] */
    public static get VIEW_BAGAGAGE_MAIN(): any {
        var v: any = ["ViewBaggageMain", (<any>sg).view.inside.ViewBaggageMain /* J8 */];
        Object.defineProperty(ConfigClass, "VIEW_BAGAGAGE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CABINET_MAIN=["ViewCabinetMain",s9] */
    public static get VIEW_CABINET_MAIN(): any {
        var v: any = ["ViewCabinetMain", (<any>sg).view.inside.ViewCabinetMain /* s9 */];
        Object.defineProperty(ConfigClass, "VIEW_CABINET_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CABINET_HERO=["ViewCabinetHero",e9] */
    public static get VIEW_CABINET_HERO(): any {
        var v: any = ["ViewCabinetHero", (<any>sg).view.inside.ViewCabinetHero /* e9 */];
        Object.defineProperty(ConfigClass, "VIEW_CABINET_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STAR_GET=["ViewStarGet",E9] */
    public static get VIEW_STAR_GET(): any {
        var v: any = ["ViewStarGet", (<any>sg).view.inside.ViewStarGet /* E9 */];
        Object.defineProperty(ConfigClass, "VIEW_STAR_GET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STAR_RESOLVE=["ViewStarResolve",P9] */
    public static get VIEW_STAR_RESOLVE(): any {
        var v: any = ["ViewStarResolve", (<any>sg).view.inside.ViewStarResolve /* P9 */];
        Object.defineProperty(ConfigClass, "VIEW_STAR_RESOLVE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PROP_RESOLVE=["ViewPropResolve",f9] */
    public static get VIEW_PROP_RESOLVE(): any {
        var v: any = ["ViewPropResolve", (<any>sg).view.inside.ViewPropResolve /* f9 */];
        Object.defineProperty(ConfigClass, "VIEW_PROP_RESOLVE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PROP_RESOLVE_H=["ViewPropResolve_H",p9] */
    public static get VIEW_PROP_RESOLVE_H(): any {
        var v: any = ["ViewPropResolve_H", (<any>sg).view.inside.ViewPropResolve_H /* p9 */];
        Object.defineProperty(ConfigClass, "VIEW_PROP_RESOLVE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_MENU=["",$6] */
    public static get VIEW_FIGHT_MENU(): any {
        var v: any = ["", (<any>sg).view.fight.ViewFightMenu /* $6 */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_MENU", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_MAIN=["ViewClimbMain",Y6] */
    public static get VIEW_CLIMB_MAIN(): any {
        var v: any = ["ViewClimbMain", (<any>sg).view.fight.ViewClimbMain /* Y6 */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_MAIN2=["ViewClimbMain2",X6] */
    public static get VIEW_CLIMB_MAIN2(): any {
        var v: any = ["ViewClimbMain2", (<any>sg).view.fight.ViewClimbMain2 /* X6 */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_MAIN2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_RANK=["ViewClimbRank",Q6] */
    public static get VIEW_CLIMB_RANK(): any {
        var v: any = ["ViewClimbRank", (<any>sg).view.fight.ViewClimbRank /* Q6 */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_MAIN_H=["ViewClimbMain_H",K6] */
    public static get VIEW_CLIMB_MAIN_H(): any {
        var v: any = ["ViewClimbMain_H", (<any>sg).view.fight.ViewClimbMain_H /* K6 */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_MAIN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_TROOP=["ViewClimbTroop",b1] */
    public static get VIEW_CLIMB_TROOP(): any {
        var v: any = ["ViewClimbTroop", (<any>sg).view.fight.ViewClimbTroop /* b1 */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_INFO=["ViewCityInfo",ett] */
    public static get VIEW_CITY_INFO(): any {
        var v: any = ["ViewCityInfo", (<any>sg).view.map.ViewCityInfo /* ett */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_INFO2=["ViewCityInfo2",stt] */
    public static get VIEW_CITY_INFO2(): any {
        var v: any = ["ViewCityInfo2", (<any>sg).view.map.ViewCityInfo2 /* stt */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_INFO2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_INFO_LIST=["ViewCityInfoList",ntt] */
    public static get VIEW_CITY_INFO_LIST(): any {
        var v: any = ["ViewCityInfoList", (<any>sg).view.map.ViewCityInfoList /* ntt */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_INFO_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_BUILD_MAIN=["ViewCityBuildMain",ttt] */
    public static get VIEW_CITY_BUILD_MAIN(): any {
        var v: any = ["ViewCityBuildMain", (<any>sg).view.map.ViewCityBuildMain /* ttt */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_BUILD_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_BUILD_MAIN_NEW=["ViewCityBuildMain_new",q9] */
    public static get VIEW_CITY_BUILD_MAIN_NEW(): any {
        var v: any = ["ViewCityBuildMain_new", (<any>sg).view.map.cityBuildMain_new.ViewCityBuildMain_new /* q9 */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_BUILD_MAIN_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_USER_INFO=["ViewUserInfo",ait] */
    public static get VIEW_USER_INFO(): any {
        var v: any = ["ViewUserInfo", (<any>sg).view.menu.ViewUserInfo /* ait */];
        Object.defineProperty(ConfigClass, "VIEW_USER_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REAL_NAME=["ViewRealName",D8] */
    public static get VIEW_REAL_NAME(): any {
        var v: any = ["ViewRealName", (<any>sg).view.init.ViewRealName /* D8 */];
        Object.defineProperty(ConfigClass, "VIEW_REAL_NAME", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MB_PAY=["ViewMBPay",M8] */
    public static get VIEW_MB_PAY(): any {
        var v: any = ["ViewMBPay", (<any>sg).view.init.ViewMBPay /* M8 */];
        Object.defineProperty(ConfigClass, "VIEW_MB_PAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_MAIN=["ViewPKMain",J6] */
    public static get VIEW_PK_MAIN(): any {
        var v: any = ["ViewPKMain", (<any>sg).view.fight.ViewPKMain /* J6 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_REPORT=["ViewPKReport",i4] */
    public static get VIEW_PK_REPORT(): any {
        var v: any = ["ViewPKReport", (<any>sg).view.fight.ViewPKReport /* i4 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_REPORT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_RANK=["ViewPKRank",t4] */
    public static get VIEW_PK_RANK(): any {
        var v: any = ["ViewPKRank", (<any>sg).view.fight.ViewPKRank /* t4 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_DEPLOY=["ViewPKDeploy",Z6] */
    public static get VIEW_PK_DEPLOY(): any {
        var v: any = ["ViewPKDeploy", (<any>sg).view.fight.ViewPKDeploy /* Z6 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_DEPLOY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_TROOP=["ViewPKtroop",e4] */
    public static get VIEW_PK_TROOP(): any {
        var v: any = ["ViewPKtroop", (<any>sg).view.fight.ViewPKtroop /* e4 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_TROOP_FS=["ViewPKtroop_FS",s4] */
    public static get VIEW_PK_TROOP_FS(): any {
        var v: any = ["ViewPKtroop_FS", (<any>sg).view.fight.ViewPKtroop_FS /* s4 */];
        Object.defineProperty(ConfigClass, "VIEW_PK_TROOP_FS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_MAIN_H=["ViewChampionMain_H",f3] */
    public static get VIEW_CHAMPION_MAIN_H(): any {
        var v: any = ["ViewChampionMain_H", (<any>sg).view.champion.ViewChampionMain_H /* f3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_MAIN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_RANK_H=["ViewChampionRank_H",p3] */
    public static get VIEW_CHAMPION_RANK_H(): any {
        var v: any = ["ViewChampionRank_H", (<any>sg).view.champion.ViewChampionRank_H /* p3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_RANK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_MAIN=["ViewChampionMain",W6] */
    public static get VIEW_CHAMPION_MAIN(): any {
        var v: any = ["ViewChampionMain", (<any>sg).view.fight.ViewChampionMain /* W6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_BET=["ViewChampionBet",G6] */
    public static get VIEW_CHAMPION_BET(): any {
        var v: any = ["ViewChampionBet", (<any>sg).view.fight.ViewChampionBet /* G6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_BET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_HERO_EDIT=["ViewChampionHeroEdit",z6] */
    public static get VIEW_CHAMPION_HERO_EDIT(): any {
        var v: any = ["ViewChampionHeroEdit", (<any>sg).view.fight.ViewChampionHeroEdit /* z6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_HERO_EDIT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_RANK=["ViewChampionRank",k6] */
    public static get VIEW_CHAMPION_RANK(): any {
        var v: any = ["ViewChampionRank", (<any>sg).view.fight.ViewChampionRank /* k6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_MATCH_INFO=["ChampionMatchInfo",Y3] */
    public static get VIEW_CHAMPION_MATCH_INFO(): any {
        var v: any = ["ChampionMatchInfo", (<any>sg).view.fight.ChampionMatchInfo /* Y3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_MATCH_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_MATCH_INFO8=["ChampionMatchInfo8",q3] */
    public static get VIEW_CHAMPION_MATCH_INFO8(): any {
        var v: any = ["ChampionMatchInfo8", (<any>sg).view.fight.ChampionMatchInfo8 /* q3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_MATCH_INFO8", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_BET_EDIT=["ViewChampionBetEdit",V6] */
    public static get VIEW_CHAMPION_BET_EDIT(): any {
        var v: any = ["ViewChampionBetEdit", (<any>sg).view.fight.ViewChampionBetEdit /* V6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_BET_EDIT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_TROOP=["ViewChampionTroop",j6] */
    public static get VIEW_CHAMPION_TROOP(): any {
        var v: any = ["ViewChampionTroop", (<any>sg).view.fight.ViewChampionTroop /* j6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_ENROLL=["ViewChampionEnroll",h6] */
    public static get VIEW_CHAMPION_ENROLL(): any {
        var v: any = ["ViewChampionEnroll", (<any>sg).view.fight.champion_sg_new.ViewChampionEnroll /* h6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_ENROLL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_ENROLL_H=["ViewChampionEnroll_H",o6] */
    public static get VIEW_CHAMPION_ENROLL_H(): any {
        var v: any = ["ViewChampionEnroll_H", (<any>sg).view.fight.champion_sg_new.ViewChampionEnroll_H /* o6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_ENROLL_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_BATTLE_ARRAY=["ViewChampionBattleArray",n6] */
    public static get VIEW_CHAMPION_BATTLE_ARRAY(): any {
        var v: any = ["ViewChampionBattleArray", (<any>sg).view.fight.champion_sg_new.ViewChampionBattleArray /* n6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_BATTLE_ARRAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_GROUP=["ChampionGroup",$3] */
    public static get VIEW_CHAMPION_GROUP(): any {
        var v: any = ["ChampionGroup", (<any>sg).view.fight.champion_sg_new.ChampionGroup /* $3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_GROUP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_GROUP_H=["ChampionGroup_H",t6] */
    public static get VIEW_CHAMPION_GROUP_H(): any {
        var v: any = ["ChampionGroup_H", (<any>sg).view.fight.champion_sg_new.ChampionGroup_H /* t6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_GROUP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_FINALS=["ChampionFinals",X3] */
    public static get VIEW_CHAMPION_FINALS(): any {
        var v: any = ["ChampionFinals", (<any>sg).view.fight.champion_sg_new.ChampionFinals /* X3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_FINALS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_FINALS_H=["ChampionFinals_H",Q3] */
    public static get VIEW_CHAMPION_FINALS_H(): any {
        var v: any = ["ChampionFinals_H", (<any>sg).view.fight.champion_sg_new.ChampionFinals_H /* Q3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_FINALS_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_GROUP_RANK=["ChampionGroupRank",J3] */
    public static get VIEW_CHAMPION_GROUP_RANK(): any {
        var v: any = ["ChampionGroupRank", (<any>sg).view.fight.champion_sg_new.ChampionGroupRank /* J3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_GROUP_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_GROUP_RANK_H=["ChampionGroupRank_H",Z3] */
    public static get VIEW_CHAMPION_GROUP_RANK_H(): any {
        var v: any = ["ChampionGroupRank_H", (<any>sg).view.fight.champion_sg_new.ChampionGroupRank_H /* Z3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_GROUP_RANK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_FIGHT_LOG=["ChampionFightLog",K3] */
    public static get VIEW_CHAMPION_FIGHT_LOG(): any {
        var v: any = ["ChampionFightLog", (<any>sg).view.fight.champion_sg_new.ChampionFightLog /* K3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_FIGHT_LOG", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_STAKE=["ChampionStake",i6] */
    public static get VIEW_CHAMPION_STAKE(): any {
        var v: any = ["ChampionStake", (<any>sg).view.fight.champion_sg_new.ChampionStake /* i6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_STAKE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_STAKE_H=["ChampionStake_H",e6] */
    public static get VIEW_CHAMPION_STAKE_H(): any {
        var v: any = ["ChampionStake_H", (<any>sg).view.fight.champion_sg_new.ChampionStake_H /* e6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_STAKE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_UP_BET=["ChampionUpBet",s6] */
    public static get VIEW_CHAMPION_UP_BET(): any {
        var v: any = ["ChampionUpBet", (<any>sg).view.fight.champion_sg_new.ChampionUpBet /* s6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_UP_BET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_RANK_NEW=["ViewChampionRankNew",r6] */
    public static get VIEW_CHAMPION_RANK_NEW(): any {
        var v: any = ["ViewChampionRankNew", (<any>sg).view.fight.champion_sg_new.ViewChampionRankNew /* r6 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_RANK_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PVE_MAIN=["ViewPVEMain",x9] */
    public static get VIEW_PVE_MAIN(): any {
        var v: any = ["ViewPVEMain", (<any>sg).view.inside.ViewPVEMain /* x9 */];
        Object.defineProperty(ConfigClass, "VIEW_PVE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PVE_INFO=["ViewPVEInfo",w9] */
    public static get VIEW_PVE_INFO(): any {
        var v: any = ["ViewPVEInfo", (<any>sg).view.inside.ViewPVEInfo /* w9 */];
        Object.defineProperty(ConfigClass, "VIEW_PVE_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND=["ViewLegend",m1] */
    public static get VIEW_LEGEND(): any {
        var v: any = ["ViewLegend", (<any>sg).altar.legend.view.ViewLegend /* m1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_ROAD=["ViewLegendRoad",y1] */
    public static get VIEW_LEGEND_ROAD(): any {
        var v: any = ["ViewLegendRoad", (<any>sg).altar.legend.view.ViewLegendRoad /* y1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_ROAD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_EXPERIENCE=["ViewLegendExperience",g1] */
    public static get VIEW_LEGEND_EXPERIENCE(): any {
        var v: any = ["ViewLegendExperience", (<any>sg).altar.legend.view.ViewLegendExperience /* g1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_EXPERIENCE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_TROOP=["ViewLegendTroop",Wst] */
    public static get VIEW_LEGEND_TROOP(): any {
        var v: any = ["ViewLegendTroop", (<any>sg).altar.legend.view.ViewLegendTroop /* Wst */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_AWAKEN=["ViewLegendAwaken",x1] */
    public static get VIEW_LEGEND_AWAKEN(): any {
        var v: any = ["ViewLegendAwaken", (<any>sg).altar.legendAwaken.view.ViewLegendAwaken /* x1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_AWAKEN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_AWAKEN_SHOP=["ViewLegendAwakenShop",w1] */
    public static get VIEW_LEGEND_AWAKEN_SHOP(): any {
        var v: any = ["ViewLegendAwakenShop", (<any>sg).altar.legendAwaken.view.ViewLegendAwakenShop /* w1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_AWAKEN_SHOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_AWAKEN_SHOP_RIGHT=["ViewLegendAwakenShopRight",C1] */
    public static get VIEW_LEGEND_AWAKEN_SHOP_RIGHT(): any {
        var v: any = ["ViewLegendAwakenShopRight", (<any>sg).altar.legendAwaken.view.ViewLegendAwakenShopRight /* C1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_AWAKEN_SHOP_RIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_AWAKEN_SELECT=["ViewHeroAwakenSelect",d4] */
    public static get VIEW_HERO_AWAKEN_SELECT(): any {
        var v: any = ["ViewHeroAwakenSelect", (<any>sg).view.hero.ViewHeroAwakenSelect /* d4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_AWAKEN_SELECT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_H=["ViewLegendMain_H",p1] */
    public static get VIEW_LEGEND_H(): any {
        var v: any = ["ViewLegendMain_H", (<any>sg).altar.legend.view.ViewLegendMain_H /* p1 */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COMMUNITY_ACTIVITY=["ViewCommunityActivity",a8] */
    public static get VIEW_COMMUNITY_ACTIVITY(): any {
        var v: any = ["ViewCommunityActivity", (<any>sg).view.init.ViewCommunityActivity /* a8: 4-arg reg o(i,name,base,miniName "ViewCommunityActivity$1") */];
        Object.defineProperty(ConfigClass, "VIEW_COMMUNITY_ACTIVITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COMMUNITY_ACTIVITY1=["ViewCommunityActivity1",c8] */
    public static get VIEW_COMMUNITY_ACTIVITY1(): any {
        var v: any = ["ViewCommunityActivity1", (<any>sg).view.init.ViewCommunityActivity1 /* c8 */];
        Object.defineProperty(ConfigClass, "VIEW_COMMUNITY_ACTIVITY1", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REVIVED_TOWER=["ViewRevivedTower",Ret] */
    public static get VIEW_REVIVED_TOWER(): any {
        var v: any = ["ViewRevivedTower", (<any>sg).view.tower.ViewRevivedTower /* Ret */];
        Object.defineProperty(ConfigClass, "VIEW_REVIVED_TOWER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REVIVED_TOWER_H=["ViewRevivedTower_H",Het] */
    public static get VIEW_REVIVED_TOWER_H(): any {
        var v: any = ["ViewRevivedTower_H", (<any>sg).view.tower.ViewRevivedTower_H /* Het */];
        Object.defineProperty(ConfigClass, "VIEW_REVIVED_TOWER_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REVIVE_EVENT=["ViewReviveEvent",Oet] */
    public static get VIEW_REVIVE_EVENT(): any {
        var v: any = ["ViewReviveEvent", (<any>sg).view.tower.ViewReviveEvent /* Oet */];
        Object.defineProperty(ConfigClass, "VIEW_REVIVE_EVENT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REVIVE_GIFT=["ViewReviveGift",Get] */
    public static get VIEW_REVIVE_GIFT(): any {
        var v: any = ["ViewReviveGift", (<any>sg).view.tower.ViewReviveGift /* Get */];
        Object.defineProperty(ConfigClass, "VIEW_REVIVE_GIFT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REVIVE_GIFT_H=["ViewReviveGift_H",Vet] */
    public static get VIEW_REVIVE_GIFT_H(): any {
        var v: any = ["ViewReviveGift_H", (<any>sg).view.tower.ViewReviveGift_H /* Vet */];
        Object.defineProperty(ConfigClass, "VIEW_REVIVE_GIFT_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ALLOCATE_ATTRIBUTE=["ViewAllocateAttribute",Aet] */
    public static get VIEW_ALLOCATE_ATTRIBUTE(): any {
        var v: any = ["ViewAllocateAttribute", (<any>sg).view.tower.ViewAllocateAttribute /* Aet */];
        Object.defineProperty(ConfigClass, "VIEW_ALLOCATE_ATTRIBUTE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_DRAGON_SOUL=["ViewDragonSoul",Let] */
    public static get VIEW_DRAGON_SOUL(): any {
        var v: any = ["ViewDragonSoul", (<any>sg).view.tower.ViewDragonSoul /* Let */];
        Object.defineProperty(ConfigClass, "VIEW_DRAGON_SOUL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_DRAGON_SOUL_H=["ViewDragonSoul_H",Uet] */
    public static get VIEW_DRAGON_SOUL_H(): any {
        var v: any = ["ViewDragonSoul_H", (<any>sg).view.tower.ViewDragonSoul_H /* Uet */];
        Object.defineProperty(ConfigClass, "VIEW_DRAGON_SOUL_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_DRAGON_SOUL_SHIFT=["ViewDragonSoulShift",Eet] */
    public static get VIEW_DRAGON_SOUL_SHIFT(): any {
        var v: any = ["ViewDragonSoulShift", (<any>sg).view.tower.ViewDragonSoulShift /* Eet */];
        Object.defineProperty(ConfigClass, "VIEW_DRAGON_SOUL_SHIFT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FOOD_KING=["ViewFoodKing",Pet] */
    public static get VIEW_FOOD_KING(): any {
        var v: any = ["ViewFoodKing", (<any>sg).view.tower.ViewFoodKing /* Pet */];
        Object.defineProperty(ConfigClass, "VIEW_FOOD_KING", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FOOD_KING_H=["ViewFoodKing_H",Det] */
    public static get VIEW_FOOD_KING_H(): any {
        var v: any = ["ViewFoodKing_H", (<any>sg).view.tower.ViewFoodKing_H /* Det */];
        Object.defineProperty(ConfigClass, "VIEW_FOOD_KING_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SOUL_TASK=["ViewSoulTask",Fet] */
    public static get VIEW_SOUL_TASK(): any {
        var v: any = ["ViewSoulTask", (<any>sg).view.tower.ViewFoodTask /* Fet */];
        Object.defineProperty(ConfigClass, "VIEW_SOUL_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHOOSE_FOOD=["ViewChooseFood",Net] */
    public static get VIEW_CHOOSE_FOOD(): any {
        var v: any = ["ViewChooseFood", (<any>sg).view.tower.ViewChooseFood /* Net */];
        Object.defineProperty(ConfigClass, "VIEW_CHOOSE_FOOD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_UPGRADE=["ViewArmyUpgrade",q8] */
    public static get VIEW_ARMY_UPGRADE(): any {
        var v: any = ["ViewArmyUpgrade", (<any>sg).view.inside.ViewArmyUpgrade /* q8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_UPGRADE_H=["ViewArmyUpgrade_H",Q8] */
    public static get VIEW_ARMY_UPGRADE_H(): any {
        var v: any = ["ViewArmyUpgrade_H", (<any>sg).view.inside.ViewArmyUpgrade_H /* Q8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_UPGRADE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_UPGRADE2=["ViewArmyUpgrade2",X8] */
    public static get VIEW_ARMY_UPGRADE2(): any {
        var v: any = ["ViewArmyUpgrade2", (<any>sg).view.inside.ViewArmyUpgrade2 /* X8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_UPGRADE2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_UPGRADE_ALERT=["ViewArmyUpgradeAlert",K8] */
    public static get VIEW_ARMY_UPGRADE_ALERT(): any {
        var v: any = ["ViewArmyUpgradeAlert", (<any>sg).view.inside.ViewArmyUpgradeAlert /* K8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_UPGRADE_ALERT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EQUIP_QUICKLY=["ViewEquipQuickly",Fst] */
    public static get VIEW_EQUIP_QUICKLY(): any {
        var v: any = ["ViewEquipQuickly", (<any>sg).view.inside.ViewEquipQuickly /* Fst */];
        Object.defineProperty(ConfigClass, "VIEW_EQUIP_QUICKLY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EQUIP_MAKE_INFO=["ViewEquipMakeInfo",h9] */
    public static get VIEW_EQUIP_MAKE_INFO(): any {
        var v: any = ["ViewEquipMakeInfo", (<any>sg).view.inside.ViewEquipMakeInfo /* h9 */];
        Object.defineProperty(ConfigClass, "VIEW_EQUIP_MAKE_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_MAIN=["ViewOfficeMain",c9] */
    public static get VIEW_OFFICE_MAIN(): any {
        var v: any = ["ViewOfficeMain", (<any>sg).view.inside.ViewOfficeMain /* c9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_MAIN1=["ViewOfficeMain1",d9] */
    public static get VIEW_OFFICE_MAIN1(): any {
        var v: any = ["ViewOfficeMain1", (<any>sg).view.inside.ViewOfficeMain1 /* d9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_MAIN1", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_MAIN2=["ViewOfficeMain2",_9] */
    public static get VIEW_OFFICE_MAIN2(): any {
        var v: any = ["ViewOfficeMain2", (<any>sg).view.inside.ViewOfficeMain2 /* _9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_MAIN2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_MAIN3=["ViewOfficeMain3",m9] */
    public static get VIEW_OFFICE_MAIN3(): any {
        var v: any = ["ViewOfficeMain3", (<any>sg).view.inside.ViewOfficeMain3 /* m9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_MAIN3", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_ACTIVATION=["ViewOfficeActivation",a9] */
    public static get VIEW_OFFICE_ACTIVATION(): any {
        var v: any = ["ViewOfficeActivation", (<any>sg).view.inside.ViewOfficeActivation /* a9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_ACTIVATION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OFFICE_CONDITION=["ViewOfficeCondition",u9] */
    public static get VIEW_OFFICE_CONDITION(): any {
        var v: any = ["ViewOfficeCondition", (<any>sg).view.inside.ViewOfficeCondition /* u9 */];
        Object.defineProperty(ConfigClass, "VIEW_OFFICE_CONDITION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BUILDING_INFO_TIPS=["ViewbuildingInfoTips",t9] */
    public static get VIEW_BUILDING_INFO_TIPS(): any {
        var v: any = ["ViewbuildingInfoTips", (<any>sg).view.inside.ViewbuildingInfoTips /* t9 */];
        Object.defineProperty(ConfigClass, "VIEW_BUILDING_INFO_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BUILDING_UPGRADE=["ViewBuildingUpgrade",i9] */
    public static get VIEW_BUILDING_UPGRADE(): any {
        var v: any = ["ViewBuildingUpgrade", (<any>sg).view.inside.ViewBuildingUpgrade /* i9 */];
        Object.defineProperty(ConfigClass, "VIEW_BUILDING_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BUILDING_UPGRADE_NEW=["BuildingUpgrade_New",z8] */
    public static get VIEW_BUILDING_UPGRADE_NEW(): any {
        var v: any = ["BuildingUpgrade_New", (<any>sg).view.inside.buildingUpgrade_new.BuildingUpgrade_New /* z8 */];
        Object.defineProperty(ConfigClass, "VIEW_BUILDING_UPGRADE_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BUILDING_QUICKLY=["ViewBuildingQuickly",Y8] */
    public static get VIEW_BUILDING_QUICKLY(): any {
        var v: any = ["ViewBuildingQuickly", (<any>sg).view.inside.ViewBuildingQuickly /* Y8 */];
        Object.defineProperty(ConfigClass, "VIEW_BUILDING_QUICKLY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BUILDING_INFO=["ViewBuildingInfo",Z8] */
    public static get VIEW_BUILDING_INFO(): any {
        var v: any = ["ViewBuildingInfo", (<any>sg).view.inside.ViewBuildingInfo /* Z8 */];
        Object.defineProperty(ConfigClass, "VIEW_BUILDING_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_MAKE=["ViewArmyMake",j8] */
    public static get VIEW_ARMY_MAKE(): any {
        var v: any = ["ViewArmyMake", (<any>sg).view.inside.ViewArmyMake /* j8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_MAKE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_MAKE_NEW=["ArmyMake_New",W8] */
    public static get VIEW_ARMY_MAKE_NEW(): any {
        var v: any = ["ArmyMake_New", (<any>sg).view.inside.armyMake_new.ArmyMake_New /* W8 */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_MAKE_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARMY_QUICKLY=["ViewArmyQuickly",zst] */
    public static get VIEW_ARMY_QUICKLY(): any {
        var v: any = ["ViewArmyQuickly", (<any>sg).view.inside.ViewArmyQuickly /* zst */];
        Object.defineProperty(ConfigClass, "VIEW_ARMY_QUICKLY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCE_MAIN=["ViewScienceMain",C9] */
    public static get VIEW_SCIENCE_MAIN(): any {
        var v: any = ["ViewScienceMain", (<any>sg).view.inside.ViewScienceMain /* C9 */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCEH_MAIN=["ViewScienceHMain",Wit] */
    public static get VIEW_SCIENCEH_MAIN(): any {
        var v: any = ["ViewScienceHMain", (<any>sg).view.ScienceH.ViewScienceHMain /* Wit */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCEH_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCE_UPGRADE=["ViewScienceUpgrade",T9] */
    public static get VIEW_SCIENCE_UPGRADE(): any {
        var v: any = ["ViewScienceUpgrade", (<any>sg).view.inside.ViewScienceUpgrade /* T9 */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCE_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCE_UPGRADE_H=["ViewScienceUpgrade_H",M9] */
    public static get VIEW_SCIENCE_UPGRADE_H(): any {
        var v: any = ["ViewScienceUpgrade_H", (<any>sg).view.inside.ViewScienceUpgrade_H /* M9 */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCE_UPGRADE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCE_QUICKLY=["ViewScienceQuickly",jst] */
    public static get VIEW_SCIENCE_QUICKLY(): any {
        var v: any = ["ViewScienceQuickly", (<any>sg).view.inside.ViewScienceQuickly /* jst */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCE_QUICKLY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCIENCE_LIST=["ViewScienceList",zit] */
    public static get VIEW_SCIENCE_LIST(): any {
        var v: any = ["ViewScienceList", (<any>sg).view.ScienceH.ViewScienceList /* zit */];
        Object.defineProperty(ConfigClass, "VIEW_SCIENCE_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_INFO=["ViewBagItemInfo",$7] */
    public static get VIEW_BAG_INFO(): any {
        var v: any = ["ViewBagItemInfo", (<any>sg).view.bag.ViewBagItemInfo /* $7 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_USE=["ViewBagItemUse",i3] */
    public static get VIEW_BAG_USE(): any {
        var v: any = ["ViewBagItemUse", (<any>sg).view.bag.ViewBagItemUse /* i3 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_USE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_CHOOSE=["ViewBagItemChoose",K7] */
    public static get VIEW_BAG_CHOOSE(): any {
        var v: any = ["ViewBagItemChoose", (<any>sg).view.bag.ViewBagItemChoose /* K7 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_CHOOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GET_REWARD=["ViewGetReward",e3] */
    public static get VIEW_GET_REWARD(): any {
        var v: any = ["ViewGetReward", (<any>sg).view.bag.ViewGetReward /* e3 */];
        Object.defineProperty(ConfigClass, "VIEW_GET_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_SOURSE=["ViewbagItemSource",J7] */
    public static get VIEW_BAG_SOURSE(): any {
        var v: any = ["ViewbagItemSource", (<any>sg).view.bag.ViewbagItemSource /* J7 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_SOURSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ITEM_SOURSE=["ViewItemInfoSource",s3] */
    public static get VIEW_ITEM_SOURSE(): any {
        var v: any = ["ViewItemInfoSource", (<any>sg).view.bag.ViewItemInfoSource /* s3 */];
        Object.defineProperty(ConfigClass, "VIEW_ITEM_SOURSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_ITEM_COMPOSE=["ViewBagItemCompose",Q7] */
    public static get VIEW_BAG_ITEM_COMPOSE(): any {
        var v: any = ["ViewBagItemCompose", (<any>sg).view.bag.ViewBagItemCompose /* Q7 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_ITEM_COMPOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOP_HERO_TIPS=["ViewShopHeroTips",qit] */
    public static get VIEW_SHOP_HERO_TIPS(): any {
        var v: any = ["ViewShopHeroTips", (<any>sg).view.shop.ViewShopHeroTips /* qit */];
        Object.defineProperty(ConfigClass, "VIEW_SHOP_HERO_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOP_HERO_TIPS2=["ViewShopHeroTips2",Kit] */
    public static get VIEW_SHOP_HERO_TIPS2(): any {
        var v: any = ["ViewShopHeroTips2", (<any>sg).view.shop.ViewShopHeroTips2 /* Kit */];
        Object.defineProperty(ConfigClass, "VIEW_SHOP_HERO_TIPS2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOP_SKILL_TIPS=["ViewShopSkillTips",Qit] */
    public static get VIEW_SHOP_SKILL_TIPS(): any {
        var v: any = ["ViewShopSkillTips", (<any>sg).view.shop.ViewShopSkillTips /* Qit */];
        Object.defineProperty(ConfigClass, "VIEW_SHOP_SKILL_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GOD_SKILL_TIPS=["ViewGodSkillTips",y5] */
    public static get VIEW_GOD_SKILL_TIPS(): any {
        var v: any = ["ViewGodSkillTips", (<any>sg).god.view.ViewGodSkillTips /* y5 */];
        Object.defineProperty(ConfigClass, "VIEW_GOD_SKILL_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BAG_ITEM_TIPS=["ViewBagItemTips",Z7] */
    public static get VIEW_BAG_ITEM_TIPS(): any {
        var v: any = ["ViewBagItemTips", (<any>sg).view.bag.ViewBagItemTips /* Z7 */];
        Object.defineProperty(ConfigClass, "VIEW_BAG_ITEM_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOP_EQUIP_TIPS=["ViewShopEquipTips",Yit] */
    public static get VIEW_SHOP_EQUIP_TIPS(): any {
        var v: any = ["ViewShopEquipTips", (<any>sg).view.shop.ViewShopEquipTips /* Yit */];
        Object.defineProperty(ConfigClass, "VIEW_SHOP_EQUIP_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SP_ARMY_TIPS=["ViewSparmyTips",Jit] */
    public static get VIEW_SP_ARMY_TIPS(): any {
        var v: any = ["ViewSparmyTips", (<any>sg).view.shop.ViewSparmyTips /* Jit */];
        Object.defineProperty(ConfigClass, "VIEW_SP_ARMY_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PROP_CHECK=["ViewPropResolveCheck",l3] */
    public static get VIEW_PROP_CHECK(): any {
        var v: any = ["ViewPropResolveCheck", (<any>sg).view.inside.ViewPropResolveCheck /* l3 */];
        Object.defineProperty(ConfigClass, "VIEW_PROP_CHECK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STAR_RESOLVE_QUICK=["ViewStarResolveQuick",R9] */
    public static get VIEW_STAR_RESOLVE_QUICK(): any {
        var v: any = ["ViewStarResolveQuick", (<any>sg).view.inside.ViewStarResolveQuick /* R9 */];
        Object.defineProperty(ConfigClass, "VIEW_STAR_RESOLVE_QUICK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREAT_TEAM=["ViewCreatGuild",n4] */
    public static get VIEW_CREAT_TEAM(): any {
        var v: any = ["ViewCreatGuild", (<any>sg).view.guild.ViewCreatGuild /* n4 */];
        Object.defineProperty(ConfigClass, "VIEW_CREAT_TEAM", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUILD_TROOP=["ViewGuildTroop",a6] */
    public static get VIEW_GUILD_TROOP(): any {
        var v: any = ["ViewGuildTroop", (<any>sg).view.guild.ViewGuildTroop /* a6 */];
        Object.defineProperty(ConfigClass, "VIEW_GUILD_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUILD_TROOP_INFO=["ViewGuildTroopInfo",o4] */
    public static get VIEW_GUILD_TROOP_INFO(): any {
        var v: any = ["ViewGuildTroopInfo", (<any>sg).view.guild.ViewGuildTroopInfo /* o4 */];
        Object.defineProperty(ConfigClass, "VIEW_GUILD_TROOP_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_BUY=["ViewFreeBuy",f8] */
    public static get VIEW_FREE_BUY(): any {
        var v: any = ["ViewFreeBuy", (<any>sg).view.init.ViewFreeBuy /* f8 */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_BUY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_BUY_H=["ViewFreeBuy_H",XZ] */
    public static get VIEW_FREE_BUY_H(): any {
        var v: any = ["ViewFreeBuy_H", (<any>sg).activities.view.ViewFreeBuy_H /* XZ */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_BUY_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TROOP_EDIT=["ViewTroopEdit",Xtt] */
    public static get VIEW_TROOP_EDIT(): any {
        var v: any = ["ViewTroopEdit", (<any>sg).view.map.ViewTroopEdit /* Xtt */];
        Object.defineProperty(ConfigClass, "VIEW_TROOP_EDIT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TROOP_EDIT_FS=["ViewTroopEdit_FS",Ktt] */
    public static get VIEW_TROOP_EDIT_FS(): any {
        var v: any = ["ViewTroopEdit_FS", (<any>sg).view.map.ViewTroopEdit_FS /* Ktt */];
        Object.defineProperty(ConfigClass, "VIEW_TROOP_EDIT_FS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_SEND=["ViewHeroSend",X1] */
    public static get VIEW_HERO_SEND(): any {
        var v: any = ["ViewHeroSend", (<any>sg).view.map.ViewHeroSend /* X1 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_SEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_TEST=["ViewPayTest",hit] */
    public static get VIEW_PAY_TEST(): any {
        var v: any = ["ViewPayTest", (<any>sg).view.menu.ViewPayTest /* hit */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_TEST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_TEST2=["ViewPayTest2",Jtt] */
    public static get VIEW_PAY_TEST2(): any {
        var v: any = ["ViewPayTest2", (<any>sg).view.menu.ViewCZ1 /* Jtt: comma expr (ViewVisitMain, ViewCZ1) -> last value ViewCZ1 */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_TEST2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_CATCH=["ViewHeroCatch",Vtt] */
    public static get VIEW_HERO_CATCH(): any {
        var v: any = ["ViewHeroCatch", (<any>sg).view.map.ViewHeroCatch /* Vtt */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_CATCH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_CATCH_FS=["ViewHeroCatch_FS",Wtt] */
    public static get VIEW_HERO_CATCH_FS(): any {
        var v: any = ["ViewHeroCatch_FS", (<any>sg).view.map.ViewHeroCatch_FS /* Wtt */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_CATCH_FS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_DRINK=["ViewHeroDrink",ztt] */
    public static get VIEW_HERO_DRINK(): any {
        var v: any = ["ViewHeroDrink", (<any>sg).view.map.ViewHeroDrink /* ztt */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_DRINK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_INFO=["ViewHeroInfo",i0] */
    public static get VIEW_HERO_INFO(): any {
        var v: any = ["ViewHeroInfo", (<any>sg).view.map.ViewHeroInfo /* i0 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_MAIN=["ViewEstateMain",Att] */
    public static get VIEW_ESTATE_MAIN(): any {
        var v: any = ["ViewEstateMain", (<any>sg).view.map.ViewEstateMain /* Att */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_MAIN_H=["ViewEstateMain_H",Utt] */
    public static get VIEW_ESTATE_MAIN_H(): any {
        var v: any = ["ViewEstateMain_H", (<any>sg).view.map.ViewEstateMain_H /* Utt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_MAIN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_MAIN_FAST_H=["ViewEstateMainFast_H",Ltt] */
    public static get VIEW_ESTATE_MAIN_FAST_H(): any {
        var v: any = ["ViewEstateMainFast_H", (<any>sg).view.map.ViewEstateMainFast_H /* Ltt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_MAIN_FAST_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_HERO=["VIewEstateHero",Stt] */
    public static get VIEW_ESTATE_HERO(): any {
        var v: any = ["VIewEstateHero", (<any>sg).view.map.VIewEstateHero /* Stt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_TASK=["ViewEstateTask",Ett] */
    public static get VIEW_ESTATE_TASK(): any {
        var v: any = ["ViewEstateTask", (<any>sg).view.map.ViewEstateTask /* Ett */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_DETAILS=["ViewEstateDetails",ktt] */
    public static get VIEW_ESTATE_DETAILS(): any {
        var v: any = ["ViewEstateDetails", (<any>sg).view.map.ViewEstateDetails /* ktt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_DETAILS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREDIT_GIFT=["ViewCreditGift",vtt] */
    public static get VIEW_CREDIT_GIFT(): any {
        var v: any = ["ViewCreditGift", (<any>sg).view.map.ViewCreditGift /* vtt */];
        Object.defineProperty(ConfigClass, "VIEW_CREDIT_GIFT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_VISIT_FINISH=["ViewVisitFinish",$tt] */
    public static get VIEW_VISIT_FINISH(): any {
        var v: any = ["ViewVisitFinish", (<any>sg).view.map.ViewVisitFinish /* $tt */];
        Object.defineProperty(ConfigClass, "VIEW_VISIT_FINISH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ALIEN_HERO_SEND=["ViewAlienHeroSend",Ast] */
    public static get VIEW_ALIEN_HERO_SEND(): any {
        var v: any = ["ViewAlienHeroSend", (<any>sg).view.map.ViewAlienHeroSend /* Ast */];
        Object.defineProperty(ConfigClass, "VIEW_ALIEN_HERO_SEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WORK_HERO_SEND=["ViewWorkHeroSend",Ust] */
    public static get VIEW_WORK_HERO_SEND(): any {
        var v: any = ["ViewWorkHeroSend", (<any>sg).view.map.ViewWorkHeroSend /* Ust */];
        Object.defineProperty(ConfigClass, "VIEW_WORK_HERO_SEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EVENT_TALK=["ViewEventTalk",Ntt] */
    public static get VIEW_EVENT_TALK(): any {
        var v: any = ["ViewEventTalk", (<any>sg).view.map.ViewEventTalk /* Ntt */];
        Object.defineProperty(ConfigClass, "VIEW_EVENT_TALK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_HERO_INFO=["ViewEstateHeroInfo",Btt] */
    public static get VIEW_ESTATE_HERO_INFO(): any {
        var v: any = ["ViewEstateHeroInfo", (<any>sg).view.map.ViewEstateHeroInfo /* Btt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_HERO_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FTASK_MAIN=["ViewFTaskMain",uet] */
    public static get VIEW_FTASK_MAIN(): any {
        var v: any = ["ViewFTaskMain", (<any>sg).view.task.ViewFTaskMain /* uet */];
        Object.defineProperty(ConfigClass, "VIEW_FTASK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_SEND=["ViewCitySend",htt] */
    public static get VIEW_CITY_SEND(): any {
        var v: any = ["ViewCitySend", (<any>sg).view.map.ViewCitySend /* htt */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_SEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TROOP_QUICKLY=["ViewTroopQuickly",Qtt] */
    public static get VIEW_TROOP_QUICKLY(): any {
        var v: any = ["ViewTroopQuickly", (<any>sg).view.map.ViewTroopQuickly /* Qtt */];
        Object.defineProperty(ConfigClass, "VIEW_TROOP_QUICKLY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.GOLD_CITY_PANEL=["GoldCityPanel",O2] */
    public static get GOLD_CITY_PANEL(): any {
        var v: any = ["GoldCityPanel", (<any>sg).map.view.GoldCityPanel /* O2 */];
        Object.defineProperty(ConfigClass, "GOLD_CITY_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_BREAK=["ViewHeroBreak",Ott] */
    public static get VIEW_HERO_BREAK(): any {
        var v: any = ["ViewHeroBreak", (<any>sg).view.map.ViewHeroBreak /* Ott */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_BREAK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_BREAK_V=["",Gtt] */
    public static get VIEW_HERO_BREAK_V(): any {
        var v: any = ["", (<any>sg).view.map.ViewHeroBreak_V /* Gtt */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_BREAK_V", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MAP_CITY_SEND=["ViewMapCitySend",jtt] */
    public static get VIEW_MAP_CITY_SEND(): any {
        var v: any = ["ViewMapCitySend", (<any>sg).view.map.ViewMapCitySend /* jtt */];
        Object.defineProperty(ConfigClass, "VIEW_MAP_CITY_SEND", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHANGE_NAME=["VIewChangeName",o8] */
    public static get VIEW_CHANGE_NAME(): any {
        var v: any = ["VIewChangeName", (<any>sg).view.init.VIewChangeName /* o8 */];
        Object.defineProperty(ConfigClass, "VIEW_CHANGE_NAME", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHANGE_HEAD=["VIewChangeHead",h8] */
    public static get VIEW_CHANGE_HEAD(): any {
        var v: any = ["VIewChangeHead", (<any>sg).view.init.ViewChangeHead /* h8 */];
        Object.defineProperty(ConfigClass, "VIEW_CHANGE_HEAD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MAIL_MAIN=["ViewMailMain",j9] */
    public static get VIEW_MAIL_MAIN(): any {
        var v: any = ["ViewMailMain", (<any>sg).view.mail.ViewMailMain /* j9 */];
        Object.defineProperty(ConfigClass, "VIEW_MAIL_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ADD_CHAT=["ViewAddChat",W9] */
    public static get VIEW_ADD_CHAT(): any {
        var v: any = ["ViewAddChat", (<any>sg).view.mail.ViewAddChat /* W9 */];
        Object.defineProperty(ConfigClass, "VIEW_ADD_CHAT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MAIL_CONTENT=["ViewMailContent",z9] */
    public static get VIEW_MAIL_CONTENT(): any {
        var v: any = ["ViewMailContent", (<any>sg).view.mail.ViewMailContent /* z9 */];
        Object.defineProperty(ConfigClass, "VIEW_MAIL_CONTENT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MAIL_PERSONAL=["ViewMailPersonal",Y9] */
    public static get VIEW_MAIL_PERSONAL(): any {
        var v: any = ["ViewMailPersonal", (<any>sg).view.mail.ViewMailPersonal /* Y9 */];
        Object.defineProperty(ConfigClass, "VIEW_MAIL_PERSONAL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOW_PROBABILITY=["ViewShowProbability",U9] */
    public static get VIEW_SHOW_PROBABILITY(): any {
        var v: any = ["ViewShowProbability", (<any>sg).view.inside.ViewShowProbability /* U9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOW_PROBABILITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_PROBABILITY=["ViewHeritageProbability",r9] */
    public static get VIEW_HERITAGE_PROBABILITY(): any {
        var v: any = ["ViewHeritageProbability", (<any>sg).view.inside.ViewHeritageProbability /* r9 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_PROBABILITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOW_BIGSHOTPROBABILITY=["BigShotProbability",_3] */
    public static get VIEW_SHOW_BIGSHOTPROBABILITY(): any {
        var v: any = ["BigShotProbability", (<any>sg).view.bigShot.BigShotProbability /* _3 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOW_BIGSHOTPROBABILITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MORE_MAIN=["ViewMoreMain",fit] */
    public static get VIEW_MORE_MAIN(): any {
        var v: any = ["ViewMoreMain", (<any>sg).view.more.ViewMoreMain /* fit */];
        Object.defineProperty(ConfigClass, "VIEW_MORE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NEW_MORE_MAIN=["ViewNewMoreMain",vit] */
    public static get VIEW_NEW_MORE_MAIN(): any {
        var v: any = ["ViewNewMoreMain", (<any>sg).view.more.ViewNewMoreMain /* vit */];
        Object.defineProperty(ConfigClass, "VIEW_NEW_MORE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CODE=["ViewCode",r8] */
    public static get VIEW_CODE(): any {
        var v: any = ["ViewCode", (<any>sg).view.init.ViewCode /* r8 */];
        Object.defineProperty(ConfigClass, "VIEW_CODE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOGUN_LVUP=["ViewShogunLvUp",L9] */
    public static get VIEW_SHOGUN_LVUP(): any {
        var v: any = ["ViewShogunLvUp", (<any>sg).view.inside.ViewShogunLvUp /* L9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOGUN_LVUP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOGUN_HERO=["ViewShogunHero",B9] */
    public static get VIEW_SHOGUN_HERO(): any {
        var v: any = ["ViewShogunHero", (<any>sg).view.inside.ViewShogunHero /* B9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOGUN_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOGUN_MAIN=["ViewShogunMain",A9] */
    public static get VIEW_SHOGUN_MAIN(): any {
        var v: any = ["ViewShogunMain", (<any>sg).view.inside.ViewShogunMain /* A9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOGUN_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOGUN_MAIN_2=["ViewShogunMain_2",N9] */
    public static get VIEW_SHOGUN_MAIN_2(): any {
        var v: any = ["ViewShogunMain_2", (<any>sg).view.inside.ViewShogunMain_2 /* N9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOGUN_MAIN_2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SHOGUN_CHOOSE=["ViewShogunChoose",S9] */
    public static get VIEW_SHOGUN_CHOOSE(): any {
        var v: any = ["ViewShogunChoose", (<any>sg).view.inside.ViewShogunChoose /* S9 */];
        Object.defineProperty(ConfigClass, "VIEW_SHOGUN_CHOOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_UNLOCK=["ViewUnlock",V8] */
    public static get VIEW_UNLOCK(): any {
        var v: any = ["ViewUnlock", (<any>sg).view.init.ViewUnlock /* V8 */];
        Object.defineProperty(ConfigClass, "VIEW_UNLOCK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TIMER=["ViewTimer",O8] */
    public static get VIEW_TIMER(): any {
        var v: any = ["ViewTimer", (<any>sg).view.init.ViewTimer /* O8 */];
        Object.defineProperty(ConfigClass, "VIEW_TIMER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREDIT_MAIN=["ViewCreditMain",ytt] */
    public static get VIEW_CREDIT_MAIN(): any {
        var v: any = ["ViewCreditMain", (<any>sg).view.map.ViewCreditMain /* ytt */];
        Object.defineProperty(ConfigClass, "VIEW_CREDIT_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREDIT_MAIN_2=["ViewCreditMain2",Itt] */
    public static get VIEW_CREDIT_MAIN_2(): any {
        var v: any = ["ViewCreditMain2", (<any>sg).view.map.ViewCreditMain2 /* Itt */];
        Object.defineProperty(ConfigClass, "VIEW_CREDIT_MAIN_2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EQUIP_WASH_GF=["ViewEquipWashGF",o9] */
    public static get VIEW_EQUIP_WASH_GF(): any {
        var v: any = ["ViewEquipWashGF", (<any>sg).view.inside.ViewEquipWashGF /* o9 */];
        Object.defineProperty(ConfigClass, "VIEW_EQUIP_WASH_GF", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TIPS_INFO=["ViewTipsInfo",iit] */
    public static get VIEW_TIPS_INFO(): any {
        var v: any = ["ViewTipsInfo", (<any>sg).view.more.ViewTipsInfo /* iit */];
        Object.defineProperty(ConfigClass, "VIEW_TIPS_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_RADAR_INFO=["ViewHeroRadarInfo",B4] */
    public static get VIEW_HERO_RADAR_INFO(): any {
        var v: any = ["ViewHeroRadarInfo", (<any>sg).view.hero.ViewHeroRadarInfo /* B4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_RADAR_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SETTINGS=["ViewSettings",n3] */
    public static get VIEW_SETTINGS(): any {
        var v: any = ["ViewSettings", (<any>sg).view.more.ViewSettings /* n3 */];
        Object.defineProperty(ConfigClass, "VIEW_SETTINGS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SETTINGS_H=["ViewSettings_H",Iit] */
    public static get VIEW_SETTINGS_H(): any {
        var v: any = ["ViewSettings_H", (<any>sg).view.more.ViewSettings_H /* Iit */];
        Object.defineProperty(ConfigClass, "VIEW_SETTINGS_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BECOME_STRONGER=["ViewBecomeStronger",cit] */
    public static get VIEW_BECOME_STRONGER(): any {
        var v: any = ["ViewBecomeStronger", (<any>sg).view.more.ViewBecomeStronger /* cit */];
        Object.defineProperty(ConfigClass, "VIEW_BECOME_STRONGER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_POWER_LEVEL=["ViewPowerLevel",Tit] */
    public static get VIEW_POWER_LEVEL(): any {
        var v: any = ["ViewPowerLevel", (<any>sg).view.powerLevel.ViewPowerLevel /* Tit */];
        Object.defineProperty(ConfigClass, "VIEW_POWER_LEVEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_MAIN=["ViewCountryMain",rtt] */
    public static get VIEW_COUNTRY_MAIN(): any {
        var v: any = ["ViewCountryMain", (<any>sg).view.map.ViewCountryMain /* rtt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_OFFICER_INFO=["ViewCountryOfficerInfo",utt] */
    public static get VIEW_COUNTRY_OFFICER_INFO(): any {
        var v: any = ["ViewCountryOfficerInfo", (<any>sg).view.map.ViewCountryOfficerInfo /* utt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_OFFICER_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_OFFICER_LIST=["ViewCountryOfficerList",dtt] */
    public static get VIEW_COUNTRY_OFFICER_LIST(): any {
        var v: any = ["ViewCountryOfficerList", (<any>sg).view.map.ViewCountryOfficerList /* dtt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_OFFICER_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_OFFICER_TIPS=["ViewCountryOfficerTips",_tt] */
    public static get VIEW_COUNTRY_OFFICER_TIPS(): any {
        var v: any = ["ViewCountryOfficerTips", (<any>sg).view.map.ViewCountryOfficerTips /* _tt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_OFFICER_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_STORE_LIST=["ViewCountryStoreList",gtt] */
    public static get VIEW_COUNTRY_STORE_LIST(): any {
        var v: any = ["ViewCountryStoreList", (<any>sg).view.map.ViewCountryStoreList /* gtt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_STORE_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_MAYOR_LIST=["ViewCountryMayorList",ltt] */
    public static get VIEW_COUNTRY_MAYOR_LIST(): any {
        var v: any = ["ViewCountryMayorList", (<any>sg).view.map.ViewCountryMayorList /* ltt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_MAYOR_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_INVADE_MAIN=["ViewCountryInvadeMain",ott] */
    public static get VIEW_COUNTRY_INVADE_MAIN(): any {
        var v: any = ["ViewCountryInvadeMain", (<any>sg).view.map.ViewCountryInvadeMain /* ott */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_INVADE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREATE_BUFF=["",ptt] */
    public static get VIEW_CREATE_BUFF(): any {
        var v: any = ["", (<any>sg).view.map.ViewCreateBuff /* ptt */];
        Object.defineProperty(ConfigClass, "VIEW_CREATE_BUFF", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_KING_TIPS=["ViewCountryKingTips",att] */
    public static get VIEW_COUNTRY_KING_TIPS(): any {
        var v: any = ["ViewCountryKingTips", (<any>sg).view.map.ViewCountryKingTips /* att */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_KING_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_TIPS_ORDER=["ViewCountryTipsOrder",ftt] */
    public static get VIEW_COUNTRY_TIPS_ORDER(): any {
        var v: any = ["ViewCountryTipsOrder", (<any>sg).view.map.ViewCountryTipsOrder /* ftt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_TIPS_ORDER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_IMPEACH=["ViewImpeach",U3] */
    public static get VIEW_COUNTRY_IMPEACH(): any {
        var v: any = ["ViewImpeach", (<any>sg).view.country.ViewImpeach /* U3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_IMPEACH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_RISK=["ViewCountryRisk",mtt] */
    public static get VIEW_COUNTRY_RISK(): any {
        var v: any = ["ViewCountryRisk", (<any>sg).view.map.ViewCountryRisk /* mtt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_RISK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_REPORT=["ViewCountryReport",N3] */
    public static get VIEW_COUNTRY_REPORT(): any {
        var v: any = ["ViewCountryReport", (<any>sg).view.country.ViewCountryReport /* N3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_REPORT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_MAYOR_LIST_H=["ViewCountryMayorList_H",ctt] */
    public static get VIEW_COUNTRY_MAYOR_LIST_H(): any {
        var v: any = ["ViewCountryMayorList_H", (<any>sg).view.map.ViewCountryMayorList_H /* ctt */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_MAYOR_LIST_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TASK_MAIN=["ViewTaskMain",get] */
    public static get VIEW_TASK_MAIN(): any {
        var v: any = ["ViewTaskMain", (<any>sg).view.task.ViewTaskMain /* get */];
        Object.defineProperty(ConfigClass, "VIEW_TASK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WORK_ASSESS=["ViewWorkAssess",pet] */
    public static get VIEW_WORK_ASSESS(): any {
        var v: any = ["ViewWorkAssess", (<any>sg).view.task.ViewWorkAssess /* pet */];
        Object.defineProperty(ConfigClass, "VIEW_WORK_ASSESS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WORK_DONATION=["ViewWorkDonation",yet] */
    public static get VIEW_WORK_DONATION(): any {
        var v: any = ["ViewWorkDonation", (<any>sg).view.task.ViewWorkDonation /* yet */];
        Object.defineProperty(ConfigClass, "VIEW_WORK_DONATION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WORK_CONQUEST=["ViewWorkConquest",met] */
    public static get VIEW_WORK_CONQUEST(): any {
        var v: any = ["ViewWorkConquest", (<any>sg).view.task.ViewWorkConquest /* met: comma expr (ViewFTaskTest, ViewWorkConquest) -> last */];
        Object.defineProperty(ConfigClass, "VIEW_WORK_CONQUEST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TASK_CHAPTER=["ViewTaskChapter",_et] */
    public static get VIEW_TASK_CHAPTER(): any {
        var v: any = ["ViewTaskChapter", (<any>sg).view.task.ViewTaskChapter /* _et */];
        Object.defineProperty(ConfigClass, "VIEW_TASK_CHAPTER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ACHIEVEMENT=["ViewAchievement",sZ] */
    public static get VIEW_ACHIEVEMENT(): any {
        var v: any = ["ViewAchievement", (<any>sg).achievement.view.ViewAchievement /* sZ */];
        Object.defineProperty(ConfigClass, "VIEW_ACHIEVEMENT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ACHIEVEMENT_V=["ViewAchievement_V",hZ] */
    public static get VIEW_ACHIEVEMENT_V(): any {
        var v: any = ["ViewAchievement_V", (<any>sg).achievement.view.ViewAchievement_V /* hZ */];
        Object.defineProperty(ConfigClass, "VIEW_ACHIEVEMENT_V", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ACHIEVEMENT_DETAIL=["ViewAchievementDetail",nZ] */
    public static get VIEW_ACHIEVEMENT_DETAIL(): any {
        var v: any = ["ViewAchievementDetail", (<any>sg).achievement.view.ViewAchievementDetail /* nZ */];
        Object.defineProperty(ConfigClass, "VIEW_ACHIEVEMENT_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ONLINE_REWARD_PANEL=["ViewOnlineRewardPanel",QZ] */
    public static get VIEW_ONLINE_REWARD_PANEL(): any {
        var v: any = ["ViewOnlineRewardPanel", (<any>sg).activities.view.ViewOnlineRewardPanel /* QZ */];
        Object.defineProperty(ConfigClass, "VIEW_ONLINE_REWARD_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ACTIVITIES=["ViewActivities",LZ] */
    public static get VIEW_ACTIVITIES(): any {
        var v: any = ["ViewActivities", (<any>sg).activities.view.ViewActivities /* LZ */];
        Object.defineProperty(ConfigClass, "VIEW_ACTIVITIES", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.WISH_CHOOSE_PANEL=["WishChoosePanel",_1] */
    public static get WISH_CHOOSE_PANEL(): any {
        var v: any = ["WishChoosePanel", (<any>sg).activities.view.WishChoosePanel /* _1 */];
        Object.defineProperty(ConfigClass, "WISH_CHOOSE_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_REWARD_PREVIEW=["ViewRewardPreview",e1] */
    public static get VIEW_REWARD_PREVIEW(): any {
        var v: any = ["ViewRewardPreview", (<any>sg).activities.view.ViewRewardPreview /* e1 */];
        Object.defineProperty(ConfigClass, "VIEW_REWARD_PREVIEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MEMBER_CARD=["ViewMemberRewardPanel",KZ] */
    public static get VIEW_MEMBER_CARD(): any {
        var v: any = ["ViewMemberRewardPanel", (<any>sg).activities.view.ViewMemberRewardPanel /* KZ */];
        Object.defineProperty(ConfigClass, "VIEW_MEMBER_CARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WEEK_CARD=["ViewWeekcardRewardPanel",d1] */
    public static get VIEW_WEEK_CARD(): any {
        var v: any = ["ViewWeekcardRewardPanel", (<any>sg).activities.view.ViewWeekcardRewardPanel /* d1 */];
        Object.defineProperty(ConfigClass, "VIEW_WEEK_CARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_BILL=["ViewFreeBill",zZ] */
    public static get VIEW_FREE_BILL(): any {
        var v: any = ["ViewFreeBill", (<any>sg).activities.view.ViewFreeBill /* zZ */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_BILL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_BILL_Record=["ViewFreeBillRecord",jZ] */
    public static get VIEW_FREE_BILL_Record(): any {
        var v: any = ["ViewFreeBillRecord", (<any>sg).activities.view.ViewFreeBillRecord /* jZ */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_BILL_Record", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_BILL_Reward=["ViewFreeBillReward",YZ] */
    public static get VIEW_FREE_BILL_Reward(): any {
        var v: any = ["ViewFreeBillReward", (<any>sg).activities.view.ViewFreeBillReward /* YZ */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_BILL_Reward", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAYMENT=["ViewPayment",ZZ] */
    public static get VIEW_PAYMENT(): any {
        var v: any = ["ViewPayment", (<any>sg).activities.view.ViewPayment /* ZZ */];
        Object.defineProperty(ConfigClass, "VIEW_PAYMENT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BASE_LEVEL_UP=["ViewBaseLevelUp",RZ] */
    public static get VIEW_BASE_LEVEL_UP(): any {
        var v: any = ["ViewBaseLevelUp", (<any>sg).activities.view.ViewBaseLevelUp /* RZ */];
        Object.defineProperty(ConfigClass, "VIEW_BASE_LEVEL_UP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUIDE_IMAGE=["ViewGuideImage",k5] */
    public static get VIEW_GUIDE_IMAGE(): any {
        var v: any = ["ViewGuideImage", (<any>sg).guide.view.ViewGuideImage /* k5 */];
        Object.defineProperty(ConfigClass, "VIEW_GUIDE_IMAGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUIDE_SKIP=["ViewGuideSkip",T5] */
    public static get VIEW_GUIDE_SKIP(): any {
        var v: any = ["ViewGuideSkip", (<any>sg).guide.view.ViewGuideSkip /* T5 */];
        Object.defineProperty(ConfigClass, "VIEW_GUIDE_SKIP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ALIEN_MAIN=["ViewAlienMain",Q9] */
    public static get VIEW_ALIEN_MAIN(): any {
        var v: any = ["ViewAlienMain", (<any>sg).view.map.ViewAlienMain /* Q9 */];
        Object.defineProperty(ConfigClass, "VIEW_ALIEN_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CAPTAIN_MAIN=["ViewCaptainMain",Vst] */
    public static get VIEW_CAPTAIN_MAIN(): any {
        var v: any = ["ViewCaptainMain", (<any>sg).view.map.ViewCaptainMain /* Vst */];
        Object.defineProperty(ConfigClass, "VIEW_CAPTAIN_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NPC_INFO=["ViewNpcInfo",yit] */
    public static get VIEW_NPC_INFO(): any {
        var v: any = ["ViewNpcInfo", (<any>sg).view.more.ViewNpcInfo /* yit */];
        Object.defineProperty(ConfigClass, "VIEW_NPC_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MORE_RANK_MAIN=["ViewMoreRankMain",pit] */
    public static get VIEW_MORE_RANK_MAIN(): any {
        var v: any = ["ViewMoreRankMain", (<any>sg).view.more.ViewMoreRankMain /* pit */];
        Object.defineProperty(ConfigClass, "VIEW_MORE_RANK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.MENU_HOMELAND_BUILD=["ViewHomeLand_Build",hJ] */
    public static get MENU_HOMELAND_BUILD(): any {
        var v: any = ["ViewHomeLand_Build", (<any>sg).view.menu.ViewHomeLand_Build /* hJ */];
        Object.defineProperty(ConfigClass, "MENU_HOMELAND_BUILD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.MENU_HOMELAND_CHANGE=["ViewHomeLand_Change",oJ] */
    public static get MENU_HOMELAND_CHANGE(): any {
        var v: any = ["ViewHomeLand_Change", (<any>sg).view.menu.ViewHomeLand_Change /* oJ */];
        Object.defineProperty(ConfigClass, "MENU_HOMELAND_CHANGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.MENU_HOMELAND_PLAN=["ViewHomeLand_Plan",eit] */
    public static get MENU_HOMELAND_PLAN(): any {
        var v: any = ["ViewHomeLand_Plan", (<any>sg).view.menu.ViewHomeLand_Plan /* eit */];
        Object.defineProperty(ConfigClass, "MENU_HOMELAND_PLAN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HOMELAND_INFO=["ViewHomeLandInfo",tit] */
    public static get VIEW_HOMELAND_INFO(): any {
        var v: any = ["ViewHomeLandInfo", (<any>sg).view.menu.ViewHomeLandInfo /* tit */];
        Object.defineProperty(ConfigClass, "VIEW_HOMELAND_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.MINI_MAPTOP=["MiniMapTop",Y2] */
    public static get MINI_MAPTOP(): any {
        var v: any = ["MiniMapTop", (<any>sg).outline.view.ui.MiniMapTop /* Y2 */];
        Object.defineProperty(ConfigClass, "MINI_MAPTOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.MINI_MAPTOP2=["MiniMapTop2",X2] */
    public static get MINI_MAPTOP2(): any {
        var v: any = ["MiniMapTop2", (<any>sg).outline.view.ui.MiniMapTop2 /* X2 */];
        Object.defineProperty(ConfigClass, "MINI_MAPTOP2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_LOG=["ViewFightLog",uit] */
    public static get VIEW_FIGHT_LOG(): any {
        var v: any = ["ViewFightLog", (<any>sg).view.more.ViewFightLog /* uit */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_LOG", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_LOG_INFO=["ViewFightLogInfo",dit] */
    public static get VIEW_FIGHT_LOG_INFO(): any {
        var v: any = ["ViewFightLogInfo", (<any>sg).view.more.ViewFightLogInfo /* dit */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_LOG_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_LOG_H=["ViewFightLog_H",mit] */
    public static get VIEW_FIGHT_LOG_H(): any {
        var v: any = ["ViewFightLog_H", (<any>sg).view.more.ViewFightLog_H /* mit */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_LOG_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_LOG_SHAREPLAY=["ViewFightLogSharePlay_H",_it] */
    public static get VIEW_FIGHT_LOG_SHAREPLAY(): any {
        var v: any = ["ViewFightLogSharePlay_H", (<any>sg).view.more.ViewFightLogSharePlay_H /* _it */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_LOG_SHAREPLAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_OVERLORD=["ViewOverlord",bit] */
    public static get VIEW_OVERLORD(): any {
        var v: any = ["ViewOverlord", (<any>sg).view.more.ViewOverlord /* bit */];
        Object.defineProperty(ConfigClass, "VIEW_OVERLORD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PVP_TIPS=["",z3] */
    public static get VIEW_PVP_TIPS(): any {
        var v: any = ["", (<any>sg).view.countryPvp.ViewPVPTips /* z3 */];
        Object.defineProperty(ConfigClass, "VIEW_PVP_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_CHOOSE=["ViewHeroChoose",git] */
    public static get VIEW_HERO_CHOOSE(): any {
        var v: any = ["ViewHeroChoose", (<any>sg).view.more.ViewHeroChoose /* git */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_CHOOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.ANTI_ADDICTION=["ViewAntiAddiction",s8] */
    public static get ANTI_ADDICTION(): any {
        var v: any = ["ViewAntiAddiction", (<any>sg).view.init.ViewAntiAddiction /* s8 */];
        Object.defineProperty(ConfigClass, "ANTI_ADDICTION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TREASURE_HUNTING=["ViewTreasureHunting",g0] */
    public static get VIEW_TREASURE_HUNTING(): any {
        var v: any = ["ViewTreasureHunting", (<any>sg).explore.view.ViewTreasureHunting /* g0 */];
        Object.defineProperty(ConfigClass, "VIEW_TREASURE_HUNTING", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HUNT_DETAIL=["ViewHuntDetail",_0] */
    public static get VIEW_HUNT_DETAIL(): any {
        var v: any = ["ViewHuntDetail", (<any>sg).explore.view.ViewHuntDetail /* _0 */];
        Object.defineProperty(ConfigClass, "VIEW_HUNT_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HUNT_PRAY_PANEL=["ViewHuntPrayPanel",m0] */
    public static get VIEW_HUNT_PRAY_PANEL(): any {
        var v: any = ["ViewHuntPrayPanel", (<any>sg).explore.view.ViewHuntPrayPanel /* m0 */];
        Object.defineProperty(ConfigClass, "VIEW_HUNT_PRAY_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_REPORT_PANEL=["ViewFightReportPanel",d0] */
    public static get VIEW_FIGHT_REPORT_PANEL(): any {
        var v: any = ["ViewFightReportPanel", (<any>sg).explore.view.ViewFightReportPanel /* d0 */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_REPORT_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EXPLORE_TROOP=["ViewExploreTroop",gst] */
    public static get VIEW_EXPLORE_TROOP(): any {
        var v: any = ["ViewExploreTroop", (<any>sg).explore.view.ViewExploreTroop /* gst */];
        Object.defineProperty(ConfigClass, "VIEW_EXPLORE_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_HUNT=["ViewPKHunt",Ist] */
    public static get VIEW_PK_HUNT(): any {
        var v: any = ["ViewPKHunt", (<any>sg).explore.view.ViewPKHunt /* Ist */];
        Object.defineProperty(ConfigClass, "VIEW_PK_HUNT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHANGE_HERO=["ViewChangeHero",u0] */
    public static get VIEW_CHANGE_HERO(): any {
        var v: any = ["ViewChangeHero", (<any>sg).explore.view.ViewChangeHero /* u0 */];
        Object.defineProperty(ConfigClass, "VIEW_CHANGE_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL=["ViewFestival",v0] */
    public static get VIEW_FESTIVAL(): any {
        var v: any = ["ViewFestival", (<any>sg).festival.view.ViewFestival /* v0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_H=["ViewFestival_H",T0] */
    public static get VIEW_FESTIVAL_H(): any {
        var v: any = ["ViewFestival_H", (<any>sg).festival.view.ViewFestival_H /* T0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LIMITRECHARGE=["ViewLimitRecharge",G9] */
    public static get VIEW_LIMITRECHARGE(): any {
        var v: any = ["ViewLimitRecharge", (<any>sg).view.limitRecharge.ViewLimitRecharge /* G9 */];
        Object.defineProperty(ConfigClass, "VIEW_LIMITRECHARGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LIMITRECHARGE_H=["ViewLimitRecharge_H",V9] */
    public static get VIEW_LIMITRECHARGE_H(): any {
        var v: any = ["ViewLimitRecharge_H", (<any>sg).view.limitRecharge.ViewLimitRecharge_H /* V9 */];
        Object.defineProperty(ConfigClass, "VIEW_LIMITRECHARGE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_IDOLLOGIN=["IdolLogin_H",p0] */
    public static get VIEW_IDOLLOGIN(): any {
        var v: any = ["IdolLogin_H", (<any>sg).festival.view.IdolLogin_H /* p0 */];
        Object.defineProperty(ConfigClass, "VIEW_IDOLLOGIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AWAKEN_PASS=["ViewAwakenPass",X7] */
    public static get VIEW_AWAKEN_PASS(): any {
        var v: any = ["ViewAwakenPass", (<any>sg).view.awakenpass.ViewAwakenPass /* X7 */];
        Object.defineProperty(ConfigClass, "VIEW_AWAKEN_PASS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AUCTION=["ViewAuction",EZ] */
    public static get VIEW_AUCTION(): any {
        var v: any = ["ViewAuction", (<any>sg).activities.view.ViewAuction /* EZ */];
        Object.defineProperty(ConfigClass, "VIEW_AUCTION", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AUCTION_H=["ViewAuction_H",PZ] */
    public static get VIEW_AUCTION_H(): any {
        var v: any = ["ViewAuction_H", (<any>sg).activities.view.ViewAuction_H /* PZ */];
        Object.defineProperty(ConfigClass, "VIEW_AUCTION_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.AUCTION_BID=["AuctionBid",oZ] */
    public static get AUCTION_BID(): any {
        var v: any = ["AuctionBid", (<any>sg).activities.view.AuctionBid /* oZ */];
        Object.defineProperty(ConfigClass, "AUCTION_BID", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AWAKEN_HERO=["ViewAwakenHero",c4] */
    public static get VIEW_AWAKEN_HERO(): any {
        var v: any = ["ViewAwakenHero", (<any>sg).view.hero.ViewAwakenHero /* c4 */];
        Object.defineProperty(ConfigClass, "VIEW_AWAKEN_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_AWAKEN_H=["ViewHeroAwaken",_4] */
    public static get VIEW_HERO_AWAKEN_H(): any {
        var v: any = ["ViewHeroAwaken", (<any>sg).view.hero.ViewHeroAwaken_H /* _4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_AWAKEN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_AUCTION_NOTICE_H=["ViewAuctionNotice_H",DZ] */
    public static get VIEW_AUCTION_NOTICE_H(): any {
        var v: any = ["ViewAuctionNotice_H", (<any>sg).activities.view.ViewAuctionNotice_H /* DZ */];
        Object.defineProperty(ConfigClass, "VIEW_AUCTION_NOTICE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_RANK=["ViewPayRank",JZ] */
    public static get VIEW_PAY_RANK(): any {
        var v: any = ["ViewPayRank", (<any>sg).activities.view.ViewPayRank /* JZ */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_RANK_REWARD=["ViewPayRankReward",t1] */
    public static get VIEW_PAY_RANK_REWARD(): any {
        var v: any = ["ViewPayRankReward", (<any>sg).activities.view.ViewPayRankReward /* t1 */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_RANK_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_RANK_TIPS=["ViewPayRankTips",i1] */
    public static get VIEW_PAY_RANK_TIPS(): any {
        var v: any = ["ViewPayRankTips", (<any>sg).activities.view.ViewPayRankTips /* i1 */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_RANK_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_RANK_H=["ViewPayRank_H",xZ] */
    public static get VIEW_PAY_RANK_H(): any {
        var v: any = ["ViewPayRank_H", (<any>sg).activities.view.payRank.ViewPayRank_H /* xZ */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_RANK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_TASK=["ViewFightTask",Ftt] */
    public static get VIEW_FIGHT_TASK(): any {
        var v: any = ["ViewFightTask", (<any>sg).view.map.ViewFightTask /* Ftt */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIGHT_TASK_H=["ViewFightTask_H",Htt] */
    public static get VIEW_FIGHT_TASK_H(): any {
        var v: any = ["ViewFightTask_H", (<any>sg).view.map.ViewFightTask_H /* Htt */];
        Object.defineProperty(ConfigClass, "VIEW_FIGHT_TASK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TROOP_COIN_FILL=["ViewTroopCoinFill",qtt] */
    public static get VIEW_TROOP_COIN_FILL(): any {
        var v: any = ["ViewTroopCoinFill", (<any>sg).view.map.ViewTroopCoinFill /* qtt */];
        Object.defineProperty(ConfigClass, "VIEW_TROOP_COIN_FILL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CREDITRESULT=["ViewCreditResult",xtt] */
    public static get VIEW_CREDITRESULT(): any {
        var v: any = ["ViewCreditResult", (<any>sg).view.map.ViewCreditResult /* xtt */];
        Object.defineProperty(ConfigClass, "VIEW_CREDITRESULT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NOTICE_PICTURE=["ViewNoticePicture",S8] */
    public static get VIEW_NOTICE_PICTURE(): any {
        var v: any = ["ViewNoticePicture", (<any>sg).view.init.ViewNoticePicture /* S8 */];
        Object.defineProperty(ConfigClass, "VIEW_NOTICE_PICTURE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_PVP_TIPS=["ViewCountryPvpTips",O3] */
    public static get VIEW_COUNTRY_PVP_TIPS(): any {
        var v: any = ["ViewCountryPvpTips", (<any>sg).view.countryPvp.ViewCountryPvpTips /* O3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_PVP_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_TRIBUTARY_TIPS=["ViewCountryTributaryTips",G3] */
    public static get VIEW_COUNTRY_TRIBUTARY_TIPS(): any {
        var v: any = ["ViewCountryTributaryTips", (<any>sg).view.countryPvp.ViewCountryTributaryTips /* G3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_TRIBUTARY_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EMPEROR_TIPS=["ViewCountryEmperorTips",R3] */
    public static get VIEW_EMPEROR_TIPS(): any {
        var v: any = ["ViewCountryEmperorTips", (<any>sg).view.countryPvp.ViewCountryEmperorTips /* R3 */];
        Object.defineProperty(ConfigClass, "VIEW_EMPEROR_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EQUIP_MAIN=["ViewEquipMain",j3] */
    public static get VIEW_EQUIP_MAIN(): any {
        var v: any = ["ViewEquipMain", (<any>sg).view.equip.ViewEquipMain /* j3 */];
        Object.defineProperty(ConfigClass, "VIEW_EQUIP_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EQUIP_BOX=["ViewEquipBox",VZ] */
    public static get VIEW_EQUIP_BOX(): any {
        var v: any = ["ViewEquipBox", (<any>sg).activities.view.ViewEquipBox /* VZ */];
        Object.defineProperty(ConfigClass, "VIEW_EQUIP_BOX", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SURPRISE_GIFT=["ViewSurpriseGift",l1] */
    public static get VIEW_SURPRISE_GIFT(): any {
        var v: any = ["ViewSurpriseGift", (<any>sg).activities.view.ViewSurpriseGift /* l1 */];
        Object.defineProperty(ConfigClass, "VIEW_SURPRISE_GIFT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SURPRISE_GIFT_NEW=["ViewSurpriseGiftNew",c1] */
    public static get VIEW_SURPRISE_GIFT_NEW(): any {
        var v: any = ["ViewSurpriseGiftNew", (<any>sg).activities.view.ViewSurpriseGiftNew /* c1 */];
        Object.defineProperty(ConfigClass, "VIEW_SURPRISE_GIFT_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BLESS_HERO=["ViewBlessHero",$9] */
    public static get VIEW_BLESS_HERO(): any {
        var v: any = ["ViewBlessHero", (<any>sg).view.map.ViewBlessHero /* $9 */];
        Object.defineProperty(ConfigClass, "VIEW_BLESS_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BLESS_HERO_RANK=["ViewBlessHeroRank",J9] */
    public static get VIEW_BLESS_HERO_RANK(): any {
        var v: any = ["ViewBlessHeroRank", (<any>sg).view.map.ViewBlessHeroRank /* J9 */];
        Object.defineProperty(ConfigClass, "VIEW_BLESS_HERO_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PVE_TROOP=["ViewPVETroop",f0] */
    public static get VIEW_PVE_TROOP(): any {
        var v: any = ["ViewPVETroop", (<any>sg).view.map.ViewPVETroop /* f0 */];
        Object.defineProperty(ConfigClass, "VIEW_PVE_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BLESS_HERO_H=["ViewBlessHero_H",Z9] */
    public static get VIEW_BLESS_HERO_H(): any {
        var v: any = ["ViewBlessHero_H", (<any>sg).view.map.ViewBlessHero_H /* Z9 */];
        Object.defineProperty(ConfigClass, "VIEW_BLESS_HERO_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NEW_TASK_MAIN=["ViewNewTaskMain",kit] */
    public static get VIEW_NEW_TASK_MAIN(): any {
        var v: any = ["ViewNewTaskMain", (<any>sg).view.newtask.ViewNewTaskMain /* kit */];
        Object.defineProperty(ConfigClass, "VIEW_NEW_TASK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SALE_PAY_ALERT=["ViewSalePayAlert",n1] */
    public static get VIEW_SALE_PAY_ALERT(): any {
        var v: any = ["ViewSalePayAlert", (<any>sg).activities.view.ViewSalePayAlert /* n1 */];
        Object.defineProperty(ConfigClass, "VIEW_SALE_PAY_ALERT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_PAYAGAIN=["ViewFestivalPayAgain",k0] */
    public static get VIEW_FESTIVAL_PAYAGAIN(): any {
        var v: any = ["ViewFestivalPayAgain", (<any>sg).festival.view.ViewFestivalPayAgain /* k0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_PAYAGAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.View_QQDT=["ViewQQDT",Bit] */
    public static get View_QQDT(): any {
        var v: any = ["ViewQQDT", (<any>sg).view.qqdt.ViewQQDT /* Bit */];
        Object.defineProperty(ConfigClass, "View_QQDT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.View_QQDT2=["ViewQQDT2",Ait] */
    public static get View_QQDT2(): any {
        var v: any = ["ViewQQDT2", (<any>sg).view.qqdt.ViewQQDT2 /* Ait */];
        Object.defineProperty(ConfigClass, "View_QQDT2", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BIG_PLAYER=["ViewBigPlayer",Sit] */
    public static get VIEW_BIG_PLAYER(): any {
        var v: any = ["ViewBigPlayer", (<any>sg).view.qqdt.ViewBigPlayer /* Sit */];
        Object.defineProperty(ConfigClass, "VIEW_BIG_PLAYER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_MAIN=["ViewHonourMain",Q4] */
    public static get VIEW_HONOUR_MAIN(): any {
        var v: any = ["ViewHonourMain", (<any>sg).view.honour.ViewHonourMain /* Q4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_HISTROY=["ViewHonourHistroy",q4] */
    public static get VIEW_HONOUR_HISTROY(): any {
        var v: any = ["ViewHonourHistroy", (<any>sg).view.honour.ViewHonourHistroy /* q4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_HISTROY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_RANK=["ViewHonourRank",$4] */
    public static get VIEW_HONOUR_RANK(): any {
        var v: any = ["ViewHonourRank", (<any>sg).view.honour.ViewHonourRank /* $4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_CHALLENGE=["ViewHonourChallenge",j4] */
    public static get VIEW_HONOUR_CHALLENGE(): any {
        var v: any = ["ViewHonourChallenge", (<any>sg).view.honour.ViewHonourChallenge /* j4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_CHALLENGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_FINISH=["ViewHonourFinish",Y4] */
    public static get VIEW_HONOUR_FINISH(): any {
        var v: any = ["ViewHonourFinish", (<any>sg).view.honour.ViewHonourFinish /* Y4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_FINISH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_REWARD=["ViewHonourReward",J4] */
    public static get VIEW_HONOUR_REWARD(): any {
        var v: any = ["ViewHonourReward", (<any>sg).view.honour.ViewHonourReward /* J4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HONOUR_INFO=["ViewHonourInfo",K4] */
    public static get VIEW_HONOUR_INFO(): any {
        var v: any = ["ViewHonourInfo", (<any>sg).view.honour.ViewHonourInfo /* K4 */];
        Object.defineProperty(ConfigClass, "VIEW_HONOUR_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_COUNTER=["ViewHeroCounter",g4] */
    public static get VIEW_HERO_COUNTER(): any {
        var v: any = ["ViewHeroCounter", (<any>sg).view.hero.ViewHeroCounter /* g4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_COUNTER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_COUNTER_H=["ViewHeroCounter_H",a4] */
    public static get VIEW_HERO_COUNTER_H(): any {
        var v: any = ["ViewHeroCounter_H", (<any>sg).view.hero.HeroFate_H.ViewHeroCounter_H /* a4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_COUNTER_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_NOTICE=["ViewCountryNotice",B3] */
    public static get VIEW_COUNTRY_NOTICE(): any {
        var v: any = ["ViewCountryNotice", (<any>sg).view.country.ViewCountryNotice /* B3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_NOTICE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_NOTICE_ALERT=["ViewCountryNoticeAlert",A3] */
    public static get VIEW_COUNTRY_NOTICE_ALERT(): any {
        var v: any = ["ViewCountryNoticeAlert", (<any>sg).view.country.ViewCountryNoticeAlert /* A3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_NOTICE_ALERT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CROSS_SERVICE_TROOP_DETAIL=["CrossServiceTroopDetail",H1] */
    public static get VIEW_CROSS_SERVICE_TROOP_DETAIL(): any {
        var v: any = ["CrossServiceTroopDetail", (<any>sg).crossService.view.CrossServiceTroopDetail /* H1 */];
        Object.defineProperty(ConfigClass, "VIEW_CROSS_SERVICE_TROOP_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_DUPLICATE_SHOP=["ViewDuplicateShop",OZ] */
    public static get VIEW_DUPLICATE_SHOP(): any {
        var v: any = ["ViewDuplicateShop", (<any>sg).activities.view.ViewDuplicateShop /* OZ */];
        Object.defineProperty(ConfigClass, "VIEW_DUPLICATE_SHOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_DUPLICATE_FAQ=["ViewDuplicateFAQ",t0] */
    public static get VIEW_DUPLICATE_FAQ(): any {
        var v: any = ["ViewDuplicateFAQ", (<any>sg).duplicate.view.ViewDuplicateFAQ /* t0 */];
        Object.defineProperty(ConfigClass, "VIEW_DUPLICATE_FAQ", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_PVP_MAIN=["ViewCountryPvpMain",F3] */
    public static get VIEW_COUNTRY_PVP_MAIN(): any {
        var v: any = ["ViewCountryPvpMain", (<any>sg).view.countryPvp.ViewCountryPvpMain /* F3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_PVP_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARENA_MAIN=["ViewArenaMain",Y7] */
    public static get VIEW_ARENA_MAIN(): any {
        var v: any = ["ViewArenaMain", (<any>sg).view.arena.ViewArenaMain /* Y7 */];
        Object.defineProperty(ConfigClass, "VIEW_ARENA_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SP_ARMY_BOX=["ViewSpArmyBox",h1] */
    public static get VIEW_SP_ARMY_BOX(): any {
        var v: any = ["ViewSpArmyBox", (<any>sg).activities.view.ViewSpArmyBox /* h1 */];
        Object.defineProperty(ConfigClass, "VIEW_SP_ARMY_BOX", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SP_ARMY_BOX_PAY=["ViewSpArmyBoxPay",r1] */
    public static get VIEW_SP_ARMY_BOX_PAY(): any {
        var v: any = ["ViewSpArmyBoxPay", (<any>sg).activities.view.ViewSpArmyBoxPay /* r1 */];
        Object.defineProperty(ConfigClass, "VIEW_SP_ARMY_BOX_PAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SP_ARMY_BOX_INFO=["ViewSpArmyBoxInfo",o1] */
    public static get VIEW_SP_ARMY_BOX_INFO(): any {
        var v: any = ["ViewSpArmyBoxInfo", (<any>sg).activities.view.ViewSpArmyBoxInfo /* o1 */];
        Object.defineProperty(ConfigClass, "VIEW_SP_ARMY_BOX_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_SP_ARMY=["ViewHeroSpArmy",E4] */
    public static get VIEW_HERO_SP_ARMY(): any {
        var v: any = ["ViewHeroSpArmy", (<any>sg).view.hero.ViewHeroSpArmy /* E4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_SP_ARMY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAT_MAIN=["ViewChatMain",I3] */
    public static get VIEW_CHAT_MAIN(): any {
        var v: any = ["ViewChatMain", (<any>sg).view.chat.ViewChatMain /* I3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAT_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BIGSHOT=["ViewBigShot",g3] */
    public static get VIEW_BIGSHOT(): any {
        var v: any = ["ViewBigShot", (<any>sg).view.bigShot.ViewBigShot /* g3 */];
        Object.defineProperty(ConfigClass, "VIEW_BIGSHOT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BIGSHOT_H=["ViewBigShot_H",m3] */
    public static get VIEW_BIGSHOT_H(): any {
        var v: any = ["ViewBigShot_H", (<any>sg).view.bigShot.ViewBigShot_H /* m3 */];
        Object.defineProperty(ConfigClass, "VIEW_BIGSHOT_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_SOUL=["ViewHeroSoul",Zit] */
    public static get VIEW_HERO_SOUL(): any {
        var v: any = ["ViewHeroSoul", (<any>sg).view.soul.ViewHeroSoul /* Zit */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_SOUL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SOUL_DETAIL=["ViewSoulDetail",tet] */
    public static get VIEW_SOUL_DETAIL(): any {
        var v: any = ["ViewSoulDetail", (<any>sg).view.soul.ViewSoulDetail /* tet */];
        Object.defineProperty(ConfigClass, "VIEW_SOUL_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SOUL_UPGRADE=["ViewSoulUpgrade",set] */
    public static get VIEW_SOUL_UPGRADE(): any {
        var v: any = ["ViewSoulUpgrade", (<any>sg).view.soul.ViewSoulUpgrade /* set */];
        Object.defineProperty(ConfigClass, "VIEW_SOUL_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SOUL_TIPS=["ViewSoulTips",eet] */
    public static get VIEW_SOUL_TIPS(): any {
        var v: any = ["ViewSoulTips", (<any>sg).view.soul.ViewSoulTips /* eet */];
        Object.defineProperty(ConfigClass, "VIEW_SOUL_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SOUL_FLASH=["ViewSoulFlash",iet] */
    public static get VIEW_SOUL_FLASH(): any {
        var v: any = ["ViewSoulFlash", (<any>sg).view.soul.ViewSoulFlash /* iet */];
        Object.defineProperty(ConfigClass, "VIEW_SOUL_FLASH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEVELUPGIFT=["ViewLevelupGift",O9] */
    public static get VIEW_LEVELUPGIFT(): any {
        var v: any = ["ViewLevelupGift", (<any>sg).view.levelupGift.ViewLevelupGift /* O9 */];
        Object.defineProperty(ConfigClass, "VIEW_LEVELUPGIFT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOMB_MAIN=["ViewTombMain",ket] */
    public static get VIEW_TOMB_MAIN(): any {
        var v: any = ["ViewTombMain", (<any>sg).view.tomb.ViewTombMain /* ket */];
        Object.defineProperty(ConfigClass, "VIEW_TOMB_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOMB_MAIN_H=["ViewTombMain_H",Met] */
    public static get VIEW_TOMB_MAIN_H(): any {
        var v: any = ["ViewTombMain_H", (<any>sg).view.tomb.ViewTombMain_H /* Met */];
        Object.defineProperty(ConfigClass, "VIEW_TOMB_MAIN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOMB_WISH=["ViewTombWish",Bet] */
    public static get VIEW_TOMB_WISH(): any {
        var v: any = ["ViewTombWish", (<any>sg).view.tomb.ViewTombWish /* Bet */];
        Object.defineProperty(ConfigClass, "VIEW_TOMB_WISH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GROUND_INFO=["ViewGroundInfo",bet] */
    public static get VIEW_GROUND_INFO(): any {
        var v: any = ["ViewGroundInfo", (<any>sg).view.tomb.ViewGroundInfo /* bet: comma expr (TestButton2, ViewGroundInfo) -> last */];
        Object.defineProperty(ConfigClass, "VIEW_GROUND_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOMB_LV_INFO=["ViewTombLvInfo",Cet] */
    public static get VIEW_TOMB_LV_INFO(): any {
        var v: any = ["ViewTombLvInfo", (<any>sg).view.tomb.ViewTombLvInfo /* Cet */];
        Object.defineProperty(ConfigClass, "VIEW_TOMB_LV_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOMB_ITEM_INFO=["ViewTombItemInfo",wet] */
    public static get VIEW_TOMB_ITEM_INFO(): any {
        var v: any = ["ViewTombItemInfo", (<any>sg).view.tomb.ViewTombItemInfo /* wet */];
        Object.defineProperty(ConfigClass, "VIEW_TOMB_ITEM_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_CONNECT_LINE_MAIN=["ViewGwentConnectLine",g6] */
    public static get VIEW_GWENT_CONNECT_LINE_MAIN(): any {
        var v: any = ["ViewGwentConnectLine", (<any>sg).view.fight.gwent.ViewGwentConnectLine /* g6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_CONNECT_LINE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_CONNECT_LINE_MAIN_H=["ViewGwentConnectLine_H",p6] */
    public static get VIEW_GWENT_CONNECT_LINE_MAIN_H(): any {
        var v: any = ["ViewGwentConnectLine_H", (<any>sg).view.fight.gwent.ViewGwentConnectLine_H /* p6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_CONNECT_LINE_MAIN_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_DUNGEONS=["ViewGwentDungeons",v6] */
    public static get VIEW_GWENT_DUNGEONS(): any {
        var v: any = ["ViewGwentDungeons", (<any>sg).view.fight.gwent.ViewGwentDungeons /* v6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_DUNGEONS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_DUNGEONS_H=["ViewGwentDungeons_H",y6] */
    public static get VIEW_GWENT_DUNGEONS_H(): any {
        var v: any = ["ViewGwentDungeons_H", (<any>sg).view.fight.gwent.ViewGwentDungeons_H /* y6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_DUNGEONS_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_CHOICE_HERO=["GwentChoiceHero",l6] */
    public static get VIEW_GWENT_CHOICE_HERO(): any {
        var v: any = ["GwentChoiceHero", (<any>sg).view.fight.gwent.GwentChoiceHero /* l6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_CHOICE_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_CHOICE_HERO_H=["GwentChoiceHero_H",c6] */
    public static get VIEW_GWENT_CHOICE_HERO_H(): any {
        var v: any = ["GwentChoiceHero_H", (<any>sg).view.fight.gwent.GwentChoiceHero_H /* c6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_CHOICE_HERO_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_SHOP=["ViewGwentShop",N6] */
    public static get VIEW_GWENT_GWENT_SHOP(): any {
        var v: any = ["ViewGwentShop", (<any>sg).view.fight.gwent.ViewGwentShop /* N6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_SHOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_SHOP_H=["ViewGwentShop_H",U6] */
    public static get VIEW_GWENT_GWENT_SHOP_H(): any {
        var v: any = ["ViewGwentShop_H", (<any>sg).view.fight.gwent.ViewGwentShop_H /* U6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_SHOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ASK=["ViewGwentAsk",d6] */
    public static get VIEW_GWENT_ASK(): any {
        var v: any = ["ViewGwentAsk", (<any>sg).view.fight.gwent.ViewGwentAsk /* d6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ASK_H=["ViewGwentAsk_H",_6] */
    public static get VIEW_GWENT_ASK_H(): any {
        var v: any = ["ViewGwentAsk_H", (<any>sg).view.fight.gwent.ViewGwentAsk_H /* _6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ASK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_FIGHT_HEROS=["ViewGwentFightHeros",I6] */
    public static get VIEW_GWENT_FIGHT_HEROS(): any {
        var v: any = ["ViewGwentFightHeros", (<any>sg).view.fight.gwent.ViewGwentFightHeros /* I6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_FIGHT_HEROS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_FIGHT_HEROS_H=["ViewGwentFightHeros_H",x6] */
    public static get VIEW_GWENT_FIGHT_HEROS_H(): any {
        var v: any = ["ViewGwentFightHeros_H", (<any>sg).view.fight.gwent.ViewGwentFightHeros_H /* x6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_FIGHT_HEROS_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_RELIC=["ViewGwentRelic",S6] */
    public static get VIEW_GWENT_GWENT_RELIC(): any {
        var v: any = ["ViewGwentRelic", (<any>sg).view.fight.gwent.ViewGwentRelic /* S6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_RELIC", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_RELIC_H=["ViewGwentRelic_H",L6] */
    public static get VIEW_GWENT_GWENT_RELIC_H(): any {
        var v: any = ["ViewGwentRelic_H", (<any>sg).view.fight.gwent.ViewGwentRelic_H /* L6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_RELIC_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_TALK=["ViewGwentTalk",P6] */
    public static get VIEW_GWENT_GWENT_TALK(): any {
        var v: any = ["ViewGwentTalk", (<any>sg).view.fight.gwent.ViewGwentTalk /* P6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_TALK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_GWENT_TALK_H=["ViewGwentTalk_H",D6] */
    public static get VIEW_GWENT_GWENT_TALK_H(): any {
        var v: any = ["ViewGwentTalk_H", (<any>sg).view.fight.gwent.ViewGwentTalk_H /* D6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_GWENT_TALK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ITEM_CHANGE=["ViewGwentItemChange",w6] */
    public static get VIEW_GWENT_ITEM_CHANGE(): any {
        var v: any = ["ViewGwentItemChange", (<any>sg).view.fight.gwent.ViewGwentItemChange /* w6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ITEM_CHANGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ITEM_CHANGE_H=["ViewGwentItemChange_H",C6] */
    public static get VIEW_GWENT_ITEM_CHANGE_H(): any {
        var v: any = ["ViewGwentItemChange_H", (<any>sg).view.fight.gwent.ViewGwentItemChange_H /* C6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ITEM_CHANGE_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ITEM_HERO=["ViewGwentItemHero",T6] */
    public static get VIEW_GWENT_ITEM_HERO(): any {
        var v: any = ["ViewGwentItemHero", (<any>sg).view.fight.gwent.ViewGwentItemHero /* T6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ITEM_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_ITEM_HERO_H=["ViewGwentItemHero_H",M6] */
    public static get VIEW_GWENT_ITEM_HERO_H(): any {
        var v: any = ["ViewGwentItemHero_H", (<any>sg).view.fight.gwent.ViewGwentItemHero_H /* M6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_ITEM_HERO_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_KARMAEXP=["ViewKarmaExp",H6] */
    public static get VIEW_GWENT_KARMAEXP(): any {
        var v: any = ["ViewKarmaExp", (<any>sg).view.fight.gwent.ViewKarmaExp /* H6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_KARMAEXP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_KARMAEXP_H=["ViewKarmaExp_H",O6] */
    public static get VIEW_GWENT_KARMAEXP_H(): any {
        var v: any = ["ViewKarmaExp_H", (<any>sg).view.fight.gwent.ViewKarmaExp_H /* O6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_KARMAEXP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_BAG=["ViewGwentBag",m6] */
    public static get VIEW_GWENT_BAG(): any {
        var v: any = ["ViewGwentBag", (<any>sg).view.fight.gwent.ViewGwentBag /* m6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_BAG", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_BAG_H=["ViewGwentBag_H",f6] */
    public static get VIEW_GWENT_BAG_H(): any {
        var v: any = ["ViewGwentBag_H", (<any>sg).view.fight.gwent.ViewGwentBag_H /* f6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_BAG_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_TASK=["ViewGwentTask",R6] */
    public static get VIEW_GWENT_TASK(): any {
        var v: any = ["ViewGwentTask", (<any>sg).view.fight.gwent.ViewGwentTask /* R6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_TASK_H=["ViewGwentTask_H",F6] */
    public static get VIEW_GWENT_TASK_H(): any {
        var v: any = ["ViewGwentTask_H", (<any>sg).view.fight.gwent.ViewGwentTask_H /* F6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_TASK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_RELIC_INFO=["ViewGwentRelicInfo",B6] */
    public static get VIEW_GWENT_RELIC_INFO(): any {
        var v: any = ["ViewGwentRelicInfo", (<any>sg).view.fight.gwent.ViewGwentRelicInfo /* B6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_RELIC_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_RELIC_INFO_H=["ViewGwentRelicInfo_H",A6] */
    public static get VIEW_GWENT_RELIC_INFO_H(): any {
        var v: any = ["ViewGwentRelicInfo_H", (<any>sg).view.fight.gwent.ViewGwentRelicInfo_H /* A6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_RELIC_INFO_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GWENT_FIGHT_REWARD=["GwentFightReward",u6] */
    public static get VIEW_GWENT_FIGHT_REWARD(): any {
        var v: any = ["GwentFightReward", (<any>sg).view.fight.gwent.GwentFightReward /* u6 */];
        Object.defineProperty(ConfigClass, "VIEW_GWENT_FIGHT_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_INDEPEND_ADDUP_PAY=["ViewIndependAddupPay",bZ] */
    public static get VIEW_INDEPEND_ADDUP_PAY(): any {
        var v: any = ["ViewIndependAddupPay", (<any>sg).activities.view.independAddupPay.ViewIndependAddupPay /* bZ */];
        Object.defineProperty(ConfigClass, "VIEW_INDEPEND_ADDUP_PAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LOOP_CARD_REWARD_PANEL=["ViewLoopCardRewardPanel",IZ] */
    public static get VIEW_LOOP_CARD_REWARD_PANEL(): any {
        var v: any = ["ViewLoopCardRewardPanel", (<any>sg).activities.view.loopCard.ViewLoopCardRewardPanel /* IZ */];
        Object.defineProperty(ConfigClass, "VIEW_LOOP_CARD_REWARD_PANEL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_FATE_INTRO=["ViewHeroFateIntro",l4] */
    public static get VIEW_HERO_FATE_INTRO(): any {
        var v: any = ["ViewHeroFateIntro", (<any>sg).view.hero.HeroFate_H.ViewHeroFateIntro /* l4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_FATE_INTRO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAPTER_OPEN=["ViewChapterOpen",V7] */
    public static get VIEW_CHAPTER_OPEN(): any {
        var v: any = ["ViewChapterOpen", (<any>sg).task.view.ViewChapterOpen /* V7 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAPTER_OPEN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_FORMATION_TIPS=["ViewHeroFormationTips",w4] */
    public static get VIEW_HERO_FORMATION_TIPS(): any {
        var v: any = ["ViewHeroFormationTips", (<any>sg).view.hero.ViewHeroFormationTips /* w4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_FORMATION_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_MORALE_TIPS=["ViewHeroMoraleTips",S4] */
    public static get VIEW_HERO_MORALE_TIPS(): any {
        var v: any = ["ViewHeroMoraleTips", (<any>sg).view.hero.ViewHeroMoraleTips /* S4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_MORALE_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_BOX_MAIN=["ViewSchemeBoxMain",Nit] */
    public static get VIEW_SCHEME_BOX_MAIN(): any {
        var v: any = ["ViewSchemeBoxMain", (<any>sg).view.scheme.ViewSchemeBoxMain /* Nit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_BOX_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_MAIN=["ViewSchemeMain",Pit] */
    public static get VIEW_SCHEME_MAIN(): any {
        var v: any = ["ViewSchemeMain", (<any>sg).view.scheme.ViewSchemeMain /* Pit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_LIST=["ViewSchemeList",Dit] */
    public static get VIEW_SCHEME_LIST(): any {
        var v: any = ["ViewSchemeList", (<any>sg).view.scheme.ViewSchemeList /* Dit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_LIST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_TROOP=["ViewSchemeTroop",Fit] */
    public static get VIEW_SCHEME_TROOP(): any {
        var v: any = ["ViewSchemeTroop", (<any>sg).view.scheme.ViewSchemeTroop /* Fit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_UPGRADE=["ViewSchemeUpgrade",Oit] */
    public static get VIEW_SCHEME_UPGRADE(): any {
        var v: any = ["ViewSchemeUpgrade", (<any>sg).view.scheme.ViewSchemeUpgrade /* Oit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_ITEM_TIPS=["ViewSchemeItemTips",Eit] */
    public static get VIEW_SCHEME_ITEM_TIPS(): any {
        var v: any = ["ViewSchemeItemTips", (<any>sg).view.scheme.ViewSchemeItemTips /* Eit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_ITEM_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_PROP_TIPS=["ViewSchemePropTips",Rit] */
    public static get VIEW_SCHEME_PROP_TIPS(): any {
        var v: any = ["ViewSchemePropTips", (<any>sg).view.scheme.ViewSchemePropTips /* Rit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_PROP_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_SCHEME_TIPS=["ViewHeroSchemeTips",Uit] */
    public static get VIEW_HERO_SCHEME_TIPS(): any {
        var v: any = ["ViewHeroSchemeTips", (<any>sg).view.scheme.ViewHeroSchemeTips /* Uit */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_SCHEME_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SCHEME_EGG_MAIN=["ViewSchemeEggMain",Hit] */
    public static get VIEW_SCHEME_EGG_MAIN(): any {
        var v: any = ["ViewSchemeEggMain", (<any>sg).view.schemeEgg.ViewSchemeEggMain /* Hit */];
        Object.defineProperty(ConfigClass, "VIEW_SCHEME_EGG_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_CHOOSE_HERO=["ViewEstateChooseHero",Ctt] */
    public static get VIEW_ESTATE_CHOOSE_HERO(): any {
        var v: any = ["ViewEstateChooseHero", (<any>sg).view.map.ViewEstateChooseHero /* Ctt */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_CHOOSE_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAT_BG_CHOOOSE=["ViewChatBgChoose",v3] */
    public static get VIEW_CHAT_BG_CHOOOSE(): any {
        var v: any = ["ViewChatBgChoose", (<any>sg).view.chat.ViewChatBgChoose /* v3 */];
        Object.defineProperty(ConfigClass, "VIEW_CHAT_BG_CHOOOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_MAIN=["ViewFestivalAskMain",y0] */
    public static get VIEW_FESTIVAL_ASK_MAIN(): any {
        var v: any = ["ViewFestivalAskMain", (<any>sg).festival.view.ViewFestivalAskMain /* y0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_NOTICE=["ViewFestivalAskNotice",b0] */
    public static get VIEW_FESTIVAL_ASK_NOTICE(): any {
        var v: any = ["ViewFestivalAskNotice", (<any>sg).festival.view.ViewFestivalAskNotice /* b0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_NOTICE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_REWARD_TIPS=["ViewFestivalAskRewardTips",C0] */
    public static get VIEW_FESTIVAL_ASK_REWARD_TIPS(): any {
        var v: any = ["ViewFestivalAskRewardTips", (<any>sg).festival.view.ViewFestivalAskRewardTips /* C0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_REWARD_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_REWARD_LUCK=["ViewFestivalAskRewardLuck",w0] */
    public static get VIEW_FESTIVAL_ASK_REWARD_LUCK(): any {
        var v: any = ["ViewFestivalAskRewardLuck", (<any>sg).festival.view.ViewFestivalAskRewardLuck /* w0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_REWARD_LUCK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_RANK=["ViewFestivalAskRank",I0] */
    public static get VIEW_FESTIVAL_ASK_RANK(): any {
        var v: any = ["ViewFestivalAskRank", (<any>sg).festival.view.ViewFestivalAskRank /* I0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_RANK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FESTIVAL_ASK_RANK_DAY=["ViewFestivalAskRankDay",x0] */
    public static get VIEW_FESTIVAL_ASK_RANK_DAY(): any {
        var v: any = ["ViewFestivalAskRankDay", (<any>sg).festival.view.ViewFestivalAskRankDay /* x0 */];
        Object.defineProperty(ConfigClass, "VIEW_FESTIVAL_ASK_RANK_DAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_RED_PACKET=["CountryRedPacket",lit] */
    public static get VIEW_COUNTRY_RED_PACKET(): any {
        var v: any = ["CountryRedPacket", (<any>sg).view.more.CountryRedPacket /* lit */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_RED_PACKET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NEW_MILEPOST_MAIN=["ViewNewMilepostMain",xit] */
    public static get VIEW_NEW_MILEPOST_MAIN(): any {
        var v: any = ["ViewNewMilepostMain", (<any>sg).view.newMilepost.ViewNewMilepostMain /* xit */];
        Object.defineProperty(ConfigClass, "VIEW_NEW_MILEPOST_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NEW_MILEPOST_MAIN_V=["ViewNewMilepostMain_V",wit] */
    public static get VIEW_NEW_MILEPOST_MAIN_V(): any {
        var v: any = ["ViewNewMilepostMain_V", (<any>sg).view.newMilepost.ViewNewMilepostMain_V /* wit */];
        Object.defineProperty(ConfigClass, "VIEW_NEW_MILEPOST_MAIN_V", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_RUNE_TIPS=["ViewHeroRuneTips",L4] */
    public static get VIEW_HERO_RUNE_TIPS(): any {
        var v: any = ["ViewHeroRuneTips", (<any>sg).view.hero.ViewHeroRuneTips /* L4 */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_RUNE_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CLIMB_TROOP_H=["ViewClimbTroop_H",Mst] */
    public static get VIEW_CLIMB_TROOP_H(): any {
        var v: any = ["ViewClimbTroop_H", (<any>sg).view.fight.ViewClimbTroop_H /* Mst */];
        Object.defineProperty(ConfigClass, "VIEW_CLIMB_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PVE_TROOP_H=["VIEW_PVE_TROOP_H",Bst] */
    public static get VIEW_PVE_TROOP_H(): any {
        var v: any = ["VIEW_PVE_TROOP_H", (<any>sg).view.fight.ViewPveTroop_H /* Bst */];
        Object.defineProperty(ConfigClass, "VIEW_PVE_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PK_TROOP_H=["ViewPkTroop_H",Sst] */
    public static get VIEW_PK_TROOP_H(): any {
        var v: any = ["ViewPkTroop_H", (<any>sg).view.fight.ViewPkTroop_H /* Sst */];
        Object.defineProperty(ConfigClass, "VIEW_PK_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CHAMPION_TROOP_H=["ViewChampionTroop_H",Tst] */
    public static get VIEW_CHAMPION_TROOP_H(): any {
        var v: any = ["ViewChampionTroop_H", (<any>sg).view.fight.ViewChampionTroop_H /* Tst */];
        Object.defineProperty(ConfigClass, "VIEW_CHAMPION_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ARENA_TROOP_H=["ViewArenaTroop_H",Cst] */
    public static get VIEW_ARENA_TROOP_H(): any {
        var v: any = ["ViewArenaTroop_H", (<any>sg).view.arena.ViewArenaTroop_H /* Cst */];
        Object.defineProperty(ConfigClass, "VIEW_ARENA_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_EXPLORE_TROOP_H=["ViewExploreTroop_H",vst] */
    public static get VIEW_EXPLORE_TROOP_H(): any {
        var v: any = ["ViewExploreTroop_H", (<any>sg).explore.view.ViewExploreTroop_H /* vst */];
        Object.defineProperty(ConfigClass, "VIEW_EXPLORE_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ALIEN_TROOP_H=["ViewAlienTroop_H",kst] */
    public static get VIEW_ALIEN_TROOP_H(): any {
        var v: any = ["ViewAlienTroop_H", (<any>sg).view.country.ViewAlienTroop_H /* kst */];
        Object.defineProperty(ConfigClass, "VIEW_ALIEN_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_LEGEND_TROOP_H=["ViewLegendTroop_H",fst] */
    public static get VIEW_LEGEND_TROOP_H(): any {
        var v: any = ["ViewLegendTroop_H", (<any>sg).altar.legend.view.ViewLegendTroop_H /* fst */];
        Object.defineProperty(ConfigClass, "VIEW_LEGEND_TROOP_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_RANK_NEW=["ViewRankNew",E8] */
    public static get VIEW_RANK_NEW(): any {
        var v: any = ["ViewRankNew", (<any>sg).view.init.ViewRankNew /* E8 */];
        Object.defineProperty(ConfigClass, "VIEW_RANK_NEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_RANK_NEW_V=["ViewRankNew_V",P8] */
    public static get VIEW_RANK_NEW_V(): any {
        var v: any = ["ViewRankNew_V", (<any>sg).view.init.ViewRankNew_V /* P8 */];
        Object.defineProperty(ConfigClass, "VIEW_RANK_NEW_V", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MINIGAME_1=["ViewMiniGame1",j2] */
    public static get VIEW_MINIGAME_1(): any {
        var v: any = ["ViewMiniGame1", (<any>sg).miniGame.game1.view.ViewMiniGame1 /* j2: comma expr (ViewTestFight, ViewMiniGame1) -> last */];
        Object.defineProperty(ConfigClass, "VIEW_MINIGAME_1", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_ALIEN_FIGHT=["CountryAlienFight",x3] */
    public static get VIEW_COUNTRY_ALIEN_FIGHT(): any {
        var v: any = ["CountryAlienFight", (<any>sg).view.country.CountryAlienFight /* x3 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_ALIEN_FIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GOD_DETAIL=["ViewGodDetail",_5] */
    public static get VIEW_GOD_DETAIL(): any {
        var v: any = ["ViewGodDetail", (<any>sg).god.view.ViewGodDetail /* _5 */];
        Object.defineProperty(ConfigClass, "VIEW_GOD_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GOD_CHECK=["ViewGodCheck",d5] */
    public static get VIEW_GOD_CHECK(): any {
        var v: any = ["ViewGodCheck", (<any>sg).god.view.ViewGodCheck /* d5 */];
        Object.defineProperty(ConfigClass, "VIEW_GOD_CHECK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUPPET_MAIN=["ViewPuppetMain",I7] */
    public static get VIEW_PUPPET_MAIN(): any {
        var v: any = ["ViewPuppetMain", (<any>sg).puppet.view.ViewPuppetMain /* I7 */];
        Object.defineProperty(ConfigClass, "VIEW_PUPPET_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUPPET_UPGRADE=["ViewPuppetUpgrade",w7] */
    public static get VIEW_PUPPET_UPGRADE(): any {
        var v: any = ["ViewPuppetUpgrade", (<any>sg).puppet.view.ViewPuppetUpgrade /* w7 */];
        Object.defineProperty(ConfigClass, "VIEW_PUPPET_UPGRADE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUPPET_UNLOCK=["ViewPuppetUnlock",x7] */
    public static get VIEW_PUPPET_UNLOCK(): any {
        var v: any = ["ViewPuppetUnlock", (<any>sg).puppet.view.ViewPuppetUnlock /* x7 */];
        Object.defineProperty(ConfigClass, "VIEW_PUPPET_UNLOCK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUPPET_ARM=["ViewPuppetArm",c7] */
    public static get VIEW_PUPPET_ARM(): any {
        var v: any = ["ViewPuppetArm", (<any>sg).puppet.view.ViewPuppetArm /* c7 */];
        Object.defineProperty(ConfigClass, "VIEW_PUPPET_ARM", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_INDENT_TASK=["IndentTask",Z2] */
    public static get VIEW_INDENT_TASK(): any {
        var v: any = ["IndentTask", (<any>sg).puppet.view.IndentTask /* Z2 */];
        Object.defineProperty(ConfigClass, "VIEW_INDENT_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PUPPET_BAG_MAIN=["ViewPuppetBagMain",g7] */
    public static get VIEW_PUPPET_BAG_MAIN(): any {
        var v: any = ["ViewPuppetBagMain", (<any>sg).puppet.view.ViewPuppetBagMain /* g7 */];
        Object.defineProperty(ConfigClass, "VIEW_PUPPET_BAG_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_STORY_MAIN=["",i7] */
    public static get VIEW_STORY_MAIN(): any {
        var v: any = ["", (<any>sg).puppet.view.StoryMain /* i7 */];
        Object.defineProperty(ConfigClass, "VIEW_STORY_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_COUNTRY_INDENT=["",J2] */
    public static get VIEW_COUNTRY_INDENT(): any {
        var v: any = ["", (<any>sg).puppet.view.CountryIndent /* J2 */];
        Object.defineProperty(ConfigClass, "VIEW_COUNTRY_INDENT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_KUNLUN_MAIN=["ViewKunlunMain",M2] */
    public static get VIEW_KUNLUN_MAIN(): any {
        var v: any = ["ViewKunlunMain", (<any>sg).kunlun.view.ViewKunlunMain /* M2 */];
        Object.defineProperty(ConfigClass, "VIEW_KUNLUN_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_KUNLUN_PEACH=["ViewKunlunPeach",B2] */
    public static get VIEW_KUNLUN_PEACH(): any {
        var v: any = ["ViewKunlunPeach", (<any>sg).kunlun.view.ViewKunlunPeach /* B2 */];
        Object.defineProperty(ConfigClass, "VIEW_KUNLUN_PEACH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_PARK=["ViewEstatePark",G2] */
    public static get VIEW_ESTATE_PARK(): any {
        var v: any = ["ViewEstatePark", (<any>sg).map.view.ViewEstatePark /* G2 */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_PARK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ESTATE_PARK_H=["ViewEstatePark_H",V2] */
    public static get VIEW_ESTATE_PARK_H(): any {
        var v: any = ["ViewEstatePark_H", (<any>sg).map.view.ViewEstatePark_H /* V2 */];
        Object.defineProperty(ConfigClass, "VIEW_ESTATE_PARK_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NG_TASK_DISPATCH=["NGTaskDispatch",het] */
    public static get VIEW_NG_TASK_DISPATCH(): any {
        var v: any = ["NGTaskDispatch", (<any>sg).view.task.ng_task.NGTaskDispatch /* het */];
        Object.defineProperty(ConfigClass, "VIEW_NG_TASK_DISPATCH", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NG_TASK_DISPATCH_H=["NGTaskDispatch_H",oet] */
    public static get VIEW_NG_TASK_DISPATCH_H(): any {
        var v: any = ["NGTaskDispatch_H", (<any>sg).view.task.ng_task.NGTaskDispatch_H /* oet */];
        Object.defineProperty(ConfigClass, "VIEW_NG_TASK_DISPATCH_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NG_TASK_ANECDOTE=["NGTaskAnecdote",net] */
    public static get VIEW_NG_TASK_ANECDOTE(): any {
        var v: any = ["NGTaskAnecdote", (<any>sg).view.task.ng_task.NGTaskAnecdote /* net */];
        Object.defineProperty(ConfigClass, "VIEW_NG_TASK_ANECDOTE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_NG_TASK_MOVE_OWNER=["NGTaskMoveOwner",ret] */
    public static get VIEW_NG_TASK_MOVE_OWNER(): any {
        var v: any = ["NGTaskMoveOwner", (<any>sg).view.task.ng_task.NGTaskMoveOwner /* ret */];
        Object.defineProperty(ConfigClass, "VIEW_NG_TASK_MOVE_OWNER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERO_RUNE=["ViewHeroRune2",Lit] */
    public static get VIEW_HERO_RUNE(): any {
        var v: any = ["ViewHeroRune2", (<any>sg).view.rune.ViewHeroRune2 /* Lit */];
        Object.defineProperty(ConfigClass, "VIEW_HERO_RUNE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HOME_ELEPHANT_AWARD=["ViewElephantAward",m8] */
    public static get VIEW_HOME_ELEPHANT_AWARD(): any {
        var v: any = ["ViewElephantAward", (<any>sg).view.init.ViewElephantAward /* m8 */];
        Object.defineProperty(ConfigClass, "VIEW_HOME_ELEPHANT_AWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HOME_ELEPHANT_TROOP=["ViewElephantTroop",g8] */
    public static get VIEW_HOME_ELEPHANT_TROOP(): any {
        var v: any = ["ViewElephantTroop", (<any>sg).view.init.ViewElephantTroop /* g8 */];
        Object.defineProperty(ConfigClass, "VIEW_HOME_ELEPHANT_TROOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_RESOUSE_DETAIL=["ViewResourseDetail",rit] */
    public static get VIEW_RESOUSE_DETAIL(): any {
        var v: any = ["ViewResourseDetail", (<any>sg).view.menu.ViewResourseDetail /* rit */];
        Object.defineProperty(ConfigClass, "VIEW_RESOUSE_DETAIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_TOUHU=["PayTouHu",kZ] */
    public static get VIEW_PAY_TOUHU(): any {
        var v: any = ["PayTouHu", (<any>sg).activities.view.touhu.PayTouHu /* kZ */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_TOUHU", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_PAY_TOUHU_H=["PayTouHu_H",TZ] */
    public static get VIEW_PAY_TOUHU_H(): any {
        var v: any = ["PayTouHu_H", (<any>sg).activities.view.touhu.PayTouHu_H /* TZ */];
        Object.defineProperty(ConfigClass, "VIEW_PAY_TOUHU_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOUHU_HITS=["ViewTouHuHits",MZ] */
    public static get VIEW_TOUHU_HITS(): any {
        var v: any = ["ViewTouHuHits", (<any>sg).activities.view.touhu.ViewTouHuHits /* MZ */];
        Object.defineProperty(ConfigClass, "VIEW_TOUHU_HITS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOUHU_HITS_H=["ViewTouHuHits_H",SZ] */
    public static get VIEW_TOUHU_HITS_H(): any {
        var v: any = ["ViewTouHuHits_H", (<any>sg).activities.view.touhu.ViewTouHuHits_H /* SZ */];
        Object.defineProperty(ConfigClass, "VIEW_TOUHU_HITS_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOUHU_RED=["ViewTouHuRed",BZ] */
    public static get VIEW_TOUHU_RED(): any {
        var v: any = ["ViewTouHuRed", (<any>sg).activities.view.touhu.ViewTouHuRed /* BZ */];
        Object.defineProperty(ConfigClass, "VIEW_TOUHU_RED", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_TOUHU_RED_H=["ViewTouHuRed_H",AZ] */
    public static get VIEW_TOUHU_RED_H(): any {
        var v: any = ["ViewTouHuRed_H", (<any>sg).activities.view.touhu.ViewTouHuRed_H /* AZ */];
        Object.defineProperty(ConfigClass, "VIEW_TOUHU_RED_H", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_POLICE=["",mZ] */
    public static get VIEW_POLICE(): any {
        var v: any = ["", (<any>sg).activities.view.godPolice.ViewPolice /* mZ */];
        Object.defineProperty(ConfigClass, "VIEW_POLICE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_POLICELIMITUNLOCK=["ViewPoliceLimitUnlock",vZ] */
    public static get VIEW_POLICELIMITUNLOCK(): any {
        var v: any = ["ViewPoliceLimitUnlock", (<any>sg).activities.view.godPolice.ViewPoliceLimitUnlock /* vZ */];
        Object.defineProperty(ConfigClass, "VIEW_POLICELIMITUNLOCK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HISTORY=["",lZ] */
    public static get VIEW_HISTORY(): any {
        var v: any = ["", (<any>sg).activities.view.free.ViewFreeHistory /* lZ */];
        Object.defineProperty(ConfigClass, "VIEW_HISTORY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HISTORY_HELP=["",uZ] */
    public static get VIEW_HISTORY_HELP(): any {
        var v: any = ["", (<any>sg).activities.view.free.ViewFreeHistoryHelp /* uZ */];
        Object.defineProperty(ConfigClass, "VIEW_HISTORY_HELP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ROOLPAYNEW=["ViewRoolPayNew",wZ] */
    public static get VIEW_ROOLPAYNEW(): any {
        var v: any = ["ViewRoolPayNew", (<any>sg).activities.view.roolPayNew.ViewRoolPayNew /* wZ */];
        Object.defineProperty(ConfigClass, "VIEW_ROOLPAYNEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FIRST_GOODS=["ViewFirstGoods",aZ] */
    public static get VIEW_FIRST_GOODS(): any {
        var v: any = ["ViewFirstGoods", (<any>sg).activities.view.firstGoods.ViewFirstGoods /* aZ */];
        Object.defineProperty(ConfigClass, "VIEW_FIRST_GOODS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_GUESTTIPS=["ViewWineshopGuestTips",Jet] */
    public static get VIEW_WINESHOP_GUESTTIPS(): any {
        var v: any = ["ViewWineshopGuestTips", (<any>sg).view.wineshop.view.ViewWineshopGuestTips /* Jet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_GUESTTIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_BUILDLVUP=["ViewWineshopBuildLvup",qet] */
    public static get VIEW_WINESHOP_BUILDLVUP(): any {
        var v: any = ["ViewWineshopBuildLvup", (<any>sg).view.wineshop.view.ViewWineshopBuildLvup /* qet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_BUILDLVUP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_OUTSIDE=["ViewWineshopOutside",est] */
    public static get VIEW_WINESHOP_OUTSIDE(): any {
        var v: any = ["ViewWineshopOutside", (<any>sg).view.wineshop.view.ViewWineshopOutside /* est */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_OUTSIDE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_MENU_SET=["ViewWineshopMenuSet",ist] */
    public static get VIEW_WINESHOP_MENU_SET(): any {
        var v: any = ["ViewWineshopMenuSet", (<any>sg).view.wineshop.view.ViewWineshopMenuSet /* ist */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_MENU_SET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_RECIPE=["ViewWineshopRecipe",sst] */
    public static get VIEW_WINESHOP_RECIPE(): any {
        var v: any = ["ViewWineshopRecipe", (<any>sg).view.wineshop.view.ViewWineshopRecipe /* sst */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_RECIPE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_GUEST=["ViewwineshopGuest",Qet] */
    public static get VIEW_WINESHOP_GUEST(): any {
        var v: any = ["ViewwineshopGuest", (<any>sg).view.wineshop.view.ViewWineshopGuest /* Qet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_GUEST", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_RECIPE_LEVEL_UP=["ViewRecipeLevelUp",Yet] */
    public static get VIEW_RECIPE_LEVEL_UP(): any {
        var v: any = ["ViewRecipeLevelUp", (<any>sg).view.wineshop.view.ViewRecipeLevelUp /* Yet */];
        Object.defineProperty(ConfigClass, "VIEW_RECIPE_LEVEL_UP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GUEST_LEVEL_UP=["ViewGuestLevelUp",zet] */
    public static get VIEW_GUEST_LEVEL_UP(): any {
        var v: any = ["ViewGuestLevelUp", (<any>sg).view.wineshop.view.ViewGuestLevelUp /* zet */];
        Object.defineProperty(ConfigClass, "VIEW_GUEST_LEVEL_UP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_REWARD_DISPLAY=["ViewWineshopRewardDisplay",ost] */
    public static get VIEW_WINESHOP_REWARD_DISPLAY(): any {
        var v: any = ["ViewWineshopRewardDisplay", (<any>sg).view.wineshop.view.ViewWineshopRewardDisplay /* ost */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_REWARD_DISPLAY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_EVALUATE=["ViewWineshopEvaluate",Xet] */
    public static get VIEW_WINESHOP_EVALUATE(): any {
        var v: any = ["ViewWineshopEvaluate", (<any>sg).view.wineshop.view.ViewWineshopEvaluate /* Xet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_EVALUATE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_REWARD=["ViewWineshopReward",hst] */
    public static get VIEW_WINESHOP_REWARD(): any {
        var v: any = ["ViewWineshopReward", (<any>sg).view.wineshop.view.ViewWineshopReward /* hst */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_MEMORY_METHOD=["ViewWineshopMemoryMethod",Zet] */
    public static get VIEW_WINESHOP_MEMORY_METHOD(): any {
        var v: any = ["ViewWineshopMemoryMethod", (<any>sg).view.wineshop.view.ViewWineshopMemoryMethod /* Zet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_MEMORY_METHOD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_TASK=["ViewWineshopTask",rst] */
    public static get VIEW_WINESHOP_TASK(): any {
        var v: any = ["ViewWineshopTask", (<any>sg).view.wineshop.view.ViewWineshopTask /* rst */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_TASK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_GUEST_MEMORY=["ViewWineshopGuestMemory",$et] */
    public static get VIEW_WINESHOP_GUEST_MEMORY(): any {
        var v: any = ["ViewWineshopGuestMemory", (<any>sg).view.wineshop.view.ViewWineshopGuestMemory /* $et */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_GUEST_MEMORY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_MEMORY_SCORE=["ViewWineshopMemoryScore",tst] */
    public static get VIEW_WINESHOP_MEMORY_SCORE(): any {
        var v: any = ["ViewWineshopMemoryScore", (<any>sg).view.wineshop.view.ViewWineshopMemoryScore /* tst */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_MEMORY_SCORE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_EVALUATE_TIPS=["EvaluateTips",Wet] */
    public static get VIEW_WINESHOP_EVALUATE_TIPS(): any {
        var v: any = ["EvaluateTips", (<any>sg).view.wineshop.view.EvaluateTips /* Wet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_EVALUATE_TIPS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_RECIPE_UNLOCK=["WineshopRecipeUnlock",ast] */
    public static get VIEW_WINESHOP_RECIPE_UNLOCK(): any {
        var v: any = ["WineshopRecipeUnlock", (<any>sg).view.wineshop.view.WineshopRecipeUnlock /* ast */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_RECIPE_UNLOCK", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_REVIEW=["ViewWineshopReview",nst] */
    public static get VIEW_WINESHOP_REVIEW(): any {
        var v: any = ["ViewWineshopReview", (<any>sg).view.wineshop.view.ViewWineshopReview /* nst */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_REVIEW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_POCKET=["ViewPocket",jet] */
    public static get VIEW_WINESHOP_POCKET(): any {
        var v: any = ["ViewPocket", (<any>sg).view.wineshop.view.ViewPocket /* jet */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_POCKET", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_POCKET_PROBABILITY=["ViewPocketProbability",E6] */
    public static get VIEW_WINESHOP_POCKET_PROBABILITY(): any {
        var v: any = ["ViewPocketProbability", (<any>sg).view.wineshop.view.ViewPocketProbability /* E6 */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_POCKET_PROBABILITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_WINESHOP_EXCHANGE=["ViewWineshopExchange",Ket] */
    public static get VIEW_WINESHOP_EXCHANGE(): any {
        var v: any = ["ViewWineshopExchange", (<any>sg).view.wineshop.view.ViewWineshopExchange /* Ket */];
        Object.defineProperty(ConfigClass, "VIEW_WINESHOP_EXCHANGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_ADMIRE_MAIN=["ViewAdmireMain",Y5] */
    public static get VIEW_ADMIRE_MAIN(): any {
        var v: any = ["ViewAdmireMain", (<any>sg).jigsaw.view.ViewAdmireMain /* Y5 */];
        Object.defineProperty(ConfigClass, "VIEW_ADMIRE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MEDITATION_MAIN=["ViewMeditationMain",e2] */
    public static get VIEW_MEDITATION_MAIN(): any {
        var v: any = ["ViewMeditationMain", (<any>sg).jigsaw.view.ViewMeditationMain /* e2 */];
        Object.defineProperty(ConfigClass, "VIEW_MEDITATION_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_BIG_DEVIL=["",M1] */
    public static get VIEW_BIG_DEVIL(): any {
        var v: any = ["", (<any>sg).bigDevil.view.ViewBigDevil /* M1 */];
        Object.defineProperty(ConfigClass, "VIEW_BIG_DEVIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CITY_INFO_DEVIL=["",S1] */
    public static get VIEW_CITY_INFO_DEVIL(): any {
        var v: any = ["", (<any>sg).bigDevil.view.ViewDevilCityInfo /* S1 */];
        Object.defineProperty(ConfigClass, "VIEW_CITY_INFO_DEVIL", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_MAIN=["ViewHeritageMain",F5] */
    public static get VIEW_HERITAGE_MAIN(): any {
        var v: any = ["ViewHeritageMain", (<any>sg).heritage.view.ViewHeritageMain /* F5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_GACHA=["ViewHeritageGacha",D5] */
    public static get VIEW_HERITAGE_GACHA(): any {
        var v: any = ["ViewHeritageGacha", (<any>sg).heritage.view.ViewHeritageGacha /* D5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_GACHA", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_GACHACHOSE=["ViewGachaChose",U5] */
    public static get VIEW_HERITAGE_GACHACHOSE(): any {
        var v: any = ["ViewGachaChose", (<any>sg).heritage.view.ViewGachaChose /* U5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_GACHACHOSE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_SHOP=["ViewHeritageShop",O5] */
    public static get VIEW_HERITAGE_SHOP(): any {
        var v: any = ["ViewHeritageShop", (<any>sg).heritage.view.ViewHeritageShop /* O5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_SHOP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_INFO=["ViewHeritageInfo",H5] */
    public static get VIEW_HERITAGE_INFO(): any {
        var v: any = ["ViewHeritageInfo", (<any>sg).heritage.view.ViewHeritageInfo /* H5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_INFO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_GACHA_SHOW=["ViewGachaShow",E5] */
    public static get VIEW_GACHA_SHOW(): any {
        var v: any = ["ViewGachaShow", (<any>sg).heritage.view.ViewGachaShow /* E5 */];
        Object.defineProperty(ConfigClass, "VIEW_GACHA_SHOW", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_AWAKEN=["ViewHeriateAwaken",R5] */
    public static get VIEW_HERITAGE_AWAKEN(): any {
        var v: any = ["ViewHeriateAwaken", (<any>sg).heritage.view.ViewHeriateAwaken /* R5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_AWAKEN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_SSS=["ViewGachaSSS",P5] */
    public static get VIEW_HERITAGE_SSS(): any {
        var v: any = ["ViewGachaSSS", (<any>sg).heritage.view.ViewGachaSSS /* P5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_SSS", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_HERITAGE=["ViewFreeHeritage",M5] */
    public static get VIEW_FREE_HERITAGE(): any {
        var v: any = ["ViewFreeHeritage", (<any>sg).heritage.view.ViewFreeHeritage /* M5 */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_HERITAGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_HERITAGE_PROBABILITY=["ViewFreeHeritageProbability",L5] */
    public static get VIEW_FREE_HERITAGE_PROBABILITY(): any {
        var v: any = ["ViewFreeHeritageProbability", (<any>sg).heritage.view.ViewFreeHeritageProbability /* L5 */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_HERITAGE_PROBABILITY", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_FREE_HERITAGE_REWARD=["ViewFreeHeritageReward",N5] */
    public static get VIEW_FREE_HERITAGE_REWARD(): any {
        var v: any = ["ViewFreeHeritageReward", (<any>sg).heritage.view.ViewFreeHeritageReward /* N5 */];
        Object.defineProperty(ConfigClass, "VIEW_FREE_HERITAGE_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_EFFECT=["ViewFreeHeritageEffect",A5] */
    public static get VIEW_HERITAGE_EFFECT(): any {
        var v: any = ["ViewFreeHeritageEffect", (<any>sg).heritage.view.ViewFreeHeritageEffect /* A5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_EFFECT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_CHARGE=["ViewFreeHeritageCharge",B5] */
    public static get VIEW_HERITAGE_CHARGE(): any {
        var v: any = ["ViewFreeHeritageCharge", (<any>sg).heritage.view.ViewFreeHeritageCharge /* B5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_CHARGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_HERITAGE_BIG_REWARD=["ViewFreeHeritageBigReward",S5] */
    public static get VIEW_HERITAGE_BIG_REWARD(): any {
        var v: any = ["ViewFreeHeritageBigReward", (<any>sg).heritage.view.ViewFreeHeritageBigReward /* S5 */];
        Object.defineProperty(ConfigClass, "VIEW_HERITAGE_BIG_REWARD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_MAIN=["ViewSeaRouteMain",F7] */
    public static get VIEW_SEAROUTE_MAIN(): any {
        var v: any = ["ViewSeaRouteMain", (<any>sg).seaRoute.ViewSeaRouteMain /* F7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_MAIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_CARD_BUILD=["ViewSeaCardBuild",L7] */
    public static get VIEW_SEAROUTE_CARD_BUILD(): any {
        var v: any = ["ViewSeaCardBuild", (<any>sg).seaRoute.ViewSeaCardBuild /* L7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_CARD_BUILD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_BOAT_BUILD=["ViewSeaBoatBuild",B7] */
    public static get VIEW_SEAROUTE_BOAT_BUILD(): any {
        var v: any = ["ViewSeaBoatBuild", (<any>sg).seaRoute.ViewSeaBoatBuild /* B7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_BOAT_BUILD", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_CHAPTER=["ViewSeaChapter",E7] */
    public static get VIEW_SEAROUTE_CHAPTER(): any {
        var v: any = ["ViewSeaChapter", (<any>sg).seaRoute.ViewSeaChapter /* E7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_CHAPTER", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_LEVEL_SELECT=["ViewSeaLevelSelect",D7] */
    public static get VIEW_SEAROUTE_LEVEL_SELECT(): any {
        var v: any = ["ViewSeaLevelSelect", (<any>sg).seaRoute.ViewSeaLevelSelect /* D7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_LEVEL_SELECT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_CARD_NAME_CHANGE=["ViewSeaCardNameChange",P7] */
    public static get VIEW_SEAROUTE_CARD_NAME_CHANGE(): any {
        var v: any = ["ViewSeaCardNameChange", (<any>sg).seaRoute.ViewSeaCardNameChange /* P7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_CARD_NAME_CHANGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_SEAROUTE_CARD_LVUP=["ViewSeaCardLvup",U7] */
    public static get VIEW_SEAROUTE_CARD_LVUP(): any {
        var v: any = ["ViewSeaCardLvup", (<any>sg).seaRoute.ViewSeaCardLvup /* U7 */];
        Object.defineProperty(ConfigClass, "VIEW_SEAROUTE_CARD_LVUP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_MERIT_EXCHANGE=["ViewMeritExchange",z2] */
    public static get VIEW_MERIT_EXCHANGE(): any {
        var v: any = ["ViewMeritExchange", (<any>sg).meritExchange.ViewMeritExchange /* z2 */];
        Object.defineProperty(ConfigClass, "VIEW_MERIT_EXCHANGE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 原文 getter：this.VIEW_CROSS_PVP=["",O1] */
    public static get VIEW_CROSS_PVP(): any {
        var v: any = ["", (<any>sg).cross_pvp.view.ViewCrossPvp /* O1 */];
        Object.defineProperty(ConfigClass, "VIEW_CROSS_PVP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

}

/**
 * 注册身份等价物：原文 o(t,"sg.cfg.ConfigClass")（2 参，无 base/miniName）。
 * base 传 null 的原因见 batch-a-report.md「注册等价决策」（跳过 __extend，无静态拷贝）。
 */
Laya.class(ConfigClass, "sg.cfg.ConfigClass", null, null);
