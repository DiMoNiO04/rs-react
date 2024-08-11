import React, { useEffect, useState } from 'react';
import styles from './BtnTheme.module.scss';
import { ETheme } from '../../context/themeContext';
import { IBtnTheme } from './types';

const BtnTheme: React.FC<IBtnTheme> = ({ theme, onClick }) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
