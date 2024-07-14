import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [count, setCount] = useState<number>();

  const [searchParam, setSearchParam] = useLocaleStorage(EStorageKeys.SEARCH, EMPTY_STR);
  const [pageParam, setPageParam] = useLocaleStorage(EStorageKeys.PAGE, FIRST_PAGE);
  const [detailsParam] = useLocaleStorage(EStorageKeys.DETAILS, EMPTY_STR);

  useEffect(() => {
    fetchData({ searchParam, pageParam });
  }, [searchParam, pageParam]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchParam) params.append(EStorageKeys.SEARCH, searchParam);
    if (pageParam && pageParam !== FIRST_PAGE) params.append(EStorageKeys.PAGE, pageParam.toString());
    if (detailsParam) params.append(EStorageKeys.DETAILS, detailsParam);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchParam, pageParam]);

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

  const handleSearch = (searchParam: string): void => {
    setSearchParam(searchParam);
    setPageParam(FIRST_PAGE);
  };

  const handleChangePage = (page: number): void => {
    setPageParam(page);
  };

  return (
    <>
      <SearchComponent searchParam={searchParam} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} searchValue={searchParam} />
      {!isLoading && count && <Pagination count={count} currentPage={pageParam} onChangePage={handleChangePage} />}
      <Outlet />
    </>
  );
};

export default Main;
