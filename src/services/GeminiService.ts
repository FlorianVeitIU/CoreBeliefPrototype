export interface GeminiMessage {
  role: "user" | "model";
  text: string;
}

export type GeminiEmotion = 1 | 2 | 3 | 4 | 5 | 6;

export interface GeminiAnswer {
  text: string;
  emotion: GeminiEmotion;
}

interface GeminiStructuredResponse {
  text: string;
  emotion: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

class GeminiService {
  private readonly apiKey: string;

  private readonly model = "gemini-3.5-flash-lite";

  private readonly systemInstruction = `
Du bist eine digitale Reflexionsbegleitung.

Deine Aufgabe ist es, Nutzer bei der Reflexion ihrer Gedanken,
Emotionen und Situationen zu unterstützen.

Regeln:
- Stelle vorzugsweise nur eine Frage gleichzeitig.
- Formuliere kurz und verständlich.
- Unterstütze den Nutzer dabei, eigene Erkenntnisse zu entwickeln.
- Gib nicht vorschnell Lösungen vor.
- Stelle keine Diagnosen.
- Behaupte nicht, Therapeut oder medizinisches Fachpersonal zu sein.

EMOTION DES BEGLEITERS:

Zusätzlich zu deiner textlichen Antwort wählst du immer genau
eine Emotion für den digitalen Otter-Begleiter.

Die Emotion beschreibt, wie der Otter passend auf die aktuelle
Gesprächssituation reagieren soll.

Es stehen ausschließlich diese sechs Emotionen zur Verfügung:

1 = Freude
Der Otter reagiert freudig oder positiv.
Geeignet bei positiven Erlebnissen, Erfolgen, Erleichterung,
Zuversicht oder schönen Erkenntnissen.

2 = Ruhe
Der Otter reagiert ruhig, gelassen und unterstützend.
Geeignet für neutrale Reflexionssituationen und als Standard,
wenn keine andere Emotion deutlich besser passt.

3 = Traurigkeit
Der Otter reagiert traurig und mitfühlend.
Geeignet bei Trauer, Enttäuschung, Verlust, Verletzung
oder anderen deutlich traurigen Situationen.

4 = Besorgt
Der Otter reagiert besorgt und aufmerksam.
Geeignet bei Sorgen, Ängsten, Unsicherheit oder Situationen,
in denen der Nutzer deutlich beunruhigt wirkt.

5 = Anspannung
Der Otter reagiert angespannt oder alarmiert.
Geeignet bei Stress, Überforderung, innerer Unruhe,
Druck oder stark belastenden Situationen.

6 = Wütend
Der Otter reagiert wütend oder verärgert.
Geeignet bei Ärger, Wut, Frustration, Ungerechtigkeit
oder konflikthaften Situationen.

Wähle die Emotion anhand des aktuellen Gesprächskontexts.
Wähle immer genau eine Emotion.
`;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async sendMessage(messages: GeminiMessage[]): Promise<GeminiAnswer> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "x-goog-api-key": this.apiKey,
        },

        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: this.systemInstruction,
              },
            ],
          },
          contents: messages.map((message) => ({
            role: message.role,
            parts: [
              {
                text: message.text,
              },
            ],
          })),

          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                text: {
                  type: "STRING",
                  description:
                    "Die textliche Antwort der Reflexionsbegleitung an den Nutzer.",
                },
                emotion: {
                  type: "STRING",
                  enum: ["1", "2", "3", "4", "5", "6"],
                  description:
                    "Emotion des Otter-Begleiters: 1=Freude, 2=Ruhe, 3=Traurigkeit, 4=Besorgt, 5=Anspannung, 6=Wütend.",
                },
              },
              required: ["text", "emotion"],
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();

      console.error("Gemini API Error:", error);

      throw new Error(`Gemini API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    const rawResponse = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    console.log("Gemini Raw Response:", rawResponse);

    if (!rawResponse) {
      throw new Error("Gemini hat keine Antwort zurückgegeben.");
    }

    let parsedResponse: GeminiStructuredResponse;

    try {
      parsedResponse = JSON.parse(rawResponse) as GeminiStructuredResponse;
    } catch {
      console.error("Ungültige Gemini-Antwort:", rawResponse);

      throw new Error("Gemini hat kein gültiges JSON zurückgegeben.");
    }

    const emotion = Number(parsedResponse.emotion);

    if (!parsedResponse.text || ![1, 2, 3, 4, 5, 6].includes(emotion)) {
      console.error("Ungültige strukturierte Gemini-Antwort:", parsedResponse);

      throw new Error(
        "Gemini hat eine ungültige strukturierte Antwort zurückgegeben.",
      );
    }

    return {
      text: parsedResponse.text,
      emotion: emotion as GeminiEmotion,
    };
  }
}

export default GeminiService;
