import React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DetailInfo from '../DetailInfo/DetailInfo';
import styles from './detailContent.module.scss';
import { EDetailData, IDetailContentProps } from './types';
import { EStorageKeys, setDataStorage } from '../../utils/localeStorage';
import { EMPTY_STR } from '../../utils/consts';

const DetailContent: React.FC<IDetailContentProps> = ({ dataCard }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();

  const handleClickClose = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/?${params.toString()}`);
    setDataStorage(EStorageKeys.DETAIL, EMPTY_STR);
  };

  if (!dataCard || !id) return null;

  const detailsData = [
    { title: EDetailData.NAME, value: dataCard.name },
    { title: EDetailData.HEIGHT, value: dataCard.height },
    { title: EDetailData.MASS, value: dataCard.mass },
    { title: EDetailData.BIRTH_YEAR, value: dataCard.birth_year },
    { title: EDetailData.GENDER, value: dataCard.gender },
    { title: EDetailData.EYE_COLOR, value: dataCard.eye_color },
    { title: EDetailData.HAIR_COLOR, value: dataCard.hair_color },
  ];

  return (
    <DetailInfo id={String(id)} handleClickClose={handleClickClose}>
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
