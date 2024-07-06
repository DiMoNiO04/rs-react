import { Component } from 'react';

import Card from './Card';
import Pagination from './Pagination';

class ResultsBlock extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="results">
            <div className="results__title">
              Found <span>5</span> people matching your request: <span>Lur</span>
            </div>
            <ul className="results__list">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </ul>
            <Pagination />
          </div>
        </div>
      </section>
    );
  }
}

export default ResultsBlock;
