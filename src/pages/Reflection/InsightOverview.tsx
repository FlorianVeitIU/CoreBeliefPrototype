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
  bookmarkOutline,
  checkmarkOutline,
  chevronDownOutline,
  documentTextOutline,
  leafOutline,
  searchOutline,
  sparklesOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./InsightOverview.css";


type InsightType =
  | "insight"
  | "belief"
  | "perspective";


type FilterType =
  | "all"
  | InsightType;


type Insight = {
  id: number;
  type: InsightType;
  text: string;
  date: string;
  reflection: string;
  tags: string[];
};


const initialInsights: Insight[] = [
  {
    id: 1,
    type: "insight",
    text:
      "Kritik löst bei mir schnell das Gefühl aus, nicht gut genug zu sein.",
    date: "21. Sep.",
    reflection: "Rückmeldung im Studium",
    tags: [
      "Kritik",
      "Selbstwert",
    ],
  },
  {
    id: 2,
    type: "belief",
    text:
      "Ich muss alles richtig machen, damit andere mit mir zufrieden sind.",
    date: "18. Sep.",
    reflection: "Stressiger Arbeitstag",
    tags: [
      "Perfektionismus",
      "Anerkennung",
    ],
  },
  {
    id: 3,
    type: "perspective",
    text:
      "Ein Fehler bedeutet nicht automatisch, dass ich versagt habe.",
    date: "18. Sep.",
    reflection: "Stressiger Arbeitstag",
    tags: [
      "Fehler",
      "Selbstmitgefühl",
    ],
  },
  {
    id: 4,
    type: "insight",
    text:
      "Unter Zeitdruck werde ich deutlich kritischer mit mir selbst.",
    date: "4. Sep.",
    reflection: "Zu wenig Zeit für meine Aufgaben",
    tags: [
      "Stress",
      "Selbstkritik",
    ],
  },
  {
    id: 5,
    type: "belief",
    text:
      "Wenn ich eine Pause brauche, bin ich nicht belastbar genug.",
    date: "2. Sep.",
    reflection: "Erschöpft nach einem langen Tag",
    tags: [
      "Pause",
      "Leistung",
    ],
  },
  {
    id: 6,
    type: "perspective",
    text:
      "Eine Pause ist kein Scheitern, sondern kann mir helfen, wieder handlungsfähig zu werden.",
    date: "2. Sep.",
    reflection: "Erschöpft nach einem langen Tag",
    tags: [
      "Pause",
      "Selbstfürsorge",
    ],
  },
];


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


const InsightOverview = () => {
  const [insights, setInsights] =
    useState<Insight[]>(initialInsights);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<FilterType>("all");

  const [expandedIds, setExpandedIds] =
    useState<number[]>([]);

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [newType, setNewType] =
    useState<InsightType>("insight");

  const [newText, setNewText] =
    useState("");

  const [newReflection, setNewReflection] =
    useState("");

  const [newTags, setNewTags] =
    useState("");


  const filteredInsights = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return insights.filter((insight) => {
      const matchesFilter =
        filter === "all" ||
        insight.type === filter;

      if (!matchesFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableContent = [
        insight.text,
        insight.reflection,
        getTypeLabel(insight.type),
        ...insight.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(
        normalizedSearch
      );
    });
  }, [
    insights,
    filter,
    search,
  ]);


  const resetFilters = () => {
    setSearch("");
    setFilter("all");
  };


  const toggleExpanded = (
    id: number
  ) => {
    setExpandedIds((current) => {
      if (current.includes(id)) {
        return current.filter(
          (itemId) => itemId !== id
        );
      }

      return [
        ...current,
        id,
      ];
    });
  };


  const closeAddModal = () => {
    setIsAddOpen(false);

    setNewType("insight");
    setNewText("");
    setNewReflection("");
    setNewTags("");
  };


  const addInsight = () => {
    const trimmedText =
      newText.trim();

    const trimmedReflection =
      newReflection.trim();

    if (
      !trimmedText ||
      !trimmedReflection
    ) {
      return;
    }

    const tags =
      newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

    const newInsight: Insight = {
      id: Date.now(),
      type: newType,
      text: trimmedText,
      date: "Heute",
      reflection: trimmedReflection,
      tags,
    };

    setInsights((current) => [
      newInsight,
      ...current,
    ]);

    closeAddModal();
  };


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Erkenntnisse"
          showBackButton
          showSettingsButton={false}
        />
      </IonHeader>

      <IonContent className="insight-overview">
        <div className="insight-overview__container">
          <main className="insight-overview__content">
            <section className="insight-overview__tools">
              <div className="insight-overview__search">
                <IonIcon
                  icon={searchOutline}
                  className="insight-overview__search-icon"
                />

                <input
                  type="text"
                  value={search}
                  placeholder="Erkenntnisse durchsuchen"
                  aria-label="Erkenntnisse durchsuchen"
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="insight-overview__filters">
                <button
                  type="button"
                  className={
                    filter === "all"
                      ? "insight-overview__filter insight-overview__filter--active"
                      : "insight-overview__filter"
                  }
                  onClick={() =>
                    setFilter("all")
                  }
                >
                  Alle
                </button>

                <button
                  type="button"
                  className={
                    filter === "insight"
                      ? "insight-overview__filter insight-overview__filter--active"
                      : "insight-overview__filter"
                  }
                  onClick={() =>
                    setFilter("insight")
                  }
                >
                  Erkenntnisse
                </button>

                <button
                  type="button"
                  className={
                    filter === "belief"
                      ? "insight-overview__filter insight-overview__filter--active"
                      : "insight-overview__filter"
                  }
                  onClick={() =>
                    setFilter("belief")
                  }
                >
                  Glaubenssätze
                </button>

                <button
                  type="button"
                  className={
                    filter === "perspective"
                      ? "insight-overview__filter insight-overview__filter--active"
                      : "insight-overview__filter"
                  }
                  onClick={() =>
                    setFilter("perspective")
                  }
                >
                  Perspektiven
                </button>
              </div>
            </section>

            <div className="insight-overview__result-header">
              <div className="insight-overview__result-info">
                <span>
                  {filteredInsights.length} Einträge
                </span>

                {(filter !== "all" || search) && (
                  <button
                    type="button"
                    className="insight-overview__reset"
                    onClick={resetFilters}
                  >
                    Filter zurücksetzen
                  </button>
                )}
              </div>
            </div>

            {filteredInsights.length > 0 ? (
              <section className="insight-overview__list">
                {filteredInsights.map(
                  (insight) => {
                    const isExpanded =
                      expandedIds.includes(
                        insight.id
                      );

                    return (
                      <article
                        key={insight.id}
                        className={
                          isExpanded
                            ? "insight-overview__item insight-overview__item--expanded"
                            : "insight-overview__item"
                        }
                      >
                        <button
                          type="button"
                          className="insight-overview__item-main"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            toggleExpanded(
                              insight.id
                            )
                          }
                        >
                          <div className="insight-overview__item-header">
                            <div className="insight-overview__item-type">
                              <IonIcon
                                icon={getTypeIcon(
                                  insight.type
                                )}
                              />

                              <span>
                                {getTypeLabel(
                                  insight.type
                                )}
                              </span>
                            </div>

                            <span className="insight-overview__date">
                              {insight.date}
                            </span>
                          </div>

                          <p className="insight-overview__item-text">
                            {insight.text}
                          </p>

                          <div className="insight-overview__item-footer">
                            <div className="insight-overview__reflection-preview">
                              <IonIcon
                                icon={documentTextOutline}
                              />

                              <span>
                                {insight.reflection}
                              </span>
                            </div>

                            <IonIcon
                              className="insight-overview__expand-icon"
                              icon={chevronDownOutline}
                            />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="insight-overview__details">
                            <div className="insight-overview__source">
                              <span className="insight-overview__detail-label">
                                Entstanden aus
                              </span>

                              <span className="insight-overview__source-title">
                                {insight.reflection}
                              </span>
                            </div>

                            {insight.tags.length > 0 && (
                              <div className="insight-overview__detail-section">
                                <span className="insight-overview__detail-label">
                                  Schlagwörter
                                </span>

                                <div className="insight-overview__tags">
                                  {insight.tags.map(
                                    (tag) => (
                                      <span
                                        key={tag}
                                        className="insight-overview__tag"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  }
                )}
              </section>
            ) : (
              <section className="insight-overview__empty">
                <div className="insight-overview__empty-icon">
                  <IonIcon
                    icon={searchOutline}
                  />
                </div>

                <h2>
                  Keine Erkenntnisse gefunden
                </h2>

                <p>
                  Versuche einen anderen Suchbegriff
                  oder ändere deine Filter.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                >
                  Alle anzeigen
                </button>
              </section>
            )}
          </main>
        </div>

        <button
          type="button"
          className="insight-overview__fab"
          aria-label="Neue Erkenntnis"
          onClick={() =>
            setIsAddOpen(true)
          }
        >
          <IonIcon
            icon={addOutline}
          />
        </button>

        <IonModal
          isOpen={isAddOpen}
          onDidDismiss={closeAddModal}
          className="insight-add"
        >
          <IonPage>
            <IonContent className="insight-add__content">
              <div className="insight-add__container">
                <button
                  type="button"
                  className="insight-add__back"
                  onClick={closeAddModal}
                >
                  <IonIcon
                    icon={arrowBackOutline}
                  />

                  <span>
                    Zurück
                  </span>
                </button>

                <main className="insight-add__main">
                  <header className="insight-add__header">
                    <h2>
                      Neue Erkenntnis
                    </h2>

                    <p>
                      Was möchtest du aus deiner Reflexion
                      für dich festhalten?
                    </p>
                  </header>

                  <section className="insight-add__section">
                    <span className="insight-add__label">
                      Was möchtest du festhalten?
                    </span>

                    <div className="insight-add__types">
                      {(
                        [
                          "insight",
                          "belief",
                          "perspective",
                        ] as InsightType[]
                      ).map((type) => {
                        const selected =
                          newType === type;

                        return (
                          <button
                            key={type}
                            type="button"
                            className={
                              selected
                                ? "insight-add__type insight-add__type--active"
                                : "insight-add__type"
                            }
                            onClick={() =>
                              setNewType(type)
                            }
                          >
                            <div className="insight-add__type-icon">
                              <IonIcon
                                icon={getTypeIcon(type)}
                              />
                            </div>

                            <div className="insight-add__type-content">
                              <span className="insight-add__type-title">
                                {getTypeLabel(type)}
                              </span>

                              <span className="insight-add__type-description">
                                {getTypeDescription(type)}
                              </span>
                            </div>

                            <div className="insight-add__type-check">
                              {selected && (
                                <IonIcon
                                  icon={checkmarkOutline}
                                />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <section className="insight-add__form">
                    <label className="insight-add__field">
                      <span className="insight-add__label">
                        Inhalt
                      </span>

                      <textarea
                        value={newText}
                        placeholder="Was ist dir aufgefallen?"
                        rows={4}
                        onChange={(event) =>
                          setNewText(
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label className="insight-add__field">
                      <span className="insight-add__label">
                        Reflexion
                      </span>

                      <input
                        type="text"
                        value={newReflection}
                        placeholder="Aus welcher Reflexion stammt die Erkenntnis?"
                        onChange={(event) =>
                          setNewReflection(
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label className="insight-add__field">
                      <span className="insight-add__field-heading">
                        <span className="insight-add__label">
                          Schlagwörter
                        </span>

                        <span className="insight-add__optional">
                          Optional
                        </span>
                      </span>

                      <input
                        type="text"
                        value={newTags}
                        placeholder="z. B. Kritik, Selbstwert"
                        onChange={(event) =>
                          setNewTags(
                            event.target.value
                          )
                        }
                      />

                      <span className="insight-add__hint">
                        Mehrere Schlagwörter mit Komma trennen.
                      </span>
                    </label>
                  </section>

                  <div className="insight-add__actions">
                    <button
                      type="button"
                      className="insight-add__save"
                      disabled={
                        !newText.trim() ||
                        !newReflection.trim()
                      }
                      onClick={addInsight}
                    >
                      Erkenntnis speichern
                    </button>
                  </div>
                </main>
              </div>
            </IonContent>
          </IonPage>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};


export default InsightOverview;