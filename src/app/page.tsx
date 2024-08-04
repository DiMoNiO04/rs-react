'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), { ssr: false });

function Page() {
  return <App />;
}

export default Page;
