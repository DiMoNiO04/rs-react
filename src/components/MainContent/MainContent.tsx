'use client';

import React, { useEffect, useState } from 'react';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import { Router } from 'next/router';
import { IMainContentProps } from './types';
import DetailContent from '../DetailContent/DetailContent';
import Search from '../Search/Search';

const MainContent: React.FC<IMainContentProps> = ({ dataCard, data }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onLoading = () => setIsLoading(true);
    const offLoading = () => setIsLoading(false);

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
      <Search isFetching={isLoading} />
      <ResultsBlock cards={data?.results || []} isFetching={isLoading} />
      {data?.count && !isLoading && <Pagination count={data.count} />}
      <Modal />
      {dataCard && <DetailContent dataCard={dataCard} />}
    </>
  );
};

export default MainContent;
