import React, { Suspense } from 'react';
import MainContent from '../components/MainContent/MainContent';
import fetchData from '../api/fetchData';
import { IFetchResponse } from '../api/types';
import { EStorageKeys } from '../utils/localeStorage';
import { EMPTY_STR, FIRST_PAGE } from '../utils/consts';
import Loading from '../components/Loading/Loading';

interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}

const Home = async ({ searchParams }: HomeProps) => {
  const searchParam = searchParams[EStorageKeys.SEARCH] || EMPTY_STR;
  const pageParam = searchParams[EStorageKeys.PAGE] || FIRST_PAGE;

  const fetchDataWrapper = async () => {
    try {
      return await fetchData(searchParam, Number(pageParam));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const data: IFetchResponse | null = await fetchDataWrapper();

  return (
    <Suspense fallback={<Loading />}>
      <MainContent data={data} />
    </Suspense>
  );
};

export default Home;
