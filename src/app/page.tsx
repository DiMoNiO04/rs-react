import React from 'react';
import MainContent from '../components/MainContent/MainContent';
import fetchData from '../api/fetchData';
import { IFetchResponse } from '../api/types';
import { EStorageKeys } from '../utils/localeStorage';
import { EMPTY_STR, FIRST_PAGE } from '../utils/consts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'Star Wars Search description',
};

interface IPageProps {
  searchParams: { [key: string]: string | undefined };
}

const Home = async ({ searchParams }: IPageProps) => {
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

  return <MainContent data={data} />;
};

export default Home;
