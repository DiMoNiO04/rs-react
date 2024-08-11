import React from 'react';
import Head from 'next/head';
import NotFoundContent from '../components/NotFoundContent/NotFoundContent';

const NotFound: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 | Star Wars Search</title>
        <meta name="description" content="App Star Wars Search not found" />
      </Head>
      <NotFoundContent />
    </>
  );
};

export default NotFound;
