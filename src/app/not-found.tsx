import React from 'react';
import type { Metadata } from 'next';
import NotFoundContent from '../components/NotFoundContent/NotFoundContent';

export const metadata: Metadata = {
  title: '404 | Star Wars Search',
  description: 'App Star Wars Search not found',
};

const NotFound: React.FC = () => {
  return <NotFoundContent />;
};

export default NotFound;
