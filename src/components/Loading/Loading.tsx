import React from 'react';
import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src="./loading.gif" alt="Loading..." />
    </div>
  );
};

export default Loading;
