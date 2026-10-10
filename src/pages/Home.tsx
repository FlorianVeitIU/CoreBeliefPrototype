import { useEffect, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import {
  addOutline,
  appsOutline,
  bodyOutline,
  bulbOutline,
  chatbubbleEllipsesOutline,
  chevronForwardOutline,
  gitNetworkOutline,
  happyOutline,
  heartOutline,
  helpBuoyOutline,
  peopleOutline,
  sparklesOutline,
  timeOutline,
} from "ionicons/icons";

import FunctionSelectionModal, {
  FunctionItem,
} from "./functions/FunctionSelectionModal";

import TopNavigation from "../components/TopNavigation/TopNavigation";
import settingsStorage from "../services/SettingStorage";

import "./Home.css";


type HomeNavigationItemProps = {
  title: string;
  description: string;
  icon: string;
  route?: string;
  onClick?: () => void;
  empty?: boolean;
};


const QUICK_ACCESS_STORAGE_KEY =
  "homeQuickAccess";


const HomeNavigationItem = ({
  title,
  description,
  icon,
  route,
  onClick,
  empty = false,
}: HomeNavigationItemProps) => {
  const router = useIonRouter();


  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (route) {
      router.push(route);
    }
  };


  return (
    <button
      type="button"
      className={`home-navigation-item ${
        empty
          ? "home-navigation-item--empty"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className="home-navigation-item__icon">
        <IonIcon icon={icon} />
      </div>

      <div className="home-navigation-item__content">
        <span className="home-navigation-item__title">
          {title}
        </span>

        <span className="home-navigation-item__description">
          {description}
        </span>
      </div>

      <IonIcon
        className="home-navigation-item__arrow"
        icon={chevronForwardOutline}
      />
    </button>
  );
};


const Home = () => {
  const router = useIonRouter();

  const [
    isFunctionModalOpen,
    setIsFunctionModalOpen,
  ] = useState(false);

  const [
    selectedFunction,
    setSelectedFunction,
  ] = useState<FunctionItem | null>(null);

  const [
    userName,
    setUserName,
  ] = useState("");


  useEffect(() => {
    const loadHome = async () => {
      const storedName =
        await settingsStorage.getName();

      setUserName(storedName);


      const storedQuickAccess =
        localStorage.getItem(
          QUICK_ACCESS_STORAGE_KEY
        );

      if (!storedQuickAccess) {
        return;
      }

      try {
        const parsedQuickAccess =
          JSON.parse(
            storedQuickAccess
          ) as FunctionItem;

        if (
          parsedQuickAccess.id &&
          parsedQuickAccess.name &&
          parsedQuickAccess.route
        ) {
          setSelectedFunction(
            parsedQuickAccess
          );
        }
      } catch {
        localStorage.removeItem(
          QUICK_ACCESS_STORAGE_KEY
        );
      }
    };

    void loadHome();
  }, []);


  const handleFunctionSelect = (
    item: FunctionItem
  ) => {
    setSelectedFunction(item);

    localStorage.setItem(
      QUICK_ACCESS_STORAGE_KEY,
      JSON.stringify(item)
    );

    setIsFunctionModalOpen(false);
  };


  const getFunctionIcon = (
    item: FunctionItem
  ) => {
    switch (item.id) {
      case "patterns":
        return gitNetworkOutline;

      case "insights":
        return bulbOutline;

      case "reflection-history":
        return timeOutline;

      case "support":
        return peopleOutline;

      case "needs":
        return happyOutline;

      case "emotions":
        return heartOutline;

      case "body":
        return bodyOutline;

      case "thoughts":
        return chatbubbleEllipsesOutline;

      default:
        return appsOutline;
    }
  };


  return (
    <IonPage>

      <IonHeader>
        <TopNavigation title="Home" />
      </IonHeader>

      <IonContent className="home">

        <div className="home__container">

          <div className="home__welcome">
            <span className="home__greeting">
              Willkommen
            </span>

            {userName && (
              <span className="home__name">
                {userName}
              </span>
            )}
          </div>


          <main className="home__main">

            <div className="home__navigation">

              <HomeNavigationItem
                title="Gedanken reflektieren"
                description="Situationen verstehen und neue Perspektiven entdecken"
                icon={sparklesOutline}
                route="/reflectiondialog"
              />


              <HomeNavigationItem
                title="Mein Bereich"
                description="Deine Werkzeuge für Reflexion und Alltag"
                icon={appsOutline}
                route="/functionOverview"
              />


              {selectedFunction ? (
                <HomeNavigationItem
                  title={
                    selectedFunction.name
                  }
                  description="Dein Schnellzugriff"
                  icon={getFunctionIcon(
                    selectedFunction
                  )}
                  route={
                    selectedFunction.route
                  }
                />
              ) : (
                <HomeNavigationItem
                  title="Schnellzugriff einrichten"
                  description="Wähle eine Funktion für deine Startseite"
                  icon={addOutline}
                  empty
                  onClick={() =>
                    setIsFunctionModalOpen(
                      true
                    )
                  }
                />
              )}

            </div>

          </main>


          <button
            type="button"
            className="home__sos"
            aria-label="Schnellhilfe öffnen"
            onClick={() =>
              router.push("/QuickHelpView")
            }
          >
            <IonIcon
              icon={helpBuoyOutline}
            />

            <span>
              SOS
            </span>
          </button>


          <FunctionSelectionModal
            isOpen={
              isFunctionModalOpen
            }
            onClose={() =>
              setIsFunctionModalOpen(
                false
              )
            }
            onSelect={
              handleFunctionSelect
            }
          />

        </div>

      </IonContent>

    </IonPage>
  );
};


export default Home;