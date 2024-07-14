import React from 'react';
import Card from '../Card/Card';
import { IResultBlockProps } from './types';
import styles from './resultsBlock.module.scss';
import Loading from '../Loading/Loading';

const ResultsBlock: React.FC<IResultBlockProps> = ({ cards, isLoading, searchValue }) => {
  return (
    <section className="section">
      <div className="container">
        <div>
          <div className={styles.title}>
            Found peoples matching your request: <span>{searchValue || 'All'}</span>
          </div>

          {isLoading ? (
            <Loading />
          ) : cards.length === 0 ? (
            <div className={styles.none}>
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
