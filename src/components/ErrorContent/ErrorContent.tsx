import React from 'react';
import styles from './errorContent.module.scss';
import { ETextError } from '../../utils/consts';

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
