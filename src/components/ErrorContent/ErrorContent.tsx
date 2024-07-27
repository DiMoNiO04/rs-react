import React from 'react';
import { ETextError } from '../../errors/types';
import styles from './errorContent.module.scss';

const ErrorContent: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.text}>
        <h2>{ETextError.UI_ERR}</h2>
      </div>
    </div>
  );
};

export default ErrorContent;
