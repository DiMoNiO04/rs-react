import { EStorageKeys } from '../hooks/useLocaleStorage';
import { EMPTY_STR } from './consts';

const getInitialDetailId = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(EStorageKeys.DETAIL) || localStorage.getItem(EStorageKeys.DETAIL) || EMPTY_STR;
};

export default getInitialDetailId;
