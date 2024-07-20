import { EStorageKeys } from '../hooks/useLocaleStorage';
import { EMPTY_STR } from './consts';
import { getDataStorage } from './localeStorage';

const getInitialDetailId = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(EStorageKeys.DETAIL) || getDataStorage(EStorageKeys.DETAIL) || EMPTY_STR;
};

export default getInitialDetailId;
