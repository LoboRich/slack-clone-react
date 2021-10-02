import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../Utils/common';
import './Channel.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const ChannelList = () => {
    const [channels, setChannels] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);

    useEffect(() => {
        axios.get("http://206.189.91.54//api/v1/channels", {
            headers: getToken()
        }).then((res) => {
            setChannels(res['data']['data']);
            setLoading(false);
        }).catch(error => {
            setErrors(error)
            setLoading(true)
        })
    },[channels.length]);
  
    return <div className='channels'>
        {hasError ? <p>{hasError.message}</p> : null}
        {!isLoading ? (
            channels.map(channel => {
                const {id, name} = channel;
                return (
                    <a href={'/channel-details/'+id} key={id}>{name}</a>
                );
            })
        ): (
        <p>{isLoading}</p>
        )}
    </div>

}

function UserChannels(){
    return (
        <div id="channelList">
            <ChannelList />
            <a href="/create-channel">New channel</a>
        </div>
    )
}
export default UserChannels;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMX8IvIsF-T1lvS6pkXoJ1sBKqypICGGs",
  authDomain: "slack-clone-8d558.firebaseapp.com",
  projectId: "slack-clone-8d558",
  storageBucket: "slack-clone-8d558.appspot.com",
  messagingSenderId: "442828509831",
  appId: "1:442828509831:web:2bdd7bdcdc670949299e22",
  measurementId: "G-4H4ZGFH2CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const id = window.location.href.split("/").pop();

//begin edit
const notifs = firebase.database().ref('/');

notifs.on('child_added', (data) => {
  //var d = Object.values(data.val());
  const d = Object.values(data.val())[0];
  $('#channelList tr:last').after("<tr><td><a href='/mark_read_notif/" +d.name+ ">"+d.name+"</a></td></tr>");
  
});