import React, { useEffect, useState } from 'react';
import styles from './details.module.scss';
import { IDetailsProps, IDetailsFetch, EDetailesData } from './types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';

const Details: React.FC<IDetailsProps> = ({ id, isOpen, onClose }) => {
  const [data, setData] = useState<IDetailsFetch | null>(null);
  const [films, setFilms] = useState<string[]>([]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.details)) {
      onClose();
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id: string): Promise<void> => {
    try {
      const data = await Api.fetchDataPerson(id);
      setData(data);

      const filmData = data.films.map((url: string) => Api.fetchDataFilm(url));
      const filmsPerson = await Promise.all(filmData);
      setFilms(filmsPerson.map((film) => film.title));
    } catch (err) {
      console.log(`${ETextError.FETCH_ERR} ${err}`);
    }
  };

  if (!isOpen || !data) return null;

  const detailsData = [
    { title: EDetailesData.NAME, value: data.name },
    { title: EDetailesData.HEIGHT, value: data.height },
    { title: EDetailesData.MASS, value: data.mass },
    { title: EDetailesData.BIRTH_YEAR, value: data.birth_year },
    { title: EDetailesData.GENDER, value: data.gender },
    { title: EDetailesData.EYE_COLOR, value: data.eye_color },
    { title: EDetailesData.HAIR_COLOR, value: data.hair_color },
    { title: EDetailesData.FILMS, value: films.join(', ') },
  ];

  return (
    <section className={styles.details} onClick={handleOutsideClick}>
      <div className={styles.container}>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        <h2 className={styles.title}>Details for #{id}</h2>
        <ul className={styles.list}>
          {detailsData.map((detail) => (
            <li key={detail.title} className={styles.block}>
              <b>{detail.title}</b>
              <p>{detail.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Details;
