const store = new Map();

export const sessionStore = {
  get(sessionId) {
    return store.get(sessionId);
  },
  set(sessionId, value) {
    store.set(sessionId, value);
  },
  delete(sessionId) {
    store.delete(sessionId);
  },
  values() {
    return Array.from(store.values());
  }
};
