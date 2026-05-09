const answerWeights = {
  yes: 1,
  no: -1,
  maybe: 0.35,
  "don't know": 0,
  unknown: 0
};

const normalizeAnswer = (answer) => {
  const value = String(answer || '').trim().toLowerCase();
  return value === 'don’t know' ? "don't know" : value;
};

const normalizeQuestionId = (questionId) => String(questionId || '').trim();

const createQuestionBank = () => [
  {
    id: 'overseas',
    text: 'Is your player an overseas cricketer?',
    reasoning: 'A first-pass split across domestic and overseas players creates a strong entropy drop.' ,
    evaluate: (player) => Boolean(player.overseas)
  },
  {
    id: 'keeper',
    text: 'Is your player primarily a wicketkeeper?',
    reasoning: 'Role-based separation is a high-signal cricket question.',
    evaluate: (player) => Boolean(player.wicketkeeper)
  },
  {
    id: 'captain',
    text: 'Has your player captained an IPL franchise?',
    reasoning: 'Captaincy strongly narrows the candidate pool.',
    evaluate: (player) => Boolean(player.captain)
  },
  {
    id: 'fast-bowler',
    text: 'Is your player primarily a fast bowler?',
    reasoning: 'Bowling type is one of the strongest differentiators in IPL data.',
    evaluate: (player) => player.role === 'bowler' && String(player.bowlingType || '').includes('fast')
  },
  {
    id: 'finisher',
    text: 'Is your player known as a finisher in T20 cricket?',
    reasoning: 'Finisher status often isolates one of the most memorable IPL profiles.',
    evaluate: (player) => Boolean(player.finisher)
  },
  {
    id: 'aggressive',
    text: 'Is your player known for aggressive batting?',
    reasoning: 'Aggression helps separate anchor batters from enforcers.',
    evaluate: (player) => Boolean(player.aggressiveBatting)
  },
  {
    id: 'top-order',
    text: 'Does your player usually bat in the top five?',
    reasoning: 'Batting order is a powerful proxy for role and franchise usage.',
    evaluate: (player) => (player.battingPosition || 99) <= 5
  },
  {
    id: 'orange-cap',
    text: 'Has your player won the Orange Cap?',
    reasoning: 'Award-based questions are rare and highly informative.',
    evaluate: (player) => Boolean(player.orangeCap)
  },
  {
    id: 'purple-cap',
    text: 'Has your player won the Purple Cap?',
    reasoning: 'Purple Cap winners are sparse enough to be a strong filter.',
    evaluate: (player) => Boolean(player.purpleCap)
  },
  {
    id: 'legend',
    text: 'Would you call your player an IPL legend?',
    reasoning: 'Legend status separates iconic players from the broader field.',
    evaluate: (player) => Boolean(player.legendStatus)
  }
];

function entropy(probability) {
  if (probability <= 0 || probability >= 1) {
    return 0;
  }
  return -probability * Math.log2(probability) - (1 - probability) * Math.log2(1 - probability);
}

function scoreQuestion(players, question) {
  const yesCount = players.filter(question.evaluate).length;
  const ratio = yesCount / Math.max(players.length, 1);
  const weightedEntropy = ratio * entropy(ratio) + (1 - ratio) * entropy(1 - ratio);
  return entropy(0.5) - weightedEntropy + Math.abs(0.5 - ratio) * 0.3;
}

function scoreCandidate(candidate, question, normalizedAnswer) {
  const truthy = question.evaluate(candidate);
  const weight = answerWeights[normalizedAnswer] ?? 0;

  if (normalizedAnswer === 'maybe') {
    return truthy ? 1.05 : 0.95;
  }

  if (normalizedAnswer === "don't know") {
    return 1;
  }

  if (normalizedAnswer === 'yes') {
    return truthy ? 1.75 : 0.25;
  }

  if (normalizedAnswer === 'no') {
    return truthy ? 0.25 : 1.75;
  }

  return truthy ? 1 + weight : Math.max(0.2, 1 - weight * 0.25);
}

function rankCandidates(players) {
  return [...players].sort((a, b) => b.probability - a.probability);
}

export function createReasoningEngine(catalog) {
  const questionBank = createQuestionBank();

  const createState = () => ({
    candidates: catalog.map((player) => ({ ...player, probability: 1 / Math.max(catalog.length, 1) })),
    askedQuestions: [],
    answers: [],
    confidence: 0.18,
    currentQuestion: null,
    currentQuestionId: null,
    currentQuestionReasoning: null
  });

  const nextQuestion = (state) => {
    const available = questionBank.filter((question) => !state.askedQuestions.includes(question.id));
    const ranked = available
      .map((question) => ({ ...question, score: scoreQuestion(state.candidates, question) }))
      .sort((a, b) => b.score - a.score);

    const selected = ranked[0] || questionBank[0];
    return {
      id: selected.id,
      text: selected.text,
      reasoning: selected.reasoning,
      score: selected.score || 0
    };
  };

  const assignNextQuestion = (state) => {
    const question = nextQuestion(state);
    return {
      ...state,
      currentQuestion: question.text,
      currentQuestionId: question.id,
      currentQuestionReasoning: question.reasoning
    };
  };

  const applyAnswer = (state, questionId, answer) => {
    const normalizedQuestionId = normalizeQuestionId(questionId || state.currentQuestionId);
    const normalizedAnswer = normalizeAnswer(answer);
    const question = questionBank.find((item) => item.id === normalizedQuestionId) || nextQuestion(state);

    const scored = state.candidates
      .map((candidate) => ({
        ...candidate,
        probability: candidate.probability * scoreCandidate(candidate, question, normalizedAnswer)
      }))
      .filter((candidate) => candidate.probability > 0.00001);

    const totalProbability = scored.reduce((sum, candidate) => sum + candidate.probability, 0) || 1;
    const normalizedCandidates = scored
      .map((candidate) => ({
        ...candidate,
        probability: candidate.probability / totalProbability
      }))
      .sort((a, b) => b.probability - a.probability);

    const questionsAsked = state.answers.length + 1;
    const topProbability = normalizedCandidates[0]?.probability || 0;
    const confidence = Math.max(topProbability, Math.min(0.96, questionsAsked * 0.09));

    const nextState = {
      ...state,
      candidates: normalizedCandidates,
      askedQuestions: [...state.askedQuestions, question.id],
      answers: [...state.answers, { questionId: question.id, answer: normalizedAnswer, at: new Date().toISOString() }],
      confidence,
      currentQuestion: null,
      currentQuestionId: null,
      currentQuestionReasoning: null,
      questionsAsked
    };

    return nextState;
  };

  const shouldGuess = (state) => state.confidence >= 0.8 || state.answers.length >= 12 || state.candidates.length <= 3;

  const buildGuess = (state) => {
    const topPlayer = rankCandidates(state.candidates)[0] || catalog[0];
    return {
      player: topPlayer,
      confidence: Number((topPlayer?.probability || state.confidence || 0).toFixed(2)),
      questionsAsked: state.answers.length,
      candidatesLeft: state.candidates.length,
      reasoning: state.currentQuestionReasoning || 'The model converged on the highest probability IPL profile.',
      summary: `${topPlayer?.name || 'Unknown'} best matches the remaining probability mass.`
    };
  };

  const snapshot = (state) => ({
    candidateCount: state.candidates.length,
    confidence: Number(state.confidence.toFixed(2)),
    questionsAsked: state.answers.length,
    progress: Math.min(100, Math.round((state.answers.length / 12) * 100)),
    eliminatedCount: Math.max(0, catalog.length - state.candidates.length),
    topCandidates: rankCandidates(state.candidates).slice(0, 5)
  });

  return {
    createState,
    nextQuestion,
    assignNextQuestion,
    applyAnswer,
    shouldGuess,
    buildGuess,
    snapshot
  };
}
