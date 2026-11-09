/**
 * sg.utils.MusicManager —— 音乐/音效封装：静音开关直通 laya.media.SoundManager、
 * BGM 节流（1500ms）与打断恢复（parentUrl）、Chrome 桌面首次交互解锁、
 * UI/Hero/Fight 音效路径与全部 SOUND_* 名称常量。
 *
 * 原文：code1.js 包装函数，2 参注册，无基类，全静态。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-b/MusicManager.js
 *
 * ct=laya.media.SoundManager（原文 playSound 传 6 实参，引擎签名 5 参，多余实参
 * 运行时被忽略——为保真原调用形态经 any 调用）；m=laya.utils.Browser；s=Laya。
 * 原文自引 sg.utils.MusicManager → TS 类直引；timer 以类本身为 caller 上下文。
 * SOUND_PATH_UI/HERO/FIGHT、BG_*、lastPlayMusicTime 为 Laya.static 惰性静态。
 */
export class MusicManager {

    constructor() {
    }

    public static get soundMuted(): boolean {
        return laya.media.SoundManager.soundMuted;
    }
    public static set soundMuted(v: boolean) {
        laya.media.SoundManager.soundMuted = v;
    }

    public static get musicMuted(): boolean {
        return laya.media.SoundManager.musicMuted;
    }
    /** 取消静音时立即恢复当前 BGM */
    public static set musicMuted(v: boolean) {
        laya.media.SoundManager.musicMuted = v,
            v || MusicManager.playMusic(MusicManager.currUrl, !0);
    }

    /** 小游戏切前台：借开关翻转触发微信音频池恢复 */
    public static miniGameShow(): void {
        MusicManager.musicMuted || (MusicManager.musicMuted = !0, MusicManager.musicMuted = !1),
            MusicManager.soundMuted || (MusicManager.soundMuted = !0, MusicManager.soundMuted = !1);
    }

    public static playBackMusic(): void {
        MusicManager.parentUrl && MusicManager.playMusic(MusicManager.parentUrl, !0);
    }

    /** 桌面 Chrome 需用户手势解锁音频；其余环境直接可播 */
    public static init(): void {
        laya.media.SoundManager.autoStopMusic = !0,
            !laya.utils.Browser.onIOS && !laya.utils.Browser.onAndroid && !laya.utils.Browser.onWP
            && laya.utils.Browser.userAgent && laya.utils.Browser.userAgent.indexOf("Chrome") > -1
                ? (
                    laya.utils.Browser.document && (
                        laya.utils.Browser.document.addEventListener("click", MusicManager.setCanPlay),
                            laya.utils.Browser.document.addEventListener("touchend", MusicManager.setCanPlay)
                    ),
                        MusicManager.canPlay = !1
                )
                : MusicManager.canPlay = !0;
    }

    public static setCanPlay(): void {
        laya.utils.Browser.document && (
            MusicManager.canPlay = !0,
                MusicManager.currUrl && MusicManager.playMusic(MusicManager.currUrl, !0),
                laya.utils.Browser.document.removeEventListener("click", MusicManager.setCanPlay),
                laya.utils.Browser.document.removeEventListener("touchend", MusicManager.setCanPlay)
        );
    }

    public static pause(): void {
        MusicManager._isMusicPlay = MusicManager.musicMuted,
            MusicManager._isSoundPlay = MusicManager.soundMuted,
            MusicManager.soundMuted = !0,
            MusicManager.musicMuted = !0;
    }

    public static resume(): void {
        MusicManager.musicMuted = MusicManager._isMusicPlay,
            MusicManager.soundMuted = MusicManager._isSoundPlay;
    }

    /** e=!0 视为恢复（不改写 parentUrl）；1500ms 内节流 */
    public static playMusic(i: string, e?: boolean): void {
        if (void 0 === e && (e = !1), !e && MusicManager.currUrl && (MusicManager.parentUrl = MusicManager.currUrl),
            MusicManager.currUrl !== i && MusicManager.canPlay) {
            MusicManager.currUrl = i, MusicManager.parentUrl || (MusicManager.parentUrl = MusicManager.currUrl);
            Laya.timer.clear(MusicManager, MusicManager._playMusicReal);
            var n = 1500 - ((new Date).getTime() - MusicManager.lastPlayMusicTime);
            n <= 0 ? MusicManager._playMusicReal(i) : Laya.timer.once(n, MusicManager, MusicManager._playMusicReal, [i]);
        }
    }

    public static _playMusicReal(i: string): void {
        MusicManager.lastPlayMusicTime = (new Date).getTime(),
            laya.media.SoundManager.playMusic(i);
    }

    public static stopMusic(): void {
        laya.media.SoundManager.stopMusic();
    }

    public static setMusicVolume(t: number): void {
        laya.media.SoundManager.setMusicVolume(t);
    }

    public static playSoundUI(i: string, e?: number, s?: number): any {
        return void 0 === e && (e = -1), void 0 === s && (s = 1),
            MusicManager.canPlay ? (<any>laya.media.SoundManager).playSound(MusicManager.SOUND_PATH_UI + i + ".aac", s, null, null, 0, e) : null;
    }

    public static stopSoundUI(i: string): void {
        MusicManager.canPlay && laya.media.SoundManager.stopSound(MusicManager.SOUND_PATH_UI + i + ".aac");
    }

    public static playSoundHero(i: string, e?: number, s?: number): any {
        return void 0 === e && (e = -1), void 0 === s && (s = 1),
            MusicManager.canPlay ? (<any>laya.media.SoundManager).playSound(MusicManager.SOUND_PATH_HERO + i + ".aac", s, null, null, 0, e) : null;
    }

    public static playSoundFight(i: string, e?: number, s?: number): any {
        return void 0 === e && (e = -1), void 0 === s && (s = 1),
            MusicManager.canPlay ? (<any>laya.media.SoundManager).playSound(MusicManager.SOUND_PATH_FIGHT + i + ".aac", s, null, null, 0, e) : null;
    }

    public static BG_PATH: string = "music/bg/";
    public static SOUND_PATH: string = "music/sound/";
    public static MUSIC_TYPE: string = ".aac";
    public static SOUND_TYPE: string = ".aac";
    public static SOUND_GET_REWARD: string = "get_reward";
    public static SOUND_PUB_GET: string = "pub_get";
    public static SOUND_PUB_DOWN: string = "pub_down";
    public static SOUND_GET_STAR: string = "get_star";
    public static SOUND_GET_BAGGAGE: string = "get_baggage";
    public static SOUND_CLICK: string = "click";
    public static SOUND_SHOW_UI: string = "show_ui";
    public static SOUND_BUILD: string = "build";
    public static SOUND_BUILD_LV_UP: string = "build_lv_up";
    public static SOUND_HERO_STAR_UP: string = "hero_star_up";
    public static SOUND_CUT_CHAPTER: string = "cut_chapter";
    public static SOUND_ARMY_SCIENCE_SUC: string = "army_science_suc";
    public static SOUND_ARMY_SCIENCE_DEF: string = "army_science_def";
    public static SOUND_ARMY_MAKE: string = "army_make";
    public static SOUND_ARMY_COMPLETE: string = "army_complete";
    public static SOUND_EQUIP_MAKE: string = "equip_make";
    public static SOUND_POWER_UP: string = "power_up";
    public static SOUND_TROOP_MOVE: string = "troop_move";
    public static SOUND_UNLOCK_FATE: string = "unlock_fate";
    public static SOUND_HERO_LV_UP: string = "hero_lv_up";
    public static SOUND_HERO_SKILL_UP: string = "hero_skill_up";
    public static SOUND_PROP_RESOLVE: string = "prop_resolve";
    public static SOUND_UNLOCK_RIGHT: string = "unlock_right";
    public static SOUND_OFFICE_UP: string = "office_up";
    public static SOUND_GET_MATERIAL: string = "get_material";
    public static SOUND_FORMATION_STAR_UP: string = "formation_star_up";
    public static SOUND_FORMATION_LV_UP: string = "formation_lv_up";
    public static SOUND_FORMATION_CHOOSE: string = "formation_choose";
    public static SOUND_EQUIP_BOX_TEN: string = "equip_box_ten";
    public static SOUND_EQUIP_BOX_SHOW: string = "equip_box_show";
    public static SOUND_XYZ_1: string = "xyz01";
    public static SOUND_XYZ_2: string = "xyz02";
    public static SOUND_XYZ_3: string = "xyz03";
    public static SOUND_XYZ_4: string = "xyz04";
    public static SOUND_XYZ_5: string = "xyz05";
    public static SOUND_XYZ_6: string = "xyz06";
    public static SOUND_XYZ_7: string = "xyz07";
    public static SOUND_XYZ_8: string = "xyz08";
    public static SOUND_ENHANCE_FAIL: string = "enhance_fail";
    public static SOUND_ENHANCE_SUCCESS: string = "enhance_success";
    public static SOUND_SP_ARMY_CARD: string = "sp_card";
    public static SOUND_SP_ARMY_IN_S1: string = "in_s1";
    public static SOUND_SP_ARMY_STAND_S1: string = "stand_s1";
    public static SOUND_SP_ARMY_IN_S2: string = "in_s2";
    public static SOUND_SP_ARMY_STAND_S2: string = "stand_s2";
    public static SOUND_SOUL_UPGRADE: string = "soul_upgrade";
    public static SOUND_SOUL_LINK: string = "soul_link";
    public static SOUND_TOMB_DIG: string = "tomb_dig";
    public static SOUND_TOMB_DONE: string = "tomb_done";
    public static SOUND_SEVEN_LAMP: string = "seven_lamp";
    public static SOUND_TOMB_LIGHT: string = "tomb_light";
    public static SOUND_TOMB_DOWNGRADE: string = "tomb_downgrade";
    public static SOUND_TOMB_LVUP: string = "tomb_lvup";
    public static SOUND_CHOOSE_0: string = "choose0";
    public static SOUND_CHOOSE_1: string = "choose1";
    public static SOUND_CHOOSE_2: string = "choose2";
    public static canPlay: boolean = !1;
    public static _isMusicPlay: boolean = !1;
    public static _isSoundPlay: boolean = !1;
    public static parentUrl: any = null;
    public static currUrl: any = null;

    /** Laya.static 惰性静态（ViewScenes.TOP_HEIGHT 同款换写） */
    public static get SOUND_PATH_UI(): string {
        var v = "music/sound/ui/";
        Object.defineProperty(MusicManager, "SOUND_PATH_UI", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SOUND_PATH_HERO(): string {
        var v = "music/sound/hero/";
        Object.defineProperty(MusicManager, "SOUND_PATH_HERO", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get SOUND_PATH_FIGHT(): string {
        var v = "music/sound/fight/";
        Object.defineProperty(MusicManager, "SOUND_PATH_FIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_MAP(): string {
        var v = "music/bg/map.aac";
        Object.defineProperty(MusicManager, "BG_MAP", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_CROSSSERVICE(): string {
        var v = "music/bg/duplicate_home.aac";
        Object.defineProperty(MusicManager, "BG_CROSSSERVICE", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_LOGIN(): string {
        var v = "music/bg/login.aac";
        Object.defineProperty(MusicManager, "BG_LOGIN", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_HOME(): string {
        var v = "music/bg/home.aac";
        Object.defineProperty(MusicManager, "BG_HOME", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_HUNT(): string {
        var v = "music/bg/hunt.aac";
        Object.defineProperty(MusicManager, "BG_HUNT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get BG_FIGHT(): string {
        var v = "music/bg/fight_1.aac";
        Object.defineProperty(MusicManager, "BG_FIGHT", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    public static get lastPlayMusicTime(): number {
        var v = (new Date).getTime();
        Object.defineProperty(MusicManager, "lastPlayMusicTime", {
            value: v, writable: true, enumerable: true, configurable: true
        });
        return v;
    }

    /** 批次 B 编译修复：getter 首读即 defineProperty 覆写为可写数据属性，运行期赋值
     * 永远落在数据属性上；此 setter 仅满足 TS 可赋值检查，写入语义与缓存模式一致。 */
    public static set lastPlayMusicTime(v: number) {
        Object.defineProperty(MusicManager, "lastPlayMusicTime", {
            value: v, writable: true, enumerable: true, configurable: true
        });
    }
}

/**
 * 注册身份等价物：原文 o(t,"sg.utils.MusicManager")（2 参注册，无基类）。
 */
Laya.class(MusicManager, "sg.utils.MusicManager", null, null);
