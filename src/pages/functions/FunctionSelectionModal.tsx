import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  chevronForwardOutline,
  closeOutline,
} from "ionicons/icons";

import "./FunctionSelectionModal.css";


type FunctionItem = {
  id: string;
  name: string;
  description: string;
  route: string;
};


type FunctionSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: FunctionItem) => void;
};


const functions: FunctionItem[] = [
  {
    id: "patterns",
    name: "Muster & Zusammenhänge",
    description:
      "Entdecke wiederkehrende Inhalte und mögliche Zusammenhänge.",
    route: "/PatternOverview",
  },
  {
    id: "insights",
    name: "Erkenntnisse",
    description:
      "Sieh dir Erkenntnisse an, die du aus deinen Reflexionen gespeichert hast.",
    route: "/InsightOverview",
  },
  {
    id: "reflection-history",
    name: "Reflexionsverlauf",
    description:
      "Sieh dir deine vergangenen Reflexionen an.",
    route: "/reflectionhistory",
  },
  {
    id: "support",
    name: "Unterstützungen",
    description:
      "Finde Möglichkeiten, die dich im Moment unterstützen können.",
    route: "/SupportOverview",
  },
  {
    id: "needs",
    name: "Bedürfnis Check In",
    description:
      "Was brauchst du gerade?",
    route: "/needcheckIn",
  },
  {
    id: "emotions",
    name: "Emotion CHeck In",
    description:
      "Was fühlst du gerade?",
    route: "/emotioncheckIn",
  },
  {
    id: "body",
    name: "Körper Check In",
    description:
      "Was nimmst du körperlich wahr?",
    route: "/bodyreactioncheckIn",
  },
  {
    id: "thoughts",
    name: "Gedanken erfassen",
    description:
      "Was geht dir gerade durch den Kopf?",
    route: "/thoughtcheckIn",
  },
];


const FunctionSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
}: FunctionSelectModalProps) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="function-modal"
    >
      <IonHeader className="function-modal__header">
        <IonToolbar>
          <IonTitle>
            Funktion auswählen
          </IonTitle>

          <IonButton
            slot="end"
            fill="clear"
            onClick={onClose}
            aria-label="Schließen"
          >
            <IonIcon
              slot="icon-only"
              icon={closeOutline}
            />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="function-modal__content">
        <div className="function-modal__body">
          <p className="function-modal__intro">
            Wähle eine Funktion für deinen Schnellzugriff.
          </p>

          <div className="function-modal__list">
            {functions.map((item) => (
              <button
                key={item.id}
                type="button"
                className="function-modal__item"
                onClick={() => onSelect(item)}
              >
                <div className="function-modal__item-content">
                  <span className="function-modal__item-name">
                    {item.name}
                  </span>

                  <span className="function-modal__item-description">
                    {item.description}
                  </span>
                </div>

                <IonIcon
                  className="function-modal__item-arrow"
                  icon={chevronForwardOutline}
                />
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FunctionSelectionModal;

export type { FunctionItem };