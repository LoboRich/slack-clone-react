import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import Login from "./components/Authenticate/Login";
import Dashboard from "./components/Dashboard";
import CreateChannel from "./components/Channel/CreateChannel";
import UserChannels from "./components/Channel/UserChannels";
import ChannelDetails from "./components/Channel/ChannelDetails";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import OwnedUserChannels from "./components/Channel/OwnedChannels";
import Welcome from "./components/Welcome/Welcome";

const App = () => {
  return ( 
    <div className='page-wrapper'>
      <Router>
        <Switch>
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/Login' component={Login} />
          <Route path="/create-channel" component={CreateChannel}></Route>
          <Route path ="/owned-channels" component={OwnedUserChannels}></Route>
          <Route path ="/channel-details/:id" component={ChannelDetails}></Route>
          <Route path="/user-channels" component={UserChannels}></Route>
          <Route path="/Welcome" component={Welcome}></Route>
        </Switch>
      </Router>
    </div>
   );
}
 
export default App;

