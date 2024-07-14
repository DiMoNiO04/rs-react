import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import DetailsPage from './pages/Details/DetailsPage';

enum IUrls {
  HOME = '/',
  NOT_FOUND = '*',
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={IUrls.HOME} element={<Main />}>
          <Route index element={<DetailsPage />} />
        </Route>
        <Route path={IUrls.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
