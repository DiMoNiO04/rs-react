import React from 'react';
import styles from './Cards.module.scss';
import { useAppSelector } from '../../store/store';
import { getDataFormHookData, getDataFormNoControl } from '../../store/form/selectors';

const Cards: React.FC = () => {
  const dataFormNoControl = useAppSelector(getDataFormNoControl());
  const dataFormHookData = useAppSelector(getDataFormHookData());

  return (
    <div className={styles.cards}>
      {dataFormNoControl.length > 0 && (
        <>
          <h2 className={styles.title}>Datas from Form No control</h2>
          <div className={styles.block}></div>
        </>
      )}
      {dataFormHookData.length > 0 && (
        <>
          <h2 className={styles.title}>Datas from form React Hook Form</h2>
          <div className={styles.block}></div>
        </>
      )}
    </div>
  );
};

export default Cards;
