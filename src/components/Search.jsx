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
        <div>
           {userList.filter(person => person.id == userId).map(filteredPerson => (
                <p key={filteredPerson.id} className='channelsMembers'> {filteredPerson.email}</p>
            ))}
        </div>
    )
    
}

export default Search;