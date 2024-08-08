'use client';

import React, { useEffect, useState } from 'react';
import BtnTheme from '../components/BtnTheme/BtnTheme';
import ThemeContext, { ETheme } from '../context/themeContext';
import { EStorageKeys, getDataStorage, setDataStorage } from '../utils/localeStorage';

const ProviderTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(getDataStorage(EStorageKeys.THEME) || ETheme.LIGHT);

  const toggleTheme = () => {
    if (theme === ETheme.LIGHT) {
      setTheme(ETheme.DARK);
    } else {
      setTheme(ETheme.LIGHT);
    }
  };

  useEffect(() => {
    const body = document.body;
    if (theme === ETheme.DARK) {
      body.classList.add(ETheme.DARK);
    } else {
      body.classList.remove(ETheme.DARK);
    }

    setDataStorage(EStorageKeys.THEME, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <BtnTheme theme={theme} onClick={toggleTheme} />
      {children}
    </ThemeContext.Provider>
  );
};

export default ProviderTheme;
