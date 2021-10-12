import axios from "axios";
import { getToken } from "../Utils/common";
import {useState, useEffect} from 'react'

function Search(props){
    
    const [userList, setUserList] = useState([]);
    const [userId, setUserId] = useState(props['user_id'])
    
    const fetchUserList = () => {
        axios.get("http://206.189.91.54//api/v1/users", {
            headers: getToken()
        }).then((res) => {
            setUserList(res['data']['data']);
        })
    }
   
    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        userList.filter(person => person.id === userId).map(filteredPerson => (
            <span key={filteredPerson.id} className='channelsMembers' id={userId}> {filteredPerson.email.split("@")[0]}</span>
        ))
    )
    
}

export default Search;