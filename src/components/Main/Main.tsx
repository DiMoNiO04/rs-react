import React, { useEffect, useState } from 'react';
import Search from '../Serch/Searh';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import { ICardProps } from '../Card/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [searchParams, setSearchParams] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (searchParams?: string): Promise<void> => {
    setIsLoading(true);

    try {
      const cards = await Api.fetchData(searchParams);
      setCards(cards);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchParams: string): void => {
    setSearchParams(searchParams);
    fetchData(searchParams);
  };

  return (
    <>
      <Search searchParams={searchParams} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} />
    </>
  );
};

export default Main;
