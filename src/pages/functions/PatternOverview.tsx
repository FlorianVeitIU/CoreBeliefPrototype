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
  arrowDownOutline,
  checkmarkOutline,
  chevronDownOutline,
  chevronForwardOutline,
  chevronUpOutline,
  gitNetworkOutline,
  pencilOutline,
  sparklesOutline,
} from "ionicons/icons";

import {
  useMemo,
  useState,
} from "react";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./PatternOverview.css";


type AnalysisStep =
  | "reflections"
  | "contents"
  | "confirmation"
  | "result";


type ReflectionOption = {
  id: number;
  title: string;
  date: string;
};


type AnalysisItemType =
  | "problem"
  | "insight"
  | "checkin";


type AnalysisItem = {
  id: string;
  type: AnalysisItemType;
  reflectionId: number;
  title: string;
  summary: string;
  date: string;
};


type PatternNode = {
  type: string;
  value: string;
};


type PatternSource = {
  id: number;
  date: string;
  title: string;
};


type SavedPattern = {
  id: number;
  name: string;
  note?: string;
  createdAt: string;
  occurrenceText: string;
  nodes: PatternNode[];
  sources: PatternSource[];
};


const reflectionOptions: ReflectionOption[] = [
  {
    id: 1,
    title: "Rückmeldung im Studium",
    date: "21. September 2026",
  },
  {
    id: 2,
    title: "Stressiger Arbeitstag",
    date: "18. September 2026",
  },
  {
    id: 3,
    title: "Gespräch mit einer nahestehenden Person",
    date: "14. September 2026",
  },
  {
    id: 4,
    title: "Zu viele Aufgaben gleichzeitig",
    date: "10. September 2026",
  },
  {
    id: 5,
    title: "Unsicherheit nach einer Nachricht",
    date: "6. September 2026",
  },
];


const analysisItems: AnalysisItem[] = [
  {
    id: "problem-1",
    type: "problem",
    reflectionId: 1,
    title: "Kritisches Feedback",
    summary:
      "Ich hatte das Gefühl, meine Arbeit war nicht gut genug.",
    date: "21. September 2026",
  },
  {
    id: "problem-2",
    type: "problem",
    reflectionId: 2,
    title: "Hoher eigener Leistungsanspruch",
    summary:
      "Ich wollte unbedingt alles richtig machen.",
    date: "18. September 2026",
  },
  {
    id: "problem-3",
    type: "problem",
    reflectionId: 3,
    title: "Unsicherheit im Gespräch",
    summary:
      "Ich wusste nicht, wie ich die Reaktion einordnen soll.",
    date: "14. September 2026",
  },
  {
    id: "problem-4",
    type: "problem",
    reflectionId: 4,
    title: "Zu viele Aufgaben gleichzeitig",
    summary:
      "Ich hatte das Gefühl, allem gleichzeitig gerecht werden zu müssen.",
    date: "10. September 2026",
  },
  {
    id: "problem-5",
    type: "problem",
    reflectionId: 5,
    title: "Unsicherheit nach einer Nachricht",
    summary:
      "Ich war unsicher, wie die Nachricht gemeint war.",
    date: "6. September 2026",
  },
  {
    id: "insight-1",
    type: "insight",
    reflectionId: 1,
    title: "Gespeicherte Erkenntnis",
    summary:
      "Kritik an meiner Arbeit ist nicht automatisch Kritik an mir.",
    date: "21. September 2026",
  },
  {
    id: "insight-2",
    type: "insight",
    reflectionId: 2,
    title: "Gespeicherte Erkenntnis",
    summary:
      "Ich muss nicht alles sofort lösen.",
    date: "18. September 2026",
  },
  {
    id: "insight-3",
    type: "insight",
    reflectionId: 3,
    title: "Gespeicherte Erkenntnis",
    summary:
      "Ich kann nachfragen, bevor ich eine Reaktion für mich interpretiere.",
    date: "14. September 2026",
  },
  {
    id: "checkin-1",
    type: "checkin",
    reflectionId: 1,
    title: "Emotionen",
    summary: "Unsicherheit, Anspannung",
    date: "21. September 2026 · 14:32 Uhr",
  },
  {
    id: "checkin-2",
    type: "checkin",
    reflectionId: 1,
    title: "Bedürfnisse",
    summary: "Anerkennung, Sicherheit",
    date: "21. September 2026 · 14:35 Uhr",
  },
  {
    id: "checkin-3",
    type: "checkin",
    reflectionId: 2,
    title: "Körper",
    summary:
      "Druck im Brustbereich, innere Anspannung",
    date: "18. September 2026 · 19:12 Uhr",
  },
  {
    id: "checkin-4",
    type: "checkin",
    reflectionId: 2,
    title: "Gedanken",
    summary:
      "„Ich muss das irgendwie hinbekommen.“",
    date: "18. September 2026 · 19:16 Uhr",
  },
  {
    id: "checkin-5",
    type: "checkin",
    reflectionId: 3,
    title: "Emotionen",
    summary: "Ärger, Unsicherheit",
    date: "14. September 2026 · 20:41 Uhr",
  },
  {
    id: "checkin-6",
    type: "checkin",
    reflectionId: 3,
    title: "Bedürfnisse",
    summary: "Verständnis, Zugehörigkeit",
    date: "14. September 2026 · 20:43 Uhr",
  },
  {
    id: "checkin-7",
    type: "checkin",
    reflectionId: 4,
    title: "Körper",
    summary: "Innere Unruhe, Anspannung",
    date: "10. September 2026 · 17:22 Uhr",
  },
  {
    id: "checkin-8",
    type: "checkin",
    reflectionId: 5,
    title: "Gedanken",
    summary:
      "„Vielleicht habe ich etwas falsch gemacht.“",
    date: "6. September 2026 · 21:08 Uhr",
  },
];


const initialPatterns: SavedPattern[] = [
  {
    id: 1,
    name: "Umgang mit Kritik",
    note:
      "Kritik löst bei mir schnell Selbstzweifel aus.",
    createdAt: "21. September 2026",
    occurrenceText: "In 3 Reflexionen erkannt",
    nodes: [
      {
        type: "Situation",
        value: "Kritisches Feedback",
      },
      {
        type: "Wiederkehrender Gedanke",
        value: "„Ich bin nicht gut genug.“",
      },
      {
        type: "Emotion",
        value: "Unsicherheit",
      },
      {
        type: "Reaktion",
        value: "Rückzug",
      },
      {
        type: "Bedürfnis",
        value: "Anerkennung",
      },
    ],
    sources: [
      {
        id: 1,
        date: "21. Sep.",
        title: "Rückmeldung im Studium",
      },
      {
        id: 2,
        date: "14. Sep.",
        title: "Gespräch über meine Arbeit",
      },
      {
        id: 3,
        date: "02. Sep.",
        title: "Rückmeldung bei der Arbeit",
      },
    ],
  },
];


const proposedPatternNodes: PatternNode[] = [
  {
    type: "Situation",
    value: "Hoher eigener Anspruch",
  },
  {
    type: "Gedanke",
    value: "„Ich muss das schaffen.“",
  },
  {
    type: "Emotion",
    value: "Anspannung",
  },
  {
    type: "Reaktion",
    value: "Rückzug",
  },
  {
    type: "Bedürfnis",
    value: "Ruhe",
  },
];


const PatternOverview = () => {
  const [patterns, setPatterns] =
    useState<SavedPattern[]>(initialPatterns);

  const [expandedPatternIds, setExpandedPatternIds] =
    useState<number[]>([]);

  const [isAnalysisOpen, setIsAnalysisOpen] =
    useState(false);

  const [analysisStep, setAnalysisStep] =
    useState<AnalysisStep>("reflections");

  const [selectedReflections, setSelectedReflections] =
    useState<number[]>([1, 2, 3]);

  const [selectedItems, setSelectedItems] =
    useState<string[]>([]);

  const [patternName, setPatternName] =
    useState("");

  const [patternNote, setPatternNote] =
    useState("");

  const [editablePatternNodes, setEditablePatternNodes] =
    useState<PatternNode[]>(
      proposedPatternNodes.map((node) => ({
        ...node,
      }))
    );


  const availableItems = useMemo(
    () =>
      analysisItems.filter((item) =>
        selectedReflections.includes(
          item.reflectionId
        )
      ),
    [selectedReflections]
  );


  const problems = useMemo(
    () =>
      availableItems.filter(
        (item) => item.type === "problem"
      ),
    [availableItems]
  );


  const insights = useMemo(
    () =>
      availableItems.filter(
        (item) => item.type === "insight"
      ),
    [availableItems]
  );


  const checkIns = useMemo(
    () =>
      availableItems.filter(
        (item) => item.type === "checkin"
      ),
    [availableItems]
  );


  const selectedProblemsCount =
    problems.filter((item) =>
      selectedItems.includes(item.id)
    ).length;


  const selectedInsightsCount =
    insights.filter((item) =>
      selectedItems.includes(item.id)
    ).length;


  const selectedCheckInsCount =
    checkIns.filter((item) =>
      selectedItems.includes(item.id)
    ).length;


  const selectedReflectionSources = useMemo(
    () =>
      reflectionOptions
        .filter((reflection) =>
          selectedReflections.includes(
            reflection.id
          )
        )
        .map((reflection) => ({
          id: reflection.id,
          date: reflection.date
            .replace(
              " September 2026",
              ". Sep."
            )
            .replace(
              "6. Sep.",
              "06. Sep."
            ),
          title: reflection.title,
        })),
    [selectedReflections]
  );


  const openAnalysis = () => {
    setAnalysisStep("reflections");
    setSelectedReflections([1, 2, 3]);
    setSelectedItems([]);
    setPatternName("");
    setPatternNote("");

    setEditablePatternNodes(
      proposedPatternNodes.map((node) => ({
        ...node,
      }))
    );

    setIsAnalysisOpen(true);
  };


  const closeAnalysis = () => {
    setIsAnalysisOpen(false);
  };


  const goBackInAnalysis = () => {
    if (analysisStep === "reflections") {
      closeAnalysis();
      return;
    }

    if (analysisStep === "contents") {
      setAnalysisStep("reflections");
      return;
    }

    if (analysisStep === "confirmation") {
      setAnalysisStep("contents");
      return;
    }

    setAnalysisStep("confirmation");
  };


  const togglePattern = (id: number) => {
    setExpandedPatternIds((current) =>
      current.includes(id)
        ? current.filter(
            (patternId) =>
              patternId !== id
          )
        : [...current, id]
    );
  };


  const toggleReflection = (id: number) => {
    setSelectedReflections((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };


  const toggleItem = (id: string) => {
    setSelectedItems((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };


  const openContents = () => {
    const availableIds =
      analysisItems
        .filter((item) =>
          selectedReflections.includes(
            item.reflectionId
          )
        )
        .map((item) => item.id);

    setSelectedItems(availableIds);
    setAnalysisStep("contents");
  };


  const updatePatternNode = (
    index: number,
    value: string
  ) => {
    setEditablePatternNodes((current) =>
      current.map((node, nodeIndex) =>
        nodeIndex === index
          ? {
              ...node,
              value,
            }
          : node
      )
    );
  };


  const savePattern = () => {
    const name = patternName.trim();

    if (!name) {
      return;
    }

    const newId =
      patterns.length > 0
        ? Math.max(
            ...patterns.map(
              (pattern) => pattern.id
            )
          ) + 1
        : 1;

    const newPattern: SavedPattern = {
      id: newId,
      name,
      note:
        patternNote.trim() || undefined,
      createdAt: "25. September 2026",
      occurrenceText:
        `In ${selectedReflections.length} Reflexionen erkannt`,
      nodes:
        editablePatternNodes.map(
          (node) => ({
            ...node,
          })
        ),
      sources:
        selectedReflectionSources,
    };

    setPatterns((current) => [
      newPattern,
      ...current,
    ]);

    setExpandedPatternIds(
      (current) => [
        newId,
        ...current,
      ]
    );

    setIsAnalysisOpen(false);
  };


  const renderAnalysisItem = (
    item: AnalysisItem
  ) => {
    const selected =
      selectedItems.includes(item.id);

    return (
      <button
        key={item.id}
        type="button"
        className={
          selected
            ? "pattern-analysis__data-item pattern-analysis__data-item--selected"
            : "pattern-analysis__data-item"
        }
        onClick={() =>
          toggleItem(item.id)
        }
      >
        <div className="pattern-analysis__checkbox">
          {selected && (
            <IonIcon
              icon={checkmarkOutline}
            />
          )}
        </div>

        <div className="pattern-analysis__data-content">
          <span className="pattern-analysis__data-title">
            {item.title}
          </span>

          <span className="pattern-analysis__data-summary">
            {item.summary}
          </span>

          <span className="pattern-analysis__data-date">
            {item.date}
          </span>
        </div>
      </button>
    );
  };


  const renderPatternNodes = (
    nodes: PatternNode[]
  ) => (
    <div className="pattern-overview__connection">
      {nodes.map((node, index) => (
        <div
          key={`${node.type}-${index}`}
          className="pattern-overview__connection-part"
        >
          <div className="pattern-overview__connection-node">
            <span className="pattern-overview__connection-type">
              {node.type}
            </span>

            <span className="pattern-overview__connection-value">
              {node.value}
            </span>
          </div>

          {index < nodes.length - 1 && (
            <div className="pattern-overview__connection-arrow">
              <div className="pattern-overview__connection-line" />

              <IonIcon
                icon={arrowDownOutline}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Muster & Zusammenhänge"
          showBackButton
        />
      </IonHeader>

      <IonContent className="pattern-overview">
        <div className="pattern-overview__container">
          <main className="pattern-overview__content">
            <div className="pattern-overview__intro">
              <h1 className="pattern-overview__intro-title">
                Deine Zusammenhänge
              </h1>

              <p className="pattern-overview__intro-text">
                Entdecke Inhalte, die in mehreren deiner
                Reflexionen gemeinsam aufgetreten sind.
              </p>
            </div>

            <section className="pattern-overview__patterns">
              {patterns.map((pattern) => {
                const expanded =
                  expandedPatternIds.includes(
                    pattern.id
                  );

                return (
                  <article
                    key={pattern.id}
                    className={
                      expanded
                        ? "pattern-overview__pattern pattern-overview__pattern--expanded"
                        : "pattern-overview__pattern"
                    }
                  >
                    <button
                      type="button"
                      className="pattern-overview__pattern-summary"
                      onClick={() =>
                        togglePattern(
                          pattern.id
                        )
                      }
                      aria-expanded={
                        expanded
                      }
                    >
                      <div className="pattern-overview__pattern-icon">
                        <IonIcon
                          icon={
                            gitNetworkOutline
                          }
                        />
                      </div>

                      <div className="pattern-overview__pattern-heading">
                        <span className="pattern-overview__pattern-name">
                          {pattern.name}
                        </span>

                        <span className="pattern-overview__pattern-meta">
                          {
                            pattern.occurrenceText
                          }
                        </span>

                        <span className="pattern-overview__pattern-date">
                          {
                            pattern.createdAt
                          }
                        </span>
                      </div>

                      <IonIcon
                        className="pattern-overview__pattern-toggle"
                        icon={
                          expanded
                            ? chevronUpOutline
                            : chevronDownOutline
                        }
                      />
                    </button>

                    {expanded && (
                      <div className="pattern-overview__pattern-details">
                        {renderPatternNodes(
                          pattern.nodes
                        )}

                        {pattern.note && (
                          <div className="pattern-overview__note">
                            <span className="pattern-overview__detail-label">
                              Eigene Notiz
                            </span>

                            <p>
                              {pattern.note}
                            </p>
                          </div>
                        )}

                        <div className="pattern-overview__sources">
                          <span className="pattern-overview__detail-label">
                            Beobachtet in
                          </span>

                          <div className="pattern-overview__sources-list">
                            {pattern.sources.map(
                              (
                                reflection
                              ) => (
                                <div
                                  key={
                                    reflection.id
                                  }
                                  className="pattern-overview__source"
                                >
                                  <span className="pattern-overview__source-date">
                                    {
                                      reflection.date
                                    }
                                  </span>

                                  <span className="pattern-overview__source-title">
                                    {
                                      reflection.title
                                    }
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="pattern-overview__reflections-button"
                        >
                          <span>
                            Zugrunde liegende Reflexionen ansehen
                          </span>

                          <IonIcon
                            icon={
                              chevronForwardOutline
                            }
                          />
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </section>
          </main>
        </div>

        <button
          type="button"
          className="pattern-overview__fab"
          aria-label="Neuen Zusammenhang entdecken"
          onClick={openAnalysis}
        >
          <IonIcon
            icon={addOutline}
          />
        </button>

        <IonModal
          isOpen={isAnalysisOpen}
          onDidDismiss={
            closeAnalysis
          }
          className="pattern-analysis-modal"
        >
          <IonPage>
            <IonContent
              className="pattern-analysis"
              scrollY={
                analysisStep !==
                "reflections"
              }
            >
              <div className="pattern-analysis__container">
                <button
                  type="button"
                  className="pattern-analysis__back"
                  onClick={
                    goBackInAnalysis
                  }
                >
                  <IonIcon
                    icon={
                      arrowBackOutline
                    }
                  />

                  <span>Zurück</span>
                </button>

                {analysisStep ===
                  "reflections" && (
                  <main className="pattern-analysis__content pattern-analysis__content--selection">
                    <div className="pattern-analysis__intro">
                      <span className="pattern-analysis__step">
                        Schritt 1 von 3
                      </span>

                      <h2>
                        Reflexionen auswählen
                      </h2>

                      <p>
                        Wähle die Reflexionen aus, zwischen
                        denen du nach möglichen Zusammenhängen
                        suchen möchtest.
                      </p>
                    </div>

                    <div className="pattern-analysis__reflection-list">
                      {reflectionOptions.map(
                        (
                          reflection
                        ) => {
                          const selected =
                            selectedReflections.includes(
                              reflection.id
                            );

                          return (
                            <button
                              key={
                                reflection.id
                              }
                              type="button"
                              className={
                                selected
                                  ? "pattern-analysis__reflection pattern-analysis__reflection--selected"
                                  : "pattern-analysis__reflection"
                              }
                              onClick={() =>
                                toggleReflection(
                                  reflection.id
                                )
                              }
                            >
                              <div className="pattern-analysis__checkbox">
                                {selected && (
                                  <IonIcon
                                    icon={
                                      checkmarkOutline
                                    }
                                  />
                                )}
                              </div>

                              <div className="pattern-analysis__reflection-content">
                                <span className="pattern-analysis__reflection-title">
                                  {
                                    reflection.title
                                  }
                                </span>

                                <span className="pattern-analysis__reflection-date">
                                  {
                                    reflection.date
                                  }
                                </span>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>

                    <span className="pattern-analysis__selection-count">
                      {
                        selectedReflections.length
                      }{" "}
                      {selectedReflections.length ===
                      1
                        ? "Reflexion ausgewählt"
                        : "Reflexionen ausgewählt"}
                    </span>

                    <div className="pattern-analysis__selection-footer">
                      <button
                        type="button"
                        className="pattern-analysis__primary-action"
                        disabled={
                          selectedReflections.length <
                          2
                        }
                        onClick={
                          openContents
                        }
                      >
                        Weiter
                      </button>
                    </div>
                  </main>
                )}

                {analysisStep ===
                  "contents" && (
                  <main className="pattern-analysis__content">
                    <div className="pattern-analysis__intro">
                      <span className="pattern-analysis__step">
                        Schritt 2 von 3
                      </span>

                      <h2>
                        Inhalte auswählen
                      </h2>

                      <p>
                        Prüfe genau, welche Inhalte für die
                        Suche nach möglichen Zusammenhängen
                        berücksichtigt werden sollen.
                      </p>
                    </div>

                    <section className="pattern-analysis__data-section">
                      <div className="pattern-analysis__section-header">
                        <h3>
                          Identifizierte Probleme
                        </h3>

                        <span>
                          {
                            problems.length
                          }
                        </span>
                      </div>

                      <div className="pattern-analysis__data-list">
                        {problems.map(
                          renderAnalysisItem
                        )}
                      </div>
                    </section>

                    <section className="pattern-analysis__data-section">
                      <div className="pattern-analysis__section-header">
                        <h3>
                          Gespeicherte Erkenntnisse
                        </h3>

                        <span>
                          {
                            insights.length
                          }
                        </span>
                      </div>

                      <div className="pattern-analysis__data-list">
                        {insights.map(
                          renderAnalysisItem
                        )}
                      </div>
                    </section>

                    <section className="pattern-analysis__data-section">
                      <div className="pattern-analysis__section-header">
                        <h3>
                          Check-ins
                        </h3>

                        <span>
                          {
                            checkIns.length
                          }
                        </span>
                      </div>

                      <div className="pattern-analysis__data-list">
                        {checkIns.map(
                          renderAnalysisItem
                        )}
                      </div>
                    </section>

                    <div className="pattern-analysis__navigation-actions">
                      <button
                        type="button"
                        className="pattern-analysis__primary-action"
                        disabled={
                          selectedItems.length <
                          2
                        }
                        onClick={() =>
                          setAnalysisStep(
                            "confirmation"
                          )
                        }
                      >
                        Weiter
                      </button>
                    </div>
                  </main>
                )}

                {analysisStep ===
                  "confirmation" && (
                  <main className="pattern-analysis__content">
                    <div className="pattern-analysis__intro">
                      <span className="pattern-analysis__step">
                        Schritt 3 von 3
                      </span>

                      <h2>
                        Auswahl prüfen
                      </h2>

                      <p>
                        Nur die von dir ausgewählten Inhalte
                        werden für diese Analyse berücksichtigt.
                      </p>
                    </div>

                    <div className="pattern-analysis__summary">
                      <div className="pattern-analysis__summary-row">
                        <span>
                          Reflexionen
                        </span>

                        <strong>
                          {
                            selectedReflections.length
                          }
                        </strong>
                      </div>

                      <div className="pattern-analysis__summary-divider" />

                      <div className="pattern-analysis__summary-row">
                        <span>
                          Identifizierte Probleme
                        </span>

                        <strong>
                          {
                            selectedProblemsCount
                          }
                        </strong>
                      </div>

                      <div className="pattern-analysis__summary-row">
                        <span>
                          Gespeicherte Erkenntnisse
                        </span>

                        <strong>
                          {
                            selectedInsightsCount
                          }
                        </strong>
                      </div>

                      <div className="pattern-analysis__summary-row">
                        <span>
                          Check-ins
                        </span>

                        <strong>
                          {
                            selectedCheckInsCount
                          }
                        </strong>
                      </div>
                    </div>

                    <div className="pattern-analysis__analysis-hint">
                      <IonIcon
                        icon={
                          sparklesOutline
                        }
                      />

                      <p>
                        Die Analyse sucht ausschließlich in
                        dieser Auswahl nach möglichen
                        wiederkehrenden Zusammenhängen.
                      </p>
                    </div>

                    <div className="pattern-analysis__navigation-actions">
                      <button
                        type="button"
                        className="pattern-analysis__primary-action pattern-analysis__primary-action--analysis"
                        onClick={() => {
                          setPatternName(
                            ""
                          );

                          setPatternNote(
                            ""
                          );

                          setEditablePatternNodes(
                            proposedPatternNodes.map(
                              (
                                node
                              ) => ({
                                ...node,
                              })
                            )
                          );

                          setAnalysisStep(
                            "result"
                          );
                        }}
                      >
                        <IonIcon
                          icon={
                            sparklesOutline
                          }
                        />

                        Analyse starten
                      </button>
                    </div>
                  </main>
                )}

                {analysisStep ===
                  "result" && (
                  <main className="pattern-analysis__content">
                    <div className="pattern-analysis__result-intro">
                      <h2>
                        Möglicher Zusammenhang
                      </h2>

                      <p>
                        In den ausgewählten Inhalten wurde ein
                        möglicher wiederkehrender Zusammenhang
                        gefunden. Du kannst die vorgeschlagenen
                        Bestandteile vor dem Speichern anpassen.
                      </p>
                    </div>

                    <div className="pattern-analysis__result-pattern">
                      {editablePatternNodes.map(
                        (
                          node,
                          index
                        ) => (
                          <div
                            key={`${node.type}-${index}`}
                            className="pattern-analysis__result-part"
                          >
                            <div className="pattern-analysis__result-node">
                              <div className="pattern-analysis__result-node-heading">
                                <span className="pattern-analysis__result-type">
                                  {
                                    node.type
                                  }
                                </span>

                                <IonIcon
                                  className="pattern-analysis__result-edit-icon"
                                  icon={
                                    pencilOutline
                                  }
                                />
                              </div>

                              <input
                                className="pattern-analysis__result-value-input"
                                type="text"
                                value={
                                  node.value
                                }
                                aria-label={`${node.type} bearbeiten`}
                                onChange={(
                                  event
                                ) =>
                                  updatePatternNode(
                                    index,
                                    event
                                      .target
                                      .value
                                  )
                                }
                              />
                            </div>

                            {index <
                              editablePatternNodes.length -
                                1 && (
                              <div className="pattern-analysis__result-arrow">
                                <IonIcon
                                  icon={
                                    arrowDownOutline
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}

                      <span className="pattern-analysis__result-count">
                        In{" "}
                        {
                          selectedReflections.length
                        }{" "}
                        ausgewählten Reflexionen gemeinsam
                        aufgetreten
                      </span>
                    </div>

                    <section className="pattern-analysis__user-input">
                      <div className="pattern-analysis__user-input-header">
                        <h3>
                          Dein Zusammenhang
                        </h3>

                        <p>
                          Gib dem gefundenen Zusammenhang einen
                          Namen. Optional kannst du eine eigene
                          Notiz ergänzen.
                        </p>
                      </div>

                      <label className="pattern-analysis__field">
                        <span className="pattern-analysis__field-label">
                          Name
                        </span>

                        <input
                          type="text"
                          value={
                            patternName
                          }
                          placeholder="z. B. Umgang mit Kritik"
                          onChange={(
                            event
                          ) =>
                            setPatternName(
                              event
                                .target
                                .value
                            )
                          }
                        />
                      </label>

                      <label className="pattern-analysis__field">
                        <span className="pattern-analysis__field-label">
                          Eigene Notiz

                          <span>
                            Optional
                          </span>
                        </span>

                        <textarea
                          value={
                            patternNote
                          }
                          placeholder="Was bedeutet dieser Zusammenhang für dich?"
                          rows={4}
                          onChange={(
                            event
                          ) =>
                            setPatternNote(
                              event
                                .target
                                .value
                            )
                          }
                        />
                      </label>
                    </section>

                    <div className="pattern-analysis__navigation-actions pattern-analysis__navigation-actions--result">
                      <button
                        type="button"
                        className="pattern-analysis__primary-action"
                        disabled={
                          !patternName.trim() ||
                          editablePatternNodes.some(
                            (
                              node
                            ) =>
                              !node.value.trim()
                          )
                        }
                        onClick={
                          savePattern
                        }
                      >
                        <IonIcon
                          icon={
                            checkmarkOutline
                          }
                        />

                        Zusammenhang speichern
                      </button>
                    </div>
                  </main>
                )}
              </div>
            </IonContent>
          </IonPage>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};


export default PatternOverview;