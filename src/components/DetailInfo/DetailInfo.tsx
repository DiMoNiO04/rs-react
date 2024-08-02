'use client';

import React, { useContext } from 'react';
import styles from './detailInfo.module.scss';
import { IDetailInfoProps } from './types';
import ThemeContext, { ETheme } from '../../context/themeContext';

const DetailInfo: React.FC<IDetailInfoProps> = ({ id, handleClickClose, children }) => {
  const theme = useContext(ThemeContext);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.detail)) {
      handleClickClose();
    }
  };

  return (
    <section className={`${styles.detail} ${theme === ETheme.DARK && styles.dark}`} onClick={handleClickOutside}>
      <div className={styles.container}>
        <button className={styles.close} onClick={handleClickClose}>
          Close
        </button>
        <h2 className={styles.title}>Details for #{id}</h2>
        {children}
      </div>
    </section>
  );
};

export default DetailInfo;
