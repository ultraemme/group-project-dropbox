import React from 'react';
import styles from '../css/Dropdown.module.css';

const Dropdown = (props) => {

  function logFile (file) { //temporary
    console.log(file);
  }

  function deleteFile() {
    props.toggleDropdown();
    props.deleteFile(props.file);
  }

  function downloadFile() {
    props.toggleDropdown();
    props.downloadFile(props.file.name, props.file.path_display, props.file['.tag']);
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
      <ul className={styles.dropdown__list}>
        <li key={"star"} className={styles['dropdown__list-item']}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>star</span>
          <span className={styles['dropdown__list-label']}>Add to favorites</span>
        </li>
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
        <li key={"log"} onClick={() => logFile(props.file)} className={styles['dropdown__list-item']}>
          <span className={`${styles['dropdown__list-icon']} material-icons`}>info</span>
          <span className={styles['dropdown__list-label']}>console.log();</span>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;
