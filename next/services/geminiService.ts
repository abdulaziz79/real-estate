import { GoogleGenAI, Type } from "@google/genai";
import { Property } from "../types";

function getApiKey() {
  const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!key) throw new Error("Missing GEMINI_API_KEY or API_KEY");
  return key;
}

export const getAIPropertyRecommendations = async (userPreferences: string, properties: Property[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the following user preferences: "${userPreferences}", analyze the provided property list and recommend the top 2 best matches. 
      Return the IDs of the recommended properties and a brief reason why.
      
      Properties: ${JSON.stringify(properties.map(p => ({ id: p.id, title: p.title, price: p.price, location: p.location, type: p.type })))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ['id', 'reason']
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result.recommendations || [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const chatWithAssistant = async (message: string, context?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: message,
      config: {
        systemInstruction: `You are a professional real estate assistant for Elite Realty Pro. 
        Help users with property questions, market trends, and buying/selling advice. 
        Keep answers concise, professional, and helpful. 
        Use the Google Maps tool when asked about locations or nearby places.
        Current context: ${context || 'General real estate assistance'}`,
        tools: [{ googleMaps: {} }]
      }
    });
    return response.text || "I'm sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
