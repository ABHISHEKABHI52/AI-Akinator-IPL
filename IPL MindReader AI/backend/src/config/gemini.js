import { GoogleGenerativeAI } from '@google/generative-ai';

const modelName = 'gemini-2.0-flash';

function createClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
}

export async function askGeminiForQuestion({ state, fallbackQuestion, mode }) {
  const model = createClient();

  if (!model) {
    return {
      question: fallbackQuestion.text,
      reasoning: fallbackQuestion.reasoning || `Deterministic fallback reasoning for ${mode}.`
    };
  }

  const prompt = `You are an IPL cricket expert AI.
Analyze the remaining player pool and generate one highly informative yes/no question that maximizes information gain and reduces uncertainty.
Return JSON with keys question and reasoning.
State summary: ${JSON.stringify({
    confidence: state.confidence,
    candidateCount: state.candidates.length,
    recentAnswers: state.answers.slice(-4),
    mode
  })}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (_error) {
    // Fall through to the deterministic question.
  }

  return {
    question: fallbackQuestion.text,
    reasoning: fallbackQuestion.reasoning || 'Deterministic fallback question.'
  };
}
