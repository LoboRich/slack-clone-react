import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import AddMembers from "../Channel/AddMembers";
import './Chat.css'
import Search from "../Search";
import SendMessage from "./SendMessage";
import RetrieveMessage from "./RetrieveMessage";
import ChannelDetails from "../Channel/ChannelDetails";
import { createElement } from "react";
import React from "react";
import message from './MessengerContainer.module.css'
import sendButton from '../resources/sendButton.png'
import camera from '../resources/camera.png'
import link from '../resources/link.png'
import gif from '../resources/gif.png'
import plus from '../resources/plus.png'
import avatar from '../resources/avatar.png'


const Chatbox = (props) => {

    return (
        <div className={message.retrieveBox}>
        <div className={message.retrieveMessage}>
            <img src={avatar} alt="" className={message.avatar}/>
            <div className={message.userData}>
                <h3 className={message.userName}>User Name</h3>
                <span className={message.userMessage}>Test Message! 123 Slack clone otw!</span>
            </div>
        </div>
    </div>
    );
}
 
export default Chatbox;


// const [details, setDetails] = useState([]);
//     const [isLoading, setLoading] = useState(true);

//     const channelDetails = (channel_id) => {
//         axios.get("http://206.189.91.54//api/v1/channels/"+channel_id, {
//             headers: getToken()
//         }).then((res) => {
//             setDetails(res['data']['data']);
//             setLoading(false);
//         }).catch(error => {
//             setLoading(true)
//         })
//     }

//     useEffect(() => {
//         channelDetails(props.match.params.id);
//     },[props])

//     return ( 
//         <div className='chat-details'>
//             <div className="chat-header">
//                 {
//                     props.match.params.class === 'Channel' ? <ChannelDetails channel_id={props.match.params.id}/> 
//                     : 
//                     <div className='header-content'>
//                         <span className='channel-name'><svg class="MuiSvgIcon-root sidebarOption__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>{<Search user_id={props.match.params.id}/>}</span>   
//                     </div>
//                 }
               
//             </div>
//             <div className="chat-body">
//                 <div className="chat-box">
//                     <RetrieveMessage class={props.match.params.class} receiver_id={props.match.params.id} />
//                 </div>
//                 <div className="chat-input-box">
//                    <SendMessage class={props.match.params.class} receiver_id={props.match.params.id}/>
//                 </div>
//             </div>
            
//         </div>
//      );
// }