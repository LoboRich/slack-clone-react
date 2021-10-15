import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import avatar from '../resources/avatar.png'
import moment from 'moment'
import messaged from './MessengerContainer.module.css'
import { getDatabase, ref, onValue } from "firebase/database";
import man from '../resources/man.png'
import nice from '../resources/nice.png'
import gamer from '../resources/gamer.png'

const RetrieveMessage = (props) => {
    const db = getDatabase();

    const iconArray = [man,nice,gamer,man,nice,gamer,man,nice,gamer,man,nice,gamer,man,nice,gamer]


    const [avatarIcon, setavatarIcon] = useState('man')
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('')

    const randomizeAvatar = () => {
        setavatarIcon(iconArray[Math.floor(Math.random() * iconArray.length)])
    }

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.receiver_class}&receiver_id=`+props.receiver_id,{
            headers: getToken()
        }).then((res) => {
            setMessages(res['data']['data'])
        })
    }

    useEffect(() => {
        randomizeAvatar();
        recieveData();
        const chats = ref(db, '/chats/'+props.receiver_class+'/'+props.receiver_id);
        onValue(chats, (snapshot) => {
            const data = snapshot.val();
            
            recieveData();
            
            // setMessages(postElement, data);
        });
        
    }, [props]);
    
    return (
        <div className={messaged.messageBox}>
            <div className={messaged.testMBox}>
                
                { messages.map(message => {
                    const {id, body, sender} = message;
                    return (
                        <div className={messaged.retrieveBox} key={id}>
                            <div className={messaged.retrieveMessage}>
                                <img src={avatarIcon} alt="" className={messaged.avatar}/>
                                <div className={messaged.userData}>
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
