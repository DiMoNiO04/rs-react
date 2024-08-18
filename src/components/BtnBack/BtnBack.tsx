import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BtnBack.module.scss';

const BtnBack: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <button type="button" onClick={goBack} className={styles.btn}>
      Back
    </button>
  );
};

export default BtnBack;
