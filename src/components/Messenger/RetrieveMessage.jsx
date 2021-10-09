import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import message from './MessengerContainer.module.css'
import avatar from '../resources/avatar.png'


const RetrieveMessage = (props) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('')
    const [newId, setNewId] = useState(0)

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.class}&receiver_id=`+props.receiver_id,{
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
        'receiver_class': props.class,
        'body': messageInput 
    }

    const SendMessage = (e) => {
        e.preventDefault()
        axios.post('http://206.189.91.54//api/v1/messages', data, {
            headers: getToken()
        })
        .then((res) => {
            setNewId(res['data']['data'].id)
            console.log(res['data']['data'])
        });
    }

    useEffect(() => {
        recieveData()
    },[newId])

    return (
        <div className={message.messageBox}>
           { messages.map(message => {
                const {id, body} = message;
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
            })}
        </div>
     );
}
 
export default RetrieveMessage;
