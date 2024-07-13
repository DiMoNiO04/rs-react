import { useEffect, useState } from 'react';

export enum ELocaleKeys {
  SEARCH = 'searchParam',
  PAGE = 'pageParam',
}

export const useLocaleStorage = (key: ELocaleKeys, initialValue: string | number) => {
  const getInitialStorageValue = () => {
    const lsValue = localStorage.getItem(key);
    return lsValue !== null ? JSON.parse(lsValue) : initialValue;
  };

  const [storageValue, setStorageValue] = useState(getInitialStorageValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue];
};

export default useLocaleStorage;
