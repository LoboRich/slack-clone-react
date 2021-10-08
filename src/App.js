import Routes from './Routes'
import layout from './App.module.css'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import MessageContainer from './components/Messenger/MessengerContainer'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import Login from './components/Authenticate/Login'


function App() {
  return (
    <div className='pageContainer'>
      <Login />
      <div className={layout.App}>
        <div className={layout.header}><Header /></div>
          <div className={layout.sidebar}>
            <Router >
              <Sidebar />
            </Router >
          </div>
        <div className={layout.content}><MessageContainer /></div>
        </div>
        {/* <Routes /> */}
      
    </div>

    // <Router>
    //   <Switch>
    //     <Router path='/login' exact>
    //        <Login />
    //     </Router>
    //     <Router path='/' exact>
    //       <div className={layout.App}>
    //         <div className={layout.header}><Header /></div>
    //         <div className={layout.sidebar}></div>
    //         <div className={layout.content}><MessageContainer /></div>
    //         {/* <Routes /> */}
    //       </div>
    //     </Router>
    //   </Switch>
    // </Router>
  )
}

export default App

