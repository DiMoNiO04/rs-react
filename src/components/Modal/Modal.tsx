import React, { useContext } from 'react';
import styles from './modal.module.scss';
import ThemeContext, { ETheme } from '../../context/themeContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectAllFavoriteCards, selectCount } from '../../store/favorites/selectors';
import { clearFavorites } from '../../store/favorites/slice';
import exportFromJSON from 'export-from-json';

const Modal: React.FC = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const countSelects = useAppSelector(selectCount());
  const allFavoriteCards = useAppSelector(selectAllFavoriteCards());

  const onClickReset = () => dispatch(clearFavorites());

  const onClickDownload = () => {
    if (allFavoriteCards.length > 0) {
      const data = JSON.stringify(allFavoriteCards);
      const fileName: string = `${countSelects}_peoples`;
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    }
  };

  if (countSelects === 0) return;

  return (
    <div className={`${styles.modal} ${theme === ETheme.DARK && styles.dark}`}>
      <div className={styles.title}>Выбрано {countSelects} элемента</div>
      <div className={styles.btns}>
        <button type="button" className={styles.btnClear} onClick={onClickReset}>
          Отменить выбор всех
        </button>
        <button type="button" className={styles.btnDown} onClick={onClickDownload}>
          Загрузить
        </button>
      </div>
    </div>
  );
};

export default Modal;
