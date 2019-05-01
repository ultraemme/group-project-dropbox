import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdown__list}>
        <li className={styles['dropdown__list-item']}><span className={`${styles['dropdown__list-icon']} material-icons`}>star</span><span className={styles['dropdown__list-label']}>Add to favorites</span></li>
        <li className={styles['dropdown__list-item']}><span className={`${styles['dropdown__list-icon']} material-icons`}>create</span><span className={styles['dropdown__list-label']}>Rename</span></li>
        <li className={styles['dropdown__list-item']}><span className={`${styles['dropdown__list-icon']} material-icons`}>file_copy</span><span className={styles['dropdown__list-label']}>Copy</span></li>
        <li className={styles['dropdown__list-item']}><span className={`${styles['dropdown__list-icon']} material-icons`}>exit_to_app</span><span className={styles['dropdown__list-label']}>Move</span></li>
        <li className={styles['dropdown__list-item']}><span className={`${styles['dropdown__list-icon']} material-icons`}>delete</span><span className={styles['dropdown__list-label']}>Delete</span></li>
      </ul>
    </div>
  )
}

export default Dropdown;
