'use client';

import React, { useEffect, useState } from 'react';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import SearchComponent from '../Serch/Searh';
import Modal from '../Modal/Modal';
import { Router } from 'next/router';
import { IMainContentProps } from './types';
import DetailContent from '../DetailContent/DetailContent';

const MainContent: React.FC<IMainContentProps> = ({ dataCard, data }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const onLoading = () => setLoading(true);
    const offLoading = () => setLoading(false);

    Router.events.on('routeChangeStart', onLoading);
    Router.events.on('routeChangeComplete', offLoading);
    Router.events.on('routeChangeError', offLoading);

    return () => {
      Router.events.off('routeChangeStart', onLoading);
      Router.events.off('routeChangeComplete', offLoading);
      Router.events.off('routeChangeError', offLoading);
    };
  }, []);

  return (
    <>
      <SearchComponent isFetching={isLoading} />
      <ResultsBlock cards={data?.results || []} isFetching={isLoading} />
      {data?.count && !isLoading && <Pagination count={data.count} />}
      <Modal />
      {dataCard && <DetailContent dataCard={dataCard} />}
    </>
  );
};

export default MainContent;
