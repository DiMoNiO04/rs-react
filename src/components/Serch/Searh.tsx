import React, { ChangeEvent, useState } from 'react';
import { ISearchProps } from './types';
import styles from './search.module.scss';

const Search: React.FC<ISearchProps> = ({ searchParam, handleSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState(searchParam);

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearchAction = (): void => {
    setInputValue(inputValue.trim());
    handleSearch(inputValue);
  };

  return (
    <section className="section">
      <div className="container">
        <h1>Search peoples for Star Wars</h1>
        <div className={styles.search}>
          <div className={styles.block}>
            <input
              type="text"
              placeholder="Search peoples"
              value={inputValue}
              className={styles.input}
              onChange={(event) => changeInputValue(event)}
            />
            <button disabled={isLoading} type="button" className={styles.button} onClick={handleSearchAction}>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
