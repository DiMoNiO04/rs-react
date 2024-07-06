import { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Star Wars people search</h1>
          <div className="search">
            <div className="search__block">
              <input type="text" placeholder="Search by people" />
              <button type="button">Search</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
