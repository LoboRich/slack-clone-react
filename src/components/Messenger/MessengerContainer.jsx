import RetrieveMessage from "./RetrieveMessage";
import React from "react";
import message from './MessengerContainer.module.css'
import ChannelDetails from "../Channel/ChannelDetails";
import SendMessage from './SendMessage'
import UserDetails from "../Users/UserDetails";


const MessageContainer = (props) => {
    const receiver_class = props.match.params.class
    const receiver_id = props.match.params.id

    return ( 
    <div className={message.messageWrapper}>
        { receiver_class === 'Channel' ? (
           <ChannelDetails channel_id={receiver_id} />
        ):(
            <UserDetails user_id={receiver_id}/>
        )
        }
        <RetrieveMessage receiver_class={receiver_class} receiver_id={receiver_id} />
        <SendMessage receiver_class={receiver_class} receiver_id={receiver_id}/>
    </div> 
    );
}
 
export default MessageContainer;