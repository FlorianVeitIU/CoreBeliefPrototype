import {
  useEffect,
  useState,
} from "react";

import "./OtterCompanion.css";

import {
  otterImages,
  otterEmotionMap,
  OtterEmotionValue,
} from "../../images/otter/otterImages";


type OtterCompanionProps = {
  message: string;
  emotion?: OtterEmotionValue;
  onMessageComplete?: () => void;
};

const OtterCompanion: React.FC<
  OtterCompanionProps
> = ({
  message,
  emotion = 2,
  onMessageComplete,
}) => {
  const [visible, setVisible] =
    useState(true);

  const [
    displayedText,
    setDisplayedText,
  ] = useState("");


  useEffect(() => {
    setDisplayedText("");
    setVisible(true);

    if (!message) {
      onMessageComplete?.();
      return;
    }

    let index = 0;
    const interval =
      window.setInterval(() => {
        index += 1;

        setDisplayedText(
          message.slice(0, index)
        );


        if (
          index >= message.length
        ) {
          window.clearInterval(
            interval
          );

          onMessageComplete?.();
        }
      }, 30);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    message,
    onMessageComplete,
  ]);

  const currentEmotion =
    otterEmotionMap[emotion];

  const currentImage =
    otterImages[currentEmotion];

  return (
    <div className="otter-companion">

      {visible && (
        <div
          className="otter-speech-bubble"
          onClick={() =>
            setVisible(false)
          }
        >
          {displayedText}
        </div>
      )}

      <img
        className="otter-image"
        src={currentImage}
        alt="Otter-Begleiter"
      />

    </div>
  );
};


export default OtterCompanion;