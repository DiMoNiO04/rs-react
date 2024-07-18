import React from 'react';
import styles from './BtnTheme.module.scss';
import { ETheme } from '../../context/themeContext';
import { IBtnTheme } from './types';

const BtnTheme: React.FC<IBtnTheme> = ({ theme, onClick }) => {
  return (
    <div className={`${styles.block} ${theme === ETheme.DARK && styles.dark}`}>
      <p className={styles.text}>Currently using: {theme === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT} theme</p>
      <button type="button" className={styles.btn} onClick={onClick}>
        {theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK} theme
      </button>
    </div>
  );
};

export default BtnTheme;
