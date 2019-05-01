import React from 'react';
import styles from './Navigation.module.css';
import logo from '../lockbox_logo.svg';

const Navigation = (props) => {

  return (
    <nav className={styles.nav}>
      <div className={styles['nav__head']}>
        <div className={styles['nav__logo-user-wrapper']}>
          <img className={styles['nav__logo']} src={logo}></img>
          <div className={styles['nav__user-wrapper']}>
            <h4 className={styles['nav__username']}>{props.user.display_name}</h4>
            <h5 className={styles['nav__email']}>{props.user.email}</h5>
          </div>
        </div>
        <button className={styles['nav__logout-btn']} onClick={props.signOut}>Sign out</button>
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
            <button onClick={props.uploadFile}>Upload file</button>
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
