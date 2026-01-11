
import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource, ModelMode } from '../types';

const getClient = () => {
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('21umas_user_api_key') : null;
  const apiKey = localKey || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API Key not found. Please add your key in settings.");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper function for delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Wrapper to initiate stream with robust retry logic for "unlimited" wait feel
const streamWithRetry = async (
  ai: GoogleGenAI,
  params: any,
  retries = 50, // High retry count to simulate "unlimited" wait time during overloads/timeouts
  initialDelay = 2000
): Promise<any> => {
  try {
    return await ai.models.generateContentStream(params);
  } catch (error: any) {
    const msg = error.message || '';
    // Retry on various transient errors including Timeouts, Rate Limits, and Server Errors
    const isRetryable = 
      msg.includes('429') || 
      msg.includes('503') || 
      msg.includes('504') ||
      msg.includes('RESOURCE_EXHAUSTED') || 
      msg.includes('quota') ||
      msg.includes('overloaded') ||
      msg.toLowerCase().includes('timeout') ||
      msg.toLowerCase().includes('network error') ||
      msg.toLowerCase().includes('failed to fetch');
    
    if (retries > 0 && isRetryable) {
      // Log retry attempt (silent to user, visible in console)
      console.warn(`Gemini API Retry (${50 - retries + 1}/50): ${msg}. Waiting ${initialDelay}ms...`);
      
      // Cap the maximum delay to 30 seconds to maintain some responsiveness while persisting
      const nextDelay = Math.min(initialDelay * 1.5, 30000); 
      await wait(initialDelay);
      return streamWithRetry(ai, params, retries - 1, nextDelay);
    }
    throw error;
  }
};

export const streamResponse = async (
  history: Message[],
  currentPrompt: string,
  imageBase64: string | undefined,
  mode: ModelMode,
  onUpdate: (content: string, thinking: string, isDone: boolean, sources?: GroundingSource[]) => void,
  customSystemInstruction?: string
) => {
  const ai = getClient();
  
  // Use the exact model name passed from the selector
  const modelName = mode;

  let systemInstruction = `
    أنت "21UMAS"، المساعد الطبي الرسمي لجامعة 21 سبتمبر.
    النموذج الحالي: ${modelName}.
    المهام: تحليل الصور، التشخيص، الدواء.
    اللغة: العربية الطبية.
  `;

  if (customSystemInstruction) {
    systemInstruction = customSystemInstruction;
  }

  try {
    const currentParts: any[] = [{ text: currentPrompt }];
    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      currentParts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      });
    }

    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: currentParts
      }
    ];

    const config: any = {
      systemInstruction: systemInstruction,
      tools: [{ googleSearch: {} }],
    };

    // Apply Thinking Config only for Gemini 3 and 2.5 series (Pro/Flash)
    // Checking string inclusion for 'gemini-3' or 'gemini-2.5'
    if (modelName.includes('gemini-3') || modelName.includes('gemini-2.5')) {
      // Typically thinking is more relevant for Pro, but some 2.5 Flash models support it.
      // We will apply a default budget if it's a "Pro" or high-end model, 
      // or if it explicitly supports it. For safety, we apply mainly to Pro/3.0.
      // However, to be safe with "Flash" models that might error on thinking config,
      // we restrict it mainly to models known to support it or just Pro variants.
      // Given the prompt rules "Thinking Config is only available for the Gemini 3 and 2.5 series",
      // we enable it for those.
      
      // Note: Setting thinking budget might cause errors on models that don't support it yet.
      // For stability, we prioritize it for PRO models or 3.0 Flash.
      if (modelName.includes('pro') || modelName.includes('gemini-3')) {
         config.thinkingConfig = { thinkingBudget: 2048 };
      }
    }

    const streamResult = await streamWithRetry(ai, {
      model: modelName,
      contents: contents,
      config: config
    });

    let fullText = '';
    let fullThinking = '';
    let finalSources: GroundingSource[] = [];

    for await (const chunk of streamResult) {
      // Extract Text
      const chunkText = chunk.text || '';
      
      const candidates = chunk.candidates || [];
      fullText += chunkText;

      // Extract Grounding
      const chunks = candidates[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri && c.web?.title) {
            finalSources.push({ title: c.web.title, uri: c.web.uri });
          }
        });
      }

      onUpdate(fullText, fullThinking, false, finalSources);
    }

    onUpdate(fullText, fullThinking, true, finalSources);

  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    let errorMessage = error.message || JSON.stringify(error);
    
    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
       throw new Error(`⚠️ تم تجاوز حد الاستخدام للنموذج ${modelName}. يرجى التبديل لنموذج آخر أو استخدام مفتاح خاص.`);
    }
    // Handle model not found (404) which might happen if a specific preview name is retired
    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        throw new Error(`⚠️ النموذج ${modelName} غير متاح حالياً أو تم تغييره. اختر نموذجاً آخر.`);
    }
    throw new Error(errorMessage);
  }
};
