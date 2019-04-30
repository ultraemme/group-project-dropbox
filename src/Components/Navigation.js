import React, {useState} from 'react';
import styles from './Navigation.module.css';

const Navigation = (props) => {

  return (
    <nav className={styles.nav}>
      <div className={styles['nav__user-container']}>

      </div>
      <div className={styles['nav__btns-container']}>
        <ul className={styles['nav__ul']}>
          <li>
            <button>Files</button>
          </li>
          <li>
            <button>Favorites</button>
          </li>
          <li>
            <button>About us</button>
          </li>
        </ul>
        <span className={styles['nav__line']}></span>
        <ul className={styles['nav__ul']}>
          <li>
            <button>Upload file</button>
          </li>
          <li>
            <button>Upload folder</button>
          </li>
          <li>
            <button onClick={props.newFile}>New folder</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
