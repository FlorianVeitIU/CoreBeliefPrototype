import { useMemo, useRef, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  addOutline,
  chevronForwardOutline,
  closeOutline,
  micOutline,
  searchOutline,
  sparklesOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import "./ThoughtCheckIn.css";

type Step =
  | "overview"
  | "capture";


type Thought = {
  id: number;
  text: string;
  date: string;
};

const initialThoughts: Thought[] = [
  {
    id: 1,
    text: "Vielleicht muss ich auch einfach mal akzeptieren, dass nicht jeder mich mögen muss.",
    date: "Heute · 09:42",
  },
  {
    id: 2,
    text: "Warum fällt es mir so schwer, einfach zu sagen, dass mich etwas verletzt hat?",
    date: "Gestern · 18:17",
  },
  {
    id: 3,
    text: "Manchmal vermisse ich gar nicht die Person, sondern eher das Gefühl, das ich damals hatte.",
    date: "22. Sep. · 14:31",
  },
];

const ThoughtCheckIn = () => {
  const router = useIonRouter();

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const [step, setStep] =
    useState<Step>("overview");

  const [thoughts, setThoughts] =
    useState<Thought[]>(initialThoughts);

  const [thought, setThought] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);


  const filteredThoughts = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      return thoughts;
    }

    return thoughts.filter((item) =>
      item.text
        .toLowerCase()
        .includes(value)
    );
  }, [thoughts, search]);


  const handleOpenCapture = () => {
    setThought("");
    setIsRecording(false);
    setStep("capture");

    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };


  const handleCloseCapture = () => {
    setThought("");
    setIsRecording(false);
    setStep("overview");
  };


  const handleSave = () => {
    const value =
      thought.trim();

    if (!value) {
      return;
    }

    const newThought: Thought = {
      id: Date.now(),
      text: value,
      date: "Gerade eben",
    };

    setThoughts((current) => [
      newThought,
      ...current,
    ]);

    setThought("");
    setIsRecording(false);
    setStep("overview");
  };


  const handleRecording = () => {
    setIsRecording(
      (current) => !current
    );
  };


  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSave();
    }
  };


  const handleReflection = (
    selectedThought: Thought
  ) => {
    router.push("/reflectiondialog");
  };

  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Gedanken erfassen"
          showBackButton
        />
      </IonHeader>
      <IonContent className="thought-check-in">
        <div className="thought-check-in__container">
          {step === "overview" && (
            <main className="thought-check-in__overview">
              <section className="thought-check-in__overview-intro">
                <h2>
                  Deine Gedanken
                </h2>
                <p>
                  Halte Gedanken fest und
                  greife sie später wieder auf.
                </p>
              </section>
              <div className="thought-check-in__search">
                <IonIcon
                  icon={searchOutline}
                />
                <input
                  type="search"
                  value={search}
                  placeholder="Gedanken durchsuchen …"
                  aria-label="Gedanken durchsuchen"
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

                {search && (
                  <button
                    type="button"
                    className="thought-check-in__search-clear"
                    aria-label="Suche löschen"
                    onClick={() =>
                      setSearch("")
                    }
                  >
                    <IonIcon
                      icon={closeOutline}
                    />
                  </button>
                )}

              </div>

              <section className="thought-check-in__list">
                {filteredThoughts.map(
                  (item) => (
                    <article
                      key={item.id}
                      className="thought-check-in__thought-card"
                    >
                      <div className="thought-check-in__thought-card-main">
                        <div className="thought-check-in__thought-symbol">
                          💭
                        </div>
                        <div className="thought-check-in__thought-content">
                          <p>
                            {item.text}
                          </p>
                          <span>
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="thought-check-in__reflect"
                        onClick={() =>
                          handleReflection(item)
                        }
                      >
                        <IonIcon
                          icon={sparklesOutline}
                        />
                        <span>
                          Reflektieren
                        </span>
                        <IonIcon
                          icon={
                            chevronForwardOutline
                          }
                        />
                      </button>
                    </article>
                  )
                )}
                {filteredThoughts.length === 0 && (
                  <div className="thought-check-in__empty">
                    <div className="thought-check-in__empty-symbol">
                      💭
                    </div>
                    <strong>
                      Keine Gedanken gefunden
                    </strong>
                    <span>
                      Versuche einen anderen
                      Suchbegriff.
                    </span>
                  </div>
                )}
              </section>
              <button
                type="button"
                className="thought-check-in__add-fab"
                aria-label="Gedanke erfassen"
                onClick={
                  handleOpenCapture
                }
              >
                <IonIcon
                  icon={addOutline}
                />
              </button>
            </main>
          )}

          {step === "capture" && (
            <main className="thought-check-in__capture">
              <section className="thought-check-in__intro">
                <div className="thought-check-in__symbol">
                  💭
                </div>
                <h2>
                  Was geht dir gerade
                  durch den Kopf?
                </h2>
                <p>
                  Halte den Gedanken einfach
                  so fest, wie er gerade
                  auftaucht.
                </p>
              </section>
              <div className="thought-check-in__capture-area">
                <div className="thought-check-in__input-card">
                  <textarea
                    ref={textareaRef}
                    value={thought}
                    rows={7}
                    autoFocus
                    placeholder="Schreib deinen Gedanken hier auf …"
                    aria-label="Gedanken eingeben"
                    onChange={(event) =>
                      setThought(
                        event.target.value
                      )
                    }
                    onKeyDown={
                      handleKeyDown
                    }
                  />
                  <div className="thought-check-in__input-footer">
                    <button
                      type="button"
                      className={
                        `thought-check-in__audio ${
                          isRecording
                            ? "thought-check-in__audio--recording"
                            : ""
                        }`
                      }
                      aria-label={
                        isRecording
                          ? "Audioaufnahme beenden"
                          : "Gedanken per Audio erfassen"
                      }
                      onClick={
                        handleRecording
                      }
                    >
                      <IonIcon
                        icon={micOutline}
                      />
                      <span>
                        {isRecording
                          ? "Aufnahme läuft"
                          : "Audio"}
                      </span>

                      {isRecording && (
                        <span className="thought-check-in__recording-dot" />
                      )}
                    </button>
                  </div>
                </div>
                {isRecording && (
                  <div className="thought-check-in__recording-hint">
                    <div className="thought-check-in__recording-indicator">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div>
                      <strong>
                        Audioaufnahme
                      </strong>
                      <span>
                        Sprich deinen Gedanken
                        einfach aus. Die
                        Audiofunktion ist im
                        Prototyp nur dargestellt.
                      </span>
                    </div>
                  </div>
                )}
                <div className="thought-check-in__capture-actions">
                  <button
                    type="button"
                    className="thought-check-in__cancel"
                    onClick={
                      handleCloseCapture
                    }
                  >
                    Abbrechen
                  </button>
                  <button
                    type="button"
                    className="thought-check-in__save"
                    disabled={
                      !thought.trim()
                    }
                    onClick={
                      handleSave
                    }
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </main>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};


export default ThoughtCheckIn;