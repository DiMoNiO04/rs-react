import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
