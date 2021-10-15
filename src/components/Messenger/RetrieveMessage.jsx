import axios from "axios";
import { getToken, getUser } from "../../Utils/common";
import { useState, useEffect } from 'react';
import avatar from '../resources/avatar.png'
import moment from 'moment'
import messaged from './MessengerContainer.module.css'
import { getDatabase, ref, onValue } from "firebase/database";

const RetrieveMessage = (props) => {
    const current_user = getUser().id;
    console.log(current_user)
    const db = getDatabase();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('')

    const currentUserStyle = {
        color: "white",
        backgroundColor: '#3f0e40',
        flexDirection: 'row-reverse'
      };
    const senderStyle = {
        color: '#3f0e40',
        backgroundColor: 'white',
      };

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.receiver_class}&receiver_id=`+props.receiver_id,{
            headers: getToken()
        }).then((res) => {
            setMessages(res['data']['data'])
        })
    }

    useEffect(() => {
        recieveData();
        const chats = ref(db, '/chats/'+props.receiver_class+'/'+props.receiver_id);
        onValue(chats, (snapshot) => {
            const data = snapshot.val();
            
            recieveData();
            
            // setMessages(postElement, data);
        });
        
    }, [props]);

    const isCurrentUser = (sender_id) => {
        return sender_id === current_user
    }

    
    return (
        <div className={messaged.messageBox}>
            <div className={messaged.testMBox}>
                { messages.map(message => {
                    const {id, body, sender} = message;
                    return (
                        <div className={messaged.retrieveBox} key={id}>
                            <div className={messaged.retrieveMessage} style={isCurrentUser(sender.id) ? {flexDirection: 'row-reverse'} : {}}> 
                                <img src={avatar} alt="" className={messaged.avatar}/>
                                <div className={messaged.userData} style={isCurrentUser(sender.id) ? currentUserStyle : senderStyle}>
                                    <h3 className={messaged.userName}>{sender.uid.split('@')[0]}     <span className={messaged.receivedTime}>{moment(sender.created_at).format('h:mm:ss a')}</span></h3>
                                    <span className={messaged.userMessage}>{body}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
     );
}
 
export default RetrieveMessage;
