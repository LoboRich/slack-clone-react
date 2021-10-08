import RetrieveMessage from "./RetrieveMessage";
import axios from "axios";
import { getToken } from "../../Utils/common";
import { createElement, useState } from "react";
import React from "react";
import message from './MessengerContainer.module.css'
import Chatbox from "./Chatbox";
import sendButton from '../resources/sendButton.png'
import camera from '../resources/camera.png'
import link from '../resources/link.png'
import gif from '../resources/gif.png'
import plus from '../resources/plus.png'
import avatar from '../resources/avatar.png'
import Routes from "../../Routes";
import ChannelDetails from "../Channel/ChannelDetails";


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
    const SendMessage = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/messages', data, {
            headers: getToken()
        })
        .then((res) => {
            console.log(res['data']['data'])
        });
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
         <ChannelDetails channel_id={props.match.params.id} />
        <div className={message.messageBox}>
            <div className={message.retrieveBox}>
                <div className={message.retrieveMessage}>
                    <img src={avatar} alt="" className={message.avatar}/>
                    <div className={message.userData}>
                        <h3 className={message.userName}>User Name</h3>
                        <span className={message.userMessage}>Test Message! 123 Slack clone otw!</span>
                    </div>
                </div>
            </div>
            <div className={message.retrieveBox}>
                <div className={message.retrieveMessage}>
                    <img src={avatar} alt="" className={message.avatar}/>
                    <div className={message.userData}>
                        <h3 className={message.userName}>User Name</h3>
                        <span className={message.userMessage}>Test Message! 123 Slack clone otw!</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={message.messageBoxer}>
            <div className={message.inputBox}>
                <div className={message.mediaButtons}>
                    <img src={plus} alt="" className={message.plus}/>
                    <img src={gif} alt="" className={message.gif} />
                    <img src={link} alt="" className={message.link}/>
                    <img src={camera} alt="" className={message.camera} />
                </div>
                <input type="text" className={message.messageInputData} placeholder='Message Here'/>
                <button className={message.sendButton}><img src={sendButton} alt="" className={message.sendIcon} /></button>
                {/* <input type="text" className={message.messageDatas} placeholder='Message' onChange={messageWrite}/>
                <div className={message.messageButtonContainer}>
                    <button className={message.sendButton} onClick={SendMessage}>Send</button>
                </div> */}
                {/* <button className="send-button" onClick={SendMessage}>Send</button>
                <button className="retreive-button" onClick={recieveData}>Receive</button> */}
            </div>
        </div>
    </div> 
    );
}
 
export default MessageContainer;