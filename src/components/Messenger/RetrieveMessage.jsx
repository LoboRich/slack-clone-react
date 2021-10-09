import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import avatar from '../resources/avatar.png'
import moment from 'moment'
import messaged from './MessengerContainer.module.css'


const RetrieveMessage = (props) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('')

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.receiver_class}&receiver_id=`+props.receiver_id,{
            headers: getToken()
        }).then((res) => {
            setMessages(res['data']['data'])
        })
    }


    const messageWrite = (e) => {   
        setMessageInput(e.target.value)
    }

    const data = {
        'receiver_id': props.receiver_id,
        'receiver_class': props.receiver_class,
        'body': messageInput 
    }

    useEffect(() => {
        recieveData()
    },[messages.length, props])

    return (
        <div className={messaged.messageBox}>
           { messages.map(message => {
                const {id, body, sender} = message;
                return (
                    <div className={messaged.retrieveBox} key={id}>
                        <div className={messaged.retrieveMessage}>
                            <img src={avatar} alt="" className={messaged.avatar}/>
                            <div className={messaged.userData}>
                                <h3 className={messaged.userName}>{sender.uid.split('@')[0]} <span className={messaged.receivedTime}>{moment(sender.created_at).format('h:mm:ss a')}</span></h3>
                                <span className={messaged.userMessage}>{body}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
     );
}
 
export default RetrieveMessage;
