import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormPageNoControl from './components/FormPageNoControl/FormPageNoControl';
import FormPageControl from './components/FormPageControl/FormPageControl';
import MainPage from './components/MainPage/MainPage';

enum EUrls {
  MAIN = '/',
  NO_CONTROL_FORM = 'no-control-form',
  CONTROL_FORM = 'control-form',
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={EUrls.MAIN} element={<MainPage />}></Route>
        <Route path={EUrls.NO_CONTROL_FORM} element={<FormPageNoControl />}></Route>
        <Route path={EUrls.CONTROL_FORM} element={<FormPageControl />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
