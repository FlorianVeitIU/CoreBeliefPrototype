import {
  useState,
} from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  bookmarkOutline,
  checkmarkOutline,
  leafOutline,
  sparklesOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./ReflectionSummary.css";


type InsightType =
  | "insight"
  | "belief"
  | "perspective";


const DEMO_SUMMARY =
  "Hier wird in zukunft eine Zusammenfassung stehen.";


const DEMO_INSIGHT =
  "Kritik an meiner Arbeit ist nicht automatisch Kritik an mir.";


const DEMO_TAGS =
  "Kritik, Selbstwert";


const getTypeLabel = (
  type: InsightType
) => {
  switch (type) {
    case "belief":
      return "Glaubenssatz";

    case "perspective":
      return "Neue Perspektive";

    default:
      return "Erkenntnis";
  }
};


const getTypeDescription = (
  type: InsightType
) => {
  switch (type) {
    case "belief":
      return "Ein Gedanke oder eine Überzeugung, die dich häufiger begleitet.";

    case "perspective":
      return "Eine neue Sichtweise, die du für dich festhalten möchtest.";

    default:
      return "Etwas, das dir über dich oder eine Situation bewusst geworden ist.";
  }
};


const getTypeIcon = (
  type: InsightType
) => {
  switch (type) {
    case "belief":
      return bookmarkOutline;

    case "perspective":
      return leafOutline;

    default:
      return sparklesOutline;
  }
};


const ReflectionSummary = () => {
  const router = useIonRouter();

  const [insightType, setInsightType] =
    useState<InsightType>("insight");

  const [insightText, setInsightText] =
    useState(DEMO_INSIGHT);

  const [tags, setTags] =
    useState(DEMO_TAGS);

  const [isSaving, setIsSaving] =
    useState(false);


  const saveInsight = async () => {
    const trimmedText =
      insightText.trim();

    if (
      !trimmedText ||
      isSaving
    ) {
      return;
    }

    setIsSaving(true);

    try {
      const parsedTags =
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

      const insight = {
        type: insightType,
        text: trimmedText,
        tags: parsedTags,
      };

      console.log(
        "Erkenntnis speichern:",
        insight
      );

      router.push(
        "/InsightOverview",
        "root"
      );
    }
    finally {
      setIsSaving(false);
    }
  };


  const finishWithoutInsight = () => {
    router.push(
      "/home",
      "root"
    );
  };


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Reflexion abschließen"
          showBackButton
          showSettingsButton={false}
        />
      </IonHeader>

      <IonContent className="reflection-summary">
        <main className="reflection-summary__container">

          <section className="reflection-summary__summary-section">

            <div className="reflection-summary__section-header">
              <h1>
                Zusammenfassung
              </h1>

              <p>
                Das hat sich in deiner
                Reflexion gezeigt:
              </p>
            </div>

            <p className="reflection-summary__summary-text">
              {DEMO_SUMMARY}
            </p>

          </section>


          <div className="reflection-summary__divider" />


          <section className="reflection-summary__insight-section">

            <div className="reflection-summary__section-header">
              <h2>
                Was möchtest du festhalten?
              </h2>

              <p>
                Wir haben aus deiner Reflexion
                einen Vorschlag vorbereitet.
                Du kannst ihn vor dem Speichern
                anpassen.
              </p>
            </div>


            <div className="reflection-summary__types">

              {(
                [
                  "insight",
                  "belief",
                  "perspective",
                ] as InsightType[]
              ).map((type) => {
                const selected =
                  insightType === type;

                return (
                  <button
                    key={type}
                    type="button"
                    className={
                      selected
                        ? "reflection-summary__type reflection-summary__type--active"
                        : "reflection-summary__type"
                    }
                    onClick={() =>
                      setInsightType(type)
                    }
                  >

                    <div className="reflection-summary__type-icon">
                      <IonIcon
                        icon={
                          getTypeIcon(type)
                        }
                      />
                    </div>

                    <div className="reflection-summary__type-content">

                      <span className="reflection-summary__type-title">
                        {getTypeLabel(type)}
                      </span>

                      <span className="reflection-summary__type-description">
                        {getTypeDescription(type)}
                      </span>

                    </div>

                    <div className="reflection-summary__type-check">
                      {selected && (
                        <IonIcon
                          icon={
                            checkmarkOutline
                          }
                        />
                      )}
                    </div>

                  </button>
                );
              })}

            </div>


            <div className="reflection-summary__form">

              <label className="reflection-summary__field">

                <span className="reflection-summary__label">
                  Inhalt
                </span>

                <textarea
                  value={insightText}
                  rows={4}
                  placeholder="Was ist dir aufgefallen?"
                  onChange={(event) =>
                    setInsightText(
                      event.target.value
                    )
                  }
                />

                <span className="reflection-summary__ai-hint">
                  <IonIcon
                    icon={sparklesOutline}
                  />

                  Von der KI vorgeschlagen ·
                  bearbeitbar
                </span>

              </label>


              <label className="reflection-summary__field">

                <span className="reflection-summary__field-heading">

                  <span className="reflection-summary__label">
                    Schlagwörter
                  </span>

                  <span className="reflection-summary__optional">
                    Optional
                  </span>

                </span>

                <input
                  type="text"
                  value={tags}
                  placeholder="z. B. Kritik, Selbstwert"
                  onChange={(event) =>
                    setTags(
                      event.target.value
                    )
                  }
                />

                <span className="reflection-summary__hint">
                  Mehrere Schlagwörter mit
                  Komma trennen.
                </span>

              </label>

            </div>

          </section>


          <div className="reflection-summary__actions">

            <button
              type="button"
              className="reflection-summary__save"
              disabled={
                !insightText.trim() ||
                isSaving
              }
              onClick={() =>
                void saveInsight()
              }
            >
              {isSaving
                ? "Wird gespeichert ..."
                : "Erkenntnis speichern"}
            </button>


            <button
              type="button"
              className="reflection-summary__skip"
              disabled={isSaving}
              onClick={
                finishWithoutInsight
              }
            >
              Reflexion ohne Erkenntnis
              beenden
            </button>

          </div>

        </main>
      </IonContent>
    </IonPage>
  );
};


export default ReflectionSummary;