import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import {
  checkmarkOutline,
  chevronBackOutline,
  chevronForwardOutline,
  fitnessOutline,
  sparklesOutline,
} from "ionicons/icons";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import "./BodyReactionCheckIn.css";

import brainImage from "../../images/body/brain.png";
import chestImage from "../../images/body/chest.png";
import stomachImage from "../../images/body/stomach.png";
import armsImage from "../../images/body/arms.png";
import legsImage from "../../images/body/legs.png";
import bodyImage from "../../images/body/body.png";
type BodyAreaId = "head" | "chest" | "stomach" | "arms" | "legs" | "whole-body";

type ReactionId =
  | "tension"
  | "pressure"
  | "restlessness"
  | "heaviness"
  | "tingling"
  | "warmth"
  | "cold"
  | "relaxed";

type BodyArea = {
  id: BodyAreaId;
  emoji: string;
  label: string;
};

type BodyReaction = {
  id: ReactionId;
  symbol: string;
  label: string;
};

type Step = "area" | "reaction" | "intensity" | "result";

const bodyAreas: BodyArea[] = [
  { id: "head", emoji: brainImage, label: "Kopf" },
  { id: "chest", emoji: chestImage, label: "Brust" },
  { id: "stomach", emoji: stomachImage, label: "Bauch" },
  { id: "arms", emoji: armsImage, label: "Arme" },
  { id: "legs", emoji: legsImage, label: "Beine" },
  { id: "whole-body", emoji: bodyImage, label: "Ganzer Körper" },
];

const bodyReactions: BodyReaction[] = [
  {
    id: "tension",
    symbol: "⚡",
    label: "Anspannung",
  },
  {
    id: "pressure",
    symbol: "↘",
    label: "Druck",
  },
  {
    id: "restlessness",
    symbol: "〰",
    label: "Unruhe",
  },
  {
    id: "heaviness",
    symbol: "●",
    label: "Schwere",
  },
  {
    id: "tingling",
    symbol: "✦",
    label: "Kribbeln",
  },
  {
    id: "warmth",
    symbol: "☀",
    label: "Wärme",
  },
  {
    id: "cold",
    symbol: "❄",
    label: "Kälte",
  },
  {
    id: "relaxed",
    symbol: "○",
    label: "Entspannt",
  },
];

const BodyReactionCheckIn = () => {
  const router = useIonRouter();

  const [step, setStep] = useState<Step>("area");

  const [selectedAreas, setSelectedAreas] = useState<BodyAreaId[]>([]);

  const [selectedReactions, setSelectedReactions] = useState<ReactionId[]>([]);

  const [intensity, setIntensity] = useState<number>(3);

  const toggleArea = (areaId: BodyAreaId) => {
    setSelectedAreas((current) => {
      if (current.includes(areaId)) {
        return current.filter((id) => id !== areaId);
      }

      return [...current, areaId];
    });
  };

  const toggleReaction = (reactionId: ReactionId) => {
    setSelectedReactions((current) => {
      if (current.includes(reactionId)) {
        return current.filter((id) => id !== reactionId);
      }

      return [...current, reactionId];
    });
  };

  const getAreaLabel = (id: BodyAreaId) => {
    return bodyAreas.find((area) => area.id === id)?.label ?? id;
  };

  const getReactionLabel = (id: ReactionId) => {
    return bodyReactions.find((reaction) => reaction.id === id)?.label ?? id;
  };

  const handleStepBack = () => {
    if (step === "reaction") {
      setStep("area");
      return;
    }

    if (step === "intensity") {
      setStep("reaction");
      return;
    }

    if (step === "result") {
      setStep("intensity");
    }
  };

  const handleExercises = () => {
    router.push("/SupportOverview");
  };

  const handleReflection = () => {
    router.push("/reflectiondialog");
  };

  const handleFinish = () => {
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation title="Körperreaktion" showBackButton />
      </IonHeader>
      <IonContent className="body-reaction-check-in" scrollY={false}>
        <div className="body-reaction-check-in__container">
          <main className="body-reaction-check-in__content">
            <div className="body-reaction-check-in__progress">
              <span
                className={`body-reaction-check-in__progress-item ${
                  step === "area"
                    ? "body-reaction-check-in__progress-item--active"
                    : ""
                }`}
              />
              <span
                className={`body-reaction-check-in__progress-item ${
                  step === "reaction"
                    ? "body-reaction-check-in__progress-item--active"
                    : ""
                }`}
              />
              <span
                className={`body-reaction-check-in__progress-item ${
                  step === "intensity"
                    ? "body-reaction-check-in__progress-item--active"
                    : ""
                }`}
              />        
              <span
                className={`body-reaction-check-in__progress-item ${
                  step === "result"
                    ? "body-reaction-check-in__progress-item--active"
                    : ""
                }`}
              />
            </div>
            {step !== "area" && (
              <button
                type="button"
                className="body-reaction-check-in__step-back"
                onClick={handleStepBack}
              >
                <IonIcon icon={chevronBackOutline} />
                <span>Zurück</span>
              </button>
            )}

            {step === "area" && (
              <section className="body-reaction-check-in__step">
                <div className="body-reaction-check-in__intro">
                  <span className="body-reaction-check-in__step-label">
                    Körper wahrnehmen
                  </span>

                  <h2>Wo spürst du gerade etwas?</h2>

                  <p>Wähle einen oder mehrere Bereiche.</p>
                </div>

                <div className="body-reaction-check-in__areas">
                  {bodyAreas.map((area) => {
                    const isSelected = selectedAreas.includes(area.id);
                    return (
                      <button
                        key={area.id}
                        type="button"
                        className={`body-reaction-check-in__area ${
                          isSelected
                            ? "body-reaction-check-in__area--selected"
                            : ""
                        }`}
                        aria-pressed={isSelected}
                        onClick={() => toggleArea(area.id)}
                      >
                        <span
                          className="body-reaction-check-in__area-emoji"
                          aria-hidden="true"
                        >
                          <img src={area.emoji} />
                        </span>

                        <span className="body-reaction-check-in__area-label">
                          {area.label}
                        </span>

                        {isSelected && (
                          <span className="body-reaction-check-in__selected">
                            <IonIcon icon={checkmarkOutline} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="body-reaction-check-in__footer">
                  <button
                    type="button"
                    className="body-reaction-check-in__continue"
                    disabled={selectedAreas.length === 0}
                    onClick={() => setStep("reaction")}
                  >
                    <span>Weiter</span>

                    <IonIcon icon={chevronForwardOutline} />
                  </button>
                </div>
              </section>
            )}

            {step === "reaction" && (
              <section className="body-reaction-check-in__step">
                <div className="body-reaction-check-in__intro">
                  <span className="body-reaction-check-in__step-label">
                    Körperreaktion
                  </span>

                  <h2>Was nimmst du dort wahr?</h2>

                  <div className="body-reaction-check-in__area-summary">
                    {selectedAreas.map((area) => (
                      <span key={area}>{getAreaLabel(area)}</span>
                    ))}
                  </div>
                </div>

                <div className="body-reaction-check-in__reactions">
                  {bodyReactions.map((reaction) => {
                    const isSelected = selectedReactions.includes(reaction.id);

                    return (
                      <button
                        key={reaction.id}
                        type="button"
                        className={`body-reaction-check-in__reaction ${
                          isSelected
                            ? "body-reaction-check-in__reaction--selected"
                            : ""
                        }`}
                        aria-pressed={isSelected}
                        onClick={() => toggleReaction(reaction.id)}
                      >
                        <span className="body-reaction-check-in__reaction-symbol">
                          {reaction.symbol}
                        </span>

                        <span className="body-reaction-check-in__reaction-label">
                          {reaction.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="body-reaction-check-in__footer">
                  <button
                    type="button"
                    className="body-reaction-check-in__continue"
                    disabled={selectedReactions.length === 0}
                    onClick={() => setStep("intensity")}
                  >
                    <span>Weiter</span>

                    <IonIcon icon={chevronForwardOutline} />
                  </button>
                </div>
              </section>
            )}

            {step === "intensity" && (
              <section className="body-reaction-check-in__step">
                <div className="body-reaction-check-in__intro">
                  <span className="body-reaction-check-in__step-label">
                    Intensität
                  </span>

                  <h2>Wie deutlich spürst du es?</h2>

                  <p>Entscheide spontan, ohne lange darüber nachzudenken.</p>
                </div>

                <div className="body-reaction-check-in__intensity">
                  <div className="body-reaction-check-in__intensity-value">
                    <strong>{intensity}</strong>

                    <span>von 5</span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={intensity}
                    aria-label="Intensität der Körperreaktion"
                    onChange={(event) =>
                      setIntensity(Number(event.target.value))
                    }
                  />

                  <div className="body-reaction-check-in__intensity-labels">
                    <span>Kaum spürbar</span>

                    <span>Sehr deutlich</span>
                  </div>
                </div>

                <div className="body-reaction-check-in__footer">
                  <button
                    type="button"
                    className="body-reaction-check-in__continue"
                    onClick={() => setStep("result")}
                  >
                    <span>Abschließen</span>

                    <IonIcon icon={chevronForwardOutline} />
                  </button>
                </div>
              </section>
            )}

            {step === "result" && (
              <section className="body-reaction-check-in__step">
                <div className="body-reaction-check-in__result">
                  <span className="body-reaction-check-in__step-label">    
                  </span>

                  <h2>Deine aktuelle Körperwahrnehmung</h2>
                  <div className="body-reaction-check-in__result-card">
                    <div className="body-reaction-check-in__result-row">
                      <span>Bereich</span>
                      <div>
                        {selectedAreas.map((area) => (
                          <strong key={area}>{getAreaLabel(area)}</strong>
                        ))}
                      </div>
                    </div>
                    <div className="body-reaction-check-in__result-row">
                      <span>Körperreaktion</span>
                      <div>
                        {selectedReactions.map((reaction) => (
                          <strong key={reaction}>
                            {getReactionLabel(reaction)}
                          </strong>
                        ))}
                      </div>
                    </div>
                    <div className="body-reaction-check-in__result-row">
                      <span>Intensität</span>
                      <div className="body-reaction-check-in__result-intensity">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            className={
                              value <= intensity
                                ? "body-reaction-check-in__result-intensity-dot body-reaction-check-in__result-intensity-dot--active"
                                : "body-reaction-check-in__result-intensity-dot"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="body-reaction-check-in__result-question">
                    <h3>Was möchtest du jetzt tun?</h3>
                    <p>
                      Du kannst etwas ausprobieren, genauer hinschauen oder es
                      für jetzt dabei belassen.
                    </p>
                  </div>
                </div>
                <div className="body-reaction-check-in__result-footer">
                  <button
                    type="button"
                    className="body-reaction-check-in__result-action body-reaction-check-in__result-action--exercise"
                    onClick={handleExercises}
                  >
                    <div className="body-reaction-check-in__result-action-icon">
                      <IonIcon icon={fitnessOutline} />
                    </div>
                    <div className="body-reaction-check-in__result-action-content">
                      <strong>Übungen entdecken</strong>
                      <span>
                        Probiere etwas aus, das dir gerade helfen kann.
                      </span>
                    </div>
                    <IonIcon
                      icon={chevronForwardOutline}
                      className="body-reaction-check-in__result-action-arrow"
                    />
                  </button>
                  <button
                    type="button"
                    className="body-reaction-check-in__result-action body-reaction-check-in__result-action--reflection"
                    onClick={handleReflection}
                  >
                    <div className="body-reaction-check-in__result-action-icon">
                      <IonIcon icon={sparklesOutline} />
                    </div>
                    <div className="body-reaction-check-in__result-action-content">
                      <strong>Reflexion starten</strong>
                      <span>
                        Schau dir genauer an, was hinter deiner Wahrnehmung
                        steckt.
                      </span>
                    </div>
                    <IonIcon
                      icon={chevronForwardOutline}
                      className="body-reaction-check-in__result-action-arrow"
                    />
                  </button>
                  <button
                    type="button"
                    className="body-reaction-check-in__finish"
                    onClick={handleFinish}
                  >
                    Für jetzt abschließen
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BodyReactionCheckIn;
