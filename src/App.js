import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
      </div>
    </Router>
  );
}

export default App;
