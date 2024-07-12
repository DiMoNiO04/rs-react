import React, { ChangeEvent, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../../utils/consts';
import { getStorageValue } from '../../utils/localeStorage';
import { ISearchProps } from './types';
import styles from './search.module.scss';

const Search: React.FC<ISearchProps> = ({ searchParams, handleSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>(searchParams || '');

  useEffect(() => {
    const storageValue: string | null = getStorageValue();
    if (storageValue !== null) {
      setInputValue(storageValue);
    }
  }, []);

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearchAction = (): void => {
    setInputValue(inputValue.trim());
    localStorage.setItem(STORAGE_KEY, inputValue);
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
