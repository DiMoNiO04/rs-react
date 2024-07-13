import { useEffect, useState } from 'react';
import { ETextError } from '../errors/types';

export enum ELocaleKeys {
  SEARCH = 'searchParam',
  PAGE = 'pageParam',
  DETAILS = 'detailsParam',
}

export const useLocaleStorage = (key: ELocaleKeys, initialValue: string | number) => {
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

  return [storageValue, setStorageValue];
};

export default useLocaleStorage;
