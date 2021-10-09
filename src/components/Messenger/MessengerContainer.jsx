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

    const [messageLength, setMessageLength] = useState([])
    const [messageInput, setMessageInput] = useState('')
    
    const messageWrite = (e) => {
        setMessageInput(e.target.value)
    }

    const data = {
        'receiver_id': 408,
        'receiver_class': 'User',
        'body': messageInput 
    }
    
    const [receiveBox, setReceiveData] = useState('')
    const messageIn = React.createElement('div',{}, receiveBox)

    const recieveData = (e) => {
        e.preventDefault()
        axios.get('http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=809',{
            headers: getToken()
        }).then((res) => {
            console.log(res['data']['data'])
            setReceiveData(res['data']['data']['1']['body'])
            console.log(res['data']['data']['0']['body'])   
            setMessageLength(res['data']['data'].length)
            console.log(messageLength)

            for(let i = 0; i < messageLength; i++) {
                setReceiveData(res['data']['data'][i]['body'])
            }
        })
    }

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