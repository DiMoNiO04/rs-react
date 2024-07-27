import { EStorageKeys } from '../hooks/useLocaleStorage';
import { EMPTY_STR } from './consts';
import { getDataStorage } from './localeStorage';

const getInitialSearch = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(EStorageKeys.SEARCH) || getDataStorage(EStorageKeys.SEARCH) || EMPTY_STR;
};

export default getInitialSearch;
