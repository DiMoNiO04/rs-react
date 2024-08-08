import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ECardData, ICardProps, IDataCard } from './types';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleFavorite } from '../../store/favorites/slice';
import { selectFavoriteCard } from '../../store/favorites/selectors';
import styles from './card.module.scss';
import { EStorageKeys, setDataStorage } from '../../utils/localeStorage';

const Card: React.FC<ICardProps> = (props) => {
  const { name, height, mass, birth_year, gender, url } = props;
  const router = useRouter();
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

  const handleClick = () => setDataStorage(EStorageKeys.DETAIL, getId.toString());
  const onChangeFavorite = () => dispatch(toggleFavorite(props));

  return (
    <li data-id={getId}>
      <Link
        href={{
          pathname: `/card/${getId}`, // динамический сегмент с явным значением
          query: { ...router.query, id: getId }, // добавляем текущие query параметры
        }}
        onClick={handleClick}
        className={`${styles.card} ${theme === ETheme.DARK && styles.dark}`}
      >
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={onChangeFavorite}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {dataCard.map((item, index) => (
          <div className={styles.block} key={index}>
            <b>{item.title}</b>
            <p>{item.value}</p>
          </div>
        ))}
      </Link>
    </li>
  );
};

export default Card;
