import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import CreateChannel from "./Channel/CreateChannel";
import UserChannels from "./Channel/UserChannels";
import ChannelDetails from "./Channel/ChannelDetails";
// import Home from "./Home";
// import MessengerContainer from "./Messenger/MessengerContainer";
import OwnedUserChannels from "./Channel/OwnedChannels";
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import GetUserList from "./Users/UserList";
import Welcome from "./Welcome/Welcome";

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
            <Link to="/user-list">User List</Link> 
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

  const Main = () => {
    return (
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

        <Route path ="/channel-details/:id" component={ChannelDetails}></Route>

        <Route path="/user-channels">
          <UserChannels />
        </Route>
        
        <Route path ="/user-list">
          <GetUserList />
        </Route>

        {/*<Route path="/">
          <Home />
        </Route>*/}
      </Switch>
    )
  }

  return (
    <Router>
      <div className="App">
      <Header />
        <main className="app__body">
          <Sidebar />
          <Welcome />
          <Main />
        </main>
      </div>
    </Router>
  );
}

export default Dashboard;