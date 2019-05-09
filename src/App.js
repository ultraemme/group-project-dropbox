import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Components/js/Login';
import Home from './Components/js/Home';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Route exact path='/' component={Login}/>
        <Route path='/home' component={Home}/>
      </div>
    </Router>
  );
}

export default App;
