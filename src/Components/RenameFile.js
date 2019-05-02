import React from 'react';
import styles from './RenameFile.module.css';

const RenameFile = (props) => {
  function onRenameSubmit(e){
    e.preventDefault();
    props.renameFileRequest();
  }

  return (
    <div className={styles['overlay-rename']}>
      <div className={styles['rename-container']}>
        <span className={styles['rename-container__title-wrapper']}>
          <i className={`material-icons ${styles['title-wrapper__icon']}`}>create</i>
          <h4 className={styles['title-wrapper__title']}>Rename File</h4>
        </span>
        <form className={styles['rename-container__rename-form']} onSubmit={onRenameSubmit}>
          <input className={styles['rename-form__input']} type='text' value={props.fileData.fileName} onChange={props.onRenameFileChange}/>
          <span className={styles['rename-form__btns-wrapper']}>
            <button className={styles['rename-form__cancel-btn']}>Cancel</button>
            <button className={styles['rename-form__submit-btn']}>Rename</button>
          </span>
        </form>
      </div>
    </div>
  )
}

export default RenameFile;
