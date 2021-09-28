import {BrowserRouter as Link} from "react-router-dom"
import './App.css';
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";

function App() {

  const Sidebar = () => {
    return (
      <div id="mySidebar" className="sidebar">
        <ul>
          <li className="closebtn" onClick={CloseNav}>
            <Link to="/">x</Link>
          </li>
          <li>
            <Link to="/login">Channels</Link>
          </li>
          <li>
            <Link to="/registration">Direct Message</Link>
          </li>
        </ul>
      </div>
    )
  }

  const Main = () => {
    return (
      <div id="main">
        <button className="openbtn" onClick={OpenNav}>☰</button>
        <Registration />
        <Login />
      </div>
    )
  }
  
  const OpenNav = () => {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }
  
  const CloseNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  return (
    <div className="App">
      <Sidebar />
      <Main />
      
    </div>
  );
}

export default App;
