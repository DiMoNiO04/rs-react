import React, { useEffect, useState } from 'react';
import Search from '../Serch/Searh';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import { ICardProps } from '../Card/types';
import { ETextError } from '../../utils/consts';
import Api from '../Api';
import styles from './main.module.scss';

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

  const throwError = (): void => {
    throw new Error(ETextError.TRIGGER_ERR);
  };

  const handleSearch = (searchParams: string): void => {
    setSearchParams(searchParams);
    fetchData(searchParams);
  };

  return (
    <>
      <Search searchParams={searchParams} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} />
      <section className="section">
        <div className="container">
          <button className={styles.errorBtn} onClick={throwError}>
            Trigger Error
          </button>
        </div>
      </section>
    </>
  );
};

export default Main;
