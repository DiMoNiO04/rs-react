import React from 'react';
import styles from './details.module.scss';
import { IDetailsProps } from './types';

const Details: React.FC<IDetailsProps> = ({ isOpen, onClose }) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.details)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <section className={styles.details} onClick={handleOutsideClick}>
      <div className={styles.container}>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        <h2 className={styles.title}>Details for #33</h2>
        {/* Здесь можно добавить другие детали */}
      </div>
    </section>
  );
};

export default Details;
