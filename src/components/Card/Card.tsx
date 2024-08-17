import React from 'react';
import styles from './Card.module.scss';
import { IFormData } from '../../utils/interfaces';

const Card: React.FC<IFormData> = ({ name, age, email, gender, country, file, isNew }) => {
  return (
    <div className={`${styles.card} ${isNew && styles.new}`}>
      <div className={styles.block}>
        <b>Name: </b>
        <p>{name}</p>
      </div>
      <div className={styles.block}>
        <b>Age: </b>
        <p>{age}</p>
      </div>
      <div className={styles.block}>
        <b>Email: </b>
        <p>{email}</p>
      </div>
      <div className={styles.block}>
        <b>Gnder: </b>
        <p>{gender}</p>
      </div>
      <div className={styles.block}>
        <b>Country: </b>
        <p>{country}</p>
      </div>
      {file && (
        <div className={`${styles.imageContainer} ${styles.block}`}>
          <b>Image:</b>
          <img src={file} alt="" />
        </div>
      )}
    </div>
  );
};

export default Card;
