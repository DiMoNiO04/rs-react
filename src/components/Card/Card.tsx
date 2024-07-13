import React from 'react';
import { ECardData, ICardProps, IDataCard } from './types';
import styles from './card.module.scss';

const Card: React.FC<ICardProps> = ({ name, height, mass, birth_year, gender, url, handleClickCard }) => {
  const dataCard: IDataCard[] = [
    { title: ECardData.NAME, value: name },
    { title: ECardData.HEIGHT, value: height },
    { title: ECardData.MASS, value: mass },
    { title: ECardData.BIRTH_DAY, value: birth_year },
    { title: ECardData.GENDER, value: gender },
  ];

  const getId: number = Number(url.split('/').reverse()[1]);
  const clickCard = () => handleClickCard(getId);

  return (
    <li className={styles.card} onClick={clickCard}>
      {dataCard.map((item, index) => (
        <div className={styles.block} key={index}>
          <b>{item.title}</b>
          <p>{item.value}</p>
        </div>
      ))}
    </li>
  );
};

export default Card;
