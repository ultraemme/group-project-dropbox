import React from 'react';
import logo from '../../lockbox_logo.svg';
import styles from '../css/Login.module.css';

const Login = (props) => {
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-container__content-wrapper']}>
        <div className={styles['login-container__logo-wrapper']}>
          <img className={styles['logo-wrapper__logo']} src={logo} alt='Lockbox logotype'></img>
          <h1 className={styles['logo-wrapper__logo-text']}>LOCKBOX</h1>
        </div>
        <span className={styles['login-container__line']}></span>
        <a className={styles['login-container__connect-btn']} href='https://www.dropbox.com/oauth2/authorize?client_id=h7s722dkxc8lgct&response_type=code&redirect_uri=http://localhost:3000/home'>CONNECT</a>
      </div>
    </div>
  )
}
export default Login;
