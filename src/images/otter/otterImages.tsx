import heart from "./otter_heart.png";
import clap from "./otter_clap.gif";
import laugh from "./otter_laugh.png";
import chill from "./otter_chill.png";
import wiggle from "./otter_wiggle.gif";
import shocked from "./otter_shocked.png";
import sus from "./otter_sus.png";
import cry from "./otter_cry.png";
import cute from "./otter_cute.png";
import sleep from "./otter_sleep.png";
import sign from "./otter_sign.png";
import party from "./otter_party.gif";
import confused from "./otter_ask.png";
import angry from "./otter_angry.png";


export type OtterEmotion =
  | "heart"
  | "clap"
  | "laugh"
  | "chill"
  | "wiggle"
  | "shocked"
  | "sus"
  | "cry"
  | "cute"
  | "sleep"
  | "sign"
  | "party"
  | "confused"
  | "angry";


export type OtterEmotionValue =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;


export const otterImages: Record<
  OtterEmotion,
  string
> = {
  heart,
  clap,
  laugh,
  chill,
  wiggle,
  shocked,
  sus,
  cry,
  cute,
  sleep,
  sign,
  party,
  confused,
  angry,
};


export const otterEmotionMap: Record<
  OtterEmotionValue,
  OtterEmotion
> = {
  1: "laugh",
  2: "chill",
  3: "cry",
  4: "sus",
  5: "shocked",
  6: "angry",
};