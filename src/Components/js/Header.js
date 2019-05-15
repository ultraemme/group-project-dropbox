import React, { useState } from 'react';
import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';
import FileType from './FileType';
import Classnames from "classnames"

const Header = (props) => {
  const pathArr = props.currentPath.pathname.substr(1).split('/');
  const [focus, setFocus] = useState(false)
  let currentDir = "";
  let list =  props.searchlist;

  function handleFile (file){
    if(file[".tag"] === "folder"){  
      props.history.push(`/home${file.path_display}`);
    }
    else{
      let str = file.path_display.split("/"+ file.name)[0];
      props.history.push(`/home${str}`);
     
    }
  }
   return (
    <header className={styles.header}>
      {<div className={styles.header__container}>
        {
          pathArr.map((path) => {
            currentDir += `/${path}`;
            return (
              <div key={path} className={styles.header__row} >
                <Link className={styles['header__link']} to={currentDir}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
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
          <input
            onChange={props.searchFile}
            autoComplete="off"
            value={props.value || ''}
            className={styles['header__search-input']}
            onFocus={(() => { setFocus(true)})}
            onBlur={(() => { setTimeout(() => setFocus(false), 100) })}
            type="text"
            name="search"
            placeholder="Search..." />
        </form>
        <div  className={Classnames(styles['header__search-container'],
          { [styles['header__search-hide']]: !focus })}>
          <ul className={styles['header__search-ul']}>
            {
                list.length ? list.map(file => {
                return (
                  <li key={file.id} onClick={()=>{handleFile(file);props.searchFile("")}} className={styles['header__search-list']}>
                    <div className={styles['header__search-div']}>
                      <FileType file={file} />
                        <span className={styles['header__search-text']}>{file.name}</span>
                    </div>
                  </li>
                )
              }) : <li className={styles['header__search-list']}>
                  <div className={styles['header__search-div']}>
                    <span className={styles['header__search-text']} >No matches...</span>
                  </div>
                </li>
            }
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header;