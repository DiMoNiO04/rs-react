import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './detail.module.scss';
import Loading from '../../components/Loading/Loading';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import { EMPTY_STR } from '../../utils/consts';
import useLocaleStorage, { EStorageKeys } from '../../hooks/useLocaleStorage';
import { EDetailData } from './types';
import { useFetchCardPersonQuery } from '../../store/api/api';

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [params] = useSearchParams();
  const detailQuery = params.get(EStorageKeys.DETAIL);

  const [detailStorage, setDetailStorage] = useLocaleStorage(EStorageKeys.DETAIL);
  const [detail, setDetail] = useState<string>(detailQuery || detailStorage || EMPTY_STR);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading } = useFetchCardPersonQuery(detail);

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

    if (!detailQuery) {
      setIsOpen(false);
    }
  }, [detailQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    detail ? params.set(EStorageKeys.DETAIL, detail) : params.delete(EStorageKeys.DETAIL);

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }

    detail ? setIsOpen(true) : setIsOpen(false);
  }, [detail]);

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

  if (!data || !isOpen) {
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
