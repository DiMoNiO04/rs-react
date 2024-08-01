import React from 'react';
import loadingGif from '../../../public/loading.gif';
import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
