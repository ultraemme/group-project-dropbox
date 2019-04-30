import React  from 'react';
import styles from './Header.module.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h2>
      <Link to={"/"}>Home </Link>
      </h2>
    </header>
  )
}

export default Header;
