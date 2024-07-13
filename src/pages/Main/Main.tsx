import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICardProps } from '../../components/Card/types';
import { IGetFetch } from '../../api/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import Search from '../../components/Serch/Searh';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import useLocaleStorage, { ELocaleKeys } from '../../hooks/useLocaleStorage';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [count, setCount] = useState<number>();

  const [searchParam, setSearchParam] = useLocaleStorage(ELocaleKeys.SEARCH, EMPTY_STR);
  const [pageParam, setPageParam] = useLocaleStorage(ELocaleKeys.PAGE, FIRST_PAGE);

  useEffect(() => {
    setSearchParam(searchParam || EMPTY_STR);
    setPageParam(pageParam || FIRST_PAGE);
  }, []);

  useEffect(() => {
    fetchData({ searchParam, pageParam });
  }, [searchParam, pageParam]);

  const fetchData = async ({ searchParam, pageParam }: IGetFetch): Promise<void> => {
    setIsLoading(true);

    const { stringParams } = Api.getFetchUrl({ searchParam, pageParam });
    navigate(`?${stringParams}`);

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
      <Search searchParam={searchParam} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} searchValue={searchParam} />
      {!isLoading && count && <Pagination count={count} currentPage={pageParam} onChangePage={handleChangePage} />}
    </>
  );
};

export default Main;
