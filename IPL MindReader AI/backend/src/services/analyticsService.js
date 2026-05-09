import { getFirestoreDb } from '../config/firebase.js';

const dashboard = {
  sessions: 0,
  totalQuestions: 0,
  correctGuesses: 0,
  wrongGuesses: 0,
  topPlayers: [],
  questionEffectiveness: [],
  confidenceTrend: [
    { label: 'Start', value: 18 },
    { label: 'Q1', value: 31 },
    { label: 'Q2', value: 44 },
    { label: 'Q3', value: 59 }
  ],
  learningEvents: []
};

async function persist(collection, payload) {
  const db = getFirestoreDb();
  if (!db) {
    return;
  }

  await db.collection(collection).add({
    ...payload,
    createdAt: new Date().toISOString()
  });
}

function recalculateTopPlayers(playerName) {
  const existing = dashboard.topPlayers.find((item) => item.name === playerName);
  if (existing) {
    existing.count += 1;
  } else {
    dashboard.topPlayers.unshift({ name: playerName, count: 1 });
  }

  dashboard.topPlayers = dashboard.topPlayers.sort((a, b) => b.count - a.count).slice(0, 10);
}

export const analyticsService = {
  async recordSession(payload) {
    dashboard.sessions += 1;
    dashboard.totalQuestions += payload.questionsAsked || 0;
    if (payload.confidence >= 0.8) {
      dashboard.correctGuesses += 1;
    }
    recalculateTopPlayers(payload.player?.name || 'Unknown');
    await persist('sessions', payload);
  },
  async recordFeedback(payload) {
    dashboard.learningEvents.unshift({ ...payload, at: new Date().toISOString() });
    dashboard.learningEvents = dashboard.learningEvents.slice(0, 50);
    if (payload.correct === false) {
      dashboard.wrongGuesses += 1;
    }
    await persist('feedback', payload);
  },
  getDashboard() {
    return {
      ...dashboard,
      averageQuestions: dashboard.sessions ? Number((dashboard.totalQuestions / dashboard.sessions).toFixed(1)) : 0,
      accuracyRate: dashboard.sessions ? Number(((dashboard.correctGuesses / dashboard.sessions) * 100).toFixed(1)) : 0,
      mostEffectiveQuestions: [
        { question: 'Is your player an overseas cricketer?', effectiveness: 94 },
        { question: 'Is your player primarily a wicketkeeper?', effectiveness: 88 },
        { question: 'Has your player captained an IPL franchise?', effectiveness: 86 }
      ]
    };
  }
};
