
import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  fitnessOutline,
  sparklesOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import otterImage from "../../images/otter/otter_chill.png";

import "./NeedCheckIn.css";

type Step =
  | "situation"
  | "difficulty"
  | "help"
  | "result";

type Choice = {
  id: string;
  label: string;
};

type Message = {
  id: string;
  text: string;
};

type Need = {
  title: string;
  description: string;
};

const situationChoices: Choice[] = [
  {
    id: "tension",
    label: "Ich bin innerlich unruhig oder angespannt.",
  },
  {
    id: "thoughts",
    label: "Meine Gedanken lassen mich nicht los.",
  },
  {
    id: "insecurity",
    label: "Ich fühle mich gerade unsicher.",
  },
  {
    id: "exhausted",
    label: "Ich bin emotional erschöpft.",
  },
];

const difficultyChoices: Choice[] = [
  {
    id: "worry",
    label: "Ich mache mir Sorgen, was passieren könnte.",
  },
  {
    id: "rumination",
    label: "Ich gehe eine Situation immer wieder im Kopf durch.",
  },
  {
    id: "self-doubt",
    label: "Ich zweifle gerade stark an mir selbst.",
  },
  {
    id: "unclear",
    label: "Ich kann gerade kaum einordnen, was in mir passiert.",
  },
];

const helpChoices: Choice[] = [
  {
    id: "safety",
    label: "Mich sicherer und stabiler zu fühlen.",
  },
  {
    id: "self-compassion",
    label: "Etwas freundlicher mit mir selbst umzugehen.",
  },
  {
    id: "clarity",
    label: "Meine Gedanken und Gefühle besser einordnen zu können.",
  },
  {
    id: "connection",
    label: "Mit dem, was gerade in mir passiert, nicht allein zu sein.",
  },
];

const getNeedFromHelp = (
  id: string | null
): Need => {
  switch (id) {
    case "safety":
      return {
        title: "Sicherheit",
        description:
          "Es könnte dir gerade helfen, wieder etwas mehr Stabilität und Sicherheit zu erleben.",
      };

    case "self-compassion":
      return {
        title: "Selbstmitgefühl",
        description:
          "Es könnte dir gerade helfen, dir selbst mit weniger Härte und mehr Verständnis zu begegnen.",
      };

    case "clarity":
      return {
        title: "Klarheit",
        description:
          "Es könnte dir gerade helfen, deine Gedanken und Gefühle besser einzuordnen.",
      };

    case "connection":
      return {
        title: "Verbundenheit",
        description:
          "Es könnte dir gerade helfen, mit dem, was dich beschäftigt, nicht allein zu bleiben.",
      };

    default:
      return {
        title: "Klarheit",
        description:
          "Es könnte dir gerade helfen, deine Gedanken und Gefühle besser einzuordnen.",
      };
  }
};

const NeedCheckIn = () => {
  const router = useIonRouter();

  const [step, setStep] =
    useState<Step>("situation");

  const [selectedHelp, setSelectedHelp] =
    useState<string | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const addUserMessage = (
    id: string,
    text: string
  ) => {
    setMessages((current) => [
      ...current,
      {
        id,
        text,
      },
    ]);
  };

  const handleSituation = (
    choice: Choice
  ) => {
    addUserMessage(
      `situation-${choice.id}`,
      choice.label
    );

    setStep("difficulty");
  };

  const handleDifficulty = (
    choice: Choice
  ) => {
    addUserMessage(
      `difficulty-${choice.id}`,
      choice.label
    );

    setStep("help");
  };

  const handleHelp = (
    choice: Choice
  ) => {
    setSelectedHelp(choice.id);

    addUserMessage(
      `help-${choice.id}`,
      choice.label
    );

    setStep("result");
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

  const need =
    getNeedFromHelp(selectedHelp);

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Bedürfnisse"
          showBackButton
        />
      </IonHeader>

      <IonContent
        className="need-check-in"
        scrollY={true}
      >
        <div className="need-check-in__container">
          <main className="need-check-in__conversation">
            <div className="need-check-in__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="need-check-in__message need-check-in__message--user"
                >
                  {message.text}
                </div>
              ))}

              {step === "situation" && (
                <section className="need-check-in__dialog-step">
                  <div className="need-check-in__choices">
                    {situationChoices.map(
                      (choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          className="need-check-in__choice"
                          onClick={() =>
                            handleSituation(choice)
                          }
                        >
                          {choice.label}
                        </button>
                      )
                    )}
                  </div>

                  <div className="need-check-in__companion">
                    <div className="need-check-in__otter">
                      <img
                        src={otterImage}
                        alt=""
                        className="need-check-in__otter-image"
                      />
                    </div>

                    <div className="need-check-in__bubble">
                      <span className="need-check-in__bubble-label">
                        Erst einmal wahrnehmen
                      </span>

                      <h2>
                        Was fühlt sich gerade am
                        ehesten schwierig an?
                      </h2>
                    </div>
                  </div>
                </section>
              )}

              {step === "difficulty" && (
                <section className="need-check-in__dialog-step">
                  <div className="need-check-in__choices">
                    {difficultyChoices.map(
                      (choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          className="need-check-in__choice"
                          onClick={() =>
                            handleDifficulty(choice)
                          }
                        >
                          {choice.label}
                        </button>
                      )
                    )}
                  </div>

                  <div className="need-check-in__companion">
                    <div className="need-check-in__otter">
                      <img
                        src={otterImage}
                        alt=""
                        className="need-check-in__otter-image"
                      />
                    </div>

                    <div className="need-check-in__bubble">
                      <span className="need-check-in__bubble-label">
                        Etwas genauer
                      </span>

                      <h2>
                        Was beschäftigt dich dabei
                        gerade am meisten?
                      </h2>

                      <p>
                        Es muss nicht genau passen.
                        Wähle das aus, was deinem
                        Erleben am nächsten kommt.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {step === "help" && (
                <section className="need-check-in__dialog-step">
                  <div className="need-check-in__choices">
                    {helpChoices.map(
                      (choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          className="need-check-in__choice"
                          onClick={() =>
                            handleHelp(choice)
                          }
                        >
                          {choice.label}
                        </button>
                      )
                    )}
                  </div>

                  <div className="need-check-in__companion">
                    <div className="need-check-in__otter">
                      <img
                        src={otterImage}
                        alt=""
                        className="need-check-in__otter-image"
                      />
                    </div>

                    <div className="need-check-in__bubble">
                      <span className="need-check-in__bubble-label">
                        Was könnte dir guttun?
                      </span>

                      <h2>
                        Was würde sich gerade am
                        ehesten hilfreich anfühlen?
                      </h2>

                      <p>
                        Denk noch nicht an eine
                        konkrete Lösung. Wähle
                        einfach aus, welche
                        Veränderung sich gerade
                        hilfreich anfühlen würde.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {step === "result" && (
                <section className="need-check-in__dialog-step need-check-in__dialog-step--result">
                  <div className="need-check-in__result-overview">
                    <div className="need-check-in__result-companion">
                      <div className="need-check-in__bubble need-check-in__bubble--result">
                        <span className="need-check-in__bubble-label">
                          Das könnte gerade wichtig sein
                        </span>
                        <h2 className="need-check-in__result-title">
                          {need.title}
                        </h2>
                        <p>
                          {need.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="need-check-in__result">
                    <div className="need-check-in__result-heading">
                      <span>
                        Mögliche nächste Schritte
                      </span>
                      <h3>
                        Was möchtest du jetzt tun?
                      </h3>
                    </div>
                    <div className="need-check-in__next-actions">
                      <button
                        type="button"
                        className="need-check-in__next-action need-check-in__next-action--exercise"
                        onClick={handleExercises}
                      >
                        <div className="need-check-in__next-action-icon">
                          <IonIcon
                            icon={fitnessOutline}
                          />
                        </div>
                        <div className="need-check-in__next-action-content">
                          <strong>
                            Übungen entdecken
                          </strong>
                          <span>
                            Finde eine Übung, die dich
                            im Moment unterstützen
                            kann.
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="need-check-in__next-action need-check-in__next-action--reflection"
                        onClick={handleReflection}
                      >
                        <div className="need-check-in__next-action-icon">
                          <IonIcon
                            icon={sparklesOutline}
                          />
                        </div>
                        <div className="need-check-in__next-action-content">
                          <strong>
                            Reflexion starten
                          </strong>
                          <span>
                            Schau genauer darauf, was
                            gerade in dir passiert
                            und was dahinterstecken
                            könnte.
                          </span>
                        </div>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="need-check-in__finish"
                      onClick={handleFinish}
                    >
                      Für jetzt abschließen
                    </button>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NeedCheckIn;
