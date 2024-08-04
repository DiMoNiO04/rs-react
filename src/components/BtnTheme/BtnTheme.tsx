'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './BtnTheme.module.scss';
import { ETheme } from '../../context/themeContext';
import { toggleTheme } from '../../store/theme/slice';
import { RootState, useAppDispatch } from '../../store/store';

const BtnTheme: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.body;
    if (theme === ETheme.DARK) {
      body.classList.add(ETheme.DARK);
    } else {
      body.classList.remove(ETheme.DARK);
    }
  }, [theme]);

  return (
    <div className={`${styles.block} ${theme === ETheme.DARK && styles.dark}`}>
      <p className={styles.text}>Currently using: {theme === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT} theme</p>
      <button type="button" className={styles.btn} onClick={() => dispatch(toggleTheme())}>
        {theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK} theme
      </button>
    </div>
  );
};

export default BtnTheme;
