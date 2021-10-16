import { getToken, getUser } from "../../Utils/common";
import { useState, useEffect } from 'react';
import moment from 'moment'
import messaged from './MessengerContainer.module.css'
import { getDatabase, ref, onValue } from "firebase/database";
import man from '../resources/man.png'
import nice from '../resources/nice.png'
import gamer from '../resources/gamer.png'
import { FetchMessages } from "../../Utils/Api";

const RetrieveMessage = (props) => {
    const current_user = getUser().id;
    const db = getDatabase();

    const iconArray = [man,nice,gamer,man,nice,gamer]

    const [avatarIcon, setavatarIcon] = useState('man')
    const [messages, setMessages] = useState([]);

    const randomizeAvatar = () => {
        setavatarIcon(iconArray[Math.floor(Math.random() * iconArray.length)])
    }

    const currentUserStyle = {
      color: "white",
      backgroundColor: '#3f0e40',
      flexDirection: 'row-reverse'
    };

    const senderStyle = {
      color: '#3f0e40',
      backgroundColor: '#F0F0F0'
    };

    const recieveData = () => {
      FetchMessages(props.receiver_class, props.receiver_id, getToken())
          .then((res) => {
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
        });
        
    }, [props]);

    const isCurrentUser = (sender_id) => {return sender_id === current_user}
    
    return (
        <div className={messaged.messageBox}>
            <div className={messaged.testMBox}>
              {messages.map(message => {
                const {id, body, sender} = message;
                return (
                    <div className={messaged.retrieveBox} key={id} style={
                        isCurrentUser(sender.id)
                        ? {flexDirection: 'row-reverse'}
                        : {flexDirection: 'row'}}>

                        <div className={messaged.retrieveMessage} style={
                            isCurrentUser(sender.id) 
                            ? {flexDirection: 'row-reverse'} 
                            :  {flexDirection: 'row'}}> 

                            <img src={isCurrentUser(sender.id) ? man : nice} alt="" className={messaged.avatar}/>

                            <div className={messaged.userData} style={isCurrentUser(sender.id) ? currentUserStyle : senderStyle}>
                                <h3 className={messaged.userName}>{sender.uid.split('@')[0]}     
                                  <span className={messaged.receivedTime}>
                                    {moment(sender.created_at).format('h:mm:ss a')}
                                  </span>
                                </h3>
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
