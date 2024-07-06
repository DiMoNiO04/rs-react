import { Component } from 'react';

import Card from './Card';

class ResultsBlock extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <ul className="results-list">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </ul>
        </div>
      </section>
    );
  }
}

export default ResultsBlock;
