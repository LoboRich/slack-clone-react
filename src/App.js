import React from "react";
import {BrowserRouter as Router,Switch,Route,Link}
from "react-router-dom";
import './App.css';
import CreateChannel from "./components/channel/CreateChannel";
import UserChannels from "./components/channel/UserChannels";
import Home from "./components/Home";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import OwnedUserChannels from "./components/channel/OwnedChannels";
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import RetrieveMessage from "./components/messages/RetrieveMessage";


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
            <Link to="/create-channel">Create Channel</Link>
            <RetrieveMessage />
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
          <Route path="/create-channel">
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
        <MessengerContainer />
      </div>
    )
  }
  
  const Header = () => {

    return (
        <div className="header">
          <div className="header__left">
            <AccessTimeIcon />
          </div>
          <div className="header__middle">
            <SearchIcon />
            <input placeholder="Search tutorial-daltonic" />
          </div>
          <div className="header__right">
            <HelpOutlineIcon />
            <Avatar
              className="header__avatar"
            />
          </div> 
        </div>
      )
    }

  return (
    <Router>
      <div className="App">
      <Header />
      <Sidebar />
      <Main />
        
      </div>
    </Router>
  );

}


export default App;

