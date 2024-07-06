import { Component } from 'react';

import Card from './Card';

class ResultsBlock extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="results">
            <div className="results__title">
              Found peoples matching your request: <span>Lur</span>
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
            <div className="results__none" style={{ display: 'none' }}>
              No results were found for your request <span>Dima</span>. Try again!
            </div>
            <div className="results__loader" style={{ display: 'none' }}>
              <img src="./loading.gif" alt="Loading..." />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ResultsBlock;
