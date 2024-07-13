import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';

enum IUrls {
  HOME = '/',
  NOT_FOUND = '*',
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IUrls.HOME} index element={<Main />} />
        <Route path={IUrls.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
