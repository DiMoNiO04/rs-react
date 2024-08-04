import React from 'react';
import styles from './notFoundContent.module.scss';
import Link from 'next/link';

const NotFoundContent: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>Page not found</p>
          <Link href="/" className={styles.button}>
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundContent;
