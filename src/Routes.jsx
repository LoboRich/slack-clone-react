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
import UserChannels from "./components/Channel/UserChannels";
import Registration from "./components/Authenticate/Registration";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import CreateChannel from './components/Channel/CreateChannel'
import ChannelDetails from './components/Channel/ChannelDetails'
import Welcome from './components/Welcome/Welcome'
import GetUserList from './components/Users/UserList'
import RetrieveMessage from './components/Messenger/RetrieveMessage'
import AddMembers from './components/Channel/AddMembers'
import Chatbox from './components/Messenger/Chatbox'


export default function Routes(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

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

    const GuardedRoute = ({ component: Component, auth, ...rest }) => (
        <Route
        {...rest}
        render={(props) =>
            isLoggedIn ? (
            addStructure(Component, props)
            ) : (
            <Redirect
                to={{ pathname: '/Login', state: { from: props.location } }}
            />
            )
        }
        />
    )

    useEffect(() => {
        const data = sessionStorage.getItem('token')
        if (data) {
            setIsLoggedIn(true)
        }
            setIsLoaded(true)
    }, [])

    if (!isLoaded) return null

    return (
        <div className="app">
            <Router>
                <Switch>
                    <GuardedRoute path="/users/:class/:id" component={Chatbox}></GuardedRoute>
                    <GuardedRoute path ="/channel-details/:class/:id" component={Chatbox}></GuardedRoute>
                    <GuardedRoute path="/create-channel" component={CreateChannel}></GuardedRoute>
                    <GuardedRoute path ="/add-members" component={AddMembers}></GuardedRoute>
                    <GuardedRoute path ="/owned-channels" component={OwnedUserChannels}></GuardedRoute>
                    <GuardedRoute path="/user-channels" component={UserChannels}></GuardedRoute>
                    <GuardedRoute path="/registration" component={Registration}></GuardedRoute>
                    <GuardedRoute path="/message-container" component={MessengerContainer}></GuardedRoute>
                    <GuardedRoute path="/user-list" component={GetUserList}></GuardedRoute>
                    <GuardedRoute path="/" exact component={Welcome} />
                </Switch>
            </Router>
        </div>
    )
}
