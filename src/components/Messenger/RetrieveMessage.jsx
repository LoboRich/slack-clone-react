import axios from "axios";
import { getToken } from "../../Utils/common";
import { useState, useEffect } from 'react';
import avatar from '../resources/avatar.png'
import moment from 'moment'
import messaged from './MessengerContainer.module.css'
import { getDatabase, ref, onValue } from "firebase/database";

const RetrieveMessage = (props) => {
    const db = getDatabase();

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('')

    const recieveData = () => {
        axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${props.receiver_class}&receiver_id=`+props.receiver_id,{
            headers: getToken()
        }).then((res) => {
            setMessages(res['data']['data'])
        })
    }



    // get(child(dbRef, `chats/${props.receiver_class}/${props.receiver_id}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    //     }).catch((error) => {
    //     console.error(error);
    // });

    // const [todoList, setTodoList] = useState();
    useEffect(() => {
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
