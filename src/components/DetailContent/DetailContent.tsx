'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '../Loading/Loading';
import DetailInfo from '../DetailInfo/DetailInfo';
import { useFetchCardPersonQuery } from '../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setDetailId } from '../../store/detail/slice';
import { selectorGetDetailId, selectorGetIsOpenBlock } from '../../store/detail/selectors';
import { EMPTY_STR } from '../../utils/consts';
import styles from './detailContent.module.scss';
import { EDetailData } from './types';
import { EStorageKeys } from '../../utils/localeStorage';

const DetailContent = () => {
  const searchParams = useSearchParams();
  const detailQuery = searchParams && searchParams.get(EStorageKeys.DETAIL);

  const dispatch = useAppDispatch();
  const detail = useAppSelector(selectorGetDetailId());
  const isOpenBlock = useAppSelector(selectorGetIsOpenBlock());

  const { data, isFetching } = useFetchCardPersonQuery(detail);

  useEffect(() => {
    if (detailQuery) {
      dispatch(setDetailId(detailQuery));
    } else {
      dispatch(setDetailId(EMPTY_STR));
    }
  }, [detailQuery, dispatch]);

  const handleClickClose = (): void => {
    dispatch(setDetailId(EMPTY_STR));
  };

  if (isFetching && isOpenBlock) {
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

export default DetailContent;
