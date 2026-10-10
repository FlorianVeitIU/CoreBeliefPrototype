import { IonContent, IonIcon, IonPage, useIonRouter } from "@ionic/react";

import {
  arrowBackOutline,
  arrowForwardOutline,
  checkmarkOutline,
  informationCircleOutline,
} from "ionicons/icons";

import { useState } from "react";

import settingsStorage, {
  AiPreference,
  HelperContact,
  ReminderSetting,
} from "../../services/SettingStorage";

import "./Onboarding.css";

type OnboardingStep = "name" | "reminders" | "ai" | "helpers" | "finished";

const Onboarding: React.FC = () => {
  const router = useIonRouter();
  const [step, setStep] = useState<OnboardingStep>("name");
  const [name, setName] = useState("");
  const [reminder, setReminder] = useState<ReminderSetting>("daily");
  const [aiPreference, setAiPreference] = useState<AiPreference>("balanced");
  const [helpers, setHelpers] = useState<HelperContact[]>([]);
  const [helperName, setHelperName] = useState("");
  const [helperRelation, setHelperRelation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const getStepNumber = () => {
    switch (step) {
      case "name":
        return 1;

      case "reminders":
        return 2;

      case "ai":
        return 3;

      case "helpers":
        return 4;

      default:
        return 4;
    }
  };

  const goBack = () => {
    switch (step) {
      case "reminders":
        setStep("name");
        break;

      case "ai":
        setStep("reminders");
        break;

      case "helpers":
        setStep("ai");
        break;

      default:
        break;
    }
  };

  const goNext = () => {
    switch (step) {
      case "name":
        setStep("reminders");
        break;

      case "reminders":
        setStep("ai");
        break;

      case "ai":
        setStep("helpers");
        break;

      default:
        break;
    }
  };

  const createHelperId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const addHelper = () => {
    const trimmedName = helperName.trim();

    const trimmedRelation = helperRelation.trim();

    if (!trimmedName) {
      return;
    }

    const helper: HelperContact = {
      id: createHelperId(),
      name: trimmedName,
      relation: trimmedRelation || "Vertrauensperson",
    };

    setHelpers((current) => [...current, helper]);

    setHelperName("");
    setHelperRelation("");
  };

  const removeHelper = (helperId: string) => {
    setHelpers((current) => current.filter((helper) => helper.id !== helperId));
  };

  const saveOnboarding = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await settingsStorage.updateSettings({
        name: name.trim(),
        reminder,
        aiPreference,
        helperContacts: helpers,
        onboardingCompleted: true,
      });

      setStep("finished");
    } finally {
      setIsSaving(false);
    }
  };

  const finishOnboarding = () => {
    router.push("/home", "root");
  };

  const renderProgress = () => {
    if (step === "finished") {
      return null;
    }

    const currentStep = getStepNumber();

    return (
      <div className="onboarding__progress">
        <span>{currentStep} von 4</span>

        <div className="onboarding__progress-track">
          <div
            className="onboarding__progress-value"
            style={{
              width: `${(currentStep / 4) * 100}%`,
            }}
          />
        </div>
      </div>
    );
  };

  const renderNameStep = () => (
    <section className="onboarding__step">
      <div className="onboarding__heading">
        <h1>Wie dürfen wir dich nennen?</h1>

        <p>Damit sich deine Begleitung persönlicher anfühlt.</p>
      </div>

      <div className="onboarding__field">
        <label htmlFor="onboarding-name">Name</label>

        <input
          id="onboarding-name"
          type="text"
          value={name}
          placeholder="Optional"
          autoComplete="given-name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="onboarding__bottom">
        <button
          type="button"
          className="onboarding__primary-button"
          onClick={goNext}
        >
          Weiter
          <IonIcon icon={arrowForwardOutline} />
        </button>

        <button
          type="button"
          className="onboarding__skip-button"
          onClick={() => {
            setName("");
            goNext();
          }}
        >
          Überspringen
        </button>
      </div>
    </section>
  );

  const renderReminderStep = () => (
    <section className="onboarding__step">
      <div className="onboarding__heading">
        <h1>Darf die App dich erinnern?</h1>

        <p>
          Du entscheidest, ob die App dich gelegentlich an einen Check-in oder
          eine Reflexion erinnern darf.
        </p>
      </div>

      <div className="onboarding__choices">
        <button
          type="button"
          className={`onboarding__choice ${
            reminder === "daily" ? "onboarding__choice--selected" : ""
          }`}
          onClick={() => setReminder("daily")}
        >
          <div>
            <strong>Sanft erinnern</strong>

            <span>
              Gelegentliche Erinnerungen an Check-ins oder Reflexionen
            </span>
          </div>

          {reminder === "daily" && <IonIcon icon={checkmarkOutline} />}
        </button>

        <button
          type="button"
          className={`onboarding__choice ${
            reminder === "none" ? "onboarding__choice--selected" : ""
          }`}
          onClick={() => setReminder("none")}
        >
          <div>
            <strong>Keine Erinnerungen</strong>

            <span>Die App sendet dir keine Erinnerungen</span>
          </div>

          {reminder === "none" && <IonIcon icon={checkmarkOutline} />}
        </button>
      </div>

      <p className="onboarding__choice-hint">
        Zeitpunkt und Häufigkeit kannst du später jederzeit in den Einstellungen
        anpassen.
      </p>

      <div className="onboarding__bottom">
        <button
          type="button"
          className="onboarding__primary-button"
          onClick={goNext}
        >
          Weiter
          <IonIcon icon={arrowForwardOutline} />
        </button>
      </div>
    </section>
  );

  const renderAiStep = () => (
    <section className="onboarding__step">
      <div className="onboarding__heading">
        <h1>Wie möchtest du begleitet werden?</h1>

        <p>
          Die KI begleitet deine Reflexion mit Fragen und Impulsen. Sie
          unterstützt dich dabei, eigene Gedanken zu reflektieren, ohne dir eine
          Interpretation über dich vorzugeben.
        </p>
      </div>

      <div className="onboarding__choices">
        <button
          type="button"
          className={`onboarding__choice ${
            aiPreference === "reserved" ? "onboarding__choice--selected" : ""
          }`}
          onClick={() => setAiPreference("reserved")}
        >
          <div>
            <strong>Zurückhaltend</strong>

            <span>
              Reagiert vor allem auf deine Eingaben und gibt nur gelegentlich
              eigene Impulse.
            </span>
          </div>

          {aiPreference === "reserved" && <IonIcon icon={checkmarkOutline} />}
        </button>

        <button
          type="button"
          className={`onboarding__choice ${
            aiPreference === "balanced" ? "onboarding__choice--selected" : ""
          }`}
          onClick={() => setAiPreference("balanced")}
        >
          <div>
            <strong>Ausgeglichen</strong>

            <span>
              Verbindet Reaktionen auf deine Eingaben mit passenden Fragen und
              eigenen Impulsen.
            </span>
          </div>

          {aiPreference === "balanced" && <IonIcon icon={checkmarkOutline} />}
        </button>

        <button
          type="button"
          className={`onboarding__choice ${
            aiPreference === "active" ? "onboarding__choice--selected" : ""
          }`}
          onClick={() => setAiPreference("active")}
        >
          <div>
            <strong>Aktiv begleitend</strong>

            <span>
              Stellt häufiger Rückfragen und bietet Impulse oder mögliche
              nächste Schritte an.
            </span>
          </div>

          {aiPreference === "active" && <IonIcon icon={checkmarkOutline} />}
        </button>
      </div>

      <div className="onboarding__ai-info">
        <div className="onboarding__ai-info-row">
          <IonIcon icon={informationCircleOutline} />

          <span>Du kannst den Begleitstil später jederzeit ändern.</span>
        </div>

        <button type="button" className="onboarding__info-button">
          Möglichkeiten und Grenzen der KI
          <IonIcon icon={arrowForwardOutline} />
        </button>
      </div>

      <div className="onboarding__bottom">
        <button
          type="button"
          className="onboarding__primary-button"
          onClick={goNext}
        >
          Weiter
          <IonIcon icon={arrowForwardOutline} />
        </button>
      </div>
    </section>
  );

  const renderHelpersStep = () => (
    <section className="onboarding__step">
      <div className="onboarding__heading">
        <h1>Wer kann für dich da sein?</h1>

        <p>
          Wenn du möchtest, kannst du Personen hinterlegen, die du in
          schwierigen Momenten schnell erreichen kannst.
        </p>
      </div>

      {helpers.length > 0 && (
        <div className="onboarding__helpers">
          {helpers.map((helper) => (
            <div key={helper.id} className="onboarding__helper">
              <div className="onboarding__helper-avatar">
                {helper.name.charAt(0).toUpperCase()}
              </div>

              <div className="onboarding__helper-content">
                <strong>{helper.name}</strong>

                <span>{helper.relation}</span>
              </div>

              <button type="button" onClick={() => removeHelper(helper.id)}>
                Entfernen
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="onboarding__helper-form">
        <div className="onboarding__field">
          <label htmlFor="helper-name">Name</label>

          <input
            id="helper-name"
            type="text"
            value={helperName}
            placeholder="Name der Person"
            onChange={(event) => setHelperName(event.target.value)}
          />
        </div>

        <div className="onboarding__field">
          <label htmlFor="helper-relation">Beziehung</label>

          <input
            id="helper-relation"
            type="text"
            value={helperRelation}
            placeholder="z. B. Freund, Schwester"
            onChange={(event) => setHelperRelation(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="onboarding__add-helper"
          disabled={!helperName.trim()}
          onClick={addHelper}
        >
          Person hinzufügen
        </button>
      </div>

      <div className="onboarding__bottom">
        <button
          type="button"
          className="onboarding__primary-button"
          disabled={isSaving}
          onClick={() => {
            void saveOnboarding();
          }}
        >
          {isSaving ? "Wird gespeichert ..." : "Fertig"}

          {!isSaving && <IonIcon icon={checkmarkOutline} />}
        </button>

        {helpers.length === 0 && (
          <button
            type="button"
            className="onboarding__skip-button"
            disabled={isSaving}
            onClick={() => {
              void saveOnboarding();
            }}
          >
            Später einrichten
          </button>
        )}
      </div>
    </section>
  );

  const renderFinished = () => (
    <section className="onboarding__finished">
      <div className="onboarding__finished-icon">
        <IonIcon icon={checkmarkOutline} />
      </div>

      <h1>Alles eingerichtet.</h1>

      <p>Du kannst deine Einstellungen später jederzeit ändern.</p>

      <button
        type="button"
        className="onboarding__primary-button"
        onClick={finishOnboarding}
      >
        App starten
        <IonIcon icon={arrowForwardOutline} />
      </button>
    </section>
  );

  return (
    <IonPage>
      <IonContent className="onboarding" scrollY={false}>
        <main className="onboarding__content">
          {step !== "name" && step !== "finished" && (
            <button
              type="button"
              className="onboarding__back"
              onClick={goBack}
              aria-label="Zurück"
            >
              <IonIcon icon={arrowBackOutline} />
              Zurück
            </button>
          )}

          {renderProgress()}

          {step === "name" && renderNameStep()}

          {step === "reminders" && renderReminderStep()}

          {step === "ai" && renderAiStep()}

          {step === "helpers" && renderHelpersStep()}

          {step === "finished" && renderFinished()}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
