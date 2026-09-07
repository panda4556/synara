import { SelectItem } from "~/components/ui/select";
import { APP_LANGUAGES, isAppLanguage, type AppLocale } from "~/localization/language";
import { useAppLanguage } from "~/localization/useAppLanguage";
import { settingRowAnchorId } from "~/settingsNavigation";
import { SettingResetButton, SettingsSelectControl } from "./SettingControls";
import { SettingsRow } from "./SettingsPanelPrimitives";

const LANGUAGE_COPY = {
  en: {
    description:
      "Choose the interface language on this device. Changes apply immediately; chat messages stay unchanged.",
    system: "System default",
    reset: "Reset language to system default",
  },
  "zh-CN": {
    description: "选择此设备的界面语言，切换后立即生效，不会翻译或修改聊天内容。",
    system: "跟随系统",
    reset: "恢复为跟随系统语言",
  },
} satisfies Record<AppLocale, { description: string; system: string; reset: string }>;

export function LanguageSettingsRow() {
  const { preference, locale, setLanguage } = useAppLanguage();
  const copy = LANGUAGE_COPY[locale];
  const labels = { system: copy.system, en: "English", "zh-CN": "简体中文" };
  return (
    // This row is natively localized. Do not rewrite its text or the language autonyms.
    <div data-zh-cn-skip>
      <SettingsRow
        id={settingRowAnchorId("Language")}
        title="Language / 语言"
        description={copy.description}
        resetAction={
          preference !== "system" ? (
            <SettingResetButton
              label="language"
              resetLabel={copy.reset}
              onClick={() => setLanguage("system")}
            />
          ) : null
        }
        control={
          <SettingsSelectControl
            value={preference}
            onValueChange={(value) => {
              if (isAppLanguage(value)) setLanguage(value);
            }}
            ariaLabel="Language / 语言"
            valueContent={labels[preference]}
          >
            {APP_LANGUAGES.map((language) => (
              <SelectItem key={language} value={language} data-zh-cn-skip>
                {labels[language]}
              </SelectItem>
            ))}
          </SettingsSelectControl>
        }
      />
    </div>
  );
}
