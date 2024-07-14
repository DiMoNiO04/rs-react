import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './details.module.scss';
import { EDetailesData, IDetailsFetch } from '../../components/Details/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import Loading from '../../components/Loading/Loading';
import DetailsInfo from '../../components/DetailsInfo/DetailsInfo';
import { EMPTY_STR } from '../../utils/consts';
import useLocaleStorage, { EStorageKeys } from '../../hooks/useLocaleStorage';

const DetailsPage: React.FC = () => {
  const [params] = useSearchParams();
  const id = params.get('details');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IDetailsFetch | null>(null);
  const [films, setFilms] = useState<string[]>([]);
  const [detailsParam, setDetailsParam] = useLocaleStorage(EStorageKeys.DETAILS, EMPTY_STR);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedDetailsParam = detailsParam || id;

    const params = new URLSearchParams(location.search);
    if (storedDetailsParam) params.append(EStorageKeys.DETAILS, storedDetailsParam);

    if (storedDetailsParam) {
      setIsOpen(true);
      fetchData(storedDetailsParam);
    } else {
      setIsOpen(false);
      setData(null);
      setFilms([]);
    }
  }, [id, detailsParam]);

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
    setDetailsParam(EMPTY_STR);
    localStorage.setItem(EStorageKeys.DETAILS, '');

    const currentParams = new URLSearchParams(params);
    currentParams.delete(EStorageKeys.DETAILS);
    navigate(`?${currentParams.toString()}`, { replace: true });
  };

  if (isLoading && isOpen) {
    return (
      <DetailsInfo id={id || EMPTY_STR} handleClickClose={handleClickClose}>
        <Loading />
      </DetailsInfo>
    );
  }

  if (!data || !films || !isOpen) {
    return null;
  }

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
    <DetailsInfo id={id || EMPTY_STR} handleClickClose={handleClickClose}>
      <ul className={styles.list}>
        {detailsData.map((detail) => (
          <li key={detail.title} className={styles.block}>
            <b>{detail.title}</b>
            <p>{detail.value}</p>
          </li>
        ))}
      </ul>
    </DetailsInfo>
  );
};

export default DetailsPage;
