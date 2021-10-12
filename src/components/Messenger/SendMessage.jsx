import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState } from "react";
import message from './MessengerContainer.module.css'
import sendButton from '../resources/sendButton.png'
import camera from '../resources/camera.png'
import link from '../resources/link.png'
import gif from '../resources/gif.png'
import plus from '../resources/plus.png'

const SendMessage = (props) => {

    const [messageInput, setMessageInput] = useState('')

    const messageWrite = (e) => {   
        setMessageInput(e.target.value)
    }

    const data = {
        'receiver_id': props.receiver_id,
        'receiver_class': props.receiver_class,
        'body': messageInput 
    }
    
    const SendMessage = (e) => {
        e.preventDefault();
        axios.post('http://206.189.91.54//api/v1/messages', data, {
            headers: getToken()
        })
        .then((res) => {
            console.log(res['data']['data'])
            setMessageInput('')
        });
    }

    return ( 
        <div className={message.messageBoxer}>
            <form className={message.inputBox} onSubmit={SendMessage}>
                    <div className={message.mediaButtons}>
                        <img src={plus} alt="" className={message.plus}/>
                        <img src={gif} alt="" className={message.gif} />
                        <img src={link} alt="" className={message.link}/>
                        <img src={camera} alt="" className={message.camera} />
                    </div>
                    <input value={messageInput} type="text" className={message.messageInputData} placeholder='Message Here' onChange={messageWrite}/>
                    <button className={message.sendButton}><img src={sendButton} alt="" className={message.sendIcon} onSubmit={SendMessage}/></button>  
            </form>
        </div>
     );
}
 
export default SendMessage;