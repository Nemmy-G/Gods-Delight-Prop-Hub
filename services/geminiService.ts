
import { GoogleGenAI, Type } from "@google/genai";
import { Listing, AIAlert } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeListingAuthenticity = async (listing: Partial<Listing>): Promise<{ verified: boolean; flagged: boolean; reason: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this real estate/hotel listing for authenticity and fraud. Check if the price is realistic for the location (${listing.location}) and if the description sounds like a scam (common red flags like too good to be true, urgent pressure, weird grammar).
      Listing Details:
      Title: ${listing.title}
      Description: ${listing.description}
      Price: ${listing.price} NGN
      Location: ${listing.location}
      Type: ${listing.type}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verified: { type: Type.BOOLEAN },
            flagged: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["verified", "flagged", "reason"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return { verified: false, flagged: true, reason: "AI service temporarily unavailable for validation." };
  }
};

export const getSecurityScan = async (logs: string[]): Promise<AIAlert[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a cybersecurity expert, scan these recent server activity logs for any sign of hacking attempts, SQL injections, or DDoS patterns. Return a list of alerts if found.
      Logs:
      ${logs.join('\n')}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "One of: FRAUD, SECURITY, AUTHENTICITY" },
              message: { type: Type.STRING },
              severity: { type: Type.STRING, description: "One of: LOW, MEDIUM, HIGH" }
            },
            required: ["type", "message", "severity"]
          }
        }
      }
    });

    const alerts = JSON.parse(response.text);
    return alerts.map((a: any) => ({ ...a, id: Math.random().toString(36), timestamp: Date.now() }));
  } catch (error) {
    return [];
  }
};
