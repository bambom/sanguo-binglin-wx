/**
 * sg.model.ModelSettings —— 设置模型（音乐/音效/字体/刘海避让/高清/推送开关，
 * settingsData 静态持久化经 SaveLocal；instance 惰性单例）。
 *
 * 原文：code1.js 字节 [1379050,1384017]（包装变量 mn，基类 i=T=laya.events.EventDispatcher，
 * 池化注册名 n(K)="sg.model.ModelSettings"）。
 * oracle：Projects/RecoveryData/sanguo-binglin-wx/translation/oracle/batch-d/ModelSettings.js
 *
 * 批次 D 入批原因：ModelManager 字段初始化器 `sg.model.ModelSettings.instance`。
 * 依赖：us=SaveLocal、Rt=ConfigApp、Gt=ConfigServer、vs=Tools、tn=ViewManager、
 * as=MusicManager（批次 B 模块直引）；P=laya.utils.Handler、m=laya.utils.Browser、
 * ct=laya.media.SoundManager（引擎）；An=sg.utils.FontManager（批次外，全局注册路径）。
 * 构造即 _initModel：读本地存档 settingsData（缺失/pf 不匹配时重置默认）并挂
 * window.pauseAudio/resumeAudio + SaveLocal.emiter STORAGE_INIT 监听。
 */
import Handler = laya.utils.Handler;
import Browser = laya.utils.Browser;
import { SaveLocal } from "../utils/SaveLocal";
import { ConfigApp } from "../cfg/ConfigApp";
import { ConfigServer } from "../cfg/ConfigServer";
import { Tools } from "../utils/Tools";
import { ViewManager } from "../manager/ViewManager";
import { MusicManager } from "../utils/MusicManager";

export class ModelSettings extends laya.events.EventDispatcher {

    constructor() {
        super();
        this._initModel();
    }

    /** 装配 settingsData（默认值见 ||(…) 组）；pf 换渠道时整体重置 */
    public _initModel(): void {
        ModelSettings.settingsData = SaveLocal.getValue("sg_local_save_key_settings");
        (!ModelSettings.settingsData || ModelSettings.settingsData && !ModelSettings.settingsData.pf || ModelSettings.settingsData && ModelSettings.settingsData.pf != ConfigApp.pf) && (
            ModelSettings.settingsData = {},
                ModelSettings.settingsData.pf = ConfigApp.pf,
                ModelSettings.settingsData.music = true,
                ModelSettings.settingsData.sound = true,
                ModelSettings.settingsData.music_number = 50,
                ModelSettings.settingsData.sound_number = 50,
                ModelSettings.settingsData.teamModel = true,
                ModelSettings.settingsData.notify = true,
                ModelSettings.settingsData.pchd = false,
                ModelSettings.settingsData.font = this.defaultFont,
                ModelSettings.settingsData.fontSize = ConfigApp.fontBig ? 1 : 0,
                ModelSettings.settingsData.avoid_top = ConfigApp.avoidTop > 0,
                ModelSettings.settingsData.avoid_bottom = ConfigApp.avoidBottom > 0
        ),
            this.musicActive = ModelSettings.settingsData.music,
            this.soundActive = ModelSettings.settingsData.sound,
            this.modelActive = ModelSettings.settingsData.teamModel,
            this.notifyActive = ModelSettings.settingsData.notify,
            this.musicActive ? (ModelSettings.settingsData.music_number && ModelSettings.settingsData.music_number < 0 || !ModelSettings.settingsData.music_number) && (ModelSettings.settingsData.music_number = 50) : ModelSettings.settingsData.music_number = 0,
            this.soundActive ? (ModelSettings.settingsData.sound_number && ModelSettings.settingsData.sound_number < 0 || !ModelSettings.settingsData.sound_number) && (ModelSettings.settingsData.sound_number = 50) : ModelSettings.settingsData.sound_number = 0,
            this.musicNumber = ModelSettings.settingsData.music_number,
            this.soundNumber = ModelSettings.settingsData.sound_number,
            this.hdActive = ModelSettings.settingsData.pchd,
            this.font = ModelSettings.settingsData.font || this.defaultFont,
            this.fontSizeOffset = typeof ModelSettings.settingsData.fontSize == "number" ? ModelSettings.settingsData.fontSize : 0,
            ConfigApp.pf === "h5_360_3" && (
                Browser.window.pauseAudio = function () {
                    sg.model.ModelSettings.instance.musicActive = sg.model.ModelSettings.instance.soundActive = false;
                },
                Browser.window.resumeAudio = function () {
                    sg.model.ModelSettings.instance.musicActive = sg.model.ModelSettings.instance.soundActive = true;
                }
            );
        var i = this;
        SaveLocal.emiter.on("STORAGE_INIT", null, function (e: any) {
            e && e["sg_local_save_key_settings"] && (
                void 0 !== e["sg_local_save_key_settings"].music && (i.musicActive = e["sg_local_save_key_settings"].music),
                    void 0 !== e["sg_local_save_key_settings"].sound && (i.soundActive = e["sg_local_save_key_settings"].sound)
            );
        });
    }

    /** 设置页列表（横屏：音量/字体；竖屏：开关 + 长屏 avoid_top/bottom） */
    public getListData(): any[] {
        var i: any[] = [];
        if (ConfigApp.isLandscape) {
            i.push({ type: "music_number", name: Tools.getMsgById("_settings003"), value: this.musicNumber }),
                i.push({ type: "sound_number", name: Tools.getMsgById("_settings004"), value: this.soundNumber }),
                i.push({ type: "font", name: Tools.getMsgById("_settings010"), value: this.font, btnType: 1 }),
                i.push({ type: "fontSize", name: Tools.getMsgById("_settings011"), value: this.fontSizeOffset, btnType: 1, btnTxt: ["_settings009", "_settings008"] });
        } else {
            i.push({ type: "music", name: Tools.getMsgById("_settings003"), value: this.musicActive }),
                i.push({ type: "sound", name: Tools.getMsgById("_settings004"), value: this.soundActive });
            var s = Browser.clientHeight / Browser.clientWidth;
            s >= 1.7 && i.push({ type: "avoid_top", name: Tools.getMsgById("_settings_a_t"), value: this.avoidTop }),
                !ConfigApp.releaseMiniGame() && s >= 1.9 && i.push({ type: "avoid_bottom", name: Tools.getMsgById("_settings_a_b"), value: this.avoidBottom });
        }
        return i;
    }

    public get notifyActive(): boolean {
        return ModelSettings.settingsData.notify;
    }
    public set notifyActive(t: boolean) {
        ModelSettings.settingsData.notify = t;
    }

    public get fontSizeOffset(): any {
        return ModelSettings.settingsData.fontSize;
    }
    public set fontSizeOffset(t: any) {
        ModelSettings.settingsData.fontSize = t,
            sg.utils.FontManager.changeSize(ModelSettings.settingsData.fontSize);
    }

    public get musicActive(): boolean {
        return ModelSettings.settingsData.music;
    }
    public set musicActive(t: boolean) {
        ModelSettings.settingsData.music = t,
            MusicManager.musicMuted = !t;
    }

    public get soundActive(): boolean {
        return ModelSettings.settingsData.sound;
    }
    public set soundActive(t: boolean) {
        ModelSettings.settingsData.sound = t,
            MusicManager.soundMuted = !t;
    }

    public get avoidTop(): boolean {
        return ModelSettings.settingsData.avoid_top;
    }
    public set avoidTop(t: boolean) {
        ModelSettings.settingsData.avoid_top = t,
            ViewManager.instance.showTipsTxt(Tools.getMsgById("restartGame_tips"));
    }

    public get soundNumber(): number {
        return ModelSettings.settingsData.sound_number;
    }
    public set soundNumber(t: number) {
        ModelSettings.settingsData.sound_number = t,
            this.soundActive = t > 0,
            laya.media.SoundManager.setSoundVolume(.01 * t);
    }

    public get musicNumber(): number {
        return ModelSettings.settingsData.music_number;
    }
    public set musicNumber(t: number) {
        ModelSettings.settingsData.music_number = t,
            this.musicActive = t > 0,
            laya.media.SoundManager.setMusicVolume(.01 * t);
    }

    public get avoidBottom(): boolean {
        return ModelSettings.settingsData.avoid_bottom;
    }
    public set avoidBottom(t: boolean) {
        ModelSettings.settingsData.avoid_bottom = t,
            ViewManager.instance.showTipsTxt(Tools.getMsgById("restartGame_tips"));
    }

    public get defaultFont(): any {
        return ConfigApp.fontData[ConfigApp.getFontKey()];
    }

    public get font(): any {
        return ModelSettings.settingsData.font;
    }
    public set font(t: any) {
        if (ModelSettings.settingsData.font != t && ModelSettings.settingsData.fontSize > 0) {
            sg.utils.FontManager.changeSize(0),
                sg.utils.FontManager.setFont(t);
            var n = 0;
            ConfigServer.system_simple && ConfigServer.system_simple.font_size_offset[t] && (n = ConfigServer.system_simple.font_size_offset[t]),
                this.fontSizeOffset = n;
        } else
            sg.utils.FontManager.setFont(t);
        ModelSettings.settingsData.font = t;
    }

    public get modelActive(): boolean {
        return ModelSettings.settingsData.teamModel;
    }
    public set modelActive(t: boolean) {
        ModelSettings.settingsData.teamModel = t,
            this.event("change_model");
    }

    /** 高清开关：切换走 restartGame 重启确认（e=确认结果，0==e 反转语义原文如此） */
    public get hdActive(): boolean {
        return ModelSettings.settingsData.pchd;
    }
    public set hdActive(t: boolean) {
        ModelSettings.settingsData.pchd != t && ViewManager.instance.restartGame(" ", Handler.create(this, function (e: any) {
            ModelSettings.settingsData.pchd = 0 == e ? t : !t,
                ConfigApp.pchd = ModelSettings.settingsData.pchd ? "1" : "0",
                ModelSettings.saveSettings(),
                sg.model.ModelSettings.instance.event("update_state");
        }));
    }

    /** r(1,s,"instance",...) —— 惰性单例（写回 sModel） */
    public static get instance(): ModelSettings {
        return ModelSettings.sModel = ModelSettings.sModel || new ModelSettings();
    }

    public static saveSettings(): void {
        SaveLocal.save("sg_local_save_key_settings", ModelSettings.settingsData);
    }

    public static UPDATE_STATE: string = "update_state";
    public static TYPE_PF: string = "pf";
    public static TYPE_MUSIC: string = "music";
    public static TYPE_SOUND: string = "sound";
    public static TYPE_AVOID_T: string = "avoid_top";
    public static TYPE_AVOID_B: string = "avoid_bottom";
    public static TYPE_MUSIC_NUMBER: string = "music_number";
    public static TYPE_SOUND_NUMBER: string = "sound_number";
    public static TYPE_MODEL: string = "teamModel";
    public static TYPE_NOTIFY: string = "notify";
    public static TYPE_PCHD: string = "pchd";
    public static TYPE_FONT: string = "font";
    public static TYPE_FONTSIZE_OFFSET: string = "fontSize";
    public static CHANGE_MODEL: string = "change_model";
    public static TEMP_DATA: string = "temp_data";
    public static BTN_IMG: string = "btn_kg_1.png";
    public static sModel: ModelSettings = null;
    public static settingsData: any = null;
}

/**
 * 注册身份等价物：原文 o(s,n(K),i)（i=T=laya.events.EventDispatcher）。
 */
Laya.class(ModelSettings, "sg.model.ModelSettings", null, null);
