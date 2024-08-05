import React from 'react';
import MainContent from '../components/MainContent/MainContent';
import Head from 'next/head';

const Main: React.FC = () => {
  return (
    <>
      <Head>
        <title>Star Wars Search</title>
        <meta name="description" content="App Star Wars Search" />
      </Head>
      <MainContent />
    </>
  );
};

export default Main;
