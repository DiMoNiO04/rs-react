import React, { useContext } from 'react';
import styles from './pagination.module.scss';
import { FIRST_PAGE } from '../../utils/consts';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { IPaginationProps } from './types';
import { useRouter, useSearchParams } from 'next/navigation';
import { EStorageKeys } from '../../utils/localeStorage';

const Pagination: React.FC<IPaginationProps> = ({ count }) => {
  const theme = useContext(ThemeContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get(EStorageKeys.PAGE) || FIRST_PAGE;
  const totalPage = Math.ceil(Number(count) / 10);

  const handlePrev = () => {
    if (Number(currentPage) > FIRST_PAGE) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', (Number(currentPage) - 1).toString());
      const newPath = `/?${params.toString()}`;
      router.push(newPath);
    }
  };

  const handleNext = () => {
    if (Number(currentPage) < totalPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', (Number(currentPage) + 1).toString());
      const newPath = `/?${params.toString()}`;
      router.push(newPath);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.pagination} ${theme === ETheme.DARK && styles.dark}`}>
          <div className={styles.title}>
            <div className={styles.titlePage}>Page:</div>
            <div className={styles.titleNumbers}>
              <span>{currentPage && currentPage}</span>
              <span>/</span>
              <span>{totalPage && totalPage}</span>
            </div>
          </div>
          <div className={styles.btns}>
            <button
              type="button"
              data-testid="btn-prev"
              className={styles.btn}
              onClick={handlePrev}
              disabled={+currentPage === FIRST_PAGE}
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 19L9 12L16 5"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              data-testid="btn-next"
              className={styles.btn}
              onClick={handleNext}
              disabled={+currentPage === totalPage}
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19L16 12L9 5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
