import { useEffect, useState } from 'react';
import { ETextError } from '../errors/types';

export enum EStorageKeys {
  SEARCH = 'search',
  PAGE = 'page',
  DETAILS = 'details',
}

export const useLocaleStorage = (key: EStorageKeys, initialValue: string | number) => {
  const getInitialStorageValue = () => {
    const lsValue = localStorage.getItem(key);
    if (lsValue !== null) {
      try {
        return JSON.parse(lsValue);
      } catch (error) {
        console.error(`${ETextError.LOCALSTORAGE_ERR} ${key}: ${error}`);
      }
    }
    return initialValue;
  };

  const [storageValue, setStorageValue] = useState(getInitialStorageValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue] as const;
};

export default useLocaleStorage;
