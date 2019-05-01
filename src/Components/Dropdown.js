import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <ul>
        <li><span className={`material-icons`}>star</span>Add to favorites</li>
        <li><span className={`material-icons`}>create</span>Rename</li>
        <li><span className={`material-icons`}>file_copy</span>Copy</li>
        <li><span className={`material-icons`}>exit_to_app</span>Move</li>
        <li><span className={`material-icons`}>delete</span>Delete</li>
      </ul>
    </div>
  )
}

export default Dropdown;
