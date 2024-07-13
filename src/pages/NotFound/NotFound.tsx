import React from 'react';
import styles from './notFound.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>Page not found</p>
          <Link to="/" className={styles.button}>
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
