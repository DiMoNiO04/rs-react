import React from 'react';
import styles from './Cards.module.scss';
import { useAppSelector } from '../../store/store';
import { getDataFormHookData, getDataFormNoControl } from '../../store/form/selectors';
import Card from '../Card/Card';

const Cards: React.FC = () => {
  const dataFormNoControl = useAppSelector(getDataFormNoControl());
  const dataFormHookData = useAppSelector(getDataFormHookData());

  if (dataFormHookData.length === 0 && dataFormNoControl.length === 0) return null;

  return (
    <div className="container">
      <div className={styles.cards}>
        {dataFormNoControl.length > 0 && (
          <>
            <h2 className={styles.title}>Datas from Form No control</h2>
            <div className={styles.block}>
              {dataFormNoControl.map((card) => (
                <Card key={card.email} {...card} />
              ))}
            </div>
          </>
        )}
        {dataFormHookData.length > 0 && (
          <>
            <h2 className={styles.title}>Datas from form React Hook Form</h2>
            <div className={styles.block}>
              {dataFormHookData.map((card) => (
                <Card key={card.email} {...card} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
