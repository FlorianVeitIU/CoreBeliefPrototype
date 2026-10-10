import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  chevronForwardOutline,
  checkmarkOutline,
  sparklesOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import joyImage from "../../images/otter/otter_laugh.png";
import calmImage from "../../images/otter/otter_chill.png";
import sadnessImage from "../../images/otter/otter_cry.png";
import worryImage from "../../images/otter/otter_sus.png";
import tensionImage from "../../images/otter/otter_schock.png";
import angryImage from "../../images/otter/otter_angry.png";

import "./EmotionCheckIn.css";


type EmotionId =
  | "joy"
  | "calm"
  | "sadness"
  | "worry"
  | "tension"
  | "anger";


type Emotion = {
  id: EmotionId;
  image: string;
  label: string;
};


const emotions: Emotion[] = [
  {
    id: "joy",
    image: joyImage,
    label: "Freude",
  },
  {
    id: "calm",
    image: calmImage,
    label: "Ruhe",
  },
  {
    id: "sadness",
    image: sadnessImage,
    label: "Traurigkeit",
  },
  {
    id: "worry",
    image: worryImage,
    label: "Besorgt",
  },
  {
    id: "tension",
    image: tensionImage,
    label: "Anspannung",
  },
  {
    id: "anger",
    image: angryImage,
    label: "Wütend",
  },
];


const EmotionCheckIn = () => {
  const router = useIonRouter();

  const [selectedEmotions, setSelectedEmotions] =
    useState<EmotionId[]>([]);

  const [showResult, setShowResult] =
    useState(false);

  const [capturedAt, setCapturedAt] =
    useState<Date | null>(null);


  const toggleEmotion = (
    emotionId: EmotionId
  ) => {
    setSelectedEmotions((current) => {
      if (current.includes(emotionId)) {
        return current.filter(
          (id) => id !== emotionId
        );
      }

      return [
        ...current,
        emotionId,
      ];
    });
  };


  const handleContinue = () => {
    if (selectedEmotions.length === 0) {
      return;
    }

    setCapturedAt(new Date());
    setShowResult(true);
  };


  const handleReflection = () => {
    router.push("/reflectiondialog");
  };


  const handleFinish = () => {
    router.goBack();
  };


  const handleBackToSelection = () => {
    setShowResult(false);
  };


  const selectedEmotionData =
    emotions.filter((emotion) =>
      selectedEmotions.includes(emotion.id)
    );


  const capturedTime =
    capturedAt?.toLocaleTimeString(
      "de-DE",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );


  return (
    <IonPage>

      <IonHeader>
        <TopNavigation
          title="Emotionen"
          showBackButton
          showSettingsButton={false}
        />
      </IonHeader>


      <IonContent
        className="emotion-check-in"
        scrollY={false}
      >

        <div className="emotion-check-in__container">

          {!showResult ? (

            <main className="emotion-check-in__content">

              <div className="emotion-check-in__intro">

                <span className="emotion-check-in__eyebrow">
                  Momentaufnahme
                </span>

                <h1 className="emotion-check-in__title">
                  Wie fühlst du dich gerade?
                </h1>

                <p className="emotion-check-in__subtitle">
                  Wähle alles aus, was gerade zu dir passt.
                </p>

              </div>


              <section
                className="emotion-check-in__emotions"
                aria-label="Emotionen auswählen"
              >

                {emotions.map((emotion) => {
                  const isSelected =
                    selectedEmotions.includes(
                      emotion.id
                    );

                  return (
                    <button
                      key={emotion.id}
                      type="button"
                      className={
                        `emotion-check-in__emotion ${
                          isSelected
                            ? "emotion-check-in__emotion--selected"
                            : ""
                        }`
                      }
                      aria-pressed={isSelected}
                      onClick={() =>
                        toggleEmotion(emotion.id)
                      }
                    >

                      <div className="emotion-check-in__image-wrapper">

                        <img
                          src={emotion.image}
                          alt=""
                          className="emotion-check-in__emotion-image"
                          aria-hidden="true"
                        />

                      </div>

                      <span className="emotion-check-in__emotion-label">
                        {emotion.label}
                      </span>

                    </button>
                  );
                })}

              </section>


              <div className="emotion-check-in__footer">

                <div className="emotion-check-in__selection">

                  {selectedEmotions.length === 0 ? (
                    <span>
                      Noch nichts ausgewählt
                    </span>
                  ) : (
                    <span>
                      {selectedEmotions.length === 1
                        ? "1 Emotion ausgewählt"
                        : `${selectedEmotions.length} Emotionen ausgewählt`}
                    </span>
                  )}

                </div>


                <button
                  type="button"
                  className="emotion-check-in__continue"
                  disabled={selectedEmotions.length === 0}
                  onClick={handleContinue}
                >
                  <span>
                    Weiter
                  </span>

                  <IonIcon
                    icon={chevronForwardOutline}
                  />
                </button>

              </div>

            </main>

          ) : (

            <main className="emotion-check-in__result">

              <div className="emotion-check-in__result-overview">

                <div className="emotion-check-in__intro">

                  <span className="emotion-check-in__eyebrow">
                    Deine Momentaufnahme
                  </span>

                  <h1 className="emotion-check-in__title">
                   Danke, dass du dir einen Moment genommen hast.
                  </h1>

                  <p className="emotion-check-in__subtitle">
                    {capturedTime
                      ? `Erfasst um ${capturedTime} Uhr`
                      : "Gerade erfasst"}
                  </p>

                </div>


                <div className="emotion-check-in__selected-emotions">

                  {selectedEmotionData.map((emotion) => (
                    <div
                      key={emotion.id}
                      className="emotion-check-in__selected-emotion"
                    >

                      <img
                        src={emotion.image}
                        alt=""
                        className="emotion-check-in__selected-image"
                        aria-hidden="true"
                      />

                      <span>
                        {emotion.label}
                      </span>

                    </div>
                  ))}

                </div>


                <button
                  type="button"
                  className="emotion-check-in__change"
                  onClick={handleBackToSelection}
                >
                  Auswahl ändern
                </button>

              </div>


              <div className="emotion-check-in__result-footer">

                <div className="emotion-check-in__result-question">

                  <h2>
                    Was möchtest du jetzt tun?
                  </h2>

                  <p>
                    Du kannst dir das genauer ansehen oder es für jetzt dabei belassen.
                  </p>

                </div>


                <button
                  type="button"
                  className="emotion-check-in__result-action emotion-check-in__result-action--reflection"
                  onClick={handleReflection}
                >

                  <div className="emotion-check-in__result-action-icon">
                    <IonIcon icon={sparklesOutline} />
                  </div>

                  <div className="emotion-check-in__result-action-content">
                    <strong>
                      Reflexion starten
                    </strong>

                    <span>
                      Schau dir genauer an, was hinter deinen Gefühlen steckt.
                    </span>
                  </div>

                  <IonIcon
                    icon={chevronForwardOutline}
                    className="emotion-check-in__result-action-arrow"
                  />

                </button>


                <button
                  type="button"
                  className="emotion-check-in__result-action emotion-check-in__result-action--finish"
                  onClick={handleFinish}
                >

                  <div className="emotion-check-in__result-action-icon">
                    <IonIcon icon={checkmarkOutline} />
                  </div>

                  <div className="emotion-check-in__result-action-content">
                    <strong>
                      Für jetzt abschließen
                    </strong>

                    <span>
                      Die Momentaufnahme reicht dir für den Moment.
                    </span>
                  </div>

                </button>

              </div>

            </main>

          )}

        </div>

      </IonContent>

    </IonPage>
  );
};


export default EmotionCheckIn;