import React, { ChangeEvent, useContext, useState } from 'react';
import { ISearchProps } from './types';
import styles from './search.module.scss';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useRouter } from 'next/router';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';

const SearchComponent: React.FC<ISearchProps> = ({ isFetching }) => {
  const theme = useContext(ThemeContext);

  const router = useRouter();
  const { search } = router.query;
  const searchParam = search ? search : EMPTY_STR;
  const [inputValue, setInputValue] = useState(searchParam);

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearchAction = (): void => {
    setInputValue(inputValue);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: inputValue, page: FIRST_PAGE },
    });
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
