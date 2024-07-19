import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './detail.module.scss';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import Loading from '../../components/Loading/Loading';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import { EMPTY_STR } from '../../utils/consts';
import useLocaleStorage, { EStorageKeys } from '../../hooks/useLocaleStorage';
import { EDetailData, IDetailFetch } from './types';

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [params] = useSearchParams();
  const detailQuery = params.get(EStorageKeys.DETAILS);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IDetailFetch | null>(null);
  const [films, setFilms] = useState<string[]>([]);

  const [detailStorage, setDetailStorage] = useLocaleStorage(EStorageKeys.DETAILS);
  const [detail, setDetail] = useState<string>(detailQuery || detailStorage || EMPTY_STR);

  useEffect(() => {
    setDetailStorage(detail);
  }, []);

  useEffect(() => {
    if (detailQuery && detailQuery !== detail) {
      setDetail(detailQuery);
      setDetailStorage(detailQuery);
    } else if (!detailQuery && detailStorage) {
      setDetail(detailStorage);
    }
  }, [detailQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    detail ? params.set(EStorageKeys.DETAILS, detail) : params.delete(EStorageKeys.DETAILS);

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }

    if (detail) {
      fetchData(detail);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setData(null);
      setFilms([]);
    }
  }, [detail]);

  const fetchData = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await Api.fetchDataPerson(id);
      setData(data);

      const filmData = await Promise.all(data.films.map((url: string) => Api.fetchDataFilm(url)));
      const filmsPerson = filmData.map((film) => film.title);
      setFilms(filmsPerson);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickClose = (): void => {
    setIsOpen(false);
    setDetailStorage(EMPTY_STR);
    setDetail(EMPTY_STR);
  };

  if (isLoading && isOpen) {
    return (
      <DetailInfo id={detail} handleClickClose={handleClickClose}>
        <Loading />
      </DetailInfo>
    );
  }

  if (!data || !films || !isOpen) {
    return null;
  }

  const detailsData = [
    { title: EDetailData.NAME, value: data.name },
    { title: EDetailData.HEIGHT, value: data.height },
    { title: EDetailData.MASS, value: data.mass },
    { title: EDetailData.BIRTH_YEAR, value: data.birth_year },
    { title: EDetailData.GENDER, value: data.gender },
    { title: EDetailData.EYE_COLOR, value: data.eye_color },
    { title: EDetailData.HAIR_COLOR, value: data.hair_color },
    { title: EDetailData.FILMS, value: films.join(', ') },
  ];

  return (
    <DetailInfo id={detail} handleClickClose={handleClickClose}>
      <ul className={styles.list}>
        {detailsData.map((detail) => (
          <li key={detail.title} className={styles.block}>
            <b>{detail.title}</b>
            <p>{detail.value}</p>
          </li>
        ))}
      </ul>
    </DetailInfo>
  );
};

export default DetailPage;
