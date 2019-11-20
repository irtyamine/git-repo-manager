let store = {};
export const MockLocalStorage = {
  getItem(key: string) {
    return key in store ? store[key] : null;
  },

  setItem(key: string, value: string) {
    store[key] = `${value}`;
  },

  removeItem(key: string) {
    delete store[key];
  },

  clear(): void {
    store = {};
  }
};
