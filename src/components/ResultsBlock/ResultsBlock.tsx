import React from 'react';
import Card from '../Card/Card';
import { getStorageValue } from '../../utils/localeStorage';
import { IResultBlockProps } from './types';
import styles from './resultsBlock.module.scss';

const ResultsBlock: React.FC<IResultBlockProps> = ({ cards, isLoading }) => {
  const storageValue: string = getStorageValue() || 'ALL';

  return (
    <section className="section">
      <div className="container">
        <div>
          <div className={styles.title}>
            Found peoples matching your request: <span>{storageValue}</span>
          </div>

          {isLoading ? (
            <div className={styles.loader}>
              <img src="./loading.gif" alt="Loading..." />
            </div>
          ) : cards.length === 0 ? (
            <div className={styles.none}>
              No results were found for your request <span>{storageValue}</span>. Try again!
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
