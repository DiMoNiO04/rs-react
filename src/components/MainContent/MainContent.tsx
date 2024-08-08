'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import SearchComponent from '../Serch/Searh';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentPage, setTotalCount } from '../../store/pagination/slice';
import { selectorCurrentPage } from '../../store/pagination/selectors';
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
  const pageQuery = searchParams?.get(EStorageKeys.PAGE) || FIRST_PAGE;

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectorCurrentPage());
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
    if (pageQuery) {
      dispatch(setCurrentPage(Number(pageQuery)));
    } else {
      dispatch(setCurrentPage(FIRST_PAGE));
    }
  }, [pageQuery, dispatch]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(setCurrentSearch(searchQuery));
    } else {
      dispatch(setCurrentSearch(EMPTY_STR));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setTotalCount(data.count));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set(EStorageKeys.SEARCH, search);
    if (page) params.set(EStorageKeys.PAGE, String(page));

    router.push(`?${params.toString()}`);
  }, [page, search]);

  const handleSearch = (newSearch: string): void => {
    dispatch(setCurrentSearch(newSearch));
    dispatch(setCurrentPage(FIRST_PAGE));
  };

  return (
    <>
      <SearchComponent handleSearch={handleSearch} isFetching={isLoading} />
      <ResultsBlock cards={data?.results || []} searchValue={search} isFetching={isLoading} />
      {data?.count && !isLoading && <Pagination />}
      <Modal />
      {dataCard && <DetailContent dataCard={dataCard} />}
    </>
  );
};

export default MainContent;
