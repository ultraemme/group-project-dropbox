import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';


const Header = (props) => {
  const pathArr = props.currentPath.pathname.substr(1).split('/');
  let currentDir = "";
  return (
    <header className={styles.header}>
      {<div className={styles.header__container}>
        {
          pathArr.map((path) => {
            currentDir += `/${path}`;
            return (
              <div key={path} className={styles.header__row} >
                <Link className={styles['header__link']} to={currentDir}>{path}</Link>
                <span className={styles['header__link-arrow']}> > </span>
              </div>
            )
          })
        }
      </div>
      }
      <div className={styles.header__search}>
        <form className={styles['header__search-form']} >
          <label htmlFor="search">
            <i className={`material-icons ${styles['header__search-icon']}`}>search</i>
          </label>
          <input onChange={props.searchFile} value={props.value} className={styles['header__search-input']} type="text" name="search" placeholder="Search..." />
        </form>
      </div>
    </header>
  )
}
export default Header;
