import { getToken } from "../Utils/common";
import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import '../App.css'
import man from './resources/man.png'
import nice from './resources/nice.png'
import gamer from './resources/gamer.png'
import {FetchUsers} from '../Utils/Api'

function Search(props){
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [userIds, setUserIds] = useState(props['user_id'])
    const iconArray = [man,nice,gamer]
    const [avatarIcon, setavatarIcon] = useState('man')
    const randomizeAvatar = () => {
        setavatarIcon(iconArray[Math.floor(Math.random() * iconArray.length)])
    }
    
    const fetchUserList = () => {
        FetchUsers(getToken())
          .then(res => {
            setUserList(res['data']['data']);
          }).catch(err => err)
    }
    
    useEffect(() => {
        randomizeAvatar();
        fetchUserList();
    }, [props]);

    const newDM = (user_id) => {
        history.push('/users/User/'+user_id)
    }

    return (
        userList.filter(person => userIds.includes(person.id)).map(filteredPerson => (
            <div className="contactWrapper">
                <img className='thisIcon' src={avatarIcon} alt="" />
                <h4 key={filteredPerson.id} onClick={() => newDM(filteredPerson.id)} user_id={filteredPerson.id} className='channelsMembers'> {filteredPerson.email}</h4> 
            </div>
        ))
    )
    
}

export default Search;