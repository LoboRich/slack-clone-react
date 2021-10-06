import './MessengerContainer.css'
import RetrieveMessage from "./RetrieveMessage";
import axios from "axios";
import { getToken } from "../../Utils/common";
import { createElement, useState } from "react";
import React from "react";

const MessageContainer = () => {

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
    <div className="message-wrapper">
        <div className="message-box">{messageIn}</div>
        <div className="message-boxer">
            <div className="input-box">
                <input type="text" className='message-datas' placeholder='Message' onChange={messageWrite}/>
                <div className="message-button-container">
                    <button className="send-button" onClick={SendMessage}>Send</button>
                </div>
                {/* <button className="send-button" onClick={SendMessage}>Send</button>
                <button className="retreive-button" onClick={recieveData}>Receive</button> */}
            </div>
        </div>
    </div> 
    );
}
 
export default MessageContainer;