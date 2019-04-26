import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Login}></Route>
      </div>
    </Router>
  );
}

export default App;
