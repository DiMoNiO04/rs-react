import React from 'react';
import styles from './notFoundContent.module.scss';

const NotFoundContent: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>Page not found</p>
          <a href="/" className={styles.button}>
            Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFoundContent;
