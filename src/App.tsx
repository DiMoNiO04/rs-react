import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import DetailsPage from './pages/Detail/DetailPage';
import ThemeContext, { ETheme } from './context/themeContext';
import BtnTheme from './components/BtnTheme/BtnTheme';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import { toggleTheme } from './store/theme/slice';

enum IUrls {
  HOME = '/',
  NOT_FOUND = '*',
}

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.body;
    if (theme === ETheme.DARK) {
      body.classList.add(ETheme.DARK);
    } else {
      body.classList.remove(ETheme.DARK);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <BtnTheme theme={theme} onClick={() => dispatch(toggleTheme())} />
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
