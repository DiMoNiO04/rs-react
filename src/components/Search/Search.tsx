import React, { ChangeEvent, useContext, useState } from 'react';
import { ISearchProps } from './types';
import styles from './search.module.scss';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import { EStorageKeys } from '../../utils/localeStorage';

const Search: React.FC<ISearchProps> = ({ isFetching }) => {
  const theme = useContext(ThemeContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(EStorageKeys.SEARCH) || EMPTY_STR;
  const [inputValue, setInputValue] = useState(searchParam);

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearchAction = (): void => {
    setInputValue(inputValue);

    const params = new URLSearchParams(searchParams.toString());

    if (inputValue) {
      params.set(EStorageKeys.SEARCH, inputValue);
    } else {
      params.delete(EStorageKeys.SEARCH);
    }
    params.set('page', FIRST_PAGE.toString());

    const newPath = `/?${params.toString()}`;
    router.push(newPath);
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

export default Search;
