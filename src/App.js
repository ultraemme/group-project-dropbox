import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
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
