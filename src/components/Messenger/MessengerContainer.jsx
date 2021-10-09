import RetrieveMessage from "./RetrieveMessage";
import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState } from "react";
import React from "react";
import message from './MessengerContainer.module.css'
import ChannelDetails from "../Channel/ChannelDetails";
import SendMessage from './SendMessage'
import Members from "../Channel/Members";


const MessageContainer = (props) => {

    return ( 
    <div className={message.messageWrapper}>
        <Members channel_id={props.match.params.id}/>
        <ChannelDetails channel_id={props.match.params.id} />
        <RetrieveMessage receiver_class={props.match.params.class} receiver_id={props.match.params.id} />
        <SendMessage receiver_class={props.match.params.class} receiver_id={props.match.params.id}/>
    </div> 
    );
}
 
export default MessageContainer;