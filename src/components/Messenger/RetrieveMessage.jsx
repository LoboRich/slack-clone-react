import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';

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
        <div className='chat-box'>
            <button onClick={recieveData}>Retrieve</button>
            {(
                messages.map(message => {
                    const {id, body} = message;
                    return (
                        <p key={id}>id: {id}, body: {body}</p>
                    );
                })
            )}
            <div className="input-box">
                <form onSubmit={SendMessage}>
                    <input type="text" className='message-datas' placeholder='Message' onChange={messageWrite}/>
                    <div className="message-button-container">
                        <button className="send-button" onSubmit={SendMessage}>Send</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default RetrieveMessage;
