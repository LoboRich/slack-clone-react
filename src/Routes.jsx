import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Login from './components/Authenticate/Login'
import OwnedUserChannels from "./components/Channel/OwnedChannels";
import Registration from "./components/Authenticate/Registration";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import CreateChannel from './components/Channel/CreateChannel'
import Welcome from './components/Welcome/Welcome'
import GetUserList from './components/Users/UserList'
import AddMembers from './components/Channel/AddMembers'
import routeDesign from './Routes.module.css'
import NewMessage from "./components/Messenger/NewMessage";


export default function Routes(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [session, setSession] = useState([])

    const addStructure = (Component, props) => {
        return (
        <>  
            <Header /> 
            <main className="app__body">
                 
                <Sidebar />
                <div className="body">
                    <Component {...props} />
                </div>
            
            </main>
        </>
        )
    }

    useEffect(() => {
        const data = sessionStorage
        if (data) {
            setSession(sessionStorage)
        }
            setIsLoaded(true)
    }, [])

    const GuardedRoute = ({ component: Component, ...rest }) => (
        <Route
        {...rest}
        render={(props) =>
            session.length !== 0 ? (
                addStructure(Component, props)
            ) : (
            <Redirect
                to={{ pathname: '/Login', state: { from: props.location } }}
            />
            )
        }
        />
    )

    if (!isLoaded) return null

    return (
        <div className={routeDesign.app}>
            <Router>
                <Switch>
                    <GuardedRoute path ="/users/:class/:id" component={MessengerContainer}></GuardedRoute>
                    <GuardedRoute path ="/channel-details/:class/:id" component={MessengerContainer}></GuardedRoute>
                    <GuardedRoute path="/create-channel" component={CreateChannel}></GuardedRoute>
                    <GuardedRoute path="/new_message" component={NewMessage}></GuardedRoute>
                    <GuardedRoute path ="/add-members" component={AddMembers}></GuardedRoute>
                    <GuardedRoute path ="/owned-channels" component={OwnedUserChannels}></GuardedRoute>
                    <GuardedRoute path="/registration" component={Registration}></GuardedRoute>
                    <GuardedRoute path="/message-container" component={MessengerContainer}></GuardedRoute>
                    <GuardedRoute path="/user-list" component={GetUserList}></GuardedRoute>
                    <GuardedRoute path="/home" exact component={Welcome} />
                    <Route path="/Login">
                    <Login />
                    </Route>
                    <GuardedRoute path="/" exact component={Welcome} />
                </Switch>
            </Router>
        </div>
    )
}
