import { useState } from "react";
import { IonAlert, IonContent, IonHeader, IonIcon, IonPage, IonToggle } from "@ionic/react";
import { analyticsOutline, peopleOutline, trashOutline, informationCircleOutline } from "ionicons/icons";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import "./PrivacySettings.css";

type PrivacySettingId = "usageData" | "sharing";
type PrivacySetting = { id: PrivacySettingId; title: string; description: string; icon: string };
type PrivacyState = Record<PrivacySettingId, boolean>;

const privacySettings: PrivacySetting[] = [
  { id: "usageData", title: "Anonyme Nutzungsdaten", description: "Erlaube die Nutzung anonymer Daten zur Verbesserung der App.", icon: analyticsOutline },
  { id: "sharing", title: "Inhalte teilen", description: "Erlaube grundsätzlich das freiwillige Teilen ausgewählter Inhalte mit anderen Personen.", icon: peopleOutline },
];

const PrivacySettings = () => {
  const [settings, setSettings] = useState<PrivacyState>({ usageData: false, sharing: false });
  const [showDeleteInfo, setShowDeleteInfo] = useState(false);

  const handleToggle = (id: PrivacySettingId, checked: boolean) => {
    setSettings((current) => ({ ...current, [id]: checked }));
  };

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation title="Datenschutz" showBackButton  showSettingsButton={false}/>
      </IonHeader>
      <IonContent className="privacy-settings">
        <div className="privacy-settings__container">
          <main className="privacy-settings__content">
            <section className="privacy-settings__section">
              <div className="privacy-settings__section-heading">
                <h2 className="privacy-settings__section-title">Deine Entscheidungen</h2>
                <p className="privacy-settings__section-description">Lege fest, wie deine Inhalte verwendet werden dürfen.</p>
              </div>
              <div className="privacy-settings__list">
                {privacySettings.map((setting) => (
                  <div key={setting.id} className="privacy-settings__item">
                    <div className="privacy-settings__item-icon"><IonIcon icon={setting.icon} /></div>
                    <div className="privacy-settings__item-content">
                      <span className="privacy-settings__item-title">{setting.title}</span>
                      <span className="privacy-settings__item-description">{setting.description}</span>
                    </div>
                    <IonToggle checked={settings[setting.id]} aria-label={`${setting.title} aktivieren`} onIonChange={(event) => handleToggle(setting.id, event.detail.checked)} />
                  </div>
                ))}
              </div>
              <div className="privacy-settings__information">
                <IonIcon icon={informationCircleOutline} />
                <span>Diese Einstellungen werden im Prototyp nur für die aktuelle Ansicht übernommen. Eine dauerhafte Speicherung oder Datenübertragung ist hier nicht angebunden.</span>
              </div>
              <button type="button" className="privacy-settings__delete" onClick={() => setShowDeleteInfo(true)}>
                <div className="privacy-settings__delete-icon"><IonIcon icon={trashOutline} /></div>
                <div className="privacy-settings__item-content">
                  <span className="privacy-settings__item-title">Gespeicherte Daten löschen</span>
                  <span className="privacy-settings__item-description">Entferne deine gespeicherten Reflexions- und Check-in-Daten.</span>
                </div>
              </button>
            </section>
          </main>
        </div>
        <IonAlert isOpen={showDeleteInfo} onDidDismiss={() => setShowDeleteInfo(false)} header="Daten löschen" message="Die Löschfunktion ist in diesem Prototyp noch nicht implementiert. Es wurden keine Daten gelöscht." buttons={["Verstanden"]} />
      </IonContent>
    </IonPage>
  );
};

export default PrivacySettings;
