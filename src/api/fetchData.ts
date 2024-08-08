import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { API_URL, EMPTY_STR, FIRST_PAGE } from '../utils/consts';
import { EStorageKeys } from '../utils/localeStorage';
import { IFetchResponse } from './types';

async function fetchData(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<IFetchResponse | null> {
  let data: IFetchResponse | null = null;
  const searchParam = context.query[EStorageKeys.SEARCH] || EMPTY_STR;
  const pageParam = context.query[EStorageKeys.PAGE] || FIRST_PAGE;
  const params = new URLSearchParams();

  if (searchParam) params.set(EStorageKeys.SEARCH, searchParam.toString().trim());
  if (pageParam) params.set(EStorageKeys.PAGE, pageParam.toString());

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
