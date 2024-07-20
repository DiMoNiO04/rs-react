import { EStorageKeys } from '../hooks/useLocaleStorage';

const getFavoritesFromLs = () => {
  const data = localStorage.getItem(EStorageKeys.FAVORITES);
  const items = data ? JSON.parse(data) : [];

  return items;
};

export default getFavoritesFromLs;
