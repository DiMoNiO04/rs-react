'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsBlock from '../components/ResultsBlock/ResultsBlock';
import Pagination from '../components/Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../utils/consts';
import { EStorageKeys } from '../hooks/useLocaleStorage';
import SearchComponent from '../components/Serch/Searh';
import { useFetchCardsQuery } from '../store/api/api';
import Modal from '../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCurrentPage, setTotalCount } from '../store/pagination/slice';
import { selectorCurrentPage } from '../store/pagination/selectors';
import { setCurrentSearch } from '../store/search/slice';
import { selectorCurrentSearch } from '../store/search/selectors';
import DetailPage from '../pages/Detail/DetailPage';

const Main: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get(EStorageKeys.SEARCH) || EMPTY_STR : EMPTY_STR;
  const pageQuery = searchParams ? searchParams.get(EStorageKeys.PAGE) || FIRST_PAGE : FIRST_PAGE;

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectorCurrentPage());
  const search = useAppSelector(selectorCurrentSearch());

  const { data, isFetching } = useFetchCardsQuery({ searchParam: search, pageParam: Number(page) });

  useEffect(() => {
    if (data) {
      dispatch(setTotalCount(data.count));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (Number(pageQuery) !== page) {
      dispatch(setCurrentPage(Number(pageQuery)));
    }

    if (searchQuery !== search) {
      dispatch(setCurrentSearch(searchQuery));
    }
  }, [searchQuery, pageQuery, dispatch, search, page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    search ? params.set(EStorageKeys.SEARCH, search) : params.delete(EStorageKeys.SEARCH);
    page ? params.set(EStorageKeys.PAGE, String(page)) : params.delete(EStorageKeys.PAGE);

    if (window.location.search !== `?${params.toString()}`) {
      router.push(`?${params.toString()}`);
    }
  }, [page, search, router]);

  const handleSearch = (newSearch: string): void => {
    dispatch(setCurrentSearch(newSearch));
    dispatch(setCurrentPage(FIRST_PAGE));
  };

  return (
    <>
      <SearchComponent handleSearch={handleSearch} isFetching={isFetching} />
      <ResultsBlock cards={data?.results || []} isFetching={isFetching} searchValue={search} />
      {data?.count && <Pagination />}
      <Modal />
      <DetailPage />
    </>
  );
};

export default Main;
