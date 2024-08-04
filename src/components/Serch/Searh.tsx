'use client';

import React, { ChangeEvent, useContext, useState } from 'react';
import { ISearchProps } from './types';
import styles from './search.module.scss';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useAppSelector } from '../../store/store';
import { selectorCurrentSearch } from '../../store/search/selectors';

const SearchComponent: React.FC<ISearchProps> = ({ handleSearch, isFetching }) => {
  const theme = useContext(ThemeContext);
  const searchParam = useAppSelector(selectorCurrentSearch());
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
        <h1>Search peoples for StarWars</h1>
        <div className={`${styles.search} ${theme === ETheme.DARK && styles.dark}`}>
          <div className={styles.block}>
            <input
              type="text"
              placeholder="Search peoples"
              value={inputValue}
              className={styles.input}
              onChange={changeInputValue}
            />
            <button disabled={isFetching} type="button" className={styles.button} onClick={handleSearchAction}>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;
