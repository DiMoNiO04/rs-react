'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { toggleTheme } from '../store/theme/slice';
import BtnTheme from '../components/BtnTheme/BtnTheme';
import ThemeContext, { ETheme } from '../context/themeContext';

const ProviderTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      {children}
    </ThemeContext.Provider>
  );
};

export default ProviderTheme;
