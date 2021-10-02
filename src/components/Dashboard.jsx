import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import CreateChannel from "./Channel/CreateChannel";
import UserChannels from "./Channel/UserChannels";
import ChannelDetails from "./Channel/ChannelDetails";
import Home from "./Home";
import MessengerContainer from "./Messenger/MessengerContainer";
import OwnedUserChannels from "./Channel/OwnedChannels";
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function Dashboard(){

  const Sidebar = () => {
    return (
      <div id="mySidebar" className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Channels</Link>
            <UserChannels />
          </li>
          <li>
            <Link to="/create-channel">Create Channel</Link>
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
      </div>
    </Router>
  );
}

export default Dashboard;