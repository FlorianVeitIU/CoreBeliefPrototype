import {
  IonContent,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  useIonRouter,
  IonHeader,
} from "@ionic/react";

import {
  notificationsOutline,
  pulseOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./SettingsOverview.css";

const SettingsOverview = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation title="Einstellungen" showBackButton showSettingsButton={false} />
      </IonHeader>

      <IonContent className="settings-overview">
        <div className="settings-overview__container">
          <main className="settings-overview__content">
            <section className="settings-overview__section">
              <h2 className="settings-overview__section-title">Allgemein</h2>

              <div className="settings-overview__general">
                <div className="settings-overview__control">
                  <div className="settings-overview__control-text">
                    <span className="settings-overview__control-title">
                      Darstellung
                    </span>

                    <span className="settings-overview__control-description">
                      Wähle die Darstellung der App.
                    </span>
                  </div>

                  <IonSegment
                    className="settings-overview__segment"
                    value="system"
                  >
                    <IonSegmentButton value="light">
                      <IonLabel>Hell</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="dark">
                      <IonLabel>Dunkel</IonLabel>
                    </IonSegmentButton>

                    <IonSegmentButton value="system">
                      <IonLabel>System</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </div>
              </div>
            </section>

            <section className="settings-overview__section">
              <h2 className="settings-overview__section-title">Begleitung</h2>

              <div className="settings-overview__list">
                <button
                  type="button"
                  className="settings-overview__item"
                  onClick={() => router.push("/settings/checkins")}
                >
                  <div className="settings-overview__item-icon">
                    <IonIcon icon={pulseOutline} />
                  </div>

                  <div className="settings-overview__item-content">
                    <span className="settings-overview__item-title">
                      Check-ins
                    </span>

                    <span className="settings-overview__item-description">
                      Lege fest, welche Check-ins du nutzen möchtest.
                    </span>
                  </div>

                  <IonIcon
                    className="settings-overview__item-arrow"
                    icon={chevronForwardOutline}
                  />
                </button>

                <button
                  type="button"
                  className="settings-overview__item"
                  onClick={() => router.push("/settings/reminders")}
                >
                  <div className="settings-overview__item-icon">
                    <IonIcon icon={notificationsOutline} />
                  </div>

                  <div className="settings-overview__item-content">
                    <span className="settings-overview__item-title">
                      Erinnerungen
                    </span>

                    <span className="settings-overview__item-description">
                      Bestimme, wann dich die App an Check-ins erinnert.
                    </span>
                  </div>

                  <IonIcon
                    className="settings-overview__item-arrow"
                    icon={chevronForwardOutline}
                  />
                </button>
              </div>
            </section>

            <section className="settings-overview__section">
              <h2 className="settings-overview__section-title">
                Datenschutz & Unterstützung
              </h2>

              <div className="settings-overview__list">
                <button
                  type="button"
                  className="settings-overview__item"
                  onClick={() => router.push("/settings/privacy")}
                >
                  <div className="settings-overview__item-icon">
                    <IonIcon icon={shieldCheckmarkOutline} />
                  </div>

                  <div className="settings-overview__item-content">
                    <span className="settings-overview__item-title">
                      Datenschutz
                    </span>

                    <span className="settings-overview__item-description">
                      Verwalte deine Daten und Datenschutzeinstellungen.
                    </span>
                  </div>

                  <IonIcon
                    className="settings-overview__item-arrow"
                    icon={chevronForwardOutline}
                  />
                </button>

                <button
                  type="button"
                  className="settings-overview__item"
                  onClick={() => router.push("/settings/ai")}
                >
                  <div className="settings-overview__item-icon">
                    <IonIcon icon={sparklesOutline} />
                  </div>

                  <div className="settings-overview__item-content">
                    <span className="settings-overview__item-title">
                      KI-Unterstützung
                    </span>

                    <span className="settings-overview__item-description">
                      Lege fest, wie KI dich bei Reflexionen unterstützt.
                    </span>
                  </div>

                  <IonIcon
                    className="settings-overview__item-arrow"
                    icon={chevronForwardOutline}
                  />
                </button>
              </div>
            </section>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsOverview;
