import React, { useContext } from 'react';
import styles from './detailsInfo.module.scss';
import { IDetailsInfoProps } from './types';
import ThemeContext, { ETheme } from '../../context/themeContext';

const DetailsInfo: React.FC<IDetailsInfoProps> = ({ id, handleClickClose, children }) => {
  const theme = useContext(ThemeContext);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.details)) {
      handleClickClose();
    }
  };

  return (
    <section className={`${styles.details} ${theme === ETheme.DARK && styles.dark}`} onClick={handleClickOutside}>
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

export default DetailsInfo;
