import CreateChannel from "./Channel/CreateChannel";
import UserChannels from "./Channel/UserChannels";
import Home from "./Home";
import MessengerContainer from "./Messenger/MessengerContainer";
import OwnedUserChannels from "./Channel/OwnedChannels";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


const Dashboard = () => {
  return (
    <div id="mySidebar" className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/channel">Channels</Link>
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

export default Dashboard;