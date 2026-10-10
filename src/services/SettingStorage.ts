import { Preferences } from "@capacitor/preferences";

export type ReminderSetting =
  | "none"
  | "daily"
  | "custom";

export type AiPreference =
  | "reserved"
  | "balanced"
  | "active";

export type HelperContact = {
  id: string;
  name: string;
  relation: string;
};

export type AppSettings = {
  name: string;
  onboardingCompleted: boolean;
  reminder: ReminderSetting;
  aiPreference: AiPreference;
  helperContacts: HelperContact[];
};

const SETTINGS_KEY = "app_settings";

const DEFAULT_SETTINGS: AppSettings = {
  name: "",
  onboardingCompleted: false,
  reminder: "none",
  aiPreference: "reserved",
  helperContacts: [],
};

class SettingsStorage {
  async getSettings(): Promise<AppSettings> {
    const { value } = await Preferences.get({
      key: SETTINGS_KEY,
    });

    if (!value) {
      return {
        ...DEFAULT_SETTINGS,
        helperContacts: [],
      };
    }

    try {
      const storedSettings =
        JSON.parse(value) as Partial<AppSettings>;

      return {
        ...DEFAULT_SETTINGS,
        ...storedSettings,
        helperContacts:
          storedSettings.helperContacts ?? [],
      };
    } catch {
      return {
        ...DEFAULT_SETTINGS,
        helperContacts: [],
      };
    }
  }

  async saveSettings(
    settings: AppSettings
  ): Promise<void> {
    await Preferences.set({
      key: SETTINGS_KEY,
      value: JSON.stringify(settings),
    });
  }

  async updateSettings(
    settings: Partial<AppSettings>
  ): Promise<void> {
    const currentSettings =
      await this.getSettings();

    await this.saveSettings({
      ...currentSettings,
      ...settings,
    });
  }

  async getName(): Promise<string> {
    const settings =
      await this.getSettings();

    return settings.name;
  }

  async setName(
    name: string
  ): Promise<void> {
    await this.updateSettings({
      name,
    });
  }

  async isOnboardingCompleted(): Promise<boolean> {
    const settings =
      await this.getSettings();

    return settings.onboardingCompleted;
  }

  async setOnboardingCompleted(
    completed: boolean
  ): Promise<void> {
    await this.updateSettings({
      onboardingCompleted: completed,
    });
  }

  async getReminder(): Promise<ReminderSetting> {
    const settings =
      await this.getSettings();

    return settings.reminder;
  }

  async setReminder(
    reminder: ReminderSetting
  ): Promise<void> {
    await this.updateSettings({
      reminder,
    });
  }

  async getAiPreference(): Promise<AiPreference> {
    const settings =
      await this.getSettings();

    return settings.aiPreference;
  }

  async setAiPreference(
    aiPreference: AiPreference
  ): Promise<void> {
    await this.updateSettings({
      aiPreference,
    });
  }

  async getHelperContacts(): Promise<HelperContact[]> {
    const settings =
      await this.getSettings();

    return settings.helperContacts;
  }

  async setHelperContacts(
    helperContacts: HelperContact[]
  ): Promise<void> {
    await this.updateSettings({
      helperContacts,
    });
  }

  async addHelperContact(
    helperContact: HelperContact
  ): Promise<void> {
    const settings =
      await this.getSettings();

    await this.updateSettings({
      helperContacts: [
        ...settings.helperContacts,
        helperContact,
      ],
    });
  }

  async removeHelperContact(
    id: string
  ): Promise<void> {
    const settings =
      await this.getSettings();

    await this.updateSettings({
      helperContacts:
        settings.helperContacts.filter(
          (helperContact) =>
            helperContact.id !== id
        ),
    });
  }

  async clear(): Promise<void> {
    await Preferences.remove({
      key: SETTINGS_KEY,
    });
  }
}

const settingsStorage =
  new SettingsStorage();

export default settingsStorage;