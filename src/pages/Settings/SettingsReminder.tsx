import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToggle,
} from "@ionic/react";

import {
  calendarOutline,
  notificationsOutline,
  timeOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./SettingsReminder.css";


type Weekday =
  | "mo"
  | "tu"
  | "we"
  | "th"
  | "fr"
  | "sa"
  | "su";


type WeekdayOption = {
  id: Weekday;
  label: string;
};


const weekdays: WeekdayOption[] = [
  {
    id: "mo",
    label: "Mo",
  },
  {
    id: "tu",
    label: "Di",
  },
  {
    id: "we",
    label: "Mi",
  },
  {
    id: "th",
    label: "Do",
  },
  {
    id: "fr",
    label: "Fr",
  },
  {
    id: "sa",
    label: "Sa",
  },
  {
    id: "su",
    label: "So",
  },
];


const SettingsReminder = () => {
  const [reminderEnabled, setReminderEnabled] =
    useState(true);

  const [reminderTime, setReminderTime] =
    useState("19:00");

  const [selectedDays, setSelectedDays] =
    useState<Weekday[]>([
      "mo",
      "tu",
      "we",
      "th",
      "fr",
    ]);


  const toggleDay = (day: Weekday) => {
    setSelectedDays((current) => {
      if (current.includes(day)) {
        return current.filter(
          (selectedDay) => selectedDay !== day
        );
      }

      return [...current, day];
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation title="Erinnerungen" showBackButton showSettingsButton={false} />
      </IonHeader>

      <IonContent className="settings-reminder">
        <div className="settings-reminder__container">
          <main className="settings-reminder__content">

            <div className="settings-reminder__setting">
              <div className="settings-reminder__setting-main">
                <div className="settings-reminder__setting-icon">
                  <IonIcon icon={notificationsOutline} />
                </div>

                <div className="settings-reminder__setting-content">
                  <span className="settings-reminder__setting-title">
                    Erinnerung aktivieren
                  </span>

                  <span className="settings-reminder__setting-description">
                    Erhalte eine regelmäßige Erinnerung für deinen Check-in.
                  </span>
                </div>

                <IonToggle
                  checked={reminderEnabled}
                  aria-label="Erinnerung aktivieren"
                  onIonChange={(event) =>
                    setReminderEnabled(
                      event.detail.checked
                    )
                  }
                />
              </div>
            </div>

            <div
              className={`settings-reminder__setting ${
                !reminderEnabled
                  ? "settings-reminder__setting--disabled"
                  : ""
              }`}
            >
              <div className="settings-reminder__setting-main">
                <div className="settings-reminder__setting-icon">
                  <IonIcon icon={timeOutline} />
                </div>

                <div className="settings-reminder__setting-content">
                  <span className="settings-reminder__setting-title">
                    Uhrzeit
                  </span>

                  <span className="settings-reminder__setting-description">
                    Wann möchtest du erinnert werden?
                  </span>
                </div>
              </div>

              <input
                type="time"
                className="settings-reminder__time"
                value={reminderTime}
                disabled={!reminderEnabled}
                onChange={(event) =>
                  setReminderTime(
                    event.target.value
                  )
                }
              />
            </div>

            <div
              className={`settings-reminder__setting ${
                !reminderEnabled
                  ? "settings-reminder__setting--disabled"
                  : ""
              }`}
            >
              <div className="settings-reminder__setting-main">
                <div className="settings-reminder__setting-icon">
                  <IonIcon icon={calendarOutline} />
                </div>

                <div className="settings-reminder__setting-content">
                  <span className="settings-reminder__setting-title">
                    Wiederholen
                  </span>

                  <span className="settings-reminder__setting-description">
                    An welchen Tagen möchtest du erinnert werden?
                  </span>
                </div>
              </div>

              <div className="settings-reminder__weekday-list">
                {weekdays.map((day) => {
                  const selected =
                    selectedDays.includes(day.id);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      disabled={!reminderEnabled}
                      className={`settings-reminder__weekday ${
                        selected
                          ? "settings-reminder__weekday--selected"
                          : ""
                      }`}
                      onClick={() =>
                        toggleDay(day.id)
                      }
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsReminder;