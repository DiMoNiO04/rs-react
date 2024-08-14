import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EUrls } from './utils';
import { ReactHookForm, FormNoControl, MainPage } from './components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={EUrls.MAIN} element={<MainPage />}></Route>
        <Route path={EUrls.NO_CONTROL_FORM} element={<FormNoControl />}></Route>
        <Route path={EUrls.REACT_HOOK_FORM} element={<ReactHookForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
