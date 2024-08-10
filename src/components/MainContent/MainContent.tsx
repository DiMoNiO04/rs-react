'use client';

import React from 'react';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import { IMainContentProps } from './types';
import DetailContent from '../DetailContent/DetailContent';
import Search from '../Search/Search';

const MainContent: React.FC<IMainContentProps> = ({ dataCard, data }) => {
  const isLoading = false;

  return (
    <>
      <Search isFetching={isLoading} />
      <ResultsBlock cards={data?.results || []} isFetching={isLoading} />
      {data?.count && !isLoading && <Pagination count={data.count} />}
      <Modal />
      {dataCard && <DetailContent dataCard={dataCard} />}
    </>
  );
};

export default MainContent;
