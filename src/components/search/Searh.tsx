import { Component } from 'react';

import './search.scss';

class Search extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="search">
            <div className="search__block">
              <input type="text" placeholder="Введите поисковой запрос" />
              <button type="button">Поиск</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
