import { useEffect, useState } from 'react';

export enum EStorageKeys {
  SEARCH = 'search',
  PAGE = 'page',
  DETAIL = 'detail',
  THEME = 'theme',
  FAVORITES = 'favorites',
}

const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? item : '';
  } catch (e) {
    console.error(e);
    return '';
  }
};

const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => getItem(key));

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
