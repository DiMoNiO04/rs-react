'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import { EMPTY_STR } from '../../utils/consts';
import SearchComponent from '../Serch/Searh';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentSearch } from '../../store/search/slice';
import { selectorCurrentSearch } from '../../store/search/selectors';
import { EStorageKeys } from '../../utils/localeStorage';
import { Router } from 'next/router';
import { IMainContentProps } from './types';
import DetailContent from '../DetailContent/DetailContent';

const MainContent: React.FC<IMainContentProps> = ({ dataCard, data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get(EStorageKeys.SEARCH) || EMPTY_STR;

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectorCurrentSearch());

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const onLoading = () => setLoading(true);
    const offLoading = () => setLoading(false);

    Router.events.on('routeChangeStart', onLoading);
    Router.events.on('routeChangeComplete', offLoading);
    Router.events.on('routeChangeError', offLoading);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      dispatch(setCurrentSearch(searchQuery));
    } else {
      dispatch(setCurrentSearch(EMPTY_STR));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set(EStorageKeys.SEARCH, search);

    const id = Number(dataCard?.url.split('/').reverse()[1]);

    if (id) {
      router.push(`/card/${id}?${params.toString()}`);
    } else {
      router.push(`?${params.toString()}`);
    }
  }, [search]);

  const handleSearch = (newSearch: string): void => {
    dispatch(setCurrentSearch(newSearch));
  };

  return (
    <>
      <SearchComponent handleSearch={handleSearch} isFetching={isLoading} />
      <ResultsBlock cards={data?.results || []} searchValue={search} isFetching={isLoading} />
      {data?.count && !isLoading && <Pagination count={data.count} />}
      <Modal />
      {dataCard && <DetailContent dataCard={dataCard} />}
    </>
  );
};

export default MainContent;
