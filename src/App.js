import React from "react";
import {BrowserRouter as Router,Switch,Route,Link}
from "react-router-dom";
import './App.css';
import CreateChannel from "./components/channel/CreateChannel";
import UserChannels from "./components/channel/UserChannels";
import Home from "./components/Home";
import OwnedUserChannels from "./components/channel/OwnedChannels";
function App() {

  const Sidebar = () => {
    return (
      <div id="mySidebar" className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/channel">Channels</Link>
            <UserChannels />
          </li>
          <li>
            <Link to="/user-channels">User Channels</Link>
          </li>
          <li>
            <Link to="/owned-channels">Owned Channels</Link>
          </li>
        </ul>
      </div>
    )
  }

  const Main = () => {
    return (
      <div id="main">
        <Switch>
          <Route path="/channel">
            <CreateChannel />
          </Route>
          <Route path ="/owned-channels">
            <OwnedUserChannels />
          </Route>
          
          <Route path="/user-channels">
            <UserChannels />
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
