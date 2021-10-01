import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import Login from "./components/Authenticate/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  return ( 
    <div className='page-wrapper'>
      <Router>
        <Route path='/' component={Login} />
        <Route path='/Dashboard' component={Dashboard} />
      </Router>
    </div>
   );
}
 
export default App;


