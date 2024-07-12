import React from 'react';
import styles from './errorContent.module.scss';

const ErrorContent: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.text}>
        <h2>Oooops. An unexpected error occurred. Restart the application!</h2>
      </div>
    </div>
  );
};

export default ErrorContent;
