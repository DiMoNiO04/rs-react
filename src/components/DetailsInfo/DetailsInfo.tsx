import React from 'react';
import styles from './detailsInfo.module.scss';
import { IDetailsInfoProps } from './types';

const DetailsInfo: React.FC<IDetailsInfoProps> = ({ id, handleClickClose, children }) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.details)) {
      handleClickClose();
    }
  };

  return (
    <section className={styles.details} onClick={handleClickOutside}>
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
