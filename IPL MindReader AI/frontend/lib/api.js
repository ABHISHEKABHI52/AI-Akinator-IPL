const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001';

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  return response.json();
}

export const api = {
  startGame: () => request('/api/game/start', { method: 'POST', body: JSON.stringify({}) }),
  submitAnswer: (payload) => request('/api/game/answer', { method: 'POST', body: JSON.stringify(payload) }),
  submitFeedback: (payload) => request('/api/game/feedback', { method: 'POST', body: JSON.stringify(payload) }),
  getAnalytics: () => request('/api/game/analytics'),
  getDatasetStats: () => request('/api/admin/dataset'),
  getAdminHealth: () => request('/api/admin/health')
};
