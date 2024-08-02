import { EStorageKeys } from '../hooks/useLocaleStorage';
import { FIRST_PAGE } from './consts';
import { getDataStorage, isClient } from './localeStorage';

const getInitialPage = (): number => {
  if (!isClient) {
    return FIRST_PAGE;
  }

  const params = new URLSearchParams(window.location.search);
  return (params.get(EStorageKeys.PAGE) || getDataStorage(EStorageKeys.PAGE) || FIRST_PAGE) as number;
};

export default getInitialPage;
