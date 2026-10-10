import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";

import {
  chevronDownOutline,
  chevronUpOutline,
  pauseOutline,
  searchOutline,
} from "ionicons/icons";

import {
  useMemo,
  useState,
} from "react";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./ReflectionHistory.css";


type ReflectionStatus =
  | "completed"
  | "paused";


type Reflection = {
  id: number;
  title: string;
  date: string;
  month: string;
  status: ReflectionStatus;
  tags: string[];
};


type Filter =
  | "all"
  | "completed"
  | "paused";


const reflections: Reflection[] = [
  {
    id: 1,
    title: "Rückmeldung im Studium",
    date: "21. September",
    month: "September 2026",
    status: "completed",
    tags: [
      "Kritik",
      "Selbstzweifel",
      "Anerkennung",
    ],
  },
  {
    id: 2,
    title: "Stressiger Arbeitstag",
    date: "18. September",
    month: "September 2026",
    status: "paused",
    tags: [
      "Leistung",
      "Anspannung",
      "Ruhe",
    ],
  },
  {
    id: 3,
    title:
      "Gespräch mit einer nahestehenden Person",
    date: "14. September",
    month: "September 2026",
    status: "completed",
    tags: [
      "Zugehörigkeit",
      "Unsicherheit",
      "Rückzug",
    ],
  },
  {
    id: 4,
    title: "Zu viele Aufgaben gleichzeitig",
    date: "10. September",
    month: "September 2026",
    status: "completed",
    tags: [
      "Überforderung",
      "Leistung",
      "Ruhe",
    ],
  },
  {
    id: 5,
    title: "Unsicherheit nach einer Nachricht",
    date: "6. September",
    month: "September 2026",
    status: "completed",
    tags: [
      "Unsicherheit",
      "Nähe",
      "Gedanken",
    ],
  },
  {
    id: 6,
    title: "Erwartungen an mich selbst",
    date: "2. September",
    month: "September 2026",
    status: "completed",
    tags: [
      "Anspruch",
      "Leistung",
      "Selbstkritik",
    ],
  },
  {
    id: 7,
    title: "Konflikt im Alltag",
    date: "28. August",
    month: "August 2026",
    status: "completed",
    tags: [
      "Ärger",
      "Verständnis",
      "Abgrenzung",
    ],
  },
  {
    id: 8,
    title: "Gedanken nach Feierabend",
    date: "19. August",
    month: "August 2026",
    status: "completed",
    tags: [
      "Arbeit",
      "Unruhe",
      "Erholung",
    ],
  },
  {
    id: 9,
    title: "Schwierige Entscheidung",
    date: "11. August",
    month: "August 2026",
    status: "paused",
    tags: [
      "Unsicherheit",
      "Sicherheit",
      "Entscheidung",
    ],
  },
  {
    id: 10,
    title: "Eigene Erwartungen",
    date: "4. August",
    month: "August 2026",
    status: "completed",
    tags: [
      "Anspruch",
      "Selbstkritik",
      "Akzeptanz",
    ],
  },
];


const ReflectionHistory = () => {
  const [filter, setFilter] =
    useState<Filter>("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [expandedMonths, setExpandedMonths] =
    useState<string[]>([
      "September 2026",
    ]);


  const filteredReflections =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return reflections.filter(
        (reflection) => {
          const matchesFilter =
            filter === "all" ||
            reflection.status ===
              filter;

          const matchesSearch =
            normalizedSearch === "" ||
            reflection.title
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            reflection.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    normalizedSearch
                  )
            );

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );
    }, [
      filter,
      searchTerm,
    ]);


  const months = useMemo(
    () =>
      Array.from(
        new Set(
          filteredReflections.map(
            (reflection) =>
              reflection.month
          )
        )
      ),
    [filteredReflections]
  );


  const toggleMonth = (
    month: string
  ) => {
    setExpandedMonths(
      (current) =>
        current.includes(month)
          ? current.filter(
              (item) =>
                item !== month
            )
          : [
              ...current,
              month,
            ]
    );
  };


  return (
    <IonPage>

      <IonHeader>
        <TopNavigation
          title="Reflexionsverlauf"
          showBackButton
        />
      </IonHeader>


      <IonContent className="reflection-history">

        <div className="reflection-history__container">

          <main className="reflection-history__content">

            <div className="reflection-history__tools">

              <div className="reflection-history__search">

                <IonIcon
                  icon={searchOutline}
                />

                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Reflexionen durchsuchen"
                  aria-label="Reflexionen durchsuchen"
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="reflection-history__filters">

                <button
                  type="button"
                  className={
                    filter === "all"
                      ? "reflection-history__filter reflection-history__filter--active"
                      : "reflection-history__filter"
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
                    filter ===
                    "completed"
                      ? "reflection-history__filter reflection-history__filter--active"
                      : "reflection-history__filter"
                  }
                  onClick={() =>
                    setFilter(
                      "completed"
                    )
                  }
                >
                  Abgeschlossen
                </button>


                <button
                  type="button"
                  className={
                    filter === "paused"
                      ? "reflection-history__filter reflection-history__filter--active"
                      : "reflection-history__filter"
                  }
                  onClick={() =>
                    setFilter(
                      "paused"
                    )
                  }
                >
                  Unterbrochen
                </button>

              </div>

            </div>


            <div className="reflection-history__months">

              {months.map(
                (month) => {
                  const monthReflections =
                    filteredReflections.filter(
                      (reflection) =>
                        reflection.month ===
                        month
                    );

                  const isExpanded =
                    expandedMonths.includes(
                      month
                    );

                  const visibleReflections =
                    isExpanded
                      ? monthReflections
                      : monthReflections.slice(
                          0,
                          2
                        );


                  return (
                    <section
                      key={month}
                      className="reflection-history__month"
                    >

                      <div className="reflection-history__month-header">

                        <div>

                          <h2 className="reflection-history__month-title">
                            {month}
                          </h2>

                          <span className="reflection-history__month-count">
                            {
                              monthReflections.length
                            }{" "}
                            {
                              monthReflections.length ===
                              1
                                ? "Reflexion"
                                : "Reflexionen"
                            }
                          </span>

                        </div>


                        {monthReflections.length >
                          2 && (

                          <button
                            type="button"
                            className="reflection-history__month-toggle"
                            onClick={() =>
                              toggleMonth(
                                month
                              )
                            }
                          >
                            {isExpanded
                              ? "Weniger"
                              : `${
                                  monthReflections.length -
                                  2
                                } weitere`}

                            <IonIcon
                              icon={
                                isExpanded
                                  ? chevronUpOutline
                                  : chevronDownOutline
                              }
                            />
                          </button>

                        )}

                      </div>


                      <div className="reflection-history__timeline">

                        {visibleReflections.map(
                          (
                            reflection,
                            index
                          ) => (

                            <div
                              key={
                                reflection.id
                              }
                              className="reflection-history__timeline-item"
                            >

                              <div className="reflection-history__timeline-marker">

                                <div
                                  className={
                                    reflection.status ===
                                    "paused"
                                      ? "reflection-history__timeline-dot reflection-history__timeline-dot--paused"
                                      : "reflection-history__timeline-dot"
                                  }
                                />

                                {index <
                                  visibleReflections.length -
                                    1 && (

                                  <div className="reflection-history__timeline-line" />

                                )}

                              </div>


                              <button
                                type="button"
                                className="reflection-history__reflection"
                              >

                                <div className="reflection-history__reflection-header">

                                  <span className="reflection-history__date">
                                    {
                                      reflection.date
                                    }
                                  </span>


                                  {reflection.status ===
                                    "paused" && (

                                    <span className="reflection-history__status">

                                      <IonIcon
                                        icon={
                                          pauseOutline
                                        }
                                      />

                                      Unterbrochen

                                    </span>

                                  )}

                                </div>


                                <span className="reflection-history__reflection-title">
                                  {
                                    reflection.title
                                  }
                                </span>


                                <div className="reflection-history__tags">

                                  {reflection.tags.map(
                                    (tag) => (

                                      <span
                                        key={
                                          tag
                                        }
                                        className="reflection-history__tag"
                                      >
                                        {
                                          tag
                                        }
                                      </span>

                                    )
                                  )}

                                </div>

                              </button>

                            </div>

                          )
                        )}

                      </div>

                    </section>
                  );
                }
              )}


              {months.length === 0 && (

                <div className="reflection-history__empty">
                  Keine passenden Reflexionen gefunden.
                </div>

              )}

            </div>

          </main>

        </div>

      </IonContent>

    </IonPage>
  );
};


export default ReflectionHistory;