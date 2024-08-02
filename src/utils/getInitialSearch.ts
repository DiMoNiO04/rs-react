import { EStorageKeys } from '../hooks/useLocaleStorage';
import { EMPTY_STR } from './consts';
import { getDataStorage, isClient } from './localeStorage';

const getInitialSearch = (): string => {
  if (!isClient) {
    return EMPTY_STR;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get(EStorageKeys.SEARCH) || getDataStorage(EStorageKeys.SEARCH) || EMPTY_STR;
};

export default getInitialSearch;
