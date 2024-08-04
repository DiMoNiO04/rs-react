'use client';

import React, { useContext } from 'react';
import { ECardData, ICardProps, IDataCard } from './types';
import styles from './card.module.scss';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleFavorite } from '../../store/favorites/slice';
import { selectFavoriteCard } from '../../store/favorites/selectors';
import { setDetailId } from '../../store/detail/slice';
import { useRouter, useSearchParams } from 'next/navigation';

const Card: React.FC<ICardProps> = (props) => {
  const { name, height, mass, birth_year, gender, url } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const getId: number = Number(url.split('/').reverse()[1]);
  const isFavorite = useAppSelector(selectFavoriteCard(url));

  const dataCard: IDataCard[] = [
    { title: ECardData.NAME, value: name },
    { title: ECardData.HEIGHT, value: height },
    { title: ECardData.MASS, value: mass },
    { title: ECardData.BIRTH_DAY, value: birth_year },
    { title: ECardData.GENDER, value: gender },
  ];

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(EStorageKeys.DETAIL, getId.toString());
    router.push(`?${params.toString()}`);
    dispatch(setDetailId(getId.toString()));
  };

  const onChangeFavorite = () => {
    dispatch(toggleFavorite(props));
  };

  return (
    <li className={`${styles.card} ${theme === ETheme.DARK && styles.dark}`} data-id={getId} onClick={handleClick}>
      <div className={styles.checkbox}>
        <input type="checkbox" checked={isFavorite} onChange={onChangeFavorite} onClick={(e) => e.stopPropagation()} />
      </div>
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
