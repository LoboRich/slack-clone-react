import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState } from "react";

const SendMessage = (props) => {

    const [messageInput, setMessageInput] = useState('')

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
            console.log(res['data']['data'])
        });
    }

    return ( 
        <div className="input-box">
            <form onSubmit={SendMessage}>
                <input type="text" className='message-datas' placeholder='Message' onChange={messageWrite}/>
                <div className="message-button-container">
                    <button className="send-button" onSubmit={SendMessage}>Send</button>
                </div>
            </form>
        </div>
     );
}
 
export default SendMessage;