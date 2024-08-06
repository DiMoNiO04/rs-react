'use client';

import { useEffect, useState } from 'react';
import DetailContent from '../components/DetailContent/DetailContent';

const DetailPage: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <DetailContent />;
};

export default DetailPage;
