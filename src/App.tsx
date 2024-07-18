import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import DetailsPage from './pages/Details/DetailsPage';
import ThemeContext, { ETheme } from './context/themeContext';
import BtnTheme from './components/BtnTheme/BtnTheme';

enum IUrls {
  HOME = '/',
  NOT_FOUND = '*',
}

const App: React.FC = () => {
  const [theme, setTheme] = useState(ETheme.LIGHT);

  const toggleTheme = () => setTheme(theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK);

  return (
    <ThemeContext.Provider value={theme}>
      <BtnTheme theme={theme} onClick={toggleTheme} />
      <BrowserRouter>
        <Routes>
          <Route path={IUrls.HOME} element={<Main />}>
            <Route index element={<DetailsPage />} />
          </Route>
          <Route path={IUrls.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
