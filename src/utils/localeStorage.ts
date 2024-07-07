import { STORAGE_KEY } from './consts';

export const getStorageValue = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};
