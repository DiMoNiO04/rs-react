import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICardProps } from '../../components/Card/types';
import { IGetFetch } from '../../api/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import Search from '../../components/Serch/Searh';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { FIRST_PAGE } from '../../utils/consts';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();

  const urlParamsSearch: string = urlParams.get('search') || '';
  const urlParamsPage: number = Number(urlParams.get('page')) || FIRST_PAGE;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [searchParam, setsearchParam] = useState<string>(urlParamsSearch);
  const [pageParam, setpageParam] = useState<number>(urlParamsPage);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    fetchData({ searchParam, pageParam });
  }, [searchParam, pageParam]);

  const fetchData = async ({ searchParam, pageParam }: IGetFetch): Promise<void> => {
    setIsLoading(true);

    try {
      const { data, stringParams } = await Api.fetchData({ searchParam, pageParam });
      setCards(data.results);
      setCount(data.count);
      navigate(`?${stringParams}`);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchParam: string): void => {
    setsearchParam(searchParam);
    setpageParam(FIRST_PAGE);
  };

  const handleChangePage = (page: number): void => {
    setpageParam(page);
  };

  return (
    <>
      <Search searchParam={searchParam} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} />
      {cards.length && <Pagination count={count} currentPage={pageParam} onChangePage={handleChangePage} />}
    </>
  );
};

export default Main;
