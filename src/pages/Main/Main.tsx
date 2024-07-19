import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import useLocaleStorage, { EStorageKeys } from '../../hooks/useLocaleStorage';
import SearchComponent from '../../components/Serch/Searh';
import { useFetchCardsQuery } from '../../store/api/api';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get(EStorageKeys.SEARCH);
  const pageQuery = queryParams.get(EStorageKeys.PAGE);

  const [pageStorage, setPageStorage] = useLocaleStorage(EStorageKeys.PAGE);
  const [page, setPage] = useState<string>(pageQuery || pageStorage || String(FIRST_PAGE));

  const [searchStorage, setSearchStorage] = useLocaleStorage(EStorageKeys.SEARCH);
  const [search, setSearch] = useState<string>(searchQuery || searchStorage || EMPTY_STR);

  const { data, isLoading } = useFetchCardsQuery({ searchParam: search, pageParam: Number(page) });

  useEffect(() => {
    setPageStorage(page);
    setSearchStorage(search);
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

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }
  }, [page, search]);

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
      <ResultsBlock cards={data?.results || []} isLoading={isLoading} searchValue={search} />
      {data?.count && <Pagination count={data.count} currentPage={Number(page)} onChangePage={handleChangePage} />}
      <Outlet />
    </>
  );
};

export default Main;
