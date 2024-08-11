import React from 'react';
import MainContent from '../components/MainContent/MainContent';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import fetchData from '../api/fetchData';
import { IFetchResponse } from '../api/types';

interface HomePageProps {
  data: IFetchResponse | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchData(context);

  return { props: { data } };
};

const Home: React.FC<HomePageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Star Wars Search</title>
        <meta name="description" content="App Star Wars Search" />
      </Head>
      <MainContent data={data} />
    </>
  );
};

export default Home;
