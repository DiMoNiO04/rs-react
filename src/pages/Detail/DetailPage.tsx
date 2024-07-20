import React, { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './detail.module.scss';
import Loading from '../../components/Loading/Loading';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { EDetailData } from './types';
import { useFetchCardPersonQuery } from '../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setDetailId } from '../../store/detail/slice';
import { selectorGetDetailId, selectorGetIsOpenBlock } from '../../store/detail/selectors';
import { EMPTY_STR } from '../../utils/consts';

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [params] = useSearchParams();
  const detailQuery = params.get(EStorageKeys.DETAIL);

  const dispatch = useAppDispatch();
  const detail = useAppSelector(selectorGetDetailId());
  const isOpenBlock = useAppSelector(selectorGetIsOpenBlock());

  const { data, isLoading } = useFetchCardPersonQuery(detail);

  useEffect(() => {
    if (detailQuery) {
      dispatch(setDetailId(detailQuery));
    } else {
      dispatch(setDetailId(EMPTY_STR));
    }
  }, [detailQuery, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    detail ? params.set(EStorageKeys.DETAIL, detail) : params.delete(EStorageKeys.DETAIL);

    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }
  }, [detail]);

  const handleClickClose = (): void => {
    dispatch(setDetailId(EMPTY_STR));
  };

  if (isLoading && isOpenBlock) {
    return (
      <DetailInfo id={detail} handleClickClose={handleClickClose}>
        <Loading />
      </DetailInfo>
    );
  }

  if (!data || !isOpenBlock) {
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
