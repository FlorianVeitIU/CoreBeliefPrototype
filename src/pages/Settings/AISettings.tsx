import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToggle,
} from "@ionic/react";
import {
  checkmarkOutline,
  cloudOutline,
  documentTextOutline,
  informationCircleOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from "ionicons/icons";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import "./AISettings.css";

type AISettingId = "aiEnabled" | "cloudProcessing" | "reflectionContext";
type AIState = Record<AISettingId, boolean>;
type AISetting = { id: AISettingId; title: string; description: string; icon: string };
type CompanionStyle = "reserved" | "balanced" | "active";

const STYLE_STORAGE_KEY = "reflection-companion-style";

const companionStyles: { id: CompanionStyle; title: string; description: string }[] = [
  {
    id: "reserved",
    title: "Zurückhaltend",
    description: "Reagiert vor allem auf deine Eingaben und gibt nur gelegentlich eigene Impulse.",
  },
  {
    id: "balanced",
    title: "Ausgeglichen",
    description: "Verbindet Reaktionen auf deine Eingaben mit passenden Fragen und eigenen Impulsen.",
  },
  {
    id: "active",
    title: "Aktiv begleitend",
    description: "Stellt häufiger Rückfragen und bietet Impulse oder mögliche nächste Schritte an.",
  },
];

const aiSettings: AISetting[] = [
  {
    id: "aiEnabled",
    title: "KI-Unterstützung",
    description: "Lege fest, ob du KI-gestützte Funktionen verwenden möchtest.",
    icon: sparklesOutline,
  },
  {
    id: "cloudProcessing",
    title: "KI-Verarbeitung",
    description: "Erlaube die Verarbeitung deiner Eingaben durch einen externen KI-Dienst, wenn du KI-Unterstützung verwendest.",
    icon: cloudOutline,
  },
  {
    id: "reflectionContext",
    title: "Frühere Reflexionen einbeziehen",
    description: "Erlaube, dass frühere Inhalte zur Unterstützung aktueller Reflexionen verwendet werden.",
    icon: documentTextOutline,
  },
];

const readCompanionStyle = (): CompanionStyle => {
  try {
    const saved = localStorage.getItem(STYLE_STORAGE_KEY);
    if (saved === "reserved" || saved === "balanced" || saved === "active") {
      return saved;
    }
  } catch {
    return "balanced";
  }
  return "balanced";
};

const AISettings = () => {
  const [settings, setSettings] = useState<AIState>({
    aiEnabled: true,
    cloudProcessing: true,
    reflectionContext: false,
  });
  const [companionStyle, setCompanionStyle] = useState<CompanionStyle>(readCompanionStyle);

  const handleToggle = (id: AISettingId, checked: boolean) => {
    setSettings((current) => ({
      ...current,
      [id]: checked,
      ...(id === "aiEnabled" && !checked
        ? { cloudProcessing: false, reflectionContext: false }
        : {}),
      ...(id === "cloudProcessing" && !checked ? { reflectionContext: false } : {}),
    }));
  };

  const handleStyleChange = (style: CompanionStyle) => {
    setCompanionStyle(style);
    try {
      localStorage.setItem(STYLE_STORAGE_KEY, style);
    } catch {
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation title="KI-Einstellungen" showBackButton showSettingsButton={false} />
      </IonHeader>

      <IonContent className="ai-settings">
        <div className="ai-settings__container">
          <main className="ai-settings__content">
            <section className="ai-settings__section">
              <div className="ai-settings__list">
                {aiSettings.slice(0, 1).map((setting) => (
                  <div key={setting.id} className="ai-settings__item">
                    <div className="ai-settings__item-icon"><IonIcon icon={setting.icon} /></div>
                    <div className="ai-settings__item-content">
                      <span className="ai-settings__item-title">{setting.title}</span>
                      <span className="ai-settings__item-description">{setting.description}</span>
                    </div>
                    <IonToggle checked={settings[setting.id]} aria-label={`${setting.title} aktivieren`}
                      onIonChange={(event) => handleToggle(setting.id, event.detail.checked)} />
                  </div>
                ))}
              </div>
              <div className={`ai-settings__style-section${!settings.aiEnabled ? " ai-settings__style-section--disabled" : ""}`}>
                <h3 className="ai-settings__style-heading">Wie möchtest du begleitet werden?</h3>
                <p className="ai-settings__style-intro">
                  Die KI begleitet deine Reflexion mit Fragen und Impulsen. Sie unterstützt
                  dich dabei, eigene Gedanken zu reflektieren, ohne dir eine Interpretation
                  über dich vorzugeben.
                </p>
                <div className="ai-settings__style-options" role="group" aria-label="Begleitstil auswählen">
                  {companionStyles.map((style) => (
                    <button type="button" key={style.id}
                      disabled={!settings.aiEnabled}
                      className={`ai-settings__style-option${companionStyle === style.id ? " ai-settings__style-option--selected" : ""}`}
                      aria-pressed={companionStyle === style.id}
                      onClick={() => handleStyleChange(style.id)}>
                      <span className="ai-settings__style-option-text">
                        <strong>{style.title}</strong>
                        <span>{style.description}</span>
                      </span>
                      {companionStyle === style.id && <IonIcon icon={checkmarkOutline} />}
                    </button>
                  ))}
                </div>
                <p className="ai-settings__style-hint">Du kannst den Begleitstil jederzeit ändern.</p>
              </div>
              <div className="ai-settings__list">
                {aiSettings.slice(1).map((setting) => {
                  const disabled = !settings.aiEnabled ||
                    (setting.id === "reflectionContext" && !settings.cloudProcessing);
                  return (
                    <div key={setting.id} className={`ai-settings__item${disabled ? " ai-settings__item--disabled" : ""}`}>
                      <div className="ai-settings__item-icon"><IonIcon icon={setting.icon} /></div>
                      <div className="ai-settings__item-content">
                        <span className="ai-settings__item-title">{setting.title}</span>
                        <span className="ai-settings__item-description">{setting.description}</span>
                      </div>
                      <IonToggle checked={settings[setting.id]} disabled={disabled}
                        aria-label={`${setting.title} aktivieren`}
                        onIonChange={(event) => handleToggle(setting.id, event.detail.checked)} />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="ai-settings__section ai-settings__section--information">
              <div className="ai-settings__section-heading">
                <h2 className="ai-settings__section-title">Transparenz und Grenzen</h2>
                <p className="ai-settings__section-description">
                  Was du über die KI-Unterstützung wissen solltest.
                </p>
              </div>
              <div className="ai-settings__notice">
                <IonIcon icon={informationCircleOutline} />
                <div>
                  <strong>Unterstützung statt Bewertung</strong>
                  <span>
                    KI-generierte Antworten können unvollständig oder fehlerhaft sein.
                    Sie sind keine Diagnose und ersetzen keine professionelle psychologische
                    oder therapeutische Begleitung.
                  </span>
                </div>
              </div>
              <div className="ai-settings__notice">
                <IonIcon icon={shieldCheckmarkOutline} />
                <div>
                  <strong>Du behältst die Kontrolle</strong>
                  <span>
                    Du entscheidest, ob du KI-Unterstützung nutzen und frühere Reflexionen
                    einbeziehen möchtest. Die Schalter demonstrieren diese Auswahl im
                    Prototyp; sie steuern noch keine tatsächliche Datenverarbeitung.
                  </span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default AISettings;
