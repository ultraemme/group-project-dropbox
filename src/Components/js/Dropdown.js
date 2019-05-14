import React from 'react';
import styles from '../css/Dropdown.module.css';

const Dropdown = (props) => {

  function renderFavoriteAction () {
    for (let favorite of props.favorites) {
      if (favorite.id === props.file.id) {
        return (
          <li key={"star"} onClick={removeFavorite} className={styles['dropdown__list-item']}>
            <span className={`${styles['dropdown__list-icon']} material-icons`}>star</span>
            <span className={styles['dropdown__list-label']}>Remove from favorites</span>
          </li>
        )
      }
    }
    return (
      <li key={"star"} onClick={addFavorite} className={styles['dropdown__list-item']}>
        <span className={`${styles['dropdown__list-icon']} material-icons`}>star</span>
        <span className={styles['dropdown__list-label']}>Add to favorites</span>
      </li>
    )
  }

  function addFavorite (e) {
    props.toggleDropdown();
    props.addFavorite(props.file);
  }

  function removeFavorite (e) {
    props.toggleDropdown();
    props.removeFavorite(props.file);
  }

  function deleteFile(e) {
    props.toggleDropdown();
    props.deleteFile(props.file);
  }

  function downloadFile(e) {
    props.toggleDropdown();
    props.downloadFile(props.file);
  }

  function renameFile(e){
    props.toggleDropdown();
    props.renameFileFunc(props.file);
  }

  function moveFile(e){
    props.toggleDropdown();
    props.moveFileFunc(props.file);
  }

  function copyFile (e) {
    props.toggleDropdown();
    props.copyFile(props.file);
  }

  return (
    <div onMouseLeave={props.toggleDropdown} className={styles.dropdown} style={{top: props.posY, left: props.posX}}>
      <ul className={styles['dropdown__list']}>
        {renderFavoriteAction()}
        <li key={"download"} onClick={downloadFile} className={styles['dropdown__list-item']}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>arrow_downward</span>
          <span className={styles['dropdown__list-label']}>Download</span>
        </li>
        <li key={"rename"} className={styles['dropdown__list-item']} onClick={renameFile}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>create</span>
          <span className={styles['dropdown__list-label']}>Rename</span>
        </li>
        <li key={"copy"} className={styles['dropdown__list-item']} onClick={copyFile}>>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>file_copy</span>
          <span className={styles['dropdown__list-label']}>Copy</span>
        </li>
        <li key={"move"} className={styles['dropdown__list-item']} onClick={moveFile}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>exit_to_app</span>
          <span className={styles['dropdown__list-label']}>Move</span>
        </li>
        <li key={"delete"} onClick={deleteFile} className={styles['dropdown__list-item']}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>delete</span>
          <span className={styles['dropdown__list-label']}>Delete</span>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;
