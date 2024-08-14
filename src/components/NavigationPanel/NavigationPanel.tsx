import React from 'react';
import { Link } from 'react-router-dom';
import { EUrls } from '../../utils';
import styles from './NavigationPanel.module.scss';

const NavigationPanel: React.FC = () => {
  return (
    <div className="container">
      <h1>Select form</h1>
      <div className={styles.btns}>
        <Link to={EUrls.NO_CONTROL_FORM} className={styles.btn}>
          No Control Form
        </Link>
        <Link to={EUrls.REACT_HOOK_FORM} className={styles.btn}>
          React Hook Form
        </Link>
      </div>
    </div>
  );
};

export default NavigationPanel;
