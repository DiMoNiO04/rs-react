export enum EStorageKeys {
  SEARCH = 'search',
  PAGE = 'page',
  DETAIL = 'detail',
  THEME = 'theme',
  FAVORITES = 'favorites',
}

export const isClient = typeof window !== 'undefined';

export const setDataStorage = (key: EStorageKeys, value: string) => {
  if (isClient) localStorage.setItem(key, value);
};

export const removeDataStorage = (key: EStorageKeys) => {
  if (isClient) localStorage.removeItem(key);
};

export const getDataStorage = (key: EStorageKeys) => {
  return isClient ? localStorage.getItem(key) : null;
};
