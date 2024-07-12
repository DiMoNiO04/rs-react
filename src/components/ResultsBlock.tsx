import { Component, ReactNode } from 'react';
import Card from './Card/Card';
import { getStorageValue } from '../utils/localeStorage';
import { ICardProps } from './Card/types';

interface IResultBlockProps {
  cards: ICardProps[];
  isLoading: boolean;
}

class ResultsBlock extends Component<IResultBlockProps> {
  constructor(props: IResultBlockProps) {
    super(props);
  }

  getRequestData(): string {
    return getStorageValue() || 'ALL';
  }

  render(): ReactNode {
    const { cards, isLoading } = this.props;

    return (
      <section className="section">
        <div className="container">
          <div className="results">
            <div className="results__title">
              Found peoples matching your request: <span>{this.getRequestData()}</span>
            </div>

            {isLoading ? (
              <div className="results__loader">
                <img src="./loading.gif" alt="Loading..." />
              </div>
            ) : cards.length === 0 ? (
              <div className="results__none">
                No results were found for your request <span>{this.getRequestData()}</span>. Try again!
              </div>
            ) : (
              <ul className="results__list">
                {cards.map((card) => (
                  <Card key={card.name} {...card} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default ResultsBlock;
