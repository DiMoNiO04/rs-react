import React, { useEffect, useState } from 'react';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import { ICardProps } from '../Card/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import Pagination from '../Pagination/Pagination';
import Search from '../Serch/Searh';
import { IGetFetch } from '../../api/types';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [searchParams, setSearchParams] = useState<string>();
  const [pageParams, setPageParams] = useState<number>(1);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    fetchData({ searchParams, pageParams });
  }, [searchParams, pageParams]);

  const fetchData = async ({ searchParams, pageParams }: IGetFetch): Promise<void> => {
    setIsLoading(true);

    try {
      const { results, count } = await Api.fetchData({ searchParams, pageParams });
      setCards(results);
      setCount(count);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchParams: string): void => {
    setSearchParams(searchParams);
    setPageParams(1);
  };

  const handleChangePage = (page: number): void => {
    setPageParams(page);
  };

  return (
    <>
      <Search searchParams={searchParams} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} />
      {cards.length && <Pagination count={count} currentPage={pageParams} onChangePage={handleChangePage} />}
    </>
  );
};

export default Main;
