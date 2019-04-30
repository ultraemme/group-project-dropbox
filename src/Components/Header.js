import React  from 'react';
import styles from './Header.module.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


const Header = (props) => {
  const pathArr = props.currentPath.pathname.substr(1).split('/');
  let currentDir = "";
  return (
    <header className={styles.header}>
      {
        pathArr.map((path) => {
          currentDir += `/${path}`;
          return (
          <span key={path}>
            <Link to={currentDir}>{path}</Link>
            <span> > </span>
          </span>
        )
      })
    }
    </header>
  )
}

export default Header;
