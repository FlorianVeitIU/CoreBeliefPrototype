import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  arrowBackOutline,
  callOutline,
  checkmarkOutline,
  chevronForwardOutline,
  handLeftOutline,
  heartOutline,
  pulseOutline,
  refreshOutline,
  sendOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from "ionicons/icons";

import { Haptics } from "@capacitor/haptics";
import { useEffect, useRef, useState } from "react";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./QuickHelpView.css";

type QuickHelpMode =
  | "overview"
  | "haptic"
  | "ai"
  | "helpers"
  | "crisis";

type HapticState =
  | "ready"
  | "playing"
  | "finished";

type AiStep =
  | "input"
  | "firstOptions"
  | "secondOptions"
  | "finished";

const EXERCISE_DURATION = 30_000;

const MIN_VIBRATION_DURATION = 100;
const MAX_VIBRATION_DURATION = 900;

const MIN_PAUSE_DURATION = 250;
const MAX_PAUSE_DURATION = 1100;

const FIRST_AI_OPTIONS = [
  "Dass ich etwas falsch gemacht habe",
  "Was die andere Person jetzt von mir denkt",
  "Dass ich die Situation nicht mehr ändern kann",
];

const SECOND_AI_OPTIONS = [
  "Ich hätte es besser machen müssen",
  "Ich habe jemanden enttäuscht",
  "Ich bin nicht gut genug",
];

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

const randomBetween = (
  min: number,
  max: number
) =>
  Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

const QuickHelpView: React.FC = () => {
  const router = useIonRouter();

  const [mode, setMode] =
    useState<QuickHelpMode>("overview");

  const [hapticState, setHapticState] =
    useState<HapticState>("ready");

  const [aiStep, setAiStep] =
    useState<AiStep>("input");

  const [aiInput, setAiInput] =
    useState("");

  const [submittedText, setSubmittedText] =
    useState("");

  const [firstAnswer, setFirstAnswer] =
    useState("");

  const [secondAnswer, setSecondAnswer] =
    useState("");

  const sequenceIdRef =
    useRef<number>(0);

  useEffect(() => {
    return () => {
      sequenceIdRef.current += 1;
    };
  }, []);

  const resetAiSupport = () => {
    setAiStep("input");
    setAiInput("");
    setSubmittedText("");
    setFirstAnswer("");
    setSecondAnswer("");
  };

  const resetHapticExercise = () => {
    sequenceIdRef.current += 1;
    setHapticState("ready");
  };

  const returnToOverview = () => {
    sequenceIdRef.current += 1;

    setHapticState("ready");
    resetAiSupport();
    setMode("overview");
  };

  const openHapticExercise = () => {
    setHapticState("ready");
    setMode("haptic");
  };

  const openAiSupport = () => {
    resetAiSupport();
    setMode("ai");
  };

  const openHelpers = () => {
    setMode("helpers");
  };

  const openCrisisSupport = () => {
    setMode("crisis");
  };

  const openExerciseLibrary = () => {
    router.push("/SupportOverview");
  };

  const openReflection = () => {
    router.push("/reflectiondialog");
  };

  const submitAiInput = () => {
    const value = aiInput.trim();

    if (!value) {
      return;
    }

    setSubmittedText(value);
    setAiInput("");
    setAiStep("firstOptions");
  };

  const selectFirstAnswer = (
    answer: string
  ) => {
    setFirstAnswer(answer);
    setAiStep("secondOptions");
  };

  const selectSecondAnswer = (
    answer: string
  ) => {
    setSecondAnswer(answer);
    setAiStep("finished");
  };

  const playVibrationSequence =
    async () => {
      if (hapticState === "playing") {
        return;
      }

      const sequenceId =
        sequenceIdRef.current + 1;

      sequenceIdRef.current =
        sequenceId;

      setHapticState("playing");

      await wait(800);

      if (
        sequenceId !==
        sequenceIdRef.current
      ) {
        return;
      }

      const startedAt = Date.now();

      let previousDuration = 0;
      let consecutiveLongVibrations = 0;

      while (
        Date.now() - startedAt <
        EXERCISE_DURATION
      ) {
        if (
          sequenceId !==
          sequenceIdRef.current
        ) {
          return;
        }

        let vibrationDuration =
          randomBetween(
            MIN_VIBRATION_DURATION,
            MAX_VIBRATION_DURATION
          );

        const isLongVibration =
          vibrationDuration >= 650;

        if (isLongVibration) {
          consecutiveLongVibrations += 1;
        } else {
          consecutiveLongVibrations = 0;
        }

        if (
          consecutiveLongVibrations >= 2
        ) {
          vibrationDuration =
            randomBetween(150, 500);

          consecutiveLongVibrations = 0;
        }

        if (
          previousDuration > 0 &&
          Math.abs(
            vibrationDuration -
              previousDuration
          ) < 80
        ) {
          vibrationDuration =
            randomBetween(
              MIN_VIBRATION_DURATION,
              MAX_VIBRATION_DURATION
            );
        }

        previousDuration =
          vibrationDuration;

        const elapsed =
          Date.now() - startedAt;

        const remaining =
          EXERCISE_DURATION -
          elapsed;

        if (remaining <= 0) {
          break;
        }

        const actualDuration =
          Math.min(
            vibrationDuration,
            remaining
          );

        await Haptics.vibrate({
          duration: actualDuration,
        });

        if (
          sequenceId !==
          sequenceIdRef.current
        ) {
          return;
        }

        const elapsedAfterVibration =
          Date.now() - startedAt;

        const remainingAfterVibration =
          EXERCISE_DURATION -
          elapsedAfterVibration;

        if (
          remainingAfterVibration <= 0
        ) {
          break;
        }

        const pauseDuration =
          Math.min(
            randomBetween(
              MIN_PAUSE_DURATION,
              MAX_PAUSE_DURATION
            ),
            remainingAfterVibration
          );

        await wait(pauseDuration);
      }

      if (
        sequenceId !==
        sequenceIdRef.current
      ) {
        return;
      }

      setHapticState("finished");
    };

  const renderInternalBackButton = (
    onClick: () => void
  ) => (
    <button
      type="button"
      className="quick-help__internal-back"
      onClick={onClick}
    >
      <IonIcon icon={arrowBackOutline} />
      Zurück
    </button>
  );

  const renderAiMessage = (
    text: string
  ) => (
    <div className="quick-help__chat-row quick-help__chat-row--assistant">
      <div className="quick-help__chat-avatar">
        <IonIcon icon={sparklesOutline} />
      </div>

      <div className="quick-help__chat-bubble quick-help__chat-bubble--assistant">
        {text}
      </div>
    </div>
  );

  const renderUserMessage = (
    text: string
  ) => (
    <div className="quick-help__chat-row quick-help__chat-row--user">
      <div className="quick-help__chat-bubble quick-help__chat-bubble--user">
        {text}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="quick-help__overview">
      <section className="quick-help__overview-intro">
        <h1>
          Was brauchst du gerade?
        </h1>

        <p>
          Wähle, was dir im Moment
          helfen könnte.
        </p>
      </section>

      <section className="quick-help__main-actions">
        <button
          type="button"
          className="quick-help__main-action quick-help__main-action--anchor"
          onClick={openHapticExercise}
        >
          <div className="quick-help__main-action-icon">
            <IonIcon
              icon={handLeftOutline}
            />
          </div>

          <div className="quick-help__main-action-content">
            <strong>
              Kurz ankommen
            </strong>

            <span>
              Vibrationen bewusst
              wahrnehmen
            </span>
          </div>

          <IonIcon
            className="quick-help__main-action-arrow"
            icon={chevronForwardOutline}
          />
        </button>

        <button
          type="button"
          className="quick-help__main-action"
          onClick={openAiSupport}
        >
          <div className="quick-help__main-action-icon">
            <IonIcon
              icon={sparklesOutline}
            />
          </div>

          <div className="quick-help__main-action-content">
            <strong>
              Kurz begleitet werden
            </strong>

            <span>
              Kurze Unterstützung
              für den Moment
            </span>
          </div>

          <IonIcon
            className="quick-help__main-action-arrow"
            icon={chevronForwardOutline}
          />
        </button>

        <button
          type="button"
          className="quick-help__main-action"
          onClick={openHelpers}
        >
          <div className="quick-help__main-action-icon">
            <IonIcon
              icon={heartOutline}
            />
          </div>

          <div className="quick-help__main-action-content">
            <strong>
              Meine Helfer
            </strong>

            <span>
              Menschen und Übungen,
              die dir helfen können
            </span>
          </div>

          <IonIcon
            className="quick-help__main-action-arrow"
            icon={chevronForwardOutline}
          />
        </button>
      </section>

      <section className="quick-help__crisis-entry">
        <div className="quick-help__crisis-entry-heading">
          <IonIcon
            icon={shieldCheckmarkOutline}
          />

          <span>
            Wenn du akut Hilfe brauchst
          </span>
        </div>

        <button
          type="button"
          className="quick-help__crisis-button"
          onClick={openCrisisSupport}
        >
          <span>
            Krisen- und Notfallhilfe
          </span>

          <IonIcon
            icon={chevronForwardOutline}
          />
        </button>
      </section>
    </div>
  );

  const renderHelpers = () => (
    <div className="quick-help__helpers">
      {renderInternalBackButton(
        returnToOverview
      )}

      <section className="quick-help__helpers-intro">
        <h1>
          Meine Helfer
        </h1>

        <p>
          Menschen und Übungen, die dir
          gerade helfen können.
        </p>
      </section>

      <section className="quick-help__helper-section">
        <h2>
          Jemanden erreichen
        </h2>

        <div className="quick-help__contacts">
          <button
            type="button"
            className="quick-help__contact"
          >
            <div className="quick-help__contact-avatar">
              M
            </div>

            <div className="quick-help__contact-content">
              <strong>
                Max
              </strong>

              <span>
                Vertrauensperson
              </span>
            </div>

            <div className="quick-help__contact-call">
              <IonIcon
                icon={callOutline}
              />
            </div>
          </button>

          <button
            type="button"
            className="quick-help__contact"
          >
            <div className="quick-help__contact-avatar">
              S
            </div>

            <div className="quick-help__contact-content">
              <strong>
                Sarah
              </strong>

              <span>
                Freundin
              </span>
            </div>

            <div className="quick-help__contact-call">
              <IonIcon
                icon={callOutline}
              />
            </div>
          </button>
        </div>
      </section>

      <section className="quick-help__helper-section">
        <div className="quick-help__helper-section-heading">
          <h2>
            Meine Übungen
          </h2>

          <button
            type="button"
            className="quick-help__all-exercises"
            onClick={
              openExerciseLibrary
            }
          >
            Alle Übungen

            <IonIcon
              icon={
                chevronForwardOutline
              }
            />
          </button>
        </div>

        <div className="quick-help__helper-exercises">
          <button
            type="button"
            className="quick-help__helper-exercise"
            onClick={
              openExerciseLibrary
            }
          >
            <div className="quick-help__helper-exercise-icon">
              🌬️
            </div>

            <div className="quick-help__helper-exercise-content">
              <strong>
                4–6-Atmung
              </strong>

              <span>
                Ruhig 4 Sekunden ein-
                und 6 Sekunden
                ausatmen.
              </span>

              <small>
                3 Min.
              </small>
            </div>

            <span className="quick-help__helper-exercise-action">
              Start
            </span>
          </button>

          <button
            type="button"
            className="quick-help__helper-exercise"
            onClick={
              openExerciseLibrary
            }
          >
            <div className="quick-help__helper-exercise-icon">
              ✋
            </div>

            <div className="quick-help__helper-exercise-content">
              <strong>
                5-4-3-2-1-Übung
              </strong>

              <span>
                Die Aufmerksamkeit auf
                deine Sinne richten.
              </span>

              <small>
                5 Min.
              </small>
            </div>

            <span className="quick-help__helper-exercise-action">
              Start
            </span>
          </button>

          <button
            type="button"
            className="quick-help__helper-exercise"
            onClick={
              openExerciseLibrary
            }
          >
            <div className="quick-help__helper-exercise-icon">
              🧘
            </div>

            <div className="quick-help__helper-exercise-content">
              <strong>
                Kurzer Body Scan
              </strong>

              <span>
                Körperempfindungen
                bewusst wahrnehmen.
              </span>

              <small>
                5 Min.
              </small>
            </div>

            <span className="quick-help__helper-exercise-action">
              Start
            </span>
          </button>
        </div>
      </section>
    </div>
  );

  const renderHapticExercise = () => (
    <>
      {renderInternalBackButton(
        returnToOverview
      )}

      {hapticState === "ready" && (
        <section className="quick-help__center-area">
          <div className="quick-help__preparation">
            <div className="quick-help__preparation-icon">
              <IonIcon
                icon={handLeftOutline}
              />
            </div>

            <h2>
              Lege dein Smartphone
              auf deine Handfläche.
            </h2>

            <p>
              Lass es dort ruhig
              liegen. Wenn es sich
              angenehm anfühlt, kannst
              du die Augen schließen.
            </p>

            <button
              type="button"
              className="quick-help__primary-button"
              onClick={
                playVibrationSequence
              }
            >
              <IonIcon
                icon={pulseOutline}
              />

              Übung starten
            </button>
          </div>
        </section>
      )}

      {hapticState === "playing" && (
        <>
          <section className="quick-help__center-area">
            <div className="quick-help__pulse">
              <div className="quick-help__pulse-ring quick-help__pulse-ring--outer" />

              <div className="quick-help__pulse-ring quick-help__pulse-ring--middle" />

              <div className="quick-help__pulse-center">
                <IonIcon
                  icon={pulseOutline}
                />
              </div>
            </div>

            <p className="quick-help__playing-text">
              Spüren. Wahrnehmen.
              Atmen.
            </p>
          </section>

          <button
            type="button"
            className="quick-help__stop-button"
            onClick={
              resetHapticExercise
            }
          >
            Übung beenden
          </button>
        </>
      )}

      {hapticState === "finished" && (
        <section className="quick-help__center-area">
          <div className="quick-help__finished">
            <div className="quick-help__finished-icon">
              <IonIcon
                icon={
                  checkmarkOutline
                }
              />
            </div>

            <h2>
              Du bist fertig.
            </h2>

            <p>
              Richte deine
              Aufmerksamkeit wieder
              auf deine Umgebung,
              wenn du soweit bist.
            </p>

            <button
              type="button"
              className="quick-help__primary-button"
              onClick={() => {
                setHapticState(
                  "ready"
                );

                window.setTimeout(
                  () => {
                    void playVibrationSequence();
                  },
                  100
                );
              }}
            >
              <IonIcon
                icon={
                  refreshOutline
                }
              />

              Nochmal
            </button>

            <button
              type="button"
              className="quick-help__text-button"
              onClick={
                returnToOverview
              }
            >
              Zurück zur Soforthilfe
            </button>
          </div>
        </section>
      )}
    </>
  );

  const renderAiSupport = () => (
    <div className="quick-help__ai-view">
      {renderInternalBackButton(
        returnToOverview
      )}

      <section className="quick-help__ai-header">
        <span>
          Kurz begleitet werden
        </span>

        <h1>
          Was ist los?
        </h1>
      </section>

      <section className="quick-help__chat">
        {aiStep === "input" && (
          <div className="quick-help__ai-input-stage">
            <p>
              Schreib kurz auf, was
              gerade passiert ist oder
              dich beschäftigt.
            </p>

            <div className="quick-help__ai-input">
              <textarea
                value={aiInput}
                onChange={(event) =>
                  setAiInput(
                    event.target.value
                  )
                }
                placeholder="Was ist gerade passiert?"
                rows={5}
              />

              <button
                type="button"
                aria-label="Nachricht senden"
                disabled={
                  !aiInput.trim()
                }
                onClick={
                  submitAiInput
                }
              >
                <IonIcon
                  icon={sendOutline}
                />
              </button>
            </div>
          </div>
        )}

        {aiStep !== "input" && (
          <>
            {renderUserMessage(
              submittedText
            )}

            {renderAiMessage(
              "Was davon beschäftigt dich gerade am meisten?"
            )}

            {aiStep ===
              "firstOptions" && (
              <div className="quick-help__chat-options">
                {FIRST_AI_OPTIONS.map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        selectFirstAnswer(
                          option
                        )
                      }
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}

        {(aiStep ===
          "secondOptions" ||
          aiStep === "finished") && (
          <>
            {renderUserMessage(
              firstAnswer
            )}

            {renderAiMessage(
              "Was geht dir dabei gerade am ehesten durch den Kopf?"
            )}

            {aiStep ===
              "secondOptions" && (
              <div className="quick-help__chat-options">
                {SECOND_AI_OPTIONS.map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        selectSecondAnswer(
                          option
                        )
                      }
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}

        {aiStep === "finished" && (
          <>
            {renderUserMessage(
              secondAnswer
            )}

            {renderAiMessage(
              "Okay. Wir müssen das gerade nicht weiter auflösen. Was würde dir jetzt helfen?"
            )}

            <div className="quick-help__ai-final-actions">
              <button
                type="button"
                className="quick-help__ai-final-action quick-help__ai-final-action--reflection"
                onClick={
                  openReflection
                }
              >
                <div>
                  <strong>
                    Reflexion starten
                  </strong>

                  <span>
                    Den Gedanken in Ruhe
                    weiter betrachten
                  </span>
                </div>

                <IonIcon
                  icon={
                    chevronForwardOutline
                  }
                />
              </button>

              <button
                type="button"
                className="quick-help__ai-final-action quick-help__ai-final-action--exercise"
                onClick={
                  openExerciseLibrary
                }
              >
                <div>
                  <strong>
                    Eine Übung auswählen
                  </strong>

                  <span>
                    Etwas tun, das dir
                    gerade helfen kann
                  </span>
                </div>

                <IonIcon
                  icon={
                    chevronForwardOutline
                  }
                />
              </button>

              <button
                type="button"
                className="quick-help__ai-finish-button"
                onClick={
                  returnToOverview
                }
              >
                Für jetzt beenden
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );

  const renderCrisisSupport = () => (
    <>
      {renderInternalBackButton(
        returnToOverview
      )}

      <section className="quick-help__subview-intro">
        <span className="quick-help__eyebrow quick-help__eyebrow--crisis">
          Krise &amp; Notfall
        </span>

        <h1>
          Direkte Hilfe
        </h1>

        <p>
          Hier findest du Möglichkeiten,
          unmittelbar Kontakt zu
          professioneller Hilfe
          aufzunehmen.
        </p>
      </section>

      <section className="quick-help__crisis">
        <div className="quick-help__emergency">
          <div className="quick-help__emergency-heading">
            <strong>
              Akuter Notfall
            </strong>

            <span>
              Rettungsdienst und
              Feuerwehr
            </span>
          </div>

          <a
            href="tel:112"
            className="quick-help__emergency-call"
          >
            <IonIcon
              icon={callOutline}
            />

            112 anrufen
          </a>
        </div>

        <div className="quick-help__crisis-card">
          <div className="quick-help__crisis-card-content">
            <strong>
              TelefonSeelsorge
            </strong>

            <span>
              Kostenlos und rund um die
              Uhr erreichbar
            </span>
          </div>

          <a
            href="tel:116123"
            className="quick-help__crisis-call"
          >
            <IonIcon
              icon={callOutline}
            />

            116 123
          </a>
        </div>
      </section>
    </>
  );

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Soforthilfe"
          showBackButton
        />
      </IonHeader>

      <IonContent className="quick-help">
        <main className="quick-help__content">
          {mode === "overview" &&
            renderOverview()}

          {mode === "haptic" &&
            renderHapticExercise()}

          {mode === "ai" &&
            renderAiSupport()}

          {mode === "helpers" &&
            renderHelpers()}

          {mode === "crisis" &&
            renderCrisisSupport()}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default QuickHelpView;