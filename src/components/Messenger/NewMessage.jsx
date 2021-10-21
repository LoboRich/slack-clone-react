import RetrieveMessage from "./RetrieveMessage";
import message from './MessengerContainer.module.css'
import SendMessage from './SendMessage'
import {FetchUsers} from '../../Utils/Api'
import { getToken } from '../../Utils/common';
import {useState, useEffect, useRef } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Select from 'react-select';
import lock from '../resources/lock.png'

const NewMessage = () => {
    const db = getDatabase()
    const [user, setUser] = useState(null)
    const [userList, setUserList] = useState([]);

    const list = () => {
        FetchUsers(getToken())
          .then(res => {
            setUserList(res['data']['data']);
          }).catch(err => err)
      }
    
    useEffect(() => {
        list();
        const new_user = ref(db, '/new_user');
        onValue(new_user, (snapshot) => {
            const new_user = snapshot.val(); 
            list();
        });
    }, []);

    const Options = [
        userList.map(list => {
            const {id, email} = list;
            return { value: id, label: email };
        })
    ]
  
    return ( 
        <div className={message.messageWrapper}>
            <div className='header-content'>
                <h3 style={{padding:'1vh'}}>New Message</h3>
            </div>
            <div className='header-content'>
                <span className='channel-name'den="true">To: 
                    <Select id="user_select" name="users" onChange={(e) => setUser(e.value)} options={Options[0]} className="basic-multi-select user-select" classNamePrefix="Search" placeholder="Search User"/>
                </span>
            </div>
            <RetrieveMessage receiver_class='User' receiver_id={user} />
            <SendMessage receiver_class='User' receiver_id={user}/>
        </div> 
    );
}
 
export default NewMessage;