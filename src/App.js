import React from "react";
import {BrowserRouter as Router,Switch,Route,Link}
from "react-router-dom";
import './App.css';
import CreateChannel from "./components/channel/CreateChannel";
import Home from "./components/Home";

function App() {

  const Sidebar = () => {
    return (
      <div id="mySidebar" className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-channel">Create Channel</Link>
          </li>
        </ul>
      </div>
    )
  }

  const Main = () => {
    return (
      <div id="main">
        <Switch>
          <Route path="/create-channel">
            <CreateChannel />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
