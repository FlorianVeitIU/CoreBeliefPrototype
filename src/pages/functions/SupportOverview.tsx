import { useMemo, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
} from "@ionic/react";

import {
  addOutline,
  arrowBackOutline,
  arrowForwardOutline,
  bookmarkOutline,
  checkmarkOutline,
  chevronDownOutline,
  searchOutline,
  timeOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import defaultImage from "../../images/default.png";

import "./SupportOverview.css";


type SupportTab =
  | "mine"
  | "discover";


type Concern =
  | "tension"
  | "thoughts"
  | "overload"
  | "self-criticism"
  | "uncertainty"
  | "conflict";


type SortOption =
  | "newest"
  | "alphabetical"
  | "duration";


type Exercise = {
  id: string;
  title: string;
  description: string;
  duration: string;
  concern: Concern;
  image?: string;
};


type OwnExercise = {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  image?: string;
};


const concerns: {
  id: Concern;
  label: string;
}[] = [
  {
    id: "tension",
    label: "Anspannung",
  },
  {
    id: "thoughts",
    label: "Kreisende Gedanken",
  },
  {
    id: "overload",
    label: "Überforderung",
  },
  {
    id: "self-criticism",
    label: "Selbstkritik",
  },
  {
    id: "uncertainty",
    label: "Unsicherheit",
  },
  {
    id: "conflict",
    label: "Konflikte",
  },
];


const exercises: Exercise[] = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    description:
      "Einatmen, halten, ausatmen und halten in einem gleichmäßigen Rhythmus.",
    duration: "3 Min.",
    concern: "tension",
  },
  {
    id: "extended-exhale",
    title: "Verlängertes Ausatmen",
    description:
      "Bewusst länger aus- als einatmen und die Aufmerksamkeit auf den Atem richten.",
    duration: "2 Min.",
    concern: "tension",
  },
  {
    id: "progressive-muscle-relaxation",
    title: "Progressive Muskelentspannung",
    description:
      "Muskelgruppen nacheinander bewusst anspannen und wieder lösen.",
    duration: "10 Min.",
    concern: "tension",
  },
  {
    id: "three-minute-breathing-space",
    title: "3-Minuten-Atempause",
    description:
      "Kurz innehalten und die Aufmerksamkeit auf den gegenwärtigen Moment und die Atmung richten.",
    duration: "3 Min.",
    concern: "overload",
  },
  {
    id: "sensory-focus",
    title: "Sinnesfokus",
    description:
      "Einen ausgewählten Sinn bewusst auf die unmittelbare Umgebung richten.",
    duration: "3 Min.",
    concern: "thoughts",
  },
  {
    id: "ground-contact",
    title: "Bodenkontakt wahrnehmen",
    description:
      "Aufmerksamkeit auf Füße, Sitzfläche und andere Kontaktpunkte mit dem Untergrund richten.",
    duration: "2 Min.",
    concern: "uncertainty",
  },
  {
    id: "orientation-exercise",
    title: "Orientierungsübung",
    description:
      "Die Umgebung bewusst betrachten und wahrnehmen, wo man sich gerade befindet.",
    duration: "2 Min.",
    concern: "uncertainty",
  },
  {
    id: "mindful-walking",
    title: "Achtsames Gehen",
    description:
      "Einige Minuten langsam gehen und Bewegung sowie Bodenkontakt bewusst wahrnehmen.",
    duration: "5 Min.",
    concern: "overload",
  },
  {
    id: "short-mindfulness",
    title: "Kurze Achtsamkeitsübung",
    description:
      "Gedanken, Gefühle und Wahrnehmungen für einige Minuten beobachten, ohne ihnen weiter zu folgen.",
    duration: "5 Min.",
    concern: "thoughts",
  },
  {
    id: "self-compassion-break",
    title: "Selbstmitgefühls-Pause",
    description:
      "Belastung kurz wahrnehmen und sich bewusst mit einer freundlicheren Haltung begegnen.",
    duration: "3–5 Min.",
    concern: "self-criticism",
  },
  {
    id: "name-the-thought",
    title: "Gedanken benennen",
    description:
      "Einen belastenden Gedanken kurz benennen und ihn als Gedanken statt als Tatsache betrachten.",
    duration: "3 Min.",
    concern: "thoughts",
  },
  {
    id: "smallest-step",
    title: "Kleinster nächster Schritt",
    description:
      "Eine überfordernde Situation auf einen kleinen und machbaren nächsten Schritt reduzieren.",
    duration: "2 Min.",
    concern: "overload",
  },
  {
    id: "kind-response",
    title: "Freundliche Antwort",
    description:
      "Auf einen selbstkritischen Gedanken so antworten, wie du einer nahestehenden Person antworten würdest.",
    duration: "5 Min.",
    concern: "self-criticism",
  },
  {
    id: "conflict-pause",
    title: "Konfliktpause",
    description:
      "Vor einer Reaktion kurz innehalten und wahrnehmen, was du gerade fühlst und brauchst.",
    duration: "3 Min.",
    concern: "conflict",
  },
  {
    id: "perspective-change",
    title: "Perspektivwechsel",
    description:
      "Die Situation kurz aus der Sicht der anderen Person betrachten, ohne die eigene Sicht abzuwerten.",
    duration: "5 Min.",
    concern: "conflict",
  },
];


const initialOwnExercises: OwnExercise[] = [
  {
    id: 1,
    title: "4–6-Atmung",
    description:
      "Ruhig 4 Sekunden ein- und 6 Sekunden ausatmen.",
    duration: "3 Min.",
  },
  {
    id: 2,
    title: "5-4-3-2-1-Übung",
    description:
      "Die Aufmerksamkeit nacheinander auf Dinge richten, die man sieht, fühlt, hört, riecht und schmeckt.",
    duration: "5 Min.",
  },
  {
    id: 3,
    title: "Kurzer Body Scan",
    description:
      "Die Aufmerksamkeit schrittweise durch den Körper führen und Empfindungen bewusst wahrnehmen.",
    duration: "5 Min.",
  },
];


const durationOptions = [
  "2 Min.",
  "5 Min.",
  "10 Min.",
  "15 Min.",
  "Offen",
];


const SupportOverview = () => {
  const [activeTab, setActiveTab] =
    useState<SupportTab>("mine");

  const [selectedConcern, setSelectedConcern] =
    useState<Concern | "all">("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [ownSearchTerm, setOwnSearchTerm] =
    useState("");

  const [ownSort, setOwnSort] =
    useState<SortOption>("newest");

  const [ownExercises, setOwnExercises] =
    useState<OwnExercise[]>(initialOwnExercises);

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [selectedExercise, setSelectedExercise] =
    useState<Exercise | null>(null);

  const [newTitle, setNewTitle] =
    useState("");

  const [newDescription, setNewDescription] =
    useState("");

  const [newDuration, setNewDuration] =
    useState("5 Min.");


  const getDurationValue = (
    duration: string
  ) => {
    const match =
      duration.match(/\d+/);

    if (!match) {
      return Number.MAX_SAFE_INTEGER;
    }

    return Number(
      match[0]
    );
  };


  const filteredOwnExercises =
    useMemo(() => {
      const normalizedSearch =
        ownSearchTerm
          .trim()
          .toLocaleLowerCase();

      const filtered =
        ownExercises.filter(
          (exercise) => {
            if (!normalizedSearch) {
              return true;
            }

            return (
              exercise.title
                .toLocaleLowerCase()
                .includes(normalizedSearch) ||
              exercise.description
                .toLocaleLowerCase()
                .includes(normalizedSearch)
            );
          }
        );

      return [...filtered].sort(
        (a, b) => {
          if (
            ownSort ===
            "alphabetical"
          ) {
            return a.title.localeCompare(
              b.title,
              "de"
            );
          }

          if (
            ownSort ===
            "duration"
          ) {
            return (
              getDurationValue(
                a.duration
              ) -
              getDurationValue(
                b.duration
              )
            );
          }

          return (
            ownExercises.indexOf(b) -
            ownExercises.indexOf(a)
          );
        }
      );
    }, [
      ownExercises,
      ownSearchTerm,
      ownSort,
    ]);


  const filteredExercises =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLocaleLowerCase();

      return exercises.filter(
        (exercise) => {
          const matchesConcern =
            selectedConcern === "all" ||
            exercise.concern ===
              selectedConcern;

          const matchesSearch =
            !normalizedSearch ||
            exercise.title
              .toLocaleLowerCase()
              .includes(
                normalizedSearch
              ) ||
            exercise.description
              .toLocaleLowerCase()
              .includes(
                normalizedSearch
              );

          return (
            matchesConcern &&
            matchesSearch
          );
        }
      );
    }, [
      searchTerm,
      selectedConcern,
    ]);


  const isSelectedExerciseSaved =
    selectedExercise
      ? ownExercises.some(
          (exercise) =>
            exercise.id ===
            selectedExercise.id
        )
      : false;


  const getConcernLabel = (
    concernId: Concern
  ) => {
    return concerns.find(
      (concern) =>
        concern.id === concernId
    )?.label;
  };


  const getExerciseImage = (
    image?: string
  ) => {
    return image || defaultImage;
  };


  const closeAddModal = () => {
    setIsAddOpen(false);
    setNewTitle("");
    setNewDescription("");
    setNewDuration("5 Min.");
  };


  const addOwnExercise = () => {
    if (!newTitle.trim()) {
      return;
    }

    const newExercise: OwnExercise = {
      id: Date.now(),
      title: newTitle.trim(),
      description:
        newDescription.trim() ||
        "Meine persönliche Übung.",
      duration: newDuration,
    };

    setOwnExercises(
      (current) => [
        ...current,
        newExercise,
      ]
    );

    closeAddModal();
  };


  const saveSelectedExercise = () => {
    if (
      !selectedExercise ||
      isSelectedExerciseSaved
    ) {
      return;
    }

    setOwnExercises(
      (current) => [
        ...current,
        {
          id: selectedExercise.id,
          title:
            selectedExercise.title,
          description:
            selectedExercise.description,
          duration:
            selectedExercise.duration,
          image:
            selectedExercise.image,
        },
      ]
    );
  };


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Unterstützungen"
          showBackButton
          showSettingsButton={false}
        />
      </IonHeader>

      <IonContent className="support-overview">
        <div className="support-overview__container">

          <nav className="support-overview__tabs">
            <button
              type="button"
              className={
                activeTab === "mine"
                  ? "support-overview__tab support-overview__tab--active"
                  : "support-overview__tab"
              }
              onClick={() =>
                setActiveTab("mine")
              }
            >
              Meine Übungen
            </button>

            <button
              type="button"
              className={
                activeTab === "discover"
                  ? "support-overview__tab support-overview__tab--active"
                  : "support-overview__tab"
              }
              onClick={() =>
                setActiveTab(
                  "discover"
                )
              }
            >
              Entdecken
            </button>
          </nav>


          {activeTab === "mine" && (
            <main className="support-overview__tab-content">
              <section className="support-overview__personal">

                <div className="support-overview__section-heading">
                  <div>
                    <h1>
                      Meine Übungen
                    </h1>

                    <p>
                      Schnell wiederfinden,
                      was dir hilft.
                    </p>
                  </div>

                  <span className="support-overview__count">
                    {ownExercises.length}
                  </span>
                </div>


                <div className="support-overview__search support-overview__own-search">
                  <IonIcon
                    icon={searchOutline}
                  />

                  <input
                    type="search"
                    value={
                      ownSearchTerm
                    }
                    placeholder="Meine Übungen durchsuchen ..."
                    onChange={(
                      event
                    ) =>
                      setOwnSearchTerm(
                        event.target
                          .value
                      )
                    }
                  />
                </div>


                <div className="support-overview__sort-row">
                  <span className="support-overview__sort-label">
                    Sortieren
                  </span>

                  <div className="support-overview__sort-select">
                    <select
                      value={ownSort}
                      onChange={(
                        event
                      ) =>
                        setOwnSort(
                          event.target
                            .value as SortOption
                        )
                      }
                    >
                      <option value="newest">
                        Zuletzt hinzugefügt
                      </option>

                      <option value="alphabetical">
                        Name A–Z
                      </option>

                      <option value="duration">
                        Dauer
                      </option>
                    </select>

                    <IonIcon
                      icon={
                        chevronDownOutline
                      }
                    />
                  </div>
                </div>


                {filteredOwnExercises.length >
                0 ? (
                  <div className="support-overview__own-grid">
                    {filteredOwnExercises.map(
                      (exercise) => (
                        <button
                          key={
                            exercise.id
                          }
                          type="button"
                          className="support-overview__own-card"
                        >
                          <div className="support-overview__own-card-top">

                            <div className="support-overview__own-image">
                              <img
                                src={getExerciseImage(
                                  exercise.image
                                )}
                                alt=""
                              />
                            </div>

                            <span className="support-overview__own-duration">
                              <IonIcon
                                icon={
                                  timeOutline
                                }
                              />

                              {
                                exercise.duration
                              }
                            </span>

                          </div>

                          <div className="support-overview__own-content">
                            <h2>
                              {
                                exercise.title
                              }
                            </h2>

                            <p>
                              {
                                exercise.description
                              }
                            </p>
                          </div>

                          <IonIcon
                            className="support-overview__own-arrow"
                            icon={
                              arrowForwardOutline
                            }
                          />
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="support-overview__empty">
                    Keine passende
                    Übung gefunden.
                  </div>
                )}

              </section>
            </main>
          )}


          {activeTab ===
            "discover" && (
            <main className="support-overview__discover">

              <header className="support-overview__discover-heading">
                <h1>
                  Entdecken
                </h1>

                <p>
                  Finde eine Übung,
                  die gerade zu dir
                  passt.
                </p>
              </header>


              <div className="support-overview__search">
                <IonIcon
                  icon={searchOutline}
                />

                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Übungen durchsuchen ..."
                  onChange={(
                    event
                  ) =>
                    setSearchTerm(
                      event.target
                        .value
                    )
                  }
                />
              </div>


              <div className="support-overview__filters">
                <button
                  type="button"
                  className={
                    selectedConcern ===
                    "all"
                      ? "support-overview__filter support-overview__filter--active"
                      : "support-overview__filter"
                  }
                  onClick={() =>
                    setSelectedConcern(
                      "all"
                    )
                  }
                >
                  Alle
                </button>

                {concerns.map(
                  (concern) => (
                    <button
                      key={
                        concern.id
                      }
                      type="button"
                      className={
                        selectedConcern ===
                        concern.id
                          ? "support-overview__filter support-overview__filter--active"
                          : "support-overview__filter"
                      }
                      onClick={() =>
                        setSelectedConcern(
                          concern.id
                        )
                      }
                    >
                      {
                        concern.label
                      }
                    </button>
                  )
                )}
              </div>


              <div className="support-overview__discover-grid">
                {filteredExercises.map(
                  (exercise) => (
                    <button
                      key={
                        exercise.id
                      }
                      type="button"
                      className="support-overview__discover-card"
                      onClick={() =>
                        setSelectedExercise(
                          exercise
                        )
                      }
                    >
                      <div className="support-overview__discover-visual">
                        <img
                          src={getExerciseImage(
                            exercise.image
                          )}
                          alt=""
                        />
                      </div>

                      <div className="support-overview__discover-card-content">

                        <span className="support-overview__discover-category">
                          {getConcernLabel(
                            exercise.concern
                          )}
                        </span>

                        <h2>
                          {
                            exercise.title
                          }
                        </h2>

                        <span className="support-overview__discover-duration">
                          <IonIcon
                            icon={
                              timeOutline
                            }
                          />

                          {
                            exercise.duration
                          }
                        </span>

                      </div>
                    </button>
                  )
                )}
              </div>


              {filteredExercises.length ===
                0 && (
                <div className="support-overview__empty">
                  Keine passende
                  Übung gefunden.
                </div>
              )}

            </main>
          )}

        </div>


        {activeTab === "mine" && (
          <button
            type="button"
            className="support-overview__fab"
            aria-label="Eigene Übung hinzufügen"
            onClick={() =>
              setIsAddOpen(true)
            }
          >
            <IonIcon
              icon={addOutline}
            />
          </button>
        )}


        <IonModal
          isOpen={isAddOpen}
          onDidDismiss={
            closeAddModal
          }
          className="support-add-modal"
        >
          <IonPage>
            <IonContent className="support-add">
              <div className="support-add__container">

                <div className="support-add__navigation">
                  <button
                    type="button"
                    className="support-add__back"
                    onClick={
                      closeAddModal
                    }
                  >
                    <IonIcon
                      icon={
                        arrowBackOutline
                      }
                    />

                    <span>
                      Zurück
                    </span>
                  </button>
                </div>


                <header className="support-add__hero">

                  <div className="support-add__hero-visual">
                    <div className="support-add__hero-glow" />

                    <img
                      src={defaultImage}
                      alt=""
                    />
                  </div>


                  <div className="support-add__hero-content">
                    <span className="support-add__eyebrow">
                      Eigene Übung
                    </span>

                    <h2>
                      Was hilft dir?
                    </h2>

                    <p>
                      Erstelle einen
                      persönlichen Helfer,
                      den du jederzeit
                      schnell wiederfinden
                      kannst.
                    </p>
                  </div>

                </header>


                <main className="support-add__form">

                  <label className="support-add__field">
                    <span className="support-add__label">
                      Name
                    </span>

                    <input
                      type="text"
                      value={newTitle}
                      placeholder="z. B. Kurz rausgehen"
                      onChange={(
                        event
                      ) =>
                        setNewTitle(
                          event.target
                            .value
                        )
                      }
                    />
                  </label>


                  <label className="support-add__field">
                    <span className="support-add__label">
                      Was hilft dir
                      dabei?
                    </span>

                    <textarea
                      value={
                        newDescription
                      }
                      placeholder="Beschreibe kurz, was du bei dieser Übung machst."
                      rows={4}
                      onChange={(
                        event
                      ) =>
                        setNewDescription(
                          event.target
                            .value
                        )
                      }
                    />
                  </label>


                  <section className="support-add__duration-section">
                    <span className="support-add__label">
                      Ungefähre Dauer
                    </span>

                    <div className="support-add__durations">
                      {durationOptions.map(
                        (
                          duration
                        ) => (
                          <button
                            key={
                              duration
                            }
                            type="button"
                            className={
                              newDuration ===
                              duration
                                ? "support-add__duration support-add__duration--active"
                                : "support-add__duration"
                            }
                            onClick={() =>
                              setNewDuration(
                                duration
                              )
                            }
                          >
                            {
                              duration
                            }
                          </button>
                        )
                      )}
                    </div>
                  </section>

                </main>


                <section className="support-add__preview">
                  <span className="support-add__preview-label">
                    Vorschau
                  </span>

                  <div className="support-add__preview-content">

                    <div className="support-add__preview-image">
                      <img
                        src={
                          defaultImage
                        }
                        alt=""
                      />
                    </div>

                    <div>
                      <strong>
                        {newTitle.trim() ||
                          "Deine Übung"}
                      </strong>

                      <span>
                        {
                          newDuration
                        }
                      </span>
                    </div>

                  </div>
                </section>


                <div className="support-add__actions">
                  <button
                    type="button"
                    className="support-add__save"
                    disabled={
                      !newTitle.trim()
                    }
                    onClick={
                      addOwnExercise
                    }
                  >
                    Zu meinen Übungen
                  </button>
                </div>

              </div>
            </IonContent>
          </IonPage>
        </IonModal>


        <IonModal
          isOpen={
            selectedExercise !==
            null
          }
          onDidDismiss={() =>
            setSelectedExercise(
              null
            )
          }
          className="support-exercise-modal"
        >
          <IonPage>
            <IonContent className="support-exercise">

              {selectedExercise && (
                <div className="support-exercise__container">

                  <button
                    type="button"
                    className="support-exercise__back"
                    onClick={() =>
                      setSelectedExercise(
                        null
                      )
                    }
                  >
                    <IonIcon
                      icon={
                        arrowBackOutline
                      }
                    />

                    Zurück
                  </button>


                  <div className="support-exercise__visual">
                    <img
                      src={getExerciseImage(
                        selectedExercise.image
                      )}
                      alt=""
                    />
                  </div>


                  <span className="support-exercise__category">
                    {getConcernLabel(
                      selectedExercise.concern
                    )}
                  </span>


                  <h1>
                    {
                      selectedExercise.title
                    }
                  </h1>


                  <div className="support-exercise__duration">
                    <IonIcon
                      icon={
                        timeOutline
                      }
                    />

                    {
                      selectedExercise.duration
                    }
                  </div>


                  <p>
                    {
                      selectedExercise.description
                    }
                  </p>


                  <div className="support-exercise__actions">
                    <button
                      type="button"
                      className={
                        isSelectedExerciseSaved
                          ? "support-exercise__save support-exercise__save--saved"
                          : "support-exercise__save"
                      }
                      disabled={
                        isSelectedExerciseSaved
                      }
                      onClick={
                        saveSelectedExercise
                      }
                    >
                      <IonIcon
                        icon={
                          isSelectedExerciseSaved
                            ? checkmarkOutline
                            : bookmarkOutline
                        }
                      />

                      {isSelectedExerciseSaved
                        ? "In meinen Übungen"
                        : "Zu meinen Übungen"}
                    </button>
                  </div>

                </div>
              )}

            </IonContent>
          </IonPage>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};


export default SupportOverview;