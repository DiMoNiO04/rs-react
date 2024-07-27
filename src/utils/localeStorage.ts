import { EStorageKeys } from '../hooks/useLocaleStorage';

export const setDataStorage = (key: EStorageKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const removeDataStorage = (key: EStorageKeys) => {
  localStorage.removeItem(key);
};

export const getDataStorage = (key: EStorageKeys) => {
  return localStorage.getItem(key);
};
