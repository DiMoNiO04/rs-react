import { API_URL, EMPTY_STR, FIRST_PAGE } from '../utils/consts';
import { EStorageKeys } from '../utils/localeStorage';
import { IFetchResponse } from './types';

async function fetchData(
  searchParam: string = EMPTY_STR,
  pageParam: number = FIRST_PAGE
): Promise<IFetchResponse | null> {
  let data: IFetchResponse | null = null;
  const params = new URLSearchParams();

  if (searchParam) params.set(EStorageKeys.SEARCH, searchParam.trim());
  if (pageParam) params.set(EStorageKeys.PAGE, String(pageParam));

  try {
    const dataRes = await fetch(`${API_URL}?${params.toString()}`);
    if (dataRes.ok) {
      data = await dataRes.json();
    } else {
      console.error('Failed to fetch data');
    }
  } catch (e) {
    console.error('Error fetching data', e);
  }

  return data;
}

export default fetchData;
