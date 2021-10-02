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

const App = () => {
  return ( 
    <div className='page-wrapper'>
      <Router>
        <Switch>
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/Login' component={Login} />
        </Switch>
      </Router>
    </div>
   );
}
 
export default App;

