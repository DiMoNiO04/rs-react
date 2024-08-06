'use client';

import React, { useContext, useEffect, useState } from 'react';
import Card from '../Card/Card';
import { IResultBlockProps } from './types';
import styles from './resultsBlock.module.scss';
import Loading from '../Loading/Loading';
import ThemeContext, { ETheme } from '../../context/themeContext';

const ResultsBlock: React.FC<IResultBlockProps> = ({ cards, isFetching, searchValue }) => {
  const theme = useContext(ThemeContext);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [clientSearchValue, setClientSearchValue] = useState(searchValue || 'All');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setClientSearchValue(searchValue || 'All');
  }, [searchValue]);

  return (
    <section className="section">
      <div className="container">
        <div>
          {isClient && (
            <div className={`${styles.title} ${theme === ETheme.DARK && styles.dark}`}>
              Found peoples matching your request: <span>{clientSearchValue}</span>
            </div>
          )}

          {isFetching ? (
            <Loading />
          ) : cards.length === 0 ? (
            <div className={`${styles.none} ${theme === ETheme.DARK && styles.dark}`}>
              No results were found for your request <span>{searchValue}</span>. Try again!
            </div>
          ) : (
            <ul className={styles.list}>
              {cards.map((card) => (
                <Card key={card.name} {...card} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultsBlock;
