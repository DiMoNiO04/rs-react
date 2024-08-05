'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import SearchComponent from '../Serch/Searh';
import { useFetchCardsQuery } from '../../store/api/api';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentPage, setTotalCount } from '../../store/pagination/slice';
import { selectorCurrentPage } from '../../store/pagination/selectors';
import { setCurrentSearch } from '../../store/search/slice';
import { selectorCurrentSearch } from '../../store/search/selectors';
import DetailPage from '../../pages/detail';
import { EStorageKeys } from '../../utils/localeStorage';
import { selectorGetDetailId } from '../../store/detail/selectors';

const MainContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams && searchParams.get(EStorageKeys.SEARCH);
  const pageQuery = searchParams && searchParams.get(EStorageKeys.PAGE);

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectorCurrentPage());
  const search = useAppSelector(selectorCurrentSearch());
  const detail = useAppSelector(selectorGetDetailId());

  const { data, isFetching } = useFetchCardsQuery({ searchParam: search, pageParam: Number(page) });

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
    const params = new URLSearchParams(window.location.search);
    search ? params.set(EStorageKeys.SEARCH, search) : params.delete(EStorageKeys.SEARCH);
    page ? params.set(EStorageKeys.PAGE, String(page)) : params.delete(EStorageKeys.PAGE);
    detail ? params.set(EStorageKeys.DETAIL, detail) : params.delete(EStorageKeys.DETAIL);

    router.push(`?${params.toString()}`);
  }, [page, search, detail, router]);

  const handleSearch = (newSearch: string): void => {
    dispatch(setCurrentSearch(newSearch));
    dispatch(setCurrentPage(FIRST_PAGE));
  };

  return (
    <>
      <SearchComponent handleSearch={handleSearch} isFetching={isFetching} />
      <ResultsBlock cards={data?.results || []} isFetching={isFetching} searchValue={search} />
      {data?.count && !isFetching && <Pagination />}
      <Modal />
      <DetailPage />
    </>
  );
};

export default MainContent;
