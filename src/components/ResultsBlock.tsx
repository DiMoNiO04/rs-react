import { Component } from 'react';
import Card, { ICardProps } from './Card';
import { getStorageValue } from '../utils/localeStorage';

interface IResultBlockProps {
  cards: ICardProps[];
}

class ResultsBlock extends Component<IResultBlockProps> {
  constructor(props: IResultBlockProps) {
    super(props);
  }

  getRequestData(): string {
    const storageValue: string | null = getStorageValue();
    return storageValue !== null && storageValue !== '' ? storageValue : 'ALL';
  }

  render() {
    const { cards } = this.props;

    return (
      <section className="section">
        <div className="container">
          <div className="results">
            <div className="results__title">
              Found peoples matching your request: <span>{this.getRequestData()}</span>
            </div>
            {cards.length !== 0 && (
              <ul className="results__list">
                {cards.map((card) => (
                  <Card key={card.name} {...card} />
                ))}
              </ul>
            )}
            <div className="results__none" style={{ display: 'none' }}>
              No results were found for your request <span>Dima</span>. Try again!
            </div>
            {cards.length === 0 && (
              <div className="results__loader">
                <img src="./loading.gif" alt="Loading..." />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default ResultsBlock;
