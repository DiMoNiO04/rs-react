import React, { useContext } from 'react';
import styles from './notFound.module.scss';
import { Link } from 'react-router-dom';
import ThemeContext, { ETheme } from '../../context/themeContext';

const NotFoundPage: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.container} ${theme === ETheme.DARK && styles.dark}`}>
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
