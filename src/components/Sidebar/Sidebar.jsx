import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import UserChannels from "../Channel/UserChannels";
import './Sidebar.css'

export const Sidebar = () => {
    
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

export default Sidebar;