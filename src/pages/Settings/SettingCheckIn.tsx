import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToggle,
} from "@ionic/react";

import {
  bodyOutline,
  happyOutline,
  heartOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./SettingCheckIn.css";


type CheckInId =
  | "wellbeing"
  | "emotions"
  | "body";


type CheckInItem = {
  id: CheckInId;
  title: string;
  description: string;
  icon: string;
};


type CheckInState = Record<CheckInId, boolean>;


const checkIns: CheckInItem[] = [
  {
    id: "wellbeing",
    title: "Befinden",
    description:
      "Halte kurz fest, wie es dir im Moment geht.",
    icon: happyOutline,
  },
  {
    id: "emotions",
    title: "Emotionen",
    description:
      "Nimm wahr, welche Gefühle dich gerade beschäftigen.",
    icon: heartOutline,
  },
  {
    id: "body",
    title: "Körper",
    description:
      "Achte bewusst auf körperliche Reaktionen und Signale.",
    icon: bodyOutline,
  },
];


const SettingCheckIn = () => {
  const [enabledCheckIns, setEnabledCheckIns] =
    useState<CheckInState>({
      wellbeing: true,
      emotions: true,
      body: false,
    });


  const handleToggle = (
    id: CheckInId,
    checked: boolean
  ) => {
    setEnabledCheckIns((current) => ({
      ...current,
      [id]: checked,
    }));
  };


  return (
    <IonPage>

      <IonHeader>
        <TopNavigation
          title="Check-ins"
          showBackButton
        />
      </IonHeader>


      <IonContent className="checkin-settings">

        <div className="checkin-settings__container">

          <main className="checkin-settings__content">

            <section className="checkin-settings__section">

              <div className="checkin-settings__intro">

                <h1 className="checkin-settings__intro-title">
                  Check-ins beim Start
                </h1>

                <p className="checkin-settings__intro-description">
                  Wähle aus, welche Check-ins beim Start
                  der App angezeigt werden.
                </p>

              </div>


              <div className="checkin-settings__list">

                {checkIns.map((checkIn) => (

                  <div
                    key={checkIn.id}
                    className="checkin-settings__item"
                  >

                    <div className="checkin-settings__item-icon">
                      <IonIcon icon={checkIn.icon} />
                    </div>


                    <div className="checkin-settings__item-content">

                      <span className="checkin-settings__item-title">
                        {checkIn.title}
                      </span>

                      <span className="checkin-settings__item-description">
                        {checkIn.description}
                      </span>

                    </div>


                    <IonToggle
                      checked={enabledCheckIns[checkIn.id]}
                      aria-label={`${checkIn.title} beim Start aktivieren`}
                      onIonChange={(event) =>
                        handleToggle(
                          checkIn.id,
                          event.detail.checked
                        )
                      }
                    />

                  </div>

                ))}

              </div>

            </section>

          </main>

        </div>

      </IonContent>

    </IonPage>
  );
};


export default SettingCheckIn;