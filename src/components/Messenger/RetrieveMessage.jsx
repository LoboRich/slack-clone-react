import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';

const RetrieveMessage = (props) => {
    const [messages, setMessages] = useState([]);

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.class}&receiver_id=`+props.receiver_id,{
            headers: getToken()
        }).then((res) => {
            setMessages(res['data']['data'])
        })
    }

    useEffect(() => {
        recieveData()
    },[messages, setMessages])

    return ( 
        <div>
            <button onClick={recieveData}>Retrieve</button>
            {(
                messages.map(message => {
                    const {id, body} = message;
                    return (
                        <p key={id}>id: {id}, body: {body}</p>
                    );
                })
            )}
        </div>
     );
}
 
export default RetrieveMessage;
