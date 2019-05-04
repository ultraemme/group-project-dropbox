import React from 'react';
import styles from './DeleteFile.module.css';

const DeleteFile = (props) => {
  return (
    <div className={styles['overlay-rename']}>
      <div className={styles['delete-container']}>
        <i className={`material-icons ${styles['delete-container__close-btn']}`} onClick={props.closeDialog}>close</i>
        <span className={styles['delete-container__title-wrapper']}>
          <i className={`material-icons ${styles['title-wrapper__icon']}`}>delete</i>
          <h4 className={styles['title-wrapper__title']}>Are you sure you wish delete this file?</h4>
        </span>
        <span className={styles['delete-container__btns-wrapper']}>
          <button className={styles['delete-container__cancel-btn']} onClick={props.closeDialog}>Cancel</button>
          <button className={styles['delete-container__submit-btn']} onClick={() => props.deleteFileRequest(props.file)}>Delete</button>
        </span>
      </div>
    </div>
  )
}

export default DeleteFile;
