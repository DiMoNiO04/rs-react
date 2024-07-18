import React from 'react';
import styles from './BtnTheme.module.scss';
import { ETheme } from '../../context/themeContext';
import { IBtnTheme } from './types';

const BtnTheme: React.FC<IBtnTheme> = ({ theme, onClick }) => {
  return (
    <div className={styles.block}>
      <p className={styles.text}>Сейчас используется: {theme === ETheme.DARK ? 'Темная' : 'Светлая'} тема</p>
      <button type="button" className={styles.btn} onClick={onClick}>
        {theme === ETheme.DARK ? 'Светлая' : 'Темная'} тема
      </button>
    </div>
  );
};

export default BtnTheme;
