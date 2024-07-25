import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { FIRST_PAGE } from '../../utils/consts';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import SearchComponent from '../../components/Serch/Searh';
import { useFetchCardsQuery } from '../../store/api/api';
import Modal from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentPage, setTotalCount } from '../../store/pagination/slice';
import { selectorCurrentPage } from '../../store/pagination/selectors';
import { setCurrentSearch } from '../../store/search/slice';
import { selectorCurrentSearch } from '../../store/search/selectors';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get(EStorageKeys.SEARCH);
  const pageQuery = queryParams.get(EStorageKeys.PAGE);

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
    if (pageQuery && Number(pageQuery) !== page) {
      dispatch(setCurrentPage(Number(pageQuery)));
    }

    if (searchQuery && searchQuery !== search) {
      dispatch(setCurrentSearch(searchQuery));
    }
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    search ? params.set(EStorageKeys.SEARCH, search) : params.delete(EStorageKeys.SEARCH);
    page ? params.set(EStorageKeys.PAGE, String(page)) : params.delete(EStorageKeys.PAGE);

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }
  }, [page, search]);

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
      <Outlet />
    </>
  );
};

export default Main;
