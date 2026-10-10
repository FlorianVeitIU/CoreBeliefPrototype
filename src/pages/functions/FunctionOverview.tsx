import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  bodyOutline,
  bulbOutline,
  chatbubbleEllipsesOutline,
  chevronForwardOutline,
  gitNetworkOutline,
  happyOutline,
  heartOutline,
  peopleOutline,
  timeOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";

import "./FunctionOverview.css";


type FunctionItem = {
  title: string;
  description: string;
  icon: string;
  route: string;
};


const functions: FunctionItem[] = [
  {
    title: "Muster & Zusammenhänge",
    description:
      "Entdecke wiederkehrende Inhalte und mögliche Zusammenhänge.",
    icon: gitNetworkOutline,
    route: "/PatternOverview",
  },
  {
    title: "Erkenntnisse",
    description:
      "Sieh dir Erkenntnisse an, die du gespeichert hast.",
    icon: bulbOutline,
    route: "/InsightOverview",
  },
  {
    title: "Reflexionsverlauf",
    description:
      "Sieh dir deine vergangenen Reflexionen an.",
    icon: timeOutline,
    route: "/reflectionhistory",
  },
  {
    title: "Unterstützungen",
    description:
      "Finde Möglichkeiten, die dich unterstützen können.",
    icon: peopleOutline,
    route: "/SupportOverview",
  },
];


const checkIns: FunctionItem[] = [
  {
    title: "Bedürfnisse",
    description:
      "Finde heraus, was du gerade benötigst",
    icon: happyOutline,
    route: "/needcheckIn",
  },
  {
    title: "Emotionen",
    description:
      "Halte Fest, wie du dich gerade fühlst",
    icon: heartOutline,
    route: "/emotioncheckIn",
  },
  {
    title: "Körper",
    description:
      "Halte Fest, was dein Körper dir sagt",
    icon: bodyOutline,
    route: "/bodyreactioncheckIn",
  },
  {
    title: "Gedanken",
    description:
      "Halte einen Gedanken fest",
    icon: chatbubbleEllipsesOutline,
    route: "/thoughtcheckIn",
  },
];


const FunctionOverview = () => {
  const router = useIonRouter();


  const openFunction = (
    route: string
  ) => {
    router.push(route);
  };


  const renderItem = (
    item: FunctionItem
  ) => (
    <button
      key={item.title}
      type="button"
      className="function-overview__item"
      onClick={() =>
        openFunction(item.route)
      }
    >
      <div className="function-overview__item-top">
        <div className="function-overview__item-icon">
          <IonIcon icon={item.icon} />
        </div>

        <IonIcon
          className="function-overview__item-arrow"
          icon={chevronForwardOutline}
        />
      </div>

      <div className="function-overview__item-content">
        <span className="function-overview__item-title">
          {item.title}
        </span>

        <span className="function-overview__item-description">
          {item.description}
        </span>
      </div>
    </button>
  );


  return (
    <IonPage>
      <IonHeader>
        <TopNavigation
          title="Mein Bereich"
          showBackButton
        />
      </IonHeader>

      <IonContent className="function-overview">
        <div className="function-overview__container">
          <main className="function-overview__content">

            <section className="function-overview__section">
              <div className="function-overview__section-header">
                <h2 className="function-overview__section-title">
                  Reflexion & Entwicklung
                </h2>

                <p className="function-overview__section-description">
                  Entdecke Erkenntnisse, Muster und vergangene Reflexionen.
                </p>
              </div>

              <div className="function-overview__grid">
                {functions.map(renderItem)}
              </div>
            </section>


            <section className="function-overview__section">
              <div className="function-overview__section-header">
                <h2 className="function-overview__section-title">
                  Selbstwahrnehmung
                </h2>

                <p className="function-overview__section-description">
                  Halte fest, was du gerade wahrnimmst.
                </p>
              </div>

              <div className="function-overview__grid">
                {checkIns.map(renderItem)}
              </div>
            </section>

          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default FunctionOverview;