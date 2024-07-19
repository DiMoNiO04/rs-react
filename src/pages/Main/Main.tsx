import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ICardProps } from '../../components/Card/types';
import { IGetFetch } from '../../api/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import useLocaleStorage, { EStorageKeys } from '../../hooks/useLocaleStorage';
import SearchComponent from '../../components/Serch/Searh';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get(EStorageKeys.SEARCH);
  const pageQuery = queryParams.get(EStorageKeys.PAGE);
  // const detailQuery = queryParams.get(EStorageKeys.DETAIL);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [count, setCount] = useState<number>();

  const [pageStorage, setPageStorage] = useLocaleStorage(EStorageKeys.PAGE);
  const [page, setPage] = useState<string>(pageQuery || pageStorage || String(FIRST_PAGE));

  const [searchStorage, setSearchStorage] = useLocaleStorage(EStorageKeys.SEARCH);
  const [search, setSearch] = useState<string>(searchQuery || searchStorage || EMPTY_STR);

  // const [detailStorage, setDetailStorage] = useLocaleStorage(EStorageKeys.DETAIL);
  // const [detail] = useState<string>(detailQuery || detailStorage || EMPTY_STR);

  useEffect(() => {
    setPageStorage(page);
    setSearchStorage(search);
    // setDetailStorage(detail);
  }, []);

  useEffect(() => {
    if (pageQuery && pageQuery !== page) {
      setPage(pageQuery);
      setPageStorage(pageQuery);
    } else if (!pageQuery && pageStorage) {
      setPage(pageStorage);
    }

    if (searchQuery && searchQuery !== search) {
      setSearch(searchQuery);
      setSearchStorage(searchQuery);
    } else if (!searchQuery && searchQuery) {
      setSearch(searchStorage);
    }
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    search ? params.set(EStorageKeys.SEARCH, search) : params.delete(EStorageKeys.SEARCH);
    page ? params.set(EStorageKeys.PAGE, page) : params.delete(EStorageKeys.PAGE);
    // detail ? params.set(EStorageKeys.DETAIL, detail) : params.delete(EStorageKeys.DETAIL);

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }

    fetchData({ searchParam: search, pageParam: Number(page) });
  }, [page, search]);

  const fetchData = async ({ searchParam, pageParam }: IGetFetch): Promise<void> => {
    setIsLoading(true);

    try {
      const { data } = await Api.fetchData({ searchParam, pageParam });
      setCards(data.results);
      setCount(data.count);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (newPage: string): void => {
    setPage(newPage);
    setPageStorage(newPage);
  };

  const handleSearch = (newSearch: string): void => {
    setSearch(newSearch);
    setSearchStorage(newSearch);
    setPage(String(FIRST_PAGE));
    setPageStorage(String(FIRST_PAGE));
  };

  return (
    <>
      <SearchComponent searchParam={search} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} searchValue={''} />
      {!isLoading && count && <Pagination count={count} currentPage={Number(page)} onChangePage={handleChangePage} />}
      <Outlet />
    </>
  );
};

export default Main;
