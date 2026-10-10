import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { arrowBackOutline, settingsOutline } from "ionicons/icons";
import "./TopNavigation.css";

type TopNavigationProps = {
  title?: string;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
};

const TopNavigation: React.FC<TopNavigationProps> = ({
  title,
  showBackButton = false,
  showSettingsButton = true,
}) => {
  const router = useIonRouter();
  return (
    <header className="top-navigation">
      <div className="navigation-content">
        {showBackButton && (
          <IonButton
            fill="clear"
            className="navigation-back"
            onClick={() => router.goBack()}
            aria-label="Zurück"
          >
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
        )}
      </div>

      <div className="navigation-title">{title}</div>

      <div className="navigation-content navigation-content-right">
        {showSettingsButton && (
          <button
            type="button"
            className="navigation-settings"
            aria-label="Einstellungen öffnen"
            onClick={() => router.push("/settingoverview")}
          >
            <IonIcon icon={settingsOutline} />
          </button>
        )}
      </div>
    </header>
  );
};

export default TopNavigation;
