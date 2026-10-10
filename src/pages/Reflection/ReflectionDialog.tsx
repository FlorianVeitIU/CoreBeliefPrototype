import {
  useCallback,
  useEffect,
  useRef,
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
  flagOutline,
  micOutline,
  sendOutline,
} from "ionicons/icons";

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import OtterCompanion from "../../components/OtterCompanion/OtterCompainon";

import GeminiService, {
  GeminiEmotion,
  GeminiMessage,
} from "../../services/GeminiService";

import settingsStorage from "../../services/SettingStorage";

import "./ReflectionDialog.css";


type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
};


type PendingOtterResponse = {
  text: string;
  emotion: GeminiEmotion;
};


const geminiService = new GeminiService(
  import.meta.env.VITE_GEMINI_API_KEY
);


const ReflectionDialog = () => {
  const router = useIonRouter();

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [isRecording, setIsRecording] =
    useState(false);

  const [isResponding, setIsResponding] =
    useState(false);

  const [otterMessage, setOtterMessage] =
    useState(
      "Hallo. Was beschäftigt dich gerade?"
    );

  const [otterEmotion, setOtterEmotion] =
    useState<GeminiEmotion>(2);

  const [
    pendingAiMessage,
    setPendingAiMessage,
  ] = useState<Message | null>(null);

  const [
    pendingOtterResponse,
    setPendingOtterResponse,
  ] = useState<PendingOtterResponse | null>(
    null
  );


  const pendingAiMessageRef =
    useRef<Message | null>(null);


  useEffect(() => {
    const loadUserName = async () => {
      const name =
        await settingsStorage.getName();

      const trimmedName =
        name.trim();

      if (trimmedName) {
        setOtterMessage(
          `Hallo ${trimmedName}. Was beschäftigt dich gerade?`
        );

        return;
      }

      setOtterMessage(
        "Hallo. Was beschäftigt dich gerade?"
      );
    };

    void loadUserName();
  }, []);


  useEffect(() => {
    if (!pendingOtterResponse) {
      return;
    }

    if (
      otterEmotion !==
      pendingOtterResponse.emotion
    ) {
      return;
    }

    setOtterMessage(
      pendingOtterResponse.text
    );

    setPendingOtterResponse(
      null
    );
  }, [
    otterEmotion,
    pendingOtterResponse,
  ]);


  const handleOtterMessageComplete =
    useCallback(() => {
      const completedMessage =
        pendingAiMessageRef.current;

      if (!completedMessage) {
        return;
      }

      pendingAiMessageRef.current =
        null;

      setPendingAiMessage(null);

      setMessages((currentMessages) => {
        const alreadyExists =
          currentMessages.some(
            (item) =>
              item.id ===
              completedMessage.id
          );

        if (alreadyExists) {
          return currentMessages;
        }

        return [
          ...currentMessages,
          completedMessage,
        ];
      });
    }, []);


  const sendMessage = async () => {
    const trimmedMessage =
      message.trim();

    if (
      !trimmedMessage ||
      isResponding ||
      pendingAiMessage
    ) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(
      updatedMessages
    );

    setMessage("");

    setIsResponding(true);

    setOtterMessage(
      "Ich denke kurz darüber nach ..."
    );

    try {
      const conversation: GeminiMessage[] =
        updatedMessages.map((item) => ({
          role:
            item.sender === "user"
              ? "user"
              : "model",

          text:
            item.text,
        }));

      const response =
        await geminiService.sendMessage(
          conversation
        );

      const aiMessage: Message = {
        id: Date.now(),
        sender: "ai",
        text: response.text,
      };

      pendingAiMessageRef.current =
        aiMessage;

      setPendingAiMessage(
        aiMessage
      );

      setPendingOtterResponse({
        text: response.text,
        emotion: response.emotion,
      });

      setOtterEmotion(
        response.emotion
      );
    }
    catch (error) {
      console.error(
        "Fehler bei der Gemini-Anfrage:",
        error
      );

      const errorText =
        "Ich konnte gerade keine Antwort erstellen. Versuch es bitte noch einmal.";

      const errorMessage: Message = {
        id: Date.now(),
        sender: "ai",
        text: errorText,
      };

      pendingAiMessageRef.current =
        errorMessage;

      setPendingAiMessage(
        errorMessage
      );

      setOtterMessage(
        errorText
      );
    }
    finally {
      setIsResponding(false);
    }
  };


  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void sendMessage();
    }
  };


  const toggleRecording = () => {
    setIsRecording(
      (current) => !current
    );
  };


  const finishReflection = () => {
    router.push(
      "/reflectionsummary"
    );
  };


  const inputDisabled =
    isResponding ||
    pendingAiMessage !== null;


  return (
    <IonPage>

      <IonHeader>
        <TopNavigation
          title="Reflexion"
          showBackButton
          showSettingsButton={false}
        />
      </IonHeader>


      <IonContent
        className="reflection-dialog"
        scrollY={false}
      >

        <main className="reflection-dialog__page">

          <section className="reflection-dialog__conversation">

            <div className="reflection-dialog__messages">

              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`reflection-dialog__message-row ${
                    item.sender === "user"
                      ? "reflection-dialog__message-row--user"
                      : "reflection-dialog__message-row--ai"
                  }`}
                >

                  <div
                    className={`reflection-dialog__message ${
                      item.sender === "user"
                        ? "reflection-dialog__message--user"
                        : "reflection-dialog__message--ai"
                    }`}
                  >
                    {item.text}
                  </div>

                </div>
              ))}


              {isResponding && (
                <div className="reflection-dialog__message-row reflection-dialog__message-row--ai">

                  <div className="reflection-dialog__typing">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>
              )}

            </div>


            <div className="reflection-dialog__companion">

              <OtterCompanion
                message={otterMessage}
                emotion={otterEmotion}
                onMessageComplete={
                  handleOtterMessageComplete
                }
              />

            </div>


            <div className="reflection-dialog__composer">

              {isRecording && (
                <div className="reflection-dialog__recording">

                  <span className="reflection-dialog__recording-dot" />

                  <span>
                    Audioaufnahme läuft
                  </span>

                </div>
              )}


              <button
                type="button"
                className="reflection-dialog__finish"
                onClick={finishReflection}
              >
                <IonIcon
                  icon={flagOutline}
                />

                <span>
                  Reflexion abschließen
                </span>
              </button>


              <div className="reflection-dialog__input">

                <button
                  type="button"
                  className={`reflection-dialog__audio-button ${
                    isRecording
                      ? "reflection-dialog__audio-button--active"
                      : ""
                  }`}
                  aria-label={
                    isRecording
                      ? "Audioaufnahme beenden"
                      : "Audio aufnehmen"
                  }
                  onClick={
                    toggleRecording
                  }
                >
                  <IonIcon
                    icon={micOutline}
                  />
                </button>


                <textarea
                  value={message}
                  placeholder="Was geht dir gerade durch den Kopf?"
                  aria-label="Nachricht eingeben"
                  rows={1}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                />


                <button
                  type="button"
                  className="reflection-dialog__send"
                  aria-label="Nachricht senden"
                  disabled={
                    !message.trim() ||
                    inputDisabled
                  }
                  onClick={() =>
                    void sendMessage()
                  }
                >
                  <IonIcon
                    icon={sendOutline}
                  />
                </button>

              </div>

            </div>

          </section>

        </main>

      </IonContent>

    </IonPage>
  );
};


export default ReflectionDialog;