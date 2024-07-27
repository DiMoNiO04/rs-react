import { EStorageKeys } from '../hooks/useLocaleStorage';
import { getDataStorage } from './localeStorage';

const getFavoritesFromLs = () => {
  const data = getDataStorage(EStorageKeys.FAVORITES);
  const items = data ? JSON.parse(data) : [];

  return items;
};

export default getFavoritesFromLs;
